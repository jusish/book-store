import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const ProfileMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clear auth tokens)
    router.replace('/login'); // Redirect to login and clear navigation stack
    setIsMenuVisible(false); // Close menu after logout
  };

  const handleProfile = () => {
    // Placeholder for profile action
    Alert.alert('Profile', 'Profile settings coming soon!');
    setIsMenuVisible(false); // Close menu after action
  };

  const handleSettings = () => {
    // Placeholder for additional settings
    Alert.alert('Settings', 'Settings coming soon!');
    setIsMenuVisible(false); // Close menu after action
  };

  return (
    <View className="relative">
      <TouchableOpacity
        className="bg-white rounded-full p-3 shadow-md w-12 h-12"
        onPress={toggleMenu}
      >
        <Text className="text-black text-md items-center justify-center text-center">
          👤
        </Text>
      </TouchableOpacity>
      {isMenuVisible && (
        <View className="absolute top-14 right-0 bg-white rounded-lg p-4 shadow-md w-40 z-10">
          <TouchableOpacity
            className="p-2 border-b border-gray-200"
            onPress={handleProfile}
          >
            <Text className="text-black text-md">Profile 👤</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 border-b border-gray-200"
            onPress={handleSettings}
          >
            <Text className="text-black text-md">Settings ⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2"
            onPress={handleLogout}
          >
            <Text className="text-red-500 text-md">Logout 🚪</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileMenu;