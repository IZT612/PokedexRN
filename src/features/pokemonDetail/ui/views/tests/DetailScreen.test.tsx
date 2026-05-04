import { usePokemonDetailStore } from '@/app/store';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import PokemonDetailScreen from '../PokemonDetailScreen';

jest.mock('@/app/store', () => ({
  usePokemonDetailStore: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@tamagui/lucide-icons-2', () => ({
  Activity: 'ActivityIcon',
  Ruler: 'RulerIcon',
  Scale: 'ScaleIcon',
  Sparkles: 'SparklesIcon',
  ChevronLeft: 'ChevronLeftIcon',
  Heart: 'HeartIcon',
}));

jest.mock('tamagui', () => {
  const { View, Text } = require('react-native');
  return {
    ...jest.requireActual('tamagui'),
    YStack: View,
    XStack: View,
    Paragraph: Text,
    H1: Text,
    H2: Text,
    H3: Text,
  };
});

jest.mock('@/src/shared/ui/components/loadingSpinner', () => {
  const { View } = require('react-native');
  return {
    LoadingSpinner: () => <View testID="loading-spinner" />,
  };
});

describe('DetailScreen', () => {
  const mockFetchPokemonDetail = jest.fn();
  const mockOnBack = jest.fn();

  const mockPokemonData = {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
    stats: [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
    ],
    abilities: ['overgrow', 'chlorophyll'],
    height: 7,
    weight: 69,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('When loading is true it should render a loading spinner', () => {
    (usePokemonDetailStore as unknown as jest.Mock).mockReturnValue({
      pokemonDetail: null,
      loading: true,
      error: null,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    const { getByTestId } = render(<PokemonDetailScreen id="1" />);

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('The error message and retry button should appear when there is an error', () => {
    (usePokemonDetailStore as unknown as jest.Mock).mockReturnValue({
      pokemonDetail: null,
      loading: false,
      error: 'Network Error',
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    const { getByText } = render(<PokemonDetailScreen id="1" />);

    expect(getByText('Failed to load Pokémon.')).toBeTruthy();

    const retryButton = getByText('Try again');
    fireEvent.press(retryButton);
    expect(mockFetchPokemonDetail).toHaveBeenCalledWith('1');
  });

  it('If there is no data and it is not loading nor an error, a "Pokemon not found." message should appear', () => {
    (usePokemonDetailStore as unknown as jest.Mock).mockReturnValue({
      pokemonDetail: null,
      loading: false,
      error: null,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    const { getByText } = render(<PokemonDetailScreen id="999" />);

    expect(getByText('Pokemon not found.')).toBeTruthy();
  });

  // Happy path test
  it('Pokemon data should render correctly', () => {
    (usePokemonDetailStore as unknown as jest.Mock).mockReturnValue({
      pokemonDetail: mockPokemonData,
      loading: false,
      error: null,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    const { getByText } = render(<PokemonDetailScreen id="1" />);

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('#001')).toBeTruthy();
    expect(getByText('grass')).toBeTruthy();
    expect(getByText('poison')).toBeTruthy();
    expect(getByText('6.9 kg')).toBeTruthy();
    expect(getByText('0.7 m')).toBeTruthy();
    expect(getByText('overgrow')).toBeTruthy();
    expect(getByText('chlorophyll')).toBeTruthy();
    // Stats, testing only a few to not make the test too saturated
    expect(getByText('hp')).toBeTruthy();
    expect(getByText('45')).toBeTruthy();
    expect(getByText('attack')).toBeTruthy();
    expect(getByText('49')).toBeTruthy();
  });

  it('Calls onBack when back button is pressed', () => {
    (usePokemonDetailStore as unknown as jest.Mock).mockReturnValue({
      pokemonDetail: mockPokemonData,
      loading: false,
      error: null,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    const { getByTestId } = render(
      <PokemonDetailScreen id="1" onBack={mockOnBack} />,
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
