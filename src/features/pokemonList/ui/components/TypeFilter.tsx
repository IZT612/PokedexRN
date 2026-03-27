import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { XStack } from 'tamagui';

import { usePokemonListStore } from '@/app/store';
import { pokemonTypeColors } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import { PokemonType } from '@/src/shared/domain/entities/PokemonType';
import { Tag } from '@/src/shared/ui/components/tag';

const POKEMON_TYPES: PokemonType[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

// Connect the typeFilter to the store
export const TypeFilter = () => {
  const selectedType = usePokemonListStore((state) => state.selectedType);
  const setSelectedType = usePokemonListStore((state) => state.setSelectedType);

  // Handles the toggles of types (Only one at a time for now)
  const toggleType = (type: PokemonType) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  // Get the color of the type
  const getTypeColor = (type: PokemonType) => {
    return pokemonTypeColors[type];
  };

  return (
    <XStack width="100%" paddingVertical={Spacing.sm}>
      {/* Horizontal slider, doesn't show the slider bar*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.md,
          gap: Spacing.sm,
        }}
      >
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedType === type;
          // If there's no type selected or is the type selected opacity will be 100%, else it will be 40%
          const opacity = selectedType === null || isSelected ? 1 : 0.4;

          return (
            <TouchableOpacity
              key={type}
              activeOpacity={0.7}
              onPress={() => toggleType(type)}
              style={{ opacity }}
            >
              <Tag label={type} color={getTypeColor(type)} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </XStack>
  );
};
