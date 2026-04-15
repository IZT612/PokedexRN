import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TamaguiAppProvider } from '../shared/ui/TamaguiAppProvider';
import { ThemeSurface } from '../shared/ui/ThemeSurface';
import { ThemeText } from '../shared/ui/ThemeText';
import { TypeBadge } from '../shared/ui/TypeBadge';
import { TypeFrame } from '../shared/ui/TypeFrame';
import { SearchBar, TypeFilter } from '../features/pokemon-list';

export function App() {
  return (
    <TamaguiAppProvider>
      <View style={styles.root}>
        <ThemeSurface>
          <ThemeText>Pokedex</ThemeText>
          <SearchBar />
          <TypeFilter value="fire" />
          <TypeFrame type="fire">
            <TypeBadge type="fire" />
          </TypeFrame>
        </ThemeSurface>
      </View>
    </TamaguiAppProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
