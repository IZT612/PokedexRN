import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { getPokemonTypeColor, type PokemonType, tokens } from "../../theme";
import { useAppTheme } from "./TamaguiAppProvider";

type TypeFrameProps = ViewProps & {
  type: PokemonType;
};

export function TypeFrame({
  type,
  style,
  children,
  ...props
}: PropsWithChildren<TypeFrameProps>) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.frame,
        {
          backgroundColor: colors.surface,
          borderColor: getPokemonTypeColor(type),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 2,
    borderRadius: 16,
    padding: tokens.spacing.lg,
  },
});
