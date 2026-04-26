---
name: skill-creator
description: Create a new local skill under `.opencode/skills/` using the existing repo conventions and without adding unrelated command files.
license: MIT
compatibility: Requires a writable workspace.
metadata:
  author: local
  version: "1.0"
---

Create a new skill that fits this repository's local `.opencode` layout.

**Input**: A requested skill name and purpose. The request may also include constraints, expected inputs, output style, or guardrails.

## Steps

1. **Read the local guidance first**

   Review these files before creating the skill:
   - `AGENTS.md`
   - `.opencode/rulesets/project-context.md`
   - `.opencode/rulesets/structure-and-architecture.md`
   - `.opencode/rulesets/code-style.md`
   - `.opencode/rulesets/testing.md`
   - `.opencode/rulesets/workflow.md`

2. **Inspect existing skills**

   Read nearby skill files in `.opencode/skills/*/SKILL.md` to match the local structure, tone, and frontmatter conventions.

3. **Clarify only what is necessary**

   If the name, purpose, or operating boundary is ambiguous, ask a short question before writing the skill.

4. **Create only the skill file unless explicitly asked for more**

   Default output:
   - `.opencode/skills/<skill-name>/SKILL.md`

   Do not add a command file under `.opencode/commands/` unless the user explicitly requests it.

5. **Write the skill in the local format**

   Include:
   - YAML frontmatter with `name` and `description`
   - A short statement of the skill's purpose
   - An explicit input contract
   - Step-by-step workflow
   - Expected output guidance when relevant
   - Guardrails that limit scope and prevent unrelated changes

6. **Keep the skill pragmatic**

   Prefer small, direct instructions over abstract framework text. Match existing OpenSpec-style skills where that structure helps, but keep the workflow focused on the actual purpose of the new skill.

7. **Verify the result**

   After writing the file, confirm:
   - the directory exists
   - the file path is correct
   - the skill name in frontmatter matches the folder name
   - no unrelated files were added

## Output

When done, summarize:
- the created skill path
- the skill name
- the purpose it covers
- any assumptions that were made

## Guardrails

- Do not modify `.opencode/commands/` unless explicitly asked.
- Do not create multiple skills when the user asked for one.
- Do not add new dependencies.
- Do not invent repo rules that conflict with `AGENTS.md` or the rulesets.
- Keep the skill reusable and repo-local.
