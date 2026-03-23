import apiClient from '@/src/shared/data/api/client';
import { PokemonDetailResponse } from '@/src/shared/data/api/PokemonDetailResponse';
import { PokemonListResponse } from '@/src/shared/data/api/PokemonListResponse';
import { mapPokemonDetailToDomain } from '@/src/shared/data/mappers/PokemonMapper';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { IPokemonListRepository } from '../../domain/interfaces/IPokemonRepository';

export class PokemonListRepository implements IPokemonListRepository {
  async getPokemonList(
    limit: number = 30,
    offset: number = 0,
  ): Promise<Pokemon[]> {
    try {
      const response = await apiClient.get<PokemonListResponse>(
        `/pokemon?limit=${limit}&offset=${offset}`,
      );

      const detailedPokemonsPromises = response.data.results.map(
        async (pokemon) => {
          return this.getPokemonDetails(pokemon.name);
        },
      );

      return await Promise.all(detailedPokemonsPromises);
    } catch (error) {
      throw new Error(
        'Failed to fetch Pokemon list: ' + (error as Error).message,
      );
    }
  }

  async getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
    try {
      const response = await apiClient.get<PokemonDetailResponse>(
        `/pokemon/${nameOrId}`,
      );
      return mapPokemonDetailToDomain(response.data);
    } catch (error) {
      throw new Error(
        `Failed to fetch Pokemon details for ${nameOrId}: ` +
          (error as Error).message,
      );
    }
  }

  async getPokemonTypes(): Promise<string[]> {
    try {
      const response = await apiClient.get('/type');

      const types = response.data.results.map(
        (type: { name: string }) => type.name,
      );

      return types;
    } catch (error) {
      throw new Error(
        'Unable to load Pokemon types: ' + (error as Error).message,
      );
    }
  }
}
