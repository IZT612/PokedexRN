import React from "react";
import { Button, Text, View } from "tamagui";

import type { PokemonType } from "../../../theme";
import { getChipColors } from "./chipColors";
import { uiTokens } from "./tokens";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  pokemonType?: PokemonType;
};

export function Chip({
  label,
  selected = false,
  onPress,
  pokemonType,
}: ChipProps) {
  const colors = getChipColors({ selected, pokemonType });

  const content = (
    <View
      minHeight={32}
      paddingHorizontal={uiTokens.spacing.md}
      borderRadius={uiTokens.radius.pill}
      borderWidth={1}
      backgroundColor={colors.backgroundColor}
      borderColor={colors.borderColor}
      alignItems="center"
      justifyContent="center"
      alignSelf="flex-start"
    >
      <Text
        fontSize={uiTokens.typography.sizes.sm}
        fontWeight={uiTokens.typography.weights.semibold}
        color={colors.textColor}
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
