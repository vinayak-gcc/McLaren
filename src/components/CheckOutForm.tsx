import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";


const CheckOutForm = () => {

    const navigation = useNavigate();
    const total = useAppSelector((state) => state.car.total);
    
  return (
    <>
      
            {/* Checkout form */}
            <section
               aria-labelledby="payment-heading"
               className="flex-auto overflow-y-auto px-4 bg-gray-100 pb-16 sm:px-6 lg:px-8 lg:pt-0 lg:pb-24"
            >

               <div className="max-w-lg pt-6 mx-auto lg:pt-12  ">
                  <form className="mt-6">
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
                                 autoComplete="cc-name"
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
                              htmlFor="regino"
                              className="block text-sm font-medium text-gray-700"
                           >
                              State / Province
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="regino"
                                 name="regino"
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

                     <button
                        onClick={() => navigation("/orderpage")}
                        type="submit"
                        className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Pay ${new Intl.NumberFormat("en-GB").format(total)}
                     </button>
                  </form>
               </div>
            </section>

    </>
  )
}

export default CheckOutForm
