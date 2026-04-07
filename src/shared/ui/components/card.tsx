import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../../../constants/theme';

export const Card = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
