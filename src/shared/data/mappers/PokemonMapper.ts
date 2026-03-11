import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '../../domain/entities/PokemonType';
import { PokemonDetailResponse } from '../api/PokemonDetailResponse';

// List of valid Pokemon types based on the official ones
const VALID_TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
] as const;

// Function to check if the type is valid, if not (such as shadow and unknown, which are in the API for some reason)
// it returns "normal" as a default
const getSafePokemonType = (apiType: string): PokemonType => {
  if (VALID_TYPES.includes(apiType as any)) {
    return apiType as PokemonType;
  } else {
    console.warn(
      `Unknown pokemon type received from the API: "${apiType}". Using "normal" by default.`,
    );
    return 'normal';
  }
};

export const mapPokemonDetailToDomain = (
  response: PokemonDetailResponse,
): Pokemon => {
  return {
    id: response.id,
    name: response.name,
    image: response.sprites.other['official-artwork'].front_default,
    types: response.types.map((t) => getSafePokemonType(t.type.name)),
    stats: response.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    abilities: response.abilities.map((a) => a.ability.name),
  };
};
