import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { uiTokens, useUiTokens } from "./tokens";

export type LoadingSpinnerProps = {
  label?: string;
  size?: "small" | "large";
};

export function LoadingSpinner({ label, size = "small" }: LoadingSpinnerProps) {
  const themedTokens = useUiTokens();

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? "Loading"}
    >
      <ActivityIndicator size={size} color={themedTokens.colors.primary} />
      {label ? (
        <Text
          style={[styles.label, { color: themedTokens.colors.textSecondary }]}
        >
          {label}
        </Text>
      ) : null}
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
    fontSize: uiTokens.typography.sizes.sm,
  },
});
