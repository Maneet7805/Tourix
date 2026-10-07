# Project overview

Tourix is a high-fidelity Figma prototype of a worldwide iOS app that helps people new to a country discover places and culture with local context. Malaysia is the first country built out in full. It is the group's Part 2 submission for CT120-3-3 User Experience.

Related: [requirements](requirements.md) · [roadmap](roadmap.md) · [CLAUDE.md](../CLAUDE.md)

## 1. Background

| Item | Detail | Status |
|---|---|---|
| Module | CT120-3-3 User Experience, APU, intake APD-APU3F2609 | Verified (brief) |
| Assessment | Part 1 proposal, 10 %, due Week 4 (**week of 5 Oct 2026**) · Part 2 group prototype, 30 %, due Week 14 · Part 3 individual research and presentation, 60 %, due Week 14 | Verified (brief) |
| Method | Stanford d.school five-stage Design Thinking: Empathize, Define, Ideate, Prototype, Test | Verified (brief) |
| Scope history | Malaysia-only until 5 Oct 2026, now **worldwide**, with Malaysia as the fully built country | Verified (team decision, 5 Oct 2026) |
| Brief focus area | **4 · Community & Connection**. Tourism alone isn't a focus area, so Tourix is framed as cultural connection for newcomers, wherever they are. | Verified (team decision, written on the Read me board) |

## 2. Vision and value proposition

**Vision (working):** anyone arriving somewhere new, in any country, can find places they'll enjoy and understand them: what to wear, what to say, how to get there and how to be a good guest.

**Value proposition (as represented in the prototype):**

| Value | Where you can see it | Status |
|---|---|---|
| One app for every country | 3D Top picks in the Home hero, Explore → Country guides, 6 country guides (26–31) | Verified (5 Oct 2026) |
| Discover by mood, not just by place | Interests onboarding, the "Explore by mood" row | Verified |
| Local context built in | Facts, "Good to know", "Be a good guest", etiquette | Verified (Malaysia) |
| Language support | Selectable 4-language picker (02, 19), "request a language", phrases with a playing state | Verified (simulated) |
| Plan in one place | Add to trip → day plan with map | Verified (simulated) |
| Heritage brought to life | AR Heritage Lens | Verified (concept mock-up, George Town) |

## 3. Problem statement and users

> **Unverified.** No user research has been documented yet. The statement below is the working hypothesis. Validate it in Empathize/Define before relying on it.

*Working hypothesis:* international students, newcomers and travellers struggle to connect with the local culture and community of the country they are in. Language barriers, unfamiliar etiquette and scattered travel information make them stick to the obvious places and miss the experiences that would help them belong. The problem is the same in every country; only the local context changes.

| Candidate user group (from the brief's examples) | Need | Status |
|---|---|---|
| International students abroad (e.g. new to Malaysia) | Orientation, confidence, low-cost outings | Unverified |
| Expatriate families relocating to a new country | Cultural etiquette, family-friendly places | Unverified |
| Young professionals relocated for work | Weekend discovery, social connection | Unverified |
| International travellers visiting several countries | One familiar app with local context per country | Unverified |
| Locals (secondary) | Hidden gems, sharing their culture with visitors | Unverified |

The **two primary personas** the brief requires (Part 3, Define) don't exist yet: **Planned**. Recruiting participants from more than one nationality is now essential to support a worldwide claim.

## 4. Design considerations from the brief

The brief lists five considerations for a diverse user base. This table shows how far the prototype addresses each one.

| Consideration (brief) | How the prototype addresses it | Status |
|---|---|---|
| **Language:** EN, BM, Mandarin, Tamil, Arabic and others | Language picker with EN, BM, 中文, தமிழ்; audio and captions in EN/BM; phrase guide | Verified (UI). A worldwide app needs more interface languages (Arabic/RTL, Spanish, French…): **Proposed** if research supports them |
| **Cultural sensitivity** | Dress-code tips, "Be a good guest", a dedicated Etiquette screen (15), JAKIM halal cue, respectful copy at religious sites. Guidance is written per country, never generalised across countries. | Verified (Malaysia) |
| **Economic diversity** | Offline guide packs screen (20) with visible pack sizes and "Download on Wi-Fi only"; no prices or paid-only features shown | Verified (sizes are sample values). Low-end device mode is **Proposed** |
| **Global–local balance** | Now the product's structure: one global app shell, with local content per country (Malay terms shown with English, local favourites next to landmarks) | Verified (Malaysia content; countries-first Home since 5 Oct 2026) |
| **Cross-cultural communication** | Pronunciation guides, "Practise out loud", bilingual AR sheet | Verified (UI only) |

## 5. Advanced feature (brief: choose 1)

| Option | Tourix | Status |
|---|---|---|
| **AR/VR integration concept** | **Chosen.** AR Heritage Lens: camera view, detected shophouse, 3D-anchored labels, landmark sheet (screens 12–13, 21–23). The concept works in any heritage city; the prototype demonstrates it in George Town, matching the brief's own example, *"AR cultural heritage tours of Georgetown"*. | Verified |
| Voice interface | Supporting only: voice-search mic, audio guides, pronunciation practice (UI, no voice flow) | Verified (UI only) |
| Cross-platform sync | Supporting only: "Synced on iPhone and laptop", Synced devices row | Verified (UI only) |
| Gesture, AI/ML | Not used | n/a |

> Name **one** advanced feature in the report: the AR concept. Present voice and sync as supporting touches, not as additional "advanced features".

## 6. Scope

**In scope:**
- the mobile prototype: screens, components, flows, interactions
- the worldwide shell: countries-first Home and the Country page pattern
- **one fully built country, Malaysia** (Penang, Melaka, culture guide, AR Lens)
- the design system
- the Part 2 deliverables:
  - site map and IA
  - task flows
  - low-fi and mid-fi wireframes
  - the hi-fi prototype
  - the design system

**Built to destination level (v5, 7 Oct 2026):** Japan, Morocco, Portugal, Mexico and Türkiye have country guides (27–31) and three destination pages each (36–50). Malaysia stays the deepest country: experience pages, the AR Lens, trips and culture guides are Malaysian.

**Out of scope:**
- code, backend, data and real booking or payments
- real AR, voice or sync implementation
- prices and ratings (deliberately not shown)
- experience pages, AR content and culture guides for countries other than Malaysia

**No longer in the file:** the partial desktop landing page and the two `OLD – delete me` pages were not present on 5 Oct 2026 (Verified; the file has 3 pages: Cover & Notes, Design System, Mobile Prototype (iOS)).

## 7. Design objectives

1. A first-time visitor completes onboarding and reaches useful content in under a minute.
2. A user can pick a country and reach a destination in two taps from Home.
3. Every destination and experience carries cultural context, not just photos.
4. The core flows are complete and linked: choose a country → discover → understand → plan.
5. WCAG 2.1 AA is considered throughout (see [accessibility](accessibility.md)).
6. One distinctive, credible advanced feature (AR) that fits the focus area.

## 8. Current status (7 Oct 2026)

- **Verified:**
  - 74 linked screens (13 original + 12 in v2 + 26 Malaysia + 27–31 country guides + 43 in v5)
  - 7 flow sections with 9 starting points
  - 17 components and component sets from v1–v2 (incl. Language Picker, Phrase Card), plus 16 icon components and, in v3, Live Photo, Top Recommendations (3D), AR Anchor Pulse, Skeleton Shimmer and 6 Reveal sets
  - 31 variables (incl. `color/line-strong`), 15 text styles, 4 effect styles
- **Verified (worldwide scope, built and tested 5 Oct 2026):**
  - Home: one 3D carousel — Top picks in the hero (v4); the country showcase and the duplicate section below were removed
  - new screen `26 Country – Malaysia`
  - product-level copy without "Malaysia" (splash tagline, "Start exploring", "Loading your picks…")
  - file renamed to *Tourix – Worldwide Discovery App (UX Prototype)*; Read me board updated
- **In Progress:**
  - a few remaining non-interactive controls (see [prototype-interactions §4](prototype-interactions.md#4-non-functional-controls-verified))
- **Planned (brief):**
  - research artefacts
  - personas
  - site map and IA artefact
  - task-flow diagrams
  - lo-fi and mid-fi wireframes
  - usability or A/B tests

## 9. Constraints

| Constraint | Effect |
|---|---|
| Figma Starter plan | Figma MCP limited to 20 calls per month (used up for October 2026), so bulk edits run as local plugins in the desktop app |
| Academic integrity | Research data, personas and test results must come from real participants |
| Single device size built | Only 393 × 852 exists; other sizes are **Planned** (see [ui-ux-guidelines](ui-ux-guidelines.md#4-mobile-usability)) |
| Content depth | Accurate local content takes real effort. Since v5 every country has destination pages (32–50); their travel facts and tips are general knowledge and still need fact-checking (Unverified). |
| Imagery | Pexels photos. The Langkawi image is a generic tropical beach (illustrative). |

## 10. Open questions (need team confirmation)

- [ ] What the survey or interview data says about platform share (to justify iOS).
- [ ] The two primary personas and their key frustrations, and whether they span more than one country.
- [ ] Which interface languages a worldwide audience needs (Arabic/RTL, Spanish, French…).
- [ ] Whether a second country should be built out before submission.
- [ ] Who in the group owns each Design Thinking stage (Part 3 workload matrix).
