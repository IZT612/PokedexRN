import React from 'react';
import { Image, TouchableOpacity, useColorScheme } from 'react-native';

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
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      <Card>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom={Spacing.sm}
        >
          <H3 color={themeColors.text}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </H3>
          <Text fontSize={Typography.fontSize.xs} color={themeColors.icon}>
            {formattedId}
          </Text>
        </XStack>

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

        <XStack
          justifyContent="center"
          flexWrap="wrap"
          gap={Spacing.sm}
          marginTop={Spacing.sm}
        >
          {pokemon.types.map((type) => (
            <Tag
              key={type}
              label={type}
              color={pokemonTypeColors[type] ?? themeColors.icon}
            />
          ))}
        </XStack>
      </Card>
    </TouchableOpacity>
  );
};
