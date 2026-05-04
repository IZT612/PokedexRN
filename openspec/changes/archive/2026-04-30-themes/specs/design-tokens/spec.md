## MODIFIED Requirements

### Requirement: Shared brand tokens
The application MUST define shared brand tokens for light and dark themes, covering primary, secondary, background, surface, text, and border colors so UI components can use a consistent visual foundation across device appearance modes.

#### Scenario: Components consume light-theme brand tokens
- **WHEN** a screen or component requests base UI colors while the active theme is light
- **THEN** it receives the shared light-theme token values across the app

#### Scenario: Components consume dark-theme brand tokens
- **WHEN** a screen or component requests base UI colors while the active theme is dark
- **THEN** it receives the shared dark-theme token values across the app
