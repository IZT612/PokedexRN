# Code Style

- Prefer small, local changes over broad refactors.
- Match the existing file style: named exports, straightforward functions, and minimal indirection.
- Keep types close to the code that owns them unless they are clearly shared.
- Add comments only when the intent is not obvious from the code itself.
- Avoid introducing new dependencies unless there is a clear payoff.

## When Editing

- Check whether a similar helper, entity, or UI primitive already exists before adding a new one.
- For UI work, prefer Tamagui components and props over custom React Native `StyleSheet` or inline view styling whenever Tamagui can express the same behavior.
- Keep components token-driven so visual updates stay centralized.
- The use of existing color tokens is mandatory. Do not introduce ad hoc brand, surface, border, text, or type colors when a value should come from `src/theme/tokens.ts` or existing shared token helpers.
- Never leave hardcoded UI colors in component code when the color is intended to be reused or is part of the design system; define it in `src/theme/tokens.ts` and reference the token instead.
- When adding exports, make sure import paths stay clean and consistent with the current barrel-file pattern.
- Avoid touching unrelated files just to reshape the project.
