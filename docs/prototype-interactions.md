# Prototype interactions

Every prototype connection in the Tourix mobile prototype. §1 comes from the Figma inventory export (4 Oct 2026); the v2 table was built from the v2 plugin source and checked in presentation mode the same day. All interactions are **simulated**. Nothing below is a working feature: search doesn't search, audio doesn't play, AR doesn't use the camera.

Related: [user-flows](user-flows.md) · [ui-ux-guidelines](ui-ux-guidelines.md) · [design §6](design.md#6-motion-and-micro-interactions)

## 1. Screen-level navigation (Verified)

| Screen | Element (layer name) | Trigger | Destination / result | Transition | Status |
|---|---|---|---|---|---|
| 01 Splash | (frame) | After 1.8 s | 02 Onboarding – Language | Dissolve | Implemented |
| 02 Language | `Skip` | Tap | 04 Home | Dissolve | Implemented |
| 02 Language | `Button/Continue` | Tap | 03 Onboarding – Interests | Push ← | Implemented |
| 03 Interests | `Back` | Tap | Back | — | Implemented |
| 03 Interests | `Skip` | Tap | 04 Home | Dissolve | Implemented |
| 03 Interests | `Button/Show my Malaysia` (renamed `Button/Start exploring`, Verified (5 Oct 2026)) | Tap | 04 Home | Dissolve | Implemented |
| 04 Home | `Search field` | Tap | 05 Explore – Search | Dissolve | Implemented |
| 04 Home | `Mood/…` (×5) | Tap | 05 Explore – Search | Dissolve | Implemented |
| 04 Home | "See all" (`Action`) | Tap | 05 Explore – Search | Dissolve | Implemented |
| 04 Home | `Destination/Penang` | Tap | 06 Destination – Penang | Push ← | Implemented; the carousel moves to 26 (Verified, 5 Oct 2026) |
| 04 Home | `Phrase of the day` | Tap | 08 Culture guide – Phrases | Push ← | Implemented |
| 05 Explore | `Cancel` | Tap | 04 Home | Dissolve | Implemented |
| 05 Explore | `Result/Penang` | Tap | 06 Destination – Penang | Push ← | Implemented |
| 05 Explore | `Result/Heritage walk` | Tap | 07 Experience – Heritage walk | Push ← | Implemented |
| 05 Explore | `Result/Phrases` | Tap | 08 Culture guide – Phrases | Push ← | Implemented |
| 06 Penang | `Back` | Tap | Back | — | Implemented |
| 06 Penang | `Seg/Etiquette` | Tap | 08 Culture guide – Phrases | Push ← | Implemented |
| 06 Penang | "See all" (`Action`) | Tap | 05 Explore – Search | Dissolve | Implemented |
| 06 Penang | `Experience/George Town heritage walk` | Tap | 07 Experience – Heritage walk | Push ← | Implemented |
| 06 Penang | `Button/Open Heritage Lens` | Tap | 12 AR Heritage Lens | Move in | Implemented |
| 06 Penang | `Button/Add to trip` | Tap | 09 Trips – Just added | Smart animate | Implemented |
| 07 Heritage walk | `Back` | Tap | Back | — | Implemented |
| 07 Heritage walk | `Button/Add to Day 1 · Sat 17 Oct` | Tap | 09 Trips – Just added | Smart animate | Implemented |
| 08 Culture guide | `Back` | Tap | Back | — | Implemented |
| 09 Trips – Just added | (frame) | After 2.4 s | 10 Trips (the toast slides up and out) | Smart animate | Implemented |
| 09 / 10 Trips | `Button/Add a stop` | Tap | 05 Explore – Search | Dissolve | Implemented |
| 12 AR Lens | `AR label · Five-foot way` | Tap | 13 AR Lens – Landmark info (the sheet slides up) | Smart animate | Implemented |
| 12 AR Lens | `Close` | Tap | Back | — | Implemented |
| 13 Landmark info | `Close sheet`, `Scrim`, `Button/Next landmark` | Tap | 12 AR Heritage Lens | Smart animate | Implemented |
| 13 Landmark info | `Close` | Tap | Back | — | Implemented |

### Changed or added in v2 / v2.1 (Verified in presentation mode, 4 Oct 2026)

| Screen | Element (layer name) | Trigger | Destination / result | Transition |
|---|---|---|---|---|
| 02, 03 | `Hotspot/Skip` (replaces the bare `Skip` text link) | Tap | 04 Home | Dissolve |
| 03 | `Button/Show my Malaysia` → `Button/Start exploring` | Tap | **24 Home – Loading** (was 04) | Dissolve |
| 24 Loading | (frame) | After 1.4 s | 04 Home | Dissolve |
| 04 → 26 | `Destination/Melaka` | Tap | 14 Destination – Melaka | Push ← |
| 04, 06 | `Hotspot/See all` | Tap | 05 Explore – Search | Dissolve |
| 05 | `Search field (focused)` | Tap | 25 Explore – No results (simulated typo) | Dissolve |
| 05, 25 | `Hotspot/Cancel` | Tap | 04 Home | Dissolve |
| 06 | `Seg/Etiquette` | Tap | **15 Culture guide – Etiquette** (was 08) | Push ← |
| 06 | `Button/Open Heritage Lens` | Tap | **21 AR – Camera permission** (was 12) | Move in ↑ |
| 08 | `Seg/Etiquette` | Tap | 15 Culture guide – Etiquette | Dissolve |
| 09, 10 | `Chip/Day 2 · Sun` | Tap | 16 Trips – Day 2 (empty) | Dissolve |
| 09, 10, 16, 18 | `New trip` | Tap | 17 Trips – New trip (sheet) | Move in ↑ |
| 09, 10 | `Hotspot/All trips` (v2.1) | Tap | 18 Trips – All trips | Push ← |
| 11 | `Row/Language` | Tap | 19 Me – Language | Push ← |
| 11 | `Row/Offline guide packs` | Tap | 20 Me – Offline guide packs | Push ← |
| 12 | `AR label · Shophouse façade` | Tap | 23 AR Lens – Shophouse façade | Smart animate |
| 13 | `Button/Next landmark` | Tap | **23** (was 12) | Smart animate |
| 14 Melaka | `Back` · `Seg/Etiquette` · `Hotspot/See all` · `Button/Add to trip` | Tap | Back · 15 · 05 · 17 | — · Push · Dissolve · Move in ↑ |
| 15 Etiquette | `Back` · `Seg/Phrases` | Tap | Back · 08 | — · Dissolve |
| 16 Day 2 | `Chip/Day 1 · Sat` · `Button/Add a stop` · `Idea/…` | Tap | 10 · 05 · 05 | Dissolve |
| 17 New trip | `Close sheet`, `Scrim` · `Button/Create trip` | Tap | Back · 18 | — · Smart animate |
| 18 All trips | `Trip/Weekend in Penang` | Tap | 10 Trips | Push ← |
| 19, 20 | `Back` | Tap | Back | — |
| 21 Permission | `Button/Allow camera` · `Button/Not now`, `Close` | Tap | 22 · Back | Dissolve · — |
| 22 Scanning | (frame) · `Close` | After 1.8 s · Tap | 12 · Back | Dissolve · — |
| 23 Façade | `Close sheet`, `Scrim` · `Button/Next landmark` · `Close` | Tap | 12 · 13 · Back | Smart animate |
| 25 No results | `Suggestion/Penang Hill` · `Chip/Melaka` | Tap | 05 · 14 | Dissolve · Push ← |

The tab bar also appears on 15, 16, 18, 19, 20, 24 and 25 and 26.

### Worldwide scope (Verified in presentation mode, 5 Oct 2026)

| Screen | Element (layer name) | Trigger | Destination / result | Transition |
|---|---|---|---|---|
| 04 Home | `Country/Malaysia` (list row) | — | Removed in v3 ('Choose a country' replaced by Top recommendations) | — |
| 04 Home | `Top picks (3D)` (hero) → front card (Penang · Kyoto · Lisbon · Marrakech · Oaxaca · Istanbul) | Tap | 06 · 27 · 29 · 28 · 30 · 31 | Push ← |
| 04 Home | `Top picks (3D)` (hero) → Next / Prev / side card / drag front card | Tap / drag | Rotates the cover-flow (smart animate 550 ms, custom ease) | — |
| 05 Explore | `Country/Malaysia` · `Japan` · `Morocco` · `Portugal` · `Mexico` · `Türkiye` chips | Tap | 26 · 27 · 28 · 29 · 30 · 31 | Push ← |
| 06, 14 | `Country/Malaysia` breadcrumb | Tap | 26 Country – Malaysia | Push ← |
| 27–31 | `Back` | Tap | Back | — |
| 26 Malaysia | `Back` | Tap | Back | — |
| 26 Malaysia | `Destination/Penang` · `Destination/Melaka` (moved from 04, links kept) | Tap | 06 · 14 | Push ← |
| 26 Malaysia | `Row/Culture guide` · `Row/Etiquette` | Tap | 08 · 15 | Push ← |

### v5: the remaining pages (7 Oct 2026)

Walked through in presentation mode on 7 Oct 2026 unless marked *(built, not walked)*.

| Screen | Element (layer name) | Trigger | Destination / result | Transition |
|---|---|---|---|---|
| 26–31 | `Destination/…` cards (all 21) | Tap | 06, 14, 32–50 *(32 walked; the others built the same way)* | Push ← |
| 32–50 | `Back` · `Country/<country>` breadcrumb · `Button/Add to trip` | Tap | Back · 26–31 · 17 New trip (sheet) | — · Push ← · Move in ↑ |
| 32 Kuala Lumpur | `Highlight/Batu Caves` | Tap | 54 Batu Caves | Push ← |
| 04, 73, 74 | `Notifications` (bell) · `Location` chip · `Experience/Climb the 272 steps at Batu Caves` | Tap | 61 · 62 · 54 | Push ← · Move in ↑ · Push ← |
| 05 | `Result/Hawker breakfast` | Tap | 53 | Push ← |
| 05, 63–66 | `Hotspot/Chip/…` (44 pt, over the Filters chips; v5.4) | Tap | 05 All · 63 Places · 64 Experiences · 65 Food · 66 Phrases | Dissolve |
| 06 | `Seg/Experiences` · `Experience/Hawker breakfast in George Town` | Tap | 51 · 53 | Push ← |
| 14 | `Seg/Experiences` · experience cards | Tap | 52 | Push ← |
| 51, 52 | `Seg/Overview` · `Seg/Etiquette` · rows with a photo and chevron | Tap | 06 / 14 · 15 · 07, 53 or 17 | Dissolve · Push ← · Push ← |
| 53, 54 | `Back` · `Button/Add to trip` | Tap | Back · 17 | — · Move in ↑ |
| 08, 15 | `Seg/Festivals` | Tap | 55 Festivals | Dissolve |
| 55 | `Seg/Phrases` · `Seg/Etiquette` | Tap | 08 · 15 | Dissolve |
| 61 | Rows with a chevron (trip reminder, offline pack, Türkiye guide) | Tap | 10 · 20 · 31 | Push ← |
| 62 | `Close sheet`, `Scrim` (trimmed to the sheet top, v5.2) · `Button/Done` | Tap | Back | — |
| 09, 10, 59 | `Button/Share plan` | Tap | 58 Share plan (sheet) | Move in ↑ |
| 09 | Toast `Undo` | Tap | 59 Removed (undo) *(built, not walked)* | Smart animate |
| 59 | Toast `Redo` | Tap | 09 *(built, not walked)* | Smart animate |
| 17 | `Invite` | Tap | 60 Invite a friend (sheet) *(not re-walked after the v5.2 scrim fix)* | Move in ↑ |
| 18 | `Trip/Melaka day trip` (chevron now shown) · toast `Invite` | Tap | 57 *(built, not walked)* · 60 | Push ← · Move in ↑ |
| 57 | `Back` · `Add a stop` · `Share` · `Invite a friend` | Tap | Back · 05 · 58 · 60 | — · Dissolve · Move in ↑ · Move in ↑ |
| 58, 60 | `Close sheet`, `Scrim` | Tap | Back | — |
| 11 | `Profile` · `Row/Units` · `Row/Synced devices` · `Row/About this prototype` | Tap | 56 · 68 · 67 · 69 *(56 walked)* | Push ← |
| 19 | `Preview Tourix in Bahasa Melayu` | Tap | 74 | Push ← |
| 73 | `Open offline packs →` | Tap | 20 | Push ← |
| 12, 70, 71 | `Mode/History` · `Mode/Phrases` · `Mode/Food nearby` | Tap | 12 · 70 · 71 | Dissolve |
| 12 | `AR label · Kopitiam` | Tap | 72 Kopitiam (sheet) | Smart animate |

**Fixes after testing (7 Oct 2026):**
- v5.1 rebuilt the flow list; cloning 04 had duplicated flow start 2.
- v5.2 trimmed the sheet scrims on 17, 58, 60 and 62, so a tap on the sheet no longer closes it.
- v5.3 and v5.4 moved the Explore chip links onto 44 pt hotspots.
- v5.5 replaced the Top picks instance stuck on its invisible Intro state on 73 and 74, and re-applied the BM text. It also lifted the lowest AR label on 70 and 71 off the hint text.
- v5.6 and v5.7 kept the Lebuh Armenian label on 70 inside the screen, clear of Tandas, with its anchor off the Kedai Kopi card.
- v5.8 corrected the Read me count to 9 flows.

## 2. Tab bar (Verified)

The links are defined inside the **Tab Bar (iOS)** component, so every instance inherits them. The bar appears on screens 04, 05, 08, 09, 10 and 11.

| Tab | Destination | Transition |
|---|---|---|
| Home | 04 Home | Dissolve |
| Explore | 05 Explore – Search | Dissolve |
| Lens (raised orb) | 12 AR Heritage Lens | Dissolve |
| Trips | 10 Trips | Dissolve |
| Me | 11 Me – Settings & accessibility | Dissolve |

## 3. In-component interactions (Verified)

**Added in v3 (5 Oct 2026, verified in presentation mode):**

| Component | Element | Trigger | Result |
|---|---|---|---|
| Top Recommendations (3D) | Intro variant | After 0.1 s | Cards rise into the cover-flow (800 ms) |
| Live Photo | Phase=Start | After 0.15 s | Ken Burns push-in to Phase=End over 4.5 s, once |
| Reveal · … (26–31 sheets) | In=No | After 0.1 s | Sheet rises 56 pt and fades in (600 ms) |
| Button, Destination Card, Experience Card | Default / Hover | While pressing | State=Pressed (120 ms) |
| Save Button | Default | Tap | Pop (1.3× heart) → after 0.14 s → Saved with an overshoot ease |
| AR Anchor Pulse | Step=1…6 | After 0.05 s each | 3 pulses (≈2.7 s) then rests on Step=7 |
| Skeleton Shimmer (24) | Pos=Start | After 0.05 s | One sheen sweep (1.2 s) |


| Component | Element | Trigger | Result |
|---|---|---|---|
| 3D Showcase (not on Home since v4) | Whole card ring | After 3.2 s | Rotates to the next destination (smart animate 700 ms) |
| 3D Showcase | `Prev` / `Next` | Tap | Rotates back / forward (600 ms), keeping Auto or Paused |
| 3D Showcase | `Pause` / `Play` (v2) | Tap | Swaps to the `Motion=Paused` twin (no timer) / back to `Motion=Auto` |
| Language Picker (v2) | `Option/…` row | Tap | Selects that language (02, 19) |
| Phrase Card (v2) | Card | Tap / after 2.5 s | Playing state with waveform and captions note / back to idle |
| 3D Showcase | Front card | Drag | Rotates forward |
| Filter Chip | Chip | Hover / tap | Tint / toggles Active ↔ Default |
| Interest Tile | Tile | Tap | Toggles selected (colour + tick) |
| Toggle | Switch | Tap | On ↔ off |
| Save Button | Heart | Tap | Default ↔ Saved (filled bunga) |
| Button (all types) | Button | Hover | Hover variant (desktop-oriented) |
| Destination / Experience Card | Card | Hover | Lift, zoom (desktop-oriented) |
| Search Field | Field | Tap | Focused ↔ default (desktop hero only) |

## 4. Non-functional controls (Verified)

These elements look interactive but have **no link**. In a usability test, tell participants about them, or link them.

v5 (7 Oct 2026) linked these, which were all dead before:
- the bell, the location chip and the Batu Caves card
- Hawker breakfast
- the Experiences and Festivals segments
- Share plan and Undo
- Units, Synced devices and About
- the AR modes and the Kopitiam label
- the Melaka trip card and Invite

| Screen | Elements |
|---|---|
| 04, 73, 74 Home | Voice-search mic |
| 05, 63–66 Explore | Clear (x) icon; "Recent" rows; results without a chevron |
| 06, 14, 32–50 Destinations | Share; action-bar "Save" (toggles only); highlight rows without a chevron |
| 07, 53, 54 Experiences | Audio play; route stops |
| 08 Culture guide | "Practise out loud" mic |
| 17 New trip | Fields (shown pre-filled); remove (x) on the stop chip |
| 19 Language | Audio guide language row; request a language |
| 20 Offline | Download / pause buttons; Wi-Fi-only toggle works (component) |
| 09 / 10 Trips | Map pins |
| 11 Me | Text-size slider |
| 12, 70, 71 AR Lens | Gallery; Capture; Ask by voice; Help (i); labels other than Five-foot way, Shophouse façade and Kopitiam |
| 13 / 23 / 72 sheets | Listen (play); Save |
| 51, 52, 61, 62 lists | Rows without a chevron (information only, by design) |
| 58 Share, 60 Invite | Options without a chevron (copy link, contacts) |
| 67–69 Me pages | Toggles and radios are shown, not switchable |

## 5. Known issues

| Issue | Status |
|---|---|
| ~~`10 Trips` still shows the JUST ADDED badge~~ | Fixed in v2 |
| ~~Content scrolls under the transparent status bar on 06 and 07~~ | Fixed in v2 |
| ~~"Next landmark" returns to the same Lens view~~ | Fixed in v2 (cycles 13 ↔ 23) |
| Culture guide (08) shows the tab bar, while the other detail screens show an action bar | Verified (inconsistency) |
| Hover variants can't fire on touch devices | Verified |
| Reduce motion / High contrast / Captions toggles don't change any screen (nothing on Home auto-plays since v4) | Verified |
| The Lens tab always opens 12 directly; only "Open Heritage Lens" and flow start 3 show the permission screen | Verified (intentional: permission is first-use only) |
| Tapping the search field on 05 jumps to the no-results state, which is a demo shortcut, not real typing | Verified (explain in testing) |
| "Add to trip" on 32–50, 53 and 54 opens the new-trip sheet (17), which is pre-filled for Melaka | Verified (7 Oct 2026). Explain in testing, or make per-destination sheets |
| The prototype viewer can keep an old component state in an open tab (e.g. blank Explore chips) | Verified (7 Oct 2026). Close and reopen the presentation tab after edits |
| AR distances on 71 and travel times on 32–50 are samples | Unverified (check before submission) |

## 6. Presentation tips

- Start with **1 · First launch** to show onboarding. Tap two interest tiles to show the toggle.
- On Home, swipe the **Top picks** cover-flow in the hero (watch the fireflies drift), then tap Kyoto to open the Japan guide.
- Run **Explore → Country guides → Malaysia → Penang → Heritage walk → Add to Day 1** to show the drill-down and the toast animation.
- Finish with flow **3 · AR Heritage Lens**: permission → scanning → Five-foot way → Next landmark.
- Use flow **4 · Plan a day trip (Melaka)** for the community angle (invite a friend) and flow **5** for edge cases.
- Flow **7 · Destinations** starts at Kuala Lumpur (32); tap the Batu Caves highlight for a full experience page.
- Flow **8 · Offline mode** (73) shows the offline banner; flow **9 · Bahasa Melayu** (74) shows Home translated.
- In the AR Lens, switch between History, Phrases and Food nearby to show that the Lens is more than one heritage trick.
