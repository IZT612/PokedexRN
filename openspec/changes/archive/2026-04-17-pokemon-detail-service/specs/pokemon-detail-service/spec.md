## ADDED Requirements

### Requirement: Pokemon-detail service fetches detail data
The system SHALL provide a pokemon-detail feature data service function that retrieves one Pokemon detail through the shared API client.

#### Scenario: Pokemon detail is requested successfully
- **WHEN** a caller requests a Pokemon detail through the pokemon-detail service
- **THEN** the service SHALL perform the request through the shared API client and return the resolved detail payload

#### Scenario: Pokemon detail logic stays in the pokemon-detail feature
- **WHEN** the Pokemon detail service is implemented
- **THEN** it SHALL live under `src/features/pokemon-detail/data/` rather than a shared catch-all location

### Requirement: Pokemon-detail service parses the required detail fields
The system MUST parse the raw detail endpoint payload into the feature-owned `PokemonDetailResponse` shape.

#### Scenario: Detail payload is parsed
- **WHEN** the Pokemon detail service receives a successful detail response
- **THEN** it SHALL return the fields required by `PokemonDetailResponse` rather than exposing the raw endpoint payload directly

#### Scenario: Only required data is exposed
- **WHEN** the Pokemon detail service maps the endpoint response
- **THEN** it SHALL include the fields currently required by the feature contract and omit unrelated endpoint data

### Requirement: Pokemon-detail service forwards normalized request failures
The system MUST surface shared API client failures from the Pokemon detail service using the normalized error shape already produced by the shared API client.

#### Scenario: Detail request fails
- **WHEN** the Pokemon detail service request is rejected by the shared API client
- **THEN** the service SHALL reject with the same normalized error shape provided by the client

### Requirement: Pokemon-detail service has focused automated tests
The system MUST include automated tests for the pokemon-detail service behavior.

#### Scenario: Success path is covered
- **WHEN** the pokemon-detail service tests are added
- **THEN** they SHALL verify successful detail retrieval and response parsing

#### Scenario: Failure path is covered
- **WHEN** the pokemon-detail service tests are added
- **THEN** they SHALL verify that normalized API client failures are propagated by the service

#### Scenario: Tests run offline
- **WHEN** the pokemon-detail service tests are executed in local or CI environments
- **THEN** they SHALL mock shared API client behavior rather than use live API calls so the suite can run reliably offline
