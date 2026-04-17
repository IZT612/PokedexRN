## ADDED Requirements

### Requirement: Shared Tamagui configuration
The application MUST provide a root `tamagui.config.ts` configuration that can be imported by the UI layer as the shared design-system entry point.

#### Scenario: UI imports the config
- **WHEN** the application initializes its Tamagui provider or UI styling layer
- **THEN** it can import the shared Tamagui configuration from a single root module

### Requirement: PRD-aligned design tokens
The Tamagui configuration MUST define shared tokens for brand colors, Pokemon type colors, typography, and spacing that match the PRD design system values.

#### Scenario: Tokens match the PRD
- **WHEN** a component reads theme tokens for color or layout values
- **THEN** the token values correspond to the PRD-defined palette and scale

### Requirement: Reusable theme foundation
The Tamagui configuration MUST expose a reusable theme foundation for UI components so screens can use consistent brand, surface, and semantic type styling.

#### Scenario: Components use shared theme values
- **WHEN** a component renders a card, badge, or filter control
- **THEN** it can use shared theme values instead of hard-coded styling constants

### Requirement: Shared typography defaults
The Tamagui configuration MUST establish shared typography defaults, including the primary font family and scale, to keep text styling consistent across the app.

#### Scenario: Text uses shared typography
- **WHEN** a component renders headings or body text
- **THEN** it can apply the shared Tamagui typography defaults
