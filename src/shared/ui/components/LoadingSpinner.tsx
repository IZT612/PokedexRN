// @ts-nocheck
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { uiTokens } from "./tokens";

export type LoadingSpinnerProps = {
  label?: string;
  size?: "small" | "large";
};

export function LoadingSpinner({ label, size = "small" }: LoadingSpinnerProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? "Loading"}
    >
      <ActivityIndicator size={size} color={uiTokens.colors.primary} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: uiTokens.spacing.xs,
    color: uiTokens.colors.textSecondary,
    fontSize: uiTokens.typography.sizes.sm,
  },
});
