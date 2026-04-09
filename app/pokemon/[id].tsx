import PokemonDetailScreen from '@/src/features/pokemonDetail/ui/views/PokemonDetailScreen';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function PokemonDetailRoute() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PokemonDetailScreen id={id as string} onBack={() => router.back()} />
    </>
  );
}
