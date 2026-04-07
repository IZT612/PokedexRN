import { BorderRadius, Colors, Sizes, Spacing } from '@/constants/theme';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Input, InputProps } from 'tamagui';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
} & Omit<InputProps, 'onChangeText' | 'placeholderTextColor'>;

export const SearchInput = ({
  placeholder,
  value,
  onChangeText,
  ...rest
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Input
      flex={1}
      height={Sizes.buttonHeight.md}
      backgroundColor={themeColors.surface}
      borderRadius={BorderRadius.full}
      paddingHorizontal={Spacing.md}
      borderWidth={1}
      borderColor={themeColors.border}
      color={themeColors.text}
      placeholder={placeholder}
      placeholderTextColor={themeColors.icon as any}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};
