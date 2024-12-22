import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import {
  clearAuthState,
  selectIsAuthenticated,
  selectUser,
} from "@/store/reducers";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { useSelector } from "react-redux";
import RequiredAuthenticationModal from "@/components/authentication/RequiredAuthenticationModal";
import { router, useFocusEffect } from "expo-router";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Pressable } from "@/components/ui/pressable";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function extractDate(timestamp: any) {
  return timestamp.split("T")[0];
}

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showModal, setShowModal] = React.useState(!isAuthenticated);

  const dispatch = useDispatch();

  const LogOut = async () => {
    console.log("Log out");
    dispatch(clearAuthState());
    await SecureStore.deleteItemAsync(LOCAL_STORAGE_JWT_KEY);
    setShowModal(false);
    router.replace("/(tabs)/(home)");
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        setShowModal(false); // Hide the modal if authenticated
      } else {
        setShowModal(true); // Show the modal if not authenticated
      }
    }, [isAuthenticated])
  );

  return (
    <SafeAreaView>
      {!isAuthenticated && (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {isAuthenticated && (
        <SafeAreaView className="h-full p-4 w-full flex items-center bg-white">
          <VStack space="4xl" className="h-full flex p-4">
            {/* Title */}
            <Box className="flex w-full">
              <Text className="text-2xl font-bold">Thông tin tài khoản</Text>
            </Box>
            {/* Avatar */}
            <HStack className="flex items-center gap-2 border border-gray-300  py-2 px-4 rounded-2xl">
              <Box>
                {currentUser?.picture && (
                  <Image
                    size="sm"
                    source={{
                      uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    }}
                    alt={`${currentUser?.name}`}
                    className="rounded-full"
                  />
                )}
                {!currentUser?.picture && (
                  <Box className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-gray-300">
                    <Text className="text-white text-lg font-bold">
                      {currentUser?.name[0]?.toUpperCase()}
                    </Text>
                  </Box>
                )}
              </Box>
              <Box>
                <Text className="text-2xl text-black items-center font-medium">
                  {currentUser?.name}
                </Text>
              </Box>
            </HStack>
            {/* Email */}
            <Box className="w-full flex border border-gray-300 rounded-2xl">
              {/* Giới tính - Ngày sinh */}
              <HStack className="w-full flex items-center gap-2 justify-between border-b border-gray-300  py-3 px-5">
                <Box className="flex flex-row items-center gap-4">
                  <Fontisto name="intersex" size={32} color="black" />
                  <Box className="flex flex-col justify-center ">
                    <Text className="text-base font-nomral">Giới tính:</Text>
                    <Text className="text-lg"> {currentUser?.gender}</Text>
                  </Box>
                </Box>
                <Box className="flex flex-row items-center gap-4">
                  <AntDesign name="calendar" size={32} color="black" />
                  <Box className="flex flex-col justify-center">
                    <Text className="text-base font-nomral">Ngày sinh</Text>
                    <Text className="text-lg">
                      {" "}
                      {extractDate(currentUser?.birthdate)}
                    </Text>
                  </Box>
                </Box>
              </HStack>
              {/* Email */}
              <HStack className="w-full flex items-center gap-2 justify-between  py-3 px-5 border-b border-gray-300">
                <Box className="w-full flex flex-row items-center gap-4 ">
                  <Fontisto name="email" size={32} color="black" />
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
                  <AntDesign name="phone" size={32} color="black" />
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
              <Pressable onPress={() => router.push("/(rooms)/PairManagement")}>
                <Box
                  className="w-full p-4 flex flex-row items-center gap-4 
              justify-between border-b border-gray-300"
                >
                  <AntDesign name="home" size={32} color="black" />
                  <Text className="text-black text-xl font-medium">
                    Quản lý bài đăng cho thuê phòng
                  </Text>
                  <AntDesign name="arrowright" size={24} color="black" />
                </Box>
              </Pressable>
              <Pressable onPress={() => router.push("/(rooms)/PairSearch")}>
                <Box
                  className="w-full p-4 flex flex-row items-center gap-4 
              justify-between "
                >
                  <FontAwesome6
                    name="users-viewfinder"
                    size={28}
                    color="black"
                  />
                  <Text className="text-black text-xl font-medium">
                    Quản lý bài đăng cho tìm ở ghép
                  </Text>
                  <AntDesign name="arrowright" size={24} color="black" />
                </Box>
              </Pressable>
            </VStack>
            <Pressable onPress={LogOut}>
              <Box
                className="w-full p-4 flex flex-row items-center gap-4 
               border border-gray-300 rounded-2xl"
              >
                <AntDesign name="logout" size={24} color="black" />
                <Text className="text-black text-xl font-bold">
                  Đăng xuất
                </Text>
              </Box>
            </Pressable>
          </VStack>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

{
  /* <TouchableWithoutFeedback>
  <Button className="w-fit self-end mt-4" size="md" onPress={LogOut}>
    <ButtonText>Đăng xuất</ButtonText>
  </Button>
</TouchableWithoutFeedback>; */
}
