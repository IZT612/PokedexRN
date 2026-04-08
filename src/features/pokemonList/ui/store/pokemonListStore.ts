import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { IPokemonRepository } from '@/src/shared/domain/interfaces/IPokemonRepository';
import { create } from 'zustand';

const BATCH_SIZE = 30;

const applyFilters = (
  list: Pokemon[],
  query: string,
  type: PokemonType | null,
) => {
  if (!query && !type) return list;

  return list.filter((pokemon) => {
    const matchesSearch = query
      ? pokemon.name.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesType = type ? pokemon.types.includes(type) : true;
    return matchesSearch && matchesType;
  });
};

export interface PokemonListState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  searchQuery: string;
  selectedType: PokemonType | null;
  hasMore: boolean;
  filteredList: Pokemon[];

  setSearchQuery: (searchQuery: string) => void;
  setSelectedType: (selectedType: PokemonType | null) => void;

  loadPokemons: () => Promise<void>;
}

export const createPokemonListStore = (repository: IPokemonRepository) =>
  create<PokemonListState>()((set, get) => ({
    pokemonList: [],
    loading: false,
    error: null,
    offset: 0,
    searchQuery: '',
    selectedType: null,
    hasMore: true,
    filteredList: [],

    setSearchQuery: (searchQuery) =>
      set((state) => ({
        searchQuery: searchQuery,
        filteredList: applyFilters(
          state.pokemonList,
          searchQuery,
          state.selectedType,
        ),
      })),
    setSelectedType: (selectedType) =>
      set((state) => ({
        selectedType: selectedType,
        filteredList: applyFilters(
          state.pokemonList,
          state.searchQuery,
          selectedType,
        ),
      })),

    loadPokemons: async () => {
      const { offset, loading } = get();
      if (loading) return;

      set({ loading: true, error: null });

      try {
        const pokemons = await repository.getPokemonList(BATCH_SIZE, offset);

        set((state) => ({
          pokemonList: [...state.pokemonList, ...pokemons],
          filteredList: applyFilters(
            state.pokemonList,
            state.searchQuery,
            state.selectedType,
          ),
          offset: offset + BATCH_SIZE,
          // We only have more to load if we received a full batch
          hasMore: pokemons.length === BATCH_SIZE,
          loading: false,
        }));
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        set({
          error: errorMessage || 'Error loading the Pokemons',
          loading: false,
        });
      }
    },
  }));
