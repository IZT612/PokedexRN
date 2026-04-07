import React, { useEffect, useState } from 'react';
import { XStack } from 'tamagui';

import { Button } from '@/src/shared/ui/components/button';
import { SearchInput } from '@/src/shared/ui/components/searchInput';

import { usePokemonListStore } from '@/app/store';
import { Spacing } from '@/constants/theme';

export const SearchBar = () => {
  const globalQuery = usePokemonListStore((state) => state.searchQuery);
  const setSearchQuery = usePokemonListStore((state) => state.setSearchQuery);

  const [localQuery, setLocalQuery] = useState(globalQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [localQuery, setSearchQuery]);

  useEffect(() => {
    setLocalQuery(globalQuery);
  }, [globalQuery]);

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
