// v5.6 (7 Oct 2026): on 70 AR Lens – Phrases the "Lebuh Armenian" label ran past the right screen edge.
// Shifts card + leader + anchor left together so the card's right edge sits 16 pt inside the screen.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const f = mob.findOne((x) => x.type === "FRAME" && x.name.startsWith("70 AR Lens") && x.parent && x.parent.type === "SECTION");
  if (!f) return figma.closePlugin("v5.6: frame 70 not found");
  const lab = "AR label · Lebuh Armenian";
  const card = f.children.find((c) => c.name === lab); if (!card) return figma.closePlugin("v5.6: label not found");
  const fb = f.absoluteBoundingBox, cb = card.absoluteBoundingBox; // render bounds are clipped by the screen, so use the box
  const over = Math.ceil(cb.x + cb.width - (fb.x + fb.width - 16));
  // after moving left it overlapped the Tandas card, so lift the group until it clears Tandas by 12 pt (idempotent)
  const tan = f.children.find((c) => c.name === "AR label · Tandas"); const tb = tan.absoluteBoundingBox;
  const up = Math.max(0, Math.ceil(cb.y + cb.height + 12 - tb.y));
  let n = 0; for (const x of f.children.filter((c) => c.name === lab || c.name === lab + " · leader" || c.name === lab + " · anchor")) { if (over > 0) x.x -= over; x.y -= up; n++; }
  figma.closePlugin("v5.6: " + n + " layers, left " + Math.max(0, over) + " pt, up " + up + " pt");
})().catch((e) => figma.closePlugin("v5.6 stopped: " + e.message));
