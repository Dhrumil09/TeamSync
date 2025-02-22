import { useSelector } from "react-redux";
import {
  useGetLeadListMutation,
  useAddLeadMutation,
  useAssignUserToLeadMutation,
  useImportLeadsMutation,
} from "../../../../api/manageAdminLeads";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Alert, Platform } from "react-native";
import debounce from "lodash.debounce";
import { useListProjectsApiQuery } from "../../../../api/manageProjects";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { setShareLeadFilterProject } from "../../../../store/slices/helperSlice";

const useManageLeads = () => {
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  const dispatch = useDispatch();
  const selectedHomeProject = useSelector(
    (state) => state.helper.shareLeadFilterProject
  );
  const userDetails = useSelector((state) => state.user.userDetails);
  const [getLeadList, { isLoading }] = useGetLeadListMutation();
  const [addLeadApi, { isLoading: isAddLeadLoading }] = useAddLeadMutation();
  const isAbleToAddLead =
    userDetails?.remainingLeadsCreation > 0 ? true : false;
  const [assignUserToLead, { isLoading: assignUserLoading }] =
    useAssignUserToLeadMutation();
  const [importLeadsApi] = useImportLeadsMutation();
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
  const [selectedProject, setSelectedProject] = useState("");
  const [userModalVisible, setUserModalVisible] = useState(false);
  const { data: projectsData } = useListProjectsApiQuery(userDetails.accountId);
  const [filters, setFilters] = useState({
    projectId: "",
    emailId: "",
    leadStatus: "",
    rating: "",
    assignedTo: "",
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFilterProject, setSelectedFilterProject] = useState(null);
  const [tempFilters, setTempFilters] = useState({
    projectId: "",
    emailId: "",
    leadStatus: "",
    rating: "",
    assignedTo: "",
  });
  const [isImporting, setIsImporting] = useState(false);

  const updateFilter = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const initializeFilters = async () => {
      try {
        if (focused) {
          if (selectedHomeProject?.projectId) {
            setSelectedFilterProject(selectedHomeProject);
            setTempFilters((prev) => ({
              ...prev,
              projectId: selectedHomeProject?.projectId || "",
            }));
            setFilters((prev) => ({
              ...prev,
              projectId: selectedHomeProject?.projectId || "",
            }));
            await refetchLeadsWithFilters(tempFilters);
            dispatch(setShareLeadFilterProject({}));
          }
        }
      } catch (error) {
        console.error("Error initializing filters:", error);
      }
    };

    initializeFilters();
  }, [focused]);

  const clearFilter = async (key) => {
    const newFilters = {
      ...filters,
      [key]: "",
    };
    setFilters(newFilters);
    // Reset temp filters as well for the specific key
    setTempFilters((prev) => ({
      ...prev,
      [key]: "",
    }));
    await refetchLeadsWithFilters(newFilters);
  };

  const applyFilters = async () => {
    setFilters(tempFilters);
    await refetchLeadsWithFilters(tempFilters);
    closeFilterModal();
  };

  const clearAllFilters = async () => {
    const emptyFilters = {
      projectId: "",
      emailId: "",
      leadStatus: "",
      rating: "",
      assignedTo: "",
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSelectedFilterProject(null);
    setSelectedStatus(null);
    await refetchLeadsWithFilters(emptyFilters);
  };

  const refetchLeadsWithFilters = async (currentFilters) => {
    const params = {
      accountId: userDetails.accountId,
      page: 0,
      ...Object.fromEntries(
        Object.entries(currentFilters).filter(([_, value]) => value !== "")
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

  const fetchLeads = async (params) => {
    try {
      const filterParams = {
        ...params,
        ...(searchText.length === 10 ? { phoneNumber: searchText } : {}),
        ...Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value !== "")
        ),
      };
      const res = await getLeadList(filterParams).unwrap();
      return res;
    } catch (error) {
      // Handle API errors
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

  const addLead = async () => {
    if (validateLeadDetails()) {
      try {
        console.log("selectedProject", selectedProject);
        const payload = {
          accountId: userDetails.accountId,
          leadName,
          phoneNumber,
          emailId,
          projectId: selectedProject?.projectId,
        };
        const res = await addLeadApi(payload).unwrap();
        console.log("res", res);
        Alert.alert("Success", "Lead added successfully.");
        closeModal();
        refetchLeads();
      } catch (error) {
        console.log("Error adding lead:", error);
        Alert.alert("Error", "Failed to add lead. Please try again.");
      }
    }
  };

  const chooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "application/csv", "application/vnd.ms-excel"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const file = result.assets[0];

        // Check file size
        if (file.size > 10 * 1024 * 1024) {
          Alert.alert(
            "Error",
            "File size exceeds 10MB limit. Please choose a smaller file."
          );
          return;
        }

        // Verify file extension
        const isCSV = file.name.toLowerCase().endsWith(".csv");
        if (!isCSV) {
          Alert.alert("Error", "Please select a CSV file.");
          return;
        }

        setSelectedFile(file);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick the file. Please try again.");
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Please choose a file first.");
      return;
    }

    try {
      setIsImporting(true);
      const formData = new FormData();
      formData.append("accountId", userDetails.accountId);

      if (selectedProject && selectedProject.id) {
        formData.append("projectId", selectedProject.id);
      }

      // Handle file URI for both platforms
      const fileUri = Platform.select({
        android: selectedFile.uri,
        ios: selectedFile.uri.replace("file://", ""),
      });

      formData.append("file", {
        uri: fileUri,
        name: selectedFile.name,
        type: "text/csv", // Force CSV mime type for consistency
      });

      await importLeadsApi(formData).unwrap();
      Alert.alert("Success", "Leads imported successfully");
      closeModal();
      refetchLeads();
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to import leads. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsImporting(false);
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
        userId: userId,
      }).unwrap();

      // Update leads list with new assignment
      const updatedLeads = leads.map((lead) =>
        lead.leadId === leadId
          ? {
              ...lead,
              assignedToUserId: userId,
              assignedToUserName: response.assignedToUserName,
            }
          : lead
      );
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
    addLead,
    chooseFile,
    uploadFile,
    projectsData,
    setSelectedProject,
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
    isAbleToAddLead,
    isImporting,
  };
};

export default useManageLeads;
