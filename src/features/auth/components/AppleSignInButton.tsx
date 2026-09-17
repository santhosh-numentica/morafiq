import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface AppleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const AppleSignInButton: React.FC<AppleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.button, (disabled || isLoading) && styles.buttonDisabled]}
    >
 <Text style={styles.icon}></Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default AppleSignInButton;
