import React from "react";
import { StyleSheet, View } from "react-native";

import { TamaguiAppProvider } from "../shared/ui/TamaguiAppProvider";
import { ThemeSurface } from "../shared/ui/ThemeSurface";
import { ThemeText } from "../shared/ui/ThemeText";
import { TypeBadge } from "../shared/ui/TypeBadge";
import { TypeFrame } from "../shared/ui/TypeFrame";

export function App() {
  return (
    <TamaguiAppProvider>
      <View style={styles.root}>
        <ThemeSurface>
          <ThemeText>Pokedex</ThemeText>
          <TypeFrame type="fire">
            <TypeBadge type="fire" />
          </TypeFrame>
        </ThemeSurface>
      </View>
    </TamaguiAppProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
