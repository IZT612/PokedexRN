import { fetchPokemon } from "../../../../shared/data/api";

import type { Pokemon } from "../../../../shared/data/entities";

export async function fetchFavoritePokemonByIds(
  favoritePokemonIds: number[],
): Promise<Pokemon[]> {
  return Promise.all(favoritePokemonIds.map((pokemonId) => fetchPokemon(pokemonId)));
}
