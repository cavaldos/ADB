import { createSlice } from "@reduxjs/toolkit";

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState: {
    activeTab: "lesson" || "discussion",
    lessionID: "",
    lessonProcess: {
      process: "",
    },
  },
  reducers: {
    setActiveTabSlice: (state, action) => {
      state.activeTab = action.payload;
    },

    setLessonProcess: (state, action) => {},
  },
});

export const { setActiveTabSlice, setLessonProcess } = globalStateSlice.actions;
export default globalStateSlice.reducer;
