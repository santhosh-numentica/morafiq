import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string, type?: 'error' | 'success' | 'info') => void;
  hideToast: () => void;
  toast: { message: string; type: 'error' | 'success' | 'info' } | null;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return React.createElement(
    ToastContext.Provider,
    { value: { showToast, hideToast, toast } },
    children
  );
};
