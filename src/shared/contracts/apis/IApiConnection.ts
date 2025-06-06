export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IApiRequestParams {
  showSuccessMessage?: boolean;
  endpoint: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

export interface IApiConnection {
  apiBase: string;
  request<T>(params: IApiRequestParams): Promise<T | null>;
}
