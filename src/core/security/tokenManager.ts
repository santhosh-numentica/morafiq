import { secureStorage } from '@core/storage/secureStorage';
import { StorageKeys } from '@core/storage/storageKeys';
import { logger } from '@core/logging/logger';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
}

export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<TokenPair | null> | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public async setTokens(tokens: TokenPair): Promise<void> {
    try {
      await Promise.all([
        secureStorage.setItem(StorageKeys.ACCESS_TOKEN, tokens.accessToken),
        secureStorage.setItem(StorageKeys.REFRESH_TOKEN, tokens.refreshToken),
      ]);

      if (tokens.expiresAt) {
        await secureStorage.setItem(
          StorageKeys.SESSION_EXPIRY,
          tokens.expiresAt.toString(),
        );
      }

      logger.info('Tokens stored successfully');
    } catch (error) {
      logger.error('Failed to store tokens', { error });
      throw error;
    }
  }

  public async getAccessToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(StorageKeys.ACCESS_TOKEN);
    } catch (error) {
      logger.error('Failed to get access token', { error });
      return null;
    }
  }

  public async getRefreshToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(StorageKeys.REFRESH_TOKEN);
    } catch (error) {
      logger.error('Failed to get refresh token', { error });
      return null;
    }
  }

  public async getSessionExpiry(): Promise<number | null> {
    try {
      const expiry = await secureStorage.getItem(StorageKeys.SESSION_EXPIRY);
      return expiry ? parseInt(expiry, 10) : null;
    } catch (error) {
      logger.error('Failed to get session expiry', { error });
      return null;
    }
  }

  public async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        secureStorage.removeItem(StorageKeys.ACCESS_TOKEN),
        secureStorage.removeItem(StorageKeys.REFRESH_TOKEN),
        secureStorage.removeItem(StorageKeys.SESSION_EXPIRY),
      ]);
      logger.info('Tokens cleared successfully');
    } catch (error) {
      logger.error('Failed to clear tokens', { error });
      throw error;
    }
  }

  public async isTokenExpired(): Promise<boolean> {
    const expiresAt = await this.getSessionExpiry();
    if (!expiresAt) return false;
    return Date.now() >= expiresAt;
  }

  public async shouldRefreshToken(): Promise<boolean> {
    const expiresAt = await this.getSessionExpiry();
    if (!expiresAt) return false;

    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry

    return timeUntilExpiry <= refreshThreshold;
  }

  public setRefreshPromise(promise: Promise<TokenPair | null>): void {
    this.refreshPromise = promise;
  }

  public getRefreshPromise(): Promise<TokenPair | null> | null {
    return this.refreshPromise;
  }

  public clearRefreshPromise(): void {
    this.refreshPromise = null;
  }
}

export const tokenManager = TokenManager.getInstance();

export default tokenManager;
