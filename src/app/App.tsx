import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { PokemonDetailScreen } from "../features/pokemon-detail/ui";
import { PokemonListScreen } from "../features/pokemon-list/ui";
import type { Pokemon } from "../shared/data/entities";
import { TamaguiAppProvider } from "../shared/ui/TamaguiAppProvider";

type AppScreen =
  | {
      name: "list";
    }
  | {
      name: "detail";
      pokemonId: number;
    };

export function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>({ name: "list" });

  function handlePokemonPress(pokemon: Pokemon) {
    setActiveScreen({
      name: "detail",
      pokemonId: pokemon.id,
    });
  }

  function handleBack() {
    setActiveScreen({ name: "list" });
  }

  return (
    <TamaguiAppProvider>
      <View style={styles.root}>
        {activeScreen.name === "list" ? (
          <PokemonListScreen onPokemonPress={handlePokemonPress} />
        ) : (
          <PokemonDetailScreen
            pokemonId={activeScreen.pokemonId}
            onBack={handleBack}
          />
        )}
      </View>
    </TamaguiAppProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
