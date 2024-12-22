import { View, Text, FlatList } from "react-native";
import React from "react";
import { Box } from "../ui/box";
import Message from "./Message";
import { Divider } from "../ui/divider";

const fakeData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    time: "Hôm qua lúc 10:00",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    time: "Hôm qua lúc 04:00",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 4:00",
  },
  {
    id: 4,
    name: "Nguyễn Văn C2",
    time: "Hôm qua lúc 02:00",
  },
  {
    id: 5,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 09:21",
  },
  {
    id: 6,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 09:00",
  },
  {
    id: 7,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 12:04",
  },
  {
    id: 8,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 12:01",
  },
  {
    id: 9,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 12:03",
  },
  {
    id: 10,
    name: "Nguyễn Văn C",
    time: "Hôm qua lúc 12:02",
  },
];

const Messages = () => {
  return (
    <Box className="h-full">
      <FlatList
        className="w-full flex flex-col px-4 gap-3 h-auto"
        data={fakeData}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export default Messages;
