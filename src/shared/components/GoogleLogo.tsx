import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface GoogleLogoProps {
  width?: number;
  height?: number;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({
  width = 28,
  height = 28,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={[styles.logo, { fontSize: width * 0.8 }]}>G</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
});

export default GoogleLogo;
