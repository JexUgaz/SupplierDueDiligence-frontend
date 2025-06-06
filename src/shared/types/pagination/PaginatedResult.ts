import type { PaginationMetadata } from "./PaginationMetadata";

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMetadata;
}
