import { Pokemon } from '@/src/shared/domain/entities/Pokemon';

export interface IPokemonRepository {
  getPokemonDetail(id: number): Promise<Pokemon>;
}
