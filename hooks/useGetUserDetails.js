import { useState } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserProfileMutation } from "../api/userProfileApi";
import { login } from "@/store/slices/userSlice";

const useGetUserDetails = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const [getUserProfile, { isLoading, error }] = useGetUserProfileMutation();

  const getUserDetails = async () => {
    try {
      const response = await getUserProfile(userDetails?.userId);
      if (response?.role === "ADMIN") {
        dispatch(
          login({
            userType: "admin",
            data: response,
          })
        );
      } else if (response?.role === "USER") {
        dispatch(
          login({
            userType: "user",
            data: response,
          })
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return {
    getUserDetails,
  };
};

export default useGetUserDetails;
