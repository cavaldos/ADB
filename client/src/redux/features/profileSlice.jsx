import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    UserID: 0,
    UserName: "",
    FullName: "",
    Password: "",
    Email: "",
    Phone: "",
    Address: "",
    Role: "Guest",
    CreatedTime: new Date(),
    UpdateTime: new Date(),
    InstructorID: 0,
    AdminID: 0,
    StudentID: 0,
    Level: "",
    Status: "",
    Certificates: [],
    Education: [],
    Company: [],
  },
  reducers: {
    login: (state, action) => {
      state.UserID = 0;
      state.UserName = "";
      state.FullName = "";
      state.Password = "";
      state.Email = "";
      state.Phone = "";
      state.Address = "";
      state.Role = "Guest";
      state.CreatedTime = new Date();
      state.UpdateTime = new Date();
      state.InstructorID = 0;
      state.AdminID = 0;
      state.StudentID = 0;
      state.Level = "";
      state.Status = "";
      state.Certificates = [];
      state.Education = [];
      state.Company = [];

      // Lưu thông tin mới từ action.payload
      state.UserID = action.payload.UserID;
      state.UserName = action.payload.UserName;
      state.FullName = action.payload.FullName;
      state.Password = action.payload.Password;
      state.Email = action.payload.Email;
      state.Phone = action.payload.Phone;
      state.Address = action.payload.Address;
      state.Role = action.payload.Role;
      state.CreatedTime = new Date(action.payload.CreatedTime);
      state.UpdateTime = new Date(action.payload.UpdateTime);
      state.InstructorID = action.payload.InstructorID;
      state.AdminID = action.payload.AdminID || 0;
      state.StudentID = action.payload.StudentID || 0;
      state.Level = action.payload.Level;
      state.Status = action.payload.Status;
      state.Certificates = action.payload.Certificates || [];
      state.Education = action.payload.Education || [];
      state.Company = action.payload.Company || [];
    },
    logout: (state) => {
      state.UserID = 0;
      state.UserName = "";
      state.FullName = "";
      state.Password = "";
      state.Email = "";
      state.Phone = "";
      state.Address = "";
      state.Role = "Guest";
      state.CreatedTime = new Date();
      state.UpdateTime = new Date();
      state.InstructorID = 0;
      state.AdminID = 0;
      state.StudentID = 0;
      state.Level = "";
      state.Status = "";
      state.Certificates = [];
      state.Education = [];
      state.Company = [];
    },
  },
});

export const { login, logout } = profileSlice.actions;
export default profileSlice.reducer;
