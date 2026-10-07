// v3.3 (5 Oct 2026): stale copy after 'Choose a country' was replaced by Top recommendations.
const SWAPS = [
  ["Reached from Home → Choose a country → Malaysia.", "Reached from Explore → Country guides, or the 'Malaysia' chip on 06 and 14."],
  ["Discover: Home → choose a country (Malaysia) → Penang → experience → add to trip → Trips.", "Discover: Home → Top recommendations (3D) → Penang or a country guide; or Explore → Country guides → Malaysia → Penang → experience → add to trip → Trips."],
  ["Home now opens with the 3D country showcase and a 'Choose a country' list; the destinations carousel moved to 26.", "Home opens with the 3D country showcase; the destinations carousel moved to 26. (v3 replaced the 'Choose a country' list with Top recommendations.)"],
  ["Japan, Morocco, Portugal, Mexico and Türkiye are listed as 'Coming soon' and aren't linked; tell test participants.", "v3 added country guides for Japan, Morocco, Portugal, Mexico and Türkiye (27–31); their destination cards aren't linked yet."],
];
const inInst = (n) => { let p = n.parent; while (p && p.type !== "PAGE") { if (p.type === "INSTANCE") return true; p = p.parent; } return false; };
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  let n = 0;
  for (const t of mob.findAll((x) => x.type === "TEXT")) {
    if (inInst(t)) continue; let s = t.characters, o = s;
    for (const [a, b] of SWAPS) s = s.split(a).join(b);
    if (s !== o) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; n++; }
  }
  const left = mob.findAll((x) => x.type === "TEXT" && /Choose a country/.test(x.characters) && !/Build log/.test((x.parent || {}).name || "")).map((x) => x.characters.slice(0, 60));
  figma.closePlugin(`v3.3: ${n} text layers updated. Still mentioning 'Choose a country': ${left.length ? left.join(" | ") : "none"}`);
})().catch((e) => figma.closePlugin("v3.3 stopped: " + e.message));
