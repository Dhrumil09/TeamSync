import { useState, useEffect, useRef } from "react";
import {
  useFetchLeadMutation,
  useUpdateLeadNoteMutation,
  useUpdateLeadRatingMutation,
  useFetchLeadStatusQuery,
  useUpdateLeadStatusMutation,
} from "../../api/manageAdminLeads";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../store/slices/leadListSlice";
import { Alert } from "react-native";

export const useLeadDetails = (leadId) => {
  const [fetchLead] = useFetchLeadMutation();
  const [updateNote] = useUpdateLeadNoteMutation();
  const [updateRating] = useUpdateLeadRatingMutation();
  const { data: leadStatusList } = useFetchLeadStatusQuery();
  const leadList = useSelector((state) => state.leadList);
  const [leadData, setLeadData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const [loadingAction, setLoadingAction] = useState(false);
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leadList.leads);

  const isInitialMount = useRef(true);
  const updateLeadList = (params) => {
    console.log("Updating lead list:", params);
  };
  const fetchLeadDetails = async (showLoader = true) => {
    try {
      if (showLoader) setIsLoading(true);
      const response = await fetchLead(leadId).unwrap();
      if (response) {
        setLeadData(response);
        if (response.rating) setRating(response.rating);
        if (response.note) setNoteText(response.note);
      }
    } catch (error) {
      console.log("Error fetching lead:", error);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (leadId) {
        fetchLeadDetails(true); // Show loader on initial load
      }
    }
  }, [leadId]);

  const handleSubmitNote = async () => {
    try {
      setLoadingAction(true);
      const response = await updateNote({
        id: leadId,
        note: noteText,
      }).unwrap();
      if (response) {
        setLeadData(response);
        if (response.rating) setRating(response.rating);
        if (response.note) setNoteText(response.note);
      }
      setNoteText("");
      setActiveSection(null);
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Something went wrong. Please try again!";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const updateLeadInList = (updatedData) => {
    const leadIndex = leads.findIndex((lead) => lead.leadId === leadId);
    if (leadIndex !== -1) {
      dispatch(
        updateLead({
          leadId,
          updates: updatedData,
        })
      );
    }
  };

  const handleStarPress = async (selectedRating) => {
    try {
      setLoadingAction(true);
      const response = await updateRating({
        id: leadId,
        rating: selectedRating,
      }).unwrap();
      if (response) {
        setLeadData(response);
        if (response.rating) setRating(response.rating);
        if (response.note) setNoteText(response.note);
      }

      // Update lead in redux store

      await fetchLeadDetails(false);
      updateLeadInList({ rating: selectedRating });
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Something went wrong. Please try again!";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleOpinionSelect = async (opinion) => {
    let newStatus;
    switch (opinion) {
      case "Differ":
        newStatus = "LOST";
        break;
      case "Confused":
        newStatus = "WIP";
        break;
      case "Interested":
        newStatus = "SUCCEED";
        break;
      default:
        newStatus = leadData.status;
    }

    try {
      setLoadingAction(true);
      const response = await updateLeadStatus({
        id: leadId,
        status: newStatus,
      }).unwrap();
      if (response) {
        setLeadData(response);
        setSelectedOpinion(opinion);
      }
      updateLeadInList({ status: newStatus });
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Something went wrong. Please try again!";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setLoadingAction(true);
      const response = await updateLeadStatus({
        id: leadId,
        status: newStatus,
      }).unwrap();
      if (response) {
        setLeadData(response);
        if (response.rating) setRating(response.rating);
        if (response.note) setNoteText(response.note);
      }
      // Update lead in redux store
      updateLeadInList({ status: newStatus });
    } catch (error) {
      const errorMessage =
        error?.data?.detailMessage ||
        error?.data?.message ||
        "Something went wrong. Please try again!";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleOutsideClick = () => {
    if (activeSection) {
      setActiveSection(null);
      setShowNotes(false);
      setShowRating(false);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return {
    showNotes,
    showRating,
    noteText,
    rating,
    activeSection,
    selectedOpinion,
    setNoteText,
    handleSubmitNote,
    handleStarPress,
    handleOutsideClick,
    toggleSection,
    handleOpinionSelect,
    handleStatusChange,
    leadData,
    isLoading,
    fetchLeadDetails,
    leadStatusList,
    loadingAction,
  };
};
