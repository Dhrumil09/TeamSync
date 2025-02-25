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
import AppIcon from "../assets/images/AppIcon";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signup, { isLoading }] = useSignUpApiMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

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
      console.log("Response:", response);
      setSignupSuccess(true);
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

  if (signupSuccess) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <AppIcon />
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>
            Thank you for creating account with us!
          </Text>
          <Text style={[styles.successDescription]}>
            Please contact support team for account activation and any
            assistance during the process.
          </Text>
          <View style={styles.supportContainer}>
            <Text style={styles.supportTitle}>Contact Support</Text>
            <Text style={styles.supportText}>Email: market@muggam.com</Text>
            <Text style={styles.supportText}>Phone: +1 (555) 123-4567</Text>
          </View>
        </View>
        <View style={styles.signInButtonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.signInButtonText}>
              Existing account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create new account</Text>
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
      <View style={styles.signInButtonContainer}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.replace("/")}
          disabled={isLoading}
        >
          <Text style={styles.signInButtonText}>Existing account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#FFFFFF", // Add white background
  },
  iconContainer: {
    marginBottom: 30, // Reduced from 50 to 30
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 0, // Reduced from 30 to 0
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
    marginTop: 30,
    marginBottom: 50, // Changed from 30 to 0
  },
  // Add specific style for the sign in button container
  signInButtonContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: "#387ED1", // Changed from #F6461A to #387ED1
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
  signInButton: {
    borderColor: "#387ED1", // Match the blue color
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  signInButtonText: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.23,
    fontWeight: "500",
    fontFamily: "Inter-Regular",
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000000",
    fontFamily: "Inter",
    lineHeight: 24.2,
    letterSpacing: 0,
    marginBottom: 16, // Add space between title and first input
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
  successContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60, // Increased from 40 to 60
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 60, // Increased from 40 to 60
  },
  successDescription: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 60,
    paddingHorizontal: 40, // Added horizontal padding
  },
  widerText: {
    marginHorizontal: 20, // Added horizontal margin
    width: "100%", // Ensure text takes full width
  },
  supportContainer: {
    alignItems: "center",
    marginTop: 60, // Increased from 40 to 60
    marginBottom: 60, // Added margin bottom
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  supportText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
