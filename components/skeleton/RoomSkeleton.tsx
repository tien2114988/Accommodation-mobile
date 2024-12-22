import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { Skeleton, SkeletonText } from '../ui/skeleton';
import { Divider } from '../ui/divider';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';

const RoomSkeleton = () => {
  return (
    <VStack>
      <Box className="mx-3">
        <Divider />
      </Box>
      <HStack
        space="2xl"
        className="flex flex-row justify-between w-full items-center p-4"
      >
        <Skeleton variant="rounded" className="w-5/12" />
        <SkeletonText _lines={4} className="h-5 w-6/12" />
      </HStack>
      <Box className="mx-3">
        <Divider />
      </Box>
      <HStack
        space="2xl"
        className="flex flex-row justify-between w-full items-center p-4"
      >
        <Skeleton variant="rounded" className="w-5/12" />
        <SkeletonText _lines={4} className="h-5 w-6/12" />
      </HStack>
    </VStack>
  );
};

export default RoomSkeleton;
