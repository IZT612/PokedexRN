## ADDED Requirements

### Requirement: Shared Pokemon data entities are defined in shared data
The system SHALL define reusable API-facing `Pokemon` and `PokemonType` interfaces in `shared/data/entities`.

#### Scenario: Shared Pokemon entity is needed
- **WHEN** multiple features need access to common Pokemon API fields
- **THEN** the `Pokemon` interface SHALL be defined under `shared/data/entities` rather than duplicated per feature

#### Scenario: Shared Pokemon type entity is needed
- **WHEN** Pokemon type information is used across shared or feature data contracts
- **THEN** the `PokemonType` interface SHALL be defined under `shared/data/entities` rather than duplicated per feature

#### Scenario: Shared data entities are organized
- **WHEN** shared API entities are added for the data layer
- **THEN** they SHALL be placed in the dedicated shared data `entities/` folder

### Requirement: Pokemon interface includes required fields
The shared `Pokemon` interface MUST include `id`, `name`, `sprites`, `types`, `stats`, `abilities`, `weight`, and `height`.

#### Scenario: Pokemon interface is implemented
- **WHEN** the shared `Pokemon` interface is created
- **THEN** it SHALL expose the fields required by list or detail API consumers

#### Scenario: Sprites are modeled minimally
- **WHEN** the `sprites` field is defined on `Pokemon`
- **THEN** it SHALL use a minimal object shape containing only the sprite fields required by the application rather than the full raw PokéAPI sprite payload

#### Scenario: Minimal sprites include a fallback image
- **WHEN** the `sprites` field is defined on `Pokemon`
- **THEN** the minimal object SHALL include `front_default` as a fallback image field

### Requirement: Feature response interfaces are kept in their owning features
The system SHALL keep feature-specific API response interfaces inside the corresponding feature data modules.

#### Scenario: List response interface is added
- **WHEN** the list endpoint response contract is introduced
- **THEN** `PokemonListResponse` SHALL be defined inside the pokemon-list feature data layer

#### Scenario: Detail response interface is added
- **WHEN** the detail endpoint response contract is introduced
- **THEN** `PokemonDetailResponse` SHALL be defined inside the pokemon-detail feature data layer

#### Scenario: List and detail response models remain separate
- **WHEN** `PokemonListResponse` and `PokemonDetailResponse` are implemented
- **THEN** they SHALL remain fully separate response interfaces that each model their own endpoint payloads

#### Scenario: Detail response remains separate from shared Pokemon entity
- **WHEN** `PokemonDetailResponse` is implemented
- **THEN** it SHALL be defined as its own interface rather than reusing `Pokemon` directly

#### Scenario: Feature data entities are organized
- **WHEN** feature-specific API response interfaces are added
- **THEN** they SHALL be placed in dedicated feature data folders such as `entities/` when those folders own the raw API contracts

### Requirement: Response interfaces model their endpoint payloads
The system MUST define response interfaces that reflect the API payloads needed by the list and detail features.

#### Scenario: Pokemon list response is modeled
- **WHEN** `PokemonListResponse` is implemented
- **THEN** it SHALL represent the list endpoint payload used by the pokemon-list feature

#### Scenario: Pokemon detail response is modeled
- **WHEN** `PokemonDetailResponse` is implemented
- **THEN** it SHALL represent the detail endpoint payload used by the pokemon-detail feature

### Requirement: Type guards remain optional and targeted
The system MAY add type guards for the new API interfaces, but only when they are needed to narrow or validate data at a concrete boundary.

#### Scenario: Type guard is needed for unknown payloads
- **WHEN** repository or API code needs to narrow unknown response data to one of the new interfaces
- **THEN** a focused type guard MAY be added alongside the relevant data contract

#### Scenario: No concrete narrowing need exists
- **WHEN** the new interfaces are only consumed through typed application code
- **THEN** dedicated type guards SHALL NOT be introduced by default
