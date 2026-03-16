import { usePokemonDetailStore } from '../pokemonDetailStore';

describe('PokemonDetailStore', () => {
  const initialStoreState = usePokemonDetailStore.getState();

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
});
