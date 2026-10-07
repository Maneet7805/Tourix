// v5.7 (7 Oct 2026): after v5.6 the "Lebuh Armenian" anchor dot on 70 sat on the Kedai Kopi card.
// Puts the anchor in the gap right of Kedai Kopi and above Lebuh Armenian, and redraws the dashed leader to it.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const f = mob.findOne((x) => x.type === "FRAME" && x.name.startsWith("70 AR Lens") && x.parent && x.parent.type === "SECTION");
  const lab = "AR label · Lebuh Armenian";
  const card = f.children.find((c) => c.name === lab), a = f.children.find((c) => c.name === lab + " · anchor"), ln = f.children.find((c) => c.name === lab + " · leader");
  const kopi = f.children.find((c) => c.name === "AR label · Kedai Kopi");
  if (!card || !a || !ln || !kopi) return figma.closePlugin("v5.7: layers not found");
  const rel = (n) => { const b = n.absoluteBoundingBox, fb = f.absoluteBoundingBox; return { x: b.x - fb.x, y: b.y - fb.y, w: b.width, h: b.height }; };
  const k = rel(kopi), c = rel(card);
  const ax = Math.round(Math.min(393 - 40, k.x + k.w + 22)), ay = Math.round((k.y + k.h + c.y) / 2);
  const x1 = card.x + 24, y1 = card.y + 50, bx = Math.min(x1, ax) - 2, by = Math.min(y1, ay) - 2, bw = Math.abs(ax - x1) + 4, bh = Math.abs(ay - y1) + 4;
  const vec = ln.findOne((n) => n.type === "VECTOR"); const sp = vec && vec.strokes[0] && vec.strokes[0].color;
  const hex = sp ? "#" + [sp.r, sp.g, sp.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("") : "#F2C14E";
  const nl = figma.createNodeFromSvg(`<svg width="${bw}" height="${bh}" viewBox="0 0 ${bw} ${bh}" xmlns="http://www.w3.org/2000/svg"><path d="M${x1 - bx} ${y1 - by} L${ax - bx} ${ay - by}" stroke="${hex}" stroke-width="1.5" stroke-dasharray="3 4"/></svg>`);
  nl.name = ln.name; f.insertChild(f.children.indexOf(ln), nl); nl.x = bx; nl.y = by; ln.remove();
  a.x = ax - 7; a.y = ay - 7;
  figma.closePlugin(`v5.7: anchor at ${ax},${ay}; leader redrawn`);
})().catch((e) => figma.closePlugin("v5.7 stopped: " + e.message));
