import apiClient from '@/src/shared/data/api/client';
import { PokemonListResponse } from '@/src/shared/data/api/PokemonListResponse';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { IPokemonListRepository } from '../../domain/interfaces/repositories/IPokemonListRepository';

export class PokemonListRepository implements IPokemonListRepository {
  async getPokemonList(
    limit: number = 30,
    offset: number = 0,
  ): Promise<PokemonListResponse> {
    try {
      const response = await apiClient.get<PokemonListResponse>(
        `/pokemon?limit=${limit}&offset=${offset}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(
        'Failed to fetch Pokemon list: ' + (error as Error).message,
      );
    }
  }

  async getPokemonTypes(): Promise<PokemonType[]> {
    try {
      const response = await apiClient.get('/type');

      const types: PokemonType[] = response.data.results.map(
        (type: { name: string }) => ({ name: type.name }),
      );

      return types;
    } catch (error) {
      throw new Error(
        'Unable to load Pokemon types: ' + (error as Error).message,
      );
    }
  }
}
