import { Button, ButtonText } from '@/components/ui/button';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { selectUser } from '@/store/reducers';
import { WorkType } from '@/constants';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import FlagVN from '@/components/svg/FlagVN';
import { Pressable } from '@/components/ui/pressable';
import { i18n } from '@/localization';
import { HStack } from '@/components/ui/hstack';
import Carousel from '@/components/carousel/Carousel';

const Home = () => {
  const currentUser = useSelector(selectUser);
  // console.log("currentUser", currentUser);

  return (
    <View className="flex">
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/Post?workType=${WorkType.HOUSECLEANING.key}`);
          }}
        >
          <ButtonText>Đăng việc {WorkType.HOUSECLEANING.value}</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/Post?workType=${WorkType.BABYSITTING.key}`);
          }}
        >
          <ButtonText>Đăng việc {WorkType.BABYSITTING.value}</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Home;
{
  /* <View className="flex">
<TouchableWithoutFeedback>
  <Button
    className="w-fit self-end mt-4"
    size="md"
    onPress={() => {
      router.push(`/Post?workType=${WorkType.HOUSECLEANING.key}`);
    }}
  >
    <ButtonText>Đăng việc {WorkType.HOUSECLEANING.value}</ButtonText>
  </Button>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback>
  <Button
    className="w-fit self-end mt-4"
    size="md"
    onPress={() => {
      router.push(`/Post?workType=${WorkType.BABYSITTING.key}`);
    }}
  >
    <ButtonText>Đăng việc {WorkType.BABYSITTING.value}</ButtonText>
  </Button>
</TouchableWithoutFeedback>
</View> */
}
