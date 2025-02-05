import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import useManageLeads from "./hooks/useManageLeads";
import SelectDropdown from "react-native-select-dropdown";

const AdminLeads = () => {
  const {
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
    openModal,
    closeModal,
    switchTab,
    addLead,
    chooseFile,
    uploadFile,
    projectsData,
    setSelectedProject,
  } = useManageLeads();

  const projects = ["Project 1", "Project 2"]; // Add more projects as needed

  const renderData = ({ item }) => (
    <TouchableOpacity
      style={styles.leadContainer}
      onPress={() => router.push("client/leads/leadDetails")}
    >
      <View style={styles.leadContent}>
        <View style={styles.leadHeader}>
          <Text style={styles.leadName}>{item.leadName}</Text>
        </View>
        <View style={styles.rowBetween}>
          <View style={styles.rowAlign}>
            <Feather name="phone" size={16} color="black" />
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          </View>
          <Text>{`Status: ${item.status}`}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text>{`Rating: ${item.rating}`}</Text>
          <Text>
            <Text style={styles.addedOnText}>{`Added on `}</Text>
            <Text style={styles.dateText}>
              {moment(item.createdDate).format("MM/DD/YYYY")}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", alignContent: "center" }}
        >
          Leads
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search Leads"
      />
      {/* </View> */}
      <View style={styles.listContainer}>
        <FlatList
          data={leads}
          renderItem={renderData}
          keyExtractor={(item) => item?.leadId?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <View style={styles.floatingButtonContent}>
          <Icon name="plus" size={30} color="#FFF" />
          <Text style={styles.floatingButtonText}>Add Lead</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === "manual" && styles.activeTabButton,
                ]}
                onPress={() => switchTab("manual")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "manual" && styles.activeTabButtonText,
                  ]}
                >
                  Add Lead
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === "excel" && styles.activeTabButton,
                ]}
                onPress={() => switchTab("excel")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "excel" && styles.activeTabButtonText,
                  ]}
                >
                  import Leads
                </Text>
              </TouchableOpacity>
            </View>
            {activeTab === "manual" ? (
              <>
                <Text style={styles.modalTitle}>Add New Lead</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Lead Name"
                  value={leadName}
                  onChangeText={setLeadName}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Email ID"
                  value={emailId}
                  onChangeText={setEmailId}
                  keyboardType="email-address"
                />

                {projectsData?.length > 0 ? (
                  <SelectDropdown
                    data={projectsData}
                    onSelect={(selectedItem) => {
                      setSelectedProject(selectedItem);
                    }}
                    // defaultValue={}
                    renderButton={(selectedItem, isOpened) => (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem?.projectName) ||
                            "Select project"}
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
                          {item?.projectName}
                        </Text>
                      </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                ) : null}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addButtonModal}
                    onPress={addLead}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Upload Leads from Excel</Text>
                <Button title="Choose File" onPress={chooseFile} />
                {selectedFile && (
                  <Text style={styles.selectedFileText}>
                    {selectedFile.name}
                  </Text>
                )}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addButtonModal}
                    onPress={uploadFile}
                  >
                    <Text style={styles.addButtonText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    paddingBottom: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFF",
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  leadContainer: {
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 16,
  },
  leadContent: {
    padding: 16,
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
  leadHeader: {
    marginBottom: 16,
  },
  leadName: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 4,
  },
  addedOnText: {
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "300",
    fontStyle: "italic",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F6461A",
    width: 140,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flexDirection: "row",
    zIndex: 1,
  },
  floatingButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
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
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#F6461A",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabButtonText: {
    color: "#F6461A",
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
    marginBottom: 16,
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
  addButtonText: {
    color: "#fff",
  },
  selectedFileText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  dropdownButton: {
    width: "100%",
    height: 50,

    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  dropdownButtonText: {
    textAlign: "left",
    fontSize: 14,
    color: "#444",
  },
  dropdownButtonStyle: {
    // width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 16,
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
});

export default AdminLeads;
