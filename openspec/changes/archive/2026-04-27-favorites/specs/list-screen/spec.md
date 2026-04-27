## MODIFIED Requirements

### Requirement: Footer prepares future Favorites navigation
The list screen MUST provide footer navigation for the current Home screen and the Favorites destination.

#### Scenario: Home appears as the active default action
- **WHEN** the footer is rendered on the default list screen
- **THEN** the `Home` action SHALL appear as the current active/default action

#### Scenario: Favorites opens the Favorites screen
- **WHEN** the user activates the `Favorites` footer action from the list screen
- **THEN** the application SHALL navigate to the Favorites screen
