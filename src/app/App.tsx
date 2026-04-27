import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { usePokemonDetailStore } from "../features/pokemon-detail/domain";
import { PokemonDetailScreen } from "../features/pokemon-detail/ui";
import { FavoritesScreen } from "../features/favorites/ui";
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
      returnTo: "list" | "favorites";
    }
  | {
      name: "favorites";
    };

export function App() {
  const favoritePokemonIds = usePokemonDetailStore((state) => state.favoritePokemonIds);
  const favoritePokemonIdsLoading = usePokemonDetailStore(
    (state) => state.favoritePokemonIdsLoading,
  );
  const favoritePokemonIdsError = usePokemonDetailStore(
    (state) => state.favoritePokemonIdsError,
  );
  const loadFavoritePokemonIds = usePokemonDetailStore(
    (state) => state.loadFavoritePokemonIds,
  );
  const [activeScreen, setActiveScreen] = useState<AppScreen>({ name: "list" });

  useEffect(() => {
    void loadFavoritePokemonIds();
  }, [loadFavoritePokemonIds]);

  function handlePokemonPress(pokemon: Pokemon) {
    setActiveScreen({
      name: "detail",
      pokemonId: pokemon.id,
      returnTo: activeScreen.name === "favorites" ? "favorites" : "list",
    });
  }

  function handleBack() {
    if (activeScreen.name === "detail") {
      if (activeScreen.returnTo === "favorites") {
        setActiveScreen({ name: "favorites" });
      } else {
        setActiveScreen({ name: "list" });
      }

      return;
    }

    setActiveScreen({ name: "list" });
  }

  function handleOpenFavorites() {
    setActiveScreen({ name: "favorites" });
  }

  function handleOpenHome() {
    setActiveScreen({ name: "list" });
  }

  return (
    <TamaguiAppProvider>
      <View style={styles.root}>
        {activeScreen.name === "list" ? (
          <PokemonListScreen
            onPokemonPress={handlePokemonPress}
            onFavoritesPress={handleOpenFavorites}
          />
        ) : activeScreen.name === "favorites" ? (
          <FavoritesScreen
            favoritePokemonIds={favoritePokemonIds}
            favoritePokemonIdsLoading={favoritePokemonIdsLoading}
            favoritePokemonIdsError={favoritePokemonIdsError}
            onRetryFavoritePokemonIdsLoad={() => {
              void loadFavoritePokemonIds();
            }}
            onPokemonPress={handlePokemonPress}
            onHomePress={handleOpenHome}
          />
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
