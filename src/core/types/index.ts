export type Environment = 'development' | 'staging' | 'production' | 'test';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

export interface AppConfig {
  env: Environment;
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    enableGoogleLogin: boolean;
    enableAppleLogin: boolean;
    enablePasskeyLogin: boolean;
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
  };
  logging: {
    level: LogLevel;
    enableApiLogging: boolean;
  };
  oauth: {
    google: {
      clientId: string;
      iosClientId: string;
      androidClientId: string;
    };
    apple: {
      clientId: string;
    };
  };
  passkey: {
    rpId: string;
    rpName: string;
  };
  analytics: {
    id: string;
  };
  errorReporting: {
    dsn: string;
  };
}
