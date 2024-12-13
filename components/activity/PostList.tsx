import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  CreateTakePostModel,
  PostModel,
  TakePostModel,
} from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  convertMinuteToHour,
  formatTimeRange,
  normalizeDate,
  normalizeDateTime,
} from '@/utils/dateUtil';
import {
  PackageName,
  PostStatus,
  TakePostStatus,
  UserRole,
  WorkType,
} from '@/constants';
import moment from 'moment';
import PostStatusBadge from '../badge/PostStatusBadge';
import { Divider } from '../ui/divider';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { selectUser, setPost } from '@/store/reducers';
import { useSelector } from 'react-redux';
import { Button, ButtonSpinner, ButtonText } from '../ui/button';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/alert-dialog';
import { Heading } from '../ui/heading';
import { useTakePostMutation } from '@/services/post';
import { Toast, ToastDescription, ToastTitle, useToast } from '../ui/toast';
import { isPostModel } from '../post/PostInfo';
import TakePostDialog from '../post/TakePostDialog';

interface Props {
  posts?: PostModel[] | TakePostModel[];
  takePostStatus?: string;
}

export const Mode = {
  TAKE: {
    key: 'TAKE',
    value: 'nhận',
    description:
      'Sau khi nhận công việc, bạn phải đến làm theo lịch trình công việc',
  },
  ACCEPT: {
    key: 'ACCEPT',
    value: 'chấp nhận',
    description:
      'Sau khi nhận công việc, bạn phải đến làm theo lịch trình công việc',
  },
  REJECT: {
    key: 'REJECT',
    value: 'từ chối',
    description:
      'Sau khi từ chối công việc, bạn sẽ không thể hoàn lại theo tác',
  },
};

const PostList = ({ posts, takePostStatus }: Props) => {
  const [mode, setMode] = React.useState(Mode.TAKE.key);
  const [selectedPost, setSelectedPost] = React.useState<PostModel>();
  const [takePost, { isLoading, error, data }] = useTakePostMutation();
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const navigateToPostDetail = (post: PostModel) => {
    dispatch(setPost(post));
    if (takePostStatus) {
      router.push(`/(posts)/PostDetail?takePostStatus=${takePostStatus}`);
    } else {
      router.push('/(posts)/PostDetail');
    }
  };

  const actionPost = (post: PostModel, mode: string) => {
    setMode(mode);
    setSelectedPost(post);
    setShowAlertDialog(true);
  };

  const convertToPost = (post: PostModel | TakePostModel): PostModel => {
    return isPostModel(post) ? post : post.post;
  };

  const handleTakePost = async () => {
    if (!selectedPost || !currentUser || !currentUser.id) {
      return;
    }
    const data: CreateTakePostModel = {
      id: selectedPost?.id,
      freelancerId: currentUser?.id,
      status:
        mode === Mode.REJECT.key
          ? TakePostStatus.REJECTED.key
          : TakePostStatus.ACCEPTED.key,
    };
    const res = await takePost(data);
    if (error || res.data?.returnCode != 1000) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>
                {Mode[mode as keyof typeof Mode].value} công việc thất bại
              </ToastTitle>
              <ToastDescription>{res.error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="outline">
              <ToastTitle>Thành công</ToastTitle>
              <ToastDescription>
                {Mode[mode as keyof typeof Mode].value} công việc thành công
              </ToastDescription>
            </Toast>
          );
        },
      });
    }
    setShowAlertDialog(false);
  };

  return (
    <>
      {posts && posts?.length > 0 ? (
        <ScrollView>
          <VStack className="m-3" space="md">
            {posts.map(post => (
              <Pressable
                onPress={() => navigateToPostDetail(convertToPost(post))}
                key={post.id}
              >
                {({ pressed }) => (
                  <Card
                    className={`rounded-xl shadow-lg ${
                      pressed && 'opacity-75'
                    }`}
                  >
                    <Box className="flex flex-row items-center justify-between">
                      <VStack space="sm">
                        <Text className="font-semibold text-xl text-success-400">
                          {
                            WorkType[
                              convertToPost(post).work
                                .name as keyof typeof WorkType
                            ].value
                          }
                        </Text>
                        <Text className="text-secondary-400">
                          Đăng ngày:{' '}
                          {moment(
                            normalizeDateTime(convertToPost(post).createdAt),
                          )?.format('DD/MM/YYYY')}
                        </Text>
                      </VStack>
                      <PostStatusBadge status={convertToPost(post).status} />
                    </Box>
                    <Divider className="my-4" />
                    <VStack space="md">
                      <HStack space="md" className="items-center">
                        <Text className="text-cyan-600">
                          <Ionicons size={20} name="calendar-outline" />
                        </Text>
                        <HStack space="sm">
                          {convertToPost(post).packageName !==
                            PackageName._1DAY.key && (
                            <Text className="font-medium">
                              Ngày làm thứ{' '}
                              {convertToPost(post).numOfWorkedDay + 1}/
                              {convertToPost(post).totalWorkDay}:
                            </Text>
                          )}
                          <Text>
                            {normalizeDate(
                              convertToPost(post).workSchedules[
                                convertToPost(post).numOfWorkedDay
                              ].date,
                              '/',
                              false,
                            )}
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="text-info-500">
                          <Ionicons size={20} name="time-outline" />
                        </Text>
                        <Text>{`${
                          convertToPost(post).duration
                        } giờ, ${formatTimeRange(
                          convertToPost(post).startTime,
                          convertToPost(post).duration,
                        )}`}</Text>
                      </HStack>
                      {convertToPost(post).work.name ===
                        WorkType.HOUSECLEANING.key && (
                        <HStack space="md" className="items-center">
                          <Text className="text-tertiary-600">
                            <Ionicons size={20} name="square-outline" />
                          </Text>
                          <Text>
                            {convertToPost(post).houseCleaning?.area} m²
                          </Text>
                        </HStack>
                      )}
                      {convertToPost(post).work.name ===
                        WorkType.BABYSITTING.key && (
                        <HStack space="md" className="items-center">
                          <Text className="text-tertiary-600">
                            <Ionicons size={20} name="happy-outline" />
                          </Text>
                          <Text>
                            {convertToPost(post).babysitting?.numOfBaby} trẻ
                          </Text>
                        </HStack>
                      )}
                      <HStack space="md" className="items-center">
                        <Text>
                          <Ionicons size={20} name="people-outline" />
                        </Text>
                        <Text>
                          {convertToPost(post).numOfFreelancer}/
                          {convertToPost(post).totalFreelancer}
                        </Text>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="text-red-600">
                          <Ionicons size={20} name="location-outline" />
                        </Text>
                        <Text className="flex-1">
                          {convertToPost(post).address.detail}
                        </Text>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="text-success-500 text-lg">
                          <Ionicons size={20} name="cash-outline" />
                        </Text>
                        <Text className="text-success-400 font-medium text-lg">
                          {convertToPost(post).price.toLocaleString()} VND
                        </Text>
                      </HStack>
                    </VStack>
                    {[
                      PostStatus.CANCELED.key,
                      PostStatus.COMPLETED.key,
                      PostStatus.FAILED.key,
                    ].includes(post.status) &&
                      currentUser?.role === UserRole.CUSTOMER && (
                        <Box>
                          <Divider className="my-4" />
                          <HStack reversed={true}>
                            <Pressable className="">
                              {({ pressed }) => (
                                <Text
                                  className={`${
                                    pressed
                                      ? 'text-green-800'
                                      : 'text-green-600'
                                  } text-lg font-semibold`}
                                >
                                  Đăng lại
                                </Text>
                              )}
                            </Pressable>
                          </HStack>
                        </Box>
                      )}
                    {takePostStatus === 'NEW' &&
                      currentUser?.role === UserRole.FREELANCER && (
                        <Box>
                          <Divider className="my-4" />
                          <HStack reversed>
                            <Button
                              action="positive"
                              className="rounded-lg bg-success-300"
                              onPress={() =>
                                actionPost(convertToPost(post), Mode.TAKE.key)
                              }
                            >
                              <Text className="text-white text-lg">
                                Nhận việc
                              </Text>
                            </Button>
                          </HStack>
                        </Box>
                      )}
                    {!isPostModel(post) &&
                      currentUser?.role === UserRole.FREELANCER &&
                      post.status !== TakePostStatus.ACCEPTED.key && (
                        <Box>
                          <Divider className="my-4" />
                          <HStack space="md" className="justify-end">
                            {post.status === TakePostStatus.PENDING.key && (
                              <>
                                <Button
                                  action="negative"
                                  className="rounded-lg bg-error-400"
                                  onPress={() =>
                                    actionPost(post.post, Mode.REJECT.key)
                                  }
                                >
                                  <Text className="text-white text-lg">
                                    Từ chối
                                  </Text>
                                </Button>
                                <Button
                                  action="positive"
                                  className="rounded-lg bg-success-300"
                                  onPress={() =>
                                    actionPost(post.post, Mode.ACCEPT.key)
                                  }
                                >
                                  <Text className="text-white text-lg">
                                    Chấp nhận
                                  </Text>
                                </Button>
                              </>
                            )}
                            {post.status === TakePostStatus.REJECTED.key && (
                              <Text className="text-error-400">
                                Bạn đã từ chối yêu cầu công việc
                              </Text>
                            )}
                          </HStack>
                        </Box>
                      )}
                  </Card>
                )}
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <Box className="flex-1 justify-center items-center">
          <Text className="text-lg text-center">
            Bạn chưa có thông tin công việc
          </Text>
          <Text className="text-lg text-center">
            Hãy {currentUser?.role === UserRole.FREELANCER ? 'nhận' : 'đăng'}{' '}
            công việc mới
          </Text>
        </Box>
      )}
      <TakePostDialog
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
        mode={mode}
        handleTakePost={handleTakePost}
        isLoading={isLoading}
      />
    </>
  );
};

export default PostList;
