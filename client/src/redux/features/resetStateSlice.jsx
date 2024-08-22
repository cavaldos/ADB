import { createSlice } from "@reduxjs/toolkit";

export const resetStateSlice = createSlice({
  name: "resetState",
  initialState: {
    state: true,
    lessonDragState: true,
  },
  reducers: {
    resetState: (state) => {
      state.state = !state.state;
    },
    resetStateLessonDrag: (state) => {
      state.lessonDragState = !state.lessonDragState;
    },
  },
});

export const { resetState, resetStateLessonDrag } = resetStateSlice.actions;
export default resetStateSlice.reducer;
