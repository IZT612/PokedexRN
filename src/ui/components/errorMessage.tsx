import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../../../constants/theme';

export const ErrorMessage = ({ message }: { message: string }) => (
  <View
    style={{ padding: Spacing.md, backgroundColor: '#FFEBEE', borderRadius: 8 }}
  >
    <Text
      style={{ color: Colors.light.error, fontSize: Typography.fontSize.sm }}
    >
      {message}
    </Text>
  </View>
);
