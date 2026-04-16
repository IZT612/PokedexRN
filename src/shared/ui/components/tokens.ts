import { tokens } from '../../../theme';

export const uiTokens = {
  colors: {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    surface: tokens.colors.surface,
    background: tokens.colors.background,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    border: tokens.colors.border,
    success: '#16A34A',
    successSoft: '#DCFCE7',
    danger: '#DC2626',
    dangerSoft: '#FEE2E2',
    chipSelected: tokens.colors.textPrimary,
    chipBackground: '#E5E7EB',
    mutedSurface: '#F3F4F6',
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
