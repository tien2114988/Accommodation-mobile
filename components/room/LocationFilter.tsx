import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '../ui/divider';
import { Mode } from '@/app/(tabs)/(search)';
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
import { Input, InputField, InputIcon, InputSlot } from '../ui/input';

import { SearchIcon } from '../ui/icon';

const locations = [
  'Thành phố Hồ Chí Minh',
  'Đồng Nai',
  'Bình Dương',
  'Tiền Giang',
  'Hà Nội',
  'Bạc Liêu',
  'Hải Phòng',
  'Bình Định',
  'Sóc Trăng',
  'Hải Dương',
  'Long An',
  'Đồng Tháp',
  'Cà Mau',
];

interface Props {
  showActionSheet: boolean;
  mode: string;
  handleClose: () => void;
}

const LocationFilter = ({ showActionSheet, mode, handleClose }: Props) => {
  return (
    <Actionsheet
      isOpen={showActionSheet && mode === Mode.LOCATION}
      onClose={handleClose}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem className="flex justify-center">
          <Heading>Tỉnh/Thành phố</Heading>
        </ActionsheetItem>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>

        <ActionsheetItem>
          <Input variant="outline" size="lg" className="w-full">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField className="leading-none" placeholder="Tìm kiếm phòng" />
          </Input>
        </ActionsheetItem>

        <ActionsheetItem>
          <ScrollView className="max-h-64">
            {locations.map((location, index) => (
              <ActionsheetItem key={index}>
                <ActionsheetItemText size="md">{location}</ActionsheetItemText>
              </ActionsheetItem>
            ))}
          </ScrollView>
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

export default LocationFilter;
