import React from "react";
import { Spinner, Text, XStack } from "tamagui";

import { uiTokens } from "./tokens";

export type LoadingSpinnerProps = {
  label?: string;
  size?: "small" | "large";
};

export function LoadingSpinner({ label, size = "small" }: LoadingSpinnerProps) {
  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      gap={uiTokens.spacing.xs}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? "Loading"}
    >
      <Spinner size={size} color={uiTokens.colors.primary} />
      {label ? (
        <Text
          color={uiTokens.colors.textSecondary}
          fontSize={uiTokens.typography.sizes.sm}
        >
          {label}
        </Text>
      ) : null}
    </XStack>
  );
}
