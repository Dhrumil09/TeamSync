import React from "react";
import { Modal, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setIsDisconnectModalOpen } from "../features/helperSlice";

const NetworkErrorModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.helper.isDisconnectModalOpen
  );

  const closeModal = () => {
    dispatch(setIsDisconnectModalOpen(false));
  };

  return (
    <Modal visible={isModalOpen} transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>No internet connection</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default NetworkErrorModal;
