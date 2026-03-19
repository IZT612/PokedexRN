import React from 'react';
import { TextInputProps } from 'react-native';
import { ColorTokens, Input } from 'tamagui';
import {
  BorderRadius,
  Colors,
  Sizes,
  Spacing,
} from '../../../../constants/theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
} & Omit<TextInputProps, 'onChangeText'>;

export const SearchInput = ({ placeholder, value, onChangeText }: Props) => (
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
    placeholderTextColor={Colors.light.icon as ColorTokens}
    value={value}
    onChangeText={onChangeText}
  />
);
