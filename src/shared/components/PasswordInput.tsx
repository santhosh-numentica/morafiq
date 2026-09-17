import React, { useState } from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle, Text } from 'react-native';
import { Input, InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'secureTextEntry'> {
  containerStyle?: StyleProp<ViewStyle>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  containerStyle,
  ...inputProps
}) => {
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecure = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Input
        {...inputProps}
        secureTextEntry={isSecure}
        containerStyle={styles.inputContainer}
      />
      <Pressable onPress={toggleSecure} style={styles.toggleButton}>
        <Text style={styles.toggleText}>{isSecure ? 'Show' : 'Hide'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputContainer: {
    marginBottom: 0,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 38,
  },
  toggleText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default PasswordInput;
