import { AxiosError, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { tokenManager } from '@core/security/tokenManager';
import { logger } from '@core/logging';
import { ErrorCode } from '@core/errors';

export const refreshTokenInterceptor = async (
  error: AxiosError,
  refreshCallback: () => Promise<{ accessToken: string; refreshToken: string; expiresAt?: number }>,
  axiosInstance: AxiosInstance,
): Promise<unknown> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const existingPromise = tokenManager.getRefreshPromise();
      if (existingPromise) {
        await existingPromise;
        const newToken = await tokenManager.getAccessToken();
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axiosInstance.request(originalRequest);
      }

      const refreshPromise = refreshCallback();
      tokenManager.setRefreshPromise(refreshPromise);

      const tokens = await refreshPromise;

      if (tokens) {
        await tokenManager.setTokens(tokens);
        const newToken = await tokenManager.getAccessToken();
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        tokenManager.clearRefreshPromise();
        return axiosInstance.request(originalRequest);
      }

      tokenManager.clearRefreshPromise();
      throw new Error('Token refresh failed');
    } catch (refreshError) {
      tokenManager.clearRefreshPromise();
      logger.error('Token refresh failed', { error: refreshError });
      await tokenManager.clearTokens();
      throw new Error(ErrorCode.SESSION_EXPIRED);
    }
  }

  return Promise.reject(error);
};

export default refreshTokenInterceptor;
