import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useSignUpApiMutation } from "../api/signupAPI";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signup, { isLoading }] = useSignUpApiMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    // Input Validation
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await signup({
        userName: name,
        emailId: email,
        phoneNumber,
        password,
      }).unwrap();

      Alert.alert("Success", "Account created successfully! Please sign in.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      // Handle API errors
      console.log("Error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.data?.detailMessage ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.iconContainer}>
        <Text style={styles.title}>Sign Up</Text>
      </View> */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.input}
          maxLength={10}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.signUpButton, isLoading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <View style={styles.buttonContent}>
            {isLoading && (
              <ActivityIndicator color="#FFFFFF" style={styles.loader} />
            )}
            <Text style={styles.signUpButtonText}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Button
        title="Already have an account? Sign In"
        onPress={() => router.replace("/")}
        disabled={isLoading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  iconContainer: {
    marginBottom: 50,
  },
  formContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginVertical: 16,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: "#F6461A",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.23,
    fontWeight: "500",
    fontFamily: "Inter-Regular",
    // paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 16,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  loader: {
    marginRight: 8,
  },
});
