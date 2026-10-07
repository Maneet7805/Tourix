// ===================== TOURIX v2.1 · small fixes after the v2 walkthrough =====================
const CHANGES = []; const TR2 = TR;
async function main() {
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync(); await loadComponents(ds);
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  const fr = (nm) => MOB.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION");
  for (const [k, nm] of [["trips", "10 Trips"], ["tripsAdded", "09 Trips – Just added"], ["allTrips", "18 Trips – All trips"], ["newTrip", "17 Trips – New trip (sheet)"]]) { S[k] = fr(nm); if (!S[k]) PROBLEMS.push("Missing " + nm); }
  if (MOB.findOne((n) => n.name === "Hotspot/All trips")) { figma.closePlugin("v2.1 already applied."); return; }
  await run("Showcase pause paint", async () => {
    let n = 0;
    for (const v of C.showcase.children.filter((x) => /Motion=Auto/.test(x.name))) {
      const b = v.findOne((x) => x.name === "Pause"); if (!b) continue;
      b.fills = [{ type: "SOLID", color: rgb(HEX.onDark), opacity: 0.12 }]; b.strokes = [{ type: "SOLID", color: rgb(HEX.onDark), opacity: 0.4 }]; n++;
    }
    CHANGES.push("Showcase pause button: translucent fill restored on " + n + " variants (was solid white, icon invisible)");
  });
  await run("All trips link", async () => {
    for (const k of ["trips", "tripsAdded"]) {
      const row = S[k] && S[k].findOne((x) => x.name === "Title row"); const nt = row && row.findOne((x) => x.name === "New trip"); if (!nt) { PROBLEMS.push("No title row in " + k); continue; }
      const grp = AL("HORIZONTAL", "Actions", 4); grp.counterAxisAlignItems = "CENTER"; row.insertChild(row.children.indexOf(nt), grp);
      const t = await T(null, "All trips", "Label/M", "pandan500", { name: "All trips" });
      const hs = AL("HORIZONTAL", "Hotspot/All trips"); hs.counterAxisAlignItems = "CENTER"; pad(hs, 12, 8); hs.appendChild(t); grp.appendChild(hs); grp.appendChild(nt);
      link(hs, "allTrips", "push");
    }
    CHANGES.push("09/10 Trips: 'All trips' link added next to New trip (18 was only reachable by creating a trip)");
  });
  await run("Melaka trip card", async () => {
    const card = S.allTrips.findOne((x) => x.name === "Trip/Melaka day trip");
    if (card) { await card.setReactionsAsync([]); const ch = card.findOne((x) => x.name === "icon/chevRight"); if (ch) ch.visible = false; CHANGES.push("18: Melaka trip card no longer opens the Penang plan; chevron hidden"); }
  });
  await run("New trip background", async () => {
    const bg = S.newTrip.findOne((x) => x.name === "Background photo"); if (bg) { bg.resize(W, 420); CHANGES.push("17: background photo cropped like the Melaka hero"); }
  });
  const linked = await applyLinks();
  const log = MOB.findOne((n) => n.type === "FRAME" && n.name === "Build log · v2");
  if (log) { await T(log, "v2.1 fixes", "Heading/S", "ink"); for (const c of CHANGES) await T(log, "✓ " + c, "Body/S", "ink", { fill: true }); for (const p of PROBLEMS) await T(log, "• " + p, "Mono/S", "bunga", { fill: true }); }
  figma.closePlugin(`Tourix v2.1: ${CHANGES.length} fixes, ${linked} links.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s): ` + PROBLEMS.join(" | ") : " No issues."));
}
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }
main().catch((e) => figma.closePlugin("v2.1 stopped: " + e.message));
