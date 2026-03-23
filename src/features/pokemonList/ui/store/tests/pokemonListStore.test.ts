import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { IPokemonListRepository } from '@/src/shared/domain/interfaces/IPokemonRepository';
import { createPokemonListStore } from '../pokemonListStore';

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
    {
      id: 4,
      name: 'charmander',
      image: 'url',
      types: ['fire'],
      stats: [],
      abilities: [],
    },
  ];

  let mockRepository: jest.Mocked<IPokemonListRepository>;

  let usePokemonListStore: ReturnType<typeof createPokemonListStore>;

  beforeEach(() => {
    mockRepository = {
      getPokemonList: jest.fn(),
      getPokemonDetails: jest.fn(),
      getPokemonTypes: jest.fn(),
    };

    usePokemonListStore = createPokemonListStore(mockRepository);
  });

  // Test the initial state of the store
  it('Should have the correct initial state', () => {
    const state = usePokemonListStore.getState();

    expect(state.pokemonList).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.offset).toBe(0);
    expect(state.searchQuery).toBe('');
    expect(state.selectedType).toBeNull();
  });

  it('Should update search query', () => {
    usePokemonListStore.getState().setSearchQuery('char');
    expect(usePokemonListStore.getState().searchQuery).toBe('char');
  });

  it('Should update selected type', () => {
    usePokemonListStore.getState().setSelectedType('fire');
    expect(usePokemonListStore.getState().selectedType).toBe('fire');
  });

  describe('Loading Pokemons', () => {
    it('Should fetch initial pokemon successfully', async () => {
      mockRepository.getPokemonList.mockResolvedValue(mockPokemonList);

      await usePokemonListStore.getState().loadPokemons();

      const state = usePokemonListStore.getState();

      expect(mockRepository.getPokemonList).toHaveBeenCalledWith(30, 0);

      expect(state.pokemonList).toEqual(mockPokemonList);
      expect(state.offset).toBe(30);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('Should handle error when fetching pokemon fails', async () => {
      const errorMessage = 'Simulated error from API';
      mockRepository.getPokemonList.mockRejectedValue(new Error(errorMessage));

      await usePokemonListStore.getState().loadPokemons();

      const state = usePokemonListStore.getState();

      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
      expect(state.pokemonList).toEqual([]);
    });

    it('Should fetch more pokemon and add them to the existing list (Pagination)', async () => {
      mockRepository.getPokemonList.mockResolvedValue([mockPokemonList[0]]); // Bulbasaur
      await usePokemonListStore.getState().loadPokemons();

      mockRepository.getPokemonList.mockResolvedValue([mockPokemonList[1]]); // Charmander
      await usePokemonListStore.getState().loadPokemons();

      const state = usePokemonListStore.getState();

      // First argument is the position
      expect(mockRepository.getPokemonList).toHaveBeenNthCalledWith(1, 30, 0);
      expect(mockRepository.getPokemonList).toHaveBeenNthCalledWith(2, 30, 30);

      expect(state.pokemonList).toEqual(mockPokemonList);
      expect(state.offset).toBe(60);
    });

    it('Should not trigger a new fetch if it is already loading', async () => {
      let resolvePromise: (value: Pokemon[]) => void;
      mockRepository.getPokemonList.mockReturnValue(
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
      );

      const firstLoad = usePokemonListStore.getState().loadPokemons();

      expect(usePokemonListStore.getState().loading).toBe(true);

      await usePokemonListStore.getState().loadPokemons();

      expect(mockRepository.getPokemonList).toHaveBeenCalledTimes(1);

      resolvePromise!(mockPokemonList);
      await firstLoad;
    });
  });
});
