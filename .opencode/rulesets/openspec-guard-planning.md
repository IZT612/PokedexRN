# OpenSpec Guard Planning

Use this ruleset when proposing or refining async, stateful, paginated, or user-triggered flows. The goal is to make common guard behavior explicit before implementation begins.

## Plan Guards Early

- Do not leave common guard behavior implied. If a feature loads data, mutates state, or accepts repeated user actions, specify the guard behavior in the change artifacts.
- Favor explicit rules for invalid or conflicting transitions instead of generic phrases such as "important guards" or "handle loading correctly."
- When a feature has an initial load, refresh, retry, append, submit, or next-step action, decide ahead of time which actions replace data, append data, reset data, or are denied.

## Common Guard Checklist

For relevant changes, decide and document whether the flow should:

- block or ignore conflicting actions while loading
- clear previous errors before a new request
- deny actions when required preconditions are missing
- avoid overlapping append or pagination requests
- prevent duplicate submissions or duplicate navigation actions
- replace existing data on initial load or refresh
- append data on incremental or next-batch loading
- stop requesting more data when pagination indicates there is no next batch
- derive computed state from source state instead of storing duplicated mutable copies
- define what the UI or state should do when important values are `null`, missing, empty, or unavailable

## Stateful Flow Requirements

- If a store or controller owns pagination, specify the metadata it stores and how the next request is calculated.
- If a flow uses filters or derived views, specify whether those views are stored directly or derived from canonical state.
- If an async action can fail, specify what happens to existing data, loading state, and error state before, during, and after the request.
- If a feature has separate first-load and incremental-load behavior, specify both paths explicitly.
- If important values can be `null`, empty, or absent, specify the intended fallback or empty-state behavior instead of leaving it to implementation guesswork.

## Spec And Task Quality

- Put critical guards in the design and spec, not only in tasks.
- Make tasks concrete enough that guard behavior is implementable without interpretation.
- When tests are required, include representative scenarios for guard behavior, not just success and failure paths.

## Output Expectations

- When reviewing or proposing a change, call out missing guards as specification gaps.
- When the likely consumer is a state store, repository-backed flow, or async UI action, prefer over-specifying guards to leaving them implicit.
- When a value can reasonably be empty or missing, prefer the most logical user-facing or state-safe behavior and record that behavior explicitly in the change artifacts.
