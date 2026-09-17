import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface PasskeyButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isAvailable?: boolean;
}

export const PasskeyButton: React.FC<PasskeyButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
  isAvailable = true,
}) => {
  if (!isAvailable) {
    return (
      <View style={[styles.button, styles.buttonDisabled]}>
        <Text style={styles.unavailableText}>Passkeys aren't available on this device</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.button, (disabled || isLoading) && styles.buttonDisabled]}
    >
 <Text style={styles.icon}>🔑</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    fontSize: 24,
  },
  unavailableText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PasskeyButton;
