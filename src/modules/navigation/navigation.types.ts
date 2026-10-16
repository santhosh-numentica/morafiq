import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  AccountRecovery: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
  Notifications: undefined;
};

export type NavigationProp<T extends ParamListBase> = NativeStackNavigationProp<T>;
