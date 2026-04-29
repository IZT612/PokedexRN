import React from "react";
import { Button, Text, View } from "tamagui";

import { uiTokens } from "./tokens";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  const content = (
    <View
      minHeight={32}
      paddingHorizontal={uiTokens.spacing.md}
      borderRadius={uiTokens.radius.pill}
      backgroundColor={
        selected ? uiTokens.colors.chipSelected : uiTokens.colors.chipBackground
      }
      alignItems="center"
      justifyContent="center"
      alignSelf="flex-start"
    >
      <Text
        fontSize={uiTokens.typography.sizes.sm}
        fontWeight={uiTokens.typography.weights.semibold}
        color={selected ? uiTokens.colors.white : uiTokens.colors.textPrimary}
      >
        {label}
      </Text>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Button unstyled onPress={onPress} pressStyle={{ opacity: 0.9 }}>
      {content}
    </Button>
  );
}
