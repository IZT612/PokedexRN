import { usePokemonListStore } from '@/app/store';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme'; // Importa Colors
import { SearchBar } from '@/src/features/pokemonList/ui/components/SearchBar';
import { TypeFilter } from '@/src/features/pokemonList/ui/components/TypeFilter';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { LoadingSpinner } from '@/src/shared/ui/components/loadingSpinner';
import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native'; // Importa useColorScheme
import { H1, Paragraph, View, YStack } from 'tamagui';
import { PokemonCard } from '../components/PokemonCard';

const keyExtractor = (item: Pokemon) => item.id.toString();
const ItemSeparator = () => <View height={Spacing.md} />;

export const ListScreen = () => {
  const { loadPokemons, loading, error, hasMore, filteredList, pokemonList } =
    usePokemonListStore();

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  useEffect(() => {
    if (pokemonList.length === 0) {
      loadPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => <PokemonCard pokemon={item} />,
    [],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadPokemons();
    }
  }, [loading, hasMore, loadPokemons]);

  const renderEmptyComponent = useCallback(() => {
    if (loading) return null;

    return (
      <Paragraph fontStyle="italic" color={themeColors.text} textAlign="center">
        {error ? `Error: ${error}` : 'No Pokemons found.'}
      </Paragraph>
    );
  }, [loading, error, themeColors.text]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <YStack
        flex={1}
        width="100%"
        maxWidth={1200}
        alignSelf="center"
        paddingHorizontal={Spacing.md}
      >
        <YStack
          paddingTop={
            Platform.OS === 'android' ? StatusBar.currentHeight : Spacing.lg
          }
          paddingBottom={Spacing.lg}
          borderBottomWidth={1}
          borderBottomColor={themeColors.border}
          marginBottom={Spacing.md}
        >
          <H1 color={themeColors.primaryRed}>Pokédex</H1>
        </YStack>

        <YStack flex={1}>
          <YStack
            marginBottom={Spacing.md}
            padding={Spacing.md}
            backgroundColor={themeColors.surface}
            borderRadius={BorderRadius.md}
            {...Shadows.base}
          >
            <SearchBar />
            <TypeFilter />
          </YStack>

          <YStack
            flex={1}
            backgroundColor={themeColors.surface}
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
