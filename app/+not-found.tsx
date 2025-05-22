import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View>
      <Text>Sorry the page you are looking is not currently available</Text>
      <Link href={"/"}>Go to home screen</Link>
    </View>
  );
}
