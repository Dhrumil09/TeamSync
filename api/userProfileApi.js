import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
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
    updateAdminAccount: builder.mutation({
      query: (payload) => {
        return {
          url: `${endPoints.accounts}/${payload.accountId}`, // API endpoint
          method: "PATCH",
          body: payload?.data, // Fix: Send the data object directly instead of string
        };
      },
    }),
    getUserProfile: builder.mutation({
      query: (userId) => ({
        url: `${endPoints.userList}/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateAdminAccountMutation, useGetUserProfileMutation } =
  userProfileApi;
