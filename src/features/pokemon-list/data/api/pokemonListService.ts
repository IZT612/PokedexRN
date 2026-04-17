import type { AxiosRequestConfig } from "axios";

import type { PokemonListResponse } from "../entities/PokemonListResponse";
import type { Pokemon } from "../../../../shared/data/entities/Pokemon";
import type { PokemonType } from "../../../../shared/data/entities/PokemonType";
import { apiClient } from "../../../../shared/data/api/client";

type PokemonListApiResult = {
  name: string;
  url: string;
};

type PokemonListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListApiResult[];
};

type PokemonTypesApiResponse = {
  results: Array<{
    name: string;
  }>;
};

type PokemonDetailApiResponse = Pokemon;

export type FetchPokemonListOptions = {
  limit?: number;
  offset?: number;
  requestConfig?: AxiosRequestConfig;
};

export type PokemonTypeOption = Pick<PokemonType, "name">;

function normalizePokemon(pokemon: PokemonDetailApiResponse): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: pokemon.sprites,
    types: pokemon.types,
    stats: pokemon.stats,
    abilities: pokemon.abilities,
    weight: pokemon.weight,
    height: pokemon.height,
  };
}

export async function fetchPokemonList(
  options: FetchPokemonListOptions = {},
): Promise<PokemonListResponse> {
  const { limit, offset, requestConfig } = options;
  const response = await apiClient.get<PokemonListApiResponse>("/pokemon", {
    ...requestConfig,
    params: {
      ...requestConfig?.params,
      ...(limit !== undefined ? { limit } : {}),
      ...(offset !== undefined ? { offset } : {}),
    },
  });

  const results = await Promise.all(
    response.data.results.map(async (pokemon) => {
      const detailResponse = await apiClient.get<PokemonDetailApiResponse>(
        pokemon.url,
        {
          ...requestConfig,
        },
      );

      return normalizePokemon(detailResponse.data);
    }),
  );

  return {
    count: response.data.count,
    next: response.data.next,
    previous: response.data.previous,
    results,
  };
}

export async function fetchPokemonTypes(
  requestConfig?: AxiosRequestConfig,
): Promise<PokemonTypeOption[]> {
  const response = await apiClient.get<PokemonTypesApiResponse>(
    "/type",
    requestConfig,
  );

  return response.data.results.map((type) => ({
    name: type.name,
  }));
}
