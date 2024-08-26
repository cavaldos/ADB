import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "auth",
  initialState: {
    user: "guest",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "guest";
    },
    setRole: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setRole } = cartSlice.actions;
export default cartSlice.reducer;
