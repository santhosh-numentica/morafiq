import '@testing-library/jest-native/extend-expect';

// Mock native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
  },
}));

// Mock Keychain
jest.mock('react-native-keychain', () => ({
  default: {
    setGenericPassword: jest.fn(),
    getGenericPassword: jest.fn(),
    resetGenericPassword: jest.fn(),
  },
}));

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  default: {
    fetch: jest.fn(),
    addEventListener: jest.fn(),
  },
}));
