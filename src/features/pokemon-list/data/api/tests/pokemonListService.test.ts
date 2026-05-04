import assert from "node:assert/strict";
import test from "node:test";

import { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { fetchPokemonList, fetchPokemonTypes } from "../pokemonListService";

const bulbasaurUrl = "https://pokeapi.co/api/v2/pokemon/1/";
const ivysaurUrl = "https://pokeapi.co/api/v2/pokemon/2/";

function createConfig(url: string): InternalAxiosRequestConfig {
  return {
    headers: {},
    method: "get",
    url,
  } as InternalAxiosRequestConfig;
}

test("fetchPokemonList resolves list data through the shared API client", async () => {
  const response = await fetchPokemonList({
    limit: 2,
    offset: 0,
    requestConfig: {
      adapter: async (config) => {
        if (config.url !== "/pokemon") {
          throw new Error(`Unexpected request: ${config.url}`);
        }

        assert.deepEqual(config.params, { limit: 2, offset: 0 });

        return {
          data: {
            count: 1302,
            next: "https://pokeapi.co/api/v2/pokemon?offset=2&limit=2",
            previous: null,
            results: [
              { name: "bulbasaur", url: bulbasaurUrl },
              { name: "ivysaur", url: ivysaurUrl },
            ],
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      },
    },
  });

  assert.equal(response.count, 1302);
  assert.equal(response.limit, 2);
  assert.equal(response.offset, 0);
  assert.equal(response.results.length, 2);
  assert.deepEqual(response.results[0], {
    name: "bulbasaur",
    url: bulbasaurUrl,
  });
  assert.deepEqual(response.results[1], {
    name: "ivysaur",
    url: ivysaurUrl,
  });
});

test("fetchPokemonTypes resolves type data through the shared API client", async () => {
  const response = await fetchPokemonTypes({
    adapter: async (config) => ({
      data: {
        results: [{ name: "grass" }, { name: "poison" }],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    }),
  });

  assert.deepEqual(response, [{ name: "grass" }, { name: "poison" }]);
});

test("fetchPokemonList preserves normalized shared API client errors", async () => {
  await assert.rejects(
    () =>
      fetchPokemonList({
        requestConfig: {
          adapter: async () => {
            throw new AxiosError("timeout of 10000ms exceeded", "ECONNABORTED");
          },
        },
      }),
    (error) => {
      assert.deepEqual(error, {
        type: "timeout",
        message: "Request timed out after 10000ms",
        code: "ECONNABORTED",
      });
      assert.equal(Object.getPrototypeOf(error), Object.prototype);
      return true;
    },
  );
});

test("fetchPokemonTypes preserves normalized shared API client errors", async () => {
  await assert.rejects(
    () =>
      fetchPokemonTypes({
        adapter: async () => {
          throw new AxiosError(
            "Request failed with status code 500",
            "ERR_BAD_RESPONSE",
            createConfig("/type"),
            undefined,
            {
              data: { message: "server error" },
              status: 500,
              statusText: "500",
              headers: {},
              config: createConfig("/type"),
            },
          );
        },
      }),
    (error) => {
      assert.deepEqual(error, {
        type: "api",
        message: "Request failed with status code 500",
        code: "ERR_BAD_RESPONSE",
        status: 500,
        details: { message: "server error" },
      });
      assert.equal(Object.getPrototypeOf(error), Object.prototype);
      return true;
    },
  );
});
