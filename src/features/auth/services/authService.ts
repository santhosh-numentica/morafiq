import { authApi } from '@features/auth/api';
import { tokenManager } from '@core/security';
import { storage } from '@core/storage';
import { StorageKeys } from '@core/storage/storageKeys';
import { logger } from '@core/logging/logger';
import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
  AuthResponse,
  AuthCredential,
  AuthProviderType,
} from '@features/auth/types';
import { EmailAuthProvider, GoogleAuthProvider, AppleAuthProvider, PasskeyAuthProvider } from '@features/auth/providers';

export class AuthService {
  private emailProvider = new EmailAuthProvider();
  private googleProvider = new GoogleAuthProvider();
  private appleProvider = new AppleAuthProvider();
  private passkeyProvider = new PasskeyAuthProvider();

  public async signInWithEmail(credentials: LoginCredentials): Promise<AuthResponse> {
    const credential = await this.emailProvider.signIn(credentials);
    return this.authenticateWithCredential(credential, credentials);
  }

  public async signInWithGoogle(token?: string): Promise<AuthResponse> {
    const credential = await this.googleProvider.signIn(token);
    return this.authenticateWithCredential(credential);
  }

  public async signInWithApple(
    identityToken?: string,
    authorizationCode?: string,
    user?: { email?: string; name?: { firstName?: string; lastName?: string } },
  ): Promise<AuthResponse> {
    const credential = await this.appleProvider.signIn({ identityToken, authorizationCode, user });
    return this.authenticateWithCredential(credential);
  }

  public async signInWithPasskey(challenge: string): Promise<AuthResponse> {
    const credential = await this.passkeyProvider.signIn({ challenge });
    return this.authenticateWithCredential(credential);
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await authApi.register(credentials);
    await this.saveSession(response);
    return response;
  }

  public async signOut(): Promise<void> {
    try {
      await authApi.logout();
    } catch (error) {
      logger.warn('Logout API call failed', { error });
    } finally {
      await this.clearSession();
    }
  }

  public async forgotPassword(credentials: ForgotPasswordCredentials): Promise<void> {
    await authApi.forgotPassword(credentials);
  }

  public async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    await authApi.resetPassword(credentials);
  }

  public async restoreSession(): Promise<AuthResponse | null> {
    try {
      const accessToken = await tokenManager.getAccessToken();
      if (!accessToken) {
        return null;
      }

      const shouldRefresh = await tokenManager.shouldRefreshToken();
      if (shouldRefresh) {
        return await this.refreshSession();
      }

      const response = await authApi.getMe();
      await this.saveSession(response);
      return response;
    } catch (error) {
      logger.error('Session restoration failed', { error });
      await this.clearSession();
      return null;
    }
  }

  public async refreshSession(): Promise<AuthResponse> {
    const response = await authApi.refreshTokens();
    await this.saveSession(response);
    return response;
  }

  public async linkProvider(provider: AuthProviderType, token: string): Promise<void> {
    await authApi.linkProvider(provider, token);
  }

  public async unlinkProvider(provider: AuthProviderType): Promise<void> {
    await authApi.unlinkProvider(provider);
  }

  private async authenticateWithCredential(
    credential: AuthCredential,
    credentials?: LoginCredentials,
  ): Promise<AuthResponse> {
    let response: AuthResponse;

    switch (credential.provider) {
      case 'email':
        if (!credentials) {
          throw new Error('Email and password are required');
        }
        response = await authApi.login(credentials);
        break;
      case 'google':
        if (!credential.idToken) {
          throw new Error('Google ID token is required');
        }
        response = await authApi.loginWithGoogle(credential.idToken);
        break;
      case 'apple':
        if (!credential.idToken) {
          throw new Error('Apple identity token is required');
        }
        response = await authApi.loginWithApple(credential.idToken, credential.authorizationCode);
        break;
      case 'passkey':
        // Passkey authentication would be handled by the backend
        throw new Error('Passkey authentication not yet implemented');
      default:
        throw new Error('Unknown authentication provider');
    }

    await this.saveSession(response);
    return response;
  }

  private async saveSession(response: AuthResponse): Promise<void> {
    await tokenManager.setTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: response.expiresAt,
    });
    await storage.setItem(StorageKeys.USER_ID, response.user.id);
    logger.info('Session saved successfully');
  }

  private async clearSession(): Promise<void> {
    await tokenManager.clearTokens();
    await storage.removeItem(StorageKeys.USER_ID);
    await storage.removeItem(StorageKeys.ONBOARDING_COMPLETED);
    logger.info('Session cleared successfully');
  }

  public async isProviderAvailable(provider: AuthProviderType): Promise<boolean> {
    switch (provider) {
      case 'email':
        return await this.emailProvider.isAvailable();
      case 'google':
        return await this.googleProvider.isAvailable();
      case 'apple':
        return await this.appleProvider.isAvailable();
      case 'passkey':
        return await this.passkeyProvider.isAvailable();
      default:
        return false;
    }
  }
}

export const authService = new AuthService();

export default authService;
