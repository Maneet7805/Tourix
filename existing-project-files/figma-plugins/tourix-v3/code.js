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

// ===================== TOURIX v3 · countries, 3D recommendations, motion (5 Oct 2026) =====================
// Approved by the project owner: remove the old brand name everywhere, fix greetings/titles, replace
// "Choose a country" with a swipeable 3D "Top recommendations" panel, add 5 country guides (27–31),
// Ken Burns hero photos, entrance reveals, press states, heart pop, AR anchor pulse, skeleton shimmer.
// Refuses to run twice (stops if "27 Country – Japan" exists). Saves a named version first.
const CHANGES = []; const SEC = {};
const OLD = String.fromCharCode(74, 101, 106, 97, 107); // the retired brand name, built so this file never spells it
const OLDRE = new RegExp(OLD, "gi");
const BEZ = (d) => ({ type: "SMART_ANIMATE", easing: { type: "CUSTOM_CUBIC_BEZIER", easingFunctionCubicBezier: { x1: 0.22, y1: 1, x2: 0.36, y2: 1 } }, duration: d });
const SM = (d, e = "EASE_OUT") => ({ type: "SMART_ANIMATE", easing: { type: e }, duration: d });
const CHG = (dest, tr) => ({ type: "NODE", destinationId: dest.id, navigation: "CHANGE_TO", transition: tr, preserveScrollPosition: false });
const NAV = (dest) => ({ type: "NODE", destinationId: dest.id, navigation: "NAVIGATE", transition: TR.push, preserveScrollPosition: false });
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;
const PHOTOS = { cJapan: 32660559, cMorocco: 27549780, cPortugal: 14850795, cMexico: 18019709, cTurkiye: 27634409, tokyo: 31405878, hokkaido: 31416900, fes: 30398385, chefchaouen: 25070502, porto: 35340124, algarve: 17910037, cdmx: 21086105, yucatan: 17182240, cappadocia: 17911073, antalya: 18761177 };

const COUNTRY_PAGES = [
  { key: "japan", num: "27", name: "Japan", hero: "cJapan", eyebrow: "EAST ASIA · COUNTRY GUIDE", loc: "Capital Tokyo · Four main islands",
    facts: [["LANGUAGE", "Japanese"], ["CURRENCY", "Yen (JPY)"], ["DRIVING", "On the left"]],
    intro: "Ancient temples and futuristic cities sit a train ride apart. Rail is fast and punctual, so a first trip can combine Tokyo, Kyoto and the countryside.",
    tips: [["hand", "Take your shoes off where you see a raised entrance or slippers."], ["utensils", "Tipping isn't expected; good service is part of the price."], ["bus", "Get a rechargeable IC transit card for trains and buses."], ["volume", "Keep phone calls off and voices low on trains."]],
    dests: [["Kyoto", "KANSAI", "Kyoto", "Over 1,600 temples, wooden machiya lanes and the Gion district.", "FROM TOKYO", "≈2 h 15 min by bullet train", "KNOWN FOR", "Temples, gardens", "cJapan"],
      ["Tokyo", "KANTO", "Tokyo", "Neon districts, quiet shrines and outstanding food, linked by an easy rail network.", "GETTING AROUND", "Metro, JR lines", "KNOWN FOR", "Food, neighbourhoods", "tokyo"],
      ["Hokkaido", "NORTHERN JAPAN", "Sapporo, Hokkaido", "Powder snow in winter, flower fields in summer and volcanic hot springs.", "FROM TOKYO", "≈1.5 h flight", "BEST FOR", "Skiing, onsen", "hokkaido"]],
    phrases: [["Sumimasen", "soo-mee-MAH-sen", "Excuse me / sorry"], ["Arigatō gozaimasu", "ah-ree-GAH-toh go-zai-MAHS", "Thank you"], ["Kore o kudasai", "KOH-reh oh koo-DAH-sai", "This one, please"]] },
  { key: "morocco", num: "28", name: "Morocco", hero: "cMorocco", eyebrow: "NORTH AFRICA · COUNTRY GUIDE", loc: "Capital Rabat · Atlantic and Mediterranean coasts",
    facts: [["LANGUAGE", "Arabic, Amazigh; French widely used"], ["CURRENCY", "Dirham (MAD)"], ["DRIVING", "On the right"]],
    intro: "Medinas, mountain villages and Saharan dunes within a few days' travel. Hospitality is central: mint tea is often offered, and accepting it is polite.",
    tips: [["shirt", "Cover shoulders and knees, especially outside the big cities."], ["info", "Most mosques are closed to non-Muslims; Hassan II Mosque in Casablanca offers tours."], ["hand", "Haggling is normal in souks; agree a price before you buy."], ["sun", "During Ramadan, avoid eating or drinking in public in daytime."]],
    dests: [["Marrakech", "MARRAKESH-SAFI", "Marrakech", "Jemaa el-Fna square, souks, riads and gardens below the Atlas Mountains.", "FROM CASABLANCA", "≈2.5–3 h by train", "KNOWN FOR", "Souks, riads", "cMorocco"],
      ["Fes", "FÈS-MEKNÈS", "Fes el-Bali", "One of the largest car-free medinas in the world, with tanneries and old madrasas.", "FROM CASABLANCA", "≈4 h by train", "KNOWN FOR", "Medina, crafts", "fes"],
      ["Chefchaouen", "RIF MOUNTAINS", "Chefchaouen", "A blue-washed hill town for slow walks and mountain hikes.", "FROM FES", "≈4 h by road", "KNOWN FOR", "Blue lanes, hiking", "chefchaouen"]],
    phrases: [["Salam alaykum", "sah-LAAM ah-LAY-koom", "Hello (peace be upon you)"], ["Shukran", "SHOOK-ran", "Thank you"], ["Bshhal?", "b-SHHAL", "How much?"]] },
  { key: "portugal", num: "29", name: "Portugal", hero: "cPortugal", eyebrow: "SOUTHERN EUROPE · COUNTRY GUIDE", loc: "Capital Lisbon · Mainland, Azores and Madeira",
    facts: [["LANGUAGE", "Portuguese"], ["CURRENCY", "Euro (EUR)"], ["DRIVING", "On the right"]],
    intro: "Atlantic light, tiled façades and a slower pace. Lisbon and Porto are walkable but hilly, and trains connect the main cities.",
    tips: [["utensils", "Bread and olives brought to the table (couvert) are charged if you eat them."], ["clock", "Lunch is roughly 1–3 pm; dinner often starts after 8 pm."], ["shirt", "Cover shoulders in churches and keep voices low during services."], ["route", "Hills and cobbles: wear shoes with good grip."]],
    dests: [["Lisbon", "LISBON REGION", "Lisbon", "Seven hills, tiled façades, historic trams and fado in Alfama.", "GETTING AROUND", "Metro, tram, walking", "KNOWN FOR", "Viewpoints, fado", "cPortugal"],
      ["Porto", "NORTH", "Porto", "The riverside Ribeira, port-wine cellars across the Douro and tiled churches.", "FROM LISBON", "≈3 h by train", "KNOWN FOR", "Port wine, azulejos", "porto"],
      ["The Algarve", "SOUTH COAST", "Lagos, Algarve", "Golden cliffs, sea caves like Benagil and long beaches on the south coast.", "FROM LISBON", "≈3 h drive", "BEST TIME", "Roughly May – Oct", "algarve"]],
    phrases: [["Olá", "oh-LAH", "Hello"], ["Obrigado / Obrigada", "oh-bree-GAH-doo / -dah", "Thank you (said by a man / a woman)"], ["Quanto custa?", "KWAN-too KOOSH-tah", "How much is it?"]] },
  { key: "mexico", num: "30", name: "Mexico", hero: "cMexico", eyebrow: "NORTH AMERICA · COUNTRY GUIDE", loc: "Capital Mexico City · Pacific to Caribbean",
    facts: [["LANGUAGE", "Spanish; many Indigenous languages"], ["CURRENCY", "Peso (MXN)"], ["DRIVING", "On the right"]],
    intro: "From Maya ruins to street food, Mexico rewards slow travel. Food and traditions change a lot from one region to the next.",
    tips: [["hand", "Greet people when you walk into a shop: “Buenos días”."], ["utensils", "Tipping about 10–15 % is customary in restaurants."], ["info", "Drink bottled or filtered water."], ["shirt", "Dress modestly in churches and keep quiet during mass."]],
    dests: [["Oaxaca", "SOUTHERN MEXICO", "Oaxaca de Juárez", "Colonial streets, markets, mole and mezcal, with the Monte Albán ruins nearby.", "FROM MEXICO CITY", "≈1 h flight", "KNOWN FOR", "Food, crafts", "cMexico"],
      ["Mexico City", "CENTRAL MEXICO", "Mexico City", "Museums, murals and street food across one of the largest cities in the Americas.", "GETTING AROUND", "Metro, Metrobús", "KNOWN FOR", "Food, museums", "cdmx"],
      ["Yucatán", "YUCATÁN PENINSULA", "Mérida, Yucatán", "Maya sites like Chichén Itzá, swimmable cenotes and colourful colonial towns.", "FROM MEXICO CITY", "≈2 h flight", "KNOWN FOR", "Maya ruins, cenotes", "yucatan"]],
    phrases: [["Buenos días", "BWEH-nohs DEE-ahs", "Good morning"], ["Gracias", "GRAH-see-ahs", "Thank you"], ["¿Cuánto cuesta?", "KWAN-toh KWES-tah", "How much is it?"]] },
  { key: "turkiye", num: "31", name: "Türkiye", hero: "cTurkiye", eyebrow: "WEST ASIA · COUNTRY GUIDE", loc: "Capital Ankara · Europe and Asia",
    facts: [["LANGUAGE", "Turkish"], ["CURRENCY", "Lira (TRY)"], ["DRIVING", "On the right"]],
    intro: "Byzantine and Ottoman history, a food culture built on sharing, and landscapes from Cappadocia's valleys to the Mediterranean coast.",
    tips: [["shirt", "In mosques cover shoulders and knees, women cover their hair, and shoes come off."], ["clock", "Avoid visiting mosques at prayer times, especially Friday midday."], ["hand", "Accepting offered tea (çay) is a friendly gesture."], ["utensils", "Haggling is expected in bazaars, not in fixed-price shops."]],
    dests: [["Istanbul", "MARMARA", "Istanbul", "A city on two continents: mosques, bazaars and ferries across the Bosphorus.", "GETTING AROUND", "Tram, metro, ferry", "KNOWN FOR", "History, food", "cTurkiye"],
      ["Cappadocia", "CENTRAL ANATOLIA", "Göreme, Nevşehir", "Fairy chimneys, cave hotels and sunrise balloon flights over the valleys.", "FROM ISTANBUL", "≈1.5 h flight", "BEST FOR", "Hiking, balloons", "cappadocia"],
      ["Antalya", "MEDITERRANEAN COAST", "Antalya", "The Kaleiçi old town, a Roman-era harbour and beaches on the Turquoise Coast.", "FROM ISTANBUL", "≈1.5 h flight", "KNOWN FOR", "Beaches, old town", "antalya"]],
    phrases: [["Merhaba", "MEHR-hah-bah", "Hello"], ["Teşekkür ederim", "teh-shek-KEWR eh-deh-REEM", "Thank you"], ["Ne kadar?", "neh kah-DAHR", "How much?"]] },
];
const PICKS = [ // Top recommendations (3D panel)
  ["Penang", "MALAYSIA", "Heritage lanes and hawker food", "heroPenang", "dest"],
  ["Kyoto", "JAPAN", "Temples and machiya lanes", "cJapan", "japan"],
  ["Lisbon", "PORTUGAL", "Trams, tiles and viewpoints", "cPortugal", "portugal"],
  ["Marrakech", "MOROCCO", "Souks, riads and gardens", "cMorocco", "morocco"],
  ["Oaxaca", "MEXICO", "Markets, mole and mezcal", "cMexico", "mexico"],
  ["Istanbul", "TÜRKIYE", "Two continents, one skyline", "cTurkiye", "turkiye"],
];
const TEXT_SWAPS = [
  ["SELAMAT PAGI · GOOD MORNING", "GOOD MORNING"],
  ["Where to this weekend?", "Where to next?"],
  ["Selamat datang.\nWelcome.", "Welcome to\nTourix."],
  ["Search places, food, phrases", "Search countries, places, food"],
];

// ---------- utils ----------
const insideInstance = (n) => { let p = n.parent; while (p && p.type !== "PAGE") { if (p.type === "INSTANCE") return true; p = p.parent; } return false; };
async function setChars(t, s) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; }
function fitSection(sec) { let mx = 0, my = 0; for (const ch of sec.children) { mx = Math.max(mx, ch.x + ch.width); my = Math.max(my, ch.y + ch.height); } sec.resizeWithoutConstraints(Math.max(sec.width, mx + 80), Math.max(sec.height, my + 100)); }
function fitSet(set) { if (set.layoutMode && set.layoutMode !== "NONE") return; let mx = 0, my = 0; for (const ch of set.children) { mx = Math.max(mx, ch.x + ch.width); my = Math.max(my, ch.y + ch.height); } set.resizeWithoutConstraints(mx + 40, my + 40); }
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }
async function addReaction(node, trigger, action) { const keep = cleanReactions(node.reactions).filter((r) => r.trigger.type !== trigger.type); await node.setReactionsAsync(keep.concat([{ trigger, actions: [action] }])); }
function placeInKit(set) { const kit = KIT.section; let mx = 0; for (const ch of kit.children) if (ch !== set) mx = Math.max(mx, ch.x + ch.width); set.x = mx + 120; set.y = 140; fitSection(kit); }
const fr = (nm) => MOB.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION");

async function locate() {
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)");
  if (!MOB) throw new Error("Page 'Mobile Prototype (iOS)' not found");
  await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  if (fr("27 Country – Japan")) throw new Error("Tourix v3 already applied (27 Country – Japan exists).");
  for (const sec of MOB.children.filter((n) => n.type === "SECTION")) SEC[sec.name] = sec;
  const names = { lang: "02 Onboarding – Language", home: "04 Home", search: "05 Explore – Search", dest: "06 Destination – Penang", exp: "07 Experience – Heritage walk", phrases: "08 Culture guide – Phrases", lens: "12 AR Heritage Lens", lensInfo: "13 AR Lens – Landmark info", melaka: "14 Destination – Melaka", etiquette: "15 Culture guide – Etiquette", lensInfo2: "23 AR Lens – Shophouse façade", homeLoading: "24 Home – Loading", country: "26 Country – Malaysia" };
  for (const [k, nm] of Object.entries(names)) { const f = fr(nm); if (f) S[k] = f; else PROBLEMS.push("Missing screen " + nm); }
  const kit = Object.values(SEC).find((s) => s.name.startsWith("Mobile kit"));
  const kc = (nm) => kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === nm);
  KIT.status = kc("Status Bar (iOS)"); KIT.tab = kc("Tab Bar (iOS)"); KIT.phrase = kc("Phrase Card"); KIT.section = kit;
  if (!S.home || !S.country || !KIT.status || !KIT.tab) throw new Error("Home, 26 or the mobile kit wasn't found; nothing changed.");
}

// ---------- A · retire the old brand name everywhere ----------
async function retireOldName() {
  let n = 0;
  const fix = (s) => s.replace(OLDRE, (m) => (m[0] === m[0].toUpperCase() ? "Tourix" : "tourix"));
  for (const page of figma.root.children) {
    await page.loadAsync();
    if (OLDRE.test(page.name)) { page.name = fix(page.name); n++; } OLDRE.lastIndex = 0;
    for (const node of page.findAll(() => true)) {
      OLDRE.lastIndex = 0; if (OLDRE.test(node.name)) { node.name = fix(node.name); n++; }
      if (node.type === "TEXT" && !insideInstance(node)) { OLDRE.lastIndex = 0; if (OLDRE.test(node.characters)) { await setChars(node, fix(node.characters)); n++; } }
      if ((node.type === "COMPONENT" || node.type === "COMPONENT_SET") && node.description) { OLDRE.lastIndex = 0; if (OLDRE.test(node.description)) { node.description = fix(node.description); n++; } }
    }
  }
  const styles = [...await figma.getLocalPaintStylesAsync(), ...await figma.getLocalTextStylesAsync(), ...await figma.getLocalEffectStylesAsync()];
  for (const s of styles) { OLDRE.lastIndex = 0; if (OLDRE.test(s.name + s.description)) { s.name = fix(s.name); s.description = fix(s.description); n++; } }
  for (const c of await figma.variables.getLocalVariableCollectionsAsync()) { OLDRE.lastIndex = 0; if (OLDRE.test(c.name)) { c.name = fix(c.name); n++; } }
  for (const v of await figma.variables.getLocalVariablesAsync()) { OLDRE.lastIndex = 0; if (OLDRE.test(v.name + (v.description || ""))) { v.name = fix(v.name); v.description = fix(v.description || ""); n++; } }
  await figma.setCurrentPageAsync(MOB);
  CHANGES.push(`Old brand name removed from ${n} places (pages, layer names, text, descriptions, styles, variables)`);
}

// ---------- B · small copy fixes ----------
async function copyFixes() {
  let n = 0;
  for (const t of MOB.findAll((x) => x.type === "TEXT")) {
    if (insideInstance(t)) continue;
    let s = t.characters, o = s; for (const [a, b] of TEXT_SWAPS) s = s.split(a).join(b);
    if (s !== o) { await setChars(t, s); n++; }
  }
  CHANGES.push(`Copy: 'GOOD MORNING' (no Malay greeting), 'Where to next?', 'Welcome to Tourix.', search placeholder — ${n} text layers`);
}

// ---------- C · press states, heart pop, phrase-card property ----------
async function pressStates() {
  let made = 0;
  for (const set of [C.btn, C.dest, C.exp]) {
    if (!set || set.type !== "COMPONENT_SET") continue;
    for (const def of set.children.filter((v) => /State=Default/.test(v.name))) {
      const hov = set.children.find((v) => v.name === def.name.replace("State=Default", "State=Hover"));
      const src = hov || def; const pr = src.clone(); set.appendChild(pr);
      pr.name = def.name.replace("State=Default", "State=Pressed"); pr.x = src.x; pr.y = Math.max(...set.children.map((c) => c.y + c.height)) + 24;
      if (!hov) pr.opacity = 0.9;
      await pr.setReactionsAsync([]);
      await addReaction(def, { type: "ON_PRESS" }, CHG(pr, SM(0.12)));
      if (hov) await addReaction(hov, { type: "ON_PRESS" }, CHG(pr, SM(0.12)));
      made++;
    }
    fitSet(set);
  }
  CHANGES.push(`Press states: ${made} 'State=Pressed' variants (Button, Destination Card, Experience Card) with While-pressing feedback`);
}
async function heartPop() {
  const set = C.save; if (!set || set.type !== "COMPONENT_SET") throw new Error("Save Button set not found");
  const def = set.children.find((v) => /State=Default/.test(v.name)), saved = set.children.find((v) => /State=Saved/.test(v.name));
  const pop = saved.clone(); set.appendChild(pop); pop.name = "State=Pop"; pop.x = saved.x + saved.width + 24; pop.y = saved.y;
  await pop.setReactionsAsync([]);
  for (const ch of pop.children) { if (ch.type === "INSTANCE" || ch.type === "VECTOR" || ch.type === "FRAME" || ch.type === "GROUP" || ch.type === "BOOLEAN_OPERATION") { const cx = ch.x + ch.width / 2, cy = ch.y + ch.height / 2; ch.rescale(1.3); ch.x = cx - ch.width / 2; ch.y = cy - ch.height / 2; } }
  await addReaction(def, { type: "ON_CLICK" }, CHG(pop, SM(0.14, "EASE_OUT")));
  await addReaction(pop, { type: "AFTER_TIMEOUT", timeout: 0.14 }, CHG(saved, SM(0.25, "EASE_OUT_BACK")));
  fitSet(set);
  CHANGES.push("Save Button: heart 'pop' (Default → Pop 1.3× → Saved with an overshoot ease)");
}
function renamePhraseProp() {
  const set = KIT.phrase; if (!set) return;
  const k = Object.keys(set.componentPropertyDefinitions).find((x) => x.split("#")[0] === "Malay");
  if (k) { set.editComponentProperty(k, { name: "Phrase" }); for (const t of set.findAll((n) => n.type === "TEXT" && n.name === "Malay")) t.name = "Phrase"; CHANGES.push("Phrase Card: text property 'Malay' renamed 'Phrase' so any language can use it"); }
}
function PHRASE(p) { const i = variant(KIT.phrase, "Playing=No").createInstance(); i.name = "Phrase/" + p[0]; setProps(i, KIT.phrase, { "Phrase": p[0], "Pronunciation": p[1], "English": p[2] }); return i; }

// ---------- D · Live Photo (Ken Burns, one-shot 4.5 s) ----------
async function buildLivePhoto() {
  const mk = (end) => { const c = figma.createComponent(); c.name = "Phase=" + (end ? "End" : "Start"); c.resize(W, 380); c.clipsContent = true; c.fills = [];
    const r = rect(c, "Photo", end ? W * 1.08 : W, end ? 380 * 1.08 : 380, null); r.fills = [img("heroPenang")]; r.x = end ? -W * 0.05 : 0; r.y = end ? -380 * 0.03 : 0; r.constraints = { horizontal: "SCALE", vertical: "SCALE" }; return c; };
  const a = mk(false), b = mk(true);
  const set = figma.combineAsVariants([a, b], KIT.section); set.name = "Live Photo"; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 24; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "mist");
  set.description = "Ken Burns hero photo: slow 8% push-in over 4.5 s, once per visit (stays under WCAG 2.2.2's 5 s). Override the Photo fill per screen.";
  await a.setReactionsAsync([{ trigger: { type: "AFTER_TIMEOUT", timeout: 0.15 }, actions: [CHG(b, { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 4.5 })] }]);
  KIT.live = set; placeInKit(set);
  CHANGES.push("New component Live Photo (Phase=Start|End): Ken Burns push-in for hero photos");
}
function livePhotoInto(hero, hash) {
  const inst = variant(KIT.live, "Phase=Start").createInstance(); inst.name = "Live photo";
  hero.insertChild(0, inst); inst.x = 0; inst.y = 0; inst.resize(hero.width, hero.height);
  const ph = inst.findOne((n) => n.name === "Photo"); if (ph && hash) ph.fills = [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
  hero.fills = [solid("pandan900")];
  return inst;
}
async function heroesAlive() {
  let n = 0;
  for (const k of ["dest", "exp", "melaka", "country"]) {
    const hero = S[k] && S[k].findOne((x) => x.name === "Hero photo" && x.type === "FRAME"); if (!hero) { PROBLEMS.push("No hero on " + k); continue; }
    const f = (hero.fills || []).find((p) => p.type === "IMAGE"); if (!f) continue;
    livePhotoInto(hero, f.imageHash); n++;
  }
  CHANGES.push(`Ken Burns hero photos on ${n} screens (06, 07, 14, 26)`);
}

// ---------- E · Reveal (entrance animation) ----------
async function reveal(node, label) {
  const p = node.parent, idx = p.children.indexOf(node);
  const wrap = figma.createFrame(); wrap.name = "Reveal · " + label; wrap.fills = []; wrap.clipsContent = false; wrap.resize(node.width, node.height);
  p.insertChild(idx, wrap); if (p.layoutMode && p.layoutMode !== "NONE") { try { wrap.layoutSizingHorizontal = "FILL"; } catch (e) { } }
  wrap.appendChild(node); node.x = 0; node.y = 0;
  const yes = figma.createComponentFromNode(wrap); yes.name = "In=Yes";
  const no = yes.clone(); no.name = "In=No"; const inner = no.children[0]; inner.y = 56; inner.opacity = 0;
  const set = figma.combineAsVariants([no, yes], KIT.section); set.name = "Reveal · " + label; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 40; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; set.fills = [];
  set.description = "Entrance animation: content rises 56 pt and fades in once when the screen opens (0.6 s).";
  await no.setReactionsAsync([{ trigger: { type: "AFTER_TIMEOUT", timeout: 0.1 }, actions: [CHG(yes, BEZ(0.6))] }]);
  const inst = no.createInstance(); inst.name = "Reveal · " + label; p.insertChild(idx, inst);
  if (p.layoutMode && p.layoutMode !== "NONE") { try { inst.layoutSizingHorizontal = "FILL"; } catch (e) { } }
  placeInKit(set);
  return inst;
}

// ---------- F · Top recommendations (3D cover-flow) ----------
async function buildPanel() {
  const PW = 353, PH = 430, CW = 220, CHh = 300, cx = PW / 2;
  const cards = [];
  async function card(p) {
    const c = figma.createFrame(); c.name = "Card/" + p[0]; c.resize(CW, CHh); radius(c, 26); c.clipsContent = true; c.fills = [solid("pandan900")];
    const ph = rect(c, "Photo", CW + 60, CHh + 20, null); ph.fills = [img(p[3])]; ph.x = -30; ph.y = -10;
    const sh = rect(c, "Shade", CW, CHh, null); sh.fills = [vgrad("pandan900", 0.0, 0.95, 0.35, 1)];
    const tag = pill("Tag", "pandan900", 0.72, 5, 10, 6); c.appendChild(tag); tag.x = 14; tag.y = 14; I(tag, "pin", 12, "kaya400"); await T(tag, p[1], "Eyebrow", "kaya400", { size: 10 });
    const t = await T(c, p[0], "Display/S", "onDark", { w: CW - 28, name: "Title" }); t.x = 14; t.y = CHh - 92;
    const s = await T(c, p[2], "Body/S", "onDarkMuted", { w: CW - 70, name: "Sub" }); s.x = 14; s.y = CHh - 54;
    const go = circleBtn("Go", "arrowRight", 40, "kaya400", 1, "pandan900", 18); c.appendChild(go); go.x = CW - 54; go.y = CHh - 54;
    c.effects = [{ type: "DROP_SHADOW", color: { r: 0.04, g: 0.16, b: 0.13, a: 0.28 }, offset: { x: 0, y: 18 }, radius: 36, spread: -6, visible: true, blendMode: "NORMAL" }];
    return c;
  }
  const POS = { 0: [1, 0, 1, 0], 1: [0.84, -0.1, 0.92, 16], [-1]: [0.84, 0.1, 0.92, -16], 2: [0.68, -0.16, 0.45, 26], [-2]: [0.68, 0.16, 0.45, -26], 3: [0.56, 0, 0, 0] };
  const XC = { 0: cx, 1: cx + 148, [-1]: cx - 148, 2: cx + 238, [-2]: cx - 238, 3: cx };
  const N = PICKS.length; const vs = [];
  async function variantFor(front) {
    const v = figma.createComponent(); v.name = "Front=" + (front < 0 ? "Intro" : PICKS[front][0]); v.resize(PW, PH); v.fills = []; v.clipsContent = false;
    const order = PICKS.map((p, i) => { let d = front < 0 ? 3 : ((i - front + N) % N); if (d > 3) d -= N; return { p, i, d }; }).sort((a, b) => Math.abs(b.d) - Math.abs(a.d) || (b.d === 3 ? 1 : 0));
    const made = {};
    for (const { p, i, d } of order) {
      const c = await card(p); v.appendChild(c);
      const [s, skew, op, par] = front < 0 ? [0.6, 0, 0, 0] : POS[d];
      c.rescale(s); const w = CW * s, h = CHh * s;
      c.relativeTransform = [[1, 0, XC[front < 0 ? 0 : d] - w / 2], [skew, 1, 24 + (CHh - h) / 2 + (front < 0 ? 40 : 0) - skew * w / 2]];
      c.opacity = op; const ph = c.findOne((n) => n.name === "Photo"); if (ph) ph.x += par * s;
      made[i] = { c, d };
    }
    const ctr = AL("HORIZONTAL", "Controls", 16); v.appendChild(ctr); ctr.counterAxisAlignItems = "CENTER";
    const prev = circleBtn("Prev", "arrowLeft", 44, "surface", 1, "ink", 18); prev.strokes = [solid("line")]; prev.strokeWeight = 1; prev.strokeAlign = "INSIDE"; ctr.appendChild(prev);
    const dots = AL("HORIZONTAL", "Dots", 6); dots.counterAxisAlignItems = "CENTER"; ctr.appendChild(dots);
    PICKS.forEach((p, i) => rect(dots, "Dot " + (i + 1), i === front ? 22 : 7, 7, i === front ? "pandan900" : "lineStrong", 1, 4));
    const next = circleBtn("Next", "arrowRight", 44, "pandan900", 1, "kaya400", 18); ctr.appendChild(next);
    ctr.x = (PW - ctr.width) / 2; ctr.y = PH - 64;
    return { v, made, prev, next };
  }
  const intro = await variantFor(-1);
  for (let k = 0; k < N; k++) vs.push(await variantFor(k));
  const set = figma.combineAsVariants([intro.v, ...vs.map((x) => x.v)], KIT.section); set.name = "Top Recommendations (3D)";
  set.layoutMode = "HORIZONTAL"; set.itemSpacing = 60; pad(set, 40); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "mist");
  set.description = "3D cover-flow of recommended destinations. Swipe (drag the front card), tap a side card or use the arrows; tap the front card to open its guide. No auto-play. Intro variant animates in when Home opens.";
  for (let k = 0; k < N; k++) {
    const { made, prev, next } = vs[k]; const nx = vs[(k + 1) % N].v, pv = vs[(k - 1 + N) % N].v;
    await next.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [CHG(nx, BEZ(0.55))] }]);
    await prev.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [CHG(pv, BEZ(0.55))] }]);
    for (const [i, { c, d }] of Object.entries(made)) {
      if (d === 0) { const dest = S[PICKS[i][4]]; const acts = [{ trigger: { type: "ON_DRAG" }, actions: [CHG(nx, BEZ(0.55))] }]; if (dest) acts.push({ trigger: { type: "ON_CLICK" }, actions: [NAV(dest)] }); else PROBLEMS.push("No destination for pick " + PICKS[i][0]); await c.setReactionsAsync(acts); }
      else if (d === 1) await c.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [CHG(nx, BEZ(0.55))] }]);
      else if (d === -1) await c.setReactionsAsync([{ trigger: { type: "ON_CLICK" }, actions: [CHG(pv, BEZ(0.55))] }]);
    }
  }
  await intro.v.setReactionsAsync([{ trigger: { type: "AFTER_TIMEOUT", timeout: 0.1 }, actions: [CHG(vs[0].v, BEZ(0.8))] }]);
  KIT.panel = set; KIT.panelIntro = intro.v; placeInKit(set);
  CHANGES.push("New component Top Recommendations (3D): 6 picks in a cover-flow with perspective skew, parallax photos, drag/tap/arrows, intro animation");
}
async function homePanel() {
  const body = S.home.findOne((n) => n.name === "Body" && n.parent && n.parent.name === "Content");
  const old = body.findOne((n) => n.name === "Choose a country"); if (old) old.remove();
  const wrap = AL("VERTICAL", "Top recommendations", 8); body.insertChild(0, wrap); wrap.layoutSizingHorizontal = "FILL";
  const h = await sectionHead(wrap, "Top recommendations", "See all", 20);
  await T(wrap, "Picked for your interests. Swipe, or tap a card.", "Body/S", "muted", { fill: true });
  const inst = KIT.panelIntro.createInstance(); inst.name = "Top recommendations (3D)"; wrap.appendChild(inst);
  if (h.action) link(h.action, "search", "dissolve");
  const content = S.home.findOne((n) => n.name === "Content" && n.parent === S.home); if (content) S.home.resize(W, Math.max(H, Math.ceil(deepH(content))));
  const cap = MOB.findOne((n) => n.name === "Label · 04 Home");
  if (cap) { const t = cap.findAll((n) => n.type === "TEXT")[1]; if (t) await setChars(t, "Countries showcase in the header (arrows, drag, pause). 'Top recommendations' is a 3D cover-flow: drag or tap the side cards, tap the front card to open Penang or a country guide."); }
  CHANGES.push("04 Home: 'Choose a country' list replaced by 'Top recommendations' 3D panel (Penang → 06; Kyoto, Lisbon, Marrakech, Oaxaca, Istanbul → country guides)");
}

// ---------- G · Country guides 27–31 ----------
async function buildCountryPage(sec, col, d) {
  const f = screen(d.key, d.num + " Country – " + d.name, sec, col, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 380, d.hero);
  const shr = circleBtn("Share", "share", 44, "surface", 0.92, "ink", 20); hero.appendChild(shr); shr.x = W - 20 - 44 - 52; shr.y = 58;
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 58;
  livePhotoInto(hero, IMG[d.hero]);
  const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 8, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  await T(sh, d.eyebrow, "Eyebrow", "pandan500");
  await T(sh, d.name, "Mobile/Display XL", "ink");
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, d.loc, "Body/S", "muted");
  const facts = AL("HORIZONTAL", "Facts", 8); add(sh, facts, true);
  for (const [l, v] of d.facts) { const fc = AL("VERTICAL", "Fact", 4); add(facts, fc, true); pad(fc, 12); radius(fc, 14); paintTo(fc, "mist"); await T(fc, l, "Eyebrow", "muted", { fill: true, size: 10 }); await T(fc, v, "Label/S", "ink", { fill: true }); }
  await T(sh, d.intro, "Body/M", "ink", { fill: true });
  await T(sh, "Be a good guest", "Heading/M", "ink");
  for (const [ic, t] of d.tips) { const r = AL("HORIZONTAL", "Tip", 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER"; r.appendChild(circleBtn("Icon", ic, 40, "pandan100", 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true }); }
  const body = ALw("VERTICAL", "Body", W, 24); c.appendChild(body); body.layoutSizingHorizontal = "FILL"; pad(body, 22, 0, 120, 20);
  await sectionHead(body, "Destinations", null, 20);
  const ds = scroller(body, "Destination scroller", 420, 14);
  for (const x of d.dests) { const k = DEST(x); ds.tr.appendChild(k); k.rescale(0.86); }
  fitScroller(ds);
  await sectionHead(body, "Say it like a local", null, 20);
  const pl = ALw("VERTICAL", "Phrases", 353, 10); body.appendChild(pl);
  for (const p of d.phrases) { const i = PHRASE(p); pl.appendChild(i); i.layoutSizingHorizontal = "FILL"; }
  await T(body, "Pronunciations are approximate. Tap a phrase to hear it (simulated).", "Body/S", "muted", { w: 353 });
  finish(f, c, [statusAt("Dark"), tabAt("Home")]);
  back(bk);
  await caption(sec, f, d.num, "Country · " + d.name, "Country guide: Ken Burns hero, sheet rises in, 3 destinations (not linked yet), phrases with a playing state, etiquette.");
  await reveal(sh, d.name + " sheet");
  return f;
}
async function buildCountries() {
  const bottom = Math.max(...Object.values(SEC).map((s) => s.y + s.height));
  const left = Math.min(...Object.values(SEC).filter((s) => s.name.startsWith("Flow")).map((s) => s.x));
  const sec = newSection("Flow 6 · Country guides", left, bottom + 240, COUNTRY_PAGES.length);
  for (const [i, d] of COUNTRY_PAGES.entries()) await run("Country " + d.name, () => buildCountryPage(sec, i, d));
  fitSection(sec);
  try { if (S.japan) MOB.flowStartingPoints = MOB.flowStartingPoints.concat([{ nodeId: S.japan.id, name: "6 · Country guides" }]); } catch (e) { PROBLEMS.push("Flow start: " + e.message); }
  CHANGES.push("New section Flow 6 · Country guides: 27 Japan, 28 Morocco, 29 Portugal, 30 Mexico, 31 Türkiye (facts, etiquette, 3 destinations, 3 phrases each); flow start 6");
}

// ---------- H · Explore country chips + Malaysia breadcrumbs ----------
async function exploreCountries() {
  const c = S.search.findOne((n) => n.name === "Content" && n.parent === S.search);
  const filters = c && c.findOne((n) => n.name === "Filters"); if (!filters) throw new Error("Explore filters row not found");
  const idx = c.children.indexOf(filters) + 1;
  const eb = await T(null, "COUNTRY GUIDES", "Eyebrow", "muted"); c.insertChild(idx, eb);
  const vp = figma.createFrame(); vp.name = "Country chips"; vp.fills = []; vp.clipsContent = true; vp.overflowDirection = "HORIZONTAL"; c.insertChild(idx + 1, vp); vp.layoutSizingHorizontal = "FILL";
  const tr = AL("HORIZONTAL", "Track", 8); vp.appendChild(tr); tr.x = 0; tr.y = 0; pad(tr, 2, 20, 2, 0);
  const list = [["Malaysia", "kl", "country"], ["Japan", "cJapan", "japan"], ["Morocco", "cMorocco", "morocco"], ["Portugal", "cPortugal", "portugal"], ["Mexico", "cMexico", "mexico"], ["Türkiye", "cTurkiye", "turkiye"]];
  for (const [nm, im, to] of list) {
    const p = pill("Country/" + nm, "surface", 1, 6, 14, 8); p.paddingLeft = 6; p.strokes = [solid("lineStrong")]; p.strokeWeight = 1; p.strokeAlign = "INSIDE"; tr.appendChild(p);
    const th = ellipse(p, "Thumb", 32, 32, "pandan100"); th.fills = [img(im)]; await T(p, nm, "Label/S", "ink");
    link(p, to, "push");
  }
  vp.resize(vp.width, tr.height + 4);
  CHANGES.push("05 Explore: 'Country guides' chip row (6 countries, each linked to its guide)");
}
async function breadcrumbs() {
  for (const k of ["dest", "melaka"]) {
    const sh = S[k] && S[k].findOne((n) => n.name === "Sheet"); if (!sh) { PROBLEMS.push("No sheet on " + k); continue; }
    const p = pill("Country/Malaysia", "pandan100", 1, 10, 14, 6); sh.insertChild(0, p); I(p, "globe", 14, "pandan900"); await T(p, "Malaysia", "Label/S", "pandan900"); I(p, "chevRight", 14, "pandan900");
    link(p, "country", "push");
  }
  CHANGES.push("06 Penang and 14 Melaka: 'Malaysia' breadcrumb chip → 26 Country – Malaysia");
}

// ---------- I · AR anchor pulse + skeleton shimmer ----------
async function anchorPulse() {
  const vs = [];
  for (let k = 1; k <= 7; k++) {
    const v = figma.createComponent(); v.name = "Step=" + k; v.resize(48, 48); v.fills = []; v.clipsContent = false;
    const big = k < 7 && k % 2 === 0; const ring = ellipse(v, "Ring", big ? 46 : 14, big ? 46 : 14, "kaya400", big ? 0 : 0.55); ring.x = (48 - ring.width) / 2; ring.y = (48 - ring.height) / 2;
    const dot = ellipse(v, "Dot", 14, 14, "kaya400"); dot.x = 17; dot.y = 17; dot.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; dot.strokeWeight = 2;
    dot.effects = [{ type: "DROP_SHADOW", color: { r: 0.95, g: 0.76, b: 0.31, a: 0.9 }, offset: { x: 0, y: 0 }, radius: 12, spread: 4, visible: true, blendMode: "NORMAL" }];
    vs.push(v);
  }
  const set = figma.combineAsVariants(vs, KIT.section); set.name = "AR Anchor Pulse"; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 16; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "pandan900");
  set.description = "Anchor dot that pulses 3 times (≈2.7 s) when the AR view opens, then rests (WCAG 2.2.2).";
  for (let k = 0; k < 6; k++) await vs[k].setReactionsAsync([{ trigger: { type: "AFTER_TIMEOUT", timeout: 0.05 }, actions: [CHG(vs[k + 1], { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.45 })] }]);
  placeInKit(set);
  let n = 0;
  for (const k of ["lens", "lensInfo", "lensInfo2"]) {
    if (!S[k]) continue;
    for (const a of S[k].findAll((x) => x.type === "ELLIPSE" && / · anchor$/.test(x.name))) {
      const i = vs[0].createInstance(); i.name = a.name; const p = a.parent; p.insertChild(p.children.indexOf(a), i); i.x = a.x + a.width / 2 - 24; i.y = a.y + a.height / 2 - 24; a.remove(); n++;
    }
  }
  CHANGES.push(`AR anchors pulse on open: ${n} anchors on 12, 13, 23`);
}
async function shimmer() {
  const mk = (end) => { const c = figma.createComponent(); c.name = "Pos=" + (end ? "End" : "Start"); c.resize(W, H); c.fills = []; c.clipsContent = true;
    const r = rect(c, "Sheen", 180, H * 1.4, null); r.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 0.5, color: { r: 1, g: 1, b: 1, a: 0.28 } }, { position: 1, color: { r: 1, g: 1, b: 1, a: 0 } }] }];
    r.rotation = -14; r.x = end ? W + 60 : -260; r.y = -120; return c; };
  const a = mk(false), b = mk(true);
  const set = figma.combineAsVariants([a, b], KIT.section); set.name = "Skeleton Shimmer"; set.layoutMode = "HORIZONTAL"; set.itemSpacing = 24; pad(set, 24); set.primaryAxisSizingMode = "AUTO"; set.counterAxisSizingMode = "AUTO"; paintTo(set, "pandan900");
  await a.setReactionsAsync([{ trigger: { type: "AFTER_TIMEOUT", timeout: 0.05 }, actions: [CHG(b, { type: "SMART_ANIMATE", easing: { type: "EASE_IN_AND_OUT" }, duration: 1.2 })] }]);
  placeInKit(set);
  const f = S.homeLoading; const i = a.createInstance(); i.name = "Shimmer"; f.insertChild(Math.max(0, f.children.length - 3), i); i.x = 0; i.y = 0;
  CHANGES.push("24 Home – Loading: one shimmer sweep across the skeleton (1.2 s)");
}

// ---------- J · Read me ----------
async function readme() {
  const r = MOB.findOne((x) => x.type === "FRAME" && x.name.startsWith("Read me")); if (!r) return;
  const b = AL("VERTICAL", "Block/v3", 10); add(r, b, true); pad(b, 24); radius(b, 20); paintTo(b, "kaya100");
  await T(b, "v3 · motion, 3D and country guides (5 Oct 2026) · 31 screens, 6 flows", "Heading/M", "ink", { fill: true });
  for (const t of [
    "Home: 'Top recommendations' 3D cover-flow — drag the front card, tap a side card or the arrows; tap the front card to open Penang or a country guide.",
    "New country guides 27 Japan · 28 Morocco · 29 Portugal · 30 Mexico · 31 Türkiye (flow start 6). Reach them from Home picks or Explore → Country guides.",
    "Motion: Ken Burns hero photos, sheets that rise in, press states on buttons and cards, heart pop on Save, pulsing AR anchors, skeleton shimmer. Every automatic animation ends within 5 s (WCAG 2.2.2).",
    "Figma prototypes can't trigger animation from scroll position, so motion runs on screen open, press, drag or tap.",
  ]) await T(b, "•  " + t, "Body/S", "ink", { fill: true });
}

// ---------- main ----------
async function main() {
  figma.notify("Tourix v3: countries, 3D panel and motion… about 60 seconds.", { timeout: 8000 });
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync(); await loadComponents(ds);
  try { await locate(); } catch (e) { figma.closePlugin(e.message); return; }
  try { await figma.saveVersionHistoryAsync("Before Tourix v3 (26 screens)", "Saved by the Tourix v3 plugin."); CHANGES.push("Version saved: 'Before Tourix v3 (26 screens)'"); } catch (e) { PROBLEMS.push("Version not saved: " + e.message); }
  try { const cols = await figma.variables.getLocalVariableCollectionsAsync(); const col = cols.find((c) => /tokens/i.test(c.name)) || cols[0]; for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); if (v && v.name === "color/line-strong") { V.lineStrong = v; HEX.lineStrong = "#7C8C84"; } } } catch (e) { HEX.lineStrong = "#7C8C84"; }
  if (!HEX.lineStrong) HEX.lineStrong = "#7C8C84";
  for (const [k, id] of Object.entries(PHOTOS)) { try { IMG[k] = (await figma.createImageAsync(PX(id))).hash; } catch (e) { PROBLEMS.push("Photo " + k + ": " + e.message); IMG[k] = IMG.kl; } }
  await run("Old name", retireOldName);
  await run("Copy", copyFixes);
  await run("Press states", pressStates);
  await run("Heart pop", heartPop);
  await run("Phrase prop", async () => renamePhraseProp());
  await run("Live Photo", buildLivePhoto);
  await run("Countries", buildCountries);
  await run("Panel", buildPanel);
  await run("Home panel", homePanel);
  await run("Explore chips", exploreCountries);
  await run("Breadcrumbs", breadcrumbs);
  await run("Heroes", heroesAlive);
  await run("Reveal 26", async () => { const sh = S.country.findOne((n) => n.name === "Sheet"); if (sh) { await reveal(sh, "Malaysia sheet"); CHANGES.push("Entrance 'rise in' on the 26–31 country sheets"); } });
  await run("Anchors", anchorPulse);
  await run("Shimmer", shimmer);
  await run("Read me", readme);
  const linked = await applyLinks();
  const v2log = MOB.findOne((n) => n.type === "FRAME" && n.name === "Build log · worldwide");
  const log = ALw("VERTICAL", "Build log · v3", 680, 8); MOB.appendChild(log); pad(log, 32); radius(log, 24); paintTo(log, "surface");
  if (v2log) { log.x = v2log.x + v2log.width + 80; log.y = v2log.y; }
  await T(log, "Build log · v3 (5 Oct 2026)", "Heading/M", "ink", { fill: true });
  for (const c of CHANGES) await T(log, "✓ " + c, "Body/S", "ink", { fill: true });
  await T(log, "Links applied: " + linked, "Mono/S", "muted");
  for (const p of PROBLEMS) await T(log, "• " + p, "Mono/S", "bunga", { fill: true });
  figma.viewport.scrollAndZoomIntoView([S.home]);
  figma.closePlugin(`Tourix v3: ${CHANGES.length} changes, ${linked} links.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s): ` + PROBLEMS.join(" | ") : " No issues."));
}
main().catch((e) => figma.closePlugin("v3 stopped: " + e.message));
