import { createFont, createTamagui, createTokens } from "tamagui";

import {
  brandColors,
  getPokemonTypeColor,
  pokemonTypeColors,
  spacing,
  tokens,
  typography,
} from "./src/theme";

const colorTokens = {
  ...brandColors,
  ...pokemonTypeColors,
  success: "#16A34A",
  successSoft: "#DCFCE7",
  danger: "#DC2626",
  dangerSoft: "#FEE2E2",
  chipSelected: brandColors.textPrimary,
  chipBackground: "#E5E7EB",
  mutedSurface: "#F3F4F6",
} as const;

const sizeTokens = {
  none: spacing.none,
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  "2xl": spacing["2xl"],
  "3xl": spacing["3xl"],
  true: spacing.lg,
} as const;

const radiusTokens = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
  true: 12,
} as const;

const zIndexTokens = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
} as const;

const bodyFont = createFont({
  family: typography.fontFamily,
  size: {
    xs: typography.sizes.xs,
    sm: typography.sizes.sm,
    md: typography.sizes.md,
    lg: typography.sizes.lg,
    xl: typography.sizes.xl,
    "2xl": typography.sizes["2xl"],
    true: typography.sizes.md,
  },
  lineHeight: {
    xs: typography.sizes.xs * typography.lineHeights.normal,
    sm: typography.sizes.sm * typography.lineHeights.normal,
    md: typography.sizes.md * typography.lineHeights.normal,
    lg: typography.sizes.lg * typography.lineHeights.normal,
    xl: typography.sizes.xl * typography.lineHeights.tight,
    "2xl": typography.sizes["2xl"] * typography.lineHeights.tight,
    true: typography.sizes.md * typography.lineHeights.normal,
  },
  weight: {
    regular: typography.weights.regular,
    medium: typography.weights.medium,
    semibold: typography.weights.semibold,
    bold: typography.weights.bold,
    true: typography.weights.regular,
  },
  letterSpacing: {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    "2xl": 0,
    true: 0,
  },
  face: {
    400: { normal: typography.fontFamily },
    500: { normal: typography.fontFamily },
    600: { normal: typography.fontFamily },
    700: { normal: typography.fontFamily },
  },
});

const tamaguiTokens = createTokens({
  color: colorTokens,
  size: sizeTokens,
  space: sizeTokens,
  radius: radiusTokens,
  zIndex: zIndexTokens,
});

export const tamaguiConfig = createTamagui({
  tokens: tamaguiTokens,
  themes: {
    light: {
      background: brandColors.background,
      color: brandColors.textPrimary,
      surface: brandColors.surface,
      borderColor: brandColors.border,
      primary: brandColors.primary,
      secondary: brandColors.secondary,
      textSecondary: brandColors.textSecondary,
      success: colorTokens.success,
      successSoft: colorTokens.successSoft,
      danger: colorTokens.danger,
      dangerSoft: colorTokens.dangerSoft,
      chipSelected: colorTokens.chipSelected,
      chipBackground: colorTokens.chipBackground,
      mutedSurface: colorTokens.mutedSurface,
    },
  },
  fonts: {
    body: bodyFont,
    heading: bodyFont,
  },
  defaultFont: "body",
});

export {
  brandColors,
  getPokemonTypeColor,
  pokemonTypeColors,
  spacing,
  tokens,
  typography,
};

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
