import React, { useState, useRef, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  StatusBar,
  TextInput,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ConfuseIcon from "../../../../assets/images/confuseIcon"; // Fixed import path
import { useLeadDetails } from "../../../hooks/useLeadDetails";
import { styles } from "../../../styles/leadDetails.styles";

const LeadDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  console.log("LeadDetails id:", id);
  const {
    leadData,
    isLoading,
    noteText,
    rating,
    activeSection,
    selectedOpinion,
    setNoteText,
    handleSubmitNote,
    handleStarPress,
    handleOutsideClick,
    toggleSection,
    handleOpinionSelect,
    handleStatusChange,
  } = useLeadDetails(id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    leadName: "",
    emailId: "",
    phoneNumber: "",
    status: "",
  });

  const [editingField, setEditingField] = useState(null); // Add this state

  const statusOptions = [
    "OPEN",
    "IN_PROGRESS",
    "CLOSED",
    "REJECTED",
    "ON_HOLD",
  ];

  const toggleFieldEdit = (fieldName) => {
    setEditingField(editingField === fieldName ? null : fieldName);
  };

  useEffect(() => {
    if (leadData) {
      setEditedData({
        leadName: leadData.leadName,
        emailId: leadData.emailId,
        phoneNumber: leadData.phoneNumber,
        status: leadData.status,
      });
    }
  }, [leadData]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const opinionOptions = [
    { icon: "user-x", label: "Differ", color: "#000000" }, // Changed from x-circle to user-x
    { icon: "x-circle", label: "Opt-out", color: "#000000" },
    { icon: "mug-hot", label: "In-meeting", color: "#000000" },
    { icon: "help-circle-outline", label: "Confused", color: "#000000" },
    { icon: "user-check", label: "Interested", color: "#000000" }, // Changed to user-check
  ];

  const openWhatsApp = (number, message) => {
    const url = `whatsapp://send?phone=${number}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url).catch(() => {
      alert("Make sure WhatsApp is installed on your device");
    });
  };

  const renderOpinionIcon = (option, isSelected) => {
    if (option.label === "Differ") {
      return (
        <Feather
          name="user-x"
          size={24}
          color={isSelected ? "#0410F6" : "#000000"}
        />
      );
    }
    if (option.label === "Interested") {
      return (
        <Feather
          name="user-check"
          size={24}
          color={isSelected ? "#0410F6" : "#000000"}
        />
      );
    }
    if (option.label === "Confused") {
      return (
        <View style={styles.confusedIconContainer}>
          <ConfuseIcon
            width={24}
            height={24}
            fill={isSelected ? "#0410F6" : "#000000"}
          />
        </View>
      );
    }
    if (option.label === "Differ" || option.label === "Opt-out") {
      return (
        <Feather
          name="x-circle"
          size={24}
          color={isSelected ? "#0410F6" : "#000000"}
        />
      );
    }
    if (option.label === "In-meeting") {
      return (
        <FontAwesome5
          name="mug-hot"
          size={24}
          color={isSelected ? "#0410F6" : "#000000"}
        />
      );
    }
    return (
      <Ionicons
        name={option.icon}
        size={24}
        color={isSelected ? "#0410F6" : "#000000"}
      />
    );
  };

  const [editFields, setEditFields] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [tempValues, setTempValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (leadData) {
      setTempValues({
        name: leadData.leadName,
        email: leadData.emailId,
        phone: leadData.phoneNumber,
      });
    }
  }, [leadData]);

  const handleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: false }));
    setTempValues((prev) => ({
      ...prev,
      [field]:
        field === "name"
          ? leadData.leadName
          : field === "email"
          ? leadData.emailId
          : leadData.phoneNumber,
    }));
  };

  const handleSubmit = async (field) => {
    // TODO: Add your API call here to update the field
    setEditFields((prev) => ({ ...prev, [field]: false }));
  };

  const renderEditableField = (
    field,
    value,
    icon,
    keyboardType = "default"
  ) => (
    <View style={styles.fieldWrapper}>
      {icon}
      {editFields[field] ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={tempValues[field]}
            onChangeText={(text) =>
              setTempValues((prev) => ({ ...prev, [field]: text }))
            }
            keyboardType={keyboardType}
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              onPress={() => handleSubmit(field)}
              style={styles.editActionButton}
            >
              <Ionicons name="checkmark" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCancel(field)}
              style={styles.editActionButton}
            >
              <Ionicons name="close" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.fieldText}>{value}</Text>
          <TouchableOpacity
            onPress={() => handleEdit(field)}
            style={styles.editIcon}
          >
            <Feather name="edit-2" size={16} color="#666" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0410F6" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />
      <StatusBar translucent />
      <View style={styles.container}>
        {/* Header section */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Lead Details</Text>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.mainContent}
          onTouchStart={handleOutsideClick}
        >
          {leadData && (
            <>
              <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                  <View style={styles.nameSection}>
                    <Text style={styles.leadName}>{leadData.leadName}</Text>
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusText}>{leadData.status}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.contactItem}>
                    <Ionicons name="mail-outline" size={20} color="#666" />
                    <Text style={styles.contactText}>{leadData.emailId}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Ionicons name="call-outline" size={20} color="#666" />
                    <Text style={styles.contactText}>
                      {leadData.phoneNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Combined Rating and Notes Card */}
              {(leadData.rating > 0 || leadData.note) && (
                <View style={styles.metaCardsContainer}>
                  <View style={styles.metaCard}>
                    {leadData.rating > 0 && (
                      <>
                        <View style={styles.metaCardHeader}>
                          <Text style={styles.metaCardTitle}>Rating</Text>
                        </View>
                        <View style={styles.ratingStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                              key={star}
                              name={
                                star <= leadData.rating
                                  ? "star"
                                  : "star-outline"
                              }
                              size={16}
                              color="#F6461A"
                            />
                          ))}
                        </View>
                      </>
                    )}

                    {leadData.rating > 0 && leadData.note && (
                      <View style={styles.metaCardDivider} />
                    )}

                    {leadData.note && (
                      <>
                        <View
                          style={[
                            styles.metaCardHeader,
                            leadData.rating > 0 && styles.noteHeader,
                          ]}
                        >
                          <Text style={styles.metaCardTitle}>Notes</Text>
                        </View>
                        <Text style={styles.noteText}>{leadData.note}</Text>
                      </>
                    )}
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Bottom section with actions */}
        <View style={styles.bottomSection}>
          {/* Expandable Notes Section */}
          {activeSection && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {activeSection === "notes" && (
                <View style={styles.expandableSection}>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.noteInput}
                      multiline
                      placeholder="Enter your notes here..."
                      value={noteText}
                      onChangeText={setNoteText}
                      textAlignVertical="top"
                      numberOfLines={4}
                    />
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        { backgroundColor: "#4CAF50" },
                      ]}
                      onPress={handleSubmitNote}
                    >
                      <Text style={[styles.submitButtonText, { fontSize: 16 }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {activeSection === "rating" && (
                <View
                  style={[styles.expandableSection, styles.ratingExpandable]}
                >
                  <View style={styles.compactStarsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => handleStarPress(star)}
                        style={styles.compactStarButton}
                      >
                        <Ionicons
                          name={star <= rating ? "star" : "star-outline"}
                          size={24}
                          color={star <= rating ? "#F6461A" : "#666"}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.compactRatingText}>
                    {rating > 0
                      ? `${rating} out of 5 stars`
                      : "Select a rating"}
                  </Text>
                </View>
              )}
              {activeSection === "opinion" && (
                <View style={styles.expandableSection}>
                  <View style={styles.opinionContainer}>
                    {opinionOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.opinionButton}
                        onPress={() => handleOpinionSelect(option.label)}
                      >
                        {renderOpinionIcon(
                          option,
                          selectedOpinion === option.label
                        )}
                        <Text
                          style={[
                            styles.opinionText,
                            selectedOpinion === option.label &&
                              styles.selectedOpinionText,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}

          <View style={styles.divider} />
          <View style={styles.bottomActions}>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleSection("notes")}
              >
                <Ionicons
                  name="document-text-outline"
                  size={35}
                  color={activeSection === "notes" ? "#F6461A" : "black"}
                />
                <Text
                  style={[
                    styles.actionButtonText,
                    activeSection === "notes" && { color: "#F6461A" },
                  ]}
                >
                  Notes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleSection("rating")}
              >
                <Ionicons
                  name="star-outline"
                  size={35}
                  color={activeSection === "rating" ? "#F6461A" : "black"}
                />
                <Text
                  style={[
                    styles.actionButtonText,
                    activeSection === "rating" && { color: "#F6461A" },
                  ]}
                >
                  Rating
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleSection("opinion")}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={35}
                  color={activeSection === "opinion" ? "#F6461A" : "black"}
                />
                <Text
                  style={[
                    styles.actionButtonText,
                    activeSection === "opinion" && { color: "#F6461A" },
                  ]}
                >
                  Opinion
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="timer-outline" size={35} color="black" />
                <Text style={styles.actionButtonText}>History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleStatusChange("SCHEDULED")}
              >
                <Ionicons name="time-outline" size={35} color="black" />
                <Text style={styles.actionButtonText}>Later</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.communicationButtonsContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${leadData?.phoneNumber}`)}
              >
                <Ionicons name="chatbubble-outline" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto: ${leadData?.emailId}`)}
              >
                <Ionicons name="mail-outline" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${leadData?.phoneNumber}`)}
              >
                <Ionicons name="call-outline" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openWhatsApp(
                    "8866859661",
                    "Hello, I would like to discuss further."
                  )
                }
              >
                <Ionicons name="logo-whatsapp" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LeadDetails;
