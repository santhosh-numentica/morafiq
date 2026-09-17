import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface GitHubLogoProps {
  width?: number;
  height?: number;
}

export const GitHubLogo: React.FC<GitHubLogoProps> = ({
  width = 28,
  height = 28,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={[styles.logo, { fontSize: width * 0.7 }]}>🐙</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#24292E',
  },
});

export default GitHubLogo;
