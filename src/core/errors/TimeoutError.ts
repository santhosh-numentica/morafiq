import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class TimeoutError extends AppError {
  constructor(message?: string, originalError?: unknown) {
    super(
      ErrorCode.TIMEOUT,
      'Request timed out. Please try again.',
      message,
      408,
      originalError,
    );
  }
}

export default TimeoutError;
