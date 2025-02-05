import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LeadDetails = () => {
  const openWhatsApp = (number, message) => {
    const url = `whatsapp://send?phone=${number}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url).catch(() => {
      alert("Make sure WhatsApp is installed on your device");
    });
  };

  return (
    <View style={{ flex: 1, alignContent: "flex-end" }}>
      <SafeAreaView />
      <View
        style={{
          padding: 16,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => Linking.openURL("sms:8866859661")}>
          <Ionicons name="chatbubble-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:dhrumil.shah.9798@gmail.com")}
        >
          <Ionicons name="mail-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("tel:8866859661")}>
          <Ionicons name="call-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openWhatsApp(
              "8866859661",
              "Hello, I would like to discuss further."
            )
          }
        >
          <Ionicons name="logo-whatsapp" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeadDetails;
