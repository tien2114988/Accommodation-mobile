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
import { PostModel } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from '../ui/divider';
import { Image } from '../ui/image';
import { router } from 'expo-router';
import { timeAgo } from '@/utils/dateUtil';

interface Props {
  rooms: PostModel[];
  refetch: (options?: {
    force?: boolean;
    throwOnError?: boolean;
  }) => Promise<any>;
}

const RoomList = ({ rooms, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const navigateToRoom = (id: number) => {
    console.log(id);
    router.push(`/(rooms)/Room?id=${id}`);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  const renderItem = ({ item }: ListRenderItemInfo<PostModel>) => {
    return (
      <Box className="">
        <Box className="mx-3">
          <Divider />
        </Box>
        <Pressable onPress={() => navigateToRoom(item.id)}>
          {({ pressed }) => (
            <HStack
              space="md"
              className={`flex flex-auto p-4 ${pressed && 'opacity-75'}`}
            >
              <Box>
                <Image
                  size="xl"
                  source={{
                    uri:
                      item.pictures.length > 0
                        ? 'https://accomodation-seeking-backend.onrender.com/pictures/' +
                          item.pictures[0]
                        : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
                  }}
                  alt="image"
                  className="rounded-lg"
                />
              </Box>

              <VStack space="xs" className="w-2/3">
                <Text className="font-medium line-clamp-2">{item.name}</Text>
                <Box className="flex flex-row justify-between items-center">
                  <VStack>
                    <Text className="text-success-300">
                      {item.price.toLocaleString()} đ/tháng
                    </Text>
                    <Text>{item.area} m²</Text>
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
            </HStack>
          )}
        </Pressable>
      </Box>
    );
  };

  console.log(rooms);

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

      // onEndReached={loadMore}
      // onEndReachedThreshold={0.5}
      // ListFooterComponent={
      //   isFetching ? <ActivityIndicator size="small" /> : null
      // }
    />
  );
};

export default RoomList;
