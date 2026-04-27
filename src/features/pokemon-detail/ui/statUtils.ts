export const MAX_POKEMON_STAT_VALUE = 255;

export function getStatFillRatio(value: number) {
  if (value <= 0) {
    return 0;
  }

  if (value >= MAX_POKEMON_STAT_VALUE) {
    return 1;
  }

  return value / MAX_POKEMON_STAT_VALUE;
}
