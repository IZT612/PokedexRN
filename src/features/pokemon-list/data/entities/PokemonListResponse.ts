import type { Pokemon } from '../../../../shared/data/entities/Pokemon';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
