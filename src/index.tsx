import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { PersistGate } from "redux-persist/integration/react";


const firebaseConfig = {
   apiKey: "AIzaSyB2PsGEQrQm7SgG7lTkA8TOmaCTghQ17os",
   authDomain: "mclaren-f5501.firebaseapp.com",
   projectId: "mclaren-f5501",
   storageBucket: "mclaren-f5501.firebasestorage.app",
   messagingSenderId: "678061707089",
   appId: "1:678061707089:web:a92d53b771f8c518ac4d70",
   measurementId: "G-5N99T47YZY"
 };

export const provider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

ReactDOM.render(
      <BrowserRouter>
         <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
         </Provider>
      </BrowserRouter>,
   document.getElementById("root")
);
