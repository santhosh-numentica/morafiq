import { tokenManager } from '@core/security';
import { storage } from '@core/storage';
import { StorageKeys } from '@core/storage/storageKeys';
import { Session } from '@features/auth/types';
import { logger } from '@core/logging/logger';

export class SessionService {
  private static instance: SessionService;

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  public async createSession(
    userId: string,
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
    provider: string,
  ): Promise<Session> {
    const session: Session = {
      userId,
      accessToken,
      refreshToken,
      expiresAt,
      provider,
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };

    await storage.setItem(StorageKeys.USER_ID, userId);
    logger.info('Session created', { userId, provider });
    return session;
  }

  public async getSession(): Promise<Session | null> {
    try {
      const userId = await storage.getItem(StorageKeys.USER_ID);
      if (!userId) {
        return null;
      }

      const accessToken = await tokenManager.getAccessToken();
      const refreshToken = await tokenManager.getRefreshToken();
      const expiresAt = await tokenManager.getSessionExpiry();

      if (!accessToken || !refreshToken || !expiresAt) {
        return null;
      }

      return {
        userId,
        accessToken,
        refreshToken,
        expiresAt,
        provider: 'unknown',
        createdAt: Date.now(),
        lastActivity: Date.now(),
      };
    } catch (error) {
      logger.error('Failed to get session', { error });
      return null;
    }
  }

  public async updateLastActivity(): Promise<void> {
    const session = await this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      logger.debug('Session activity updated');
    }
  }

  public async isSessionValid(): Promise<boolean> {
    const session = await this.getSession();
    if (!session) {
      return false;
    }

    const isExpired = await tokenManager.isTokenExpired();
    return !isExpired;
  }

  public async destroySession(): Promise<void> {
    await tokenManager.clearTokens();
    await storage.removeItem(StorageKeys.USER_ID);
    logger.info('Session destroyed');
  }
}

export const sessionService = SessionService.getInstance();

export default sessionService;
