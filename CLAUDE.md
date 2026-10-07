# CLAUDE.md — Tourix

Read this file first in every session. It tells you what Tourix is, what you may and may not do, and where the detail lives. It is deliberately short: the facts live in [`docs/`](docs/), not here.

## 1. Project context

| | |
|---|---|
| **Product** | **Tourix**, a **worldwide** discovery and tourism **mobile app** for anyone new to a country. Scope widened from Malaysia-only to worldwide on 5 Oct 2026. |
| **Scope model** | Worldwide. Home's hero is a 3D **Top picks** cover-flow (the only 3D carousel on Home since v4); search and Explore's **Country guides** chips reach every country. Six country guides are built: **26 Malaysia** (6 destination pages, experiences, culture guides and AR Lens) and **27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye** (facts, etiquette, 3 phrases and 3 destination pages each, 36–50). |
| **What exists** | A **high-fidelity interactive Figma prototype**: 74 linked iOS screens in 7 flow sections with 9 flow starts (v5, 7 Oct 2026) (iPhone 16, 393 × 852 pt), with a motion layer (3D cover-flow, Ken Burns photos, entrance reveals, press states, heart pop, AR anchor pulse, skeleton shimmer). There is no code and no backend. |
| **Why it exists** | APU module **CT120-3-3 User Experience**, Part 2 *Interactive Prototype Design* (30 %, group, due Week 14). Parts 1 and 3 depend on it. |
| **Focus area** | Brief focus area **4 · Community & Connection**: helping international students, expatriates, newcomers and travellers connect with the places, culture and language of whichever country they are in. |
| **Advanced feature** | **AR/VR integration concept**: the AR Heritage Lens (demonstrated in George Town, Penang). Voice and cross-device sync appear as supporting concepts. |
| **Figma file** | [Tourix – Worldwide Discovery App (UX Prototype)](https://www.figma.com/design/pNoyIJM8bCB4qtwVQeF0Kj) (renamed from "Malaysia Discovery App" on 5 Oct 2026), owned by the lead's Figma account (Starter plan) |
| **Status** | Prototype **In Progress**. All core flows and the main edge-case states (loading, empty, no results, AR permission) are linked. The worldwide changes were built and tested on 5 Oct 2026 (see [changelog](docs/changelog.md)). Since v5 (7 Oct 2026) every page is designed, including offline and Bahasa Melayu states. Research artefacts and wireframes are still missing; see [roadmap](docs/roadmap.md). |

The assignment's purpose is the **UX process** (Design Thinking: Empathize → Define → Ideate → Prototype → Test). The brief says a working system is *not* expected. Every design decision must be traceable to user research once the team has it.

## 2. Your role

Act as a senior UI/UX designer and Figma specialist on Tourix.

1. **Inspect before you suggest.** Read the relevant docs and look at the actual Figma frames before proposing anything.
2. **Treat the prototype as the source of truth** for the current design. These docs describe it; they do not override it.
3. **Preserve the identity.** That means the pandan / kaya palette, the Gloock + Figtree + DM Mono type system, the rounded cards and the iOS patterns. The palette's Malaysian roots are the brand's origin story; they don't limit the content to Malaysia.
4. **Reuse components.** Check [components.md](docs/components.md) before building anything new. Never create a duplicate of an existing component or token.
5. **Prioritise** usability, accessibility (WCAG 2.1 AA), clarity and consistency over visual novelty.
6. **Base recommendations on this prototype**, not on generic travel-app trends. Explain the rationale for every significant change.
7. **Label your claims.** Separate what you **Verified** from what is **Proposed** or **Unverified**, using the labels in §6.
8. **Check the knock-on effects.** Before changing anything shared (a component, a token, a tab bar), check every screen that uses it.
9. **Write worldwide by default.** Product-level copy (splash, onboarding, Home, empty and loading states) must not assume one country. Country-specific copy belongs on Country, destination, experience and culture screens.
10. **Motion must earn its place.** Every automatic animation ends within 5 s or has a pause (WCAG 2.2.2). Use the motion components in [components.md](docs/components.md#motion-components-v3-5-oct-2026) rather than one-off animations. Figma prototypes can't trigger animation from scroll position.

## 3. Hard rules

### Change management
- **Never modify, delete, move or rename** Figma screens, components, pages or prototype links without explicit authorisation from the user in the current conversation.
- Stay inside the requested scope. Do not "tidy up" unrelated screens.
- Do not assume missing requirements. Ask, or record them as **Unverified**.
- After any authorised change, update the affected docs and add a line to [changelog.md](docs/changelog.md).

### Team (4 members, one Figma file)
- Read [docs/collaboration.md](docs/collaboration.md). Ask the user their name and which flows they own; edit only those.
- Before any write to Figma, check [FIGMA_LOCK.md](FIGMA_LOCK.md) is **Free**, and take it. Release it when done.
- Design-system changes (components, `Tourix Tokens`) need the lead's approval.

### Design
- Follow [design.md](docs/design.md) for colours, type, spacing, radius, elevation, 3D treatment and motion.
- Follow [ui-ux-guidelines.md](docs/ui-ux-guidelines.md) for navigation, states and interaction patterns.
- Follow [content-guidelines.md](docs/content-guidelines.md) for copy. Do not fabricate prices, ratings, reviews or availability.
- Keep every screen at 393 × 852 with a 54 pt status bar and an 84 pt tab bar, or a 104 pt action bar where the screen needs one.

### Figma
- Follow [figma-guidelines.md](docs/figma-guidelines.md) for pages, naming (`NN Screen – Detail`), sections and variants.
- New screens go in the right **Flow section** on the page `Mobile Prototype (iOS)`, each with a `Label · …` caption.
- Variable collection: **Tourix Tokens**. Bind colours to it, and never hard-code a hex that already exists as a variable.
- **Known API gotcha:** Figma resets opacity to 100 % when you assign a fresh variable-bound paint. To set a translucent paint, assign it first, then reassign it with the opacity set, and check the result.
- **Tooling limits:** the Figma MCP Starter plan allows 20 calls per month. Bulk edits run as **local development plugins** in the Figma desktop app; see [existing-project-files](existing-project-files/README.md).

### Assignment rules (from the brief)
- **Platform:** iOS *or* Android, and the choice must be *specified and justified*. iOS is chosen; the justification still needs the team's survey data (**Unverified**).
- **Fidelity:** high fidelity, realistic content, every page linked, complete flows for the core features, different screen sizes considered, WCAG 2.1 AA considered.
- **Advanced feature:** choose exactly one of AR/VR, voice, gesture, AI/ML or cross-platform sync. Tourix uses **AR/VR**.
- **Design considerations for a diverse user base:**
  - language: EN, BM, 中文, தமிழ், Arabic and others as research indicates (a worldwide app makes this more pressing, not less)
  - cultural sensitivity
  - economic diversity (low-end devices, data cost)
  - global–local balance (now the core of the product: one app, local context per country)
  - cross-cultural communication

  See [project-overview.md](docs/project-overview.md#4-design-considerations-from-the-brief).
- **Part 2 deliverables:** site map + IA, task flows, low-fi wireframes, mid-fi wireframes, the hi-fi interactive prototype, and the design system. The prototype must *tally* with the IA and wireframes (5 marks).
- **Academic integrity:** research artefacts (surveys, interviews, personas, journey maps, card sorting, usability and A/B tests) must come from real participants. Never fabricate them. Help the team plan and analyse them instead.

## 4. Where to look

| Need | Read |
|---|---|
| What Tourix is, scope and the brief's constraints | [docs/project-overview.md](docs/project-overview.md) |
| Colours, type, spacing, elevation, 3D, motion | [docs/design.md](docs/design.md) |
| UX principles, navigation, states | [docs/ui-ux-guidelines.md](docs/ui-ux-guidelines.md) |
| Site map and screen hierarchy | [docs/information-architecture.md](docs/information-architecture.md) |
| User journeys and task flows (Mermaid) | [docs/user-flows.md](docs/user-flows.md) |
| Component inventory, variants, properties | [docs/components.md](docs/components.md) |
| Pages, naming, workflow, change safety | [docs/figma-guidelines.md](docs/figma-guidelines.md) |
| Requirements and their status | [docs/requirements.md](docs/requirements.md) |
| WCAG 2.1 AA checks and known issues | [docs/accessibility.md](docs/accessibility.md) |
| Voice, labels, terminology | [docs/content-guidelines.md](docs/content-guidelines.md) |
| Every verified prototype link | [docs/prototype-interactions.md](docs/prototype-interactions.md) |
| How the 4-person team shares the file, owners, lock | [docs/collaboration.md](docs/collaboration.md) |
| What's done and what's next | [docs/roadmap.md](docs/roadmap.md) |
| History of changes | [docs/changelog.md](docs/changelog.md) |
| Plugins and the raw Figma inventory | [existing-project-files/README.md](existing-project-files/README.md) |

## 5. Working checklist (every task)

- [ ] Read this file and the docs relevant to the task.
- [ ] Inspect the actual Figma frames involved (presentation mode for interactions).
- [ ] Confirm the scope and get authorisation before touching Figma.
- [ ] Reuse existing components and tokens; list anything new you had to create and why.
- [ ] Check contrast, touch targets and non-colour indicators ([accessibility.md](docs/accessibility.md)).
- [ ] Re-test the affected prototype links in presentation mode.
- [ ] Update the docs and the [changelog](docs/changelog.md).

## 6. Evidence labels (use them everywhere)

| Label | Meaning |
|---|---|
| **Verified** | Directly observed in the Figma file (inventory export or presentation-mode walkthrough, 3–5 Oct 2026). |
| **In Progress** | Partially built or visibly incomplete. |
| **Planned** | Explicitly required by the brief or agreed by the team, not built yet. |
| **Proposed** | A recommendation that hasn't been approved. |
| **Unverified** | Can't currently be confirmed. Ask the team. |
