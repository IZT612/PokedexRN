import { usePokemonListStore } from '@/app/store';
import { SearchBar } from '@/src/features/pokemonList/ui/components/SearchBar';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

// We have to mock the tamagui components since they don't work correctly in the tests.
// Use require instead of import inside jest mocks to ensure modules are loaded correctly at runtime
jest.mock('tamagui', () => {
  const { View } = require('react-native');
  return {
    ...jest.requireActual('tamagui'),
    XStack: View,
  };
});

jest.mock('@/src/shared/ui/components/button', () => {
  const { TouchableOpacity } = require('react-native');
  const { Text } = require('react-native');
  return {
    Button: (props: any) => (
      <TouchableOpacity {...props}>
        <Text>X</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock('@/src/shared/ui/components/searchInput', () => {
  const { TextInput } = require('react-native');
  return { SearchInput: (props: any) => <TextInput {...props} /> };
});

jest.useFakeTimers();

describe('SearchBar Component', () => {
  beforeEach(() => {
    usePokemonListStore.setState({ searchQuery: '' });
  });

  it('updates the store after typing and debounce time passes', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const input = getByPlaceholderText('Search Pokemon...');

    fireEvent.changeText(input, 'Pikachu');

    // At first global query should be empty since we have to wait for the debounce
    expect(usePokemonListStore.getState().searchQuery).toBe('');

    // Advances the timer to trigger the debounce useEffect
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // We expect for the global query to be updated now
    expect(usePokemonListStore.getState().searchQuery).toBe('Pikachu');
  });

  it('clears the input and store when pressing the X button', () => {
    usePokemonListStore.setState({ searchQuery: 'Pikachu' });
    const { getByText, getByPlaceholderText } = render(<SearchBar />);

    const clearButton = getByText('X');

    // Simulates we press the clear button
    fireEvent.press(clearButton);

    // The local query should be empty
    expect(getByPlaceholderText('Search Pokemon...').props.value).toBe('');
    // And the global query should be empty too
    expect(usePokemonListStore.getState().searchQuery).toBe('');
  });
});
