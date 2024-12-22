import React, { useEffect, useRef, useState } from 'react';
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
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/services';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack } from '../ui/hstack';
import { DistrictModel, ProvinceModel, WardModel } from '@/types/addressTypes';
import { useDebounce } from '@/utils/helper';
import { NullPlaceholderHandler } from 'i18n-js';

interface Props {
  showActionSheet: boolean;
  address: string;
  setAddress: (val: string) => void;
  handleClose: () => void;
}

const AddressSelection = ({
  showActionSheet,
  address,
  setAddress,
  handleClose,
}: Props) => {
  const initialAddressRef = useRef(address);

  const [currentProvince, setProvince] = useState<ProvinceModel | null>(null);
  const [currentDistrict, setDistrict] = useState<DistrictModel | null>(null);
  const [currentWard, setWard] = useState<WardModel | null>(null);

  const { data: provinces } = useGetProvincesQuery();
  const { data: districts } = useGetDistrictsQuery(
    currentProvince?.idProvince ?? '',
  );
  const { data: wards } = useGetWardsQuery(currentDistrict?.idDistrict ?? '');

  useEffect(() => {
    initialAddressRef.current = address;
  }, [showActionSheet]);

  const handleCloseAs = () => {
    setAddress(initialAddressRef.current);
    setProvince(null);
    setDistrict(null);
    setWard(null);
    handleClose();
  };

  const handleApply = () => {
    setProvince(null);
    setDistrict(null);
    setWard(null);
    handleClose();
  };

  const chooseProvince = (province: ProvinceModel) => {
    setAddress(province.name);
    setProvince(province);
  };

  const chooseDistrict = (district: DistrictModel) => {
    setAddress(address + ', ' + district.name);
    setDistrict(district);
  };

  const chooseWard = (ward: WardModel) => {
    setAddress(
      currentProvince?.name + ', ' + currentDistrict?.name + ', ' + ward?.name,
    );
    setWard(ward);
  };

  return (
    <Actionsheet isOpen={showActionSheet} onClose={handleCloseAs}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <ActionsheetItem disabled className="flex justify-center">
          <Heading>
            {currentDistrict
              ? 'Phường/Xã'
              : currentProvince
              ? 'Quận/Huyện'
              : 'Tỉnh/Thành phố'}
          </Heading>
        </ActionsheetItem>

        <ActionsheetItem disabled>
          <Divider />
        </ActionsheetItem>

        {address && (
          <ActionsheetItem disabled>
            <HStack space="xs" className="items-center">
              <ActionsheetItemText className="text-error-400 text-md">
                <Ionicons size={20} name="location" />
              </ActionsheetItemText>
              <ActionsheetItemText className="text-md w-11/12">
                Khu vực : {address}
              </ActionsheetItemText>
            </HStack>
          </ActionsheetItem>
        )}

        {/* <ActionsheetItem disabled>
          <Input variant="outline" size="lg" className="w-full">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              type="text"
              value={search}
              onChangeText={text => setSearch(text)}
              className="leading-none"
              placeholder="Tìm kiếm"
            />
          </Input>
        </ActionsheetItem> */}

        <ActionsheetItem disabled>
          <ScrollView className="max-h-64">
            {currentDistrict && wards && wards?.length > 0
              ? wards.map((ward, index) => (
                  <ActionsheetItem key={index} onPress={() => chooseWard(ward)}>
                    <ActionsheetItemText size="md">
                      {ward.name}
                    </ActionsheetItemText>
                  </ActionsheetItem>
                ))
              : currentProvince && districts && districts.length > 0
              ? districts.map((district, index) => (
                  <ActionsheetItem
                    key={index}
                    onPress={() => chooseDistrict(district)}
                  >
                    <ActionsheetItemText size="md">
                      {district.name}
                    </ActionsheetItemText>
                  </ActionsheetItem>
                ))
              : provinces &&
                provinces.length > 0 &&
                provinces.map((province, index) => (
                  <ActionsheetItem
                    key={index}
                    onPress={() => chooseProvince(province)}
                  >
                    <ActionsheetItemText size="md">
                      {province.name}
                    </ActionsheetItemText>
                  </ActionsheetItem>
                ))}
          </ScrollView>
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
              onPress={handleApply}
              isDisabled={currentWard == null}
            >
              <ButtonText>Áp dụng</ButtonText>
            </Button>
          </VStack>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default AddressSelection;
