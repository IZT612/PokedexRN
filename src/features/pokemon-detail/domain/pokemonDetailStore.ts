import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

import type { ApiClientError } from "../../../shared/data/api";
import type { Pokemon } from "../../../shared/data/entities";
import { favoritePokemonStorage } from "../../../shared/data/storage";
import * as pokemonDetailRepository from "../data/repositories";

export type PokemonDetailState = {
  pokemon: Pokemon | null;
  loading: boolean;
  error: ApiClientError | null;
  activePokemonId: number | null;
  favoritePokemonIds: number[];
  favoritePokemonIdsLoading: boolean;
  favoritePokemonIdsSaving: boolean;
  favoritePokemonIdsHydrated: boolean;
  favoritePokemonIdsError: Error | null;
};

export type PokemonDetailActions = {
  loadPokemonDetail: (pokemonId: number) => Promise<void>;
  loadFavoritePokemonIds: () => Promise<void>;
  toggleFavorite: (pokemonId: number) => Promise<void>;
};

export type PokemonDetailStore = PokemonDetailState & PokemonDetailActions;

export type PokemonDetailStoreDependencies = Pick<
  typeof pokemonDetailRepository,
  "fetchPokemonDetail"
> &
  Pick<
    typeof favoritePokemonStorage,
    "loadFavoritePokemonIds" | "saveFavoritePokemonIds"
  >;

export const initialPokemonDetailState: PokemonDetailState = {
  pokemon: null,
  loading: false,
  error: null,
  activePokemonId: null,
  favoritePokemonIds: [],
  favoritePokemonIdsLoading: false,
  favoritePokemonIdsSaving: false,
  favoritePokemonIdsHydrated: false,
  favoritePokemonIdsError: null,
};

export function createPokemonDetailStore(
  dependencies: PokemonDetailStoreDependencies = {
    ...pokemonDetailRepository,
    ...favoritePokemonStorage,
  },
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
    loadFavoritePokemonIds: async () => {
      if (get().favoritePokemonIdsLoading) {
        return;
      }

      set({
        favoritePokemonIdsLoading: true,
        favoritePokemonIdsError: null,
      });

      try {
        const favoritePokemonIds = await dependencies.loadFavoritePokemonIds();

        set({
          favoritePokemonIds,
          favoritePokemonIdsLoading: false,
          favoritePokemonIdsHydrated: true,
          favoritePokemonIdsError: null,
        });
      } catch (error) {
        set({
          favoritePokemonIdsLoading: false,
          favoritePokemonIdsHydrated: false,
          favoritePokemonIdsError: error as Error,
        });
      }
    },
    toggleFavorite: async (pokemonId) => {
      const state = get();

      if (
        state.favoritePokemonIdsLoading ||
        state.favoritePokemonIdsSaving ||
        !state.favoritePokemonIdsHydrated
      ) {
        return;
      }

      const previousFavoritePokemonIds = state.favoritePokemonIds;
      const isFavorite = previousFavoritePokemonIds.includes(pokemonId);
      const nextFavoritePokemonIds = isFavorite
        ? previousFavoritePokemonIds.filter((id) => id !== pokemonId)
        : [...previousFavoritePokemonIds, pokemonId];

      set({
        favoritePokemonIds: nextFavoritePokemonIds,
        favoritePokemonIdsSaving: true,
        favoritePokemonIdsError: null,
      });

      try {
        await dependencies.saveFavoritePokemonIds(nextFavoritePokemonIds);

        set({
          favoritePokemonIdsSaving: false,
          favoritePokemonIdsError: null,
        });
      } catch (error) {
        set({
          favoritePokemonIds: previousFavoritePokemonIds,
          favoritePokemonIdsSaving: false,
          favoritePokemonIdsError: error as Error,
        });
      }
    },
  }));
}

export const pokemonDetailStore = createPokemonDetailStore();

export function usePokemonDetailStore<T>(
  selector: (state: PokemonDetailStore) => T,
) {
  return useStore(pokemonDetailStore, selector);
}
