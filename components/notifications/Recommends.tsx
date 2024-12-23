import { View, Text, FlatList } from "react-native";
import React from "react";
import { Box } from "../ui/box";
import Recommend from "./Recommend";

const fakeData = [
  {
    id: 1,
    title: "Khuyến mãi mới",
    description: "Tặng 50% giá trị đơn hàng",
  },
  {
    id: 2,
    title: "Quà tặng hôm nay",
    description: "Bạn được nhận 1 vé xem phim miễn phí",
  },
  {
    id: 3,
    title: "Sinh nhật bạn bè",
    description: "Hãy chúc mừng sinh nhật bạn bè",
  },
  {
    id: 4,
    title: "Tìm kiếm cơ hội",
    description: "Đăng ký nhanh tay để nhận ngay những phần quả hấp dẫn nhất",
  },
  {
    id: 5,
    title: "Điểm danh",
    description: "Điểm danh nhận phần thưởng ngay từ hôm nay",
  },
];

const Recommends = () => {
  return (
    <Box className="h-full">
      <FlatList
        className="w-full flex flex-col px-4 gap-3 h-auto"
        data={fakeData}
        renderItem={({ item }) => <Recommend recommend={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export default Recommends;
