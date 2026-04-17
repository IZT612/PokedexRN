## ADDED Requirements

### Requirement: Shared Pok\u00e9API client
The system SHALL provide a shared API client module for Pok\u00e9API requests that is reusable by feature data modules.

#### Scenario: Client is configured for Pok\u00e9API
- **WHEN** a data module imports the shared client
- **THEN** it SHALL send requests relative to `https://pokeapi.co/api/v2`

#### Scenario: Client is accessible from shared data layer
- **WHEN** feature-level data code needs to call the API
- **THEN** it SHALL be able to import the configured client from the shared data layer without redefining base request settings

#### Scenario: API code is grouped under shared data
- **WHEN** API-related infrastructure files are added for shared data access
- **THEN** they SHALL be placed under `src/shared/data/api/`, including `client.ts`

### Requirement: Request timeout is enforced
The shared API client MUST enforce a `10` second timeout on outbound requests so stalled calls fail predictably instead of hanging indefinitely.

#### Scenario: Request exceeds timeout
- **WHEN** a request takes longer than the configured timeout
- **THEN** the client SHALL reject the request with a normalized timeout error

#### Scenario: Timeout configuration is inspected
- **WHEN** the shared client instance is created
- **THEN** its timeout SHALL be configured as `10000` milliseconds

### Requirement: Transport failures are normalized
The shared API client MUST convert transport and unexpected response failures into a predictable application-facing plain typed object.

#### Scenario: Network failure occurs
- **WHEN** the request cannot reach the API due to connectivity or transport issues
- **THEN** the client SHALL reject with a normalized network error instead of exposing a raw Axios error directly

#### Scenario: API responds with an unexpected failure
- **WHEN** the API responds with an error status or malformed failure
- **THEN** the client SHALL reject with a normalized API error that preserves enough context for debugging

#### Scenario: Error shape is consumed by callers
- **WHEN** a caller handles a client failure
- **THEN** it SHALL receive a plain typed object and SHALL NOT need to depend on class-based error instances

### Requirement: Client behavior is unit tested
The shared API client MUST include unit coverage for configuration and normalized failure behavior, and the implementation MUST be corrected until the test suite passes.

#### Scenario: Unit test validates client configuration
- **WHEN** the client unit tests run
- **THEN** they SHALL verify the configured base URL and `10000` millisecond timeout

#### Scenario: Unit test validates normalized failures
- **WHEN** the client unit tests run against timeout or transport failures
- **THEN** they SHALL verify the returned error matches the plain typed object contract

#### Scenario: Test suite is executed for completion
- **WHEN** the change is implemented
- **THEN** all project tests SHALL pass before the work is considered complete
