import React, { useState } from "react";
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Switch,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setSelectProject } from "../../../store/slices/userSlice";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons"; // Add FontAwesome and Ionicons import
import { router } from "expo-router";
import moment from "moment";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useManageUserLeads from "./hooks/useManageUserLeads";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./style";
import AppIcon from "../../../assets/images/AppIcon";

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
  const dispatch = useDispatch();
  const {
    leads,
    isLoading,
    refetchLeads,
    fetchNextPage,
    searchText,
    setSearchText,
    projectsData,
    handleAssignUser,
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filterModalVisible,
    openFilterModal,
    closeFilterModal,
    selectedStatus,
    setSelectedStatus,
    setSelectedFilterProject,
    tempFilters,
    applyFilters,
    userDetails,
    leadStatus,
    projectData,
    selectedProject,
  } = useManageUserLeads();

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
          {lead.assignedToUserName ? (
            <View style={[styles.assignedUserInfo, styles.disabledButton]}>
              <Text numberOfLines={1} style={styles.assignedUserID}>
                {lead.assignedToUserName}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.selfAssignButton}
              onPress={() => {
                // Call your assign to self function here
                handleAssignUser(lead.leadId);
              }}
            >
              <Text style={styles.selfAssignButtonText}>Assign to Self</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const formatDate = (date) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const dateToCheck = moment(date).startOf("day");

    if (dateToCheck.isSame(today)) {
      return "Today";
    } else if (dateToCheck.isSame(yesterday)) {
      return "Yesterday";
    } else {
      // For February 22nd, 2024, this will return: "22 Feb'24"
      return moment(date).format("DD MMM'YY");
    }
  };

  const renderData = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.leadContainer,
        index === leads.length - 1 && styles.lastItem,
      ]}
      onPress={() => router.push(`client/leads/leadDetails?id=${item?.leadId}`)}
    >
      <View style={styles.leadContent}>
        <View style={styles.leadHeader}>
          <View style={styles.headerRow}>
            <View style={styles.leftContent}>
              <Text style={styles.leadStatus}>{item.status}</Text>
              <Text style={styles.leadName}>{item.leadName}</Text>
            </View>
            <Text style={styles.dateText}>{formatDate(item.createdDate)}</Text>
          </View>
          <View style={styles.secondRow}>
            {item.assignedToUserName ? (
              <Text style={styles.assignedUserName}>
                {item.assignedToUserName}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => handleAssignUser(item.leadId)}>
                <Text style={styles.unassignedLink}>Assign to me</Text>
              </TouchableOpacity>
            )}
            <View style={styles.communicationIcons}>
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
      projectId: { bg: "#E8F5E9", text: "#2E7D32", border: "#81C784" },
      leadStatus: { bg: "#EDE7F6", text: "#4527A0", border: "#B39DDB" },
      emailId: { bg: "#E3F2FD", text: "#1565C0", border: "#90CAF9" },
      rating: { bg: "#FCE4EC", text: "#C2185B", border: "#F48FB1" },
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
          const project = projectsData?.find((p) => p.projectId === value);
          displayValue = project?.projectName || "Unknown Project";
          displayKey = "Project";
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
            if (key === "projectId") setSelectedFilterProject(null);
            if (key === "leadStatus") setSelectedStatus(null);
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppIcon />
          <Text style={styles.appTitle}>{`Leads `}</Text>
        </View>

        <View>
          {projectData?.length > 1 ? (
            <SelectDropdown
              data={projectData}
              statusBarTranslucent={true}
              onSelect={(selectedItem) => {
                dispatch(setSelectProject(selectedItem));
              }}
              defaultValue={selectedProject}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem?.projectName) ||
                      "Select Project"}
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
                  <Text style={styles.dropdownItemTxtStyle}>
                    {item?.projectName}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          ) : (
            <Text style={styles.singleProjectText}>
              {selectedProject?.projectName || "No Project"}
            </Text>
          )}
        </View>
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

            {/* Assignment filter switch without divider */}
            <View style={styles.modalFilterSection}>
              <View style={[styles.switchFilterRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.switchLabel}>
                  Show My Assigned Leads Only
                </Text>
                <Switch
                  trackColor={{ false: "#E0E0E0", true: "#F6461A" }}
                  thumbColor={"#fff"}
                  ios_backgroundColor="#E0E0E0"
                  onValueChange={(value) =>
                    updateFilter(
                      "assignedTo",
                      value ? userDetails?.userName : ""
                    )
                  }
                  value={tempFilters.assignedTo === userDetails?.userName}
                />
              </View>
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
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <UserSelectModal
        visible={userModalVisible}
        onClose={() => setUserModalVisible(false)}
        onSelectUser={(user) => {
          handleAssignUser(selectedLead.leadId, user.userId);
          setUserModalVisible(false);
        }}
      /> */}
    </View>
  );
};

export default AdminLeads;
