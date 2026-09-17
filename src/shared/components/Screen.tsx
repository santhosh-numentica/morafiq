import { useTheme } from '@app/providers';
import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  statusBarStyle?: StatusBarStyle;
  backgroundColor?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  statusBarStyle = 'dark-content',
  backgroundColor,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: backgroundColor || theme.colors.background },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
