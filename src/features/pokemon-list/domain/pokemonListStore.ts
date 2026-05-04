import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

import type { ApiClientError } from "../../../shared/data/api";
import type { Pokemon, PokemonType } from "../../../shared/data/entities";
import {
  DEFAULT_POKEMON_LIST_LIMIT,
  DEFAULT_POKEMON_LIST_OFFSET,
} from "../data/api";
import * as pokemonListRepository from "../data/repositories";

export type PokemonListState = {
  pokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  typeOptions: PokemonType[];
  listLoading: boolean;
  nextBatchLoading: boolean;
  typeOptionsLoading: boolean;
  error: ApiClientError | null;
  query: string;
  selectedType: PokemonType["name"] | null;
  count: number;
  next: string | null;
  previous: string | null;
  limit: number;
  offset: number;
};

export type PokemonListActions = {
  setQuery: (query: string) => void;
  setSelectedType: (type: PokemonType["name"] | null) => void;
  loadPokemonList: () => Promise<void>;
  loadNextPokemonBatch: () => Promise<void>;
  loadPokemonTypes: () => Promise<void>;
};

export type PokemonListStore = PokemonListState & PokemonListActions;

export type PokemonListStoreDependencies = Pick<
  typeof pokemonListRepository,
  "fetchPokemonList" | "fetchPokemonTypes"
>;

export const initialPokemonListState: PokemonListState = {
  pokemon: [],
  filteredPokemon: [],
  typeOptions: [],
  listLoading: false,
  nextBatchLoading: false,
  typeOptionsLoading: false,
  error: null,
  query: "",
  selectedType: null,
  count: 0,
  next: null,
  previous: null,
  limit: DEFAULT_POKEMON_LIST_LIMIT,
  offset: DEFAULT_POKEMON_LIST_OFFSET,
};

function getFilteredPokemon(
  pokemon: Pokemon[],
  query: string,
  selectedType: PokemonType["name"] | null,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return pokemon.filter((entry) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      entry.name.toLowerCase().includes(normalizedQuery);
    const matchesType =
      !selectedType || entry.types.some((type) => type.name === selectedType);

    return matchesQuery && matchesType;
  });
}

export function createPokemonListStore(
  dependencies: PokemonListStoreDependencies = pokemonListRepository,
) {
  return createStore<PokemonListStore>()((set, get) => ({
    ...initialPokemonListState,
    setQuery: (query) => {
      const { pokemon, selectedType } = get();

      set({
        query,
        filteredPokemon: getFilteredPokemon(pokemon, query, selectedType),
      });
    },
    setSelectedType: (selectedType) => {
      const { pokemon, query } = get();

      set({
        selectedType,
        filteredPokemon: getFilteredPokemon(pokemon, query, selectedType),
      });
    },
    loadPokemonList: async () => {
      const state = get();

      if (state.listLoading || state.nextBatchLoading) {
        return;
      }

      set({ listLoading: true, error: null });

      try {
        const response = await dependencies.fetchPokemonList({
          limit: DEFAULT_POKEMON_LIST_LIMIT,
          offset: DEFAULT_POKEMON_LIST_OFFSET,
        });

        const { query, selectedType } = get();

        set({
          pokemon: response.results,
          filteredPokemon: getFilteredPokemon(
            response.results,
            query,
            selectedType,
          ),
          count: response.count,
          next: response.next,
          previous: response.previous,
          limit: response.limit,
          offset: response.offset,
          listLoading: false,
        });
      } catch (error) {
        set({
          error: error as ApiClientError,
          listLoading: false,
        });
      }
    },
    loadNextPokemonBatch: async () => {
      const state = get();

      if (state.listLoading || state.nextBatchLoading || !state.next) {
        return;
      }

      set({ nextBatchLoading: true, error: null });

      try {
        const nextOffset = state.offset + state.limit;
        const response = await dependencies.fetchPokemonList({
          limit: state.limit,
          offset: nextOffset,
        });

        const pokemon = [...get().pokemon, ...response.results];
        const { query, selectedType } = get();

        set({
          pokemon,
          filteredPokemon: getFilteredPokemon(pokemon, query, selectedType),
          count: response.count,
          next: response.next,
          previous: response.previous,
          limit: response.limit,
          offset: nextOffset,
          nextBatchLoading: false,
        });
      } catch (error) {
        set({
          error: error as ApiClientError,
          nextBatchLoading: false,
        });
      }
    },
    loadPokemonTypes: async () => {
      if (get().typeOptionsLoading) {
        return;
      }

      set({ typeOptionsLoading: true, error: null });

      try {
        const typeOptions = await dependencies.fetchPokemonTypes();

        set({
          typeOptions,
          typeOptionsLoading: false,
        });
      } catch (error) {
        set({
          error: error as ApiClientError,
          typeOptionsLoading: false,
        });
      }
    },
  }));
}

export const pokemonListStore = createPokemonListStore();

export function usePokemonListStore<T>(
  selector: (state: PokemonListStore) => T,
) {
  return useStore(pokemonListStore, selector);
}
