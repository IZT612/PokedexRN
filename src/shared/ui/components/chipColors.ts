import { getPokemonTypeColor, type PokemonType } from "../../../theme";

import { uiTokens } from "./tokens";

export type ChipColorOptions = {
  selected?: boolean;
  pokemonType?: PokemonType;
};

export function getChipColors({
  selected = false,
  pokemonType,
}: ChipColorOptions) {
  if (pokemonType) {
    const typeColor = getPokemonTypeColor(pokemonType);

    if (selected) {
      return {
        backgroundColor: typeColor,
        borderColor: typeColor,
        textColor: "#FFFFFF",
      };
    }

    return {
      backgroundColor: uiTokens.colors.surface,
      borderColor: typeColor,
      textColor: typeColor,
    };
  }

  if (selected) {
    return {
      backgroundColor: uiTokens.colors.chipSelected,
      borderColor: uiTokens.colors.chipSelected,
      textColor: "#FFFFFF",
    };
  }

  return {
    backgroundColor: uiTokens.colors.chipBackground,
    borderColor: "transparent",
    textColor: uiTokens.colors.textPrimary,
  };
}
