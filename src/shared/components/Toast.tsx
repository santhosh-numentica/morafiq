import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { useToast } from '@shared/hooks/useToast';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useToast();
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(-50));

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [toast]);

  if (!toast) return null;

  const backgroundColor = toast.type === 'error' ? '#F44336' : toast.type === 'success' ? '#4CAF50' : '#2196F3';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor,
        },
      ]}
    >
      <Text style={styles.message}>{toast.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Toast;
