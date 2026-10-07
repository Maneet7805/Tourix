# Existing project files

Supporting material for the Tourix Figma prototype. Nothing in here is the design itself; the design lives in Figma.

| Item | Location | What it is |
|---|---|---|
| Figma file | [Tourix – Worldwide Discovery App (UX Prototype)](https://www.figma.com/design/pNoyIJM8bCB4qtwVQeF0Kj) | The prototype (source of truth) |
| `figma-inventory-2026-10-04.json` | this folder | Read-only export of pages, frames, prototype links, texts, components, variables and styles. Taken on 4 Oct 2026; the retired brand name in it was replaced on 5 Oct 2026. **It predates v2** (13 screens); re-export with the inventory command for the current 26-screen state. |
| `figma-plugins/tourix-rename-inventory/` | this folder | Development plugin. Command 1 renames the brand in text, layer names and descriptions. Command 2 exports the inventory to a text box for copying (read-only). |
| `figma-plugins/tourix-v2/` | this folder | **v2 generator** (run once, 4 Oct 2026): 12 new screens, Language Picker and Phrase Card, showcase pause, accessibility fixes, new links and flow starts. `v2.js` is the source; `code.js` = v1 helpers + v2. It refuses to run twice. |
| `figma-plugins/tourix-v2-1/` | this folder | v2.1 fixes found in testing (showcase pause paint, All trips link, Melaka trip card, sheet background) |
| `figma-plugins/tourix-worldwide/` | this folder | **Worldwide scope** (run once, 5 Oct 2026): countries-first Home, `26 Country – Malaysia`, showcase → countries, country-neutral copy, Read me block, `Build log · worldwide`. Also holds `patch_docs.py`, the matching doc edits. Saved the version "Before worldwide scope (25 screens)" first. |
| `figma-plugins/tourix-worldwide-1/` | this folder | Fix: 3D Showcase controls caption still named the old destinations ("06 / 06 Sabah") |
| `figma-plugins/tourix-v3/` | this folder | **v3** (run once, 5 Oct 2026): retired brand name removed everywhere, greeting/title fixes, 3D 'Top recommendations' panel, country guides 27–31 (Flow 6), Live Photo (Ken Burns), Reveal entrance, Pressed states, heart pop, AR anchor pulse, skeleton shimmer. Saved the version "Before Tourix v3 (26 screens)" first. |
| `figma-plugins/tourix-v3-1/` | this folder | Follow-up fixes: `code-v3-2.js` (v3.2) shrank the Reveal components, which had stretched to ~12,900 pt and hid the sections below, and re-fit screens 26–31; `code.js` (v3.3) updated stale 'Choose a country' copy on the 26 caption and Read me board |
| `figma-plugins/tourix-v4/` · `tourix-v4-1/` | this folder | **v4** (5 Oct 2026): Top picks cover-flow moved into the Home hero, styled for dark; showcase and duplicate section removed from Home. Saved "Before Tourix v4 (two carousels on Home)" first. v4.1 fixed the Prev button fill. `patch_docs_v4.py` = matching doc edits. |
| `figma-plugins/tourix-v5/` | this folder | **v5** (run once, 7 Oct 2026): every remaining page, 43 screens (32–74), Flow 7 section, links into existing screens. `v5.js` is the source; `code.js` = helpers + v5. Refuses to run twice; saves a named version first. Holds `patch_docs_v5.py`. |
| `figma-plugins/tourix-v5-1/` … `tourix-v5-8/` | this folder | v5 fixes: 5.1 flow list (1–9) · 5.2 sheet scrims · 5.3 chip reset · 5.4 chip hotspots · 5.5 Top picks on 73/74 + AR label overlap · 5.6 Lebuh Armenian label edge · 5.7 its anchor and leader · 5.8 Read me flow count |
| `figma-plugins/tourix-inspect/` | this folder | Read-only: shows the layer tree of 04, 26 and 27 in a plugin window |
| `tourix-v1-builder/` | `D:\Year 3 SEM 1\UX\Figma Plugins\tourix-v1-builder` | Generator that built the 13 mobile screens, the mobile kit and the repairs. Re-running it creates a new page and renames older ones to `OLD – delete me`. |
| `tourix-v1-showcase-patch/` | `D:\Year 3 SEM 1\UX\Figma Plugins\tourix-v1-showcase-patch` | One-off patch for the 3D showcase Prev/Next button paints |
| Assignment brief | `2026 Sept Incourse Question UX CT120-3-3 APD-APU3F2609.pdf` (in your Organized › Education › APU › UX folder) | Requirements and marking scheme |

## Running a development plugin

1. Open the file in the **Figma desktop app**. Development plugins don't run in the browser.
2. Go to **Plugins → Development → Import plugin from manifest…** and pick the plugin's `manifest.json`.
3. Run it from **Plugins → Development**, or with Ctrl + / and its name.
4. Before any plugin that writes to the file, save a named version (**File → Save to version history**).
