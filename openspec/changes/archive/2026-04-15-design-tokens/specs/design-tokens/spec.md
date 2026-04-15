## ADDED Requirements

### Requirement: Shared brand tokens
The application MUST define shared brand tokens for primary, secondary, background, surface, text, and border colors so UI components can use a consistent visual foundation.

#### Scenario: Components consume brand tokens
- **WHEN** a screen or component requests base UI colors
- **THEN** it receives the same shared token values across the app

### Requirement: Semantic type tokens
The application MUST define a semantic color token for each supported Pokémon type so badges, borders, and filters can represent types consistently.

#### Scenario: Type labels use semantic colors
- **WHEN** the UI renders a Pokémon type label
- **THEN** it can map the type to a dedicated token value

### Requirement: Typography tokens
The application MUST define shared typography tokens for font family, size, weight, and line height so text styles remain consistent across screens.

#### Scenario: Text styles use shared typography
- **WHEN** a component renders headings, body text, or labels
- **THEN** it can reference the shared typography tokens instead of local values

### Requirement: Spacing tokens
The application MUST define a shared spacing scale for padding, margins, and gaps so layout rhythm remains consistent across responsive screens.

#### Scenario: Layout uses spacing scale
- **WHEN** a component defines spacing between UI elements
- **THEN** it uses the shared spacing tokens instead of hard-coded values
