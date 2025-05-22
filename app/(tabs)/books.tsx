import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    "All",
    "Fiction",
    "Science",
    "History",
    "Technology",
    "Biography"
  ];

  // Mock book data

  const loadBooks = useCallback(async () => {
    const mockBooks = [
      {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        category: "Fiction",
        rating: 4.5,
        cover: "https://via.placeholder.com/150x200/4F46E5/FFFFFF?text=Book",
        description: "A classic American novel set in the Jazz Age"
      },
      {
        id: "2",
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        price: 15.99,
        category: "Science",
        rating: 4.8,
        cover: "https://via.placeholder.com/150x200/059669/FFFFFF?text=Book",
        description: "An exploration of cosmology and theoretical physics"
      },
      {
        id: "3",
        title: "Steve Jobs",
        author: "Walter Isaacson",
        price: 18.99,
        category: "Biography",
        rating: 4.6,
        cover: "https://via.placeholder.com/150x200/DC2626/FFFFFF?text=Book",
        description: "The official biography of Apple co-founder Steve Jobs"
      },
      {
        id: "4",
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 24.99,
        category: "Technology",
        rating: 4.7,
        cover: "https://via.placeholder.com/150x200/7C3AED/FFFFFF?text=Book",
        description: "A handbook of agile software craftsmanship"
      },
      {
        id: "5",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 16.99,
        category: "History",
        rating: 4.4,
        cover: "https://via.placeholder.com/150x200/EA580C/FFFFFF?text=Book",
        description: "A brief history of humankind"
      },
      {
        id: "6",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 13.99,
        category: "Fiction",
        rating: 4.9,
        cover: "https://via.placeholder.com/150x200/0891B2/FFFFFF?text=Book",
        description: "A timeless story of racial injustice and childhood"
      }
    ];
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBooks(mockBooks);
    } catch {
      Alert.alert("Error", "Failed to load books");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterBooks = useCallback(() => {
    let filtered = books;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedCategory]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  useEffect(() => {
    filterBooks();
  }, [filterBooks]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBooks();
    setRefreshing(false);
  };

  const handleAddToCart = (book: Book) => {
    Alert.alert(
      "Added to Cart",
      `"${book.title}" has been added to your cart!`,
      [{ text: "OK" }]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} className="text-yellow-400">
          ★
        </Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key="half" className="text-yellow-400">
          ☆
        </Text>
      );
    }

    return <View className="flex-row">{stars}</View>;
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image
          source={{ uri: item.cover }}
          className="w-20 h-28 rounded-lg mr-4"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text
            className="text-lg font-bold text-slate-800 mb-1"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text className="text-sm text-gray-600 mb-2">by {item.author}</Text>
          <Text className="text-xs text-gray-500 mb-2" numberOfLines={2}>
            {item.description}
          </Text>

          <View className="flex-row items-center mb-2">
            {renderStars(item.rating)}
            <Text className="text-sm text-gray-600 ml-2">({item.rating})</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-green-600">
              ${item.price}
            </Text>
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-lg"
              onPress={() => handleAddToCart(item)}
            >
              <Text className="text-white font-semibold text-sm">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className={`px-4 py-2 mx-2 rounded-full ${
        selectedCategory === item ? "bg-blue-500" : "bg-gray-100"
      }`}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        className={`font-medium ${
          selectedCategory === item ? "text-white" : "text-gray-700"
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Loading books...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-6 shadow-sm">
        <Text className="text-2xl font-bold text-slate-800 mb-4">
          Discover Books
        </Text>

        {/* Search Bar */}

        <View className="flex-row gap-4">
          <TextInput
            className="bg-gray-100 rounded-full px-4 py-3 text-base mb-4 flex-1"
            placeholder="Search books or authors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            className="w-12 h-12 bg-gray-100 items-center justify-center text-center rounded-full"
            onPress={() =>
              Alert.alert("Create a Book", "You can create a new book here.")
            }
          >
            <Text>➕</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        />
      </View>

      {/* Books List */}
      <View className="flex-1 px-6 pt-4">
        <Text className="text-lg font-semibold text-slate-800 mb-4">
          {filteredBooks.length} books found
        </Text>

        <FlatList
          data={filteredBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-gray-500 text-lg mb-2">No books found</Text>
              <Text className="text-gray-400 text-center">
                Try adjusting your search or category filter
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
