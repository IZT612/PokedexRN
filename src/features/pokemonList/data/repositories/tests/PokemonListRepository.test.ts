import apiClient from '@/src/shared/data/api/client';
import { PokemonListRepository } from '../PokemonListRepository';

jest.mock('@/src/shared/data/api/client');

describe('PokemonList: PokemonListRepository - unit test', () => {
  const repository = new PokemonListRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('List tests', () => {
    // Success case: Able fetch a list of Pokemon
    it('Should fetch a list of Pokemon', async () => {
      const mockResults = Array(30).fill({
        name: 'pikachu',
        url: 'https://fake-url.com',
      });

      const mockApiResponse = {
        data: {
          results: mockResults,
          count: 1302,
          next: 'https://fake-url.com/next',
          previous: null,
        },
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce(mockApiResponse);

      const result = await repository.getPokemonList(30, 0);

      expect(result.results.length).toBe(30);
      expect(typeof result.results[0].name).toBe('string');
      expect(typeof result.results[0].url).toBe('string');
    });

    // Error case: Simulates a network error when trying to fetch a list of Pokemon
    it('Should throw a Network error', async () => {
      const simulatedError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(simulatedError);

      await expect(repository.getPokemonList(30, 0)).rejects.toThrow(
        'Network error',
      );
    });
  });

  describe('Types tests', () => {
    it('Should fetch a list of Pokemon types', async () => {
      const mockTypesResponse = {
        data: {
          results: [
            { name: 'normal' },
            { name: 'fighting' },
            { name: 'flying' },
            { name: 'poison' },
            { name: 'ground' },
            { name: 'rock' },
            { name: 'bug' },
            { name: 'ghost' },
            { name: 'steel' },
            { name: 'fire' },
            { name: 'water' },
            { name: 'grass' },
            { name: 'electric' },
            { name: 'psychic' },
            { name: 'ice' },
            { name: 'dragon' },
            { name: 'dark' },
            { name: 'fairy' },
          ],
        },
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce(mockTypesResponse);

      const types = await repository.getPokemonTypes();

      // There are currently 18 Pokemon types, but we check if it's equal to 18 or greater than 18, because in the future if they add more
      // types we don't want this test to fail
      expect(types.length).toBeGreaterThanOrEqual(18);

      // We check if the types array contains all the currently known Pokemon types
      expect(types).toContain('normal');
      expect(types).toContain('fighting');
      expect(types).toContain('flying');
      expect(types).toContain('poison');
      expect(types).toContain('ground');
      expect(types).toContain('rock');
      expect(types).toContain('bug');
      expect(types).toContain('ghost');
      expect(types).toContain('steel');
      expect(types).toContain('fire');
      expect(types).toContain('water');
      expect(types).toContain('grass');
      expect(types).toContain('electric');
      expect(types).toContain('psychic');
      expect(types).toContain('ice');
      expect(types).toContain('dragon');
      expect(types).toContain('dark');
      expect(types).toContain('fairy');
    });

    // Error case: Simulates a network error when trying to fetch a list of Pokemon types
    it('Should throw an error when network fails fetching types', async () => {
      const simulatedError = new Error('Network Error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(simulatedError);

      await expect(repository.getPokemonTypes()).rejects.toThrow();
    });
  });
});
