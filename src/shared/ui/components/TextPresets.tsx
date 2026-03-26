import { brandColors } from '@/constants/colors';
import { Colors, Typography } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const H1 = ({ style, ...props }: TextProps) => (
  <Text style={[styles.h1, style]} {...props} />
);

export const H2 = ({ style, ...props }: TextProps) => (
  <Text style={[styles.h2, style]} {...props} />
);

export const H3 = ({ style, ...props }: TextProps) => (
  <Text style={[styles.h3, style]} {...props} />
);

export const H4 = ({ style, ...props }: TextProps) => (
  <Text style={[styles.h4, style]} {...props} />
);

export const Body = ({ style, ...props }: TextProps) => (
  <Text style={[styles.body, style]} {...props} />
);

export const Small = ({ style, ...props }: TextProps) => (
  <Text style={[styles.small, style]} {...props} />
);

export const Caption = ({ style, ...props }: TextProps) => (
  <Text style={[styles.caption, style]} {...props} />
);

export const Link = ({ style, ...props }: TextProps) => (
  <Text style={[styles.link, style]} {...props} />
);

export const ErrorText = ({ style, ...props }: TextProps) => (
  <Text style={[styles.error, style]} {...props} />
);

export const Title = ({ style, ...props }: TextProps) => (
  <Text style={[styles.title, style]} {...props} />
);

export const PlaceHolder = ({ style, ...props }: TextProps) => (
  <Text style={[styles.placeHolder, style]} {...props} />
);

const styles = StyleSheet.create({
  h1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.light.text,
  },
  h2: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.light.text,
  },
  h3: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.light.text,
  },
  h4: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.light.text,
  },
  body: { fontSize: Typography.fontSize.md, color: Colors.light.text },
  small: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.light.icon,
  },
  caption: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.light,
    color: Colors.light.icon,
  },
  link: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.light.tint,
    textDecorationLine: 'underline',
  },
  error: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.light.error,
  },
  title: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    color: brandColors.primaryRed,
  },
  placeHolder: {
    fontSize: Typography.fontSize.md,
    color: Colors.light.icon,
    fontStyle: 'italic',
  },
});
