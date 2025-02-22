import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Essential container and layout styles
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Header styles
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
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    padding: 8,
  },

  // Card styles
  cardContainer: {
    margin: 12,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 8,
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    flex: 1,
  },
  leadName: {
    fontSize: 20,
    flex: 1,
    fontWeight: "bold",
    color: "#333",
  },
  cardBody: {
    gap: 8,
    paddingTop: 4,
  },

  // Contact item styles
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    fontSize: 16,
    color: "#666",
  },

  // Status styles
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 160, // Ensure minimum width
    maxWidth: "50%", // Don't take too much space
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusSelect: {
    width: 160,
    height: 36,
    backgroundColor: "transparent",
    borderRadius: 8,
    marginLeft: "auto", // Push to right
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    width: "100%",
  },
  statusDropdown: {
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginTop: -20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // Meta card styles
  metaCardsContainer: {
    padding: 12,
    paddingTop: 0,
  },
  metaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  metaCardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  metaLabelContainer: {
    width: 60,
    paddingRight: 8,
  },
  metaContentContainer: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  metaCardHeader: {
    marginBottom: 8,
  },
  metaCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  // Rating styles
  ratingStars: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 20,
  },

  // Bottom section styles
  bottomSection: {
    backgroundColor: "#fff",
    position: "relative",
    zIndex: 1,
  },
  bottomActions: {
    paddingVertical: 8,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 12,
    marginTop: 5,
    color: "black",
  },
  selectedActionButtonText: {
    color: "#F6461A",
  },

  // Communication buttons
  communicationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
  },

  // Expandable section styles
  expandableSection: {
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    width: "100%",
  },
  expandableOverlay: {
    position: "absolute",
    top: -1000,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  expandableSectionContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },

  // Rating expandable section styles
  ratingExpandable: {
    paddingVertical: 12,
    alignItems: "center",
  },
  compactStarsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 4,
  },
  compactStarButton: {
    padding: 6,
  },
  compactRatingText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  // Opinion section styles
  opinionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  opinionButton: {
    alignItems: "center",
    width: 65,
    gap: 4,
  },
  opinionText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  selectedOpinionText: {
    color: "#0410F6",
    fontWeight: "600",
  },
  confusedIconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // Input styles
  inputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    minHeight: 80,
    justifyContent: "center",
  },
  noteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    maxHeight: 120,
    backgroundColor: "#F8F9FA",
  },
  submitButton: {
    padding: 12,
    borderRadius: 8,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    backgroundColor: "#4CAF50",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
    flex: 1,
    height: 36,
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
    minWidth: 60, // Match button min-width
  },

  // Overlay loader styles
  overlayLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loaderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metaCardDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
    width: "100%",
  },
  noteHeader: {
    marginTop: 5,
  },
});
