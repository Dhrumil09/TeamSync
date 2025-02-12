import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";

export const signUpAPI = createApi({
  reducerPath: "signUpAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUpApi: builder.mutation({
      query: (payload) => {
        return {
          url: endPoints.signUp,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useSignUpApiMutation } = signUpAPI;
