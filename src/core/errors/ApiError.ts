import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export class ApiError extends AppError {
  constructor(
    userMessage: string,
    message?: string,
    statusCode?: number,
    originalError?: unknown,
  ) {
    const code = ApiError.getStatusCodeToErrorCode(statusCode);
    super(code, userMessage, message, statusCode, originalError);
  }

  private static getStatusCodeToErrorCode(statusCode?: number): ErrorCode {
    if (!statusCode) return ErrorCode.UNKNOWN;

    switch (statusCode) {
      case 400:
        return ErrorCode.VALIDATION_ERROR;
      case 401:
        return ErrorCode.UNAUTHORIZED;
      case 403:
        return ErrorCode.FORBIDDEN;
      case 404:
        return ErrorCode.NOT_FOUND;
      case 408:
        return ErrorCode.TIMEOUT;
      case 409:
        return ErrorCode.CONFLICT;
      case 422:
        return ErrorCode.VALIDATION_ERROR;
      case 429:
        return ErrorCode.RATE_LIMITED;
      case 500:
      case 502:
      case 503:
      case 504:
        return ErrorCode.SERVER_ERROR;
      default:
        return ErrorCode.UNKNOWN;
    }
  }
}

export default ApiError;
