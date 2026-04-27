## MODIFIED Requirements

### Requirement: Screen renders Pokemon cards with key summary data
The list screen MUST render the Pokemon results as cards that show the Pokemon image, id, name, and types.

#### Scenario: Pokemon card displays requested fields
- **WHEN** a Pokemon is shown in the list
- **THEN** its card SHALL display the Pokemon image, id, name, and all of its types

#### Scenario: Pokemon card uses official artwork
- **WHEN** a Pokemon card renders its image
- **THEN** it SHALL use the Pokemon's `official_artwork` image from the shared `Pokemon` entity

#### Scenario: Pokemon card opens the detail screen
- **WHEN** a user taps or clicks a Pokemon card in the list
- **THEN** the application SHALL open the detail screen for that specific Pokemon
