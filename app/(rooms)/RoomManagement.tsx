import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { Heading } from '@/components/ui/heading';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import RoomListManagement from '@/components/management/RoomListManagement';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { useGetPostsByUserIdQuery } from '@/services/post';
import RoomManagementSkeleton from '@/components/skeleton/RoomManagementSkeleton';

const RoomManagement = () => {
  const toast = useToast();

  const { data, error, isFetching } = useGetPostsByUserIdQuery({ id: 1 });

  useEffect(() => {
    if (error) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Lấy thông tin các bài đăng thất bại</ToastTitle>
              {/* <ToastDescription>{}</ToastDescription> */}
            </Toast>
          );
        },
      });
    }
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      <Heading className="text-center text-info-500 text-2xl">
        Các phòng đang cho thuê
      </Heading>

      {isFetching ? (
        <RoomManagementSkeleton />
      ) : (
        <RoomListManagement rooms={data ?? []} />
      )}

      <Fab
        size="md"
        placement="bottom right"
        className="bg-info-500 focus:opacity-50"
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Thêm phòng</FabLabel>
      </Fab>
    </SafeAreaView>
  );
};

export default RoomManagement;
