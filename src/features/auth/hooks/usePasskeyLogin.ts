import { useState } from 'react';

export const usePasskeyLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (_challenge: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // Passkey login would be implemented here
      // For now, we'll use a placeholder
      throw new Error('Passkey login not yet implemented');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Passkey login failed');
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

export default usePasskeyLogin;
