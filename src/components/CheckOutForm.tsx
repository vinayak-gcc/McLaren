import React, {useRef , useState} from 'react';
import { useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

const CheckOutForm = () => {

    const total = useAppSelector((state) => state.car.total);
    const navigation = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
   
    const triggerAlert = () => {
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false); 
      }, 1300);
    };

    function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(" ");
   }

   //  E-Mail.js Form
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e:any) => {
        e.preventDefault(); 

      // Service_id ,Tempate_id ,PublicKey
        emailjs.sendForm('service_yatg313', 'template_cnie7yy', form.current!, 'M84GYwg-YCpBV47Od')
            .then(() => {
                console.log('Email sent successfully:');
            }, (error) => {
                console.log('Error Sending Email:', error.text);
            });

        e.target.reset(); 
    };

    return (
       <>   
            {/* Show Alert Box after clicking pay button */}
            {showAlert && (
              <div>
                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm  w-fit sm:w-full text-center">
                  <h2 className="text-lg font-semibold mb-4"> 🥳Congratulations🥳</h2>
                  <p className="text-gray-700 mb-6">Redirecting you to Order Page</p>
                 </div>
               </div>
            </div>
            )}


            {/* Checkout form */}
            <section
               aria-labelledby="payment-heading"
               className="flex-auto overflow-y-auto px-4 bg-gray-100 pb-10 sm:px-6 lg:px-8 lg:pt-0 lg:pb-10"
            >

               <div className="max-w-lg pt-4 md:pt-2 mx-auto lg:pt-12  ">

                  <form className="mt-6"  ref={form} onSubmit={sendEmail} >

                     {/* Actual Form */}
                     <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                        <div className="col-span-full mt-4">
                           <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Email address
                           </label>
                           <div className="mt-1">
                              <input
                                 type="email"
                                 id="email-address"
                                 name="email-address"
                                 autoComplete="email"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="name-on-card"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Name on card
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="name-on-card"
                                 name="name-on-card"
                                 autoComplete="Name"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="card-number"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Card number
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="card-number"
                                 name="card-number"
                                 autoComplete="cc-number"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-8 sm:col-span-9">
                           <label
                              htmlFor="expiration-date"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Expiration date (MM/YY)
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 name="expiration-date"
                                 id="expiration-date"
                                 autoComplete="cc-exp"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-4 sm:col-span-3">
                           <label
                              htmlFor="cvc"
                              className="block text-sm font-medium text-gray-700"
                              placeholder="000"
                           >
                              CVC
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 name="cvc"
                                 id="cvc"
                                 autoComplete="cc-csc"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                                  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Address
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="address"
                                 name="address"
                                 autoComplete="street-address"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                           >
                              City
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="city"
                                 name="city"
                                 autoComplete="address-level2"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                           >
                              State / Province
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="region"
                                 name="region"
                                 autoComplete="address-level1"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Postal code
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="postal-code"
                                 name="postal-code"
                                 autoComplete="postal-code"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="mt-6 flex space-x-2">
                        <div className="flex items-center h-5">
                           <input
                              id="same-as-shipping"
                              name="same-as-shipping"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 border-gray-100 rounded text-indigo-600 focus:ring-indigo-500"
                           />
                        </div>
                        <label
                           htmlFor="same-as-shipping"
                           className="text-sm font-medium text-gray-900"
                        >
                           Billing address is the same as shipping address
                        </label>
                     </div>
                     {/* Actual Form */}


                     {/* Pay Button */}
                     <button
                     
                        type="submit"
                        disabled={isDisabled}
                        
                        onClick={() => {
                           setTimeout(()=> {
                           navigation('/order', {replace:true} );
                           }, 2000);

                           setIsDisabled(true)
                           
                           setTimeout(()=> {
                              triggerAlert()
                              }, 500);

                         }}

                         
                        className={classNames(
                           " w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                           isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-indigo-700"

                        )}
                        >

                        {
                           isDisabled ? (<p className='text-white'>Thanks for Ordering</p>)
                        :
                           (<p className='text-white'>Pay ${new Intl.NumberFormat("en-IN").format(total)}</p>)
                        }

                     </button>
                     
                  </form>
               </div>
            </section>

    </>
  )
}

export default CheckOutForm
