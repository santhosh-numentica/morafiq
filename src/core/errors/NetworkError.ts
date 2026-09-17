import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class NetworkError extends AppError {
  constructor(message?: string, originalError?: unknown) {
    super(
      ErrorCode.NETWORK_ERROR,
      'Unable to connect. Please check your internet connection.',
      message,
      undefined,
      originalError,
    );
  }
}

export default NetworkError;
