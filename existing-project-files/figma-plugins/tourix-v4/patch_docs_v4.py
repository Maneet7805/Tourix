# v4 doc update (5 Oct 2026): one 3D carousel — Top picks in the Home hero; 3D Showcase no longer on Home.
import sys, pathlib
R = pathlib.Path(sys.argv[1]); MISS = []; V = "Verified (5 Oct 2026)"
def edit(rel, ops):
    p = R / rel; s = p.read_text(encoding="utf-8")
    for kind, a, b in ops:
        if kind == "line":
            L = s.split("\n"); h = [i for i, l in enumerate(L) if l.startswith(a)]
            if not h: MISS.append((rel, a[:50])); continue
            L[h[0]] = b; s = "\n".join(L)
        else:
            if a not in s: MISS.append((rel, a[:50])); continue
            s = s.replace(a, b)
    p.write_text(s, encoding="utf-8", newline="\n")
edit("CLAUDE.md", [("rep", "Home shows a country showcase and a 3D **Top recommendations** panel;", "Home's hero is a 3D **Top picks** cover-flow (the only 3D carousel on Home since v4);")])
edit("README.md", [
 ("line", "  - auto-rotating **3D showcase**", "  - **Top picks** 3D cover-flow in the hero (v4; replaced the auto-rotating showcase)"),
 ("line", "- **Home:** the 3D showcase rotates countries;", "- **Home:** the hero is a swipeable 3D **Top picks** cover-flow (Penang, Kyoto, Lisbon, Marrakech, Oaxaca, Istanbul) with glow, orbit and fireflies; it opens Penang or a country guide. Greeting \"GOOD MORNING\", title \"Where to next?\"."),
 ("rep", "Signature moments are the 3D showcase ring with \"kelip-kelip\" fireflies", "Signature moments are the 3D Top picks cover-flow with \"kelip-kelip\" fireflies"),
])
edit("docs/project-overview.md", [
 ("rep", "| Country showcase, 3D Top recommendations, Explore", "| 3D Top picks in the Home hero, Explore"),
 ("line", "  - Home: 3D showcase rotates countries;", "  - Home: one 3D carousel — Top picks in the hero (v4); the country showcase and the duplicate section below were removed"),
])
edit("docs/information-architecture.md", [
 ("line", "World (Home:", "World (Home: 3D Top picks in the hero; Explore → Country guides)"),
 ("line", "| Home | 04 |", "| Home | 04 | World level: 3D Top picks, moods, phrase of the day, nearby |"),
 ("rep", "| Home showcase, Top recommendations, Explore chips; 26–31 |", "| Home Top picks, Explore chips; 26–31 |"),
 ("rep", "H -- Top pick: Penang", "H -- Top pick (hero): Penang"),
])
edit("docs/user-flows.md", [("line", "| 1 | Watch / rotate the 3D showcase of countries |", "| 1 | Swipe the Top picks cover-flow in the hero (drag, side card or arrows) | Cards turn in 3D; fireflies drift; no auto-play | " + V + " |"),
 ("line", "| 2 | Swipe the Top recommendations panel", "| 2 | Tap the front card | Opens Penang (06) or a country guide (27–31) | " + V + " |")])
edit("docs/requirements.md", [
 ("line", "| F4 |", "| F4 | Browse recommended destinations in a 3D cover-flow (drag, side-card tap, arrows) | 04 | Implemented (v4: replaced the auto-rotating showcase) |"),
 ("line", "| F26 |", "| F26 | Discover worldwide from Home: 3D Top picks hero | 04 | " + V + " |"),
])
edit("docs/prototype-interactions.md", [
 ("rep", "| 04 Home | `Top recommendations (3D)` → front card", "| 04 Home | `Top picks (3D)` (hero) → front card"),
 ("rep", "| 04 Home | `Top recommendations (3D)` → Next / Prev", "| 04 Home | `Top picks (3D)` (hero) → Next / Prev"),
 ("rep", "| 3D Showcase | Whole card ring | After 3.2 s |", "| 3D Showcase (not on Home since v4) | Whole card ring | After 3.2 s |"),
 ("rep", "showcase cards (only rotate); ", ""),
 ("line", "- On Home, wait one rotation", "- On Home, swipe the **Top picks** cover-flow in the hero (watch the fireflies drift), then tap Kyoto to open the Japan guide."),
 ("rep", "(the showcase has its own pause since v2)", "(nothing on Home auto-plays since v4)"),
])
edit("docs/components.md", [
 ("line", "| **3D Showcase** 640 × 600 |", "| **3D Showcase** 640 × 600 | `Front=` Malaysia · Japan · Morocco · Portugal · Mexico · Türkiye × `Motion=Auto · Paused` (12 variants) | Auto-rotate, prev/next, drag, pause. **Not used on Home since v4** (replaced by Top Recommendations (3D)); kept in the Design System. | — |"),
 ("rep", "| 04 Home |\n| **Live Photo**", "| 04 Home hero (v4: dark styling with glow, dashed orbit, floor shadow, 10 drifting fireflies, light controls) |\n| **Live Photo**"),
])
edit("docs/design.md", [
 ("line", "| **3D Showcase ring** (Home) |", "| **3D cover-flow** (Home hero, v4) | Top picks: cards scaled 1 / 0.84 / 0.68, skewed ±0.10 / ±0.16, parallax photos, on pandan with a kaya glow (14 %, blur 90), dashed orbit (45 %), floor shadow and 10 fireflies whose positions change per variant so they drift as it turns. The older 3D Showcase ring stays in the Design System but isn't on Home. |"),
 ("line", "| Showcase atmosphere |", "| Hero atmosphere | Glow, orbit, floor shadow, fireflies (see above) | Varies per variant so the scene shimmers as it turns |"),
 ("rep", "| Home Top recommendations |\n| Intro |", "| Home hero (Top picks) |\n| Intro |"),
 ("rep", "| Cards rise 40 pt from 0.6× and fade in, 800 ms | Home Top recommendations |", "| Cards rise 40 pt from 0.6× and fade in, 800 ms | Home hero (Top picks) |"),
])
edit("docs/accessibility.md", [("line", "- The 3D showcase auto-rotates every 3.2 s.", "- Since v4 Home has no auto-rotating content: the hero cover-flow only moves on drag, tap or arrows. The 3D Showcase (auto-rotate + pause, WCAG 2.2.2) remains in the Design System but isn't used on Home.")])
edit("docs/ui-ux-guidelines.md", [
 ("rep", "Home: country showcase + 3D Top recommendations;", "Home: 3D Top picks in the hero;"),
 ("line", "| Gestures |", "| Gestures | Drag the front Top picks card to turn the cover-flow (Figma \"On drag\") | " + V + " |"),
])
edit("docs/roadmap.md", [("rep", "- [x] **v3** (5 Oct 2026)", "- [x] **v4** (5 Oct 2026): one 3D carousel on Home — Top picks moved into the hero with the showcase's glow, orbit and fireflies; showcase and duplicate section removed from Home.\n- [x] **v3** (5 Oct 2026)")])
edit("docs/changelog.md", [("rep", "|---|---|---|---|---|\n| 2026-10-05 | **v3:", "|---|---|---|---|---|\n| 2026-10-05 | **v4: one 3D carousel on Home** (authorised by the project owner): Top Recommendations (3D) restyled for the dark hero (glow, dashed orbit, floor shadow, 10 drifting fireflies, light controls) and placed in the 04 hero instead of the 3D Showcase; the duplicate body section removed; 24 skeleton resized; v4.1 fixed the Prev button (solid white fill). | `04 Home`, `24 Home – Loading`; Top Recommendations (3D); 3D Showcase (now unused on Home) | User feedback: two carousels felt repetitive; preferred the Top recommendations style | All docs |\n| 2026-10-05 | **v3:")])
edit("existing-project-files/README.md", [("rep", "| `figma-plugins/tourix-inspect/`", "| `figma-plugins/tourix-v4/` · `tourix-v4-1/` | this folder | **v4** (5 Oct 2026): Top picks cover-flow moved into the Home hero, styled for dark; showcase and duplicate section removed from Home. Saved \"Before Tourix v4 (two carousels on Home)\" first. v4.1 fixed the Prev button fill. `patch_docs_v4.py` = matching doc edits. |\n| `figma-plugins/tourix-inspect/`")])
print("MISSING:", MISS)
