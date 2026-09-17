export const StorageKeys = {
  // Authentication
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  SESSION_EXPIRY: 'session_expiry',

  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboarding_completed',

  // Cache
  CACHE_PREFIX: 'cache_',
} as const;

export default StorageKeys;
