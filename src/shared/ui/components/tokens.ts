import { tokens } from "../../../theme";
import { useAppTheme } from "../TamaguiAppProvider";

export const uiTokens = {
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

export function useUiTokens() {
  const { colors } = useAppTheme();

  return {
    ...uiTokens,
    colors,
  } as const;
}
