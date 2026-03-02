import { Button, Text, YStack } from 'tamagui';

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" jc="center" bg="$background">
      <Text fontSize={24} fontWeight="bold">
        Hello Tamagui!
      </Text>
      <Button mt="$4">Botón de Prueba</Button>
    </YStack>
  );
}
