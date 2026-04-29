import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

import type { ApiClientError } from "../../../shared/data/api";
import type { Pokemon, PokemonType } from "../../../shared/data/entities";
import * as favoritesRepository from "../data/repositories";
import { fetchPokemonTypes } from "../../pokemon-list/data/repositories";

export type FavoritesState = {
  favoritePokemonIds: number[];
  pokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  typeOptions: PokemonType[];
  loading: boolean;
  error: ApiClientError | Error | null;
  query: string;
  selectedType: PokemonType["name"] | null;
  activeRequestKey: string | null;
};

export type FavoritesActions = {
  setQuery: (query: string) => void;
  setSelectedType: (selectedType: PokemonType["name"] | null) => void;
  syncFavoritePokemonIds: (favoritePokemonIds: number[]) => Promise<void>;
};

export type FavoritesStore = FavoritesState & FavoritesActions;

export type FavoritesStoreDependencies = Pick<
  typeof favoritesRepository,
  "fetchFavoritePokemonByIds"
> & {
  fetchPokemonTypes: typeof fetchPokemonTypes;
};

export const initialFavoritesState: FavoritesState = {
  favoritePokemonIds: [],
  pokemon: [],
  filteredPokemon: [],
  typeOptions: [],
  loading: false,
  error: null,
  query: "",
  selectedType: null,
  activeRequestKey: null,
};

function normalizeFavoritePokemonIds(favoritePokemonIds: number[]) {
  return [
    ...new Set(
      favoritePokemonIds.filter((id) => Number.isInteger(id) && id > 0),
    ),
  ];
}

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

function sortTypeOptions(typeOptions: PokemonType[]) {
  const trailingTypeNames = new Set(["stellar", "unknown"]);
  const leadingTypeOptions: PokemonType[] = [];
  const trailingTypeOptions: PokemonType[] = [];

  for (const typeOption of typeOptions) {
    if (trailingTypeNames.has(typeOption.name)) {
      trailingTypeOptions.push(typeOption);
      continue;
    }

    leadingTypeOptions.push(typeOption);
  }

  return [...leadingTypeOptions, ...trailingTypeOptions];
}

function sortPokemonByFavoriteIds(
  pokemon: Pokemon[],
  favoritePokemonIds: number[],
) {
  const pokemonById = new Map(pokemon.map((entry) => [entry.id, entry]));

  return favoritePokemonIds
    .map((favoritePokemonId) => pokemonById.get(favoritePokemonId))
    .filter((entry): entry is Pokemon => Boolean(entry));
}

export function createFavoritesStore(
  dependencies: FavoritesStoreDependencies = {
    ...favoritesRepository,
    fetchPokemonTypes,
  },
) {
  return createStore<FavoritesStore>()((set, get) => ({
    ...initialFavoritesState,
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
    syncFavoritePokemonIds: async (favoritePokemonIds) => {
      const normalizedFavoritePokemonIds =
        normalizeFavoritePokemonIds(favoritePokemonIds);
      const requestKey = normalizedFavoritePokemonIds.join(",");
      const state = get();

      if (state.loading && state.activeRequestKey === requestKey) {
        return;
      }

      const retainedPokemon = sortPokemonByFavoriteIds(
        state.pokemon.filter((entry) =>
          normalizedFavoritePokemonIds.includes(entry.id),
        ),
        normalizedFavoritePokemonIds,
      );
      const retainedPokemonIds = new Set(
        retainedPokemon.map((entry) => entry.id),
      );
      const missingFavoritePokemonIds = normalizedFavoritePokemonIds.filter(
        (favoritePokemonId) => !retainedPokemonIds.has(favoritePokemonId),
      );
      const typeOptions = state.typeOptions;
      const selectedType =
        state.selectedType &&
        typeOptions.some((type) => type.name === state.selectedType)
          ? state.selectedType
          : null;

      set({
        favoritePokemonIds: normalizedFavoritePokemonIds,
        pokemon: retainedPokemon,
        filteredPokemon: getFilteredPokemon(
          retainedPokemon,
          state.query,
          selectedType,
        ),
        typeOptions,
        selectedType,
        loading: missingFavoritePokemonIds.length > 0,
        error: null,
        activeRequestKey: requestKey,
      });

      try {
        const [fetchedPokemon, fetchedTypeOptions] = await Promise.all([
          missingFavoritePokemonIds.length > 0
            ? dependencies.fetchFavoritePokemonByIds(missingFavoritePokemonIds)
            : Promise.resolve([]),
          state.typeOptions.length === 0
            ? dependencies.fetchPokemonTypes()
            : Promise.resolve(state.typeOptions),
        ]);

        if (get().activeRequestKey !== requestKey) {
          return;
        }

        const pokemon = sortPokemonByFavoriteIds(
          [...retainedPokemon, ...fetchedPokemon],
          normalizedFavoritePokemonIds,
        );
        const nextTypeOptions = sortTypeOptions(fetchedTypeOptions);
        const nextSelectedType =
          selectedType &&
          nextTypeOptions.some((type) => type.name === selectedType)
            ? selectedType
            : null;

        set({
          pokemon,
          filteredPokemon: getFilteredPokemon(
            pokemon,
            get().query,
            nextSelectedType,
          ),
          typeOptions: nextTypeOptions,
          selectedType: nextSelectedType,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (get().activeRequestKey !== requestKey) {
          return;
        }

        set({
          loading: false,
          error: error as ApiClientError | Error,
        });
      }
    },
  }));
}

export const favoritesStore = createFavoritesStore();

export function useFavoritesStore<T>(selector: (state: FavoritesStore) => T) {
  return useStore(favoritesStore, selector);
}
