import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { pokemonTypeColors } from '@/constants/colors';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { Card } from '@/src/shared/ui/components/card';
import { Tag } from '@/src/shared/ui/components/tag';
import { H3, Text, XStack, YStack } from 'tamagui';

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
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom={Spacing.sm}
        >
          <H3>
            {/* Capitalizes the first letter of the Pokemon's name */}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </H3>
          <Text fontSize={Typography.fontSize.xs} color={Colors.light.icon}>
            {formattedId}
          </Text>
        </XStack>

        {/* Pokemon image */}
        <YStack
          alignItems="center"
          justifyContent="center"
          marginVertical={Spacing.sm}
        >
          <Image
            source={{ uri: pokemon.image }}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </YStack>

        {/* Pokemon types */}
        <XStack
          justifyContent="center"
          flexWrap="wrap"
          gap={Spacing.sm}
          marginTop={Spacing.sm}
        >
          {pokemon.types.map((type) => (
            <Tag key={type} label={type} color={pokemonTypeColors[type]} />
          ))}
        </XStack>
      </Card>
    </TouchableOpacity>
  );
};
