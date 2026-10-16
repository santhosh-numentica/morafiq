import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigation.types';
import { LoginScreen } from '@features/auth';
import { RegisterScreen } from '@features/auth';
import { ForgotPasswordScreen } from '@features/auth';
import { AccountRecoveryScreen } from '@features/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="AccountRecovery" component={AccountRecoveryScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
