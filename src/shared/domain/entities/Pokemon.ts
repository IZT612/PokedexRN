import { PokemonType } from './PokemonType';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  stats: PokemonStat[];

  // It's a string arrary to only display the names of the abilities, in the future,
  // if we wanted to display full information of the abilities too we would have to change this, smiliar to the stats.
  abilities: string[];
}

export interface PokemonStat {
  name: string;
  value: number;
}
