import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { pokemonTypeColors } from '@/constants/colors';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { Card } from '@/src/shared/ui/components/card';
import { Tag } from '@/src/shared/ui/components/tag';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: () => void;
}

export const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
  // Formats the ID to look like this "#0 01"
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card>
        {/* Header: name and id */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {/* Capitalizes the first letter of the Pokemon's name */}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.id}>{formattedId}</Text>
        </View>

        {/* Pokemon image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokemon.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Pokemon types */}
        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <Tag key={type} label={type} color={pokemonTypeColors[type]} />
          ))}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.light.text,
  },
  id: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.light.icon,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
  },
  image: {
    width: 120,
    height: 120,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
