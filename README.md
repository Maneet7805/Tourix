# Tourix

**Tourix is a worldwide mobile app concept that helps people new to a country discover destinations, food and traditions, with the local context that makes each place make sense.** Malaysia is the first country built out in full. It exists as a high-fidelity interactive Figma prototype for APU's *User Experience* module (CT120-3-3, Part 2).

> **Team members:** read [docs/collaboration.md](docs/collaboration.md) before editing the Figma file.
>
> Start here if you're new to the project. AI assistants should read [CLAUDE.md](CLAUDE.md) first.

## At a glance

| | | Status |
|---|---|---|
| **Product** | Tourix, a worldwide discovery and tourism app (scope widened from Malaysia to worldwide on 5 Oct 2026) | Verified |
| **Deliverable** | High-fidelity interactive prototype, **Figma** | Verified |
| **Platform** | iOS, iPhone 16 frame (393 × 852 pt) | Verified (the justification is **Unverified**) |
| **Focus area** | Brief area 4 · Community & Connection | Verified (stated on the in-file Read me board) |
| **Target users** | International students, expatriates, newcomers and travellers in any country | Stated intent. Personas are **Unverified**: no research yet |
| **Countries** | Six country guides: Malaysia (fully built: 6 destination pages, experiences, culture guide, AR Lens) plus Japan, Morocco, Portugal, Mexico and Türkiye (facts, etiquette, 3 phrases and 3 destination pages each) | Verified (5 Oct 2026; destination pages 7 Oct 2026) |
| **Advanced feature** | AR Heritage Lens (AR/VR integration concept) | Verified |
| **Prototype state** | 74 linked screens in 7 flow sections with 9 flow starts (v5, 7 Oct 2026), with 3D and motion | In Progress |

## Problem being addressed

The working framing is that newcomers, international students and travellers struggle to connect with local culture and find their way around an unfamiliar country: language, etiquette, where to go and how to get there. The problem repeats in every country; only the local context changes, which is why Tourix is one app with per-country content. **This hasn't yet been validated with user research (Unverified).** The team's Part 1 proposal and Empathize/Define work must confirm or reshape it.

## What's in the prototype

**Verified (v2, 4 Oct 2026):**

- **Onboarding:** splash, language choice (English, Bahasa Melayu, 中文, தமிழ்), interest selection.
- **Home:**
  - **Top picks** 3D cover-flow in the hero (v4; replaced the auto-rotating showcase)
  - mood tiles
  - popular destinations carousel
  - phrase of the day
  - a nearby experience
- **Explore/search** results for "Penang".
- **Destination pages** (Penang, Melaka): facts, etiquette tips, experiences, AR promo, Save and Add to trip.
- **Experience page** (George Town heritage walk): route timeline, audio guide, "be a good guest" tips.
- **Culture guide:** Malay phrases with pronunciation, plus everyday etiquette.
- **Trips:** day plan with map preview and a cross-device sync indicator; "just added" toast; new-trip sheet with "invite a friend"; all-trips list; Day 2 empty state.
- **Me:** language, accessibility (text size, high contrast, reduce motion, captions), offline packs, synced devices.
- **AR Heritage Lens:** camera-permission explainer, scanning state, camera view with 3D-anchored labels, and two landmark info sheets.
- **States:** a loading skeleton and a no-results search.

**Added for the worldwide scope (Verified, built and tested 5 Oct 2026):**

- **Home:** the hero is a swipeable 3D **Top picks** cover-flow (Penang, Kyoto, Lisbon, Marrakech, Oaxaca, Istanbul) with glow, orbit and fireflies; it opens Penang or a country guide. Greeting "GOOD MORNING", title "Where to next?".
- **`26 Country – Malaysia`:** the country page that now holds the destinations carousel (Penang, Melaka linked), culture guide and etiquette entry points.
- **Country guides 27–31** (Flow 6): Japan, Morocco, Portugal, Mexico, Türkiye. Reached from Home picks and Explore → Country guides.
- **Motion (v3):** Ken Burns hero photos, sheets that rise in on open, press states on buttons and cards, heart pop, pulsing AR anchors, skeleton shimmer.
- Product-level copy no longer says "Malaysia": "Start exploring", "Loading your picks…", a worldwide splash tagline.

**Added in v5 (7 Oct 2026): every remaining page designed.**

- **19 destination pages** (32–50, Flow 7): KL, Langkawi, Cameron Highlands and Sabah, plus three per other country.
- **Experiences:** Penang and Melaka Experiences tabs (51, 52), Hawker breakfast (53), Batu Caves (54); Festivals guide (55).
- **Trips and Me:** Saved (56), Melaka day trip (57), Share and Invite sheets (58, 60), Undo (59), Synced devices, Units, About (67–69).
- **Home and Explore:** Notifications (61), Location sheet (62), filter results for Places, Experiences, Food and Phrases (63–66).
- **AR Lens:** Phrases and Food nearby modes (70, 71) and a Kopitiam sheet (72).
- **States:** Home offline (73) and Home in Bahasa Melayu (74).

Full detail: [user-flows](docs/user-flows.md) · [prototype-interactions](docs/prototype-interactions.md).

## Design approach

The visual direction draws on two Malaysian flavours, pandan and kaya. They're the brand's origin, and they stay as the identity of the worldwide app:
- deep **pandan green** surfaces
- **kaya gold** for the primary actions
- **bunga raya** red, used sparingly for saves

Type pairs **Gloock** (editorial display serif) with **Figtree** (UI) and **DM Mono** (data such as coordinates, times and pronunciation). Signature moments are the 3D Top picks cover-flow with "kelip-kelip" fireflies, and skewed AR labels anchored in space. See [design.md](docs/design.md).

## Tools

| Tool | Use | Status |
|---|---|---|
| Figma (desktop + web) | Design, components, variables, prototyping | Verified |
| Figma development plugins (local) | Bulk generation, repair, rename, inventory export | Verified ([existing-project-files](existing-project-files/README.md)) |
| Pexels | Photography (free licence) | Verified |
| Lucide | Icon shapes (2 px stroke) | Verified |

## Documentation

| File | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | AI instructions and the rules for working on Tourix |
| [docs/project-overview.md](docs/project-overview.md) | Vision, scope, brief constraints, open questions |
| [docs/design.md](docs/design.md) | Design system: tokens, type, components, 3D and motion |
| [docs/ui-ux-guidelines.md](docs/ui-ux-guidelines.md) | UX principles, navigation, states |
| [docs/information-architecture.md](docs/information-architecture.md) | Site map and hierarchy |
| [docs/user-flows.md](docs/user-flows.md) | Journeys and task flows |
| [docs/components.md](docs/components.md) | Component inventory |
| [docs/figma-guidelines.md](docs/figma-guidelines.md) | File organisation and workflow |
| [docs/requirements.md](docs/requirements.md) | Requirements with status |
| [docs/accessibility.md](docs/accessibility.md) | WCAG 2.1 AA review |
| [docs/content-guidelines.md](docs/content-guidelines.md) | Voice, labels, terminology |
| [docs/prototype-interactions.md](docs/prototype-interactions.md) | Every verified link and transition |
| [docs/roadmap.md](docs/roadmap.md) | Completed, in progress, improvements |
| [docs/changelog.md](docs/changelog.md) | Change history |
| [docs/collaboration.md](docs/collaboration.md) | **Team workflow:** Figma setup, who owns which flows, Claude/plugin lock, Git rules |

## Open the prototype

1. Open the [Figma file](https://www.figma.com/design/pNoyIJM8bCB4qtwVQeF0Kj) and go to the page **Mobile Prototype (iOS)**.
2. Press **Play**. The device is preset to iPhone 16.
3. Pick a flow from the Flows list (1–9). **1 · First launch**, **2 · Returning user (Home)** and **3 · AR Heritage Lens** cover the core journey; **7 · Destinations**, **8 · Offline mode** and **9 · Bahasa Melayu** show the v5 additions.
4. After any edit to the file, close and reopen the presentation tab; an open tab can keep old component states.

## Team

Tourix is a group project for APU's CT120-3-3 *User Experience* module, built by a team of four: Maneet (lead) and three teammates (names to be added). See [docs/collaboration.md](docs/collaboration.md) for who owns what.

## License

- **Code** (Figma plugins and scripts in `existing-project-files/`): [MIT](LICENSE).
- **Docs and design** (Markdown docs, the Figma prototype and its content): [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). Reuse them with credit to the Tourix team.
- **Photography** comes from Pexels under the Pexels licence, and icons from Lucide (ISC). Those stay under their own terms.
