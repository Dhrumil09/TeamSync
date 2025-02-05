import { useRouter } from "expo-router"; // Import from expo-router
// import loginAuthentication from '../../auth/loginAuthentication';  // Your login logic

const useSessionExpire = () => {
  const router = useRouter(); // Initialize Expo Router

  const handleSessionExpire = () => {
    // loginAuthentication?.clearToken();  // Clear session or token
    router.push("/login"); // Navigate to the Login screen using Expo Router
  };

  return handleSessionExpire;
};

export default useSessionExpire;
