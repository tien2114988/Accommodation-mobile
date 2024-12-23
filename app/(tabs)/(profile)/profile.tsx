import { View, Text, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import {
  clearAuthState,
  selectIsAuthenticated,
  selectUser,
  setUser,
} from '@/store/reducers';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { useSelector } from 'react-redux';
import RequiredAuthenticationModal from '@/components/authentication/RequiredAuthenticationModal';
import { router, useFocusEffect } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Pressable } from '@/components/ui/pressable';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EditProfileModal from '@/assets/profile/EditProfileModal';
import { persistStore } from 'redux-persist';
import { persistor, store } from '@/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

function extractDate(timestamp: any) {
  return timestamp.split('T')[0];
}

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showModal, setShowModal] = React.useState(!isAuthenticated);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const dispatch = useDispatch();

  const LogOut = async () => {
    dispatch(clearAuthState());
    persistor.purge();

    dispatch(setUser(null));
    await SecureStore.deleteItemAsync('jwt');
    // console.log("JWT successfully deleted.");
    setShowModal(false);
    router.replace('/(tabs)/(home)');
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        setShowModal(false); // Hide the modal if authenticated
      } else {
        setShowModal(true); // Show the modal if not authenticated
      }
    }, [isAuthenticated]),
  );

  return (
    <SafeAreaView>
      {!isAuthenticated && (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {isAuthenticated && (
        <SafeAreaView className="h-full p-4 w-full flex items-center bg-white">
          <VStack space="4xl" className="h-full flex p-4 w-full">
            {/* Title */}
            <Box className="flex w-full">
              <Text className="text-2xl font-bold">Thông tin tài khoản</Text>
            </Box>
            {/* Avatar */}
            <Box className="w-full flex flex-row items-center gap-2 border border-gray-300  py-2 px-4 rounded-2xl ">
              <Pressable className="" onPress={() => setShowModalEdit(true)}>
                {currentUser?.picture && (
                  <Box>
                    <Image
                      size="sm"
                      source={{
                        uri: `https://accomodation-seeking-backend.onrender.com/pictures/${currentUser?.picture}`,
                      }}
                      alt={`${currentUser?.name}`}
                      className="rounded-full shadow-lg"
                    />
                    <AntDesign
                      className="absolute bottom-0 right-0 p-1 bg-black rounded-full"
                      name="camerao"
                      size={24}
                      color="white"
                    />
                  </Box>
                )}
                {!currentUser?.picture && (
                  <Box className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center border border-gray-300">
                    <Text className="text-white text-lg font-bold">
                      {currentUser?.name[0]?.toUpperCase()}
                    </Text>
                    <AntDesign
                      className="absolute bottom-0 right-0 p-1 bg-black rounded-full border border-gray-50"
                      name="camerao"
                      size={12}
                      color="white"
                    />
                  </Box>
                )}
              </Pressable>
              <Box className="px-4 flex flex-row items-center justify-between w-[80%]">
                <Text className="text-2xl text-black items-center font-medium">
                  {currentUser?.name}
                </Text>
                <Pressable
                  onPress={() => router.push('/(tabs)/(profile)/edit-profile')}
                >
                  {({ pressed }) => (
                    <Box className={`${pressed && 'opacity-75'}`}>
                      <Ionicons name="pencil-outline" size={24} color="black" />
                    </Box>
                  )}
                </Pressable>
              </Box>
            </Box>
            {/* Email */}
            <Box className="w-full flex border border-gray-300 rounded-2xl">
              {/* Giới tính - Ngày sinh */}
              <HStack className="w-full flex items-center gap-2 justify-between border-b border-gray-300  py-3 px-5">
                <Box className="flex flex-row items-center gap-4">
                  {currentUser?.gender === 'Nam' ? (
                    <Ionicons name="male" size={32} color="#5AC1F2" />
                  ) : (
                    <Ionicons name="female" size={32} color="pink" />
                  )}
                  <Box className="flex flex-col justify-center ">
                    <Text className="text-base">Giới tính:</Text>
                    <Text className="text-lg font-medium">
                      {' '}
                      {currentUser?.gender}
                    </Text>
                  </Box>
                </Box>
                <Box className="flex flex-row items-center gap-4">
                  <Text className="text-tertiary-400">
                    <Ionicons name="calendar-number-outline" size={32} />
                  </Text>
                  <Box className="flex flex-col justify-center">
                    <Text className="text-base">Ngày sinh:</Text>
                    <Text className="text-lg font-medium">
                      {' '}
                      {currentUser?.birthdate.toString().substring(0, 10)}
                      {/* {extractDate(currentUser?.birthdate?.toString())} */}
                    </Text>
                  </Box>
                </Box>
              </HStack>
              {/* Email */}
              <HStack className="w-full flex items-center gap-2 justify-between  py-3 px-5 border-b border-gray-300">
                <Box className="w-full flex flex-row items-center gap-4 ">
                  <Ionicons name="mail-outline" size={32} color="#df1f00" />
                  <Box className="flex flex-col justify-center">
                    <Text className="text-gray-400 text-base">Email:</Text>
                    <Text className="text-lg font-medium">
                      {' '}
                      {currentUser?.email}
                    </Text>
                  </Box>
                </Box>
              </HStack>

              {/* Phone number */}
              <HStack className="w-full flex items-center gap-2 justify-between py-3 px-5">
                <Box className="flex flex-row items-center gap-4">
                  <Ionicons name="call-outline" size={32} color="#6cb454" />
                  <Box className="flex flex-col justify-center">
                    <Text className="text-gray-400 text-base">
                      Số điện thoại:
                    </Text>
                    <Text className="text-lg font-medium">
                      {' '}
                      {currentUser?.phone}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </Box>

            {/* Button */}
            <VStack className="w-full border border-gray-300 rounded-2xl">
              <Pressable
                onPress={() => router.push(`/(rooms)/RoomManagement?type=room`)}
              >
                {({ pressed }) => (
                  <Box
                    className={`w-full p-4 flex flex-row items-center gap-1 justify-between border-b border-gray-300 ${
                      pressed && 'opacity-75'
                    }`}
                  >
                    <HStack className="items-center" space="xl">
                      <Image
                        source={require('@/assets/images/btn1.png')}
                        className="w-10 h-10"
                        resizeMode="cover"
                        alt="Quan ly bai dang cho thue phong"
                      />
                      <Text className="text-black text-lg font-medium">
                        Đăng tin cho thuê
                      </Text>
                    </HStack>

                    <AntDesign name="arrowright" size={24} color="black" />
                  </Box>
                )}
              </Pressable>
              <Pressable
                onPress={() => router.push('/(rooms)/RoomManagement?type=pair')}
              >
                {({ pressed }) => (
                  <Box
                    className={`w-full p-4 flex flex-row items-center gap-1 justify-between border-gray-300 ${
                      pressed && 'opacity-75'
                    }`}
                  >
                    <HStack className="items-center" space="xl">
                      <Image
                        source={require('@/assets/images/btn2.png')}
                        className="w-10 h-10"
                        resizeMode="cover"
                        alt="Quan ly bai dang o ghep"
                      />
                      <Text className="text-black text-lg font-medium">
                        Đăng tin ở ghép
                      </Text>
                    </HStack>

                    <AntDesign name="arrowright" size={24} color="black" />
                  </Box>
                )}
              </Pressable>
            </VStack>
            <Pressable onPress={LogOut}>
              {({ pressed }) => (
                <Box
                  className={`w-full p-4 flex flex-row items-center gap-4 
                 border border-gray-300 rounded-2xl ${pressed && 'opacity-75'}`}
                >
                  <AntDesign name="logout" size={24} color="black" />
                  <Text className="text-black text-xl font-bold">
                    Đăng xuất
                  </Text>
                </Box>
              )}
            </Pressable>
          </VStack>
          <EditProfileModal
            setShowEditModal={setShowModalEdit}
            showEditModal={showModalEdit}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

{
  /* <TouchableWithoutFeedback>
  <Button className="w-fit self-end mt-4" size="md" onPress={LogOut}>
    <ButtonText>Đăng xuất</ButtonText>
  </Button>
</TouchableWithoutFeedback>; */
}
