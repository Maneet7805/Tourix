# Figma guidelines

How the Tourix file is organised and how to change it safely. This describes the **current** structure. Don't reorganise the file without authorisation.

Related: [components](components.md) · [CLAUDE.md](../CLAUDE.md)

## 1. File and pages (Verified, 5 Oct 2026)

The `Landing Page` and the two `OLD – delete me` pages were gone by 5 Oct 2026; the file now has the three pages below.

**File:** *Tourix – Worldwide Discovery App (UX Prototype)* (was *Tourix – Malaysia Discovery App (UX Prototype)* until 5 Oct 2026), in Drafts of the "Maneet Mehta's team" Starter plan.

| Page | Contents | Keep? |
|---|---|---|
| `Cover & Notes` | Empty | **Proposed:** add a cover (name, team, module, date) and a thumbnail |
| `Design System` | Variables, styles, components, Photo Assets board | Yes, the source of the shared components |
| `Mobile Prototype (iOS)` | **The deliverable**: Read me board, 7 Flow sections, Mobile kit section, Build logs | Yes |

### Layout of `Mobile Prototype (iOS)`

```
Read me · Part 2 prototype                      (board)
Flow 1 · First launch (onboarding)              (section: 01–03)
Flow 2 · Discover a destination                 (section: 04–08, 14–15, 26, 51–55, 61–66)
Flow 3 · Plan a trip & settings                 (section: 09–11, 16–20, 56–60, 67–69)
Flow 4 · AR Heritage Lens (advanced feature)    (section: 12–13, 21–23, 70–72)
Flow 5 · States & edge cases                    (section: 24–25, 73–74)
Flow 6 · Country guides                         (section: 27–31)
Flow 7 · Destinations                           (section: 32–50)
Mobile kit (components)                         (section: Status Bar, Tab Bar, Interest Tile, Toggle, Language Picker, Phrase Card, Live Photo, Top Recommendations (3D), Reveal ×6, AR Anchor Pulse, Skeleton Shimmer)
Build log · v1, v2, worldwide, v3              (generator output; can be deleted)
```

## 2. Naming conventions (Verified)

| Object | Convention | Examples |
|---|---|---|
| Screen frame | `NN Screen – Detail`, two-digit number in flow order | `06 Destination – Penang`, `13 AR Lens – Landmark info`, `26 Country – Malaysia` |
| Screen caption | `Label · <frame name>` frame above each screen (title + how-to-test note) | `Label · 04 Home` |
| Section | `Flow N · Description` | `Flow 3 · Plan a trip & settings` |
| Component set | Title Case noun | `Destination Card`, `Tab Bar (iOS)` |
| Variant | `Property=Value`, comma-separated | `Type=Primary, State=Default`, `Front=Penang` |
| Component property | Title Case, matches the visible field | `Title`, `Fact 1 label`, `Category icon` |
| Icon | `Icon/<name>` (component), `icon/<name>` (inline vector) | `Icon/landmark` |
| Layers | Role-based, `Kind/Name` for instances | `Button/Add to trip`, `Destination/Penang`, `Country/Malaysia`, `Mood/Cultural heritage`, `Tab/Lens` |
| Variables | `group/sub/step` | `color/pandan/900`, `radius/lg`, `space/24` |
| Text styles | `Group/Size` | `Mobile/Display M`, `Label/S` |

## 3. Components and variants

- Shared design-system components live on **Design System**. Components that need prototype links to screens live in the **Mobile kit** section, because a main component's links can only target frames on its own page.
- Use **variants** for states (`State`, `Selected`, `On`, `Active`, `Theme`) and **properties** for content (`Label`, `Title`) and icons (instance swap).
- Interactive components (chips, toggles, save, interest tiles, showcase) hold their own *Change to* reactions. Don't recreate them on instances.

## 4. Prototype organisation

- Flow starting points: `1 · First launch`, `2 · Returning user (Home)`, `3 · AR Heritage Lens`, `4 · Plan a day trip (Melaka)`, `5 · States & edge cases`, `6 · Country guides`, `7 · Destinations`, `8 · Offline mode`, `9 · Bahasa Melayu`.
- Fixed elements: the Status Bar and Tab Bar or Action Bar are the **top-most** children of each screen, made fixed with *Fix position when scrolling*.
- Transitions follow [design §6](design.md#6-motion-and-micro-interactions): push for detail, dissolve for tabs, smart animate for state changes.
- The tab-bar links live inside the Tab Bar component, so change them there, never per instance.

## 5. Workflow

1. **Review:** read [CLAUDE.md](../CLAUDE.md) and the relevant docs; open the frames; play the flow.
2. **Plan:** confirm the scope; list the components and tokens you'll reuse and anything new you need.
3. **Build:**
   - duplicate the closest existing screen inside the right section
   - keep its fixed bars
   - rename it to the next `NN`
   - add a `Label ·` caption
4. **Connect:**
   - add links using the documented transitions
   - give every new tappable element a destination, or record it as non-functional
5. **Check:**
   - contrast, 44 pt targets and text styles ([accessibility](accessibility.md))
   - play every affected flow
6. **Document:** update the docs plus the [changelog](changelog.md).

## 6. Change safety

| Risk | Safeguard |
|---|---|
| Editing a main component changes every instance | Check where it's used (Assets → right-click → *Go to main component*, or the [components](components.md) table) before you edit |
| Breaking prototype links | Never delete or rename a destination frame without re-linking. Re-run the flows afterwards. |
| Opacity reset on variable-bound paints | After setting a translucent bound paint, re-check the fill opacity in the right panel |
| Bulk changes | Use a local development plugin with a dry-run or log; keep the plugin code in [existing-project-files](../existing-project-files/README.md) |
| Lost work | Use **File → Show version history → Save to version history** before any large change, and name the version |
| Wrong component source | Don't use components from the `OLD – delete me` pages |

## 7. Tool notes

- **Figma MCP (Starter):** 20 calls per month, already used up for October 2026. Use local plugins through the Figma desktop app instead.
- **Plugins** run with `documentAccess: dynamic-page`, so use the async APIs (`getNodeByIdAsync`, `setTextStyleIdAsync`, `setEffectStyleIdAsync`, `page.loadAsync()`).
- **A plugin can't rename the file** (`figma.root.name` is read-only), so rename it through the file menu.
