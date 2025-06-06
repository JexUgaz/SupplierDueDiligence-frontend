import type { ApiResponse } from "@/shared/types/api/ApiResponse";
import type { IApiConnection, IApiRequestParams } from "./IApiConnection";
import { AppException, UnknownException } from "@/shared/types/exceptions";
import { ToastHelper } from "@/shared/helpers";
import { AuthDispatcher } from "@/shared/helpers/AuthDispatcher";

export abstract class SupplierDueDiligenceApi implements IApiConnection {
  abstract apiBase: string;

  async request<T>({
    body,
    endpoint,
    method = "GET",
    headers = {},
    showSuccessMessage,
    queryParams,
  }: IApiRequestParams): Promise<T | null> {
    try {
      const queryString = queryParams
        ? "?" + new URLSearchParams(queryParams).toString()
        : "";

      const url = `http://localhost:5045/api${this.apiBase}${endpoint}${queryString}`;

      const allHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
      };

      const res = await fetch(url, {
        credentials: "include",
        method: method,
        headers: allHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const response = (await res.json()) as ApiResponse<T>;

      if (response.status === "ERROR") {
        const error = response.error!;
        throw new AppException(
          error.type,
          error.details,
          error.code,
          response.message
        );
      }

      if (showSuccessMessage) ToastHelper.success(response.message);
      return response.data!;
    } catch (e: unknown) {
      let error: AppException;
      let isUnauthorized = false;

      if (e instanceof AppException) {
        if (e.type === "UNAUTHORIZED") {
          AuthDispatcher.logout();
          isUnauthorized = true;
        }
        error = e;
      } else if (e instanceof Error) {
        error = new UnknownException(e.message);
      } else {
        error = new UnknownException("Unknown error");
      }

      if (!isUnauthorized) ToastHelper.error(error.message);
      return null;
    }
  }
}
