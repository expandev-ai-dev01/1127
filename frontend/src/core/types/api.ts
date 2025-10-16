/**
 * @type ApiResponse
 * @summary Standard API response wrapper
 * @domain core
 * @category api
 */
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

/**
 * @type ApiError
 * @summary Standard API error response
 * @domain core
 * @category api
 */
export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};
