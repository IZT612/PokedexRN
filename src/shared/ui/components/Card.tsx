import React, { PropsWithChildren } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import { uiTokens, useUiTokens } from "./tokens";

export type CardProps = PropsWithChildren<ViewProps> & {
  elevated?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: PressableProps["onPress"];
};

export function Card({
  elevated = false,
  padded = true,
  style,
  onPress,
  children,
  ...props
}: CardProps) {
  const themedTokens = useUiTokens();

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          {
            backgroundColor: themedTokens.colors.surface,
            borderColor: themedTokens.colors.border,
          },
          padded && styles.padded,
          elevated && {
            shadowColor: themedTokens.colors.textPrimary,
            shadowOpacity: 0.08,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          },
          pressed && styles.pressed,
          style,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: themedTokens.colors.surface,
          borderColor: themedTokens.colors.border,
        },
        padded && styles.padded,
        elevated && {
          shadowColor: themedTokens.colors.textPrimary,
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: uiTokens.radius.lg,
  },
  padded: {
    padding: uiTokens.spacing.lg,
  },
  pressed: {
    opacity: 0.92,
  },
});
