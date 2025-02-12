import { useGetUserProjectsQuery } from "../../../../api/userProjectApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectProject } from "../../../../store/slices/userSlice";
const useManageDashboard = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const selectedProject = useSelector((state) => state.user.selectedProject);
  console.log("userDetails 23", userDetails, userDetails?.userId);
  const { data, isLoading, isError } = useGetUserProjectsQuery({
    userId: userDetails?.userId,
  });

  const dispatch = useDispatch();
  const setSelectedProject = (selectedItem) => {
    dispatch(setSelectProject(selectedItem));
  };
  return {
    projectData: data,
    isLoading,
    isError,
    userDetails,
    selectedProject,
    setSelectedProject,
  };
};
export default useManageDashboard;
