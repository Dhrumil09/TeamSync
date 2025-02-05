import { View, StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import AdminProfile from "../../../components/profile/admin";
import UserProfile from "../../../components/profile/user";

export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", alignContent: "center" }}
        >
          Profile
        </Text>
      </View>
      {userType === "admin" ? <AdminProfile /> : <UserProfile />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
