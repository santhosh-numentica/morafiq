import { AxiosError } from 'axios';
import { ApiError } from './ApiError';
import { NetworkError } from './NetworkError';
import { TimeoutError } from './TimeoutError';
import { AppError } from './AppError';
import { ErrorCode } from './ErrorCode';

export const mapAxiosErrorToAppError = (error: unknown): AppError => {
  if (!(error instanceof AxiosError)) {
    if (error instanceof AppError) {
      return error;
    }
    return new AppError(
      ErrorCode.UNKNOWN,
      'Something went wrong. Please try again.',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }

  const axiosError = error as AxiosError;

  // Network errors (no response)
  if (!axiosError.response) {
    if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
      return new TimeoutError(axiosError.message, axiosError);
    }
    if (axiosError.code === 'ERR_NETWORK') {
      return new NetworkError(axiosError.message, axiosError);
    }
    return new NetworkError(axiosError.message, axiosError);
  }

  // Server responded with error
  const statusCode = axiosError.response.status;
  const responseData = axiosError.response.data as { message?: string; error?: string } | undefined;
  const errorMessage = responseData?.message || responseData?.error || axiosError.message;

  return new ApiError(
    getErrorMessageForStatusCode(statusCode),
    errorMessage,
    statusCode,
    axiosError,
  );
};

const getErrorMessageForStatusCode = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 408:
      return 'Request timed out. Please try again.';
    case 409:
      return 'This resource already exists.';
    case 422:
      return 'Please check your input and try again.';
    case 429:
      return 'Too many requests. Please wait and try again.';
    case 500:
      return 'Something went wrong. Please try again.';
    case 502:
      return 'Service unavailable. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    case 504:
      return 'Gateway timeout. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export default mapAxiosErrorToAppError;
