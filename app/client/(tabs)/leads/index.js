import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AdminLeads from "../../../../components/Leads/admin/index";
import UserLeads from "../../../../components/Leads/user/index";

export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <View style={styles.container}>
      {userType === "admin" ? <AdminLeads /> : <UserLeads />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
