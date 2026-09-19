import { useAuth } from './useAuth';
import { useState } from 'react';

export const useGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Native Google Signin will handle the OAuth flow
      // The auth context will receive the token from GoogleAuthProvider
      await loginWithGoogle();
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
