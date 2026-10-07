// ===================== TOURIX · WORLDWIDE SCOPE (approved 5 Oct 2026) =====================
// Countries-first Home (3D showcase of countries + "Choose a country" list), new 26 Country – Malaysia
// (holds the destinations carousel moved from Home), country-neutral product copy, Read me update.
// Refuses to run twice (stops if "26 Country – Malaysia" exists). Saves a named version first.
const CHANGES = [];
const SEC = {};
const COUNTRIES = [
  // [old showcase front, country, region eyebrow, coords, image key, list subtitle, built?]
  ["Kuala Lumpur", "Malaysia", "SOUTHEAST ASIA · KUALA LUMPUR", "3.14°N 101.69°E", null, "Penang, Melaka, Kuala Lumpur and more", true],
  ["Penang", "Japan", "EAST ASIA · KYOTO", "35.01°N 135.77°E", "cJapan", "Kyoto, Tokyo, Hokkaido", false],
  ["Langkawi", "Morocco", "NORTH AFRICA · MARRAKECH", "31.63°N 7.99°W", "cMorocco", "Marrakech, Fes, Chefchaouen", false],
  ["Melaka", "Portugal", "SOUTHERN EUROPE · LISBON", "38.72°N 9.14°W", "cPortugal", "Lisbon, Porto, the Algarve", false],
  ["Cameron Highlands", "Mexico", "NORTH AMERICA · OAXACA", "17.07°N 96.73°W", "cMexico", "Oaxaca, Mexico City, Yucatán", false],
  ["Sabah", "Türkiye", "WEST ASIA · ISTANBUL", "41.01°N 28.98°E", "cTurkiye", "Istanbul, Cappadocia, Antalya", false],
];
const PHOTOS = {
  cJapan: "https://images.pexels.com/photos/32660559/pexels-photo-32660559.jpeg?auto=compress&cs=tinysrgb&w=900",
  cMorocco: "https://images.pexels.com/photos/27549780/pexels-photo-27549780.jpeg?auto=compress&cs=tinysrgb&w=900",
  cPortugal: "https://images.pexels.com/photos/14850795/pexels-photo-14850795.jpeg?auto=compress&cs=tinysrgb&w=900",
  cMexico: "https://images.pexels.com/photos/18019709/pexels-photo-18019709.jpeg?auto=compress&cs=tinysrgb&w=900",
  cTurkiye: "https://images.pexels.com/photos/27634409/pexels-photo-27634409.jpeg?auto=compress&cs=tinysrgb&w=900",
};
const TEXT_SWAPS = [
  ["Malaysia, with local context.", "Anywhere, with local context."],
  ["Loading your Malaysia…", "Loading your picks…"],
  ["Malaysian place names stay in Malay.", "Place names stay in the local language."],
  ["Show my Malaysia", "Start exploring"],
  ["Discover: Home → search / Penang → experience → add to trip → Trips.", "Discover: Home → choose a country (Malaysia) → Penang → experience → add to trip → Trips."],
];

const screenOf = (n) => { let p = n; while (p && p.parent && p.parent.type !== "SECTION" && p.parent.type !== "PAGE") p = p.parent; return p; };
const insideInstance = (n) => { let p = n.parent; while (p && p.type !== "PAGE") { if (p.type === "INSTANCE") return true; p = p.parent; } return false; };
async function setChars(t, s) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); t.characters = s; }
function fitSection(sec) {
  let maxX = 0, maxY = 0;
  for (const ch of sec.children) { maxX = Math.max(maxX, ch.x + ch.width); maxY = Math.max(maxY, ch.y + ch.height); }
  sec.resizeWithoutConstraints(Math.max(sec.width, maxX + 60), Math.max(sec.height, maxY + 100));
}
async function run(label, fn) { try { await fn(); } catch (e) { PROBLEMS.push(label + ": " + (e && e.message ? e.message : String(e))); } }

async function locate() {
  MOB = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)");
  if (!MOB) throw new Error("Page 'Mobile Prototype (iOS)' not found");
  await MOB.loadAsync(); await figma.setCurrentPageAsync(MOB);
  if (MOB.findOne((n) => n.type === "FRAME" && n.name === "26 Country – Malaysia")) throw new Error("Worldwide scope already applied (26 Country – Malaysia exists).");
  for (const sec of MOB.children.filter((n) => n.type === "SECTION")) SEC[sec.name] = sec;
  const names = { splash: "01 Splash", interests: "03 Onboarding – Interests", home: "04 Home", dest: "06 Destination – Penang", phrases: "08 Culture guide – Phrases", melaka: "14 Destination – Melaka", etiquette: "15 Culture guide – Etiquette", homeLoading: "24 Home – Loading" };
  for (const [k, nm] of Object.entries(names)) { const f = MOB.findOne((n) => n.type === "FRAME" && n.name === nm && n.parent && n.parent.type === "SECTION"); if (f) S[k] = f; else PROBLEMS.push("Missing screen " + nm); }
  const kit = Object.values(SEC).find((s) => s.name.startsWith("Mobile kit"));
  const kc = (nm) => kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === nm);
  KIT.status = kc("Status Bar (iOS)"); KIT.tab = kc("Tab Bar (iOS)");
  if (!S.home || !KIT.status || !KIT.tab) throw new Error("Home or the mobile kit wasn't found; nothing changed.");
}

// ---------- 1 · 3D Showcase → countries ----------
async function showcaseCountries() {
  const set = C.showcase; if (!set) throw new Error("3D Showcase not found");
  let cards = 0, vars = 0;
  for (const v of set.children) {
    for (const [oldN, country, region, coords, imgKey] of COUNTRIES) {
      if (v.name.includes("Front=" + oldN + ",") || v.name === "Front=" + oldN) { v.name = v.name.replace("Front=" + oldN, "Front=" + country); vars++; }
      const card = v.findOne((n) => n.name === "Card/" + oldN);
      if (!card) continue;
      card.name = "Card/" + country;
      if (card.type === "INSTANCE") setProps(card, C.showcaseCard, { "Title": country, "Region": region, "Coords": coords });
      else PROBLEMS.push("Showcase card isn't an instance: " + v.name + " / " + oldN);
      if (imgKey) for (const n of card.findAll((x) => "fills" in x && Array.isArray(x.fills) && x.fills.some((p) => p.type === "IMAGE"))) n.fills = n.fills.map((p) => (p.type === "IMAGE" ? Object.assign({}, p, { imageHash: IMG[imgKey], scaleMode: "FILL" }) : p));
      cards++;
    }
  }
  set.description = (set.description || "").replace("Six destination cards", "Six country cards") + " Worldwide scope (5 Oct 2026): cards show countries (Malaysia, Japan, Morocco, Portugal, Mexico, Türkiye); coordinates are for the pictured city.";
  CHANGES.push(`3D Showcase: ${vars} variants renamed to countries, ${cards} cards updated (title, region, coordinates, photo)`);
}

// ---------- 2 · 26 Country – Malaysia ----------
async function buildCountry() {
  const sec = Object.values(SEC).find((s) => s.name.startsWith("Flow 2"));
  const frames = sec.children.filter((n) => n.type === "FRAME" && /^\d\d /.test(n.name));
  const col = Math.max(...frames.map((n) => Math.round((n.x - 60) / (W + GAP_X)))) + 1;
  const f = screen("country", "26 Country – Malaysia", sec, col, "surface");
  const c = column(f); c.itemSpacing = -28;
  const { bk } = await heroImage(f, c, "Hero photo", 300, "klAerial");
  const sh = ALw("VERTICAL", "Sheet", W, 18); c.appendChild(sh); sh.layoutSizingHorizontal = "FILL"; pad(sh, 26, 20, 8, 20); paintTo(sh, "surface"); sh.topLeftRadius = 28; sh.topRightRadius = 28;
  await T(sh, "SOUTHEAST ASIA · COUNTRY GUIDE", "Eyebrow", "pandan500");
  await T(sh, "Malaysia", "Mobile/Display XL", "ink");
  const lr = AL("HORIZONTAL", "Location", 6); sh.appendChild(lr); lr.counterAxisAlignItems = "CENTER"; I(lr, "pin", 15, "pandan500"); await T(lr, "Capital Kuala Lumpur · Peninsula and Borneo", "Body/S", "muted");
  const facts = AL("HORIZONTAL", "Facts", 8); add(sh, facts, true);
  for (const [l, v] of [["LANGUAGE", "Malay; English widely used"], ["CURRENCY", "Ringgit (MYR)"], ["DRIVING", "On the left"]]) {
    const fc = AL("VERTICAL", "Fact", 4); add(facts, fc, true); pad(fc, 12); radius(fc, 14); paintTo(fc, "mist");
    await T(fc, l, "Eyebrow", "muted", { fill: true, size: 10 }); await T(fc, v, "Label/S", "ink", { fill: true });
  }
  await T(sh, "Malay, Chinese, Indian and Indigenous cultures share one country across the Peninsula and Borneo. Start with a city break in Kuala Lumpur or Penang, then go further: rainforest, islands and highland tea.", "Body/M", "ink", { fill: true });
  await T(sh, "Good to know", "Heading/M", "ink");
  for (const [ic, t] of [["shirt", "Dress modestly at mosques and temples. Carry a light scarf."], ["hand", "Give and receive things with your right hand."], ["utensils", "Halal food is easy to find. Look for the JAKIM halal logo."], ["sun", "Hot and humid all year. Monsoon months differ by coast."]]) {
    const r = AL("HORIZONTAL", "Tip", 12); add(sh, r, true); r.counterAxisAlignItems = "CENTER";
    r.appendChild(circleBtn("Icon", ic, 40, "pandan100", 1, "pandan900", 20)); await T(r, t, "Body/S", "ink", { fill: true });
  }
  const body = ALw("VERTICAL", "Body", W, 24); c.appendChild(body); body.layoutSizingHorizontal = "FILL"; pad(body, 22, 0, 120, 20);
  // move the destinations carousel from Home (links to 06 and 14 travel with it)
  const head = S.home.findOne((n) => n.name === "Head · Popular destinations");
  const scr = S.home.findOne((n) => n.name === "Destination scroller");
  if (head && scr) {
    body.appendChild(head); head.layoutSizingHorizontal = "FILL"; head.name = "Head · Destinations";
    const ht = head.findOne((n) => n.type === "TEXT" && n.characters === "Popular destinations"); if (ht) await setChars(ht, "Destinations");
    body.appendChild(scr); scr.layoutSizingHorizontal = "FILL";
    CHANGES.push("Destinations carousel (Penang → 06, Melaka → 14, 4 unlinked) moved from 04 Home to 26 with its links");
  } else PROBLEMS.push("Couldn't find the Home destinations carousel to move");
  await sectionHead(body, "Culture guide", null, 20);
  const list = ALw("VERTICAL", "Culture rows", 353, 10); body.appendChild(list);
  const rP = await resultRow(list, "Row/Phrases", "Phrases", "Malay phrases with pronunciation and audio", null, null, "languages");
  const rE = await resultRow(list, "Row/Etiquette", "Etiquette", "Places of worship, eating out, greetings", null, null, "hand");
  finish(f, c, [statusAt("Dark"), tabAt("Home")]);
  back(bk); link(rP, "phrases", "push"); link(rE, "etiquette", "push");
  await caption(sec, f, "26", "Country · Malaysia", "Country level of the worldwide IA. Destinations carousel (Penang, Melaka), Good to know, culture guide. Reached from Home → Choose a country → Malaysia.");
  fitSection(sec);
  CHANGES.push("New screen 26 Country – Malaysia in " + sec.name + " (column " + col + "), tab bar with Home active");
}

// ---------- 3 · Home: countries first ----------
async function homeCountries() {
  const body = S.home.findOne((n) => n.name === "Body" && n.parent && n.parent.name === "Content");
  if (!body) throw new Error("Home body not found");
  const wrap = AL("VERTICAL", "Choose a country", 14); body.insertChild(0, wrap); wrap.layoutSizingHorizontal = "FILL";
  await sectionHead(wrap, "Choose a country", null, 20);
  const list = ALw("VERTICAL", "Country list", 353, 10); wrap.appendChild(list);
  for (const [, country, region, , imgKey, sub, built] of COUNTRIES) {
    const r = await resultRow(list, "Country/" + country, country, sub, built ? "6 destinations · culture guide" : "Coming soon", imgKey || "kl");
    r.minHeight = 44;
    if (!built) { const ch = r.findOne((n) => n.name === "icon/chevRight"); if (ch) ch.visible = false; }
    else link(r, "country", "push");
  }
  const eb = S.home.findOne((n) => n.type === "TEXT" && n.characters === "PHRASE OF THE DAY"); if (eb) await setChars(eb, "PHRASE OF THE DAY · MALAY");
  const content = S.home.findOne((n) => n.name === "Content" && n.parent === S.home);
  if (content) S.home.resize(W, Math.max(H, Math.ceil(deepH(content))));
  const cap = MOB.findOne((n) => n.name === "Label · 04 Home");
  if (cap) { const t = cap.findAll((n) => n.type === "TEXT")[1]; if (t) await setChars(t, "Countries first: the 3D showcase rotates countries (arrows, drag or pause). Tap Malaysia under 'Choose a country' to drill down; other countries show 'Coming soon'. Moods, search and the phrase card work as before."); }
  CHANGES.push("04 Home: 'Choose a country' list (6 countries, Malaysia → 26, others 'Coming soon') at the top of the body; phrase eyebrow names the language");
}

// ---------- 4 · country-neutral copy ----------
async function neutralCopy() {
  const btn = S.interests && S.interests.findOne((n) => n.name === "Button/Show my Malaysia");
  if (btn) { if (btn.type === "INSTANCE") setProps(btn, C.btn, { "Label": "Start exploring" }); btn.name = "Button/Start exploring"; CHANGES.push("03: button 'Show my Malaysia' → 'Start exploring' (link to 24 kept)"); }
  else PROBLEMS.push("Button/Show my Malaysia not found on 03");
  let n = 0;
  for (const t of MOB.findAll((x) => x.type === "TEXT")) {
    if (insideInstance(t)) continue;
    let s = t.characters, o = s;
    for (const [a, b] of TEXT_SWAPS) s = s.split(a).join(b);
    if (s !== o) { await setChars(t, s); n++; }
  }
  CHANGES.push(`Country-neutral copy: ${n} text layers updated (splash tagline, loading status, language note, captions)`);
}

// ---------- 5 · Read me ----------
async function readme() {
  const r = MOB.findOne((x) => x.type === "FRAME" && x.name.startsWith("Read me")); if (!r) { PROBLEMS.push("Read me board not found"); return; }
  const b = AL("VERTICAL", "Block/worldwide", 10); add(r, b, true); pad(b, 24); radius(b, 20); paintTo(b, "pandan100");
  await T(b, "Worldwide scope (5 Oct 2026) · 26 screens", "Heading/M", "ink", { fill: true });
  for (const t of [
    "Tourix is a worldwide app for anyone new to a country. Content is organised country first: Home → country → destination → experience / AR Lens.",
    "Malaysia is the one fully built country (Penang, Melaka, culture guide, AR Lens in George Town). Japan, Morocco, Portugal, Mexico and Türkiye are listed as 'Coming soon' and aren't linked; tell test participants.",
    "New: 26 Country – Malaysia. Home now opens with the 3D country showcase and a 'Choose a country' list; the destinations carousel moved to 26.",
    "Product-level copy no longer names one country: 'Start exploring', 'Loading your picks…', 'Anywhere, with local context.'",
  ]) await T(b, "•  " + t, "Body/S", "ink", { fill: true });
  CHANGES.push("Read me board: worldwide scope block added");
}

// ---------- main ----------
async function main() {
  figma.notify("Tourix worldwide: updating Home, showcase and copy… about 20 seconds.", { timeout: 6000 });
  await loadFonts(); await loadTokens();
  const ds = figma.root.children.find((p) => p.name === "Design System"); await ds.loadAsync(); await loadComponents(ds);
  try { await locate(); } catch (e) { figma.closePlugin(e.message); return; }
  try { await figma.saveVersionHistoryAsync("Before worldwide scope (25 screens)", "Saved by the Tourix worldwide plugin before it ran."); CHANGES.push("Version saved: 'Before worldwide scope (25 screens)'"); } catch (e) { PROBLEMS.push("Version not saved: " + e.message); }
  for (const [k, url] of Object.entries(PHOTOS)) { try { const im = await figma.createImageAsync(url); IMG[k] = im.hash; } catch (e) { PROBLEMS.push("Photo " + k + ": " + e.message); IMG[k] = IMG.kl; } }
  await run("Showcase", showcaseCountries);
  await run("26 Country", buildCountry);
  await run("Home", homeCountries);
  await run("Copy", neutralCopy);
  await run("Read me", readme);
  const linked = await applyLinks();
  // anything that still names Malaysia at product level, for review
  const left = [];
  for (const t of MOB.findAll((x) => x.type === "TEXT" && /Malaysia/.test(x.characters))) {
    const sc = screenOf(t); const nm = sc ? sc.name : "?";
    if (/^(26 |06 |07 |08 |13 |14 |15 |23 )/.test(nm) || /^Country\//.test(t.parent && t.parent.parent ? t.parent.parent.name : "")) continue;
    left.push(nm + " → " + t.characters.slice(0, 140).replace(/\n/g, " "));
  }
  const v2log = MOB.findOne((n) => n.type === "FRAME" && n.name === "Build log · v2");
  const log = ALw("VERTICAL", "Build log · worldwide", 640, 8); MOB.appendChild(log); pad(log, 32); radius(log, 24); paintTo(log, "surface");
  if (v2log) { log.x = v2log.x + v2log.width + 80; log.y = v2log.y; }
  await T(log, "Build log · worldwide scope (5 Oct 2026)", "Heading/M", "ink", { fill: true });
  for (const c of CHANGES) await T(log, "✓ " + c, "Body/S", "ink", { fill: true });
  await T(log, "Links applied: " + linked, "Mono/S", "muted");
  for (const p of PROBLEMS) await T(log, "• " + p, "Mono/S", "bunga", { fill: true });
  if (left.length) { await T(log, "Still mentions Malaysia (review):", "Heading/S", "ink"); for (const l of left) await T(log, "– " + l, "Mono/S", "muted", { fill: true }); }
  figma.currentPage.selection = S.country ? [S.country] : [];
  if (S.country) figma.viewport.scrollAndZoomIntoView([S.home, S.country]);
  figma.closePlugin(`Tourix worldwide: ${CHANGES.length} changes, ${linked} links.` + (PROBLEMS.length ? ` ${PROBLEMS.length} issue(s): ` + PROBLEMS.join(" | ") : " No issues.") + (left.length ? ` ${left.length} text(s) still mention Malaysia (see build log).` : ""));
}
main().catch((e) => figma.closePlugin("Worldwide plugin stopped: " + e.message));
