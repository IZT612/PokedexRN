import React from "react";
import { Image, StyleSheet, View } from "react-native";

import type { Pokemon } from "../data/entities";
import {
  pokemonTypes,
  tokens,
  type PokemonType as ThemePokemonType,
} from "../../theme";
import { Card } from "./components/Card";
import { Chip } from "./components/Chip";
import { useAppTheme } from "./TamaguiAppProvider";
import { ThemeText } from "./ThemeText";

export type PokemonSummaryCardProps = {
  pokemon: Pokemon;
  onPress?: () => void;
};

function formatPokemonId(id: number) {
  return `#${String(id).padStart(4, "0")}`;
}

function formatPokemonLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isThemePokemonType(value: string): value is ThemePokemonType {
  return pokemonTypes.includes(value as ThemePokemonType);
}

export function PokemonSummaryCard({
  pokemon,
  onPress,
}: PokemonSummaryCardProps) {
  const { colors } = useAppTheme();

  return (
    <Card elevated style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <ThemeText style={[styles.pokemonId, { color: colors.textSecondary }]}>
          {formatPokemonId(pokemon.id)}
        </ThemeText>
      </View>
      {pokemon.sprites.official_artwork ? (
        <Image
          source={{ uri: pokemon.sprites.official_artwork }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.imagePlaceholder,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemeText
            style={[
              styles.imagePlaceholderText,
              { color: colors.textSecondary },
            ]}
          >
            No image
          </ThemeText>
        </View>
      )}
      <ThemeText style={styles.pokemonName}>
        {formatPokemonLabel(pokemon.name)}
      </ThemeText>
      <View style={styles.typeRow}>
        {pokemon.types.map((type) => (
          <Chip
            key={`${pokemon.id}-${type.name}`}
            label={formatPokemonLabel(type.name)}
            pokemonType={isThemePokemonType(type.name) ? type.name : undefined}
          />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: tokens.spacing.md,
  },
  cardHeader: {
    alignItems: "flex-end",
  },
  pokemonId: {
    fontWeight: tokens.typography.weights.semibold,
  },
  pokemonImage: {
    width: "100%",
    height: 160,
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {},
  pokemonName: {
    fontSize: tokens.typography.sizes.xl,
    fontWeight: tokens.typography.weights.bold,
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing.sm,
  },
});
