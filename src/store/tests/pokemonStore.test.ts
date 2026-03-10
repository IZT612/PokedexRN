import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { usePokemonStore } from '../pokemonStore';

describe('PokemonStore', () => {
  const initialStoreState = usePokemonStore.getState();

  beforeEach(() => {
    // Reset the store state before each test
    usePokemonStore.setState(initialStoreState);
  });

  // Test the initial state of the store
  it('Should have the correct initial state', () => {
    const state = usePokemonStore.getState();

    expect(state.pokemonList).toEqual([]);
    expect(state.selectedPokemon).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Should update the pokemon list correctly', () => {
    const mockPokemonList: Pokemon[] = [
      {
        id: 1,
        name: 'bulbasaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        // Sustituye el interior de estos arrays por las propiedades exactas
        // que hayas definido en tus tipos PokemonType, Stat, etc.
        types: ['grass', 'poison'],
        stats: [
          { name: 'hp', value: 45 },
          { name: 'attack', value: 49 },
        ],
        abilities: ['overgrow'],
      },
    ];

    usePokemonStore.getState().setPokemonList(mockPokemonList);

    expect(usePokemonStore.getState().pokemonList).toEqual(mockPokemonList);
  });

  it('Should update the loading state correctly', () => {
    usePokemonStore.getState().setLoading(true);
    expect(usePokemonStore.getState().loading).toBe(true);
  });

  it('Should update the error state correctly', () => {
    const errorMessage: string | null = 'Network Error';

    usePokemonStore.getState().setError(errorMessage);
    expect(usePokemonStore.getState().error).toBe(errorMessage);
  });
});
