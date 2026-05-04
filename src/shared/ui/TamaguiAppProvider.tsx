import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";

import {
  createThemeTokens,
  getThemeColors,
  resolveAppThemeName,
  type AppThemeColors,
  type AppThemeName,
} from "../../theme";

type TamaguiAppProviderProps = PropsWithChildren<{}>;

type AppThemeValue = {
  themeName: AppThemeName;
  colors: AppThemeColors;
  tokens: ReturnType<typeof createThemeTokens>;
};

const defaultThemeName = "light" satisfies AppThemeName;

const defaultThemeValue: AppThemeValue = {
  themeName: defaultThemeName,
  colors: getThemeColors(defaultThemeName),
  tokens: createThemeTokens(defaultThemeName),
};

const AppThemeContext = createContext<AppThemeValue>(defaultThemeValue);

export function TamaguiAppProvider({ children }: TamaguiAppProviderProps) {
  const colorScheme = useColorScheme();
  const themeName = resolveAppThemeName(colorScheme);

  const value = useMemo(
    () => ({
      themeName,
      colors: getThemeColors(themeName),
      tokens: createThemeTokens(themeName),
    }),
    [themeName],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}
