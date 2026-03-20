import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { create } from 'zustand';
import { Pokemon } from '../../../../shared/domain/entities/Pokemon';

const BATCH_SIZE = 30;

// This store is responsible for managing the state of the pokemon list, filters, and related loading state.
export interface PokemonListState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  searchQuery: string;
  selectedType: PokemonType | null;

  setPokemonList: (pokemonList: Pokemon[]) => void;
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
  (set, get) => ({
    pokemonList: [],
    loading: false,
    error: null,
    offset: 0,
    searchQuery: '',
    selectedType: null,

    setPokemonList: (pokemonList) => set({ pokemonList }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSelectedType: (selectedType) => set({ selectedType }),
    clearFilters: () => set({ searchQuery: '', selectedType: null }),

    // Gets the filtered list of pokemon based on the search query and selected type
    getFilteredPokemon: () => {
      const { pokemonList, searchQuery, selectedType } = get();

      return pokemonList.filter((pokemon) => {
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
      set({ loading: true, error: null });
      try {
        const data = await fetchData(BATCH_SIZE, 0);
        set({ pokemonList: data, offset: BATCH_SIZE, loading: false });
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
    },

    // Fetches the next batch of 30 pokemon and appends it to the existing list
    fetchMorePokemon: async (fetchData) => {
      const { offset, pokemonList } = get();
      set({ loading: true, error: null });
      try {
        const data = await fetchData(BATCH_SIZE, offset);
        set(
          {
            pokemonList: [...pokemonList, ...data],
            offset: offset + BATCH_SIZE,
            loading: false,
          },
          false,
        );
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
    },

    // Refreshes the pokemon list by fetching the first batch of 30 pokemon again and replacing the existing list
    // (Currently does the same thing as fetchInitialPokemon, but it's separated for semantic reasons,
    // it could be useful in the future if we want to implement a pull-to-refresh functionality for example)
    refreshPokemonList: async (fetchData) => {
      set({ loading: true, error: null }, false);
      try {
        const data = await fetchData(BATCH_SIZE, 0);
        set({ pokemonList: data, offset: BATCH_SIZE, loading: false }, false);
      } catch (error) {
        set({ error: (error as Error).message, loading: false }, false);
      }
    },
  }),

  // The second argument of the devtools function is an optional object with the name of the store,
  // this is useful for debugging purposes.
);
