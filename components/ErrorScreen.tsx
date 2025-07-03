import { Text, View } from "react-native";

const ErrorScreen = ({ error }: { error: Error }) => (
  <View>
    <Text className="text-white">Error: {error.message}</Text>
  </View>
);

export default ErrorScreen;
