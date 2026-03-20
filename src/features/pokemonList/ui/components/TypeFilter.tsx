import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { XStack } from 'tamagui';

import { Tag } from '@/src/shared/ui/components/tag';
import { pokemonTypeColors } from '../../../../../constants/colors';
import { PokemonType } from '../../../../shared/domain//entities/PokemonType';
import { usePokemonListStore } from '../store/pokemonListStore';

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
  const ToggleType = (type: PokemonType) => {
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
    <XStack width="100%" paddingVertical={8}>
      {/* Horizontal slider, doesn't show the slider bar*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedType === type;
          // If there's no type selected or is the type selected opacity will be 100%, else it will be 40%
          const opacity = selectedType === null || isSelected ? 1 : 0.4;

          return (
            <TouchableOpacity
              key={type}
              activeOpacity={0.7}
              onPress={() => ToggleType(type)}
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

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 12, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: { fontSize: 14, fontWeight: '600' },
});
