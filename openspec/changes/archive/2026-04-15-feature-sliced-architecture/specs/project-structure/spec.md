## ADDED Requirements

### Requirement: Root source structure
The application MUST organize source code under a `src/` root with explicit top-level folders for app bootstrap, features, and shared code.

#### Scenario: Source folders exist
- **WHEN** a developer inspects the project source tree
- **THEN** the `src/` root contains distinct top-level folders for app, features, and shared code

### Requirement: Feature isolation
The application MUST keep feature code isolated under feature-specific folders and each feature MUST contain separate `domain`, `data`, and `ui` layers so each vertical slice can evolve independently.

#### Scenario: Feature code stays grouped
- **WHEN** a new user-facing capability is added
- **THEN** its implementation lives inside a dedicated feature folder with separate `domain`, `data`, and `ui` subfolders

### Requirement: Shared module boundary
The application MUST provide a shared folder for reusable components, utilities, and design primitives, and the shared folder MUST contain its own `domain`, `data`, and `ui` layers for code consumed by multiple features.

#### Scenario: Multiple features reuse shared code
- **WHEN** two or more features need the same component or helper
- **THEN** they import it from the shared module boundary, which is also split into `domain`, `data`, and `ui`

### Requirement: Stable barrel exports
The application MUST expose empty or minimal `index.ts` barrel files for the main folders and the per-layer subfolders so module entry points remain stable as the codebase grows.

#### Scenario: Import entry points stay consistent
- **WHEN** a developer imports from a top-level layer or one of its sublayers
- **THEN** the layer can be referenced through its barrel export
