import { createSlice } from "@reduxjs/toolkit";

// export interface VW_Student {
//   UserID: number;
//   UserName: string;
//   Password: string;
//   Email: string;
//   FullName: string;
//   Phone: string;
//   Address: string;
//   Role: "Student";
//   CreatedTime: Date;
//   UpdateTime: Date;
//   //
//   StudentID: number;
//   SchoolYear: string;
//   Education: VW_Education[];
// }

export const studentSlice = createSlice({
  name: "student_info",
  initialState: {
    UserID: 0,
    UserName: "",
    Password: "",
    Email: "",
    FullName: "",
    Phone: "",
    Address: "",
    Role: "Student",
    CreatedTime: new Date(),
    UpdateTime: new Date(),
    //
    StudentID: 0,
    SchoolYear: "",
    Education: [],
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

export const {} = studentSlice.actions;
export default studentSlice.reducer;
