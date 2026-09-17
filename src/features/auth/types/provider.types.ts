import { AuthCredential } from './auth.types';

export interface IAuthProvider {
  signIn(config?: unknown): Promise<AuthCredential>;
  signOut(): Promise<void>;
  isAvailable?(): Promise<boolean>;
}

export interface EmailAuthProviderConfig {
  email: string;
  password: string;
}

export interface GoogleAuthProviderConfig {
  idToken?: string;
  accessToken?: string;
}

export interface AppleAuthProviderConfig {
  identityToken?: string;
  authorizationCode?: string;
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

export interface PasskeyAuthProviderConfig {
  challenge: string;
  userVerification?: 'required' | 'preferred' | 'discouraged';
}
