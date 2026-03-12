import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { usePokemonListStore } from '../pokemonListStore';

describe('PokemonListStore', () => {
  const mockPokemonList: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: ['grass', 'poison'],
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
      ],
      abilities: ['overgrow'],
    },
  ];

  const initialStoreState = usePokemonListStore.getState();

  beforeEach(() => {
    // Reset the store state before each test
    usePokemonListStore.setState(initialStoreState);
  });

  // Test the initial state of the store
  it('Should have the correct initial state', () => {
    const state = usePokemonListStore.getState();

    expect(state.pokemonList).toEqual([]);
    expect(state.selectedPokemon).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Should update the pokemon list correctly', () => {
    usePokemonListStore.getState().setPokemonList(mockPokemonList);

    expect(usePokemonListStore.getState().pokemonList).toEqual(mockPokemonList);
  });

  it('Should update the loading state correctly', () => {
    usePokemonListStore.getState().setLoading(true);
    expect(usePokemonListStore.getState().loading).toBe(true);
  });

  it('Should update the error state correctly', () => {
    const errorMessage: string | null = 'Network Error';

    usePokemonListStore.getState().setError(errorMessage);
    expect(usePokemonListStore.getState().error).toBe(errorMessage);
  });

  describe('Listing and pagination', () => {
    it('Should fetch initial pokemon successfully', async () => {
      const mockFetchData = jest.fn().mockResolvedValue(mockPokemonList);

      await usePokemonListStore.getState().fetchInitialPokemon(mockFetchData);

      const state = usePokemonListStore.getState();

      expect(mockFetchData).toHaveBeenCalledWith(30, 0);
      expect(state.pokemonList).toEqual(mockPokemonList);
      expect(state.offset).toBe(30);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('Should handle error when fetching initial pokemon fails', async () => {
      const errorMessage = 'Simulated error';
      const mockFetchData = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await usePokemonListStore.getState().fetchInitialPokemon(mockFetchData);

      const state = usePokemonListStore.getState();
      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
    });
  });
});
