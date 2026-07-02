import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const item = state.items.find((cartItem) => cartItem.name === plant.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
