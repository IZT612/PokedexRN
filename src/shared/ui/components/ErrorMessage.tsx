import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";
import { uiTokens } from "./tokens";

export type ErrorMessageProps = {
  message: string;
  title?: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message,
  title = "Something went wrong",
  retryLabel = "Try again",
  onRetry,
}: ErrorMessageProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Button label={retryLabel} variant="secondary" onPress={onRetry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: uiTokens.spacing.lg,
    borderRadius: uiTokens.radius.lg,
    borderWidth: 1,
    borderColor: uiTokens.colors.danger,
    backgroundColor: uiTokens.colors.dangerSoft,
  },
  title: {
    color: uiTokens.colors.danger,
    fontSize: uiTokens.typography.sizes.md,
    fontWeight: uiTokens.typography.weights.bold,
    marginBottom: uiTokens.spacing.xs,
  },
  message: {
    color: uiTokens.colors.textPrimary,
    fontSize: uiTokens.typography.sizes.sm,
    lineHeight:
      uiTokens.typography.lineHeights.normal * uiTokens.typography.sizes.sm,
    marginBottom: uiTokens.spacing.sm,
  },
});
