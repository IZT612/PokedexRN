import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { IPokemonRepository } from '@/src/shared/domain/interfaces/IPokemonRepository';
import { create } from 'zustand';

export interface PokemonDetailState {
  pokemonDetail: Pokemon | null;
  loading: boolean;
  error: string | null;

  fetchPokemonDetail: (idOrName: string | number) => Promise<void>;
  clearPokemonDetail: () => void;
}

export const createPokemonDetailStore = (repository: IPokemonRepository) =>
  create<PokemonDetailState>()((set) => ({
    pokemonDetail: null,
    loading: false,
    error: null,

    clearPokemonDetail: () => set({ pokemonDetail: null, error: null }),

    fetchPokemonDetail: async (idOrName) => {
      set({ loading: true, error: null });
      try {
        const data = await repository.getPokemonDetails(idOrName);
        set({ pokemonDetail: data, loading: false });
      } catch (error) {
        set({
          pokemonDetail: null,
          error: (error as Error).message,
          loading: false,
        });
      }
    },
  }));
