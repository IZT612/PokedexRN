import { Pokemon } from '@/src/shared/domain/entities/Pokemon';

export interface IPokemonDetailRepository {
  getPokemonDetail(id: number): Promise<Pokemon>;
}
