export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: { page: number; pageSize: number; total: number };
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
