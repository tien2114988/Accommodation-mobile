import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

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
import { Input, InputField } from '../ui/input';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '../ui/slider';

interface Props {
  showActionSheet: boolean;
  mode: string;
  handleClose: () => void;
}

const PriceFilter = ({ showActionSheet, mode, handleClose }: Props) => {
  return (
    <Actionsheet
      isOpen={showActionSheet && mode === Mode.PRICE}
      onClose={handleClose}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem className="flex justify-center">
          <Heading>Khoảng giá</Heading>
        </ActionsheetItem>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem>
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
        </ActionsheetItem>
        <ActionsheetItem className="flex flex-row justify-between items-center">
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

export default PriceFilter;
