import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Switch, // Add this import
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons"; // Add this import
import useHandleUsers from "./hooks/useHandleUsers";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./style";

const EmptyState = ({ hasActiveFilters }) => (
  <View style={styles.emptyContainer}>
    <Icon name="account-off-outline" size={60} color="#DDE1E6" />
    <Text style={styles.emptyTitle}>
      {hasActiveFilters ? "No Users Found" : "No Users Yet"}
    </Text>
    <Text style={styles.emptyText}>
      {hasActiveFilters
        ? "Try adjusting your filters or search terms"
        : "Start by adding your first user"}
    </Text>
  </View>
);

const LoadingState = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#F6461A" />
    <Text style={styles.loadingText}>Loading users...</Text>
  </View>
);

export default function Tab() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [formError, setFormError] = useState({
    userName: "",
    emailId: "",
    phoneNumber: "",
    password: "",
    userType: "",
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const {
    users,
    setUsers,
    addUser,
    isAbleToAddUser,
    filters,
    tempFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    applyFilters,
    searchText,
    setSearchText,
    isLoading,
    isAddLoading,
    hasMoreData,
    isLoadingMore,
    loadMoreUsers,
  } = useHandleUsers();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const statusOptions = ["ACTIVE", "INACTIVE"];
  const roleOptions = ["USER", "ADMIN"];

  const [refreshing, setRefreshing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getUserList();
    } finally {
      setRefreshing(false);
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setUserName(user.userName);
      setEmailId(user.emailId);
      setPhoneNumber(user.phoneNumber);
      setPassword("");
      setUserType(user.userType);
      setEditingUserId(user.userId);
    } else {
      setUserName("");
      setEmailId("");
      setPhoneNumber("");
      setPassword("");
      setUserType("User");
      setEditingUserId(null);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setUserName("");
    setEmailId("");
    setPhoneNumber("");
    setPassword("");
    setUserType("User");
    setEditingUserId(null);
    setModalVisible(false);
    setFormError({
      userName: "",
      emailId: "",
      phoneNumber: "",
      password: "",
      userType: "",
    });
  };

  const validateInputs = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!userName) errors.userName = "User name is required";
    if (!emailId) errors.emailId = "Email is required";
    else if (!emailRegex.test(emailId)) errors.emailId = "Invalid email format";

    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(phoneNumber))
      errors.phoneNumber = "Phone number must be 10 digits";

    if (!editingUserId && !password) errors.password = "Password is required";

    if (!userType) errors.userType = "User type is required";

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const saveUser = () => {
    if (!validateInputs()) return;

    if (editingUserId) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? { ...user, userName, emailId, phoneNumber, userType }
            : user
        )
      );
      Alert.alert(
        "User updated",
        `User ID: ${editingUserId} has been updated.`
      );
    } else {
      addUser({ userName, emailId, phoneNumber, password });
    }

    closeModal();
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by phone number"
          value={searchText}
          onChangeText={setSearchText}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {searchText ? (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
          >
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Icon name="filter" size={20} color="#F6461A" />
      </TouchableOpacity>
    </View>
  );

  const handleApplyFilters = async () => {
    await applyFilters();
    setFilterModalVisible(false);
  };

  const getChipColor = (key) => {
    const colors = {
      userName: { bg: "#E8F5E9", text: "#2E7D32", border: "#81C784" },
      emailId: { bg: "#E3F2FD", text: "#1565C0", border: "#90CAF9" },
      status: { bg: "#EDE7F6", text: "#4527A0", border: "#B39DDB" },
      role: { bg: "#FCE4EC", text: "#C2185B", border: "#F48FB1" },
    };
    return colors[key] || { bg: "#F5F5F5", text: "#616161", border: "#E0E0E0" };
  };

  const renderFilterChips = () => {
    return Object.entries(filters).map(([key, value]) => {
      if (!value) return null;
      const chipColor = getChipColor(key);

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
          onPress={() => clearFilter(key)}
        >
          <Text
            style={[styles.chipText, { color: chipColor.text }]}
            numberOfLines={1}
          >
            {key}: {value}
          </Text>
          <Icon
            name="close"
            size={14}
            color={chipColor.text}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      );
    });
  };

  const handleClearAll = () => {
    setSelectedStatus(null);
    setSelectedRole(null);
    clearAllFilters();
  };

  const renderRoleFilter = () => (
    <View style={styles.radioGroupContainer}>
      {roleOptions.map((role) => (
        <TouchableOpacity
          key={role}
          style={styles.roleRadioOption}
          onPress={() => {
            setSelectedRole(role);
            updateFilter("role", role);
          }}
        >
          <View
            style={[
              styles.radioCircle,
              tempFilters.role === role && styles.radioSelected,
            ]}
          />
          <Text style={styles.radioText}>{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }}>
        <View style={styles.header}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", alignContent: "center" }}
          >
            Users
          </Text>
        </View>

        {renderSearchBar()}

        {isLoading ? (
          <LoadingState />
        ) : (
          <>
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

            {users.length === 0 ? (
              <EmptyState
                hasActiveFilters={
                  Object.values(filters).some((v) => v) || searchText
                }
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#F6461A"]}
                    tintColor="#F6461A"
                  />
                }
                onScroll={({ nativeEvent }) => {
                  const { layoutMeasurement, contentOffset, contentSize } =
                    nativeEvent;
                  const isCloseToBottom =
                    layoutMeasurement.height + contentOffset.y >=
                    contentSize.height - 20;

                  if (isCloseToBottom && hasMoreData && !isLoadingMore) {
                    loadMoreUsers();
                  }
                }}
                scrollEventThrottle={400}
              >
                <View style={styles.userListContainer}>
                  {users.map((user) => (
                    <View key={user?.userId} style={styles.card}>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardUserName}>{user.userName}</Text>
                        <Text style={styles.cardPhoneNumber}>
                          {user.phoneNumber}
                        </Text>
                        <Text style={styles.cardUserType}>({user.role})</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => openModal(user)}
                      >
                        <Icon name="pencil" size={24} color="#F6461A" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {isLoadingMore && (
                    <View style={styles.loadingMoreContainer}>
                      <ActivityIndicator size="small" color="#F6461A" />
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    {console.log("editingUserId", editingUserId)}
                    {editingUserId ? "Edit User" : "Add New User"}
                  </Text>

                  <View style={styles.formContainer}>
                    <View style={styles.formInputContainer}>
                      <Text style={styles.label}>Username</Text>
                      <TextInput
                        style={[
                          styles.input,
                          formError.userName && styles.errorInput,
                        ]}
                        placeholder="Enter username"
                        value={userName}
                        onChangeText={setUserName}
                      />
                      {formError.userName && (
                        <Text style={styles.error}>{formError.userName}</Text>
                      )}
                    </View>

                    <View style={styles.formInputContainer}>
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        style={[
                          styles.input,
                          formError.emailId && styles.errorInput,
                        ]}
                        placeholder="Enter email"
                        value={emailId}
                        onChangeText={setEmailId}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      {formError.emailId && (
                        <Text style={styles.error}>{formError.emailId}</Text>
                      )}
                    </View>

                    <View style={styles.formInputContainer}>
                      <Text style={styles.label}>Phone Number</Text>
                      <TextInput
                        style={[
                          styles.input,
                          formError.phoneNumber && styles.errorInput,
                        ]}
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        maxLength={10}
                      />
                      {formError.phoneNumber && (
                        <Text style={styles.error}>
                          {formError.phoneNumber}
                        </Text>
                      )}
                    </View>

                    <View style={styles.formInputContainer}>
                      <Text style={styles.label}>Password</Text>
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={[
                            styles.passwordInput,
                            formError.password && styles.errorInput,
                          ]}
                          placeholder="Enter password"
                          secureTextEntry={!showPassword}
                          value={password}
                          onChangeText={setPassword}
                        />
                        <TouchableOpacity
                          style={styles.eyeIcon}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Feather
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#666"
                          />
                        </TouchableOpacity>
                      </View>
                      {formError.password && (
                        <Text style={styles.error}>{formError.password}</Text>
                      )}
                    </View>

                    <View style={styles.formInputContainer}>
                      <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>is Admin ?</Text>
                        <Switch
                          trackColor={{ false: "#E0E0E0", true: "#F6461A" }}
                          thumbColor={userType === "Admin" ? "#fff" : "#fff"}
                          ios_backgroundColor="#E0E0E0"
                          onValueChange={(value) =>
                            setUserType(value ? "Admin" : "User")
                          }
                          value={userType === "Admin"}
                        />
                      </View>
                      {formError.userType && (
                        <Text style={styles.error}>{formError.userType}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={closeModal}
                      disabled={isAddLoading}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addButtonModal}
                      onPress={saveUser}
                      disabled={isAddLoading}
                    >
                      {isAddLoading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                        <Text style={styles.addButtonText}>
                          {editingUserId ? "Update" : "Add"}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          visible={filterModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Users</Text>
                {Object.values(filters).some((v) => v) && (
                  <TouchableOpacity onPress={handleClearAll}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalFilterSection}>
                  <Text style={styles.filterLabel}>Username</Text>
                  <TextInput
                    style={styles.filterInput}
                    value={tempFilters.userName}
                    onChangeText={(value) => updateFilter("userName", value)}
                    placeholder="Search by username"
                  />
                </View>

                <View style={styles.modalFilterSection}>
                  <Text style={styles.filterLabel}>Email</Text>
                  <TextInput
                    style={styles.filterInput}
                    value={tempFilters.emailId}
                    onChangeText={(value) => updateFilter("emailId", value)}
                    placeholder="Search by email"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.modalFilterSection}>
                  <Text style={styles.filterLabel}>Status</Text>

                  <SelectDropdown
                    data={statusOptions}
                    onSelect={(value) => {
                      setSelectedStatus(value);
                      updateFilter("status", value);
                    }}
                    defaultValue={selectedStatus}
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
                </View>

                <View style={styles.modalFilterSection}>
                  <Text style={styles.filterLabel}>Role</Text>
                  {renderRoleFilter()}
                </View>
              </ScrollView>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addButtonModal}
                  onPress={handleApplyFilters}
                >
                  <Text style={styles.addButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: isAbleToAddUser ? "#F6461A" : "#ccc",
            opacity: isAbleToAddUser ? 1 : 0.5,
          },
        ]}
        onPress={() => openModal()}
        disabled={!isAbleToAddUser}
      >
        <View style={styles.floatingButtonContent}>
          <Icon
            name="plus"
            size={30}
            color={isAbleToAddUser ? "#FFF" : "#000"}
          />
          <Text
            style={[
              styles.floatingButtonText,
              {
                color: isAbleToAddUser ? "#FFF" : "#000",
              },
            ]}
          >
            Add User
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
