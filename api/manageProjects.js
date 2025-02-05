import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../config/apiConfig";
import endPoints from "./endPoints";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const manageProjectsAPI = createApi({
  reducerPath: "manageProjectsAPI",
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
  tagTypes: ["listProjectsApi"],
  endpoints: (builder) => ({
    listProjectsApi: builder.query({
      query: (accountId) => {
        return {
          url: endPoints.listProjects(accountId), // API endpoint
          method: "GET",
        };
      },
      providesTags: ["listProjectsApi"],
    }),
    getProjectStatusListApi: builder.query({
      query: () => {
        return {
          url: endPoints.projectStatusList, // API endpoint
          method: "GET",
        };
      },
    }),

    createUpdateProjectApi: builder.mutation({
      query: (data) => {
        return {
          url: endPoints.createUpdateProject, // API endpoint
          method: data?.projectId ? "PATCH" : "POST",
          body: data,
        };
      },
      invalidatesTags: ["listProjectsApi"],
    }),
    assignProjectApi: builder.mutation({
      query: (data) => {
        const queryString = new URLSearchParams(data?.params).toString();
        return {
          url: `${endPoints.assignProject(data?.projectId)}?${queryString}`, // API endpoint
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useListProjectsApiQuery,
  useCreateUpdateProjectApiMutation,
  useGetProjectStatusListApiQuery,
  useAssignProjectApiMutation,
} = manageProjectsAPI;
