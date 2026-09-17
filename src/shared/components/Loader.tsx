import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = '#2196F3',
  text,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#757575',
  },
});

export default Loader;
