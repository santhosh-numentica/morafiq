export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },

  // OAuth
  OAUTH: {
    GOOGLE: '/auth/google',
    APPLE: '/auth/apple',
  },

  // Passkey
  PASSKEY: {
    REGISTER_OPTIONS: '/auth/passkey/register/options',
    REGISTER_VERIFY: '/auth/passkey/register/verify',
    LOGIN_OPTIONS: '/auth/passkey/login/options',
    LOGIN_VERIFY: '/auth/passkey/login/verify',
  },

  // Account Linking
  ACCOUNT: {
    LINK_PROVIDER: '/auth/providers/link',
    UNLINK_PROVIDER: (provider: string) => `/auth/providers/${provider}`,
  },

  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    DELETE_ACCOUNT: '/user/account',
  },

  // Settings
  SETTINGS: {
    GET: '/user/settings',
    UPDATE: '/user/settings',
  },
} as const;

export default API_ENDPOINTS;
