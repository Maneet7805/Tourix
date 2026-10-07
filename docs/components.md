# Components

The inventory of local components in the Tourix Figma file. It covers 17 components and component sets plus 16 icon components: 15 from the inventory export (4 Oct 2026) and 2 added by the v2 plugin the same day (checked in presentation mode). Everything listed here is **Verified** unless it's marked **Proposed**.

Related: [design](design.md) · [figma-guidelines](figma-guidelines.md)

## 1. Where they live

| Page | Contents |
|---|---|
| **Design System** | Logo, Button, Filter Chip, Save Button, 16 × `Icon/…`, Destination Card, Experience Card, Category Tile, Search Field, Benefit Item, Showcase Card, **3D Showcase**, plus the Photo Assets board |
| **Mobile Prototype (iOS)** → section *Mobile kit (components)* | Status Bar (iOS), Tab Bar (iOS), Interest Tile, Toggle, **Language Picker**, **Phrase Card** (v2) |

> The old duplicate kit pages (`OLD – delete me …`) were removed by 5 Oct 2026. Instances on the live page point to the kit on `Mobile Prototype (iOS)`.

## 2. Inventory

### Foundations and controls

| Component | Variants | Properties | Interactions (in-component) | Used on |
|---|---|---|---|---|
| **Logo** | `Theme=Dark`, `Theme=Light` | — | — | Read me board, desktop nav |
| **Button** | `Type=Primary · Dark · Outline · On Dark` × `State=Default · Hover` | `Label` (text), `Show icon` (bool, trailing arrow) | Default → Hover while hovering (220 ms) | Continue, Start exploring, Add to trip, Add to Day 1, Save, Open Heritage Lens, Add a stop, Share plan, Next landmark |
| **Filter Chip** | `State=Default · Hover · Active` | `Label` | Hover tint; tap toggles Active ↔ Default | Explore filters, Trip day tabs, desktop |
| **Save Button** (44 × 44 since v2) | `State=Default · Saved` | — | Tap toggles (heart fills bunga) | Destination cards, Penang, Melaka and heritage-walk heroes |
| **Toggle** | `On=No · Yes` | — | Tap toggles (180 ms). Off track uses `line-strong` since v2 | Language (Larger text), Me settings, 19, 20 |
| **Language Picker** (v2, 345 w) | `Selected=EN · BM · ZH · TA` | — | Tap a row selects it (smart animate 200 ms); unselected radios use `line-strong` | 02, 19 |
| **Phrase Card** (v2, 353 w) | `Playing=No · Yes` | `Phrase` (was `Malay`), `Pronunciation`, `English` (text) | Tap → Playing (waveform, "Playing · 0:02 · captions on"); tap again or wait 2.5 s → idle | 08 (×5), 27–31 (×3 each) |
| **Search Field** | `State=Default · Focused` | `Label`, `Value`, `Field icon` (instance swap) | Tap toggles Focused; Focused ring is `pandan/900` 2 pt since v2 | Desktop hero search |
| **Icon/** ×16 | — | — | — | mountain, landmark, utensils, palm, building, compass, gem, route, languages, pin, clock, sun, search, calendar, users, heart; used as instance-swap defaults |

### Content cards

| Component | Variants | Properties | Interaction | Used on |
|---|---|---|---|---|
| **Destination Card** (320 w) | `State=Default · Hover` | `Title`, `Location`, `Description`, `Region`, `Fact 1 label/value`, `Fact 2 label/value` | Hover: photo zoom, deeper shade, `3D Card` shadow, kaya arrow | Destinations carousel (scaled 0.86; moves from Home to 26, Verified (5 Oct 2026)), desktop |
| **Experience Card** (384 w) | `State=Default · Hover` | `Title`, `Location`, `Description`, `Category`, `Duration`, `Best time`, `Category icon` (swap) | Hover: zoom + `Elevation/2` + kaya accent bar | Home (Batu Caves), Penang (×2) |
| **Category Tile** (224 × 320) | `State=Default · Hover` | `Title`, `Subtitle`, `Category icon` (swap) | Hover: zoom + lift | Desktop only. Mobile uses custom **Mood cards** (see §3). |
| **Benefit Item** | — | `Title`, `Body`, `Benefit icon` | — | Desktop only (not yet placed) |
| **Interest Tile** (166 × 120) | `Selected=Off · On` | `Label`, `Icon` (swap) | Tap toggles (colour + tick) | 03 Interests (×8) |

### Navigation and system

| Component | Variants | Notes | Used on |
|---|---|---|---|
| **Status Bar (iOS)** 393 × 54 | `Theme=Dark · Light · Clear` | Dark = solid pandan · Light = mist 94 % · Clear = transparent over photos and AR. Time "9:41". 06, 07 and 14 use Dark since v2. | All 74 screens (fixed) |
| **Tab Bar (iOS)** 393 × 84 | `Active=Home · Explore · Lens · Trips · Me` | Each tab item carries a **Navigate** link to its screen (defined inside the component, so every instance inherits it). Raised kaya Lens orb. | 04, 05, 08, 09, 10, 11 |

### Signature

| Component | Variants | Behaviour | Used on |
|---|---|---|---|
| **Showcase Card** 260 × 360 | — | `Title`, `Region`, `Coords`; photo + shade + coordinates pill | Inside 3D Showcase |
| **3D Showcase** 640 × 600 | `Front=` Malaysia · Japan · Morocco · Portugal · Mexico · Türkiye × `Motion=Auto · Paused` (12 variants) | Auto-rotate, prev/next, drag, pause. **Not used on Home since v4** (replaced by Top Recommendations (3D)); kept in the Design System. | — |

## Motion components (v3, 5 Oct 2026)

All in the *Mobile kit (components)* section, so they can link to screens. **Verified** in presentation mode.

| Component | Variants | Behaviour | Used on |
|---|---|---|---|
| **Top Recommendations (3D)** 353 × 430 | `Front=Intro · Penang · Kyoto · Lisbon · Marrakech · Oaxaca · Istanbul` | Cover-flow: cards scaled (1 / 0.84 / 0.68), skewed ±0.10–0.16 for perspective, parallax photo offset, dots and arrows. Intro → Penang after 0.1 s. Drag front card or tap side cards/arrows to rotate; tap front card to open 06 or 27–31. No auto-play. | 04 Home hero (v4: dark styling with glow, dashed orbit, floor shadow, 10 drifting fireflies, light controls) |
| **Live Photo** 393 × 380 | `Phase=Start · End` | Ken Burns: 8 % push-in over 4.5 s, once per visit. Photo fill is overridden per screen. | Heroes of 06, 07, 14, 26–54 |
| **Reveal · <screen> sheet** (×6) | `In=No · Yes` | Content rises 56 pt and fades in over 0.6 s when the screen opens. | Sheets of 26–31 |
| **AR Anchor Pulse** 48 × 48 | `Step=1…7` | Three pulses (≈2.7 s), then rests. | Anchors on 12, 13, 23 |
| **Skeleton Shimmer** 393 × 852 | `Pos=Start · End` | One sheen sweep, 1.2 s. | 24 Home – Loading |

**Variant additions in v3:** `State=Pressed` on Button (×4 types), Destination Card and Experience Card (While pressing, 120 ms); `State=Pop` on Save Button. Phrase Card's text property `Malay` is now `Phrase`, so any language uses it.

## 3. Repeated patterns that are *not* components


These are built from frames on each screen. They're candidates for componentisation, all **Proposed**.

| Pattern | Occurrences | Proposed component |
|---|---|---|
| Mood card (150 × 196, photo + badge + title) | Home ×5 | `Mood Card` with `Icon` swap and an image slot. Retire or adapt Category Tile for mobile. |
| Circle icon button (36–54 pt) | Back, Close, Share, Play, Mic, Bell, New trip… (~30) | `Icon Button` with `Size=36/40/44/52` × `Style=Surface/Tint/Dark/Glass` |
| Result row (thumb + title + meta + chevron) | Explore ×4, Day 2 ideas ×2, No results ×1, Explore Country guides chips (pills, not rows) | `List Row` |
| Bottom sheet (handle + title + close) | 13, 17, 23 | `Bottom Sheet` |
| Skeleton block | 24 | `Skeleton` with `Shape=Line/Card/Tile` |
| Settings row (badge + label + value/toggle) | Me ×9 | `Settings Row` with `Trailing=Value/Toggle/Chevron` |
| Segmented control | Penang, Melaka, Culture guide ×2 | `Segmented Control` with `Selected=1/2/3` (makes the tabs interactive) |
| Action bar | Penang, Heritage walk | `Action Bar` |
| Toast | Trips ×2, All trips | `Toast` with `State=Visible/Hidden` |
| Timeline stop | Heritage walk ×4, Trips ×4 (different styles) | `Timeline Item` (unify the two styles) |
| Pill / tag | Many | `Tag` with `Tone=Pandan/Kaya/Glass/Surface` |
| AR label | Lens ×3 per screen | `AR Label` with `State=Default/Dimmed` |

**v5 (7 Oct 2026):** no new components. The 43 new screens reuse Status Bar, Tab Bar, Toggle, Phrase Card, Live Photo, Button, Filter Chip, Save Button and the frame patterns above (result rows, bottom sheets, segmented controls, settings rows, toasts, AR labels). The **Segmented control**, **Bottom sheet**, **Result row** and **AR label** patterns now appear on 20+ screens, which makes componentising them more worthwhile (Proposed).

## 4. Known inconsistencies

| Issue | Detail | Status |
|---|---|---|
| Hover states on a mobile prototype | Cards and buttons have Hover variants, which mobile can't trigger | Verified. **Proposed:** add `Pressed` variants (scale 0.97). |
| Radii not bound | Mobile frames use literal radii; DS components use radius variables | Verified |
| Two timeline styles | Heritage walk uses numbered dots; Trips uses time + bordered cards | Verified (intentional? **Unverified**) |
| Category Tile unused on mobile | Mobile uses custom mood cards | Verified |

## 5. Reuse rules

1. Search the Assets panel for an existing component before building anything.
2. Override **properties** (text, instance swap) rather than detaching. Never detach the Tab Bar or Status Bar.
3. A new look for an existing purpose becomes a **variant**, not a new component.
4. A new purpose that will be used 2+ times becomes a component in the right place: Design System for shared items, the Mobile kit section for mobile-only items.
5. Document every new component here and in the [changelog](changelog.md).
