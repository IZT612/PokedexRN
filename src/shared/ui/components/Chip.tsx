// @ts-nocheck
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { uiTokens } from "./tokens";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  const content = (
    <View style={[styles.base, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
}

const styles = StyleSheet.create({
  base: {
    minHeight: 32,
    paddingHorizontal: uiTokens.spacing.md,
    borderRadius: uiTokens.radius.pill,
    backgroundColor: uiTokens.colors.chipBackground,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  selected: {
    backgroundColor: uiTokens.colors.chipSelected,
  },
  label: {
    fontSize: uiTokens.typography.sizes.sm,
    fontWeight: uiTokens.typography.weights.semibold,
    color: uiTokens.colors.textPrimary,
  },
  selectedLabel: {
    color: "#FFFFFF",
  },
});
