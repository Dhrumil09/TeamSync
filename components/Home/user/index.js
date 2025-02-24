import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AppIcon from "../../../assets/images/AppIcon";
import useManageDashboard from "./hooks/useManageDashboard";

export default function Tab() {
  const {
    projectData,
    userDetails,
    setSelectedProject,
    selectedProject = "",
  } = useManageDashboard();

  useEffect(() => {
    if (projectData) {
      if (projectData.length > 0 && !selectedProject) {
        setSelectedProject(projectData[0]);
      }
    }
  }, [projectData, selectedProject]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppIcon />
          <Text style={styles.appTitle}>
            {`Hello, ${userDetails?.userName?.split(" ")[0]}`}
          </Text>
        </View>

        <View>
          {projectData?.length > 1 ? (
            <SelectDropdown
              data={projectData}
              statusBarTranslucent={true}
              onSelect={(selectedItem) => {
                setSelectedProject(selectedItem);
              }}
              defaultValue={selectedProject}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem?.projectName) ||
                      "Select Project"}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>
                    {item?.projectName}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          ) : (
            <Text style={styles.singleProjectText}>
              {selectedProject?.projectName || "No Project"}
            </Text>
          )}
        </View>
      </View>

      <ScrollView>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>
                {userDetails?.openLeads || 0}
              </Text>
            </View>
            <Text style={styles.statLabel}>New Assigned</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>
                {userDetails?.assignedLeads || 0}
              </Text>
            </View>
            <Text style={styles.statLabel}>Total Assigned</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>
                {userDetails?.completedLeads || 0}
              </Text>
            </View>
            <Text style={styles.statLabel}>Total Contacted</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  },
  appTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 13,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  statBox: {
    alignItems: "center",
  },
  statValueContainer: {
    backgroundColor: "#D9D9D9",
    height: 87,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 31,
    fontWeight: "400",
  },
  statLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
  },
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#E9ECEF",
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  singleProjectText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#151E26",
    paddingVertical: 8,
  },
});
