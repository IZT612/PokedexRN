---
name: refactor-creator
description: Carry out requested refactors by first understanding the current structure and then applying the smallest rule-compliant change that preserves behavior.
license: MIT
compatibility: Requires a writable workspace.
metadata:
  author: local
  version: "1.0"
---

Perform a refactor while respecting the repository's rules and preserving intended behavior.

**Input**: A requested refactor, ideally including the target files or behavior, the desired outcome, and any non-goals.

## Steps

1. **Read the local guidance first**

   Review these files before refactoring:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/structure-and-architecture.md`
   - `.opencode/rulesets/code-style.md`
   - `.opencode/rulesets/testing.md`
   - `.opencode/rulesets/workflow.md`

2. **Understand the current implementation before editing**

   Read the relevant files and nearby modules.
   Identify the current behavior, ownership boundaries, and any existing abstractions that should be reused instead of replaced.

3. **Define the minimal refactor shape**

   Prefer the smallest change that achieves the user's goal.
   Keep the code in one function or file unless extraction clearly improves ownership or reuse.
   Avoid broad renames, moves, or helper creation unless they are necessary to complete the refactor cleanly.

4. **Preserve project structure and layering**

   Make sure the refactor still respects:
   - app -> features/shared -> theme/data layering
   - no casual feature-to-feature imports
   - shared data normalization staying out of UI components
   - token-driven UI instead of ad hoc styling

5. **Implement in small steps**

   Make focused edits, verifying as you go.
   If the refactor exposes an adjacent cleanup opportunity, only take it if it is necessary for correctness or directly supports the requested refactor.

6. **Update tests or verification as needed**

   Add or update focused tests when shared logic changes.
   Run the relevant automated checks. If no relevant automated tests exist, manually verify the changed behavior.

7. **Review the refactor outcome**

   Confirm that:
   - behavior is preserved unless the user requested a behavior change
   - file placement still makes sense
   - imports and exports remain clean
   - no unrelated churn was introduced

## Output

When done, summarize:
- what was refactored
- why the chosen shape was the smallest correct change
- tests or verification performed
- any constraints or assumptions that affected the refactor

## Guardrails

- Default to local refactors, not structural rewrites.
- Do not create backward-compatibility code unless there is a concrete need.
- Do not add dependencies for a refactor unless there is a clear payoff.
- Stop and ask a short question if the refactor goal conflicts with the current architecture or implies a behavior change that is not clearly requested.
