// v5.3 (7 Oct 2026): diagnose + fix the Explore filter chips (some rendered as blank dark pills on 05).
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync();
  const set = ds.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Filter Chip");
  const v = (st) => set.children.find((c) => c.name === "State=" + st);
  const key = Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith("Label"));
  const screens = { "05 Explore – Search": "All", "63 Explore – Places": "Places", "64 Explore – Experiences": "Experiences", "65 Explore – Food": "Food", "66 Explore – Phrases": "Phrases" };
  const report = [];
  for (const [nm, active] of Object.entries(screens)) {
    const f = mob.findOne((x) => x.type === "FRAME" && x.name === nm); if (!f) continue;
    const filters = f.findOne((x) => x.name === "Filters"); if (!filters) continue;
    for (const ch of filters.children.filter((x) => x.type === "INSTANCE")) {
      const label = ch.name.replace("Chip/", ""); const main = await ch.getMainComponentAsync();
      if (nm.startsWith("05")) report.push(`${label}:${main ? main.name : "?"}`);
      const reactions = ch.reactions;
      ch.swapComponent(v(label === active ? "Active" : "Default"));
      try { ch.setProperties({ [key]: label }); } catch (e) { report.push("prop " + e.message); }
      for (const t of ch.findAll((x) => x.type === "TEXT")) { t.visible = true; }
      await ch.setReactionsAsync(reactions);
    }
  }
  figma.closePlugin("v5.3: 05 chips were " + report.join(", ") + " — reset to the right state on 05 and 63–66.");
})().catch((e) => figma.closePlugin("v5.3 stopped: " + e.message));
