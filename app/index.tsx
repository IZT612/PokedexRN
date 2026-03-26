import React from 'react';

import { Stack } from 'expo-router';
import { ListScreen } from '../src/features/pokemonList/ui/views/listScreen';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ListScreen />
    </>
  );
}
