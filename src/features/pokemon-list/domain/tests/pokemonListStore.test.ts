import assert from "node:assert/strict";
import test from "node:test";

import type { Pokemon } from "../../../../shared/data/entities";
import type { ApiClientError } from "../../../../shared/data/api";
import {
  createPokemonListStore,
  initialPokemonListState,
  type PokemonListStoreDependencies,
} from "../pokemonListStore";

function createPokemon(id: number, name: string, type = "grass"): Pokemon {
  return {
    id,
    name,
    sprites: {
      official_artwork: `${name}-official.png`,
      front_default: `${name}.png`,
    },
    types: [{ slot: 1, name: type }],
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
  overrides: Partial<PokemonListStoreDependencies> = {},
): PokemonListStoreDependencies {
  return {
    fetchPokemonList: async () => ({
      count: 0,
      limit: 30,
      offset: 0,
      next: null,
      previous: null,
      results: [],
    }),
    fetchPokemonTypes: async () => [],
    ...overrides,
  };
}

test("createPokemonListStore starts from the expected initial state", () => {
  const store = createPokemonListStore();

  assert.deepEqual(store.getState().pokemon, initialPokemonListState.pokemon);
  assert.deepEqual(
    store.getState().filteredPokemon,
    initialPokemonListState.filteredPokemon,
  );
  assert.deepEqual(
    store.getState().typeOptions,
    initialPokemonListState.typeOptions,
  );
  assert.equal(store.getState().listLoading, false);
  assert.equal(store.getState().nextBatchLoading, false);
  assert.equal(store.getState().typeOptionsLoading, false);
  assert.equal(store.getState().error, null);
  assert.equal(store.getState().query, "");
  assert.equal(store.getState().selectedType, null);
  assert.equal(store.getState().count, 0);
  assert.equal(store.getState().next, null);
  assert.equal(store.getState().previous, null);
  assert.equal(store.getState().limit, 30);
  assert.equal(store.getState().offset, 0);
});

test("setQuery and setSelectedType recalculate filteredPokemon from current filters", () => {
  const store = createPokemonListStore();
  const bulbasaur = createPokemon(1, "bulbasaur", "grass");
  const pikachu = createPokemon(25, "pikachu", "electric");

  store.setState({
    pokemon: [bulbasaur, pikachu],
    filteredPokemon: [bulbasaur, pikachu],
  });

  store.getState().setQuery("pi");
  assert.deepEqual(store.getState().filteredPokemon, [pikachu]);

  store.getState().setSelectedType("grass");
  assert.deepEqual(store.getState().filteredPokemon, []);

  store.getState().setQuery("");
  assert.deepEqual(store.getState().filteredPokemon, [bulbasaur]);
});

test("loadPokemonList replaces the current list and updates pagination state", async () => {
  const previousPokemon = createPokemon(4, "charmander", "fire");
  const bulbasaur = createPokemon(1, "bulbasaur", "grass");
  const ivysaur = createPokemon(2, "ivysaur", "grass");
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: async () => ({
        count: 1302,
        limit: 30,
        offset: 0,
        next: "next-page",
        previous: null,
        results: [bulbasaur, ivysaur],
      }),
    }),
  );

  store.setState({
    pokemon: [previousPokemon],
    filteredPokemon: [previousPokemon],
    query: "bulb",
  });

  await store.getState().loadPokemonList();

  assert.deepEqual(store.getState().pokemon, [bulbasaur, ivysaur]);
  assert.deepEqual(store.getState().filteredPokemon, [bulbasaur]);
  assert.equal(store.getState().count, 1302);
  assert.equal(store.getState().limit, 30);
  assert.equal(store.getState().offset, 0);
  assert.equal(store.getState().next, "next-page");
  assert.equal(store.getState().listLoading, false);
  assert.equal(store.getState().error, null);
});

test("loadNextPokemonBatch appends results and advances offset by one batch", async () => {
  const bulbasaur = createPokemon(1, "bulbasaur", "grass");
  const ivysaur = createPokemon(2, "ivysaur", "grass");
  const venusaur = createPokemon(3, "venusaur", "grass");
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: async (options) => {
        assert.equal(options?.limit, 30);
        assert.equal(options?.offset, 30);

        return {
          count: 1302,
          limit: 30,
          offset: 30,
          next: "after-next-page",
          previous: "previous-page",
          results: [ivysaur, venusaur],
        };
      },
    }),
  );

  store.setState({
    pokemon: [bulbasaur],
    filteredPokemon: [bulbasaur],
    count: 1302,
    next: "next-page",
    previous: null,
    limit: 30,
    offset: 0,
  });

  await store.getState().loadNextPokemonBatch();

  assert.deepEqual(store.getState().pokemon, [bulbasaur, ivysaur, venusaur]);
  assert.deepEqual(store.getState().filteredPokemon, [
    bulbasaur,
    ivysaur,
    venusaur,
  ]);
  assert.equal(store.getState().offset, 30);
  assert.equal(store.getState().next, "after-next-page");
  assert.equal(store.getState().previous, "previous-page");
  assert.equal(store.getState().nextBatchLoading, false);
});

test("loadPokemonTypes stores available type options", async () => {
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonTypes: async () => [{ name: "grass" }, { name: "fire" }],
    }),
  );

  await store.getState().loadPokemonTypes();

  assert.deepEqual(store.getState().typeOptions, [
    { name: "grass" },
    { name: "fire" },
  ]);
  assert.equal(store.getState().typeOptionsLoading, false);
  assert.equal(store.getState().error, null);
});

test("async actions clear previous errors before starting a new request", async () => {
  const deferred = createDeferred<{
    count: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }>();
  const previousError: ApiClientError = {
    type: "network",
    message: "Network request failed",
  };
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: () => deferred.promise,
    }),
  );

  store.setState({ error: previousError });

  const loadPromise = store.getState().loadPokemonList();

  assert.equal(store.getState().listLoading, true);
  assert.equal(store.getState().error, null);

  deferred.resolve({
    count: 1302,
    limit: 30,
    offset: 0,
    next: null,
    previous: null,
    results: [createPokemon(1, "bulbasaur")],
  });

  await loadPromise;
});

test("loadPokemonList ignores overlapping requests while loading", async () => {
  const deferred = createDeferred<{
    count: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }>();
  let callCount = 0;
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: () => {
        callCount += 1;
        return deferred.promise;
      },
    }),
  );

  const firstLoad = store.getState().loadPokemonList();
  const secondLoad = store.getState().loadPokemonList();

  assert.equal(callCount, 1);

  deferred.resolve({
    count: 1302,
    limit: 30,
    offset: 0,
    next: null,
    previous: null,
    results: [createPokemon(1, "bulbasaur")],
  });

  await Promise.all([firstLoad, secondLoad]);
});

test("loadPokemonTypes can run while the list is loading", async () => {
  const listDeferred = createDeferred<{
    count: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }>();
  let typeFetchCallCount = 0;
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: () => listDeferred.promise,
      fetchPokemonTypes: async () => {
        typeFetchCallCount += 1;
        return [{ name: "grass" }];
      },
    }),
  );

  const listLoadPromise = store.getState().loadPokemonList();
  await store.getState().loadPokemonTypes();

  assert.equal(store.getState().listLoading, true);
  assert.equal(store.getState().typeOptionsLoading, false);
  assert.equal(typeFetchCallCount, 1);
  assert.deepEqual(store.getState().typeOptions, [{ name: "grass" }]);

  listDeferred.resolve({
    count: 1302,
    limit: 30,
    offset: 0,
    next: null,
    previous: null,
    results: [createPokemon(1, "bulbasaur")],
  });

  await listLoadPromise;
});

test("loadNextPokemonBatch is denied when there is no next batch", async () => {
  let callCount = 0;
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: async () => {
        callCount += 1;

        return {
          count: 1302,
          limit: 30,
          offset: 30,
          next: null,
          previous: null,
          results: [createPokemon(2, "ivysaur")],
        };
      },
    }),
  );

  store.setState({
    pokemon: [createPokemon(1, "bulbasaur")],
    filteredPokemon: [createPokemon(1, "bulbasaur")],
    next: null,
    limit: 30,
    offset: 0,
  });

  await store.getState().loadNextPokemonBatch();

  assert.equal(callCount, 0);
  assert.equal(store.getState().offset, 0);
});

test("loadNextPokemonBatch preserves the previous list and stores the error on failure", async () => {
  const bulbasaur = createPokemon(1, "bulbasaur");
  const expectedError: ApiClientError = {
    type: "api",
    message: "Request failed with status code 500",
    status: 500,
  };
  const store = createPokemonListStore(
    createDependencies({
      fetchPokemonList: async () => {
        throw expectedError;
      },
    }),
  );

  store.setState({
    pokemon: [bulbasaur],
    filteredPokemon: [bulbasaur],
    next: "next-page",
    limit: 30,
    offset: 0,
  });

  await store.getState().loadNextPokemonBatch();

  assert.deepEqual(store.getState().pokemon, [bulbasaur]);
  assert.deepEqual(store.getState().filteredPokemon, [bulbasaur]);
  assert.equal(store.getState().nextBatchLoading, false);
  assert.deepEqual(store.getState().error, expectedError);
});
