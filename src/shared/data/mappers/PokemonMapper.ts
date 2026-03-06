import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '../../domain/entities/PokemonType';
import { PokemonDetailResponse } from '../api/PokemonDetailResponse';

export const mapPokemonDetailToDomain = (
  response: PokemonDetailResponse,
): Pokemon => {
  return {
    id: response.id,
    name: response.name,
    image: response.sprites.other['official-artwork'].front_default,
    types: response.types.map((t) => t.type.name as PokemonType),
    stats: response.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    abilities: response.abilities.map((a) => a.ability.name),
  };
};
