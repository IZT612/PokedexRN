## ADDED Requirements

### Requirement: Pokemon detail screen displays the selected Pokemon
The application MUST provide a Pokemon detail screen that renders the selected Pokemon using the `pokemon-detail` feature UI.

#### Scenario: Detail screen opens for a selected Pokemon
- **WHEN** the app navigates to the detail screen with a Pokemon id
- **THEN** the screen SHALL load and render that Pokemon's detail data

<!-- Had to specify Pokemon had to be fetched again, instead of reusing data from the list -->
#### Scenario: Detail screen refetches by id instead of reusing list summary data
- **WHEN** the app opens the detail screen for a selected Pokemon
- **THEN** the detail flow SHALL request that Pokemon again by id through the detail data path instead of treating the list-screen summary data as the source of truth

### Requirement: Detail screen shows the requested content
The detail screen MUST display a large Pokemon image, the Pokemon name, id, types, height, weight, abilities, and stats.

#### Scenario: Detail screen renders the requested fields
- **WHEN** a Pokemon detail load succeeds
- **THEN** the screen SHALL show the Pokemon image, name, id, all types, height, weight, abilities, and stats

#### Scenario: Official artwork is used as the hero image
- **WHEN** the detail screen renders the large Pokemon image
- **THEN** it SHALL use the Pokemon's `official_artwork` image when that value is available

#### Scenario: Missing official artwork falls back safely
- **WHEN** the selected Pokemon has no `official_artwork` image
- **THEN** the detail screen SHALL render a non-broken fallback state in the hero area instead of crashing or showing a broken image

### Requirement: Detail hero styling uses Pokemon type colors
The detail screen MUST style the Pokemon image area using the existing Pokemon type color tokens.

#### Scenario: Primary type colors the hero background
- **WHEN** the detail screen renders a Pokemon with at least one type
- **THEN** the hero image background SHALL use the primary type color

#### Scenario: Secondary type colors the hero border
- **WHEN** the detail screen renders a Pokemon with two types
- **THEN** the hero image area SHALL use the secondary type color for its border treatment

#### Scenario: Single-type Pokemon use a neutral border fallback
- **WHEN** the detail screen renders a Pokemon with only one type
- **THEN** the hero image area SHALL use the existing neutral border treatment instead of inventing a second type color

### Requirement: Detail screen represents stats with normalized bars
The detail screen MUST render each Pokemon stat as a bar whose fill amount is normalized against a maximum value of `255`.

#### Scenario: Mid-range stat fills around half of the bar
- **WHEN** the detail screen renders a stat with value `123`
- **THEN** that stat's bar SHALL be filled to approximately half of the available width

#### Scenario: Stat bars never overflow their track
- **WHEN** the detail screen renders any stat value
- **THEN** the rendered bar fill SHALL clamp to the valid range from empty to full width

### Requirement: Detail screen supports loading, failure, and retry states
The detail screen MUST expose clear loading and error behavior while loading Pokemon detail data.

#### Scenario: Initial detail load shows loading feedback
- **WHEN** the detail screen is waiting for the selected Pokemon detail response
- **THEN** it SHALL show loading feedback instead of incomplete detail content

#### Scenario: Detail load failure shows actionable error feedback
- **WHEN** the selected Pokemon detail request fails
- **THEN** the screen SHALL display an error state with a retry action

#### Scenario: Retry reloads the same selected Pokemon
- **WHEN** the user activates retry from the detail error state
- **THEN** the screen SHALL request detail data again for the currently selected Pokemon id

### Requirement: Detail screen provides back navigation
The detail screen MUST provide a back action that returns the user to the list screen.

#### Scenario: Back action returns to the list
- **WHEN** the user presses the detail screen back action
- **THEN** the application SHALL navigate back to the list screen

#### Scenario: Returning to the list preserves prior browsing context
- **WHEN** the user returns from the detail screen to the list screen
- **THEN** the previously loaded list results and active filters SHALL remain intact

### Requirement: Detail screen supports favorite toggling
The detail screen MUST provide a heart action that toggles whether the selected Pokemon is in the current session's favorites set.

#### Scenario: Heart action adds the Pokemon to favorites
- **WHEN** the selected Pokemon is not currently a favorite and the user presses the heart action
- **THEN** the application SHALL add that Pokemon to the current session's favorites set

#### Scenario: Heart action removes the Pokemon from favorites
- **WHEN** the selected Pokemon is already a favorite and the user presses the heart action
- **THEN** the application SHALL remove that Pokemon from the current session's favorites set

#### Scenario: Favorite state remains stable during detail reload
- **WHEN** the detail screen reloads data for a Pokemon that is already in the current session's favorites set
- **THEN** the heart action SHALL continue to reflect that Pokemon as favorited

<!-- Favorite persistance will be added later, should specify in a ruleset that if I don't mention anything about something that is not completely related to the current change, assume it won't be added yet -->
#### Scenario: Favorite state is not persisted yet
- **WHEN** the current app session ends and a new session starts later
- **THEN** the system SHALL not require prior favorite state to be restored by this change
