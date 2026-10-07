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
