import { BorderRadius, Colors, Sizes, Spacing } from '@/constants/theme';
import React from 'react';
import { ColorTokens, Input, InputProps } from 'tamagui';

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
}: Props) => (
  <Input
    flex={1}
    height={Sizes.buttonHeight.md}
    backgroundColor={Colors.light.surface}
    borderRadius={BorderRadius.full}
    paddingHorizontal={Spacing.md}
    borderWidth={1}
    borderColor="#E0E0E0"
    color={Colors.light.text}
    placeholder={placeholder}
    placeholderTextColor={'$gray10' as ColorTokens}
    value={value}
    onChangeText={onChangeText}
    {...rest}
  />
);
