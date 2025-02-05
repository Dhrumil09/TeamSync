import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AdminHome from "../../../components/Home/admin";
import UserHome from "../../../components/Home/user";

export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <View style={styles.container}>
      {userType === "admin" ? <AdminHome /> : <UserHome />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
