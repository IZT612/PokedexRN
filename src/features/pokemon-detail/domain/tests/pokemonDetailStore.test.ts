import assert from "node:assert/strict";
import test from "node:test";

import type { Pokemon } from "../../../../shared/data/entities";
import type { ApiClientError } from "../../../../shared/data/api";
import {
  createPokemonDetailStore,
  initialPokemonDetailState,
  type PokemonDetailStoreDependencies,
} from "../pokemonDetailStore";

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
  overrides: Partial<PokemonDetailStoreDependencies> = {},
): PokemonDetailStoreDependencies {
  return {
    fetchPokemonDetail: async (identifier) =>
      createPokemon(Number(identifier), String(identifier)),
    loadFavoritePokemonIds: async () => [],
    saveFavoritePokemonIds: async () => undefined,
    ...overrides,
  };
}

test("createPokemonDetailStore starts from the expected initial state", () => {
  const store = createPokemonDetailStore();

  assert.equal(store.getState().pokemon, initialPokemonDetailState.pokemon);
  assert.equal(store.getState().loading, false);
  assert.equal(store.getState().error, null);
  assert.equal(store.getState().activePokemonId, null);
  assert.deepEqual(
    store.getState().favoritePokemonIds,
    initialPokemonDetailState.favoritePokemonIds,
  );
  assert.equal(store.getState().favoritePokemonIdsLoading, false);
  assert.equal(store.getState().favoritePokemonIdsSaving, false);
  assert.equal(store.getState().favoritePokemonIdsHydrated, false);
  assert.equal(store.getState().favoritePokemonIdsError, null);
});

test("loadPokemonDetail loads the selected pokemon by id", async () => {
  const bulbasaur = createPokemon(1, "bulbasaur", ["grass", "poison"]);
  const store = createPokemonDetailStore(
    createDependencies({
      fetchPokemonDetail: async (identifier) => {
        assert.equal(identifier, 1);
        return bulbasaur;
      },
    }),
  );

  await store.getState().loadPokemonDetail(1);

  assert.equal(store.getState().activePokemonId, 1);
  assert.equal(store.getState().loading, false);
  assert.equal(store.getState().error, null);
  assert.deepEqual(store.getState().pokemon, bulbasaur);
});

test("loadPokemonDetail ignores duplicate in-flight requests for the same id", async () => {
  const deferred = createDeferred<Pokemon>();
  let calls = 0;
  const store = createPokemonDetailStore(
    createDependencies({
      fetchPokemonDetail: async () => {
        calls += 1;
        return deferred.promise;
      },
    }),
  );

  const firstRequest = store.getState().loadPokemonDetail(25);
  const secondRequest = store.getState().loadPokemonDetail(25);

  assert.equal(calls, 1);
  deferred.resolve(createPokemon(25, "pikachu", ["electric"]));

  await Promise.all([firstRequest, secondRequest]);
  assert.equal(store.getState().loading, false);
});

test("loadPokemonDetail ignores stale responses after a newer selection", async () => {
  const firstDeferred = createDeferred<Pokemon>();
  const secondDeferred = createDeferred<Pokemon>();
  const store = createPokemonDetailStore(
    createDependencies({
      fetchPokemonDetail: (identifier) => {
        if (identifier === 1) {
          return firstDeferred.promise;
        }

        return secondDeferred.promise;
      },
    }),
  );

  const firstRequest = store.getState().loadPokemonDetail(1);
  const secondRequest = store.getState().loadPokemonDetail(25);

  secondDeferred.resolve(createPokemon(25, "pikachu", ["electric"]));
  await secondRequest;

  firstDeferred.resolve(createPokemon(1, "bulbasaur", ["grass"]));
  await firstRequest;

  assert.equal(store.getState().activePokemonId, 25);
  assert.equal(store.getState().pokemon?.id, 25);
  assert.equal(store.getState().pokemon?.name, "pikachu");
});

test("loadPokemonDetail clears previous errors before a new request", async () => {
  const deferred = createDeferred<Pokemon>();
  const previousError: ApiClientError = {
    type: "network",
    message: "Network request failed",
  };
  const store = createPokemonDetailStore(
    createDependencies({
      fetchPokemonDetail: () => deferred.promise,
    }),
  );

  store.setState({ error: previousError });

  const request = store.getState().loadPokemonDetail(4);

  assert.equal(store.getState().error, null);
  assert.equal(store.getState().loading, true);

  deferred.resolve(createPokemon(4, "charmander", ["fire"]));
  await request;
});

test("loadFavoritePokemonIds hydrates persisted favorites", async () => {
  const store = createPokemonDetailStore(
    createDependencies({
      loadFavoritePokemonIds: async () => [25, 6],
    }),
  );

  await store.getState().loadFavoritePokemonIds();

  assert.deepEqual(store.getState().favoritePokemonIds, [25, 6]);
  assert.equal(store.getState().favoritePokemonIdsHydrated, true);
  assert.equal(store.getState().favoritePokemonIdsLoading, false);
  assert.equal(store.getState().favoritePokemonIdsError, null);
});

test("loadFavoritePokemonIds clears previous errors before a new request", async () => {
  const deferred = createDeferred<number[]>();
  const store = createPokemonDetailStore(
    createDependencies({
      loadFavoritePokemonIds: () => deferred.promise,
    }),
  );

  store.setState({ favoritePokemonIdsError: new Error("Storage failed") });

  const request = store.getState().loadFavoritePokemonIds();

  assert.equal(store.getState().favoritePokemonIdsError, null);
  assert.equal(store.getState().favoritePokemonIdsLoading, true);

  deferred.resolve([25]);
  await request;
});

test("toggleFavorite saves and removes pokemon ids without clearing on reload", async () => {
  const store = createPokemonDetailStore(
    createDependencies({
      fetchPokemonDetail: async () =>
        createPokemon(25, "pikachu", ["electric"]),
    }),
  );

  store.setState({ favoritePokemonIdsHydrated: true });

  await store.getState().toggleFavorite(25);
  assert.deepEqual(store.getState().favoritePokemonIds, [25]);

  await store.getState().loadPokemonDetail(25);
  assert.deepEqual(store.getState().favoritePokemonIds, [25]);

  await store.getState().toggleFavorite(25);
  assert.deepEqual(store.getState().favoritePokemonIds, []);
});

test("toggleFavorite persists favorite id changes", async () => {
  let savedFavoritePokemonIds: number[] = [];
  const store = createPokemonDetailStore(
    createDependencies({
      saveFavoritePokemonIds: async (favoritePokemonIds) => {
        savedFavoritePokemonIds = favoritePokemonIds;
      },
    }),
  );

  store.setState({ favoritePokemonIdsHydrated: true });

  await store.getState().toggleFavorite(150);

  assert.deepEqual(savedFavoritePokemonIds, [150]);
  assert.equal(store.getState().favoritePokemonIdsSaving, false);
});

test("toggleFavorite reverts favorite ids and stores error when persistence fails", async () => {
  const store = createPokemonDetailStore(
    createDependencies({
      saveFavoritePokemonIds: async () => {
        throw new Error("Disk full");
      },
    }),
  );

  store.setState({
    favoritePokemonIdsHydrated: true,
    favoritePokemonIds: [25],
  });

  await store.getState().toggleFavorite(25);

  assert.deepEqual(store.getState().favoritePokemonIds, [25]);
  assert.equal(store.getState().favoritePokemonIdsSaving, false);
  assert.equal(store.getState().favoritePokemonIdsError?.message, "Disk full");
});
