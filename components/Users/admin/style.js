import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
  userListContainer: {
    marginTop: 8, // Reduced from 16
    paddingHorizontal: 16,
    paddingBottom: 80, // Add bottom padding for floating button
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardUserName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPhoneNumber: {
    fontSize: 14,
    color: "#777",
  },
  cardUserType: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    padding: 8,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#FFF",
  },
  errorInput: {
    borderColor: "#FF3B30",
  },
  error: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  addButtonModal: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F6461A",
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  },
  formContainer: {
    marginBottom: 16,
  },
  formInputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F6461A",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    backgroundColor: "#F6461A",
  },
  radioLabel: {
    fontSize: 14,
    color: "#151E26",
  },
  searchContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent", // Changed from white to transparent
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Changed from white to light gray
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F6461A",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#525252",
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalFilterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
    fontWeight: "500",
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 8,
  },
  chipScrollView: {
    maxHeight: 50,
    paddingHorizontal: 12,
    backgroundColor: "transparent", // Added transparent background
  },
  chipScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    backgroundColor: "transparent", // Added transparent background
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
    height: 30,
    minWidth: 100,
    marginVertical: 5, // Add vertical margin
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
    flex: 1,
  },
  clearAllText: {
    color: "#F6461A",
    fontSize: 14,
    fontWeight: "500",
  },
  dropdownButtonStyle: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    flexDirection: "row",
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
    backgroundColor: "#E9ECEF",
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
  },
  radioGroupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  roleRadioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    marginBottom: 8,
    minWidth: 100,
  },
  radioText: {
    fontSize: 14,
    color: "#151E26",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  loadingMoreContainer: {
    padding: 20,
    alignItems: "center",
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 130, // Increased padding to account for FAB and extra space
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
  userCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "white",
    marginVertical: 0,
  },
  userCardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 14,
    color: "#000",
    marginHorizontal: 8,
  },
  userCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "white",
    marginVertical: 0,
  },
  userCardContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  userCardHeader: {
    // marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: "600",
    color: "#151E26",
  },
  userDate: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "300",
    fontStyle: "italic",
    color: "#666",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userRole: {
    fontSize: 14,
    lineHeight: 16.94,
    color: "#666",
    fontStyle: "italic",
  },
});
