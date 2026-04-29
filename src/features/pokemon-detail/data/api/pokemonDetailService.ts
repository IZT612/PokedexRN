import type { AxiosRequestConfig } from "axios";

import type { PokemonDetailResponse } from "../entities/PokemonDetailResponse";
import { fetchPokemon as fetchSharedPokemon } from "../../../../shared/data/api";

export type FetchPokemonDetailOptions = {
  requestConfig?: AxiosRequestConfig;
};

export async function fetchPokemonDetail(
  identifier: number | string,
  options: FetchPokemonDetailOptions = {},
): Promise<PokemonDetailResponse> {
  return fetchSharedPokemon(identifier, {
    requestConfig: options.requestConfig,
  });
}
