import { createSlice } from "@reduxjs/toolkit";

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState: {
    activeTab: "lesson" || "discussion",
    lessionID: "",
    lessonProcess: {
      process: "",
    },
    forumID: 0,
  },
  reducers: {
    setActiveTabSlice: (state, action) => {
      state.activeTab = action.payload;
    },

    setLessonProcess: (state, action) => {},
    setForumID: (state, action) => {
      console.log(action.payload);
      state.forumID = action.payload;
    },
  },
});

export const { setActiveTabSlice, setLessonProcess, setForumID } =
  globalStateSlice.actions;
export default globalStateSlice.reducer;
