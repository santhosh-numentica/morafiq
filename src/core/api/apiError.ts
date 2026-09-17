export class ApiRequestError extends Error {
  public readonly statusCode?: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode?: number,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export default ApiRequestError;
