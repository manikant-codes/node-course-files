import { createSlice } from "@reduxjs/toolkit";
import { getDiscountedPrice } from "../../helpers/priceHelper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const product = { ...action.payload, qty: 1 };
      state.cartItems.push(product);
      state.total += getDiscountedPrice(
        product.price,
        product.discountPercentage
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    increaseQty: (state, action) => {},
    decreaseQty: (state, action) => {}
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
