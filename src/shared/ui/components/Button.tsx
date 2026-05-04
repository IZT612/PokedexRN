import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import { uiTokens, useUiTokens } from "./tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
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
  const themedTokens = useUiTokens();
  const isDisabled = disabled || loading;

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: themedTokens.colors.primary,
      borderColor: themedTokens.colors.primary,
    },
    secondary: {
      backgroundColor: themedTokens.colors.surface,
      borderColor: themedTokens.colors.border,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
  };

  const variantLabelStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: themedTokens.colors.white },
    secondary: { color: themedTokens.colors.textPrimary },
    ghost: { color: themedTokens.colors.primary },
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary"
              ? themedTokens.colors.white
              : themedTokens.colors.primary
          }
        />
      ) : (
        <Text style={[styles.label, variantLabelStyles[variant], labelStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: uiTokens.spacing.md,
    borderRadius: uiTokens.radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: uiTokens.typography.weights.semibold,
  },
});
