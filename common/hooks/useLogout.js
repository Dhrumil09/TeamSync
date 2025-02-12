import { useDispatch } from "react-redux";
import { manageProjectsAPI } from "../../api/manageProjects";

import { logout } from "../../store/slices/userSlice";
import { useRouter } from "expo-router";

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear all API states
    dispatch(manageProjectsAPI.util.resetApiState());

    // Clear all store slices
    dispatch(logout());

    // Clear any persisted storage if needed
    // AsyncStorage.clear(); // Uncomment if using AsyncStorage

    // Navigate to login
    router.replace("/");
  };

  return handleLogout;
};

export default useLogout;
