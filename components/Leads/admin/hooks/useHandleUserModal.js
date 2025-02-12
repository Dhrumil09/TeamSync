import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { useGetUsersListMutation } from "../../../../api/manageUsers";
import { useSelector } from "react-redux";

const useHandleUserModal = () => {
  const [getUsersList] = useGetUsersListMutation();
  const [usersListData, setUsersListData] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const userDetails = useSelector((state) => state.user.userDetails);

  const accountId = userDetails?.accountId;

  const fetchUsersList = async (params) => {
    try {
      const res = await getUsersList(params).unwrap();
      return res;
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
    }
  };

  const getUserList = async () => {
    const params = {
      accountId: accountId,
      page: 0,
    };
    if (searchText) {
      params.userName = searchText;
    }
    const data = await fetchUsersList(params);
    if (data?.content) {
      setUsersListData(data.content || []);
    }
    if (data?.totalPages) {
      setLastPage(data.totalPages);
    }
    setPage(0);
  };

  const loadMoreUsers = async () => {
    const params = {
      accountId,
      page: page + 1,
    };
    if (searchText) {
      params.userName = searchText;
    }
    if (page + 1 < lastPage) {
      const data = await fetchUsersList(params);
      setPage(page + 1);
      setUsersListData([...usersListData, ...data.content]);
    }
  };

  const debouncedGetUserList = debounce(getUserList, 300);

  useEffect(() => {
    debouncedGetUserList();
    return () => {
      debouncedGetUserList.cancel();
    };
  }, [searchText]);

  return {
    usersListData,
    getUserList,
    loadMoreUsers,
    searchText,
    setSearchText,
  };
};

export default useHandleUserModal;
