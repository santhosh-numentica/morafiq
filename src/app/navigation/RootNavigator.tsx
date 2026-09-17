import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@features/auth';
import { navigationRef } from './navigationRef';
import { RootStackParamList } from './navigation.types';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { status, isAuthenticated, initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {status === 'initializing' ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : isAuthenticated ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SplashScreen: React.FC = () => {
  return null; // Splash screen would be implemented here
};

export default RootNavigator;
