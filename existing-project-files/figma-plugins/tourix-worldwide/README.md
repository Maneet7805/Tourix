# Tourix – Worldwide scope (Figma development plugin)

Runs once on the page **Mobile Prototype (iOS)**, 5 Oct 2026. It stops if `26 Country – Malaysia` already exists, and saves the version "Before worldwide scope (25 screens)" before changing anything.

What it does:
- **3D Showcase:** the six cards become countries: Malaysia, Japan, Morocco, Portugal, Mexico and Türkiye, with Pexels photos. The `Front=` variant values are renamed to match.
- **04 Home:** adds a "Choose a country" list at the top of the body. Malaysia links to 26; the other countries show "Coming soon" and have no chevron or link.
- **New `26 Country – Malaysia`:** the destinations carousel moves here from Home with its Penang and Melaka links. It also has Good to know tips and culture guide rows linking to 08 and 15.
- **Country-neutral copy:**
  - "Start exploring" on 03
  - "Loading your picks…" on 24
  - "Anywhere, with local context." on 01
  - the language note on 02 and 19
  - captions
- **Read me board:** adds a block about the worldwide scope.
- **Build log:** writes a `Build log · worldwide` frame that also lists any remaining product-level "Malaysia" text for review.

Source: `code.js` = the v1 helpers (the first part of `../tourix-v2-1/code.js`) + `w.js`.
`patch_docs.py` applies the matching documentation edits.

A plugin can't rename the file. Rename it by hand to **Tourix – Worldwide Discovery App (UX Prototype)**.
