// v5.5 (7 Oct 2026): (1) on 73 and 74 (clones of Home) the Top picks carousel stayed on its invisible Intro state, so
// the instance is replaced with a fresh one (BM text re-applied on 74). (2) On 70/71 the lowest AR label covered the
// hint text, so that label group moves up 70 pt.
(async () => {
  const mob = figma.root.children.find((p) => p.name === "Mobile Prototype (iOS)"); await mob.loadAsync();
  const fr = (nm) => mob.findOne((x) => x.type === "FRAME" && x.name === nm && x.parent && x.parent.type === "SECTION");
  const set = mob.findOne((x) => x.type === "COMPONENT_SET" && x.name === "Top Recommendations (3D)");
  const intro = set && set.children.find((v) => v.name === "Front=Intro");
  const BM = { "Heritage lanes and hawker food": "Lorong warisan dan makanan penjaja", "Temples and machiya lanes": "Kuil dan lorong machiya", "Trams, tiles and viewpoints": "Trem, jubin dan tempat peninjau", "Souks, riads and gardens": "Souk, riad dan taman", "Markets, mole and mezcal": "Pasar, mole dan mezcal", "Two continents, one skyline": "Dua benua, satu kaki langit", "JAPAN": "JEPUN", "MOROCCO": "MAGHRIBI" };
  const log = [];
  for (const nm of ["73 Home – Offline", "74 Home – Bahasa Melayu"]) {
    const f = fr(nm); if (!f || !intro) continue;
    const old = f.findOne((x) => x.type === "INSTANCE" && x.name === "Top picks (3D)"); if (!old) { log.push("no picks on " + nm); continue; }
    const p = old.parent, i = p.children.indexOf(old); const inst = intro.createInstance(); inst.name = "Top picks (3D)"; p.insertChild(i, inst); old.remove();
    if (nm.startsWith("74")) for (const t of inst.findAll((x) => x.type === "TEXT")) { const v = BM[t.characters]; if (v) { for (const fo of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(fo); t.characters = v; } }
    log.push(nm.slice(0, 2) + " picks replaced");
  }
  for (const [nm, lab] of [["70 AR Lens – Phrases", "AR label · Tandas"], ["71 AR Lens – Food nearby", "AR label · Char kway teow"]]) {
    const f = fr(nm); if (!f) continue; let n = 0;
    for (const x of f.children.filter((c) => c.name === lab || c.name === lab + " · leader" || c.name === lab + " · anchor")) { x.y -= 70; n++; }
    log.push(nm.slice(0, 2) + " moved " + n);
  }
  figma.closePlugin("v5.5: " + log.join(", "));
})().catch((e) => figma.closePlugin("v5.5 stopped: " + e.message));
