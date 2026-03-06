import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    BorderRadius,
    Colors,
    Sizes,
    Spacing,
    Typography,
} from '../../../../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, variant = 'primary' }: Props) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary
            ? Colors.light.primaryRed
            : Colors.light.secondaryBlue,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Sizes.buttonHeight.md,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  text: {
    color: 'white',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
});
