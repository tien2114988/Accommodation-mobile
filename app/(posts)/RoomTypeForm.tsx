import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { selectPostForm, setPostForm } from '@/store/reducers';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { convenients, interiors, roomTypes } from '@/constants/room';
import { stringToArray } from '@/utils/stringUtil';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

const RoomTypeForm = () => {
  const [roomType, setRoomType] = useState<string>(roomTypes[0]);
  const [utilities, setUtilities] = useState<string>('');
  const [interior, setInterior] = useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();
  let postForm = useSelector(selectPostForm);

  console.log(postForm);

  const handleCont = () => {
    if (
      postForm?.name &&
      postForm.address &&
      postForm.price &&
      postForm.area &&
      postForm.capacity &&
      postForm.floor
    ) {
      dispatch(setPostForm({ ...postForm, interior, roomType, utilities }));
      router.push('/(posts)/DescriptionForm');
    }
  };

  const handleChooseConvenient = (convenient: string) => {
    const convenientArray = utilities.split(',');

    let updatedUtilities = '';

    if (convenientArray.includes(convenient)) {
      updatedUtilities = convenientArray
        .filter(type => type !== convenient)
        .join(',');
    } else {
      updatedUtilities = utilities ? `${utilities},${convenient}` : convenient;
    }

    setUtilities(updatedUtilities);
  };

  const handleChooseInterior = (int: string) => {
    const interiorArray = interior.split(',');

    let updatedInteriors = '';

    if (interiorArray.includes(int)) {
      updatedInteriors = interiorArray.filter(type => type !== int).join(',');
    } else {
      updatedInteriors = interior ? `${interior},${int}` : int;
    }

    setInterior(updatedInteriors);
  };

  return (
    <SafeAreaView className="flex h-full">
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            <Card size="md" variant="elevated">
              <Heading className="mb-4">Loại phòng</Heading>
              <Box className="flex flex-row flex-wrap">
                {roomTypes.map((type, index) => (
                  <Box key={index} className="w-1/2 p-2">
                    <Pressable
                      onPress={() => setRoomType(type)}
                      className={`border rounded-lg p-3 ${
                        roomType === type
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          roomType === type
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {type}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </Card>
            <Card size="md" variant="elevated">
              <Heading className="mb-4">Tiện nghi</Heading>
              <Box className="flex flex-row flex-wrap">
                {convenients.map((convenient, index) => (
                  <Box key={index} className="w-1/2 p-2">
                    <Pressable
                      onPress={() => handleChooseConvenient(convenient)}
                      className={`border rounded-lg p-3 ${
                        stringToArray(utilities).includes(convenient)
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          stringToArray(utilities).includes(convenient)
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {convenient}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </Card>
            <Card size="md" variant="elevated">
              <Heading className="mb-4">Loại phòng</Heading>
              <Box className="flex flex-row flex-wrap">
                {interiors.map((int, index) => (
                  <Box key={index} className="w-1/2 p-2">
                    <Pressable
                      onPress={() => handleChooseInterior(int)}
                      className={`border rounded-lg p-3 ${
                        stringToArray(interior).includes(int)
                          ? 'border-info-600'
                          : 'border-secondary-400 bg-white'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          stringToArray(interior).includes(int)
                            ? 'text-info-600'
                            : 'text-secondary-400'
                        }`}
                      >
                        {int}
                      </Text>
                    </Pressable>
                  </Box>
                ))}
              </Box>
            </Card>
          </VStack>
        </Box>
      </ScrollView>
      <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
        <Button
          onPress={handleCont}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center"
          action="positive"
        >
          <ButtonText className="text-center">Tiếp theo</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default RoomTypeForm;
