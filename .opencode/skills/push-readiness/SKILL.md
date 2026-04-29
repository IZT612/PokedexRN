---
name: push-readiness
description: Check whether the current branch is safe to push by confirming the repo CI checks, running all applicable verification, and fixing failures when possible.
license: MIT
compatibility: Requires a writable workspace and the local project toolchain.
metadata:
  author: local
  version: "1.0"
---

Check whether the current branch is ready to push.

**Input**: Optional context about the intended push, such as the branch name, the scope of the recent changes, or whether this is a final verification before a push.

## Steps

1. **Read the local guidance first**

   Review these files before verifying push readiness:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/testing.md`
   - `.opencode/rulesets/workflow.md`
   - `.github/workflows/ci.yml`

2. **Inspect the current git state**

   Check the branch and working tree with non-interactive git commands.
   Confirm what changes are being evaluated and whether there are staged, unstaged, or untracked files.

3. **Identify the required CI contract**

   Use `.github/workflows/ci.yml` as the source of truth.
   The current CI checks are:
   - `npm test`
   - `npm run lint`
   - `npm run prettier:check`
   - `npm run typecheck`

4. **Run all applicable verification for the branch**

   Always run the full CI-equivalent checks above when the local environment supports them.
   If the changed area has additional relevant tests or validation beyond the baseline CI checks, run those too when they are available and non-redundant.

5. **Fix failures when the fix is clear and local**

   If a check fails because of an issue in the current changes, make the smallest correct fix, then rerun the affected checks.
   Keep going until the branch passes or a real blocker remains.

6. **Stop and report blockers when needed**

   Pause instead of guessing if:
   - a failure is unrelated to the requested work
   - the environment is missing required tooling or dependencies
   - the fix would require a broad or risky change
   - a failure points to unclear intended behavior

7. **Summarize push readiness clearly**

   Report:
   - whether the branch is safe to push
   - which checks were run
   - which checks passed
   - any fixes made during verification
   - any remaining blockers or risks

## Output

When done, use a concise summary like:
- Branch safe to push: yes or no
- Checks run: `...`
- Fixes made: `...`
- Remaining blocker: `...` if any

## Guardrails

- Use `.github/workflows/ci.yml` as the authoritative CI source.
- Prefer full verification over partial spot checks before a push.
- Do not push automatically unless the user explicitly asks.
- Do not ignore a failed CI-equivalent check.
- Do not make broad cleanup changes just to satisfy formatting or lint outside the relevant scope unless required by the failing checks.
