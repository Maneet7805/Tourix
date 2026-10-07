# Accessibility

Tourix targets **WCAG 2.1 AA** as the brief requires. This page records what was checked, how, and what still fails. It does **not** claim compliance: a Figma prototype can't be fully tested for screen readers, focus order or real text scaling.

Related: [design](design.md) · [ui-ux-guidelines](ui-ux-guidelines.md)

**Method:**
- Contrast ratios were calculated from the token HEX values with the WCAG relative-luminance formula (4 Oct 2026).
- Layout and target sizes come from the Figma frames.
- Behaviour comes from a presentation-mode walkthrough.

## 1. Colour contrast (Verified by calculation)

### Text pairs

| Foreground → background | Ratio | AA normal (4.5) | AA large (3.0) | Where |
|---|---|---|---|---|
| `ink` → `mist` | **15.6** | ✅ | ✅ | Body on light screens |
| `ink` → `surface` | **16.8** | ✅ | ✅ | Cards |
| `ink-muted` → `surface` | **6.9** | ✅ | ✅ | Secondary text on cards |
| `ink-muted` → `mist` | **6.3** | ✅ | ✅ | Secondary text on pages |
| `ink-muted` → `pandan/100` | **5.8** | ✅ | ✅ | Text in tinted cells |
| `on-dark` → `pandan/900` | **14.2** | ✅ | ✅ | Home header, cards on dark |
| `on-dark-muted` → `pandan/900` | **9.1** | ✅ | ✅ | Secondary text on dark |
| `ink` → `kaya/400` | **10.0** | ✅ | ✅ | Primary button labels |
| `kaya/400` → `pandan/900` | **9.2** | ✅ | ✅ | Eyebrows and icons on dark |
| `pandan/900` → `kaya/400` | **9.2** | ✅ | ✅ | Lens icon, badges |
| `pandan/700` → `kaya/100` | **7.9** | ✅ | ✅ | "PHRASE OF THE DAY" |
| `pandan/500` → `surface` | **5.0** | ✅ | ✅ | Links on white |
| `pandan/500` → `mist` | **4.6** | ✅ (barely) | ✅ | "Skip", "See all", pronunciation text |
| `surface` → `bunga/500` | **5.3** | ✅ | ✅ | Saved heart |
| Text over photos | not measurable | ⚠️ | ⚠️ | Showcase, mood cards, AR labels. Readability relies on pandan gradient shades and glass panels. **Unverified:** spot-check each with a contrast tool on the rendered image. |

### Non-text contrast (WCAG 1.4.11, needs ≥ 3 : 1)

| Element | Ratio | Result |
|---|---|---|
| Toggle **off** track | was 1.35 (`line`); **3.5** with `line-strong` (v2) | ✅ Fixed in v2 |
| Unselected radio ring | was 1.35; **3.5** with `line-strong` in the Language Picker (v2) | ✅ Fixed in v2 |
| Chip / option borders (`line`) vs white or mist | 1.25–1.35 | ⚠️ The text label identifies the control, but the boundary is weak |
| Toggle **on** (`pandan/500`) vs off track | 3.7 | ✅ |
| Focused search border | was 1.87 (`kaya/500`); now `pandan/900` 2 pt on `kaya/100` (≈ 13 : 1, calculated) | ✅ Fixed in v2 |
| Primary button (`kaya/400`) vs mist / white | 1.55–1.68 | ⚠️ The label carries meaning; acceptable but low |

**Done in v2:** token `color/line-strong` = `#7C8C84` (3.5 : 1 on white, 3.3 : 1 on mist, calculated) is used for toggle-off tracks, radio rings and the new-trip inputs; the focus ring is `pandan/900` at 2 pt. **Still Proposed:** apply `line-strong` to chip borders.

## 2. Text and typography

- Body 14–16 pt, line height ≥ 1.4×. Display text is ≥ 26 pt. **Verified**
- Smallest text is the **11 pt** tab label: legible, but at the floor. **Verified**
- Text-size control ("Follows iOS Dynamic Type") and the "Larger text" toggle exist, but **a large-text version of any screen isn't designed**. **Proposed:** show Home at 130 % to evidence the design consideration.
- Eyebrows are uppercase with letter spacing. Keep them short; avoid full sentences in caps. **Verified**

## 3. Touch targets

Apple HIG recommends 44 × 44 pt. WCAG 2.1 AA has no target-size rule, but the team should still meet the HIG.

| Control | Size | Result |
|---|---|---|
| Back / Close / Share / Play buttons | 44 pt | ✅ |
| Tab items | ≈ 75 × 58 pt; the Lens orb is 54 pt | ✅ |
| Primary / secondary buttons | ≥ 48 pt high | ✅ |
| Save heart | 44 pt (v2) | ✅ |
| Filter chips | ≈ 38 pt high | ⚠️ |
| Text links ("Skip", "Cancel", "See all", "All trips") | 44 pt hotspot frames (v2) | ✅ "Open culture guide →" sits inside the tappable phrase card |
| Toggle | 51 × 31 | ⚠️ Standard iOS size; the whole row should be tappable |

## 4. Non-colour indicators (WCAG 1.4.1)

| Pattern | Indicator besides colour | Result |
|---|---|---|
| Selected interest tile | Tick icon | ✅ |
| Selected language | Tick in a filled radio + thicker border | ✅ |
| Active tab | Tinted pill behind the icon (also colour) + label | ⚠️ Mostly colour. **Proposed:** bolder label or filled icon. |
| Active chip | Fill change only | ⚠️ **Proposed:** add a tick or weight change |
| "Just added" stop / new trip | Text badges "JUST ADDED" (09), "JUST CREATED" (18) + border | ✅ |
| Saved heart | Filled vs outline icon | ✅ |

## 5. Labels, icons and content

- Search fields have visible labels ("WHERE TO", "WHEN", "WHO" on desktop) or visible query text. **Verified**
- All tab icons have text labels. **Verified**
- Icon-only buttons (Back, Share, Bell, Mic, Play, Gallery, Help) have **no annotated accessible names**. **Proposed:** add a Figma annotation layer listing the VoiceOver labels, e.g. "Back", "Share Penang", "Play pronunciation of Terima kasih".
- Audio content offers **captions** ("captions on"). **Verified** as UI text.
- AR content has an **audio and text** equivalent in the info sheet. **Verified**

## 6. Motion

**v3 motion audit (5 Oct 2026):** every new automatic animation is one-shot and ends within 5 s — Ken Burns 4.5 s, Reveal 0.7 s, AR pulse ≈2.7 s, shimmer 1.2 s, Top recommendations intro 0.9 s — so WCAG 2.2.2 doesn't require a pause for them. The cover-flow never auto-plays. **Still Unverified:** text contrast over the new country photos.


- Since v4 Home has no auto-rotating content: the hero cover-flow only moves on drag, tap or arrows. The 3D Showcase (auto-rotate + pause, WCAG 2.2.2) remains in the Design System but isn't used on Home.
  - **Verified (v2):** a **pause / play** button sits next to Prev/Next. Pausing swaps to the `Motion=Paused` twin of the current card, which has no timer; Play swaps back. Checked in presentation mode: the card stayed put for 10 s after pausing.
  - **Still missing:** the Me "Reduce motion" toggle doesn't switch Home to the paused variant (would need a second Home frame or variables).
- Screen transitions are 150–400 ms, with no flashing. **Verified**

## 7. Forms, errors and recovery

- Forms: search and the new-trip sheet (17), whose fields have visible labels above them. Recovery states: no-results with a spelling suggestion (25, WCAG 3.3.3) and the AR "move a little closer" hint (22). There's still no offline error state (see [ui-ux-guidelines §5](ui-ux-guidelines.md#5-ux-states)).
- **Proposed:** errors combine an icon, text and colour, sit next to the field, and say how to fix the problem.
- Undo is offered after adding to a trip (not yet linked). **In Progress**

## 8. Screen reader and focus (not testable in Figma)

**Unverified.** For the report, document the intended reading order per screen, as a numbered annotation, and the accessible names. Mark these as design intentions.

## 9. Inclusive design (from the brief)

| Consideration | Evidence | Status |
|---|---|---|
| Multilingual UI | EN, BM, 中文, தமிழ் picker; bilingual AR sheet; local terms with English. A worldwide audience raises the bar: RTL (Arabic) and more interface languages are **Proposed** | Verified (UI) |
| Religious and cultural respect | Dress codes, shoes-off, halal cue, quiet at Chew Jetty | Verified |
| Economic diversity | Offline packs screen with sizes and a Wi-Fi-only toggle (20); no paid content shown | Verified (sample sizes). **Proposed:** low-end device notes |
| Older users / low vision | Text size, high contrast, captions | Verified as settings; effects not shown |

## 10. Accessibility to-do

- [x] Add `color/line-strong` and a stronger focus ring; re-check the toggles and radios. (v2)
- [x] Give the Save button a 44 pt hit area; pad the text links. (v2)
- [x] Add a pause control to the showcase. (v2) 
- [ ] Link the Reduce-motion setting to the paused showcase.
- [ ] Annotate the VoiceOver names and reading order on the key screens.
- [ ] Design one large-text (Dynamic Type) screen as evidence.
- [ ] Spot-check text-over-photo contrast on the rendered frames, including the five new country photos (Verified, 5 Oct 2026).
- [ ] Give the Home country rows a 44 pt minimum height and accessible names ("Malaysia, country guide"; unbuilt countries announced as "coming soon").
