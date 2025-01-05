import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState} from "../../app/store";
import { carsData } from "../../carsData";

interface CarState {
   cars: Car[];
   cart: Car[];
   total: number;
}

type Car = {
   id: number;
   title: string;
   inStock: boolean;
   description: string;
   backgroundImg: string;
   heading: string;
   ref: any;
   price: number;
   highlights: string[];
   quantity: number;
};

const initialState: CarState = {
   cars: [...carsData],
   cart: [],
   total: 0,
};

export const carSlice = createSlice({
   name: "car",
   initialState,
   reducers: {
      setTotal: (state, action: PayloadAction<number>) => {
         state.total = action.payload;
      },

      setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
         const car = state.cart.find(item => item.id === action.payload.id);
         if (car) {
            car.quantity = action.payload.quantity;
         }
      },

      setCarRef: (state, action: PayloadAction<{ id: number; ref: any }>) => {
         const car = state.cars.find(item => item.id === action.payload.id);
         if (car) {
            car.ref = action.payload.ref.current;
         }
      },

      addToCart: (state, action: PayloadAction<number>) => {
         const existingCar = state.cart.find(item => item.id === action.payload);
         if (!existingCar) {
            const carToAdd = state.cars.find(item => item.id === action.payload);
            if (carToAdd) {
               state.cart.push(carToAdd);
            }
         }
      },

      removeFromCart: (state, action: PayloadAction<number>) => {
         state.cart = state.cart.filter(item => item.id !== action.payload);
      },
   },
});

export const { setCarRef, addToCart, removeFromCart, setTotal, setQuantity } =
   carSlice.actions;

export const selectCars = (state: RootState) => state.car.cars || [];

export default carSlice.reducer;
