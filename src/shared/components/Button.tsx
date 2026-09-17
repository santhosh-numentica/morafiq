import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'orange' | 'darkBlue';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  ...pressableProps
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    (disabled || isLoading) && styles.disabled,
    style,
  ];

  const textStyleProp = [
    styles.text,
    styles[`${variant}Text` as const],
    styles[`${size}Text` as const],
    textStyle,
  ];

  return (
    <Pressable
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...pressableProps}
    >
      {isLoading ? (
        <Text style={textStyleProp}>Loading...</Text>
      ) : (
        <Text style={textStyleProp}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2196F3',
  },
  secondary: {
    backgroundColor: '#757575',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  orange: {
    backgroundColor: '#FF6B00',
  },
  darkBlue: {
    backgroundColor: '#1565C0',
  },
  sm: {
    minHeight: 36,
    paddingHorizontal: 16,
  },
  md: {
    minHeight: 44,
    paddingHorizontal: 24,
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#2196F3',
  },
  ghostText: {
    color: '#2196F3',
  },
  orangeText: {
    color: '#FFFFFF',
  },
  darkBlueText: {
    color: '#FFFFFF',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});

export default Button;
