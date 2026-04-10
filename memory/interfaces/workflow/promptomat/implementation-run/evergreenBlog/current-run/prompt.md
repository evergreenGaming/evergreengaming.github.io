# Promptomat Implementation Run

- `schemaVersion`: `pm.implementation-run.v1`
- `runId`: `pmrun-20260410t004839-manual-evergreenblog-20260410t004839`
- `projectId`: `evergreenBlog`
- `taskId`: `manual-evergreenblog-20260410t004839`
- `route`: `vscode-plugin`
- `preferredSourceId`: `openai_codex`
- `deskId`: `desk-evergreenblog-main`
- `assignedWorkerId`: `worker_craft_builder`
- `assignedWorkerRole`: `Builder`
- `surfaceClaimId`: `claim_evergreenblog_vscode-plugin_desk-evergreenblog-main_worker-craft-builder_pmrun-20260410t004839-manual-evergreenblog-20260`
- `surfaceClaimStatus`: `owner`
- `commitPolicy`: `prompt-explicit`
- `statusPath`: `memory/interfaces/workflow/promptomat/implementation-run/evergreenBlog/current-run/status.json`
- `resultPath`: `memory/interfaces/workflow/promptomat/implementation-run/evergreenBlog/current-run/result.md`
- `editorContextPath`: `memory/interfaces/workflow/promptomat/implementation-run/evergreenBlog/current-run/editor-context.json`

## Task Brief
Publishing -> Posts -> New post

## Exact Next Step
Publishing -> Posts -> New post

## Context Files
- `AGENTS.md`
- `WORKING-CONTRACT.md`
- `memory/long-term/plans/ROADMAP.md`
- `ai_notes.md`

## Extra Context
- `(none)`

## Pickup Notes
- Keep the route on `vscode-plugin`.
- Treat Promptomat as the runtime source of truth.
- Read `memory/short-term/NEXT-AGENT-BRIEFING.md` first for the latest founder-priority continuation context when it is present in this repo.
- Update `status.json` as the run changes state.
- Keep `result.md` human-readable and keep `## Files Touched` current.
- If the VS Code companion is installed, run `Promptomat: Receive Current Handoff` after the handoff opens.
- Founder review stays required before commit prep.
- Project root: `C:\Work\Projects\evergreenGaming.github.io`.
- Artifact folder: `memory/interfaces/workflow/promptomat/implementation-run/evergreenBlog/current-run`.
- Companion editor context: `memory/interfaces/workflow/promptomat/implementation-run/evergreenBlog/current-run/editor-context.json`.

## Base Prompt
Read agents.md and follow the current project workflow implied by the selected target and packs.

## Project: Evergreen Blog
## Active Target
Publishing -> Posts -> New post
## Context Packs
- Publishing Contract
- Site Shell
- Feed & Posts

## Session Goal
testrun based on "founder" demo run for new post

## Task
1. Read only the docs/files directly implied by the selected packs and target
2. Identify the next concrete action for this workflow
3. Execute or prepare that action with minimal scope creep
4. Summarise what changed, what remains, and the next handoff step
