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

  it('Should update the loading state correctly', () => {
    usePokemonDetailStore.getState().setLoading(true);
    expect(usePokemonDetailStore.getState().loading).toBe(true);
  });

  it('Should update the error state correctly', () => {
    const errorMessage = 'Network Error';
    usePokemonDetailStore.getState().setError(errorMessage);
    expect(usePokemonDetailStore.getState().error).toBe(errorMessage);
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
