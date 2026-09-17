import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { logger } from '@core/logging';
import { sanitizeForLogging } from '@core/security';
import { config } from '@app/config/environment';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    logging?: {
      skip?: boolean;
      enabled?: boolean;
    };
  }
}

const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const loggingInterceptor = {
  request: async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    if (!config.logging?.skip && config.logging?.enabled !== false) {
      const requestId = generateRequestId();
      config.headers = config.headers || {};
      config.headers['X-Request-ID'] = requestId;

      if (config.logging?.enabled || config.logging?.enabled === undefined) {
        logger.debug('API request', {
          requestId,
          url: config.url,
          method: config.method?.toUpperCase(),
          headers: sanitizeForLogging(config.headers),
          data: config.data ? sanitizeForLogging(config.data) : undefined,
        });
      }
    }
    return config;
  },

  response: async (response: AxiosResponse): Promise<AxiosResponse> => {
    if (config.logging.enableApiLogging) {
      const requestId = response.config.headers?.['X-Request-ID'] as string;
      const duration =
        response.config.metadata?.endTime && response.config.metadata?.startTime
          ? response.config.metadata.endTime - response.config.metadata.startTime
          : undefined;

      logger.debug('API response', {
        requestId,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        status: response.status,
        duration,
      });
    }
    return response;
  },
};

export default loggingInterceptor;
