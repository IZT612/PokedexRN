import apiClient from '@/src/shared/data/api/client';
import { PokemonDetailRepository } from '../PokemonDetailRepository';

jest.mock('@/src/shared/data/api/client');

describe('PokemonDetail: PokemonDetailRepository - E2E test', () => {
  const repository = new PokemonDetailRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Success case: Able to fetch the details of a Pokemon
  it('Should fetch the details of a Pokemon', async () => {
    const mockApiResponse = {
      data: {
        id: 1,
        name: 'bulbasaur',
        sprites: {
          other: {
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
          },
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        stats: [{ base_stat: 45, stat: { name: 'hp' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockApiResponse);

    const pokemon = await repository.getPokemonDetail(1);

    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe('bulbasaur');

    expect(typeof pokemon.image).toBe('string');
    expect(pokemon.image).toContain('http');

    expect(pokemon.types).toContain('grass');
    expect(pokemon.types).toContain('poison');
    expect(pokemon.stats.length).toBeGreaterThan(0);
    expect(pokemon.abilities.length).toBeGreaterThan(0);

    expect(pokemon.stats[0]).toHaveProperty('name');
    expect(pokemon.stats[0]).toHaveProperty('value');
  });

  // Error case: Simulates a network error when trying to fetch the details of a Pokemon
  it('Should throw a Network error', async () => {
    const simulatedError = new Error('Network Error');
    (apiClient.get as jest.Mock).mockRejectedValueOnce(simulatedError);

    await expect(repository.getPokemonDetail(1)).rejects.toThrow(
      'Network Error',
    );
  });

  // Error case: Simulates an error when the API returns invalid data (missing required fields)
  it('Should throw an error for invalid data', async () => {
    const invalidData = {
      data: {
        id: 1,
        name: 'bulbasaur',
        // Missing sprites, types, stats, and abilities
      },
    };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(invalidData);

    await expect(repository.getPokemonDetail(1)).rejects.toThrow();
  });
});
