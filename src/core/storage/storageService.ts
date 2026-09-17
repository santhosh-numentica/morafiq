import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '@core/logging/logger';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      logger.error('Storage set error', { key, error });
      throw error;
    }
  }

  public async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      logger.error('Storage get error', { key, error });
      return null;
    }
  }

  public async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logger.error('Storage remove error', { key, error });
      throw error;
    }
  }

  public async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      logger.info('Storage cleared');
    } catch (error) {
      logger.error('Storage clear error', { error });
      throw error;
    }
  }

  public async getAllKeys(): Promise<string[]> {
    try {
      return [...(await AsyncStorage.getAllKeys())];
    } catch (error) {
      logger.error('Storage getAllKeys error', { error });
      return [];
    }
  }

  public async multiGet(keys: string[]): Promise<Array<[string, string | null]>> {
    try {
      return (await AsyncStorage.multiGet(keys)).map(([key, value]) => [key, value]);
    } catch (error) {
      logger.error('Storage multiGet error', { keys, error });
      return keys.map(key => [key, null]);
    }
  }

  public async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      logger.error('Storage multiSet error', { error });
      throw error;
    }
  }

  public async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      logger.error('Storage multiRemove error', { keys, error });
      throw error;
    }
  }
}

export const storage = StorageService.getInstance();

export default storage;
