import { usePokemonListStore } from '@/app/store';
import { brandColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { SearchBar } from '@/src/features/pokemonList/ui/components/SearchBar';
import { TypeFilter } from '@/src/features/pokemonList/ui/components/TypeFilter';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { LoadingSpinner } from '@/src/shared/ui/components/loadingSpinner';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Platform, SafeAreaView } from 'react-native';
import { H1, Paragraph, View, YStack } from 'tamagui';
import { PokemonCard } from '../components/PokemonCard';

const keyExtractor = (item: Pokemon) => item.id.toString();
const ItemSeparator = () => <View height={Spacing.md} />;

export const ListScreen = () => {
  const state = usePokemonListStore();

  const { loadPokemons, loading, error, hasMore } = usePokemonListStore();

  // Get the filtered list, even if no filters are being used, it will show the normal pokemon list
  const filteredList = state.getFilteredPokemon();

  // Effect to load pokemons when loading the app for the first time
  useEffect(() => {
    if (usePokemonListStore.getState().pokemonList.length === 0) {
      loadPokemons();
    }
  }, [loadPokemons]);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => <PokemonCard pokemon={item} />,
    [],
  );

  const loadMore = useCallback(() => {
    if (filteredList.length > 0 && !loading && hasMore) {
      loadPokemons();
    }
  }, [filteredList.length, loading, hasMore, loadPokemons]);

  const renderEmptyComponent = useCallback(() => {
    if (loading) return null;
    return (
      <Paragraph fontStyle="italic" color="$color11" textAlign="center">
        {error ? `Error: ${error}` : 'No Pokemons found.'}
      </Paragraph>
    );
  }, [loading, error]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: brandColors.backgroundLight }}
    >
      <YStack
        flex={1}
        width="100%"
        maxWidth={1200}
        alignSelf="center"
        paddingHorizontal={Spacing.md}
      >
        <YStack
          paddingTop={Platform.OS === 'android' ? 40 : Spacing.lg}
          paddingBottom={Spacing.lg}
          borderBottomWidth={1}
          borderBottomColor={brandColors.borderLight}
          marginBottom={Spacing.md}
        >
          <H1 color={brandColors.primaryRed}>Pokédex</H1>
        </YStack>
        <YStack flex={1}>
          {/* Filters and search container */}
          <YStack
            marginBottom={Spacing.md}
            padding={Spacing.md}
            backgroundColor={brandColors.surfaceLight}
            borderRadius={BorderRadius.md}
            {...Shadows.base}
          >
            <SearchBar />
            <TypeFilter />
          </YStack>
          {/* List container */}
          <YStack
            flex={1}
            backgroundColor={brandColors.surfaceLight}
            borderRadius={BorderRadius.md}
            {...Shadows.base}
            overflow={Platform.OS === 'ios' ? 'visible' : 'hidden'}
          >
            <FlatList
              data={filteredList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: Spacing.md }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <LoadingSpinner /> : null}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
              onEndReached={loadMore}
              ListEmptyComponent={renderEmptyComponent}
            />
          </YStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};
