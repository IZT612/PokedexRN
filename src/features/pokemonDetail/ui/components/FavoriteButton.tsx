import { brandColors } from '@/constants/colors';
import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useFavoritesStore } from '@/src/shared/ui/store/FavoritesStore';
import { Heart } from '@tamagui/lucide-icons-2';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';

interface FavoriteButtonProps {
  pokemonId: string | number;
}

export const FavoriteButton = ({ pokemonId }: FavoriteButtonProps) => {
  const colorScheme = useColorScheme() ?? 'light';

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isPokemonFavorite = useFavoritesStore((state) =>
    state.isFavorite(pokemonId),
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => toggleFavorite(pokemonId)}
      style={{ padding: Spacing.sm }}
    >
      <Heart
        size={Sizes.icon.md}
        color={
          isPokemonFavorite ? brandColors.favoriteRed : Colors[colorScheme].icon
        }
        fill={isPokemonFavorite ? brandColors.favoriteRed : 'transparent'}
      />
    </TouchableOpacity>
  );
};
