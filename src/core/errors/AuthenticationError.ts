import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class AuthenticationError extends AppError {
  constructor(message?: string, originalError?: unknown) {
    super(
      ErrorCode.AUTHENTICATION_FAILED,
      'Authentication failed. Please check your credentials.',
      message,
      401,
      originalError,
    );
  }
}

export default AuthenticationError;
