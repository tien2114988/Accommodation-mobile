import React from 'react';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';
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
}

const RoomListManagement = ({ rooms }: Props) => {
  const navigateToRoom = (id: number) => {
    router.push(`/(rooms)/Room?id=${id}`);
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
                uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUS1NZgPRXUQsJyUL8E97KoVILblc3R6g4sQ&s`,
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

  return (
    <FlatList
      data={rooms}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default RoomListManagement;
