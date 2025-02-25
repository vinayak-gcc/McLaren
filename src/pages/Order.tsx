import React ,{useRef} from 'react';
import { useAppSelector , useCartState } from "../app/store";
import Navbar from "../components/Navbar";
import ShowConfetti from '../components/ShowConfetti';
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';


export default function Example() {
   const orders = useCartState();
   const total = useAppSelector((state) => state.car.total);
   const navigation = useNavigate();

   const contentRef = useRef<HTMLDivElement>(null);
  
   const downloadPDF = () => {
      html2canvas(contentRef.current!).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document
  
          // Calculate dimensions
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 295; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
          let heightLeft = imgHeight;
  
          let position = 0;
  
          // Add image to PDF
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
  
          // If the image height exceeds the page height, add a new page
          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
          }
  
          pdf.save('download.pdf'); 
      });
  };
  
  const now = new Date(); 

  // Get individual components
  const year = now.getFullYear(); 
  const month = now.getMonth() + 1; 
  const day = now.getDate(); 
  const hours = now.getHours(); 
  const minutes = now.getMinutes(); 
  const seconds = now.getSeconds(); 

  const OrderTime = `${hours}:${minutes}:${seconds}`;
  const OrderDate = `${day}/${month}/${year}`;
  

   return (
      <div className="bg-white overflow-hidden">
         
         {/* Show Confetti */}
         <div className="overflow-hidden">
         <ShowConfetti />
         </div>

         <Navbar bgColor={"bg-white border-b"}></Navbar>

         <div className="pt-16 md:pt-24">
            
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
               <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                  <div className='flex justify-between'>
                     <div className='flex flex-col'>
                        <h1 className="text-2xl mt-6 md:mt-0 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                         Order Placed!
                         </h1>
                        <p className="mt-2 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and
                        discover similar products.
                        </p>
                     </div>

                     {/* Home Button */}
                     <div>
                     <button
                         className="w-fit mt-6 sm:mt-6 md:mt-0.5 py-1 bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md sm:py-2 px-4 flex items-center 
                         justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
                          focus:ring-indigo-500"
                          onClick={() => navigation("/")}

                     >
                     Home
                     </button>
                     </div>

                  </div>
               </div>
            </div>

            <div className="mt-12 mx-1 sm:mx-0" ref={contentRef}>
               <h2 className="sr-only">Recent orders</h2>
               <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                  <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                     <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">

                        {/* Order no and Total Amount */}
                        <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-3 sm:gap-x-6">
                           <dl className="flex-1 grid grid-cols-1 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2 gap-y-4">
                              
                              {/* Order Number */}
                              <div>
                                 <dt className="font-medium text-gray-900">
                                    Order number
                                 </dt>
                                 <dd className="mt-1 text-gray-500">
                                    {orders.length}
                                 </dd>
                              </div>

                              {/* Total Amount */}
                              <div>
                                 <dt className="font-medium text-gray-900">
                                    Total amount
                                 </dt>
                                 <dd className="mt-1 font-medium text-gray-900">
                                    $
                                    {new Intl.NumberFormat("en-IN").format(   total )}
                                 </dd>
                              </div>
                              
                              {/* Order Date and Time */}
                              <div>
                                 <dt className="font-medium text-gray-900 ">
                                    Order Time
                                 </dt>
                                 <dd className="mt-1 text-gray-500">
                                    <p>
                                      {OrderTime} at {OrderDate}
                                    </p>
                                 </dd>
                              </div>


                           </dl>
                        </div>
                        
                        {/* Order Details*/}
                        <h4 className="sr-only">Items</h4>
                        <div className=''>
                        <ul className="divide-y divide-gray-200">
                           {orders.map((product) => (
                              <li key={product.id} className="p-4 sm:p-6">
                                 <div className="flex flex-col sm:flex-row items-center sm:items-start">

                                    {/* Order Page Car Image */}
                                    <div className="flex w-full h-full sm:w-40 sm:h-60 lg:h-40 mt-1 bg-gray-200 rounded-lg overflow-hidden ">
                                       <img
                                          src={`/images/${product.backgroundImg}`}
                                          alt={product.title}
                                          className="w-full h-full items-start object-center  object-cover"
                                       />
                                    </div>


                                    <div className="flex-1 ml-0 mt-2 sm:mt-0 sm:ml-6 text-sm">
                                       <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                          <h5 className='font-bold'>
                                             {product.title}
                                          </h5>
                                          <p className="mt-2 mb-2 sm:mt-0 sm:mb-0 font-bold">
                                             $
                                             {new Intl.NumberFormat(
                                                "en-IN"
                                             ).format(product.price)}
                                          </p>
                                       </div>
                                       <p className="text-gray-500 sm:block sm:mt-2">
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

                  
                  {/* Download PDF button */}
                  <div className='flex flex-col items-center justify-center my-6 sm:my-8 '>
                        <button
                        type='button'

                           onClick={   downloadPDF    }

                           id='Download-Button'

                           className="w-fit  items-center justify-center bg-indigo-600 border border-transparent rounded-md 
                           shadow-sm py-2 px-4 text-sm font-medium  text-white hover:bg-indigo-700  peer "

                           >
                           Download PDF

                        </button>

                           <p className='invisible peer-hover:visible w-fit sm:ml-0 sm:mb-0 items-center justify-center bg-orange-500 border border-transparent rounded-md 
                           shadow-sm py-2 px-4 text-sm font-medium  text-white -mt-24 absolute'>
                              Download ScreenShot as PDF
                           </p>

                        </div>


         </div>
      </div>
   );
}
