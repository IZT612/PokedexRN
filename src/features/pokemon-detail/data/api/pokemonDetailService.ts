import type { AxiosRequestConfig } from "axios";

import type { PokemonDetailResponse } from "../entities/PokemonDetailResponse";
import { apiClient } from "../../../../shared/data/api/client";

type PokemonDetailApiResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    is_hidden: boolean;
    ability: {
      name: string;
    };
  }>;
  weight: number;
  height: number;
};

export type FetchPokemonDetailOptions = {
  requestConfig?: AxiosRequestConfig;
};

function normalizePokemonDetail(
  pokemon: PokemonDetailApiResponse,
): PokemonDetailResponse {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: {
      official_artwork:
        pokemon.sprites.other?.["official-artwork"]?.front_default ?? null,
      front_default: pokemon.sprites.front_default,
    },
    types: pokemon.types.map((type) => ({
      slot: type.slot,
      name: type.type.name,
    })),
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
    abilities: pokemon.abilities.map((ability) => ({
      name: ability.ability.name,
      is_hidden: ability.is_hidden,
    })),
    weight: pokemon.weight,
    height: pokemon.height,
  };
}

export async function fetchPokemonDetail(
  identifier: number | string,
  options: FetchPokemonDetailOptions = {},
): Promise<PokemonDetailResponse> {
  const response = await apiClient.get<PokemonDetailApiResponse>(
    `/pokemon/${identifier}`,
    options.requestConfig,
  );

  return normalizePokemonDetail(response.data);
}
