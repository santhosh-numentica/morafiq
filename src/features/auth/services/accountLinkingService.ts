import { authService } from '@features/auth/services/authService';
import { AuthProviderType } from '@features/auth/types';
import { logger } from '@core/logging/logger';

export class AccountLinkingService {
  private static instance: AccountLinkingService;

  private constructor() {}

  public static getInstance(): AccountLinkingService {
    if (!AccountLinkingService.instance) {
      AccountLinkingService.instance = new AccountLinkingService();
    }
    return AccountLinkingService.instance;
  }

  public async linkProvider(provider: AuthProviderType, token: string): Promise<void> {
    try {
      await authService.linkProvider(provider, token);
      logger.info('Provider linked successfully', { provider });
    } catch (error) {
      logger.error('Failed to link provider', { provider, error });
      throw error;
    }
  }

  public async unlinkProvider(provider: AuthProviderType): Promise<void> {
    try {
      await authService.unlinkProvider(provider);
      logger.info('Provider unlinked successfully', { provider });
    } catch (error) {
      logger.error('Failed to unlink provider', { provider, error });
      throw error;
    }
  }

  public async canLinkProvider(provider: AuthProviderType): Promise<boolean> {
    // Check if the provider is available and not already linked
    const isAvailable = await authService.isProviderAvailable(provider);
    return isAvailable;
  }
}

export const accountLinkingService = AccountLinkingService.getInstance();

export default accountLinkingService;
