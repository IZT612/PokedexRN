import apiClient from '@/src/shared/data/api/client';
import { mapPokemonDetailToDomain } from '@/src/shared/data/mappers/PokemonMapper';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { IPokemonDetailRepository } from '../../domain/interfaces/repositories/IPokemonDetailRepository';

export class PokemonDetailRepository implements IPokemonDetailRepository {
  async getPokemonDetail(id: number): Promise<Pokemon> {
    try {
      const response = await apiClient.get(`/pokemon/${id}`);

      const pokemon = mapPokemonDetailToDomain(response.data);

      return pokemon;
    } catch (error) {
      throw new Error(
        `Failed to fetch Pokemon detail for ${id}: ` + (error as Error).message,
      );
    }
  }
}
