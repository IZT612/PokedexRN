import type { AxiosRequestConfig } from "axios";

import type { Pokemon } from "../entities/Pokemon";
import { apiClient } from "./client";

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

export type FetchPokemonOptions = {
  requestConfig?: AxiosRequestConfig;
};

export function normalizePokemonDetailResponse(
  pokemon: PokemonDetailApiResponse,
): Pokemon {
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

export async function fetchPokemon(
  identifierOrUrl: number | string,
  options: FetchPokemonOptions = {},
): Promise<Pokemon> {
  const path =
    typeof identifierOrUrl === "string" && /^https?:\/\//.test(identifierOrUrl)
      ? identifierOrUrl
      : `/pokemon/${identifierOrUrl}`;

  const response = await apiClient.get<PokemonDetailApiResponse>(
    path,
    options.requestConfig,
  );

  return normalizePokemonDetailResponse(response.data);
}
