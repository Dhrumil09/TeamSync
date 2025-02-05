import { useSelector } from "react-redux";
import {
  useListProjectsApiQuery,
  useCreateUpdateProjectApiMutation,
  useGetProjectStatusListApiQuery,
  useAssignProjectApiMutation,
} from "../../../../api/manageProjects";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useManageProject = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const isAbleToAddProject =
    userDetails?.remainingProjectsCreation > 0 ? true : false;
  const {
    data,
    error,
    isLoading,
    refetch: refetchProjects,
  } = useListProjectsApiQuery(userDetails.accountId);
  const [assignProjectAPI] = useAssignProjectApiMutation();
  const accountName = userDetails?.accountName;
  const { data: projectStatusListData } = useGetProjectStatusListApiQuery();
  const [createUpdateProjectAPI, { isLoading: addProjectLoading }] =
    useCreateUpdateProjectApiMutation();

  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = async (projectData) => {
    try {
      let payload = {};
      if (projectData?.projectId) {
        payload = {
          projectName: projectData?.name,
          accountId: userDetails.accountId,
          projectId: projectData?.projectId,
          status: projectData?.status,
        };
      } else {
        payload = {
          projectName: projectData?.name,
          accountId: userDetails.accountId,
        };
      }
      const res = await createUpdateProjectAPI(payload).unwrap();
    } catch (error) {
      // Handle API errors
      console.log("Login Error:", error);

      // Show a user-friendly message
      const errorMessage =
        error?.data?.message ||
        error?.data?.detailMessage ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  const addUserToProject = async ({ userIds }) => {
    try {
      const userIdsString = userIds.join(",");
      const payload = {
        projectId: selectedProject,
        params: { userId: userIdsString },
      };
      const res = await assignProjectAPI(payload).unwrap();
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.data?.detailMessage ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  return {
    projectListData: data,
    isLoading,
    isAbleToAddProject,
    addProject,
    projectStatusListData,
    accountName,
    setSelectedProject,
    addUserToProject,
  };
};

export default useManageProject;
