## ADDED Requirements

### Requirement: Default Pokedex list screen
The application MUST provide a default Home screen that renders the main Pokedex list experience using the `pokemon-list` feature UI.

#### Scenario: App opens on the list screen
- **WHEN** the application renders its default screen
- **THEN** it SHALL show the `pokemon-list` screen as the Home experience instead of the current placeholder content

### Requirement: Screen shows the requested layout sections
The list screen MUST render a header, a filter section, a Pokemon results section, and a footer in that order.

#### Scenario: Header shows the app title
- **WHEN** the list screen is visible
- **THEN** it SHALL display a header with the text `PokedexRN`

#### Scenario: Filter section appears above the list
- **WHEN** the list screen is visible
- **THEN** it SHALL render the search input and horizontal type filter row above the Pokemon results section

#### Scenario: Footer shows Home and Favorites actions
- **WHEN** the list screen is visible
- **THEN** it SHALL render a bottom section with `Home` and `Favorites` actions

### Requirement: Screen reuses shared UI components
The list screen MUST reuse the existing shared UI components for search, chips, cards, buttons, loading, and error display instead of creating parallel versions of those primitives.

#### Scenario: Shared search and chip components are used for filtering
- **WHEN** the filter section is rendered
- **THEN** it SHALL use the shared `SearchInput` and `Chip` components for query and type filters

#### Scenario: Shared card and chip components are used for Pokemon entries
- **WHEN** Pokemon results are rendered
- **THEN** each Pokemon entry SHALL use the shared `Card` component and its displayed types SHALL use the shared `Chip` component

### Requirement: Screen renders Pokemon cards with key summary data
The list screen MUST render the Pokemon results as cards that show the Pokemon image, id, name, and types.

#### Scenario: Pokemon card displays requested fields
- **WHEN** a Pokemon is shown in the list
- **THEN** its card SHALL display the Pokemon image, id, name, and all of its types

### Requirement: Screen loads and uses list-screen store data
The list screen MUST consume the `pokemon-list` store for result data, type options, active filters, and store-driven loading and error states.

#### Scenario: Initial screen load requests data through the store
- **WHEN** the list screen first mounts
- **THEN** it SHALL trigger the store actions needed to load the initial Pokemon list and available type options

#### Scenario: Screen renders filtered results from store state
- **WHEN** the store updates the current filtered Pokemon collection
- **THEN** the list screen SHALL render those filtered results as the visible Pokemon list

### Requirement: Screen supports query and type filtering
The list screen MUST allow users to filter Pokemon by name, by type, and by combining both filters.

#### Scenario: Query filter updates visible results
- **WHEN** a user changes the search input value
- **THEN** the screen SHALL update the store query state and reflect the resulting filtered Pokemon list

#### Scenario: Type filter updates visible results
- **WHEN** a user selects or clears a type filter chip
- **THEN** the screen SHALL update the store selected type state and reflect the resulting filtered Pokemon list

#### Scenario: Query and type filters combine
- **WHEN** a user has both a query filter and a selected type filter active
- **THEN** the visible Pokemon list SHALL reflect the intersection of those active filters

### Requirement: Screen supports incremental list loading
The list screen MUST expose the store's next-batch pagination behavior from within the Pokemon results section.

#### Scenario: Reaching the end requests the next batch
- **WHEN** a user reaches the end of the currently rendered Pokemon list and another batch is available
- **THEN** the screen SHALL request the next batch through the store

#### Scenario: Additional Pokemon are appended
- **WHEN** the next batch load succeeds
- **THEN** the screen SHALL show the newly appended Pokemon results after the existing visible list

### Requirement: Screen communicates loading and error states
The list screen MUST display loading and error states using the existing shared feedback components.

#### Scenario: Initial load shows loading feedback
- **WHEN** the list screen is waiting for the first Pokemon list response
- **THEN** it SHALL show loading feedback to the user

#### Scenario: Error state is visible to the user
- **WHEN** the list screen has a current store error state
- **THEN** it SHALL display that failure using the shared error-message component

### Requirement: Footer prepares future Favorites navigation
The list screen MUST prepare the future Favorites destination without treating it as a completed feature yet.

#### Scenario: Home appears as the active default action
- **WHEN** the footer is rendered on the default list screen
- **THEN** the `Home` action SHALL appear as the current active/default action

#### Scenario: Favorites appears as a placeholder action
- **WHEN** the footer is rendered before the Favorites feature exists
- **THEN** the `Favorites` action SHALL be visible as a placeholder without requiring real navigation behavior yet

<!-- Everything great, except there's no mention about the tokens and brandcolors. -->
