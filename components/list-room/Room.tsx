import React from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { RoomDetailModel } from "@/types/postTypes";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { timeAgo } from "@/utils/dateUtil";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Center } from "../ui/center";
import { Divider } from "../ui/divider";

interface Props {
  room: RoomDetailModel;
}

export default function Room({ room }: Props) {
  const navigateToRoom = (id: number) => {
    router.push(`/(rooms)/Room?id=${id}`);
  };
  // console.log(room);

  return (
    <Box className="">
      <Pressable onPress={() => navigateToRoom(room.id)}>
        {({ pressed }) => (
          <HStack
            space="md"
            className={`flex flex-auto p-4 ${pressed && "opacity-75"}`}
          >
            <Box>
              <Image
                size="xl"
                source={{
                  uri:
                    room && room.pictures.length > 0
                      ? "https://accomodation-seeking-backend.onrender.com/pictures/" +
                        room.pictures[0]
                      : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
                }}
                alt="image"
                className="rounded-lg"
              />
            </Box>
            <VStack space="xs" className="w-2/3">
              <Text className="font-medium line-clamp-2">{room.name}</Text>
              <Box className="flex flex-row justify-between rooms-center">
                <VStack>
                  <Text className="text-success-300">
                    {room.price.toLocaleString()} đ/tháng
                  </Text>
                  <Text>{room.area} m²</Text>
                </VStack>

                <Text className="text-tertiary-300">
                  • {timeAgo(room.postedAt)}
                </Text>
              </Box>
              <HStack space="xs" className="flex">
                <Text className="text-error-400">
                  <Ionicons size={20} name="location" />
                </Text>
                <Text className="w-11/12 line-clamp-1">{room.address}</Text>
              </HStack>
            </VStack>
          </HStack>
        )}
      </Pressable>

      <Center>
        <Divider className="my h-[2px] w-[95%]" />
      </Center>
    </Box>
  );
}
