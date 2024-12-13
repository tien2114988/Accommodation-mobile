import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
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
import { roomTypes } from '@/constants/room';

interface Props {
  showActionSheet: boolean;
  mode: string;
  handleClose: () => void;
}

const RoomTypeFilter = ({ showActionSheet, mode, handleClose }: Props) => {
  return (
    <Actionsheet
      isOpen={showActionSheet && mode === Mode.ROOMTYPE}
      onClose={handleClose}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem className="flex justify-center">
          <Heading>Loại phòng</Heading>
        </ActionsheetItem>
        <ActionsheetItem>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem>
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

export default RoomTypeFilter;
