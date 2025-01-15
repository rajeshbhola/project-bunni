import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrderState {
  orders: Order[];
}

// Load orders from localStorage if they exist
const savedOrders = localStorage.getItem('orders');
const initialState: OrderState = {
  orders: savedOrders ? JSON.parse(savedOrders) : [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      // Save to localStorage
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;