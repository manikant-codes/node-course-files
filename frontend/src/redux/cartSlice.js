import { createSlice } from "@reduxjs/toolkit";
import { getDiscountedPrice } from "../helpers/priceHelper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    total: Number(localStorage.getItem("total")) || 0
  },
  reducers: {
    addToCart: (state, action) => {
      // Yaha action.payload me product ka object aaraha hai.
      state.cartItems.push(action.payload);
      state.total += getDiscountedPrice(
        action.payload.price,
        action.payload.taxPercentage,
        action.payload.discountPercentage
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total", state.total);
    },
    removeFromCart: (state, action) => {
      // Yaha action.payload me cartItems me product ka index aaraha hai.
      state.total -=
        getDiscountedPrice(
          state.cartItems[action.payload].price,
          state.cartItems[action.payload].taxPercentage,
          state.cartItems[action.payload].discountPercentage
        ) * state.cartItems[action.payload].quantity;
      state.cartItems.splice(action.payload, 1);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total", state.total);
    },
    increaseQuantity: (state, action) => {
      if (state.cartItems[action.payload].quantity < 10) {
        state.cartItems[action.payload].quantity++;
        state.total += getDiscountedPrice(
          state.cartItems[action.payload].price,
          state.cartItems[action.payload].taxPercentage,
          state.cartItems[action.payload].discountPercentage
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("total", state.total);
      }
    },
    decreaseQuantity: (state, action) => {
      if (state.cartItems[action.payload].quantity > 1) {
        state.cartItems[action.payload].quantity--;
        state.total -= getDiscountedPrice(
          state.cartItems[action.payload].price,
          state.cartItems[action.payload].taxPercentage,
          state.cartItems[action.payload].discountPercentage
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("total", state.total);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("total");
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
