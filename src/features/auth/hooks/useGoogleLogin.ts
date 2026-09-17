import { useAuth } from './useAuth';
import { useState } from 'react';

export const useGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (idToken?: string, accessToken?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithGoogle(idToken, accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
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

export default useGoogleLogin;
