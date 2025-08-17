import React, { useEffect, useRef, ReactNode } from "react";
import styled from "styled-components";
import { Fade, FadeProps } from "react-awesome-reveal";
import { setCarRef } from "../features/Car/carSlice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/store";

interface SectionInterface {
   id: number;
   title: string;
   backgroundImg: string;
   heading: string;
   homeRef: React.RefObject<HTMLDivElement>;
}

interface FadeWrapperProps extends FadeProps {
   children: ReactNode;
 }
 
 const FadeWrapper = ({ children, ...props }: FadeWrapperProps) => (
   <Fade {...props}>{children}</Fade>
 );

function Section(props: SectionInterface) {
   let myRef = useRef<HTMLDivElement>(null);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (myRef.current) {
         dispatch(setCarRef({ id: props.id, ref: myRef }));
      }
   }, [dispatch, props.id]);

   return (
      <Wrap ref={myRef} as="div" bgImage={props.backgroundImg}>
         <FadeWrapper>
            <ItemSet>
               <h1 className="text-4xl font-bold text-black">{props.title}</h1>
               <p className="font-lg text-black font-medium">{props.heading}</p>
            </ItemSet>
         </FadeWrapper>
         <Buttons>
            <FadeWrapper>
               <ButtonGroup>
                  <Link to={`/cars/${props.id}`}>
                     <LeftButton as="div" className=" hover:animate-bounce ">
                        <p className="text-white">Order</p>
                     </LeftButton>
                  </Link>
                  <Link to="/cart">
                     <RightButton as="div" className="hover:animate-bounce flex basis-0">
                        <p className="font-semibold">Inventory</p>
                     </RightButton>
                  </Link>
               </ButtonGroup>
            </FadeWrapper>

         </Buttons>
      </Wrap>
   );
}

export default Section;

const Wrap = styled.div`
   scroll-snap-align: start;
   height: 100vh;
   background-position: center;
   background-size: cover;
   background-repeat: no-repeat;
   background-image: ${(props: { bgImage: string }) =>
      `url("images/${props.bgImage}")`};
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
`;

const ItemSet = styled.div`
   padding-top: 15vh;
   test-align: center;
`;

const ButtonGroup = styled.div`
   display: flex;
   margin-bottom: 30px;
   @media (max-width: 768px) {
      flex-direction: column;
   }
`;

const LeftButton = styled.div`
   background-color: rgba(23, 26, 32, 0.8);
   height: 40px;
   width: 256px;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 100px;
   opacity: 0.85;
   text-transform: uppercase;
   font-size: 12px;
   cursor: pointer;
   margin: 8px;
`;

const RightButton = styled(LeftButton)`
   background: white;
   opacity: 0.65;
   color: black;
`;



const Buttons = styled.div``;
