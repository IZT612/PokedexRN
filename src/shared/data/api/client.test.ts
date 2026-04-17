import assert from 'node:assert/strict';
import test from 'node:test';

import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import {
  API_BASE_URL,
  API_TIMEOUT_MS,
  apiClient,
  normalizeApiClientError,
} from './client';

function createResponse(status: number, data: unknown): AxiosResponse {
  return {
    data,
    status,
    statusText: String(status),
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
}

test('api client uses the expected base URL and timeout', () => {
  assert.equal(apiClient.defaults.baseURL, API_BASE_URL);
  assert.equal(apiClient.defaults.timeout, API_TIMEOUT_MS);
});

test('api client resolves successful requests', async () => {
  const response = await apiClient.request({
    url: '/pokemon',
    method: 'GET',
    adapter: async config => ({
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }),
  });

  assert.deepEqual(response.data, { ok: true });
});

test('api client normalizes timeout failures to plain objects', async () => {
  await assert.rejects(
    () =>
      apiClient.request({
        url: '/pokemon',
        method: 'GET',
        adapter: async () => {
          throw new AxiosError('timeout of 10000ms exceeded', 'ECONNABORTED');
        },
      }),
    error => {
      assert.deepEqual(error, {
        type: 'timeout',
        message: 'Request timed out after 10000ms',
        code: 'ECONNABORTED',
      });
      assert.equal(Object.getPrototypeOf(error), Object.prototype);
      return true;
    },
  );
});

test('normalizeApiClientError maps network failures to plain typed objects', () => {
  const error = normalizeApiClientError(
    new AxiosError('Network Error', 'ERR_NETWORK', undefined, {}),
  );

  assert.deepEqual(error, {
    type: 'network',
    message: 'Network Error',
    code: 'ERR_NETWORK',
  });
  assert.equal(Object.getPrototypeOf(error), Object.prototype);
});

test('normalizeApiClientError maps API failures to plain typed objects', () => {
  const error = normalizeApiClientError(
    new AxiosError(
      'Request failed with status code 500',
      'ERR_BAD_RESPONSE',
      undefined,
      undefined,
      createResponse(500, { message: 'server error' }),
    ),
  );

  assert.deepEqual(error, {
    type: 'api',
    message: 'Request failed with status code 500',
    code: 'ERR_BAD_RESPONSE',
    status: 500,
    details: { message: 'server error' },
  });
  assert.equal(Object.getPrototypeOf(error), Object.prototype);
});
