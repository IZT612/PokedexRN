import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

import type { ApiClientError } from "../../../shared/data/api";
import type { Pokemon } from "../../../shared/data/entities";
import * as pokemonDetailRepository from "../data/repositories";

export type PokemonDetailState = {
  pokemon: Pokemon | null;
  loading: boolean;
  error: ApiClientError | null;
  activePokemonId: number | null;
  favoritePokemonIds: number[];
};

export type PokemonDetailActions = {
  loadPokemonDetail: (pokemonId: number) => Promise<void>;
  toggleFavorite: (pokemonId: number) => void;
};

export type PokemonDetailStore = PokemonDetailState & PokemonDetailActions;

export type PokemonDetailStoreDependencies = Pick<
  typeof pokemonDetailRepository,
  "fetchPokemonDetail"
>;

export const initialPokemonDetailState: PokemonDetailState = {
  pokemon: null,
  loading: false,
  error: null,
  activePokemonId: null,
  favoritePokemonIds: [],
};

export function createPokemonDetailStore(
  dependencies: PokemonDetailStoreDependencies = pokemonDetailRepository,
) {
  return createStore<PokemonDetailStore>()((set, get) => ({
    ...initialPokemonDetailState,
    loadPokemonDetail: async (pokemonId) => {
      const state = get();

      if (state.loading && state.activePokemonId === pokemonId) {
        return;
      }

      set({
        activePokemonId: pokemonId,
        loading: true,
        error: null,
        pokemon: state.activePokemonId === pokemonId ? state.pokemon : null,
      });

      try {
        const pokemon = await dependencies.fetchPokemonDetail(pokemonId);

        if (get().activePokemonId !== pokemonId) {
          return;
        }

        set({
          pokemon,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (get().activePokemonId !== pokemonId) {
          return;
        }

        set({
          error: error as ApiClientError,
          loading: false,
        });
      }
    },
    toggleFavorite: (pokemonId) => {
      const favoritePokemonIds = get().favoritePokemonIds;
      const isFavorite = favoritePokemonIds.includes(pokemonId);

      set({
        favoritePokemonIds: isFavorite
          ? favoritePokemonIds.filter((id) => id !== pokemonId)
          : [...favoritePokemonIds, pokemonId],
      });
    },
  }));
}

export const pokemonDetailStore = createPokemonDetailStore();

export function usePokemonDetailStore<T>(
  selector: (state: PokemonDetailStore) => T,
) {
  return useStore(pokemonDetailStore, selector);
}
