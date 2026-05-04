import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getPokemonTypeColor, type PokemonType, tokens } from "../../theme";
import { useAppTheme } from "./TamaguiAppProvider";

type TypeBadgeProps = {
  type: PokemonType;
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.badge, { backgroundColor: getPokemonTypeColor(type) }]}
    >
      <Text style={[styles.text, { color: colors.white }]}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
  },
  text: {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.sm,
    fontWeight: tokens.typography.weights.semibold,
    textTransform: "capitalize",
  },
});
