# Verification Notes

## Clinician PDF Export — 27 August 2026

The generated two-page sample clinician export was inspected visually. Page one presents the record identifier, scenario, completion date, preliminary health profile, potential clinical route, and numbered auditable factor trace with readable hierarchy. Page two presents all 12 selected screening answers and the non-diagnostic decision-support boundary. The document is A4, unencrypted, and generated entirely in the browser-side PDF workflow.

The export deliberately uses English source text so that clinical wording and PDF glyph rendering remain stable until reviewed Kannada and Tulu PDF typography is supplied.

## Intelligent Workflow — 27 August 2026

The authenticated **save → resume → discard** path was manually confirmed in the active preview after sign-in. A saved draft remained associated with the signed-in account, resumed with the previous route and answer state, and the visible discard control removed it from the resume tray.

The consent-gated natural-language intake enables free-text entry only after the demo boundary is accepted. Its server contract requires `consentAcknowledged: true`; outputs are constrained to a focused questionnaire route, a short explanation, matched patient-reported terms, and a non-diagnostic safety statement. Medical-term help controls provide brief definitions without interpreting a symptom or recommending treatment. Responsive checks covered the workflow at desktop and 390px mobile widths.

The final automated suite passed eight tests covering authentication logout, deterministic NLP fallback, structured intake normalisation, account-scoped draft procedures, the three 15-question route definitions, and all referenced tooltip definitions. TypeScript validation and the production build passed.

English and Kannada-ready navigation, intake, screening, patient, and analytics content are implemented. Tulu and Konkani routes explicitly retain English-source clinical content until qualified language and clinical review approves translations; this avoids presenting unverified medical phrasing as authoritative.

## Voice, Booking, and Provider Review — 27 August 2026

The consented voice path was rechecked by the user after repair. Where the remote transcription service is unavailable, the interface falls back to browser speech recognition and shows the recognised words before the user proceeds. Spoken answers are matched only to visible choices, confirmed on screen, and then advance through the questionnaire.

The appointment confirmation issue was traced to a 20-item contract limit that was smaller than the complete 15-question complaint record and route-factor trace. The contract now accepts up to 40 concise ledger entries. A real appointment confirmation was subsequently verified in the active preview.

The authorised provider record was redesigned into a fixed review sheet. Patient and appointment context remains visible above three sections—Overview, Complaint list, and Route factors—while long content scrolls inside the sheet. The user confirmed the revised provider interaction works without repeated maximise/minimise actions. Automated tests now cover non-provider rejection of the protected appointment-review procedure; the complete automated suite contains fifteen tests, and TypeScript validation and the production build pass.

The post-redesign provider route was also reviewed at a 390px mobile viewport. The appointment entry, protected-provider boundary, route rail, metrics, and review entry remain readable without horizontal overflow. The expanded record uses an internal section layout for the longer complaint and factor lists so its outer presentation remains stable on narrow screens.

The user manually confirmed the final mobile expanded-record check: the Overview, Complaint list, and Route factors tabs were reachable, and the longer record content scrolled within the contained review sheet without requiring page or dialog resizing.

## Asset Pack and Account Header — 28 August 2026

The project image pack was created as a separate, deployment-safe ZIP and its managed storage path returned a valid redirect. The pack includes the original PxK visual assets and a source manifest that maps each file to its hosted application path.

The centered desktop navigation and responsive mobile header were visually reviewed. The user manually confirmed that the profile control opens Screening history and that the header transitions correctly through sign-out and sign-in states.

At the 390px mobile breakpoint, the header presents compact language, profile/history, sign-out, brand, and menu controls without clipping. The user confirmed the signed-in profile-to-history route and the signed-out-to-signed-in transition in the live preview.
