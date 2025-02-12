import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import useLogout from "../../../common/hooks/useLogout";
import useManageProfile from "./hooks/useManageProfile";

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const handleLogout = useLogout();
  const router = useRouter();
  const {
    updatedAccountName,
    setUpdatedAccountName,
    updateAccountName,
    validationError,
    userDetails,
  } = useManageProfile();

  const confirmLogout = () => {
    setModalVisible(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  const handleUpdateName = async () => {
    const success = await updateAccountName();
    if (success) {
      setEditNameModal(false);
    }
  };

  const handleOpenEditModal = () => {
    setUpdatedAccountName(userDetails?.accountName); // Reset to current account name
    setEditNameModal(true);
  };

  const handleCloseEditModal = () => {
    setUpdatedAccountName(userDetails?.accountName); // Reset to current account name
    setEditNameModal(false);
  };

  const ProfileButton = ({ title, route, onPress }) => (
    <TouchableOpacity
      style={styles.profileButton}
      onPress={onPress || (() => router.push(`/profile/${route}`))}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <ProfileButton title="Edit Account Name" onPress={handleOpenEditModal} />
      <ProfileButton title="Edit Profile" route="edit-profile" />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelLogout}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmLogout}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={editNameModal}
        onRequestClose={handleCloseEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Account Name</Text>
            <TextInput
              style={[styles.input, validationError ? styles.inputError : null]}
              value={updatedAccountName}
              onChangeText={setUpdatedAccountName}
              placeholder="Enter account name"
              placeholderTextColor="#666"
            />
            {validationError ? (
              <Text style={styles.errorText}>{validationError}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseEditModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleUpdateName}
              >
                <Text style={styles.confirmButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
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
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
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
  confirmButton: {
    padding: 10,
    backgroundColor: "#F6461A",
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "#fff",
  },
  profileButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#F6461A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
  },
  inputError: {
    borderColor: "#F6461A",
  },
  errorText: {
    color: "#F6461A",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },
});
