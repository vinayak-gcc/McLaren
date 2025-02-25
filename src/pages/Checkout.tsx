import React from "react";
import Navbar from "../components/Navbar";
import { useAppSelector , useCartState} from "../app/store";
import CheckOutForm from "../components/CheckOutForm";
import MobileOrderSummary from "../components/MobileOrderSummary";

export default function CheckoutPage() {

   const products = useCartState();
   const total = useAppSelector((state) => state.car.total);
   
   return (
      <>
         <main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse">
            <Navbar bgColor={"bg-white border-b"} />
            <h1 className="sr-only">Checkout</h1>

            {/* Mobile order summary */}
            <MobileOrderSummary />

            {/* Order summary */}
            <section 
               aria-labelledby="summary-heading"
               className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex mt-16"
            >
               <ul
                  className="overflow-y-auto divide-y divide-gray-200 px-6"
               >
                 {products.map((product) => (
                     <li key={product.id} className="flex py-6 space-x-6">
                        <img
                           src={`/images/${product.backgroundImg}`}
                           alt={product.title}
                           className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                        />
                        <div className="flex flex-col justify-between space-y-4">
                           <div className="text-sm font-medium space-y-1">
                              <h3 className="text-gray-900">{product.title}</h3>
                              <p className="text-gray-900">
                                 {" "}
                                 Price- $
                                 {new Intl.NumberFormat("en-IN").format(
                                    product.price
                                 )}
                              </p>
                              <p className="text-gray-500">
                                 {product.description
                                    .substring(0, 150)
                                    .concat("...")}
                              </p>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>

               <div className="bg-gray-50 border-solid border-t border-b border-gray-200 p-5">
                     <div className="flex items-center justify-between text-gray-900 pt-2">
                        <dt>Total</dt>
                        <dd className="text-base font-bold">
                           {" "}
                           ${new Intl.NumberFormat("en-IN").format(total)}
                        </dd>
                     </div>
               </div>
            </section>

            {/* CheckOut Form */}
            <div className="mx-auto mx-2 px-0  lg:max-w-[720px]">
            <CheckOutForm/>
            </div>
          

         </main>
      </>
   );
}
