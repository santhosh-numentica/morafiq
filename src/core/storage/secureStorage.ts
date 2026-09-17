import * as SecureStore from 'expo-secure-store/build/SecureStore';
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
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      logger.error('Secure storage set error', { key, error });
      return false;
    }
  }

  public async getItem(key: string): Promise<string | null> {
    try {
      const result = await SecureStore.getItemAsync(key);
      return result;
    } catch (error) {
      logger.error('Secure storage get error', { key, error });
      return null;
    }
  }

  public async removeItem(key: string): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      logger.error('Secure storage remove error', { key, error });
      return false;
    }
  }

  public async clear(): Promise<void> {
    try {
      // expo-secure-store doesn't have a clear all method, so we'd need to track keys
      // For now, this is a no-op
      logger.info('Secure storage clear called (no-op for expo-secure-store)');
    } catch (error) {
      logger.error('Secure storage clear error', { error });
    }
  }
}

export const secureStorage = SecureStorageService.getInstance();

export default secureStorage;
