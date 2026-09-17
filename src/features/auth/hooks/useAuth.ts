import { useAuthStore } from '@features/auth/store/authStore';

export const useAuth = () => {
  const {
    status,
    user,
    isAuthenticated,
    provider,
    error,
    initialize,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    logout,
    refreshSession,
  } = useAuthStore();

  const isLoading = status === 'initializing' || status === 'refreshing';
  const isError = status === 'error';

  return {
    status,
    user,
    isAuthenticated,
    provider,
    error,
    isLoading,
    isError,
    initialize,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    logout,
    refreshSession,
  };
};

export default useAuth;
