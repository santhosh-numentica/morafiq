import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

export interface MorafiqLogoProps {
  width?: number;
  height?: number;
  style?: ImageStyle;
}

export const MorafiqLogo: React.FC<MorafiqLogoProps> = ({
  width = 200,
  height = 60,
  style,
}) => {
  return (
    <Image
      source={require('../../../assets/morafiq-logo.png')}
      style={[styles.logo, { width, height }, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});

export default MorafiqLogo;
