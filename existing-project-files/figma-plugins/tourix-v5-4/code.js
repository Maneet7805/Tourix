// v5.4 (7 Oct 2026): putting navigation links directly on Filter Chip instances made them render as blank dark pills
// in presentation mode (the chip's own toggle interaction conflicts). Links move to transparent hotspots laid over the
// chips; the chips keep only their component behaviour.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const screens = { All: "05 Explore – Search", Places: "63 Explore – Places", Experiences: "64 Explore – Experiences", Food: "65 Explore – Food", Phrases: "66 Explore – Phrases" };
  const F = {}; for (const [k, nm] of Object.entries(screens)) F[k] = mob.findOne((x) => x.type === "FRAME" && x.name === nm && x.parent && x.parent.type === "SECTION");
  const tr = { type: "DISSOLVE", easing: { type: "EASE_OUT" }, duration: 0.25 };
  let n = 0;
  for (const [active, f] of Object.entries(F)) {
    if (!f) continue; const filters = f.findOne((x) => x.name === "Filters"); if (!filters) continue;
    for (const ch of [...filters.children].filter((x) => x.type === "INSTANCE")) {
      await ch.setReactionsAsync([]);
      const label = ch.name.replace("Chip/", ""); if (label === active || !F[label]) continue;
      const idx = filters.children.indexOf(ch);
      const wrap = figma.createFrame(); wrap.name = "Chip wrap/" + label; wrap.layoutMode = "HORIZONTAL"; wrap.primaryAxisSizingMode = "AUTO"; wrap.counterAxisSizingMode = "AUTO"; wrap.fills = []; wrap.clipsContent = false;
      filters.insertChild(idx, wrap); wrap.appendChild(ch);
      const hs = figma.createFrame(); hs.name = "Hotspot/" + label; hs.fills = []; wrap.appendChild(hs); hs.layoutPositioning = "ABSOLUTE"; hs.resize(ch.width, Math.max(44, ch.height)); hs.x = 0; hs.y = (ch.height - hs.height) / 2;
      await hs.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: F[label].id, navigation: "NAVIGATE", transition: tr, preserveScrollPosition: false }] }]);
      n++;
    }
  }
  figma.closePlugin(`v5.4: ${n} chip hotspots (44 pt tall) linking 05 ⇄ 63–66.`);
})().catch((e) => figma.closePlugin("v5.4 stopped: " + e.message));
