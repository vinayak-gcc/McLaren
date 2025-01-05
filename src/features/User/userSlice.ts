import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import {  useAppSelector } from "../../app/store";

interface UserState {
   user: User | null;
   isLoggedIn: boolean;
}

const initialState: UserState = {
   user: null,
   isLoggedIn: false,
};


export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setLogin: (state, action) => {
         console.log("Logging in:", action.payload); 
         state.isLoggedIn = true;
         state.user = action.payload;
      },
      setLogout: (state) => {
         console.log("Logging out..."); 
         state.isLoggedIn = false;
         state.user = null;
      },
   },
});


export const { setLogin, setLogout } = userSlice.actions;
export const useUserData = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
