import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { uiTokens, useUiTokens } from "./tokens";

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
  const themedTokens = useUiTokens();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: themedTokens.colors.border,
          backgroundColor: themedTokens.colors.surface,
        },
        style,
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmitQuery?.(value)}
        placeholderTextColor={themedTokens.colors.textSecondary}
        returnKeyType="search"
        style={[styles.input, { color: themedTokens.colors.textPrimary }]}
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
    justifyContent: "center",
    paddingHorizontal: uiTokens.spacing.md,
  },
  input: {
    fontSize: uiTokens.typography.sizes.md,
    paddingVertical: 0,
  },
});
