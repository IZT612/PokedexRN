import React, { useEffect, useState } from 'react';
import { XStack } from 'tamagui';

import { Button } from '@/src/shared/ui/components/button';
import { SearchInput } from '@/src/shared/ui/components/searchInput';

import { usePokemonListStore } from '@/app/store';
import { Spacing } from '@/constants/theme';

export const SearchBar = () => {
  // Connection with the store
  const globalQuery = usePokemonListStore((state) => state.searchQuery);
  const setSearchQuery = usePokemonListStore((state) => state.setSearchQuery);

  // Local query for the input with debounce to not update the store on every keystroke
  const [localQuery, setLocalQuery] = useState(globalQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [localQuery, setSearchQuery]);

  // Use effect to update the local query if for some reason the global query changes
  useEffect(() => {
    setLocalQuery(globalQuery);
  }, [globalQuery]);

  // Clear button
  const clearQuery = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <XStack
      alignItems="center"
      width="100%"
      paddingHorizontal={Spacing.md}
      paddingVertical={Spacing.xs}
      gap={Spacing.sm}
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
