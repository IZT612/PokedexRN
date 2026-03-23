import { Pokemon } from '@/src/shared/domain/entities/Pokemon';

export interface IPokemonRepository {
  // Limit indicates the number of Pokemon to be fetched, and offset indicates the number of Pokemon to be skipped, so when we want
  // to fetch the next batch of 30 Pokemon, we can skip the ones we already have
  getPokemonList(limit?: number, offset?: number): Promise<Pokemon[]>;
  getPokemonDetails(nameOrId: string | number): Promise<Pokemon>;
  getPokemonTypes(): Promise<string[]>;
}
