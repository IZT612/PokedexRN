import assert from "node:assert/strict";
import test from "node:test";

import {
  FAVORITE_POKEMON_IDS_STORAGE_KEY,
  createFavoritePokemonStorage,
  normalizeFavoritePokemonIds,
} from "./favoritePokemonStorage";

test("normalizeFavoritePokemonIds keeps positive unique integer ids", () => {
  assert.deepEqual(
    normalizeFavoritePokemonIds([25, 6, 25, -1, 0, 9.2, "4", 150]),
    [25, 6, 150],
  );
});

test("loadFavoritePokemonIds returns empty array when storage is empty", async () => {
  const storage = createFavoritePokemonStorage({
    getItem: async () => null,
    setItem: async () => undefined,
  });

  assert.deepEqual(await storage.loadFavoritePokemonIds(), []);
});

test("loadFavoritePokemonIds parses and normalizes stored ids", async () => {
  const storage = createFavoritePokemonStorage({
    getItem: async (key) => {
      assert.equal(key, FAVORITE_POKEMON_IDS_STORAGE_KEY);
      return JSON.stringify([4, 25, 4, -3, 150]);
    },
    setItem: async () => undefined,
  });

  assert.deepEqual(await storage.loadFavoritePokemonIds(), [4, 25, 150]);
});

test("saveFavoritePokemonIds stores normalized ids as json", async () => {
  let savedValue = "";
  const storage = createFavoritePokemonStorage({
    getItem: async () => null,
    setItem: async (key, value) => {
      assert.equal(key, FAVORITE_POKEMON_IDS_STORAGE_KEY);
      savedValue = value;
    },
  });

  await storage.saveFavoritePokemonIds([7, 7, 25, -1, 151]);

  assert.equal(savedValue, JSON.stringify([7, 25, 151]));
});
