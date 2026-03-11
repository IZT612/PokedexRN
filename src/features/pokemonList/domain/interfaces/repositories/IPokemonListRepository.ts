import { PokemonListResponse } from '@/src/shared/data/api/PokemonListResponse';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';

export interface IPokemonListRepository {
  // Limit indicates the number of Pokemon to be fetched, and offset indicates the number of Pokemon to be skipped, so when we want
  // to fetch the next batch of 30 Pokemon, we can skip the ones we already have
  getPokemonList(limit: number, offset: number): Promise<PokemonListResponse>;
  getPokemonTypes(): Promise<PokemonType[]>;
}
