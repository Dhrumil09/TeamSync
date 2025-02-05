import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DisableView from "./DisableView/DisableView";

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  optional = false,
  icon,
  preComponent = null,
  postComponent = null,
  error = "",
  inputProps,
  disableView = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>
        {title}
        {optional ? (
          <Text style={styles.optionalText}>{" (Optional)"}</Text>
        ) : (
          ""
        )}
      </Text>
      <DisableView disable={disableView}>
        <View style={styles.inputParentContainer}>
          {preComponent ? preComponent : null}
          <View style={[styles.inputContainer, inputContainerStyle]}>
            {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              style={[styles.inputStyle, inputStyle]}
              placeholderTextColor={"#6B7280"}
              {...inputProps}
            />
          </View>
          {postComponent ? postComponent : null}
        </View>
      </DisableView>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
  },
  title: {
    color: "#111928",
    fontFamily: "inter-Regular",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
  },
  inputParentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    flexDirection: "row",
  },
  inputStyle: {
    color: "#111928",
    textAlignVertical: "top",
    flex: 1,
  },
  optionalText: {
    color: "#6B7280",
    fontWeight: "400",
  },
  iconContainer: {
    marginRight: 8,
  },
  errorText: {
    color: "#E02424",
    fontFamily: "inter-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
});
