import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const manageUsersAPI = createApi({
  reducerPath: "manageUsersAPI",
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
    getUsersList: builder.mutation({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `${endPoints.userList}?${queryString}`,
          method: "GET",
        };
      },
    }),

    addUser: builder.mutation({
      query: (params) => ({
        url: endPoints.userList,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useGetUsersListMutation, useAddUserMutation } = manageUsersAPI;
