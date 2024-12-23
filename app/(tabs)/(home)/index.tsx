import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { selectIsAuthenticated, selectUser, setUser } from "@/store/reducers";
import { WorkType } from "@/constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import Carousel from "@/components/carousel/Carousel";
import ListRoom from "@/components/list-room/ListRoom";
import { useGetAllPostsQuery, useGetPostsQuery } from "@/services/post";
import Loading from "@/components/loading/Loading";
import { useDispatch } from "react-redux";
import { User, useVerifyJwtForUserQuery } from "@/services";

const Home = () => {
  const dispatch = useDispatch();

  // Redux state
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [token, setToken] = useState<string | null>(null);

  // Posts query
  const { data: posts, error, isLoading } = useGetAllPostsQuery();

  const { data: userData, isLoading: userLoading } = useVerifyJwtForUserQuery(
    token,
    {
      skip: !token,
    }
  );
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token && userData) {
      dispatch(setUser(userData)); // Save user data in Redux
    }
  }, [token, userData, dispatch]);

  if (isLoading || userLoading) {
    return <Loading />;
  }

  // Check if user is authenticated
  if (isAuthenticated && userData) {
    // console.log("Authenticated user:", currentUser);
    // console.log("userDatar:", userData);
  }

  // console.log('Current User:', currentUser);
  // console.log("Token:", token);

  return (
    <SafeAreaView className="relative h-full flex items-center bg-gray-100">
      {/* Title */}
      <Box className="w-full h-auto bg-info-500">
        <Text className="px-6 py-1 bg-info-500 text-white text-2xl">
          Hôm nay của bạn thế nào
        </Text>
        <Image
          source={require("@/assets/images/home.png")}
          className="w-full h-80"
          resizeMode="cover"
        />
      </Box>

      {/* Login/Signup */}

      <Box className="absolute top-60 w-[90%] bg-white px-2 py-5 flex flex-col gap-3 border border-gray-400 rounded-xl shadow-md">
        {/* Hello */}
        <Text size="lg" className="px-2 py-1 font-bold">
          Hãy dùng app ngay hôm nay để tìm kiếm phòng trọ và tìm bạn ở ghép
        </Text>
        {/* Login */}
        {!isAuthenticated && (
          <Pressable
            className="px-2"
            onPress={() => router.push(`/(auth)/log-in`)}
          >
            {({ pressed }) => (
              <HStack
                className={`border-2 bg-gray-200 border-green-500 py-2 px-2 w-2/3
                gap-1 flex flex-row justify-around items-center rounded-lg ${
                  pressed ? "bg-green-500 shadow-md " : "bg-white"
                }`}
              >
                <Text
                  size="md"
                  className={`font-bold text-green-400 max-w-24 text-center
                   ${pressed ? "text-white" : ""}
                  `}
                >
                  Đăng nhập
                </Text>
                <Text
                  size="md"
                  className={`font-bold text-green-400 max-w-24 text-center
                  ${pressed ? "text-white" : ""}
                 `}
                >
                  /
                </Text>
                <Text
                  size="md"
                  className={`font-bold text-green-400  max-w-30 text-center
                  ${pressed ? "text-white" : ""}
                 `}
                >
                  Tạo tài khoản
                </Text>
              </HStack>
            )}
          </Pressable>
        )}

        {/* Button */}
        <Box className="flex flex-row w-full justify-around mt-2">
          <Pressable
            className="flex items-center w-1/4"
            onPress={() => {
              router.push(`/(tabs)/(search)`);
            }}
          >
            <Image
              source={require("@/assets/images/btn1.png")}
              className="w-10 h-10"
              resizeMode="cover"
            />
            <Text size="md" className="font-medium text-center">
              Tìm kiếm phòng trọ
            </Text>
          </Pressable>
          <Pressable
            className="flex items-center w-1/4"
            onPress={() => {
              router.push(`/(rooms)/PairSearch`);
            }}
          >
            <Image
              source={require("@/assets/images/btn2.png")}
              className="w-10 h-10"
              resizeMode="cover"
            />
            <Text size="md" className="font-medium text-center">
              Tìm kiếm ở ghép
            </Text>
          </Pressable>
          <Pressable
            className="flex items-center w-1/4"
            onPress={() => {
              router.push(`/(rooms)/RoomManagement?type=room`);
            }}
          >
            <Image
              source={require("@/assets/images/btn3.png")}
              className="w-10 h-10"
              resizeMode="cover"
            />
            <Text size="md" className="font-medium text-center">
              Đăng tin cho thuê
            </Text>
          </Pressable>
          <Pressable
            className="flex items-center w-1/4"
            onPress={() => {
              router.push(`/(rooms)/RoomManagement?type=pair`);
            }}
          >
            <Image
              source={require("@/assets/images/btn4.png")}
              className="w-10 h-10"
              resizeMode="cover"
            />
            <Text size="md" className="font-medium text-center">
              Đăng tin ở ghép
            </Text>
          </Pressable>
        </Box>
      </Box>

      {/* List Rooms */}
      <Box
        className={`w-full h-full flex-1 px-2  ${
          isAuthenticated ? "mt-28" : "mt-40"
        }`}
      >
        {/* Title */}
        <Box className="w-full flex flex-row items-center justify-between">
          <Text
            size="xl"
            isTruncated={true}
            className="flex text-black font-semibold w-auto "
          >
            Các bài đăng phòng
          </Text>
          <Pressable
            className="w-auto"
            onPress={() => {
              router.push(`/(rooms)/RoomManagement`);
            }}
          >
            <Text size="md" className="text-info-700 font-bold">
              Xem thêm
            </Text>
          </Pressable>
        </Box>

        {/* List room */}
        <ListRoom data={posts!} />
      </Box>
    </SafeAreaView>
  );
};

export default Home;
{
  /* 
  <View className="flex">
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/(rooms)/RoomManagement`);
          }}
        >
          <ButtonText>Đăng tin cho thuê</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/(rooms)/PairManagement`);
          }}
        >
          <ButtonText>Đăng tin ở ghép</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/(rooms)/PairSearch`);
          }}
        >
          <ButtonText>Tìm kiếm ở ghép</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
    </View>
  */
}
