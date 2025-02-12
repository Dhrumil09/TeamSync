import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AppIcon from "../assets/images/AppIcon";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/api/loginApi";
import { login, setToken } from "../store/slices/userSlice";
import GoogleIcon from "../assets/images/GoogleIcon";
import generateBasicAuthHeader from "../common/generateToken";
import  useGetUserDetails  from "@/hooks/useGetUserDetails";
import { useRootNavigationState } from 'expo-router'

export function useIsNavigationReady() {
  const rootNavigationState = useRootNavigationState()
  return rootNavigationState?.key != null
}
let user = {
  0: 'admin@test.com',
  1: 'vishal@test.com',
  2: 'crmuser10@test.com'
}

export default function SignInScreen() {
  const userType = useSelector((state) => state.user.userType);
  const isNavigationReady = useIsNavigationReady(); // Ensure navigation is ready
  const dispatch = useDispatch();
  const  {getUserDetails}  = useGetUserDetails();
  const [email, setEmail] = useState(user[2]);
  const [password, setPassword] = useState("test");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginApi, { isLoading, isSuccess }] = useLoginMutation();


useEffect(() => {
    if(isNavigationReady ){
      if(userType === 'admin' || userType === 'user'){
        getUserDetails();
        router.replace("/client/(tabs)"); 
      }
    }
}, [isNavigationReady]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignIn = async () => {
    let valid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Proceed if validation passes
    if (valid) {
      try {
        const response = await loginApi({ username: email, password }).unwrap();

        console.log("Login Success:", response);

        // Perform actions based on user type
        if (response?.role === "ADMIN") {
          dispatch(
            login({
              userType: "admin",
              data: response,
            })
          );
          const token = generateBasicAuthHeader(email, password);
          dispatch(setToken(token));
          router.replace("/client/(tabs)");
        } else if (response?.role === "USER") {
          dispatch(
            login({
              userType: "user",
              data: response,
            })
          );
          const token = generateBasicAuthHeader(email, password);
          dispatch(setToken(token));
          router.replace("/client/(tabs)");
        } else {
          Alert.alert("Login Failed", "Unknown user type");
        }
      } catch (error) {
        // Handle API errors
        console.log("Login Error:", error);

        // Show a user-friendly message
        const errorMessage =
          error?.data?.detailMessage ||
          error?.data?.message ||
          "Something went wrong. Please try again.";
        Alert.alert("Login Failed", errorMessage);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        {/* <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" style={styles.loader} />
          ) : null}
          <Text style={styles.loginButtonText}>
            {isLoading ? "Signing in..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.googleButton}>
          <GoogleIcon />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View> */}
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push("/signup")}
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
  inputContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#F6461A",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.23,
    fontWeight: "500",
    fontFamily: "Inter-Regular",
    paddingVertical: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loader: {
    marginRight: 8,
  },
});
