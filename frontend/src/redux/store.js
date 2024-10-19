import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { userReducer } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  }
});

export default store;
