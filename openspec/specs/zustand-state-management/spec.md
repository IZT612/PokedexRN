## ADDED Requirements

### Requirement: Feature-owned state store
The system MUST provide Zustand stores for feature-owned client state so a feature can manage non-trivial state outside UI components without relying on a single global app store.

#### Scenario: Feature state is exposed through a store module
- **WHEN** a developer adds logic that needs shared state within a feature
- **THEN** that logic reads from and writes to a dedicated feature-owned Zustand store module instead of defining that shared state inside a component

### Requirement: Store state is explicitly typed and initialized
Zustand stores MUST define explicit state types and initial state values so the store shape is predictable and testable.

#### Scenario: Store is created from a known initial state
- **WHEN** a store is initialized
- **THEN** its state matches a defined initial-state object and typed state contract

### Requirement: Feature stores cover full feature state
Each feature-owned Zustand store MUST include the full set of state needed by that feature's initial implementation, including entity data, derived or filtered collections when required by the feature flow, loading state, error state, query state, selected type state, and other feature-owned values that would otherwise be scattered through UI components.

#### Scenario: Feature store owns the full first-pass state surface
- **WHEN** the first Pokemon feature store is implemented
- **THEN** it exposes the non-trivial feature state needed for the initial flow instead of leaving that state distributed across multiple UI components

#### Scenario: First store is owned by pokemon-list
- **WHEN** the first Zustand feature store is implemented
- **THEN** it SHALL belong to `pokemon-list`, because the list screen is the default initial screen

#### Scenario: Feature stores only own the state each feature needs
- **WHEN** future feature stores are added
- **THEN** each store SHALL include only the state required by its owning feature instead of inheriting unrelated list-specific state such as pagination metadata

### Requirement: Store placement follows project structure
The system MUST place Zustand stores in a structure-compliant module that matches the ownership of the state, with the initial implementation using one store per feature rather than a shared global store.

#### Scenario: Store location matches state ownership
- **WHEN** a new Zustand store file is added
- **THEN** it is placed in the relevant feature module instead of an ad hoc folder or global store location that breaks the project structure

### Requirement: Pokemon-list store owns pagination state
The initial `pokemon-list` Zustand store MUST own the pagination state required to load the list in batches, including `count`, `next`, `previous`, `limit`, and `offset`.

#### Scenario: Initial batch state is defined
- **WHEN** the `pokemon-list` store is initialized
- **THEN** it SHALL start with `limit = 30` and `offset = 0`

#### Scenario: Next-batch state advances by one batch
- **WHEN** the `pokemon-list` store successfully loads the next batch of Pokemon
- **THEN** it SHALL update `offset` to `current offset + limit`

#### Scenario: Initial load replaces the current list
- **WHEN** the `pokemon-list` store completes an initial list load or refresh load
- **THEN** it SHALL replace the current Pokemon list with the newly loaded batch

#### Scenario: Next-batch load appends to the current list
- **WHEN** the `pokemon-list` store successfully loads a subsequent batch
- **THEN** it SHALL append the new Pokemon to the existing Pokemon list instead of replacing it

### Requirement: Store actions use repositories for fetching
Async Zustand store actions MUST use repository-level abstractions for fetching so transport details stay outside the store state implementation.

#### Scenario: Store loading action uses a repository
- **WHEN** a store action needs to load Pokemon data
- **THEN** it calls a repository abstraction rather than talking directly to the API client from UI-facing state code

### Requirement: Store state uses the shared Pokemon entity
Pokemon data stored in Zustand state MUST use the shared `Pokemon` entity type instead of a separate `PokemonDetailResponse` state shape.

#### Scenario: Pokemon state uses a shared entity shape
- **WHEN** Pokemon data is written into store state
- **THEN** the state uses the shared `Pokemon` type as its canonical Pokemon shape

### Requirement: Filtered Pokemon state is derived from filters
The `pokemon-list` store MUST derive `filteredPokemon[]` from the canonical Pokemon collection and the currently selected filter inputs rather than treating the filtered collection as independent fetched state.

#### Scenario: Filtered Pokemon reflects the current filters
- **WHEN** `query`, `selectedType`, or the canonical Pokemon collection changes
- **THEN** `filteredPokemon[]` SHALL be recalculated from those current values

### Requirement: Pokemon-list store owns available type options
The `pokemon-list` store MUST own the available `PokemonType[]` values needed to display and apply type filters correctly.

#### Scenario: Type filter options are stored for the list feature
- **WHEN** the `pokemon-list` store loads available Pokemon types
- **THEN** it SHALL store the returned `PokemonType[]` so the feature can render and apply type filter options correctly

### Requirement: Store behavior is covered by focused tests
The system MUST include focused automated tests for Zustand store behavior, including initial state, setter behavior, loading and error flows, and important action guards.

#### Scenario: Store tests verify initialization and updates
- **WHEN** the automated test suite runs for the store module
- **THEN** it verifies the store's initial state and representative update paths without depending on live external systems

#### Scenario: Store tests verify guarded loading behavior
- **WHEN** the store is already in a loading state
- **THEN** guarded actions prevent invalid state transitions defined by the store contract

#### Scenario: Overlapping append requests are ignored
- **WHEN** a next-batch load is already in progress
- **THEN** additional actions that would append another batch SHALL be ignored until the current request finishes

#### Scenario: Errors are cleared before a new request
- **WHEN** a new async store request starts
- **THEN** the store SHALL clear any previous error before entering the new request state

#### Scenario: Next-batch requests are denied when no further batch exists
- **WHEN** the store has no remaining next batch to load
- **THEN** the action that requests the next batch SHALL be denied

### Requirement: Devtools are disabled
The system MUST NOT enable Zustand devtools for this change.

#### Scenario: Devtools are omitted
- **WHEN** the store is implemented
- **THEN** devtools middleware is not included
