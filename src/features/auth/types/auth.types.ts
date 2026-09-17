export type AuthStatus =
  | 'initializing'
  | 'authenticated'
  | 'unauthenticated'
  | 'refreshing'
  | 'error';

export type AuthProviderType = 'email' | 'google' | 'apple' | 'passkey';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  providers: AuthProviderType[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthCredential {
  provider: AuthProviderType;
  token?: string;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  authorizationCode?: string;
  user?: Partial<User>;
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  provider?: AuthProviderType;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
