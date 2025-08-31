import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';



export const cartSlice = createSlice({
  name: 'cartData',
  initialState: {
    items: []
  },
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1; // increase quantity if already in cart
      } else {
        state.items.push({ ...item, quantity: 1 }); // add new item
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearAllCartItems: (state) => {
      state.items = [];
    },

    incrementQty: (state, action) => {

      const item = state.items.find((i) => i.id == action.payload)
      if (item) {

        item.quantity += 1
      }
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id == action.payload)
      if (item) {
        item.quantity > 1 ? item.quantity -= 1 : (state.items = state.items.filter((i) => i.id !== action.payload))
      }

    },





  }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, incrementQty, decrementQty, clearAllCartItems } = cartSlice.actions



// Selector function 
export const selectCartTotals = (state) => {
  const itemTotal = state.cartData.items.reduce(
    (total, item) => total + (item.price * item.quantity),0);
  const deliveryFee = itemTotal >= 500 ? 0 : 50;
  const subTotal = itemTotal + deliveryFee;

  return { itemTotal, deliveryFee, subTotal };
};


export default cartSlice.reducer