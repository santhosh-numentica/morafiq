import { AxiosError } from 'axios';
import { mapAxiosErrorToAppError } from '@core/errors';
import { logger } from '@core/logging/logger';
import { config } from '@app/config/environment';

export const errorInterceptor = async (error: AxiosError): Promise<never> => {
  const appError = mapAxiosErrorToAppError(error);

  if (config.logging.enableApiLogging) {
    logger.error('API request failed', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      code: appError.code,
    });
  }

  return Promise.reject(appError);
};

export default errorInterceptor;
