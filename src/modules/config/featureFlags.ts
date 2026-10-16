import { config } from './environment';

export const featureFlags = {
  googleLogin: config.features.enableGoogleLogin,
  appleLogin: config.features.enableAppleLogin,
  passkeyLogin: config.features.enablePasskeyLogin,
  analytics: config.features.enableAnalytics,
  errorReporting: config.features.enableErrorReporting,
} as const;

export default featureFlags;
