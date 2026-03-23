import apiClient from '@/src/shared/data/api/client';
import { PokemonRepository } from '@/src/shared/data/repositories/PokemonRepository';

jest.mock('@/src/shared/data/api/client');

describe('PokemonList: PokemonListRepository - E2E test', () => {
  const repository = new PokemonRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('List tests', () => {
    // Success case: Able fetch a list of Pokemon
    it('Should fetch a list of Pokemon', async () => {
      // Mock the first API call (The basic list response)
      const mockResults = Array(30).fill({
        name: 'pikachu',
        url: 'https://fake-url.com/pokemon/25',
      });

      const mockListApiResponse = {
        data: {
          results: mockResults,
          count: 1302,
          next: 'https://fake-url.com/next',
          previous: null,
        },
      };

      // Mock the following API calls (The detailed Pokemon responses)
      const mockDetailApiResponse = {
        data: {
          id: 25,
          name: 'pikachu',
          sprites: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            other: {
              'official-artwork': {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
              },
            },
          },
          types: [{ type: { name: 'electric' } }],
          stats: [
            { base_stat: 35, stat: { name: 'hp' } },
            { base_stat: 55, stat: { name: 'attack' } },
            { base_stat: 40, stat: { name: 'defense' } },
            { base_stat: 50, stat: { name: 'special-attack' } },
            { base_stat: 50, stat: { name: 'special-defense' } },
            { base_stat: 90, stat: { name: 'speed' } },
          ],
          abilities: [
            { ability: { name: 'static' } },
            { ability: { name: 'lightning-rod' } },
          ],
        },
      };

      // Set up the jest mocks
      (apiClient.get as jest.Mock)
        .mockResolvedValueOnce(mockListApiResponse)
        .mockResolvedValue(mockDetailApiResponse);

      // Execute
      const result = await repository.getPokemonList(30, 0);

      // Check the mapped entity
      expect(result.length).toBe(30);
      expect(result[0].id).toBe(25);
      expect(result[0].name).toBe('pikachu');
      expect(result[0].image).toBe(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      );
      expect(result[0].types).toContain('electric');
      expect(result[0].stats[0].name).toBe('hp');
      expect(result[0].stats[0].value).toBe(35);
      expect(result[0].abilities).toContain('static');

      // 1 call for the main list + 30 calls for the details = 31 total calls
      expect(apiClient.get).toHaveBeenCalledTimes(31);
    });

    // Error case: Simulates a network error when trying to fetch a list of Pokemon
    it('Should throw a Network error', async () => {
      const simulatedError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(simulatedError);

      await expect(repository.getPokemonList(30, 0)).rejects.toThrow(
        'Failed to fetch Pokemon list: Network error',
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
