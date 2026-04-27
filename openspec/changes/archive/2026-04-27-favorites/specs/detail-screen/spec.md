## MODIFIED Requirements

### Requirement: Detail screen supports favorite toggling
The detail screen MUST provide a heart action that toggles whether the selected Pokemon is in the persisted favorites set.

#### Scenario: Heart action adds the Pokemon to persisted favorites
- **WHEN** the selected Pokemon is not currently a favorite and the user presses the heart action
- **THEN** the application SHALL add that Pokemon to the persisted favorites set

#### Scenario: Heart action removes the Pokemon from persisted favorites
- **WHEN** the selected Pokemon is already a favorite and the user presses the heart action
- **THEN** the application SHALL remove that Pokemon from the persisted favorites set

#### Scenario: Favorite state remains stable during detail reload
- **WHEN** the detail screen reloads data for a Pokemon that is already in the persisted favorites set
- **THEN** the heart action SHALL continue to reflect that Pokemon as favorited

#### Scenario: Favorite state survives app reload
- **WHEN** the current app session ends and a new session starts later
- **THEN** the system SHALL restore previously persisted favorite state for the detail heart action
