import { Box } from '@/components/ui/box';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Button,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { onboardings } from '@/constants';
import Onboarding from '@/components/onboarding/Onboarding';
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-red-700">
      {/* Onboards */}
      <View className="py-24 bg-white flex items-center justify-between">
        <View className="flex h- justify-center flex-row gap-2">
          <Text className="text-black text-3xl font-extrabold">
            Accommodation
          </Text>
          <Text className="text-3xl text-success-600 font-extrabold">
            Seeking
          </Text>
        </View>
        <Onboarding onboardings={onboardings} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
