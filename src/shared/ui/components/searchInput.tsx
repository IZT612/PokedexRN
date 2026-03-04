import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import {
    BorderRadius,
    Colors,
    Sizes,
    Spacing,
} from '../../../../constants/theme';

type Props = {
  placeholder: string;
  onChangeText: (text: string) => void;
} & Omit<TextInputProps, 'onChangeText'>;

export const SearchInput = ({ placeholder, onChangeText }: Props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.light.icon}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: Sizes.buttonHeight.md,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: Colors.light.text,
  },
});
