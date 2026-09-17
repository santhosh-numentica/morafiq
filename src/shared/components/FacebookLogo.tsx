import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface FacebookLogoProps {
  width?: number;
  height?: number;
}

export const FacebookLogo: React.FC<FacebookLogoProps> = ({
  width = 28,
  height = 28,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={[styles.logo, { fontSize: width * 0.7 }]}>f</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#1877F2',
    fontWeight: 'bold',
  },
});

export default FacebookLogo;
