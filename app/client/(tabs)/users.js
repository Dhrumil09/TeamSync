import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AdminUsers from "../../../components/Users/admin";

export default function Tab() {
  const userType = useSelector((state) => state.user.userType);

  return (
    <View style={styles.container}>
      <AdminUsers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
