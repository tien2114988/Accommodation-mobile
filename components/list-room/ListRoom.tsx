import { View, Text, FlatList } from "react-native";
import React from "react";
import Room from "./Room";
import { Box } from "../ui/box";
import { RoomDetailModel } from "@/types/postTypes";

interface Props {
  data: RoomDetailModel[];
}

export default function ListRoom({ data }: Props) {
  return (
    <Box className="flex pb-5 mb-5">
      <FlatList
        data={data}
        renderItem={({ item }) => <Room room={item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </Box>
  );
}
