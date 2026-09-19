import * as Keychain from 'react-native-keychain';
import { logger } from '@core/logging/logger';

export class SecureStorageService {
  private static instance: SecureStorageService;

  private constructor() {}

  public static getInstance(): SecureStorageService {
    if (!SecureStorageService.instance) {
      SecureStorageService.instance = new SecureStorageService();
    }
    return SecureStorageService.instance;
  }

  public async setItem(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value, { service: key });
      return true;
    } catch (error) {
      logger.error('Secure storage set error', { key, error });
      return false;
    }
  }

  public async getItem(key: string): Promise<string | null> {
    try {
      const result = await Keychain.getGenericPassword({ service: key });
      if (result) {
        return result.password;
      }
      return null;
    } catch (error) {
      logger.error('Secure storage get error', { key, error });
      return null;
    }
  }

  public async removeItem(key: string): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({ service: key });
      return true;
    } catch (error) {
      logger.error('Secure storage remove error', { key, error });
      return false;
    }
  }

  public async clear(): Promise<void> {
    try {
      // react-native-keychain doesn't have a clear all method
      // For now, this is a no-op
      logger.info('Secure storage clear called (no-op for keychain)');
    } catch (error) {
      logger.error('Secure storage clear error', { error });
    }
  }
}

export const secureStorage = SecureStorageService.getInstance();

export default secureStorage;
