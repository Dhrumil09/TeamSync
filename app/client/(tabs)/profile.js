import { View, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AdminProfile from "../../../components/profile/admin";
import UserProfile from "../../../components/profile/user";
import AppIcon from "../../../assets/images/AppIcon";
export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <StatusBar translucent />
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppIcon />
            <Text style={styles.appTitle}>{`Profile `}</Text>
          </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    paddingBottom: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 53,
  },

  appTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 13,
  },
});
