import React, { PropsWithChildren } from "react";
import { View, type GetProps } from "tamagui";

import { uiTokens } from "./tokens";

export type CardProps = PropsWithChildren<GetProps<typeof View>> & {
  elevated?: boolean;
  padded?: boolean;
};

export function Card({
  elevated = false,
  padded = true,
  style,
  children,
  ...props
}: CardProps) {
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
              shadowColor: "#000000",
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
