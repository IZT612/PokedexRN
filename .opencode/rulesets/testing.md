# Testing

## Testing Expectations

- Add or update focused tests when changing shared logic, especially under `src/shared/data`.
- The existing test setup uses Node's built-in test runner with `*.test.ts` files.
- Prefer mocked tests over live external dependencies so automated checks can run reliably offline.
- When a change has relevant automated tests available, do not consider the implementation complete until those tests pass; keep fixing failures and rerunning the tests until they succeed.
- When automated tests are not available, manually check the changed behavior before considering the work complete; if you find errors, fix them and repeat the manual verification until the change behaves correctly.
- When adding new tests, prefer keeping them close to the code they cover in a specific subfolder. For example, code in `src/shared/data/api/` should generally have tests under `src/shared/data/api/tests/`.
- For UI-heavy changes, at minimum run `npm test` and `npx tsc --noEmit` before finishing.
