export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  requestId?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
