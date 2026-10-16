import { AppConfig, Environment, LogLevel } from '@core/types';

// In production, these would be replaced by build-time configuration
// For now, using a simple pattern that can be enhanced with react-native-config
const ENV: Record<string, string> = {
  APP_ENV: __DEV__ ? 'development' : 'production',
  API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.example.com',
  API_TIMEOUT: '30000',
  ENABLE_GOOGLE_LOGIN: 'true',
  ENABLE_APPLE_LOGIN: 'false',
  ENABLE_PASSKEY_LOGIN: 'false',
  ENABLE_ANALYTICS: 'true',
  ENABLE_ERROR_REPORTING: __DEV__ ? 'false' : 'true',
  LOG_LEVEL: __DEV__ ? 'debug' : 'error',
  ENABLE_API_LOGGING: __DEV__ ? 'true' : 'false',
  GOOGLE_CLIENT_ID: '161841997320-dkm327dd053rqh8msuvvch0tqaa6art3.apps.googleusercontent.com',
  GOOGLE_IOS_CLIENT_ID: '161841997320-dkm327dd053rqh8msuvvch0tqaa6art3.apps.googleusercontent.com',
  GOOGLE_ANDROID_CLIENT_ID: '161841997320-dkm327dd053rqh8msuvvch0tqaa6art3.apps.googleusercontent.com',
  APPLE_CLIENT_ID: '',
  PASSKEY_RP_ID: 'example.com',
  PASSKEY_RP_NAME: 'EnterpriseApp',
  ANALYTICS_ID: '',
  SENTRY_DSN: '',
};

const getString = (key: string, defaultValue: string): string => {
  return ENV[key] || defaultValue;
};

const getBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = ENV[key];
  if (value === 'true') return true;
  if (value === 'false') return false;
  return defaultValue;
};

const getNumber = (key: string, defaultValue: number): number => {
  const value = ENV[key];
  if (value) return parseInt(value, 10);
  return defaultValue;
};

const getEnvironment = (): Environment => {
  const env = getString('APP_ENV', 'development');
  const validEnvironments: Environment[] = ['development', 'staging', 'production', 'test'];
  if (validEnvironments.indexOf(env as Environment) !== -1) {
    return env as Environment;
  }
  return 'development';
};

const getLogLevel = (): LogLevel => {
  const level = getString('LOG_LEVEL', 'info');
  const validLogLevels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'silent'];
  if (validLogLevels.indexOf(level as LogLevel) !== -1) {
    return level as LogLevel;
  }
  return 'info';
};

export const config: AppConfig = {
  env: getEnvironment(),
  api: {
    baseUrl: getString('API_BASE_URL', 'https://api.example.com'),
    timeout: getNumber('API_TIMEOUT', 30000),
  },
  features: {
    enableGoogleLogin: getBoolean('ENABLE_GOOGLE_LOGIN', true),
    enableAppleLogin: getBoolean('ENABLE_APPLE_LOGIN', true),
    enablePasskeyLogin: getBoolean('ENABLE_PASSKEY_LOGIN', true),
    enableAnalytics: getBoolean('ENABLE_ANALYTICS', true),
    enableErrorReporting: getBoolean('ENABLE_ERROR_REPORTING', true),
  },
  logging: {
    level: getLogLevel(),
    enableApiLogging: getBoolean('ENABLE_API_LOGGING', false),
  },
  oauth: {
    google: {
      clientId: getString('GOOGLE_CLIENT_ID', ''),
      iosClientId: getString('GOOGLE_IOS_CLIENT_ID', ''),
      androidClientId: getString('GOOGLE_ANDROID_CLIENT_ID', ''),
    },
    apple: {
      clientId: getString('APPLE_CLIENT_ID', ''),
    },
  },
  passkey: {
    rpId: getString('PASSKEY_RP_ID', 'example.com'),
    rpName: getString('PASSKEY_RP_NAME', 'EnterpriseApp'),
  },
  analytics: {
    id: getString('ANALYTICS_ID', ''),
  },
  errorReporting: {
    dsn: getString('SENTRY_DSN', ''),
  },
};

export default config;
