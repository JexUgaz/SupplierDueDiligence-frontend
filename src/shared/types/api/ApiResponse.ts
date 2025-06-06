import type { ApiError } from "./ApiError";

export interface ApiResponse<T> {
  message: string;
  status: "SUCCESS" | "ERROR";
  data?: T | null;
  error?: ApiError | null;
}
