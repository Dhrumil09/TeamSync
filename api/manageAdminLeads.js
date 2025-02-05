import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const manageAdminLeadsProjectAPI = createApi({
  reducerPath: "manageAdminLeadsProjectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      const token = getState()?.user?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLeadList: builder.mutation({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `${endPoints.leadList}?${queryString}`,
          method: "GET",
        };
      },
    }),
    addLead: builder.mutation({
      query: (data) => {
        return {
          url: endPoints.leadList,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetLeadListMutation, useAddLeadMutation } =
  manageAdminLeadsProjectAPI;
