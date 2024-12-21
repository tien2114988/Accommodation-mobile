import React, { useEffect, useRef } from 'react';
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
  ActionsheetItemText,
} from '../ui/actionsheet';
import { Button, ButtonText } from '../ui/button';
import { Grid, GridItem } from '../ui/grid';
import { Heading } from '../ui/heading';
import { roomTypes } from '@/constants/room';
import { stringToArray } from '@/utils/stringUtil';

interface Props {
  showActionSheet: boolean;
  mode: string;
  currentRoomTypes: string;
  setRoomType: (val: string) => void;
  handleRoomTypeFilter: () => void;
  handleClose: () => void;
}

const RoomTypeFilter = ({
  showActionSheet,
  mode,
  currentRoomTypes,
  setRoomType,
  handleRoomTypeFilter,
  handleClose,
}: Props) => {
  const initialRoomTypesRef = useRef(currentRoomTypes);

  useEffect(() => {
    if (mode === Mode.ROOMTYPE) {
      initialRoomTypesRef.current = currentRoomTypes;
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

    console.log(updatedRoomTypes);
    setRoomType(updatedRoomTypes);
  };

  const handleCloseAs = () => {
    setRoomType(initialRoomTypesRef.current);
    handleClose();
  };

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
        <ActionsheetItemText className="flex justify-center m-2">
          <Heading>Loại phòng</Heading>
        </ActionsheetItemText>
        <ActionsheetItem disabled>
          <Divider />
        </ActionsheetItem>
        <ActionsheetItem disabled>
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
              </GridItem>
            ))}
          </Grid>
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
              onPress={handleRoomTypeFilter}
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
