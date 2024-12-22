import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import Messages from "@/components/notifications/Messages";
import Recommends from "@/components/notifications/Recommends";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "recommend">(
    "messages"
  );

  return (
    <SafeAreaView className="h-full p-4 w-full flex items-center bg-white">
      <VStack space="4xl" className="h-full flex w-full ">
        {/* Title */}
        <Box className="flex w-full ">
          <Text className="text-2xl font-bold">Hộp thư</Text>
        </Box>

        {/* Tabs */}
        <Box className="flex w-full items-center justify-center">
          <Box className="flex w-full flex-row justify-center">
            <Pressable
              className="w-1/3"
              onPress={() => setActiveTab("messages")}
            >
              <Box
                style={
                  activeTab === "messages"
                    ? styles.activeTabHeader
                    : { borderBottomWidth: 8, borderBottomColor: "transparent" }
                }
              >
                <Text className="py-2 font-semibold text-center text-xl ">
                  Tin nhắn
                </Text>
              </Box>
            </Pressable>
            <Pressable
              className="w-1/3 bg-green-400"
              onPress={() => setActiveTab("recommend")}
            >
              <Box
                style={
                  activeTab === "recommend"
                    ? styles.activeTabHeader
                    : { borderBottomWidth: 8, borderBottomColor: "transparent" }
                }
              >
                <Text className="py-2 font-semibold text-center text-xl ">
                  Đề xuất
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {/* View */}
        <HStack className="flex w-full h-full ">
          {activeTab === "messages" ? (
            <Box className="flex w-full h-full ">
              <Messages />
            </Box>
          ) : (
            <Box>
              <Recommends />
            </Box>
          )}
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  activeTabHeader: {
    borderBottomWidth: 6,
    borderBottomColor: "#0C8CE9",
  },
});
