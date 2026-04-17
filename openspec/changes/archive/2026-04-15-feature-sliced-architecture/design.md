## Context

The PRD calls for clean architecture and long-term scalability, but the repository currently lacks a source tree that reflects those layers. Before feature work expands, the project needs an explicit folder structure where each feature and the shared module own separate `domain`, `data`, and `ui` layers so imports, ownership, and future refactors stay manageable.

This change is architectural and cross-cutting: it sets the codebase boundaries that future domain, data, UI, and shared code will follow.

## Goals / Non-Goals

**Goals:**
- Create a source tree that matches the PRD's clean architecture intent.
- Separate reusable shared code from feature-specific code.
- Provide stable barrel exports for top-level folders and layer subfolders.
- Keep the initial structure minimal so it can grow with the app.

**Non-Goals:**
- Implementing business logic or UI screens.
- Adding dependency injection wiring or concrete repositories.
- Reorganizing code that does not exist yet.

## Decisions

- Use `src/` as the single source root. This is the clearest way to isolate app code from repo-level files. An alternative would be placing folders at the repository root, but that makes boundaries less obvious.
- Model the project around `app`, `features`, and `shared`, with `domain`, `data`, and `ui` inside each feature and inside shared. This gives the team a direct mapping from PRD architecture to code structure. A flatter folder layout was considered, but it would not express ownership or dependency direction as clearly.
- Keep feature folders self-contained. Each vertical slice should own its domain logic, data access, and UI. Grouping all UI in a single components folder was rejected because it encourages cross-feature coupling.
- Put reusable elements in `shared` only when multiple features need them, and still split them into `domain`, `data`, and `ui`. This keeps the shared layer small and prevents it from becoming a dumping ground.
- Add empty `index.ts` barrels now. They create stable entry points without forcing implementation details to exist too early. Waiting until the code fills in would make later imports less consistent.

## Risks / Trade-offs

- [Over-segmentation] Too many folders too early can make navigation harder. → Mitigation: keep the initial tree small and add subfolders only when a feature needs them.
- [Boundary drift] Developers may place feature-specific logic into shared folders. → Mitigation: document the ownership rules and keep shared code limited to true reuse.
- [Import churn] Barrel exports can hide paths if overused. → Mitigation: use barrels only at the top-level layers, not everywhere.

## Migration Plan

1. Create the `src/` root and top-level architectural folders.
2. Add `domain`, `data`, and `ui` subfolders under each feature and under `shared`.
3. Add empty `index.ts` files to establish stable module boundaries.
4. Place future feature work into feature-specific folders instead of a global components bucket.
5. If the layout proves too coarse or too deep, adjust the structure before adding more implementation code.

## Open Questions

- Should the `app` folder contain only bootstrap code, or also navigation and provider composition?
- Do we want feature subfolders to follow a strict pattern (`ui`, `model`, `lib`) or stay flexible until more code exists?
