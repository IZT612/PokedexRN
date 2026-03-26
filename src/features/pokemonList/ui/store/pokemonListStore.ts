import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { IPokemonRepository } from '@/src/shared/domain/interfaces/IPokemonRepository';
import { create } from 'zustand';

const BATCH_SIZE = 30;

export interface PokemonListState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  searchQuery: string;
  selectedType: PokemonType | null;

  setSearchQuery: (searchQuery: string) => void;
  setSelectedType: (selectedType: PokemonType | null) => void;

  loadPokemons: () => Promise<void>;

  getFilteredPokemon: (
    pokemonList: Pokemon[],
    searchQuery: string,
    selectedType: PokemonType | null,
  ) => Pokemon[];
}

export const createPokemonListStore = (repository: IPokemonRepository) =>
  create<PokemonListState>()((set, get) => ({
    pokemonList: [],
    loading: false,
    error: null,
    offset: 0,
    searchQuery: '',
    selectedType: null,

    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSelectedType: (selectedType) => set({ selectedType }),

    loadPokemons: async () => {
      const { offset, loading } = get();
      if (loading) return;

      set({ loading: true, error: null });

      try {
        const pokemons = await repository.getPokemonList(BATCH_SIZE, offset);

        set((state) => ({
          pokemonList: [...state.pokemonList, ...pokemons],
          offset: offset + BATCH_SIZE,
          loading: false,
        }));
      } catch (error: any) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        set({
          error: errorMessage || 'Error loading the Pokemons',
          loading: false,
        });
      }
    },

    // Gets the list of filtered Pokemon
    getFilteredPokemon: (
      pokemonList: Pokemon[],
      searchQuery: string,
      selectedType: PokemonType | null,
    ) => {
      return pokemonList.filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesType = selectedType
          ? pokemon.types.includes(selectedType)
          : true;

        // Both have to be true
        return matchesSearch && matchesType;
      });
    },
  }));
