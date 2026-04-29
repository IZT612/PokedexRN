import React from "react";
import { Text, YStack } from "tamagui";

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
  const actionLabel = retryLabel;

  return (
    <YStack
      padding={uiTokens.spacing.lg}
      borderRadius={uiTokens.radius.lg}
      borderWidth={1}
      borderColor={uiTokens.colors.danger}
      backgroundColor={uiTokens.colors.dangerSoft}
      gap={uiTokens.spacing.xs}
      accessibilityRole="alert"
    >
      <Text
        color={uiTokens.colors.danger}
        fontSize={uiTokens.typography.sizes.md}
        fontWeight={uiTokens.typography.weights.bold}
      >
        {title}
      </Text>
      <Text
        color={uiTokens.colors.textPrimary}
        fontSize={uiTokens.typography.sizes.sm}
        lineHeight={
          uiTokens.typography.lineHeights.normal * uiTokens.typography.sizes.sm
        }
        marginBottom={onRetry ? uiTokens.spacing.sm : 0}
      >
        {message}
      </Text>
      {onRetry ? (
        <Button label={actionLabel} variant="secondary" onPress={onRetry} />
      ) : null}
    </YStack>
  );
}
