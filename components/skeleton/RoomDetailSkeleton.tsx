import React from 'react';
import { SafeAreaView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Skeleton, SkeletonText } from '../ui/skeleton';

const RoomDetailSkeleton = () => {
  return (
    <SafeAreaView className="flex h-full bg-white">
      <VStack space="md" className="p-4">
        <Skeleton variant="rounded" className="h-60" />
        <SkeletonText _lines={1} className="h-5 w-1/3" />
        <SkeletonText _lines={1} className="h-10" />
        <SkeletonText _lines={1} className="h-5 w-1/3" />
        <SkeletonText _lines={2} className="h-5" />
      </VStack>
    </SafeAreaView>
  );
};

export default RoomDetailSkeleton;
