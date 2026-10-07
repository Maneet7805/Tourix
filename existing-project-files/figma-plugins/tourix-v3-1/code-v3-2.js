// v3.1 (5 Oct 2026): the 'Reveal' entrance components came out far too tall (e.g. 3712 pt), pushing the
// Destinations/Phrases sections below the bottom of 26–31. Shrinks each Reveal variant and instance to its
// content, re-fits the screens, and moves Build log · v3 so it doesn't overlap Flow 6.
function deepH(n) {
  if (!n || n.visible === false) return 0;
  const auto = (n.type === "FRAME" || n.type === "COMPONENT") && n.layoutMode && n.layoutMode !== "NONE";
  if (!auto) return n.height;
  const kids = n.children.filter((c) => c.visible !== false && c.layoutPositioning !== "ABSOLUTE");
  if (n.layoutMode === "VERTICAL") return n.paddingTop + n.paddingBottom + kids.reduce((s, c) => s + deepH(c), 0) + Math.max(0, kids.length - 1) * n.itemSpacing;
  return n.paddingTop + n.paddingBottom + Math.max(0, ...kids.map(deepH));
}
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync(); await figma.setCurrentPageAsync(mob);
  const log = [];
  for (const set of mob.findAll((n) => n.type === "COMPONENT_SET" && n.name.startsWith("Reveal · "))) {
    for (const v of set.children) {
      const inner = v.children[0]; if (!inner) continue;
      const before = `${Math.round(v.width)}x${Math.round(v.height)} inner ${Math.round(inner.width)}x${Math.round(inner.height)}`;
      try { v.layoutSizingHorizontal = "FIXED"; v.layoutSizingVertical = "FIXED"; } catch (e) { }
      v.resize(393, v.height); inner.resize(393, inner.height);
      if (inner.layoutMode === "VERTICAL") { inner.primaryAxisSizingMode = "AUTO"; }
      log.push(before);
      if (inner.layoutMode === "VERTICAL") inner.primaryAxisSizingMode = "AUTO";
      const h = Math.ceil(inner.height + (v.name === "In=No" ? 0 : 0));
      v.resize(393, h);
      log.push(`${set.name}/${v.name}: ${h}`);
    }
  }
  for (const inst of mob.findAll((n) => n.type === "INSTANCE" && n.name.startsWith("Reveal · "))) {
    const main = await inst.getMainComponentAsync(); if (main) inst.resize(inst.width, main.height);
  }
  for (const f of mob.findAll((n) => n.type === "FRAME" && /^(2[6-9]|3[01]) Country – /.test(n.name) && n.parent && n.parent.type === "SECTION")) {
    const c = f.children.find((x) => x.name === "Content"); if (!c) continue;
    const h = Math.max(852, Math.ceil(deepH(c))); f.resize(393, h); log.push(`${f.name}: ${h}`);
  }
  const lg = mob.findOne((n) => n.type === "FRAME" && n.name === "Build log · v3");
  if (lg) { let mx = 0; for (const ch of mob.children) if (ch !== lg) mx = Math.max(mx, ch.x + ch.width); lg.x = mx + 200; const w = mob.findOne((n) => n.type === "FRAME" && n.name === "Build log · worldwide"); if (w) lg.y = w.y; }
  figma.closePlugin("v3.1: " + log.join(" | "));
})().catch((e) => figma.closePlugin("v3.1 stopped: " + e.message));
