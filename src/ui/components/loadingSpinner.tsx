import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors, Spacing } from '../../../constants/theme';

export const LoadingSpinner = () => (
  <View style={{ padding: Spacing.xl, alignItems: 'center' }}>
    <ActivityIndicator size="large" color={Colors.light.primaryRed} />
  </View>
);
