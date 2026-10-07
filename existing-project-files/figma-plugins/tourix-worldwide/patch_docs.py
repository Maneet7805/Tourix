# Targeted worldwide-scope edits for the Tourix docs that only need small changes.
# Usage: python patch_docs.py <tourix root>   (fails loudly if an anchor isn't found)
import sys, pathlib

ROOT = pathlib.Path(sys.argv[1])
P = "Planned (approved 5 Oct 2026)"

PATCHES = {
"docs/design.md": [
 ("| Tagline | \"Malaysia, with local context.\" (splash) | Verified |",
  "| Tagline | \"Anywhere, with local context.\" (splash; was \"Malaysia, with local context.\" until 5 Oct 2026) | " + P + " |"),
 ("| Name note | The trail mark came from the old meaning of \"Tourix\" (*trail*). It still reads as \"a journey to a destination\", so it was kept. | Verified |",
  "| Name note | The trail mark came from the old meaning of \"Tourix\" (*trail*). It still reads as \"a journey to a destination\", so it was kept. | Verified |\n| Origin vs scope | The pandan / kaya / bunga raya palette and the \"kelip-kelip\" fireflies come from Malaysia, where Tourix started. They are the brand's identity, not a statement about content scope: the app is worldwide (5 Oct 2026). | Verified (team decision) |"),
 ("- **Real photography** of Malaysian places (Pexels, free licence), full-bleed in heroes and cards.",
  "- **Real photography** of the places named (Pexels, free licence), full-bleed in heroes and cards. Malaysian places throughout the built country; one photo per country in the Home showcase and country list (Japan: Kyoto street with Yasaka pagoda; Morocco: Koutoubia mosque, Marrakech; Portugal: Lisbon tram; Mexico: papel picado, Oaxaca; Türkiye: Blue Mosque, Istanbul) — " + P + "."),
 ("| **3D Showcase ring** (Home) | Six cards on an orbit.",
  "| **3D Showcase ring** (Home) | Six cards on an orbit (countries since the worldwide scope, " + P + "; Malaysian destinations before)."),
],
"docs/ui-ux-guidelines.md": [
 ("| **Simplicity and clarity** | One primary (kaya) action per view; plain words | \"Add to trip\", \"Continue\", \"Show my Malaysia\" |",
  "| **Simplicity and clarity** | One primary (kaya) action per view; plain words | \"Add to trip\", \"Continue\", \"Start exploring\" |\n| **Global shell, local content** | Product-level screens never assume a country; country, destination and culture screens are fully local | Countries-first Home → `26 Country – Malaysia` (" + P + ") |"),
 ("| Detail | Pushed screens with Back and a fixed action bar | 06 Penang, 07 Heritage walk, 08 Culture guide |",
  "| Country | Pushed from Home; keeps the tab bar (Home active) because it's a browsing level, not an item | 26 Country – Malaysia (" + P + ") |\n| Detail | Pushed screens with Back and a fixed action bar | 06 Penang, 07 Heritage walk, 08 Culture guide |"),
 ("| Horizontal scroll | Mood tiles and destination cards scroll sideways;",
  "| Country choice | Home shows the 3D country showcase, then a vertical \"Choose a country\" list. Unbuilt countries stay visible but unlinked. | " + P + " |\n| Horizontal scroll | Mood tiles and destination cards scroll sideways;"),
],
"docs/content-guidelines.md": [
 ("**A knowledgeable local friend:** warm, practical, respectful, never salesy.",
  "**A knowledgeable local friend, wherever you are:** warm, practical, respectful, never salesy.\n\n**Global vs local copy (5 Oct 2026).** Product-level copy (splash, onboarding, Home, loading, empty and error states, settings) is country-neutral. Country, destination, experience and culture-guide copy is fully local, in that country's terms."),
 ("| Include a Malay term with its English meaning: \"In Malay: kaki lima\" | Use untranslated jargon |",
  "| Include the local term with its English meaning: \"In Malay: kaki lima\" | Use untranslated jargon |\n| Keep product-level copy country-neutral: \"Start exploring\", \"Loading your picks…\" | Name one country in global copy: \"Show my Malaysia\" (retired) |"),
 ("| Buttons | Verb first, 1–3 words, sentence case | \"Continue\", \"Add to trip\", \"Show my Malaysia\", \"Next landmark\" |",
  "| Buttons | Verb first, 1–3 words, sentence case | \"Continue\", \"Add to trip\", \"Start exploring\", \"Next landmark\" |"),
 ("| Eyebrows | UPPERCASE DM Mono, \"·\" separators, ≤ 4 words | \"PULAU PINANG · NORTHERN REGION\", \"PHRASE OF THE DAY\" |",
  "| Eyebrows | UPPERCASE DM Mono, \"·\" separators, ≤ 4 words | \"PULAU PINANG · NORTHERN REGION\", \"PHRASE OF THE DAY\", \"SOUTHEAST ASIA\" (country) |"),
 ("| Kuala Lumpur / KL, Penang, Melaka | Malacca (use the local spelling, Melaka) |",
  "| Kuala Lumpur / KL, Penang, Melaka | Malacca (use the local spelling, Melaka) |\n| Country | Market, region (for a country) |\n| Türkiye | Turkey (use the country's official English name) |"),
 ("- **Verified languages shown:**",
  "- **Interface language ≠ country.** The interface language is the user's own; local terms and phrases come from the country being explored.\n- **Verified languages shown:**"),
 ("- **Planned or Proposed:** Arabic, and right-to-left layout considerations, if research supports them (the brief lists Arabic as an example).",
  "- **Planned or Proposed:** more interface languages for a worldwide audience — Arabic with right-to-left layout considerations (the brief lists Arabic), Spanish, French — if research supports them."),
],
"docs/components.md": [
 ("| Continue, Show my Malaysia, Add to trip,", "| Continue, Start exploring, Add to trip,"),
 ("| **3D Showcase** 640 × 600 | `Front=` Kuala Lumpur · Penang · Langkawi · Melaka · Cameron Highlands · Sabah × `Motion=Auto · Paused` (12 variants since v2) |",
  "| **3D Showcase** 640 × 600 | `Front=` Kuala Lumpur · Penang · Langkawi · Melaka · Cameron Highlands · Sabah × `Motion=Auto · Paused` (12 variants since v2). **" + P + ":** card content becomes countries (Malaysia, Japan, Morocco, Portugal, Mexico, Türkiye) with `Front=` values renamed to match; the desktop hero instance changes with it |"),
 ("| **Destination Card** (320 w) | `State=Default · Hover` | `Title`, `Location`, `Description`, `Region`, `Fact 1 label/value`, `Fact 2 label/value` | Hover: photo zoom, deeper shade, `3D Card` shadow, kaya arrow | Home carousel (scaled 0.86), desktop |",
  "| **Destination Card** (320 w) | `State=Default · Hover` | `Title`, `Location`, `Description`, `Region`, `Fact 1 label/value`, `Fact 2 label/value` | Hover: photo zoom, deeper shade, `3D Card` shadow, kaya arrow | Destinations carousel (scaled 0.86; moves from Home to 26, " + P + "), desktop |"),
 ("| Result row (thumb + title + meta + chevron) | Explore ×4, Day 2 ideas ×2, No results ×1 | `List Row` |",
  "| Result row (thumb + title + meta + chevron) | Explore ×4, Day 2 ideas ×2, No results ×1, Home country list ×6 (" + P + ") | `List Row` |"),
],
"docs/figma-guidelines.md": [
 ("**File:** *Tourix – Malaysia Discovery App (UX Prototype)*, in Drafts",
  "**File:** *Tourix – Worldwide Discovery App (UX Prototype)* (was *Tourix – Malaysia Discovery App (UX Prototype)* until 5 Oct 2026), in Drafts"),
 ("Flow 2 · Discover a destination                 (section: 04–08, 14–15)",
  "Flow 2 · Discover a destination                 (section: 04–08, 14–15, 26)"),
 ("| Screen frame | `NN Screen – Detail`, two-digit number in flow order | `06 Destination – Penang`, `13 AR Lens – Landmark info` |",
  "| Screen frame | `NN Screen – Detail`, two-digit number in flow order | `06 Destination – Penang`, `13 AR Lens – Landmark info`, `26 Country – Malaysia` |"),
 ("| Layers | Role-based, `Kind/Name` for instances | `Button/Add to trip`, `Destination/Penang`, `Mood/Cultural heritage`, `Tab/Lens` |",
  "| Layers | Role-based, `Kind/Name` for instances | `Button/Add to trip`, `Destination/Penang`, `Country/Malaysia`, `Mood/Cultural heritage`, `Tab/Lens` |"),
],
"docs/accessibility.md": [
 ("| Multilingual UI | EN, BM, 中文, தமிழ் picker; bilingual AR sheet; Malay terms with English | Verified (UI) |",
  "| Multilingual UI | EN, BM, 中文, தமிழ் picker; bilingual AR sheet; local terms with English. A worldwide audience raises the bar: RTL (Arabic) and more interface languages are **Proposed** | Verified (UI) |"),
 ("- [ ] Spot-check text-over-photo contrast on the rendered frames.",
  "- [ ] Spot-check text-over-photo contrast on the rendered frames, including the five new country photos (" + P + ").\n- [ ] Give the Home country rows a 44 pt minimum height and accessible names (\"Malaysia, country guide\"; unbuilt countries announced as \"coming soon\")."),
],
"docs/prototype-interactions.md": [
 ("| 03 Interests | `Button/Show my Malaysia` | Tap | 04 Home | Dissolve | Implemented |",
  "| 03 Interests | `Button/Show my Malaysia` (renamed `Button/Start exploring`, " + P + ") | Tap | 04 Home | Dissolve | Implemented |"),
 ("| 04 Home | `Destination/Penang` | Tap | 06 Destination – Penang | Push ← | Implemented |",
  "| 04 Home | `Destination/Penang` | Tap | 06 Destination – Penang | Push ← | Implemented; the carousel moves to 26 (" + P + ") |"),
 ("| 03 | `Button/Show my Malaysia` | Tap | **24 Home – Loading** (was 04) | Dissolve |",
  "| 03 | `Button/Show my Malaysia` → `Button/Start exploring` | Tap | **24 Home – Loading** (was 04) | Dissolve |"),
 ("| 04 | `Destination/Melaka` | Tap | 14 Destination – Melaka | Push ← |",
  "| 04 → 26 | `Destination/Melaka` | Tap | 14 Destination – Melaka | Push ← |"),
 ("The tab bar also appears on 15, 16, 18, 19, 20, 24 and 25.",
  "The tab bar also appears on 15, 16, 18, 19, 20, 24 and 25 (and 26 when built).\n\n### Worldwide scope (" + P + ", 5 Oct 2026)\n\n| Screen | Element (layer name) | Trigger | Destination / result | Transition |\n|---|---|---|---|---|\n| 04 Home | `Country/Malaysia` (list row) | Tap | 26 Country – Malaysia | Push ← |\n| 04 Home | `Country/Japan` · `Morocco` · `Portugal` · `Mexico` · `Türkiye` | Tap | none (not built) | — |\n| 26 Malaysia | `Back` | Tap | Back | — |\n| 26 Malaysia | `Destination/Penang` · `Destination/Melaka` (moved from 04, links kept) | Tap | 06 · 14 | Push ← |\n| 26 Malaysia | `Row/Culture guide` · `Row/Etiquette` | Tap | 08 · 15 | Push ← |"),
 ("| 04 Home | Notification bell; location chip \"Near Kuala Lumpur\"; voice-search mic; destination cards other than Penang and Melaka; showcase cards (only rotate); Batu Caves experience card |",
  "| 04 Home | Notification bell; location chip \"Near Kuala Lumpur\"; voice-search mic; showcase cards (only rotate); country rows other than Malaysia (" + P + "); Batu Caves experience card |\n| 26 Malaysia | Destination cards other than Penang and Melaka (" + P + ") |"),
 ("- On Home, wait one rotation of the 3D showcase, then drag it to demonstrate the gesture.",
  "- On Home, wait one rotation of the 3D country showcase, then drag it to demonstrate the gesture. Tap **Malaysia** in \"Choose a country\" to show the worldwide → country drill-down."),
 ("- Run **Search → Penang → Heritage walk → Add to Day 1** to show the toast animation.",
  "- Run **Malaysia → Penang → Heritage walk → Add to Day 1** to show the toast animation."),
],
"docs/requirements.md": [
 ("| F25 | Understand camera use before AR starts | 21, 22 | Implemented (v2) |",
  "| F25 | Understand camera use before AR starts | 21, 22 | Implemented (v2) |\n| F26 | Browse countries worldwide from Home (3D showcase + \"Choose a country\" list) | 04 | " + P + " |\n| F27 | Open a country and see its destinations, culture guide and etiquette | 26 | " + P + " (Malaysia only; other countries listed, not built) |"),
 ("| F8 | View a destination with facts, tips and experiences | 06, 14 | Implemented for **Penang and Melaka** |",
  "| F8 | View a destination with facts, tips and experiences | 06, 14 | Implemented for **Penang and Melaka** (Malaysia) |"),
 ("| N9 | Culturally respectful content | Implemented |",
  "| N9 | Culturally respectful content | Implemented (Malaysia) |\n| N10 | Product-level copy is country-neutral (worldwide scope) | " + P + " |\n| N11 | Adding a country reuses the Country → Destination → Experience pattern without new components | " + P + " |"),
],
"docs/roadmap.md": [
 ("- [x] Documentation set (this folder).",
  "- [x] Documentation set (this folder).\n- [x] **Scope widened to worldwide** (5 Oct 2026): docs updated; Malaysia is the fully built country."),
 ("## In progress\n\n| Item | Gap |\n|---|---|",
  "## In progress\n\n| Item | Gap |\n|---|---|\n| **Worldwide scope in Figma** (approved 5 Oct 2026) | Countries-first Home (showcase + \"Choose a country\"), `26 Country – Malaysia`, carousel moved to 26, global copy, file rename, Read me board |"),
 ("## Future enhancements (Proposed, not requirements)\n",
  "## Future enhancements (Proposed, not requirements)\n\n- **A second built country** (Country page, 2 destinations, culture guide) to prove the pattern scales.\n- A country chip on the Country page header to switch country without going back to Home.\n- Search by country in Explore.\n- Desktop landing page: replace its Malaysia-only copy with the worldwide framing.\n"),
],
"docs/changelog.md": [
 ("|---|---|---|---|---|\n| 2026-10-04 | **v2.1 fixes**",
  "|---|---|---|---|---|\n| 2026-10-05 | **Scope widened from Malaysia to worldwide** (authorised by the project owner). Docs updated; Figma changes approved: countries-first Home (3D showcase of 6 countries + \"Choose a country\" list), new `26 Country – Malaysia` holding the destinations carousel, \"Start exploring\" / \"Loading your picks…\" / worldwide splash tagline, file rename, Read me board. Malaysia stays the one fully built country. | `01 Splash`, `03 Onboarding – Interests`, `04 Home`, `24 Home – Loading`, new `26 Country – Malaysia`; 3D Showcase; Read me board | Product is a worldwide app, not a Malaysia-only one | All docs |\n| 2026-10-04 | **v2.1 fixes**"),
],
}

ok = True
for rel, pairs in PATCHES.items():
    f = ROOT / rel
    s = f.read_text(encoding="utf-8")
    for old, new in pairs:
        if old not in s:
            print(f"MISSING in {rel}: {old[:70]!r}"); ok = False; continue
        s = s.replace(old, new, 1)
    f.write_text(s, encoding="utf-8", newline="\n")
    print("patched", rel)
print("ALL OK" if ok else "SOME ANCHORS MISSING")
