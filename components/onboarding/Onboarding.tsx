import { OnboardingItem } from "@/types/types";
import React, { useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import OnboardItem from "./OnboardItem";
import Paginator from "./Paginator";
import { router } from "expo-router";
import { Pressable } from "../ui/pressable";
import AntDesign from "@expo/vector-icons/AntDesign";
interface Props {
  onboardings: OnboardingItem[];
}

const Onboarding = ({ onboardings }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;
  const slidesRef = useRef<FlatList<any>>(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardings.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <View className="h-full bg-white flex justify-center items-center">
      <FlatList
        className="h-[100px]"
        data={onboardings}
        renderItem={({ item }) => <OnboardItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        onViewableItemsChanged={viewableItemsChanged}
      />
      <Paginator data={onboardings} scrollX={scrollX} />
      <View className="w-full flex flex-row justify-between p-5">
        {currentIndex != onboardings.length - 1 ? (
          <>
            <TouchableOpacity
              className=""
              onPress={() => {
                // router.replace('/(auth)/log-in');
                router.replace("/(auth)/log-in");
                // router.push(`/(auth)/verify?email=${email}&role=${role}`);
              }}
            >
              <Pressable>
                <Text className="text-black text-md p-5 font-normal text-xl">
                  Bỏ qua
                </Text>
              </Pressable>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scrollTo}
              className="bg-[#5517FF] flex rounded-full w-16 h-16 items-center justify-center"
            >
              <AntDesign name="arrowright" size={48} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className=""
              onPress={() => {
                // router.replace('/(auth)/log-in');
                router.replace("/(auth)/log-in");
                // router.push(`/(auth)/verify?email=${email}&role=${role}`);
              }}
            >
              <Text className="text-black text-md p-5 font-normal text-xl hidden">
                Bỏ qua
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              onPress={() => {
                router.replace("/(auth)/log-in");
              }}
            >
              <Text className="text-white items-center text-xl font-semibold h-auto py-3 px-11 bg-[#5517FF] rounded-full shadow-lg shadow-[#5517FF]">
                Bắt đầu
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Onboarding;
