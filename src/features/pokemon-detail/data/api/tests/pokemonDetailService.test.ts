import assert from "node:assert/strict";
import test from "node:test";

import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { apiClient } from "../../../../../shared/data/api/client";
import { fetchPokemonDetail } from "../pokemonDetailService";

function createConfig(url: string): InternalAxiosRequestConfig {
  return {
    headers: {},
    method: "get",
    url,
  } as InternalAxiosRequestConfig;
}

function createResponse(
  data: unknown,
  url: string,
  status = 200,
): AxiosResponse {
  return {
    data,
    status,
    statusText: String(status),
    headers: {},
    config: createConfig(url),
  };
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

test("fetchPokemonDetail resolves detail data through mocked API client calls", async (t) => {
  const getMock = t.mock.method(apiClient, "get", async (url) => {
    assert.equal(url, "/pokemon/pikachu");

    return createResponse(createPokemonDetailApiResponse(), "/pokemon/pikachu");
  });

  const response = await fetchPokemonDetail("pikachu");

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

  assert.equal(getMock.mock.callCount(), 1);
});

test("fetchPokemonDetail falls back to null when official artwork is missing", async (t) => {
  t.mock.method(apiClient, "get", async (url) =>
    createResponse(
      {
        ...createPokemonDetailApiResponse(),
        sprites: {
          front_default: "pikachu.png",
        },
      },
      String(url),
    ),
  );

  const response = await fetchPokemonDetail(25);

  assert.equal(response.sprites.official_artwork, null);
  assert.equal(response.sprites.front_default, "pikachu.png");
});

test("fetchPokemonDetail preserves normalized shared API client errors", async (t) => {
  const normalizedError = {
    type: "api",
    message: "Request failed with status code 404",
    code: "ERR_BAD_REQUEST",
    status: 404,
    details: { message: "not found" },
  };

  t.mock.method(apiClient, "get", async (url) => {
    assert.equal(url, "/pokemon/pikachu");
    throw normalizedError;
  });

  await assert.rejects(
    () => fetchPokemonDetail("pikachu"),
    (error) => {
      assert.deepEqual(error, normalizedError);
      assert.equal(Object.getPrototypeOf(error), Object.prototype);
      return true;
    },
  );
});
