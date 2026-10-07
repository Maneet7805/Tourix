// ===================== TOURIX v4 · one 3D carousel: Top picks move into the Home hero (5 Oct 2026) =====================
// Approved by the project owner ("feels repetitive, put the Top recommendations style in the hero").
// Restyles the Top Recommendations (3D) cover-flow for the dark hero (glow, dashed orbit, floor shadow, kelip-kelip
// fireflies that drift as it turns, light controls), puts it in place of the 3D Showcase on 04 Home, and removes the
// duplicate section from the body. The 3D Showcase component stays in the Design System (unused on Home).
const CHANGES = [];
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }
async function setChars(t, s) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; }
const recolor = (node, key) => { for (const v of node.findAll((n) => n.type === "VECTOR")) if (v.strokes && v.strokes.length) v.strokes = [solid(key)]; };
const FLIES = [[18, 40], [62, 132], [30, 250], [96, 18], [300, 30], [334, 120], [318, 236], [262, 8], [150, 6], [210, 360]];

async function restylePanel(set) {
  let k = 0;
  for (const v of set.children) {
    // controls for a dark surface
    const prev = v.findOne((n) => n.name === "Prev"), next = v.findOne((n) => n.name === "Next");
    if (prev) { paintTo(prev, "onDark", 0.1); prev.strokes = [solid("onDark")]; prev.strokeWeight = 1; setOpacity(prev, "strokes", 0.35); recolor(prev, "onDark"); }
    if (next) { paintTo(next, "kaya400"); recolor(next, "pandan900"); }
    const dots = v.findOne((n) => n.name === "Dots");
    if (dots) for (const d of dots.children) { if (d.width > 10) paintTo(d, "kaya400"); else paintTo(d, "onDark", 0.35); }
    // atmosphere (bottom of the stack, same names in every variant so smart animate drifts them)
    const W2 = v.width;
    const glow = ellipse(null, "Glow", 300, 260, "kaya400", 0.14); v.insertChild(0, glow); glow.x = (W2 - 300) / 2; glow.y = 40; glow.effects = [{ type: "LAYER_BLUR", radius: 90, visible: true }];
    const orbit = figma.createEllipse(); orbit.name = "Orbit"; v.insertChild(1, orbit); orbit.resize(330, 70); orbit.x = (W2 - 330) / 2; orbit.y = 288; orbit.fills = [];
    orbit.strokes = [solid("kaya400")]; orbit.strokeWeight = 1.5; orbit.dashPattern = [2, 8]; setOpacity(orbit, "strokes", 0.45);
    const floor = ellipse(null, "Floor shadow", 200, 26, "black", 0.45); v.insertChild(2, floor); floor.x = (W2 - 200) / 2; floor.y = 312; floor.effects = [{ type: "LAYER_BLUR", radius: 20, visible: true }];
    FLIES.forEach(([x, y], i) => {
      const f = ellipse(null, "Firefly " + (i + 1), 5, 5, "kaya400", 0.35 + ((i * 7 + k * 3) % 6) / 10); v.insertChild(3 + i, f);
      f.x = x + (((i * 37 + k * 53) % 21) - 10); f.y = y + (((i * 29 + k * 41) % 17) - 8);
      f.effects = [{ type: "DROP_SHADOW", color: { r: 0.95, g: 0.76, b: 0.31, a: 0.9 }, offset: { x: 0, y: 0 }, radius: 8, spread: 1, visible: true, blendMode: "NORMAL" }];
    });
    k++;
  }
  paintTo(set, "pandan900");
  set.description = "3D cover-flow of recommended destinations, styled for the dark Home hero (v4): glow, dashed orbit, floor shadow and kelip-kelip fireflies that drift as it turns. Drag the front card, tap a side card or the arrows; tap the front card to open its guide. No auto-play. Intro variant animates in when Home opens.";
  CHANGES.push(`Top Recommendations (3D): ${set.children.length} variants restyled for the dark hero (glow, orbit, floor shadow, 10 fireflies, light controls)`);
}

async function main() {
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync(); await loadComponents(ds);
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  const home = MOB.findOne((n) => n.type === "FRAME" && n.name === "04 Home" && n.parent && n.parent.type === "SECTION");
  const set = MOB.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Top Recommendations (3D)");
  if (!home || !set) { figma.closePlugin("Home or the Top Recommendations component wasn't found; nothing changed."); return; }
  if (home.findOne((n) => n.name === "3D picks wrap")) { figma.closePlugin("v4 already applied."); return; }
  try { await figma.saveVersionHistoryAsync("Before Tourix v4 (two carousels on Home)", "Saved by the Tourix v4 plugin."); CHANGES.push("Version saved: 'Before Tourix v4 (two carousels on Home)'"); } catch (e) { PROBLEMS.push("Version not saved: " + e.message); }
  await run("Restyle", () => restylePanel(set));
  await run("Hero", async () => {
    const wrap = home.findOne((n) => n.name === "3D showcase wrap"); if (!wrap) throw new Error("3D showcase wrap not found");
    const hd = wrap.parent;
    const eb = await T(null, "TOP PICKS FOR YOU · SWIPE", "Eyebrow", "kaya400", { name: "Picks eyebrow" }); hd.insertChild(hd.children.indexOf(wrap), eb);
    for (const c of [...wrap.children]) c.remove();
    wrap.name = "3D picks wrap";
    const intro = set.children.find((v) => v.name === "Front=Intro");
    const inst = intro.createInstance(); inst.name = "Top picks (3D)"; wrap.appendChild(inst);
    CHANGES.push("04 Home hero: 3D Showcase replaced by the Top picks cover-flow (same links: Penang → 06, others → 27–31)");
  });
  await run("Body", async () => {
    const old = home.findOne((n) => n.name === "Top recommendations" && n.type === "FRAME"); if (old) { old.remove(); CHANGES.push("04 Home body: duplicate 'Top recommendations' section removed; body now starts with Explore by mood"); }
  });
  await run("Fit", async () => {
    const c = home.findOne((n) => n.name === "Content" && n.parent === home); home.resize(W, Math.max(H, Math.ceil(deepH(c))));
    const cap = MOB.findOne((n) => n.name === "Label · 04 Home"); if (cap) { const t = cap.findAll((n) => n.type === "TEXT")[1]; if (t) await setChars(t, "Hero: Top picks 3D cover-flow (drag, tap a side card or the arrows; tap the front card to open Penang or a country guide). Moods, phrase card and nearby below."); }
  });
  await run("Loading skeleton", async () => {
    const lf = MOB.findOne((n) => n.type === "FRAME" && n.name === "24 Home – Loading" && n.parent && n.parent.type === "SECTION");
    const big = lf && lf.findAll((n) => n.name === "Skeleton" && Math.round(n.height) === 300)[0]; if (big) { big.resize(big.width, 400); CHANGES.push("24 Loading: hero skeleton matches the taller picks carousel"); }
  });
  await run("Showcase note", async () => { if (C.showcase) C.showcase.description = (C.showcase.description || "") + " Not used on Home since v4 (5 Oct 2026); kept in the Design System."; });
  await run("Read me", async () => {
    const r = MOB.findOne((x) => x.type === "FRAME" && x.name.startsWith("Read me")); if (!r) return;
    const b = AL("VERTICAL", "Block/v4", 8); add(r, b, true); pad(b, 24); radius(b, 20); paintTo(b, "pandan100");
    await T(b, "v4 · one 3D carousel (5 Oct 2026)", "Heading/M", "ink", { fill: true });
    await T(b, "•  The Home hero now holds the Top picks cover-flow (styled with glow, orbit and fireflies). The separate country showcase and the duplicate section below were removed, so Home has one 3D moment.", "Body/S", "ink", { fill: true });
  });
  const linked = await applyLinks();
  const v3 = MOB.findOne((n) => n.type === "FRAME" && n.name === "Build log · v3");
  if (v3) { await T(v3, "v4 (5 Oct 2026)", "Heading/S", "ink"); for (const c of CHANGES) await T(v3, "✓ " + c, "Body/S", "ink", { fill: true }); for (const p of PROBLEMS) await T(v3, "• " + p, "Mono/S", "bunga", { fill: true }); }
  figma.viewport.scrollAndZoomIntoView([home]);
  figma.closePlugin(`Tourix v4: ${CHANGES.length} changes.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s): ` + PROBLEMS.join(" | ") : " No issues."));
}
main().catch((e) => figma.closePlugin("v4 stopped: " + e.message));
