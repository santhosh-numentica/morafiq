import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';

export interface EmptyStateProps {
  title: string;
  message?: string;
  image?: ImageSourcePropType;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  image,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionLabel && onAction && (
        <Text style={styles.action} onPress={onAction}>
          {actionLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  action: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default EmptyState;
