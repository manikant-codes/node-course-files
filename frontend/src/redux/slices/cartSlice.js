import { createSlice } from "@reduxjs/toolkit";
import { getDiscountedPrice, getTax } from "../../helpers/priceHelper";

function setPrice(state, payload, isRemove) {
  const { price, discountPercentage, taxPercentage, shippingFee } = payload;
  const discountedPrice = getDiscountedPrice(price, discountPercentage);
  const tax = getTax(discountedPrice, taxPercentage);

  if (isRemove) {
    state.subTotal -= discountedPrice;
    state.tax -= tax;
    state.shippingFee -= shippingFee;
    state.total -= discountedPrice + tax + shippingFee;
  } else {
    state.subTotal += discountedPrice;
    state.tax += tax;
    state.shippingFee += shippingFee;
    state.total += discountedPrice + tax + shippingFee;
  }
}

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

      setPrice(state, action.payload);
    },
    removeFromCart: (state, action) => {
      setPrice(state, state.cartItems[action.payload], true);
      state.cartItems.splice(action.payload, 1);
    },
    increaseQty: (state, action) => {
      if (state.cartItems[action.payload].qty < 10) {
        state.cartItems[action.payload].qty++;
        setPrice(state, state.cartItems[action.payload]);
      }
    },
    decreaseQty: (state, action) => {
      if (state.cartItems[action.payload].qty > 1) {
        state.cartItems[action.payload].qty--;
        setPrice(state, state.cartItems[action.payload], true);
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
