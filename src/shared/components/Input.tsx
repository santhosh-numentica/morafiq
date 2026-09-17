import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error ? styles.inputError : undefined, inputStyle].filter(Boolean)}
        placeholderTextColor="#9E9E9E"
        {...textInputProps}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#F44336',
  },
  error: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});

export default Input;
