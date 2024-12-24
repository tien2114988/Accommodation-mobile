import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from '../ui/divider';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '../ui/actionsheet';
import { Button, ButtonText } from '../ui/button';
import { Heading } from '../ui/heading';
import { CircleIcon } from '../ui/icon';
import { Input, InputField } from '../ui/input';
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIndicator,
  RadioIcon,
} from '../ui/radio';

import { convenients, interiors, Mode, roomTypes } from '@/constants/room';
import Slider from '@react-native-community/slider';
import { stringToArray } from '@/utils/stringUtil';

interface Props {
  showActionSheet: boolean;
  mode: string;
  currentRoomTypes: string;
  setRoomType: (val: string) => void;
  priceTo: number;
  setPriceTo: (val: number) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  utilities: string;
  setUtilities: (val: string) => void;
  currentInteriors: string;
  setInterior: (val: string) => void;
  handleAllFilter: () => void;
  handleClose: () => void;
}

const RoomFilter = ({
  showActionSheet,
  mode,
  currentRoomTypes,
  setRoomType,
  priceTo,
  setPriceTo,
  sortBy,
  setSortBy,
  utilities,
  setUtilities,
  currentInteriors,
  setInterior,
  handleAllFilter,
  handleClose,
}: Props) => {
  const initialRoomTypesRef = useRef(currentRoomTypes);
  const initialRoomSortRef = useRef(sortBy);
  const initialPriceToRef = useRef(priceTo);
  const initialUtilitiesRef = useRef(utilities);
  const initialInteriorRef = useRef(currentInteriors);

  useEffect(() => {
    if (mode === Mode.PRICE) {
      initialPriceToRef.current = priceTo;
    } else if (mode === Mode.SORT) {
      initialRoomSortRef.current = sortBy;
    } else if (mode === Mode.ROOMTYPE) {
      initialRoomTypesRef.current = currentRoomTypes;
    } else if (mode === Mode.FILTER) {
      initialPriceToRef.current = priceTo;
      initialRoomSortRef.current = sortBy;
      initialRoomTypesRef.current = currentRoomTypes;
      initialUtilitiesRef.current = utilities;
      initialInteriorRef.current = currentInteriors;
    }
  }, [showActionSheet]);

  const handleChooseRoomType = (roomType: string) => {
    const roomTypeArray = currentRoomTypes.split(',');

    let updatedRoomTypes = '';

    if (roomTypeArray.includes(roomType)) {
      updatedRoomTypes = roomTypeArray
        .filter(type => type !== roomType)
        .join(',');
    } else {
      updatedRoomTypes = currentRoomTypes
        ? `${currentRoomTypes},${roomType}`
        : roomType;
    }

    setRoomType(updatedRoomTypes);
  };

  const handleChooseConvenient = (convenient: string) => {
    const convenientArray = utilities.split(',');

    let updatedUtilities = '';

    if (convenientArray.includes(convenient)) {
      updatedUtilities = convenientArray
        .filter(type => type !== convenient)
        .join(',');
    } else {
      updatedUtilities = utilities ? `${utilities},${convenient}` : convenient;
    }

    setUtilities(updatedUtilities);
  };

  const handleChooseInterior = (interior: string) => {
    const interiorArray = currentInteriors.split(',');

    let updatedInteriors = '';

    if (interiorArray.includes(interior)) {
      updatedInteriors = interiorArray
        .filter(type => type !== interior)
        .join(',');
    } else {
      updatedInteriors = currentInteriors
        ? `${currentInteriors},${interior}`
        : interior;
    }

    setInterior(updatedInteriors);
  };

  const handleCloseAs = () => {
    setSortBy(initialRoomSortRef.current);
    setRoomType(initialRoomTypesRef.current);
    setPriceTo(initialPriceToRef.current);
    setUtilities(initialUtilitiesRef.current);
    setInterior(initialInteriorRef.current);
    handleClose();
  };

  return (
    <Actionsheet
      isOpen={showActionSheet && mode === Mode.FILTER}
      onClose={handleClose}
      className=""
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-full">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <ActionsheetItemText className="flex justify-center m-2">
          <Heading>Lọc kết quả</Heading>
        </ActionsheetItemText>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>

        <ScrollView>
          <ActionsheetItem disabled>
            <VStack space="md">
              <Text className="text-xl font-semibold">Sắp xếp theo</Text>
              <RadioGroup value={sortBy} onChange={setSortBy}>
                <VStack space="lg">
                  <Radio
                    value="time"
                    size="lg"
                    isInvalid={false}
                    isDisabled={false}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <HStack space="md" className="items-center">
                      <Text className="text-md text-info-600">
                        <Ionicons name="time-outline" size={24} />
                      </Text>
                      <RadioLabel>Mới nhất</RadioLabel>
                    </HStack>

                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </Radio>
                  <Radio
                    value="price-desc"
                    size="lg"
                    isInvalid={false}
                    isDisabled={false}
                    className="flex flex-row justify-between items-center"
                  >
                    <HStack space="md" className="items-center">
                      <Text className="text-md text-tertiary-400">
                        <Ionicons name="arrow-down-outline" size={24} />
                      </Text>
                      <RadioLabel>Giá cao đến thấp</RadioLabel>
                    </HStack>

                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </Radio>

                  <Radio
                    value="price-asc"
                    size="lg"
                    isInvalid={false}
                    isDisabled={false}
                    className="flex flex-row justify-between items-center"
                  >
                    <HStack space="md" className="items-center">
                      <Text className="text-md text-success-400">
                        <Ionicons name="arrow-up-outline" size={24} />
                      </Text>
                      <RadioLabel>Giá thấp đến cao</RadioLabel>
                    </HStack>

                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </Radio>
                </VStack>
              </RadioGroup>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem disabled>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Khoảng giá</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={10000000}
                value={priceTo}
                step={1000}
                onSlidingComplete={setPriceTo}
                minimumTrackTintColor="#ADD8E6"
                maximumTrackTintColor="#000000"
                className="w-full h-10"
              />
              <Box className="flex flex-row justify-between items-center">
                <Input
                  variant="outline"
                  size="lg"
                  isDisabled={true}
                  className="w-1/3"
                >
                  <InputField className="leading-none" value="0 đ" />
                </Input>
                <Text>-</Text>
                <Input
                  variant="outline"
                  size="lg"
                  isDisabled={true}
                  className="flex text-center w-1/3"
                >
                  <InputField
                    className="leading-none"
                    value={`${priceTo.toLocaleString()} đ`}
                  />
                </Input>
              </Box>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem disabled>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Loại phòng</Text>
              <Box className="flex flex-row flex-wrap">
                {roomTypes.map((roomType, index) => (
                  <Box key={index} className="w-1/2 p-1">
                    <Pressable
                      key={index}
                      onPress={() => handleChooseRoomType(roomType)}
                      className={`border rounded-lg p-3 ${
                        stringToArray(currentRoomTypes).includes(roomType)
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          stringToArray(currentRoomTypes).includes(roomType)
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {roomType}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem disabled>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Tiện nghi</Text>
              <Box className="flex flex-row flex-wrap">
                {convenients.map((convenient, index) => (
                  <Box key={index} className="w-1/2 p-1">
                    <Pressable
                      onPress={() => handleChooseConvenient(convenient)}
                      className={`border rounded-lg p-3 ${
                        stringToArray(utilities).includes(convenient)
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          stringToArray(utilities).includes(convenient)
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {convenient}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem disabled>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Nội thất</Text>
              <Box className="flex flex-row flex-wrap">
                {interiors.map((interior, index) => (
                  <Box key={index} className="w-1/2 p-1">
                    <Pressable
                      onPress={() => handleChooseInterior(interior)}
                      className={`border rounded-lg p-3 ${
                        stringToArray(currentInteriors).includes(interior)
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          stringToArray(currentInteriors).includes(interior)
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {interior}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </VStack>
          </ActionsheetItem>
        </ScrollView>

        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem className="flex flex-row justify-center items-center">
          <VStack className="w-1/2">
            <Button
              action="secondary"
              className="bg-secondary-300"
              onPress={handleCloseAs}
            >
              <ButtonText>Hủy</ButtonText>
            </Button>
          </VStack>
          <VStack className="w-1/2">
            <Button
              action="positive"
              className="bg-success-300"
              onPress={handleAllFilter}
            >
              <ButtonText>Áp dụng</ButtonText>
            </Button>
          </VStack>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default RoomFilter;
