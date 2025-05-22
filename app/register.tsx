import { Link, router } from "expo-router";
import React, { useState } from "react";
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

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  type Errors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const newErrors: Errors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Errors, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Success", "Account created successfully! Please sign in.", [
        {
          text: "OK",
          onPress: () => router.replace("/login")
        }
      ]);
    } catch {
      Alert.alert("Error", "Failed to create account. Please try again.");
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
              Join BookStore
            </Text>
            <Text className="text-base text-center mb-8 text-gray-600 leading-6">
              Create your account to start exploring books
            </Text>

            <View className="mb-4">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Full Name
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange("fullName", value)}
                autoCapitalize="words"
              />
              {errors.fullName ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Email
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email}
                </Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Password
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Create a strong password"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.password ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password}
                </Text>
              ) : null}
            </View>

            <View className="mb-6">
              <Text className="text-base font-semibold mb-2 text-slate-700">
                Confirm Password
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base bg-gray-50 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.confirmPassword ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              className={`rounded-lg p-4 items-center mt-4 ${
                isLoading ? "bg-gray-400" : "bg-blue-500"
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-semibold">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-base text-gray-600">
                Already have an account?{" "}
              </Text>
              <Link href="/login">
                <Text className="text-base text-blue-500 font-semibold">
                  Sign In
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
