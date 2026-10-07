// Tourix – Mobile Prototype Builder (Figma development plugin)
// Builds a linked, high-fidelity iOS prototype (393×852) in the "Tourix – Malaysia Discovery App" file,
// reusing the Design System components already in the file. Also repairs known defects in that file.
// Run: Figma desktop → Plugins → Development → Import plugin from manifest… → run "Tourix – Build Mobile Prototype".

const W = 393, H = 852;
const IDS = {
  dsPage: "2:2", landingPage: "0:1", desktop: "9:2",
  logo: "5:17", btn: "5:58", chip: "5:69", save: "5:79", dest: "6:154", exp: "6:236",
  tile: "6:266", sf: "6:284", benefit: "6:287", showcaseCard: "7:33", showcase: "7:602",
};
const ICON_IDS = { mountain: "6:3", landmark: "6:6", utensils: "6:14", palm: "6:19", building: "6:25", compass: "6:34", gem: "6:38", route: "6:43", languages: "6:48", pin: "6:56", clock: "6:60", sun: "6:64", search: "6:75", calendar: "6:79", users: "6:85", heart: "6:91" };
const HEX = { pandan900: "#0B2A21", pandan700: "#155240", pandan500: "#2E7D5B", pandan100: "#E3EFE8", kaya400: "#F2C14E", kaya500: "#E0A82E", kaya100: "#FBEFCF", bunga: "#C7362F", mist: "#F4F7F3", surface: "#FFFFFF", ink: "#13201B", muted: "#4E5E57", line: "#D7E0DA", onDark: "#F4F7F3", onDarkMuted: "#B9CCC2", black: "#000000" };
const VID = { pandan900: "VariableID:2:5", pandan700: "VariableID:2:6", pandan500: "VariableID:2:7", pandan100: "VariableID:2:8", kaya400: "VariableID:2:9", kaya500: "VariableID:2:10", kaya100: "VariableID:2:11", bunga: "VariableID:2:12", mist: "VariableID:2:13", surface: "VariableID:2:14", ink: "VariableID:2:15", muted: "VariableID:2:16", line: "VariableID:2:17", onDark: "VariableID:2:18", onDarkMuted: "VariableID:2:19" };
const IMG = { heroPenang: "30017fe4266d8439b0b32ce42b4b707a64b2c15c", kl: "a4c0249cfa1d805684a8634b65cc2caa0f2758d3", penangUmbrella: "50f14ecfdaaf839a74a39d3f283ed6b00719cb3a", langkawi: "262b2ce52fe130e8d9b7a0dccedadf71160f7eff", melaka: "f593d38118923978a3fbab8960799372e53566fa", cameron: "bdc0f5371a917b77c8ca8fa4c8bfa97f785685eb", sabah: "ba7075c38ee54aff36a51d2c1dd669410e1fd95f", nature: "63f864e006a75bfa13beecaf7594d7cde3dfc1a3", heritage: "30ef27b176b660c723ed4cbeba2b756689b3256b", food: "fddae5d4387afe20e93d130ccf97afcc9f6f7d01", islands: "2fd224cc5d9af67616a3854e94a93a916044ca2f", city: "796b4734375d9f7752e2833b9feefae17829255e", batu: "4d0b970e159acae810aa7cbbeb6de6833ffccfef", tea: "9552201abe3fddc5e084d813baa701550d19571c", mosque: "f72c57c0ad0706be35df62d2f0ed7dd99f14e6a6", klAerial: "4c603315b706615994a69d5b36b04bb75fe1114b", islandAerial: "895c161fd30f07a18895fa5d5afb22210208d0d5", rainforest: "a2d1f21f1dccab3cc2cc5ee74c8bbc0ee17a1e1d" };

const ICONS = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevRight: '<path d="m9 18 6-6-6-6"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>',
  user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
  volume: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sync: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
  type: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
  contrast: '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  play: '<path d="M6 3v18l15-9z"/>',
  ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  wave: '<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/>',
};

// ---------- runtime state ----------
const V = {}; const TS = {}; const ES = {}; const C = {}; const S = {};
const LINKS = []; const PROBLEMS = [];
let MOB = null; // mobile page

// ---------- low-level helpers ----------
const rgb = (h) => { const n = parseInt(h.slice(1), 16); return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 }; };
function solid(key) {
  let p = { type: "SOLID", color: rgb(HEX[key] || key) };
  if (V[key]) { try { p = figma.variables.setBoundVariableForPaint(p, "color", V[key]); } catch (e) { /* keep raw */ } }
  return p;
}
// Assign a (variable-bound) colour. Figma resets opacity to 100% when a fresh bound paint is assigned,
// so translucent paints are written in two steps, falling back to an unbound paint if needed.
function paintTo(node, key, op = 1, prop = "fills") {
  node[prop] = [solid(key)];
  if (op !== 1) {
    const arr = JSON.parse(JSON.stringify(node[prop]));
    arr[0].opacity = op;
    node[prop] = arr;
    const got = node[prop][0] && node[prop][0].opacity;
    if (typeof got !== "number" || Math.abs(got - op) > 0.01) node[prop] = [{ type: "SOLID", color: rgb(HEX[key] || key), opacity: op }];
  }
}
function setOpacity(node, prop, op) {
  if (!node || !Array.isArray(node[prop]) || !node[prop].length) return;
  const arr = JSON.parse(JSON.stringify(node[prop]));
  arr.forEach((p) => { p.opacity = op; });
  node[prop] = arr;
  const got = node[prop][0] && node[prop][0].opacity;
  if (typeof got !== "number" || Math.abs(got - op) > 0.01) {
    // Figma reset the opacity of a variable-bound paint: fall back to an unbound paint of the same colour
    node[prop] = arr.map((p) => (p.type === "SOLID" ? { type: "SOLID", color: p.color, opacity: op } : p));
  }
}
// Height of a node computed from its children, so we don't depend on auto layout having reflowed yet
function deepH(n) {
  if (!n || n.visible === false) return 0;
  const isAuto = (n.type === "FRAME" || n.type === "COMPONENT") && n.layoutMode && n.layoutMode !== "NONE";
  if (!isAuto) return n.height;
  const kids = n.children.filter((c) => c.visible !== false && c.layoutPositioning !== "ABSOLUTE");
  if (n.layoutMode === "VERTICAL" && n.primaryAxisSizingMode === "AUTO") {
    return n.paddingTop + n.paddingBottom + kids.reduce((s, c) => s + deepH(c), 0) + Math.max(0, kids.length - 1) * n.itemSpacing;
  }
  if (n.layoutMode === "HORIZONTAL" && n.counterAxisSizingMode === "AUTO" && n.layoutWrap !== "WRAP") {
    return n.paddingTop + n.paddingBottom + Math.max(0, ...kids.map(deepH));
  }
  return n.height;
}
const img = (k, scaleMode = "FILL") => ({ type: "IMAGE", imageHash: IMG[k], scaleMode });
function vgrad(key, a0, a1, p0 = 0, p1 = 1) {
  const c = rgb(HEX[key]);
  return { type: "GRADIENT_LINEAR", gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: [{ position: p0, color: { r: c.r, g: c.g, b: c.b, a: a0 } }, { position: p1, color: { r: c.r, g: c.g, b: c.b, a: a1 } }] };
}
function radius(node, r) { node.cornerRadius = r; }
async function effect(node, name, fallback) {
  if (ES[name]) { try { await node.setEffectStyleIdAsync(ES[name].id); return; } catch (e) { /* fall through */ } }
  if (fallback) node.effects = fallback;
}
const SHADOW1 = [{ type: "DROP_SHADOW", color: { r: 0.04, g: 0.16, b: 0.13, a: 0.08 }, offset: { x: 0, y: 4 }, radius: 14, spread: 0, visible: true, blendMode: "NORMAL" }];
const SHADOW2 = [{ type: "DROP_SHADOW", color: { r: 0.04, g: 0.16, b: 0.13, a: 0.16 }, offset: { x: 0, y: 14 }, radius: 36, spread: -4, visible: true, blendMode: "NORMAL" }];

function AL(dir, name, gap = 0) {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = dir;
  f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = gap; f.fills = []; f.clipsContent = false;
  return f;
}
// fixed-width auto-layout column / row (width fixed, height hugs)
function ALw(dir, name, width, gap = 0) {
  const f = AL(dir, name, gap);
  f.resize(width, 10);
  if (dir === "VERTICAL") { f.counterAxisSizingMode = "FIXED"; f.primaryAxisSizingMode = "AUTO"; }
  else { f.primaryAxisSizingMode = "FIXED"; f.counterAxisSizingMode = "AUTO"; }
  return f;
}
function pad(f, t, r = t, b = t, l = r) { f.paddingTop = t; f.paddingRight = r; f.paddingBottom = b; f.paddingLeft = l; return f; }
function add(parent, child, fill = false) { parent.appendChild(child); if (fill) child.layoutSizingHorizontal = "FILL"; return child; }
function abs(parent, child, x, y) { parent.appendChild(child); if (parent.layoutMode && parent.layoutMode !== "NONE") child.layoutPositioning = "ABSOLUTE"; child.x = x; child.y = y; return child; }

async function T(parent, chars, style, color, o = {}) {
  const t = figma.createText();
  if (parent) parent.appendChild(t);
  if (TS[style]) await t.setTextStyleIdAsync(TS[style].id);
  else { t.fontName = { family: "Inter", style: "Regular" }; t.fontSize = o.size || 14; }
  if (o.size) t.fontSize = o.size;
  t.characters = chars;
  paintTo(t, color, o.op === undefined ? 1 : o.op);
  if (o.name) t.name = o.name;
  if (o.w) { t.textAutoResize = "HEIGHT"; t.resize(o.w, Math.max(1, t.height)); }
  else if (o.fill) { t.textAutoResize = "HEIGHT"; t.layoutSizingHorizontal = "FILL"; }
  if (o.align) t.textAlignHorizontal = o.align;
  return t;
}
function I(parent, name, size, color, sw = 2, fillColor = "none") {
  const col = HEX[color] || color;
  const fc = fillColor === "none" ? "none" : (HEX[fillColor] || fillColor);
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="${fc}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${ICONS[name] || ICONS.info}</svg>`;
  const n = figma.createNodeFromSvg(svg);
  n.name = "icon/" + name; n.resize(size, size); n.fills = [];
  if (parent) parent.appendChild(n);
  return n;
}
// round icon button
function circleBtn(name, icon, size, bg, bgOp, fg, iconSize) {
  const b = AL("HORIZONTAL", name);
  b.resize(size, size); b.primaryAxisSizingMode = "FIXED"; b.counterAxisSizingMode = "FIXED";
  b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER";
  radius(b, size / 2);
  if (bg) paintTo(b, bg, bgOp);
  I(b, icon, iconSize || Math.round(size * 0.45), fg);
  return b;
}
function pill(name, bg, bgOp = 1, padV = 6, padH = 12, gap = 6) {
  const p = AL("HORIZONTAL", name, gap); p.counterAxisAlignItems = "CENTER"; pad(p, padV, padH); radius(p, 999);
  if (bg) paintTo(p, bg, bgOp);
  return p;
}
function rect(parent, name, w, h, key, op = 1, r = 0) {
  const x = figma.createRectangle(); x.name = name; x.resize(w, h); if (key) paintTo(x, key, op); else x.fills = []; if (r) radius(x, r);
  if (parent) parent.appendChild(x);
  return x;
}
function ellipse(parent, name, w, h, key, op = 1) { const e = figma.createEllipse(); e.name = name; e.resize(w, h); paintTo(e, key, op); if (parent) parent.appendChild(e); return e; }
function line(parent, w, key = "line") { const r = rect(parent, "Divider", w, 1, key); return r; }

// ---------- links (prototype wiring, applied at the end) ----------
const TR = {
  push: { type: "PUSH", direction: "LEFT", matchLayers: false, easing: { type: "EASE_IN_AND_OUT" }, duration: 0.35 },
  smart: { type: "SMART_ANIMATE", easing: { type: "EASE_IN_AND_OUT" }, duration: 0.4 },
  dissolve: { type: "DISSOLVE", easing: { type: "EASE_OUT" }, duration: 0.25 },
  up: { type: "MOVE_IN", direction: "TOP", matchLayers: false, easing: { type: "EASE_OUT" }, duration: 0.35 },
};
function link(node, to, tr = "push") { if (node) LINKS.push({ node, to, tr, kind: "click" }); }
function back(node) { if (node) LINKS.push({ node, kind: "back" }); }
function after(node, to, seconds, tr = "dissolve") { if (node) LINKS.push({ node, to, tr, kind: "timeout", seconds }); }
function cleanReactions(list) {
  return (list || []).map((r) => ({ trigger: r.trigger, actions: r.actions ? r.actions : (r.action ? [r.action] : []) })).filter((r) => r.trigger && r.actions.length);
}
async function applyLinks() {
  let ok = 0;
  for (const l of LINKS) {
    try {
      let action;
      if (l.kind === "back") action = { type: "BACK" };
      else {
        const dest = typeof l.to === "string" ? S[l.to] : l.to;
        if (!dest) { PROBLEMS.push("Missing destination " + l.to); continue; }
        action = { type: "NODE", destinationId: dest.id, navigation: "NAVIGATE", transition: TR[l.tr] || null, preserveScrollPosition: false };
      }
      const trigger = l.kind === "timeout" ? { type: "AFTER_TIMEOUT", timeout: l.seconds } : { type: "ON_CLICK" };
      const keep = cleanReactions(l.node.reactions).filter((r) => r.trigger.type !== trigger.type);
      await l.node.setReactionsAsync(keep.concat([{ trigger, actions: [action] }]));
      ok++;
    } catch (e) { PROBLEMS.push("Link on " + (l.node && l.node.name) + ": " + e.message); }
  }
  return ok;
}
// ---------- design-system access ----------
async function loadFonts() {
  const want = [["Gloock", "Regular"], ["Figtree", "Regular"], ["Figtree", "Medium"], ["Figtree", "SemiBold"], ["Figtree", "Bold"], ["DM Mono", "Regular"], ["DM Mono", "Medium"], ["Inter", "Regular"], ["Inter", "Semi Bold"]];
  for (const [family, style] of want) { try { await figma.loadFontAsync({ family, style }); } catch (e) { PROBLEMS.push("Font missing: " + family + " " + style); } }
}
async function loadTokens() {
  for (const [k, id] of Object.entries(VID)) { try { const v = await figma.variables.getVariableByIdAsync(id); if (v) V[k] = v; } catch (e) { /* unbound fallback */ } }
  for (const s of await figma.getLocalTextStylesAsync()) TS[s.name] = s;
  for (const s of await figma.getLocalEffectStylesAsync()) ES[s.name] = s;
}
async function byIdOrName(id, name, page) {
  let n = null;
  try { n = await figma.getNodeByIdAsync(id); } catch (e) { n = null; }
  if ((!n || n.removed) && page) n = page.findOne((x) => (x.type === "COMPONENT_SET" || x.type === "COMPONENT") && x.name === name);
  return n || null;
}
function variant(set, name) {
  if (!set) return null;
  if (set.type === "COMPONENT") return set;
  return set.children.find((c) => c.name === name) || set.defaultVariant || set.children[0];
}
function pk(set, prop) {
  if (!set) return null;
  const owner = set.type === "COMPONENT" && set.parent && set.parent.type === "COMPONENT_SET" ? set.parent : set;
  const defs = owner.componentPropertyDefinitions || {};
  return Object.keys(defs).find((k) => k.split("#")[0] === prop) || null;
}
function setProps(inst, set, map) {
  const out = {};
  for (const [name, val] of Object.entries(map)) { const k = pk(set, name); if (k) out[k] = val; }
  try { inst.setProperties(out); } catch (e) { PROBLEMS.push("setProperties on " + inst.name + ": " + e.message); }
}
async function loadComponents(ds) {
  const want = { logo: "Logo", btn: "Button", chip: "Filter Chip", save: "Save Button", dest: "Destination Card", exp: "Experience Card", tile: "Category Tile", sf: "Search Field", benefit: "Benefit Item", showcaseCard: "Showcase Card", showcase: "3D Showcase" };
  for (const [k, name] of Object.entries(want)) {
    C[k] = await byIdOrName(IDS[k], name, ds);
    if (!C[k]) PROBLEMS.push("Component not found: " + name);
  }
  C.icons = {};
  for (const [k, id] of Object.entries(ICON_IDS)) C.icons[k] = await byIdOrName(id, "Icon/" + k, ds);
}

// ---------- instance factories ----------
function BTN(type, label, icon = false) {
  const v = variant(C.btn, `Type=${type}, State=Default`);
  if (!v) { const p = pill("Button/" + label, type === "Primary" ? "kaya400" : "pandan900", 1, 14, 22); return p; }
  const i = v.createInstance(); i.name = "Button/" + label;
  setProps(i, C.btn, { "Label": label, "Show icon": icon });
  return i;
}
function fullBtn(parent, type, label) {
  const b = BTN(type, label, false);
  parent.appendChild(b);
  try { b.layoutSizingHorizontal = "FILL"; b.primaryAxisAlignItems = "CENTER"; } catch (e) { /* non auto-layout parent */ }
  return b;
}
function CHIP(label, active = false) {
  const v = variant(C.chip, active ? "State=Active" : "State=Default");
  const i = v.createInstance(); i.name = "Chip/" + label;
  setProps(i, C.chip, { "Label": label });
  return i;
}
function SAVE(saved = false) { const v = variant(C.save, saved ? "State=Saved" : "State=Default"); const i = v.createInstance(); i.name = "Save"; return i; }
function DEST(d) {
  const i = variant(C.dest, "State=Default").createInstance(); i.name = "Destination/" + d[0];
  setProps(i, C.dest, { "Title": d[0], "Region": d[1], "Location": d[2], "Description": d[3], "Fact 1 label": d[4], "Fact 1 value": d[5], "Fact 2 label": d[6], "Fact 2 value": d[7] });
  const ph = i.findOne((n) => n.name === "Photo"); if (ph) ph.fills = [img(d[8])];
  return i;
}
function EXP(e) {
  const i = variant(C.exp, "State=Default").createInstance(); i.name = "Experience/" + e.title;
  setProps(i, C.exp, { "Title": e.title, "Location": e.loc, "Description": e.desc, "Category": e.cat, "Duration": e.dur, "Best time": e.best });
  if (C.icons[e.icon]) setProps(i, C.exp, { "Category icon": C.icons[e.icon].id });
  const ph = i.findOne((n) => n.name === "Photo"); if (ph) ph.fills = [img(e.img)];
  return i;
}
function TILE(t) {
  const i = variant(C.tile, "State=Default").createInstance(); i.name = "Mood/" + t.title;
  setProps(i, C.tile, { "Title": t.title, "Subtitle": t.sub });
  if (C.icons[t.icon]) setProps(i, C.tile, { "Category icon": C.icons[t.icon].id });
  const ph = i.findOne((n) => n.name === "Photo"); if (ph) ph.fills = [img(t.img)];
  return i;
}

// ---------- repairs of defects left in the file by the earlier build ----------
async function repairDesignSystem() {
  const fixes = [];
  const tryFix = (label, fn) => { try { fn(); fixes.push(label); } catch (e) { PROBLEMS.push("Repair " + label + ": " + e.message); } };
  tryFix("On Dark button stroke", () => setOpacity(variant(C.btn, "Type=On Dark, State=Default"), "strokes", 0.45));
  tryFix("On Dark hover fill", () => setOpacity(variant(C.btn, "Type=On Dark, State=Hover"), "fills", 0.14));
  tryFix("Save button", () => setOpacity(variant(C.save, "State=Default"), "fills", 0.92));
  tryFix("Region badges", () => C.dest.findAll((n) => n.name === "Region badge").forEach((n) => setOpacity(n, "fills", 0.78)));
  tryFix("Category tags", () => C.exp.findAll((n) => n.name === "Category tag").forEach((n) => setOpacity(n, "fills", 0.94)));
  tryFix("Experience accent", () => setOpacity(variant(C.exp, "State=Default").findOne((n) => n.name === "Accent"), "fills", 0));
  tryFix("Tile go button", () => setOpacity(variant(C.tile, "State=Default").findOne((n) => n.name === "Go"), "fills", 0.18));
  tryFix("Search field", () => setOpacity(variant(C.sf, "State=Default"), "fills", 0));
  tryFix("Coords pill", () => setOpacity(C.showcaseCard.findOne((n) => n.name === "Coords pill"), "fills", 0.7));
  tryFix("Showcase variants", () => {
    for (const v of C.showcase.children) {
      setOpacity(v.findOne((n) => n.name === "Glow"), "fills", 0.12);
      setOpacity(v.findOne((n) => n.name === "Orbit ring"), "strokes", 0.45);
      v.findAll((n) => n.name === "Firefly").forEach((f, j) => setOpacity(f, "fills", 0.55 + (j % 3) * 0.15));
      for (const nm of ["Prev", "Next"]) { const b = v.findOne((n) => n.name === nm); setOpacity(b, "fills", 0.1); setOpacity(b, "strokes", 0.35); }
      const cap = v.findOne((n) => n.name === "Caption"); if (cap) cap.primaryAxisSizingMode = "AUTO";
      const ctr = v.findOne((n) => n.name === "Controls"); if (ctr) ctr.y = 600 - 12 - ctr.height;
    }
  });
  tryFix("Showcase card text", () => { const tb = C.showcaseCard.findOne((n) => n.name === "Text"); if (tb) { tb.primaryAxisSizingMode = "AUTO"; tb.y = 360 - 20 - tb.height; } });
  tryFix("Category tile text", () => { for (const v of C.tile.children) { const t = v.findOne((n) => n.name === "Text"); if (t) { t.primaryAxisSizingMode = "AUTO"; t.y = 320 - 20 - t.height; } } });
  return fixes;
}
async function repairDesktop() {
  const D = await figma.getNodeByIdAsync(IDS.desktop);
  if (!D) return ["desktop frame not found (skipped)"];
  const f = (nm) => D.findOne((x) => x.name === nm);
  const done = [];
  const tryFix = (label, fn) => { try { fn(); done.push(label); } catch (e) { PROBLEMS.push("Desktop " + label + ": " + e.message); } };
  tryFix("glow", () => setOpacity(f("Glow (decorative)"), "fills", 0.35));
  tryFix("eyebrow", () => { const e = f("Eyebrow pill"); setOpacity(e, "fills", 0.08); setOpacity(e, "strokes", 0.16); });
  tryFix("nav", () => { const n = f("Nav (fixed)"); setOpacity(n, "fills", 0.82); setOpacity(n, "strokes", 0.08); });
  tryFix("nav bars", () => { for (const l of ["Explore", "Destinations", "About"]) { const w = f("Link/" + l); if (w) setOpacity(w.findOne((x) => x.name === "Active bar"), "fills", 0); } });
  tryFix("search shortcut", () => { const s = f("Search shortcut"); setOpacity(s, "fills", 0.08); setOpacity(s, "strokes", 0.18); setOpacity(s.findOne((x) => x.name === "Key hint"), "fills", 0.12); });
  tryFix("hero copy height", () => { const n = f("Hero copy"); n.primaryAxisSizingMode = "AUTO"; });
  tryFix("destinations heading height", () => { const n = f("Heading"); n.primaryAxisSizingMode = "AUTO"; });
  return done;
}
// ---------- mobile kit (components that live on the Mobile page so their links can target screens) ----------
const KIT = {};
function batterySvg(col) {
  return `<svg width="78" height="13" viewBox="0 0 78 13" xmlns="http://www.w3.org/2000/svg"><g fill="${col}"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></g><path d="M31 3.5a9 9 0 0 1 12 0M33.5 6.3a5.2 5.2 0 0 1 7 0M36 9a1.4 1.4 0 0 1 2 0" stroke="${col}" stroke-width="1.8" fill="none" stroke-linecap="round"/><rect x="50.5" y="0.5" width="24" height="12" rx="3.5" stroke="${col}" stroke-opacity="0.4" fill="none"/><rect x="52.5" y="2.5" width="18" height="8" rx="2" fill="${col}"/><rect x="76" y="4" width="1.6" height="5" rx="0.8" fill="${col}" fill-opacity="0.4"/></svg>`;
}
async function buildStatusBar(sec) {
  const vs = [];
  for (const theme of ["Dark", "Light", "Clear"]) {
    const c = figma.createComponent(); c.name = "Theme=" + theme; c.resize(W, 54);
    if (theme === "Dark") paintTo(c, "pandan900"); else if (theme === "Light") paintTo(c, "mist", 0.94); else c.fills = [];
    const fg = theme === "Light" ? HEX.ink : HEX.onDark;
    const t = figma.createText(); c.appendChild(t); t.fontName = { family: "Figtree", style: "SemiBold" }; t.fontSize = 17; t.characters = "9:41"; t.fills = [{ type: "SOLID", color: rgb(fg) }]; t.x = 44; t.y = 17; t.name = "Time";
    const b = figma.createNodeFromSvg(batterySvg(fg)); b.name = "Indicators"; c.appendChild(b); b.x = W - 40 - 78; b.y = 21;
    vs.push(c);
  }
  const set = figma.combineAsVariants(vs, sec);
  set.name = "Status Bar (iOS)"; set.layoutMode = "VERTICAL"; set.itemSpacing = 16; pad(set, 16); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO";
  paintTo(set, "onDarkMuted");
  set.description = "iOS status bar, 54pt. Dark = on pandan headers, Light = on mist screens, Clear = over photos and the AR camera.";
  KIT.status = set; return set;
}
const TABS = [["Home", "home", "home"], ["Explore", "compass", "search"], ["Lens", "scan", "lens"], ["Trips", "route", "trips"], ["Me", "user", "me"]];
async function buildTabBar(sec) {
  const vs = []; KIT.tabItems = [];
  for (const [active] of TABS) {
    const c = figma.createComponent(); c.name = "Active=" + active; c.resize(W, 84); c.clipsContent = false;
    paintTo(c, "surface", 0.94);
    c.effects = [{ type: "BACKGROUND_BLUR", radius: 20, visible: true }];
    c.strokes = [solid("line")]; c.strokeAlign = "INSIDE"; c.strokeTopWeight = 1; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0;
    const row = figma.createFrame(); row.name = "Items"; c.appendChild(row); row.resize(W, 58); row.x = 0; row.y = 0; row.fills = []; row.clipsContent = false;
    row.layoutMode = "HORIZONTAL"; row.primaryAxisSizingMode = "FIXED"; row.counterAxisSizingMode = "FIXED"; row.counterAxisAlignItems = "CENTER"; pad(row, 6, 8, 0, 8);
    for (const [label, icon, target] of TABS) {
      const on = label === active;
      const it = AL("VERTICAL", "Tab/" + label, 3); it.counterAxisAlignItems = "CENTER"; it.primaryAxisAlignItems = "CENTER";
      row.appendChild(it); it.layoutSizingHorizontal = "FILL";
      if (label === "Lens") {
        const orb = circleBtn("Lens orb", "scan", 54, "kaya400", 1, "pandan900", 26);
        orb.effects = [{ type: "DROP_SHADOW", color: { r: 0.88, g: 0.66, b: 0.18, a: 0.45 }, offset: { x: 0, y: 6 }, radius: 16, spread: -2, visible: true, blendMode: "NORMAL" }];
        if (on) { orb.strokes = [solid("pandan900")]; orb.strokeWeight = 2.5; orb.strokeAlign = "INSIDE"; }
        it.appendChild(orb); it.paddingTop = 0; it.itemSpacing = 2;
        // lift the orb above the bar
        it.counterAxisAlignItems = "CENTER";
      } else {
        const hold = AL("HORIZONTAL", "Icon pill"); hold.resize(56, 30); hold.primaryAxisSizingMode = "FIXED"; hold.counterAxisSizingMode = "FIXED"; hold.primaryAxisAlignItems = "CENTER"; hold.counterAxisAlignItems = "CENTER"; radius(hold, 15);
        if (on) paintTo(hold, "pandan100"); else hold.fills = [];
        it.appendChild(hold); I(hold, icon, 22, on ? "pandan900" : "muted", on ? 2.2 : 1.8);
      }
      await T(it, label, "Label/S", on ? "pandan900" : "muted", { size: 11, name: "Label" });
      KIT.tabItems.push({ node: it, target });
    }
    // lift Lens orb visually
    const lensItem = row.findOne((n) => n.name === "Tab/Lens"); if (lensItem) lensItem.paddingBottom = 18;
    const hi = rect(c, "Home indicator", 134, 5, "ink", 1, 3); hi.x = (W - 134) / 2; hi.y = 84 - 13;
    vs.push(c);
  }
  const set = figma.combineAsVariants(vs, sec);
  set.name = "Tab Bar (iOS)"; set.layoutMode = "VERTICAL"; set.itemSpacing = 24; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO";
  paintTo(set, "mist");
  set.description = "iOS tab bar, 84pt incl. home indicator. Five destinations; the raised kaya Lens button opens the AR Heritage Lens (advanced feature). Targets ≥ 44pt; labels always visible (no icon-only navigation).";
  KIT.tab = set; return set;
}
// Interest tile: interactive component (tap to toggle)
async function buildInterestTile(sec) {
  const vs = {};
  for (const on of [false, true]) {
    const c = figma.createComponent(); c.name = "Selected=" + (on ? "On" : "Off");
    c.layoutMode = "VERTICAL"; c.resize(166, 10); c.counterAxisSizingMode = "FIXED"; c.primaryAxisSizingMode = "AUTO"; c.itemSpacing = 12; pad(c, 16); radius(c, 20); c.clipsContent = false;
    if (on) paintTo(c, "pandan900"); else { paintTo(c, "surface"); c.strokes = [solid("line")]; c.strokeWeight = 1; c.strokeAlign = "INSIDE"; }
    const top = AL("HORIZONTAL", "Top"); c.appendChild(top); top.layoutSizingHorizontal = "FILL"; top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
    const badge = AL("HORIZONTAL", "Badge"); badge.resize(40, 40); badge.primaryAxisSizingMode = "FIXED"; badge.counterAxisSizingMode = "FIXED"; badge.primaryAxisAlignItems = "CENTER"; badge.counterAxisAlignItems = "CENTER"; radius(badge, 12);
    paintTo(badge, on ? "kaya400" : "pandan100"); top.appendChild(badge);
    if (C.icons.mountain) { const ic = C.icons.mountain.createInstance(); ic.name = "Icon"; badge.appendChild(ic); ic.resize(20, 20); }
    const tick = circleBtn("Tick", "check", 24, on ? "kaya400" : "surface", 1, on ? "pandan900" : "surface", 14);
    if (!on) { tick.strokes = [solid("line")]; tick.strokeWeight = 1.5; tick.strokeAlign = "INSIDE"; }
    top.appendChild(tick);
    await T(c, "Nature & adventure", "Heading/S", on ? "onDark" : "ink", { fill: true, name: "Label" });
    c.resize(166, 120); c.primaryAxisSizingMode = "FIXED";
    vs[on ? "on" : "off"] = c;
  }
  const set = figma.combineAsVariants([vs.off, vs.on], sec);
  set.name = "Interest Tile"; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 20; pad(set, 20); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "mist");
  const kL = set.addComponentProperty("Label", "TEXT", "Nature & adventure");
  const kI = C.icons.mountain ? set.addComponentProperty("Icon", "INSTANCE_SWAP", C.icons.mountain.id) : null;
  for (const v of set.children) {
    const l = v.findOne((n) => n.name === "Label"); if (l) l.componentPropertyReferences = { characters: kL };
    const ic = v.findOne((n) => n.name === "Icon"); if (ic && kI) ic.componentPropertyReferences = { mainComponent: kI };
  }
  const sm = { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.2 };
  await vs.off.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.on.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  await vs.on.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.off.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  set.description = "Onboarding interest tile. Tap toggles Selected (works in the prototype). Selection is shown by colour AND a tick, not colour alone (WCAG 1.4.1).";
  KIT.interest = set; return set;
}
// Toggle switch: interactive component
async function buildToggle(sec) {
  const vs = {};
  for (const on of [false, true]) {
    const c = figma.createComponent(); c.name = "On=" + (on ? "Yes" : "No"); c.resize(51, 31); radius(c, 16);
    paintTo(c, on ? "pandan500" : "line");
    const k = figma.createEllipse(); k.name = "Knob"; c.appendChild(k); k.resize(27, 27); k.y = 2; k.x = on ? 22 : 2; k.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    k.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.2 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0, visible: true, blendMode: "NORMAL" }];
    vs[on ? "on" : "off"] = c;
  }
  const set = figma.combineAsVariants([vs.off, vs.on], sec);
  set.name = "Toggle"; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 16; pad(set, 16); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "surface");
  const sm = { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.18 };
  await vs.off.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.on.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  await vs.on.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.off.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  set.description = "iOS-style switch, 51×31. Tap toggles in the prototype.";
  KIT.toggle = set; return set;
}
function STATUS(theme) { const v = variant(KIT.status, "Theme=" + theme); const i = v.createInstance(); i.name = "Status Bar"; return i; }
function TABBAR(active) { const v = variant(KIT.tab, "Active=" + active); const i = v.createInstance(); i.name = "Tab Bar"; return i; }
function TOGGLE(on) { const v = variant(KIT.toggle, "On=" + (on ? "Yes" : "No")); const i = v.createInstance(); i.name = "Toggle"; return i; }
function INTEREST(label, icon, on) {
  const v = variant(KIT.interest, "Selected=" + (on ? "On" : "Off")); const i = v.createInstance(); i.name = "Interest/" + label;
  setProps(i, KIT.interest, { "Label": label });
  if (C.icons[icon]) setProps(i, KIT.interest, { "Icon": C.icons[icon].id });
  return i;
}
function wireTabBar() {
  for (const { node, target } of KIT.tabItems) link(node, target, "dissolve");
}
// ---------- screen scaffolding ----------
const GAP_X = 120;
function newSection(name, x, y, cols, maxH = 1900) {
  const s = figma.createSection(); s.name = name; MOB.appendChild(s); s.x = x; s.y = y;
  s.resizeWithoutConstraints(80 + cols * (W + GAP_X), maxH + 220);
  return s;
}
function screen(key, name, sec, col, bg) {
  const f = figma.createFrame(); f.name = name; f.resize(W, H); paintTo(f, bg); f.clipsContent = true;
  sec.appendChild(f); f.x = 60 + col * (W + GAP_X); f.y = 140;
  S[key] = f; return f;
}
function column(f, name = "Content") {
  const c = ALw("VERTICAL", name, W, 0); f.appendChild(c); c.x = 0; c.y = 0; return c;
}
// screen label above each frame (outside the frame, inside the section)
async function caption(sec, f, num, title, note) {
  const g = ALw("VERTICAL", "Label · " + f.name, W, 4); sec.appendChild(g); g.x = f.x; g.y = 40;
  await T(g, num + "  " + title, "Heading/S", "ink");
  if (note) await T(g, note, "Body/S", "muted", { fill: true });
}
// finish: grow frame to content, then add fixed overlays (status bar, tab bar, action bar) on top
function finish(f, content, fixed = []) {
  const h = Math.max(H, Math.ceil(content ? deepH(content) : H));
  f.resize(W, h);
  for (const n of fixed) f.appendChild(n);
  f.numberOfFixedChildren = fixed.length;
}
function statusAt(theme) { const s = STATUS(theme); s.x = 0; s.y = 0; return s; }
function tabAt(active) { const t = TABBAR(active); t.x = 0; t.y = H - 84; return t; }
function actionBar(name) {
  const bar = AL("HORIZONTAL", name, 12); bar.resize(W, 104); bar.primaryAxisSizingMode = "FIXED"; bar.counterAxisSizingMode = "FIXED";
  bar.counterAxisAlignItems = "MIN"; pad(bar, 14, 20, 34, 20);
  paintTo(bar, "surface", 0.96); bar.effects = [{ type: "BACKGROUND_BLUR", radius: 20, visible: true }];
  bar.strokes = [solid("line")]; bar.strokeAlign = "INSIDE"; bar.strokeTopWeight = 1; bar.strokeBottomWeight = 0; bar.strokeLeftWeight = 0; bar.strokeRightWeight = 0;
  bar.x = 0; bar.y = H - 104;
  return bar;
}
async function sectionHead(parent, title, action, padRight = 0) {
  const r = AL("HORIZONTAL", "Head · " + title, 8); parent.appendChild(r); r.layoutSizingHorizontal = "FILL";
  r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER"; r.paddingRight = padRight;
  await T(r, title, "Heading/M", "ink");
  let a = null; if (action) a = await T(r, action, "Label/S", "pandan500", { name: "Action" });
  return { row: r, action: a };
}
// horizontal scroller with bleed to the right edge
function scroller(parent, name, height, gap = 12) {
  const vp = figma.createFrame(); vp.name = name; parent.appendChild(vp); vp.layoutSizingHorizontal = "FILL";
  vp.resize(vp.width, height); vp.fills = []; vp.clipsContent = true; vp.overflowDirection = "HORIZONTAL";
  const tr = AL("HORIZONTAL", "Track", gap); vp.appendChild(tr); tr.x = 0; tr.y = 0; pad(tr, 4, 20, 16, 0);
  return { vp, tr };
}
function fitScroller(sc) { const h = sc.tr.paddingTop + sc.tr.paddingBottom + Math.max(10, ...sc.tr.children.map((c) => c.height)); sc.vp.resize(sc.vp.width, Math.ceil(h)); }

const DESTS = [
  ["Kuala Lumpur", "FEDERAL TERRITORY", "Kuala Lumpur", "Skyline views, night markets and neighbourhoods like Kampung Baru and Brickfields, linked by LRT and MRT.", "GETTING AROUND", "LRT, MRT, monorail, buses", "KNOWN FOR", "Food, shopping, city life", "kl"],
  ["Penang", "NORTHERN REGION", "George Town, Pulau Pinang", "Shophouse lanes, clan jetties and hawker food. George Town is a UNESCO World Heritage Site.", "FROM KL", "≈1 h flight or 4–5 h drive", "KNOWN FOR", "Street food, heritage", "heroPenang"],
  ["Langkawi", "KEDAH", "Langkawi, Kedah", "An archipelago of around 99 islands, with mangrove tours, quiet beaches and a cable car into the hills.", "FROM KL", "≈1 h flight", "DRIEST MONTHS", "Roughly Nov – Apr", "langkawi"],
  ["Melaka", "MELAKA", "Melaka City", "Dutch and Portuguese-era landmarks, Peranakan cooking and the Jonker Street weekend night market.", "FROM KL", "≈2 h drive", "KNOWN FOR", "Heritage, Nyonya food", "melaka"],
  ["Cameron Highlands", "PAHANG", "Tanah Rata, Pahang", "Cool air around 1,500 m up, tea estates, mossy forest trails and strawberry farms.", "FROM KL", "≈3.5–4 h drive", "CLIMATE", "Cool, often 15–25 °C", "cameron"],
  ["Sabah", "BORNEO", "Kota Kinabalu, Sabah", "Mount Kinabalu, island marine parks and rainforest wildlife on the northern tip of Borneo.", "FROM KL", "≈2.5 h flight", "KNOWN FOR", "Hiking, diving, wildlife", "sabah"],
];
const MOODS = [
  { title: "Nature & adventure", sub: "Rainforest trails and highland tea", icon: "mountain", img: "nature" },
  { title: "Cultural heritage", sub: "Temples, mosques and clan houses", icon: "landmark", img: "heritage" },
  { title: "Food & local cuisine", sub: "Hawker centres and kopitiams", icon: "utensils", img: "food" },
  { title: "Beaches & islands", sub: "Marine parks and quiet coves", icon: "palm", img: "islands" },
  { title: "City exploration", sub: "Night markets and skyline views", icon: "building", img: "city" },
];
const EXP_WALK = { title: "George Town heritage walk", loc: "George Town, Penang", desc: "Shophouse lanes, a clan temple and the jetties, with a kopi stop on the way.", cat: "Cultural heritage", dur: "About 3 hours", best: "Morning", icon: "landmark", img: "penangUmbrella" };
const EXP_FOOD = { title: "Hawker breakfast in George Town", loc: "George Town, Penang", desc: "Share a table, order from several stalls and pay each stall separately.", cat: "Food & local cuisine", dur: "About 1.5 hours", best: "7–10 am", icon: "utensils", img: "food" };
const EXP_BATU = { title: "Climb the 272 steps at Batu Caves", loc: "Gombak, Selangor · 30 min from KL", desc: "A rainbow staircase up to a limestone temple cave. Cover knees and shoulders before you climb.", cat: "Cultural heritage", dur: "About 2 hours", best: "Early morning", icon: "landmark", img: "batu" };

// ===================== FLOW 1 · ONBOARDING =====================
async function buildSplash(sec) {
  const f = screen("splash", "01 Splash", sec, 0, "pandan900");
  const glow = ellipse(f, "Glow", 520, 520, "pandan500", 0.4); glow.x = -60; glow.y = 120; glow.effects = [{ type: "LAYER_BLUR", radius: 140, visible: true }];
  const trail = figma.createNodeFromSvg(`<svg width="393" height="852" viewBox="0 0 393 852" xmlns="http://www.w3.org/2000/svg"><path d="M-10 700 C 80 640 120 560 200 580 S 330 640 410 470" fill="none" stroke="${HEX.kaya400}" stroke-opacity="0.3" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 11"/></svg>`);
  trail.name = "Trail (decorative)"; f.appendChild(trail); trail.x = 0; trail.y = 0;
  const g = ALw("VERTICAL", "Brand", W, 18); g.counterAxisAlignItems = "CENTER"; f.appendChild(g);
  const mark = figma.createNodeFromSvg(`<svg width="96" height="96" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"><rect width="34" height="34" rx="10" fill="${HEX.kaya400}"/><path d="M8 25.5c4.5-.5 6-4 7.5-7.5s3.5-7.5 9-8.5" fill="none" stroke="${HEX.pandan900}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0.1 4.6"/><circle cx="25" cy="9.5" r="3.2" fill="${HEX.pandan900}"/></svg>`);
  mark.name = "Mark"; g.appendChild(mark);
  mark.effects = [{ type: "DROP_SHADOW", color: { r: 0.95, g: 0.76, b: 0.31, a: 0.45 }, offset: { x: 0, y: 18 }, radius: 40, spread: -6, visible: true, blendMode: "NORMAL" }];
  await T(g, "tourix", "Mobile/Display XL", "onDark", { size: 56, align: "CENTER" });
  await T(g, "Malaysia, with local context.", "Body/L", "onDarkMuted", { align: "CENTER" });
  g.y = (H - g.height) / 2 - 30;
  const foot = await T(f, "STUDENT PROTOTYPE · CT120-3-3", "Eyebrow", "onDarkMuted", { w: W, align: "CENTER" }); foot.x = 0; foot.y = H - 70;
  finish(f, null, [statusAt("Dark")]);
  after(f, "lang", 1.8, "dissolve");
  await caption(sec, f, "01", "Splash", "Auto-advances after 1.8 s.");
}
async function progress(parent, step) {
  const r = AL("HORIZONTAL", "Progress", 6); parent.appendChild(r); r.counterAxisAlignItems = "CENTER";
  for (let i = 1; i <= 2; i++) rect(r, "Step " + i, i === step ? 28 : 14, 5, i <= step ? "pandan900" : "line", 1, 3);
  return r;
}
async function buildLanguage(sec) {
  const f = screen("lang", "02 Onboarding – Language", sec, 1, "mist");
  const c = column(f); pad(c, 66, 24, 140, 24); c.itemSpacing = 22;
  const top = AL("HORIZONTAL", "Top row", 8); add(c, top, true); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
  await progress(top, 1);
  const skip = await T(top, "Skip", "Label/M", "pandan500", { name: "Skip" });
  await T(c, "Selamat datang.\nWelcome.", "Mobile/Display XL", "ink", { fill: true, name: "Title" });
  await T(c, "Choose the language Tourix speaks. You can change it any time in Me → Language.", "Body/M", "muted", { fill: true });
  const list = AL("VERTICAL", "Language options", 10); add(c, list, true);
  const opts = [["EN", "English", "Default", true], ["BM", "Bahasa Melayu", "Bahasa Malaysia", false], ["中", "中文", "Mandarin (Simplified)", false], ["த", "தமிழ்", "Tamil", false]];
  for (const [code, label, sub, on] of opts) {
    const o = AL("HORIZONTAL", "Option/" + sub, 14); add(list, o, true); o.counterAxisAlignItems = "CENTER"; pad(o, 14, 16); radius(o, 18);
    paintTo(o, on ? "kaya100" : "surface"); o.strokes = [solid(on ? "pandan900" : "line")]; o.strokeWeight = on ? 2 : 1; o.strokeAlign = "INSIDE";
    const b = AL("HORIZONTAL", "Code"); b.resize(44, 44); b.primaryAxisSizingMode = "FIXED"; b.counterAxisSizingMode = "FIXED"; b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER"; radius(b, 12); paintTo(b, on ? "pandan900" : "pandan100"); o.appendChild(b);
    await T(b, code, "Label/M", on ? "kaya400" : "pandan900");
    const col = AL("VERTICAL", "Text", 2); add(o, col, true);
    await T(col, label, "Heading/S", "ink"); await T(col, sub, "Body/S", "muted");
    const radio = AL("HORIZONTAL", "Radio"); radio.resize(24, 24); radio.primaryAxisSizingMode = "FIXED"; radio.counterAxisSizingMode = "FIXED"; radio.primaryAxisAlignItems = "CENTER"; radio.counterAxisAlignItems = "CENTER"; radius(radio, 12); o.appendChild(radio);
    if (on) { paintTo(radio, "pandan900"); I(radio, "check", 14, "kaya400", 3); } else { radio.fills = []; radio.strokes = [solid("line")]; radio.strokeWeight = 2; radio.strokeAlign = "INSIDE"; }
  }
  const acc = AL("HORIZONTAL", "Larger text", 14); add(c, acc, true); acc.counterAxisAlignItems = "CENTER"; pad(acc, 14, 16); radius(acc, 18); paintTo(acc, "surface");
  const ab = circleBtn("Icon", "type", 40, "pandan100", 1, "pandan900", 20); acc.appendChild(ab);
  const acol = AL("VERTICAL", "Text", 2); add(acc, acol, true); await T(acol, "Larger text", "Heading/S", "ink"); await T(acol, "Bigger type across the app", "Body/S", "muted");
  acc.appendChild(TOGGLE(false));
  const bar = AL("VERTICAL", "Footer", 0); bar.resize(W, 110); bar.primaryAxisSizingMode = "FIXED"; bar.counterAxisSizingMode = "FIXED"; pad(bar, 12, 24, 40, 24); bar.x = 0; bar.y = H - 110; paintTo(bar, "mist");
  const cont = fullBtn(bar, "Primary", "Continue");
  finish(f, c, [statusAt("Light"), bar]);
  link(cont, "interests", "push"); link(skip, "home", "dissolve");
  await caption(sec, f, "02", "Choose language", "Multilingual from the first screen (EN, BM, 中文, தமிழ்). 'Larger text' toggle is interactive.");
}
async function buildInterests(sec) {
  const f = screen("interests", "03 Onboarding – Interests", sec, 2, "mist");
  const c = column(f); pad(c, 62, 24, 140, 24); c.itemSpacing = 20;
  const top = AL("HORIZONTAL", "Top row", 8); add(c, top, true); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
  const bk = circleBtn("Back", "arrowLeft", 40, "surface", 1, "ink", 20); bk.strokes = [solid("line")]; bk.strokeWeight = 1; bk.strokeAlign = "INSIDE"; top.appendChild(bk);
  await progress(top, 2);
  const skip = await T(top, "Skip", "Label/M", "pandan500", { name: "Skip" });
  await T(c, "What are you in the mood for?", "Mobile/Display M", "ink", { fill: true });
  await T(c, "Pick a few. We use them to order your Home feed. Nothing is shared.", "Body/M", "muted", { fill: true });
  const grid = AL("HORIZONTAL", "Interest grid", 12); add(c, grid, true); grid.layoutWrap = "WRAP"; grid.counterAxisSpacing = 12;
  const items = [["Nature & adventure", "mountain", true], ["Cultural heritage", "landmark", true], ["Food & local cuisine", "utensils", true], ["Beaches & islands", "palm", false], ["City exploration", "building", false], ["Festivals & events", "calendar", false], ["Hidden gems", "gem", false], ["Travelling with family", "users", false]];
  for (const [l, ic, on] of items) { const t = INTEREST(l, ic, on); grid.appendChild(t); try { t.resize(166.5, 120); } catch (e) { } }
  await T(c, "Tip: tap a tile to select or clear it.", "Body/S", "muted", { fill: true });
  const bar = AL("VERTICAL", "Footer", 8); bar.resize(W, 128); bar.primaryAxisSizingMode = "FIXED"; bar.counterAxisSizingMode = "FIXED"; pad(bar, 12, 24, 40, 24); bar.x = 0; bar.y = H - 128; paintTo(bar, "mist", 0.96);
  bar.effects = [{ type: "BACKGROUND_BLUR", radius: 16, visible: true }];
  await T(bar, "3 selected", "Label/S", "muted", { name: "Count" });
  const go = fullBtn(bar, "Primary", "Show my Malaysia");
  finish(f, c, [statusAt("Light"), bar]);
  back(bk); link(go, "home", "dissolve"); link(skip, "home", "dissolve");
  await caption(sec, f, "03", "Pick interests", "Tiles are interactive components (tap to toggle).");
}
// ===================== FLOW 2 · DISCOVER =====================
// Mobile mood card: full-size type (the desktop Category Tile scaled down would make text too small)
async function moodCard(m) {
  const c = figma.createFrame(); c.name = "Mood/" + m.title; c.resize(150, 196); c.clipsContent = true; radius(c, 22); c.fills = [img(m.img)];
  const sh = rect(c, "Shade", 150, 196, null); sh.fills = [vgrad("pandan900", 0.05, 0.92, 0.25, 1)];
  const b = circleBtn("Icon badge", m.icon, 36, "kaya400", 1, "pandan900", 18); c.appendChild(b); b.x = 12; b.y = 12;
  const t = await T(c, m.title, "Heading/S", "onDark", { w: 126, name: "Title" }); t.x = 12; t.y = 196 - 14 - t.height;
  return c;
}
async function buildHome(sec) {
  const f = screen("home", "04 Home", sec, 0, "mist");
  const c = column(f);
  // header
  const hd = ALw("VERTICAL", "Header", W, 18); c.appendChild(hd); hd.layoutSizingHorizontal = "FILL"; pad(hd, 62, 20, 12, 20); paintTo(hd, "pandan900");
  hd.bottomLeftRadius = 32; hd.bottomRightRadius = 32; hd.clipsContent = true;
  const glow = ellipse(null, "Glow", 420, 360, "pandan500", 0.35); abs(hd, glow, -140, -120); glow.effects = [{ type: "LAYER_BLUR", radius: 120, visible: true }];
  const r1 = AL("HORIZONTAL", "Greeting row", 12); add(hd, r1, true); r1.primaryAxisAlignItems = "SPACE_BETWEEN"; r1.counterAxisAlignItems = "MIN";
  const gcol = AL("VERTICAL", "Greeting", 6); add(r1, gcol, true);
  await T(gcol, "SELAMAT PAGI · GOOD MORNING", "Eyebrow", "kaya400");
  await T(gcol, "Where to this weekend?", "Mobile/Display M", "onDark", { fill: true });
  const bell = circleBtn("Notifications", "bell", 44, "onDark", 0.1, "onDark", 20); r1.appendChild(bell);
  const loc = pill("Location", "onDark", 0.1, 8, 12, 6); hd.appendChild(loc); I(loc, "pin", 14, "kaya400"); await T(loc, "Near Kuala Lumpur", "Label/S", "onDark"); I(loc, "chevDown", 14, "onDarkMuted");
  const search = AL("HORIZONTAL", "Search field", 10); add(hd, search, true); search.counterAxisAlignItems = "CENTER"; pad(search, 8, 8, 8, 16); radius(search, 18); paintTo(search, "surface");
  I(search, "search", 20, "muted"); await T(search, "Search places, food, phrases", "Body/M", "muted", { fill: true });
  const mic = circleBtn("Voice search", "mic", 40, "kaya100", 1, "pandan900", 18); search.appendChild(mic);
  const showWrap = AL("HORIZONTAL", "3D showcase wrap"); add(hd, showWrap, true); showWrap.primaryAxisAlignItems = "CENTER";
  let show = null;
  if (C.showcase) { show = variant(C.showcase, "Front=Kuala Lumpur").createInstance(); show.name = "3D Showcase"; showWrap.appendChild(show); show.rescale(353 / 640); }
  // body
  const bd = ALw("VERTICAL", "Body", W, 30); c.appendChild(bd); bd.layoutSizingHorizontal = "FILL"; pad(bd, 26, 0, 120, 20);
  const h1 = await sectionHead(bd, "Explore by mood", "See all", 20);
  const ms = scroller(bd, "Mood scroller", 210);
  const tiles = [];
  for (const m of MOODS) { const t = await moodCard(m); ms.tr.appendChild(t); tiles.push(t); }
  fitScroller(ms);
  const h2 = await sectionHead(bd, "Popular destinations", "See all", 20);
  const ds = scroller(bd, "Destination scroller", 420, 14);
  const cards = {};
  for (const d of DESTS) { const k = DEST(d); ds.tr.appendChild(k); k.rescale(0.86); cards[d[0]] = k; }
  fitScroller(ds);
  // phrase of the day
  const ph = ALw("VERTICAL", "Phrase of the day", 353, 8); bd.appendChild(ph); pad(ph, 20); radius(ph, 22); paintTo(ph, "kaya100");
  const pr = AL("HORIZONTAL", "Row", 8); add(ph, pr, true); pr.primaryAxisAlignItems = "SPACE_BETWEEN"; pr.counterAxisAlignItems = "CENTER";
  await T(pr, "PHRASE OF THE DAY", "Eyebrow", "pandan700");
  pr.appendChild(circleBtn("Play", "volume", 40, "pandan900", 1, "kaya400", 18));
  await T(ph, "Tumpang lalu", "Display/S", "ink");
  await T(ph, "toom-PAHNG LAH-loo", "Mono/S", "pandan500");
  await T(ph, "“Excuse me, may I pass?” Handy in busy markets and on the five-foot way.", "Body/S", "ink", { fill: true });
  const more = await T(ph, "Open culture guide →", "Label/S", "pandan700", { name: "More" });
  await sectionHead(bd, "Near you this weekend", null, 20);
  const batu = EXP(EXP_BATU); bd.appendChild(batu); batu.rescale(353 / 384);
  finish(f, c, [statusAt("Dark"), tabAt("Home")]);
  link(search, "search", "dissolve"); link(cards["Penang"], "dest", "push"); link(ph, "phrases", "push");
  for (const t of tiles) link(t, "search", "dissolve");
  link(h2.action, "search", "dissolve"); link(h1.action, "search", "dissolve");
  await caption(sec, f, "04", "Home", "3D showcase auto-rotates (tap arrows or drag). Rows scroll sideways. Tap Penang, search, a mood or the phrase card.");
}
async function resultRow(parent, name, title, sub, meta, thumb, iconInstead) {
  const r = AL("HORIZONTAL", name, 14); add(parent, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 10, 14, 10, 10); radius(r, 18); paintTo(r, "surface");
  r.strokes = [solid("line")]; r.strokeWeight = 1; r.strokeAlign = "INSIDE";
  if (thumb) { const t = rect(r, "Thumb", 64, 64, "pandan100", 1, 14); t.fills = [img(thumb)]; }
  else { const b = circleBtn("Thumb", iconInstead, 64, "kaya100", 1, "pandan900", 26); radius(b, 14); r.appendChild(b); }
  const col = AL("VERTICAL", "Text", 3); add(r, col, true);
  await T(col, title, "Heading/S", "ink", { fill: true }); await T(col, sub, "Body/S", "muted", { fill: true });
  if (meta) await T(col, meta, "Mono/S", "pandan500");
  I(r, "chevRight", 20, "muted");
  return r;
}
async function buildSearch(sec) {
  const f = screen("search", "05 Explore – Search", sec, 1, "surface");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 18;
  await T(c, "Explore", "Mobile/Display M", "ink");
  const row = AL("HORIZONTAL", "Search row", 12); add(c, row, true); row.counterAxisAlignItems = "CENTER";
  const fld = AL("HORIZONTAL", "Search field (focused)", 10); add(row, fld, true); fld.counterAxisAlignItems = "CENTER"; pad(fld, 14, 14, 14, 16); radius(fld, 18);
  paintTo(fld, "kaya100"); fld.strokes = [solid("kaya500")]; fld.strokeWeight = 1.5; fld.strokeAlign = "INSIDE";
  I(fld, "search", 20, "ink"); await T(fld, "Penang", "Body/M", "ink"); rect(fld, "Caret", 2, 20, "pandan900", 1, 1);
  const sp = figma.createFrame(); sp.name = "Spacer"; sp.fills = []; sp.resize(10, 1); add(fld, sp, true);
  I(fld, "x", 18, "muted");
  const cancel = await T(row, "Cancel", "Label/M", "pandan500", { name: "Cancel" });
  const chips = AL("HORIZONTAL", "Filters", 8); c.appendChild(chips);
  ["All", "Places", "Experiences", "Food", "Phrases"].forEach((l, i) => chips.appendChild(CHIP(l, i === 0)));
  await T(c, "TOP MATCH", "Eyebrow", "muted");
  const top = await resultRow(c, "Result/Penang", "Penang", "Destination · Pulau Pinang", "≈1 h flight from KL", "heroPenang");
  await T(c, "EXPERIENCES & GUIDES", "Eyebrow", "muted");
  const walk = await resultRow(c, "Result/Heritage walk", "George Town heritage walk", "Experience · About 3 hours", null, "penangUmbrella");
  await resultRow(c, "Result/Hawker breakfast", "Hawker breakfast in George Town", "Food · About 1.5 hours", null, "food");
  const phr = await resultRow(c, "Result/Phrases", "Phrases for hawker stalls", "Culture guide · 5 phrases with audio", null, null, "languages");
  await T(c, "RECENT", "Eyebrow", "muted");
  for (const r of ["Halal food near KLCC", "Batu Caves dress code", "Cameron Highlands in December"]) {
    const rr = AL("HORIZONTAL", "Recent/" + r, 12); add(c, rr, true); rr.counterAxisAlignItems = "CENTER"; pad(rr, 4, 0);
    I(rr, "clock", 18, "muted"); await T(rr, r, "Body/M", "ink", { fill: true });
  }
  finish(f, c, [statusAt("Light"), tabAt("Explore")]);
  link(top, "dest", "push"); link(walk, "exp", "push"); link(phr, "phrases", "push"); link(cancel, "home", "dissolve");
  await caption(sec, f, "05", "Explore / search", "Visible search label + clear button; results grouped by type. Tap Penang, the walk or the phrases.");
}
async function heroImage(f, c, name, h, imgKey) {
  const hero = figma.createFrame(); hero.name = name; c.appendChild(hero); hero.layoutSizingHorizontal = "FILL"; hero.resize(W, h); hero.clipsContent = true; hero.fills = [img(imgKey)];
  const sh = rect(hero, "Top shade", W, 140, null); sh.fills = [vgrad("pandan900", 0.6, 0)];
  const bk = circleBtn("Back", "arrowLeft", 44, "surface", 0.92, "ink", 20); hero.appendChild(bk); bk.x = 20; bk.y = 58;
  return { hero, bk };
}
async function buildDestination(sec) {
  const f = screen("dest", "06 Destination – Penang", sec, 2, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 380, "heroPenang");
  const shr = circleBtn("Share", "share", 44, "surface", 0.92, "ink", 20); hero.appendChild(shr); shr.x = W - 20 - 44 - 52; shr.y = 58;
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 60;
  const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 140, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  await T(sh, "PULAU PINANG · NORTHERN REGION", "Eyebrow", "pandan500");
  await T(sh, "Penang", "Mobile/Display XL", "ink");
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, "George Town · UNESCO World Heritage Site", "Body/S", "muted");
  const facts = AL("HORIZONTAL", "Facts", 8); add(sh, facts, true);
  for (const [l, v] of [["FROM KL", "≈1 h flight"], ["GET AROUND", "Bus, e-hailing, walk"], ["YOU'LL HEAR", "Malay, Hokkien, English"]]) {
    const fc = AL("VERTICAL", "Fact", 4); add(facts, fc, true); pad(fc, 12); radius(fc, 14); paintTo(fc, "mist");
    await T(fc, l, "Eyebrow", "muted", { fill: true, size: 10 }); await T(fc, v, "Label/S", "ink", { fill: true });
  }
  const seg = AL("HORIZONTAL", "Segmented control", 4); add(sh, seg, true); pad(seg, 4); radius(seg, 999); paintTo(seg, "mist");
  const segs = {};
  for (const [i, l] of ["Overview", "Experiences", "Etiquette"].entries()) {
    const s = AL("HORIZONTAL", "Seg/" + l); add(seg, s, true); s.primaryAxisAlignItems = "CENTER"; pad(s, 9, 8); radius(s, 999);
    if (i === 0) { paintTo(s, "surface"); s.effects = SHADOW1; } else s.fills = [];
    await T(s, l, "Label/S", i === 0 ? "ink" : "muted"); segs[l] = s;
  }
  await T(sh, "Penang mixes Malay, Chinese, Indian and Peranakan heritage in a compact island. Spend a morning in George Town's shophouse lanes, eat your way through hawker stalls, and take the funicular up Penang Hill for cooler air.", "Body/M", "ink", { fill: true });
  await T(sh, "Good to know", "Heading/M", "ink");
  for (const [ic, t] of [["shirt", "Cover shoulders and knees at temples and mosques."], ["sun", "Hot and humid all year. Start walks before 10 am."], ["bus", "Rapid Penang buses and e-hailing cover the island. The heritage core is walkable."]]) {
    const r = AL("HORIZONTAL", "Tip", 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER";
    r.appendChild(circleBtn("Icon", ic, 40, "pandan100", 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true });
  }
  const eh = await sectionHead(sh, "Top experiences", "See all");
  const walk = EXP(EXP_WALK); sh.appendChild(walk); walk.rescale(353 / 384);
  const food = EXP(EXP_FOOD); sh.appendChild(food); food.rescale(353 / 384);
  // AR promo
  const ar = ALw("VERTICAL", "AR promo", 353, 12); sh.appendChild(ar); pad(ar, 20); radius(ar, 22); paintTo(ar, "pandan900"); ar.clipsContent = true;
  const g2 = ellipse(null, "Glow", 260, 220, "kaya400", 0.18); abs(ar, g2, 160, -90); g2.effects = [{ type: "LAYER_BLUR", radius: 80, visible: true }];
  const badge = pill("AR badge", "kaya400", 1, 5, 10, 6); ar.appendChild(badge); I(badge, "scan", 14, "pandan900"); await T(badge, "AR · HERITAGE LENS", "Eyebrow", "pandan900");
  await T(ar, "See George Town in AR", "Display/S", "onDark", { fill: true });
  await T(ar, "Point your camera at a shophouse to hear its story, in your language.", "Body/S", "onDarkMuted", { fill: true });
  const arBtn = BTN("Primary", "Open Heritage Lens", true); ar.appendChild(arBtn);
  const bar = actionBar("Action bar");
  const saveB = BTN("Outline", "Save", false); bar.appendChild(saveB);
  const addB = BTN("Primary", "Add to trip", true); bar.appendChild(addB); try { addB.layoutSizingHorizontal = "FILL"; addB.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  finish(f, c, [statusAt("Clear"), bar]);
  back(bk); link(segs["Etiquette"], "phrases", "push"); link(walk, "exp", "push"); link(eh.action, "search", "dissolve");
  link(arBtn, "lens", "up"); link(addB, "tripsAdded", "smart");
  await caption(sec, f, "06", "Destination · Penang", "Sheet overlaps the photo; sticky action bar. Etiquette tab → culture guide. 'Open Heritage Lens' → AR.");
}
async function buildExperience(sec) {
  const f = screen("exp", "07 Experience – Heritage walk", sec, 3, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 330, "penangUmbrella");
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 60;
  const sh = ALw("VERTICAL", "Sheet", W, 16); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 140, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  const tag = pill("Category", "pandan100", 1, 6, 12, 6); sh.appendChild(tag); I(tag, "landmark", 14, "pandan900"); await T(tag, "Cultural heritage", "Label/S", "pandan900");
  await T(sh, "George Town heritage walk", "Mobile/Display M", "ink", { fill: true });
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, "George Town, Penang", "Body/S", "muted");
  const meta = AL("HORIZONTAL", "Meta", 8); add(sh, meta, true); meta.layoutWrap = "WRAP"; meta.counterAxisSpacing = 8;
  for (const [ic, t] of [["clock", "About 3 hours"], ["sun", "Best in the morning"], ["route", "Easy, flat walking"]]) { const p = pill("Meta", "mist", 1, 7, 12, 6); meta.appendChild(p); I(p, ic, 14, "muted"); await T(p, t, "Label/S", "ink"); }
  // audio guide (voice interface)
  const au = AL("HORIZONTAL", "Audio guide", 12); add(sh, au, true); au.counterAxisAlignItems = "CENTER"; pad(au, 12, 14); radius(au, 18); paintTo(au, "mist");
  au.appendChild(circleBtn("Play", "play", 44, "pandan900", 1, "kaya400", 18));
  const ac = AL("VERTICAL", "Text", 2); add(au, ac, true); await T(ac, "Listen to the story", "Label/M", "ink"); await T(ac, "3 min · EN / BM · captions on", "Body/S", "muted");
  I(au, "wave", 28, "kaya500");
  await T(sh, "Route", "Heading/M", "ink");
  const stops = [["Armenian Street", "Murals and restored shophouses. Start before 9 am, before the heat."], ["Khoo Kongsi", "An ornate clan temple. There is an entry fee; check opening hours."], ["Chew Jetty", "A clan village on stilts. People live here, so keep voices down."], ["Kopi break", "Order kopi-o (black coffee with sugar) at a nearby kopitiam."]];
  for (const [i, [t, d]] of stops.entries()) {
    const r = AL("HORIZONTAL", "Stop " + (i + 1), 14); add(sh, r, true);
    const rail = AL("VERTICAL", "Rail", 0); r.appendChild(rail); rail.counterAxisAlignItems = "CENTER";
    const dot = AL("HORIZONTAL", "Dot"); dot.resize(26, 26); dot.primaryAxisSizingMode = "FIXED"; dot.counterAxisSizingMode = "FIXED"; dot.primaryAxisAlignItems = "CENTER"; dot.counterAxisAlignItems = "CENTER"; radius(dot, 13); paintTo(dot, i === stops.length - 1 ? "kaya400" : "pandan900"); rail.appendChild(dot);
    await T(dot, String(i + 1), "Label/S", i === stops.length - 1 ? "pandan900" : "kaya400", { size: 12 });
    if (i < stops.length - 1) rect(rail, "Line", 2, 40, "line", 1, 1);
    const col = AL("VERTICAL", "Text", 3); add(r, col, true); col.paddingTop = 2;
    await T(col, t, "Heading/S", "ink"); await T(col, d, "Body/S", "muted", { fill: true });
  }
  const guest = ALw("VERTICAL", "Be a good guest", 353, 10); sh.appendChild(guest); pad(guest, 18); radius(guest, 20); paintTo(guest, "kaya100");
  await T(guest, "Be a good guest", "Heading/S", "ink");
  for (const t of ["Ask before photographing people.", "Take shoes off where you see others do.", "Carry small notes for entry fees and snacks."]) {
    const r = AL("HORIZONTAL", "Tip", 10); add(guest, r, true); r.counterAxisAlignItems = "CENTER"; I(r, "check", 16, "pandan500", 2.5); await T(r, t, "Body/S", "ink", { fill: true });
  }
  const bar = actionBar("Action bar"); const addB = fullBtn(bar, "Primary", "Add to Day 1 · Sat 17 Oct");
  finish(f, c, [statusAt("Clear"), bar]);
  back(bk); link(addB, "tripsAdded", "smart");
  await caption(sec, f, "07", "Experience · Heritage walk", "Audio guide with captions (voice feature), numbered route, etiquette tips. 'Add to Day 1' → Trips.");
}
async function buildPhrases(sec) {
  const f = screen("phrases", "08 Culture guide – Phrases", sec, 4, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = circleBtn("Back", "arrowLeft", 44, "surface", 1, "ink", 20); bk.strokes = [solid("line")]; bk.strokeWeight = 1; bk.strokeAlign = "INSIDE"; c.appendChild(bk);
  await T(c, "Culture guide", "Mobile/Display M", "ink");
  await T(c, "Everyday phrases and etiquette, with audio and captions.", "Body/M", "muted", { fill: true });
  const seg = AL("HORIZONTAL", "Segmented control", 4); add(c, seg, true); pad(seg, 4); radius(seg, 999); paintTo(seg, "surface");
  for (const [i, l] of ["Phrases", "Etiquette", "Festivals"].entries()) { const s = AL("HORIZONTAL", "Seg/" + l); add(seg, s, true); s.primaryAxisAlignItems = "CENTER"; pad(s, 9, 8); radius(s, 999); if (i === 0) paintTo(s, "pandan900"); else s.fills = []; await T(s, l, "Label/S", i === 0 ? "onDark" : "muted"); }
  const phrases = [["Terima kasih", "teh-REE-mah KAH-see", "Thank you"], ["Tumpang lalu", "toom-PAHNG LAH-loo", "Excuse me, may I pass?"], ["Berapa harga?", "beh-RAH-pah HAR-gah", "How much is it?"], ["Tak nak pedas", "tahk nahk peh-DAHS", "Not spicy, please"], ["Boleh tolong saya?", "BOH-leh TOH-long SAH-yah", "Could you help me?"]];
  for (const [bm, pron, en] of phrases) {
    const card = AL("HORIZONTAL", "Phrase/" + bm, 12); add(c, card, true); card.counterAxisAlignItems = "CENTER"; pad(card, 14, 14, 14, 16); radius(card, 18); paintTo(card, "surface");
    const col = AL("VERTICAL", "Text", 3); add(card, col, true);
    await T(col, bm, "Heading/S", "ink"); await T(col, pron, "Mono/S", "pandan500"); await T(col, en, "Body/S", "muted");
    card.appendChild(circleBtn("Play " + bm, "volume", 44, "pandan100", 1, "pandan900", 20));
  }
  const pr = AL("HORIZONTAL", "Practise", 14); add(c, pr, true); pr.counterAxisAlignItems = "CENTER"; pad(pr, 16); radius(pr, 20); paintTo(pr, "pandan900");
  pr.appendChild(circleBtn("Mic", "mic", 52, "kaya400", 1, "pandan900", 24));
  const pc = AL("VERTICAL", "Text", 3); add(pr, pc, true); await T(pc, "Practise out loud", "Heading/S", "onDark"); await T(pc, "Say a phrase and Tourix gives feedback on your pronunciation.", "Body/S", "onDarkMuted", { fill: true });
  await T(c, "Everyday etiquette", "Heading/M", "ink");
  for (const [ic, t] of [["hand", "Give and receive things with your right hand."], ["compass", "Point with your thumb rather than your index finger."], ["utensils", "If you eat halal, look for the JAKIM halal logo."], ["home", "Take shoes off before entering someone's home."]]) {
    const r = AL("HORIZONTAL", "Etiquette", 12); add(c, r, true); r.counterAxisAlignItems = "CENTER";
    r.appendChild(circleBtn("Icon", ic, 40, "surface", 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true });
  }
  finish(f, c, [statusAt("Light"), tabAt("Home")]);
  back(bk);
  await caption(sec, f, "08", "Culture guide", "Community & connection focus: phrases with pronunciation, audio and practice (voice), everyday etiquette.");
}
// ===================== FLOW 3 · PLAN =====================
async function buildTrips(sec, col, added) {
  const key = added ? "tripsAdded" : "trips";
  const f = screen(key, added ? "09 Trips – Just added" : "10 Trips", sec, col, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 18;
  const hr = AL("HORIZONTAL", "Title row", 8); add(c, hr, true); hr.primaryAxisAlignItems = "SPACE_BETWEEN"; hr.counterAxisAlignItems = "CENTER";
  await T(hr, "Trips", "Mobile/Display M", "ink");
  hr.appendChild(circleBtn("New trip", "plus", 44, "pandan900", 1, "kaya400", 20));
  const card = ALw("VERTICAL", "Trip card", 353, 10); c.appendChild(card); pad(card, 20); radius(card, 24); paintTo(card, "pandan900"); card.clipsContent = true;
  const g = ellipse(null, "Glow", 240, 200, "kaya400", 0.2); abs(card, g, 180, -80); g.effects = [{ type: "LAYER_BLUR", radius: 80, visible: true }];
  await T(card, "UPCOMING · 2 TRAVELLERS", "Eyebrow", "kaya400");
  await T(card, "Weekend in Penang", "Display/S", "onDark");
  const d = AL("HORIZONTAL", "Dates", 8); card.appendChild(d); d.counterAxisAlignItems = "CENTER"; I(d, "calendar", 16, "onDarkMuted"); await T(d, "Sat 17 – Sun 18 Oct 2026", "Body/S", "onDarkMuted");
  const sy = pill("Sync status", "onDark", 0.1, 6, 10, 6); card.appendChild(sy); I(sy, "sync", 14, "kaya400"); await T(sy, "Synced on iPhone and laptop · just now", "Mono/S", "onDark");
  const tabs = AL("HORIZONTAL", "Day tabs", 8); c.appendChild(tabs); tabs.appendChild(CHIP("Day 1 · Sat", true)); tabs.appendChild(CHIP("Day 2 · Sun", false));
  // stylised map preview
  const map = figma.createFrame(); map.name = "Map preview"; c.appendChild(map); map.layoutSizingHorizontal = "FILL"; map.resize(353, 160); radius(map, 20); map.clipsContent = true; paintTo(map, "pandan100");
  const land = figma.createNodeFromSvg(`<svg width="353" height="160" viewBox="0 0 353 160" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H353V160H0Z" fill="#CFE3EA"/><path d="M40 -10 C 120 20 150 70 210 80 S 330 60 370 120 L 370 -10 Z" fill="${HEX.pandan100}"/><path d="M-10 90 C 40 110 80 170 70 175 L -10 175 Z" fill="${HEX.pandan100}"/><path d="M70 40 C 120 60 150 30 190 60 S 250 110 300 70" fill="none" stroke="${HEX.kaya500}" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 8"/></svg>`);
  land.name = "Map art"; map.appendChild(land); land.x = 0; land.y = 0;
  const pins = [[70, 40], [140, 50], [208, 72], [300, 70]];
  for (const [i, [x, y]] of pins.entries()) { const p = circleBtn("Pin " + (i + 1), "pin", 26, i === 1 ? "kaya400" : "pandan900", 1, i === 1 ? "pandan900" : "kaya400", 13); map.appendChild(p); p.x = x - 13; p.y = y - 13; }
  const ml = pill("Map label", "surface", 0.94, 5, 10, 6); map.appendChild(ml); ml.x = 12; ml.y = 122; I(ml, "pin", 12, "pandan500"); await T(ml, "George Town · 4 stops · 3.2 km", "Mono/S", "ink");
  const items = [["08:00", "Breakfast at a kopitiam", "Roti canai and teh tarik near Lebuh Chulia", false], ["09:30", "George Town heritage walk", "About 3 hours · Armenian Street → Chew Jetty", true], ["13:00", "Lunch at a hawker centre", "Order from several stalls, share a table", false], ["16:30", "Penang Hill", "Funicular up for sunset views", false]];
  for (const [t, title, sub, isNew] of items) {
    const r = AL("HORIZONTAL", "Stop/" + title, 12); add(c, r, true);
    await T(r, t, "Mono/S", "muted", { w: 44 });
    const k = AL("VERTICAL", "Card", 4); add(r, k, true); pad(k, 14); radius(k, 16); paintTo(k, "surface");
    k.strokes = [solid(isNew ? "kaya500" : "line")]; k.strokeWeight = isNew ? 2 : 1; k.strokeAlign = "INSIDE";
    if (isNew) { const nb = pill("New badge", "kaya400", 1, 3, 8, 4); k.appendChild(nb); await T(nb, "JUST ADDED", "Eyebrow", "pandan900", { size: 10 }); }
    await T(k, title, "Heading/S", "ink", { fill: true }); await T(k, sub, "Body/S", "muted", { fill: true });
  }
  const br = AL("HORIZONTAL", "Buttons", 12); add(c, br, true);
  const a1 = BTN("Outline", "Add a stop", false); br.appendChild(a1); try { a1.layoutSizingHorizontal = "FILL"; a1.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  const a2 = BTN("Dark", "Share plan", false); br.appendChild(a2); try { a2.layoutSizingHorizontal = "FILL"; a2.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  // toast (present on both screens so Smart Animate can slide it away)
  const toast = pill("Toast", "pandan900", 1, 12, 16, 10); toast.effects = SHADOW2;
  toast.appendChild(circleBtn("Tick", "check", 24, "kaya400", 1, "pandan900", 14));
  await T(toast, "Added to Day 1", "Label/M", "onDark"); await T(toast, "Undo", "Label/M", "kaya400");
  const fixed = [statusAt("Light"), tabAt("Trips")];
  finish(f, c, fixed);
  f.insertChild(f.children.length - fixed.length, toast);
  toast.x = (W - toast.width) / 2; toast.y = added ? 60 : -80; toast.opacity = added ? 1 : 0;
  if (added) after(f, "trips", 2.4, "smart");
  link(a1, "search", "dissolve");
  await caption(sec, f, added ? "09" : "10", added ? "Trips · just added" : "Trips", added ? "Toast confirms the action, then slides away (After delay 2.4 s → Smart animate)." : "Day plan with map, cross-device sync status (advanced feature: cross-platform sync).");
}
async function settingsGroup(parent, title, rows) {
  await T(parent, title, "Eyebrow", "muted");
  const g = AL("VERTICAL", "Group/" + title, 0); add(parent, g, true); radius(g, 20); paintTo(g, "surface"); g.clipsContent = true;
  for (const [i, row] of rows.entries()) {
    const r = AL("HORIZONTAL", "Row/" + row.label, 12); add(g, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 12, 16);
    r.appendChild(circleBtn("Icon", row.icon, 36, "pandan100", 1, "pandan900", 18));
    const col = AL("VERTICAL", "Text", 2); add(r, col, true); await T(col, row.label, "Label/M", "ink"); if (row.sub) await T(col, row.sub, "Body/S", "muted", { fill: true });
    if (row.toggle !== undefined) r.appendChild(TOGGLE(row.toggle));
    else if (row.value) { await T(r, row.value, "Body/S", "muted"); I(r, "chevRight", 18, "muted"); }
    if (row.slider) {
      const s = AL("HORIZONTAL", "Slider", 10); add(g, s, true); s.counterAxisAlignItems = "CENTER"; pad(s, 0, 16, 14, 64);
      await T(s, "A", "Label/S", "muted", { size: 12 });
      const tr = figma.createFrame(); tr.name = "Track"; tr.fills = []; tr.resize(10, 20); add(s, tr, true);
      const base = rect(tr, "Rail", 200, 4, "line", 1, 2); base.y = 8; base.constraints = { horizontal: "STRETCH", vertical: "CENTER" };
      const fill = rect(tr, "Fill", 110, 4, "pandan500", 1, 2); fill.y = 8;
      const knob = figma.createEllipse(); knob.name = "Knob"; tr.appendChild(knob); knob.resize(20, 20); knob.x = 100; knob.y = 0; knob.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; knob.effects = SHADOW1;
      await T(s, "A", "Heading/M", "ink");
    }
    if (i < rows.length - 1) { const d = rect(null, "Divider", 10, 1, "line"); add(g, d, true); }
  }
  return g;
}
async function buildMe(sec) {
  const f = screen("me", "11 Me – Settings & accessibility", sec, 2, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 14;
  await T(c, "Me", "Mobile/Display M", "ink");
  const p = AL("HORIZONTAL", "Profile", 14); add(c, p, true); p.counterAxisAlignItems = "CENTER"; pad(p, 16); radius(p, 20); paintTo(p, "surface");
  p.appendChild(circleBtn("Avatar", "user", 56, "kaya400", 1, "pandan900", 26));
  const pc = AL("VERTICAL", "Text", 2); add(p, pc, true); await T(pc, "Guest explorer", "Heading/M", "ink"); await T(pc, "Kuala Lumpur · 3 saved places", "Body/S", "muted");
  await settingsGroup(c, "LANGUAGE & REGION", [{ icon: "languages", label: "Language", value: "English" }, { icon: "ruler", label: "Units", value: "km, °C" }]);
  await settingsGroup(c, "ACCESSIBILITY", [
    { icon: "type", label: "Text size", sub: "Follows iOS Dynamic Type", slider: true },
    { icon: "contrast", label: "High contrast", sub: "Stronger borders and text", toggle: false },
    { icon: "compass", label: "Reduce motion", sub: "Stops the 3D showcase auto-rotating", toggle: true },
    { icon: "volume", label: "Captions on audio", sub: "Text for every audio guide", toggle: true },
  ]);
  await settingsGroup(c, "OFFLINE & SYNC", [{ icon: "download", label: "Offline guide packs", value: "Penang · 24 MB" }, { icon: "sync", label: "Synced devices", value: "iPhone, laptop" }]);
  await settingsGroup(c, "ABOUT", [{ icon: "info", label: "About this prototype", value: "v0.1" }]);
  finish(f, c, [statusAt("Light"), tabAt("Me")]);
  await caption(sec, f, "11", "Me · settings", "Accessibility settings (text size, contrast, reduce motion, captions) and offline/sync. Toggles are interactive.");
}

// ===================== FLOW 4 · AR HERITAGE LENS (advanced feature) =====================
async function arLabel(f, name, title, sub, x, y, ax, ay, skew) {
  // leader line + anchor
  // leader sized to its own bounding box so it never covers (and blocks taps on) other labels
  const x1 = x + 24, y1 = y + 50, bx = Math.min(x1, ax) - 2, by = Math.min(y1, ay) - 2;
  const bw = Math.abs(ax - x1) + 4, bh = Math.abs(ay - y1) + 4;
  const ln = figma.createNodeFromSvg(`<svg width="${bw}" height="${bh}" viewBox="0 0 ${bw} ${bh}" xmlns="http://www.w3.org/2000/svg"><path d="M${x1 - bx} ${y1 - by} L${ax - bx} ${ay - by}" stroke="${HEX.kaya400}" stroke-width="1.5" stroke-dasharray="3 4"/></svg>`);
  ln.name = name + " · leader"; f.appendChild(ln); ln.x = bx; ln.y = by;
  const a = figma.createEllipse(); a.name = name + " · anchor"; f.appendChild(a); a.resize(14, 14); a.x = ax - 7; a.y = ay - 7; paintTo(a, "kaya400");
  a.effects = [{ type: "DROP_SHADOW", color: { r: 0.95, g: 0.76, b: 0.31, a: 0.9 }, offset: { x: 0, y: 0 }, radius: 12, spread: 4, visible: true, blendMode: "NORMAL" }];
  a.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; a.strokeWeight = 2;
  const card = AL("VERTICAL", name, 2); f.appendChild(card); pad(card, 10, 14); radius(card, 14); paintTo(card, "pandan900", 0.82);
  card.effects = [{ type: "BACKGROUND_BLUR", radius: 12, visible: true }, { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.35 }, offset: { x: 0, y: 10 }, radius: 24, spread: -4, visible: true, blendMode: "NORMAL" }];
  card.strokes = [solid("kaya400")]; card.strokeWeight = 1; card.strokeAlign = "INSIDE";
  await T(card, title, "Label/M", "onDark"); await T(card, sub, "Mono/S", "kaya400");
  // slight perspective skew so labels read as anchored in 3D space
  card.relativeTransform = [[1, 0, x], [skew, 1, y]];
  return card;
}
async function lensBase(key, name, sec, col, info) {
  const f = screen(key, name, sec, col, "ink");
  const photo = rect(f, "Camera feed", W, H, null); photo.fills = [img("penangUmbrella")];
  const t = rect(f, "Top shade", W, 200, null); t.fills = [vgrad("black", 0.65, 0)];
  const b = rect(f, "Bottom shade", W, 320, null); b.y = H - 320; b.fills = [vgrad("black", 0, 0.8)];
  // reticle
  const ret = figma.createNodeFromSvg(`<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="${HEX.kaya400}" stroke-width="3" stroke-linecap="round"><path d="M2 40V14a12 12 0 0 1 12-12h26"/><path d="M200 2h26a12 12 0 0 1 12 12v26"/><path d="M238 200v26a12 12 0 0 1-12 12h-26"/><path d="M40 238H14a12 12 0 0 1-12-12v-26"/></g></svg>`);
  ret.name = "Reticle"; f.appendChild(ret); ret.x = 76; ret.y = 250; ret.opacity = info ? 0.3 : 1;
  const det = pill("Detected", "pandan900", 0.82, 6, 12, 8); f.appendChild(det); const dd = figma.createEllipse(); dd.resize(8, 8); paintTo(dd, "kaya400"); det.appendChild(dd); await T(det, "Shophouse detected", "Label/S", "onDark"); det.x = (W - det.width) / 2; det.y = 214; det.opacity = info ? 0 : 1;
  const l1 = await arLabel(f, "AR label · Five-foot way", "Five-foot way", "kaki lima · tap to learn", 24, 468, 110, 600, -0.06);
  const l2 = await arLabel(f, "AR label · Shophouse façade", "Straits shophouse façade", "History · 2 min", 170, 330, 270, 450, 0.06);
  const l3 = await arLabel(f, "AR label · Kopitiam", "Kopitiam nearby", "Food · 120 m", 214, 548, 300, 625, 0.05);
  if (info) { for (const n of [l2, l3]) n.opacity = 0.35; }
  // top bar
  const close = circleBtn("Close", "x", 44, "black", 0.45, "onDark", 20); f.appendChild(close); close.x = 20; close.y = 58;
  const tt = pill("Title", null, 1, 6, 10, 8); f.appendChild(tt); await T(tt, "Heritage Lens", "Label/M", "onDark"); const arb = pill("AR", "kaya400", 1, 2, 7, 0); tt.appendChild(arb); await T(arb, "AR", "Eyebrow", "pandan900", { size: 10 });
  tt.x = (W - tt.width) / 2; tt.y = 64;
  const inf = circleBtn("Help", "info", 44, "black", 0.45, "onDark", 20); f.appendChild(inf); inf.x = W - 64; inf.y = 58;
  // bottom controls
  const bottom = ALw("VERTICAL", "Controls", W, 16); f.appendChild(bottom); bottom.counterAxisAlignItems = "CENTER"; pad(bottom, 0, 20, 40, 20);
  await T(bottom, "Point at a shophouse façade. Tap a label to learn more.", "Body/S", "onDark", { align: "CENTER", fill: true });
  const modes = pill("Modes", "black", 0.45, 4, 4, 4); bottom.appendChild(modes);
  for (const [i, m] of ["History", "Phrases", "Food nearby"].entries()) { const p = pill("Mode/" + m, i === 0 ? "kaya400" : null, 1, 8, 14, 0); modes.appendChild(p); await T(p, m, "Label/S", i === 0 ? "pandan900" : "onDark"); }
  const cr = AL("HORIZONTAL", "Capture row", 44); bottom.appendChild(cr); cr.counterAxisAlignItems = "CENTER";
  cr.appendChild(circleBtn("Gallery", "image", 48, "black", 0.45, "onDark", 22));
  const shutter = AL("HORIZONTAL", "Capture"); shutter.resize(76, 76); shutter.primaryAxisSizingMode = "FIXED"; shutter.counterAxisSizingMode = "FIXED"; shutter.primaryAxisAlignItems = "CENTER"; shutter.counterAxisAlignItems = "CENTER"; radius(shutter, 38); shutter.fills = []; shutter.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; shutter.strokeWeight = 4; shutter.strokeAlign = "INSIDE";
  const inner = figma.createEllipse(); inner.name = "Inner"; inner.resize(58, 58); paintTo(inner, "kaya400"); shutter.appendChild(inner); cr.appendChild(shutter);
  cr.appendChild(circleBtn("Ask by voice", "mic", 48, "black", 0.45, "onDark", 22));
  bottom.x = 0; bottom.y = H - bottom.height; bottom.opacity = info ? 0 : 1;
  // scrim + info sheet (sheet sits off-screen on the Lens screen so Smart Animate slides it up)
  const scrim = rect(f, "Scrim", W, H, "pandan900", 0.45); scrim.opacity = info ? 1 : 0; scrim.visible = !!info;
  const sh = ALw("VERTICAL", "Info sheet", W, 12); f.appendChild(sh); pad(sh, 10, 24, 40, 24); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28; sh.effects = SHADOW2;
  const hb = AL("HORIZONTAL", "Handle row"); add(sh, hb, true); hb.primaryAxisAlignItems = "CENTER"; rect(hb, "Handle", 40, 5, "line", 1, 3);
  const top = AL("HORIZONTAL", "Sheet top", 8); add(sh, top, true); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
  await T(top, "ARCHITECTURE · GEORGE TOWN", "Eyebrow", "pandan500");
  const x = circleBtn("Close sheet", "x", 36, "mist", 1, "ink", 18); top.appendChild(x);
  await T(sh, "The five-foot way", "Mobile/Display M", "ink");
  await T(sh, "In Malay: kaki lima", "Mono/S", "pandan500");
  await T(sh, "The covered walkway in front of shophouses, roughly five feet wide. It gives shade and shared passage. Shopkeepers often use it, so walk around their goods rather than through them.", "Body/M", "ink", { fill: true });
  const au = AL("HORIZONTAL", "Audio", 12); add(sh, au, true); au.counterAxisAlignItems = "CENTER"; pad(au, 10, 12); radius(au, 16); paintTo(au, "mist");
  au.appendChild(circleBtn("Play", "play", 40, "pandan900", 1, "kaya400", 16)); const ac = AL("VERTICAL", "Text", 2); add(au, ac, true); await T(ac, "Listen · 1 min", "Label/M", "ink"); await T(ac, "English · Bahasa Melayu · captions on", "Body/S", "muted");
  const br = AL("HORIZONTAL", "Buttons", 12); add(sh, br, true);
  const s1 = BTN("Outline", "Save", false); br.appendChild(s1);
  const s2 = BTN("Primary", "Next landmark", true); br.appendChild(s2); try { s2.layoutSizingHorizontal = "FILL"; s2.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  sh.x = 0; sh.y = info ? H - sh.height : H + 20;
  f.appendChild(statusAt("Clear")); f.numberOfFixedChildren = 1;
  return { f, l1, close, x, scrim, s2 };
}
async function buildLens(sec) {
  const a = await lensBase("lens", "12 AR Heritage Lens", sec, 0, false);
  link(a.l1, "lensInfo", "smart"); back(a.close);
  await caption(sec, a.f, "12", "AR Heritage Lens", "Advanced feature (AR). Labels are skewed to sit in 3D space. Tap 'Five-foot way'.");
  const b = await lensBase("lensInfo", "13 AR Lens – Landmark info", sec, 1, true);
  link(b.x, "lens", "smart"); link(b.scrim, "lens", "smart"); link(b.s2, "lens", "smart"); back(b.close);
  await caption(sec, b.f, "13", "AR · landmark info", "Bottom sheet slides up (Smart animate) with audio and the Malay term.");
}
// ===================== TOURIX v2 · improvements + new pages =====================
// Runs on the existing "Mobile Prototype (iOS)" page. Adds 12 screens, 2 interactive components,
// accessibility fixes and new prototype links. Existing screens are edited only where listed in CHANGES.
ICONS.pause = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
ICONS.wifiOff = '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>';
ICONS.camera = '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>';
ICONS.shield = '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>';
ICONS.sparkles = '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>';
ICONS.utensils2 = ICONS.utensils;
HEX.lineStrong = "#7C8C84";
const CHANGES = [];
const NAMES = { splash: "01 Splash", lang: "02 Onboarding – Language", interests: "03 Onboarding – Interests", home: "04 Home", search: "05 Explore – Search", dest: "06 Destination – Penang", exp: "07 Experience – Heritage walk", phrases: "08 Culture guide – Phrases", tripsAdded: "09 Trips – Just added", trips: "10 Trips", me: "11 Me – Settings & accessibility", lens: "12 AR Heritage Lens", lensInfo: "13 AR Lens – Landmark info" };
const SEC = {};
let RESTACK_Y = 0;
const inS = (key, nm) => (S[key] ? S[key].findOne((n) => n.name === nm) : null);

// ---------- helpers ----------
async function hotspot(node, name) {
  // wraps a small text link in a 44pt-high tap target and moves its reactions to the wrapper
  if (!node || !node.parent) return node;
  const p = node.parent; const idx = p.children.indexOf(node);
  const w = AL("HORIZONTAL", name || "Hotspot/" + node.name); w.counterAxisAlignItems = "CENTER"; w.primaryAxisAlignItems = "CENTER"; pad(w, 12, 8);
  p.insertChild(idx, w); w.appendChild(node);
  const r = cleanReactions(node.reactions);
  if (r.length) { await node.setReactionsAsync([]); await w.setReactionsAsync(r); }
  return w;
}
function topBack(c, label) {
  const bk = circleBtn("Back", "arrowLeft", 44, "surface", 1, "ink", 20); bk.strokes = [solid("line")]; bk.strokeWeight = 1; bk.strokeAlign = "INSIDE"; c.appendChild(bk);
  return bk;
}
function seg(parent, labels, active, dark = false) {
  const s = AL("HORIZONTAL", "Segmented control", 4); add(parent, s, true); pad(s, 4); radius(s, 999); paintTo(s, dark ? "surface" : "mist");
  const out = {};
  return (async () => {
    for (const [i, l] of labels.entries()) {
      const it = AL("HORIZONTAL", "Seg/" + l); add(s, it, true); it.primaryAxisAlignItems = "CENTER"; pad(it, 9, 8); radius(it, 999);
      if (i === active) paintTo(it, "pandan900"); else it.fills = [];
      await T(it, l, "Label/S", i === active ? "onDark" : "muted"); out[l] = it;
    }
    return out;
  })();
}
function progressBar(parent, pct, w = 200) {
  const tr = figma.createFrame(); tr.name = "Progress"; tr.resize(w, 6); radius(tr, 3); paintTo(tr, "line"); tr.clipsContent = true;
  const f = rect(tr, "Fill", Math.max(2, w * pct), 6, "pandan500", 1, 3); f.x = 0; f.y = 0;
  if (parent) add(parent, tr, true);
  return tr;
}

// ---------- 0 · locate everything ----------
async function locate() {
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)");
  if (!MOB) throw new Error("Page 'Mobile Prototype (iOS)' not found");
  await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  for (const sec of MOB.children.filter((n) => n.type === "SECTION")) SEC[sec.name] = sec;
  for (const [k, nm] of Object.entries(NAMES)) { const f = MOB.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION"); if (f) S[k] = f; else PROBLEMS.push("Missing screen " + nm); }
  const kit = Object.values(SEC).find((s) => s.name.startsWith("Mobile kit"));
  const kc = (nm) => kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === nm);
  KIT.status = kc("Status Bar (iOS)"); KIT.tab = kc("Tab Bar (iOS)"); KIT.interest = kc("Interest Tile"); KIT.toggle = kc("Toggle"); KIT.section = kit;
  if (MOB.findOne((n) => n.type === "FRAME" && n.name === "14 Destination – Melaka")) throw new Error("Tourix v2 has already been applied to this page (14 Destination – Melaka exists).");
}
function sectionOf(prefix) { return Object.values(SEC).find((s) => s.name.startsWith(prefix)); }

// ---------- 1 · tokens + design-system fixes ----------
async function tokensAndFixes() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const col = cols.find((c) => /tokens/i.test(c.name)) || cols[0];
  const all = await Promise.all(col.variableIds.map((id) => figma.variables.getVariableByIdAsync(id)));
  let v = all.find((x) => x && x.name === "color/line-strong");
  if (!v) { v = figma.variables.createVariable("color/line-strong", col, "COLOR"); v.setValueForMode(col.modes[0].modeId, rgb(HEX.lineStrong)); v.scopes = ["STROKE_COLOR", "FRAME_FILL", "SHAPE_FILL"]; v.description = "Control boundaries that must reach 3:1 (toggle-off track, radio rings, input borders). 3.5:1 on white."; CHANGES.push("New token color/line-strong #7C8C84"); }
  V.lineStrong = v;
  // Toggle off track
  const off = variant(KIT.toggle, "On=No"); if (off) { paintTo(off, "lineStrong"); CHANGES.push("Toggle off track → line-strong (1.35:1 → 3.5:1)"); }
  // Save button: 44pt hit area
  for (const s of C.save.children) { try { s.resize(44, 44); } catch (e) { } } CHANGES.push("Save Button 40 → 44 pt");
  // Search Field (DS) focused ring
  const sfF = variant(C.sf, "State=Focused"); if (sfF) { sfF.strokes = [solid("pandan900")]; sfF.strokeWeight = 2; CHANGES.push("Search Field focus ring → pandan-900 2 pt"); }
  // Explore focused field
  const ef = inS("search", "Search field (focused)"); if (ef) { ef.strokes = [solid("pandan900")]; ef.strokeWeight = 2; }
  // Status bar on scrolling detail screens: solid instead of transparent
  for (const k of ["dest", "exp"]) { const sb = inS(k, "Status Bar"); if (sb && sb.type === "INSTANCE") sb.swapComponent(variant(KIT.status, "Theme=Dark")); }
  CHANGES.push("06/07 status bar Clear → Dark (no text under the clock when scrolling)");
  // 10 Trips: remove the stale 'JUST ADDED' badge
  const nb = inS("trips", "New badge"); if (nb) { const card = nb.parent; nb.remove(); card.strokes = [solid("line")]; card.strokeWeight = 1; CHANGES.push("10 Trips: removed stale JUST ADDED badge"); }
  // Interests counter (static) → honest helper text
  const cnt = inS("interests", "Count"); if (cnt) { cnt.characters = "You can change these any time in Me"; }
  // 44pt tap targets for text links
  for (const [k, nm] of [["lang", "Skip"], ["interests", "Skip"], ["search", "Cancel"]]) { const n = inS(k, nm); if (n) await hotspot(n, "Hotspot/" + nm); }
  for (const k of ["home", "dest"]) for (const n of S[k].findAll((x) => x.type === "TEXT" && x.name === "Action")) await hotspot(n, "Hotspot/See all");
  CHANGES.push("Text links wrapped in 44 pt tap targets (Skip, Cancel, See all)");
}

// ---------- 2 · 3D showcase: pause / play (WCAG 2.2.2) ----------
async function showcasePause() {
  const set = C.showcase; const originals = set.children.filter((v) => !/Motion=/.test(v.name));
  if (!originals.length) return;
  const sa = (d) => ({ type: "SMART_ANIMATE", easing: { type: "CUSTOM_CUBIC_BEZIER", easingFunctionCubicBezier: { x1: 0.22, y1: 1, x2: 0.36, y2: 1 } }, duration: d });
  const ch = (dest, d = 0.6) => ({ type: "NODE", destinationId: dest.id, navigation: "CHANGE_TO", transition: sa(d), preserveScrollPosition: false });
  const front = (v) => v.name.replace(/^Front=/, "").replace(/, Motion=.*$/, "");
  const auto = [], paused = [];
  for (const v of originals) {
    const fr = front(v); const p = v.clone(); set.appendChild(p);
    v.name = "Front=" + fr + ", Motion=Auto"; p.name = "Front=" + fr + ", Motion=Paused";
    auto.push(v); paused.push(p);
  }
  const N = auto.length;
  for (let k = 0; k < N; k++) {
    for (const [arr, mode] of [[auto, "Auto"], [paused, "Paused"]]) {
      const v = arr[k], twin = (mode === "Auto" ? paused : auto)[k], nx = arr[(k + 1) % N], pv = arr[(k - 1 + N) % N];
      const ctr = v.findOne((n) => n.name === "Controls");
      const b = circleBtn(mode === "Auto" ? "Pause" : "Play", mode === "Auto" ? "pause" : "play", 48, mode === "Auto" ? "onDark" : "kaya400", mode === "Auto" ? 0.1 : 1, mode === "Auto" ? "onDark" : "pandan900", 18);
      if (mode === "Auto") { b.strokes = [solid("onDark")]; b.strokeWeight = 1; b.strokeAlign = "INSIDE"; setOpacity(b, "strokes", 0.35); }
      ctr.appendChild(b); ctr.x = 320 - ctr.width / 2;
      await b.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [ch(twin, 0.2)] }]);
      await v.findOne((n) => n.name === "Next").setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [ch(nx)] }]);
      await v.findOne((n) => n.name === "Prev").setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [ch(pv)] }]);
      const fc = v.findOne((n) => n.name === "Card/" + front(v)); if (fc) await fc.setReactionsAsync([{ trigger: { type: "ON_DRAG" }, actions: [ch(nx)] }]);
      await v.setReactionsAsync(mode === "Auto" ? [{ trigger: { type: "AFTER_TIMEOUT", timeout: 3.2 }, actions: [ch(nx, 0.7)] }] : []);
    }
  }
  set.description = (set.description || "") + " v2: Motion=Auto|Paused. Pause button stops auto-rotation (WCAG 2.2.2); Play resumes. Use Motion=Paused when Reduce motion is on.";
  CHANGES.push("3D Showcase: added Motion=Auto|Paused variants with a pause/play button (12 variants)");
}

// ---------- 3 · new interactive components ----------
const LANGS = [["EN", "English", "Default"], ["BM", "Bahasa Melayu", "Bahasa Malaysia"], ["中", "中文", "Mandarin (Simplified)"], ["த", "தமிழ்", "Tamil"]];
async function buildLanguagePicker() {
  const vs = [];
  for (const [selCode] of LANGS) {
    const c = figma.createComponent(); c.name = "Selected=" + ({ "中": "ZH", "த": "TA" }[selCode] || selCode);
    c.layoutMode = "VERTICAL"; c.resize(345, 10); c.counterAxisSizingMode = "FIXED"; c.primaryAxisSizingMode = "AUTO"; c.itemSpacing = 10; c.fills = [];
    for (const [code, label, sub] of LANGS) {
      const on = code === selCode;
      const o = AL("HORIZONTAL", "Option/" + sub, 14); add(c, o, true); o.counterAxisAlignItems = "CENTER"; pad(o, 14, 16); radius(o, 18);
      paintTo(o, on ? "kaya100" : "surface"); o.strokes = [solid(on ? "pandan900" : "line")]; o.strokeWeight = on ? 2 : 1; o.strokeAlign = "INSIDE";
      const b = AL("HORIZONTAL", "Code"); b.resize(44, 44); b.primaryAxisSizingMode = "FIXED"; b.counterAxisSizingMode = "FIXED"; b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER"; radius(b, 12); paintTo(b, on ? "pandan900" : "pandan100"); o.appendChild(b);
      await T(b, code, "Label/M", on ? "kaya400" : "pandan900");
      const col = AL("VERTICAL", "Text", 2); add(o, col, true); await T(col, label, "Heading/S", "ink"); await T(col, sub, "Body/S", "muted");
      const radio = AL("HORIZONTAL", "Radio"); radio.resize(24, 24); radio.primaryAxisSizingMode = "FIXED"; radio.counterAxisSizingMode = "FIXED"; radio.primaryAxisAlignItems = "CENTER"; radio.counterAxisAlignItems = "CENTER"; radius(radio, 12); o.appendChild(radio);
      if (on) { paintTo(radio, "pandan900"); I(radio, "check", 14, "kaya400", 3); } else { radio.fills = []; radio.strokes = [solid("lineStrong")]; radio.strokeWeight = 2; radio.strokeAlign = "INSIDE"; }
    }
    vs.push(c);
  }
  const set = figma.combineAsVariants(vs, KIT.section); set.name = "Language Picker";
  set.layoutMode = "HORIZONTAL"; set.itemSpacing = 24; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "mist");
  const sm = { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.2 };
  for (const v of vs) for (const [i, [, , sub]] of LANGS.entries()) {
    const row = v.findOne((n) => n.name === "Option/" + sub);
    if (vs[i] !== v) await row.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs[i].id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  }
  set.description = "Single-choice language list. Tapping a row selects it (radio behaviour) in the prototype. Unselected radio rings use line-strong (3.5:1).";
  KIT.langPicker = set; CHANGES.push("New component Language Picker (EN/BM/ZH/TA, interactive)");
  return set;
}
const PHRASES = [["Terima kasih", "teh-REE-mah KAH-see", "Thank you"], ["Tumpang lalu", "toom-PAHNG LAH-loo", "Excuse me, may I pass?"], ["Berapa harga?", "beh-RAH-pah HAR-gah", "How much is it?"], ["Tak nak pedas", "tahk nahk peh-DAHS", "Not spicy, please"], ["Boleh tolong saya?", "BOH-leh TOH-long SAH-yah", "Could you help me?"]];
async function buildPhraseCard() {
  const vs = {};
  for (const playing of [false, true]) {
    const c = figma.createComponent(); c.name = "Playing=" + (playing ? "Yes" : "No");
    c.layoutMode = "HORIZONTAL"; c.resize(353, 10); c.primaryAxisSizingMode = "FIXED"; c.counterAxisSizingMode = "AUTO"; c.itemSpacing = 12; c.counterAxisAlignItems = "CENTER"; pad(c, 14, 14, 14, 16); radius(c, 18);
    paintTo(c, playing ? "kaya100" : "surface"); if (playing) { c.strokes = [solid("kaya500")]; c.strokeWeight = 1.5; c.strokeAlign = "INSIDE"; }
    const col = AL("VERTICAL", "Text", 3); add(c, col, true);
    await T(col, "Terima kasih", "Heading/S", "ink", { name: "Malay" }); await T(col, "teh-REE-mah KAH-see", "Mono/S", "pandan500", { name: "Pronunciation" }); await T(col, "Thank you", "Body/S", "muted", { name: "English" });
    if (playing) { const pr = AL("HORIZONTAL", "Playing", 6); pr.counterAxisAlignItems = "CENTER"; col.appendChild(pr); I(pr, "wave", 16, "kaya500"); await T(pr, "Playing · 0:02 · captions on", "Mono/S", "pandan700"); }
    const b = circleBtn("Play button", playing ? "pause" : "volume", 44, playing ? "pandan900" : "pandan100", 1, playing ? "kaya400" : "pandan900", 20); c.appendChild(b);
    vs[playing ? "yes" : "no"] = c;
  }
  const set = figma.combineAsVariants([vs.no, vs.yes], KIT.section); set.name = "Phrase Card";
  set.layoutMode = "VERTICAL"; set.itemSpacing = 16; pad(set, 20); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "mist");
  const keys = { Malay: set.addComponentProperty("Malay", "TEXT", "Terima kasih"), Pronunciation: set.addComponentProperty("Pronunciation", "TEXT", "teh-REE-mah KAH-see"), English: set.addComponentProperty("English", "TEXT", "Thank you") };
  for (const v of set.children) for (const k of Object.keys(keys)) { const t = v.findOne((n) => n.type === "TEXT" && n.name === k); if (t) t.componentPropertyReferences = { characters: keys[k] }; }
  const sm = { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.2 };
  await vs.no.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.yes.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  await vs.yes.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [{ type: "NODE", destinationId: vs.no.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }, { trigger: { type: "AFTER_TIMEOUT", timeout: 2.5 }, actions: [{ type: "NODE", destinationId: vs.no.id, navigation: "CHANGE_TO", transition: sm, preserveScrollPosition: false }] }]);
  set.description = "Phrase with pronunciation. Tap plays (Playing=Yes shows waveform + captions note) and returns to idle after 2.5 s.";
  KIT.phrase = set; CHANGES.push("New component Phrase Card (Playing=No|Yes, interactive)");
  return set;
}
function PHRASE(p) { const i = variant(KIT.phrase, "Playing=No").createInstance(); i.name = "Phrase/" + p[0]; setProps(i, KIT.phrase, { Malay: p[0], Pronunciation: p[1], English: p[2] }); return i; }
async function swapInComponents() {
  // 02: replace the static language list with the interactive picker
  const old = inS("lang", "Language options");
  if (old) { const p = old.parent, idx = p.children.indexOf(old); const inst = variant(KIT.langPicker, "Selected=EN").createInstance(); inst.name = "Language Picker"; p.insertChild(idx, inst); inst.layoutSizingHorizontal = "FILL"; old.remove(); CHANGES.push("02 Language: options now selectable"); }
  // 08: replace phrase cards
  const cards = S.phrases.findAll((n) => n.type === "FRAME" && n.name.startsWith("Phrase/"));
  for (const oldC of cards) { const p = oldC.parent, idx = p.children.indexOf(oldC); const data = PHRASES.find((x) => "Phrase/" + x[0] === oldC.name) || PHRASES[0]; const inst = PHRASE(data); p.insertChild(idx, inst); inst.layoutSizingHorizontal = "FILL"; oldC.remove(); }
  if (cards.length) CHANGES.push("08 Culture guide: phrase play buttons now work (" + cards.length + " cards)");
}

// ---------- 4 · new screens ----------
async function capt(sec, f, num, title, note) { await caption(sec, f, num, title, note); }
function detailSheet(c) { const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 140, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28; return sh; }
async function factsRow(sh, facts) {
  const row = AL("HORIZONTAL", "Facts", 8); add(sh, row, true);
  for (const [l, v] of facts) { const fc = AL("VERTICAL", "Fact", 4); add(row, fc, true); pad(fc, 12); radius(fc, 14); paintTo(fc, "mist"); await T(fc, l, "Eyebrow", "muted", { fill: true, size: 10 }); await T(fc, v, "Label/S", "ink", { fill: true }); }
}
async function tips(sh, list, bg = "pandan100") {
  for (const [ic, t] of list) { const r = AL("HORIZONTAL", "Tip", 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER"; r.appendChild(circleBtn("Icon", ic, 40, bg, 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true }); }
}
async function titleBlock(c, title, sub) { await T(c, title, "Mobile/Display M", "ink", { fill: true }); if (sub) await T(c, sub, "Body/M", "muted", { fill: true }); }

// 14 · Destination – Melaka
const EXP_JONKER = { title: "Jonker Street night market", loc: "Melaka old town", desc: "Street food, antiques and buskers along a closed-off heritage street. Bring small notes.", cat: "Food & local cuisine", dur: "About 2 hours", best: "Fri–Sun evenings", icon: "utensils", img: "food" };
const EXP_MOSQUE = { title: "Visit a mosque respectfully", loc: "Around Melaka", desc: "Many mosques welcome visitors outside prayer times and lend robes at the door. Ask before you enter.", cat: "Cultural heritage", dur: "About 1 hour", best: "Late afternoon", icon: "landmark", img: "mosque" };
async function buildMelaka(sec, col) {
  const f = screen("melaka", "14 Destination – Melaka", sec, col, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 380, "melaka");
  const shr = circleBtn("Share", "share", 44, "surface", 0.92, "ink", 20); hero.appendChild(shr); shr.x = W - 20 - 44 - 52; shr.y = 58;
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 58;
  const sh = detailSheet(c);
  await T(sh, "MELAKA · SOUTHERN REGION", "Eyebrow", "pandan500");
  await T(sh, "Melaka", "Mobile/Display XL", "ink");
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, "Melaka City · UNESCO World Heritage Site", "Body/S", "muted");
  await factsRow(sh, [["FROM KL", "≈2 h drive"], ["GET AROUND", "Walk, trishaw, bus"], ["YOU'LL HEAR", "Malay, Hokkien, English"]]);
  const segs = await seg(sh, ["Overview", "Experiences", "Etiquette"], 0);
  await T(sh, "A port city shaped by the Malay sultanate and by Portuguese, Dutch and British rule. Walk from the red Stadthuys to Jonker Street, try Nyonya (Peranakan) cooking, and take a river cruise after dark.", "Body/M", "ink", { fill: true });
  await T(sh, "Good to know", "Heading/M", "ink");
  await tips(sh, [["calendar", "The Jonker Street night market runs on weekend evenings. It gets crowded after 8 pm."], ["route", "Decorated trishaws are loud and fun. Agree the fare before you ride."], ["shirt", "Cover shoulders and knees at mosques and temples."]]);
  const eh = await sectionHead(sh, "Top experiences", "See all");
  const e1 = EXP(EXP_JONKER); sh.appendChild(e1); e1.rescale(353 / 384);
  const e2 = EXP(EXP_MOSQUE); sh.appendChild(e2); e2.rescale(353 / 384);
  const bar = actionBar("Action bar"); const saveB = BTN("Outline", "Save", false); bar.appendChild(saveB);
  const addB = BTN("Primary", "Add to trip", true); bar.appendChild(addB); try { addB.layoutSizingHorizontal = "FILL"; addB.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  finish(f, c, [statusAt("Dark"), bar]);
  back(bk); link(segs["Etiquette"], "etiquette", "push"); link(addB, "newTrip", "up");
  if (eh.action) { const hs = await hotspot(eh.action, "Hotspot/See all"); link(hs, "search", "dissolve"); }
  await capt(sec, f, "14", "Destination · Melaka", "Second destination built from the same template as Penang. 'Add to trip' opens the new-trip sheet (17).");
}
// 15 · Culture guide – Etiquette
async function buildEtiquette(sec, col) {
  const f = screen("etiquette", "15 Culture guide – Etiquette", sec, col, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c);
  await titleBlock(c, "Culture guide", "How to be a good guest. These are common customs, not rules: when unsure, follow what locals do.");
  const segs = await seg(c, ["Phrases", "Etiquette", "Festivals"], 1, true);
  const groups = [
    ["At mosques and temples", "landmark", [["shirt", "Cover shoulders and knees. Many mosques lend robes and headscarves at the door."], ["home", "Take your shoes off where you see a shoe rack or others doing it."], ["clock", "Visit outside prayer times, and keep your voice low inside."]]],
    ["Eating out", "utensils", [["hand", "Eat, pass and receive with your right hand."], ["utensils", "If you eat halal, look for the JAKIM halal logo."], ["users", "At hawker centres people share tables. Ask “Ada orang?” (Is anyone sitting here?)."]]],
    ["Greetings", "users", [["hand", "A light handshake, or a hand on your heart, is common. Some people don't shake hands with the opposite sex: follow their lead."], ["languages", "Polite titles: Encik (Mr), Puan (Mrs), Cik (Ms). Older people are often called Pakcik / Makcik (uncle / auntie)."]]],
  ];
  for (const [title, ic, rows] of groups) {
    const g = AL("VERTICAL", "Group/" + title, 12); add(c, g, true); pad(g, 18); radius(g, 20); paintTo(g, "surface");
    const h = AL("HORIZONTAL", "Head", 10); add(g, h, true); h.counterAxisAlignItems = "CENTER"; h.appendChild(circleBtn("Icon", ic, 36, "kaya400", 1, "pandan900", 18)); await T(h, title, "Heading/S", "ink", { fill: true });
    for (const [i2, t] of rows) { const r = AL("HORIZONTAL", "Tip", 10); add(g, r, true); r.counterAxisAlignItems = "MIN"; I(r, i2, 18, "pandan500"); await T(r, t, "Body/S", "ink", { fill: true }); }
  }
  const note = AL("HORIZONTAL", "Community note", 12); add(c, note, true); pad(note, 16); radius(note, 20); paintTo(note, "pandan900"); note.counterAxisAlignItems = "CENTER";
  note.appendChild(circleBtn("Icon", "users", 40, "kaya400", 1, "pandan900", 20));
  await T(note, "Written with local volunteers. Spotted something that isn't right? Tell us from Me → About.", "Body/S", "onDark", { fill: true });
  finish(f, c, [statusAt("Light"), tabAt("Home")]);
  back(bk); link(segs["Phrases"], "phrases", "dissolve");
  await capt(sec, f, "15", "Culture guide · Etiquette", "Etiquette tab of the culture guide (cultural-sensitivity consideration). 'Phrases' returns to 08.");
}
// 16 · Trips – Day 2 (empty state)
async function buildDay2(sec, col) {
  const f = screen("day2", "16 Trips – Day 2 (empty)", sec, col, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 18;
  const hr = AL("HORIZONTAL", "Title row", 8); add(c, hr, true); hr.primaryAxisAlignItems = "SPACE_BETWEEN"; hr.counterAxisAlignItems = "CENTER";
  await T(hr, "Trips", "Mobile/Display M", "ink"); const nt = circleBtn("New trip", "plus", 44, "pandan900", 1, "kaya400", 20); hr.appendChild(nt);
  const card = ALw("VERTICAL", "Trip card (compact)", 353, 6); c.appendChild(card); pad(card, 18, 20); radius(card, 22); paintTo(card, "pandan900");
  await T(card, "Weekend in Penang", "Heading/M", "onDark"); await T(card, "Sat 17 – Sun 18 Oct 2026 · 2 travellers", "Body/S", "onDarkMuted");
  const tabs = AL("HORIZONTAL", "Day tabs", 8); c.appendChild(tabs); const d1 = CHIP("Day 1 · Sat", false); tabs.appendChild(d1); tabs.appendChild(CHIP("Day 2 · Sun", true));
  const em = AL("VERTICAL", "Empty state", 12); add(c, em, true); em.counterAxisAlignItems = "CENTER"; pad(em, 28, 24); radius(em, 24); paintTo(em, "surface"); em.strokes = [solid("line")]; em.strokeWeight = 1; em.strokeAlign = "INSIDE"; em.dashPattern = [6, 6];
  em.appendChild(circleBtn("Illustration", "calendar", 72, "kaya100", 1, "pandan900", 32));
  await T(em, "Nothing planned for Sunday yet", "Heading/M", "ink", { align: "CENTER", fill: true });
  await T(em, "Add a stop, or leave it free. Slow days are good days.", "Body/S", "muted", { align: "CENTER", fill: true });
  const addB = fullBtn(em, "Primary", "Add a stop");
  await T(c, "IDEAS FOR SUNDAY IN PENANG", "Eyebrow", "muted");
  const r1 = await resultRow(c, "Idea/Penang Hill", "Penang Hill", "Funicular up for cooler air and views", "Half day", "nature");
  const r2 = await resultRow(c, "Idea/Hawker breakfast", "Hawker breakfast in George Town", "Food · About 1.5 hours", "7–10 am", "food");
  finish(f, c, [statusAt("Light"), tabAt("Trips")]);
  link(d1, "trips", "dissolve"); link(addB, "search", "dissolve"); link(nt, "newTrip", "up"); link(r2, "search", "dissolve"); link(r1, "search", "dissolve");
  await capt(sec, f, "16", "Trips · Day 2 (empty state)", "Empty state with a clear next action. Day 1 chip returns to 10.");
}
// 17 · New trip sheet
async function buildNewTrip(sec, col) {
  const f = screen("newTrip", "17 Trips – New trip (sheet)", sec, col, "ink");
  const bg = rect(f, "Background photo", W, H, null); bg.fills = [img("melaka")];
  const scrim = rect(f, "Scrim", W, H, "pandan900", 0.55);
  const sh = ALw("VERTICAL", "Sheet", W, 16); f.appendChild(sh); pad(sh, 10, 20, 40, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28; sh.effects = SHADOW2;
  const hb = AL("HORIZONTAL", "Handle row"); add(sh, hb, true); hb.primaryAxisAlignItems = "CENTER"; rect(hb, "Handle", 40, 5, "line", 1, 3);
  const top = AL("HORIZONTAL", "Sheet top", 8); add(sh, top, true); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
  await T(top, "New trip", "Mobile/Display M", "ink"); const x = circleBtn("Close sheet", "x", 44, "mist", 1, "ink", 18); top.appendChild(x);
  const field = async (label, value, icon) => {
    const g = AL("VERTICAL", "Field/" + label, 6); add(sh, g, true); await T(g, label, "Label/S", "ink");
    const b = AL("HORIZONTAL", "Input", 10); add(g, b, true); b.counterAxisAlignItems = "CENTER"; pad(b, 14, 16); radius(b, 14); paintTo(b, "surface"); b.strokes = [solid("lineStrong")]; b.strokeWeight = 1; b.strokeAlign = "INSIDE";
    I(b, icon, 18, "muted"); await T(b, value, "Body/M", "ink", { fill: true }); return b;
  };
  const nameF = await field("Trip name", "Melaka day trip", "route"); nameF.strokes = [solid("pandan900")]; nameF.strokeWeight = 2;
  await field("Dates", "Sat 24 Oct 2026", "calendar");
  const pl = AL("VERTICAL", "Field/First stop", 6); add(sh, pl, true); await T(pl, "First stop", "Label/S", "ink");
  const chip = pill("Stop chip", "kaya100", 1, 8, 12, 8); pl.appendChild(chip); I(chip, "pin", 14, "pandan900"); await T(chip, "Melaka old town", "Label/S", "ink"); I(chip, "x", 14, "muted");
  const tw = AL("VERTICAL", "Field/Travelling with", 8); add(sh, tw, true); await T(tw, "Travelling with", "Label/S", "ink");
  const ppl = AL("HORIZONTAL", "People", 10); add(tw, ppl, true); ppl.counterAxisAlignItems = "CENTER";
  ppl.appendChild(circleBtn("You", "user", 44, "kaya400", 1, "pandan900", 20));
  const inv = circleBtn("Invite", "plus", 44, "surface", 1, "pandan900", 20); inv.strokes = [solid("lineStrong")]; inv.strokeWeight = 1.5; inv.strokeAlign = "INSIDE"; inv.dashPattern = [4, 4]; ppl.appendChild(inv);
  await T(ppl, "Invite a friend to plan together", "Body/S", "muted", { fill: true });
  const sync = AL("HORIZONTAL", "Sync note", 8); add(sh, sync, true); sync.counterAxisAlignItems = "CENTER"; I(sync, "sync", 16, "pandan500"); await T(sync, "Shared trips sync to everyone's phone and laptop.", "Body/S", "muted", { fill: true });
  const create = fullBtn(sh, "Primary", "Create trip");
  sh.x = 0; sh.y = H - deepH(sh);
  f.appendChild(statusAt("Clear")); f.numberOfFixedChildren = 1;
  back(x); back(scrim); link(create, "allTrips", "smart");
  await capt(sec, f, "17", "Trips · New trip (sheet)", "Bottom sheet from Melaka 'Add to trip' or the + button. Invite a friend (community). 'Create trip' → 18.");
}
// 18 · Trips – All trips
async function buildAllTrips(sec, col) {
  const f = screen("allTrips", "18 Trips – All trips", sec, col, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const hr = AL("HORIZONTAL", "Title row", 8); add(c, hr, true); hr.primaryAxisAlignItems = "SPACE_BETWEEN"; hr.counterAxisAlignItems = "CENTER";
  await T(hr, "Your trips", "Mobile/Display M", "ink"); const nt = circleBtn("New trip", "plus", 44, "pandan900", 1, "kaya400", 20); hr.appendChild(nt);
  await T(c, "UPCOMING", "Eyebrow", "muted");
  const tripCard = async (name, title, dates, meta, imgKey, isNew) => {
    const k = AL("HORIZONTAL", name, 14); add(c, k, true); k.counterAxisAlignItems = "CENTER"; pad(k, 12, 16, 12, 12); radius(k, 22); paintTo(k, "surface");
    k.strokes = [solid(isNew ? "kaya500" : "line")]; k.strokeWeight = isNew ? 2 : 1; k.strokeAlign = "INSIDE";
    const t = rect(k, "Thumb", 76, 76, "pandan100", 1, 16); t.fills = [img(imgKey)];
    const col2 = AL("VERTICAL", "Text", 4); add(k, col2, true);
    if (isNew) { const nb = pill("New badge", "kaya400", 1, 3, 8, 4); col2.appendChild(nb); await T(nb, "JUST CREATED", "Eyebrow", "pandan900", { size: 10 }); }
    await T(col2, title, "Heading/S", "ink", { fill: true }); await T(col2, dates, "Body/S", "muted", { fill: true }); await T(col2, meta, "Mono/S", "pandan500");
    I(k, "chevRight", 20, "muted"); return k;
  };
  const melaka = await tripCard("Trip/Melaka day trip", "Melaka day trip", "Sat 24 Oct 2026 · Just you", "1 stop · shared with no one yet", "melaka", true);
  const penang = await tripCard("Trip/Weekend in Penang", "Weekend in Penang", "Sat 17 – Sun 18 Oct 2026 · 2 travellers", "4 stops · synced just now", "heroPenang", false);
  await T(c, "PAST", "Eyebrow", "muted");
  const em = AL("HORIZONTAL", "Past empty", 12); add(c, em, true); em.counterAxisAlignItems = "CENTER"; pad(em, 16); radius(em, 20); paintTo(em, "surface");
  em.appendChild(circleBtn("Icon", "image", 40, "pandan100", 1, "pandan900", 20)); await T(em, "Finished trips appear here with your saved photos and notes.", "Body/S", "muted", { fill: true });
  const toast = pill("Toast", "pandan900", 1, 12, 16, 10); toast.effects = SHADOW2; toast.appendChild(circleBtn("Tick", "check", 24, "kaya400", 1, "pandan900", 14)); await T(toast, "Trip created", "Label/M", "onDark"); await T(toast, "Invite", "Label/M", "kaya400");
  finish(f, c, [statusAt("Light"), tabAt("Trips")]);
  f.insertChild(f.children.length - 2, toast); toast.x = (W - toast.width) / 2; toast.y = H - 84 - 16 - toast.height;
  link(penang, "trips", "push"); link(melaka, "trips", "push"); link(nt, "newTrip", "up");
  await capt(sec, f, "18", "Trips · All trips", "Trip list after creating 'Melaka day trip' (toast confirms). Penang card opens the day plan (10).");
}
// 19 · Me – Language
async function buildLangSettings(sec, col) {
  const f = screen("langSettings", "19 Me – Language", sec, col, "mist");
  const c = column(f); pad(c, 62, 24, 120, 24); c.itemSpacing = 18;
  const bk = topBack(c);
  await titleBlock(c, "Language", "Tourix will use this for menus, guides and audio. Malaysian place names stay in Malay.");
  const lp = variant(KIT.langPicker, "Selected=EN").createInstance(); lp.name = "Language Picker"; add(c, lp, true);
  await T(c, "MORE OPTIONS", "Eyebrow", "muted");
  const g = AL("VERTICAL", "Group/More", 0); add(c, g, true); radius(g, 20); paintTo(g, "surface"); g.clipsContent = true;
  const row = async (label, sub, trailing) => {
    const r = AL("HORIZONTAL", "Row/" + label, 12); add(g, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 12, 16);
    const col2 = AL("VERTICAL", "Text", 2); add(r, col2, true); await T(col2, label, "Label/M", "ink"); await T(col2, sub, "Body/S", "muted", { fill: true });
    if (trailing === true || trailing === false) r.appendChild(TOGGLE(trailing)); else { await T(r, trailing, "Body/S", "muted"); I(r, "chevRight", 18, "muted"); }
    return r;
  };
  await row("Show Malay terms", "e.g. kaki lima (five-foot way) next to English", true);
  const d = rect(null, "Divider", 10, 1, "line"); add(g, d, true);
  await row("Audio guide language", "Used for stories and pronunciation", "English");
  const req = AL("HORIZONTAL", "Request language", 10); add(c, req, true); req.counterAxisAlignItems = "CENTER"; pad(req, 14, 16); radius(req, 18); paintTo(req, "kaya100");
  I(req, "languages", 20, "pandan900"); await T(req, "Need Arabic or another language? Request it and we'll tell you when it's ready.", "Body/S", "ink", { fill: true });
  finish(f, c, [statusAt("Light"), tabAt("Me")]);
  back(bk);
  await capt(sec, f, "19", "Me · Language", "Same interactive Language Picker as onboarding (tap a row). Request a language covers the brief's 'Arabic and others'.");
}
// 20 · Me – Offline guide packs
async function buildOffline(sec, col) {
  const f = screen("offline", "20 Me – Offline guide packs", sec, col, "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c);
  await titleBlock(c, "Offline guide packs", "Maps, phrases and audio that work without signal, so you don't spend mobile data abroad.");
  const st = AL("VERTICAL", "Storage", 8); add(c, st, true); pad(st, 16); radius(st, 20); paintTo(st, "pandan900");
  const sr = AL("HORIZONTAL", "Row", 8); add(st, sr, true); sr.primaryAxisAlignItems = "SPACE_BETWEEN"; await T(sr, "On this phone", "Label/M", "onDark"); await T(sr, "24 MB used", "Mono/S", "kaya400");
  const pb = progressBar(st, 0.18, 321); pb.layoutSizingHorizontal = "FILL"; paintTo(pb, "onDark", 0.2);
  await T(st, "Sizes are sample values for this prototype.", "Body/S", "onDarkMuted", { fill: true });
  const pack = async (name, sub, state, imgKey, pct) => {
    const r = AL("HORIZONTAL", "Pack/" + name, 12); add(c, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 12, 14, 12, 12); radius(r, 18); paintTo(r, "surface");
    const t = rect(r, "Thumb", 56, 56, "pandan100", 1, 14); t.fills = [img(imgKey)];
    const col2 = AL("VERTICAL", "Text", 4); add(r, col2, true); await T(col2, name, "Heading/S", "ink"); await T(col2, sub, "Body/S", "muted", { fill: true });
    if (state === "downloading") { const p = progressBar(col2, pct, 180); p.layoutSizingHorizontal = "FILL"; await T(col2, "Downloading · " + Math.round(pct * 100) + " %", "Mono/S", "pandan500"); r.appendChild(circleBtn("Pause download", "pause", 44, "mist", 1, "ink", 16)); }
    else if (state === "done") { const ok = pill("Status", "pandan100", 1, 6, 10, 6); r.appendChild(ok); I(ok, "check", 14, "pandan900", 2.5); await T(ok, "Saved", "Label/S", "pandan900"); }
    else { r.appendChild(circleBtn("Download " + name, "download", 44, "pandan900", 1, "kaya400", 20)); }
    return r;
  };
  await pack("Penang", "George Town walk, phrases, audio · 24 MB", "done", "heroPenang");
  await pack("Melaka", "Old town, phrases, audio · 19 MB", "downloading", "melaka", 0.62);
  await pack("Kuala Lumpur", "City, Batu Caves, phrases · 31 MB", "available", "kl");
  await pack("Langkawi", "Islands, phrases · 15 MB", "available", "langkawi");
  const g = AL("HORIZONTAL", "Wi-Fi only", 12); add(c, g, true); g.counterAxisAlignItems = "CENTER"; pad(g, 14, 16); radius(g, 18); paintTo(g, "surface");
  const gc = AL("VERTICAL", "Text", 2); add(g, gc, true); await T(gc, "Download on Wi-Fi only", "Label/M", "ink"); await T(gc, "Recommended on prepaid data plans", "Body/S", "muted"); g.appendChild(TOGGLE(true));
  finish(f, c, [statusAt("Light"), tabAt("Me")]);
  back(bk);
  await capt(sec, f, "20", "Me · Offline guide packs", "Economic-diversity consideration: offline packs, Wi-Fi-only downloads, visible sizes (sample values).");
}
// 21 · AR camera permission
async function buildArPermission(sec, col) {
  const f = screen("arPerm", "21 AR – Camera permission", sec, col, "pandan900");
  const glow = ellipse(f, "Glow", 460, 420, "kaya400", 0.16); glow.x = -40; glow.y = 80; glow.effects = [{ type: "LAYER_BLUR", radius: 120, visible: true }];
  const c = column(f); pad(c, 62, 24, 60, 24); c.itemSpacing = 20;
  const close = circleBtn("Close", "x", 44, "onDark", 0.1, "onDark", 20); c.appendChild(close);
  const icon = circleBtn("Camera", "camera", 96, "kaya400", 1, "pandan900", 44); c.appendChild(icon); radius(icon, 28);
  const badge = pill("AR badge", "onDark", 0.1, 5, 10, 6); c.appendChild(badge); I(badge, "scan", 14, "kaya400"); await T(badge, "AR · HERITAGE LENS", "Eyebrow", "kaya400");
  await T(c, "Point your camera at a building to hear its story", "Mobile/Display M", "onDark", { fill: true });
  for (const [ic, t] of [["camera", "The camera is only on while the Lens is open."], ["shield", "Nothing is recorded or uploaded unless you tap Capture."], ["download", "Works offline in George Town with the Penang guide pack."]]) {
    const r = AL("HORIZONTAL", "Point", 12); add(c, r, true); r.counterAxisAlignItems = "CENTER"; r.appendChild(circleBtn("Icon", ic, 40, "onDark", 0.1, "kaya400", 20)); await T(r, t, "Body/M", "onDark", { fill: true });
  }
  const sp = figma.createFrame(); sp.name = "Spacer"; sp.fills = []; sp.resize(10, 24); add(c, sp, true);
  const allow = fullBtn(c, "Primary", "Allow camera");
  const later = fullBtn(c, "On Dark", "Not now");
  await T(c, "iOS will then ask you to confirm. You can change this any time in Settings.", "Body/S", "onDarkMuted", { fill: true, align: "CENTER" });
  finish(f, c, [statusAt("Dark")]);
  link(allow, "arScan", "dissolve"); back(later); back(close);
  await capt(sec, f, "21", "AR · Camera permission", "Priming screen before the iOS system prompt: explains why, privacy and offline use. 'Allow camera' → 22.");
}
// 22 · AR scanning
async function buildArScan(sec, col) {
  const f = screen("arScan", "22 AR – Scanning", sec, col, "ink");
  const photo = rect(f, "Camera feed", W, H, null); photo.fills = [img("penangUmbrella")]; photo.effects = [{ type: "LAYER_BLUR", radius: 6, visible: true }];
  const t = rect(f, "Top shade", W, 200, null); t.fills = [vgrad("black", 0.65, 0)];
  const b = rect(f, "Bottom shade", W, 320, null); b.y = H - 320; b.fills = [vgrad("black", 0, 0.8)];
  const ret = figma.createNodeFromSvg(`<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="${HEX.onDark}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 8"><path d="M2 40V14a12 12 0 0 1 12-12h26"/><path d="M200 2h26a12 12 0 0 1 12 12v26"/><path d="M238 200v26a12 12 0 0 1-12 12h-26"/><path d="M40 238H14a12 12 0 0 1-12-12v-26"/></g></svg>`);
  ret.name = "Reticle (searching)"; f.appendChild(ret); ret.x = 76; ret.y = 250;
  for (const [x, y] of [[120, 300], [160, 340], [230, 290], [260, 380], [140, 420], [210, 450], [280, 330], [190, 390]]) { const d = ellipse(f, "Point", 6, 6, "kaya400", 0.9); d.x = x; d.y = y; }
  const det = pill("Status", "pandan900", 0.85, 8, 14, 8); f.appendChild(det); I(det, "scan", 16, "kaya400"); await T(det, "Scanning… move a little closer", "Label/S", "onDark"); det.x = (W - det.width) / 2; det.y = 200;
  const close = circleBtn("Close", "x", 44, "black", 0.45, "onDark", 20); f.appendChild(close); close.x = 20; close.y = 58;
  const tt = pill("Title", null, 1, 6, 10, 8); f.appendChild(tt); await T(tt, "Heritage Lens", "Label/M", "onDark"); tt.x = (W - tt.width) / 2; tt.y = 64;
  const bottom = ALw("VERTICAL", "Hint", W, 10); f.appendChild(bottom); bottom.counterAxisAlignItems = "CENTER"; pad(bottom, 0, 32, 60, 32);
  await T(bottom, "Hold your phone up and point it at a shophouse façade.", "Heading/S", "onDark", { align: "CENTER", fill: true });
  await T(bottom, "Good light helps. Watch for traffic while you look.", "Body/S", "onDarkMuted", { align: "CENTER", fill: true });
  bottom.x = 0; bottom.y = H - deepH(bottom);
  f.appendChild(statusAt("Clear")); f.numberOfFixedChildren = 1;
  after(f, "lens", 1.8, "dissolve"); back(close);
  await capt(sec, f, "22", "AR · Scanning", "Searching state with a safety hint. Auto-advances to 'Shophouse detected' (12) after 1.8 s.");
}
// 23 · AR Lens – second landmark info (re-uses the Lens template, then swaps the copy)
async function buildArInfo2(sec, col) {
  const a = await lensBase("lensInfo2", "23 AR Lens – Shophouse façade", sec, col, true);
  const f = a.f;
  const l1 = f.findOne((n) => n.name === "AR label · Five-foot way"); const l2 = f.findOne((n) => n.name === "AR label · Shophouse façade");
  if (l1) l1.opacity = 0.35; if (l2) l2.opacity = 1;
  const sheet = f.findOne((n) => n.name === "Info sheet");
  const swap = { "The five-foot way": "Straits shophouse façade", "In Malay: kaki lima": "In Malay: rumah kedai", "Listen · 1 min": "Listen · 2 min" };
  for (const tx of sheet.findAll((n) => n.type === "TEXT")) {
    if (swap[tx.characters]) tx.characters = swap[tx.characters];
    else if (tx.characters.startsWith("The covered walkway")) tx.characters = "Narrow two-storey buildings with a shop below and a home above. Façades mix Chinese, Malay and European details: look for timber shutters, air vents and glazed tiles. Many are still family homes, so photograph from the street.";
  }
  sheet.y = H - deepH(sheet);
  link(a.x, "lens", "smart"); link(a.scrim, "lens", "smart"); link(a.s2, "lensInfo", "smart"); back(a.close);
  await capt(sec, f, "23", "AR · Shophouse façade", "Second landmark. 'Next landmark' cycles between 13 and 23, so the button is no longer a dead end.");
}
// 24 · Home – loading skeleton
async function buildHomeLoading(sec, col) {
  const f = screen("homeLoading", "24 Home – Loading", sec, col, "mist");
  const c = column(f);
  const hd = ALw("VERTICAL", "Header", W, 16); c.appendChild(hd); hd.layoutSizingHorizontal = "FILL"; pad(hd, 62, 20, 24, 20); paintTo(hd, "pandan900"); hd.bottomLeftRadius = 32; hd.bottomRightRadius = 32;
  await T(hd, "SELAMAT PAGI · GOOD MORNING", "Eyebrow", "kaya400");
  const bone = (p, w, h, key, op, r = 10) => { const x = rect(null, "Skeleton", w, h, key, op, r); p.appendChild(x); return x; };
  bone(hd, 260, 30, "onDark", 0.14); bone(hd, 180, 30, "onDark", 0.14); bone(hd, 353, 52, "onDark", 0.14, 18); bone(hd, 353, 300, "onDark", 0.1, 28);
  const bd = ALw("VERTICAL", "Body", W, 16); c.appendChild(bd); bd.layoutSizingHorizontal = "FILL"; pad(bd, 26, 20, 120, 20);
  bone(bd, 160, 22, "line", 1, 8);
  const row = AL("HORIZONTAL", "Tiles", 12); bd.appendChild(row); for (let i = 0; i < 3; i++) bone(row, 110, 150, "line", 0.8, 22);
  bone(bd, 200, 22, "line", 1, 8); bone(bd, 353, 120, "line", 0.8, 22);
  const st = pill("Loading status", "surface", 1, 10, 16, 10); st.effects = SHADOW1; I(st, "sparkles", 16, "pandan500"); await T(st, "Loading your Malaysia…", "Label/S", "ink");
  finish(f, c, [statusAt("Dark"), tabAt("Home")]);
  f.insertChild(f.children.length - 2, st); st.x = (W - st.width) / 2; st.y = 640;
  after(f, "home", 1.4, "dissolve");
  await capt(sec, f, "24", "Home · Loading", "Skeleton screen shown after onboarding, with a text status (not motion alone). Auto-advances to Home after 1.4 s.");
}
// 25 · Search – no results
async function buildNoResults(sec, col) {
  const f = screen("noResults", "25 Explore – No results", sec, col, "surface");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 18;
  await T(c, "Explore", "Mobile/Display M", "ink");
  const row = AL("HORIZONTAL", "Search row", 12); add(c, row, true); row.counterAxisAlignItems = "CENTER";
  const fld = AL("HORIZONTAL", "Search field (focused)", 10); add(row, fld, true); fld.counterAxisAlignItems = "CENTER"; pad(fld, 14, 14, 14, 16); radius(fld, 18); paintTo(fld, "kaya100"); fld.strokes = [solid("pandan900")]; fld.strokeWeight = 2; fld.strokeAlign = "INSIDE";
  I(fld, "search", 20, "ink"); await T(fld, "Penang hil", "Body/M", "ink", { fill: true }); I(fld, "x", 18, "muted");
  const cancelT = await T(row, "Cancel", "Label/M", "pandan500", { name: "Cancel" }); const cancel = await hotspot(cancelT, "Hotspot/Cancel");
  const em = AL("VERTICAL", "Empty state", 12); add(c, em, true); em.counterAxisAlignItems = "CENTER"; pad(em, 32, 16);
  em.appendChild(circleBtn("Illustration", "search", 72, "mist", 1, "muted", 32));
  await T(em, "No results for “Penang hil”", "Heading/M", "ink", { align: "CENTER", fill: true });
  await T(em, "Check the spelling, or try a place, a food or a feeling like “quiet beach”.", "Body/S", "muted", { align: "CENTER", fill: true });
  await T(c, "DID YOU MEAN", "Eyebrow", "muted");
  const dym = await resultRow(c, "Suggestion/Penang Hill", "Penang Hill", "Place · Pulau Pinang", "Funicular · cooler air", "nature");
  await T(c, "POPULAR RIGHT NOW", "Eyebrow", "muted");
  const chips = AL("HORIZONTAL", "Popular", 8); add(c, chips, true); chips.layoutWrap = "WRAP"; chips.counterAxisSpacing = 8;
  for (const l of ["Batu Caves", "Melaka", "Cameron Highlands", "Hawker food"]) chips.appendChild(CHIP(l, false));
  finish(f, c, [statusAt("Light"), tabAt("Explore")]);
  link(dym, "search", "dissolve"); link(cancel, "home", "dissolve");
  const mel = chips.findOne((n) => n.name === "Chip/Melaka"); link(mel, "melaka", "push");
  await capt(sec, f, "25", "Explore · No results", "Error-prevention and recovery: suggestion for a typo plus popular searches (WCAG 3.3.3).");
}

// ---------- 5 · links into the new screens from existing ones ----------
function relink() {
  const n = (k, nm) => inS(k, nm);
  link(n("interests", "Button/Show my Malaysia"), "homeLoading", "dissolve");
  link(n("search", "Search field (focused)"), "noResults", "dissolve");
  link(n("home", "Destination/Melaka"), "melaka", "push");
  link(n("phrases", "Seg/Etiquette"), "etiquette", "dissolve");
  link(n("dest", "Seg/Etiquette"), "etiquette", "push");
  for (const k of ["tripsAdded", "trips"]) { link(n(k, "Chip/Day 2 · Sun"), "day2", "dissolve"); link(n(k, "New trip"), "newTrip", "up"); }
  link(n("me", "Row/Language"), "langSettings", "push");
  link(n("me", "Row/Offline guide packs"), "offline", "push");
  link(n("lens", "AR label · Shophouse façade"), "lensInfo2", "smart");
  link(n("lensInfo", "Button/Next landmark"), "lensInfo2", "smart");
  link(n("dest", "Button/Open Heritage Lens"), "arPerm", "up");
  const missing = LINKS.filter((l) => !l.node).length; if (missing) PROBLEMS.push(missing + " link source(s) not found");
}

// ---------- 6 · Read me board: what's new ----------
async function readmeV2() {
  const r = MOB.findOne((x) => x.type === "FRAME" && x.name.startsWith("Read me")); if (!r) return;
  const b = AL("VERTICAL", "Block/v2", 10); add(r, b, true); pad(b, 24); radius(b, 20); paintTo(b, "kaya100");
  await T(b, "What's new in v2 (4 Oct 2026) · 25 screens, 5 flows", "Heading/M", "ink", { fill: true });
  for (const t of [
    "New screens: 14 Melaka · 15 Etiquette · 16 Day 2 empty state · 17 New trip sheet · 18 All trips · 19 Language · 20 Offline packs · 21 Camera permission · 22 Scanning · 23 Second landmark · 24 Loading · 25 No results.",
    "Now interactive: language picker (02, 19), phrase play buttons (08), 3D showcase pause/play, Day 2 tab, New trip (+), Melaka card, Me → Language / Offline packs, AR façade label.",
    "Accessibility fixes: 3.5:1 toggle and radio boundaries (new token line-strong), 2 pt focus ring, 44 pt tap targets on text links and save buttons, solid status bar on scrolling detail screens, pause control for auto-rotation (WCAG 2.2.2).",
    "Flow starting points: 1 · First launch · 2 · Returning user · 3 · AR Heritage Lens (now starts at camera permission) · 4 · Plan a day trip (Melaka) · 5 · States & edge cases.",
    "Sizes, times and distances are approximate or sample values; nothing here is real user data.",
  ]) await T(b, "•  " + t, "Body/S", "ink", { fill: true });
}

// ---------- main ----------
function fitSection(sec) {
  let maxX = 0, maxY = 0;
  for (const ch of sec.children) { maxX = Math.max(maxX, ch.x + ch.width); maxY = Math.max(maxY, ch.y + ch.height); }
  sec.resizeWithoutConstraints(Math.max(sec.width, maxX + 60), Math.max(sec.height, maxY + 100));
}
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }
async function buildLog(x, y) {
  const r = ALw("VERTICAL", "Build log · v2", 1100, 8); MOB.appendChild(r); r.x = x; r.y = y; pad(r, 32); radius(r, 20); paintTo(r, "kaya100");
  await T(r, PROBLEMS.length ? "Build log · v2 · " + PROBLEMS.length + " issue(s) — send this list to Claude" : "Build log · v2 · no issues", "Heading/M", "ink");
  for (const c of CHANGES) await T(r, "✓ " + c, "Body/S", "ink", { fill: true });
  for (const p of PROBLEMS.slice(0, 60)) await T(r, "• " + p, "Mono/S", "bunga", { fill: true });
  return r;
}
async function main() {
  figma.notify("Tourix v2: adding 12 screens and fixes… about 30 seconds.", { timeout: 6000 });
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System");
  if (!ds) { figma.closePlugin("Couldn't find the 'Design System' page."); return; }
  await ds.loadAsync(); await loadComponents(ds);
  try { await locate(); } catch (e) { figma.closePlugin(e.message); return; }
  if (!KIT.status || !KIT.tab || !KIT.toggle) { figma.closePlugin("Mobile kit components not found on 'Mobile Prototype (iOS)'."); return; }

  await run("Tokens & fixes", tokensAndFixes);
  await run("Showcase pause", showcasePause);
  await run("Language Picker", buildLanguagePicker);
  await run("Phrase Card", buildPhraseCard);
  await run("Swap in components", swapInComponents);

  const f2 = sectionOf("Flow 2"), f3 = sectionOf("Flow 3"), f4 = sectionOf("Flow 4");
  const f5 = newSection("Flow 5 · States & edge cases", 0, 0, 2);
  await run("14 Melaka", () => buildMelaka(f2, 5));
  await run("15 Etiquette", () => buildEtiquette(f2, 6));
  await run("16 Day 2", () => buildDay2(f3, 3));
  await run("17 New trip", () => buildNewTrip(f3, 4));
  await run("18 All trips", () => buildAllTrips(f3, 5));
  await run("19 Language", () => buildLangSettings(f3, 6));
  await run("20 Offline", () => buildOffline(f3, 7));
  await run("21 AR permission", () => buildArPermission(f4, 2));
  await run("22 AR scanning", () => buildArScan(f4, 3));
  await run("23 AR info 2", () => buildArInfo2(f4, 4));
  await run("24 Home loading", () => buildHomeLoading(f5, 0));
  await run("25 No results", () => buildNoResults(f5, 1));
  await run("Read me", readmeV2);

  relink();
  const linked = await applyLinks();
  CHANGES.push(linked + " prototype links added or updated");

  // restack: Read me, Flow 1–5, kit, logs
  await run("Restack", async () => {
    const kit = KIT.section;
    let ky = Math.max(0, ...kit.children.filter((n) => n !== KIT.langPicker && n !== KIT.phrase).map((n) => n.y + n.height)) + 80;
    if (KIT.langPicker) { KIT.langPicker.x = 60; KIT.langPicker.y = ky; }
    if (KIT.phrase) { KIT.phrase.x = 60 + (KIT.langPicker ? KIT.langPicker.width + 80 : 0); KIT.phrase.y = ky; }
    const readme = MOB.children.find((n) => n.type === "FRAME" && n.name.startsWith("Read me"));
    let y = readme ? readme.y + deepH(readme) + 200 : 0;
    for (const sec of [sectionOf("Flow 1"), f2, f3, f4, f5, kit]) { if (!sec) continue; fitSection(sec); sec.x = 0; sec.y = y; y += sec.height + 160; }
    for (const lg of MOB.children.filter((n) => n.type === "FRAME" && n.name === "Build log")) { lg.name = "Build log · v1"; lg.x = 0; lg.y = y; y += lg.height + 80; }
    RESTACK_Y = y;
  });
  await run("Flow starting points", async () => {
    const fl = [];
    if (S.splash) fl.push({ nodeId: S.splash.id, name: "1 · First launch" });
    if (S.home) fl.push({ nodeId: S.home.id, name: "2 · Returning user (Home)" });
    if (S.arPerm) fl.push({ nodeId: S.arPerm.id, name: "3 · AR Heritage Lens" });
    if (S.melaka) fl.push({ nodeId: S.melaka.id, name: "4 · Plan a day trip (Melaka)" });
    if (S.homeLoading) fl.push({ nodeId: S.homeLoading.id, name: "5 · States & edge cases" });
    MOB.flowStartingPoints = fl;
  });
  const y = RESTACK_Y;
  await buildLog(0, y);
  if (S.melaka) figma.viewport.scrollAndZoomIntoView([S.melaka]);
  const n = ["melaka", "etiquette", "day2", "newTrip", "allTrips", "langSettings", "offline", "arPerm", "arScan", "lensInfo2", "homeLoading", "noResults"].filter((k) => S[k]).length;
  figma.closePlugin(`Tourix v2: ${n}/12 new screens, ${linked} links, ${CHANGES.length} changes.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s) — see 'Build log · v2'.` : " No issues."));
}
main().catch((e) => { figma.closePlugin("Tourix v2 stopped: " + (e && e.message ? e.message : String(e))); });
