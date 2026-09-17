import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface GoogleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
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
 <Text style={styles.iconG}>G</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  iconG: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
  },
});

export default GoogleSignInButton;
