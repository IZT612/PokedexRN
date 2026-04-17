import {
  brandColors,
  getPokemonTypeColor,
  pokemonTypeColors,
  spacing,
  tokens,
  typography,
} from './src/theme';

const colorTokens = {
  ...brandColors,
  ...pokemonTypeColors,
} as const;

const sizeTokens = {
  none: spacing.none,
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  '2xl': spacing['2xl'],
  '3xl': spacing['3xl'],
} as const;

export const tamaguiConfig = {
  tokens: {
    color: colorTokens,
    size: sizeTokens,
    space: sizeTokens,
  },
  themes: {
    light: {
      background: brandColors.background,
      color: brandColors.textPrimary,
      surface: brandColors.surface,
      borderColor: brandColors.border,
      primary: brandColors.primary,
      secondary: brandColors.secondary,
    },
  },
  fonts: {
    body: {
      family: typography.fontFamily,
      size: typography.sizes,
      weight: typography.weights,
      lineHeight: typography.lineHeights,
    },
  },
} as const;

export { brandColors, getPokemonTypeColor, pokemonTypeColors, spacing, tokens, typography };

export default tamaguiConfig;
