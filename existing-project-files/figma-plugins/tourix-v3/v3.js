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
