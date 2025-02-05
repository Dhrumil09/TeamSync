import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import API_BASE_URL from "../config/apiConfig";

const baseQuerySetup = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuerySetup(args, api, extraOptions);
  return result;
};
