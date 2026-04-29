import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { tokens } from "../../theme";

type ThemeSurfaceProps = PropsWithChildren<ViewProps>;

export function ThemeSurface({ style, children, ...props }: ThemeSurfaceProps) {
  return (
    <View {...props} style={[styles.surface, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.lg,
  },
});
