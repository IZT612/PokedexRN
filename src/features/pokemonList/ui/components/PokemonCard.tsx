import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { pokemonTypeColors } from '../../../../../constants/colors';
import { Colors, Spacing } from '../../../../../constants/theme';
import { Pokemon } from '../../../../shared/domain/entities/Pokemon';
import { Card } from '../../../../shared/ui/components/card';
import { Tag } from '../../../../shared/ui/components/tag';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: () => void;
}

export const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
  // Formats the ID to look like this "#001"
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card>
        {/* Header: name and id */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {/* Captializes the first letter of the Pokemon's name */}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  id: {
    fontSize: 14,
    fontWeight: '600',
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
    gap: 8,
    marginTop: Spacing.sm,
  },
});
