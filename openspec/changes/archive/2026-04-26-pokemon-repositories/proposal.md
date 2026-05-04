## Why

The pending Zustand store change needs a repository layer that shields store logic from API transport details while still keeping ownership aligned with each feature. Adding feature-separated Pokemon repositories now creates that boundary before store actions are implemented and avoids pushing list and detail concerns into a single shared abstraction too early.

## What Changes

- Add feature-owned repository modules for Pokemon list and Pokemon detail flows so stores depend on repositories instead of calling API-facing code directly.
- Define repository responsibilities around fetching the corresponding feature data, consuming `PokemonListResponse` or `PokemonDetailResponse`, and returning clean store-friendly Pokemon data.
- Keep repository ownership split by feature, matching the one-store-per-feature direction from the Zustand change rather than introducing a shared cross-feature repository.
- Update the existing list and detail service contracts so repositories become the primary fetch boundary for feature consumers.

## Capabilities

### New Capabilities
- `pokemon-repositories`: Feature-owned Pokemon repositories fetch feature data and expose store-friendly domain data for list and detail flows.

### Modified Capabilities
- `pokemon-list-service`: Clarify how list-related API fetching and response parsing support the list repository boundary.
- `pokemon-detail-service`: Clarify how detail-related API fetching and response parsing support the detail repository boundary.

## Impact

- Affects `src/features/pokemon-list/data/` and `src/features/pokemon-detail/data/` by adding repository modules and exports.
- Affects the pending Zustand store implementation by defining the repository boundary that store actions will call.
- May narrow the public role of existing service modules so feature consumers use repositories for fetching and data shaping.
