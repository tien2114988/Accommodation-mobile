import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { selectPostForm, setPostForm } from '@/store/reducers';
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
import { ImageModel } from '@/types/postTypes';

const DescriptionForm = () => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();
  const postForm = useSelector(selectPostForm);

  const handleImagePick = async () => {
    // Kiểm tra quyền truy cập thư viện ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền để sử dụng chức năng này!');
      return;
    }

    // Chọn ảnh từ thư viện
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Chọn 1 ảnh/lần (nhiều lần để thêm)
      quality: 0.8, // Chất lượng ảnh
    });

    if (!result.canceled) {
      setImages([
        ...images,
        {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name:
            result.assets[0].fileName || result.assets[0].uri.split('/').pop(),
        },
      ]); // Lưu URI ảnh vào state
    }
  };

  const handleDeleteImage = (uri?: string) => {
    setImages(images.filter(image => image.uri !== uri)); // Xóa ảnh theo URI
  };

  const handleCont = () => {
    if (
      postForm?.name &&
      postForm.address &&
      postForm.price &&
      postForm.area &&
      postForm.capacity &&
      postForm.floor
    ) {
      dispatch(setPostForm({ ...postForm, description, images })); // Lưu danh sách ảnh vào form
      router.push('/(posts)/Checkout');
    }
  };

  return (
    <SafeAreaView className="flex h-full">
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            <Card size="md" variant="elevated">
              <Heading className="mb-4">Hình ảnh phòng</Heading>
              <HStack space="md" className="flex flex-row flex-wrap">
                {images.map(
                  (image, index) =>
                    image &&
                    image.uri && (
                      <Box key={index} className="relative w-1/4 h-24">
                        <Image
                          source={{ uri: image.uri }}
                          className="rounded-lg w-full h-full"
                        />
                        <Pressable
                          onPress={() => handleDeleteImage(image.uri)}
                          className="absolute top-1 right-0 bg-secondary-300 p-1 rounded-full "
                        >
                          <Ionicons name="close" size={20} color="white" />
                        </Pressable>
                      </Box>
                    ),
                )}
                <Pressable onPress={handleImagePick} className="w-1/4 h-24">
                  {({ pressed }) => (
                    <Box
                      className={`border h-full border-secondary-400 p-2 rounded-lg flex flex-row justify-center items-center ${
                        pressed && 'opacity-50'
                      }`}
                    >
                      <Text
                        className="text-center text-secondary-400"
                        size="6xl"
                      >
                        <Ionicons name="add" size={50} />
                      </Text>
                    </Box>
                  )}
                </Pressable>
              </HStack>
            </Card>

            <Card size="md" variant="elevated">
              <Heading className="mb-4">Mô tả chi tiết</Heading>
              <Textarea size="md" className="w-full">
                <TextareaInput
                  value={description}
                  onChangeText={text => setDescription(text)}
                  placeholder="Nhập mô tả..."
                />
              </Textarea>
            </Card>
          </VStack>
        </Box>
      </ScrollView>

      <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
        <Button
          onPress={handleCont}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center"
          action="positive"
        >
          <ButtonText className="text-center">Tiếp theo</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default DescriptionForm;
