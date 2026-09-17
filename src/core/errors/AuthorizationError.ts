import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class AuthorizationError extends AppError {
  constructor(message?: string, originalError?: unknown) {
    super(
      ErrorCode.FORBIDDEN,
      'You do not have permission to perform this action.',
      message,
      403,
      originalError,
    );
  }
}

export default AuthorizationError;
