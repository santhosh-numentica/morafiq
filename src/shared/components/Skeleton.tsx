import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  style,
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});

export default Skeleton;
