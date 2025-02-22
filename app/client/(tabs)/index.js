import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AdminHome from "../../../components/Home/admin";
import UserHome from "../../../components/Home/user";
import { BackHandler } from "react-native";
import { usePathname, useNavigation } from "expo-router";

export default function Tab() {
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  const userType = useSelector((state) => state.user.userType);
  const pathname = usePathname();

  useEffect(() => {
    const backAction = () => {
      // Prevent back only on home tab
      if (pathname === "/client" && focused) {
        return true; // Prevent back
      }
      return false; // Allow back on other screens
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pathname, focused]);
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
