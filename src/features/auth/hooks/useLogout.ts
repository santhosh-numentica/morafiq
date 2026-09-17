import { useAuth } from './useAuth';
import { useState } from 'react';

export const useLogout = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout: performLogout,
    isLoading,
    error,
  };
};

export default useLogout;
