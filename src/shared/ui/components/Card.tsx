import React, { PropsWithChildren } from "react";
import { Button, View, type GetProps } from "tamagui";

import { uiTokens } from "./tokens";

export type CardProps = PropsWithChildren<GetProps<typeof View>> & {
  elevated?: boolean;
  padded?: boolean;
  onPress?: () => void;
};

export function Card({
  elevated = false,
  padded = true,
  style,
  onPress,
  children,
  ...props
}: CardProps) {
  if (onPress) {
    return (
      <Button
        unstyled
        accessibilityRole="button"
        onPress={onPress}
        backgroundColor={uiTokens.colors.surface}
        borderColor={uiTokens.colors.border}
        borderWidth={1}
        borderRadius={uiTokens.radius.lg}
        padding={padded ? uiTokens.spacing.lg : undefined}
        pressStyle={{ opacity: 0.92 }}
        style={[
          elevated
            ? {
                shadowColor: uiTokens.colors.textPrimary,
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              }
            : null,
          style,
        ]}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <View
      backgroundColor={uiTokens.colors.surface}
      borderColor={uiTokens.colors.border}
      borderWidth={1}
      borderRadius={uiTokens.radius.lg}
      padding={padded ? uiTokens.spacing.lg : undefined}
      style={[
        elevated
          ? {
              shadowColor: uiTokens.colors.textPrimary,
              shadowOpacity: 0.08,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }
          : null,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
