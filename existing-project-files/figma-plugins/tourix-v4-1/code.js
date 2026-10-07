// v4.1 (5 Oct 2026): the Prev button in the Top picks carousel rendered solid white (Figma reset the translucent
// variable-bound fill to 100 %), hiding its arrow. Writes an unbound 12 % fill, a 35 % outline and a light arrow.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const set = mob.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Top Recommendations (3D)");
  if (!set) { figma.closePlugin("Top Recommendations (3D) not found"); return; }
  const L = { r: 0xF4 / 255, g: 0xF7 / 255, b: 0xF3 / 255 }; let n = 0;
  for (const v of set.children) {
    const p = v.findOne((x) => x.name === "Prev"); if (!p) continue;
    p.fills = [{ type: "SOLID", color: L, opacity: 0.12 }];
    p.strokes = [{ type: "SOLID", color: L, opacity: 0.35 }]; p.strokeWeight = 1; p.strokeAlign = "INSIDE";
    for (const vec of p.findAll((x) => x.type === "VECTOR")) vec.strokes = [{ type: "SOLID", color: L }];
    n++;
  }
  figma.closePlugin(`v4.1: Prev button fixed on ${n} variants (fill opacity now ${set.children[1] && set.children[1].findOne((x) => x.name === "Prev").fills[0].opacity})`);
})().catch((e) => figma.closePlugin("v4.1 stopped: " + e.message));
