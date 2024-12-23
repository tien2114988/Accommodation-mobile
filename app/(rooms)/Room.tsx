import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
} from "@/services/post";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { stringToArray } from "@/utils/stringUtil";
import RoomDetailSkeleton from "@/components/skeleton/RoomDetailSkeleton";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/reducers";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";

const room = {
  thumbnail:
    "https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp",
  title:
    "Cần tìm nam ở ghép, trọn gói 1 triệu cả để xe, điện nước, gần trường đại học Nông Lâm",
  type: "Chung cư mini",
  price: 1600000,
  location: "Phường 8, Quận 10, Thành phố Hồ Chí Minh",
  phoneNumber: "0346066323",
};

const Room = () => {
  const user = useSelector(selectUser);
  const { id, manage } = useLocalSearchParams();
  const { data, error, isFetching } = useGetPostByIdQuery({ id: +id });
  const [deletePost, { error: deleteError, isLoading }] =
    useDeletePostMutation();
  const { refetch } = useGetPostsByUserIdQuery({
    id: user?.id,
    postType: data?.postType ?? "Phòng",
  });
  const toast = useToast();
  const router = useRouter();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const navigateToAccount = () => {
    if (data?.postedBy.id === user?.id) {
      router.push("/(tabs)/(profile)/profile");
    } else {
      router.push(`/(friend)/infor?id=${data?.postedBy.id}`);
    }
  };

  const handleDeletePost = async () => {
    const res = await deletePost(+id);
    console.info({ res, error });
    if (!error) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="outline">
              <ToastTitle>Xóa phòng thành công</ToastTitle>
              {/* <ToastDescription>{}</ToastDescription> */}
            </Toast>
          );
        },
      });
      refetch();
      router.back();
    } else {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Xóa phòng thất bại</ToastTitle>
              {/* <ToastDescription>{}</ToastDescription> */}
            </Toast>
          );
        },
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>
                Lấy thông tin chi tiết bài đăng phòng thất bại
              </ToastTitle>
              {/* <ToastDescription>{}</ToastDescription> */}
            </Toast>
          );
        },
      });
    }
  }, []);

  if (isFetching) {
    return <RoomDetailSkeleton />;
  }

  return (
    <SafeAreaView className="flex h-full bg-white">
      <ScrollView>
        <VStack space="md" className="p-4">
          <Image
            size="2xl"
            source={{
              uri: data?.pictures[imageIndex]
                ? "https://accomodation-seeking-backend.onrender.com/pictures/" +
                  data?.pictures[imageIndex]
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            }}
            alt="image"
            className="rounded-lg w-full h-80"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space="lg">
              {data &&
                data.pictures.length > 1 &&
                data.pictures.map((img, i) => (
                  <Pressable key={i} onPress={() => setImageIndex(i)}>
                    {({ pressed }) => (
                      <Image
                        size="lg"
                        source={{
                          uri:
                            "https://accomodation-seeking-backend.onrender.com/pictures/" +
                            img,
                        }}
                        alt="image"
                        className={`rounded-lg ${pressed && "opacity-75"} ${
                          i === imageIndex && "border-2 border-info-400"
                        }`}
                      />
                    )}
                  </Pressable>
                ))}
            </HStack>
          </ScrollView>
          <Box className="flex flex-row justify-between items-center">
            <Text className="w-1/2 text-tertiary-500">• {data?.roomType}</Text>
            {data?.gender && ["Nam", "Nữ"].includes(data.gender) && (
              <HStack space="xs" className="">
                {data.gender === "Nam" ? (
                  <Text className="text-info-500">
                    <Ionicons size={20} name="male-outline" />
                  </Text>
                ) : (
                  <Text className="text-error-500">
                    <Ionicons size={20} name="female-outline" />
                  </Text>
                )}

                <Text className="">{data?.gender}</Text>
              </HStack>
            )}
          </Box>

          <Text className="text-lg font-medium text-black">{data?.name}</Text>
          <Text className="text-green-600 font-medium">
            {data?.price.toLocaleString()} đ/tháng
          </Text>
          <HStack space="md" className="items-center">
            <Text className="text-error-400">
              <Ionicons size={20} name="location" />
            </Text>
            <Text className="w-11/12">{data?.address}</Text>
          </HStack>
          <HStack space="md" className="flex">
            <Text className="text-info-400">
              <Ionicons size={20} name="call" />
            </Text>
            <Text className="w-11/12 line-clamp-1">{data?.postedBy.phone}</Text>
          </HStack>
          <Divider />
          <Box className="flex flex-row justify-between items-center">
            <VStack className="items-center">
              <Text className="text-secondary-400">
                <Ionicons name="cellular" size={20} />
              </Text>
              <Text className="text-secondary-400">Tầng</Text>
              <Text className="font-medium">{data?.floor}</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-secondary-400">
                <Ionicons name="square" size={20} />
              </Text>
              <Text className="text-secondary-400">Diện tích</Text>
              <Text className="font-medium">{data?.area} m²</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-secondary-400">
                <Ionicons name="person" size={20} />
              </Text>
              <Text className="text-secondary-400">Số người</Text>
              <Text className="font-medium">{data?.capacity}</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-secondary-400">
                <Ionicons name="cash" size={20} />
              </Text>
              <Text className="text-secondary-400">Đặt cọc</Text>
              <Text className="font-medium">
                {data?.deposit.toLocaleString()} đ
              </Text>
            </VStack>
          </Box>

          {data?.utilities && (
            <VStack space="md">
              <Divider />
              <Text className="font-medium text-lg text-black">Tiện nghi</Text>

              <Grid
                className="gap-4"
                _extra={{
                  className: "grid-cols-9",
                }}
              >
                {stringToArray(data?.utilities).map((utility, i) => (
                  <GridItem
                    key={i}
                    _extra={{
                      className: "col-span-3",
                    }}
                  >
                    <Box className="border rounded-lg p-3 border-info-600">
                      <Text className="font-semibold text-info-600">
                        {utility}
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          {data?.interior && (
            <VStack space="md">
              <Divider />
              <Text className="font-medium text-lg text-black">Nội thất</Text>

              <Grid
                className="gap-4"
                _extra={{
                  className: "grid-cols-9",
                }}
              >
                {stringToArray(data?.interior).map((interior, i) => (
                  <GridItem
                    key={i}
                    _extra={{
                      className: "col-span-3",
                    }}
                  >
                    <Box className="border rounded-lg p-3 border-info-600">
                      <Text className="font-semibold text-info-600">
                        {interior}
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          <Divider />
          <Pressable onPress={navigateToAccount}>
            {({ pressed }) => (
              <Box
                className={`flex flex-row justify-between items-center ${
                  pressed && "opacity-50"
                }`}
              >
                <HStack space="md" className="items-center">
                  {data?.postedBy.picture && (
                    <Box>
                      <Image
                        size="sm"
                        source={{
                          uri: `https://accomodation-seeking-backend.onrender.com/pictures/${data?.postedBy.picture}`,
                        }}
                        alt={`${data?.postedBy?.name}`}
                        className="rounded-full shadow-lg"
                      />
                    </Box>
                  )}
                  {!data?.postedBy.picture && (
                    <Box className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center border border-gray-300">
                      <Text className="text-white text-lg font-bold">
                        {data?.name[0]?.toUpperCase()}
                      </Text>
                    </Box>
                  )}
                  <VStack space="md">
                    <HStack space="sm" className="items-center">
                      <Text className="text-lg font-medium">
                        {data?.postedBy.name}
                      </Text>

                      {data?.postedBy.id === user?.id && <Text>(Bạn) </Text>}
                    </HStack>
                    <Text className="text-info-400">
                      {data?.postedBy.postCount} bài đăng
                    </Text>
                  </VStack>
                </HStack>
                <Text className="text-secondary-400">
                  <Ionicons name="chevron-forward-outline" size={20} />
                </Text>
              </Box>
            )}
          </Pressable>
          <Divider />
          {data?.description && (
            <VStack space="md">
              <Text className="font-medium text-lg text-black">Chi tiết</Text>
              <Text>{data?.description}</Text>
            </VStack>
          )}
        </VStack>
      </ScrollView>
      {data?.postedBy.id === user?.id && manage && manage != "" && (
        <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
          <Button
            size="xl"
            action="negative"
            className="bg-error-400"
            onPress={handleDeletePost}
          >
            <ButtonText>Xóa</ButtonText>
            {isLoading && <ButtonSpinner />}
          </Button>
          {/* <HStack space="md" className="justify-center">
            <VStack className="w-1/2">
              
            </VStack>
            <VStack className="w-1/2">
              <Button
                size="xl"
                action="positive"
                className="bg-success-300"
                // onPress={() => actionPost(Mode.ACCEPT.key)}
              >
                <ButtonText>Chỉnh sửa</ButtonText>
              </Button>
            </VStack>
          </HStack> */}
        </Box>
      )}
    </SafeAreaView>
  );
};

export default Room;
