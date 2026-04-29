import React from "react";
import {
  Button as TamaguiButton,
  Spinner,
  Text,
  type GetProps,
  type TextProps,
} from "tamagui";

import { uiTokens } from "./tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = Omit<
  GetProps<typeof TamaguiButton>,
  "children" | "variant"
> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  labelStyle?: TextProps["style"];
};

const variantBackgroundColors: Record<ButtonVariant, string> = {
  primary: uiTokens.colors.primary,
  secondary: uiTokens.colors.surface,
  ghost: "transparent",
};

const variantBorderColors: Record<ButtonVariant, string> = {
  primary: uiTokens.colors.primary,
  secondary: uiTokens.colors.border,
  ghost: "transparent",
};

const variantLabelColors: Record<ButtonVariant, string> = {
  primary: uiTokens.colors.white,
  secondary: uiTokens.colors.textPrimary,
  ghost: uiTokens.colors.primary,
};

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  labelStyle,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TamaguiButton
      unstyled
      accessibilityRole="button"
      disabled={isDisabled}
      minHeight={48}
      paddingHorizontal={uiTokens.spacing.md}
      borderRadius={uiTokens.radius.md}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      borderWidth={1}
      backgroundColor={variantBackgroundColors[variant]}
      borderColor={variantBorderColors[variant]}
      opacity={isDisabled ? 0.5 : 1}
      pressStyle={!isDisabled ? { opacity: 0.9 } : undefined}
      style={style}
      {...props}
    >
      {loading ? (
        <Spinner
          color={
            variant === "primary"
              ? uiTokens.colors.white
              : uiTokens.colors.primary
          }
        />
      ) : (
        <Text
          fontSize={16}
          fontWeight={uiTokens.typography.weights.semibold}
          color={variantLabelColors[variant]}
          style={labelStyle}
        >
          {label}
        </Text>
      )}
    </TamaguiButton>
  );
}
