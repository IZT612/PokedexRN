## ADDED Requirements

### Requirement: Pokemon-detail service fetches detail data
The system SHALL keep any pokemon-detail service logic as feature-owned detail data support, but feature consumers that need async Pokemon detail data MUST use the pokemon-detail repository as the fetch boundary.

#### Scenario: Repository consumes detail service support
- **WHEN** Pokemon detail data is loaded for feature state
- **THEN** the pokemon-detail repository SHALL own the fetch workflow consumed by the caller instead of exposing the service function as the primary boundary

#### Scenario: Pokemon detail logic stays in the pokemon-detail feature
- **WHEN** the Pokemon detail service or supporting detail-fetch logic is implemented
- **THEN** it SHALL live under `src/features/pokemon-detail/data/` rather than a shared catch-all location

### Requirement: Pokemon-detail service parses the required detail fields
The system MUST parse the raw detail endpoint payload into the feature-owned `PokemonDetailResponse` shape so the pokemon-detail repository can transform that response into store-friendly Pokemon data.

#### Scenario: Detail payload is parsed
- **WHEN** the pokemon-detail service receives a successful detail response
- **THEN** it SHALL return the fields required by `PokemonDetailResponse` rather than exposing the raw endpoint payload directly

#### Scenario: Only required data is exposed
- **WHEN** the pokemon-detail service maps the endpoint response
- **THEN** it SHALL include the fields currently required by the feature contract and omit unrelated endpoint data

#### Scenario: Repository consumes parsed detail data
- **WHEN** the pokemon-detail service retrieves a successful raw detail payload
- **THEN** it SHALL provide `PokemonDetailResponse` as the parsed API-facing contract for repository transformation rather than exposing the raw API payload directly

### Requirement: Pokemon-detail service forwards normalized request failures
The system MUST surface shared API client failures for Pokemon detail retrieval using the normalized error shape already produced by the shared API client, including when lower-level pokemon-detail service logic supports the repository.

#### Scenario: Detail request fails
- **WHEN** the pokemon-detail repository or lower-level detail service request is rejected by the shared API client
- **THEN** the caller SHALL receive the same normalized error shape provided by the client

### Requirement: Pokemon-detail service has focused automated tests
The system MUST include automated tests for pokemon-detail retrieval behavior at the appropriate layer boundaries.

#### Scenario: Success path is covered
- **WHEN** the pokemon-detail retrieval tests are added
- **THEN** they SHALL verify successful detail retrieval and response parsing through the repository boundary

#### Scenario: Failure path is covered
- **WHEN** the pokemon-detail retrieval tests are added
- **THEN** they SHALL verify that normalized API client failures are propagated by the repository-supported detail flow

#### Scenario: Tests run offline
- **WHEN** the pokemon-detail service tests are executed in local or CI environments
- **THEN** they SHALL mock shared API client behavior rather than use live API calls so the suite can run reliably offline
