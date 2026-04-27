## ADDED Requirements

### Requirement: Shared Tamagui button
The system MUST provide a reusable Tamagui-based button component with consistent sizing, variants, and disabled and loading states.

#### Scenario: Render primary action button
- **WHEN** a screen renders the shared button with a label and press handler
- **THEN** the button displays the label and invokes the handler when pressed

#### Scenario: Disable unavailable action
- **WHEN** the shared button is rendered in a disabled or loading state
- **THEN** the button prevents presses and communicates the inactive state visually

### Requirement: Shared Tamagui card
The system MUST provide a reusable Tamagui-based card component for grouping content with consistent surface, spacing, and elevation treatment.

#### Scenario: Display grouped content
- **WHEN** a screen places content inside the shared card
- **THEN** the card visually separates that content from surrounding layout

### Requirement: Shared Tamagui search input
The system MUST provide a reusable Tamagui-based search input component for filtering content with a consistent input affordance and submit behavior.

#### Scenario: Enter search text
- **WHEN** a user types into the shared search input
- **THEN** the component updates the current query value

#### Scenario: Submit search query
- **WHEN** a user submits the search input
- **THEN** the component exposes the current query to the caller

### Requirement: Shared Tamagui chip tag
The system MUST provide a reusable Tamagui-based chip/tag component for compact labels and filter states, and it MUST support token-driven Pokemon type styling when a screen needs type-specific visuals.

#### Scenario: Render selected tag
- **WHEN** a chip/tag is rendered in a selected state
- **THEN** it visually distinguishes the selected state from the default state

#### Scenario: Render Pokemon type tag with token-driven styling
- **WHEN** a chip/tag is rendered for a Pokemon type or Pokemon type filter
- **THEN** it SHALL be able to style that tag using the existing Pokemon type color tokens rather than screen-local ad hoc colors

### Requirement: Shared Tamagui loading spinner
The system MUST provide a reusable Tamagui-based loading spinner component for indicating in-progress work.

#### Scenario: Show loading state
- **WHEN** content is loading
- **THEN** the spinner appears until the loading state ends

### Requirement: Shared Tamagui error message
The system MUST provide a reusable Tamagui-based error message component for displaying user-facing failures and recovery guidance.

#### Scenario: Display failure message
- **WHEN** an operation fails
- **THEN** the error component shows a clear message describing the failure

#### Scenario: Offer retry action
- **WHEN** recovery is available
- **THEN** the error component can expose a retry action to the user
