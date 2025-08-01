import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Checkout from "@/types/Checkout";
import Product from "@/types/Product";

interface CheckoutState {
  lastCheckout: Checkout | null;
}

const initialState: CheckoutState = {
  lastCheckout: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutItems(
      state,
      action: PayloadAction<(Product & { quantity: number })[]>
    ) {
      const total = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.lastCheckout = {
        items: action.payload,
        totalAmount: total,
        date: new Date().toISOString(),
      };
    },
    clearCheckout(state) {
      state.lastCheckout = null;
    },
  },
});

export const { checkoutItems, clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
