import assert from "node:assert/strict";
import test from "node:test";

import type { Pokemon } from "../../../../shared/data/entities";
import type { ApiClientError } from "../../../../shared/data/api";
import {
  createFavoritesStore,
  initialFavoritesState,
  type FavoritesStoreDependencies,
} from "../favoritesStore";

function createPokemon(id: number, name: string, types = ["grass"]): Pokemon {
  return {
    id,
    name,
    sprites: {
      official_artwork: `${name}-official.png`,
      front_default: `${name}.png`,
    },
    types: types.map((type, index) => ({ slot: index + 1, name: type })),
    stats: [{ name: "hp", base_stat: 45 }],
    abilities: [{ name: "overgrow", is_hidden: false }],
    weight: 69,
    height: 7,
  };
}

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((innerResolve, innerReject) => {
    resolve = innerResolve;
    reject = innerReject;
  });

  return { promise, resolve, reject };
}

function createDependencies(
  overrides: Partial<FavoritesStoreDependencies> = {},
): FavoritesStoreDependencies {
  return {
    fetchFavoritePokemonByIds: async (favoritePokemonIds) =>
      favoritePokemonIds.map((favoritePokemonId) =>
        createPokemon(favoritePokemonId, `pokemon-${favoritePokemonId}`),
      ),
    fetchPokemonTypes: async () => [
      { name: "electric" },
      { name: "fire" },
      { name: "grass" },
    ],
    ...overrides,
  };
}

test("createFavoritesStore starts from the expected initial state", () => {
  const store = createFavoritesStore();

  assert.deepEqual(
    store.getState().favoritePokemonIds,
    initialFavoritesState.favoritePokemonIds,
  );
  assert.deepEqual(store.getState().pokemon, initialFavoritesState.pokemon);
  assert.deepEqual(
    store.getState().filteredPokemon,
    initialFavoritesState.filteredPokemon,
  );
  assert.deepEqual(
    store.getState().typeOptions,
    initialFavoritesState.typeOptions,
  );
  assert.equal(store.getState().loading, false);
  assert.equal(store.getState().error, null);
  assert.equal(store.getState().query, "");
  assert.equal(store.getState().selectedType, null);
});

test("syncFavoritePokemonIds loads missing favorites and preserves requested order", async () => {
  const pikachu = createPokemon(25, "pikachu", ["electric"]);
  const charizard = createPokemon(6, "charizard", ["fire", "flying"]);
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: async (favoritePokemonIds) => {
        assert.deepEqual(favoritePokemonIds, [25, 6]);
        return [pikachu, charizard];
      },
      fetchPokemonTypes: async () => [
        { name: "electric" },
        { name: "fire" },
        { name: "flying" },
        { name: "grass" },
      ],
    }),
  );

  await store.getState().syncFavoritePokemonIds([25, 6]);

  assert.deepEqual(store.getState().favoritePokemonIds, [25, 6]);
  assert.deepEqual(store.getState().pokemon, [pikachu, charizard]);
  assert.deepEqual(store.getState().filteredPokemon, [pikachu, charizard]);
  assert.deepEqual(store.getState().typeOptions, [
    { name: "electric" },
    { name: "fire" },
    { name: "flying" },
    { name: "grass" },
  ]);
});

test("syncFavoritePokemonIds keeps the full type catalog when favorites use fewer types", async () => {
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: async () => [
        createPokemon(25, "pikachu", ["electric"]),
      ],
      fetchPokemonTypes: async () => [
        { name: "electric" },
        { name: "bug" },
        { name: "water" },
      ],
    }),
  );

  await store.getState().syncFavoritePokemonIds([25]);

  assert.deepEqual(store.getState().typeOptions, [
    { name: "electric" },
    { name: "bug" },
    { name: "water" },
  ]);
});

test("syncFavoritePokemonIds keeps fetched type order while pushing stellar and unknown last", async () => {
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: async () => [
        createPokemon(25, "pikachu", ["electric"]),
      ],
      fetchPokemonTypes: async () => [
        { name: "normal" },
        { name: "fighting" },
        { name: "stellar" },
        { name: "flying" },
        { name: "unknown" },
        { name: "fairy" },
      ],
    }),
  );

  await store.getState().syncFavoritePokemonIds([25]);

  assert.deepEqual(store.getState().typeOptions, [
    { name: "normal" },
    { name: "fighting" },
    { name: "flying" },
    { name: "fairy" },
    { name: "stellar" },
    { name: "unknown" },
  ]);
});

test("syncFavoritePokemonIds removes unfavorited pokemon immediately from state", async () => {
  const bulbasaur = createPokemon(1, "bulbasaur", ["grass", "poison"]);
  const pikachu = createPokemon(25, "pikachu", ["electric"]);
  const store = createFavoritesStore();

  store.setState({
    favoritePokemonIds: [1, 25],
    pokemon: [bulbasaur, pikachu],
    filteredPokemon: [bulbasaur, pikachu],
    typeOptions: [{ name: "electric" }, { name: "grass" }, { name: "poison" }],
  });

  await store.getState().syncFavoritePokemonIds([25]);

  assert.deepEqual(store.getState().favoritePokemonIds, [25]);
  assert.deepEqual(store.getState().pokemon, [pikachu]);
  assert.deepEqual(store.getState().filteredPokemon, [pikachu]);
});

test("setQuery and setSelectedType filter the visible favorites", async () => {
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: async () => [
        createPokemon(1, "bulbasaur", ["grass"]),
        createPokemon(25, "pikachu", ["electric"]),
      ],
    }),
  );

  await store.getState().syncFavoritePokemonIds([1, 25]);
  store.getState().setQuery("pi");
  assert.equal(store.getState().filteredPokemon[0]?.name, "pikachu");

  store.getState().setSelectedType("grass");
  assert.deepEqual(store.getState().filteredPokemon, []);

  store.getState().setQuery("");
  assert.equal(store.getState().filteredPokemon[0]?.name, "bulbasaur");
});

test("syncFavoritePokemonIds clears previous errors before a new load", async () => {
  const deferred = createDeferred<Pokemon[]>();
  const previousError: ApiClientError = {
    type: "network",
    message: "Network request failed",
  };
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: () => deferred.promise,
    }),
  );

  store.setState({ error: previousError });
  const request = store.getState().syncFavoritePokemonIds([4]);

  assert.equal(store.getState().error, null);
  assert.equal(store.getState().loading, true);

  deferred.resolve([createPokemon(4, "charmander", ["fire"])]);
  await request;
});

test("syncFavoritePokemonIds ignores duplicate in-flight loads for the same ids", async () => {
  const deferred = createDeferred<Pokemon[]>();
  let calls = 0;
  const store = createFavoritesStore(
    createDependencies({
      fetchFavoritePokemonByIds: async () => {
        calls += 1;
        return deferred.promise;
      },
    }),
  );

  const firstRequest = store.getState().syncFavoritePokemonIds([25]);
  const secondRequest = store.getState().syncFavoritePokemonIds([25]);

  assert.equal(calls, 1);

  deferred.resolve([createPokemon(25, "pikachu", ["electric"])]);
  await Promise.all([firstRequest, secondRequest]);
});
