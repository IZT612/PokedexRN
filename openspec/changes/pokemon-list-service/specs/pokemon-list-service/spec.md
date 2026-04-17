## ADDED Requirements

### Requirement: Pokemon-list service fetches list data
The system SHALL provide a pokemon-list feature data service function that retrieves Pokemon list data through the shared API client.

#### Scenario: Pokemon list is requested successfully
- **WHEN** a caller requests the Pokemon list through the pokemon-list service
- **THEN** the service SHALL perform the request through the shared API client and return the resolved list payload

#### Scenario: Pokemon list logic stays in the pokemon-list feature
- **WHEN** the Pokemon list service is implemented
- **THEN** it SHALL live under `src/features/pokemon-list/data/` rather than a shared catch-all location

### Requirement: Pokemon-list service fetches type data
The system SHALL provide a pokemon-list feature data service function that retrieves the available Pokemon type data through the shared API client.

#### Scenario: Pokemon types are requested successfully
- **WHEN** a caller requests Pokemon types through the pokemon-list service
- **THEN** the service SHALL perform the request through the shared API client and return the resolved type payload

#### Scenario: Type retrieval remains owned by the feature until reuse is proven
- **WHEN** Pokemon type data is currently only needed by pokemon-list behavior
- **THEN** the retrieval logic SHALL remain in the pokemon-list feature rather than being promoted to shared data preemptively

### Requirement: Pokemon-list service forwards normalized request failures
The system MUST surface shared API client failures from the Pokemon list service using the normalized error shape already produced by the shared API client.

#### Scenario: List request fails
- **WHEN** the Pokemon list service request is rejected by the shared API client
- **THEN** the service SHALL reject with the same normalized error shape provided by the client

#### Scenario: Type request fails
- **WHEN** the Pokemon type service request is rejected by the shared API client
- **THEN** the service SHALL reject with the same normalized error shape provided by the client

### Requirement: Pokemon-list service has focused automated tests
The system MUST include automated tests for the pokemon-list service behavior.

#### Scenario: Success paths are covered
- **WHEN** the pokemon-list service tests are added
- **THEN** they SHALL verify successful Pokemon list retrieval and successful Pokemon type retrieval

#### Scenario: Failure paths are covered
- **WHEN** the pokemon-list service tests are added
- **THEN** they SHALL verify that normalized API client failures are propagated for both service functions
