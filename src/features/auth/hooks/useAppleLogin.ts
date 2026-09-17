import { useAuth } from './useAuth';
import { useState } from 'react';

export const useAppleLogin = () => {
  const { loginWithApple } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    identityToken?: string,
    authorizationCode?: string,
    user?: { email?: string; name?: { firstName?: string; lastName?: string } },
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithApple(identityToken, authorizationCode, user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Apple login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};

export default useAppleLogin;
