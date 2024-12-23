import { Stack } from "expo-router";
import "react-native-reanimated";

export default function FriendLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="infor"
        options={{
          headerShown: true,
          title: "Thông tin người dùng",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
