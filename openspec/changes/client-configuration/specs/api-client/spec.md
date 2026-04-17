## ADDED Requirements

### Requirement: Shared Pok\u00e9API client
The system SHALL provide a shared API client module for Pok\u00e9API requests that is reusable by feature data modules.

#### Scenario: Client is configured for Pok\u00e9API
- **WHEN** a data module imports the shared client
- **THEN** it SHALL send requests relative to `https://pokeapi.co/api/v2`

#### Scenario: Client is accessible from shared data layer
- **WHEN** feature-level data code needs to call the API
- **THEN** it SHALL be able to import the configured client from the shared data layer without redefining base request settings

### Requirement: Request timeout is enforced
The shared API client MUST enforce a default timeout on outbound requests so stalled calls fail predictably instead of hanging indefinitely.

#### Scenario: Request exceeds timeout
- **WHEN** a request takes longer than the configured timeout
- **THEN** the client SHALL reject the request with a normalized timeout error

### Requirement: Transport failures are normalized
The shared API client MUST convert transport and unexpected response failures into a predictable application-facing error shape.

#### Scenario: Network failure occurs
- **WHEN** the request cannot reach the API due to connectivity or transport issues
- **THEN** the client SHALL reject with a normalized network error instead of exposing a raw Axios error directly

#### Scenario: API responds with an unexpected failure
- **WHEN** the API responds with an error status or malformed failure
- **THEN** the client SHALL reject with a normalized API error that preserves enough context for debugging
