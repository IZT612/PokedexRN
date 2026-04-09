import React from 'react';

// import { ListScreen } from '@/src/features/pokemonList/ui/views/ListScreen';
import { DetailScreen } from '@/src/features/pokemonDetail/ui/views/PokemonDetailScreen';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Add an onBack function too to see the go back button */}
      <DetailScreen id={1} onBack={() => {}} />
    </>
  );
}
