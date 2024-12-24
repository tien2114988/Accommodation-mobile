import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import {
  clearPostForm,
  selectPostForm,
  selectUser,
  setPostForm,
} from '@/store/reducers';
import { Heading } from '@/components/ui/heading';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '@/components/ui/card';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from '@/components/ui/image';
import { HStack } from '@/components/ui/hstack';
import { Center } from '@/components/ui/center';
import {
  useCreatePostMutation,
  useGetPostsByUserIdQuery,
  useUploadImagesMutation,
} from '@/services/post';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { CreatePostModel } from '@/types/postTypes';

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const postForm = useSelector(selectPostForm);
  const [createPost, { isLoading, error, data }] = useCreatePostMutation();
  const [uploadImages, { isLoading: isUploadLoading, error: uploadError }] =
    useUploadImagesMutation();
  const user = useSelector(selectUser);
  const { refetch } = useGetPostsByUserIdQuery({
    id: user?.id,
    postType: postForm?.postType ?? 'Phòng',
  });
  const toast = useToast();

  const handlePost = async () => {
    if (postForm != null) {
      const { images, ...data } = postForm;

      const res = await createPost(data);
      if (error) {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = 'toast-' + id;
            return (
              <Toast nativeID={uniqueToastId} action="error" variant="outline">
                <ToastTitle>Đăng phòng thất bại</ToastTitle>
              </Toast>
            );
          },
        });
      } else {
        if (images && res?.data && res.data.id) {
          console.log(res.data.id);
          const formData = new FormData();
          // for (const [index, uri] of images.entries()) {
          //   const response = await fetch(uri); // Fetch ảnh từ URI
          //   const blob = await response.blob(); // Chuyển URI thành Blob

          //   formData.append('files', blob, `image-${index}.jpg`); // Thêm vào FormData
          // }

          images.forEach((image, index) => {
            if (image.uri && image.type && image.name) {
              formData.append('files', {
                uri: image.uri,
                type: image.type,
                name: image.name,
              } as any); // Thêm `as any` để tránh lỗi TypeScript
            } else {
              console.warn(
                `Image at index ${index} is missing required fields.`,
              );
            }
          });

          const uploadRes = await uploadImages({
            id: res.data?.id,
            formData: formData,
          });

          if (uploadError) {
            toast.show({
              placement: 'top',
              duration: 3000,
              render: ({ id }) => {
                const uniqueToastId = 'toast-' + id;
                return (
                  <Toast
                    nativeID={uniqueToastId}
                    action="error"
                    variant="outline"
                  >
                    <ToastTitle>Đăng ảnh thất bại</ToastTitle>
                    <ToastDescription>
                      {uploadError.data.message}
                    </ToastDescription>
                  </Toast>
                );
              },
            });
          } else {
            refetch();
            toast.show({
              placement: 'top',
              duration: 3000,
              render: ({ id }) => {
                const uniqueToastId = 'toast-' + id;
                return (
                  <Toast
                    nativeID={uniqueToastId}
                    action="success"
                    variant="outline"
                  >
                    <ToastTitle>Thành công</ToastTitle>
                    <ToastDescription>Đăng phòng thành công</ToastDescription>
                  </Toast>
                );
              },
            });
            dispatch(clearPostForm());

            const type = postForm.postType === 'Phòng' ? 'room' : 'pair';

            router.dismissTo(`/(rooms)/RoomManagement?type=${type}`);
          }
        } else {
          refetch();
          toast.show({
            placement: 'top',
            duration: 3000,
            render: ({ id }) => {
              const uniqueToastId = 'toast-' + id;
              return (
                <Toast
                  nativeID={uniqueToastId}
                  action="success"
                  variant="outline"
                >
                  <ToastTitle>Thành công</ToastTitle>
                  <ToastDescription>Đăng phòng thành công</ToastDescription>
                </Toast>
              );
            },
          });
          dispatch(clearPostForm());

          const type = postForm.postType === 'Phòng' ? 'room' : 'pair';

          router.dismissTo(`/(rooms)/RoomManagement?type=${type}`);
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex h-full">
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            <Card size="md" variant="elevated">
              <Heading className="mb-4">Thông tin cơ bản</Heading>
              <VStack space="lg">
                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Tiêu đề</Text>
                    <Text className="font-medium text-info-400">
                      <Ionicons name="text-outline" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">{postForm?.name}</Text>
                </HStack>
                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Giá thuê</Text>
                    <Text className="font-medium text-success-400">
                      <Ionicons name="cash-outline" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3 text-success-400">
                    {postForm?.price.toLocaleString()} VND
                  </Text>
                </HStack>
                {postForm?.deposit !== 0 && (
                  <HStack space="md" className="items-center">
                    <HStack space="xs" className="items-center">
                      <Text className="font-medium text-lg">Đặt cọc</Text>
                      <Text className="font-medium text-success-400">
                        <Ionicons name="cash-outline" size={20} />
                      </Text>
                      <Text className="font-medium">:</Text>
                    </HStack>
                    <Text className="text-lg w-2/3">
                      {postForm?.deposit.toLocaleString()} VND
                    </Text>
                  </HStack>
                )}

                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Diện tích</Text>
                    <Text className="font-medium text-secondary-400">
                      <Ionicons name="square" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">{postForm?.area} m²</Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Số tầng</Text>
                    <Text className="font-medium text-info-400">
                      <Ionicons name="cellular" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">{postForm?.floor}</Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Số người</Text>
                    <Text className="font-medium text-success-400">
                      <Ionicons name="people" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg">{postForm?.capacity}</Text>
                </HStack>

                {postForm?.gender &&
                  ['Nam', 'Nữ'].includes(postForm.gender) && (
                    <HStack space="md" className="items-center">
                      <Text className="font-medium text-lg">
                        Yêu cầu giới tính :
                      </Text>
                      <HStack space="xs" className="items-center">
                        {postForm.gender === 'Nam' ? (
                          <Text className="font-medium text-info-400">
                            <Ionicons name="male" size={20} />
                          </Text>
                        ) : (
                          <Text className="font-medium text-error-400">
                            <Ionicons name="female" size={20} />
                          </Text>
                        )}

                        <Text className="text-lg w-2/3">
                          {postForm?.gender}
                        </Text>
                      </HStack>
                    </HStack>
                  )}

                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Địa chỉ</Text>
                    <Text className="font-medium text-error-400">
                      <Ionicons name="location" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">{postForm?.address}</Text>
                </HStack>
              </VStack>
            </Card>

            <Card size="md" variant="elevated">
              <Heading className="mb-4">Loại phòng và tiện nghi</Heading>
              <VStack space="lg">
                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Loại phòng</Text>
                    <Text className="font-medium text-success-400">
                      <Ionicons name="home-outline" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">{postForm?.roomType}</Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Tiện nghi</Text>
                    <Text className="font-medium text-info-400">
                      <Ionicons name="construct-outline" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">
                    {postForm?.utilities !== ''
                      ? postForm?.utilities
                      : 'Không có'}
                  </Text>
                </HStack>
                <HStack space="md" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="font-medium text-lg">Nội thất</Text>
                    <Text className="font-medium text-tertiary-400">
                      <Ionicons name="bed-outline" size={20} />
                    </Text>
                    <Text className="font-medium">:</Text>
                  </HStack>
                  <Text className="text-lg w-2/3">
                    {postForm?.interior !== ''
                      ? postForm?.interior
                      : 'Không có'}
                  </Text>
                </HStack>
              </VStack>
            </Card>

            {postForm?.images && (
              <Card size="md" variant="elevated">
                <Heading className="mb-4">Hình ảnh phòng</Heading>
                <HStack space="md" className="flex flex-row flex-wrap">
                  {postForm?.images.map((image, index) => (
                    <Box key={index} className="relative w-1/4 h-24">
                      <Image
                        source={{ uri: image.uri }}
                        className="rounded-lg w-full h-full"
                      />
                    </Box>
                  ))}
                </HStack>
              </Card>
            )}

            {postForm?.description && (
              <Card size="md" variant="elevated">
                <Heading className="mb-4">Mô tả chi tiết</Heading>
                <Text className="text-lg">{postForm?.description}</Text>
              </Card>
            )}
          </VStack>
        </Box>
      </ScrollView>

      <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
        <Button
          onPress={handlePost}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center"
          action="positive"
        >
          <ButtonText className="text-center">Đăng phòng</ButtonText>
          {(isLoading || isUploadLoading) && <ButtonSpinner />}
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Checkout;
