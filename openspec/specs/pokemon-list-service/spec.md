## ADDED Requirements

### Requirement: Pokemon-list service fetches list data
The system SHALL keep any pokemon-list service logic as feature-owned list data support, but feature consumers that need async Pokemon list data MUST use the pokemon-list repository as the fetch boundary.

#### Scenario: Repository consumes list service support
- **WHEN** Pokemon list data is loaded for feature state
- **THEN** the pokemon-list repository SHALL own the fetch workflow consumed by the caller instead of exposing the service function as the primary boundary

#### Scenario: Pokemon list logic stays in the pokemon-list feature
- **WHEN** the Pokemon list service or supporting list-fetch logic is implemented
- **THEN** it SHALL live under `src/features/pokemon-list/data/` rather than a shared catch-all location

### Requirement: Pokemon-list service parses raw API payloads into feature response contracts
The system MUST treat pokemon-list service logic as the API-facing parsing layer that converts raw list-related API payloads into feature-owned response contracts for repository consumption.

#### Scenario: List payload is parsed for the repository
- **WHEN** the pokemon-list service receives a successful raw list payload
- **THEN** it SHALL return a feature-owned response contract instead of exposing the raw API payload directly to store-facing consumers

### Requirement: Pokemon-list service fetches type data
The system SHALL keep pokemon-list type retrieval logic feature-owned, but feature consumers that need async Pokemon type data MUST use the pokemon-list repository as the fetch boundary.

#### Scenario: Repository consumes type retrieval support
- **WHEN** Pokemon type data is loaded for feature state
- **THEN** the pokemon-list repository SHALL own the type-fetch workflow consumed by the caller instead of exposing the service function as the primary boundary

#### Scenario: Type retrieval remains owned by the feature until reuse is proven
- **WHEN** Pokemon type data is currently only needed by pokemon-list behavior
- **THEN** the retrieval logic SHALL remain in the pokemon-list feature rather than being promoted to shared data preemptively

#### Scenario: Type parsing supports repository results
- **WHEN** pokemon-list type retrieval logic returns type data for repository consumption
- **THEN** it SHALL provide the data needed for the repository to expose `PokemonType[]` to callers

### Requirement: Pokemon-list service forwards normalized request failures
The system MUST surface shared API client failures for list-related retrieval using the normalized error shape already produced by the shared API client, including when lower-level pokemon-list service logic supports the repository.

#### Scenario: List request fails
- **WHEN** the pokemon-list repository or lower-level list service request is rejected by the shared API client
- **THEN** the caller SHALL receive the same normalized error shape provided by the client

#### Scenario: Type request fails
- **WHEN** the pokemon-list repository or lower-level type retrieval request is rejected by the shared API client
- **THEN** the caller SHALL receive the same normalized error shape provided by the client

### Requirement: Pokemon-list service has focused automated tests
The system MUST include automated tests for pokemon-list retrieval behavior at the appropriate layer boundaries.

#### Scenario: Success paths are covered
- **WHEN** the pokemon-list retrieval tests are added
- **THEN** they SHALL verify successful Pokemon list retrieval and successful Pokemon type retrieval at the service layer

#### Scenario: Failure paths are covered
- **WHEN** the pokemon-list retrieval tests are added
- **THEN** they SHALL verify that normalized API client failures are propagated for list and type loading
