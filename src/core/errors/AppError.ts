import { ErrorCode } from './ErrorCode';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode?: number;
  public readonly userMessage: string;
  public readonly originalError?: unknown;
  public readonly timestamp: Date;

  constructor(
    code: ErrorCode,
    userMessage: string,
    message?: string,
    statusCode?: number,
    originalError?: unknown,
  ) {
    super(message || userMessage);
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.timestamp = new Date();
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      userMessage: this.userMessage,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

export default AppError;
