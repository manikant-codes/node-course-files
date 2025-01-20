import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subTotal: 0,
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {},
    increaseQuantity: (state, action) => {},
    decreaseQuantity: (state, action) => {}
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
