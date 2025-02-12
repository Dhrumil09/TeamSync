import { View, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AdminProfile from "../../../components/profile/admin";
import UserProfile from "../../../components/profile/user";

export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    height: "100%",
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
