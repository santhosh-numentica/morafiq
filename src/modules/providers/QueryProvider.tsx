import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from '@core/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Set up token refresh callback for API client
apiClient.setRefreshCallback(async () => {
  const response = await queryClient.fetchQuery({
    queryKey: ['auth', 'refresh'],
    queryFn: async () => {
      // This would call the refresh endpoint
      // For now, we'll return a placeholder
      return {
        accessToken: 'placeholder',
        refreshToken: 'placeholder',
        expiresAt: Date.now() + 3600000,
      };
    },
  });
  return response;
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
