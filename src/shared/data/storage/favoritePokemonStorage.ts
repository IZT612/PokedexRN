import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITE_POKEMON_IDS_STORAGE_KEY = "pokedexrn.favoritePokemonIds";

export type FavoritePokemonStorageEngine = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

function toStorageError(action: string, error: unknown) {
  if (error instanceof Error) {
    return new Error(
      `Failed to ${action} favorite pokemon ids: ${error.message}`,
    );
  }

  return new Error(`Failed to ${action} favorite pokemon ids`);
}

export function normalizeFavoritePokemonIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenIds = new Set<number>();
  const normalizedIds: number[] = [];

  for (const entry of value) {
    if (!Number.isInteger(entry) || entry <= 0 || seenIds.has(entry)) {
      continue;
    }

    seenIds.add(entry);
    normalizedIds.push(entry);
  }

  return normalizedIds;
}

export function createFavoritePokemonStorage(
  storage: FavoritePokemonStorageEngine,
) {
  return {
    async loadFavoritePokemonIds() {
      try {
        const rawValue = await storage.getItem(
          FAVORITE_POKEMON_IDS_STORAGE_KEY,
        );

        if (!rawValue) {
          return [];
        }

        return normalizeFavoritePokemonIds(JSON.parse(rawValue));
      } catch (error) {
        throw toStorageError("load", error);
      }
    },
    async saveFavoritePokemonIds(favoritePokemonIds: number[]) {
      try {
        await storage.setItem(
          FAVORITE_POKEMON_IDS_STORAGE_KEY,
          JSON.stringify(normalizeFavoritePokemonIds(favoritePokemonIds)),
        );
      } catch (error) {
        throw toStorageError("save", error);
      }
    },
  };
}

export const favoritePokemonStorage =
  createFavoritePokemonStorage(AsyncStorage);
