import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from '../ui/divider';
import { Mode } from '@/app/(tabs)/(search)';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
} from '../ui/actionsheet';
import { Button, ButtonText } from '../ui/button';
import { Grid, GridItem } from '../ui/grid';
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
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '../ui/slider';
import { convenients, interiors, roomTypes } from '@/constants/room';

interface Props {
  showActionSheet: boolean;
  mode: string;
  handleClose: () => void;
}

const RoomFilter = ({ showActionSheet, mode, handleClose }: Props) => {
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

        <ActionsheetItem className="flex justify-center">
          <Heading>Lọc kết quả</Heading>
        </ActionsheetItem>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>

        <ScrollView>
          <ActionsheetItem>
            <VStack space="md">
              <Text className="text-xl font-semibold">Sắp xếp theo</Text>
              <RadioGroup>
                <VStack space="lg">
                  <Radio
                    value="QR"
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
                    value="CASH"
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
                    value="CASH"
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
          <ActionsheetItem>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Khoảng giá</Text>
              <Slider
                defaultValue={30}
                size="md"
                orientation="horizontal"
                isDisabled={false}
                isReversed={false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb className="" />
              </Slider>
              <Box className="flex flex-row justify-between items-center">
                <Input
                  variant="outline"
                  size="lg"
                  isDisabled={true}
                  className="w-1/3"
                >
                  <InputField className="leading-none" value="1 đ" />
                </Input>
                <Text>-</Text>
                <Input
                  variant="outline"
                  size="lg"
                  isDisabled={true}
                  className="flex text-center w-1/3"
                >
                  <InputField className="leading-none" value="100.000 đ" />
                </Input>
              </Box>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Loại phòng</Text>
              <Grid
                className="gap-4"
                _extra={{
                  className: 'grid-cols-8',
                }}
              >
                {roomTypes.map((roomType, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-4',
                    }}
                  >
                    <Pressable
                      // onPress={() => handleSelectNumOfBaby(option)}
                      className={`border rounded-lg p-3 ${
                        index > 2
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          index > 2 ? 'text-info-600' : 'text-secondary-400'
                        }`}
                      >
                        {roomType}
                      </Text>
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Tiện nghi</Text>
              <Grid
                className="gap-4"
                _extra={{
                  className: 'grid-cols-8',
                }}
              >
                {convenients.map((convenient, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-4',
                    }}
                  >
                    <Pressable
                      // onPress={() => handleSelectNumOfBaby(option)}
                      className={`border rounded-lg p-3 ${
                        index > 2
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          index > 2 ? 'text-info-600' : 'text-secondary-400'
                        }`}
                      >
                        {convenient}
                      </Text>
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem>
            <VStack space="xl" className="w-full">
              <Text className="text-xl font-semibold">Nội thất</Text>
              <Grid
                className="gap-4"
                _extra={{
                  className: 'grid-cols-8',
                }}
              >
                {interiors.map((interior, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-4',
                    }}
                  >
                    <Pressable
                      // onPress={() => handleSelectNumOfBaby(option)}
                      className={`border rounded-lg p-3 ${
                        index > 2
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          index > 2 ? 'text-info-600' : 'text-secondary-400'
                        }`}
                      >
                        {interior}
                      </Text>
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
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
              onPress={handleClose}
            >
              <ButtonText>Hủy</ButtonText>
            </Button>
          </VStack>
          <VStack className="w-1/2">
            <Button
              action="positive"
              className="bg-success-300"
              onPress={handleClose}
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
