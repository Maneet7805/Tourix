// Worldwide fix 1 (5 Oct 2026): the 3D Showcase controls caption still showed the old destination names
// ("06 / 06 Sabah"). Renames every loose text layer in the showcase (outside the card instances).
const MAP = { "Kuala Lumpur": "Malaysia", "Penang": "Japan", "Langkawi": "Morocco", "Melaka": "Portugal", "Cameron Highlands": "Mexico", "Sabah": "Türkiye" };
const inInstance = (n, root) => { let p = n.parent; while (p && p !== root) { if (p.type === "INSTANCE") return true; p = p.parent; } return false; };
(async () => {
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync();
  const set = ds.findOne((n) => n.type === "COMPONENT_SET" && n.name === "3D Showcase");
  if (!set) { figma.closePlugin("3D Showcase not found"); return; }
  let n = 0; const left = [];
  for (const t of set.findAll((x) => x.type === "TEXT")) {
    if (inInstance(t, set)) continue;
    let s = t.characters, o = s;
    for (const [a, b] of Object.entries(MAP)) s = s.split(a).join(b);
    if (s !== o) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; n++; }
    else if (!/^\d/.test(s)) left.push(s);
  }
  figma.closePlugin(`Showcase captions renamed: ${n}. Other loose texts: ${[...new Set(left)].slice(0, 8).join(" | ") || "none"}`);
})().catch((e) => figma.closePlugin("Fix 1 stopped: " + e.message));
