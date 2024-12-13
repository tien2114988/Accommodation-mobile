import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { PostModel, TakePostModel } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from '../ui/divider';
import { Room } from '@/app/(tabs)/(search)';
import { Image } from '../ui/image';

interface Props {
  rooms: Room[];
}

const RoomList = ({ rooms }: Props) => {
  return (
    <ScrollView className="bg-white">
      {rooms &&
        rooms.map((room, index) => (
          <Box key={index}>
            <Box className="mx-3">
              <Divider />
            </Box>
            <Pressable>
              {({ pressed }) => (
                <HStack
                  space="md"
                  className={`flex flex-auto p-4 ${pressed && 'opacity-75'}`}
                >
                  <Box>
                    <Image
                      size="xl"
                      source={{
                        uri: `${room.avatar}`,
                      }}
                      alt="image"
                      className="rounded-lg"
                    />
                  </Box>
                  <VStack space="xs" className="w-2/3">
                    <Text className="font-medium line-clamp-2">
                      {room.title}
                    </Text>
                    <Box className="flex flex-row justify-between items-center">
                      <VStack>
                        <Text className="text-success-300">
                          {room.price.toLocaleString()} đ/tháng
                        </Text>
                        <Text>{room.area} m²</Text>
                      </VStack>
                      <Text className="text-tertiary-300">
                        • {room.hour} giờ trước
                      </Text>
                    </Box>
                    <HStack space="xs" className="flex">
                      <Text className="text-error-400">
                        <Ionicons size={20} name="location" />
                      </Text>
                      <Text className="w-11/12 line-clamp-1">
                        {room.location}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              )}
            </Pressable>
          </Box>
        ))}
    </ScrollView>
  );
};

export default RoomList;
