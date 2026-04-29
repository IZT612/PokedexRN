import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { getPokemonTypeColor, type PokemonType, tokens } from "../../theme";

type TypeFrameProps = ViewProps & {
  type: PokemonType;
};

export function TypeFrame({
  type,
  style,
  children,
  ...props
}: PropsWithChildren<TypeFrameProps>) {
  return (
    <View
      {...props}
      style={[styles.frame, { borderColor: getPokemonTypeColor(type) }, style]}
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
    backgroundColor: tokens.colors.surface,
  },
});
