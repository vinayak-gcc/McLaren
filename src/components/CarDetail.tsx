import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import { carsData } from "../carsData";
import { CheckIcon, ClockIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/Car/carSlice";

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(" ");
}

export default function CarDetail() {
   const { id } = useParams();
   const [product] = carsData.filter((car) => car.id === parseInt(id ?? ""));
   const dispatch = useDispatch();

   const cart = useSelector((state: any) => state.car.cart);

   const isProductInCart = (productId: number) =>
      cart.some((item: any) => item.id === productId);

   const isInCart = isProductInCart(product.id);

   return (
      <div className="bg-white">
         <div className="mx-auto mt-20 mb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

            {/* Product */}
            <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
               
               {/* Product image */}
               <div className="lg:row-end-1 lg:col-span-4">
                  <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                     <img
                        src={`/images/${product.backgroundImg}`}
                        alt={product.title}
                        className="object-center object-cover"
                     />
                  </div>
               </div>

               {/* Product details */}
               <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                  <div className="flex flex-col-reverse">
                     <div className="mt-4">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                           {product.title}
                        </h1>
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                           <StarIcon
                              key={rating}
                              className={classNames(
                                 3 > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                 "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                           />
                        ))}
                     </div>
                     <p className="sr-only">{3} out of 5 stars</p>
                  </div>

                  <p className="text-gray-500 mt-6">{product.description}</p>

                  <div className="flex flex-col sm:flex-row">
                     <div className="flex flex-col">
                        <p className="mt-4 font-bold text-lg">
                           Price- $
                           {new Intl.NumberFormat("en-GB").format(product.price)}
                        </p>
                        <div className="flex gap-2 items-center mt-2">
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
                           {product.inStock ? "In Stock!" : "Out Of Stock!"}
                        </div>
                     </div>

                     <div className="my-5 flex-wrap sm:ml-10 flex flex-col  gap-x-6 gap-y-4 sm:flex-row">
                        <button
                           disabled={isInCart}
                           onClick={() => {
                              if (!isInCart) dispatch(addToCart(product.id));
                           }}
                           type="button"
                           className={classNames(
                              "w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500",
                              isInCart
                                 ? "opacity-50 cursor-not-allowed"
                                 : "hover:bg-indigo-700"
                           )}
                        >
                           {isInCart ? "Already in Cart" : "Add to Cart"}
                        </button>
                     </div>
                  </div>

                  <div className="border-t border-gray-200 mt-5 pt-5">
                     <h3 className="text-gray-900 font-bold text-lg">
                        Highlights
                     </h3>
                     <div className="mt-4 prose prose-sm text-gray-500">
                        <ul>
                           {product.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
