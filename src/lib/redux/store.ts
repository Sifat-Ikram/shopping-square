import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
