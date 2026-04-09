import React from 'react';

import { ListScreen } from '@/src/features/pokemonList/ui/views/ListScreen';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ListScreen />
    </>
  );
}
