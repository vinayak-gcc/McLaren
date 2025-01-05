import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDisplay from "./pages/CarDisplay";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Order from "./pages/Order";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "./features/User/userSlice";

function App() {

   const dispatch = useDispatch();

   useEffect(() => {
      const auth = getAuth();
   
      const UserData = onAuthStateChanged(auth, (user) => {
         const currentUser = auth.currentUser;
   
         if (user && (!currentUser || currentUser.uid !== user.uid)) {
            dispatch(setLogin({
               uid: user.uid,
               email: user.email,
               displayName: user.displayName,
               photoURL: user.photoURL,
            }));
         } else if (!user && currentUser) {
            dispatch(setLogout());
         }
      });
   
      return () => UserData();
   }, [dispatch]);
   
   

   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/cars/:id" element={<CarDisplay />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/orderpage" element={<Order />} />
         <Route path="/checkout" element={<Checkout/>} />
      </Routes>
   );
}

export default App;
