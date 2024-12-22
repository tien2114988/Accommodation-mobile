import { View, Text } from "react-native";
import React from "react";
import { Box } from "../ui/box";
import { Divider } from "../ui/divider";
import Ionicons from "@expo/vector-icons/Ionicons";
interface Props {
  recommend: { id: number; title: string; description: string };
}

const Recommend = ({ recommend }: Props) => {
  return (
    <Box className="flex flex-col items-center w-full gap-2 py-2">
      {/* Avatar */}
      <Box className="flex flex-row items-center w-full gap-2 ">
        <Box
          className="w-12 h-12 rounded-full flex
        items-center justify-center border border-gray-300"
        >
          <Ionicons name="megaphone-outline" size={24} color="black" />
        </Box>
        <Box className="flex flex-col w-full ">
          <Box className="flex justify-between">
            <Text className="text-base text-black items-center font-medium ">
              {recommend.title}
            </Text>
            <Text className="text-xs text-gray-400">
              {recommend.description}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-col w-full">
        <Divider />
      </Box>
    </Box>
  );
};

export default Recommend;
