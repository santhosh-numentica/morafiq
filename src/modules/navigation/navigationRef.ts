import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = {
  current: null as NavigationContainerRef<Record<string, object | undefined>> | null,
};

export const navigate = (name: string, params?: object) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name as any, params as any);
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
};

export const reset = (name: string, params?: object) => {
  if (navigationRef.current) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [{ name: name as any, params: params as any }],
    });
  }
};

export default navigationRef;
