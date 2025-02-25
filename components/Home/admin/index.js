import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppIcon from "../../../assets/images/AppIcon";
import useManageProjects from "./hooks/useManageProject";
import useHandleUserModal from "./hooks/useHandleUserModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserSelectionModal from "./componets/UserModal";
import { useRouter } from "expo-router"; // Add this import at the top with other imports
import { useDispatch } from "react-redux";
import { setShareLeadFilterProject } from "../../../store/slices/helperSlice";
import moment from "moment"; // Add this import at the top
const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "#4CAF50"; // Green
    case "INACTIVE":
      return "#FF5252"; // Red
    case "PENDING":
      return "#FFC107"; // Amber
    case "COMPLETED":
      return "#2196F3"; // Blue
    default:
      return "#757575"; // Grey
  }
};

const Tab = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    projectListData,
    filteredProjects,
    isLoading,
    isAbleToAddProject,
    addProject,
    projectStatusListData,
    accountName,
    setSelectedProject,
    addUserToProject,
    searchQuery,
    setSearchQuery,
    onRefresh,
  } = useManageProjects();

  const [modalVisible, setModalVisible] = useState(false);
  const [newProject, setNewProject] = useState("");
  const [formError, setFormError] = useState({
    projectName: "",
  });
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [projectStatus, setProjectStatus] = useState("ACTIVE");

  const [userModalVisible, setUserModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const openEditModal = (project) => {
    setSelectedProjectData(project);
    setNewProject(project.projectName);
    setProjectStatus(project.status);
    setModalVisible(true);
  };

  const openAddModal = () => {
    setSelectedProjectData(null);
    setNewProject("");
    setProjectStatus("");
    setModalVisible(true);
  };

  const addUserModal = (project) => {
    setSelectedProject(project?.projectId);
    setUserModalVisible(true);
  };

  const addNewProject = async () => {
    setFormError({ projectName: "" });
    if (newProject.trim() === "") {
      setFormError({ projectName: "Project name is required" });
      return;
    }
    addProject({
      name: newProject,
      status: projectStatus,
      projectId: selectedProjectData?.projectId,
    });
    setNewProject("");
    setModalVisible(false);
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by project name or status"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          returnKeyType="search"
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="folder-open" size={60} color="#DDE1E6" />
      <Text style={styles.emptyTitle}>
        {searchQuery ? "No Projects Found" : "No Projects Yet"}
      </Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? "Try adjusting your search terms"
          : "Start by adding your first project"}
      </Text>
    </View>
  );

  const renderProjectList = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F6461A" />
          <Text style={styles.loadingText}>Loading projects...</Text>
        </View>
      );
    }

    if (!filteredProjects?.length) {
      return renderEmptyState();
    }

    return (
      <View style={styles.projectListContainer}>
        {console.log("filteredProjects", filteredProjects)}
        {filteredProjects.map((project, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              dispatch(setShareLeadFilterProject(project));
              router.push({
                pathname: "client/(tabs)/leads",
              });
            }}
          >
            <View style={styles.projectListItem}>
              <View style={styles.projectInfo}>
                <View style={styles.statusIndicator}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(project.status) },
                    ]}
                  />
                  <Text style={styles.projectListItemText} numberOfLines={1}>
                    {project.projectName}
                  </Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(project)}
                >
                  <Icon name="pencil" size={24} color="#F6461A" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addUserButtonStyle}
                  onPress={() => addUserModal(project)}
                >
                  <MaterialIcons name="person-add" size={24} color="#F6461A" />
                </TouchableOpacity>
              </View>
            </View>
            {index !== filteredProjects.length - 1 && (
              <View style={styles.divider} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const formatDate = (date) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const dateToCheck = moment(date).startOf("day");

    if (dateToCheck.isSame(today)) {
      return "Today";
    } else if (dateToCheck.isSame(yesterday)) {
      return "Yesterday";
    } else {
      return moment(date).format("DD MMM'YY");
    }
  };

  const renderData = (project) => (
    <TouchableOpacity
      key={project.projectId}
      style={styles.projectCard}
      onPress={() => {
        dispatch(setShareLeadFilterProject(project));
        router.push({ pathname: "client/(tabs)/leads" });
      }}
    >
      <View style={styles.cardContent}>
        {/* First Row: Status and Date */}
        <View style={styles.headerRow}>
          <Text style={styles.projectStatus}>{project.status}</Text>
          <Text style={styles.dateText}>{formatDate(project.createdDate)}</Text>
        </View>

        {/* Second Row: Name and Actions */}
        <View style={styles.secondRow}>
          <Text style={styles.projectName}>{project.projectName}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={(e) => {
                e.stopPropagation();
                openEditModal(project);
              }}
            >
              <Icon name="pencil" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={(e) => {
                e.stopPropagation();
                addUserModal(project);
              }}
            >
              <MaterialIcons name="person-add" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppIcon />
          <Text style={styles.appTitle}>Projects</Text>
        </View>
      </View>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="magnify"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery("")}
            >
              <Icon name="close" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#F6461A"]}
            tintColor="#F6461A"
          />
        }
      >
        {filteredProjects?.length > 0 && (
          <Text style={styles.sectionTitle}>
            Projects ({filteredProjects?.length || 0})
          </Text>
        )}
        <View style={styles.projectListContainer}>
          {filteredProjects?.map((project) => renderData(project))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: isAbleToAddProject ? "#F6461A" : "#ccc",
            opacity: isAbleToAddProject ? 1 : 0.5,
          },
        ]}
        disabled={!isAbleToAddProject}
        onPress={openAddModal}
      >
        <View style={styles.floatingButtonContent}>
          <Icon
            name="plus"
            size={30}
            color={isAbleToAddProject ? "#FFF" : "#000"}
          />
          <Text
            style={[
              styles.floatingButtonText,
              {
                color: isAbleToAddProject ? "#FFF" : "#000",
              },
            ]}
          >
            Add Project
          </Text>
        </View>
      </TouchableOpacity>

      {/* Add New Project Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedProjectData ? "Edit Project" : "Add New Project"}
            </Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter project name"
                value={newProject}
                onChangeText={setNewProject}
              />
              {formError?.projectName && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {formError.projectName}
                </Text>
              )}
            </View>
            {selectedProjectData && (
              <View
                style={{
                  marginBottom: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#151E26" }}
                >
                  Status
                </Text>
                {projectStatusListData?.length != 1 ? (
                  <SelectDropdown
                    data={projectStatusListData}
                    onSelect={(selectedItem) => {
                      setProjectStatus(selectedItem);
                    }}
                    defaultValue={projectStatus}
                    renderButton={(selectedItem, isOpened) => (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem) || "Select Status"}
                        </Text>
                        <Icon
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          style={styles.dropdownButtonArrowStyle}
                        />
                      </View>
                    )}
                    renderItem={(item, index, isSelected) => (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "#D2D9DF" }),
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          style={styles.dropdownItemTxtStyle}
                        >
                          {item}
                        </Text>
                      </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                ) : (
                  <Switch
                    trackColor={{ false: "#767577", true: "#F6461A" }}
                    thumbColor={
                      projectStatus === "ACTIVE" ? "#f4f3f4" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setProjectStatus(
                        projectStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                      )
                    }
                    value={projectStatus === "ACTIVE"}
                  />
                )}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonModal}
                onPress={addNewProject}
              >
                <Text style={styles.addButtonText}>
                  {selectedProjectData ? "Save" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Select  users */}
      {userModalVisible && (
        <UserSelectionModal
          visible={userModalVisible}
          onClose={() => setUserModalVisible(false)}
          onSelect={(user) => {
            addUserToProject({ userIds: user });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    paddingBottom: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 13,
  },
  addButton: {
    backgroundColor: "#F6461A",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  projectListContainer: {
    marginTop: 16,
    marginHorizontal: 0, // Remove horizontal margin
    backgroundColor: "#FFF",
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 0, // Remove horizontal padding
  },
  projectListItem: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  devider: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  projectListItemText: {
    fontSize: 16,
    color: "#151E26",
  },
  dropdownItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#E9ECEF",
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  statBox: {
    alignItems: "center",
  },
  statValueContainer: {
    backgroundColor: "#D9D9D9",
    height: 87,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 31,
    fontWeight: "400",
  },
  statLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
  },
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#151E26",
    paddingLeft: 8,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#000",
  },
  addButtonModal: {
    padding: 10,
    backgroundColor: "#F6461A",
    borderRadius: 8,
  },
  floatingButton: {
    position: "absolute", // Positions the button absolutely relative to the parent container
    bottom: 20, // Places the button 20 units from the bottom of the screen
    right: 20, // Places the button 20 units from the right of the screen
    backgroundColor: "#F6461A", // Background color of the button
    width: 140, // Width of the button
    height: 50, // Height of the button
    borderRadius: 30, // Makes the button circular
    justifyContent: "center", // Centers the content horizontally
    alignItems: "center", // Centers the content vertically
    elevation: 5, // Adds shadow to the button for elevation (Android only)
  },
  floatingButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },

  addButtonText: {
    color: "#fff",
  },

  addUserButtonStyle: {
    marginLeft: 16,
  },
  searchContainer: {
    padding: 16,
    // backgroundColor: "#FFF",
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  projectDetails: {
    flex: 1,
  },
  projectInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  projectListItemText: {
    fontSize: 16,
    color: "#151E26",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
    backgroundColor: "#FFF",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#525252",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 16,
    color: "#666",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#151E26",
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  clearSearchButton: {
    padding: 8,
    marginRight: 4,
    backgroundColor: "#F5F5F5",
  },
  projectCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "white",
    marginVertical: 0,
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 8,
  },
  projectStatus: {
    fontSize: 10,
    lineHeight: 12.1,
    fontWeight: "500",
    fontStyle: "italic",
    color: "#666",
  },
  dateText: {
    fontSize: 10,
    lineHeight: 12.1,
    color: "#666",
    fontStyle: "italic",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectName: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: "600",
    color: "#151E26",
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  statusDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: "300",
    letterSpacing: 0,
    color: "#000000",
    fontStyle: "italic",
  },
});
export default Tab;
