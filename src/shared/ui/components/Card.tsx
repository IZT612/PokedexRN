// @ts-nocheck
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

import { uiTokens } from "./tokens";

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
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          padded && styles.padded,
          elevated && styles.elevated,
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
        padded && styles.padded,
        elevated && styles.elevated,
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
    backgroundColor: uiTokens.colors.surface,
    borderColor: uiTokens.colors.border,
    borderWidth: 1,
    borderRadius: uiTokens.radius.lg,
  },
  padded: {
    padding: uiTokens.spacing.lg,
  },
  elevated: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
  },
});
