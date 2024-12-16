import { OnboardingItem } from "@/types/types";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  item: OnboardingItem;
}

const OnboardItem = ({ item }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      key={item.id}
      style={[{ width }]}
      className="flex items-center justify-center p-5"
    >
      <Image
        source={item.image as ImageSourcePropType}
        className="w-full h-[300px] rounded-full"
        resizeMode="contain"
      />
      <View className="flex flex-row items-center justify-center w-full mt-10">
        <Text className="text-[#342BD9] text-5xl font-extrabold mx-10 text-center">
          {item.title}
        </Text>
      </View>
      <Text className="text-xl font-bold text-center text-[#808080] mx-5 mt-3">
        {item.description}
      </Text>
    </View>
  );
};

export default OnboardItem;
