// v5.8 (7 Oct 2026): the Read me board's v5 heading said "8 flows"; v5.1 split flow 8 into 8 · Offline mode and 9 · Bahasa Melayu.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  let n = 0;
  for (const t of mob.findAll((x) => x.type === "TEXT" && x.characters.includes("74 screens, 8 flows"))) {
    for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
    t.characters = t.characters.replace("74 screens, 8 flows", "74 screens, 9 flows"); n++;
  }
  figma.closePlugin("v5.8: updated " + n + " text layer(s)");
})().catch((e) => figma.closePlugin("v5.8 stopped: " + e.message));
