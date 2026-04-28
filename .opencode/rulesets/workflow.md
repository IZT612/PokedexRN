# Workflow

## Practical Notes

- Treat implementation, commits, and pushes as separate steps that each require a direct user instruction. Do not implement a change, create a commit, and push in one go unless the user explicitly asks for that combined workflow.
- Keep commits focused on related changes. When there are unrelated edits for different purposes, split them into separate commits instead of bundling them together; for example, a `README.md` update and a new feature should normally be committed separately.

## Push Requirements

- Before any push or pull request creation, make sure every CI check defined in `.github/workflows/ci.yml` passes locally after the relevant changes.
- The required verification commands are `npm test`, `npm run prettier:check`, `npx tsc --noEmit`, and the ESLint check used by the repo (`npm run lint`, which currently runs `eslint App.tsx tamagui.config.ts src --ext .ts,.tsx`).
- If a user asks for a push or pull request and these checks have not been run after the relevant changes, run them first and fix any failures before pushing or opening the pull request.
        
