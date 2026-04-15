import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { tokens } from '../../theme';

export function ThemeText({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.text, style]} />;
}

const styles = StyleSheet.create({
  text: {
    color: tokens.colors.textPrimary,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.sizes.md,
    lineHeight: tokens.typography.lineHeights.normal * tokens.typography.sizes.md,
  },
});
