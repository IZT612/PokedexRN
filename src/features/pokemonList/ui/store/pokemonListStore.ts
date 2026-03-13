import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pokemon } from '../../../../shared/domain/entities/Pokemon';

// This store is responsible for managing the state of the pokemon list and selected pokemon.
export interface PokemonListState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  searchQuery: string;
  selectedType: PokemonType | null;

  setPokemonList: (pokemonList: Pokemon[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedType: (selectedType: PokemonType | null) => void;
  clearFilters: () => void;

  getFilteredPokemon: () => Pokemon[];

  fetchInitialPokemon: (
    fetchData: (limit: number, offset: number) => Promise<Pokemon[]>,
  ) => Promise<void>;
  fetchMorePokemon: (
    fetchData: (limit: number, offset: number) => Promise<Pokemon[]>,
  ) => Promise<void>;
  refreshPokemonList: (
    fetchData: (limit: number, offset: number) => Promise<Pokemon[]>,
  ) => Promise<void>;
}

export const usePokemonListStore = create<PokemonListState>()(
  // Devtools is a middleware that allows us to see the state changes in the browser devtools, it also allows us to time travel and see the state at any point in time.
  devtools(
    // The first argument of the devtools function is a function that receives the set function as an argument,
    // this set function is used to update the state of the store, it takes an object with the new state and an optional boolean to
    // indicate if we want to replace the state or merge it, and an optional string to indicate the name of the action that is being
    // performed.
    (set, get) => ({
      pokemonList: [],
      loading: false,
      error: null,
      offset: 0,
      searchQuery: '',
      selectedType: null,

      setPokemonList: (pokemonList) =>
        set({ pokemonList }, false, 'setPokemonList'),
      setLoading: (loading) => set({ loading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, 'setSearchQuery'),
      setSelectedType: (selectedType) =>
        set({ selectedType }, false, 'setSelectedType'),
      clearFilters: () =>
        set({ searchQuery: '', selectedType: null }, false, 'clearFilters'),

      // Gets the filtered list of pokemon based on the search query and selected type
      getFilteredPokemon: () => {
        const { pokemonList, searchQuery, selectedType } = get();

        pokemonList.filter((pokemon) => {
          const containsSearchQuery = pokemon.name
            .toLowerCase()
            // If searchQuery is "" it will match all pokemon, since every string includes an empty string
            .includes(searchQuery.toLowerCase());

          // If there's a type selected, we check if the pokemon has that type, otherwise (Type not selected) we put true so it doesn't
          // filter any pokemon based on the type.
          const matchesSelectedType = selectedType
            ? pokemon.types.includes(selectedType)
            : true;

          return containsSearchQuery && matchesSelectedType;
        });
      },

      // Fetches the initial list of pokemon
      fetchInitialPokemon: async (fetchData) => {
        set({ loading: true, error: null }, false, 'fetchInitialPokemon');
        try {
          const data = await fetchData(30, 0);
          set(
            { pokemonList: data, offset: 30, loading: false },
            false,
            'fetchInitialPokemon:success',
          );
        } catch (error) {
          set(
            { error: (error as Error).message, loading: false },
            false,
            'fetchInitialPokemon:error',
          );
        }
      },

      // Fetches the next batch of 30 pokemon and appends it to the existing list
      fetchMorePokemon: async (fetchData) => {
        const { offset, pokemonList } = get();
        set({ loading: true, error: null }, false, 'fetchMorePokemon');
        try {
          const data = await fetchData(30, offset);
          set(
            {
              pokemonList: [...pokemonList, ...data],
              offset: offset + 30,
              loading: false,
            },
            false,
            'fetchMorePokemon:success',
          );
        } catch (error) {
          set(
            { error: (error as Error).message, loading: false },
            false,
            'fetchMorePokemon:error',
          );
        }
      },

      // Refreshes the pokemon list by fetching the first batch of 30 pokemon again and replacing the existing list
      // (Currently does the same thing as fetchInitialPokemon, but it's separated for semantic reasons,
      // it could be useful in the future if we want to implement a pull-to-refresh functionality for example)
      refreshPokemonList: async (fetchData) => {
        set({ loading: true, error: null }, false, 'refreshPokemonList');
        try {
          const data = await fetchData(30, 0);
          set(
            { pokemonList: data, offset: 30, loading: false },
            false,
            'refreshPokemonList:success',
          );
        } catch (error) {
          set(
            { error: (error as Error).message, loading: false },
            false,
            'refreshPokemonList:error',
          );
        }
      },
    }),

    // The second argument of the devtools function is an optional object with the name of the store,
    // this is useful for debugging purposes.
    {
      name: 'PokemonStore',
    },
  ),
);
