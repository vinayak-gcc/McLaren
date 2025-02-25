import React, { useState, useEffect } from 'react';
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const ShowConfetti = () => {

    const { width, height } = useWindowSize();

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    
        useEffect(() => {
            setShow1(true); 
            const timer = setTimeout(() => {
                setShow1(false); 
            }, 2600);
    
            return () => clearTimeout(timer); 
         }, []);
  
    
        useEffect(() => {

            setShow2(true); 
            const timer = setTimeout(() => {
            setShow2(false); 
        }, 4000);
  
         return () => clearTimeout(timer); 
         }, []);
  
        useEffect(() => {

         setShow3(true); 
            const timer = setTimeout(() => {
            setShow3(false); 
            }, 6000);
  
        return () => clearTimeout(timer); 
        }, []);
  
    
        useEffect(() => {

      setShow4(true); 
        const timer = setTimeout(() => {
          setShow4(false); 
        }, 8000);
  
        return () => clearTimeout(timer); 
        }, []);

  return (
    <>
      
    {/*Show 1st Confetti  */}
      { show1 && <Confetti
            className="overflow-hidden"
            width={width }
            height={height }
            gravity={0.2}
            numberOfPieces={120}
         />
      }

    {/*Show 2nd Confetti  */}
      { show2 && <Confetti
            className="overflow-hidden"
            width={width }
            height={height }
            gravity={0.2}
            numberOfPieces={100}
         />
        }

    {/*Show 3rd Confetti  */}
      { show3 && <Confetti
            className="overflow-hidden"
            width={width }
            height={height }
            gravity={0.2}
            numberOfPieces={40}
         />
        }

    {/*Show 4th Confetti  */}
      { show4 && <Confetti
            className="overflow-hidden"
            width={width }
            height={height }
            gravity={0.2}
            numberOfPieces={20}
         />
      }

    </>
  )
}

export default ShowConfetti
