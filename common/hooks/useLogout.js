import { useDispatch } from "react-redux";
import { manageProjectsAPI } from "../../api/manageProjects";
import { logout } from "../../store/slices/userSlice";
import { useRouter } from "expo-router";

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(manageProjectsAPI.util.resetApiState());
    dispatch(logout());
    router.replace("/"); // Redirect to the index page
  };

  return handleLogout;
};

export default useLogout;
