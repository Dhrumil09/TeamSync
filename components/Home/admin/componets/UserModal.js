import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import useHandleUserModal from "../hooks/useHandleUserModal";
const { height } = Dimensions.get("window");

const UserSelectionModal = ({ visible, onClose, onSelect }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
    usersListData,
    getUserList,
    loadMoreUsers,
    searchText,
    setSearchText,
  } = useHandleUserModal();

  const toggleSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user.userId)
        ? prev.filter((u) => u !== user.userId)
        : [...prev, user.userId]
    );
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => toggleSelection(item)}
    >
      <View>
        <Text style={styles.userText}>{item.userName}</Text>
        <Text style={styles.userEmail}>{item.emailId}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      {selectedUsers.includes(item.userId) ? (
        <Feather name="check-circle" size={20} color="#F6461A" />
      ) : (
        <Feather name="circle" size={20} color="gray" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Users</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search user..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={usersListData}
            keyExtractor={(item) => item?.userId?.toString()}
            renderItem={renderUserItem}
            contentContainerStyle={styles.listContainer}
            onEndReached={loadMoreUsers}
            onEndReachedThreshold={0.2}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onSelect(selectedUsers);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: height * 0.7,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userText: {
    fontSize: 16,
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  userRole: {
    fontSize: 14,
    color: "gray",
  },
  listContainer: {
    maxHeight: height * 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#F6461A",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserSelectionModal;
