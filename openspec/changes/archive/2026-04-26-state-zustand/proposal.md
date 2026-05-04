## Why

The app currently lacks a dedicated feature-owned state layer, which makes it harder to centralize non-trivial UI and async state as the Pokemon features grow. Introducing Zustand now creates a clear state boundary for each feature without forcing unrelated concerns into a single global store.

## What Changes

- Introduce Zustand-based state management through one store per feature instead of a single global app store.
- Add an initial `pokemon-list` feature store, because the list screen is the default initial screen, with explicit state types and initial values for list data, loading, errors, query, selected type, pagination metadata, and other feature-owned state needed by the first implementation.
- Standardize store entity usage on the shared `Pokemon` type instead of a separate `PokemonDetailResponse` state shape.
- Keep data fetching behind repositories rather than embedding fetch details directly into UI components.
- Do not enable Zustand devtools for this change.
- Add focused tests covering initial state, setters, loading and error flows, and important action guards.

## Capabilities

### New Capabilities
- `zustand-state-management`: Define how the app manages feature-owned client state with Zustand stores, typed state, repository-backed actions, and test coverage.

### Modified Capabilities

## Impact

- Affected code will live primarily under feature-owned modules, plus nearby tests.
- Uses the already-available `zustand` dependency without introducing a new state library.
- Introduces repository-backed store actions and a consistent typed state shape for future feature stores.
