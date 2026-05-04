# OpenSpec Cross-Change Compatibility

Use this ruleset when working on more than one pending OpenSpec change, or when one change is meant to land before another.

## Dependency Declarations

- Do not rely on implied sequencing alone. If one pending change is expected to land before another, state that dependency explicitly in the later change's proposal, design, or tasks.
- Name the upstream change directly when the later change depends on contracts, files, or architecture introduced by it.
- When a later change can only be implemented after an earlier one, make that ordering clear enough that implementation does not require guessing.

## Compatibility Review

- Before declaring two pending changes ready, compare proposal, design, tasks, and spec deltas across both changes.
- Check that the same terms mean the same thing across changes, especially for layered concepts such as raw payloads, DTOs, repositories, domain entities, store state, and consumer-facing results.
- Check that contracts introduced by the earlier change are sufficient for the later one. If the later change needs pagination metadata, type options, or action guards, those inputs should already be defined upstream when appropriate.
- Check that feature ownership is consistent across changes. Do not let one change assume shared ownership while another requires feature ownership unless that tension is resolved explicitly.

## Sequential Apply Readiness

- When a user plans to apply changes one after another, verify the exact apply order they intend to use.
- Confirm that the first change can stand on its own without depending on artifacts from the second.
- Confirm that the second change does not leave critical behavior undefined that depends on the first change's contract.
- Call out any remaining ambiguity that would cause rework or speculative implementation once the first change lands.

## Sync Expectations

- When a design decision changes in one artifact, propagate that decision to every affected proposal, task list, and spec delta rather than leaving older wording in place.
- If a change modifies another capability's spec delta, make sure the new wording still matches the owning capability's responsibility and boundary.
- Prefer one explicit contract over multiple loosely compatible descriptions.

## Output Expectations

- When reviewing compatibility, report whether the changes are compatible, what order they should land in, and any remaining blockers.
- Distinguish blockers from optional cleanup so implementation can proceed confidently when appropriate.
