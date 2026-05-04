import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import type { Pokemon } from "../../../shared/data/entities";
import {
  Button,
  Card,
  Chip,
  ErrorMessage,
  LoadingSpinner,
  ThemeText,
  useAppTheme,
} from "../../../shared/ui";
import {
  getThemeColors,
  pokemonTypes,
  tokens,
  type AppThemeColors,
  type PokemonType as ThemePokemonType,
} from "../../../theme";
import { usePokemonDetailStore } from "../domain";
import { getStatFillRatio } from "./statUtils";

type PokemonDetailScreenProps = {
  pokemonId: number;
  onBack: () => void;
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

function formatHeight(value: number) {
  return `${(value / 10).toFixed(1)} m`;
}

function formatWeight(value: number) {
  return `${(value / 10).toFixed(1)} kg`;
}

function isThemePokemonType(value: string): value is ThemePokemonType {
  return pokemonTypes.includes(value as ThemePokemonType);
}

function getOrderedTypes(pokemon: Pokemon) {
  return [...pokemon.types].sort((left, right) => {
    const leftSlot = left.slot ?? Number.MAX_SAFE_INTEGER;
    const rightSlot = right.slot ?? Number.MAX_SAFE_INTEGER;

    return leftSlot - rightSlot;
  });
}

function getHeroColors(pokemon: Pokemon, colors: AppThemeColors) {
  const orderedTypes = getOrderedTypes(pokemon);
  const primaryType = orderedTypes[0]?.name;
  const secondaryType = orderedTypes[1]?.name;

  return {
    backgroundColor:
      primaryType && isThemePokemonType(primaryType)
        ? tokens.colors.types[primaryType]
        : colors.surface,
    borderColor:
      secondaryType && isThemePokemonType(secondaryType)
        ? tokens.colors.types[secondaryType]
        : colors.border,
  };
}

function StatRow({
  name,
  value,
  fillColor,
  labelColor,
  trackColor,
}: {
  name: string;
  value: number;
  fillColor: string;
  labelColor: string;
  trackColor: string;
}) {
  const ratio = getStatFillRatio(value);

  return (
    <View style={styles.statRow}>
      <View style={styles.statHeader}>
        <ThemeText style={[styles.statName, { color: labelColor }]}>
          {formatPokemonLabel(name)}
        </ThemeText>
        <ThemeText style={styles.statValue}>{value}</ThemeText>
      </View>
      <View style={[styles.statTrack, { backgroundColor: trackColor }]}>
        <View
          style={[
            styles.statFill,
            {
              width: `${ratio * 100}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

function PokemonHero({ pokemon }: { pokemon: Pokemon }) {
  const { colors } = useAppTheme();
  const imageUri =
    pokemon.sprites.official_artwork ?? pokemon.sprites.front_default;
  const heroColors = getHeroColors(pokemon, colors);

  return (
    <View
      style={[
        styles.hero,
        {
          backgroundColor: heroColors.backgroundColor,
          borderColor: heroColors.borderColor,
        },
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.heroFallback}>
          <ThemeText style={styles.heroFallbackText}>
            No image available
          </ThemeText>
        </View>
      )}
    </View>
  );
}

export function PokemonDetailScreen({
  pokemonId,
  onBack,
}: PokemonDetailScreenProps) {
  const { colors } = useAppTheme();
  const pokemon = usePokemonDetailStore((state) => state.pokemon);
  const loading = usePokemonDetailStore((state) => state.loading);
  const error = usePokemonDetailStore((state) => state.error);
  const favoritePokemonIds = usePokemonDetailStore(
    (state) => state.favoritePokemonIds,
  );
  const favoritePokemonIdsLoading = usePokemonDetailStore(
    (state) => state.favoritePokemonIdsLoading,
  );
  const favoritePokemonIdsSaving = usePokemonDetailStore(
    (state) => state.favoritePokemonIdsSaving,
  );
  const favoritePokemonIdsError = usePokemonDetailStore(
    (state) => state.favoritePokemonIdsError,
  );
  const loadPokemonDetail = usePokemonDetailStore(
    (state) => state.loadPokemonDetail,
  );
  const loadFavoritePokemonIds = usePokemonDetailStore(
    (state) => state.loadFavoritePokemonIds,
  );
  const toggleFavorite = usePokemonDetailStore((state) => state.toggleFavorite);

  useEffect(() => {
    void loadPokemonDetail(pokemonId);
  }, [loadPokemonDetail, pokemonId]);

  const isFavorite = favoritePokemonIds.includes(pokemonId);
  const orderedTypes = pokemon ? getOrderedTypes(pokemon) : [];
  const primaryType = orderedTypes[0]?.name;
  const fillColor =
    primaryType && isThemePokemonType(primaryType)
      ? tokens.colors.types[primaryType]
      : colors.primary;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Button label="← Back" variant="ghost" onPress={onBack} />
        <Button
          label={isFavorite ? "♥ Favorited" : "♡ Favorite"}
          variant={isFavorite ? "primary" : "secondary"}
          loading={favoritePokemonIdsLoading || favoritePokemonIdsSaving}
          onPress={() => {
            void toggleFavorite(pokemonId);
          }}
        />
      </View>

      {favoritePokemonIdsError ? (
        <View style={styles.favoriteErrorSection}>
          <ErrorMessage
            message={favoritePokemonIdsError.message}
            onRetry={() => {
              void loadFavoritePokemonIds();
            }}
          />
        </View>
      ) : null}

      {loading && !pokemon ? (
        <View style={styles.feedbackState}>
          <LoadingSpinner label="Loading pokemon details" size="large" />
        </View>
      ) : null}

      {!loading && error && !pokemon ? (
        <View style={styles.feedbackState}>
          <ErrorMessage
            message={error.message}
            onRetry={() => {
              void loadPokemonDetail(pokemonId);
            }}
          />
        </View>
      ) : null}

      {pokemon ? (
        <ScrollView contentContainerStyle={styles.content}>
          <PokemonHero pokemon={pokemon} />

          <View style={styles.titleRow}>
            <ThemeText style={styles.pokemonName}>
              {formatPokemonLabel(pokemon.name)}
            </ThemeText>
            <ThemeText
              style={[styles.pokemonId, { color: colors.textSecondary }]}
            >
              {formatPokemonId(pokemon.id)}
            </ThemeText>
          </View>

          <View style={styles.typeRow}>
            {orderedTypes.map((type) => (
              <Chip
                key={`${pokemon.id}-${type.name}`}
                label={formatPokemonLabel(type.name)}
                pokemonType={
                  isThemePokemonType(type.name) ? type.name : undefined
                }
              />
            ))}
          </View>

          <Card elevated style={styles.infoCard}>
            <ThemeText style={styles.sectionTitle}>Overview</ThemeText>
            <View style={styles.overviewGrid}>
              <View
                style={[
                  styles.overviewItem,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <ThemeText
                  style={[
                    styles.overviewLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Height
                </ThemeText>
                <ThemeText style={styles.overviewValue}>
                  {formatHeight(pokemon.height)}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.overviewItem,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <ThemeText
                  style={[
                    styles.overviewLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Weight
                </ThemeText>
                <ThemeText style={styles.overviewValue}>
                  {formatWeight(pokemon.weight)}
                </ThemeText>
              </View>
            </View>
          </Card>

          <Card elevated style={styles.infoCard}>
            <ThemeText style={styles.sectionTitle}>Abilities</ThemeText>
            <View style={styles.chipWrap}>
              {pokemon.abilities.map((ability) => (
                <Chip
                  key={`${pokemon.id}-${ability.name}`}
                  label={
                    ability.is_hidden
                      ? `${formatPokemonLabel(ability.name)} (Hidden)`
                      : formatPokemonLabel(ability.name)
                  }
                />
              ))}
            </View>
          </Card>

          <Card elevated style={styles.infoCard}>
            <ThemeText style={styles.sectionTitle}>Stats</ThemeText>
            <View style={styles.statsSection}>
              {pokemon.stats.map((stat) => (
                <StatRow
                  key={`${pokemon.id}-${stat.name}`}
                  name={stat.name}
                  value={stat.base_stat}
                  fillColor={fillColor}
                  labelColor={colors.textSecondary}
                  trackColor={colors.border}
                />
              ))}
            </View>
          </Card>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
    borderBottomWidth: 1,
  },
  content: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.lg,
  },
  feedbackState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.xl,
  },
  favoriteErrorSection: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.md,
  },
  hero: {
    width: "100%",
    minHeight: 280,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.lg,
  },
  heroImage: {
    width: "100%",
    height: 240,
  },
  heroFallback: {
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  heroFallbackText: {
    color: getThemeColors("light").white,
    fontWeight: tokens.typography.weights.semibold,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacing.md,
  },
  pokemonName: {
    flex: 1,
    fontSize: tokens.typography.sizes["2xl"],
    fontWeight: tokens.typography.weights.bold,
  },
  pokemonId: {
    fontWeight: tokens.typography.weights.semibold,
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing.sm,
  },
  infoCard: {
    gap: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.typography.sizes.lg,
    fontWeight: tokens.typography.weights.bold,
  },
  overviewGrid: {
    flexDirection: "row",
    gap: tokens.spacing.md,
  },
  overviewItem: {
    flex: 1,
    padding: tokens.spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    gap: tokens.spacing.xs,
  },
  overviewLabel: {
    fontSize: tokens.typography.sizes.sm,
  },
  overviewValue: {
    fontSize: tokens.typography.sizes.lg,
    fontWeight: tokens.typography.weights.semibold,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing.sm,
  },
  statsSection: {
    gap: tokens.spacing.md,
  },
  statRow: {
    gap: tokens.spacing.xs,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacing.md,
  },
  statName: {
    fontSize: tokens.typography.sizes.sm,
  },
  statValue: {
    fontWeight: tokens.typography.weights.semibold,
  },
  statTrack: {
    height: 12,
    borderRadius: 999,
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    borderRadius: 999,
  },
});
