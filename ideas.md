# PxK Design Directions

## Approach 1 — Quiet Clinical Editorial

**Very Brief Intro:** A warm, composed healthcare experience with editorial whitespace, tactile surfaces, and a disciplined clinical interface language. It communicates reassurance without minimizing the seriousness of care.

**Probability:** 0.07

## Approach 2 — Community Wayfinding

**Very Brief Intro:** A human-centered navigation system inspired by wayfinding, local craft geometry, and practical field tools. It makes an intimidating healthcare journey legible and approachable.

**Probability:** 0.04

## Approach 3 — Luminous Care Grid

**Very Brief Intro:** A low-light, data-led dashboard style where monitoring histories and routing intelligence emerge from quiet fields of information. It feels intelligent and modern while remaining restrained.

**Probability:** 0.09

---

# Chosen Direction — Community Wayfinding

## Design Movement

**Human-centered wayfinding with editorial healthcare restraint.** PxK is designed like a clear route through an unfamiliar public service: calm, navigable, inclusive, and deeply practical. The visual language takes cues from contemporary Indian service design, printed maps, and carefully edited medical records rather than hospital marketing or speculative AI imagery.

## Core Principles

1. **Make the next step obvious.** Every screen foregrounds the patient’s position in the journey and the one action that moves them forward.
2. **Translate complexity into clarity.** Structured, clinical information is presented in patient-friendly, lightly annotated modules.
3. **Lead with human assurance.** Warm paper tones, spacious composition, and practical language prevent the interface from feeling cold or overly technical.
4. **Earn trust through restraint.** Information, motion, and colour have specific jobs. Nothing decorative competes with decisions or care.

## Color Philosophy

The palette begins with a **warm rice-paper white** that feels less institutional than cool hospital white. **Deep monsoon teal** carries authority and clinical clarity; **eucalyptus** separates secondary data and pathways; **turmeric** denotes forward motion and a patient’s next step, echoing a familiar Karnataka household colour without becoming ornamental. A muted **areca red** appears only for attention states or reported changes, never as an alarmist backdrop.

## Layout Paradigm

The central structure is a **route map rather than a conventional grid**. Generous horizontal bands and offset content panels let the PxK Pathway travel across the page, visually connecting sections. Product interfaces sit in anchored “field sheets” and notched cards, as though placed along a trustworthy route. On mobile, the route turns into a purposeful vertical spine.

## Signature Elements

1. **The PxK Pathway:** a thin teal rail with four distinct markers, carrying the patient from concern to monitoring.
2. **Field-sheet panels:** off-white records with a subtle warm border, small monospaced metadata, and a clipped top corner that suggests a considered working document.
3. **Route markers:** compact numbered circles and short directional strokes that identify meaningful actions, stage changes, and current status.

## Interaction Philosophy

Interactions should feel like following a well-marked route. Buttons confirm forward motion, transitions reveal the next piece of information only when needed, and filters act as practical sorting controls. Prototype-only functions acknowledge their state plainly instead of pretending that real booking, messaging, or medical automation has occurred.

## Animation

Motion is restrained and purposeful. The Pathway completes one segment at a time as a section enters view. Sheets settle upward by 8–12px with a short opacity transition; cards elevate very slightly on hover; drawers slide in from the right with a 240ms custom ease-out. No looping decorative motion is permitted. All non-essential movement respects `prefers-reduced-motion` and is disabled or shortened accordingly.

## Typography System

**Manrope** serves as the display and interface face, delivering soft but confident geometry for English labels and headlines. **Noto Sans Kannada** is used wherever Kannada or Tulu-in-Kannada-script is visible, ensuring respectful, legible local-language representation. **IBM Plex Mono** is reserved for system labels, dates, stage numbers, and prototype metadata. Headlines are short and weighty; explanatory text remains compact, direct, and comfortably sized.

## Brand Essence

**PxK makes the route from a health concern to appropriate clinical follow-up clearer for communities across Karnataka.**

**Personality:** clear, companionable, considered.

## Brand Voice

Headlines are decisive without making promises; CTAs are direct and practical; microcopy explains the user’s current situation and the next action in plain language. The tone avoids diagnosing, selling urgency, or using generic startup phrases.

> “Tell us what changed. We’ll help structure the next conversation.”

> “A clearer route to a clinical conversation.”

## Wordmark & Logo

The PxK mark is an interlocking **P–K route symbol**: two softened geometric strokes share a small turmeric waypoint, representing a patient and clinician connected by a deliberate path. It uses no text in its graphic form and remains recognizable at navigation scale.

## Signature Brand Color

**PxK Route Teal — `#0E5C5A`**. This is the consistently recognizable anchor for navigation, trust, and progress.

## Style Decisions

- The **PxK Pathway** appears on every major route as a clear organizing device, supplemented by numbered route markers, directional strokes, and field-sheet anchors rather than generic dashboard grids.
- Karnataka context is communicated through restrained service-design cues: Kannada/Tulu-ready wayfinding labels, route annotations, compact record stamps, and practical field-tool geometry. No decorative regional motifs or stock imagery are used.
- **PxK** remains the product identity in navigation, primary calls to action, and end-state screens. Team Errorists is a small provenance credit for the SIH 2026 prototype.
