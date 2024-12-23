import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PostForm"
        options={{
          title: 'Thông tin cơ bản',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="RoomTypeForm"
        options={{
          title: 'Tiện nghi và loại phòng',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="DescriptionForm"
        options={{
          title: 'Hình ảnh và mô tả',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          title: 'Xác nhận và đăng phòng',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
