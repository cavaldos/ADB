import { createSlice } from "@reduxjs/toolkit";

export const resetStateSlice = createSlice({
  name: "resetState",
  initialState: {
    state: true,
  },
  reducers: {
    resetState: (state) => {
      state.state = !state.state;
    },
  },
});

export const { resetState } = resetStateSlice.actions;
export default resetStateSlice.reducer;
