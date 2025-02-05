// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userDetails: null,
    userType: "",
    token: "",
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken } = userSlice.actions;
export default userSlice.reducer;
