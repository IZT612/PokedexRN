# Code Style

- Prefer small, local changes over broad refactors.
- Match the existing file style: named exports, straightforward functions, and minimal indirection.
- Keep types close to the code that owns them unless they are clearly shared.
- Add comments only when the intent is not obvious from the code itself.
- Avoid introducing new dependencies unless there is a clear payoff.

## When Editing

- Check whether a similar helper, entity, or UI primitive already exists before adding a new one.
- Keep components token-driven so visual updates stay centralized.
- When adding exports, make sure import paths stay clean and consistent with the current barrel-file pattern.
- Avoid touching unrelated files just to reshape the project.
