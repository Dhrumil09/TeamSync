import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppIcon from "../../../assets/images/AppIcon";
import useManageProjects from "./hooks/useManageProject";
import useHandleUserModal from "./hooks/useHandleUserModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserSelectionModal from "./componets/UserModal";

export default function Tab() {
  const {
    projectListData,
    isAbleToAddProject,
    addProject,
    projectStatusListData,
    accountName,
    setSelectedProject,
    addUserToProject,
  } = useManageProjects();

  const [modalVisible, setModalVisible] = useState(false);
  const [newProject, setNewProject] = useState("");
  const [formError, setFormError] = useState({
    projectName: "",
  });
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [projectStatus, setProjectStatus] = useState("ACTIVE");

  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"];

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

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <AppIcon />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.appTitle}>{accountName}</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={{ marginHorizontal: 16, marginTop: 32, fontSize: 16 }}>
          Projects ({projectListData?.length})
        </Text>
        <View style={styles.projectListContainer}>
          {projectListData?.map((project, index) => (
            <View key={index}>
              <View key={index} style={styles.projectListItem}>
                <Text style={styles.projectListItemText} numberOfLines={2}>
                  {project.projectName}
                </Text>
                <View style={{ flexDirection: "row" }}>
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
                    <MaterialIcons
                      name="person-add"
                      size={24}
                      color="#F6461A"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {index !== projectListData?.length - 1 && (
                <View style={styles.devider} />
              )}
            </View>
          ))}
        </View>

        {/* Stats Container */}
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
          users={users}
          onSelect={(user) => {
            addUserToProject({ userIds: user });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#151E26",
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
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
});
