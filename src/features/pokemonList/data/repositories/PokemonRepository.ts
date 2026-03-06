import apiClient from '@/src/shared/data/api/client';
import { PokemonListResponse } from '@/src/shared/data/api/PokemonListResponse';
import { IPokemonRepository } from '../../domain/interfaces/repositories/IPokemonRepository';

export class PokemonRepository implements IPokemonRepository {
  async getPokemonList(limit: 30, offset: 0): Promise<PokemonListResponse> {
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
