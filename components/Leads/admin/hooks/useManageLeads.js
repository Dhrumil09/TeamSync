import { useSelector } from "react-redux";
import {
  useGetLeadListMutation,
  useAddLeadMutation,
} from "../../../../api/manageAdminLeads";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import debounce from "lodash.debounce";
import { useListProjectsApiQuery } from "../../../../api/manageProjects";

const useManageLeads = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [getLeadList, { isLoading }] = useGetLeadListMutation();
  const [addLeadApi, { isLoading: isAddLeadLoading }] = useAddLeadMutation();
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
  const { data: projectsData } = useListProjectsApiQuery(userDetails.accountId);

  const fetchLeads = async (params) => {
    try {
      const res = await getLeadList(params).unwrap();
      return res;
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
    }
  };

  const fetchNextPage = async () => {
    if (page < lastPage) {
      const params = {
        accountId: userDetails.accountId,
        page: page + 1,
      };
      if (searchText) {
        params.leadName = searchText;
      }
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
    if (searchText) {
      params.leadName = searchText;
    }
    const data = await fetchLeads(params);
    if (data?.content) {
      setLeads(data.content || []);
    }
    if (data?.totalPages) {
      setLastPage(data.totalPages);
    }
    setPage(0);
  };

  useEffect(() => {
    refetchLeads();
  }, []);

  const debouncedRefetchLeads = debounce(refetchLeads, 300);

  useEffect(() => {
    debouncedRefetchLeads();
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
          // projectId: selectedProject?.projectId,
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
      // Handle file upload logic here
      console.log("File selected:", selectedFile);
      closeModal();
    } else {
      Alert.alert("Error", "Please choose a file first.");
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
  };
};

export default useManageLeads;
