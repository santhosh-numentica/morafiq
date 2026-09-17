import { IAuthProvider, AppleAuthProviderConfig, AuthCredential } from '@features/auth/types';
import { AuthProviderType } from '@features/auth/types';
import { config } from '@app/config/environment';
import { featureFlags } from '@app/config/featureFlags';

export class AppleAuthProvider implements IAuthProvider {
  public async signIn(config?: AppleAuthProviderConfig): Promise<AuthCredential> {
    if (!featureFlags.appleLogin) {
      throw new Error('Apple login is not enabled');
    }

    if (!config?.identityToken) {
      throw new Error('Apple identity token is required');
    }

    return {
      provider: 'apple' as AuthProviderType,
      idToken: config.identityToken,
      authorizationCode: config.authorizationCode,
      user: config.user
        ? {
            email: config.user.email,
            displayName: config.user.name
              ? `${config.user.name.firstName || ''} ${config.user.name.lastName || ''}`.trim()
              : undefined,
          }
        : undefined,
    };
  }

  public async signOut(): Promise<void> {
    // Apple Sign-In handles signOut
  }

  public async isAvailable(): Promise<boolean> {
    return featureFlags.appleLogin && !!config.oauth.apple.clientId;
  }
}

export default AppleAuthProvider;
