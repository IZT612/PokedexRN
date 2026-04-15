import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getPokemonTypeColor, type PokemonType, tokens } from '../../theme';

type TypeBadgeProps = {
  type: PokemonType;
};

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: getPokemonTypeColor(type) }]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
  },
  text: {
    color: tokens.colors.surface,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.sm,
    fontWeight: tokens.typography.weights.semibold,
    textTransform: 'capitalize',
  },
});
