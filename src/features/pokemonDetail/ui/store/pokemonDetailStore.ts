import { Pokemon } from '@/src/shared/domain/entities/Pokemon'; // Ajusta el path si es necesario
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface PokemonDetailState {
  pokemonDetail: Pokemon | null;
  loading: boolean;
  error: string | null;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchPokemonDetail: (
    idOrName: string | number,
    fetchData: (idOrName: string | number) => Promise<Pokemon>,
  ) => Promise<void>;

  clearPokemonDetail: () => void;
}

export const usePokemonDetailStore = create<PokemonDetailState>()(
  devtools(
    (set) => ({
      pokemonDetail: null,
      loading: false,
      error: null,

      setLoading: (loading) => set({ loading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),

      // Clear the pokemon detail and error state
      clearPokemonDetail: () =>
        set({ pokemonDetail: null, error: null }, false, 'clearPokemonDetail'),

      // Fetch the pokemon detail by id or name (id principally)
      fetchPokemonDetail: async (idOrName, fetchData) => {
        set({ loading: true, error: null }, false, 'fetchPokemonDetail');
        try {
          const data = await fetchData(idOrName);
          set(
            { pokemonDetail: data, loading: false },
            false,
            'fetchPokemonDetail/success',
          );
        } catch (error) {
          set(
            { error: (error as Error).message, loading: false },
            false,
            'fetchPokemonDetail/error',
          );
        }
      },
    }),
    {
      name: 'PokemonDetailStore',
    },
  ),
);
