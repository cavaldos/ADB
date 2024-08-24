import { createSlice } from "@reduxjs/toolkit";

export const resetStateSlice = createSlice({
  name: "resetState",
  initialState: {
    state: true,
    lessonDragState: true,
    updateBankAccount: true,
  },
  reducers: {
    resetState: (state) => {
      state.state = !state.state;
    },
    resetStateLessonDrag: (state) => {
      state.lessonDragState = !state.lessonDragState;
    },
    resetStateUpdateBankAccount: (state) => {
      state.updateBankAccount = !state.updateBankAccount;
    },
  },
});

export const { resetState, resetStateLessonDrag, resetStateUpdateBankAccount } =
  resetStateSlice.actions;
export default resetStateSlice.reducer;
