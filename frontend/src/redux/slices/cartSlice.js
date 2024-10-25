import { createSlice } from "@reduxjs/toolkit";
import { getDiscountedPrice, getTax } from "../../helpers/priceHelper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shippingFee: 0,
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      let foundItemIndex;

      state.cartItems.forEach((cartItem, index) => {
        if (cartItem._id === action.payload._id) {
          foundItemIndex = index;
          return;
        }
      });

      if (typeof foundItemIndex === "number") {
        state.cartItems[foundItemIndex].qty++;
      } else {
        const product = { ...action.payload, qty: 1 };
        state.cartItems.push(product);
      }

      const discountedPrice = getDiscountedPrice(
        action.payload.price,
        action.payload.discountPercentage
      );
      const tax = getTax(action.payload.price, action.payload.taxPercentage);

      state.subTotal += discountedPrice;
      state.tax += tax;
      state.shippingFee += action.payload.shippingFee;
      state.total += discountedPrice + tax + action.payload.shippingFee;
    },
    removeFromCart: (state, action) => {
      state.subTotal -= getDiscountedPrice(
        state.cartItems[action.payload].price,
        state.cartItems[action.payload].discountPercentage
      );

      state.cartItems.splice(action.payload, 1);
    },
    increaseQty: (state, action) => {
      if (state.cartItems[action.payload].qty < 10) {
        state.cartItems[action.payload].qty++;
        state.subTotal += getDiscountedPrice(
          state.cartItems[action.payload].price,
          state.cartItems[action.payload].discountPercentage
        );
      }
    },
    decreaseQty: (state, action) => {
      if (state.cartItems[action.payload].qty > 1) {
        state.cartItems[action.payload].qty--;
        state.subTotal -= getDiscountedPrice(
          state.cartItems[action.payload].price,
          state.cartItems[action.payload].discountPercentage
        );
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
