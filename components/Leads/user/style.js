import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "white", // Match container background
  },
  clearSearchButton: {
    padding: 8,
    marginRight: 4,
    backgroundColor: "white", // Match container background
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F6461A",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  chipScrollView: {
    maxHeight: 40,
    paddingHorizontal: 16,
  },
  chipScrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  leadContainer: {
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 16,
  },
  leadContent: {
    padding: 16,
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
  leadHeader: {
    marginBottom: 16,
  },
  leadName: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 4,
  },
  addedOnText: {
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "300",
    fontStyle: "italic",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F6461A",
    width: 140,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flexDirection: "row",
    zIndex: 1,
  },
  floatingButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#F6461A",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabButtonText: {
    color: "#F6461A",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#000",
  },
  addButtonModal: {
    padding: 10,
    backgroundColor: "#F6461A",
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
  },
  selectedFileText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  dropdownButton: {
    width: "100%",
    height: 50,

    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  dropdownButtonText: {
    textAlign: "left",
    fontSize: 14,
    color: "#444",
  },
  dropdownButtonStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: "#151E26",
    textAlign: "left",
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
    color: "#666",
  },
  dropdownItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },
  dropdownItemTxtStyle: {
    fontSize: 14,
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F6461A",
    marginRight: 8,
  },
  filterButtonText: {
    color: "#F6461A",
    marginLeft: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipText: {
    marginRight: 4,
    fontSize: 12,
  },
  clearAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  clearAllText: {
    color: "#F6461A",
  },
  modalFilterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  filterDropdown: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filterDropdownText: {
    fontSize: 14,
    textAlign: "left",
    color: "#333",
  },
  dropdownStyle: {
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownRowText: {
    fontSize: 14,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  starIcon: {
    marginRight: 8,
  },
  applyButton: {
    padding: 10,
    backgroundColor: "#F6461A",
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFF",
    fontWeight: "500",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  clearAllButtonModal: {
    padding: 8,
  },
  clearAllText: {
    color: "#F6461A",
    fontSize: 14,
    fontWeight: "500",
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    height: 32, // Increased height slightly
    minWidth: 100,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
    flex: 1, // Add this to ensure text takes available space
  },
  chipLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  chipContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipValue: {
    fontSize: 14,
    color: "#151E26",
    fontWeight: "500",
    marginRight: 8,
    flex: 1,
  },
  filterChipsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#525252",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6F6F6F",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  assignedUserContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between", // Changed from flex-end
    width: "100%",
  },
  unassignedText: {
    color: "#666",
    fontStyle: "italic",
    fontSize: 12,
    fontSize: 14,
    marginRight: 4,
  },
  assignedUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // Increased for pill shape
    borderWidth: 1,
    borderColor: "#81C784",
    maxWidth: "60%",
    elevation: 1, // Add subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  userAvatarText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  assignedUserName: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "500",
  },
  assignedUserRole: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  assignButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  assignButtonText: {
    fontSize: 13,
    color: "#666",

    fontWeight: "500",
  },
  assignedLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1, // This will push the right content
  },
  assignedSection: {
    marginTop: 8, // Reduced from 12
    borderTopWidth: 1,
    flex: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Make wrapper take available space
  },
  unassignedButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1, // Take remaining space
    justifyContent: "center", // Center content
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    minWidth: 90,
    marginLeft: "auto", // Push to right
  },
  // User selection modal styles
  userSelectionModal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  userModalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  userModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  userModalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  userSearchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 12,
  },
  userList: {
    marginTop: 8,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  userName: {
    fontSize: 14,
    marginLeft: 12,
    color: "#333",
  },
  selectedUser: {
    backgroundColor: "#F5F5F5",
  },

  // Updated card styles
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  assignmentChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  unassignedChip: {
    backgroundColor: "#FFF3E0",
    borderColor: "#FFB74D",
  },
  assignedChip: {
    backgroundColor: "#E8F5E9",
    borderColor: "#81C784",
  },
  chipIcon: {
    marginRight: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
  },
  unassignedText: {
    color: "#F57C00",
  },
  assignedText: {
    color: "#2E7D32",
  },
  assignedUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // Increased for pill shape
    borderWidth: 1,
    borderColor: "#81C784",
    maxWidth: "60%",
    elevation: 1, // Add subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  unassignedUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // Increased for pill shape
    borderWidth: 1,
    borderColor: "#FFB74D",
    maxWidth: "60%",
    elevation: 1, // Add subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  assignedUserID: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "500",
    marginRight: 8, // Increased spacing
  },
  unassignedText: {
    fontSize: 14,
    color: "#666",
    marginRight: 8, // Increased spacing
  },
  assignedEditIcon: {
    marginLeft: 4,
    padding: 2,
  },
  assignedLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1, // This will push the right content
  },
  assignmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 8, // Add gap between label and info
  },
  switchFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    marginRight: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  selfAssignButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6461A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F6461A",
    maxWidth: "60%",
  },
  selfAssignButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
