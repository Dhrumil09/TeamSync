import { useUpdateAdminAccountMutation } from "../../../../api/userProfileApi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Alert } from "react-native";
import { setUserDetails } from "../../../../store/slices/userSlice";

const useManageProfile = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [updatedAccountName, setUpdatedAccountName] = useState(
    userDetails?.accountName
  );
  const [validationError, setValidationError] = useState("");
  const [updateAdminAccountAPI] = useUpdateAdminAccountMutation();
  const dispatch = useDispatch();

  // Reset function to sync with latest userDetails
  const resetAccountName = () => {
    setUpdatedAccountName(userDetails?.accountName);
  };

  const validateAccountName = (name) => {
    if (!name || name.trim().length === 0) {
      return "Account name cannot be empty";
    }
    if (name.trim().length < 3) {
      return "Account name must be at least 3 characters long";
    }
    if (name.trim().length > 50) {
      return "Account name cannot exceed 50 characters";
    }
    return "";
  };

  const updateAccountName = async () => {
    const error = validateAccountName(updatedAccountName);
    if (error) {
      setValidationError(error);
      return false;
    }

    try {
      const payload = {
        accountId: userDetails?.accountId,
        data: {
          accountName: updatedAccountName,
        },
      };
      console.log("Sending payload:", payload); // Debug log
      const response = await updateAdminAccountAPI(payload).unwrap();
      console.log("Response:", response); // Debug log
      if (response?.accountName) {
        // Fix: Update the state with a new object instead of a function
        dispatch(
          setUserDetails({
            ...userDetails,
            accountName: response.accountName,
          })
        );
      }
      Alert.alert("Success", "Account name updated successfully !!");
      resetAccountName(); // Sync state after successful update
      return true;
    } catch (error) {
      console.log("Error:", error); // Debug log
      const errorMessage =
        error?.data?.message ||
        error?.data?.detailMessage ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
      resetAccountName(); // Reset on error too
      return false;
    }
  };

  const handleInputChange = (text) => {
    setUpdatedAccountName(text);
    setValidationError(""); // Clear validation error when input changes
  };

  return {
    updatedAccountName,
    setUpdatedAccountName: handleInputChange,
    updateAccountName,
    resetAccountName,
    userDetails,
    validationError,
  };
};

export default useManageProfile;
