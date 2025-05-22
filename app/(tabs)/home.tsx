import ProfileMenu from "@/components/UserMenu";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const [userName] = useState("John Doe");
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    readBooks: 0,
    favoriteGenre: "Fiction"
  });

  const loadDashboardData = useCallback(async () => {
    // Mock featured books
    const mockFeaturedBooks = [
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 14.99,
        cover: "https://via.placeholder.com/120x160/6366F1/FFFFFF?text=Book",
        isNew: true,
        rating: 4.5 // Add this
      },
      {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 16.99,
        cover: "https://via.placeholder.com/120x160/10B981/FFFFFF?text=Book",
        isPopular: true,
        rating: 4.8 // Add this
      },
      {
        id: "3",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 13.99,
        cover: "https://via.placeholder.com/120x160/F59E0B/FFFFFF?text=Book",
        isRecommended: true,
        rating: 4.2 // Add this
      }
    ];
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeaturedBooks(mockFeaturedBooks);
      setStats({
        totalBooks: 1247,
        readBooks: 23,
        favoriteGenre: "Science Fiction"
      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const quickActions = [
    {
      id: "1",
      title: "Browse Books",
      description: "Explore our collection",
      icon: "📚",
      color: "bg-blue-500",
      action: () => router.push("/books")
    },
    {
      id: "2",
      title: "My Reading List",
      description: "Books you want to read",
      icon: "📖",
      color: "bg-green-500",
      action: () =>
        Alert.alert("Coming Soon", "Reading list feature is coming soon!")
    },
    {
      id: "3",
      title: "Recommendations",
      description: "Personalized for you",
      icon: "⭐",
      color: "bg-purple-500",
      action: () =>
        Alert.alert("Coming Soon", "Recommendations feature is coming soon!")
    },
    {
      id: "4",
      title: "New Releases",
      description: "Latest additions",
      icon: "🆕",
      color: "bg-orange-500",
      action: () =>
        Alert.alert("Coming Soon", "New releases section is coming soon!")
    }
  ];

  const renderFeaturedBook = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="mr-4 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
      onPress={() =>
        Alert.alert("Book Details", `View details for "${item.title}"`)
      }
    >
      <View className="relative">
        <Image
          source={{ uri: item.cover }}
          className="w-24 h-32 rounded-lg mb-2"
          resizeMode="cover"
        />
        {item.isNew && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-bold">NEW</Text>
          </View>
        )}
        {item.isPopular && (
          <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-bold">HOT</Text>
          </View>
        )}
        {item.isRecommended && (
          <View className="absolute -top-1 -right-1 bg-purple-500 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-bold">★</Text>
          </View>
        )}
      </View>
      <Text className="font-semibold text-slate-800 text-sm" numberOfLines={2}>
        {item.title}
      </Text>
      <Text className="text-gray-600 text-xs mb-1">{item.author}</Text>
      <Text className="font-bold text-green-600 text-sm">${item.price}</Text>
    </TouchableOpacity>
  );

  const renderQuickAction = ({ item }: { item: QuickAction }) => (
    <TouchableOpacity className="flex-1 mx-1 mb-3" onPress={item.action}>
      <View className={`${item.color} rounded-xl p-4 min-h-24`}>
        <Text className="text-2xl mb-1">{item.icon}</Text>
        <Text className="text-white font-semibold text-sm mb-1">
          {item.title}
        </Text>
        <Text className="text-white/80 text-xs">{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-2 px-6">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-black/80 text-base">Welcome back,</Text>
            <Text className="text-slate-800 text-2xl font-bold">
              {userName}! 👋
            </Text>
          </View>
          <ProfileMenu />
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-lg">
            <Text className="text-black/80 text-sm">Total Books</Text>
            <Text className="text-black text-2xl font-bold">
              {stats.totalBooks.toLocaleString()}
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-lg">
            <Text className="text-black/80 text-sm">Books Read</Text>
            <Text className="text-black text-2xl font-bold">
              {stats.readBooks}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-6">
        <Text className="text-xl font-bold text-slate-800 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap">
          {quickActions.map((item, index) => (
            <View key={item.id} className="w-1/2">
              {renderQuickAction({ item })}
            </View>
          ))}
        </View>
      </View>

      {/* Featured Books */}
      <View className="px-6 pb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-slate-800">
            Featured Books
          </Text>
          <Link href="/books">
            <Text className="text-blue-500 font-semibold">View All</Text>
          </Link>
        </View>

        <FlatList
          data={featuredBooks}
          renderItem={renderFeaturedBook}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        />
      </View>

      {/* Reading Progress */}
      <View className="px-6 pb-6">
        <Text className="text-xl font-bold text-slate-800 mb-4">
          Your Reading Journey
        </Text>
        <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-slate-700 font-semibold">Monthly Goal</Text>
            <Text className="text-sm text-gray-600">3 of 5 books</Text>
          </View>

          <View className="bg-gray-200 rounded-full h-3 mb-4">
            <View className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full w-3/5" />
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">60%</Text>
              <Text className="text-sm text-gray-600">Complete</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">
                {stats.favoriteGenre}
              </Text>
              <Text className="text-sm text-gray-600">Favorite Genre</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-6 pb-8">
        <Text className="text-xl font-bold text-slate-800 mb-4">
          Recent Activity
        </Text>
        <View className="bg-white rounded-xl shadow-sm border border-gray-100">
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">
                  Finished reading &quot;The Alchemist&quot;
                </Text>
                <Text className="text-gray-600 text-sm">2 days ago</Text>
              </View>
            </View>
          </View>

          <View className="p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">
                  Added 3 books to reading list
                </Text>
                <Text className="text-gray-600 text-sm">1 week ago</Text>
              </View>
            </View>
          </View>

          <View className="p-4">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">
                  Joined the BookStore community
                </Text>
                <Text className="text-gray-600 text-sm">2 weeks ago</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
