import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import type { Pokemon } from "../../../shared/data/entities";
import {
  Button,
  Card,
  Chip,
  ErrorMessage,
  LoadingSpinner,
  SearchInput,
  ThemeText,
} from "../../../shared/ui";
import { pokemonTypes, tokens, type PokemonType as ThemePokemonType } from "../../../theme";
import { usePokemonListStore } from "../domain";

function formatPokemonId(id: number) {
  return `#${String(id).padStart(4, "0")}`;
}

function formatPokemonLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isThemePokemonType(value: string): value is ThemePokemonType {
  return pokemonTypes.includes(value as ThemePokemonType);
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card elevated style={styles.card}>
      <View style={styles.cardHeader}>
        <ThemeText style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</ThemeText>
      </View>
      {pokemon.sprites.official_artwork ? (
        <Image
          source={{ uri: pokemon.sprites.official_artwork }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <ThemeText style={styles.imagePlaceholderText}>No image</ThemeText>
        </View>
      )}
      <ThemeText style={styles.pokemonName}>{formatPokemonLabel(pokemon.name)}</ThemeText>
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

export function PokemonListScreen() {
  const filteredPokemon = usePokemonListStore((state) => state.filteredPokemon);
  const typeOptions = usePokemonListStore((state) => state.typeOptions);
  const query = usePokemonListStore((state) => state.query);
  const selectedType = usePokemonListStore((state) => state.selectedType);
  const listLoading = usePokemonListStore((state) => state.listLoading);
  const nextBatchLoading = usePokemonListStore((state) => state.nextBatchLoading);
  const typeOptionsLoading = usePokemonListStore(
    (state) => state.typeOptionsLoading,
  );
  const error = usePokemonListStore((state) => state.error);
  const setQuery = usePokemonListStore((state) => state.setQuery);
  const setSelectedType = usePokemonListStore(
    (state) => state.setSelectedType,
  );
  const loadPokemonList = usePokemonListStore((state) => state.loadPokemonList);
  const loadNextPokemonBatch = usePokemonListStore(
    (state) => state.loadNextPokemonBatch,
  );
  const loadPokemonTypes = usePokemonListStore((state) => state.loadPokemonTypes);

  useEffect(() => {
    void loadPokemonList();
    void loadPokemonTypes();
  }, [loadPokemonList, loadPokemonTypes]);

  function handleTypePress(type: string) {
    setSelectedType(selectedType === type ? null : type);
  }

  function renderPokemonCard({ item }: ListRenderItemInfo<Pokemon>) {
    return <PokemonCard pokemon={item} />;
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
          {typeOptionsLoading ? (
            <LoadingSpinner label="Loading types" />
          ) : null}
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
                    onRetry={filteredPokemon.length === 0 ? () => void loadPokemonList() : undefined}
                  />
                ) : null}
              </View>
            }
          />
        )}
      </View>

      <View style={styles.bottomSection}>
        <Button label="Home" variant="primary" />
        <Button label="Favorites" variant="secondary" disabled />
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
  card: {
    gap: tokens.spacing.md,
  },
  cardHeader: {
    alignItems: "flex-end",
  },
  pokemonId: {
    color: tokens.colors.textSecondary,
    fontWeight: tokens.typography.weights.semibold,
  },
  pokemonImage: {
    width: "100%",
    height: 160,
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 16,
    backgroundColor: tokens.colors.background,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    color: tokens.colors.textSecondary,
  },
  pokemonName: {
    fontSize: tokens.typography.sizes.xl,
    fontWeight: tokens.typography.weights.bold,
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing.sm,
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
    gap: tokens.spacing.md,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.surface,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
});
