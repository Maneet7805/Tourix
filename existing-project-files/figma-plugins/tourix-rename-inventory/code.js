// Tourix – Rename & Inventory. Command "rename": replaces the old brand name in text, layer names,
// component descriptions, page names and the file name. Command "inventory": read-only export.
const REPL = [[/Tourix \(Malay: trail, footprint\)\. /g, "Tourix. "], [/TOURIX/g, "TOURIX"], [/Tourix/g, "Tourix"], [/tourix/g, "tourix"]];
const swap = (s) => REPL.reduce((a, [re, to]) => a.replace(re, to), s);
const has = (s) => typeof s === "string" && /tourix/i.test(s);

async function rename() {
  const log = { text: 0, names: 0, desc: 0, pages: 0, file: "unchanged", errors: [] };
  try { if (has(figma.root.name)) { figma.root.name = swap(figma.root.name); log.file = figma.root.name; } } catch (e) { log.errors.push("file name: " + e.message); }
  for (const page of figma.root.children) {
    await page.loadAsync();
    if (has(page.name)) { page.name = swap(page.name); log.pages++; }
    const nodes = page.findAll(() => true);
    // main components first so instances inherit; then everything else
    nodes.sort((a, b) => (a.type === "COMPONENT" || a.type === "COMPONENT_SET" ? -1 : 0) - (b.type === "COMPONENT" || b.type === "COMPONENT_SET" ? -1 : 0));
    for (const n of nodes) {
      try {
        if (has(n.name) && n.type !== "INSTANCE") { n.name = swap(n.name); log.names++; }
        if ((n.type === "COMPONENT" || n.type === "COMPONENT_SET") && has(n.description)) { n.description = swap(n.description); log.desc++; }
        if (n.type === "TEXT" && has(n.characters)) {
          const fonts = n.getStyledTextSegments(["fontName"]).map((s) => s.fontName);
          for (const f of fonts) await figma.loadFontAsync(f);
          const segs = n.getStyledTextSegments(["fills"]);
          const before = n.characters; const after = swap(before);
          if (after !== before) {
            n.characters = after;
            // restore per-range fills (e.g. the kaya-highlighted words in a headline) by re-applying segment fills at the same offsets
            for (const s of segs) { const end = Math.min(s.end, after.length); if (s.start < end) n.setRangeFills(s.start, end, s.fills); }
            log.text++;
          }
        }
      } catch (e) { log.errors.push(n.name + ": " + e.message); }
    }
  }
  figma.closePlugin(`Renamed: ${log.text} text layers, ${log.names} layer names, ${log.desc} descriptions, ${log.pages} pages, file: ${log.file}. ${log.errors.length} errors${log.errors.length ? " – " + log.errors.slice(0, 3).join(" | ") : ""}`);
}

const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
async function inventory() {
  const out = { file: figma.root.name, exported: new Date().toISOString(), pages: [], variables: [], textStyles: [], effectStyles: [], components: [] };
  for (const col of await figma.variables.getLocalVariableCollectionsAsync()) {
    for (const id of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id); const val = v.valuesByMode[col.modes[0].modeId];
      out.variables.push({ c: col.name, n: v.name, t: v.resolvedType, v: v.resolvedType === "COLOR" ? hex(val) : val, d: v.description || undefined });
    }
  }
  for (const s of await figma.getLocalTextStylesAsync()) out.textStyles.push({ n: s.name, f: s.fontName.family + " " + s.fontName.style, s: s.fontSize, lh: s.lineHeight.value, ls: s.letterSpacing.value, tc: s.textCase });
  for (const s of await figma.getLocalEffectStylesAsync()) out.effectStyles.push({ n: s.name, e: s.effects.map((e) => e.type + (e.radius !== undefined ? " r" + e.radius : "") + (e.offset ? " y" + e.offset.y : "") + (e.color ? " a" + (+e.color.a).toFixed(2) : "")) });
  for (const page of figma.root.children) {
    await page.loadAsync();
    const P = { name: page.name, flows: (page.flowStartingPoints || []).map((f) => f.name), top: [] };
    const nameOf = async (id) => { const d = await figma.getNodeByIdAsync(id); return d ? d.name : "?" + id; };
    for (const sec of page.children) {
      const kids = sec.type === "SECTION" ? sec.children : [sec];
      const S = { name: sec.name, type: sec.type, frames: [] };
      for (const f of kids) {
        const F = { name: f.name, type: f.type, w: Math.round(f.width), h: Math.round(f.height) };
        if (f.type === "FRAME" && page.name.indexOf("Mobile") >= 0 && !/^Label/.test(f.name)) {
          F.fixed = f.numberOfFixedChildren;
          const texts = f.findAll((n) => n.type === "TEXT").map((t) => t.characters.replace(/\s+/g, " ").slice(0, 90));
          F.text = [...new Set(texts)].slice(0, 70);
          F.links = [];
          for (const n of f.findAll((x) => x.reactions && x.reactions.length)) {
            for (const r of n.reactions) for (const a of (r.actions || [])) {
              if (a.type === "BACK") F.links.push([n.name, r.trigger.type, "BACK"]);
              else if (a.type === "NODE" && a.navigation !== "CHANGE_TO") F.links.push([n.name, r.trigger.type, a.navigation, await nameOf(a.destinationId), a.transition ? a.transition.type : "INSTANT"]);
            }
          }
          if (f.reactions && f.reactions.length) for (const r of f.reactions) for (const a of (r.actions || [])) if (a.destinationId) F.links.push(["(frame)", r.trigger.type + (r.trigger.timeout ? " " + r.trigger.timeout + "s" : ""), a.navigation, await nameOf(a.destinationId), a.transition ? a.transition.type : "INSTANT"]);
        }
        S.frames.push(F);
      }
      P.top.push(S);
    }
    for (const c of page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })) {
      if (c.type === "COMPONENT" && c.parent && c.parent.type === "COMPONENT_SET") continue;
      const C = { page: page.name, n: c.name, t: c.type, d: c.description || "", w: Math.round(c.width), h: Math.round(c.height) };
      try { C.props = Object.entries(c.componentPropertyDefinitions || {}).map(([k, v]) => k.split("#")[0] + ":" + v.type); } catch (e) { C.props = []; }
      if (c.type === "COMPONENT_SET") {
        C.variants = c.children.map((v) => v.name);
        const inter = []; for (const v of c.children) for (const r of (v.reactions || [])) for (const a of (r.actions || [])) if (a.navigation === "CHANGE_TO") inter.push(v.name + " –" + r.trigger.type + "→ " + ((await figma.getNodeByIdAsync(a.destinationId)) || {}).name);
        C.interactions = inter;
      }
      out.components.push(C);
    }
    out.pages.push(P);
  }
  const json = JSON.stringify(out);
  figma.showUI(__html__, { width: 460, height: 420 });
  figma.ui.postMessage({ json });
  figma.ui.onmessage = (m) => { figma.notify(m.copied ? "Inventory copied to clipboard (" + json.length + " chars)" : "Copy failed – use the Copy button"); };
}
if (figma.command === "rename") rename().catch((e) => figma.closePlugin("Rename failed: " + e.message));
else inventory().catch((e) => figma.closePlugin("Inventory failed: " + e.message));
