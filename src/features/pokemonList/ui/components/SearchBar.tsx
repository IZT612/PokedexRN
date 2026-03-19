import React, { useEffect, useState } from 'react';
import { XStack } from 'tamagui';

import { Button } from '../../../../shared/ui/components/button';
import { SearchInput } from '../../../../shared/ui/components/searchInput';

import { usePokemonListStore } from '../store/pokemonListStore';

export const SearchBar = () => {
  // Connection with the store
  const globalQuery = usePokemonListStore((state) => state.searchQuery);
  const setSearchQuery = usePokemonListStore((state) => state.setSearchQuery);

  // Local query for the input with debounce to not update the store on every keystroke
  const [localQuery, setLocalQuery] = useState(globalQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(localQuery);
      console.log('Stored:', localQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [localQuery, setSearchQuery]);

  // Clear button
  const clearQuery = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <XStack
      alignItems="center"
      width="100%"
      paddingHorizontal={12}
      paddingVertical={4}
      gap={8}
    >
      <XStack flex={1}>
        <SearchInput
          placeholder="Search Pokemon..."
          value={localQuery}
          onChangeText={setLocalQuery}
        />
      </XStack>

      {localQuery.length > 0 && (
        <Button title="X" onPress={clearQuery} variant="primary" />
      )}
    </XStack>
  );
};
