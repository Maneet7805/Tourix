// Read-only: dumps the Filters row of 05 Explore (and 63) with fills, text and component info.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  let out = "";
  const paint = (n) => ("fills" in n && Array.isArray(n.fills) ? n.fills.map((p) => p.type === "SOLID" ? `${Math.round(p.color.r * 255)},${Math.round(p.color.g * 255)},${Math.round(p.color.b * 255)}@${p.opacity}` : p.type).join("+") : "");
  const walk = async (n, d) => {
    let extra = ""; if (n.type === "INSTANCE") { const m = await n.getMainComponentAsync(); extra = " main=" + (m ? m.name : "?") + " props=" + JSON.stringify(n.componentProperties); }
    out += "  ".repeat(d) + `${n.type} "${n.name}" ${Math.round(n.width)}×${Math.round(n.height)} vis=${n.visible} op=${n.opacity} fill=${paint(n)}${n.type === "TEXT" ? ' text="' + n.characters + '"' : ""}${extra} reactions=${(n.reactions || []).length}\n`;
    if ("children" in n && d < 4) for (const c of n.children) await walk(c, d + 1);
  };
  for (const nm of ["05 Explore – Search", "63 Explore – Places"]) { const f = mob.findOne((x) => x.type === "FRAME" && x.name === nm); const fl = f && f.findOne((x) => x.name === "Filters"); out += nm + "\n"; if (fl) await walk(fl, 1); }
  figma.showUI(`<textarea style="width:100%;height:95vh;font:11px monospace">${out.replace(/</g, "&lt;")}</textarea>`, { width: 900, height: 820 });
})();
