import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user"))
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unSetUser: (state, action) => {
      state.user = null;
    }
  }
});

export const { setUser, unSetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
