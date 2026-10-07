# Requirements

What Tourix must do and be, with an honest status for each requirement. **A clickable Figma link is not a working feature.** "Implemented" here means *represented in the prototype*.

Status values: **Implemented** · **In Progress** · **Planned** · **Unverified** (see [CLAUDE.md §6](../CLAUDE.md#6-evidence-labels-use-them-everywhere)).

Related: [project-overview](project-overview.md) · [roadmap](roadmap.md)

## 1. Functional requirements (as represented in the prototype)

| ID | Requirement | Screens | Status |
|---|---|---|---|
| F1 | Choose an interface language at first launch | 02, 19 | Implemented (v2: all four rows selectable) |
| F2 | Select travel interests to personalise Home | 03 | Implemented (tiles toggle; the effect on Home is simulated) |
| F3 | Skip onboarding | 02, 03 | Implemented |
| F4 | Browse recommended destinations in a 3D cover-flow (drag, side-card tap, arrows) | 04 | Implemented (v4: replaced the auto-rotating showcase) |
| F5 | Browse by mood | 04 | Implemented (all moods lead to Explore) |
| F6 | Search places, experiences, food and phrases | 05, 25 | In Progress: one simulated query plus a no-results state |
| F7 | Filter search results by type | 05, 63–66 | Implemented (v5: each chip opens its own filtered results; simulated) |
| F8 | View a destination with facts, tips and experiences | 06, 14, 32–50 | Implemented for **all 21 destinations** (v5); travel facts are Unverified |
| F9 | View an experience with route, timing and etiquette | 07, 53, 54 | Implemented (three experiences) |
| F10 | Save a place (heart) and see saved places | 06, 07, cards, 56 | Implemented (v5: saved list on 56; the list is a fixed sample) |
| F11 | Add a place or experience to a trip day | 06, 07 → 09 | Implemented (simulated) |
| F12 | Confirm the action with a toast and undo | 09, 59 | Implemented (v5: Undo → 59 with Redo) |
| F13 | View a day-by-day trip with a map | 10, 16 | Implemented (Day 1 plan; Day 2 empty state) |
| F14 | See sync status across devices | 10, 11 | Implemented (indicator only) |
| F15 | Learn phrases with pronunciation and audio | 08, 04 | Implemented (v2: Playing state, simulated audio) |
| F16 | Practise pronunciation by voice | 08 | In Progress: UI only |
| F17 | Read everyday etiquette | 06, 07, 08, 15 | Implemented |
| F18 | Use the AR Lens to identify heritage features, translate signs and find food | 12, 70, 71, 72 | Implemented (concept mock-up; v5 added the Phrases and Food nearby modes) |
| F19 | View landmark info from an AR label, with audio and the Malay term | 13, 23 | Implemented (two landmarks) |
| F20 | Adjust accessibility settings | 11 | In Progress: toggles shown, effects not demonstrated |
| F21 | Download offline guide packs | 11, 20 | Implemented (simulated; sizes are samples) |
| F22 | Navigate between the five tabs | 04, 05, 08–11, 15, 16, 18–20, 24, 25 (+12 via the tab) | Implemented |
| F23 | Create a trip and invite a travel companion | 17, 18, 57, 60 | Implemented (simulated; v5 invite sheet) |
| F24 | See all trips | 18 | Implemented (v2) |
| F25 | Understand camera use before AR starts | 21, 22 | Implemented (v2) |
| F26 | Discover worldwide from Home: 3D Top picks hero | 04 | Verified (5 Oct 2026) |
| F27 | Open a country guide: facts, etiquette, destinations, phrases | 26–31 | Verified (5 Oct 2026); every destination card links since v5 |
| F28 | Find a country from Explore (Country guides chips) | 05 | Verified (5 Oct 2026) |
| F29 | Return from a destination to its country (breadcrumb) | 06, 14, 32–50 | Verified (5 Oct 2026; 32–50 in v5) |
| F30 | Browse a destination's experiences | 51, 52 | Implemented (v5, Penang and Melaka) |
| F31 | Learn about local festivals | 55 | Implemented (v5) |
| F32 | Share a trip plan | 58 | Implemented (v5, simulated) |
| F33 | See notifications and change location | 61, 62 | Implemented (v5) |
| F34 | Use the app offline with saved packs | 73, 20 | Implemented (v5: offline state) |
| F35 | Use the interface in Bahasa Melayu | 19, 74 | Implemented (v5: one screen; copy Unverified by a native speaker) |
| F36 | Manage synced devices, units and app information | 67–69 | Implemented (v5, display only) |

## 2. Non-functional requirements

| ID | Requirement | Status |
|---|---|---|
| N1 | WCAG 2.1 AA text contrast (≥ 4.5 : 1 body, ≥ 3 : 1 large) | Implemented for the token pairs; see [accessibility](accessibility.md) for exceptions |
| N2 | Non-text contrast ≥ 3 : 1 for control boundaries | In Progress: toggle-off track, radio rings and the new inputs fixed in v2 (`line-strong`, 3.5 : 1); chip and card borders still use `line` |
| N3 | Touch targets ≥ 44 × 44 pt | Implemented: v2 added 44 pt hotspots to Skip, Cancel, See all and All trips, and a 44 pt Save Button. Filter chips are ≈ 38 pt |
| N4 | Consistent components, tokens and spacing | Implemented, with the noted inconsistencies ([components §4](components.md#4-known-inconsistencies)) |
| N5 | Readable type (≥ 14 pt body; 11 pt minimum label) | Implemented |
| N6 | Feedback for every commit action | Implemented (v5): toast with Undo/Redo, saved list, share and invite sheets |
| N7 | Respect reduce-motion preferences | In Progress: every automatic animation now ends within 5 s or has a pause (v3); the Me toggle still doesn't switch screens to static variants |
| N8 | Work on different screen sizes | Planned (brief). Only 393 × 852 exists. |
| N9 | Culturally respectful content | Implemented (Malaysia) |
| N10 | Product-level copy is country-neutral (worldwide scope) | Verified (5 Oct 2026) |
| N11 | Adding a country reuses the Country → Destination → Experience pattern without new components | Verified (5 Oct 2026) |
| N12 | Touch feedback on every tappable card and button (pressed states) | Verified (5 Oct 2026) (Button, Destination Card, Experience Card; Save pop) |

## 3. Prototype requirements (from the brief, Part 2)

| ID | Requirement | Status |
|---|---|---|
| P1 | Platform specified **and justified** | In Progress: iOS chosen; the justification needs survey data (Unverified) |
| P2 | High fidelity with realistic content | Implemented |
| P3 | Complete user flows for the core features | Implemented for onboarding, discover→plan and AR. Gaps listed in [user-flows](user-flows.md). |
| P4 | All pages linked (interactive) | Implemented. All 74 screens are reachable; the remaining unlinked controls are listed in [prototype-interactions §4](prototype-interactions.md#4-non-functional-controls-verified). |
| P5 | Responsive design considered | Planned |
| P6 | WCAG 2.1 AA considered | Implemented (documented); some fixes outstanding |
| P7 | One advanced feature | Implemented: AR/VR concept |
| P8 | Site map + IA | Planned (draft in [information-architecture](information-architecture.md)) |
| P9 | Task-flow diagrams | Planned (draft in [user-flows](user-flows.md)) |
| P10 | Low-fi wireframes (paper or digital) | Planned: team work |
| P11 | Mid-fi wireframes in Figma | Planned: team work |
| P12 | Design system (colours, type, components, spacing) | Implemented in Figma and [design.md](design.md) |
| P13 | The prototype tallies with the IA and wireframes | Planned: depends on P8–P11 |

## 4. Planned / required by the brief (outside the prototype)

| ID | Item | Part | Status |
|---|---|---|---|
| R1 | Proposal: problem statement, objectives, solution, Gantt chart (Weeks 2–14), workload matrix | Part 1 (due Week 4) | Unverified (not seen) |
| R2 | Empathize: 2 research methods, findings, 3–5 competitor analysis, empathy maps | Part 3 | Planned |
| R3 | Define: 2 personas, issue validation, card sorting, journey maps | Part 3 | Planned |
| R4 | Ideate: divergent idea log, convergent selection, 2–3 shortlisted concepts | Part 3 | Planned |
| R5 | Test: usability testing **or** A/B testing with real participants | Part 3 | Planned |
| R6 | 15-minute presentation of the UX journey | Part 3 | Planned |
