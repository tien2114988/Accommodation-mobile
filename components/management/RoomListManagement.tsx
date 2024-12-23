import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { PostModel, TakePostModel } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from '../ui/divider';
import { Image } from '../ui/image';
import { router } from 'expo-router';
import { Card } from '../ui/card';
import { timeAgo } from '@/utils/dateUtil';

interface Props {
  rooms: PostModel[];
  refetch: (options?: {
    force?: boolean;
    throwOnError?: boolean;
  }) => Promise<any>;
}

const RoomListManagement = ({ rooms, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  const navigateToRoom = (id: number) => {
    router.push(`/(rooms)/Room?id=${id}&manage=true`);
  };

  const renderItem = ({ item }: ListRenderItemInfo<PostModel>) => {
    return (
      <Pressable onPress={() => navigateToRoom(item.id)}>
        {({ pressed }) => (
          <Card
            variant="outline"
            className={`${
              pressed && 'opacity-75'
            } m-3 p-0 rounded-xl overflow-hidden`}
          >
            <Image
              size="2xl"
              source={{
                uri:
                  item.pictures.length > 0
                    ? 'https://accomodation-seeking-backend.onrender.com/pictures/' +
                      item.pictures[0]
                    : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
              }}
              alt="image"
              className="w-full"
            />
            <VStack space="xs" className="p-4">
              <Text className="font-medium line-clamp-2">{item.name}</Text>
              <Box className="flex flex-row justify-between items-center">
                <VStack space="xs">
                  <Text className="text-success-300 text-lg font-medium">
                    {item.price.toLocaleString()} đ/tháng
                  </Text>
                  <HStack space="xs">
                    <Text className="text-secondary-400">
                      <Ionicons name="square" size={20} />
                    </Text>
                    <Text>{item.area} m²</Text>
                  </HStack>
                </VStack>
                <Text className="text-tertiary-300">
                  • {timeAgo(item.postedAt)}
                </Text>
              </Box>
              <HStack space="xs" className="flex">
                <Text className="text-error-400">
                  <Ionicons size={20} name="location" />
                </Text>
                <Text className="w-11/12 line-clamp-1">{item.address}</Text>
              </HStack>
            </VStack>
          </Card>
        )}
      </Pressable>
    );
  };

  if (rooms.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full"
      >
        <Box className="flex flex-row w-full justify-center items-center">
          <Text className="text-lg text-secondary-400 text-center py-10">
            Không có bài đăng
          </Text>
        </Box>
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={rooms}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default RoomListManagement;
