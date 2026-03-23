import { createPokemonListStore } from '@/src/features/pokemonList/ui/store/pokemonListStore';
import { PokemonRepository } from '@/src/shared/data/repositories/PokemonRepository';

const repository = new PokemonRepository();

export const usePokemonListStore = createPokemonListStore(repository);
