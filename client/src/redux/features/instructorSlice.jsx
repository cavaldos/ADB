import { createSlice } from "@reduxjs/toolkit";


// export interface VW_Instructor {
//   UserID: number;
//   UserName: string;
//   Password: string;
//   Email: string;
//   FullName: string;
//   Phone: string;
//   Address: string;
//   Role: "Instructor";
//   CreatedTime: Date;
//   UpdateTime: Date;
//   //
//   InstructorID: number;
//   Level: "Beginner" | "Intermediate" | "Advanced";
//   Status: "Pending" | "Done";
//   Company: VW_Company[];
//   Certificate: VW_Certificate[];
//   Education: VW_Education[];
// }


export const instructorSlice = createSlice({
  name: "admin_info",
  initialState: {
    UserID: 0,
    UserName: "",
    Password: "",
    Email: "",
    FullName: "",
    Phone: "",
    Address: "",
    Role: "Instructor",
    CreatedTime: new Date(),
    UpdateTime: new Date(),
    //
    InstructorID: 0,
    Level: "Beginner",
    Status: "Pending",
    Company: [],
    Certificate: [],
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

export const {} = instructorSlice.actions;
export default instructorSlice.reducer;
