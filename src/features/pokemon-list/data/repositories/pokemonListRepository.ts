import type { AxiosRequestConfig } from "axios";

import {
  DEFAULT_POKEMON_LIST_LIMIT,
  DEFAULT_POKEMON_LIST_OFFSET,
  fetchPokemonList as fetchPokemonListResponse,
  fetchPokemonTypes as fetchPokemonTypeResponses,
} from "../api";
import type { Pokemon } from "../../../../shared/data/entities/Pokemon";
import type { PokemonType } from "../../../../shared/data/entities/PokemonType";
import { fetchPokemon } from "../../../../shared/data/api";

export type FetchPokemonListOptions = {
  limit?: number;
  offset?: number;
  requestConfig?: AxiosRequestConfig;
};

export interface PokemonListRepositoryResult {
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export async function fetchPokemonList(
  options: FetchPokemonListOptions = {},
): Promise<PokemonListRepositoryResult> {
  const response = await fetchPokemonListResponse({
    limit: options.limit ?? DEFAULT_POKEMON_LIST_LIMIT,
    offset: options.offset ?? DEFAULT_POKEMON_LIST_OFFSET,
    requestConfig: options.requestConfig,
  });

  const results = await Promise.all(
    response.results.map((pokemon) =>
      fetchPokemon(pokemon.url, {
        requestConfig: options.requestConfig,
      }),
    ),
  );

  return {
    count: response.count,
    limit: response.limit,
    offset: response.offset,
    next: response.next,
    previous: response.previous,
    results,
  };
}

export async function fetchPokemonTypes(
  requestConfig?: AxiosRequestConfig,
): Promise<PokemonType[]> {
  return fetchPokemonTypeResponses(requestConfig);
}
