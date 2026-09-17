import { InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '@core/security/tokenManager';
import { logger } from '@core/logging';

export const authInterceptor = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  try {
    const token = await tokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    logger.error('Auth interceptor error', { error });
  }
  return config;
};

export default authInterceptor;
