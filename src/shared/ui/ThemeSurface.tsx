import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { tokens } from "../../theme";
import { useAppTheme } from "./TamaguiAppProvider";

type ThemeSurfaceProps = PropsWithChildren<ViewProps>;

export function ThemeSurface({ style, children, ...props }: ThemeSurfaceProps) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[styles.surface, { backgroundColor: colors.surface }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: tokens.spacing.lg,
  },
});
