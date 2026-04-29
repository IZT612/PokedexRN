---
name: review
description: Review recent changes before a commit, PR, or the end of apply work, focusing on placement, architecture, tests, design-system use, and unrelated churn, and fix clear issues when appropriate.
license: MIT
compatibility: Requires a writable workspace and local git access.
metadata:
  author: local
  version: "1.0"
---

Review recent code changes with this repository's rules in mind.

**Input**: Optional scope for the review, such as changed files, a branch, a commit range, a pending PR, or a note that this is the final pass after `apply`.

## Steps

1. **Read the local guidance first**

   Review these files before starting the review:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/structure-and-architecture.md`
   - `.opencode/rulesets/code-style.md`
   - `.opencode/rulesets/testing.md`
   - `.opencode/rulesets/workflow.md`

2. **Gather the review scope**

   Use non-interactive git commands to inspect recent changes.
   For pre-commit review, inspect the working tree and staged diff.
   For PR review, inspect the branch diff and included commits.
   For post-apply review, inspect the full set of changes produced by the implementation work.

3. **Review for the repo-specific risks**

   Prioritize finding:
   - wrong file placements
   - architecture violations across app, features, shared, theme, and data layers
   - missing or misplaced tests
   - token or design-system drift, including ad hoc styling that should use `src/theme/tokens.ts`
   - unrelated file churn that should be split out

4. **Check whether the code matches nearby patterns**

   Compare the changed files with adjacent modules so the review stays grounded in the actual codebase rather than generic preferences.

5. **Fix clear and local issues when appropriate**

   If the review is being run as part of active implementation work, or as the final pass after `apply`, make the smallest correct fix for issues that are obvious and local.
   After fixing, rerun any relevant validation.

6. **Escalate instead of guessing when the issue is broader**

   Pause and report when:
   - the right fix is architectural and non-trivial
   - the issue appears unrelated to the requested work
   - fixing it would mix unrelated concerns into the current change
   - expected behavior is unclear

7. **Report findings first**

   Present findings ordered by severity with file references when possible.
   If there are no findings, say so explicitly and mention any residual testing or review gaps.

## Output

Use this structure when possible:
- Findings
- Open questions or assumptions
- Brief change summary only after the findings

If fixes were applied during review, say what was fixed and what validation was rerun.

## Guardrails

- Findings are the primary output; do not bury them under summary text.
- Keep fixes minimal and directly tied to review findings.
- Do not create a commit or push as part of review unless explicitly asked.
- Do not expand the scope into unrelated cleanup.
- When reviewing a PR, inspect all changes that would land, not just the latest commit.
