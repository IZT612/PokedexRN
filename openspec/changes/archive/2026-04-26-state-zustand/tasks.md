## 1. Store structure

- [x] 1.1 Add the first Zustand store under the `pokemon-list` feature and place it in a structure-compliant feature module.
- [x] 1.2 Define the store state types and initial state values for the full first-pass `pokemon-list` state, including Pokemon data, loading, error, query, selected type, type options, and pagination metadata such as `count`, `next`, `previous`, `limit`, and `offset`.

## 2. Data and store implementation

- [x] 2.1 Introduce or adapt repository abstractions needed for the feature store to load Pokemon data without calling the API client directly from store logic.
- [x] 2.2 Implement the Zustand store actions and setters using the shared `Pokemon` entity type as the canonical Pokemon shape in state, deriving `filteredPokemon[]` from the stored Pokemon collection and active filters.
- [x] 2.3 Add guarded loading and error behavior so invalid state transitions are prevented according to the store contract, including ignoring conflicting actions while loading, clearing errors before new requests, and denying next-batch requests when no further batch exists.
- [x] 2.4 Update any required exports so the store and supporting modules can be imported through the repo's existing module boundaries.

## 3. Verification

- [x] 3.1 Add focused automated tests for initial state, setter behavior, special actions, and loading and error flows.
- [x] 3.2 Run the relevant automated checks and fix any issues needed for the Zustand store change.
