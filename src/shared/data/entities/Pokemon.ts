import type { PokemonType } from './PokemonType';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    official_artwork: string | null;
    front_default: string | null;
  };
  types: PokemonType[];
  stats: Array<{
    name: string;
    base_stat: number;
  }>;
  abilities: Array<{
    name: string;
    is_hidden: boolean;
  }>;
  weight: number;
  height: number;
}
