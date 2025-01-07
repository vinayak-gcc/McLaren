import React from 'react'
import { Disclosure } from "@headlessui/react";
import { useAppSelector } from "../app/store";
import { useCartState } from "../hooks/useReducerState";

const MobileOrderSummary = () => {

      const products = useCartState();
      const total = useAppSelector((state) => state.car.total);

      return (
         <>
      
            {/* Mobile order summary */}
            <section
               aria-labelledby="order-heading"
               className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden mt-10"
            >
               <Disclosure as="div" className="max-w-lg mx-auto ">
                  {({ open }) => (
                     <>
                        <div className="flex mt-4 items-center justify-between">
                           <h2
                              id="order-heading"
                              className="text-lg font-medium text-gray-900"
                           >
                              Your Order
                           </h2>
                           <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                              {open ? (
                                 <span className="text-black font-bold">Hide full summary</span>
                              ) : (
                                 <span className="text-black font-bold">Show full summary</span>
                              )}
                           </Disclosure.Button>
                        </div>

                        <Disclosure.Panel>

                           <ul
                              className="divide-y divide-gray-200 border-b border-gray-200  "
                           >
                              {products.map((product) => (
                                 <li
                                    key={product.id}
                                    className="flex py-6 space-x-6 "
                                 >
                                    <img
                                       src={`/images/${product.backgroundImg}`}
                                       alt={product.title}
                                       className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                                    />
                                    <div className="flex flex-col justify-between space-y-4">
                                       <div className="text-sm font-medium space-y-1 ">
                                          <h3 className="text-gray-900">
                                             {product.title}
                                          </h3>
                                          <p className="text-gray-900">
                                             Price- $
                                             {new Intl.NumberFormat(
                                                "en-IN"
                                             ).format(product.price)}
                                          </p>
                                          <p className="text-gray-500">
                                             {product.description
                                                .substring(0, 113)
                                                .concat("...")}
                                          </p>
                                          <p className="text-gray-500 hidden sm:block lg:hidden">
                                             {product.description
                                                .substring(0, 40)
                                                .concat("...")}
                                          </p>
                                          </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </Disclosure.Panel>

                        <p className="flex items-center justify-between text-sm font-medium text-gray-900 mt-4 lg:mt-0 border-gray-200 ">
                           <span className="text-base ">Total</span>
                           <span className="text-base font-bold">
                              ${new Intl.NumberFormat("en-IN").format(total)}
                           </span>
                        </p>
                     </>
                  )}
               </Disclosure>
            </section>

    </>
  )
}

export default MobileOrderSummary
