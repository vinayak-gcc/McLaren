import React, { useState, useEffect } from 'react';
import { useCartState } from "../hooks/useReducerState";
import { useAppSelector } from "../app/store";
import Confetti from "react-confetti";
import Navbar from "../components/Navbar";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Example() {
   const orders = useCartState();
   const total = useAppSelector((state) => state.car.total);
   const { width, height } = useWindowSize();

      const [showConfetti, setShowConfetti] = useState(false);
  
      useEffect(() => {
          setShowConfetti(true); 
  
          const timer = setTimeout(() => {
              setShowConfetti(false); 
          }, 5000);
  
          return () => clearTimeout(timer); 
      }, []);

   return (
      <div className="bg-white ">
        { showConfetti && <Confetti
            className="overflow-y-hidden"
            width={width - 20}
            height={height - 20}
            wind={0.1}
            gravity={0.2}
            numberOfPieces={200}
         />
        }
         
         <div className="py-16 sm:py-24">
            <Navbar bgColor={"bg-white border-b"}></Navbar>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
               <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                  <h1 className="text-2xl mt-4 sm:mt-0 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                     Order Placed!
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                     Check the status of recent orders, manage returns, and
                     discover similar products.
                  </p>
               </div>
            </div>

            <div className="mt-16">
               <h2 className="sr-only">Recent orders</h2>
               <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                  <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                     <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">
                        <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                           <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                              <div>
                                 <dt className="font-medium text-gray-900">
                                    Order number
                                 </dt>
                                 <dd className="mt-1 text-gray-500">
                                    {orders.length}
                                 </dd>
                              </div>

                              <div>
                                 <dt className="font-medium text-gray-900">
                                    Total amount
                                 </dt>
                                 <dd className="mt-1 font-medium text-gray-900">
                                    $
                                    {new Intl.NumberFormat("en-GB").format(
                                       total
                                    )}
                                 </dd>
                              </div>
                           </dl>
                        </div>
                        
                        {/* Products */}
                        <h4 className="sr-only">Items</h4>
                        <ul className="divide-y divide-gray-200">
                           {orders.map((product) => (
                              <li key={product.id} className="p-4 sm:p-6">
                                 <div className="flex items-center sm:items-start">
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                       <img
                                          src={`/images/${product.backgroundImg}`}
                                          alt={product.title}
                                          className="w-full h-full object-center object-cover"
                                       />
                                    </div>
                                    <div className="flex-1 ml-6 text-sm">
                                       <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                          <h5>{product.title}</h5>
                                          <p className="mt-2 sm:mt-0">
                                             $
                                             {new Intl.NumberFormat(
                                                "en-GB"
                                             ).format(product.price)}
                                          </p>
                                       </div>
                                       <p className="hidden text-gray-500 sm:block sm:mt-2">
                                          {product.description}
                                       </p>
                                    </div>
                                 </div>

                              </li>
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
