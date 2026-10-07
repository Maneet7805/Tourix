# Doc edits matching Tourix v5–v5.8 (7 Oct 2026).
# Usage: python3 patch_docs_v5.py <Tourix folder>   (the folder holding CLAUDE.md, README.md, docs/, existing-project-files/)
import sys, os
R = sys.argv[1] if len(sys.argv) > 1 else "."
MISS = []

def rd(p): return open(os.path.join(R, p), encoding="utf-8").read()
def wr(p, s): open(os.path.join(R, p), "w", encoding="utf-8").write(s)
def rep(p, old, new):
    s = rd(p)
    if old not in s: MISS.append(p + ": " + old[:80]); return
    wr(p, s.replace(old, new, 1))
def between(p, start, end, new):
    s = rd(p); a = s.find(start); b = s.find(end, a + 1) if a >= 0 else -1
    if a < 0 or b < 0: MISS.append(p + ": block " + start[:50]); return
    wr(p, s[:a] + new + s[b:])

DEST = [("32","Kuala Lumpur","26"),("33","Langkawi","26"),("34","Cameron Highlands","26"),("35","Sabah","26"),
 ("36","Kyoto","27"),("37","Tokyo","27"),("38","Hokkaido","27"),("39","Marrakech","28"),("40","Fes","28"),("41","Chefchaouen","28"),
 ("42","Lisbon","29"),("43","Porto","29"),("44","The Algarve","29"),("45","Oaxaca","30"),("46","Mexico City","30"),("47","Yucatán","30"),
 ("48","Istanbul","31"),("49","Cappadocia","31"),("50","Antalya","31")]
V = "Verified (7 Oct 2026)"; B = "Built (7 Oct 2026); not yet walked through"
OTHER = [
 ("51","51 Destination – Penang · Experiences","Flow 2","Detail (destination tab)","Experiences segment (06)",V),
 ("52","52 Destination – Melaka · Experiences","Flow 2","Detail (destination tab)","Experiences segment and experience cards (14)",V),
 ("53","53 Experience – Hawker breakfast","Flow 2","Detail (experience)","Hawker breakfast card (06), result (05), row (51)",V),
 ("54","54 Experience – Batu Caves","Flow 2","Detail (experience)","Batu Caves card (04, 73, 74), KL highlight (32)",V),
 ("55","55 Culture guide – Festivals","Flow 2","Detail (has tab bar)","Festivals segment (08, 15)",V),
 ("56","56 Me – Saved","Flow 3","Detail","Profile card (11)",V),
 ("57","57 Trips – Melaka day trip","Flow 3","Detail (trip)","Melaka trip card (18)",B),
 ("58","58 Trips – Share plan (sheet)","Flow 3","Sheet","Share plan (09, 10, 59), Share (57)",V),
 ("59","59 Trips – Removed (undo)","Flow 3","State","Undo on the 09 toast",B),
 ("60","60 Trips – Invite a friend (sheet)","Flow 3","Sheet","Invite (17), toast Invite (18), 57",B),
 ("61","61 Home – Notifications","Flow 2","Detail","Bell (04, 73, 74)",V),
 ("62","62 Home – Location (sheet)","Flow 2","Sheet","Location chip (04, 73, 74)",V),
 ("63","63 Explore – Places","Flow 2","Filter state","Places chip (05, 64–66)",V),
 ("64","64 Explore – Experiences","Flow 2","Filter state","Experiences chip (05, 63, 65, 66)",V),
 ("65","65 Explore – Food","Flow 2","Filter state","Food chip (05, 63, 64, 66)",B),
 ("66","66 Explore – Phrases","Flow 2","Filter state","Phrases chip (05, 63–65)",B),
 ("67","67 Me – Synced devices","Flow 3","Detail","Synced devices row (11)",B),
 ("68","68 Me – Units","Flow 3","Detail","Units row (11)",B),
 ("69","69 Me – About Tourix","Flow 3","Detail","About row (11)",B),
 ("70","70 AR Lens – Phrases","Flow 4","Full-screen mode","Phrases mode (12, 71)",V),
 ("71","71 AR Lens – Food nearby","Flow 4","Full-screen mode","Food nearby mode (12, 70)",V),
 ("72","72 AR Lens – Kopitiam","Flow 4","Sheet state","Kopitiam label (12)",V),
 ("73","73 Home – Offline","Flow 5","State","Flow start \"8 · Offline mode\"",V),
 ("74","74 Home – Bahasa Melayu","Flow 5","State (language)","\"Preview Tourix in Bahasa Melayu\" (19), flow start \"9 · Bahasa Melayu\"",V)]

# ======================= information-architecture =======================
IA = "docs/information-architecture.md"
rep(IA, "    ├── Destination    e.g. 06 Penang, 14 Melaka\n    │   ├── Experience e.g. 07 George Town heritage walk",
        "    ├── Destination    06 Penang, 14 Melaka, 32–50 (every destination card opens a page)\n    │   ├── Experiences tab  51 Penang, 52 Melaka\n    │   ├── Experience 07 Heritage walk, 53 Hawker breakfast, 54 Batu Caves")
rep(IA, "    └── Culture guide  08 Phrases, 15 Etiquette", "    └── Culture guide  08 Phrases, 15 Etiquette, 55 Festivals")
rep(IA, "All 31 screens are **Verified** (26–31 and their links tested in presentation mode on 5 Oct 2026). Penang and Melaka live on 26; 27–31 are reached from Home's Top recommendations and Explore's Country guides chips.",
        "**74 screens** in 7 flow sections with 9 flow starts (v5, 7 Oct 2026). 01–31 are **Verified**. Most of the 43 v5 screens were walked through in presentation mode on 7 Oct 2026; the ones marked *Built* in §2 were not. Penang and Melaka live on 26; 27–31 are reached from Home's Top picks and Explore's Country guides chips; every destination card on 26–31 opens its page (06, 14, 32–50).")
rep(IA, "\n## 2. Screen inventory", '''
### v5 additions (7 Oct 2026)

```mermaid
graph TD
  C26[26 Malaysia] --> D1[32–35 KL · Langkawi · Cameron Highlands · Sabah]
  C27[27–31 Country guides] --> D2[36–50 three destinations per country]
  D1 -- KL highlight --> BATU[54 Batu Caves]
  P[06 Penang] -- Experiences --> PE[51 Penang · Experiences] --> HB[53 Hawker breakfast]
  P --> HB
  M[14 Melaka] -- Experiences --> ME[52 Melaka · Experiences]
  CG[08 Phrases / 15 Etiquette] -- Festivals --> FE[55 Festivals]
  H[04 Home] -- bell --> N[61 Notifications]
  H -- location chip --> LOC[62 Location sheet]
  H -- Batu card --> BATU
  E[05 Explore] -- chips --> F[63 Places · 64 Experiences · 65 Food · 66 Phrases]
  T[09/10 Trips] -- Share plan --> SH[58 Share sheet]
  T -- Undo --> UN[59 Removed] -- Redo --> T
  ALL[18 All trips] -- Melaka trip --> MT[57 Melaka day trip]
  NT[17 New trip] -- Invite --> INV[60 Invite sheet]
  MEP[11 Me] --> SV[56 Saved]
  MEP --> SY[67 Synced devices]
  MEP --> UNI[68 Units]
  MEP --> AB[69 About]
  LANG[19 Language] --> BM[74 Home in Bahasa Melayu]
  LENS[12 AR Lens] <--> PH[70 Phrases mode]
  LENS <--> FD[71 Food nearby mode]
  LENS -- Kopitiam label --> KO[72 Kopitiam sheet]
  OFF[73 Home – Offline] -- Open offline packs --> PK[20 Offline packs]
```

## 2. Screen inventory''')
rows = ""
for n, nm, c in DEST:
    entry = f"{nm} card ({c})" + (", flow start \"7 · Destinations\"" if n == "32" else "")
    rows += f"| {n} | `{n} Destination – {nm}` | Flow 7 · Destinations | Detail (destination) | {entry} | {V if n == '32' else 'Built (7 Oct 2026); same template as 32'} |\n"
for n, nm, sec, lvl, entry, st in OTHER:
    rows += f"| {n} | `{nm}` | {sec} | {lvl} | {entry} | {st} |\n"
r31 = "| 31 | `31 Country – Türkiye` | Flow 6 | Detail (country) | Istanbul pick (04), Explore chip (05) | Verified (5 Oct 2026) |\n"
rep(IA, r31, r31 + rows)
rep(IA, "| Places | Destinations in Malaysia (6: KL, Penang, Langkawi, Melaka, Cameron Highlands, Sabah) | 26 carousel; Penang (06) and Melaka (14) detail |",
        "| Places | 6 destinations in Malaysia, 3 in each other country (21 in total) | 26–31 carousels; detail pages 06, 14, 32–50 |")
rep(IA, "| Experiences | Experience (heritage walk, hawker breakfast, Batu Caves) | Home (nearby), Penang, Search |",
        "| Experiences | Heritage walk, Hawker breakfast, Batu Caves (full pages); more as rows on 51/52 and as destination highlights | 07, 53, 54; 51, 52; Home, Search, 64 |")
rep(IA, "| Plans | Trips list → Trip → Day → Stop (time, title, note), map; travel companions | 09, 10, 16, 17, 18 |",
        "| Plans | Trips list → Trip → Day → Stop (time, title, note), map; travel companions; share and undo | 09, 10, 16, 17, 18, 57–60 |")
rep(IA, "| Settings | Language & region, Accessibility, Offline & sync, About | 11, 19, 20 |",
        "| Settings | Saved, Language & region, Accessibility, Offline & sync, Units, About | 11, 19, 20, 56, 67–69 |\n| Alerts and context | Notifications, location, offline state | 61, 62, 73 |")
s = rd(IA); i = s.find("## 5. Gaps (not designed)")
if i >= 0:
    wr(IA, s[:i] + '''## 5. Gaps (not designed)

Closed by v5 (7 Oct 2026): destination pages outside Malaysia (36–50), the four unlinked Malaysian destinations (32–35), the Experiences and Festivals tabs (51, 52, 55), Share plan, Undo, Units, Synced devices and About (58, 59, 67–69), and the Melaka trip detail (57).

| Area | Note | Status |
|---|---|---|
| Experiences outside Malaysia | Highlights on 36–50 are information rows, not pages | Proposed |
| Switching country from inside a country | Only via Back, or the breadcrumb on destination pages | **Proposed:** a country chip in the Country page header |
| Sign-in / account | Not present (the user is a "Guest explorer"); 67 says "sign in with the same account" | Unverified whether needed |
| Map / nearby explorer | Only the static trip map and the AR Food nearby mode (71) | Proposed |
| Second screen size | Only 393 × 852 exists | Planned (brief) |
''')
else: MISS.append(IA + ": gaps")

# ======================= prototype-interactions =======================
PI = "docs/prototype-interactions.md"
rep(PI, "\n## 2. Tab bar (Verified)", '''
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

## 2. Tab bar (Verified)''')
between(PI, "## 4. Non-functional controls (Verified)", "## 5. Known issues", '''## 4. Non-functional controls (Verified)

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

''')
rep(PI, "| Tapping the search field on 05 jumps to the no-results state, which is a demo shortcut, not real typing | Verified (explain in testing) |",
        "| Tapping the search field on 05 jumps to the no-results state, which is a demo shortcut, not real typing | Verified (explain in testing) |\n"
        "| \"Add to trip\" on 32–50, 53 and 54 opens the new-trip sheet (17), which is pre-filled for Melaka | Verified (7 Oct 2026). Explain in testing, or make per-destination sheets |\n"
        "| The prototype viewer can keep an old component state in an open tab (e.g. blank Explore chips) | Verified (7 Oct 2026). Close and reopen the presentation tab after edits |\n"
        "| AR distances on 71 and travel times on 32–50 are samples | Unverified (check before submission) |")
rep(PI, "- On Home, tap the pause button to show the WCAG 2.2.2 control.",
        "- Flow **7 · Destinations** starts at Kuala Lumpur (32); tap the Batu Caves highlight for a full experience page.\n"
        "- Flow **8 · Offline mode** (73) shows the offline banner; flow **9 · Bahasa Melayu** (74) shows Home translated.\n"
        "- In the AR Lens, switch between History, Phrases and Food nearby to show that the Lens is more than one heritage trick.")

# ======================= user-flows =======================
UF = "docs/user-flows.md"
rep(UF, "| 5 · States & edge cases | `24 Home – Loading` (v2) |",
        "| 5 · States & edge cases | `24 Home – Loading` (v2) |\n| 6 · Country guides | `27 Country – Japan` (v3) |\n"
        "| 7 · Destinations | `32 Destination – Kuala Lumpur` (v5) |\n| 8 · Offline mode | `73 Home – Offline` (v5) |\n| 9 · Bahasa Melayu | `74 Home – Bahasa Melayu` (v5) |")
rep(UF, "**Findings:**\n- Only **Malaysia** is linked at country level. Tell test participants the other countries are out of scope.\n- **Penang** and **Melaka** destination cards are linked. The other 4 Malaysian cards are not.\n- The **Hawker breakfast** card (on Penang and Search) isn't linked.\n- The **Save** buttons toggle visually, but nothing appears anywhere as \"saved\".",
        "**Findings (updated 7 Oct 2026, v5):**\n- Every destination card on 26–31 opens a page (06, 14, 32–50). Destinations outside Malaysia have facts, tips and highlights, but their highlights are information rows, not experience pages.\n- **Hawker breakfast** (53) and **Batu Caves** (54) are full experience pages; Penang and Melaka have Experiences tabs (51, 52).\n- Saved places appear on **56 Me – Saved** (reached from the Me profile card). The heart still toggles independently, so the list is a fixed sample.\n- \"Add to trip\" on the new destination pages opens the Melaka-prefilled new-trip sheet (17).")
rep(UF, "**Findings:** Phrases ↔ Etiquette switch (v2). Festivals is still empty.",
        "**Findings:** Phrases ↔ Etiquette ↔ Festivals switch (Festivals is 55, v5).")
rep(UF, "| 4 | Tap the Kopitiam label, mode pills, shutter, gallery, voice, help | Nothing happens | In Progress |\n\n**Still Proposed:** the Phrases / Food nearby modes, and the Lens tab skipping the permission screen once granted (it goes straight to 12 today).",
        "| 4 | Tap the Kopitiam label | Kopitiam sheet (72) | Verified (v5) |\n| 5 | Tap Phrases / Food nearby / History | Phrases mode (70: sign translation), Food nearby (71: stalls with dietary tags; distances are samples) | Verified (v5) |\n| 6 | Shutter, gallery, voice, help | Nothing happens | In Progress |")
rep(UF, "| Share plan / Undo | Nothing happens | In Progress |",
        "| Share plan | Share sheet (58) | Verified (v5) |\n| Undo on the toast | Removed state (59) with Redo | Built (v5), not walked through |\n| Melaka trip in All trips | Melaka day plan (57) with Share and Invite | Built (v5), not walked through |\n| Invite (17, 18, 57) | Invite sheet (60) | Built (v5); re-test after the scrim fix |")
rep(UF, "| Tap Units, Synced devices | Nothing happens | In Progress |",
        "| Tap the profile card | Saved places (56) | Verified (v5) |\n| Tap Units, Synced devices, About | 68, 67, 69 | Built (v5), not walked through |\n| Tap \"Preview Tourix in Bahasa Melayu\" on 19 | Home in BM (74) | Verified (v5); BM copy needs a native-speaker check |")
rep(UF, "| Tap a destination card on 27–31 | Nothing happens (destination pages not built) | Tell participants | Verified (by design) |",
        "| No connection | `73 Home – Offline`: banner, saved packs still work | Open offline packs → 20 | Verified (v5) |\n| Interface in Bahasa Melayu | `74 Home – Bahasa Melayu` | Back to 19 | Verified (v5) |")
s = rd(UF); i = s.find("## Disconnected or incomplete elements")
if i >= 0:
    wr(UF, s[:i] + '''## Disconnected or incomplete elements

The full list is in [prototype-interactions §4](prototype-interactions.md#4-non-functional-controls-verified). In short:
- the voice-search mic on Home
- audio play buttons on 07, 13, 23, 53, 54 and 72 (phrase cards on 08 work)
- the practise mic on 08
- AR shutter, gallery, voice and help
- map pins on Trips
- information-only rows (no chevron) on 51, 52, 61, 62 and the destination highlights
''')
else: MISS.append(UF + ": disconnected")

# ======================= requirements =======================
RQ = "docs/requirements.md"
for old, new in [
 ("| F7 | Filter search results by type | 05 | In Progress: chips toggle, results static |", "| F7 | Filter search results by type | 05, 63–66 | Implemented (v5: each chip opens its own filtered results; simulated) |"),
 ("| F8 | View a destination with facts, tips and experiences | 06, 14 | Implemented for **Penang and Melaka** (Malaysia) |", "| F8 | View a destination with facts, tips and experiences | 06, 14, 32–50 | Implemented for **all 21 destinations** (v5); travel facts are Unverified |"),
 ("| F9 | View an experience with route, timing and etiquette | 07 | Implemented (one experience) |", "| F9 | View an experience with route, timing and etiquette | 07, 53, 54 | Implemented (three experiences) |"),
 ("| F10 | Save a place (heart) | 06, 07, cards | In Progress: visual toggle, no saved list |", "| F10 | Save a place (heart) and see saved places | 06, 07, cards, 56 | Implemented (v5: saved list on 56; the list is a fixed sample) |"),
 ("| F12 | Confirm the action with a toast and undo | 09 | In Progress: toast shown, Undo not linked |", "| F12 | Confirm the action with a toast and undo | 09, 59 | Implemented (v5: Undo → 59 with Redo) |"),
 ("| F18 | Use the AR Lens to identify heritage features | 12 | Implemented (concept mock-up) |", "| F18 | Use the AR Lens to identify heritage features, translate signs and find food | 12, 70, 71, 72 | Implemented (concept mock-up; v5 added the Phrases and Food nearby modes) |"),
 ("| F23 | Create a trip and invite a travel companion | 17, 18 | Implemented (v2, simulated; invite not linked) |", "| F23 | Create a trip and invite a travel companion | 17, 18, 57, 60 | Implemented (simulated; v5 invite sheet) |"),
 ("| F27 | Open a country guide: facts, etiquette, destinations, phrases | 26–31 | Verified (5 Oct 2026) (destination pages only for Malaysia) |", "| F27 | Open a country guide: facts, etiquette, destinations, phrases | 26–31 | Verified (5 Oct 2026); every destination card links since v5 |"),
 ("| F29 | Return from a destination to its country (breadcrumb) | 06, 14 | Verified (5 Oct 2026) |",
  "| F29 | Return from a destination to its country (breadcrumb) | 06, 14, 32–50 | Verified (5 Oct 2026; 32–50 in v5) |\n"
  "| F30 | Browse a destination's experiences | 51, 52 | Implemented (v5, Penang and Melaka) |\n"
  "| F31 | Learn about local festivals | 55 | Implemented (v5) |\n"
  "| F32 | Share a trip plan | 58 | Implemented (v5, simulated) |\n"
  "| F33 | See notifications and change location | 61, 62 | Implemented (v5) |\n"
  "| F34 | Use the app offline with saved packs | 73, 20 | Implemented (v5: offline state) |\n"
  "| F35 | Use the interface in Bahasa Melayu | 19, 74 | Implemented (v5: one screen; copy Unverified by a native speaker) |\n"
  "| F36 | Manage synced devices, units and app information | 67–69 | Implemented (v5, display only) |"),
 ("| N6 | Feedback for every commit action | In Progress: phrase audio and Create trip now give feedback; Save still has no saved list |", "| N6 | Feedback for every commit action | Implemented (v5): toast with Undo/Redo, saved list, share and invite sheets |"),
 ("| P4 | All pages linked (interactive) | Implemented. Every screen is reachable; some controls aren't linked. |", "| P4 | All pages linked (interactive) | Implemented. All 74 screens are reachable; the remaining unlinked controls are listed in [prototype-interactions §4](prototype-interactions.md#4-non-functional-controls-verified). |"),
]: rep(RQ, old, new)

# ======================= roadmap =======================
RM = "docs/roadmap.md"
rep(RM, "- [x] **v4** (5 Oct 2026):",
        "- [x] **v5** (7 Oct 2026): every remaining page designed: 43 screens (32–74) — 19 destination pages (Flow 7), Penang/Melaka Experiences tabs, Hawker breakfast, Batu Caves, Festivals, Saved, Melaka trip, Share/Invite sheets, Undo, Notifications, Location, Explore filters, Synced devices, Units, About, AR Phrases/Food nearby modes, Kopitiam sheet, Offline and Bahasa Melayu Home; flow starts 7–9; fixes v5.1–v5.8.\n- [x] **v4** (5 Oct 2026):")
between(RM, "## In progress", "## Identified improvements, prioritised", '''## In progress

| Item | Gap |
|---|---|
| Walkthrough | 57, 59, 60 (after the scrim fix), 65–69 and 33–50 were built but not walked through in presentation mode |
| Search | One fixed query; filter results are fixed samples |
| Settings | Toggles don't demonstrate their effect (Reduce motion, High contrast) |
| Add to trip | The new destination pages open the Melaka-prefilled sheet (17) |
| Content checks | Travel facts on 32–50, AR distances on 71 and the BM copy on 74 are Unverified |

''')
rep(RM, "| ~~P1~~ | ~~Empty, loading and permission states~~ Done in v2 (16, 21, 22, 24, 25). **Remaining:** an offline error banner |",
        "| ~~P1~~ | ~~Empty, loading and permission states~~ Done in v2 (16, 21, 22, 24, 25); offline banner done in v5 (73) |")
rep(RM, "| **P1** | ~~Selectable language options~~ done in v2. **Remaining:** one screen in Bahasa Melayu |",
        "| ~~P1~~ | ~~Selectable language options~~ done in v2; BM Home done in v5 (74). **Remaining:** native-speaker check |")
rep(RM, "| **P2** | Link the remaining 4 destination cards (Melaka done in v2), or label them \"coming soon\" | Avoid dead taps in testing | M |",
        "| ~~P2~~ | ~~Link the remaining destination cards~~ Done in v5 (32–50) | Avoid dead taps in testing | — |\n| **P2** | One \"Add to trip\" sheet per destination instead of the Melaka-prefilled 17 | Correct content in testing | S |")
rep(RM, "- **Destination pages for 27–31** (e.g. Kyoto, Lisbon) so the worldwide flows go as deep as Malaysia.\n", "- Experience pages for destinations outside Malaysia (36–50 list highlights as rows).\n")
rep(RM, "- The \"Phrases\" / \"Food nearby\" AR modes (a second landmark was added in v2).\n", "")

# ======================= changelog =======================
CL = "docs/changelog.md"
rep(CL, "|---|---|---|---|---|\n",
    "|---|---|---|---|---|\n"
    "| 2026-10-07 | **v5: every remaining page designed** (authorised by the project owner: \"design all the pages that are still left\"). 43 new screens (32–74) built from existing components only: 19 destination pages (new section Flow 7 · Destinations), 51–52 Experiences tabs, 53 Hawker breakfast, 54 Batu Caves, 55 Festivals, 56 Saved, 57 Melaka day trip, 58 Share and 60 Invite sheets, 59 Undo, 61 Notifications, 62 Location sheet, 63–66 Explore filters, 67 Synced devices, 68 Units, 69 About, 70–71 AR Phrases / Food nearby, 72 Kopitiam sheet, 73 Offline Home, 74 BM Home; flow starts 7–9. Fixes after testing: v5.1 flow list, v5.2 sheet scrims, v5.3–v5.4 Explore chip hotspots, v5.5 Top picks on 73/74 and AR label overlap, v5.6–v5.7 Lebuh Armenian label, v5.8 Read me flow count. Existing screens changed only to add links (04, 05, 06, 08, 09, 10, 11, 12, 14, 15, 17, 18, 19), the Me profile text (\"4 saved places\") and version (v0.5). | New 32–74; links on 04, 05, 06, 08–12, 14, 15, 17–19, 26–31; Read me board | Close every dead end and unlinked control before testing | All docs |\n")

# ======================= components =======================
CP = "docs/components.md"
rep(CP, "\n## 4. Known inconsistencies",
    "\n**v5 (7 Oct 2026):** no new components. The 43 new screens reuse Status Bar, Tab Bar, Toggle, Phrase Card, Live Photo, Button, Filter Chip, Save Button and the frame patterns above (result rows, bottom sheets, segmented controls, settings rows, toasts, AR labels). The **Segmented control**, **Bottom sheet**, **Result row** and **AR label** patterns now appear on 20+ screens, which makes componentising them more worthwhile (Proposed).\n\n## 4. Known inconsistencies")
rep(CP, "| All 25 screens (fixed) |", "| All 74 screens (fixed) |")
rep(CP, "| Heroes of 06, 07, 14, 26–31 |", "| Heroes of 06, 07, 14, 26–54 |")

# ======================= figma-guidelines =======================
FG = "docs/figma-guidelines.md"
rep(FG, "Flow 2 · Discover a destination                 (section: 04–08, 14–15, 26)", "Flow 2 · Discover a destination                 (section: 04–08, 14–15, 26, 51–55, 61–66)")
rep(FG, "Flow 3 · Plan a trip & settings                 (section: 09–11, 16–20)", "Flow 3 · Plan a trip & settings                 (section: 09–11, 16–20, 56–60, 67–69)")
rep(FG, "Flow 4 · AR Heritage Lens (advanced feature)    (section: 12–13, 21–23)", "Flow 4 · AR Heritage Lens (advanced feature)    (section: 12–13, 21–23, 70–72)")
rep(FG, "Flow 5 · States & edge cases                    (section: 24–25)", "Flow 5 · States & edge cases                    (section: 24–25, 73–74)")
rep(FG, "Flow 6 · Country guides                         (section: 27–31)", "Flow 6 · Country guides                         (section: 27–31)\nFlow 7 · Destinations                           (section: 32–50)")
rep(FG, "`5 · States & edge cases`, `6 · Country guides`.", "`5 · States & edge cases`, `6 · Country guides`, `7 · Destinations`, `8 · Offline mode`, `9 · Bahasa Melayu`.")
rep(FG, "| `Mobile Prototype (iOS)` | **The deliverable**: Read me board, 5 Flow sections,", "| `Mobile Prototype (iOS)` | **The deliverable**: Read me board, 7 Flow sections,")

# ======================= project-overview =======================
PO = "docs/project-overview.md"
rep(PO, "**Built at country level only:** Japan, Morocco, Portugal, Mexico and Türkiye have country guides (27–31) but no destination pages yet; their destination cards aren't linked. Treat them like the unlinked KL or Langkawi cards: tell test participants they are out of scope.",
        "**Built to destination level (v5, 7 Oct 2026):** Japan, Morocco, Portugal, Mexico and Türkiye have country guides (27–31) and three destination pages each (36–50). Malaysia stays the deepest country: experience pages, the AR Lens, trips and culture guides are Malaysian.")
rep(PO, "- full content for any country other than Malaysia", "- experience pages, AR content and culture guides for countries other than Malaysia")
rep(PO, "## 8. Current status (5 Oct 2026)", "## 8. Current status (7 Oct 2026)")
rep(PO, "  - 31 linked screens (13 original + 12 in v2 + 26 Malaysia + 27–31 country guides)\n  - 6 flow sections with 6 starting points",
        "  - 74 linked screens (13 original + 12 in v2 + 26 Malaysia + 27–31 country guides + 43 in v5)\n  - 7 flow sections with 9 starting points")
rep(PO, "| Content depth | Accurate local content for one country takes real effort; Malaysia has full destination pages; 27–31 are country-level only. Adding destination pages means a Country page, destinations and a culture guide, all fact-checked. |",
        "| Content depth | Accurate local content takes real effort. Since v5 every country has destination pages (32–50); their travel facts and tips are general knowledge and still need fact-checking (Unverified). |")

# ======================= README =======================
RD = "README.md"
rep(RD, "| **Prototype state** | 31 linked screens in 6 flows (v3, 5 Oct 2026), with 3D and motion | In Progress |", "| **Prototype state** | 74 linked screens in 7 flow sections with 9 flow starts (v5, 7 Oct 2026), with 3D and motion | In Progress |")
rep(RD, "Six country guides: Malaysia (fully built: Penang, Melaka, culture guide, AR Lens) plus Japan, Morocco, Portugal, Mexico and Türkiye (facts, etiquette, 3 destinations, 3 phrases each) | Verified (5 Oct 2026) |",
        "Six country guides: Malaysia (fully built: 6 destination pages, experiences, culture guide, AR Lens) plus Japan, Morocco, Portugal, Mexico and Türkiye (facts, etiquette, 3 phrases and 3 destination pages each) | Verified (5 Oct 2026; destination pages 7 Oct 2026) |")
rep(RD, "Full detail: [user-flows](docs/user-flows.md)",
        "**Added in v5 (7 Oct 2026): every remaining page designed.**\n\n- **19 destination pages** (32–50, Flow 7): KL, Langkawi, Cameron Highlands and Sabah, plus three per other country.\n- **Experiences:** Penang and Melaka Experiences tabs (51, 52), Hawker breakfast (53), Batu Caves (54); Festivals guide (55).\n- **Trips and Me:** Saved (56), Melaka day trip (57), Share and Invite sheets (58, 60), Undo (59), Synced devices, Units, About (67–69).\n- **Home and Explore:** Notifications (61), Location sheet (62), filter results for Places, Experiences, Food and Phrases (63–66).\n- **AR Lens:** Phrases and Food nearby modes (70, 71) and a Kopitiam sheet (72).\n- **States:** Home offline (73) and Home in Bahasa Melayu (74).\n\nFull detail: [user-flows](docs/user-flows.md)")
rep(RD, "3. Pick a flow: **1 · First launch**, **2 · Returning user (Home)** or **3 · AR Heritage Lens**.",
        "3. Pick a flow from the Flows list (1–9). **1 · First launch**, **2 · Returning user (Home)** and **3 · AR Heritage Lens** cover the core journey; **7 · Destinations**, **8 · Offline mode** and **9 · Bahasa Melayu** show the v5 additions.\n4. After any edit to the file, close and reopen the presentation tab; an open tab can keep old component states.")

# ======================= CLAUDE.md =======================
CM = "CLAUDE.md"
rep(CM, "Six country guides are built: **26 Malaysia** (with full destination pages for Penang and Melaka, culture guide and AR Lens) and **27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye** (facts, etiquette, 3 destinations and 3 phrases each).",
        "Six country guides are built: **26 Malaysia** (6 destination pages, experiences, culture guides and AR Lens) and **27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye** (facts, etiquette, 3 phrases and 3 destination pages each, 36–50).")
rep(CM, "31 linked iOS screens in 6 flows", "74 linked iOS screens in 7 flow sections with 9 flow starts (v5, 7 Oct 2026)")
rep(CM, "Research artefacts, wireframes and a few states (offline, BM screen) are missing; see [roadmap](docs/roadmap.md).",
        "Since v5 (7 Oct 2026) every page is designed, including offline and Bahasa Melayu states. Research artefacts and wireframes are still missing; see [roadmap](docs/roadmap.md).")

# ======================= existing-project-files README (laptop only) =======================
EP = "existing-project-files/README.md"
if os.path.exists(os.path.join(R, EP)):
    rep(EP, "| `figma-plugins/tourix-inspect/` |",
        "| `figma-plugins/tourix-v5/` | this folder | **v5** (run once, 7 Oct 2026): every remaining page, 43 screens (32–74), Flow 7 section, links into existing screens. `v5.js` is the source; `code.js` = helpers + v5. Refuses to run twice; saves a named version first. Holds `patch_docs_v5.py`. |\n"
        "| `figma-plugins/tourix-v5-1/` … `tourix-v5-8/` | this folder | v5 fixes: 5.1 flow list (1–9) · 5.2 sheet scrims · 5.3 chip reset · 5.4 chip hotspots · 5.5 Top picks on 73/74 + AR label overlap · 5.6 Lebuh Armenian label edge · 5.7 its anchor and leader · 5.8 Read me flow count |\n"
        "| `figma-plugins/tourix-inspect/` |")

print("MISSING:" if MISS else "All edits applied.")
for m in MISS: print("  -", m)
