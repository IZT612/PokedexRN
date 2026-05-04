import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PokemonType } from "../../../theme";
import { getChipColors } from "./chipColors";
import { uiTokens, useUiTokens } from "./tokens";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  pokemonType?: PokemonType;
};

export function Chip({
  label,
  selected = false,
  onPress,
  pokemonType,
}: ChipProps) {
  const themedTokens = useUiTokens();
  const colors = getChipColors({
    selected,
    pokemonType,
    colors: themedTokens.colors,
  });

  const content = (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
      ]}
    >
      <Text style={[styles.label, { color: colors.textColor }]}>{label}</Text>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
}

const styles = StyleSheet.create({
  base: {
    minHeight: 32,
    paddingHorizontal: uiTokens.spacing.md,
    borderRadius: uiTokens.radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  label: {
    fontSize: uiTokens.typography.sizes.sm,
    fontWeight: uiTokens.typography.weights.semibold,
  },
});
