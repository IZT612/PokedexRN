## Why

The project needs a clear source tree before more features are added, otherwise UI, data, and shared code will grow in an unstructured way. A vertical-slice layout where both `features/` and `shared/` contain their own Clean Architecture layers will keep the Pokédex maintainable as new features like favorites, comparisons, or additional filters are introduced.

## What Changes

- Introduce a `src/` root with a feature-sliced architecture.
- Add top-level folders for `app`, `features`, and `shared`.
- Organize each feature and the shared module into separate `domain`, `data`, and `ui` layers.
- Create empty `index.ts` barrel files so each module boundary has a stable entry point.
- Keep feature code isolated so future work can be added without reshaping the whole codebase.

## Capabilities

### New Capabilities
- `project-structure`: Vertical-slice source tree with Clean Architecture layers inside each feature and the shared module.

### Modified Capabilities


## Impact

- Affects the repository source layout and import boundaries.
- Provides the foundation for future UI, domain, data, and shared component work.
- Supports the PRD's clean architecture goals by making the layers explicit in code for every feature and for shared code.
