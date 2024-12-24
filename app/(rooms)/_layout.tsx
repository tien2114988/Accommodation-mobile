import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RoomsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Room"
        options={{
          headerShown: true,
          title: 'Thông tin phòng',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="RoomManagement"
        options={{
          headerShown: true,
          title: 'Quản lý bài đăng',
          headerShadowVisible: false,
        }}
      />
      {/* <Stack.Screen
        name="PairSearch"
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
