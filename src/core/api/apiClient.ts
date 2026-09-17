import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { config } from '@app/config/environment';
import { authInterceptor } from './interceptors/authInterceptor';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { loggingInterceptor } from './interceptors/loggingInterceptor';
import { refreshTokenInterceptor } from './interceptors/refreshTokenInterceptor';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime?: number;
      endTime?: number;
    };
  }
}

class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private refreshCallback?: () => Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt?: number;
  }>;

  private constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const startTime = Date.now();
        config.metadata = { startTime };
        return authInterceptor(config);
      },
      (error: unknown) => {
        return Promise.reject(error);
      },
    );

    if (config.logging.enableApiLogging) {
      this.client.interceptors.request.use(loggingInterceptor.request);
      this.client.interceptors.response.use(loggingInterceptor.response);
    }

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        const endTime = Date.now();
        if (response.config.metadata) {
          response.config.metadata = { ...response.config.metadata, endTime };
        }
        return response;
      },
      async (error: unknown) => {
        if (this.refreshCallback) {
          try {
            return await refreshTokenInterceptor(
              error as Parameters<typeof refreshTokenInterceptor>[0],
              this.refreshCallback,
              this.client,
            );
          } catch (refreshError) {
            return errorInterceptor(error as Parameters<typeof errorInterceptor>[0]);
          }
        }
        return errorInterceptor(error as Parameters<typeof errorInterceptor>[0]);
      },
    );
  }

  public setRefreshCallback(
    callback: () => Promise<{ accessToken: string; refreshToken: string; expiresAt?: number }>,
  ): void {
    this.refreshCallback = callback;
  }

  public get axiosInstance(): AxiosInstance {
    return this.client;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();

export default apiClient;
