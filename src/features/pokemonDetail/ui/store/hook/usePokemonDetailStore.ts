import { createPokemonDetailStore } from '@/src/features/pokemonDetail/ui/store/pokemonDetailStore';
import { PokemonRepository } from '@/src/shared/data/repositories/PokemonRepository';

const repository = new PokemonRepository();

export const usePokemonDetailStore = createPokemonDetailStore(repository);
