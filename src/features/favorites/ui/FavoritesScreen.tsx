import React, { useEffect } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import type { Pokemon } from "../../../shared/data/entities";
import {
  Button,
  Chip,
  ErrorMessage,
  LoadingSpinner,
  PokemonSummaryCard,
  SearchInput,
  ThemeText,
} from "../../../shared/ui";
import {
  pokemonTypes,
  tokens,
  type PokemonType as ThemePokemonType,
} from "../../../theme";
import { useFavoritesStore } from "../domain";

type FavoritesScreenProps = {
  favoritePokemonIds: number[];
  favoritePokemonIdsLoading: boolean;
  favoritePokemonIdsError: Error | null;
  onRetryFavoritePokemonIdsLoad: () => void;
  onPokemonPress?: (pokemon: Pokemon) => void;
  onHomePress?: () => void;
};

function formatPokemonLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isThemePokemonType(value: string): value is ThemePokemonType {
  return pokemonTypes.includes(value as ThemePokemonType);
}

export function FavoritesScreen({
  favoritePokemonIds,
  favoritePokemonIdsLoading,
  favoritePokemonIdsError,
  onRetryFavoritePokemonIdsLoad,
  onPokemonPress,
  onHomePress,
}: FavoritesScreenProps) {
  const filteredPokemon = useFavoritesStore((state) => state.filteredPokemon);
  const typeOptions = useFavoritesStore((state) => state.typeOptions);
  const query = useFavoritesStore((state) => state.query);
  const selectedType = useFavoritesStore((state) => state.selectedType);
  const loading = useFavoritesStore((state) => state.loading);
  const error = useFavoritesStore((state) => state.error);
  const setQuery = useFavoritesStore((state) => state.setQuery);
  const setSelectedType = useFavoritesStore((state) => state.setSelectedType);
  const syncFavoritePokemonIds = useFavoritesStore(
    (state) => state.syncFavoritePokemonIds,
  );

  useEffect(() => {
    void syncFavoritePokemonIds(favoritePokemonIds);
  }, [favoritePokemonIds, syncFavoritePokemonIds]);

  function renderPokemonCard({ item }: ListRenderItemInfo<Pokemon>) {
    return (
      <PokemonSummaryCard
        pokemon={item}
        onPress={() => {
          onPokemonPress?.(item);
        }}
      />
    );
  }

  function handleTypePress(type: string) {
    setSelectedType(selectedType === type ? null : type);
  }

  const showInitialLoading =
    (favoritePokemonIdsLoading || loading) && filteredPokemon.length === 0;
  const resolvedError = favoritePokemonIdsError ?? error;
  const showEmptyState =
    !showInitialLoading && !resolvedError && filteredPokemon.length === 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ThemeText style={styles.headerTitle}>Favorites</ThemeText>
      </View>

      <View style={styles.filtersSection}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search favorites by name"
        />
        <View style={styles.typeFilterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeFilterScroll}
          >
            {typeOptions.map((type) => (
              <Chip
                key={type.name}
                label={formatPokemonLabel(type.name)}
                selected={selectedType === type.name}
                onPress={() => handleTypePress(type.name)}
                pokemonType={
                  isThemePokemonType(type.name) ? type.name : undefined
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.listSection}>
        {showInitialLoading ? (
          <View style={styles.centerContent}>
            <LoadingSpinner label="Loading favorites" size="large" />
          </View>
        ) : (
          <FlatList
            data={filteredPokemon}
            renderItem={renderPokemonCard}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              showEmptyState ? (
                <View style={styles.centerContent}>
                  <ThemeText style={styles.emptyStateText}>
                    You haven&apos;t favorited any pokemon yet.
                  </ThemeText>
                </View>
              ) : null
            }
            ListFooterComponent={
              resolvedError ? (
                <View style={styles.footerFeedback}>
                  <ErrorMessage
                    message={resolvedError.message}
                    onRetry={() => {
                      if (favoritePokemonIdsError) {
                        onRetryFavoritePokemonIdsLoad();
                        return;
                      }

                      void syncFavoritePokemonIds(favoritePokemonIds);
                    }}
                  />
                </View>
              ) : null
            }
          />
        )}
      </View>

      <View style={styles.bottomSection}>
        <Button label="Home" variant="secondary" onPress={onHomePress} />
        <Button label="Favorites" variant="primary" disabled />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    paddingTop: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
    backgroundColor: tokens.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  headerTitle: {
    fontSize: tokens.typography.sizes["2xl"],
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.primary,
  },
  filtersSection: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
    backgroundColor: tokens.colors.surface,
    gap: tokens.spacing.md,
  },
  typeFilterSection: {
    gap: tokens.spacing.sm,
  },
  typeFilterScroll: {
    gap: tokens.spacing.sm,
    paddingRight: tokens.spacing.lg,
  },
  listSection: {
    flex: 1,
  },
  listContent: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    flexGrow: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.xl,
  },
  emptyStateText: {
    color: tokens.colors.textSecondary,
    textAlign: "center",
  },
  footerFeedback: {
    gap: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.xl,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.md,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.surface,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
});
