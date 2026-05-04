import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { tokens } from "../../theme";
import { useAppTheme } from "./TamaguiAppProvider";

export function ThemeText({ style, ...props }: TextProps) {
  const { colors } = useAppTheme();

  return (
    <Text
      {...props}
      style={[styles.text, { color: colors.textPrimary }, style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.md,
    lineHeight:
      tokens.typography.lineHeights.normal * tokens.typography.sizes.md,
  },
});
