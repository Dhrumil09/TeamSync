import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "multipart/form-data"); // Required for FormData
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        // Convert `credentials` object to `FormData`
        const formData = new FormData();
        Object.keys(credentials).forEach((key) => {
          formData.append(key, credentials[key]);
        });

        return {
          url: "/login", // API endpoint
          method: "POST",
          body: formData, // Use FormData as body
        };
      },
    }),
    updateAdminAccount: builder.mutation({
      query: (payload) => {
        return {
          url: `${endPoints.accounts}/${payload.accountId}`, // API endpoint
          method: "PATCH",
          body: payload?.data, // Fix: Send the data object directly instead of string
          headers: {
            "Content-Type": "application/json", // Add proper content type
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useUpdateAdminAccountMutation } = loginAPI;
