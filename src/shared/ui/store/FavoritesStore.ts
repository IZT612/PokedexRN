import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: (string | number)[];
  toggleFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      // Helper to check if a Pokemon is favorite (used in UI and toggle logic)
      isFavorite: (id) => get().favoriteIds.includes(id),

      toggleFavorite: (id) => {
        const favorites = get().favoriteIds;

        // If the ID is already a favorite, remove it, otherwise, add it
        const updatedFavorites = get().isFavorite(id)
          ? favorites.filter((favId) => favId !== id)
          : [...favorites, id];

        set({ favoriteIds: updatedFavorites });
      },
    }),
    {
      name: 'favorite-pokemons-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
