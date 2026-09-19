import { IAuthProvider, AuthCredential } from '@features/auth/types';
import { AuthProviderType } from '@features/auth/types';
import { config } from '@app/config/environment';
import { featureFlags } from '@app/config/featureFlags';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export class GoogleAuthProvider implements IAuthProvider {
  constructor() {
    this.configure();
  }

  private configure() {
    if (featureFlags.googleLogin && config.oauth.google.clientId) {
      GoogleSignin.configure({
        webClientId: config.oauth.google.clientId,
        offlineAccess: true,
      });
    }
  }

  public async signIn(): Promise<AuthCredential> {
    if (!featureFlags.googleLogin) {
      throw new Error('Google login is not enabled');
    }

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      return {
        provider: 'google' as AuthProviderType,
        idToken: (userInfo as any).idToken || undefined,
        user: {
          email: (userInfo as any).user?.email || '',
        },
      };
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google sign-in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services not available');
      }
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google sign-out error:', error);
    }
  }

  public async isAvailable(): Promise<boolean> {
    return featureFlags.googleLogin && !!config.oauth.google.clientId;
  }
}

export default GoogleAuthProvider;
