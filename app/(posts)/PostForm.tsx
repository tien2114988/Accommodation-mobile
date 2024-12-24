import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { CreatePostModel } from '@/types/postTypes';
import { Box } from '@/components/ui/box';

import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setPostForm } from '@/store/reducers';

import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@/components/ui/card';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon, CircleIcon } from '@/components/ui/icon';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import { Pressable } from '@/components/ui/pressable';
import AddressSelection from '@/components/post/AddressSelection';

const PostForm = () => {
  const { type } = useLocalSearchParams();
  const initialPost: CreatePostModel = {
    name: '',
    description: '',
    address: '',
    price: 0,
    area: 0,
    capacity: 0,
    floor: 0,
    deposit: 0,
    utilities: '',
    interior: '',
    roomType: '',
    gender: 'Nam',
    postType: type === 'room' ? 'Phòng' : 'Ở ghép',
  };
  const [post, setPost] = useState<CreatePostModel>(initialPost);
  const [cont, setCont] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

  const handleClose = () => {
    setShowActionSheet(false);
  };

  const handleCont = () => {
    if (
      post.name === '' ||
      post.address === '' ||
      post.price === 0 ||
      post.area === 0 ||
      post.capacity === 0 ||
      post.floor === 0
    ) {
      setCont(true);
    } else {
      dispatch(setPostForm(post));
      router.navigate('/(posts)/RoomTypeForm');
    }
  };

  const selectAddress = () => {
    setShowActionSheet(true);
  };

  return (
    <SafeAreaView className="flex h-full">
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            <Card size="md" variant="elevated">
              <VStack space="lg">
                <FormControl isInvalid={post.name == '' && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Tiêu đề
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-info-600">
                        <Ionicons name="text-outline" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <Input variant="outline" size="lg">
                    <InputField
                      className="leading-none"
                      placeholder="Nhập tiêu đề..."
                      value={post.name}
                      onChangeText={text => setPost({ ...post, name: text })}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống tiêu đề
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl isInvalid={post.price == 0 && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Giá thuê
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-success-600">
                        <Ionicons name="cash-outline" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <HStack space="md" className="items-center">
                    <Input variant="outline" size="lg" className="w-2/3">
                      <InputField
                        className="leading-none"
                        keyboardType="numeric"
                        placeholder="Nhập giá thuê"
                        value={post.price.toLocaleString()}
                        onChangeText={text => {
                          // Xóa định dạng (các ký tự không phải số) trước khi lưu
                          const rawValue = text.replace(/[^0-9]/g, '');

                          // Cập nhật giá trị gốc trong state
                          setPost({
                            ...post,
                            price: rawValue ? parseInt(rawValue, 10) : 0,
                          });
                        }}
                      />
                    </Input>
                    <Text className="text-lg font-medium">VND</Text>
                  </HStack>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống giá thuê
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Đặt cọc (nếu có)
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-success-600">
                        <Ionicons name="cash-outline" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <HStack space="md" className="items-center">
                    <Input variant="outline" size="lg" className="w-2/3">
                      <InputField
                        className="leading-none"
                        keyboardType="numeric"
                        placeholder="Nhập số tiền đặt cọc"
                        value={post.deposit.toLocaleString()}
                        onChangeText={text => {
                          // Xóa định dạng (các ký tự không phải số) trước khi lưu
                          const rawValue = text.replace(/[^0-9]/g, '');

                          // Cập nhật giá trị gốc trong state
                          setPost({
                            ...post,
                            deposit: rawValue ? parseInt(rawValue, 10) : 0,
                          });
                        }}
                      />
                    </Input>
                    <Text className="text-lg font-medium">VND</Text>
                  </HStack>
                </FormControl>

                <FormControl isInvalid={post.area == 0 && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Diện tích
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-secondary-400">
                        <Ionicons name="square" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <HStack space="md" className="items-center">
                    <Input variant="outline" size="lg" className="w-2/3">
                      <InputField
                        className="leading-none"
                        keyboardType="numeric"
                        placeholder="Nhập diện tích"
                        value={post.area.toString()}
                        onChangeText={text => setPost({ ...post, area: +text })}
                      />
                    </Input>
                    <Text className="text-lg font-medium">m²</Text>
                  </HStack>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống diện tích
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl isInvalid={post.floor == 0 && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Số tầng
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-info-400">
                        <Ionicons name="cellular" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="w-2/3">
                    <InputField
                      className="leading-none"
                      keyboardType="numeric"
                      placeholder="Nhập số tầng"
                      value={post.floor.toString()}
                      onChangeText={text => setPost({ ...post, floor: +text })}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống số tầng
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl isInvalid={post.capacity == 0 && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Số người
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-success-400">
                        <Ionicons name="people" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="w-2/3">
                    <InputField
                      className="leading-none"
                      keyboardType="numeric"
                      placeholder="Nhập số người"
                      value={post.capacity.toString()}
                      onChangeText={text =>
                        setPost({ ...post, capacity: +text })
                      }
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống số người
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Yêu cầu giới tính
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-success-400">
                        <Ionicons name="male-female-outline" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <RadioGroup
                    value={post.gender}
                    onChange={val => setPost({ ...post, gender: val })}
                  >
                    <Box className="flex flex-row justify-between">
                      <Radio
                        value="Nam"
                        size="lg"
                        className="flex flex-row justify-between items-center"
                      >
                        <HStack space="sm" className="items-center">
                          <Text className="text-md text-info-500">
                            <Ionicons name="male-outline" size={20} />
                          </Text>
                          <RadioLabel>Nam</RadioLabel>
                        </HStack>

                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                      </Radio>
                      <Radio
                        value="Nữ"
                        size="lg"
                        className="flex flex-row justify-between items-center"
                      >
                        <HStack space="sm" className="items-center">
                          <Text className="text-md text-error-500">
                            <Ionicons name="female-outline" size={20} />
                          </Text>
                          <RadioLabel>Nữ</RadioLabel>
                        </HStack>

                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                      </Radio>
                      {post.postType === 'Phòng' ? (
                        <Radio
                          value="Khác"
                          size="lg"
                          className={`flex flex-row justify-between items-center`}
                        >
                          <RadioLabel>Không</RadioLabel>
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                        </Radio>
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  </RadioGroup>
                </FormControl>

                <FormControl isInvalid={post.address == '' && cont}>
                  <FormControlLabel>
                    <HStack space="md" className="items-center">
                      <FormControlLabelText className="text-lg">
                        Địa chỉ
                      </FormControlLabelText>
                      <FormControlLabelText className="text-lg text-error-400">
                        <Ionicons name="location" size={20} />
                      </FormControlLabelText>
                    </HStack>
                  </FormControlLabel>
                  <Pressable onPress={selectAddress}>
                    {({ pressed }) => (
                      <Box
                        className={`flex flex-row justify-between items-center border border-secondary-300 p-2 rounded ${
                          pressed && 'opacity-75'
                        }`}
                      >
                        <Text className="w-11/12">
                          {post.address ? post.address : 'Chọn địa chỉ'}
                        </Text>
                        <FormControlLabelText className="text-lg text-secondary-300">
                          <Ionicons name="chevron-down-outline" size={20} />
                        </FormControlLabelText>
                      </Box>
                    )}
                  </Pressable>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Không được để trống địa chỉ
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </VStack>
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

      <AddressSelection
        showActionSheet={showActionSheet}
        address={post.address}
        setAddress={(val: string) => setPost({ ...post, address: val })}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
};

export default PostForm;
