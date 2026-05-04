import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";
import { uiTokens, useUiTokens } from "./tokens";

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
  const themedTokens = useUiTokens();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: themedTokens.colors.danger,
          backgroundColor: themedTokens.colors.dangerSoft,
        },
      ]}
      accessibilityRole="alert"
    >
      <Text style={[styles.title, { color: themedTokens.colors.danger }]}>
        {title}
      </Text>
      <Text
        style={[styles.message, { color: themedTokens.colors.textPrimary }]}
      >
        {message}
      </Text>
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
  },
  title: {
    fontSize: uiTokens.typography.sizes.md,
    fontWeight: uiTokens.typography.weights.bold,
    marginBottom: uiTokens.spacing.xs,
  },
  message: {
    fontSize: uiTokens.typography.sizes.sm,
    lineHeight:
      uiTokens.typography.lineHeights.normal * uiTokens.typography.sizes.sm,
    marginBottom: uiTokens.spacing.sm,
  },
});
