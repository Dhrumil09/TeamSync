// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const leadListSlice = createSlice({
  name: "leadList",
  initialState: {
    leads: [],
  },
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    updateLead: (state, action) => {
      const { leadId, updates } = action.payload;
      state.leads = state.leads.map((lead) =>
        lead.leadId === leadId ? { ...lead, ...updates } : lead
      );
    },
  },
});

export const { setLeads, updateLead } = leadListSlice.actions;
export default leadListSlice.reducer;
