# UI/UX guidelines

How Tourix should behave. Existing patterns are marked **Verified**; patterns that don't exist yet but should are marked **Proposed**. New screens must follow the Verified patterns first.

Related: [design](design.md) · [user-flows](user-flows.md) · [accessibility](accessibility.md) · [prototype-interactions](prototype-interactions.md)

## 1. Principles

| Principle | What it means in Tourix | Example in the prototype |
|---|---|---|
| **Context before content** | Every place comes with how to behave, get there and talk there | "Good to know", "Be a good guest", etiquette tips |
| **Simplicity and clarity** | One primary (kaya) action per view; plain words | "Add to trip", "Continue", "Start exploring" |
| **Global shell, local content** | Product-level screens never assume a country; country, destination and culture screens are fully local | Countries-first Home → `26 Country – Malaysia` (Verified, 5 Oct 2026) |
| **Intuitive navigation** | Five stable tabs; back always top-left; detail screens slide in from the right | Tab bar, Back buttons, push transitions |
| **Consistency** | Same component for the same job on every screen | Chips, toggles, cards, status and tab bars are components |
| **User control** | Skip onboarding; toggle choices; undo after adding | Skip links, interest tiles, "Undo" on the toast |
| **Clear feedback** | Every commit shows a result | "Added to Day 1" toast, "JUST ADDED" badge, the Saved heart |
| **Error prevention** | Visible labels, no destructive actions without a way back | Search label, Undo |
| **Visual hierarchy** | Gloock title → Figtree section heading → body → DM Mono data | All screens |
| **Reduced cognitive load** | Interests pre-select the feed; "TOP MATCH" leads the search results | Interests, Search |

## 2. Navigation

### Structure (Verified)

| Level | Pattern | Screens |
|---|---|---|
| Launch | Linear onboarding (Splash → Language → Interests) with Skip | 01–03 |
| Tabs (5) | **Home · Explore · Lens · Trips · Me**. Lens is a raised kaya orb in the centre. | 04, 05, 12, 10, 11 |
| Country | Pushed from Home; keeps the tab bar (Home active) because it's a browsing level, not an item | 26 Country – Malaysia (Verified, 5 Oct 2026) |
| Detail | Pushed screens with Back and a fixed action bar | 06 Penang, 07 Heritage walk, 08 Culture guide |
| Overlay-like | AR info appears as a bottom sheet (a separate frame, animated) | 13 |

### Rules
- **Tabs** switch with a dissolve, and the tab bar keeps its position. The active tab shows a pandan-tinted pill plus a pandan label. Never use colour alone; the label is always visible. **Verified**
- **Forward** to detail screens = *Push left*. **Back** = top-left 44 pt circle using the Figma "Back" action. **Verified**
- **Detail screens hide the tab bar** and show a context action bar instead (Save + Add to trip). **Verified**
- The **AR Lens** is full-screen with Close (X) at top-left. It's reached from the Lens tab or from "Open Heritage Lens". **Verified**
- **Maintain context:** after "Add to trip" the user lands on Trips with the new item highlighted ("JUST ADDED") and a toast. **Verified**
- Culture guide (08) shows the tab bar with **Home** active, because it's reached from Home and Penang. **Verified.** **Proposed:** treat it as a detail screen (no tab bar) for consistency with 06 and 07.

## 3. Interaction design

| Interaction | Pattern | Status |
|---|---|---|
| Tap targets | 44 pt minimum (back, close, play, tabs); buttons ≥ 48 pt high | Verified |
| Selection | Chips toggle Active; interest tiles toggle with colour **and** a tick; radio rows with a tick | Verified |
| Toggles | iOS-style switch, 51 × 31; tap toggles | Verified |
| Search | Tap the Home search field → Explore with a query ("Penang") and results grouped Top match / Experiences & guides / Recent | Verified (simulated query) |
| Filtering | Filter chips (All, Places, Experiences, Food, Phrases) toggle state, but **results don't change** | In Progress |
| Country choice | Home: 3D Top picks in the hero; Explore: Country guides chips; destinations: country breadcrumb. No long country list (search scales to any number of countries). | Verified (5 Oct 2026) |
| Horizontal scroll | Mood tiles and destination cards scroll sideways; cards bleed past the right edge to signal more | Verified |
| Vertical scroll | Long screens scroll; status bar and tab or action bar stay fixed | Verified |
| Gestures | Drag the front Top picks card to turn the cover-flow (Figma "On drag") | Verified (5 Oct 2026) |
| Feedback | Toast, badge, heart fill, focus ring | Verified |
| Motion feedback | Pressed states, heart pop, sheet reveal, Ken Burns, cover-flow (v3) | Verified (5 Oct 2026) |
| Confirmation | Not needed so far (no destructive actions) | n/a |
| Error recovery | "Undo" on the toast (not linked) | In Progress |

## 4. Mobile usability

- **Thumb zone:** primary actions sit in the bottom action bar (Add to trip, Continue). The Lens orb is centred in the tab bar. **Verified**
- **Readability:** body 14–16 pt, line height ≥ 1.4×; minimum 11 pt (tab labels). **Verified**
- **Content hierarchy:** eyebrow → title → meta row → body → actions. **Verified**
- **Safe areas:** 54 pt top and 34 pt bottom (home indicator) respected on first view. Since v2, 06, 07 and 14 use the solid Dark status bar, so content no longer scrolls under the clock. **Verified**
- **Screen sizes:** only **393 × 852** frames exist. **Planned (brief):** "consider different screen sizes". **Proposed:** add iPhone SE (375 × 667) and Pro Max (440 × 956) versions of Home and Penang, built with auto layout so they reflow.

## 5. UX states

| State | Exists today | Proposed design |
|---|---|---|
| Default | All screens | — |
| Hover | Buttons, chips, destination / experience / category cards (desktop-oriented) | Replace with **pressed** states for mobile (scale 0.97) |
| Selected / active | Chips, interest tiles, language option, tabs, segmented controls, toggles | — |
| Focused | Search Field component and the Explore fields: 2 pt `pandan/900` ring (v2) | — |
| Success | Toast "Added to Day 1", "JUST ADDED" badge (09 only), "Trip created" toast (18), Saved heart | — |
| **Loading** | ✅ `24 Home – Loading` (skeleton + text status); `22 AR – Scanning` | Proposed: Search loading |
| **Empty** | ✅ `16 Trips – Day 2 (empty)`, `25 Explore – No results`, "Past" in 18 | Proposed: no trips at all |
| **Error** | ⚠️ Recovery only: "move a little closer" (22), typo suggestion (25) | Proposed: offline banner on Home with "Use offline pack" |
| **Disabled** | ❌ None | Continue disabled until at least 1 interest is selected (`line` fill, `ink-muted` label) |
| Permission | ✅ `21 AR – Camera permission` (priming screen before the iOS prompt) | — |

> Build missing states as **variants** of existing components, or as extra frames in the same Flow section. Never as one-off screens elsewhere.

## 6. Consistency checklist for new screens

- [ ] Same frame size, status-bar variant and tab-bar or action-bar rule as its siblings.
- [ ] 20 pt side margins (24 on onboarding), the documented section gaps.
- [ ] Text styles only. No loose font sizes except the documented 11 pt tab label.
- [ ] Colours from **Tourix Tokens** only.
- [ ] Reused components (Button, Chip, Save, cards, Toggle, Interest Tile, Tab Bar, Status Bar).
- [ ] Every tappable element is linked or explicitly listed as a non-functional control in [prototype-interactions](prototype-interactions.md).
- [ ] Cultural context included where relevant (dress, language, etiquette).
- [ ] Contrast and the 44 pt targets checked.
