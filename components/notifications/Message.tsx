import { View, Text } from "react-native";
import React from "react";
import { Box } from "../ui/box";
import { Divider } from "../ui/divider";

interface Props {
  message: { id: number; name: string; time: string };
}

const Message = ({ message }: Props) => {
  return (
    <Box className="flex flex-col items-center w-full gap-2 py-2 ">
      {/* Avatar */}
      <Box className="flex flex-row items-center w-full gap-2 ">
        <Box
          className="w-12 h-12 rounded-full bg-primary-500 flex
        items-center justify-center border border-gray-300"
        >
          <Text className="text-white text-lg font-bold ">NA</Text>
        </Box>
        <Box className="flex flex-col w-full ">
          <Box className="flex justify-between">
            <Text className="text-base text-black items-center font-medium ">
              {message.name}
            </Text>
            <Text className="text-xs text-gray-400">{message.time}</Text>
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-col w-full">
        <Divider />
      </Box>
    </Box>
  );
};

export default Message;
