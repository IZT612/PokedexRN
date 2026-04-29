---
name: openspec-sync-check
description: Check a pending OpenSpec change for internal consistency and cross-artifact sync, with extra attention to dependencies, boundaries, contracts, and commonly forgotten guards.
license: MIT
compatibility: Requires a writable workspace with OpenSpec change files.
metadata:
  author: local
  version: "1.0"
---

Review a pending OpenSpec change and report specification drift, vague contracts, and missing cross-artifact updates before implementation starts.

**Input**: A change name under `openspec/changes/`, or a request to compare multiple pending changes together. The request may also include an intended apply order.

## Steps

1. **Read the local guidance first**

   Review:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/workflow.md`
   - `.opencode/rulesets/openspec-cross-change-compatibility.md`
   - `.opencode/rulesets/openspec-guard-planning.md`

2. **Collect the relevant artifacts**

   For each requested change, read:
   - `proposal.md`
   - `design.md`
   - `tasks.md`
   - every spec delta under `specs/**/spec.md`

   If the request compares multiple changes, read all of their artifacts before drawing conclusions.

3. **Check internal sync within each change**

   Verify that the proposal, design, tasks, and spec deltas agree on:
   - feature ownership
   - layering and terminology
   - concrete contracts and return shapes
   - action behavior and guards
   - testing expectations

   Flag decisions that appear in one artifact but are missing from the others.

4. **Check cross-change compatibility when relevant**

   If more than one pending change is involved:
   - verify the intended apply order
   - confirm the earlier change provides the contracts the later change expects
   - confirm the later change does not redefine terms or boundaries differently
   - call out any missing dependency declaration or sequencing note

5. **Look for commonly forgotten guards**

   For async, stateful, or paginated changes, check whether the artifacts specify:
   - blocking or ignoring conflicting actions while loading
   - clearing errors before a new request
   - denying actions when preconditions fail
   - replace vs append behavior
   - pagination stop conditions
   - derived state vs duplicated mutable state

6. **Classify issues by severity**

   Use these categories:
   - `blocker`: implementation would require guessing or likely rework
   - `gap`: important clarification still recommended before implementation
   - `cleanup`: wording or structure improvement that does not block work

7. **Recommend exact next steps**

   Summarize whether the change is implementation-ready. If not, name the specific artifacts and decisions that still need updates.

## Output

Return:
- readiness verdict for each change
- intended apply order when relevant
- findings listed by severity with file references
- a short compatibility verdict when multiple changes are compared
- a short list of concrete next edits when the change is not ready

## Guardrails

- Do not implement code unless the user explicitly asks for implementation.
- Do not rewrite the change automatically unless the user asks for edits.
- Keep findings focused on contracts, boundaries, sequencing, and guards rather than stylistic nits.
- Treat missing dependency declarations and undefined async behavior as first-class review concerns.
