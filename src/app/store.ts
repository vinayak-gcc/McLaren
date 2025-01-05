import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import { carsData } from "../carsData";
import carReducer from "../features/Car/carSlice";
import userReducer from "../features/User/userSlice";

const userPersistConfig = {
   key: "user",
   storage, 
};

const carPersistConfig = {
   key: "car",
   storage, 
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCarReducer = persistReducer(carPersistConfig, carReducer);

export const store = configureStore({
   reducer: {
      car: persistedCarReducer,
      user: persistedUserReducer, 
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            // Ignore these field paths in all actions
            ignoredActionPaths: ["payload.ref"],
            // Ignore these paths in the state
            ignoredPaths: [
               ...carsData.map((_, index) => {
                  return `car.cars.${index}.ref`;
               }),
            ],
         },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
