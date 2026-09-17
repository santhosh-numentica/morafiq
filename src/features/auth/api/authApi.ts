import { apiClient, API_ENDPOINTS, ApiResponse } from '@core/api';
import { AuthResponse } from '@features/auth/types';
import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from '@features/auth/types';

export class AuthApi {
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return response.data;
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials,
    );
    return response.data;
  }

  public async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  public async refreshTokens(): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REFRESH,
    );
    return response.data;
  }

  public async forgotPassword(credentials: ForgotPasswordCredentials): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, credentials);
  }

  public async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, credentials);
  }

  public async getMe(): Promise<AuthResponse> {
    const response = await apiClient.get<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.ME,
    );
    return response.data;
  }

  public async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.OAUTH.GOOGLE,
      { idToken },
    );
    return response.data;
  }

  public async loginWithApple(identityToken: string, authorizationCode?: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.OAUTH.APPLE,
      { identityToken, authorizationCode },
    );
    return response.data;
  }

  public async linkProvider(provider: string, token: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.ACCOUNT.LINK_PROVIDER, { provider, token });
  }

  public async unlinkProvider(provider: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ACCOUNT.UNLINK_PROVIDER(provider));
  }
}

export const authApi = new AuthApi();

export default authApi;
