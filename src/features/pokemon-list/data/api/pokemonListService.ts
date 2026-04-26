import type { AxiosRequestConfig } from "axios";

import type { PokemonListResponse } from "../entities/PokemonListResponse";
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

export const DEFAULT_POKEMON_LIST_LIMIT = 30;
export const DEFAULT_POKEMON_LIST_OFFSET = 0;

export type FetchPokemonListOptions = {
  limit?: number;
  offset?: number;
  requestConfig?: AxiosRequestConfig;
};

export async function fetchPokemonList(
  options: FetchPokemonListOptions = {},
): Promise<PokemonListResponse> {
  const { limit, offset, requestConfig } = options;
  const resolvedLimit = limit ?? DEFAULT_POKEMON_LIST_LIMIT;
  const resolvedOffset = offset ?? DEFAULT_POKEMON_LIST_OFFSET;
  const response = await apiClient.get<PokemonListApiResponse>("/pokemon", {
    ...requestConfig,
    params: {
      ...requestConfig?.params,
      limit: resolvedLimit,
      offset: resolvedOffset,
    },
  });

  return {
    count: response.data.count,
    limit: resolvedLimit,
    offset: resolvedOffset,
    next: response.data.next,
    previous: response.data.previous,
    results: response.data.results,
  };
}

export async function fetchPokemonTypes(
  requestConfig?: AxiosRequestConfig,
): Promise<PokemonType[]> {
  const response = await apiClient.get<PokemonTypesApiResponse>(
    "/type",
    requestConfig,
  );

  return response.data.results.map((type) => ({
    name: type.name,
  }));
}
