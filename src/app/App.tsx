import React from "react";
import { StyleSheet, View } from "react-native";

import { PokemonListScreen } from "../features/pokemon-list/ui";
import { TamaguiAppProvider } from "../shared/ui/TamaguiAppProvider";

export function App() {
  return (
    <TamaguiAppProvider>
      <View style={styles.root}>
        <PokemonListScreen />
      </View>
    </TamaguiAppProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
