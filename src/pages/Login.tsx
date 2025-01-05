/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, BaseSyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../features/User/userSlice";
import {
   getAuth,
   signInWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db, provider } from "../index";
import { useDispatch } from "react-redux";
export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigation = useNavigate();
   const dispatch = useDispatch();

   const auth = getAuth();
   const login = async (e: BaseSyntheticEvent) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {

            const user = userCredential.user;
            console.log(user);
            setDoc(
               doc(db, "users", user.uid),
               {
                  name: user.displayName,
                  email: user.email,
               },
               { merge: true }
            );

            dispatch(setLogin(user));
            navigation("/");

         })
         .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
         });
   };

   const loginWithGoogle = async () => {
      try {
         const result = await signInWithPopup(auth, provider);
   
         const credential = GoogleAuthProvider.credentialFromResult(result);
         if (!credential) return;
   
         const user = result.user;
   
         await dispatch(setLogin(user));
         console.log(user);
   
      } catch (error:any) {
         console.error("Google login error:", error.message);
      }
      navigation("/");
      window.location.reload();
   };
   

   return (
      <>
         <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <Link to="/">
                  <img src="/images/McLarenlogo.svg" alt="Logo" className="mx-auto w-32"></img>
               </Link>
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
               </h2>
               <div className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <Link to="/register">
                     <p className="font-medium text-indigo-600 hover:text-indigo-500">
                        create new account
                     </p>
                  </Link>
               </div>
            </div>

            <form
               className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
               onSubmit={login}
            >
               <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Email address
                        </label>
                        <div className="mt-1">
                           <input
                              id="email"
                              name="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="email"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Password
                        </label>
                        <div className="mt-1">
                           <input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="current-password"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                           />
                           <label
                              htmlFor="remember-me"
                              className="ml-2 block text-sm text-gray-900"
                           >
                              Remember me
                           </label>
                        </div>

                        <div className="text-sm">
                           <button
                              onClick={() => {/* handle forgot password */}}
                              className="font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none cursor-pointer"
                           >
                              Forgot your password?
                           </button>
                        </div>
                     </div>
                     <div>
                        <button
                           type="submit"
                           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Sign in
                        </button>
                     </div>
                  </div>

                  <div className="mt-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="px-2 bg-white text-gray-500">
                              Or continue with
                           </span>
                        </div>
                     </div>

                     <div className="mt-6">
                        <div>
                           <button
                              onClick={() => loginWithGoogle() }
                              className="w-full inline-flex justify-center  py-2 px-4 border border-gray-300 rounded-md shadow-sm
                               bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with Google
                              </span>
                              <FcGoogle className="h-8 w-8 " />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}
