import { brandColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { SearchBar } from '@/src/features/pokemonList/ui/components/SearchBar';
import { TypeFilter } from '@/src/features/pokemonList/ui/components/TypeFilter';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export const ListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pokédex</Text>
        </View>
        <View style={styles.mainContent}>
          {/* Filters and search container */}
          <View style={styles.filtersContainer}>
            <SearchBar />
            <TypeFilter />
          </View>
          {/* List container */}
          <View style={styles.listContainer}>
            <Text style={styles.placeholderText}>
              Pokemon list will go here
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brandColors.backgroundLight,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
  },
  header: {
    // Other Spacing tokens are way too far from 40 to replace it for any of the tokens
    paddingTop: Platform.OS === 'android' ? 40 : Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    color: brandColors.primaryRed,
  },
  mainContent: {
    flex: 1,
  },
  filtersContainer: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: brandColors.surfaceLight,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: BorderRadius.xs,
    elevation: 2,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brandColors.surfaceLight,
    borderRadius: BorderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: BorderRadius.xs,
    elevation: 2,
  },
  placeholderText: {
    fontSize: Typography.fontSize.md,
    color: '#666666',
    fontStyle: 'italic',
  },
});
