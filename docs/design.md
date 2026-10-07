# Design system

The reference for how Tourix looks and moves. All values marked **Verified** come from the Figma file: the variables, styles and component inventory exported on 4 Oct 2026, plus the presentation-mode walkthrough. Anything marked **Proposed** is a recommendation and hasn't been built.

Related: [components](components.md) · [accessibility](accessibility.md) · [figma-guidelines](figma-guidelines.md)

---

## 1. Brand identity

| Item | Detail | Status |
|---|---|---|
| Name | **Tourix**. The wordmark is set lowercase, `tourix`, in Gloock 28 (logo) or 56 (splash). | Verified |
| Logo mark | 34 × 34 rounded square (r 10) with a dotted trail ending at a destination dot. **Dark** theme: kaya square with a pandan trail, for pandan surfaces. **Light** theme: pandan square with a kaya trail, for light surfaces. | Verified (`Logo` component) |
| Personality | Warm, knowledgeable, respectful, quietly premium: a local friend, not a tour operator | Verified (from copy and visual tone) |
| Aesthetic | Editorial serif headlines over deep green; gold used only for primary actions; real photography; generous rounding; layered depth | Verified |
| Tagline | "Anywhere, with local context." (splash; was "Malaysia, with local context." until 5 Oct 2026) | Verified (5 Oct 2026) |
| Name note | The dotted trail mark reads as "a journey to a destination". | Verified |
| Origin vs scope | The pandan / kaya / bunga raya palette and the "kelip-kelip" fireflies come from Malaysia, where Tourix started. They are the brand's identity, not a statement about content scope: the app is worldwide (5 Oct 2026). | Verified (team decision) |

### Imagery
- **Real photography** of the places named (Pexels, free licence), full-bleed in heroes and cards. Malaysian places throughout the built country; one photo per country in the Home showcase and country list (Japan: Kyoto street with Yasaka pagoda; Morocco: Koutoubia mosque, Marrakech; Portugal: Lisbon tram; Mexico: papel picado, Oaxaca; Türkiye: Blue Mosque, Istanbul) — Verified (5 Oct 2026). A pandan gradient shade covers the lower part so text stays readable. **Verified**
- Photos use FILL crop. Destination-card and tile photos zoom about 12 % on hover. **Verified**
- **Caveat:** the "Langkawi" photo is a generic tropical beach, so it's illustrative only. **Verified**
- No illustrations. Decorative graphics are vector-only: a dotted "signature trail", fireflies, and an orbit ring. **Verified**

---

## 2. Colour system

Variable collection **Tourix Tokens**, one mode, `Light`. All colours below are **Verified** variables.

### Brand

| Token | HEX | Role | Typical use |
|---|---|---|---|
| `color/pandan/900` | `#0B2A21` | Primary dark surface | Home header, splash, trip card, AR promo, active chips, dark buttons, Lens icon |
| `color/pandan/700` | `#155240` | Secondary dark | Button `Dark` hover, eyebrow text on kaya tint |
| `color/pandan/500` | `#2E7D5B` | Link / active accent | Text links ("Skip", "See all", "Cancel"), location pins, toggle **on** track, pronunciation text |
| `color/pandan/100` | `#E3EFE8` | Soft tint | Icon badges, active tab pill, filter-chip hover, tag pills |
| `color/kaya/400` | `#F2C14E` | **Primary action** | Primary buttons, Lens orb, icon badges on dark, eyebrows on dark, AR accents, fireflies |
| `color/kaya/500` | `#E0A82E` | Pressed / hover / focus | Primary hover, focused field border, "just added" card border |
| `color/kaya/100` | `#FBEFCF` | Highlight tint | Selected language option, focused search field, phrase-of-the-day card, "Be a good guest" |
| `color/bunga/500` | `#C7362F` | Save / heart | Save Button `Saved` state (heart filled) |

### Neutrals and text

| Token | HEX | Role |
|---|---|---|
| `color/mist` | `#F4F7F3` | Page background (light screens) |
| `color/surface` | `#FFFFFF` | Cards, sheets, search fields, tab bar (94 %) |
| `color/ink` | `#13201B` | Primary text and icons |
| `color/ink-muted` | `#4E5E57` | Secondary text, inactive tab labels |
| `color/line` | `#D7E0DA` | Borders, dividers, toggle **off** track |
| `color/on-dark` | `#F4F7F3` | Text and icons on pandan or photos |
| `color/on-dark-muted` | `#B9CCC2` | Secondary text on pandan |

### Other colours seen in the file (not tokens)

| Value | Where | Status |
|---|---|---|
| `#000000` at 45–80 % | AR camera shades, glass buttons over the camera | Verified (hard-coded) |
| `#CFE3EA` | Sea colour in the Trips map preview | Verified (hard-coded) |
| `#FFFFFF` | Toggle knob, slider knob, shutter ring | Verified (hard-coded) |
| `#E9EEEA` | Canvas background of the Mobile page (not shown in the prototype) | Verified |

### Semantic colours

| Need | Current | Status |
|---|---|---|
| Success | The kaya tick plus pandan toast ("Added to Day 1") is the only success pattern | Verified |
| Error | None designed | **Proposed:** `color/error/500 #B42318` with `color/error/100 #FEE4E2` (calculated 6.6 : 1 on white, 5.5 : 1 on the tint) |
| Warning | None designed | **Proposed:** reuse `kaya/100` background with `ink` text and a warning icon (never colour alone) |
| Disabled | None designed | **Proposed:** `line` fill with `ink-muted` text at 60 % |

> Never add a colour without checking these tables. New tokens go in **Tourix Tokens**, scoped (fill, text or stroke) and given a description.

---

## 3. Typography

Families: **Gloock** (display serif) · **Figtree** (UI sans) · **DM Mono** (data and labels). All styles below are **Verified** local text styles.

| Style | Font | Size / line height | Tracking | Used for |
|---|---|---|---|---|
| `Mobile/Display XL` | Gloock Regular | 42 / 46 | −1 | Screen hero titles: "Welcome to Tourix.", "Penang", country names (splash wordmark is overridden to 56) |
| `Mobile/Display M` | Gloock Regular | 30 / 36 | −0.5 | Screen titles: Explore, Trips, Me, "Where to next?", the AR sheet title |
| `Display/S` | Gloock Regular | 26 / 32 | 0 | Card titles (destinations, showcase), "Tumpang lalu", "Weekend in Penang" |
| `Display/XL · L · M` | Gloock Regular | 76/80 · 54/60 · 38/44 | −1.5 · −1 · −0.5 | Desktop landing page only |
| `Heading/M` | Figtree SemiBold | 20 / 28 | 0 | Section headings ("Explore by mood", "Good to know", "Route") |
| `Heading/S` | Figtree SemiBold | 17 / 24 | 0 | List-row titles, option titles, timeline titles |
| `Body/L` | Figtree Regular | 19 / 30 | 0 | Splash tagline, desktop hero subtitle |
| `Body/M` | Figtree Regular | 16 / 24 | 0 | Paragraphs, intro text |
| `Body/S` | Figtree Regular | 14 / 20 | 0 | Secondary text, tips, descriptions |
| `Label/M` | Figtree SemiBold | 15 / 20 | 0 | Buttons, links, list labels |
| `Label/S` | Figtree Medium | 13 / 18 | 0 | Chips, small links, tag pills. Tab labels override it to **11 pt**. |
| `Eyebrow` | DM Mono Medium | 12 / 16 | 1.2, UPPERCASE | Section and region eyebrows ("POPULAR DESTINATIONS", "PULAU PINANG · NORTHERN REGION") |
| `Mono/S` | DM Mono Regular | 12 / 16 | 0.2 | Coordinates, times, pronunciation, durations, sync status |

**Rules**
- Gloock only for titles of 26 pt and above. Never use it for body text or buttons.
- DM Mono marks *data*: times, coordinates, pronunciation, units.
- Uppercase only through the `Eyebrow` style.
- The tab-label override (11 pt) is the smallest text in the app. Don't go smaller. **Proposed:** make it a style, `Label/XS`.
- Status-bar time uses Figtree SemiBold 17, hard-coded inside the component.

---

## 4. Spacing and layout

### Tokens

`space/4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120` are **Verified** variables. Mobile screens currently use literal values, which mostly sit on this scale.

### Mobile frame (Verified)

| Element | Value |
|---|---|
| Frame | **393 × 852 pt** (iPhone 16). Taller frames scroll vertically. |
| Status bar | 54 pt, fixed. Variants: `Dark` (solid pandan), `Light` (mist 94 %), `Clear` (transparent, over photos). |
| Tab bar | 84 pt, fixed at y = 768. Includes the home indicator (134 × 5). |
| Action bar (detail screens) | 104 pt, fixed: 14 top / 20 sides / 34 bottom padding, surface 96 % + blur 20, 1 pt top line |
| Side margin | **20 pt** on content screens; **24 pt** on onboarding |
| Top content inset | 62 pt (66 on Language) under the status bar |
| Bottom content inset | 120 pt (tabbed screens) / 140 pt (screens with an action bar) |
| Section gap | 30 pt (Home body), 18–22 pt (most screens), 14 pt (Me) |
| Card inner padding | 14–20 pt (rows 10–14, cards 16–20) |
| Photo-sheet overlap | Detail sheets overlap the hero photo by **28 pt** (negative gap), with a top radius of 28 |
| Horizontal scrollers | Bleed to the right edge (no right padding), item gap 12–14 pt |

### Layout conventions
- Single column, left aligned. Section heading + "See all" link right-aligned on one row.
- Two-column grid only for interest tiles (2 × 166.5 pt, 12 pt gap).
- Destination and experience content is portrait cards (destination 0.86 × 320 pt, experience scaled to 353 pt wide).
- Safe areas: content is never placed under the status bar or home indicator when the screen first loads. **Known issue:** it can scroll under the transparent (`Clear`) status bar on Penang and the heritage walk.

---

## 5. Shape, elevation and depth

### Corner radius

| Token | Value | Verified use |
|---|---|---|
| `radius/sm` | 8 | Small keys (desktop) |
| `radius/md` | 14 | Fact cells, section boards |
| `radius/lg` | 22 | Cards (destination, experience), search bar |
| `radius/xl` | 32 | Category tile, showcase card |
| `radius/pill` | 999 | Buttons, chips, pills, toggles |

**Inconsistency (Verified):** mobile screens use literal radii (12, 14, 16, 18, 20, 22, 24, 28) that aren't bound to these tokens. **Proposed:** map them to the scale, e.g. 18 → `lg`, 24/28 → `xl`, and bind them.

### Elevation (effect styles, Verified)

| Style | Definition | Use |
|---|---|---|
| `Elevation/1` | 0/1 blur 2 @6 % + 0/4 blur 12 @6 % (pandan-tinted) | Resting cards, save button |
| `Elevation/2` | 0/2 blur 6 @8 % + 0/16 blur 40 @14 % (spread −4) | Hovered or raised cards, search bar, toast |
| `Elevation/3D Card` | 0/10 blur 20 @25 % + 0/40 blur 80 @45 % (black) | Showcase cards, hovered destination and category cards |
| `Glass/Blur` | Background blur 24 | Glass surfaces |

Tab bar and action bars use their own background blur (20).

### 3D treatment (Verified)

| Element | Technique | Values |
|---|---|---|
| **3D cover-flow** (Home hero, v4) | Top picks: cards scaled 1 / 0.84 / 0.68, skewed ±0.10 / ±0.16, parallax photos, on pandan with a kaya glow (14 %, blur 90), dashed orbit (45 %), floor shadow and 10 fireflies whose positions change per variant so they drift as it turns. The older 3D Showcase ring stays in the Design System but isn't on Home. |
| Hero atmosphere | Glow, orbit, floor shadow, fireflies (see above) | Varies per variant so the scene shimmers as it turns |
| **AR labels** (Lens) | Glass cards with a slight perspective skew (−0.06 to +0.06), a dashed leader line to a glowing anchor dot | Pandan 82 % + blur 12, 1 pt kaya stroke |
| Card lift | Hover swaps `Elevation/1` for `3D Card` and zooms the photo about 12 % | Destination Card, Category Tile |
| Raised Lens orb | 54 pt kaya circle lifted above the tab bar with a warm glow | Tab Bar |

### Iconography (Verified)
- **Lucide**-style outline icons, 2 pt stroke, round caps. Sizes: 14 (in pills), 16–18 (rows), 20–22 (buttons, tabs), 26 (Lens).
- 16 icon components (`Icon/…`) are used for instance-swap slots. Other icons are inline vectors.
- On dark surfaces icons are `on-dark`; inside kaya badges they are `pandan/900`.

---

## 6. Motion and micro-interactions

### Verified

| Interaction | Trigger | Transition |
|---|---|---|
| Button hover (all types) | While hovering | Smart animate 220 ms, ease-out |
| Chip hover → active → off | Hover / tap | Smart animate 150–200 ms, ease-out |
| Save heart toggle | Tap | Smart animate 200 ms |
| Interest tile select / clear | Tap | Smart animate 200 ms |
| Toggle switch | Tap | Smart animate 180 ms (knob slides, track turns pandan) |
| Search field focus (component) | Tap | Smart animate 150 ms (kaya ring) |
| Destination / category card lift | Hover | Smart animate 300 ms |
| **3D Showcase auto-rotate** | After 3.2 s | Smart animate 700 ms, custom cubic-bezier (0.22, 1, 0.36, 1) |
| Showcase prev / next / drag | Tap / drag front card | Smart animate 600 ms, same curve |
| Splash → Language | After 1.8 s | Dissolve |
| Forward navigation | Tap | Push left, 350 ms, ease-in-out |
| Tab switch | Tap | Dissolve 150–250 ms |
| Add to trip → Trips | Tap | Smart animate 400 ms; toast slides away after 2.4 s |
| Open AR Lens from Penang | Tap | Move in, 350 ms |
| AR label → info sheet | Tap | Smart animate (the sheet slides up from off-screen; the scrim fades) |

### Motion rules
- **Durations:** 150–250 ms for micro feedback · 300–400 ms for screen changes · 600–700 ms only for the showcase.
- **Easing:** ease-out for feedback, ease-in-out for navigation, the custom "spring-out" curve for 3D rotation.
- **Reduce motion:** the Me screen exposes a "Reduce motion" setting. Switching screens to static variants isn't prototyped (**Unverified**); instead every automatic animation is one-shot and under 5 s, and the showcase has a pause.

### Built in v3 (Verified, 5 Oct 2026)

| Effect | Spec | Where |
|---|---|---|
| 3D cover-flow | Scale 1 / 0.84 / 0.68, skew ±0.10 / ±0.16, opacity 1 / 0.92 / 0.45, photo parallax ±16–26 pt; 550 ms custom ease (0.22, 1, 0.36, 1) | Home hero (Top picks) |
| Intro | Cards rise 40 pt from 0.6× and fade in, 800 ms | Home hero (Top picks) |
| Ken Burns | 8 % push-in, 4.5 s ease-out, once | Heroes 06, 07, 14, 26–31 |
| Reveal | Sheet rises 56 pt + fades in, 600 ms custom ease | 26–31 |
| Press | While pressing → Pressed (Hover look), 120 ms | Buttons, destination and experience cards |
| Heart pop | 1.3× pop 140 ms → Saved with ease-out-back 250 ms | Save Button |
| AR anchor pulse | 3 × ring 14 → 46 pt fade, 450 ms each | 12, 13, 23 |
| Shimmer | Diagonal sheen across skeleton, 1.2 s | 24 |

**Not possible in Figma prototypes:** scroll-position-driven effects (parallax on scroll, reveal-on-scroll). Animations start on screen open, press, tap or drag instead.

### Proposed: premium polish (not built, needs approval)

These would raise the craft level without changing the structure. Each must respect Reduce motion.

| # | Micro-interaction | Spec | Where |
|---|---|---|---|
| ~~P1~~ | ~~Press state for every tappable card~~ Built in v3 (Pressed variants) | Scale 0.97 + `Elevation/1` on press (while pressing → smart animate 120 ms) | Destination, experience, result rows |
| ~~P2~~ | ~~Heart "pop"~~ Built in v3 | Save → scale 1.2 → 1.0 with a bunga fill, 250 ms spring | Save Button |
| P3 | Tab icon bounce | Active icon translates −2 pt and fills the pill, 200 ms | Tab Bar |
| ~~P4~~ | ~~Skeleton loading~~ Shimmer built in v3 | Pandan-100 shimmer blocks for cards, 1.2 s loop | Home, Search (new state frames) |
| P5 | Parallax hero | Penang photo moves at 0.5× scroll speed (two smart-animate frames) | Destination |
| ~~P6~~ | ~~AR anchor pulse~~ Built in v3 | Anchor dot glow pulses 1.4 s (after-delay loop between two variants) | AR Lens |
| P7 | Card tilt on drag | Front showcase card tilts ±6° while dragging before it rotates | 3D Showcase |
| P8 | Success haptic cue (annotated) | Annotation "light haptic" on Add to trip / Save | Prototype notes |
| P9 | Pull-to-refresh | Kaya trail-dot spinner reusing the logo trail | Home |

---

## 7. Component visual patterns (summary)

The full inventory is in [components.md](components.md). Visual rules:

| Pattern | Rule |
|---|---|
| Primary button | Kaya fill, ink label `Label/M`, pill, 14/22 padding, optional trailing arrow. **One per view.** |
| Secondary | `Dark` (pandan fill, light text) on light surfaces; `On Dark` (outline) on pandan or photos; `Outline` (line border) as tertiary |
| Cards | White, `radius/lg`, `Elevation/1`, 1 pt line border on destination cards, photo on top, body padding 20 |
| Pills / tags | Pill radius; tinted fill (`pandan/100`, `kaya/100` or glass); icon 14 + `Label/S` |
| Search | White field, radius 18, leading search icon, trailing voice button (kaya-100 circle). Focused: kaya-100 fill + kaya-500 1.5 pt border. |
| Segmented control | Mist track, pill; active segment is a white pill with `Elevation`, or a pandan pill on light screens |
| Bottom sheet | White, top radius 28, 40 × 5 handle, close button, primary + outline buttons at the bottom |
| Toast | Pandan pill, kaya tick, `Label/M` message + kaya "Undo" |
| Timeline | Numbered 26 pt dots (pandan; the last one kaya) joined by a 2 pt line |
| Lists / settings | White grouped card (radius 20), 36 pt icon badge, 1 pt dividers, trailing value + chevron or toggle |

**Not present (Verified absent):** ratings, reviews, prices, image galleries, modals or dialogs, menus, dropdowns, maps beyond the static preview, dark theme.
