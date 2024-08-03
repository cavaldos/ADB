import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk để lấy thông tin người dùng từ API
export const fetchUserInfo = createAsyncThunk(
  "admin_info/fetchUserInfo",
  async ({ username, password }) => {
    const response = await axios.post("/api/login", {
      username,
      password,
    });
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: "admin_info",
  initialState: {
    UserID: 0,
    UserName: "",
    Password: "",
    Email: "",
    FullName: "",
    Phone: "",
    Address: "",
    Role: "Admin",
    CreatedTime: new Date(),
    UpdateTime: new Date(),
    AdminID: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.UserID = 0;
      state.UserName = "";
      state.Password = "";
      state.Email = "";
      state.FullName = "";
      state.Phone = "";
      state.Address = "";
      state.Role = "Admin";
      state.CreatedTime = new Date();
      state.UpdateTime = new Date();
      state.AdminID = 0;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.UserID = action.payload.UserID;
        state.UserName = action.payload.UserName;
        state.Password = action.payload.Password;
        state.Email = action.payload.Email;
        state.FullName = action.payload.FullName;
        state.Phone = action.payload.Phone;
        state.Address = action.payload.Address;
        state.Role = action.payload.Role;
        state.CreatedTime = new Date(action.payload.CreatedTime);
        state.UpdateTime = new Date(action.payload.UpdateTime);
        state.AdminID = action.payload.AdminID;
        state.status = "succeeded";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;



  // const handleLogin = () => {
  //   dispatch(fetchUserInfo({ username, password }));
  // };