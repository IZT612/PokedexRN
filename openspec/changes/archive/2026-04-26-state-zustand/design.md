## Context

<!-- It was being debated whether store should be global or per-feature. I've decided to make one store per-feature as each screen need different things so it will help maintain things simple. -->
The app already depends on `zustand`, but it does not yet have a dedicated store layer for feature-owned client state. The clarified direction is to create one store per feature rather than a single global store, starting with `pokemon-list` because the list screen is the default initial screen. The implementation needs to respect the current repo layering, keep store concerns out of UI components, use repositories for fetching, standardize state entities on the shared `Pokemon` type, and add direct store-level test coverage for initial state, setters, loading and error flows, and guarded actions.

## Goals / Non-Goals

**Goals:**
- Introduce a clear Zustand-backed state module for feature-owned Pokemon state.
- Define explicit initial state and state types close to the store implementation.
- Keep the placement aligned with the repo structure by placing the store inside the owning feature.
- Add focused tests that validate initialization, setters, loading and error flows, and important action guards without relying on UI integration.

**Non-Goals:**
- Rebuild the app around a large global store abstraction.
- Add persistence or cross-session hydration.
- Enable Zustand devtools for this change.
- Force unrelated features into Zustand as part of the initial adoption.

## Decisions

### Use Zustand for feature-owned client state
Zustand is already available in the repo, so using it avoids introducing a new dependency and gives each feature a lightweight state layer without introducing a global app store.

Alternative considered: keep state local in components.
This was rejected because the change is intended to centralize non-trivial feature state outside UI components.

<!-- We'll separate stores per feature to not have a single big store which will store unneeded states for simpler screens. Also, only one store per feature will be allowed, as that will keep all the store logic together instead of separating them into small stores which would make navigation and error searching more complicated. (One store per feature should be small enough to allow searching for specific parts of the code without much effort) -->
### Use one store per feature
The first implementation should create a single store for `pokemon-list` rather than a root global store. That keeps state boundaries aligned with the existing feature architecture and avoids mixing unrelated concerns. Future features should follow the same one-store-per-feature approach, but each feature store should only own the state it actually needs. For example, `pokemon-detail` would not need pagination metadata.

Alternative considered: create a single root app store immediately.
This was rejected because the repo already favors feature ownership and there is no confirmed need for cross-feature global state.

### Place the store under the owning feature
The store implementation and its state types should live close together in a feature-owned module, likely under the feature `domain` layer so the store becomes the owner of feature state rather than UI or raw data modules.

Alternative considered: define the store inside UI files.
This was rejected because it would mix state ownership with rendering concerns.

<!-- Specified the use of repositories to not give the store fetch logic (separating responsibilities) -->
### Use repositories for fetching actions
Async store actions should call repositories instead of embedding request details directly in the store or UI. This keeps store actions focused on state transitions while the data layer remains responsible for retrieval details.

Alternative considered: let store actions call API clients directly.
This was rejected because it would bypass the intended repository boundary and make state logic more tightly coupled to transport details.

<!-- Since repositories will return clean domain data (Pokemon entity) there's no need to use the raw API PokemonDetailResponse shape. -->
### Use shared Pokemon entities in store state
Store state should use the shared `Pokemon` entity as the canonical Pokemon shape instead of maintaining a separate `PokemonDetailResponse` shape in state.

Alternative considered: keep separate list and detail response shapes in store state.
This was rejected because the current shapes overlap heavily and the shared entity keeps store state simpler.

<!-- Specified filtered pokemon list must be derived since it's determined by the active filters -->
### Derive filtered Pokemon from store inputs
The `pokemon-list` store should derive `filteredPokemon[]` from the canonical Pokemon collection and the currently selected filter inputs such as query text and selected type. The filtered collection should not be treated as an independently fetched source of truth because it depends entirely on other store values.

Alternative considered: store `filteredPokemon[]` as independent mutable state.
This was rejected because it would duplicate derivable data and increase the risk of stale filter results.

<!-- To separate more responsibilities, specifying that paging logic is exclusive to pokemon-lsit store was needed. -->
### Keep pagination state in the pokemon-list store
The initial `pokemon-list` store should own the pagination metadata returned by the list repository, including `count`, `next`, `previous`, `limit`, and `offset`, because the list screen needs that state to request subsequent batches correctly. The initial load should use `limit = 30` and `offset = 0`. Initial list loading should replace the current Pokemon list so refresh behavior can reuse the same flow safely. Each successful next-batch request should advance `offset` to `current offset + limit` so the store fetches Pokemon in batches of 30, and next-batch loading should append the new Pokemon to the existing list instead of replacing it.

Alternative considered: keep pagination state outside the store.
This was rejected because batch progression is part of the list feature state and would otherwise leak into UI components.

<!-- Additional guards to make sure everything works correctly. -->
### Guard async store actions while loading or when no next batch exists
The `pokemon-list` store should ignore actions that would start a conflicting request while loading, including overlapping append requests while a next-batch load is already in progress. Before each new request, the store should clear any previous error state. Requests for the next batch should be denied when there is no remaining batch to load, such as when `next` is `null`.

Alternative considered: allow overlapping requests and let callers handle invalid transitions.
This was rejected because it would make store behavior less predictable and push correctness concerns into UI code.

### Test store behavior directly
Tests should exercise initial state, setter behavior, loading and error flows, and guarded actions at the store level. This keeps verification fast and avoids coupling the initial state-management change to UI tests.

Alternative considered: rely only on screen-level tests.
This was rejected because store behavior can be validated more directly and with less noise through focused store tests.

### Do not enable devtools
The initial implementation should omit Zustand devtools.

Alternative considered: add devtools from day one.
This was rejected because the clarified direction is to keep the first store implementation minimal.

## Risks / Trade-offs

- Introducing a new state layer too early could create indirection for simple flows. -> Keep the first store owned by one feature and limit it to the state that feature actually needs.
- A single feature store may still become too broad if it mixes entity state and too many UI concerns. -> Keep the state shape explicit and split only when a clear sub-boundary appears.
- Repository actions add another abstraction layer. -> Reuse existing data modules where possible and keep repository interfaces narrow.
- Store tests may become brittle if they depend on UI concerns. -> Keep tests at the store API level and avoid rendering dependencies.
