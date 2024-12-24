import React, { useEffect, useRef } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import Slider from '@react-native-community/slider';
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
import { Input, InputField } from '../ui/input';
import { Mode } from '@/constants/room';

interface Props {
  showActionSheet: boolean;
  mode: string;
  priceTo: number;
  setPriceTo: (val: number) => void;
  handleFilterPrice: () => void;
  handleClose: () => void;
}

const PriceFilter = ({
  showActionSheet,
  mode,
  priceTo,
  setPriceTo,
  handleFilterPrice,
  handleClose,
}: Props) => {
  const initialPriceToRef = useRef(priceTo);

  useEffect(() => {
    if (mode === Mode.PRICE) {
      initialPriceToRef.current = priceTo;
    }
  }, [showActionSheet]);

  const handleCloseAs = () => {
    setPriceTo(initialPriceToRef.current);
    handleClose();
  };

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
        <ActionsheetItemText className="flex justify-center m-2">
          <Heading>Khoảng giá</Heading>
        </ActionsheetItemText>
        <ActionsheetItem disabled>
          <Divider />
        </ActionsheetItem>

        <ActionsheetItem disabled>
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
        </ActionsheetItem>

        <ActionsheetItem
          disabled
          className="flex flex-row justify-between items-center"
        >
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
        </ActionsheetItem>
        <ActionsheetItem disabled>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem
          disabled
          className="flex flex-row justify-center items-center"
        >
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
              onPress={handleFilterPrice}
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
