import axios, { type AxiosError } from 'axios';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const API_TIMEOUT_MS = 10000;

export type ApiClientErrorType = 'timeout' | 'network' | 'api' | 'unknown';

export type ApiClientError = {
  type: ApiClientErrorType;
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
};

function getFallbackMessage(error: AxiosError | Error | undefined, fallback: string) {
  return error?.message || fallback;
}

export function normalizeApiClientError(error: unknown): ApiClientError {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return {
        type: 'timeout',
        message: `Request timed out after ${API_TIMEOUT_MS}ms`,
        code: error.code,
      };
    }

    if (error.response) {
      return {
        type: 'api',
        message: getFallbackMessage(error, 'API request failed'),
        code: error.code,
        status: error.response.status,
        details: error.response.data,
      };
    }

    if (error.request) {
      return {
        type: 'network',
        message: getFallbackMessage(error, 'Network request failed'),
        code: error.code,
      };
    }

    return {
      type: 'unknown',
      message: getFallbackMessage(error, 'Unexpected request error'),
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      type: 'unknown',
      message: error.message,
      details: error,
    };
  }

  return {
    type: 'unknown',
    message: 'Unexpected request error',
    details: error,
  };
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

apiClient.interceptors.response.use(
  response => response,
  (error: unknown) => Promise.reject(normalizeApiClientError(error)),
);
