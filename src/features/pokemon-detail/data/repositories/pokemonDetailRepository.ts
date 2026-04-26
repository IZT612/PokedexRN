import type { AxiosRequestConfig } from "axios";

import { fetchPokemonDetail as fetchPokemonDetailResponse } from "../api";
import type { Pokemon } from "../../../../shared/data/entities/Pokemon";

export type FetchPokemonDetailOptions = {
  requestConfig?: AxiosRequestConfig;
};

function normalizePokemon(
  pokemon: Awaited<ReturnType<typeof fetchPokemonDetailResponse>>,
): Pokemon {
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

export async function fetchPokemonDetail(
  identifier: number | string,
  options: FetchPokemonDetailOptions = {},
): Promise<Pokemon> {
  const response = await fetchPokemonDetailResponse(identifier, {
    requestConfig: options.requestConfig,
  });

  return normalizePokemon(response);
}
