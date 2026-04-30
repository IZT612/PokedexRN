export const lightBrandColors = {
  primary: "#EF5350",
  secondary: "#3761A8",
  background: "#F5F5F5",
  white: "#FFFFFF",
  surface: "#FFFFFF",
  textPrimary: "#1F1F1F",
  textSecondary: "#666666",
  border: "#E0E0E0",
} as const;

export const darkBrandColors = {
  primary: "#F9706D",
  secondary: "#7CA8F5",
  background: "#111827",
  white: "#FFFFFF",
  surface: "#1F2937",
  textPrimary: "#F9FAFB",
  textSecondary: "#CBD5E1",
  border: "#374151",
} as const;

export const lightSemanticColors = {
  success: "#16A34A",
  successSoft: "#DCFCE7",
  danger: "#DC2626",
  dangerSoft: "#FEE2E2",
  chipBackground: "#E5E7EB",
  chipSelected: lightBrandColors.textPrimary,
  mutedSurface: "#F3F4F6",
} as const;

export const darkSemanticColors = {
  success: "#22C55E",
  successSoft: "#14532D",
  danger: "#F87171",
  dangerSoft: "#7F1D1D",
  chipBackground: "#334155",
  chipSelected: darkBrandColors.textPrimary,
  mutedSurface: "#273449",
} as const;

export const pokemonTypeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#736C75",
  steel: "#B7B7CE",
  fairy: "#D685AD",
} as const;

export const themeColors = {
  light: {
    ...lightBrandColors,
    ...lightSemanticColors,
    types: pokemonTypeColors,
  },
  dark: {
    ...darkBrandColors,
    ...darkSemanticColors,
    types: pokemonTypeColors,
  },
} as const;

export const pokemonTypes = Object.keys(pokemonTypeColors) as Array<
  keyof typeof pokemonTypeColors
>;

export const typography = {
  fontFamily: "Inter, system-ui",
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 32,
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
} as const;

export type AppThemeName = keyof typeof themeColors;
export type AppThemeColors = (typeof themeColors)[AppThemeName];
export type DeviceColorScheme =
  | "light"
  | "dark"
  | "unspecified"
  | null
  | undefined;

export function getThemeColors(themeName: AppThemeName) {
  return themeColors[themeName];
}

export function resolveAppThemeName(
  colorScheme: DeviceColorScheme,
): AppThemeName {
  return colorScheme === "dark" ? "dark" : "light";
}

export function createThemeTokens(themeName: AppThemeName) {
  return {
    colors: getThemeColors(themeName),
    typography,
    spacing,
  } as const;
}

export const brandColors = lightBrandColors;
export const semanticColors = lightSemanticColors;
export const tokens = createThemeTokens("light");

export type PokemonType = keyof typeof pokemonTypeColors;
export type ThemeTokens = typeof tokens;

export function getPokemonTypeColor(type: PokemonType) {
  return pokemonTypeColors[type];
}
