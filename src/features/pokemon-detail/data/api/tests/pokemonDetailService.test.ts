import assert from "node:assert/strict";
import test from "node:test";

import { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { fetchPokemonDetail } from "../pokemonDetailService";

function createConfig(url: string): InternalAxiosRequestConfig {
  return {
    headers: {},
    method: "get",
    url,
  } as InternalAxiosRequestConfig;
}

function createPokemonDetailApiResponse() {
  return {
    id: 25,
    name: "pikachu",
    sprites: {
      front_default: "pikachu.png",
      other: {
        "official-artwork": {
          front_default: "pikachu-official.png",
        },
      },
    },
    types: [
      {
        slot: 1,
        type: {
          name: "electric",
        },
      },
    ],
    stats: [
      {
        base_stat: 35,
        stat: {
          name: "hp",
        },
      },
    ],
    abilities: [
      {
        is_hidden: false,
        ability: {
          name: "static",
        },
      },
    ],
    weight: 60,
    height: 4,
  };
}

test("fetchPokemonDetail resolves detail data through the shared API client", async () => {
  const response = await fetchPokemonDetail("pikachu", {
    requestConfig: {
      adapter: async (config) => {
        assert.equal(config.url, "/pokemon/pikachu");

        return {
          data: createPokemonDetailApiResponse(),
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      },
    },
  });

  assert.deepEqual(response, {
    id: 25,
    name: "pikachu",
    sprites: {
      official_artwork: "pikachu-official.png",
      front_default: "pikachu.png",
    },
    types: [
      {
        slot: 1,
        name: "electric",
      },
    ],
    stats: [
      {
        name: "hp",
        base_stat: 35,
      },
    ],
    abilities: [
      {
        name: "static",
        is_hidden: false,
      },
    ],
    weight: 60,
    height: 4,
  });
});

test("fetchPokemonDetail falls back to null when official artwork is missing", async () => {
  const response = await fetchPokemonDetail(25, {
    requestConfig: {
      adapter: async (config) => ({
        data: {
          ...createPokemonDetailApiResponse(),
          sprites: {
            front_default: "pikachu.png",
          },
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      }),
    },
  });

  assert.equal(response.sprites.official_artwork, null);
  assert.equal(response.sprites.front_default, "pikachu.png");
});

test("fetchPokemonDetail preserves normalized shared API client errors", async () => {
  await assert.rejects(
    () =>
      fetchPokemonDetail("pikachu", {
        requestConfig: {
          adapter: async () => {
            throw new AxiosError(
              "Request failed with status code 404",
              "ERR_BAD_REQUEST",
              createConfig("/pokemon/pikachu"),
              undefined,
              {
                data: { message: "not found" },
                status: 404,
                statusText: "404",
                headers: {},
                config: createConfig("/pokemon/pikachu"),
              },
            );
          },
        },
      }),
    (error) => {
      assert.deepEqual(error, {
        type: "api",
        message: "Request failed with status code 404",
        code: "ERR_BAD_REQUEST",
        status: 404,
        details: { message: "not found" },
      });
      assert.equal(Object.getPrototypeOf(error), Object.prototype);
      return true;
    },
  );
});
