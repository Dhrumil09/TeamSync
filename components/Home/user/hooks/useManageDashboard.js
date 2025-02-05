import { useGetUserProjectsQuery } from "../../../../api/userProjectApi";
import { useSelector } from "react-redux";

const useManageDashboard = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  console.log("userDetails 23", userDetails, userDetails?.userId);
  const { data, isLoading, isError } = useGetUserProjectsQuery({
    userId: userDetails?.userId,
  });

  return {
    projectData: data,
    isLoading,
    isError,
    userDetails,
  };
};
export default useManageDashboard;
