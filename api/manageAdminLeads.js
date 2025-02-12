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
    fetchLead: builder.mutation({
      query: (id) => {
        return {
          url: `${endPoints.leadList}/${id}`,
          method: "GET",
        };
      },
    }),
    updateLeadRating: builder.mutation({
      query: (data) => {
        return {
          url: `${endPoints.leadList}/${data.id}/rating?rating=${data.rating}`,
          method: "PATCH",
        };
      },
    }),
    fetchLeadStatus: builder.query({
      query: () => {
        return {
          url: endPoints.leadStatus,
          method: "GET",
        };
      },
    }),
    updateLeadNote: builder.mutation({
      query: (data) => {
        return {
          url: `${endPoints.leadList}/${data.id}/notes?note=${data.note}`,
          method: "PATCH",
        };
      },
    }),
    updateLeadStatus: builder.mutation({
      query: (data) => {
        return {
          url: `${endPoints.leadList}/${data.id}/status?status=${data.status}`,
          method: "PATCH",
        };
      },
    }),
    assignUserToLead: builder.mutation({
      query: (data) => {
        return {
          url: `${endPoints.leadList}/${data.id}/assign`,
          method: "PATCH",
          body: { assignedToUserId: data.userId },
        };
      },
    }),

    importLeads: builder.mutation({
      query: (formData) => {
        return {
          url: endPoints.importLeads,
          method: "POST",
          body: formData,
          // Don't set Content-Type header, it will be set automatically for FormData
          formData: true,
          prepareHeaders: (headers) => {
            // Remove Content-Type header to let browser set it with boundary
            headers.delete("Content-Type");
            return headers;
          },
        };
      },
    }),
  }),
});

export const {
  useGetLeadListMutation,
  useAddLeadMutation,
  useFetchLeadMutation,
  useUpdateLeadNoteMutation,
  useUpdateLeadRatingMutation,
  useUpdateLeadStatusMutation,
  useFetchLeadStatusQuery,
  useAssignUserToLeadMutation,
  useImportLeadsMutation,
} = manageAdminLeadsProjectAPI;
