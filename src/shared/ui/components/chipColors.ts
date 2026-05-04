import {
  getThemeColors,
  getPokemonTypeColor,
  type AppThemeColors,
  type PokemonType,
} from "../../../theme";

export type ChipColorOptions = {
  selected?: boolean;
  pokemonType?: PokemonType;
  colors?: AppThemeColors;
};

export function getChipColors({
  selected = false,
  pokemonType,
  colors = getThemeColors("light"),
}: ChipColorOptions) {
  if (pokemonType) {
    const typeColor = getPokemonTypeColor(pokemonType);

    if (selected) {
      return {
        backgroundColor: typeColor,
        borderColor: typeColor,
        textColor: colors.white,
      };
    }

    return {
      backgroundColor: colors.surface,
      borderColor: typeColor,
      textColor: typeColor,
    };
  }

  if (selected) {
    return {
      backgroundColor: colors.chipSelected,
      borderColor: colors.chipSelected,
      textColor: colors.white,
    };
  }

  return {
    backgroundColor: colors.chipBackground,
    borderColor: "transparent",
    textColor: colors.textPrimary,
  };
}
