import React, { useState } from "react";
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Switch,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons"; // Add FontAwesome and Ionicons import
import { router } from "expo-router";
import moment from "moment";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useManageLeads from "./hooks/useManageLeads";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./style";
import UserSelectModal from "./components/UserSelectModal";

const EmptyState = ({ hasActiveFilters }) => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons
      name="clipboard-text-search-outline"
      size={80}
      color="#DDE1E6"
    />
    <Text style={styles.emptyTitle}>
      {hasActiveFilters ? "No Leads Found" : "No Leads Yet"}
    </Text>
    <Text style={styles.emptyText}>
      {hasActiveFilters
        ? "There are no leads matching your search criteria.\nTry adjusting your filters or search terms."
        : "Start by adding your first lead using the Add Lead button below."}
    </Text>
  </View>
);

const LoadingState = () => (
  <View style={styles.emptyContainer}>
    <ActivityIndicator size="large" color="#F6461A" />
    <Text style={[styles.emptyText, { marginTop: 16 }]}>Loading leads...</Text>
  </View>
);

const AdminLeads = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
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
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filterModalVisible,
    openFilterModal,
    closeFilterModal,
    selectedStatus,
    setSelectedStatus,
    selectedFilterProject,
    setSelectedFilterProject,
    tempFilters,
    applyFilters,
    userModalVisible,
    setUserModalVisible,
    handleAssignUser,
    isAbleToAddLead,
    selectedProject,
    setSelectedFile,
    isImporting,
    leadStatus,
  } = useManageLeads();

  // const {
  //   usersListData,
  //   searchText: userSearchText,
  //   setSearchText: setUserSearchText,
  //   isLoading: isUsersLoading,
  // } = useHandleUserModal();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchLeads();
    setIsRefreshing(false);
  };

  const renderAssignedUser = (lead) => (
    <View
      style={{
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        paddingTop: 8,
      }}
    >
      <View style={styles.assignedUserContainer}>
        <View style={styles.assignmentRow}>
          <Text style={styles.assignedLabel}>Assigned To</Text>
          <TouchableOpacity
            style={
              lead.assignedToUserName
                ? styles.assignedUserInfo
                : styles.unassignedUserInfo
            }
            onPress={() => {
              setSelectedLead(lead);
              setUserModalVisible(true);
            }}
          >
            <Text
              numberOfLines={1}
              style={
                lead.assignedToUserName
                  ? styles.assignedUserID
                  : styles.unassignedText
              }
            >
              {lead.assignedToUserName
                ? `${lead.assignedToUserName}`
                : "Unassigned"}
            </Text>
            <Feather
              name="edit-2"
              size={14}
              color={lead.assignedToUserName ? "#2E7D32" : "#666"}
              style={styles.assignedEditIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderData = ({ item }) => (
    <TouchableOpacity
      style={styles.leadContainer}
      onPress={() => router.push(`client/leads/leadDetails?id=${item?.leadId}`)}
    >
      <View style={styles.leadContent}>
        <View style={styles.leadHeader}>
          <View style={styles.headerRow}>
            <View style={styles.leftContent}>
              <Text style={styles.leadStatus}>{item.status}</Text>
              <Text style={styles.leadName}>{item.leadName}</Text>
            </View>
            <Text style={styles.dateText}>
              {moment(item.createdDate).format("DD MMM'YY")}
            </Text>
          </View>
          <View style={styles.secondRow}>
            {item.assignedToUserName ? (
              <Text style={styles.assignedUserName}>
                {item.assignedToUserName}
              </Text>
            ) : (
              <Text style={styles.unassignedText}>Unassigned</Text>
            )}
            <View style={styles.communicationIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setSelectedLead(item);
                  setUserModalVisible(true);
                }}
              >
                <Ionicons name="person-add-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  const urlWA = `whatsapp://send?phone=${item.phoneNumber}`;
                  Linking.canOpenURL(urlWA).then((supported) => {
                    if (supported) {
                      Linking.openURL(urlWA);
                    } else {
                      Alert.alert(
                        "Please install WhatsApp to use this feature"
                      );
                    }
                  });
                }}
              >
                <Ionicons name="logo-whatsapp" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
              >
                <Ionicons name="call-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStarRating = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => updateFilter("rating", star.toString())}
          >
            <FontAwesome
              name={star <= Number(tempFilters.rating) ? "star" : "star-o"}
              size={24}
              color={star <= Number(tempFilters.rating) ? "#F6461A" : "#666"}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getChipColor = (key) => {
    const colors = {
      leadStatus: { bg: "#EDE7F6", text: "#4527A0", border: "#B39DDB" },
      emailId: { bg: "#E3F2FD", text: "#1565C0", border: "#90CAF9" },
      rating: { bg: "#FCE4EC", text: "#C2185B", border: "#F48FB1" },
      assignedTo: { bg: "#E0F2F1", text: "#00796B", border: "#80CBC4" }, // Add new color
    };
    return colors[key] || { bg: "#F5F5F5", text: "#616161", border: "#E0E0E0" };
  };

  const renderFilterChips = () => {
    return Object.entries(filters).map(([key, value]) => {
      if (!value) return null;
      let displayValue = value;
      let displayKey = key;
      const chipColor = getChipColor(key);

      switch (key) {
        case "projectId":
          displayKey = "Project";
          const project = projectsData?.find((p) => p.projectId === value);
          displayValue = project?.projectName || value;
          break;
        case "leadStatus":
          displayKey = "Status";
          break;
        case "emailId":
          displayKey = "Email";
          break;
        case "rating":
          displayValue = "★".repeat(Number(value));
          displayKey = "Rating";
          break;
      }

      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.chipContainer,
            {
              backgroundColor: chipColor.bg,
              borderColor: chipColor.border,
            },
          ]}
          onPress={() => {
            if (key === "leadStatus") setSelectedStatus(null);
            if (key === "projectId") setSelectedFilterProject(null);
            clearFilter(key);
          }}
        >
          <Text
            style={[styles.chipText, { color: chipColor.text }]}
            numberOfLines={1}
          >
            {displayKey}: {displayValue}
          </Text>
          <Feather
            name="x"
            size={14}
            color={chipColor.text}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", alignContent: "center" }}
        >
          Leads
        </Text>
      </View>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
          />
          {searchText ? (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchText("")}
            >
              <Feather name="x" size={16} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Feather name="filter" size={20} color="#F6461A" />
        </TouchableOpacity>
      </View>

      {Object.values(filters).some((value) => value) && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScrollView}
          contentContainerStyle={styles.chipScrollContent}
        >
          {renderFilterChips()}
        </ScrollView>
      )}

      <View style={styles.listContainer}>
        <FlatList
          data={leads}
          renderItem={renderData}
          keyExtractor={(item) => item?.leadId?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatListContent,
            leads.length === 0 && styles.emptyListContent,
          ]}
          ListEmptyComponent={
            isLoading ? (
              <LoadingState />
            ) : (
              <EmptyState
                hasActiveFilters={
                  Object.values(filters).some((value) => value) ||
                  searchText.length === 10
                }
              />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#F6461A"]}
              tintColor="#F6461A"
            />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: isAbleToAddLead ? "#F6461A" : "#ccc",
            opacity: isAbleToAddLead ? 1 : 0.5,
          },
        ]}
        disabled={!isAbleToAddLead}
        onPress={openModal}
      >
        <View style={styles.floatingButtonContent}>
          <Icon
            name="plus"
            size={30}
            color={isAbleToAddLead ? "#FFF" : "#000"}
          />
          <Text
            style={[
              styles.floatingButtonText,
              {
                color: isAbleToAddLead ? "#FFF" : "#000",
              },
            ]}
          >
            Add Lead
          </Text>
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
                <Text style={styles.modalTitle}>Import Leads</Text>
                <Text style={styles.importDescription}>
                  Upload a CSV file containing lead information. Maximum file
                  size: 10MB
                </Text>

                {projectsData?.length > 0 && (
                  <View style={styles.importField}>
                    <Text style={styles.importLabel}>Select Project</Text>
                    <SelectDropdown
                      data={projectsData}
                      onSelect={(selectedItem) => {
                        setSelectedProject(selectedItem);
                      }}
                      defaultButtonText="Select project"
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
                  </View>
                )}

                <View style={styles.importField}>
                  <Text style={styles.importLabel}>Upload CSV File</Text>
                  {selectedFile ? (
                    <View style={styles.selectedFileContainer}>
                      <Icon name="file-delimited" size={20} color="#4CAF50" />
                      <Text style={styles.selectedFileText} numberOfLines={1}>
                        {selectedFile.assets?.[0]?.name ||
                          selectedFile.name ||
                          selectedFile.uri.split("/").pop()}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setSelectedFile(null)}
                        style={styles.clearFileButton}
                      >
                        <Icon name="close" size={20} color="#666" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.filePickerButton}
                      onPress={chooseFile}
                    >
                      <Icon name="file-upload" size={24} color="#666" />
                      <Text style={styles.filePickerText}>Choose CSV File</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={closeModal}
                    disabled={isImporting}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.addButtonModal,
                      (!selectedFile || isImporting) && styles.disabledButton,
                    ]}
                    onPress={uploadFile}
                    disabled={!selectedFile || isImporting}
                  >
                    {isImporting ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.addButtonText}>Upload</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Leads</Text>
              {Object.values(filters).some((v) => v) && (
                <TouchableOpacity
                  onPress={clearAllFilters}
                  style={styles.clearAllButtonModal}
                >
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Add Project Filter Section */}
            <View style={styles.modalFilterSection}>
              <Text style={styles.filterLabel}>Project</Text>
              <SelectDropdown
                data={projectsData || []}
                onSelect={(selectedItem) => {
                  updateFilter("projectId", selectedItem.projectId);
                  setSelectedFilterProject(selectedItem);
                }}
                defaultButtonText="Select Project"
                renderButton={(selectedItem, isOpened) => (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedFilterProject?.projectName || "Select Project"}
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
                    <Text numberOfLines={2} style={styles.dropdownItemTxtStyle}>
                      {item?.projectName}
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>

            <View style={styles.modalFilterSection}>
              <Text style={styles.filterLabel}>Email</Text>
              <TextInput
                style={styles.filterInput}
                value={tempFilters.emailId}
                onChangeText={(value) => updateFilter("emailId", value)}
                placeholder="Enter Email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.modalFilterSection}>
              <Text style={styles.filterLabel}>Lead Status</Text>
              <SelectDropdown
                data={leadStatus}
                onSelect={(value) => {
                  updateFilter("leadStatus", value);
                  setSelectedStatus(value);
                }}
                defaultButtonText="Select Status"
                renderButton={(selectedItem, isOpened) => (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedStatus || "Select Status"}
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
                    <Text numberOfLines={2} style={styles.dropdownItemTxtStyle}>
                      {item}
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>

            <View style={styles.modalFilterSection}>
              <Text style={styles.filterLabel}>Rating</Text>
              {renderStarRating()}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeFilterModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <UserSelectModal
        visible={userModalVisible}
        onClose={() => setUserModalVisible(false)}
        onSelectUser={(user) => {
          handleAssignUser(selectedLead.leadId, user.userId);
          setUserModalVisible(false);
        }}
      />
    </View>
  );
};

export default AdminLeads;
