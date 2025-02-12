import { useSelector } from "react-redux";
import {
  useGetLeadListMutation,
  useAddLeadMutation,
  useAssignUserToLeadMutation,
} from "../../../../api/manageAdminLeads";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import debounce from "lodash.debounce";
import { useListProjectsApiQuery } from "../../../../api/manageProjects";
import { FontAwesome } from "@expo/vector-icons";
import { useFetchLeadStatusQuery } from "../../../../api/manageAdminLeads";
import { use } from "react";

const useManageLeads = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const selectedProject = useSelector((state) => state.user.selectedProject);
  const [getLeadList, { isLoading }] = useGetLeadListMutation();
  const [addLeadApi, { isLoading: isAddLeadLoading }] = useAddLeadMutation();
  const { data: leadStatus } = useFetchLeadStatusQuery();

  const [assignUserToLead, { isLoading: assignUserLoading }] =
    useAssignUserToLeadMutation();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [leads, setLeads] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [activeTab, setActiveTab] = useState("manual");
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [userModalVisible, setUserModalVisible] = useState(false);
  const { data: projectsData } = useListProjectsApiQuery(userDetails.accountId);
  const [filters, setFilters] = useState({
    emailId: "",
    leadStatus: "",
    rating: "",
    assignedTo: userDetails?.userName, // Remove projectId
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFilterProject, setSelectedFilterProject] = useState(null);
  const [tempFilters, setTempFilters] = useState({
    emailId: "",
    leadStatus: "",
    rating: "",
    assignedTo: userDetails?.userName, // Remove projectId
  });

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
    await refetchLeadsWithFilters(newFilters);
  };

  const applyFilters = async () => {
    setFilters(tempFilters);
    await refetchLeadsWithFilters(tempFilters);
    closeFilterModal();
  };

  const clearAllFilters = async () => {
    const emptyFilters = {
      emailId: "",
      leadStatus: "",
      rating: "",
      assignedTo: "", // Remove projectId
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSelectedFilterProject(null);
    setSelectedStatus(null);
    await refetchLeadsWithFilters(emptyFilters);
  };

  const refetchLeadsWithFilters = async (currentFilters) => {
    const transformedFilters = { ...currentFilters };

    // Transform assignedTo from username to userId if it matches current user
    if (transformedFilters.assignedTo === userDetails?.userName) {
      transformedFilters.assignedTo = userDetails?.userId;
    }

    const params = {
      accountId: userDetails.accountId,
      page: 0,
      projectId: selectedProject?.projectId,
      ...Object.fromEntries(
        Object.entries(transformedFilters).filter(([_, value]) => value !== "")
      ),
      ...(searchText.length === 10 ? { phoneNumber: searchText } : {}),
    };

    try {
      const data = await getLeadList(params).unwrap();
      if (data?.content) {
        setLeads(data.content || []);
      }
      if (data?.totalPages) {
        setLastPage(data.totalPages);
      }
      setPage(0);
    } catch (error) {
      console.log("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if (selectedProject?.projectId) {
      const params = {
        accountId: userDetails.accountId,
        projectId: selectedProject.projectId,
        page: 0,
      };
      fetchLeads(params);
    }
  }, [selectedProject]);

  const fetchLeads = async (params) => {
    try {
      const filterParams = {
        ...params,
        projectId: selectedProject?.projectId, // Add projectId to filter params
        ...(searchText.length === 10 ? { phoneNumber: searchText } : {}),
        ...Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value !== "")
        ),
        ...(filters.assignedTo === userDetails?.userName
          ? { assignedTo: userDetails?.userId }
          : {}),
      };
      const res = await getLeadList(filterParams).unwrap();
      if (res?.content) {
        setLeads(res.content || []);
      }
      if (res?.totalPages) {
        setLastPage(res.totalPages);
      }
      setPage(0);
      return res;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchNextPage = async () => {
    if (page + 1 < lastPage) {
      const params = {
        accountId: userDetails.accountId,
        page: page + 1,
      };
      const data = await fetchLeads(params);
      setPage(page + 1);
      setLeads([...leads, ...data.content]);
    }
  };

  const refetchLeads = async () => {
    const params = {
      accountId: userDetails.accountId,
      page: 0,
    };
    const data = await fetchLeads(params);
    if (data?.content) {
      setLeads(data.content || []);
    }
    if (data?.totalPages) {
      setLastPage(data.totalPages);
    }
    setPage(0);
  };

  const debouncedRefetchLeads = debounce(refetchLeads, 300);

  useEffect(() => {
    if (searchText === "" || searchText.length === 10) {
      debouncedRefetchLeads();
    }
    return () => {
      debouncedRefetchLeads.cancel();
    };
  }, [searchText]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setLeadName("");
    setPhoneNumber("");
    setEmailId("");
    setSelectedFile(null);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setLeadName("");
    setPhoneNumber("");
    setEmailId("");
    setSelectedFile(null);
  };

  const validateLeadDetails = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(leadName)) {
      Alert.alert("Error", "Please enter a valid lead name.");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!emailRegex.test(emailId)) {
      Alert.alert("Error", "Please enter a valid email ID.");
      return false;
    }
    return true;
  };

  const chooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (result.type === "success") {
        setSelectedFile(result);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick the file.");
    }
  };

  const uploadFile = () => {
    if (selectedFile) {
      closeModal();
    } else {
      Alert.alert("Error", "Please choose a file first.");
    }
  };

  const openFilterModal = () => {
    setTempFilters(filters); // Copy current filters to temp
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const renderLeadRating = (rating) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= Number(rating) ? "star" : "star-o"}
            size={16}
            color={star <= Number(rating) ? "#F6461A" : "#666"}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  const handleAssignUser = async (leadId, userId) => {
    try {
      const response = await assignUserToLead({
        id: leadId,
        userId: userDetails.userId,
      }).unwrap();

      // Update leads list with new assignment
      const updatedLeads = leads.map((lead) =>
        lead.leadId === leadId
          ? {
              ...lead,
              assignedToUserId: userDetails.userId,
              assignedToUserName: response.assignedToUserName,
            }
          : lead
      );
      console.log("updatedLeads", updatedLeads);
      setLeads(updatedLeads);

      Alert.alert("Success", "Lead assigned successfully!", [{ text: "OK" }]);
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Failed to assign user.";
      Alert.alert("Error", errorMessage, [{ text: "OK" }]);
    }
  };

  return {
    leads,
    isLoading,
    refetchLeads,
    fetchNextPage,
    modalVisible,
    leadName,
    phoneNumber,
    emailId,
    activeTab,
    selectedFile,
    searchText,
    setSearchText,
    setLeadName,
    setPhoneNumber,
    setEmailId,
    setActiveTab,
    setSelectedFile,
    openModal,
    closeModal,
    switchTab,
    chooseFile,
    uploadFile,
    projectsData,

    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filterModalVisible,
    openFilterModal,
    closeFilterModal,
    renderLeadRating,
    selectedStatus,
    setSelectedStatus,
    selectedFilterProject,
    setSelectedFilterProject,
    applyFilters,
    tempFilters,
    userModalVisible,
    setUserModalVisible,
    handleAssignUser,

    userDetails,
    leadStatus,
  };
};

export default useManageLeads;
