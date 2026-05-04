## ADDED Requirements

### Requirement: Favorites screen shows persisted favorite Pokemon
The application MUST provide a Favorites screen that renders the user's persisted favorite Pokemon as a browsable list.

#### Scenario: Favorites screen loads persisted favorites on entry
- **WHEN** the user opens the Favorites screen
- **THEN** the screen SHALL load the persisted favorite Pokemon ids and fetch the Pokemon data needed to render those favorites

#### Scenario: Favorites screen renders favorited Pokemon as cards
- **WHEN** persisted favorite Pokemon are available
- **THEN** the Favorites screen SHALL render those Pokemon using the same card-style browsing pattern as the main list screen

### Requirement: Favorites screen reuses list-style browsing behavior
The Favorites screen MUST support the same list-style browsing interactions as the main list screen where applicable.

#### Scenario: Favorites screen filters by query
- **WHEN** the user changes the Favorites search input
- **THEN** the screen SHALL filter the visible favorites by Pokemon name

#### Scenario: Favorites screen filters by type
- **WHEN** the user selects or clears a type filter in Favorites
- **THEN** the screen SHALL filter the visible favorites by the selected type

#### Scenario: Favorites screen combines query and type filters
- **WHEN** the user has both a query filter and a selected type filter active in Favorites
- **THEN** the visible favorites SHALL reflect the intersection of those active filters

### Requirement: Favorites screen navigates to Pokemon detail
The Favorites screen MUST allow the user to open the detail screen from a favorited Pokemon card.

#### Scenario: Favorited Pokemon card opens detail
- **WHEN** the user taps or clicks a Pokemon card in Favorites
- **THEN** the application SHALL open the detail screen for that specific Pokemon

### Requirement: Favorites list does not remove favorites directly
The Favorites screen MUST not expose direct unfavorite behavior from the Favorites list itself.

#### Scenario: Removing a favorite requires opening detail
- **WHEN** the user wants to remove a Pokemon from favorites while browsing the Favorites screen
- **THEN** the application SHALL require the user to open that Pokemon's detail screen and use the detail heart action there instead of removing it directly from the Favorites list

### Requirement: Favorites screen reflects immediate favorite removals
The Favorites screen MUST update when favorite state changes remove a Pokemon from the canonical favorites set.

#### Scenario: Removed favorite disappears from Favorites
- **WHEN** a Pokemon is removed from favorites from the detail screen while it is present in the Favorites collection
- **THEN** that Pokemon SHALL no longer appear in the canonical Favorites results or any derived filtered results

### Requirement: Favorites screen communicates empty, loading, and error states
The Favorites screen MUST provide explicit feedback for empty, loading, and error conditions.

#### Scenario: Empty favorites show a clear message
- **WHEN** there are no persisted favorite Pokemon to display
- **THEN** the Favorites screen SHALL show a clear empty-state message instead of an unexplained blank list

#### Scenario: Loading favorites shows loading feedback
- **WHEN** the Favorites screen is loading persisted favorite ids or the Pokemon data needed to render them
- **THEN** it SHALL show loading feedback to the user

#### Scenario: Favorites load failure shows retryable error feedback
- **WHEN** persisted favorites fail to load or the follow-up Pokemon fetches fail
- **THEN** the Favorites screen SHALL display an error state with a retry action
