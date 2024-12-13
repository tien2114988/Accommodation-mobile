import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

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
import { Heading } from '../ui/heading';
import { CircleIcon } from '../ui/icon';
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIndicator,
  RadioIcon,
} from '../ui/radio';

interface Props {
  showActionSheet: boolean;
  mode: string;
  handleClose: () => void;
}

const RoomSort = ({ showActionSheet, mode, handleClose }: Props) => {
  return (
    <Actionsheet
      isOpen={showActionSheet && mode === Mode.SORT}
      onClose={handleClose}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem className="flex justify-center">
          <Heading>Sắp xếp theo</Heading>
        </ActionsheetItem>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem>
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
        </ActionsheetItem>
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

export default RoomSort;
