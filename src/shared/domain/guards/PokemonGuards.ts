import { Pokemon } from '../entities/Pokemon';

export const isPokemon = (obj: any): obj is Pokemon => {
  let isPokemon =
    obj !== null &&
    typeof obj === 'object' &&
    'id' in obj &&
    typeof obj.id === 'number' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'image' in obj &&
    typeof obj.image === 'string' &&
    Array.isArray(obj.types) &&
    Array.isArray(obj.stats) &&
    Array.isArray(obj.abilities);

  return isPokemon;
};
