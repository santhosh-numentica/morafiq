import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';
import { logger } from '@core/logging/logger';

export const handleError = (error: unknown, context?: string): AppError => {
  const appError = error instanceof AppError ? error : mapUnknownError(error);

  logger.error(appError.message, {
    code: appError.code,
    context,
    timestamp: appError.timestamp,
  });

  return appError;
};

const mapUnknownError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return new AppError(
      ErrorCode.UNKNOWN,
      'Something went wrong. Please try again.',
      error.message,
      undefined,
      error,
    );
  }

  return new AppError(
    ErrorCode.UNKNOWN,
    'Something went wrong. Please try again.',
    'Unknown error occurred',
    undefined,
    error,
  );
};

export const getUserMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.userMessage;
  }
  return 'Something went wrong. Please try again.';
};

export default { handleError, getUserMessage };
