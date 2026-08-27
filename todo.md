# PxK Upgrade Checklist

- [x] Convert the supplied respiratory, digestive, and dental questions into distinct, scenario-specific 12-question screening flows.
- [x] Keep all result logic screening-oriented, using safe priority and clinical-follow-up language rather than diagnoses.
- [x] Introduce a scenario selector, question groups, review step, and clear next-step state across the screening workflow.
- [x] Persist fictional screening records in browser local storage and provide a dedicated patient history view.
- [x] Add a useful analytics dashboard for screening trends, care routes, scenario distribution, and follow-up status using fictional local data.
- [x] Improve contrast in the interactive demonstration and enhance page-level hierarchy, field-sheet patterns, and route-map guidance.
- [x] Validate desktop and mobile interactions, keyboard access, readable text, build integrity, and responsive layouts.
- [x] Create the final checkpoint and deliver the upgraded project.

## Potential AI-Assisted Decision Support

- [x] Confirm whether the requested scope is a demonstrable prototype engine or a real clinical model-development programme.
- [x] Define non-diagnostic outputs, transparent routing rationale, priority-review boundaries, and clinical-governance requirements.
- [x] Implement the approved decision-support layer and its in-product explanations.
- [x] Validate outputs and safety messaging before delivery.

## Approved Scope — Prototype Decision Support

- [x] Build the deterministic PxK Route Engine for respiratory, digestive, and dental screening answers.
- [x] Attach an auditable factor trace, route explanation, and non-diagnostic priority-review boundary to every saved screening record.
- [x] Add a dedicated decision-support report view to the screening result and patient-history record detail.
- [x] Add a model card that explains what the prototype engine does, does not do, and which answers it used.
- [x] Test routine and priority-review paths, then save and deliver the completed iteration.

## Privacy, Language, and Clinician Export Upgrade

- [x] Define and implement browser-local consent acknowledgement before a screening workflow begins.
- [x] Add English, Kannada-ready, and clearly labelled Tulu placeholder copy for screening and routing rationale states.
- [x] Add a clinician review export with the screening summary, selected answers, factor trace, routing boundary, and prototype disclaimer.
- [x] Connect PDF export to completed screening results and screening-history details.
- [x] Validate consent, language toggling, accessible dialogs, and PDF generation before delivery.

## NLP Intake, i18n, and Workflow Redesign

- [x] Define the non-diagnostic NLP output schema, safety guardrails, route confidence policy, and 15-question route requirements.
- [x] Upgrade PxK to use server-side language-model calls and authenticated persistent data for saved progress.
- [x] Add a natural-language concern intake that maps user wording to a transparent screening route without diagnosing a condition.
- [x] Extend each screening route to a coherent 15-question workflow with medical-term tooltips and clear review states.
- [x] Implement draft save, resume, update, and discard flows for incomplete screening sessions.
- [x] Add i18n coverage across the full interface for English, Kannada, Tulu, and Konkani, with clear reviewed-source fallbacks where necessary.
- [x] Redesign typography, page backgrounds, navigation hierarchy, and care-route guidance so the workflow is easy to understand at a glance.
- [x] Validate language fallbacks, NLP boundaries, persistence, tooltips, desktop/mobile usability, and production build before delivery.

## Completion Checks for Intelligent Workflow

- [x] Add an explicit discard action for saved screening drafts and verify the account-scoped draft state updates.
- [x] Thread the selected locale through every PxK route and replace remaining key page-level hardcoded copy with language-aware strings or an explicit source-language boundary.
- [x] Exercise and document the signed-in save, resume, discard, NLP intake, and tooltip interactions before final delivery.

## Final Locale and Interaction Evidence

- [x] Thread the locale through the model, provider, how-it-works, and about routes and add a page-level English-source boundary where reviewed translation is not available.
- [x] Record the signed-in save, resume, discard, NLP intake, and tooltip verification evidence in the project documentation.
