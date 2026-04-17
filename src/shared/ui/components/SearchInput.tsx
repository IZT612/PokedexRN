// @ts-nocheck
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { uiTokens } from "./tokens";

export type SearchInputProps = Omit<
  TextInputProps,
  "value" | "onChangeText" | "style"
> & {
  value: string;
  onChangeText: (value: string) => void;
  onSubmitQuery?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchInput({
  value,
  onChangeText,
  onSubmitQuery,
  style,
  ...props
}: SearchInputProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmitQuery?.(value)}
        placeholderTextColor={uiTokens.colors.textSecondary}
        returnKeyType="search"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: uiTokens.radius.md,
    borderWidth: 1,
    borderColor: uiTokens.colors.border,
    backgroundColor: uiTokens.colors.surface,
    justifyContent: "center",
    paddingHorizontal: uiTokens.spacing.md,
  },
  input: {
    color: uiTokens.colors.textPrimary,
    fontSize: uiTokens.typography.sizes.md,
    paddingVertical: 0,
  },
});
