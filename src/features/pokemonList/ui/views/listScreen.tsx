import { usePokemonListStore } from '@/app/store';
import { brandColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/theme';
import { SearchBar } from '@/src/features/pokemonList/ui/components/SearchBar';
import { TypeFilter } from '@/src/features/pokemonList/ui/components/TypeFilter';
import { LoadingSpinner } from '@/src/shared/ui/components/loadingSpinner';
import { PlaceHolder, Title } from '@/src/shared/ui/components/TextPresets';
import React, { useEffect, useMemo } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { PokemonCard } from '../components/PokemonCard';

export const ListScreen = () => {
  const loadPokemons = usePokemonListStore((state) => state.loadPokemons);
  const getFilteredPokemon = usePokemonListStore(
    (state) => state.getFilteredPokemon,
  );

  const loading = usePokemonListStore((state) => state.loading);
  const error = usePokemonListStore((state) => state.error);
  const pokemonList = usePokemonListStore((state) => state.pokemonList);
  const searchQuery = usePokemonListStore((state) => state.searchQuery);
  const selectedType = usePokemonListStore((state) => state.selectedType);

  // Get the filtered list, even if no filters are being used, it will show the normal pokemon list
  const filteredList = useMemo(() => {
    return getFilteredPokemon(pokemonList, searchQuery, selectedType);
  }, [getFilteredPokemon, pokemonList, searchQuery, selectedType]);

  // Effect to load pokemons when loading the app for the first time
  useEffect(() => {
    if (pokemonList.length === 0) {
      loadPokemons();
    }
  }, [loadPokemons, pokemonList.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Title>Pokédex</Title>
        </View>
        <View style={styles.mainContent}>
          {/* Filters and search container */}
          <View style={styles.filtersContainer}>
            <SearchBar />
            <TypeFilter />
          </View>
          {/* List container */}
          <View style={styles.listContainer}>
            <FlatList
              data={filteredList}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              // For each item in the filtered list, render a PokemonCard with that data, no onPress function YET
              renderItem={({ item }) => (
                <PokemonCard pokemon={item} onPress={() => {}} />
              )}
              contentContainerStyle={styles.flatListContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: Spacing.md }} />
              )}
              // When reached the end of the current list, load more Pokemons
              onEndReached={() => {
                if (filteredList.length > 0) {
                  loadPokemons();
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <LoadingSpinner /> : null}
              ListEmptyComponent={
                !loading ? (
                  <PlaceHolder>
                    {error ? `Error: ${error}` : 'No Pokemons found.'}
                  </PlaceHolder>
                ) : null
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brandColors.backgroundLight,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
  },
  header: {
    // Other Spacing tokens are way too far from 40 to replace it for any of the tokens
    paddingTop: Platform.OS === 'android' ? 40 : Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: Spacing.md,
  },
  mainContent: {
    flex: 1,
  },
  filtersContainer: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: brandColors.surfaceLight,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: BorderRadius.xs,
    elevation: 2,
  },
  listContainer: {
    flex: 1,
    backgroundColor: brandColors.surfaceLight,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: BorderRadius.xs,
    elevation: 2,
    overflow: 'hidden',
  },
  flatListContent: {
    padding: Spacing.md,
  },
  loader: {
    marginVertical: Spacing.lg,
  },
});
