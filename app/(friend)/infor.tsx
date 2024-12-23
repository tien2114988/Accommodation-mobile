import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGetUserQuery } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import RoomSkeleton from "@/components/skeleton/RoomSkeleton";
import Ionicons from "@expo/vector-icons/Ionicons";

const Friend = () => {
  const { id } = useLocalSearchParams();
  const numericId = typeof id === "string" ? parseInt(id, 10) : null;
  const {
    data: currentUser,
    isLoading,
    error,
  } = useGetUserQuery(numericId!, {
    skip: !numericId, // Skip the query if numericId is null
  });
  if (isLoading) {
    return <RoomSkeleton />;
  }

  return (
    <SafeAreaView className="h-full p-4 w-full flex items-center bg-white">
      <VStack space="4xl" className="h-full flex p-4 w-full">
        {/* Title */}
        {/* <Box className="flex w-full">
          <Text className="text-2xl font-bold">Thông tin tài khoản</Text>
        </Box> */}
        {/* Avatar */}
        <Box className="w-full flex flex-row items-center gap-2 border border-gray-300  py-2 px-4 rounded-2xl ">
          <Pressable>
            {currentUser?.picture && (
              <Box>
                <Image
                  size="sm"
                  source={{
                    uri: `https://accomodation-seeking-backend.onrender.com/pictures/${currentUser?.picture}`,
                  }}
                  alt={`${currentUser?.name}`}
                  className="rounded-full shadow-lg"
                />
              </Box>
            )}
            {!currentUser?.picture && (
              <Box className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center border border-gray-300">
                <Text className="text-white text-lg font-bold">
                  {currentUser?.name[0]?.toUpperCase()}
                </Text>
              </Box>
            )}
          </Pressable>
          <Box className="px-4 flex flex-row items-center justify-between w-[80%]">
            <Text className="text-2xl text-black items-center font-medium">
              {currentUser?.name}
            </Text>
          </Box>
        </Box>
        {/* Email */}
        <Box className="w-full flex border border-gray-300 rounded-2xl">
          {/* Giới tính - Ngày sinh */}
          <HStack className="w-full flex items-center gap-2 justify-between border-b border-gray-300  py-3 px-5">
            <Box className="flex flex-row items-center gap-4">
              {/* <Fontisto name="intersex" size={32} color="black" /> */}
              {currentUser?.gender === "Nam" ? (
                <Ionicons name="male" size={32} color="#5AC1F2" />
              ) : (
                <Ionicons name="female" size={32} color="pink" />
              )}

              <Box className="flex flex-col justify-center ">
                <Text className="text-base font-nomral">Giới tính:</Text>
                <Text className="text-lg"> {currentUser?.gender}</Text>
              </Box>
            </Box>
            <Box className="flex flex-row items-center gap-4">
              <Ionicons
                name="calendar-number-outline"
                size={32}
                color="#A0ACC6"
              />
              <Box className="flex flex-col justify-center">
                <Text className="text-base font-nomral">Ngày sinh</Text>
                <Text className="text-lg">
                  {" "}
                  {currentUser?.birthdate.toString().substring(0, 10)}
                  {/* {extractDate(currentUser?.birthdate?.toString())} */}
                </Text>
              </Box>
            </Box>
          </HStack>
          {/* Email */}
          <HStack className="w-full flex items-center gap-2 justify-between  py-3 px-5 border-b border-gray-300">
            <Box className="w-full flex flex-row items-center gap-4 ">
              <Ionicons name="mail-outline" size={32} color="#df1f00" />
              <Box className="flex flex-col justify-center">
                <Text className="text-gray-400 text-bawse font-nomral">
                  Email
                </Text>
                <Text className="text-lg"> {currentUser?.email}</Text>
              </Box>
            </Box>
          </HStack>

          {/* Phone number */}
          <HStack className="w-full flex items-center gap-2 justify-between py-3 px-5">
            <Box className="flex flex-row items-center gap-4">
              <Ionicons name="call-outline" size={32} color="#6cb454" />
              <Box className="flex flex-col justify-center">
                <Text className="text-gray-400 text-bawse font-nomral">
                  Số điện thoại
                </Text>
                <Text className="text-lg"> {currentUser?.phone}</Text>
              </Box>
            </Box>
          </HStack>
        </Box>

        {/* Button */}
        <VStack className="w-full border border-gray-300 rounded-2xl">
          <Pressable onPress={() => router.push("/(rooms)/RoomManagement")}>
            <Box
              className="w-full p-4 flex flex-row items-center gap-1 
              justify-between border-b border-gray-300"
            >
              <Image
                source={require("@/assets/images/btn1.png")}
                className="w-10 h-10"
                resizeMode="cover"
              />
              <Text className="text-black text-xl font-medium">
                Bài đăng cho thuê phòng
              </Text>
              <AntDesign name="arrowright" size={24} color="black" />
            </Box>
          </Pressable>
          <Pressable onPress={() => router.push("/(rooms)/PairSearch")}>
            <Box
              className="w-full p-4 flex flex-row items-center gap-1
              justify-between "
            >
              <Image
                source={require("@/assets/images/btn2.png")}
                className="w-10 h-10"
                resizeMode="cover"
              />
              <Text className="text-black text-xl font-medium">
                Bài đăng cho tìm ở ghép
              </Text>
              <AntDesign name="arrowright" size={24} color="black" />
            </Box>
          </Pressable>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Friend;
