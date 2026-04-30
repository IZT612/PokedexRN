## ADDED Requirements

### Requirement: App theme follows the user's device appearance
The application MUST detect the user's device appearance and apply the matching app theme automatically.

#### Scenario: Light device appearance applies the light theme
- **WHEN** the user's device appearance is light
- **THEN** the application SHALL render using the light theme

#### Scenario: Dark device appearance applies the dark theme
- **WHEN** the user's device appearance is dark
- **THEN** the application SHALL render using the dark theme

#### Scenario: Device appearance change updates the active theme
- **WHEN** the user's device appearance changes while the app is running
- **THEN** the application SHALL update the active app theme to match the new device appearance

### Requirement: Active theme applies across all current screens
The active app theme MUST apply consistently across the list, detail, favorites, and shared UI surfaces.

#### Scenario: List screen follows the active theme
- **WHEN** the active app theme is applied
- **THEN** the list screen SHALL render its background, surfaces, text, and borders using that theme

#### Scenario: Detail screen follows the active theme
- **WHEN** the active app theme is applied
- **THEN** the detail screen SHALL render its background, surfaces, text, and borders using that theme

#### Scenario: Favorites screen follows the active theme
- **WHEN** the active app theme is applied
- **THEN** the Favorites screen SHALL render its background, surfaces, text, and borders using that theme

#### Scenario: Shared UI primitives follow the active theme
- **WHEN** the active app theme is applied
- **THEN** shared UI primitives SHALL read theme-driven colors instead of assuming one static palette

### Requirement: Theme state is provided centrally
The application MUST provide active theme state through a central app/provider integration point rather than per-screen appearance logic.

#### Scenario: App root resolves active theme once
- **WHEN** the application initializes its theme handling
- **THEN** it SHALL resolve the active theme from a central app/provider path that screens can consume consistently

<!-- Everything was perfectly planned and required no additional feedback -->
