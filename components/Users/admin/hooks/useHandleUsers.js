import React from "react";
import { useState, useEffect } from "react";
import {
  useGetUsersListMutation,
  useAddUserMutation,
} from "../../../../api/manageUsers";
import { useSelector } from "react-redux";

const useHandleUsers = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [users, setUsers] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const isAbleToAddUser =
    userDetails?.remainingUsersCreation > 0 ? true : false;

  const [getUsersList] = useGetUsersListMutation();
  const [addUserApi] = useAddUserMutation();
  const fetchUsersList = async (params) => {
    try {
      const res = await getUsersList(params).unwrap();
      console.log("res", res);
      return res;
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
    }
  };

  const getUserList = async () => {
    const params = {
      accountId: userDetails.accountId,
      page: 0,
    };
    if (searchText) {
      params.userName = searchText;
    }
    const data = await fetchUsersList(params);
    if (data?.content) {
      setUsers(data.content || []);
    }
    if (data?.totalPages) {
      setLastPage(data.totalPages);
    }
    setPage(0);
  };

  const loadMoreUsers = async () => {
    const params = {
      accountId: userDetails.accountId,
      page: page + 1,
    };
    if (searchText) {
      params.userName = searchText;
    }
    if (page < lastPage) {
      const data = await fetchUsersList(params);
      setPage(page + 1);
      setUsers([...usersListData, ...data.content]);
    }
  };

  const addUser = async (params) => {
    try {
      const payload = {
        accountId: userDetails.accountId,
        ...params,
      };

      const res = await addUserApi(payload).unwrap();
      getUserList();
      return res;
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    getUserList();
  }, []);

  return {
    users,
    setUsers,
    addUser,
    loadMoreUsers,
    setSearchText,
    isAbleToAddUser,
  };
};
export default useHandleUsers;
