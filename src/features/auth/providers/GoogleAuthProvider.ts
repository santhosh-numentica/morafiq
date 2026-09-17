import { IAuthProvider, GoogleAuthProviderConfig, AuthCredential } from '@features/auth/types';
import { AuthProviderType } from '@features/auth/types';
import { config } from '@app/config/environment';
import { featureFlags } from '@app/config/featureFlags';

export class GoogleAuthProvider implements IAuthProvider {
  public async signIn(config?: GoogleAuthProviderConfig): Promise<AuthCredential> {
    if (!featureFlags.googleLogin) {
      throw new Error('Google login is not enabled');
    }

    if (!config?.idToken && !config?.accessToken) {
      throw new Error('Google credentials are required');
    }

    return {
      provider: 'google' as AuthProviderType,
      idToken: config.idToken,
      accessToken: config.accessToken,
    };
  }

  public async signOut(): Promise<void> {
    // Google Sign-In SDK handles signOut
  }

  public async isAvailable(): Promise<boolean> {
    return featureFlags.googleLogin && !!config.oauth.google.clientId;
  }
}

export default GoogleAuthProvider;
