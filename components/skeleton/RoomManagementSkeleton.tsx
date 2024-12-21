import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { Skeleton, SkeletonText } from '../ui/skeleton';
import { Divider } from '../ui/divider';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';

const RoomManagementSkeleton = () => {
  return (
    <>
      <Card variant="outline" className={`m-3 p-0 rounded-xl overflow-hidden`}>
        <Skeleton variant="sharp" className="h-40" />
        <VStack space="md" className="p-4">
          <SkeletonText _lines={1} className="h-5" />
          <VStack space="md" className="w-1/3">
            <SkeletonText _lines={1} className="h-5" />
            <SkeletonText _lines={1} className="h-5" />
          </VStack>
          <SkeletonText _lines={1} className="h-5" />
        </VStack>
      </Card>
      <Card variant="outline" className={`m-3 p-0 rounded-xl overflow-hidden`}>
        <Skeleton variant="sharp" className="h-40" />
        <VStack space="md" className="p-4">
          <SkeletonText _lines={1} className="h-5" />
          <VStack space="md" className="w-1/3">
            <SkeletonText _lines={1} className="h-5" />
            <SkeletonText _lines={1} className="h-5" />
          </VStack>
          <SkeletonText _lines={1} className="h-5" />
        </VStack>
      </Card>
    </>
  );
};

export default RoomManagementSkeleton;
