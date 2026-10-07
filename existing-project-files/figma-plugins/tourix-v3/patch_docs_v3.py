# v3 documentation update (5 Oct 2026). Usage: python patch_docs_v3.py <tourix root>
import sys, pathlib
ROOT = pathlib.Path(sys.argv[1]); MISS = []
V = "Verified (5 Oct 2026)"

def edit(rel, ops):
    p = ROOT / rel; s = p.read_text(encoding="utf-8")
    for kind, a, b in ops:
        if kind == "line":  # replace the whole line that starts with a
            lines = s.split("\n"); hit = [i for i, l in enumerate(lines) if l.startswith(a)]
            if not hit: MISS.append((rel, a[:60])); continue
            lines[hit[0]] = b; s = "\n".join(lines)
        elif kind == "after":  # insert b after the line that starts with a
            lines = s.split("\n"); hit = [i for i, l in enumerate(lines) if l.startswith(a)]
            if not hit: MISS.append((rel, a[:60])); continue
            lines.insert(hit[0] + 1, b); s = "\n".join(lines)
        elif kind == "rep":
            if a not in s: MISS.append((rel, a[:60])); continue
            s = s.replace(a, b)
    p.write_text(s, encoding="utf-8", newline="\n")

PAGES = "27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye"

edit("CLAUDE.md", [
 ("line", "| **Scope model** |", "| **Scope model** | Worldwide. Home shows a country showcase and a 3D **Top recommendations** panel; search and Explore's **Country guides** chips reach every country. Six country guides are built: **26 Malaysia** (with full destination pages for Penang and Melaka, culture guide and AR Lens) and **27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye** (facts, etiquette, 3 destinations and 3 phrases each). |"),
 ("line", "| **What exists** |", "| **What exists** | A **high-fidelity interactive Figma prototype**: 31 linked iOS screens in 6 flows (iPhone 16, 393 × 852 pt), with a motion layer (3D cover-flow, Ken Burns photos, entrance reveals, press states, heart pop, AR anchor pulse, skeleton shimmer). There is no code and no backend. |"),
 ("after", "9. **Write worldwide by default.**", "10. **Motion must earn its place.** Every automatic animation ends within 5 s or has a pause (WCAG 2.2.2). Use the motion components in [components.md](docs/components.md#motion-components-v3-5-oct-2026) rather than one-off animations. Figma prototypes can't trigger animation from scroll position."),
])
edit("README.md", [
 ("line", "| **Built country** |", "| **Countries** | Six country guides: Malaysia (fully built: Penang, Melaka, culture guide, AR Lens) plus Japan, Morocco, Portugal, Mexico and Türkiye (facts, etiquette, 3 destinations, 3 phrases each) | " + V + " |"),
 ("line", "| **Prototype state** |", "| **Prototype state** | 31 linked screens in 6 flows (v3, 5 Oct 2026), with 3D and motion | In Progress |"),
 ("line", "- **Home goes countries-first:**", "- **Home:** the 3D showcase rotates countries; a swipeable 3D **Top recommendations** cover-flow (Penang, Kyoto, Lisbon, Marrakech, Oaxaca, Istanbul) opens Penang or a country guide. The greeting is \"GOOD MORNING\" and the title \"Where to next?\"."),
 ("after", "- **`26 Country – Malaysia`:**", "- **Country guides 27–31** (Flow 6): Japan, Morocco, Portugal, Mexico, Türkiye. Reached from Home picks and Explore → Country guides.\n- **Motion (v3):** Ken Burns hero photos, sheets that rise in on open, press states on buttons and cards, heart pop, pulsing AR anchors, skeleton shimmer."),
])
edit("docs/project-overview.md", [
 ("line", "| One app for every country |", "| One app for every country | Country showcase, 3D Top recommendations, Explore → Country guides, 6 country guides (26–31) | " + V + " |"),
 ("rep", "**Represented but not built out:** Japan, Morocco, Portugal, Mexico and Türkiye appear in the country showcase and list, but have no Country page.", "**Built at country level only:** Japan, Morocco, Portugal, Mexico and Türkiye have country guides (27–31) but no destination pages yet; their destination cards aren't linked."),
 ("line", "  - 26 linked screens", "  - 31 linked screens (13 original + 12 in v2 + 26 Malaysia + 27–31 country guides)"),
 ("line", "  - 5 flow sections with 5 starting points", "  - 6 flow sections with 6 starting points"),
 ("line", "  - 17 components and component sets", "  - 17 components and component sets from v1–v2 (incl. Language Picker, Phrase Card), plus 16 icon components and, in v3, Live Photo, Top Recommendations (3D), AR Anchor Pulse, Skeleton Shimmer and 6 Reveal sets"),
 ("line", "  - Home: 3D showcase rotates countries;", "  - Home: 3D showcase rotates countries; 3D Top recommendations panel (replaced the 'Choose a country' list in v3)"),
 ("rep", "only Malaysia is built. Adding a second country means", "Malaysia has full destination pages; 27–31 are country-level only. Adding destination pages means"),
])
edit("docs/information-architecture.md", [
 ("line", "World (Home: showcase", "World (Home: country showcase + 3D Top recommendations; Explore → Country guides)"),
 ("line", "└── Country ", "└── Country            26 Malaysia · 27 Japan · 28 Morocco · 29 Portugal · 30 Mexico · 31 Türkiye"),
 ("line", "All 26 screens are **Verified**", "All 31 screens are **Verified** (26–31 and their links tested in presentation mode on 5 Oct 2026). Penang and Melaka live on 26; 27–31 are reached from Home's Top recommendations and Explore's Country guides chips."),
 ("line", "| 26 | `26 Country – Malaysia`", "| 26 | `26 Country – Malaysia` | Flow 2 | Detail (country, has tab bar) | Explore chip (05), Malaysia breadcrumb (06, 14) | " + V + " |\n| 27 | `27 Country – Japan` | Flow 6 · Country guides | Detail (country) | Kyoto pick (04), Explore chip (05), flow start \"6 · Country guides\" | " + V + " |\n| 28 | `28 Country – Morocco` | Flow 6 | Detail (country) | Marrakech pick (04), Explore chip (05) | " + V + " |\n| 29 | `29 Country – Portugal` | Flow 6 | Detail (country) | Lisbon pick (04), Explore chip (05) | " + V + " |\n| 30 | `30 Country – Mexico` | Flow 6 | Detail (country) | Oaxaca pick (04), Explore chip (05) | " + V + " |\n| 31 | `31 Country – Türkiye` | Flow 6 | Detail (country) | Istanbul pick (04), Explore chip (05) | " + V + " |"),
 ("line", "| Countries |", "| Countries | Malaysia (full); Japan, Morocco, Portugal, Mexico, Türkiye (country guides) | Home showcase, Top recommendations, Explore chips; 26–31 |"),
 ("line", "| Country pages other than Malaysia |", "| Destination pages outside Malaysia | 27–31 show 3 destination cards each, not linked | Proposed (next step for the worldwide claim) |"),
 ("rep", "  H -- Malaysia --> C[26 Country – Malaysia]", "  H -- Top pick: Penang --> P\n  H -- Top pick: Kyoto / Lisbon / Marrakech / Oaxaca / Istanbul --> CG2[27–31 Country guides]\n  E -- Country guides chips --> C[26 Country – Malaysia]\n  E -- Country guides chips --> CG2\n  P -- Malaysia chip --> C"),
])
edit("docs/user-flows.md", [
 ("line", "## F2 · Choose a country", "## F2 · Discover a destination (Top recommendations or a country guide) and add it to a trip"),
 ("rep", "  H[04 Home] -- Malaysia row --> C[26 Country – Malaysia]\n  H -- Other country --> NONE((not built))", "  H[04 Home] -- Top pick Penang --> P\n  H -- Top pick Kyoto etc. --> G[27–31 Country guide]\n  E -- Country guides chip --> C[26 Country – Malaysia]"),
 ("line", "| 2 | Tap Malaysia in", "| 2 | Swipe the Top recommendations panel (drag, tap a side card or the arrows); tap the front card | Opens Penang (06) or a country guide (27–31) | " + V + " |"),
 ("line", "| Tap a country that isn't built |", "| Tap a destination card on 27–31 | Nothing happens (destination pages not built) | Tell participants | Verified (by design) |"),
 ("after", "| 5 | Add to Day 1 |", "| 6 | Explore → Country guides → Malaysia → Penang → 'Malaysia' chip | 26 → 06 → back to 26 | " + V + " |"),
])
edit("docs/prototype-interactions.md", [
 ("line", "| 04 Home | `Country/Japan`", "| 04 Home | `Top recommendations (3D)` → front card (Penang · Kyoto · Lisbon · Marrakech · Oaxaca · Istanbul) | Tap | 06 · 27 · 29 · 28 · 30 · 31 | Push ← |\n| 04 Home | `Top recommendations (3D)` → Next / Prev / side card / drag front card | Tap / drag | Rotates the cover-flow (smart animate 550 ms, custom ease) | — |\n| 05 Explore | `Country/Malaysia` · `Japan` · `Morocco` · `Portugal` · `Mexico` · `Türkiye` chips | Tap | 26 · 27 · 28 · 29 · 30 · 31 | Push ← |\n| 06, 14 | `Country/Malaysia` breadcrumb | Tap | 26 Country – Malaysia | Push ← |\n| 27–31 | `Back` | Tap | Back | — |"),
 ("line", "| 04 Home | `Country/Malaysia` (list row)", "| 04 Home | `Country/Malaysia` (list row) | — | Removed in v3 ('Choose a country' replaced by Top recommendations) | — |"),
 ("after", "## 3. In-component interactions (Verified)", "\n**Added in v3 (5 Oct 2026, verified in presentation mode):**\n\n| Component | Element | Trigger | Result |\n|---|---|---|---|\n| Top Recommendations (3D) | Intro variant | After 0.1 s | Cards rise into the cover-flow (800 ms) |\n| Live Photo | Phase=Start | After 0.15 s | Ken Burns push-in to Phase=End over 4.5 s, once |\n| Reveal · … (26–31 sheets) | In=No | After 0.1 s | Sheet rises 56 pt and fades in (600 ms) |\n| Button, Destination Card, Experience Card | Default / Hover | While pressing | State=Pressed (120 ms) |\n| Save Button | Default | Tap | Pop (1.3× heart) → after 0.14 s → Saved with an overshoot ease |\n| AR Anchor Pulse | Step=1…6 | After 0.05 s each | 3 pulses (≈2.7 s) then rests on Step=7 |\n| Skeleton Shimmer (24) | Pos=Start | After 0.05 s | One sheen sweep (1.2 s) |\n"),
 ("line", "- On Home, wait one rotation of the 3D country showcase", "- On Home, wait one rotation of the 3D country showcase, then swipe the **Top recommendations** cover-flow and tap Kyoto to open the Japan guide."),
 ("line", "- Run **Malaysia → Penang", "- Run **Explore → Country guides → Malaysia → Penang → Heritage walk → Add to Day 1** to show the drill-down and the toast animation."),
])
edit("docs/requirements.md", [
 ("line", "| F26 |", "| F26 | Discover worldwide from Home: country showcase + 3D Top recommendations cover-flow | 04 | " + V + " |"),
 ("line", "| F27 |", "| F27 | Open a country guide: facts, etiquette, destinations, phrases | 26–31 | " + V + " (destination pages only for Malaysia) |\n| F28 | Find a country from Explore (Country guides chips) | 05 | " + V + " |\n| F29 | Return from a destination to its country (breadcrumb) | 06, 14 | " + V + " |"),
 ("line", "| N7 |", "| N7 | Respect reduce-motion preferences | In Progress: every automatic animation now ends within 5 s or has a pause (v3); the Me toggle still doesn't switch screens to static variants |"),
 ("after", "| N11 |", "| N12 | Touch feedback on every tappable card and button (pressed states) | " + V + " (Button, Destination Card, Experience Card; Save pop) |"),
])
edit("docs/components.md", [
 ("after", "## 3. Repeated patterns that are *not* components", "") ,
 ("rep", "## 3. Repeated patterns that are *not* components", "## Motion components (v3, 5 Oct 2026)\n\nAll in the *Mobile kit (components)* section, so they can link to screens. **Verified** in presentation mode.\n\n| Component | Variants | Behaviour | Used on |\n|---|---|---|---|\n| **Top Recommendations (3D)** 353 × 430 | `Front=Intro · Penang · Kyoto · Lisbon · Marrakech · Oaxaca · Istanbul` | Cover-flow: cards scaled (1 / 0.84 / 0.68), skewed ±0.10–0.16 for perspective, parallax photo offset, dots and arrows. Intro → Penang after 0.1 s. Drag front card or tap side cards/arrows to rotate; tap front card to open 06 or 27–31. No auto-play. | 04 Home |\n| **Live Photo** 393 × 380 | `Phase=Start · End` | Ken Burns: 8 % push-in over 4.5 s, once per visit. Photo fill is overridden per screen. | Heroes of 06, 07, 14, 26–31 |\n| **Reveal · <screen> sheet** (×6) | `In=No · Yes` | Content rises 56 pt and fades in over 0.6 s when the screen opens. | Sheets of 26–31 |\n| **AR Anchor Pulse** 48 × 48 | `Step=1…7` | Three pulses (≈2.7 s), then rests. | Anchors on 12, 13, 23 |\n| **Skeleton Shimmer** 393 × 852 | `Pos=Start · End` | One sheen sweep, 1.2 s. | 24 Home – Loading |\n\n**Variant additions in v3:** `State=Pressed` on Button (×4 types), Destination Card and Experience Card (While pressing, 120 ms); `State=Pop` on Save Button. Phrase Card's text property `Malay` is now `Phrase`, so any language uses it.\n\n## 3. Repeated patterns that are *not* components"),
 ("line", "| **Phrase Card** (v2, 353 w) |", "| **Phrase Card** (v2, 353 w) | `Playing=No · Yes` | `Phrase` (was `Malay`), `Pronunciation`, `English` (text) | Tap → Playing (waveform, \"Playing · 0:02 · captions on\"); tap again or wait 2.5 s → idle | 08 (×5), 27–31 (×3 each) |"),
 ("rep", "Home country list ×6 (Verified, 5 Oct 2026)", "Explore Country guides chips (pills, not rows)"),
])
edit("docs/design.md", [
 ("line", "| `Mobile/Display XL` |", "| `Mobile/Display XL` | Gloock Regular | 42 / 46 | −1 | Screen hero titles: \"Welcome to Tourix.\", \"Penang\", country names (splash wordmark is overridden to 56) |"),
 ("line", "| `Mobile/Display M` |", "| `Mobile/Display M` | Gloock Regular | 30 / 36 | −0.5 | Screen titles: Explore, Trips, Me, \"Where to next?\", the AR sheet title |"),
 ("line", "- **Reduce motion:** the Me screen", "- **Reduce motion:** the Me screen exposes a \"Reduce motion\" setting. Switching screens to static variants isn't prototyped (**Unverified**); instead every automatic animation is one-shot and under 5 s, and the showcase has a pause.\n\n### Built in v3 (Verified, 5 Oct 2026)\n\n| Effect | Spec | Where |\n|---|---|---|\n| 3D cover-flow | Scale 1 / 0.84 / 0.68, skew ±0.10 / ±0.16, opacity 1 / 0.92 / 0.45, photo parallax ±16–26 pt; 550 ms custom ease (0.22, 1, 0.36, 1) | Home Top recommendations |\n| Intro | Cards rise 40 pt from 0.6× and fade in, 800 ms | Home Top recommendations |\n| Ken Burns | 8 % push-in, 4.5 s ease-out, once | Heroes 06, 07, 14, 26–31 |\n| Reveal | Sheet rises 56 pt + fades in, 600 ms custom ease | 26–31 |\n| Press | While pressing → Pressed (Hover look), 120 ms | Buttons, destination and experience cards |\n| Heart pop | 1.3× pop 140 ms → Saved with ease-out-back 250 ms | Save Button |\n| AR anchor pulse | 3 × ring 14 → 46 pt fade, 450 ms each | 12, 13, 23 |\n| Shimmer | Diagonal sheen across skeleton, 1.2 s | 24 |\n\n**Not possible in Figma prototypes:** scroll-position-driven effects (parallax on scroll, reveal-on-scroll). Animations start on screen open, press, tap or drag instead."),
 ("rep", "| P1 | Press state for every tappable card |", "| ~~P1~~ | ~~Press state for every tappable card~~ Built in v3 (Pressed variants) |"),
 ("rep", "| P2 | Heart \"pop\" |", "| ~~P2~~ | ~~Heart \"pop\"~~ Built in v3 |"),
 ("rep", "| P4 | Skeleton loading |", "| ~~P4~~ | ~~Skeleton loading~~ Shimmer built in v3 |"),
 ("rep", "| P6 | AR anchor pulse |", "| ~~P6~~ | ~~AR anchor pulse~~ Built in v3 |"),
])
edit("docs/content-guidelines.md", [
 ("line", "| Screen titles |", "| Screen titles | Short noun or question, Gloock | \"Explore\", \"Trips\", \"Culture guide\", \"Where to next?\" |"),
 ("line", "- **Verified bilingual touches:**", "- **Verified bilingual touches:** EN/BM audio guides and Malay terms in context on Malaysian screens; local phrases with pronunciation on every country guide (26–31). Product-level greetings are English only (\"GOOD MORNING\", \"Welcome to Tourix.\") since v3, because they appear for every country."),
])
edit("docs/accessibility.md", [
 ("after", "## 6. Motion", "\n**v3 motion audit (5 Oct 2026):** every new automatic animation is one-shot and ends within 5 s — Ken Burns 4.5 s, Reveal 0.7 s, AR pulse ≈2.7 s, shimmer 1.2 s, Top recommendations intro 0.9 s — so WCAG 2.2.2 doesn't require a pause for them. The cover-flow never auto-plays. **Still Unverified:** text contrast over the new country photos.\n"),
])
edit("docs/figma-guidelines.md", [
 ("after", "Flow 5 · States & edge cases", "Flow 6 · Country guides                         (section: 27–31)"),
 ("line", "Mobile kit (components)  ", "Mobile kit (components)                         (section: Status Bar, Tab Bar, Interest Tile, Toggle, Language Picker, Phrase Card, Live Photo, Top Recommendations (3D), Reveal ×6, AR Anchor Pulse, Skeleton Shimmer)"),
 ("line", "- Flow starting points:", "- Flow starting points: `1 · First launch`, `2 · Returning user (Home)`, `3 · AR Heritage Lens`, `4 · Plan a day trip (Melaka)`, `5 · States & edge cases`, `6 · Country guides`."),
 ("line", "Build log · v1, v2, worldwide", "Build log · v1, v2, worldwide, v3              (generator output; can be deleted)"),
])
edit("docs/ui-ux-guidelines.md", [
 ("line", "| Country choice |", "| Country choice | Home: country showcase + 3D Top recommendations; Explore: Country guides chips; destinations: country breadcrumb. No long country list (search scales to any number of countries). | " + V + " |"),
 ("after", "| Feedback | Toast, badge, heart fill, focus ring |", "| Motion feedback | Pressed states, heart pop, sheet reveal, Ken Burns, cover-flow (v3) | " + V + " |"),
])
edit("docs/roadmap.md", [
 ("after", "- [x] **Worldwide scope**", "- [x] **v3** (5 Oct 2026): country guides 27–31 (Flow 6), 3D Top recommendations, Explore country chips, Malaysia breadcrumbs, motion layer (Ken Burns, reveal, press, heart pop, AR pulse, shimmer), greeting/title fixes, retired brand name removed everywhere."),
 ("after", "## Future enhancements (Proposed, not requirements)", "\n- **Destination pages for 27–31** (e.g. Kyoto, Lisbon) so the worldwide flows go as deep as Malaysia.\n- Static variants of Home and the country pages for the Reduce-motion setting."),
])
edit("docs/changelog.md", [
 ("rep", "|---|---|---|---|---|\n| 2026-10-05 | **Scope widened", "|---|---|---|---|---|\n| 2026-10-05 | **v3: countries, 3D and motion** (authorised by the project owner). Retired brand name removed from the file, plugins and docs; greeting \"GOOD MORNING\", title \"Where to next?\", \"Welcome to Tourix.\"; 'Choose a country' list replaced by a 3D Top recommendations cover-flow; country guides 27–31 in new Flow 6 (flow start 6); Explore Country guides chips; Malaysia breadcrumbs on 06/14; Live Photo (Ken Burns), Reveal, Pressed states, Save pop, AR Anchor Pulse, Skeleton Shimmer. v3.2 fixed oversized Reveal components. | 02, 04, 05, 06, 07, 12, 13, 14, 23, 24, 26, new 27–31; Button, Destination Card, Experience Card, Save Button, Phrase Card; new motion components | User feedback: app felt simple; country list limited options; Malay greeting and 'this weekend' didn't fit a worldwide app | All docs |\n| 2026-10-05 | **Scope widened"),
])
print("MISSING:", MISS)
