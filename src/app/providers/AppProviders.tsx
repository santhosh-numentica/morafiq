import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from '@shared/hooks/useToast';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
