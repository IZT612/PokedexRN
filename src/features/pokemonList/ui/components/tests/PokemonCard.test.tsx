import { PokemonCard } from '@/src/features/pokemonList/ui/components/PokemonCard';
import { Pokemon } from '@/src/shared/domain/entities/Pokemon';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

jest.mock('tamagui', () => ({
  YStack: 'View',
  XStack: 'View',
  Text: 'Text',
  H3: 'Text',
  Paragraph: 'Text',
}));

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  stats: [],
  abilities: [],
  height: 4,
  weight: 60,
} as Pokemon;

describe('PokemonCard Component', () => {
  it('renders correctly with formatted name and id', () => {
    // Renders a PokemonCard, we use mockPokemon for the pokemon props
    const { getByText } = render(<PokemonCard pokemon={mockPokemon} />);

    // toBeTruthy checks if something with that content exists
    // Name
    expect(getByText('Pikachu')).toBeTruthy();
    // ID
    expect(getByText('#025')).toBeTruthy();
    // Type
    expect(getByText('electric')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PokemonCard pokemon={mockPokemon} onPress={onPressMock} />,
    );

    // Simulated press
    fireEvent.press(getByText('Pikachu'));

    // We check if the onPress mock function has been called
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
