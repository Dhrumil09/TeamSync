import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const userProjectApi = createApi({
  reducerPath: "userProjectApi",
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
    getUserProjects: builder.query({
      query: (params) => {
        console.log("params", params);
        return {
          url: `${endPoints.userProjects(params?.userId)}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUserProjectsQuery } = userProjectApi;
