## ADDED Requirements

### Requirement: Feature-owned Pokemon repositories
The system MUST provide feature-owned Pokemon repositories so feature stores can load Pokemon data through a repository boundary instead of calling API-facing code directly.

#### Scenario: Repository modules match feature ownership
- **WHEN** Pokemon repository code is added
- **THEN** separate repository modules SHALL exist for the pokemon-list and pokemon-detail features instead of a shared cross-feature repository

### Requirement: Repositories fetch through the shared API client
Pokemon repositories MUST perform their fetch operations through the shared API client so transport configuration and normalized error handling stay centralized.

#### Scenario: List repository loads Pokemon data
- **WHEN** a caller requests Pokemon list data through the pokemon-list repository
- **THEN** the repository SHALL perform the necessary API requests through the shared API client and return store-friendly Pokemon list data

#### Scenario: Detail repository loads Pokemon data
- **WHEN** a caller requests one Pokemon through the pokemon-detail repository
- **THEN** the repository SHALL perform the necessary API request through the shared API client and return store-friendly Pokemon detail data

### Requirement: Repositories consume API-facing response contracts and expose store-facing results
Pokemon repositories MUST consume feature-owned API-facing response contracts and transform them into store-facing results instead of exposing raw API payloads or feature response DTOs directly to stores.

#### Scenario: Repository flow stays layered
- **WHEN** Pokemon data is loaded for store state
- **THEN** the flow SHALL remain `raw API payload -> feature response contract -> repository -> store-facing result`

### Requirement: Repositories transform feature responses into store-friendly Pokemon data
Pokemon repositories MUST convert feature response contracts such as `PokemonListResponse` and `PokemonDetailResponse` into clean data shaped for feature stores, using the shared `Pokemon` entity for Pokemon state.

#### Scenario: List repository maps list responses for store state
- **WHEN** the pokemon-list repository receives list-related response data
- **THEN** it SHALL expose Pokemon collection data for the store using the shared `Pokemon` entity shape rather than raw or feature-response DTOs

#### Scenario: Detail repository maps detail responses for store state
- **WHEN** the pokemon-detail repository receives detail response data
- **THEN** it SHALL expose one Pokemon for the store using the shared `Pokemon` entity shape rather than the feature-response DTO directly

### Requirement: Pokemon-list repository preserves list metadata needed by stores
The pokemon-list repository MUST return Pokemon list data together with the list metadata needed by store callers to continue pagination correctly.

<!-- Offset and limit added manually to keep track of the fetched pokemon -->
#### Scenario: List repository returns pagination metadata
- **WHEN** the pokemon-list repository returns Pokemon list data
- **THEN** the result SHALL include `count`, `next`, `previous`, `limit`, and `offset` alongside the `Pokemon[]` results

#### Scenario: List repository exposes the fixed batch size
- **WHEN** the pokemon-list repository returns the current batch metadata
- **THEN** the `limit` value SHALL be `30`

### Requirement: Pokemon-list repository returns Pokemon types
The pokemon-list repository MUST expose type-loading results as `PokemonType[]` while type retrieval remains owned by the pokemon-list feature.

#### Scenario: Type results use the shared type entity
- **WHEN** a caller requests Pokemon types through the pokemon-list repository
- **THEN** the repository SHALL return `PokemonType[]` rather than a narrower ad hoc type shape

### Requirement: Repository behavior is covered by focused tests
The system MUST include focused automated tests for Pokemon repository behavior, including data transformation and normalized failure propagation.

#### Scenario: Repository success paths are covered
- **WHEN** repository tests run
- **THEN** they SHALL verify successful fetch and response-to-domain transformation for the list and detail repositories without using live API calls

#### Scenario: Repository failure paths are covered
- **WHEN** repository tests run against shared API client failures
- **THEN** they SHALL verify the repositories propagate the normalized failure shape expected by callers
