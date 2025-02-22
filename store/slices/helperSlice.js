import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisconnectModalOpen: false,
  isNetworkScreenRefresh: false,
  shareLeadFilterProject: {},
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
    setShareLeadFilterProject(state, action) {
      state.shareLeadFilterProject = action.payload;
    },
  },
});

export const {
  setIsDisconnectModalOpen,
  setIsNetworkScreenRefresh,
  setShareLeadFilterProject,
} = helperSlice.actions;
export default helperSlice.reducer;
