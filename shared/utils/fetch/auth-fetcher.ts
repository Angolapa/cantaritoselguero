import { API_BASE_URL } from "@/shared/constants";
import { ApiError } from "@/shared/types";
import { tokenManager } from "@/shared/utils/storage";

const TIMEOUT_MS = 30_000;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function parseErrorResponse(
  response: Response
): Promise<ApiError> {
  try {
    const body = await response.json();
    return {
      statusCode: response.status,
      message:
        body.message ?? body.error ?? response.statusText,
      error: body.error,
    };
  } catch {
    return {
      statusCode: response.status,
      message: response.statusText,
    };
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      tokenManager.clearTokens();
      return false;
    }

    const data = await response.json();
    tokenManager.setTokens(
      data.accessToken,
      data.refreshToken
    );
    return true;
  } catch {
    tokenManager.clearTokens();
    return false;
  }
}

export async function authFetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = TIMEOUT_MS, ...fetchOptions } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const isFormData = fetchOptions.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  if (
    fetchOptions.headers &&
    typeof fetchOptions.headers === "object" &&
    !(fetchOptions.headers instanceof Headers)
  ) {
    Object.assign(
      headers,
      fetchOptions.headers as Record<string, string>
    );
  }

  const accessToken = tokenManager.getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    timeout
  );

  try {
    let response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (response.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        const newToken = tokenManager.getAccessToken();
        if (newToken) {
          headers["Authorization"] = `Bearer ${newToken}`;
        }
        response = await fetch(url, {
          ...fetchOptions,
          headers,
          signal: controller.signal,
        });
      } else {
        const error: ApiError = {
          statusCode: 401,
          message: "Session expired. Please login again.",
        };
        throw error;
      }
    }

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      const timeoutError: ApiError = {
        statusCode: 408,
        message: "Request timed out",
      };
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = TIMEOUT_MS, ...fetchOptions } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const isFormData = fetchOptions.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  if (
    fetchOptions.headers &&
    typeof fetchOptions.headers === "object" &&
    !(fetchOptions.headers instanceof Headers)
  ) {
    Object.assign(
      headers,
      fetchOptions.headers as Record<string, string>
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    timeout
  );

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      const timeoutError: ApiError = {
        statusCode: 408,
        message: "Request timed out",
      };
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
