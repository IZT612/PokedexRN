import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { IPokemonListRepository } from '@/src/shared/domain/interfaces/IPokemonRepository';
import { createPokemonDetailStore } from '../pokemonDetailStore';

describe('PokemonDetailStore', () => {
  let mockRepository: jest.Mocked<IPokemonListRepository>;
  let usePokemonDetailStore: ReturnType<typeof createPokemonDetailStore>;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'] as PokemonType[],
    stats: [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
    ],
    abilities: ['overgrow'],
  };

  beforeEach(() => {
    mockRepository = {
      getPokemonDetails: jest.fn(),
      getPokemonList: jest.fn(),
      getPokemonTypes: jest.fn(),
    };

    usePokemonDetailStore = createPokemonDetailStore(mockRepository);
  });

  it('Should have the correct initial state', () => {
    const state = usePokemonDetailStore.getState();

    expect(state.pokemonDetail).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Should handle loading state and successful fetch correctly', async () => {
    mockRepository.getPokemonDetails.mockResolvedValue(mockPokemon);

    const fetchPromise = usePokemonDetailStore.getState().fetchPokemonDetail(1);

    // Right after we call the function we check "loading" (Should be true) and "error" (Should be null)
    expect(usePokemonDetailStore.getState().loading).toBe(true);
    expect(usePokemonDetailStore.getState().error).toBeNull();

    // We wait until the function ends
    await fetchPromise;

    // We check once more the values of "loading" and "pokemonDetail"
    expect(usePokemonDetailStore.getState().loading).toBe(false);
    expect(usePokemonDetailStore.getState().pokemonDetail).toEqual(mockPokemon);

    expect(mockRepository.getPokemonDetails).toHaveBeenCalledWith(1);
  });

  it('Should handle loading and error states correctly on failed fetch', async () => {
    usePokemonDetailStore.setState({ pokemonDetail: mockPokemon });

    const errorMessage = 'Network Error';
    mockRepository.getPokemonDetails.mockRejectedValue(new Error(errorMessage));

    const fetchPromise = usePokemonDetailStore.getState().fetchPokemonDetail(2);

    // "loading" should be true
    expect(usePokemonDetailStore.getState().loading).toBe(true);

    // Wait until it fails
    await fetchPromise;

    // Check the values of "loading", "error", and "pokemonDetail"
    expect(usePokemonDetailStore.getState().loading).toBe(false);
    expect(usePokemonDetailStore.getState().error).toBe(errorMessage);
    expect(usePokemonDetailStore.getState().pokemonDetail).toBeNull();
  });

  it('Should clear the pokemon detail correctly', () => {
    usePokemonDetailStore.setState({
      pokemonDetail: mockPokemon,
      error: 'Some error',
    });

    usePokemonDetailStore.getState().clearPokemonDetail();

    const state = usePokemonDetailStore.getState();
    expect(state.pokemonDetail).toBeNull();
    expect(state.error).toBeNull();
  });
});
