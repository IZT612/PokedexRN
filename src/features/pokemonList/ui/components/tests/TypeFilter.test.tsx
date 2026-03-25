import { usePokemonListStore } from '@/app/store';
import { TypeFilter } from '@/src/features/pokemonList/ui/components/TypeFilter';
import { fireEvent, render } from '@testing-library/react-native';
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

describe('TypeFilter Component', () => {
  beforeEach(() => {
    usePokemonListStore.setState({ selectedType: null });
  });

  it('toggles the selected pokemon type in the store', () => {
    const { getByText } = render(<TypeFilter />);

    const fireTag = getByText('fire');

    // Simulates we press the fire tag/chip
    fireEvent.press(fireTag);
    // The selected type in the store should be fire now
    expect(usePokemonListStore.getState().selectedType).toBe('fire');

    // Simulates we press the fire tag/chip again to disable it
    fireEvent.press(fireTag);
    // The selected type in the store should be none now
    expect(usePokemonListStore.getState().selectedType).toBe(null);
  });

  it('switches to a different type if another is pressed', () => {
    const { getByText } = render(<TypeFilter />);

    // Simulates we press the water tag/chip
    fireEvent.press(getByText('water'));
    // The selected type in the store should be water type
    expect(usePokemonListStore.getState().selectedType).toBe('water');

    // Simulates we press a different type tag/chip, grass in this case
    fireEvent.press(getByText('grass'));
    // And so the store selected type should be grass now
    expect(usePokemonListStore.getState().selectedType).toBe('grass');
  });
});
