import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisconnectModalOpen: false,
  isNetworkScreenRefresh: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setIsDisconnectModalOpen(state, action) {
      state.isDisconnectModalOpen = action.payload;
    },
    setIsNetworkScreenRefresh(state, action) {
      state.isNetworkScreenRefresh = action.payload;
    },
  },
});

export const { setIsDisconnectModalOpen, setIsNetworkScreenRefresh } =
  helperSlice.actions;
export default helperSlice.reducer;
