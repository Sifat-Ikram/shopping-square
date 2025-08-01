// store/orderSlice.ts
import Order from "@/types/Order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    deleteOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { placeOrder, deleteOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
