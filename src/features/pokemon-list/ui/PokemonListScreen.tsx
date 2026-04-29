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
import { usePokemonListStore } from "../domain";

function formatPokemonLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isThemePokemonType(value: string): value is ThemePokemonType {
  return pokemonTypes.includes(value as ThemePokemonType);
}

type PokemonListScreenProps = {
  onPokemonPress?: (pokemon: Pokemon) => void;
  onFavoritesPress?: () => void;
};

export function PokemonListScreen({
  onPokemonPress,
  onFavoritesPress,
}: PokemonListScreenProps) {
  const filteredPokemon = usePokemonListStore((state) => state.filteredPokemon);
  const typeOptions = usePokemonListStore((state) => state.typeOptions);
  const query = usePokemonListStore((state) => state.query);
  const selectedType = usePokemonListStore((state) => state.selectedType);
  const listLoading = usePokemonListStore((state) => state.listLoading);
  const nextBatchLoading = usePokemonListStore(
    (state) => state.nextBatchLoading,
  );
  const typeOptionsLoading = usePokemonListStore(
    (state) => state.typeOptionsLoading,
  );
  const error = usePokemonListStore((state) => state.error);
  const setQuery = usePokemonListStore((state) => state.setQuery);
  const setSelectedType = usePokemonListStore((state) => state.setSelectedType);
  const loadPokemonList = usePokemonListStore((state) => state.loadPokemonList);
  const loadNextPokemonBatch = usePokemonListStore(
    (state) => state.loadNextPokemonBatch,
  );
  const loadPokemonTypes = usePokemonListStore(
    (state) => state.loadPokemonTypes,
  );

  useEffect(() => {
    void loadPokemonList();
    void loadPokemonTypes();
  }, [loadPokemonList, loadPokemonTypes]);

  function handleTypePress(type: string) {
    setSelectedType(selectedType === type ? null : type);
  }

  function renderPokemonCard({ item }: ListRenderItemInfo<Pokemon>) {
    return (
      <PokemonCard
        pokemon={item}
        onPress={() => {
          onPokemonPress?.(item);
        }}
      />
    );
  }

  const showInitialLoading = listLoading && filteredPokemon.length === 0;
  const showEmptyState =
    !showInitialLoading && !error && filteredPokemon.length === 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ThemeText style={styles.headerTitle}>PokedexRN</ThemeText>
      </View>

      <View style={styles.filtersSection}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name"
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
          {typeOptionsLoading ? <LoadingSpinner label="Loading types" /> : null}
        </View>
      </View>

      <View style={styles.listSection}>
        {showInitialLoading ? (
          <View style={styles.centerContent}>
            <LoadingSpinner label="Loading pokemon" size="large" />
          </View>
        ) : (
          <FlatList
            data={filteredPokemon}
            renderItem={renderPokemonCard}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            onEndReached={() => {
              void loadNextPokemonBatch();
            }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              showEmptyState ? (
                <View style={styles.centerContent}>
                  <ThemeText style={styles.emptyStateText}>
                    There&apos;s no pokemon meeting your criteria.
                  </ThemeText>
                </View>
              ) : null
            }
            ListFooterComponent={
              <View style={styles.footerFeedback}>
                {nextBatchLoading ? (
                  <LoadingSpinner label="Loading more pokemon" />
                ) : null}
                {error ? (
                  <ErrorMessage
                    message={error.message}
                    onRetry={
                      filteredPokemon.length === 0
                        ? () => void loadPokemonList()
                        : undefined
                    }
                  />
                ) : null}
              </View>
            }
          />
        )}
      </View>

      <View style={styles.bottomSection}>
        <Button label="Home" variant="primary" />
        <Button
          label="Favorites"
          variant="secondary"
          disabled={!onFavoritesPress}
          onPress={onFavoritesPress}
        />
      </View>
    </View>
  );
}

function PokemonCard({
  pokemon,
  onPress,
}: {
  pokemon: Pokemon;
  onPress: () => void;
}) {
  return <PokemonSummaryCard pokemon={pokemon} onPress={onPress} />;
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
  footerFeedback: {
    gap: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.xl,
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
