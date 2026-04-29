import React from "react";
import { Input, View, type GetProps } from "tamagui";

import { uiTokens } from "./tokens";

export type SearchInputProps = Omit<
  GetProps<typeof Input>,
  "value" | "onChangeText"
> & {
  value: string;
  onChangeText: (value: string) => void;
  onSubmitQuery?: (value: string) => void;
};

export function SearchInput({
  value,
  onChangeText,
  onSubmitQuery,
  style,
  ...props
}: SearchInputProps) {
  return (
    <View
      minHeight={48}
      borderRadius={uiTokens.radius.md}
      borderWidth={1}
      borderColor={uiTokens.colors.border}
      backgroundColor={uiTokens.colors.surface}
      justifyContent="center"
      paddingHorizontal={uiTokens.spacing.md}
      style={style}
    >
      <Input
        unstyled
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmitQuery?.(value)}
        placeholderTextColor="$textSecondary"
        returnKeyType="search"
        color={uiTokens.colors.textPrimary}
        fontSize={uiTokens.typography.sizes.md}
        paddingVertical={0}
        {...props}
      />
    </View>
  );
}
