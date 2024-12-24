import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { Heading } from '@/components/ui/heading';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import RoomListManagement from '@/components/management/RoomListManagement';

import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { useGetPostsByUserIdQuery } from '@/services/post';
import RoomManagementSkeleton from '@/components/skeleton/RoomManagementSkeleton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';

const RoomManagement = () => {
  const toast = useToast();
  const router = useRouter();
  const user = useSelector(selectUser);
  const { type, friendId } = useLocalSearchParams();

  const id = friendId ? +friendId : user?.id;

  console.log(user?.id);

  const { data, error, isFetching, refetch } = useGetPostsByUserIdQuery({
    id: id,
    postType: type == 'room' ? 'Phòng' : 'Ở ghép',
  });

  useEffect(() => {
    if (error) {
      console.log(error);
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
        {type === 'room'
          ? 'Các phòng đăng cho thuê phòng'
          : 'Các bài đăng tìm ở ghép'}
      </Heading>

      {isFetching ? (
        <RoomManagementSkeleton />
      ) : (
        <RoomListManagement rooms={data ?? []} refetch={refetch} />
      )}

      <Fab
        size="md"
        placement="bottom right"
        className="bg-info-500 focus:opacity-50"
        onPress={() => router.push(`/(posts)/PostForm?type=${type}`)}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Thêm phòng</FabLabel>
      </Fab>
    </SafeAreaView>
  );
};

export default RoomManagement;
