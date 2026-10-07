// v5.1 (7 Oct 2026): cloning 04 Home for 73/74 also cloned its flow starting point ("2 · Returning user (Home)" ×3).
// Rebuilds the flow list (1–6 unchanged) and adds 7 · Destinations (32), 8 · Offline mode (73), 9 · Bahasa Melayu (74).
// Also reports the v5 build-log lines so problems are visible.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const fr = (nm) => mob.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION");
  const home = fr("04 Home"), d32 = fr("32 Destination – Kuala Lumpur"), o73 = fr("73 Home – Offline"), b74 = fr("74 Home – Bahasa Melayu");
  const keep = mob.flowStartingPoints.filter((f) => !(f.name.startsWith("2 ·") && home && f.nodeId !== home.id) && !/^[789] ·/.test(f.name));
  const add = []; if (d32) add.push({ nodeId: d32.id, name: "7 · Destinations" }); if (o73) add.push({ nodeId: o73.id, name: "8 · Offline mode" }); if (b74) add.push({ nodeId: b74.id, name: "9 · Bahasa Melayu" });
  mob.flowStartingPoints = keep.concat(add);
  const log = mob.findOne((n) => n.type === "FRAME" && n.name === "Build log · v3"); let lines = [];
  if (log) { const t = log.findAll((n) => n.type === "TEXT").map((n) => n.characters); const i = t.indexOf("v5 (7 Oct 2026)"); lines = t.slice(i + 1).filter((s) => s.startsWith("•") || s.startsWith("Links")); }
  figma.closePlugin(`v5.1: flows = ${mob.flowStartingPoints.map((f) => f.name).join(" / ")}. v5 log: ${lines.join(" | ") || "no problems"}`);
})().catch((e) => figma.closePlugin("v5.1 stopped: " + e.message));
