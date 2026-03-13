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

  const mockFilterPokemonList: Pokemon[] = [
    ...mockPokemonList,
    {
      id: 4,
      name: 'charmander',
      image: 'url',
      types: ['fire'],
      stats: [],
      abilities: [],
    },
    {
      id: 5,
      name: 'charmeleon',
      image: 'url',
      types: ['fire'],
      stats: [],
      abilities: [],
    },
    {
      id: 7,
      name: 'squirtle',
      image: 'url',
      types: ['water'],
      stats: [],
      abilities: [],
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
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.searchQuery).toBe('');
    expect(state.selectedType).toBeNull();
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

  it('Should update search query', () => {
    usePokemonListStore.getState().setSearchQuery('char');
    expect(usePokemonListStore.getState().searchQuery).toBe('char');
  });

  it('Should update selected type', () => {
    usePokemonListStore.getState().setSelectedType('fire');
    expect(usePokemonListStore.getState().selectedType).toBe('fire');
  });

  describe('Searching and filtering', () => {
    beforeEach(() => {
      usePokemonListStore.setState({ pokemonList: mockFilterPokemonList });
    });

    it('Should clear all filters', () => {
      usePokemonListStore.setState({
        searchQuery: 'saur',
        selectedType: 'grass',
      });
      usePokemonListStore.getState().clearFilters();

      const state = usePokemonListStore.getState();
      expect(state.searchQuery).toBe('');
      expect(state.selectedType).toBeNull();
    });

    it('Should return every pokemon when no filters are applied', () => {
      const filtered = usePokemonListStore.getState().getFilteredPokemon();
      expect(filtered.length).toBe(4);
    });
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

    it('Should fetch more pokemon and add them to the existing list', async () => {
      usePokemonListStore.setState({
        pokemonList: mockPokemonList,
        offset: 30,
      });

      const newBatch: Pokemon[] = [
        { ...mockPokemonList[0], id: 2, name: 'ivysaur' },
      ];
      const mockFetchData = jest.fn().mockResolvedValue(newBatch);

      await usePokemonListStore.getState().fetchMorePokemon(mockFetchData);

      const state = usePokemonListStore.getState();
      expect(mockFetchData).toHaveBeenCalledWith(30, 30);

      expect(state.pokemonList).toEqual([...mockPokemonList, ...newBatch]);
      expect(state.offset).toBe(60);
    });

    it('Should handle error when fetching more pokemon fails', async () => {
      const errorMessage = 'Simulated Error';
      const mockFetchData = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await usePokemonListStore.getState().fetchMorePokemon(mockFetchData);

      expect(usePokemonListStore.getState().error).toBe(errorMessage);
      expect(usePokemonListStore.getState().loading).toBe(false);
    });

    it('Should refresh the pokemon list correctly', async () => {
      usePokemonListStore.setState({
        pokemonList: [{ ...mockPokemonList[0], name: 'justgarbage' }],
        // Set the offset to a non-zero value to ensure it resets to 0 after refresh
        offset: 150,
      });

      const mockFetchData = jest.fn().mockResolvedValue(mockPokemonList);

      await usePokemonListStore.getState().refreshPokemonList(mockFetchData);

      const state = usePokemonListStore.getState();
      expect(mockFetchData).toHaveBeenCalledWith(30, 0);
      expect(state.pokemonList).toEqual(mockPokemonList);
      expect(state.offset).toBe(30);
    });
  });
});
