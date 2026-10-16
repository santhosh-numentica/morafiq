import { authService } from '@features/auth/services';

export const bootstrapApp = async (): Promise<void> => {
  try {
    // Initialize any services that need setup
    console.log('Bootstrapping application...');

    // Restore auth session
    await authService.restoreSession();

    console.log('Application bootstrapped successfully');
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    throw error;
  }
};

export default bootstrapApp;
