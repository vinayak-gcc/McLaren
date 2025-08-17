import React, { useState } from "react";
import { useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Configuration constants from .env
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "";

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// Form data interface
interface FormData {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
}

const CheckOutForm = () => {
  const total = useAppSelector((state) => state.car.total);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1600);
  };

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        total={total}
        navigate={navigate}
        showAlert={showAlert}
        triggerAlert={triggerAlert}
      />
    </Elements>
  );
};

interface StripePaymentFormProps {
  total: number;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  showAlert: boolean;
  triggerAlert: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  total,
  navigate,
  showAlert,
  triggerAlert,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Separate function to handle email sending
  const sendEmailConfirmation = async () => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        console.error("Invalid email address:", formData.email);
        return false;
      }
  
      // Create template parameters object with names matching the template
      const templateParams = {
        "email-address": formData.email.trim(), // Matches {{email-address}} in template
        "address": `${formData.address}, ${formData.city}, ${formData.state} ${formData.postal_code}`, // Matches {{address}} in template
        "name-on-card": formData.name, // Matches {{name-on-card}} in template
      };
  
      console.log("Sending email with parameters:", templateParams);
  
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
  
      console.log("Email sent successfully:", result);
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
  
    // Validate email field
    if (!formData.email || formData.email.trim() === "") {
      setError("Please provide a valid email address.");
      return;
    }
  
    if (!stripe || !elements) {
      setError("Payment system not initialized");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      return;
    }
  
    setLoading(true);
  
    try {
    // In development, it calls your local Express server.
    // In production (Vercel), it calls it like the default Next.js Structure - serverless API /api/stripe.

    const isNotLocal = !window.location.hostname.includes('localhost');

    const response = await axios.post(
      isNotLocal 
        ? "/api/stripe"
        : "http://localhost:5000/stripe",
      {
        amount: Math.round(total * 100),
      }
    );
  
      if (!response.data || !response.data.clientSecret) {
        throw new Error("Invalid response from payment server");
      }
  
      const clientSecret = response.data.clientSecret;
      console.log("Created payment intent with client secret");
  
      // Step 2: Confirm card payment
      console.log("Confirming card payment...");
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postal_code,
            },
          },
        },
      });
  
      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }
  
      // Payment successful
      console.log("Payment successful:", result.paymentIntent?.id);
  
      // Step 3: Send confirmation email
      console.log("Sending confirmation email...");
      const emailSent = await sendEmailConfirmation();
  
      if (emailSent) {
        console.log("Email confirmation sent successfully");
      } else {
        console.warn("Payment successful but email failed to send");
      }
  
      // Show success alert and redirect
      triggerAlert();
      setTimeout(() => {
        navigate("/order", { replace: true });
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 mt-28 mx-10 lg:mx-0 mb-10 border border-black bg-white shadow-lg rounded-lg">
      {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded relative shadow-lg"
            role="dialog"
          >
            🎉 Payment Successful! Redirecting to Order Page...
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          ❌ Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
          title="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Name on Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name on card</label>
          <input
          title="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Card details</label>
          <CardElement
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {/* Info */}
        <p>
    Stripe provides predefined test card numbers to simulate various payment scenarios during development. These cards are only valid in test mode and do not process real payments. Below is a summary of commonly used test card numbers and their outcomes: 
    <br/><br/>
    <strong>4242 4242 4242 4242</strong> (Visa) - Successful payment<br/>
    <strong>12/30</strong> - MM/YY Format<br/>
    <strong>CVC</strong> - ANY <br/>
    <strong> Zip Code </strong> - ANY <br/>
    <br/>
    <strong>4000 0000 0000 0002</strong> (Visa) - Payment requires authentication (3D Secure)<br/>
    <strong>4000 0000 0000 0341</strong> (Visa) - Payment fails due to insufficient funds<br/>
    <strong>5555 5555 5555 4444</strong> (Mastercard) - Successful payment<br/>
    <strong>3782 822463 10005</strong> (American Express) - Successful payment<br/>
    <strong>4000 0000 0000 0069</strong> (Visa) - Expired card<br/>
    <strong>4000 0000 0000 0127</strong> (Visa) - Invalid CVC<br/>
   
    <br/>
</p>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
          title="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
            title="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State / Province</label>
            <input
            title="State/Province"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal code</label>
          <input
          title="Postal Code"
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;