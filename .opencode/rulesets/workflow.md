# Workflow

## Practical Notes

- Treat implementation, commits, and pushes as separate steps that each require a direct user instruction. Do not implement a change, create a commit, and push in one go unless the user explicitly asks for that combined workflow.
- Keep commits focused on related changes. When there are unrelated edits for different purposes, split them into separate commits instead of bundling them together; for example, a `README.md` update and a new feature should normally be committed separately.

## Push Requirements

- Before any push, make sure the CI checks defined in `.github/workflows/ci.yml` pass locally or have otherwise been verified to pass.
- The current CI workflow runs these checks: `npm test`, `npm run lint`, `npm run prettier:check`, and `npm run typecheck`.
- If a user asks for a push and these checks have not been run after the relevant changes, run them first and fix any failures before pushing.
        