import { createPokemonDetailStore } from '@/src/features/pokemonDetail/ui/store/pokemonDetailStore';
import { createPokemonListStore } from '@/src/features/pokemonList/ui/store/pokemonListStore';
import { PokemonRepository } from '@/src/shared/data/repositories/PokemonRepository';

const globalPokemonRepository = new PokemonRepository();

export const usePokemonListStore = createPokemonListStore(
  globalPokemonRepository,
);
export const usePokemonDetailStore = createPokemonDetailStore(
  globalPokemonRepository,
);
