## MODIFIED Requirements

### Requirement: Shared Tamagui chip tag
The system MUST provide a reusable Tamagui-based chip/tag component for compact labels and filter states, and it MUST support token-driven Pokemon type styling when a screen needs type-specific visuals.

#### Scenario: Render selected tag
- **WHEN** a chip/tag is rendered in a selected state
- **THEN** it visually distinguishes the selected state from the default state

#### Scenario: Render Pokemon type tag with token-driven styling
- **WHEN** a chip/tag is rendered for a Pokemon type or Pokemon type filter
- **THEN** it SHALL be able to style that tag using the existing Pokemon type color tokens rather than screen-local ad hoc colors
