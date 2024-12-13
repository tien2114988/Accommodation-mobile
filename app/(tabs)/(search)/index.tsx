import { selectUser } from '@/store/reducers';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Divider } from '@/components/ui/divider';
import RoomList from '@/components/room/RoomList';
import RoomTypeFilter from '@/components/room/RoomTypeFilter';
import PriceFilter from '@/components/room/PriceFilter';
import RoomSort from '@/components/room/RoomSort';
import LocationFilter from '@/components/room/LocationFilter';
import RoomFilter from '@/components/room/RoomFilter';

export interface Room {
  avatar: string;
  title: string;
  price: number;
  hour: number;
  area: number;
  slot: number;
  location: string;
}

const rooms: Room[] = [
  {
    avatar:
      'https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp',
    title:
      'Cần tìm nam ở ghép, trọn gói 1 triệu cả để xe, điện nước, gần trường đại học Nông Lâm',
    price: 1600000,
    hour: 4,
    area: 40,
    slot: 4,
    location: 'Phường 8, Quận 1, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUS1NZgPRXUQsJyUL8E97KoVILblc3R6g4sQ&s',
    title: 'Phòng trọ mới xây, giá rẻ, gần chợ, trường học, bệnh viện',
    price: 1200000,
    hour: 3,
    area: 30,
    slot: 3,
    location: 'Phường 5, Quận 3, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp',
    title: 'Cần tìm nữ ở ghép, phòng rộng rãi, thoáng mát, gần công viên',
    price: 1800000,
    hour: 5,
    area: 50,
    slot: 5,
    location: 'Phường 10, Quận 1, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUS1NZgPRXUQsJyUL8E97KoVILblc3R6g4sQ&s',
    title: 'Phòng trọ giá rẻ, gần trường đại học, bệnh viện, chợ',
    price: 1000000,
    hour: 2,
    area: 20,
    slot: 2,
    location: 'Phường 2, Quận 3, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp',
    title: 'Cần tìm nam ở ghép, phòng rộng rãi, thoáng mát, gần công viên',
    price: 2000000,
    hour: 6,
    area: 60,
    slot: 6,
    location: 'Phường 11, Quận 1, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUS1NZgPRXUQsJyUL8E97KoVILblc3R6g4sQ&s',
    title: 'Phòng trọ mới xây, giá rẻ, gần chợ, trường học, bệnh viện',
    price: 1500000,
    hour: 4,
    area: 40,
    slot: 4,
    location: 'Phường 6, Quận 3, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp',
    title: 'Cần tìm nữ ở ghép, phòng rộng rãi, thoáng mát, gần công viên',
    price: 2200000,
    hour: 7,
    area: 70,
    slot: 7,
    location: 'Phường 12, Quận 1, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUS1NZgPRXUQsJyUL8E97KoVILblc3R6g4sQ&s',
    title: 'Phòng trọ giá rẻ, gần trường đại học, bệnh viện, chợ',
    price: 1100000,
    hour: 3,
    area: 30,
    slot: 3,
    location: 'Phường 3, Quận 3, Thành phố Hồ Chí Minh',
  },
  {
    avatar:
      'https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp',
    title: 'Cần tìm nam ở ghép, phòng rộng rãi, thoáng mát, gần công viên',
    price: 2500000,
    hour: 8,
    area: 80,
    slot: 8,
    location: 'Phường 13, Quận 1, Thành phố Hồ Chí Minh',
  },
];

export const Mode = {
  ROOMTYPE: 'ROOMTYPE',
  PRICE: 'PRICE',
  SORT: 'SORT',
  FILTER: 'FILTER',
  LOCATION: 'LOCATION',
};

const Search = () => {
  const currentUser = useSelector(selectUser);
  const [mode, setMode] = useState<string>('');
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

  const handleClose = () => {
    setShowActionSheet(false);
  };

  const handleFilter = (mode: string) => {
    setShowActionSheet(true);
    setMode(mode);
  };

  return (
    <SafeAreaView className="flex h-full">
      <Box className="flex flex-row justify-between items-center bg-info-700 p-4">
        <Pressable onPress={() => handleFilter(Mode.FILTER)}>
          {({ pressed }) => (
            <Text className={`text-white ${pressed && 'opacity-75'}`}>
              <Ionicons size={24} name="chevron-back-outline" />
            </Text>
          )}
        </Pressable>

        <Input variant="outline" size="lg" className="w-2/3 border-0 bg-white">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputSlot>
            <InputField className="leading-none" placeholder="Tìm kiếm phòng" />
          </InputSlot>
        </Input>
        <Pressable onPress={() => handleFilter(Mode.FILTER)}>
          {({ pressed }) => (
            <Text className={`text-white ${pressed && 'opacity-75'}`}>
              <Ionicons size={24} name="options-outline" />
            </Text>
          )}
        </Pressable>
      </Box>
      <Box className="bg-white">
        <Box className="p-3 flex flex-row justify-between items-center">
          <HStack space="md">
            <Pressable onPress={() => handleFilter(Mode.ROOMTYPE)}>
              {({ pressed }) => (
                <HStack
                  space="xs"
                  className={`items-center ${pressed && 'opacity-75'}`}
                >
                  <Text>Loại phòng</Text>
                  <Text className="text-secondary-400">
                    <Ionicons size={18} name="chevron-down-outline" />
                  </Text>
                </HStack>
              )}
            </Pressable>
            <Pressable onPress={() => handleFilter(Mode.PRICE)}>
              {({ pressed }) => (
                <HStack
                  space="xs"
                  className={`items-center ${pressed && 'opacity-75'}`}
                >
                  <Text>Khoảng giá</Text>
                  <Text className="text-secondary-400">
                    <Ionicons size={18} name="chevron-down-outline" />
                  </Text>
                </HStack>
              )}
            </Pressable>
          </HStack>
          <Pressable onPress={() => handleFilter(Mode.SORT)}>
            {({ pressed }) => (
              <HStack
                space="xs"
                className={`items-center ${pressed && 'opacity-75'}`}
              >
                <Text>Sắp xếp theo</Text>
                <Text className="text-secondary-400">
                  <Ionicons size={18} name="chevron-down-outline" />
                </Text>
              </HStack>
            )}
          </Pressable>
        </Box>

        <Box className="mx-3">
          <Divider />
        </Box>

        <Box className="p-3">
          <Pressable onPress={() => handleFilter(Mode.LOCATION)}>
            {({ pressed }) => (
              <Box
                className={`flex flex-row items-center justify-between ${
                  pressed && 'opacity-75'
                }`}
              >
                <HStack space="xs">
                  <Text className="text-error-400">
                    <Ionicons size={20} name="location" />
                  </Text>
                  <Text>Khu vực : Quận Thủ Đức, Thành phố Hồ Chí Minh</Text>
                </HStack>
                <Text className="text-secondary-400">
                  <Ionicons size={20} name="chevron-down-outline" />
                </Text>
              </Box>
            )}
          </Pressable>
        </Box>

        <RoomList rooms={rooms} />
      </Box>

      <RoomTypeFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
      />

      <PriceFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
      />

      <RoomSort
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
      />
      <LocationFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
      />

      <RoomFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
};

export default Search;
