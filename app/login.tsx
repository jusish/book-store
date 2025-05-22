import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any valid email/password
      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => router.replace("/home")
        }
      ]);
    } catch {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-12">
          <View className="bg-white rounded-2xl p-8 shadow-lg">
            <Text className="text-4xl font-bold text-center mb-2 text-slate-800">
              Book Store
            </Text>
            <Text className="text-base text-center mb-8 text-gray-600 leading-6">
              Welcome back! Please sign in to your account
            </Text>

            <View className="mb-6">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Email
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
              ) : null}
            </View>

            <View className="mb-6">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Password
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                secureTextEntry
                autoCapitalize="none"
              />
              {passwordError ? (
                <Text className="text-red-500 text-sm mt-1">
                  {passwordError}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              className={`rounded-lg p-4 items-center mt-4 ${
                isLoading ? "bg-gray-400" : "bg-blue-500"
              }`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-semibold">
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-6">
            <Text className="text-base text-gray-600">
              Don&apos;t have an account?{" "}
            </Text>
            <Link href="/register">
              <Text className="text-base text-blue-500 font-semibold">
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
