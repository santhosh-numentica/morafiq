import { create } from 'zustand';
import { AuthState, User, AuthStatus, AuthProviderType } from '@features/auth/types';
import { authService } from '@features/auth/services/authService';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  setProvider: (provider: AuthProviderType) => void;
  setError: (error: string | undefined) => void;
  initialize: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken?: string, accessToken?: string) => Promise<void>;
  loginWithApple: (
    identityToken?: string,
    authorizationCode?: string,
    user?: { email?: string; name?: { firstName?: string; lastName?: string } },
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: 'initializing',
  user: null,
  isAuthenticated: false,
  provider: undefined,
  error: undefined,

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  setStatus: (status: AuthStatus) => {
    set({ status });
  },

  setProvider: (provider: AuthProviderType) => {
    set({ provider });
  },

  setError: (error: string | undefined) => {
    set({ error });
  },

  initialize: async () => {
    try {
      set({ status: 'initializing' });
      const response = await authService.restoreSession();
      if (response) {
        set({
          user: response.user,
          isAuthenticated: true,
          status: 'authenticated',
          error: undefined,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          status: 'unauthenticated',
          error: undefined,
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        status: 'unauthenticated',
        error: 'Failed to restore session',
      });
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      set({ status: 'refreshing', error: undefined });
      const response = await authService.signInWithEmail({ email, password });
      set({
        user: response.user,
        isAuthenticated: true,
        status: 'authenticated',
        provider: 'email',
        error: undefined,
      });
    } catch (error) {
      set({
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  },

  loginWithGoogle: async (idToken?: string, accessToken?: string) => {
    try {
      set({ status: 'refreshing', error: undefined });
      const response = await authService.signInWithGoogle(idToken, accessToken);
      set({
        user: response.user,
        isAuthenticated: true,
        status: 'authenticated',
        provider: 'google',
        error: undefined,
      });
    } catch (error) {
      set({
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Google login failed',
      });
      throw error;
    }
  },

  loginWithApple: async (
    identityToken?: string,
    authorizationCode?: string,
    user?: { email?: string; name?: { firstName?: string; lastName?: string } },
  ) => {
    try {
      set({ status: 'refreshing', error: undefined });
      const response = await authService.signInWithApple(identityToken, authorizationCode, user);
      set({
        user: response.user,
        isAuthenticated: true,
        status: 'authenticated',
        provider: 'apple',
        error: undefined,
      });
    } catch (error) {
      set({
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Apple login failed',
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ status: 'refreshing' });
      await authService.signOut();
      set({
        user: null,
        isAuthenticated: false,
        status: 'unauthenticated',
        provider: undefined,
        error: undefined,
      });
    } catch (error) {
      set({
        status: 'error',
        error: error instanceof Error ? error.message : 'Logout failed',
      });
      throw error;
    }
  },

  refreshSession: async () => {
    try {
      set({ status: 'refreshing' });
      const response = await authService.refreshSession();
      await authService.restoreSession();
      set({
        user: response.user,
        isAuthenticated: true,
        status: 'authenticated',
        error: undefined,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Session refresh failed',
      });
      throw error;
    }
  },
}));
