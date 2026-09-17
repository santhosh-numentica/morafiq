import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class ValidationError extends AppError {
  constructor(message?: string, originalError?: unknown) {
    super(
      ErrorCode.VALIDATION_ERROR,
      'Please check your input and try again.',
      message,
      422,
      originalError,
    );
  }
}

export default ValidationError;
