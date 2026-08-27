# Verification Notes

## Clinician PDF Export — 27 August 2026

The generated two-page sample clinician export was inspected visually. Page one presents the record identifier, scenario, completion date, preliminary health profile, potential clinical route, and numbered auditable factor trace with readable hierarchy. Page two presents all 12 selected screening answers and the non-diagnostic decision-support boundary. The document is A4, unencrypted, and generated entirely in the browser-side PDF workflow.

The export deliberately uses English source text so that clinical wording and PDF glyph rendering remain stable until reviewed Kannada and Tulu PDF typography is supplied.

## Intelligent Workflow — 27 August 2026

The authenticated **save → resume → discard** path was manually confirmed in the active preview after sign-in. A saved draft remained associated with the signed-in account, resumed with the previous route and answer state, and the visible discard control removed it from the resume tray.

The consent-gated natural-language intake enables free-text entry only after the demo boundary is accepted. Its server contract requires `consentAcknowledged: true`; outputs are constrained to a focused questionnaire route, a short explanation, matched patient-reported terms, and a non-diagnostic safety statement. Medical-term help controls provide brief definitions without interpreting a symptom or recommending treatment. Responsive checks covered the workflow at desktop and 390px mobile widths.

The final automated suite passed eight tests covering authentication logout, deterministic NLP fallback, structured intake normalisation, account-scoped draft procedures, the three 15-question route definitions, and all referenced tooltip definitions. TypeScript validation and the production build passed.

English and Kannada-ready navigation, intake, screening, patient, and analytics content are implemented. Tulu and Konkani routes explicitly retain English-source clinical content until qualified language and clinical review approves translations; this avoids presenting unverified medical phrasing as authoritative.
