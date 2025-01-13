import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  setTotal } from "../features/Car/carSlice";
import { useCartState } from "../app/store";

const OrderSummary = () => {

   const dispatch = useDispatch();
   const _products = useCartState();
   const products = [..._products];
   const orders = useCartState();
       
    
   let shipEsti = 500;
   let tax = 834.89;
   const subtotal = products.reduce((acc, curr) => {
         acc = curr.price * curr.quantity + acc;
         return acc;
   }, 0);
   const total = shipEsti + tax + subtotal;


  return (
            <>

                   {/* Order summary */}
                   <section
                      aria-labelledby="summary-heading"
                      className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                   >
                      <h2
                         id="summary-heading"
                         className="text-lg font-medium text-gray-900"
                      >
                         Order summary
                      </h2>
    
                      <dl className="mt-6 space-y-4">

                      <div className="flex items-center justify-between">
                            No of Orders
                            <dd className="text-sm font-medium text-gray-900">
                           {orders.length}
                            </dd>
                         </div>

                         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">
                               ${new Intl.NumberFormat("en-IN").format(subtotal)}
                            </dd>
                         </div>

                         <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            Shipping Estimate
                            <dd className="text-sm font-medium text-gray-900">
                               $
                               {subtotal !== 0
                                  ? new Intl.NumberFormat("en-IN").format(shipEsti)
                                  : 0}
                            </dd>
                         </div>

                         <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">
                               <span>Tax estimate</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">
                               $
                               {subtotal !== 0
                                  ? new Intl.NumberFormat("en-IN").format(tax)
                                  : 0}
                            </dd>
                         </div>
                         
                         <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">
                               Order total
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                               $
                               {subtotal !== 0
                                  ? new Intl.NumberFormat("en-IN").format(total)
                                  : 0}
                            </dd>
                         </div>
                      </dl>
    
                      <div className="mt-6">
                         <Link to={"/checkout"}>
                            <button
                               onClick={() => dispatch(setTotal(total))}
                               type="submit"
                               className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                               Checkout
                            </button>
                         </Link>
                      </div>
                   </section>
      
    </>
  )
}

export default OrderSummary
