import React from "react";
import { useState, useEffect } from "react";
import {
  useGetUsersListMutation,
  useAddUserMutation,
} from "../../../../api/manageUsers";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

const useHandleUsers = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [users, setUsers] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    userName: "",
    emailId: "",
    status: "",
    role: "",
  });
  const [tempFilters, setTempFilters] = useState({
    userName: "",
    emailId: "",
    status: "",
    role: "",
  });
  const isAbleToAddUser =
    userDetails?.remainingUsersCreation > 0 ? true : false;

  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getUsersList] = useGetUsersListMutation();
  const [addUserApi] = useAddUserMutation();
  const fetchUsersList = async (params) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value != null && value !== ""
        )
      );
      console.log("Fetching users with params:", cleanParams);
      const res = await getUsersList(cleanParams).unwrap();
      return res;
    } catch (error) {
      console.log("Error fetching users:", error);
      return null;
    }
  };

  const loadMoreUsers = async () => {
    // Add check to prevent unnecessary API calls
    if (!hasMoreData || isLoadingMore || page >= lastPage - 1) return;

    try {
      setIsLoadingMore(true);
      const params = {
        accountId: userDetails.accountId,
        page: page + 1,
        ...filters,
        ...(searchText.length === 10 ? { phoneNumber: searchText } : {}),
      };

      const data = await fetchUsersList(params);
      if (data?.content?.length > 0) {
        setUsers((prev) => [...prev, ...data.content]);
        setPage(page + 1);
        // Update hasMoreData based on current page and total pages
        setHasMoreData(page + 1 < data.totalPages - 1);
      } else {
        // If no content returned, there's no more data
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Error loading more:", error);
      setHasMoreData(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const addUser = async (params) => {
    try {
      setIsAddLoading(true);
      const payload = {
        accountId: userDetails.accountId,
        ...params,
      };

      const res = await addUserApi(payload).unwrap();
      fetchUsersWithFilters(filters);
      return res;
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Something went wrong. Please try again!";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsAddLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = async (key) => {
    const newFilters = {
      ...filters,
      [key]: "",
    };
    setFilters(newFilters);
    setTempFilters(newFilters);
    await fetchUsersWithFilters(newFilters);
  };

  const applyFilters = async () => {
    setFilters(tempFilters);
    await fetchUsersWithFilters(tempFilters);
  };

  const clearAllFilters = async () => {
    const emptyFilters = {
      userName: "",
      emailId: "",
      status: "",
      role: "",
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);

    // Just fetch with accountId when clearing all filters
    const params = {
      accountId: userDetails.accountId,
      page: 0,
    };

    const data = await fetchUsersList(params);
    if (data?.content) {
      setUsers(data.content);
      setLastPage(data.totalPages || 0);
      setPage(0);
    }
  };

  const fetchUsersWithFilters = async (currentFilters) => {
    try {
      setIsLoading(true);
      const params = {
        accountId: userDetails.accountId,
        page: 0,
        ...currentFilters,
        ...(searchText.length === 10 ? { phoneNumber: searchText } : {}),
      };

      const data = await fetchUsersList(params);
      if (data?.content) {
        setUsers(data.content);
        setPage(0);
        setLastPage(data.totalPages || 0);
        // Update hasMoreData correctly when applying filters
        setHasMoreData(data.totalPages > 1);
      }
    } catch (error) {
      console.log("Error applying filters:", error);
      setHasMoreData(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch when searchText is empty or has exactly 10 digits
    if (searchText === "" || searchText.length === 10) {
      fetchUsersWithFilters(filters);
    }
  }, [searchText]);

  return {
    users,
    setUsers,
    addUser,
    loadMoreUsers,
    setSearchText,
    isAbleToAddUser,
    searchText,
    filters,
    tempFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    applyFilters,
    isLoading,
    isAddLoading,
    hasMoreData,
    isLoadingMore,
  };
};
export default useHandleUsers;
