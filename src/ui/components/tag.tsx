import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Spacing, Typography } from '../../../constants/theme';

export const Tag = ({ label, color }: { label: string; color: string }) => (
  <View style={[styles.tag, { backgroundColor: color }]}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  label: {
    color: 'white',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'capitalize',
  },
});
