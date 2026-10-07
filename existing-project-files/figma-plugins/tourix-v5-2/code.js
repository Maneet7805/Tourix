// v5.2 (7 Oct 2026): on the bottom-sheet screens a tap on any non-interactive part of the sheet fell through to the
// full-screen scrim and closed the sheet. The scrim now only covers the area above the sheet. Also hides chevrons on
// share-sheet options that don't open anything.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  let n = 0, c = 0;
  for (const nm of ["17 Trips – New trip (sheet)", "58 Trips – Share plan (sheet)", "60 Trips – Invite a friend (sheet)", "62 Home – Location (sheet)"]) {
    const f = mob.findOne((x) => x.type === "FRAME" && x.name === nm && x.parent && x.parent.type === "SECTION"); if (!f) continue;
    const scrim = f.children.find((x) => x.name === "Scrim"), sheet = f.children.find((x) => x.name === "Sheet");
    if (scrim && sheet && sheet.y > 20) { scrim.resize(scrim.width, Math.round(sheet.y + 28)); n++; }
  }
  const share = mob.findOne((x) => x.type === "FRAME" && x.name === "58 Trips – Share plan (sheet)");
  if (share) for (const r of share.findAll((x) => /^Option\//.test(x.name))) { const linked = r.reactions && r.reactions.length; const ch = r.findOne((x) => x.name === "icon/chevRight"); if (ch && !linked) { ch.visible = false; c++; } }
  figma.closePlugin(`v5.2: scrim trimmed on ${n} sheets; ${c} chevrons hidden.`);
})().catch((e) => figma.closePlugin("v5.2 stopped: " + e.message));
