import { tokens } from "../../../theme";

export const uiTokens = {
  colors: {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    white: tokens.colors.white,
    surface: tokens.colors.surface,
    background: tokens.colors.background,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    border: tokens.colors.border,
    success: tokens.colors.success,
    successSoft: tokens.colors.successSoft,
    danger: tokens.colors.danger,
    dangerSoft: tokens.colors.dangerSoft,
    chipSelected: tokens.colors.textPrimary,
    chipBackground: tokens.colors.chipBackground,
    mutedSurface: tokens.colors.mutedSurface,
  },
  spacing: tokens.spacing,
  typography: tokens.typography,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
} as const;

export type UiTokens = typeof uiTokens;
