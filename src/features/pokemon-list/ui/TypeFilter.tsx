import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getPokemonTypeColor, pokemonTypes, tokens, type PokemonType } from '../../../theme';

type TypeFilterProps = {
  value?: PokemonType;
  onChange?: (type: PokemonType) => void;
};

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <View style={styles.row}>
      {pokemonTypes.map((type) => {
        const selected = value === type;
        return (
          <Pressable
            key={type}
            onPress={() => onChange?.(type)}
            style={[
              styles.pill,
              selected && styles.pillSelected,
              { borderColor: selected ? getPokemonTypeColor(type) : tokens.colors.border },
            ]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{type}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
    backgroundColor: tokens.colors.surface,
  },
  pillSelected: {
    backgroundColor: tokens.colors.primary,
  },
  label: {
    color: tokens.colors.textPrimary,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.sm,
    textTransform: 'capitalize',
  },
  labelSelected: {
    color: tokens.colors.surface,
  },
});
