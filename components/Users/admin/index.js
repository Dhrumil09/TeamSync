import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import useHandleUsers from "./hooks/useHandleUsers";

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
  const { users, setUsers, addUser, isAbleToAddUser } = useHandleUsers();
  const openModal = (user = null) => {
    if (user) {
      setUserName(user.userName);
      setEmailId(user.emailId);
      setPhoneNumber(user.phoneNumber);
      setPassword("");
      setUserType(user.userType);
      setEditingUserId(user.id);
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
      Alert.alert("User added", `Name: ${userName}, Email: ${emailId}`);
    }

    closeModal();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", alignContent: "center" }}
        >
          Users
        </Text>
      </View>

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
      <ScrollView>
        <View style={styles.userListContainer}>
          {users.map((user) => (
            <View key={user?.userId} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardUserName}>{user.userName}</Text>
                <Text style={styles.cardPhoneNumber}>{user.phoneNumber}</Text>
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
        </View>
      </ScrollView>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    {editingUserId ? "Edit User" : "Add New User"}
                  </Text>
                  <View style={{ marginBottom: 16 }}>
                    <TextInput
                      style={[
                        styles.input,
                        formError.userName && styles.errorInput,
                      ]}
                      placeholder="User Name"
                      value={userName}
                      onChangeText={setUserName}
                    />
                    {formError.userName && (
                      <Text style={styles.error}>{formError.userName}</Text>
                    )}
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <TextInput
                      style={[
                        styles.input,
                        formError.emailId && styles.errorInput,
                      ]}
                      placeholder="Email ID"
                      value={emailId}
                      onChangeText={setEmailId}
                    />
                    {formError.emailId && (
                      <Text style={styles.error}>{formError.emailId}</Text>
                    )}
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <TextInput
                      style={[
                        styles.input,
                        formError.phoneNumber && styles.errorInput,
                      ]}
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="numeric"
                    />
                    {formError.phoneNumber && (
                      <Text style={styles.error}>{formError.phoneNumber}</Text>
                    )}
                  </View>
                  {!editingUserId && (
                    <View style={{ marginBottom: 16 }}>
                      <TextInput
                        style={[
                          styles.input,
                          formError.password && styles.errorInput,
                        ]}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                      />
                      {formError.password && (
                        <Text style={styles.error}>{formError.password}</Text>
                      )}
                    </View>
                  )}
                  <View style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>User Type:</Text>
                    <View style={styles.radioGroup}>
                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setUserType("User")}
                      >
                        <View
                          style={[
                            styles.radioCircle,
                            userType === "User" && styles.radioSelected,
                          ]}
                        />
                        <Text>User</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setUserType("Admin")}
                      >
                        <View
                          style={[
                            styles.radioCircle,
                            userType === "Admin" && styles.radioSelected,
                          ]}
                        />
                        <Text>Admin</Text>
                      </TouchableOpacity>
                    </View>
                    {formError.userType && (
                      <Text style={styles.error}>{formError.userType}</Text>
                    )}
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={closeModal}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addButtonModal}
                      onPress={saveUser}
                    >
                      <Text style={styles.addButtonText}>
                        {editingUserId ? "Update" : "Add"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
  userListContainer: {
    marginTop: 16, // Adjusted to prevent overlap with floating button
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardUserName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPhoneNumber: {
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    padding: 8,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 30,
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#000",
  },
  addButtonModal: {
    padding: 10,
    backgroundColor: "#F6461A",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: { backgroundColor: "#F6461A", borderColor: "#F6461A" },
});
