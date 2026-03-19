import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { usePokemonDetailStore } from '../pokemonDetailStore';

describe('PokemonDetailStore', () => {
  const initialStoreState = usePokemonDetailStore.getState();

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
    // Reset the store state before each test
    usePokemonDetailStore.setState(initialStoreState);
  });

  it('Should have the correct initial state', () => {
    const state = usePokemonDetailStore.getState();

    expect(state.pokemonDetail).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  // Since we don't have a setLoading function, we test it by fetching a Pokemon
  it('Should handle loading state and successful fetch correctly', async () => {
    const mockFetchData = jest.fn().mockResolvedValue(mockPokemon);

    const fetchPokemon = usePokemonDetailStore
      .getState()
      .fetchPokemonDetail(1, mockFetchData);

    // Right after we call the fetchPokemon function we check "loading" (Should be true) and "error" (Should be null) values
    expect(usePokemonDetailStore.getState().loading).toBe(true);
    expect(usePokemonDetailStore.getState().error).toBeNull();

    // We wait until the function ends
    await fetchPokemon;

    // We check once more the values of "loading" (Should be false) and "error" (Should still be null)
    expect(usePokemonDetailStore.getState().loading).toBe(false);
    expect(usePokemonDetailStore.getState().pokemonDetail).toEqual(mockPokemon);
  });

  // To check the error too we simulate one
  it('Should handle loading and error states correctly on failed fetch', async () => {
    const errorMessage = 'Network Error';
    const mockFetchData = jest.fn().mockRejectedValue(new Error(errorMessage));

    const fetchError = usePokemonDetailStore
      .getState()
      .fetchPokemonDetail(1, mockFetchData);

    // "loading" should be true
    expect(usePokemonDetailStore.getState().loading).toBe(true);

    // Wait until it fails
    await fetchError;

    // Check the values of "loading" (Should be false), "error" (Should be the error message), and pokemonDetail
    // (Should be null, because of the error it couldn't be fetched)
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

  it('Should fetch pokemon details successfully', async () => {
    const mockFetchData = jest.fn().mockResolvedValue(mockPokemon);

    await usePokemonDetailStore.getState().fetchPokemonDetail(1, mockFetchData);

    const state = usePokemonDetailStore.getState();

    expect(mockFetchData).toHaveBeenCalledWith(1);
    expect(state.pokemonDetail).toEqual(mockPokemon);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
