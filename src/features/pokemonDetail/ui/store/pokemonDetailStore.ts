import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { create } from 'zustand';

export interface PokemonDetailState {
  pokemonDetail: Pokemon | null;
  loading: boolean;
  error: string | null;

  fetchPokemonDetail: (
    idOrName: string | number,
    fetchData: (idOrName: string | number) => Promise<Pokemon>,
  ) => Promise<void>;

  clearPokemonDetail: () => void;
}

export const usePokemonDetailStore = create<PokemonDetailState>()((set) => ({
  pokemonDetail: null,
  loading: false,
  error: null,

  // Clear the pokemon detail and error state
  clearPokemonDetail: () => set({ pokemonDetail: null, error: null }),

  // Fetch the pokemon detail by id or name (id principally)
  fetchPokemonDetail: async (idOrName, fetchData) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchData(idOrName);
      set({ pokemonDetail: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
