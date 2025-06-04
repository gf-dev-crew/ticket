// API 응답의 표준화된 에러 형식
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

// API 응답의 표준화된 형식
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}
