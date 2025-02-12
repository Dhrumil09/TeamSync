// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userDetails: null,
    userType: "",
    token: "",
    selectedProject: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userDetails = action.payload.data;
      state.userType = action.payload.userType;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.userType = "";
      state.token = "";
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setSelectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { login, logout, setToken, setUserDetails, setSelectProject } =
  userSlice.actions;
export default userSlice.reducer;
