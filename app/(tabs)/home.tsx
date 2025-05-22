import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>This is text is of the home page or link the dashboard</Text>

      <Link href="/books">View all books</Link>
    </View>
  );
}
