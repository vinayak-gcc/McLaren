# McLaren

## A Website built using React, Tailwind, Redux, Firebase and TypeScript along with many other Tech-Stacks  

## Features

- Good Design and Fully Responsive CSS using Tailwind CSS, styled-components and Headless UI
- Cart Functionalities like AddtoCart, RemovefromCart using Redux and Redux Persist
- EmailJS Integration for Email Confirmation
- Dynamic Order Summary using Cart Data
- Firebase for Login and Registration
- Download Screenshot as PDF after Order
- Few small features here and there among the whole website
- Overall Smooth experience
- Real Stripe Payments (Only in Test Mode)

## Setup & Installation

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Stripe Configuration
REACT_APP_STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Firebase Configuration

apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_FIREBASE_APP_ID,
measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

```

### Running the Application

#### Development Mode

1. **Start the React application:**
   ```bash
   npm start
   ```

2. **Start the local Stripe server:**
   ```bash
   # Option 1: From project root
   node server/stripe.js
   
   # Option 2: From server directory
   cd server
   node stripe.js
   ```

   The Stripe server will run on `http://localhost:5000`

#### Production Deployment

For production deployment on Vercel:

1. **Deploy the main application to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all the environment variables from your `.env` file

The application automatically uses: ( Did this to not deploy Backend seperately )
- **Local development:** Express server at `http://localhost:5000/stripe`
- **Production:** Vercel serverless function at `/api/stripe`

### Project Structure

```
mclaren/
├── api/
│   └── stripe.js          # Vercel serverless function for Stripe payments
├── server/
│   └── stripe.js          # Local Express server for development
├── src/
│   └── ...               # React application source code
├── .env                  # Environment variables
└── README.md
```

### Stripe Integration Details

- **Development**: Uses Express server (`server/stripe.js`) running on localhost:5000
- **Production**: Uses Vercel serverless API route (`api/stripe.js`)
- The client automatically detects the environment and uses the appropriate endpoint
- Make a Stripe account to get your test API keys for the `.env` file

### EmailJS Integration Details

- Make an EmailJS account to get the required environment variables
- Used for sending email confirmations after orders
- Configure your email template in the EmailJS dashboard

### Firebase Integration

- Used for user authentication (login/registration)
- Configure Firebase project and add your config variables to `.env`

### Additional Features

- **Redux & Redux Persist**: State management with cart persistence
- **PDF Generation**: Download order confirmation as PDF
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Type-safe development

### Here's A Screenshot

![alt text](<Screenshot.png>)