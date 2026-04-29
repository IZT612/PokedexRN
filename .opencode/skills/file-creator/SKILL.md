---
name: file-creator
description: Create new files in the correct place and shape by checking the repo structure, nearby patterns, and export conventions before writing anything.
license: MIT
compatibility: Requires a writable workspace.
metadata:
  author: local
  version: "1.0"
---

Create new files while preserving the repository's structure and conventions.

**Input**: A requested file or set of files to create, plus the purpose of the change. The request may include the target feature, layer, expected exports, or testing expectations.

## Steps

1. **Read the local guidance first**

   Review these files before creating anything:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/structure-and-architecture.md`
   - `.opencode/rulesets/code-style.md`
   - `.opencode/rulesets/testing.md`

2. **Inspect the existing structure**

   Find the most relevant existing feature, shared module, or UI area before deciding on placement.
   Read nearby files to match naming, file boundaries, export style, and local patterns.

3. **Decide whether a new file is actually needed**

   Before adding a file, check whether the work belongs in an existing file, helper, entity, or barrel export.
   Prefer extending an existing local module when that is the smaller correct change.

4. **Choose the correct location**

   Apply the repo structure rules:
   - app composition in `src/app`
   - feature-specific code in `src/features/<feature-name>`
   - reusable API code and shared entities in `src/shared/data`
   - reusable UI primitives in `src/shared/ui`
   - theme tokens and helpers in `src/theme`

   Avoid dropping new files into broad buckets when a more specific subfolder is appropriate.

5. **Create the minimal file set**

   Add only the files required for the requested change.
   Keep contents aligned with nearby patterns: named exports, straightforward functions, and minimal indirection.
   If the new file becomes part of a public surface, update the relevant `index.ts` barrel file.

6. **Add adjacent tests when required**

   If the new file introduces shared logic or changes behavior that should be covered, add a focused nearby test following the repo testing rules.

7. **Verify placement and shape**

   Confirm:
   - the file path matches the intended layer
   - imports stay clean
   - barrel exports are updated when needed
   - no unrelated files were touched just to reshape the project

## Output

When done, summarize:
- created files
- why each file belongs where it was placed
- any updated barrel exports
- any tests added or intentionally not added

## Guardrails

- Prefer the smallest correct addition over scaffolding extra files.
- Do not create parallel architecture paths.
- Reuse existing tokens and shared patterns instead of inventing new ones.
- Do not move unrelated files as part of file creation.
- Ask a short clarifying question if two placements are both plausible and the better choice depends on intent.
