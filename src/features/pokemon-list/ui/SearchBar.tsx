import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { tokens } from '../../../theme';

type SearchBarProps = {
  value?: string;
  onChangeText?: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Pokemon"
        placeholderTextColor={tokens.colors.textSecondary}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: tokens.colors.surface,
    color: tokens.colors.textPrimary,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.md,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
});
