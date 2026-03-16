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
});
