import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pokemon } from '../shared/domain/entities/Pokemon';

// This store is responsible for managing the state of the pokemon list and selected pokemon.
export interface PokemonState {
  pokemonList: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  offset: number;

  setPokemonList: (pokemonList: Pokemon[]) => void;
  setSelectedPokemon: (selectedPokemon: Pokemon | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePokemonStore = create<PokemonState>()(
  // Devtools is a middleware that allows us to see the state changes in the browser devtools, it also allows us to time travel and see the state at any point in time.
  devtools(
    // The first argument of the devtools function is a function that receives the set function as an argument,
    // this set function is used to update the state of the store, it takes an object with the new state and an optional boolean to
    // indicate if we want to replace the state or merge it, and an optional string to indicate the name of the action that is being
    // performed.
    (set) => ({
      pokemonList: [],
      selectedPokemon: null,
      loading: false,
      error: null,
      offset: 0,

      setPokemonList: (pokemonList) =>
        set({ pokemonList }, false, 'setPokemonList'),
      setSelectedPokemon: (selectedPokemon) =>
        set({ selectedPokemon }, false, 'setSelectedPokemon'),
      setLoading: (loading) => set({ loading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
    }),

    // The second argument of the devtools function is an optional object with the name of the store,
    // this is useful for debugging purposes.
    {
      name: 'PokemonStore',
    },
  ),
);
