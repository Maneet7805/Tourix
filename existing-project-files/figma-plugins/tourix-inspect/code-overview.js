// Read-only: lists pages, sections and screens (with size and outgoing link count) in a plugin window.
(async () => {
  let out = "";
  for (const page of figma.root.children) {
    await page.loadAsync(); out += `PAGE ${page.name} (flows: ${(page.flowStartingPoints || []).map((f) => f.name).join(", ")})\n`;
    for (const sec of page.children) {
      out += `  ${sec.type} "${sec.name}"\n`;
      if (sec.type === "SECTION") for (const f of sec.children.filter((n) => n.type === "FRAME" && /^\d\d /.test(n.name))) {
        const links = f.findAll((n) => n.reactions && n.reactions.some((r) => (r.actions || [r.action]).some((a) => a && (a.type === "NODE" || a.type === "BACK")))).length;
        out += `     ${f.name}  ${Math.round(f.width)}×${Math.round(f.height)}  links:${links}\n`;
      }
    }
  }
  figma.showUI(`<textarea style="width:100%;height:95vh;font:11px monospace">${out.replace(/</g, "&lt;")}</textarea>`, { width: 640, height: 820 });
})();
