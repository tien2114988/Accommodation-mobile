import { selectUser } from '@/store/reducers';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  TextInputEndEditingEventData,
  TouchableWithoutFeedback,
} from 'react-native';
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
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { useGetPostsQuery } from '@/services/post';
import RoomSkeleton from '@/components/skeleton/RoomSkeleton';
import { useDebounce } from '@/utils/helper';
import { useGetProvincesQuery } from '@/services';
import { DistrictModel, ProvinceModel } from '@/types/addressTypes';
import { useRouter } from 'expo-router';
import { Mode } from '@/constants/room';

interface FilterType {
  postType: string;
  sortBy?: string;
  priceTo?: number;
  roomType?: string;
  name?: string;
  utilities?: string;
  interior?: string;
  address?: string;
}

const PairSearch = () => {
  const router = useRouter();
  const [mode, setMode] = useState<string>('');
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('time');
  const [priceTo, setPriceTo] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [interior, setInterior] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [params, setParams] = useState<FilterType>({ postType: 'Ở ghép' });

  const debounceSearch = useDebounce(name, 1000);

  const toast = useToast();

  const { data, error, isFetching, refetch } = useGetPostsQuery(params);

  useEffect(() => {
    if (error) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Lấy thông tin các bài đăng thất bại</ToastTitle>
              {/* <ToastDescription>{}</ToastDescription> */}
            </Toast>
          );
        },
      });
    }
  }, []);

  useEffect(() => {
    if (debounceSearch !== undefined && name !== undefined) {
      setParams({ ...params, name });
      refetch();
    }
  }, [debounceSearch]);

  const handleBack = () => {
    router.back();
  };

  const handleFilterPrice = () => {
    setParams({ ...params, priceTo });
    refetch();
    handleClose();
  };

  const handleFilterLocation = () => {
    setParams({ ...params, address: address == 'Tất cả' ? '' : address });
    refetch();
    handleClose();
  };

  const handleRoomTypeFilter = () => {
    setParams({ ...params, roomType });
    refetch();
    handleClose();
  };

  const handleSort = () => {
    setParams({ ...params, sortBy });
    refetch();
    handleClose();
  };

  const handleAllFilter = () => {
    setParams({ ...params, sortBy, priceTo, roomType, utilities, interior });
    refetch();
    handleClose();
  };

  const handleClose = () => {
    setShowActionSheet(false);
  };

  const handleFilter = (mode: string) => {
    setShowActionSheet(true);
    setMode(mode);
  };

  return (
    <SafeAreaView className="flex h-full bg-white">
      <Box className="flex flex-row justify-between items-center bg-info-700 p-4">
        <Pressable onPress={handleBack}>
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
          <InputField
            className="leading-none"
            type="text"
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Tìm kiếm ở ghép"
          />
        </Input>

        <Pressable onPress={() => handleFilter(Mode.FILTER)}>
          {({ pressed }) => (
            <Text className={`text-white ${pressed && 'opacity-75'}`}>
              <Ionicons size={24} name="options-outline" />
            </Text>
          )}
        </Pressable>
      </Box>
      <Box className="">
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
                <HStack space="xs" className="items-center w-11/12">
                  <Text className="text-error-400">
                    <Ionicons size={20} name="location" />
                  </Text>
                  <Text>Khu vực : {address ? address : 'Tất cả'}</Text>
                </HStack>
                <Text className="text-secondary-400">
                  <Ionicons size={20} name="chevron-down-outline" />
                </Text>
              </Box>
            )}
          </Pressable>
        </Box>
        {isFetching ? (
          <RoomSkeleton />
        ) : (
          <RoomList rooms={data ?? []} refetch={refetch} />
        )}
      </Box>

      <RoomTypeFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
        currentRoomTypes={roomType}
        setRoomType={setRoomType}
        handleRoomTypeFilter={handleRoomTypeFilter}
      />

      <PriceFilter
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        handleFilterPrice={handleFilterPrice}
      />

      <RoomSort
        showActionSheet={showActionSheet}
        mode={mode}
        handleClose={handleClose}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSort={handleSort}
      />

      <LocationFilter
        showActionSheet={showActionSheet}
        mode={mode}
        address={address}
        setAddress={setAddress}
        handleFilterLocation={handleFilterLocation}
        handleClose={handleClose}
      />

      <RoomFilter
        showActionSheet={showActionSheet}
        mode={mode}
        currentRoomTypes={roomType}
        setRoomType={setRoomType}
        handleClose={handleClose}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        sortBy={sortBy}
        setSortBy={setSortBy}
        utilities={utilities}
        setUtilities={setUtilities}
        currentInteriors={interior}
        setInterior={setInterior}
        handleAllFilter={handleAllFilter}
      />
    </SafeAreaView>
  );
};

export default PairSearch;
