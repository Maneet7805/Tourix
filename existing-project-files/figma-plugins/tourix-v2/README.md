# Tourix v2 – Improvements & new pages (Figma development plugin)

Runs once on the page **Mobile Prototype (iOS)** of the Tourix file. It refuses to run twice (it stops if `14 Destination – Melaka` already exists).

What it does:
- 12 new screens (14–25) in Flows 2–4 and a new section **Flow 5 · States & edge cases**
- 2 new interactive components (Language Picker, Phrase Card) and a pause/play `Motion` property on the 3D Showcase
- accessibility fixes: the `color/line-strong` token, the focus ring, 44 pt targets, solid status bars
- new prototype links and flow starting points
- a `Build log · v2` frame listing every change and any problems

Before running, save a version: **File → Save to version history**. To undo everything, restore that version.

Source: `code.js` = the v1 helpers (`tourix-v1-builder/src/01–06`) + `v2.js`.
