/* eslint-disable jsx-a11y/no-redundant-roles */
import {
   CheckIcon,
   ClockIcon,
   XIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
   removeFromCart,
   setQuantity,
} from "../features/Car/carSlice";
import { useCartState } from "../app/store";
import { ImSad } from "react-icons/im";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {

   const dispatch = useDispatch();
   const _products = useCartState();
   const products = [..._products];
   const navigation = useNavigate();

   return (
      <div className="bg-white">
         <Navbar bgColor={"bg-white border-b"} />
         <div className="max-w-2xl mx-auto pt-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl my-6">
               Cart
            </h1>
            <form className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
               <section
                  aria-labelledby="cart-heading"
                  className="lg:col-span-7"
               >
                  <ul
                     role="list"
                     className="border-t border-b border-gray-200 divide-y divide-gray-200"
                  >
                     {products.length !== 0 ? (
                        products
                           .sort((a, b) => a.id - b.id)
                           .map((product, productIdx) => (
                              <li
                                 key={product.id}
                                 className="flex py-6 sm:py-10"
                              >
                                 <div className="flex-shrink-0">
                                    <img
                                       src={`/images/${product.backgroundImg}`}
                                       alt={product.title}
                                       className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                    />
                                 </div>

                                 <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 flex sm:flex-row flex-col sm:gap-x-6 sm:pr-0">
                                       <div>
                                          <div className="flex justify-between">
                                             <h3 className="text-sm">

                                             <div className="flex">

                                                {/* Car Name */}
                                                <Link
                                                   to={`/cars/${product.id}`}
                                                   className="font-medium text-gray-700 hover:font-bold"
                                                >
                                                   {product.title}
                                                </Link>

                                                {/* Out of Stock or Not */}
                                                <div className="flex ml-2">
                                    <p className="flex text-sm text-gray-700  mr-2 space-x-1">
                                       {product.inStock ? (
                                          <CheckIcon
                                             className="flex-shrink-0 h-5 w-5 text-green-500"
                                             aria-hidden="true"
                                          />
                                       ) : (
                                          <ClockIcon
                                             className="flex-shrink-0 h-5 w-5 text-gray-300"
                                             aria-hidden="true"
                                          />
                                       )}
                                    </p>
                                    {product.inStock ? "Available" : "Out Of Stock!"}
                              </div>

                                       {/* Quantity */}
                                       <div className="sm:mt-0 ml-auto mr-12">
                                          <label
                                             htmlFor={`quantity-${productIdx}`}
                                             className="sr-only"
                                          >
                                             Quantity, {product.title}
                                          </label>
                                          {product.inStock ? (
                                          <select
                                             onChange={(e) =>
                                                dispatch(
                                                   setQuantity({
                                                      id: product.id,
                                                      quantity: parseInt(
                                                         e.target.value
                                                      ),
                                                   })
                                                )
                                             }
                                             id={`quantity-${productIdx}`}
                                             name={`quantity-${productIdx}`}
                                             className="max-w-full rounded-md border border-gray-300 ml-4 text-base leading-5 font-medium text-gray-700 text-left
                                              shadow-sm focus:outline-none hover:border-black focus:border-indigo-500 sm:text-sm"
                                          >
                                             <option value={1}>1</option>
                                             <option value={2}>2</option>
                                             <option value={3}>3</option>
                                             <option value={4}>4</option>
                                             <option value={5}>5</option>
                                             <option value={6}>6</option>
                                             <option value={7}>7</option>
                                             <option value={8}>8</option>

                                          </select>)

                                          :(<div></div>)

                                       }

                                          <div className="absolute top-0 right-0">
                                             <button
                                                onClick={() =>
                                                   dispatch(
                                                      removeFromCart(product.id)
                                                   )
                                                }
                                                type="button"
                                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                             >
                                                <span className="sr-only"> Remove  </span>
                                                <XIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                             </button>
                                          </div>
                                       </div>

                                       </div>

                                     </h3>
                                          </div>

                                          <div className="mt-1 flex text-sm">
                                             <p className="text-gray-500 hidden lg:block">
                                                {product.description
                                                   .substring(0, 450)
                                                   .concat("...")}
                                             </p>
                                             <p className="text-gray-500 hidden sm:block md:hidden">
                                                {product.description
                                                   .substring(0, 400)
                                                   .concat("...")}
                                             </p>
                                             <p className="text-gray-500 hidden md:block lg:hidden ">
                                                {product.description
                                                   .substring(0, 400)
                                                   .concat("...")}
                                             </p>
                                             <p className="text-gray-500 block sm:hidden">
                                                {product.description
                                                   .substring(0, 100)
                                                   .concat("...")}
                                             </p>
                                          </div>
                                          
                                          <p className="mt-1 text-sm font-medium text-gray-900">
                                             $
                                             {new Intl.NumberFormat(
                                                "en-IN"
                                             ).format(product.price)}
                                          </p>
                                       </div>


                                    </div>

                                 </div>
                              </li>
                           ))
                     ) : (
                        <div className="flex items-center justify-center gap-2  text-lg ">
                           <p className="mt-30">Cart is Empty!</p>
                           <ImSad></ImSad>
                           <button
                              onClick={() => {
                                 navigation(`/`);
                              }}
                              type="submit"
                              className=" ml-20 w-200 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                           >
                              Shop Now!
                           </button>
                        </div>
                     )}
                  </ul>
               </section>

               {/* Order summary */}
               <OrderSummary />

            </form>
         </div>
      </div>
   );
}
