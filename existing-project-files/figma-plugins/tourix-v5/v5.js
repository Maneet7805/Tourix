// ===================== TOURIX v5 · the remaining screens (7 Oct 2026) =====================
// Approved by the project owner: design every page still missing. Adds 43 screens (32–74) that close the dead ends:
// 19 destination pages, experiences/festivals tabs, 2 experiences, saved list, trip screens and sheets, notifications,
// location, Explore filters, Me sub-pages, AR modes, offline and Bahasa Melayu states. Reuses existing components only.
// Refuses to run twice (stops if "32 Destination – Kuala Lumpur" exists). Saves a named version first.
const CHANGES = []; const SEC = {};
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;
const PHOTOS = { cJapan: 32660559, cMorocco: 27549780, cPortugal: 14850795, cMexico: 18019709, cTurkiye: 27634409, tokyo: 31405878, hokkaido: 31416900, fes: 30398385, chefchaouen: 25070502, porto: 35340124, algarve: 17910037, cdmx: 21086105, yucatan: 17182240, cappadocia: 17911073, antalya: 18761177 };
const insideInstance = (n) => { let p = n.parent; while (p && p.type !== "PAGE") { if (p.type === "INSTANCE") return true; p = p.parent; } return false; };
async function setChars(t, s) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; }
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }
function fitSection(sec) { let mx = 0, my = 0; for (const ch of sec.children) { mx = Math.max(mx, ch.x + ch.width); my = Math.max(my, ch.y + ch.height); } sec.resizeWithoutConstraints(Math.max(sec.width, mx + 80), Math.max(sec.height, my + 100)); }
const fr = (nm) => MOB.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION");
const nextCol = (sec) => Math.max(0, ...sec.children.filter((n) => n.type === "FRAME" && /^\d\d /.test(n.name)).map((n) => Math.round((n.x - 60) / (W + GAP_X)) + 1));
const secOf = (prefix) => Object.values(SEC).find((s) => s.name.startsWith(prefix));
function inS(k, name) { return S[k] ? S[k].findOne((n) => n.name === name) : null; }
function fit(f) { const c = f.children.find((n) => n.name === "Content"); if (c) f.resize(W, Math.max(H, Math.ceil(deepH(c)))); }
function cloneScreen(srcKey, key, name, sec) {
  const src = S[srcKey]; const col = nextCol(sec); const f = src.clone(); sec.appendChild(f); f.name = name; f.x = 60 + col * (W + GAP_X); f.y = 140; S[key] = f; return f;
}
function livePhotoInto(hero, hash) {
  if (!KIT.live) return; const inst = variant(KIT.live, "Phase=Start").createInstance(); inst.name = "Live photo";
  hero.insertChild(0, inst); inst.x = 0; inst.y = 0; inst.resize(hero.width, hero.height);
  const ph = inst.findOne((n) => n.name === "Photo"); if (ph && hash) ph.fills = [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
  hero.fills = [solid("pandan900")];
}
function topBack(c) { const bk = circleBtn("Back", "arrowLeft", 44, "surface", 1, "ink", 20); bk.strokes = [solid("line")]; bk.strokeWeight = 1; bk.strokeAlign = "INSIDE"; c.appendChild(bk); return bk; }
async function titleBlock(c, title, sub) { await T(c, title, "Mobile/Display M", "ink", { fill: true }); if (sub) await T(c, sub, "Body/M", "muted", { fill: true }); }
async function seg(parent, labels, active) {
  const s = AL("HORIZONTAL", "Segmented control", 4); add(parent, s, true); pad(s, 4); radius(s, 999); paintTo(s, "surface"); const out = {};
  for (const [i, l] of labels.entries()) { const it = AL("HORIZONTAL", "Seg/" + l); add(s, it, true); it.primaryAxisAlignItems = "CENTER"; pad(it, 9, 8); radius(it, 999); if (i === active) paintTo(it, "pandan900"); else it.fills = []; await T(it, l, "Label/S", i === active ? "onDark" : "muted"); out[l] = it; }
  return out;
}
async function factsRow(sh, facts) { const row = AL("HORIZONTAL", "Facts", 8); add(sh, row, true); for (const [l, v] of facts) { const fc = AL("VERTICAL", "Fact", 4); add(row, fc, true); pad(fc, 12); radius(fc, 14); paintTo(fc, "mist"); await T(fc, l, "Eyebrow", "muted", { fill: true, size: 10 }); await T(fc, v, "Label/S", "ink", { fill: true }); } }
async function tips(sh, list) { for (const [ic, t] of list) { const r = AL("HORIZONTAL", "Tip", 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER"; r.appendChild(circleBtn("Icon", ic, 40, "pandan100", 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true }); } }
async function crumb(parent, label, to) { const p = pill("Country/" + label, "pandan100", 1, 10, 14, 6); parent.insertChild(0, p); I(p, "globe", 14, "pandan900"); await T(p, label, "Label/S", "pandan900"); I(p, "chevRight", 14, "pandan900"); link(p, to, "push"); return p; }
async function infoRow(list, name, title, meta, icon, to, thumb) {
  const r = await resultRow(list, name, title, meta, null, to ? (thumb || null) : null, to && thumb ? null : icon);
  if (!to) { const ch = r.findOne((n) => n.name === "icon/chevRight"); if (ch) ch.visible = false; } else link(r, to, "push");
  return r;
}
async function sheetScreen(sec, key, name, bgImg, title) {
  const f = screen(key, name, sec, nextCol(sec), "ink");
  const bg = rect(f, "Background photo", W, H, null); bg.fills = [img(bgImg)];
  const scrim = rect(f, "Scrim", W, H, "pandan900", 0.55);
  const sh = ALw("VERTICAL", "Sheet", W, 16); f.appendChild(sh); pad(sh, 10, 20, 40, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28; sh.effects = SHADOW2;
  const hb = AL("HORIZONTAL", "Handle row"); add(sh, hb, true); hb.primaryAxisAlignItems = "CENTER"; rect(hb, "Handle", 40, 5, "line", 1, 3);
  const top = AL("HORIZONTAL", "Sheet top", 8); add(sh, top, true); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER";
  await T(top, title, "Mobile/Display M", "ink", { w: 280 }); const x = circleBtn("Close sheet", "x", 44, "mist", 1, "ink", 18); top.appendChild(x);
  back(x); back(scrim);
  return { f, sh, done: () => { sh.x = 0; sh.y = H - deepH(sh); f.appendChild(statusAt("Clear")); f.numberOfFixedChildren = 1; } };
}
async function numbered(parent, steps) {
  for (const [i, [t, s]] of steps.entries()) {
    const r = AL("HORIZONTAL", "Step " + (i + 1), 12); add(parent, r, true);
    const dot = AL("HORIZONTAL", "Dot"); dot.resize(28, 28); dot.primaryAxisSizingMode = "FIXED"; dot.counterAxisSizingMode = "FIXED"; dot.primaryAxisAlignItems = "CENTER"; dot.counterAxisAlignItems = "CENTER"; radius(dot, 14); paintTo(dot, i === steps.length - 1 ? "kaya400" : "pandan900"); r.appendChild(dot);
    await T(dot, String(i + 1), "Label/S", i === steps.length - 1 ? "pandan900" : "onDark");
    const col = AL("VERTICAL", "Text", 2); add(r, col, true); await T(col, t, "Heading/S", "ink", { fill: true }); if (s) await T(col, s, "Body/S", "muted", { fill: true });
  }
}

// ---------- destination pages 32–50 ----------
// [key, num, name, country label, country screen key, eyebrow, location, image, facts, intro, tips, highlights [title, meta, linkKey?]]
const DESTS5 = [
  ["kl", "32", "Kuala Lumpur", "Malaysia", "country", "FEDERAL TERRITORY · MALAYSIA", "Kuala Lumpur · capital city", "kl",
    [["GET AROUND", "LRT, MRT, monorail"], ["FROM PENANG", "≈1 h flight"], ["YOU'LL HEAR", "Malay, English, Cantonese, Tamil"]],
    "Malaysia's capital mixes glass towers with old shophouse streets. Base yourself near a rail line: KLCC, Bukit Bintang, Chinatown and Kampung Baru are a short ride apart.",
    [["shirt", "Cover shoulders and knees at mosques; robes are lent at the National Mosque."], ["sun", "Afternoon storms are common; plan indoor stops for later in the day."], ["bus", "Use a contactless or rechargeable card on the LRT and MRT."]],
    [["Petronas Twin Towers skybridge", "Book ahead · about 1 hour"], ["Batu Caves", "30 min by KTM train · about 2 hours", "batu"], ["Jalan Alor food street", "Evenings"]]],
  ["langkawi", "33", "Langkawi", "Malaysia", "country", "KEDAH · MALAYSIA", "Langkawi, Kedah · around 99 islands", "langkawi",
    [["FROM KL", "≈1 h flight"], ["GET AROUND", "Rental car, e-hailing"], ["DRIEST MONTHS", "Roughly Nov – Apr"]],
    "An island group off the north-west coast with mangrove tours, quiet beaches and rainforest hills. Most visitors stay near Pantai Cenang. (Photo is illustrative.)",
    [["sun", "Use reef-safe sunscreen and don't touch the coral."], ["compass", "The cable car closes in strong wind; check before you go."], ["shirt", "Swimwear is fine on the beach; cover up in town and at mosques."]],
    [["Kilim mangrove boat tour", "About 3 hours"], ["Cable car and Sky Bridge", "About 2 hours"], ["Island hopping", "Half day"]]],
  ["cameron", "34", "Cameron Highlands", "Malaysia", "country", "PAHANG · MALAYSIA", "Tanah Rata, Pahang · around 1,500 m", "cameron",
    [["FROM KL", "≈3.5–4 h drive"], ["CLIMATE", "Cool, often 15–25 °C"], ["KNOWN FOR", "Tea, forest trails"]],
    "Malaysia's best-known hill station: tea estates, strawberry farms and forest trails in cooler air. Mountain roads are winding, so expect slow driving.",
    [["shirt", "Bring a light jacket; evenings get cool."], ["route", "Take a guide on longer jungle trails; some are poorly marked."], ["sun", "Visit tea estates in the morning, before the afternoon rain."]],
    [["Tea estate visit", "About 1.5 hours"], ["Mossy forest guided walk", "About 2 hours"], ["Strawberry farm", "About 1 hour"]]],
  ["sabah", "35", "Sabah", "Malaysia", "country", "BORNEO · MALAYSIA", "Kota Kinabalu, Sabah", "sabah",
    [["FROM KL", "≈2.5 h flight"], ["GET AROUND", "Car, tours, boats"], ["KNOWN FOR", "Hiking, diving, wildlife"]],
    "Malaysia's northern Borneo state: Mount Kinabalu, island marine parks off Kota Kinabalu and river wildlife in the rainforest. Many trips need permits or guides, so book ahead.",
    [["route", "Climbing Mount Kinabalu needs a permit and a licensed guide."], ["sun", "Marine parks get busy at weekends; go early."], ["users", "Ask before photographing people in villages."]],
    [["Tunku Abdul Rahman Marine Park", "Boat from KK · half day"], ["Kinabatangan River wildlife cruise", "Overnight trip"], ["Mount Kinabalu climb", "2 days · permit and guide"]]],
  ["kyoto", "36", "Kyoto", "Japan", "japan", "KANSAI · JAPAN", "Kyoto · former imperial capital", "cJapan",
    [["FROM TOKYO", "≈2 h 15 min by bullet train"], ["GET AROUND", "Bus, subway, walking"], ["KNOWN FOR", "Temples, gardens"]],
    "Japan's capital for over a thousand years, with temples, shrines and wooden machiya lanes. Start early: popular sites are far quieter before 8 am.",
    [["info", "In Gion, don't photograph geiko or maiko without asking; some private lanes ban photos."], ["hand", "At shrines, rinse your hands at the water basin first."], ["bus", "Buses get crowded; the subway and walking are often faster."]],
    [["Fushimi Inari torii trail", "2–3 hours · free"], ["Kiyomizu-dera", "About 1.5 hours"], ["Nishiki Market", "About 1 hour"]]],
  ["tokyo", "37", "Tokyo", "Japan", "japan", "KANTO · JAPAN", "Tokyo · capital", "tokyo",
    [["GET AROUND", "Metro, JR lines"], ["FROM KYOTO", "≈2 h 15 min by bullet train"], ["KNOWN FOR", "Food, neighbourhoods"]],
    "A city of distinct neighbourhoods, from the old streets of Asakusa to the lights of Shinjuku. Trains are punctual and station signs include English.",
    [["volume", "Keep quiet on trains and switch your phone to silent."], ["utensils", "Eat where you buy rather than while walking in busy streets."], ["bus", "Avoid the morning rush (about 7:30–9:30 am) with luggage."]],
    [["Sensō-ji, Asakusa", "About 1.5 hours"], ["Shibuya Crossing", "Evening"], ["Meiji Jingu", "About 1 hour"]]],
  ["hokkaido", "38", "Hokkaido", "Japan", "japan", "NORTHERN JAPAN", "Sapporo, Hokkaido", "hokkaido",
    [["FROM TOKYO", "≈1.5 h flight"], ["BEST FOR", "Skiing, onsen"], ["WINTER", "Often below 0 °C"]],
    "Japan's northern island: deep powder snow in winter, flower fields in summer and volcanic hot springs. Distances are large, so plan transport carefully.",
    [["shirt", "Pack layers and grippy shoes; pavements get icy in winter."], ["info", "At onsen, wash before you bathe; tattoos may not be allowed."], ["route", "Trains are limited outside Sapporo; consider a car in summer."]],
    [["Sapporo Snow Festival", "Early February"], ["Furano flower fields", "July"], ["Noboribetsu onsen", "Day trip from Sapporo"]]],
  ["marrakech", "39", "Marrakech", "Morocco", "morocco", "MARRAKESH-SAFI · MOROCCO", "Marrakech · the Red City", "cMorocco",
    [["FROM CASABLANCA", "≈2.5–3 h by train"], ["GET AROUND", "Walking, petit taxi"], ["KNOWN FOR", "Souks, riads"]],
    "Jemaa el-Fna fills with food stalls and performers each evening, ringed by souks and riads. The medina's lanes are confusing, so download an offline map.",
    [["hand", "Agree the fare before a petit taxi sets off, or ask for the meter."], ["info", "Unofficial guides may offer directions for a fee; a polite “la, shukran” is enough."], ["shirt", "Dress modestly in the medina; cover shoulders and knees."]],
    [["Jemaa el-Fna at dusk", "Evening"], ["Jardin Majorelle", "About 1 hour · book ahead"], ["Bahia Palace", "About 1 hour"]]],
  ["fes", "40", "Fes", "Morocco", "morocco", "FÈS-MEKNÈS · MOROCCO", "Fes el-Bali · UNESCO World Heritage Site", "fes",
    [["FROM CASABLANCA", "≈4 h by train"], ["GET AROUND", "On foot in the medina"], ["KNOWN FOR", "Crafts, madrasas"]],
    "One of the largest car-free urban areas in the world, with thousands of narrow lanes. Fes el-Bali is the place to see tanneries, madrasas and craft workshops.",
    [["route", "A licensed guide helps on a first visit; your riad can book one."], ["info", "Tannery viewpoints are inside leather shops; a small tip is expected."], ["shirt", "Cover shoulders and knees; Fes is more conservative than Marrakech."]],
    [["Chouara Tannery", "About 1 hour"], ["Al-Attarine Madrasa", "About 45 min"], ["Bab Bou Jeloud (Blue Gate)", "Medina entrance"]]],
  ["chefchaouen", "41", "Chefchaouen", "Morocco", "morocco", "RIF MOUNTAINS · MOROCCO", "Chefchaouen · Rif Mountains", "chefchaouen",
    [["FROM FES", "≈4 h by road"], ["GET AROUND", "Walking"], ["KNOWN FOR", "Blue lanes, hiking"]],
    "A blue-washed town in the Rif Mountains, quieter than the big cities. Stay a night to walk the lanes early and catch sunset from the Spanish Mosque viewpoint.",
    [["users", "People live in these lanes; ask before photographing residents."], ["route", "The Akchour waterfalls make a good day hike; wear proper shoes."], ["sun", "Evenings are cool in the mountains."]],
    [["Spanish Mosque viewpoint", "Sunset · 30 min walk"], ["Akchour waterfalls", "Day trip"], ["Outa el Hammam square", "Evening"]]],
  ["lisbon", "42", "Lisbon", "Portugal", "portugal", "LISBON REGION · PORTUGAL", "Lisbon · capital", "cPortugal",
    [["GET AROUND", "Metro, tram, walking"], ["FROM PORTO", "≈3 h by train"], ["KNOWN FOR", "Viewpoints, fado"]],
    "A hilly city of tiled façades, viewpoints (miradouros) and historic trams. Alfama and Mouraria hold the oldest streets; Belém has the big monuments.",
    [["route", "Wear shoes with grip; the stone pavements get slippery."], ["info", "Tram 28 gets crowded; keep bags in front of you."], ["clock", "Many museums close on Mondays."]],
    [["Alfama and the castle", "Half day"], ["Belém tower and monastery", "Half day"], ["Fado in Alfama", "Evening"]]],
  ["porto", "43", "Porto", "Portugal", "portugal", "NORTH · PORTUGAL", "Porto · on the Douro river", "porto",
    [["FROM LISBON", "≈3 h by train"], ["GET AROUND", "Metro, walking"], ["KNOWN FOR", "Port wine, azulejos"]],
    "Porto climbs steeply from the riverside Ribeira, with blue-tiled churches and port-wine cellars across the river in Vila Nova de Gaia.",
    [["route", "Expect steep climbs; the funicular saves one hill."], ["utensils", "A francesinha is a very heavy dish; consider sharing."], ["info", "Port cellar tours often need booking in summer."]],
    [["Ribeira waterfront", "About 1 hour"], ["Dom Luís I Bridge", "Walk across · 20 min"], ["Port cellar tour in Gaia", "About 1.5 hours"]]],
  ["algarve", "44", "The Algarve", "Portugal", "portugal", "SOUTH COAST · PORTUGAL", "Lagos, Algarve", "algarve",
    [["FROM LISBON", "≈3 h drive"], ["BEST TIME", "Roughly May – Oct"], ["GET AROUND", "Car, regional bus"]],
    "Portugal's southern coast of golden cliffs, sea caves and long beaches. Lagos and Tavira make good bases; summer is busy, spring and autumn are calmer.",
    [["sun", "Stay back from cliff edges; erosion causes rockfalls."], ["info", "Visit Benagil cave by boat or kayak with a licensed operator."], ["route", "The Seven Hanging Valleys trail has the best cliff views."]],
    [["Benagil sea cave", "Boat or kayak · 1–2 hours"], ["Seven Hanging Valleys trail", "About 3 hours"], ["Ponta da Piedade", "Sunset"]]],
  ["oaxaca", "45", "Oaxaca", "Mexico", "mexico", "SOUTHERN MEXICO", "Oaxaca de Juárez · UNESCO World Heritage Site", "cMexico",
    [["FROM MEXICO CITY", "≈1 h flight"], ["GET AROUND", "Walking, taxi"], ["KNOWN FOR", "Food, crafts"]],
    "A colonial city known for its moles, markets and craft villages. The Zapotec ruins of Monte Albán sit on a hill just outside town.",
    [["utensils", "Try mole and tlayudas at a market comedor."], ["sun", "The city is high (about 1,550 m); drink water and use sunscreen."], ["info", "Día de Muertos is a family occasion; be respectful in cemeteries."]],
    [["Monte Albán", "Half day"], ["Mercado 20 de Noviembre", "Lunch"], ["Hierve el Agua", "Day trip"]]],
  ["cdmx", "46", "Mexico City", "Mexico", "mexico", "CENTRAL MEXICO", "Mexico City · capital", "cdmx",
    [["GET AROUND", "Metro, Metrobús"], ["ALTITUDE", "≈2,240 m"], ["KNOWN FOR", "Food, museums"]],
    "A vast capital of murals, museums and street food. The historic centre, Roma, Condesa and Coyoacán each have their own character.",
    [["info", "Take day one slowly; the altitude can tire you."], ["bus", "The Metro has women-and-children-only carriages at the front."], ["clock", "Many museums are closed on Mondays."]],
    [["National Museum of Anthropology", "2–3 hours"], ["Frida Kahlo Museum, Coyoacán", "Book ahead"], ["Teotihuacan", "Day trip"]]],
  ["yucatan", "47", "Yucatán", "Mexico", "mexico", "YUCATÁN PENINSULA · MEXICO", "Mérida, Yucatán", "yucatan",
    [["FROM MEXICO CITY", "≈2 h flight"], ["GET AROUND", "Car, intercity bus"], ["KNOWN FOR", "Maya ruins, cenotes"]],
    "Flat limestone country dotted with cenotes, Maya cities and colourful colonial towns. Mérida is a relaxed base for Chichén Itzá and Uxmal.",
    [["sun", "Visit ruins at opening time to avoid heat and crowds."], ["info", "Shower before a cenote swim and skip sunscreen; it harms the water."], ["route", "Bring insect repellent for the evenings."]],
    [["Chichén Itzá", "Day trip · go early"], ["Cenote swim", "About 2 hours"], ["Uxmal", "Day trip"]]],
  ["istanbul", "48", "Istanbul", "Türkiye", "turkiye", "MARMARA · TÜRKIYE", "Istanbul · on two continents", "cTurkiye",
    [["GET AROUND", "Tram, metro, ferry"], ["YOU'LL HEAR", "Turkish"], ["KNOWN FOR", "History, food"]],
    "Byzantine and Ottoman monuments, bazaars and ferries between Europe and Asia. Sultanahmet holds the big sights; Kadıköy and Karaköy show everyday life.",
    [["shirt", "At mosques, women cover their hair; scarves are often lent at the door."], ["clock", "Mosques close to visitors during prayer times."], ["bus", "One rechargeable card works on trams, metro and ferries."]],
    [["Hagia Sophia", "Outside prayer times"], ["Grand Bazaar", "About 2 hours · closed Sundays"], ["Bosphorus ferry", "About 1.5 hours"]]],
  ["cappadocia", "49", "Cappadocia", "Türkiye", "turkiye", "CENTRAL ANATOLIA · TÜRKIYE", "Göreme, Nevşehir", "cappadocia",
    [["FROM ISTANBUL", "≈1.5 h flight"], ["BEST FOR", "Hiking, balloons"], ["GET AROUND", "Tours, rental car"]],
    "Fairy chimneys, cave churches and valleys made for walking. Sunrise balloon flights depend on the weather and are often cancelled at short notice.",
    [["sun", "Balloon flights are weather-dependent; keep a spare morning."], ["route", "Valley trails are unmarked in places; download a map."], ["info", "Photography may be restricted in rock-cut churches; follow the signs."]],
    [["Göreme Open-Air Museum", "About 2 hours"], ["Sunrise balloon flight", "Weather permitting"], ["Rose Valley sunset walk", "About 2 hours"]]],
  ["antalya", "50", "Antalya", "Türkiye", "turkiye", "MEDITERRANEAN COAST · TÜRKIYE", "Antalya · Turquoise Coast", "antalya",
    [["FROM ISTANBUL", "≈1.5 h flight"], ["BEST TIME", "Roughly Apr – Oct"], ["KNOWN FOR", "Beaches, old town"]],
    "The walled old quarter of Kaleiçi, a Roman-era harbour and beaches backed by mountains. Ancient sites like Aspendos are a short drive away.",
    [["sun", "Summer heat is strong; visit ruins early."], ["utensils", "Try Antalya-style piyaz, a bean salad with tahini."], ["info", "Enter Kaleiçi through Hadrian's Gate."]],
    [["Kaleiçi old town", "About 2 hours"], ["Düden waterfalls", "About 1 hour"], ["Aspendos theatre", "Half day"]]],
];

async function buildDest(sec, col, d) {
  const [key, num, name, cLabel, cKey, eyebrow, loc, im, facts, intro, tipList, highlights] = d;
  const f = screen(key, num + " Destination – " + name, sec, col, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 380, im);
  const shr = circleBtn("Share", "share", 44, "surface", 0.92, "ink", 20); hero.appendChild(shr); shr.x = W - 20 - 44 - 52; shr.y = 58;
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 58;
  livePhotoInto(hero, IMG[im]);
  const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 140, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  await T(sh, eyebrow, "Eyebrow", "pandan500");
  await T(sh, name, "Mobile/Display XL", "ink", { fill: true });
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, loc, "Body/S", "muted");
  await factsRow(sh, facts);
  await T(sh, intro, "Body/M", "ink", { fill: true });
  await T(sh, "Good to know", "Heading/M", "ink");
  await tips(sh, tipList);
  await T(sh, "Highlights", "Heading/M", "ink");
  const list = ALw("VERTICAL", "Highlights", 353, 10); sh.appendChild(list);
  for (const [t, m, to] of highlights) await infoRow(list, "Highlight/" + t, t, m, "compass", to, to === "batu" ? "batu" : null);
  await crumb(sh, cLabel, cKey);
  const bar = actionBar("Action bar"); const saveB = BTN("Outline", "Save", false); bar.appendChild(saveB);
  const addB = BTN("Primary", "Add to trip", true); bar.appendChild(addB); try { addB.layoutSizingHorizontal = "FILL"; addB.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  finish(f, c, [statusAt("Dark"), bar]);
  back(bk); link(addB, "newTrip", "up");
  await caption(sec, f, num, "Destination · " + name, `Destination template (same as Penang/Melaka): Ken Burns hero, ${cLabel} breadcrumb, facts, tips, highlights. 'Add to trip' → new-trip sheet (17).`);
}
async function buildDestinations() {
  const bottom = Math.max(...Object.values(SEC).map((s) => s.y + s.height));
  const left = Math.min(...Object.values(SEC).filter((s) => s.name.startsWith("Flow")).map((s) => s.x));
  const sec = newSection("Flow 7 · Destinations", left, bottom + 240, DESTS5.length); SEC[sec.name] = sec;
  for (const [i, d] of DESTS5.entries()) await run("Destination " + d[2], () => buildDest(sec, i, d));
  fitSection(sec);
  // link every destination card on the country guides
  let n = 0;
  for (const d of DESTS5) {
    const card = S[d[4]] && S[d[4]].findOne((x) => x.name === "Destination/" + d[2]);
    if (card && S[d[0]]) { link(card, d[0], "push"); n++; } else PROBLEMS.push("Card not found for " + d[2]);
  }
  CHANGES.push(`New section Flow 7 · Destinations: 32–50 (${DESTS5.length} destination pages); ${n} destination cards on 26–31 now open them`);
}

// ---------- Flow 2 additions: tabs, experiences, festivals, notifications, location, Explore filters ----------
async function buildExpTab(sec, key, num, place, cKey, segKeys, rows, hint) {
  const f = screen(key, num + " Destination – " + place + " · Experiences", sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c);
  await titleBlock(c, place, hint);
  const segs = await seg(c, ["Overview", "Experiences", "Etiquette"], 1);
  const list = ALw("VERTICAL", "Experiences", 353, 10); c.appendChild(list);
  for (const [t, m, to, thumb, icon] of rows) await infoRow(list, "Experience row/" + t, t, m, icon || "compass", to, thumb);
  const note = AL("HORIZONTAL", "Note", 12); add(c, note, true); pad(note, 16); radius(note, 20); paintTo(note, "kaya100"); note.counterAxisAlignItems = "CENTER";
  I(note, "info", 20, "pandan900"); await T(note, "Times are approximate. Check opening hours before you go.", "Body/S", "ink", { fill: true });
  finish(f, c, [statusAt("Light"), tabAt("Home")]);
  back(bk); link(segs["Overview"], segKeys[0], "dissolve"); link(segs["Etiquette"], segKeys[1], "push");
  await caption(sec, f, num, place + " · Experiences", "Experiences tab of the destination page. Rows with a photo and chevron open a page; the others are information only.");
}
async function buildExperience(sec, key, num, o) {
  const f = screen(key, num + " Experience – " + o.name, sec, nextCol(sec), "surface");
  const c = column(f); c.itemSpacing = -28;
  const { hero, bk } = await heroImage(f, c, "Hero photo", 340, o.img);
  const sv = SAVE(false); hero.appendChild(sv); sv.x = W - 20 - 44; sv.y = 58;
  livePhotoInto(hero, IMG[o.img]);
  const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 140, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  await T(sh, o.eyebrow, "Eyebrow", "pandan500");
  await T(sh, o.title, "Mobile/Display M", "ink", { fill: true });
  await factsRow(sh, o.facts);
  await T(sh, o.intro, "Body/M", "ink", { fill: true });
  await T(sh, o.stepsTitle, "Heading/M", "ink"); await numbered(sh, o.steps);
  const g = AL("VERTICAL", "Be a good guest", 10); add(sh, g, true); pad(g, 18); radius(g, 20); paintTo(g, "kaya100");
  await T(g, "Be a good guest", "Heading/S", "ink");
  for (const [ic, t] of o.tips) { const r = AL("HORIZONTAL", "Tip", 10); add(g, r, true); I(r, ic, 18, "pandan700"); await T(r, t, "Body/S", "ink", { fill: true }); }
  const bar = actionBar("Action bar"); bar.appendChild(BTN("Outline", "Save", false));
  const addB = BTN("Primary", "Add to trip", true); bar.appendChild(addB); try { addB.layoutSizingHorizontal = "FILL"; addB.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  finish(f, c, [statusAt("Dark"), bar]);
  back(bk); link(addB, "newTrip", "up");
  await caption(sec, f, num, "Experience · " + o.name, "Experience template (like 07): Ken Burns hero, facts, numbered steps, 'Be a good guest'. 'Add to trip' → 17.");
}
async function buildFestivals(sec) {
  const f = screen("festivals", "55 Culture guide – Festivals", sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c);
  await titleBlock(c, "Culture guide", "Festivals you may see in Malaysia, and how to join in respectfully. Dates follow different calendars, so check each year.");
  const segs = await seg(c, ["Phrases", "Etiquette", "Festivals"], 2);
  const fests = [
    ["Hari Raya Aidilfitri", "Date varies · Islamic calendar", "Marks the end of Ramadan. Many families hold open houses where guests are welcome.", "sun"],
    ["Chinese New Year", "January or February", "Red packets (ang pow) go to children. Avoid giving clocks as gifts.", "calendar"],
    ["Deepavali", "October or November", "The festival of lights: oil lamps and colourful kolam patterns at the door.", "sun"],
    ["Thaipusam", "January or February", "Devotees walk to Batu Caves carrying kavadi. Watch quietly and give way.", "users"],
    ["Christmas", "25 December", "Malls decorate early, and many churches welcome visitors to services.", "calendar"],
    ["Kaamatan and Gawai", "Sabah in May · Sarawak on 1 June", "Harvest festivals with music, dance and traditional food.", "users"],
  ];
  for (const [t, d, s, ic] of fests) {
    const k = AL("HORIZONTAL", "Festival/" + t, 14); add(c, k, true); k.counterAxisAlignItems = "MIN"; pad(k, 16); radius(k, 20); paintTo(k, "surface");
    k.appendChild(circleBtn("Icon", ic, 40, "kaya100", 1, "pandan900", 20));
    const col = AL("VERTICAL", "Text", 4); add(k, col, true); await T(col, t, "Heading/S", "ink", { fill: true }); await T(col, d, "Mono/S", "pandan500"); await T(col, s, "Body/S", "muted", { fill: true });
  }
  const oh = AL("HORIZONTAL", "Open house tip", 12); add(c, oh, true); pad(oh, 16); radius(oh, 20); paintTo(oh, "pandan900"); oh.counterAxisAlignItems = "CENTER";
  oh.appendChild(circleBtn("Icon", "home", 40, "kaya400", 1, "pandan900", 20));
  await T(oh, "Invited to an open house? Take your shoes off at the door, accept a little food and drink, and use your right hand.", "Body/S", "onDark", { fill: true });
  finish(f, c, [statusAt("Light"), tabAt("Home")]);
  back(bk); link(segs["Phrases"], "phrases", "dissolve"); link(segs["Etiquette"], "etiquette", "dissolve");
  await caption(sec, f, "55", "Culture guide · Festivals", "Festivals tab (was empty). Phrases → 08, Etiquette → 15.");
}
async function buildNotifications(sec) {
  const f = screen("notifs", "61 Home – Notifications", sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 14;
  const bk = topBack(c); await titleBlock(c, "Notifications", null);
  await T(c, "THIS WEEK", "Eyebrow", "muted");
  const list = ALw("VERTICAL", "List", 353, 10); c.appendChild(list);
  const items = [["calendar", "Weekend in Penang starts in 10 days", "Sat 17 Oct · 4 stops planned", "trips"], ["download", "Your Penang offline pack is ready", "24 MB · works without data", "offline"], ["globe", "New country guide: Türkiye", "Istanbul, Cappadocia, Antalya", "turkiye"], ["sun", "Festival coming up: Deepavali", "See how to join in respectfully", "festivals"]];
  for (const [ic, t, s, to] of items) await infoRow(list, "Notification/" + t, t, s, ic, to, null);
  for (const r of list.children) { const ch = r.findOne((n) => n.name === "icon/chevRight"); if (ch) ch.visible = true; }
  const em = AL("HORIZONTAL", "Settings hint", 12); add(c, em, true); pad(em, 16); radius(em, 20); paintTo(em, "surface"); em.counterAxisAlignItems = "CENTER";
  I(em, "bell", 20, "pandan500"); await T(em, "You only get trip, offline and culture updates. No marketing.", "Body/S", "muted", { fill: true });
  finish(f, c, [statusAt("Light"), tabAt("Home")]);
  back(bk);
  await caption(sec, f, "61", "Home · Notifications", "From the bell on Home. Each notification opens what it's about.");
}
async function buildLocation(sec) {
  const { f, sh, done } = await sheetScreen(sec, "location", "62 Home – Location (sheet)", "klAerial", "Your location");
  await T(sh, "Tourix uses this for 'Near you' ideas and offline packs.", "Body/S", "muted", { fill: true });
  const sf = AL("HORIZONTAL", "Search city", 10); add(sh, sf, true); sf.counterAxisAlignItems = "CENTER"; pad(sf, 14, 16); radius(sf, 14); paintTo(sf, "mist"); I(sf, "search", 18, "muted"); await T(sf, "Search a city", "Body/M", "muted", { fill: true });
  const cur = AL("HORIZONTAL", "Current location", 12); add(sh, cur, true); cur.counterAxisAlignItems = "CENTER"; pad(cur, 14, 16); radius(cur, 16); paintTo(cur, "kaya100"); cur.strokes = [solid("pandan900")]; cur.strokeWeight = 2; cur.strokeAlign = "INSIDE";
  cur.appendChild(circleBtn("Icon", "pin", 36, "pandan900", 1, "kaya400", 18));
  const cc = AL("VERTICAL", "Text", 2); add(cur, cc, true); await T(cc, "Use my current location", "Label/M", "ink"); await T(cc, "Near Kuala Lumpur", "Body/S", "muted");
  cur.appendChild(circleBtn("Selected", "check", 24, "pandan900", 1, "kaya400", 14));
  await T(sh, "RECENT", "Eyebrow", "muted");
  for (const [t, s] of [["Penang", "Malaysia"], ["Melaka", "Malaysia"], ["Kyoto", "Japan"]]) { const r = AL("HORIZONTAL", "Recent/" + t, 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 6, 4); I(r, "clock", 18, "muted"); const col = AL("VERTICAL", "Text", 0); add(r, col, true); await T(col, t, "Label/M", "ink"); await T(col, s, "Body/S", "muted"); }
  const doneB = fullBtn(sh, "Primary", "Done"); back(doneB);
  done();
  await caption(sec, f, "62", "Home · Location (sheet)", "From the location chip on Home. Current location is selected; Done or X closes.");
}
async function buildFilters(sec) {
  const conf = [
    ["places", "63", "Places", [["Penang", "Destination · Malaysia", "dest", "heroPenang"], ["Melaka", "Destination · Malaysia", "melaka", "melaka"], ["Kuala Lumpur", "Destination · Malaysia", "kl", "kl"], ["Kyoto", "Destination · Japan", "kyoto", "cJapan"], ["Lisbon", "Destination · Portugal", "lisbon", "cPortugal"]]],
    ["experiences", "64", "Experiences", [["George Town heritage walk", "Experience · about 3 hours", "exp", "penangUmbrella"], ["Hawker breakfast", "Food · about 1.5 hours", "hawker", "food"], ["Batu Caves", "Cultural heritage · about 2 hours", "batu", "batu"], ["Jonker Street night market", "Food · Fri–Sun evenings", null, null]]],
    ["food", "65", "Food", [["Hawker breakfast in George Town", "Food · about 1.5 hours", "hawker", "food"], ["Nyonya cooking in Melaka", "Food · lunch", "melaka", "melaka"], ["Jalan Alor food street", "Kuala Lumpur · evenings", "kl", "kl"], ["Mole in Oaxaca", "Mexico · markets", "oaxaca", "cMexico"]]],
    ["phrasesF", "66", "Phrases", [["Phrases for hawker stalls", "Malay · 5 phrases with audio", "phrases", null], ["Japanese basics", "Japan · 3 phrases", "japan", null], ["Moroccan Arabic basics", "Morocco · 3 phrases", "morocco", null], ["Portuguese basics", "Portugal · 3 phrases", "portugal", null]]],
  ];
  for (const [key, num, label, rows] of conf) {
    const f = cloneScreen("search", key, num + " Explore – " + label, sec);
    const c = f.findOne((n) => n.name === "Content" && n.parent === f);
    const q = f.findOne((n) => n.type === "TEXT" && n.characters === "Penang" && n.parent && n.parent.name === "Search field (focused)");
    if (q) { await setChars(q, "Browse by type"); paintTo(q, "muted"); }
    const cv = c.findOne((n) => n.name === "Country chips" && n.parent === c);
    const idx = cv ? c.children.indexOf(cv) : 4;
    for (const n of c.children.slice(idx + 1)) n.remove();
    await T(c, label.toUpperCase(), "Eyebrow", "muted");
    const list = ALw("VERTICAL", "Results", 353, 10); c.appendChild(list);
    for (const [t, s, to, thumb] of rows) await infoRow(list, "Result/" + t, t, s, label === "Phrases" ? "languages" : "compass", to, thumb);
    for (const ch of f.findAll((n) => n.type === "INSTANCE" && /^Chip\//.test(n.name) && n.parent && n.parent.name === "Filters")) { try { ch.swapComponent(variant(C.chip, ch.name === "Chip/" + label ? "State=Active" : "State=Default")); } catch (e) { } }
    fit(f);
    await caption(sec, f, num, "Explore · " + label, "Filter chip state of Explore (results change by type). Chips switch between 05 and 63–66.");
  }
  // chip links on all five Explore screens
  for (const k of ["search", "places", "experiences", "food", "phrasesF"]) {
    for (const [label, to] of [["All", "search"], ["Places", "places"], ["Experiences", "experiences"], ["Food", "food"], ["Phrases", "phrasesF"]]) {
      const ch = S[k] && S[k].findOne((n) => n.name === "Chip/" + label && n.parent && n.parent.name === "Filters"); if (ch && to !== k) link(ch, to, "dissolve");
    }
  }
  CHANGES.push("Explore: filter chips now switch between 05 and 63 Places · 64 Experiences · 65 Food · 66 Phrases");
}

// ---------- Flow 3 additions: saved, trips, sheets, Me sub-pages ----------
async function buildSaved(sec) {
  const f = screen("saved", "56 Me – Saved", sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c); await titleBlock(c, "Saved", "4 places and experiences. Tap the heart to remove one.");
  const chips = AL("HORIZONTAL", "Filters", 8); c.appendChild(chips); chips.appendChild(CHIP("All", true)); chips.appendChild(CHIP("Places", false)); chips.appendChild(CHIP("Experiences", false));
  const grid = AL("HORIZONTAL", "Grid", 12); add(c, grid, true); grid.layoutWrap = "WRAP"; grid.counterAxisSpacing = 12;
  const items = [["Penang", "Malaysia · destination", "heroPenang", "dest"], ["Kyoto", "Japan · destination", "cJapan", "kyoto"], ["George Town heritage walk", "Experience · 3 h", "penangUmbrella", "exp"], ["Batu Caves", "Experience · 2 h", "batu", "batu"]];
  for (const [t, s, im, to] of items) {
    const k = figma.createFrame(); k.name = "Saved/" + t; k.resize(170, 220); radius(k, 22); k.clipsContent = true; k.fills = [img(im)]; grid.appendChild(k);
    const sh = rect(k, "Shade", 170, 220, null); sh.fills = [vgrad("pandan900", 0.0, 0.92, 0.35, 1)];
    const tt = await T(k, t, "Heading/S", "onDark", { w: 146, name: "Title" }); tt.x = 12; tt.y = 220 - 52 - tt.height;
    const ss = await T(k, s, "Body/S", "onDarkMuted", { w: 146 }); ss.x = 12; ss.y = 220 - 40;
    const hv = SAVE(true); k.appendChild(hv); hv.x = 170 - 52; hv.y = 8;
    k.effects = SHADOW1; link(k, to, "push");
  }
  finish(f, c, [statusAt("Light"), tabAt("Me")]);
  back(bk);
  await caption(sec, f, "56", "Me · Saved", "Where saved hearts go (was missing). From the profile card on Me. Cards open their pages.");
}
async function buildMelakaTrip(sec) {
  const f = screen("melakaTrip", "57 Trips – Melaka day trip", sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 16;
  const bk = topBack(c);
  const card = ALw("VERTICAL", "Trip card", 353, 10); c.appendChild(card); pad(card, 20); radius(card, 24); paintTo(card, "pandan900"); card.clipsContent = true;
  await T(card, "UPCOMING · JUST YOU", "Eyebrow", "kaya400"); await T(card, "Melaka day trip", "Display/S", "onDark");
  const d = AL("HORIZONTAL", "Dates", 8); card.appendChild(d); d.counterAxisAlignItems = "CENTER"; I(d, "calendar", 16, "onDarkMuted"); await T(d, "Sat 24 Oct 2026", "Body/S", "onDarkMuted");
  const inv = pill("Invite", "kaya400", 1, 8, 14, 6); card.appendChild(inv); I(inv, "users", 14, "pandan900"); await T(inv, "Invite a friend", "Label/S", "pandan900"); link(inv, "invite", "up");
  await T(c, "DAY PLAN", "Eyebrow", "muted");
  const stop = AL("HORIZONTAL", "Stop/Melaka old town", 12); add(c, stop, true); await T(stop, "09:00", "Mono/S", "muted", { w: 44 });
  const k = AL("VERTICAL", "Card", 4); add(stop, k, true); pad(k, 14); radius(k, 16); paintTo(k, "surface"); k.strokes = [solid("kaya500")]; k.strokeWeight = 2; k.strokeAlign = "INSIDE";
  await T(k, "Melaka old town", "Heading/S", "ink", { fill: true }); await T(k, "Stadthuys, Christ Church and Jonker Street on foot", "Body/S", "muted", { fill: true });
  await T(c, "IDEAS FOR THIS DAY", "Eyebrow", "muted");
  const ideas = ALw("VERTICAL", "Ideas", 353, 10); c.appendChild(ideas);
  for (const [t, s] of [["Baba & Nyonya Heritage Museum", "Peranakan house · about 1 hour · check opening hours"], ["Melaka River cruise", "About 45 min · nice after dark"], ["Jonker Street night market", "Saturday evening · busy after 8 pm"]]) {
    const r = AL("HORIZONTAL", "Idea/" + t, 12); add(ideas, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 12, 14); radius(r, 16); paintTo(r, "surface");
    const col = AL("VERTICAL", "Text", 2); add(r, col, true); await T(col, t, "Label/M", "ink", { fill: true }); await T(col, s, "Body/S", "muted", { fill: true });
    r.appendChild(circleBtn("Add", "plus", 36, "pandan100", 1, "pandan900", 18));
  }
  const br = AL("HORIZONTAL", "Buttons", 12); add(c, br, true);
  const a1 = BTN("Outline", "Add a stop", false); br.appendChild(a1); try { a1.layoutSizingHorizontal = "FILL"; a1.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  const a2 = BTN("Dark", "Share plan", false); br.appendChild(a2); try { a2.layoutSizingHorizontal = "FILL"; a2.primaryAxisAlignItems = "CENTER"; } catch (e) { }
  finish(f, c, [statusAt("Light"), tabAt("Trips")]);
  back(bk); link(a1, "search", "dissolve"); link(a2, "share", "up");
  await caption(sec, f, "57", "Trips · Melaka day trip", "Day plan for the trip created in 17/18 (was a dead end): 1 stop plus ideas, invite and share.");
}
async function buildShare(sec) {
  const { f, sh, done } = await sheetScreen(sec, "share", "58 Trips – Share plan (sheet)", "heroPenang", "Share your plan");
  await T(sh, "Weekend in Penang · Sat 17 – Sun 18 Oct", "Body/S", "muted", { fill: true });
  const rows = [["users", "Invite to plan together", "They can add and move stops", "invite"], ["share", "Copy view-only link", "Anyone with the link can see the plan", null], ["calendar", "Add to calendar", "One event per stop", null], ["download", "Save as PDF", "Works offline, good for printing", null]];
  const list = ALw("VERTICAL", "Options", 353, 8); sh.appendChild(list);
  for (const [ic, t, s, to] of rows) await infoRow(list, "Option/" + t, t, s, ic, to, null);
  for (const r of list.children) { const ch = r.findOne((n) => n.name === "icon/chevRight"); if (ch) ch.visible = true; }
  done();
  await caption(sec, f, "58", "Trips · Share plan (sheet)", "From 'Share plan' on 09, 10 and 57. Invite opens 60; other options are simulated.");
}
async function buildInvite(sec) {
  const { f, sh, done } = await sheetScreen(sec, "invite", "60 Trips – Invite a friend (sheet)", "melaka", "Invite a friend");
  await T(sh, "Plan together: friends you invite can add stops, and changes sync to everyone.", "Body/S", "muted", { fill: true });
  const lk = AL("HORIZONTAL", "Invite link", 10); add(sh, lk, true); lk.counterAxisAlignItems = "CENTER"; pad(lk, 14, 16); radius(lk, 14); paintTo(lk, "mist"); I(lk, "share", 18, "muted"); await T(lk, "Invite link (sample)", "Mono/S", "ink", { fill: true });
  const perm = AL("HORIZONTAL", "Permission", 12); add(sh, perm, true); perm.counterAxisAlignItems = "CENTER"; const pc = AL("VERTICAL", "Text", 2); add(perm, pc, true);
  await T(pc, "Can edit the plan", "Label/M", "ink"); await T(pc, "Turn off to share view-only", "Body/S", "muted"); perm.appendChild(TOGGLE(true));
  const b1 = fullBtn(sh, "Primary", "Copy invite link"); const b2 = fullBtn(sh, "Outline", "Share via…");
  back(b1);
  done();
  await caption(sec, f, "60", "Trips · Invite a friend (sheet)", "Community & connection: from Invite (+) on 17, the toast on 18, 57 and the share sheet (58).");
}
async function buildUndo(sec) {
  const f = cloneScreen("tripsAdded", "removed", "59 Trips – Removed (undo)", sec);
  await f.setReactionsAsync([]);
  const st = f.findOne((n) => n.name === "Stop/George Town heritage walk"); if (st) st.remove();
  for (const t of f.findAll((n) => n.type === "TEXT")) {
    if (t.characters === "George Town · 4 stops · 3.2 km") await setChars(t, "George Town · 3 stops");
    else if (t.characters === "Added to Day 1") await setChars(t, "Removed from Day 1");
    else if (t.characters === "Undo" && t.parent && t.parent.name === "Toast") { await setChars(t, "Redo"); link(t, "tripsAdded", "smart"); }
  }
  fit(f);
  await caption(sec, f, "59", "Trips · Removed (undo)", "After 'Undo' on the 09 toast: the heritage walk is removed; 'Redo' puts it back (09).");
}
async function buildMePage(sec, key, num, title, sub, build, note) {
  const f = screen(key, num + " Me – " + title, sec, nextCol(sec), "mist");
  const c = column(f); pad(c, 62, 20, 120, 20); c.itemSpacing = 14;
  const bk = topBack(c); await titleBlock(c, title, sub);
  await build(c);
  finish(f, c, [statusAt("Light"), tabAt("Me")]); back(bk);
  await caption(sec, f, num, "Me · " + title, note);
}
async function group(c, title, rows) {
  await T(c, title, "Eyebrow", "muted");
  const g = AL("VERTICAL", "Group/" + title, 0); add(c, g, true); radius(g, 20); paintTo(g, "surface"); g.clipsContent = true;
  for (const [i, [label, sub, trailing]] of rows.entries()) {
    const r = AL("HORIZONTAL", "Row/" + label, 12); add(g, r, true); r.counterAxisAlignItems = "CENTER"; pad(r, 14, 16);
    const col = AL("VERTICAL", "Text", 2); add(r, col, true); await T(col, label, "Label/M", "ink"); if (sub) await T(col, sub, "Body/S", "muted", { fill: true });
    if (trailing === "on" || trailing === "off") {
      const rd = AL("HORIZONTAL", "Radio"); rd.resize(24, 24); rd.primaryAxisSizingMode = "FIXED"; rd.counterAxisSizingMode = "FIXED"; rd.primaryAxisAlignItems = "CENTER"; rd.counterAxisAlignItems = "CENTER"; radius(rd, 12); r.appendChild(rd);
      if (trailing === "on") { paintTo(rd, "pandan900"); I(rd, "check", 14, "kaya400", 3); } else { rd.fills = []; rd.strokes = [solid("lineStrong")]; rd.strokeWeight = 2; rd.strokeAlign = "INSIDE"; }
    } else if (trailing === true || trailing === false) r.appendChild(TOGGLE(trailing));
    else if (trailing) await T(r, trailing, "Body/S", "muted");
    if (i < rows.length - 1) { const d = rect(null, "Divider", 10, 1, "line"); add(g, d, true); }
  }
}

// ---------- Flow 4 additions: AR modes and kopitiam ----------
async function arMode(sec, key, num, mode, hint, detected, labels) {
  const f = cloneScreen("lens", key, num + " AR Lens – " + mode, sec);
  for (const n of f.findAll((x) => /^AR label · /.test(x.name))) n.visible = false;
  for (const t of f.findAll((n) => n.type === "TEXT")) {
    if (t.characters === "Shophouse detected") await setChars(t, detected);
    else if (t.characters.startsWith("Point at a shophouse")) await setChars(t, hint);
  }
  for (const m of ["History", "Phrases", "Food nearby"]) {
    const p = f.findOne((n) => n.name === "Mode/" + m); if (!p) continue; const on = m === mode.replace(" mode", "");
    if (on) paintTo(p, "kaya400"); else p.fills = []; const t = p.findOne((n) => n.type === "TEXT"); if (t) paintTo(t, on ? "pandan900" : "onDark");
  }
  for (const [nm, t, s, x, y, ax, ay, sk] of labels) await arLabel(f, "AR label · " + nm, t, s, x, y, ax, ay, sk);
  await caption(sec, f, num, "AR Lens · " + mode, "AR mode switch (was not interactive). Modes switch between 12, 70 and 71. Content is a concept mock-up; distances are samples.");
  return f;
}
async function buildKopitiam(sec) {
  const f = cloneScreen("lensInfo", "kopitiam", "72 AR Lens – Kopitiam", sec);
  const sw = [["ARCHITECTURE · GEORGE TOWN", "FOOD & CULTURE · GEORGE TOWN"], ["The five-foot way", "The kopitiam"], ["In Malay: kaki lima", "From Hokkien: kopi (coffee) + tiam (shop)"]];
  for (const t of f.findAll((n) => n.type === "TEXT" && !insideInstance(n))) {
    for (const [a, b] of sw) if (t.characters === a) await setChars(t, b);
    if (t.characters.startsWith("The covered walkway")) await setChars(t, "A traditional coffee shop, often in an old shophouse. Order drinks from the drinks seller and food from the stalls inside. Try kopi-o (black coffee with sugar) or teh tarik (pulled milk tea).");
  }
  const l1 = f.findOne((n) => n.name === "AR label · Five-foot way"), l3 = f.findOne((n) => n.name === "AR label · Kopitiam");
  if (l1) l1.opacity = 0.35; if (l3) l3.opacity = 1;
  await caption(sec, f, "72", "AR Lens · Kopitiam", "Sheet for the 'Kopitiam nearby' label on 12 (was not interactive). Close or scrim returns to 12.");
}

// ---------- Flow 5 additions: offline, Bahasa Melayu ----------
async function buildOffline(sec) {
  const f = cloneScreen("home", "homeOffline", "73 Home – Offline", sec);
  const body = f.findOne((n) => n.name === "Body" && n.parent && n.parent.name === "Content");
  const b = AL("HORIZONTAL", "Offline banner", 12); body.insertChild(0, b); b.layoutSizingHorizontal = "FILL"; b.paddingRight = 20;
  const inner = AL("HORIZONTAL", "Banner", 12); add(b, inner, true); inner.counterAxisAlignItems = "CENTER"; pad(inner, 14, 16); radius(inner, 18); paintTo(inner, "kaya100"); inner.strokes = [solid("kaya500")]; inner.strokeWeight = 1; inner.strokeAlign = "INSIDE";
  inner.appendChild(circleBtn("Icon", "download", 36, "pandan900", 1, "kaya400", 18));
  const col = AL("VERTICAL", "Text", 2); add(inner, col, true); await T(col, "You're offline", "Label/M", "ink"); await T(col, "Your Penang pack, saved places and phrases still work.", "Body/S", "ink", { fill: true });
  const go = await T(col, "Open offline packs →", "Label/S", "pandan700", { name: "Open offline packs" }); link(go, "offline", "push");
  fit(f);
  try { MOB.flowStartingPoints = MOB.flowStartingPoints.concat([{ nodeId: f.id, name: "8 · Offline & Bahasa Melayu" }]); } catch (e) { PROBLEMS.push("Flow start 8: " + e.message); }
  await caption(sec, f, "73", "Home · Offline", "Error/offline state: what happened + what still works + one action (content guidelines). Flow start 8.");
}
async function buildBM(sec) {
  const f = cloneScreen("home", "homeBM", "74 Home – Bahasa Melayu", sec);
  const MAP = { "GOOD MORNING": "SELAMAT PAGI", "Where to next?": "Ke mana seterusnya?", "Near Kuala Lumpur": "Berhampiran Kuala Lumpur", "Search countries, places, food": "Cari negara, tempat, makanan",
    "TOP PICKS FOR YOU · SWIPE": "PILIHAN UTAMA UNTUK ANDA · LERET", "Explore by mood": "Teroka ikut suasana", "See all": "Lihat semua", "PHRASE OF THE DAY · MALAY": "FRASA HARI INI · BAHASA MELAYU",
    "Open culture guide →": "Buka panduan budaya →", "Near you this weekend": "Berhampiran anda hujung minggu ini",
    "Nature & adventure": "Alam & pengembaraan", "Cultural heritage": "Warisan budaya", "Food & local cuisine": "Makanan tempatan", "Beaches & islands": "Pantai & pulau", "City exploration": "Jelajah bandar",
    "Home": "Utama", "Explore": "Teroka", "Lens": "Lensa", "Trips": "Trip", "Me": "Saya",
    "Heritage lanes and hawker food": "Lorong warisan dan makanan penjaja", "Temples and machiya lanes": "Kuil dan lorong machiya", "Trams, tiles and viewpoints": "Trem, jubin dan tempat peninjau",
    "Souks, riads and gardens": "Souk, riad dan taman", "Markets, mole and mezcal": "Pasar, mole dan mezcal", "Two continents, one skyline": "Dua benua, satu kaki langit",
    "JAPAN": "JEPUN", "MOROCCO": "MAGHRIBI", "Climb the 272 steps at Batu Caves": "Daki 272 anak tangga di Batu Caves" };
  let n = 0;
  for (const t of f.findAll((x) => x.type === "TEXT")) {
    const v = MAP[t.characters]; if (v) { try { await setChars(t, v); n++; } catch (e) { } }
    else if (t.characters.startsWith("“Excuse me, may I pass?”")) { await setChars(t, "“Tumpang lalu”: cara sopan meminta laluan di pasar yang sesak dan di kaki lima."); n++; }
  }
  fit(f);
  const lc = S.langSettings && S.langSettings.findOne((x) => x.name === "Content" && x.parent === S.langSettings);
  if (lc) { const pv = AL("HORIZONTAL", "Preview BM", 10); add(lc, pv, true); pv.counterAxisAlignItems = "CENTER"; pad(pv, 14, 16); radius(pv, 18); paintTo(pv, "surface"); pv.strokes = [solid("lineStrong")]; pv.strokeWeight = 1; pv.strokeAlign = "INSIDE";
    I(pv, "languages", 20, "pandan900"); await T(pv, "Preview Tourix in Bahasa Melayu", "Label/M", "ink", { fill: true }); I(pv, "chevRight", 18, "muted"); link(pv, "homeBM", "push"); fit(S.langSettings); }
  await caption(sec, f, "74", "Home · Bahasa Melayu", `Home with the interface in Bahasa Melayu (${n} strings). From 19 → 'Preview Tourix in Bahasa Melayu'. Copy should be checked by a native speaker.`);
}

// ---------- links into the new screens ----------
function linkExisting() {
  for (const k of ["home", "homeOffline", "homeBM"]) {
    const n1 = inS(k, "Notifications"), n2 = inS(k, "Location"), n3 = inS(k, "Experience/Climb the 272 steps at Batu Caves");
    if (n1) link(n1, "notifs", "push"); if (n2) link(n2, "location", "up"); if (n3) link(n3, "batu", "push");
  }
  const L = (k, nm, to, tr = "push") => { const n = inS(k, nm); if (n) link(n, to, tr); else PROBLEMS.push(`Not found: ${nm} on ${k}`); };
  L("search", "Result/Hawker breakfast", "hawker");
  L("dest", "Seg/Experiences", "penangExp"); L("dest", "Experience/Hawker breakfast in George Town", "hawker");
  L("melaka", "Seg/Experiences", "melakaExp");
  for (const e of S.melaka.findAll((n) => n.type === "INSTANCE" && /^Experience\//.test(n.name))) link(e, "melakaExp", "push");
  L("phrases", "Seg/Festivals", "festivals", "dissolve"); L("etiquette", "Seg/Festivals", "festivals", "dissolve");
  for (const k of ["tripsAdded", "trips", "removed"]) { const b = inS(k, "Button/Share plan"); if (b) link(b, "share", "up"); }
  const undo = S.tripsAdded.findOne((n) => n.type === "TEXT" && n.characters === "Undo" && n.parent && n.parent.name === "Toast"); if (undo) link(undo, "removed", "smart");
  L("me", "Profile", "saved"); L("me", "Row/Units", "units"); L("me", "Row/Synced devices", "synced"); L("me", "Row/About this prototype", "about");
  L("lens", "AR label · Kopitiam", "kopitiam", "smart");
  for (const [k, pairs] of [["lens", [["Phrases", "arPhrases"], ["Food nearby", "arFood"]]], ["arPhrases", [["History", "lens"], ["Food nearby", "arFood"]]], ["arFood", [["History", "lens"], ["Phrases", "arPhrases"]]]]) for (const [m, to] of pairs) L(k, "Mode/" + m, to, "dissolve");
  L("newTrip", "Invite", "invite", "up");
  const mt = inS("allTrips", "Trip/Melaka day trip"); if (mt) { link(mt, "melakaTrip", "push"); const ch = mt.findOne((n) => n.name === "icon/chevRight"); if (ch) ch.visible = true; }
  const ti = S.allTrips.findOne((n) => n.type === "TEXT" && n.characters === "Invite"); if (ti) link(ti, "invite", "up");
}
async function meTexts() {
  for (const t of S.me.findAll((n) => n.type === "TEXT")) { if (t.characters === "Kuala Lumpur · 3 saved places") await setChars(t, "Kuala Lumpur · 4 saved places"); if (t.characters === "v0.1") await setChars(t, "v0.5"); }
}
function restack() {
  const secs = MOB.children.filter((n) => n.type === "SECTION" && n.name.startsWith("Flow")).sort((a, b) => a.y - b.y);
  let cur = secs.length ? secs[0].y : 0;
  for (const s of secs) { fitSection(s); if (s.y < cur) s.y = cur; cur = s.y + s.height + 200; }
}

// ---------- main ----------
async function main() {
  figma.notify("Tourix v5: building 43 screens… this can take 2–3 minutes.", { timeout: 10000 });
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync(); await loadComponents(ds);
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  if (fr("32 Destination – Kuala Lumpur")) { figma.closePlugin("Tourix v5 already applied."); return; }
  for (const sec of MOB.children.filter((n) => n.type === "SECTION")) SEC[sec.name] = sec;
  const names = { home: "04 Home", search: "05 Explore – Search", dest: "06 Destination – Penang", exp: "07 Experience – Heritage walk", phrases: "08 Culture guide – Phrases", tripsAdded: "09 Trips – Just added", trips: "10 Trips", me: "11 Me – Settings & accessibility", lens: "12 AR Heritage Lens", lensInfo: "13 AR Lens – Landmark info", melaka: "14 Destination – Melaka", etiquette: "15 Culture guide – Etiquette", newTrip: "17 Trips – New trip (sheet)", allTrips: "18 Trips – All trips", langSettings: "19 Me – Language", offline: "20 Me – Offline guide packs", country: "26 Country – Malaysia", japan: "27 Country – Japan", morocco: "28 Country – Morocco", portugal: "29 Country – Portugal", mexico: "30 Country – Mexico", turkiye: "31 Country – Türkiye" };
  for (const [k, nm] of Object.entries(names)) { const f = fr(nm); if (f) S[k] = f; else PROBLEMS.push("Missing screen " + nm); }
  const kit = Object.values(SEC).find((s) => s.name.startsWith("Mobile kit"));
  const kc = (nm) => kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === nm);
  KIT.status = kc("Status Bar (iOS)"); KIT.tab = kc("Tab Bar (iOS)"); KIT.toggle = kc("Toggle"); KIT.phrase = kc("Phrase Card"); KIT.live = kc("Live Photo"); KIT.section = kit;
  if (!S.home || !KIT.status || !KIT.tab) { figma.closePlugin("Home or the mobile kit wasn't found; nothing changed."); return; }
  try { const cols = await figma.variables.getLocalVariableCollectionsAsync(); for (const id of cols[0].variableIds) { const v = await figma.variables.getVariableByIdAsync(id); if (v && v.name === "color/line-strong") V.lineStrong = v; } } catch (e) { }
  HEX.lineStrong = "#7C8C84";
  try { await figma.saveVersionHistoryAsync("Before Tourix v5 (31 screens)", "Saved by the Tourix v5 plugin."); CHANGES.push("Version saved: 'Before Tourix v5 (31 screens)'"); } catch (e) { PROBLEMS.push("Version not saved: " + e.message); }
  for (const [k, id] of Object.entries(PHOTOS)) { try { IMG[k] = (await figma.createImageAsync(PX(id))).hash; } catch (e) { PROBLEMS.push("Photo " + k + ": " + e.message); IMG[k] = IMG.kl; } }

  const F2 = secOf("Flow 2"), F3 = secOf("Flow 3"), F4 = secOf("Flow 4"), F5 = secOf("Flow 5");
  await run("Destinations", buildDestinations);
  await run("51", () => buildExpTab(F2, "penangExp", "51", "Penang", "dest", ["dest", "etiquette"], [["George Town heritage walk", "Cultural heritage · about 3 hours", "exp", "penangUmbrella"], ["Hawker breakfast in George Town", "Food · about 1.5 hours", "hawker", "food"], ["Penang Hill funicular", "Nature · about 2 hours", null, null, "mountain"], ["Kek Lok Si Temple", "Cultural heritage · about 1.5 hours", null, null, "landmark"], ["Clan jetties at sunset", "Cultural heritage · evening", null, null, "sun"]], "Experiences in and around George Town."));
  await run("52", () => buildExpTab(F2, "melakaExp", "52", "Melaka", "melaka", ["melaka", "etiquette"], [["Plan a Melaka day trip", "Start a trip with Melaka old town", "newTrip", "melaka"], ["Jonker Street night market", "Food · Fri–Sun evenings", null, null, "utensils"], ["Baba & Nyonya Heritage Museum", "Cultural heritage · about 1 hour", null, null, "landmark"], ["Melaka River cruise", "City · about 45 min", null, null, "route"], ["St Paul's Hill and A Famosa", "History · about 1 hour", null, null, "landmark"]], "Experiences in Melaka's old town."));
  await run("53", () => buildExperience(F2, "hawker", "53", { name: "Hawker breakfast", img: "food", eyebrow: "FOOD & LOCAL CUISINE · PENANG", title: "Hawker breakfast in George Town",
    facts: [["DURATION", "About 1.5 hours"], ["BEST TIME", "7–10 am"], ["PAY", "Cash at most stalls"]],
    intro: "Penang is famous for hawker food. A morning at a hawker centre or kopitiam is the easiest way to try several dishes in one sitting.",
    stepsTitle: "How it works", steps: [["Find a table first", "Note its number; stalls ask for it."], ["Order from several stalls", "Try char kway teow, roti canai or nasi lemak."], ["Order drinks at the table", "A drinks seller usually comes round."], ["Pay each stall when the food arrives", null]],
    tips: [["users", "Share tables when it's busy. Ask “Boleh duduk sini?” (May I sit here?)."], ["info", "A tissue packet on a seat usually means it's taken."], ["hand", "Eat and pass food with your right hand."]] }));
  await run("54", () => buildExperience(F2, "batu", "54", { name: "Batu Caves", img: "batu", eyebrow: "CULTURAL HERITAGE · SELANGOR", title: "Climb the 272 steps at Batu Caves",
    facts: [["FROM KL", "≈30 min by KTM train"], ["DURATION", "About 2 hours"], ["BEST TIME", "Early morning"]],
    intro: "A Hindu temple complex in limestone caves just north of Kuala Lumpur, watched over by a 42.7 m statue of Lord Murugan.",
    stepsTitle: "Your visit", steps: [["Take the KTM Komuter to Batu Caves", "The station is next to the site."], ["Climb the 272 rainbow steps", "Go slowly; it's steep and gets hot."], ["Visit the Temple Cave", "Keep your voice low during prayers."], ["Rest at the foot of the statue", null]],
    tips: [["shirt", "Cover your knees; sarongs can be rented at the foot of the stairs."], ["info", "Keep food and bags closed; the monkeys grab them."], ["calendar", "Thaipusam (Jan or Feb) draws huge crowds; plan around it."]] }));
  await run("55", () => buildFestivals(F2));
  await run("61", () => buildNotifications(F2));
  await run("62", () => buildLocation(F2));
  await run("63–66", () => buildFilters(F2));
  await run("56", () => buildSaved(F3));
  await run("57", () => buildMelakaTrip(F3));
  await run("58", () => buildShare(F3));
  await run("59", () => buildUndo(F3));
  await run("60", () => buildInvite(F3));
  await run("67", () => buildMePage(F3, "synced", "67", "Synced devices", "Trips and saved places sync automatically.", async (c) => {
    await group(c, "THIS ACCOUNT", [["This iPhone", "iPhone 16 · active now", "on"], ["Laptop", "Windows · synced just now", "on"]]);
    await group(c, "OPTIONS", [["Sync over mobile data", "Off: sync on Wi-Fi only, to save data", false], ["Sync photos and notes", "Stored with your trips", true]]);
    await T(c, "To add a device, sign in with the same account on it.", "Body/S", "muted", { fill: true }); }, "From Synced devices on Me (was not interactive). Supports the cross-device sync concept."));
  await run("68", () => buildMePage(F3, "units", "68", "Units", "Used for distances, weather and times.", async (c) => {
    await group(c, "DISTANCE", [["Kilometres", null, "on"], ["Miles", null, "off"]]);
    await group(c, "TEMPERATURE", [["Celsius (°C)", null, "on"], ["Fahrenheit (°F)", null, "off"]]);
    await group(c, "TIME", [["24-hour (14:00)", null, "on"], ["12-hour (2:00 pm)", null, "off"]]); }, "From Units on Me (was not interactive). Selection shown with a filled radio and tick, not colour alone."));
  await run("69", () => buildMePage(F3, "about", "69", "About Tourix", "A student UX prototype for CT120-3-3 User Experience (APU, 2026). It isn't a real service: content is for testing and times are approximate.", async (c) => {
    await group(c, "THIS VERSION", [["Version", "Prototype", "0.5"], ["Screens", "Linked iOS screens", "74"]]);
    await group(c, "CREDITS", [["Photos", "Pexels (free licence)", null], ["Icons", "Lucide", null], ["Fonts", "Gloock, Figtree, DM Mono", null]]);
    const fb = AL("HORIZONTAL", "Feedback", 12); add(c, fb, true); pad(fb, 16); radius(fb, 20); paintTo(fb, "kaya100"); fb.counterAxisAlignItems = "CENTER";
    I(fb, "users", 20, "pandan900"); await T(fb, "Spotted something wrong in a culture guide? Tell us: local volunteers review every report.", "Body/S", "ink", { fill: true }); }, "From About on Me (was not interactive). Honest about being a prototype."));
  await run("70", () => arMode(F4, "arPhrases", "70", "Phrases", "Point at a sign to translate it and hear how to say it.", "3 words found",
    [["Kedai Kopi", "Kedai Kopi", "“KEH-dai KOH-pee” · coffee shop", 36, 300, 150, 420, -0.05], ["Lebuh Armenian", "Lebuh Armenian", "lebuh = street · tap to hear", 186, 440, 260, 360, 0.05], ["Tandas", "Tandas", "“TAHN-dahs” · toilet", 56, 560, 120, 650, -0.04]]));
  await run("71", () => arMode(F4, "arFood", "71", "Food nearby", "Food stalls near you, with dietary tags. Distances are samples.", "3 food stalls nearby",
    [["Nasi kandar", "Nasi kandar", "Halal · 120 m", 30, 300, 140, 420, -0.05], ["Cendol", "Cendol", "Dessert · 200 m", 210, 430, 270, 350, 0.05], ["Char kway teow", "Char kway teow", "Noodles · 350 m", 50, 560, 120, 650, -0.04]]));
  await run("72", () => buildKopitiam(F4));
  await run("73", () => buildOffline(F5));
  await run("74", () => buildBM(F5));
  await run("Links", async () => linkExisting());
  await run("Me texts", meTexts);
  await run("Restack", async () => restack());
  await run("Read me", async () => {
    const r = MOB.findOne((x) => x.type === "FRAME" && x.name.startsWith("Read me")); if (!r) return;
    const b = AL("VERTICAL", "Block/v5", 8); add(r, b, true); pad(b, 24); radius(b, 20); paintTo(b, "kaya100");
    await T(b, "v5 · every page designed (7 Oct 2026) · 74 screens, 8 flows", "Heading/M", "ink", { fill: true });
    for (const t of ["Flow 7 · Destinations: 32–50, one page for every destination card on the country guides.", "New in Flows 2–5: Penang/Melaka Experiences tabs (51–52), Hawker breakfast (53), Batu Caves (54), Festivals (55), Saved (56), Melaka trip (57), Share and Invite sheets (58, 60), Undo (59), Notifications (61), Location (62), Explore filters (63–66), Synced devices, Units, About (67–69), AR Phrases and Food modes (70–71), Kopitiam sheet (72), Offline (73), Bahasa Melayu (74).", "Remaining non-interactive controls are listed in prototype-interactions §4 of the docs."]) await T(b, "•  " + t, "Body/S", "ink", { fill: true });
  });
  const linked = await applyLinks();
  const v3 = MOB.findOne((n) => n.type === "FRAME" && n.name === "Build log · v3");
  if (v3) { await T(v3, "v5 (7 Oct 2026)", "Heading/S", "ink"); for (const c of CHANGES) await T(v3, "✓ " + c, "Body/S", "ink", { fill: true }); await T(v3, "Links applied: " + linked, "Mono/S", "muted"); for (const p of PROBLEMS) await T(v3, "• " + p, "Mono/S", "bunga", { fill: true }); }
  const made = MOB.findAll((n) => n.type === "FRAME" && /^(3[2-9]|[4-6]\d|7[0-4]) /.test(n.name) && n.parent && n.parent.type === "SECTION").length;
  figma.viewport.scrollAndZoomIntoView([S.home]);
  figma.closePlugin(`Tourix v5: ${made} new screens, ${linked} links.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s): ` + PROBLEMS.slice(0, 12).join(" | ") : " No issues."));
}
main().catch((e) => figma.closePlugin("v5 stopped: " + e.message));
