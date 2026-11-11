/* Scientia – spielerisch Wissen lernen. */
(() => {
  "use strict";

  const app = document.getElementById("app");
  const tabbar = document.getElementById("tabbar");
  const bgLayer = document.getElementById("bg");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const hash = (s) => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  };
  const today = () => new Date().toISOString().slice(0, 10);
  const randId = (n = 10) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => "abcdefghijkmnpqrstuvwxyz23456789"[b % 32]).join("");

  // ================= Speicher & Lernsystem =================
  const STORE_KEY = "scientia.v1";
  const store = (() => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  })();
  store.stats ||= {};
  store.xp ||= 0;
  store.name ||= "";
  store.last ||= {};
  store.days ||= {};
  store.duels ||= [];
  store.uid ||= randId(12);
  // Duell-Fortschritt wird getrennt vom Lern-Fortschritt geführt.
  store.duelStats ||= { a: 0, r: 0, cats: {} };
  store.localDuels ||= [];
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* privater Modus */ }
  }
  save();

  // Leitner-Boxen: Falsches kommt oft dran, Sicheres immer seltener.
  const BOX_WEIGHT = [10, 6, 3.5, 2, 1.1, 0.5];
  const UNSEEN_WEIGHT = 5;
  const itemWeight = (key) => {
    const s = store.stats[key];
    return s ? BOX_WEIGHT[Math.min(s.box, 5)] : UNSEEN_WEIGHT;
  };
  // Antwort im Duell: zählt nur für die Duell-Statistik, nicht fürs Lernsystem.
  function recordDuel(cat, correct) {
    const d = store.duelStats;
    d.a++;
    if (correct) d.r++;
    const c = (d.cats[cat || "mix"] ||= { a: 0, r: 0 });
    c.a++;
    if (correct) c.r++;
    store.days[today()] = (store.days[today()] || 0) + 1;
    save();
  }
  // Antwort beim Üben: steuert das Lernsystem (Leitner-Boxen).
  function record(key, correct) {
    const s = store.stats[key] || (store.stats[key] = { c: 0, w: 0, box: 0 });
    if (correct) { s.c++; s.box = Math.min(5, s.box + 1); } else { s.w++; s.box = 0; }
    s.t = Date.now();
    store.days[today()] = (store.days[today()] || 0) + 1;
    save();
  }
  function weightedSample(items, n, weightFn) {
    const pool = items.slice();
    const out = [];
    while (out.length < n && pool.length) {
      const weights = pool.map(weightFn);
      let r = Math.random() * weights.reduce((a, b) => a + b, 0);
      let idx = 0;
      while (idx < pool.length - 1 && r >= weights[idx]) { r -= weights[idx]; idx++; }
      out.push(pool.splice(idx, 1)[0]);
    }
    return out;
  }
  const level = (xp) => Math.floor(Math.sqrt(xp / 60)) + 1;
  const xpForLevel = (l) => 60 * (l - 1) * (l - 1);
  const DAILY_GOAL = 20;
  function streakDays() {
    let n = 0;
    const d = new Date();
    if (!store.days[d.toISOString().slice(0, 10)]) d.setDate(d.getDate() - 1);
    while (store.days[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // ================= Bilder =================
  // Bilder kommen aus Wikipedia (Hauptbild eines Artikels). Vorab bekannte stehen in data-images.js,
  // fehlende lädt die App selbst nach und merkt sie sich im Browser.
  const IMAGES = Object.assign({}, window.IMAGES || {});
  const IMG_CACHE = "scientia.img.v1";
  const imgMiss = {};
  try {
    const c = JSON.parse(localStorage.getItem(IMG_CACHE)) || {};
    const week = 7 * 864e5;
    for (const [k, v] of Object.entries(c)) {
      if (v && v.src) IMAGES[k] ??= v;
      else if (v && Date.now() - v.miss < week) imgMiss[k] = 1;
    }
  } catch { /* egal */ }
  const imgInfo = (key) => (key && IMAGES[key]) || null;
  const imgUrl = (key) => imgInfo(key)?.src || "";
  const preloaded = new Set();
  function preload(key) {
    const u = imgUrl(key);
    if (!u || preloaded.has(u)) return;
    preloaded.add(u);
    const i = new Image();
    i.src = u;
  }
  const cssUrl = (u) => `url('${String(u).replace(/['"()\\]/g, (c) => encodeURIComponent(c))}')`;
  // Fotohintergrund (wird nachgeladen) mit Farbverlauf als Rückfall.
  const photoStyle = (key, color = "#6c4cf5") => {
    const u = imgUrl(key);
    return `--tint:${color};${u ? `background-image:${cssUrl(u)}` : ""}" data-img="${esc(key || "")}`;
  };
  const COUNTRY_OF_CAPITAL = new Map(window.COUNTRIES.map((c) => [c.capital, c.name]));
  const KNOWN_IMG = new Set();
  const WIKI_API = "https://de.wikipedia.org/w/api.php";
  async function wikiImages(titles) {
    const out = {};
    for (let i = 0; i < titles.length; i += 45) {
      const chunk = titles.slice(i, i + 45);
      const params = new URLSearchParams({ action: "query", format: "json", formatversion: "2", redirects: "1", origin: "*",
        prop: "pageimages|pageprops", piprop: "thumbnail|name", pithumbsize: "960", ppprop: "disambiguation", titles: chunk.join("|") });
      const r = await fetch(`${WIKI_API}?${params}`);
      if (!r.ok) throw new Error("wiki " + r.status);
      const q = (await r.json()).query || {};
      const pages = new Map((q.pages || []).map((p) => [p.title, p]));
      for (const t of chunk) {
        const norm = (q.normalized || []).find((n) => n.from === t)?.to || t;
        const fin = (q.redirects || []).find((n) => n.from === norm)?.to || norm;
        const p = pages.get(fin);
        const name = p?.pageimage || "";
        out[t] = p && !p.missing && !p.pageprops?.disambiguation && p.thumbnail && /\.jpe?g$/i.test(name)
          ? { src: p.thumbnail.source.split("?")[0], file: name, w: p.thumbnail.width, h: p.thumbnail.height, page: fin }
          : null;
      }
    }
    return out;
  }
  let imgQueue = Promise.resolve();
  // Lädt fehlende Bilder (Titel oder "cap:Stadt") und aktualisiert sichtbare Elemente.
  function ensureImages(keys) {
    const todo = [...new Set(keys.filter((k) => k && !IMAGES[k] && !imgMiss[k]))];
    if (!todo.length) return imgQueue;
    todo.forEach((k) => (imgMiss[k] = 1)); // nicht doppelt anfragen
    imgQueue = imgQueue.then(async () => {
      const found = {};
      try {
        const plain = todo.filter((k) => !k.startsWith("cap:"));
        const caps = todo.filter((k) => k.startsWith("cap:")).map((k) => k.slice(4));
        Object.assign(found, await wikiImages([...plain, ...caps]).then((r) => {
          const o = {};
          for (const k of plain) o[k] = r[k];
          for (const c of caps) o["cap:" + c] = r[c];
          return o;
        }));
        const retry = caps.filter((c) => !found["cap:" + c]);
        if (retry.length) {
          const alts = retry.flatMap((c) => [`${c} (${COUNTRY_OF_CAPITAL.get(c)})`, `${c} (Stadt)`]);
          const r2 = await wikiImages(alts);
          for (const c of retry) found["cap:" + c] = r2[`${c} (${COUNTRY_OF_CAPITAL.get(c)})`] || r2[`${c} (Stadt)`] || null;
        }
      } catch {
        todo.forEach((k) => delete imgMiss[k]); // später nochmal versuchen
        return;
      }
      let cache = {};
      try { cache = JSON.parse(localStorage.getItem(IMG_CACHE)) || {}; } catch { /* egal */ }
      for (const k of todo) {
        if (found[k]) { IMAGES[k] = found[k]; delete imgMiss[k]; cache[k] = found[k]; } else cache[k] = { miss: Date.now() };
      }
      try { localStorage.setItem(IMG_CACHE, JSON.stringify(cache)); } catch { /* voll */ }
      applyLateImages();
    });
    return imgQueue;
  }
  function applyLateImages() {
    document.querySelectorAll("[data-img]").forEach((el) => {
      const u = imgUrl(el.dataset.img);
      if (!u || el.dataset.imgDone) return;
      el.dataset.imgDone = "1";
      el.style.backgroundImage = cssUrl(u);
      el.classList.remove("pending");
      const c = el.querySelector(".credit-slot");
      if (c) c.outerHTML = credit(el.dataset.img);
    });
    if (bgLayer.dataset.key && !bgLayer.classList.contains("on")) setBackground(bgLayer.dataset.key, bgLayer.dataset.tint);
  }
  const credit = (key) => {
    const i = imgInfo(key);
    if (!i) return key ? `<span class="credit-slot"></span>` : "";
    return `<a class="credit" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(i.file)}" target="_blank" rel="noopener">Bild: Wikimedia Commons</a>`;
  };
  function setBackground(key, color) {
    const u = imgUrl(key);
    bgLayer.dataset.key = key || "";
    bgLayer.dataset.tint = color || "#6c4cf5";
    bgLayer.style.setProperty("--tint", color || "#6c4cf5");
    if (u) {
      const img = new Image();
      img.onload = () => { if (bgLayer.dataset.key !== key) return; bgLayer.style.backgroundImage = cssUrl(u); bgLayer.classList.add("on"); };
      img.src = u;
    } else {
      bgLayer.classList.remove("on");
      bgLayer.style.backgroundImage = "";
    }
  }
  const clearBackground = () => { bgLayer.dataset.key = ""; bgLayer.classList.remove("on"); bgLayer.style.backgroundImage = ""; };

  // ================= Kategorien =================
  const GEO_GROUP = {
    id: "geografie", name: "Geografie", icon: "🌍", tagline: "Länder, Hauptstädte und Flaggen der Welt", cover: "Blue Marble",
    categories: [
      { id: "map", name: "Länder auf der Karte", icon: "🗺️", color: "#2bb3c9", cover: "Globus", desc: "Finde Länder auf der Weltkarte" },
      { id: "capital", name: "Hauptstädte", icon: "🏙️", color: "#c9822b", cover: "Paris", desc: "Leicht mit Ländername, schwer nur mit Umriss" },
      { id: "flag", name: "Flaggen", icon: "🚩", color: "#e5484d", cover: "Fahne", desc: "Welches Land gehört zur Flagge?" },
    ],
  };
  const GEO_MODE_IDS = new Set(GEO_GROUP.categories.map((c) => c.id));
  const GEO_MODES = GEO_GROUP.categories.slice();
  GEO_GROUP.categories.push(...(window.GEO_QUIZ_CATEGORIES || []));
  GEO_GROUP.categories.forEach((c) => (c.group = "geografie"));
  const GROUPS = [GEO_GROUP, ...window.QUIZ_GROUPS];
  const QUIZ = window.QUIZ_CATEGORIES;
  const MIX = { id: "mix", name: "Tagesmix", icon: "🎲", color: "#7c5cff", group: "start", cover: "Bibliothek" };
  const ALL_CATS = [...GEO_MODES, ...QUIZ];
  const isGeo = (cat) => GEO_MODE_IDS.has(cat);
  const catInfo = (id) => ALL_CATS.find((c) => c.id === id) || MIX;
  const groupInfo = (id) => GROUPS.find((g) => g.id === id);
  const regionInfo = (id) => window.REGIONS.find((r) => r.id === id) || window.REGIONS[0];

  const COUNTRIES = window.COUNTRIES;
  const ALT = window.ALT_NAMES || {};
  const byTopo = new Map(COUNTRIES.map((c) => [c.topo, c]));
  const byIso = new Map(COUNTRIES.map((c) => [c.iso2, c]));
  for (const c of QUIZ) for (const q of c.questions) if (q[6]) KNOWN_IMG.add(q[6]);
  for (const c of COUNTRIES) KNOWN_IMG.add("cap:" + c.capital);
  const countriesIn = (region) => (region === "WORLD" ? COUNTRIES : COUNTRIES.filter((c) => c.regions.includes(region)));
  const questionCount = (cat) => (isGeo(cat) ? COUNTRIES.length : catInfo(cat).questions?.length || 0);

  // Fragen-Pool: jedes Element hat einen festen Schlüssel für das Lernsystem.
  function buildPool(settings) {
    const { cat, region = "WORLD", diff } = settings;
    if (isGeo(cat)) {
      const prefix = { map: "map", capital: "cap", flag: "flag" }[cat];
      return countriesIn(region).map((c) => ({ key: `${prefix}:${c.iso2}`, kind: cat, iso: c.iso2 }));
    }
    const cats = cat === "mix" ? QUIZ : QUIZ.filter((q) => q.id === cat || q.group === cat);
    const items = [];
    for (const qc of cats) {
      for (const q of qc.questions) {
        if (diff === "easy" && q[5] !== 1) continue;
        items.push({ key: `q:${qc.id}:${hash(q[0])}`, kind: "quiz", cat: qc.id, q });
      }
    }
    return items;
  }

  function distractors(country, field, n, sameRegion) {
    const used = new Set([country[field]]);
    const cands = sameRegion ? shuffle(COUNTRIES.filter((c) => c !== country && c.regions.some((r) => country.regions.includes(r)))) : [];
    const rest = shuffle(COUNTRIES.filter((c) => c !== country));
    const out = [];
    for (const c of cands.concat(rest)) {
      if (out.length >= n) break;
      if (used.has(c[field])) continue;
      used.add(c[field]);
      out.push(c[field]);
    }
    return out;
  }

  // Erzeugt eine fertige, serialisierbare Frage (wird bei Online-Duellen so verschickt).
  function makeQuestion(item, settings) {
    const hard = settings.diff === "hard";
    const typing = settings.answer === "type";
    if (item.kind === "map") {
      const c = byIso.get(item.iso);
      if (typing) {
        return { key: item.key, type: "name", region: settings.region, target: c.topo, meta: "🗺️ Karte · Eintippen", prompt: "Wie heißt das markierte Land?", title: `Land: ${c.name}`, correct: c.name, answers: [c.name, ...(ALT[c.name] || [])], hard };
      }
      return { key: item.key, type: "map", region: settings.region, target: c.topo, meta: hard ? "Tippe auf der Karte an · Schwer" : "Tippe auf der Karte an", prompt: c.name, title: `Karte: ${c.name}`, visual: hard ? null : { kind: "flag-small", flag: c.flag }, hard };
    }
    if (item.kind === "capital") {
      const c = byIso.get(item.iso);
      return {
        key: item.key, type: typing ? "type" : "mc", meta: hard ? "Hauptstädte · Schwer" : "Wie heißt die Hauptstadt?",
        prompt: hard ? "Wie heißt die Hauptstadt dieses Landes?" : c.name, title: `Hauptstadt: ${c.flag} ${c.name}`,
        visual: hard ? { kind: "outline", topo: c.topo } : { kind: "outline-small", topo: c.topo },
        options: shuffle([c.capital, ...distractors(c, "capital", 3, hard)]), correct: c.capital,
        answers: [c.capital, ...(ALT[c.capital] || [])], reveal: hard ? `${c.flag} ${c.name}` : null, revealImg: "cap:" + c.capital, revealCaption: c.capital,
      };
    }
    if (item.kind === "flag") {
      const c = byIso.get(item.iso);
      return {
        key: item.key, type: typing ? "type" : "mc", meta: "Flaggen", prompt: "Zu welchem Land gehört diese Flagge?", title: `Flagge ${c.flag}`,
        visual: { kind: "flag", flag: c.flag }, options: shuffle([c.name, ...distractors(c, "name", 3, hard)]), correct: c.name,
        answers: [c.name, ...(ALT[c.name] || [])], reveal: `Hauptstadt: ${c.capital}`, revealImg: "cap:" + c.capital, revealCaption: `${c.capital}, ${c.name}`,
      };
    }
    const q = item.q;
    const qc = catInfo(item.cat);
    const opts = q[7] || {};
    return {
      key: item.key, type: typing && !opts.mc ? "type" : "mc", meta: `${qc.icon} ${qc.name}`, prompt: q[0], cat: qc.id,
      options: shuffle(q.slice(1, 5)), correct: q[1], answers: [q[1], ...(opts.alt || [])], img: q[6] || null,
    };
  }

  function makeRound(settings, n, { learn = true } = {}) {
    const pool = buildPool(settings);
    const picked = learn ? weightedSample(pool, n, (it) => itemWeight(it.key)) : shuffle(pool).slice(0, n);
    return picked.map((it) => makeQuestion(it, settings));
  }

  // ================= Antworten prüfen (Eintipp-Modus) =================
  const STOP = new Set(["der", "die", "das", "ein", "eine", "einen", "den", "dem", "des", "im", "am", "von", "van", "de", "the", "und", "als", "zu"]);
  const GENERIC = new Set(["ozean", "stadt", "republik", "krieg", "revolution", "reich", "insel", "see", "vertrag", "schlacht", "verträge", "vertrage"]);
  const UNITS = new Set(["km", "m", "c", "minuten", "s", "km s", "jahre"]);
  const norm = (s) => String(s).normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/ß/g, "ss").replace(/[’'`´]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  const core = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w)).join(" ");
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m || !n) return m + n;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  const tolerance = (len) => (len <= 4 ? 0 : len <= 8 ? 1 : 2);
  const numOf = (s) => (String(s).normalize("NFKD").match(/\d+(?:[.,]\d+)?/) || [null])[0]?.replace(",", ".");
  // Alle bekannten Namen/Antworten: Wer exakt etwas anderes Echtes eintippt, hat sich nicht vertippt.
  let KNOWN_NAMES = null;
  const knownNames = () => KNOWN_NAMES || (KNOWN_NAMES = new Set([
    ...COUNTRIES.flatMap((c) => [c.name, c.capital]),
    ...Object.entries(ALT).flatMap(([k, v]) => [k, ...v]),
    ...QUIZ.flatMap((c) => c.questions.flatMap((q) => q.slice(1, 5))),
  ].map(core)));
  // Liefert { ok, exact }.
  function checkTyped(input, answers) {
    const inp = core(input);
    if (!inp) return { ok: false };
    const exactOther = knownNames().has(inp) && !answers.some((a) => core(a) === inp);
    for (const a of answers) {
      const c = core(a);
      if (!c) continue;
      if (inp === c) return { ok: true, exact: true };
      if (inp.replace(/ /g, "") === c.replace(/ /g, "")) return { ok: true, exact: true };
      const num = numOf(a);
      if (num) {
        const rest = c.replace(/\d+/g, " ").trim().replace(/\s+/g, " ");
        if ((!rest || UNITS.has(rest)) && numOf(input) === num) return { ok: true, exact: true };
        continue; // Zahlen nie unscharf vergleichen
      }
      if (exactOther) continue;
      if (lev(inp, c) <= tolerance(c.length)) return { ok: true, exact: false };
      const words = c.split(" ");
      if (words.length > 1) {
        const last = words[words.length - 1];
        if (last.length >= 4 && !GENERIC.has(last) && lev(inp, last) <= tolerance(last.length)) return { ok: true, exact: inp === last };
      }
    }
    return { ok: false };
  }

  // ================= Karte =================
  const FEATURES = topojson.feature(window.WORLD, window.WORLD.objects.countries).features.filter((f) => f.properties.name !== "Antarctica");
  const featByTopo = new Map(FEATURES.map((f) => [f.properties.name, f]));
  function mainParts(feature, threshold = 0.1) {
    const g = feature.geometry;
    if (g.type !== "MultiPolygon") return feature;
    const polys = g.coordinates.map((coords) => ({ coords, area: d3.geoArea({ type: "Polygon", coordinates: coords }) }));
    const max = d3.max(polys, (p) => p.area);
    return { type: "Feature", properties: feature.properties, geometry: { type: "MultiPolygon", coordinates: polys.filter((p) => p.area >= max * threshold).map((p) => p.coords) } };
  }
  const largestPart = (feature) => mainParts(feature, 0.999);
  const REGION_VIEW = {
    WORLD: { proj: () => d3.geoNaturalEarth1(), fit: () => ({ type: "Sphere" }) },
    EU: { box: [[-24, 35], [44, 70]] },
    AS: { box: [[26, -10], [148, 55]] },
    AF: { box: [[-19, -35], [52, 37]] },
    NA: { box: [[-135, 8], [-55, 58]] },
    SA: { box: [[-82, -55], [-34, 12]] },
    OC: { proj: () => d3.geoMercator().rotate([-152, 0]), box: [[112, -47], [192, 12]] },
  };
  function outlineSvg(topo, cls = "outline") {
    const f = featByTopo.get(topo);
    if (!f) return "";
    const shape = mainParts(f, 0.15);
    const [cx, cy] = d3.geoCentroid(shape);
    const proj = d3.geoAzimuthalEqualArea().rotate([-cx, -cy]).fitExtent([[8, 8], [272, 162]], shape);
    return `<svg class="${cls}" viewBox="0 0 280 170" aria-hidden="true"><path d="${d3.geoPath(proj)(shape)}"/></svg>`;
  }

  class WorldMap {
    constructor(container, { region = "WORLD", onPick = null, colorFn = null, markers = true, controls = true } = {}) {
      this.showMarkers = markers;
      this.container = container;
      this.region = REGION_VIEW[region] ? region : "WORLD";
      this.onPick = onPick;
      this.colorFn = colorFn;
      this.activeSet = new Set(countriesIn(this.region).map((c) => c.topo));
      this.userTransform = WorldMap.saved[this.region] || d3.zoomIdentity;
      container.innerHTML = `<svg></svg><div class="map-label"></div>${controls ? `
        <div class="map-controls"><button data-z="in" aria-label="Hineinzoomen">+</button><button data-z="out" aria-label="Herauszoomen">−</button><button data-z="reset" aria-label="Ansicht zurücksetzen">⟲</button></div>` : ""}`;
      this.svg = d3.select(container).select("svg");
      this.label = container.querySelector(".map-label");
      container.querySelector(".map-controls")?.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        const t = this.svg.transition().duration(300);
        if (b.dataset.z === "in") this.zoom.scaleBy(t, 1.8);
        if (b.dataset.z === "out") this.zoom.scaleBy(t, 1 / 1.8);
        if (b.dataset.z === "reset") this.zoom.transform(t, d3.zoomIdentity);
        setTimeout(() => { this.userTransform = d3.zoomTransform(this.svg.node()); WorldMap.saved[this.region] = this.userTransform; }, 320);
      });
      this.draw();
      this.ro = new ResizeObserver(() => {
        const r = container.getBoundingClientRect();
        if (Math.abs(r.width - this.w) > 2 || Math.abs(r.height - this.h) > 2) { this.draw(); if (this.focused) this.focus(this.focused, 0); }
      });
      this.ro.observe(container);
    }
    destroy() { this.ro.disconnect(); }
    draw() {
      const r = this.container.getBoundingClientRect();
      const w = (this.w = Math.max(100, r.width));
      const h = (this.h = Math.max(100, r.height));
      const view = REGION_VIEW[this.region];
      const proj = (view.proj || (() => d3.geoMercator()))();
      const fitObj = view.fit ? view.fit() : { type: "MultiPoint", coordinates: [view.box[0], view.box[1], [view.box[0][0], view.box[1][1]], [view.box[1][0], view.box[0][1]]] };
      proj.fitExtent([[6, 6], [w - 6, h - 6]], fitObj);
      const path = (this.path = d3.geoPath(proj));
      this.svg.attr("viewBox", `0 0 ${w} ${h}`).selectAll("*").remove();
      const g = (this.g = this.svg.append("g"));
      if (this.region === "WORLD") g.append("path").datum({ type: "Sphere" }).attr("d", path).attr("class", "sphere");
      const active = this.activeSet;
      this.paths = g.append("g").selectAll("path").data(FEATURES).join("path")
        .attr("class", (f) => "country" + (active.has(f.properties.name) ? " active" : ""))
        .attr("d", path);
      const world = this.region === "WORLD";
      const minArea = this.showMarkers ? (world ? 12 : 50) : 0.5;
      this.markerR = world ? 4 : 6;
      const small = FEATURES.filter((f) => active.has(f.properties.name) && path.area(largestPart(f)) < minArea);
      this.markers = g.append("g").selectAll("circle").data(small).join("circle")
        .attr("class", "marker")
        .attr("cx", (f) => path.centroid(largestPart(f))[0])
        .attr("cy", (f) => path.centroid(largestPart(f))[1])
        .attr("r", this.markerR);
      if (this.colorFn) {
        this.paths.filter((f) => active.has(f.properties.name)).style("fill", (f) => this.colorFn(f.properties.name));
        this.markers.style("fill", (f) => this.colorFn(f.properties.name));
      }
      const onClick = (event, f) => {
        const name = f.properties.name;
        if (active.has(name) && this.onPick) this.onPick(name);
      };
      this.paths.on("click", onClick);
      this.markers.on("click", onClick);
      this.zoom = d3.zoom().scaleExtent([1, 40])
        .translateExtent([[-w * 0.25, -h * 0.25], [w * 1.25, h * 1.25]])
        .on("zoom", (e) => {
          g.attr("transform", e.transform);
          this.markers.attr("r", Math.max(1.5, this.markerR / Math.sqrt(e.transform.k)));
          if (e.sourceEvent) { this.userTransform = e.transform; WorldMap.saved[this.region] = e.transform; }
        });
      this.svg.call(this.zoom).on("dblclick.zoom", null);
      this.svg.call(this.zoom.transform, this.userTransform);
      this.applyStates();
    }
    setStates(states) { this.states = states; this.applyStates(); }
    applyStates() {
      const s = this.states || {};
      for (const sel of [this.paths, this.markers]) {
        for (const k of ["correct", "wrong", "reveal", "target"]) sel.classed(k, (f) => s[f.properties.name] === k);
      }
      // Markiertes Land zusätzlich als Punkt zeigen, falls es winzig ist.
      const t = Object.keys(s).find((k) => s[k] === "target");
      this.g.selectAll(".target-ring").remove();
      if (t) {
        const f = featByTopo.get(t);
        const [x, y] = this.path.centroid(largestPart(f));
        if (this.path.area(largestPart(f)) < 60) this.g.append("circle").attr("class", "target-ring").attr("cx", x).attr("cy", y).attr("r", 10);
      }
    }
    showLabel(text) {
      this.label.textContent = text || "";
      this.label.classList.toggle("show", !!text);
    }
    focus(topos, ms = 600, bottomPad = 150) {
      this.focused = topos;
      const feats = topos.map((t) => featByTopo.get(t)).filter(Boolean).map((f) => mainParts(f, 0.2));
      if (!feats.length) return;
      const [[x0, y0], [x1, y1]] = this.path.bounds({ type: "FeatureCollection", features: feats });
      const dx = Math.max(x1 - x0, 20), dy = Math.max(y1 - y0, 20);
      const usableH = Math.max(120, this.h - bottomPad);
      const k = Math.max(1, Math.min(10, 0.6 / Math.max(dx / this.w, dy / usableH)));
      const t = d3.zoomIdentity.translate(this.w / 2, usableH / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
      (ms ? this.svg.transition().duration(ms) : this.svg).call(this.zoom.transform, t);
    }
  }
  WorldMap.saved = {};

  // ================= Grundgerüst =================
  let cleanup = [];
  let currentTab = "start";
  function render(html, { tab = null, bg = null, bgColor = null } = {}) {
    cleanup.forEach((fn) => fn());
    cleanup = [];
    document.querySelector(".dialog-backdrop")?.remove();
    app.innerHTML = html;
    window.scrollTo(0, 0);
    const inTabs = !!tab;
    document.body.classList.toggle("no-tabs", !inTabs);
    if (inTabs) {
      currentTab = tab;
      tabbar.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-current", b.dataset.tab === tab ? "page" : "false"));
    }
    if (bg) setBackground(bg, bgColor); else clearBackground();
    const want = [...app.querySelectorAll("[data-img]")].map((el) => el.dataset.img).filter((k) => k && !IMAGES[k]);
    if (want.length) ensureImages(want);
  }
  function toast(msg, ms = 2600) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), ms);
  }
  function dialog(html, onAction) {
    document.querySelector(".dialog-backdrop")?.remove();
    const d = document.createElement("div");
    d.className = "dialog-backdrop";
    d.innerHTML = `<div class="dialog" role="dialog" aria-modal="true">${html}</div>`;
    d.addEventListener("click", (e) => {
      const a = e.target.closest("[data-a]")?.dataset.a;
      if (e.target === d || a === "no") return d.remove();
      if (a && onAction(a, d) !== false) d.remove();
    });
    document.body.appendChild(d);
    d.querySelector("input")?.focus();
    return d;
  }
  const askConfirm = (text, okLabel, onOk) => dialog(`<p class="dialog-title">${esc(text)}</p>
      <div class="dialog-btns"><button class="secondary-btn" data-a="no">Zurück</button><button class="primary-btn danger" data-a="yes">${esc(okLabel)}</button></div>`, (a) => a === "yes" && onOk());
  function askName(onOk) {
    if (store.name) return onOk(store.name);
    const d = dialog(`<p class="dialog-title">Wie heißt du?</p><p class="muted">Dein Name wird deinem Gegner angezeigt.</p>
      <form id="name-form"><input class="text-input" id="name-input" maxlength="16" placeholder="z. B. Jonas" autocomplete="given-name" /></form>
      <div class="dialog-btns"><button class="secondary-btn" data-a="no">Abbrechen</button><button class="primary-btn" data-a="ok">Weiter</button></div>`, (a, el) => {
      const v = el.querySelector("#name-input").value.trim();
      if (!v) { toast("Bitte gib deinen Namen ein."); return false; }
      store.name = v.slice(0, 16);
      save();
      setTimeout(() => onOk(store.name));
    });
    d.querySelector("#name-form").addEventListener("submit", (e) => { e.preventDefault(); d.querySelector("[data-a=ok]").click(); });
  }
  function on(sel, ev, fn) { app.querySelectorAll(sel).forEach((el) => el.addEventListener(ev, fn)); }
  const backBtn = (to) => `<button class="icon-btn" data-back="${to}" aria-label="Zurück">←</button>`;
  function bindBack(handlers = {}) {
    on("[data-back]", "click", (e) => {
      const target = e.currentTarget.dataset.back;
      (handlers[target] || TABS[target] || (() => openGroup(target)))();
    });
  }
  tabbar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (b) { closeConn(); TABS[b.dataset.tab](); }
  });

  function mastery(settings) {
    const pool = buildPool(settings);
    if (!pool.length) return 0;
    return pool.reduce((a, it) => a + Math.min(1, (store.stats[it.key]?.box || 0) / 3), 0) / pool.length;
  }
  const catMastery = (c) => Math.round(mastery({ cat: c.id, region: "WORLD", diff: "hard" }) * 100);
  const groupMastery = (g) => {
    const m = g.categories.map((c) => catMastery(c));
    return Math.round(m.reduce((a, b) => a + b, 0) / m.length);
  };

  // ================= Start =================
  function home() {
    const l = level(store.xp);
    const lo = xpForLevel(l), hi = xpForLevel(l + 1);
    const pct = Math.round(((store.xp - lo) / (hi - lo)) * 100);
    const done = store.days[today()] || 0;
    const ring = Math.min(1, done / DAILY_GOAL);
    const h = new Date().getHours();
    const greet = h < 11 ? "Guten Morgen" : h < 18 ? "Hallo" : "Guten Abend";
    const weak = Object.values(store.stats).filter((s) => s.box === 0).length;
    const openDuels = store.duels.filter((d) => !d.finished).slice(0, 3);
    const mixCover = shuffle(QUIZ.map((c) => c.cover))[0];
    render(`
      <section class="home-hero">
        <div class="blobs" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="hero-top">
          <div><p class="greet">${greet}${store.name ? ", " + esc(store.name) : ""} 👋</p><h1>Was lernst du heute?</h1></div>
          <button class="ring" id="goal" aria-label="Tagesziel ${done} von ${DAILY_GOAL}" style="--p:${ring}">
            <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19"/><circle class="v" cx="22" cy="22" r="19" pathLength="1"/></svg>
            <span>${Math.min(done, 99)}<small>/${DAILY_GOAL}</small></span></button>
        </div>
        <div class="hero-stats">
          <span class="pill">⭐ Level ${l}</span><span class="pill">🔥 ${streakDays()} ${streakDays() === 1 ? "Tag" : "Tage"}</span><span class="pill">${store.xp} XP</span>
        </div>
        <div class="xpbar"><div style="width:${pct}%"></div></div>
      </section>

      <button class="feature-card" id="mix" style="${photoStyle(mixCover, "#7c5cff")}">
        <span class="fc-label">Tagesmix</span>
        <b>10 Fragen aus allen Bereichen</b>
        <span class="fc-cta">Los geht's →</span>
      </button>

      <div class="section-title">Bereiche</div>
      <div class="area-cards">
        ${GROUPS.map((g) => `<button class="area-card photo" data-group="${g.id}" style="${photoStyle(g.cover, "#4a3aa8")}">
          <span class="ac-icon">${g.icon}</span><span class="ac-text"><b>${esc(g.name)}</b><small>${esc(g.tagline)}</small></span>
          <span class="ac-meter"><i style="width:${groupMastery(g)}%"></i></span></button>`).join("")}
      </div>

      ${weak ? `<button class="wide-card" id="weak"><span class="wc-icon">💪</span><span><b>Fehler wiederholen</b><small>${weak} Fragen, die du zuletzt falsch hattest</small></span><span>→</span></button>` : ""}

      <div class="section-title">Duelle</div>
      ${openDuels.length ? `<div class="duel-list">${openDuels.map(duelRow).join("")}</div>` : ""}
      <button class="wide-card accent" data-tab-go="duelle"><span class="wc-icon">⚔️</span><span><b>Freund herausfordern</b><small>Link schicken und gegeneinander spielen</small></span><span>→</span></button>
      <button class="wide-card" data-tab-go="stats"><span class="wc-icon">📈</span><span><b>Fortschritt</b><small>Deine Weltkarte und Statistiken</small></span><span>→</span></button>
    `, { tab: "start" });
    on("[data-group]", "click", (e) => openGroup(e.currentTarget.dataset.group));
    on("#mix", "click", () => startSolo({ cat: "mix", diff: "hard", answer: store.last.mixAnswer || "mc" }, 10));
    on("#weak", "click", startWeak);
    on("[data-tab-go]", "click", (e) => TABS[e.currentTarget.dataset.tabGo]());
    on("#goal", "click", () => toast(`Heute ${done} von ${DAILY_GOAL} Fragen beantwortet${done >= DAILY_GOAL ? " – Tagesziel geschafft! 🎉" : ""}`));
    bindDuelRows();
  }

  // Fehler aus allen Bereichen wiederholen
  function startWeak() {
    const items = [];
    for (const c of ALL_CATS) {
      const pool = buildPool({ cat: c.id, region: "WORLD", diff: "hard" });
      for (const it of pool) if (store.stats[it.key]?.box === 0) items.push({ it, c });
    }
    const picked = shuffle(items).slice(0, 10);
    if (!picked.length) return toast("Keine Fehler offen – stark!");
    const qs = picked.map(({ it, c }) => makeQuestion(it, { cat: c.id, region: it.kind === "map" ? "WORLD" : "WORLD", diff: "hard", answer: "mc" }));
    runSolo({ cat: "mix", diff: "hard", answer: "mc", label: "Fehler wiederholen" }, qs);
  }

  // ================= Bereich (Reiter) =================
  function openGroup(id) {
    const g = groupInfo(id);
    if (!g) return home();
    render(`
      <header class="group-hero photo" style="${photoStyle(g.cover, "#4a3aa8")}">
        <div class="gh-inner"><span class="gh-icon">${g.icon}</span><h1>${esc(g.name)}</h1><p>${esc(g.tagline)}</p></div>
        ${credit(g.cover)}
      </header>
      <div class="topic-list">
        ${g.categories.map((c) => {
          const m = catMastery(c);
          return `<button class="topic-card" data-cat="${c.id}">
            <span class="tc-img photo" style="${photoStyle(c.cover, c.color)}"><span>${c.icon}</span></span>
            <span class="tc-body"><b>${esc(c.name)}</b><small>${esc(c.desc || `${questionCount(c.id)} Fragen`)}</small>
            <span class="meter"><i style="width:${m}%;background:${c.color}"></i></span><small class="muted">${m}% gelernt</small></span>
            <span class="tc-go">›</span></button>`;
        }).join("")}
        ${g.id !== "geografie" ? `<button class="topic-card" data-cat="${g.id}">
            <span class="tc-img photo" style="--tint:#7c5cff"><span>🎲</span></span>
            <span class="tc-body"><b>Alles aus ${esc(g.name)}</b><small>Gemischte Fragen aus allen Themen</small></span><span class="tc-go">›</span></button>` : ""}
      </div>`, { tab: id });
    on("[data-cat]", "click", (e) => setup(e.currentTarget.dataset.cat, id));
  }

  // ================= Einstellungen & Start =================
  function chips(name, options, value) {
    return `<div class="chips" data-chips="${name}">${options.map((o) => `<button class="chip" data-v="${o.v}" aria-pressed="${o.v === value}">${o.l}</button>`).join("")}</div>`;
  }
  function bindChips(state) {
    app.querySelectorAll("[data-chips]").forEach((group) => {
      group.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        group.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
        const k = group.dataset.chips;
        state[k] = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v;
        state.onChange?.(k);
      });
    });
  }

  function setup(cat, backTo) {
    const g = groupInfo(cat);
    const c = g ? { id: cat, name: `Alles aus ${g.name}`, icon: g.icon, color: "#7c5cff", cover: g.cover } : catInfo(cat);
    const last = store.last[cat] || {};
    const geo = isGeo(cat);
    const s = { cat, region: geo ? last.region || "EU" : "WORLD", diff: last.diff || "easy", n: last.n || 10, answer: last.answer || (cat === "map" ? "tap" : "mc") };
    const diffHint = {
      map: "Leicht: mit Flagge und Punkten für kleine Länder · Schwer: nur der Name",
      capital: "Leicht: Ländername wird angezeigt · Schwer: nur der Umriss des Landes",
      flag: "Leicht: Antworten aus aller Welt · Schwer: ähnliche Länder aus derselben Region",
    }[cat] || "Leicht: einfache Fragen · Schwer: alle Fragen inklusive kniffliger";
    const answerOpts = cat === "map"
      ? [{ v: "tap", l: "👆 Auf Karte tippen" }, { v: "type", l: "⌨️ Namen eintippen" }]
      : [{ v: "mc", l: "🔘 Multiple Choice" }, { v: "type", l: "⌨️ Eintippen" }];
    if (cat === "map" && s.answer === "mc") s.answer = "tap";
    if (cat !== "map" && s.answer === "tap") s.answer = "mc";

    render(`
      <header class="setup-hero photo" style="${photoStyle(c.cover, c.color)}">
        <div class="sh-top">${backBtn(backTo || c.group || "start")}</div>
        <div class="sh-inner"><span class="gh-icon">${c.icon}</span><h1>${esc(c.name)}</h1>${c.desc ? `<p>${esc(c.desc)}</p>` : ""}</div>
        ${credit(c.cover)}
      </header>
      <div class="setup-body">
        ${geo ? `<div class="field"><label class="lbl">Region</label>${chips("region", window.REGIONS.map((r) => ({ v: r.id, l: `${r.icon} ${r.name}` })), s.region)}</div>` : ""}
        <div class="field"><label class="lbl">Antworten</label>${chips("answer", answerOpts, s.answer)}</div>
        <div class="field"><label class="lbl">Schwierigkeit</label>${chips("diff", [{ v: "easy", l: "🙂 Leicht" }, { v: "hard", l: "🔥 Schwer" }], s.diff)}<p class="hint">${diffHint}</p></div>
        <div class="field"><label class="lbl">Anzahl Fragen</label>${chips("n", [{ v: 5, l: "5" }, { v: 10, l: "10" }, { v: 20, l: "20" }], s.n)}</div>
        <p class="hint" id="poolinfo"></p>
        <div class="start-buttons">
          <button class="primary-btn big" id="solo">🎯 Allein üben</button>
          <button class="secondary-btn big" id="friend">⚔️ Freund herausfordern</button>
          <button class="ghost-btn" id="local">📱 Zu zweit an einem Handy</button>
        </div>
      </div>`, { tab: null });
    const backTarget = backTo || c.group || "start";
    bindBack({ [backTarget]: () => (backTarget === "duelle" ? pickDuelTopic() : groupInfo(backTarget) ? openGroup(backTarget) : home()) });
    const info = () => {
      const pool = buildPool(s);
      app.querySelector("#poolinfo").textContent = `${pool.length} Fragen in dieser Auswahl · ${Math.round(mastery(s) * 100)}% davon sitzen schon.`;
    };
    s.onChange = info;
    info();
    bindChips(s);
    const remember = () => { store.last[cat] = { region: s.region, diff: s.diff, n: s.n, answer: s.answer }; save(); };
    const settings = () => ({ cat: s.cat, region: s.region, diff: s.diff, answer: s.answer });
    on("#solo", "click", () => { remember(); startSolo(settings(), s.n); });
    on("#friend", "click", () => { remember(); askName(() => createOnlineDuel(settings(), s.n)); });
    on("#local", "click", () => { remember(); localDuelSetup(settings(), s.n); });
  }

  function startSolo(settings, n) {
    const qs = makeRound(settings, n);
    if (!qs.length) return toast("Keine Fragen für diese Auswahl.");
    runSolo(settings, qs);
  }

  // ================= Fragen anzeigen =================
  function questionVisual(q) {
    const v = q.visual;
    if (!v) return "";
    if (v.kind === "flag") return `<div class="q-visual"><div class="flag">${esc(v.flag)}</div></div>`;
    if (v.kind === "flag-small") return `<div class="q-visual"><div class="flag small">${esc(v.flag)}</div></div>`;
    if (v.kind === "outline") return `<div class="q-visual">${outlineSvg(v.topo)}</div>`;
    if (v.kind === "outline-small") return `<div class="q-visual small">${outlineSvg(v.topo)}</div>`;
    return "";
  }

  // Zeigt eine Frage an und meldet die Antwort über onAnswer({correct, ms, picked, timeout}).
  function renderQuestion(host, q, { timeLimit = 0, onAnswer, autoNext = false, nextLabel = "Weiter", onNext }) {
    const start = performance.now();
    let answered = false;
    let map = null;
    let timerId = null;
    const color = catInfo(q.cat)?.color;
    if (q.img) setBackground(q.img, color); else if (q.type !== "map" && q.type !== "name") clearBackground();

    const isMapType = q.type === "map" || q.type === "name";
    const banner = q.img ? `<div class="q-photo ${imgUrl(q.img) ? "" : "pending"}" data-img="${esc(q.img)}" style="${imgUrl(q.img) ? `background-image:${cssUrl(imgUrl(q.img))}` : ""}">${imgUrl(q.img) ? credit(q.img) : `<span class="credit-slot"></span>`}</div>` : "";
    const answerArea = (() => {
      if (q.type === "map") return `<div class="map-area"><div class="map-wrap"></div><div class="fb-slot overlay"></div></div>`;
      if (q.type === "name") return `<div class="map-area name-map"><div class="map-wrap"></div><div class="fb-slot overlay"></div></div>${typeForm()}`;
      if (q.type === "type") return `${typeForm()}<div class="fb-slot"></div>`;
      return `<div class="options">${q.options.map((o, i) => `<button class="option" data-i="${i}"><span class="letter">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div><div class="fb-slot"></div>`;
    })();
    function typeForm() {
      return `<form class="type-form" autocomplete="off"><input class="text-input type-input" id="answer-input" placeholder="Antwort eintippen …" autocapitalize="sentences" autocorrect="off" spellcheck="false" enterkeyhint="done" />
        <div class="type-btns"><button type="button" class="ghost-btn" id="skip">Weiß ich nicht</button><button class="primary-btn" id="check">Prüfen</button></div></form>`;
    }

    host.innerHTML = `
      ${timeLimit ? `<div class="timer"><div></div></div>` : ""}
      <div class="q-card ${q.img ? "has-photo" : ""}">${banner}<div class="q-body"><div class="q-meta">${esc(q.meta || "")}</div><div class="q-text">${esc(q.prompt)}</div>${questionVisual(q)}</div></div>
      ${answerArea}`;

    if (timeLimit) {
      const bar = host.querySelector(".timer > div");
      bar.style.transition = `width ${timeLimit}ms linear`;
      requestAnimationFrame(() => requestAnimationFrame(() => (bar.style.width = "0%")));
      timerId = setTimeout(() => finish(false, null, true), timeLimit);
    }

    const feedback = (correct, html, photoKey, caption) => {
      const slot = host.querySelector(".fb-slot");
      slot.innerHTML = `<div class="feedback ${correct ? "good" : "bad"}">
        ${photoKey ? `<div class="fb-photo ${imgUrl(photoKey) ? "" : "pending"}" data-img="${esc(photoKey)}" style="${imgUrl(photoKey) ? `background-image:${cssUrl(imgUrl(photoKey))}` : ""}"><span>${esc(caption || "")}</span></div>` : ""}
        <div class="fb-row"><div class="msg"><b>${correct ? "Richtig! 🎉" : "Leider falsch"}</b>${html ? `<span>${html}</span>` : ""}</div>${onNext ? `<button class="next">${esc(nextLabel)}</button>` : ""}</div></div>`;
      slot.scrollIntoView({ block: "nearest", behavior: "smooth" });
      if (onNext) {
        const btn = slot.querySelector(".next");
        btn.addEventListener("click", () => { map?.destroy(); onNext(); });
        if (autoNext && correct && !(photoKey && imgUrl(photoKey))) setTimeout(() => { if (btn.isConnected && !document.querySelector(".dialog-backdrop")) btn.click(); }, 1000);
        else setTimeout(() => btn.isConnected && btn.focus({ preventScroll: true }), 50);
      }
    };

    function finish(correct, picked, timeout = false, almost = false) {
      if (answered) return;
      answered = true;
      clearTimeout(timerId);
      const bar = host.querySelector(".timer > div");
      if (bar) { const w = getComputedStyle(bar).width; bar.style.transition = "none"; bar.style.width = w; }
      const ms = performance.now() - start;
      let text = "";
      const prefix = timeout ? "Zeit abgelaufen! " : "";
      if (q.type === "map") {
        const target = byTopo.get(q.target);
        const states = { [q.target]: correct ? "correct" : "reveal" };
        if (!correct && picked) states[picked] = "wrong";
        map.setStates(states);
        if (correct) text = `${esc(target.flag)} ${esc(target.name)}`;
        else {
          const p = picked && byTopo.get(picked);
          text = prefix + (p ? `Das war ${esc(p.flag)} ${esc(p.name)}. ` : "") + `Gesucht: ${esc(target.name)} (grün).`;
          map.focus(picked ? [q.target, picked] : [q.target]);
        }
        map.showLabel(target.name);
      } else {
        host.querySelectorAll(".option").forEach((b) => {
          b.disabled = true;
          const val = q.options[+b.dataset.i];
          if (val === q.correct) b.classList.add("correct");
          else if (val === picked) b.classList.add("wrong");
        });
        const input = host.querySelector(".type-input");
        if (input) {
          input.disabled = true;
          input.classList.add(correct ? "correct" : "wrong");
          host.querySelectorAll(".type-btns button").forEach((b) => (b.disabled = true));
        }
        if (q.type === "name") {
          const target = byTopo.get(q.target);
          map.setStates({ [q.target]: correct ? "correct" : "reveal" });
          map.showLabel(target.name);
        }
        const right = `<b class="inline">${esc(q.correct)}</b>`;
        if (correct) text = (almost ? `Fast richtig geschrieben: ${right}` : "") + (q.reveal ? `${almost ? " · " : ""}${esc(q.reveal)}` : "");
        else text = `${prefix}Richtig ist: ${right}${q.reveal ? ` · ${esc(q.reveal)}` : ""}`;
      }
      if (!correct && navigator.vibrate) navigator.vibrate(120);
      onAnswer({ correct, ms, picked, timeout });
      feedback(correct, text, q.revealImg, q.revealCaption);
    }

    if (isMapType) {
      map = new WorldMap(host.querySelector(".map-wrap"), {
        region: q.region,
        markers: q.type === "map" ? !q.hard : false,
        onPick: q.type === "map" ? (topo) => finish(topo === q.target, topo) : null,
      });
      cleanup.push(() => map?.destroy());
      if (q.type === "name") {
        map.setStates({ [q.target]: "target" });
        requestAnimationFrame(() => map.focus([q.target], 0, 20));
      }
    }
    if (q.type === "mc") {
      host.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
        const val = q.options[+b.dataset.i];
        finish(val === q.correct, val);
      }));
    }
    if (q.type === "type" || q.type === "name") {
      const form = host.querySelector(".type-form");
      const input = form.querySelector("input");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = input.value.trim();
        if (!v) return input.focus();
        const r = checkTyped(v, q.answers || [q.correct]);
        finish(r.ok, v, false, r.ok && !r.exact);
      });
      form.querySelector("#skip").addEventListener("click", () => finish(false, null));
      setTimeout(() => input.focus({ preventScroll: q.type === "name" }), 60);
    }
    // Bild der nächsten Frage vorladen
    return { cancel: () => { answered = true; clearTimeout(timerId); map?.destroy(); } };
  }

  // ---------- Allein üben ----------
  function runSolo(settings, questions) {
    const st = { i: 0, score: 0, streak: 0, results: [] };
    ensureImages(questions.flatMap((q) => [q.img, q.revealImg])).then(() => questions.forEach((q) => { preload(q.img); preload(q.revealImg); }));
    const step = () => {
      if (st.i >= questions.length) return soloResult(settings, questions, st);
      const q = questions[st.i];
      render(`<div class="game">
        <div class="game-top"><button class="icon-btn" id="quit" aria-label="Beenden">✕</button>
          <div class="progress"><div style="width:${(st.i / questions.length) * 100}%"></div></div>
          <div class="score-pill">⭐ ${st.score}${st.streak >= 3 ? ` · 🔥${st.streak}` : ""}</div></div>
        <div class="qhost game"></div></div>`);
      on("#quit", "click", () => askConfirm("Runde beenden?", "Beenden", () => backToSetup(settings)));
      renderQuestion(app.querySelector(".qhost"), q, {
        autoNext: true,
        nextLabel: st.i + 1 >= questions.length ? "Ergebnis" : "Weiter",
        onAnswer: ({ correct }) => {
          record(q.key, correct);
          st.results.push({ q, correct });
          if (correct) { st.streak++; st.score += 10 + Math.min(10, (st.streak - 1) * 2) + (q.type === "type" || q.type === "name" ? 5 : 0); } else st.streak = 0;
          app.querySelector(".score-pill").textContent = `⭐ ${st.score}${st.streak >= 3 ? ` · 🔥${st.streak}` : ""}`;
          app.querySelector(".progress > div").style.width = `${((st.i + 1) / questions.length) * 100}%`;
        },
        onNext: () => { st.i++; step(); },
      });
    };
    step();
  }
  function backToSetup(settings) {
    if (settings.cat === "mix") return home();
    if (groupInfo(settings.cat)) return setup(settings.cat, settings.cat);
    setup(settings.cat, catInfo(settings.cat).group || settings.cat);
  }
  function answerText(q) {
    if (q.type === "map" || q.type === "name") { const t = byTopo.get(q.target); return { title: q.title, sub: `${t.flag} ${t.name}` }; }
    return { title: q.title || q.prompt, sub: q.correct };
  }
  function soloResult(settings, questions, st) {
    store.xp += st.score;
    save();
    const right = st.results.filter((r) => r.correct).length;
    const pct = right / questions.length;
    const emoji = pct === 1 ? "🏆" : pct >= 0.8 ? "🌟" : pct >= 0.5 ? "👍" : "💪";
    const wrong = st.results.filter((r) => !r.correct);
    render(`<div class="result">
      <div class="confetti" aria-hidden="true">${pct >= 0.8 ? Array.from({ length: 24 }, (_, i) => `<i style="--i:${i}"></i>`).join("") : ""}</div>
      <div class="big-emoji">${emoji}</div>
      <h2>${pct === 1 ? "Perfekt!" : pct >= 0.8 ? "Stark!" : pct >= 0.5 ? "Gut gemacht!" : "Dranbleiben!"}</h2>
      <div class="score-big">${right} / ${questions.length}</div>
      <p class="muted">+${st.score} XP · Level ${level(store.xp)} · heute ${store.days[today()] || 0}/${DAILY_GOAL}</p>
      </div>
      ${wrong.length ? `<div class="section-title">Das kommt bald wieder dran</div><div class="result-list">${wrong.map((r) => {
        const a = answerText(r.q);
        return `<div class="result-item">${r.q.img && imgUrl(r.q.img) ? `<span class="ri-img" style="background-image:${cssUrl(imgUrl(r.q.img))}"></span>` : `<span class="ri-x">✕</span>`}<div>${esc(a.title)}<small>Richtig: ${esc(a.sub)}</small></div></div>`;
      }).join("")}</div>` : ""}
      <div class="spacer"></div>
      <div class="btn-row">
        ${wrong.length ? `<button class="primary-btn" id="retry-wrong">Fehler nochmal üben</button>` : ""}
        <button class="${wrong.length ? "secondary-btn" : "primary-btn"}" id="again">Neue Runde</button>
        <button class="ghost-btn" id="menu">Zurück</button>
      </div>`);
    on("#again", "click", () => runSolo(settings, settings.label ? questions.map((q) => q) : makeRound(settings, questions.length)));
    on("#menu", "click", () => backToSetup(settings));
    on("#retry-wrong", "click", () => runSolo(settings, shuffle(wrong.map((r) => r.q))));
  }

  // ================= 1 gegen 1: am selben Handy =================
  const timeLimitFor = (q) => (q.type === "map" ? 20000 : q.type === "type" || q.type === "name" ? 25000 : 15000);
  const pointsFor = (correct, ms, limit) => (correct ? 100 + Math.round(50 * Math.max(0, 1 - ms / limit)) : 0);

  function localDuelSetup(settings, n) {
    const names = store.duelNames || [store.name || "Spieler 1", "Spieler 2"];
    dialog(`<p class="dialog-title">Zu zweit an einem Handy</p><p class="muted">Ihr spielt abwechselnd und gebt das Handy weiter.</p>
      <div class="stack"><input class="text-input" id="p1" maxlength="16" value="${esc(names[0])}" /><input class="text-input" id="p2" maxlength="16" value="${esc(names[1])}" /></div>
      <div class="dialog-btns"><button class="secondary-btn" data-a="no">Abbrechen</button><button class="primary-btn" data-a="ok">Starten</button></div>`, (a, el) => {
      const p1 = el.querySelector("#p1").value.trim() || "Spieler 1";
      const p2 = el.querySelector("#p2").value.trim() || "Spieler 2";
      store.duelNames = [p1, p2];
      save();
      setTimeout(() => localDuel(settings, n, [p1, p2]));
    });
  }

  function localDuel(settings, perPlayer, names) {
    const qs = makeRound(settings, perPlayer * 2, { learn: false });
    if (qs.length < 2) return toast("Zu wenige Fragen für diese Auswahl.");
    ensureImages(qs.flatMap((q) => [q.img, q.revealImg]));
    const per = Math.floor(qs.length / 2);
    const players = names.map((n) => ({ name: n, score: 0, right: 0 }));
    let i = 0;
    const total = per * 2;
    const bar = (active) => `<div class="versus">${players.map((p, k) => `<div class="p ${k === active ? "active" : ""}"><span>${esc(p.name)}</span><span>${p.score}</span></div>`).join("")}</div>`;
    const handoff = () => {
      if (i >= total) return localResult();
      const who = i % 2;
      render(`${bar(who)}<div class="handoff"><div class="big-emoji">📱</div><h2>${esc(players[who].name)} ist dran</h2>
        <p class="muted">Frage ${Math.floor(i / 2) + 1} von ${per}</p><button class="primary-btn" id="ready">Bereit!</button></div>
        <button class="ghost-btn" id="quit">Duell abbrechen</button>`);
      on("#ready", "click", play);
      on("#quit", "click", () => askConfirm("Duell abbrechen?", "Abbrechen", () => backToSetup(settings)));
    };
    const play = () => {
      const who = i % 2;
      const q = qs[i];
      const limit = timeLimitFor(q);
      render(`<div class="game">${bar(who)}<div class="qhost game"></div></div>`);
      renderQuestion(app.querySelector(".qhost"), q, {
        timeLimit: limit, nextLabel: i + 1 >= total ? "Ergebnis" : "Weitergeben",
        onAnswer: ({ correct, ms }) => {
          recordDuel(q.cat || settings.cat, correct);
          players[who].score += pointsFor(correct, ms, limit);
          if (correct) players[who].right++;
          app.querySelector(".versus").outerHTML = bar(who);
        },
        onNext: () => { i++; handoff(); },
      });
    };
    const localResult = () => {
      const [a, b] = players;
      const winner = a.score === b.score ? null : a.score > b.score ? a : b;
      store.xp += Math.round((a.score + b.score) / 20);
      store.localDuels.unshift({ t: Date.now(), names: [a.name, b.name], scores: [a.score, b.score], label: duelLabel(settings, per) });
      store.localDuels = store.localDuels.slice(0, 30);
      save();
      render(`<div class="result"><div class="big-emoji">${winner ? "🏆" : "🤝"}</div>
        <h2>${winner ? `${esc(winner.name)} gewinnt!` : "Unentschieden!"}</h2></div>
        <div class="podium">${players.map((p) => `<div class="p center ${p === winner ? "win" : ""}"><span>${esc(p.name)}</span><b>${p.score}</b><span>${p.right}/${per} richtig</span></div>`).join("")}</div>
        <div class="spacer"></div>
        <div class="btn-row"><button class="primary-btn" id="again">Revanche</button><button class="ghost-btn" id="menu">Zurück</button></div>`);
      on("#again", "click", () => localDuel(settings, perPlayer, names));
      on("#menu", "click", () => backToSetup(settings));
    };
    handoff();
  }

  // ================= 1 gegen 1: online =================
  // Läuft über öffentliche MQTT-Server. Spielstand liegt dort als „retained“ Nachricht,
  // daher klappt das Duell auch, wenn ein Handy zwischendurch die App verlässt
  // oder der Freund erst später spielt.
  const BROKERS = window.SCIENTIA_MQTT || ["wss://broker.emqx.io:8084/mqtt", "wss://broker.hivemq.com:8884/mqtt", "wss://test.mosquitto.org:8081/mqtt"];
  const TOPIC = (code) => `scientia/v2/duell/${code}`;
  const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const newCode = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => CODE_CHARS[b % 32]).join("");
  let conn = null; // { client, broker, code, handlers }

  function connectBroker(preferred = 0) {
    return new Promise((resolve, reject) => {
      if (typeof mqtt === "undefined") return reject(new Error("Online-Duelle sind hier nicht verfügbar."));
      const order = [preferred, ...BROKERS.map((_, i) => i).filter((i) => i !== preferred)].filter((i) => BROKERS[i]);
      let k = 0;
      const tryNext = () => {
        if (k >= order.length) return reject(new Error("Keine Verbindung zum Duell-Server. Prüfe dein Internet."));
        const idx = order[k++];
        const client = mqtt.connect(BROKERS[idx], { clientId: "scientia_" + randId(10), connectTimeout: 7000, reconnectPeriod: 2000, clean: true, keepalive: 30 });
        let settled = false;
        const fail = () => { if (settled) return; settled = true; client.end(true); tryNext(); };
        const timer = setTimeout(fail, 8000);
        client.once("connect", () => { if (settled) return; settled = true; clearTimeout(timer); resolve({ client, broker: idx }); });
        client.once("error", () => { clearTimeout(timer); fail(); });
      };
      tryNext();
    });
  }
  function closeConn() {
    if (!conn) return;
    try { conn.client.end(true); } catch { /* egal */ }
    conn = null;
  }
  // Veröffentlicht und wartet, bis der Server den Empfang bestätigt hat.
  function publish(sub, data, retain = true, c = conn) {
    if (!c) return Promise.resolve();
    return new Promise((res) => c.client.publish(`${TOPIC(c.code)}/${sub}`, JSON.stringify(data), { qos: 1, retain }, () => res()));
  }
  const endGracefully = (client) => new Promise((res) => client.end(false, {}, () => res()));
  // Abonniert das Duell und ruft onMsg(kind, data) auf.
  async function openDuelChannel(code, broker, onMsg) {
    closeConn();
    const { client, broker: used } = await connectBroker(broker);
    conn = { client, broker: used, code };
    client.on("message", (topic, payload) => {
      if (!conn || conn.client !== client) return;
      const sub = topic.slice(TOPIC(code).length + 1);
      if (!payload?.length) return onMsg(sub, null);
      let data;
      try { data = JSON.parse(payload.toString()); } catch { return; }
      onMsg(sub, data);
    });
    await new Promise((res) => client.subscribe(`${TOPIC(code)}/#`, { qos: 1 }, () => res()));
    // Gespeicherte (retained) Nachrichten kommen direkt nach dem Abonnieren – kurz abwarten.
    await new Promise((res) => setTimeout(res, 900));
    return used;
  }
  const inviteLink = (code, broker) => {
    const u = new URL(location.href);
    u.search = "";
    u.hash = "";
    u.searchParams.set("duell", code);
    if (broker) u.searchParams.set("s", broker);
    return u.toString();
  };
  function saveDuel(d) {
    const i = store.duels.findIndex((x) => x.code === d.code);
    if (i >= 0) store.duels[i] = Object.assign(store.duels[i], d); else store.duels.unshift(d);
    store.duels = store.duels.slice(0, 15);
    save();
  }
  const duelEntry = (code) => store.duels.find((d) => d.code === code);

  // Validiert eine empfangene Frage (Daten kommen vom anderen Handy).
  function cleanQuestion(q) {
    if (!q || typeof q !== "object") return null;
    const str = (v) => (typeof v === "string" ? v.slice(0, 300) : "");
    const type = ["map", "mc", "type", "name"].includes(q.type) ? q.type : null;
    if (!type) return null;
    const out = { key: str(q.key), type, meta: str(q.meta), prompt: str(q.prompt), title: str(q.title), correct: str(q.correct), hard: !!q.hard, cat: str(q.cat) };
    if (type === "map" || type === "name") {
      if (!byTopo.has(q.target)) return null;
      out.target = q.target;
      out.region = REGION_VIEW[q.region] ? q.region : "WORLD";
    }
    if (Array.isArray(q.options)) out.options = q.options.slice(0, 4).map(str);
    if (Array.isArray(q.answers)) out.answers = q.answers.slice(0, 12).map(str);
    if (q.visual && typeof q.visual === "object") out.visual = { kind: str(q.visual.kind), flag: str(q.visual.flag).slice(0, 8), topo: byTopo.has(q.visual.topo) ? q.visual.topo : "" };
    if (KNOWN_IMG.has(q.img)) out.img = q.img;
    if (KNOWN_IMG.has(q.revealImg)) out.revealImg = q.revealImg;
    out.reveal = str(q.reveal);
    out.revealCaption = str(q.revealCaption);
    if (type === "mc" && (!out.options || !out.options.includes(out.correct))) return null;
    return out;
  }

  async function createOnlineDuel(settings, n) {
    const questions = makeRound(settings, n, { learn: false });
    if (!questions.length) return toast("Keine Fragen für diese Auswahl.");
    const code = newCode();
    render(`<div class="center connecting"><div class="spinner big"></div><p>Duell wird erstellt …</p></div>`);
    try {
      const broker = await openDuelChannel(code, 0, () => {});
      const game = { v: 2, code, settings, questions, host: { id: store.uid, name: store.name }, created: Date.now() };
      await publish("game", game);
      await publish(`p/${store.uid}`, { id: store.uid, name: store.name, i: 0, score: 0, right: 0, done: false, j: Date.now(), t: Date.now() });
      saveDuel({ code, broker, role: "host", created: Date.now(), label: duelLabel(settings, n), opp: null, finished: false });
      const c = conn; conn = null; await endGracefully(c.client);
      enterDuel(code, broker);
    } catch (e) {
      render(`<div class="center connecting"><div class="big-emoji">📡</div><p>${esc(e.message)}</p><button class="primary-btn" id="retry">Nochmal versuchen</button><button class="ghost-btn" id="back">Zurück</button></div>`);
      on("#retry", "click", () => createOnlineDuel(settings, n));
      on("#back", "click", () => backToSetup(settings));
    }
  }
  function duelLabel(settings, n) {
    const c = settings.cat === "mix" ? MIX : groupInfo(settings.cat) ? { icon: groupInfo(settings.cat).icon, name: groupInfo(settings.cat).name } : catInfo(settings.cat);
    return `${c.icon} ${c.name}${isGeo(settings.cat) ? " · " + regionInfo(settings.region).name : ""} · ${n} Fragen`;
  }

  // Zentrale Duell-Ansicht: verbindet, liest den Spielstand und zeigt je nach Stand
  // Einladung, Spiel, Warten oder Ergebnis.
  async function enterDuel(code, broker = 0) {
    render(`<div class="center connecting"><div class="spinner big"></div><p>Verbinde mit dem Duell …</p></div>`);
    const D = { code, game: null, players: {}, me: store.uid, view: null, rematch: null, timedOut: false };
    const others = () => Object.values(D.players).filter((p) => p.id !== D.me);
    const meP = () => D.players[D.me];
    const oppOf = () => D.game.host.id === D.me
      ? others().sort((a, b) => (a.j || 0) - (b.j || 0))[0] || null
      : others().find((p) => p.id === D.game.host.id) || null;
    const myJoin = () => meP()?.j || Date.now();
    const refresh = () => {
      if (!D.ready || !conn || conn.code !== code) return;
      route();
    };
    try {
      const used = await openDuelChannel(code, +broker || 0, (sub, data) => {
        if (data === null) { if (sub.startsWith("p/")) delete D.players[sub.slice(2)]; refresh(); return; }
        if (sub === "game" && !D.game) {
          const qs = Array.isArray(data.questions) ? data.questions.map(cleanQuestion).filter(Boolean) : [];
          if (!qs.length) return;
          D.game = { settings: data.settings || {}, questions: qs, host: data.host || {}, created: data.created };
        } else if (sub.startsWith("p/")) {
          const id = sub.slice(2);
          if (!data || data.id !== id) return;
          D.players[id] = { id, name: String(data.name || "Gast").slice(0, 16), i: +data.i || 0, score: +data.score || 0, right: +data.right || 0, done: !!data.done, j: +data.j || +data.t || 0 };
        } else if (sub === "rematch" && data?.code) {
          D.rematch = { code: String(data.code).slice(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, ""), by: String(data.by || ""), byName: String(data.byName || "").slice(0, 16), broker: +data.broker || 0 };
          if (D.view === "result") D.rematchChanged = true;
        }
        refresh();
      });
      broker = used;
      D.ready = true;
      setTimeout(() => route());
      setTimeout(() => { D.timedOut = true; if (conn?.code === code && !D.game) route(); }, 6000);
    } catch (e) {
      render(`<div class="center connecting"><div class="big-emoji">📡</div><p>${esc(e.message)}</p><button class="primary-btn" id="retry">Nochmal versuchen</button><button class="ghost-btn" id="back">Zu den Duellen</button></div>`);
      on("#retry", "click", () => enterDuel(code, broker));
      on("#back", "click", duels);
      return;
    }

    let started = false;
    let waitTimer = null;

    function route() {
      if (!D.game) {
        if (!D.timedOut || D.view === "missing") return; // gespeicherte Daten kommen meist sofort
        D.view = "missing";
        render(`<div class="center connecting"><div class="big-emoji">🤷</div><h2>Duell nicht gefunden</h2><p class="muted">Prüfe den Code <b>${esc(code)}</b>. Vielleicht ist das Duell schon abgelaufen.</p>
          <button class="primary-btn" id="retry">Nochmal versuchen</button><button class="ghost-btn" id="back">Zu den Duellen</button></div>`);
        on("#retry", "click", () => enterDuel(code, broker));
        on("#back", "click", () => { closeConn(); duels(); });
        return;
      }
      const isHost = D.game.host.id === D.me;
      const opp = oppOf();
      const entry = duelEntry(code);
      // Beitreten (zweiter Spieler)
      if (!isHost) {
        // Falls zwei gleichzeitig beigetreten sind: wer später kam, gibt den Platz frei.
        const mine = meP();
        const rivals = others().filter((p) => p.id !== D.game.host.id);
        if (mine && rivals.some((r) => r.j && mine.j && r.j < mine.j) && !mine.i) {
          conn.client.publish(`${TOPIC(code)}/p/${D.me}`, "", { qos: 1, retain: true });
          delete D.players[D.me];
          D.full = true;
        }
      }
      if (!isHost && (!meP() || D.full)) {
        const taken = others().filter((p) => p.id !== D.game.host.id);
        if (taken.length) {
          render(`<div class="center connecting"><div class="big-emoji">🚫</div><h2>Duell ist schon voll</h2><p class="muted">Hier spielen bereits zwei Personen.</p><button class="primary-btn" id="back">Zu den Duellen</button></div>`);
          on("#back", "click", () => { closeConn(); duels(); });
          return;
        }
        if (!store.name) return askName(() => route());
        if (D.joiningSent) return;
        D.joiningSent = true;
        const joinT = Date.now();
        publish(`p/${D.me}`, { id: D.me, name: store.name, i: 0, score: 0, right: 0, done: false, j: joinT, t: joinT });
        D.players[D.me] = { id: D.me, name: store.name, i: 0, score: 0, right: 0, done: false, j: joinT };
      }
      const n = D.game.questions.length;
      saveDuel({ code, broker, role: isHost ? "host" : "guest", created: entry?.created || D.game.created || Date.now(), label: duelLabel(D.game.settings, n), opp: opp?.name || entry?.opp || null, finished: !!(meP()?.done && opp?.done), myScore: meP()?.score || 0, oppScore: opp?.score || 0 });
      if (D.view === "play") { updateVersusLive(); return; }
      const me = meP();
      if (me?.done) return showWaitOrResult(opp);
      if (isHost && !opp && !started) return showInvite();
      if (D.view === "invite" && opp) toast(`${opp.name} ist beigetreten! 🎉`);
      if (!started) return startPlay(me?.i || 0);
    }

    function showInvite() {
      D.view = "invite";
      const link = inviteLink(code, broker);
      render(`<div class="topbar">${backBtn("duelle")}<h2>Freund einladen</h2></div>
        <div class="code-box">
          <div class="muted">Duell-Code</div><div class="code">${esc(code)}</div>
          <p class="muted">${esc(duelLabel(D.game.settings, D.game.questions.length))}</p>
          <div class="btn-row"><button class="primary-btn" id="share">📤 Einladung senden</button><button class="secondary-btn" id="copy">🔗 Link kopieren</button></div>
          <div class="status-line"><div class="spinner"></div><span>Warte auf deinen Freund …</span></div>
        </div>
        <p class="hint center">Dein Freund öffnet den Link und ist direkt im Duell. Du kannst die App ruhig verlassen – das Duell bleibt bestehen und erscheint unter „Duelle“.</p>
        <div class="btn-row"><button class="secondary-btn" id="playnow">Schon mal selbst spielen</button></div>`);
      bindBack({ duelle: () => { closeConn(); duels(); } });
      on("#share", "click", () => shareInvite(code, link));
      on("#copy", "click", () => copyText(link));
      on("#playnow", "click", () => startPlay(meP()?.i || 0));
    }

    function versusHtml() {
      const me = meP() || { name: store.name, score: 0 };
      const opp = oppOf();
      return `<div class="versus"><div class="p active"><span>${esc(me.name)}</span><span>${me.score}</span></div>
        <div class="p"><span>${opp ? `${esc(opp.name)} ${opp.done ? "✅" : `${opp.i}/${D.game.questions.length}`}` : "Wartet …"}</span><span>${opp ? opp.score : "–"}</span></div></div>`;
    }
    function updateVersusLive() {
      const el = app.querySelector(".versus");
      if (el) el.outerHTML = versusHtml();
    }

    function startPlay(from) {
      started = true;
      D.view = "play";
      const qs = D.game.questions;
      ensureImages(qs.flatMap((q) => [q.img, q.revealImg])).then(() => qs.forEach((q) => { preload(q.img); preload(q.revealImg); }));
      const me = meP() || { score: 0, right: 0 };
      const st = { i: from, score: me.score || 0, right: me.right || 0 };
      const next = () => {
        if (st.i >= qs.length) {
          const fin = { id: D.me, name: store.name, i: st.i, score: st.score, right: st.right, done: true, j: myJoin(), t: Date.now() };
          publish(`p/${D.me}`, fin);
          D.players[D.me] = fin;
          store.xp += Math.round(st.score / 10);
          save();
          D.view = null;
          return route();
        }
        const q = qs[st.i];
        const limit = timeLimitFor(q);
        render(`<div class="game">${versusHtml()}<div class="qhost game"></div></div>`);
        renderQuestion(app.querySelector(".qhost"), q, {
          timeLimit: limit, autoNext: true, nextLabel: st.i + 1 >= qs.length ? "Fertig" : "Weiter",
          onAnswer: ({ correct, ms }) => {
            recordDuel(q.cat || D.game.settings.cat, correct);
            st.score += pointsFor(correct, ms, limit);
            if (correct) st.right++;
            const p = { id: D.me, name: store.name, i: st.i + 1, score: st.score, right: st.right, done: false, j: myJoin(), t: Date.now() };
            D.players[D.me] = p;
            publish(`p/${D.me}`, p);
            updateVersusLive();
          },
          onNext: () => { st.i++; next(); },
        });
      };
      let c = from === 0 ? 3 : 0;
      const tick = () => {
        if (c <= 0) return next();
        render(`<div class="countdown">${c}</div>`);
        c--;
        setTimeout(tick, 750);
      };
      tick();
    }

    function showWaitOrResult(opp) {
      const me = meP();
      const n = D.game.questions.length;
      clearTimeout(waitTimer);
      if (!opp || !opp.done) {
        D.view = "wait";
        render(`<div class="topbar">${backBtn("duelle")}<h2>Duell</h2></div>${versusHtml()}
          <div class="handoff"><div class="spinner big"></div><h2>Du bist fertig!</h2>
          <p class="muted">${opp && opp.i > 0 ? `${esc(opp.name)} ist bei Frage ${Math.min(opp.i + 1, n)} von ${n} …` : `${opp ? esc(opp.name) : "Dein Freund"} hat noch nicht angefangen.`}</p>
          <p class="hint">Du kannst die App verlassen – das Ergebnis siehst du später unter „Duelle“.</p>
          ${!opp ? `<button class="primary-btn" id="share">📤 Einladung nochmal senden</button>` : ""}</div>`);
        bindBack({ duelle: () => { closeConn(); duels(); } });
        on("#share", "click", () => shareInvite(code, inviteLink(code, broker)));
        return;
      }
      if (D.view === "result" && !D.rematchChanged) return;
      D.view = "result";
      D.rematchChanged = false;
      const win = me.score > opp.score, tie = me.score === opp.score;
      saveDuel({ code, finished: true, myScore: me.score, oppScore: opp.score, opp: opp.name, won: win ? 1 : tie ? 0 : -1 });
      const rm = D.rematch;
      const rmMine = rm && rm.by === D.me;
      render(`<div class="result">
        <div class="confetti" aria-hidden="true">${win ? Array.from({ length: 24 }, (_, i) => `<i style="--i:${i}"></i>`).join("") : ""}</div>
        <div class="big-emoji">${tie ? "🤝" : win ? "🏆" : "😅"}</div>
        <h2>${tie ? "Unentschieden!" : win ? "Du gewinnst!" : `${esc(opp.name)} gewinnt!`}</h2></div>
        <div class="podium">
          <div class="p center ${win ? "win" : ""}"><span>${esc(me.name)}</span><b>${me.score}</b><span>${me.right}/${n} richtig</span></div>
          <div class="p center ${!win && !tie ? "win" : ""}"><span>${esc(opp.name)}</span><b>${opp.score}</b><span>${opp.right}/${n} richtig</span></div>
        </div>
        <div class="spacer"></div>
        <div class="btn-row">
          ${rm && !rmMine ? `<button class="primary-btn" id="accept">⚔️ Revanche von ${esc(rm.byName)} annehmen</button>` : ""}
          ${!rm ? `<button class="primary-btn" id="rematch">⚔️ Revanche</button>` : ""}
          ${rmMine ? `<button class="primary-btn" id="open-rm">Zur Revanche</button>` : ""}
          <button class="ghost-btn" id="menu">Zu den Duellen</button></div>`);
      on("#menu", "click", () => { closeConn(); duels(); });
      on("#accept", "click", () => { closeConn(); enterDuel(rm.code, rm.broker); });
      on("#open-rm", "click", () => { closeConn(); enterDuel(rm.code, rm.broker); });
      on("#rematch", "click", async (e) => {
        e.currentTarget.disabled = true;
        const settings = D.game.settings;
        const questions = makeRound(settings, n, { learn: false });
        const newC = newCode();
        try {
          const old = conn;
          const { client, broker: b2 } = await connectBroker(broker);
          const nc = { client, code: newC };
          await publish("game", { v: 2, code: newC, settings, questions, host: { id: D.me, name: store.name }, created: Date.now() }, true, nc);
          await publish(`p/${D.me}`, { id: D.me, name: store.name, i: 0, score: 0, right: 0, done: false, j: Date.now(), t: Date.now() }, true, nc);
          await publish("rematch", { code: newC, by: D.me, byName: store.name, broker: b2 }, true, old);
          saveDuel({ code: newC, broker: b2, role: "host", created: Date.now(), label: duelLabel(settings, n), opp: opp.name, finished: false });
          await endGracefully(client);
          closeConn();
          enterDuel(newC, b2);
        } catch (err) {
          toast(err.message);
          e.currentTarget.disabled = false;
        }
      });
    }

  }

  async function shareInvite(code, link) {
    const text = `⚔️ ${store.name || "Ich"} fordert dich bei Scientia heraus! Tippe auf den Link, um mitzuspielen (Code ${code}):`;
    if (navigator.share) {
      try { await navigator.share({ title: "Scientia-Duell", text, url: link }); return; } catch (e) { if (e?.name === "AbortError") return; }
    }
    copyText(link);
  }
  function copyText(text) {
    (navigator.clipboard?.writeText(text) || Promise.reject()).then(
      () => toast("Link kopiert – jetzt z. B. in WhatsApp einfügen."),
      () => toast(text, 9000)
    );
  }

  // ================= Duelle (Reiter) =================
  function duelRow(d) {
    const status = d.finished ? (d.won === 1 ? "🏆 Gewonnen" : d.won === -1 ? "😅 Verloren" : d.won === 0 ? "🤝 Unentschieden" : "Beendet") : d.opp ? "Läuft" : "Wartet auf Freund";
    return `<button class="duel-row" data-duel="${esc(d.code)}" data-b="${+d.broker || 0}">
      <span class="dr-vs">${d.opp ? esc(d.opp.slice(0, 1).toUpperCase()) : "?"}</span>
      <span class="dr-body"><b>${d.opp ? `gegen ${esc(d.opp)}` : `Code ${esc(d.code)}`}</b><small>${esc(d.label || "")}</small></span>
      <span class="dr-status ${d.finished ? "" : "live"}">${status}${d.finished ? `<small>${d.myScore || 0} : ${d.oppScore || 0}</small>` : ""}</span></button>`;
  }
  function bindDuelRows() {
    on("[data-duel]", "click", (e) => enterDuel(e.currentTarget.dataset.duel, +e.currentTarget.dataset.b));
  }
  function duels() {
    closeConn();
    render(`<div class="page-head"><h1>Duelle</h1><p class="muted">Spiele gegen deine Freunde – gleiche Fragen, wer ist besser?</p></div>
      <div class="duel-actions">
        <button class="action-tile" id="new"><span>⚔️</span><b>Neues Duell</b><small>Thema wählen &amp; Link schicken</small></button>
        <button class="action-tile" id="join"><span>🔑</span><b>Code eingeben</b><small>Einem Duell beitreten</small></button>
      </div>
      <div class="section-title">Meine Duelle</div>
      ${store.duels.length ? `<div class="duel-list">${store.duels.map(duelRow).join("")}</div>` : `<div class="empty"><span>🤝</span><p>Noch keine Duelle. Fordere einen Freund heraus!</p></div>`}`, { tab: "duelle" });
    on("#new", "click", pickDuelTopic);
    on("#join", "click", joinDialog);
    bindDuelRows();
  }
  function pickDuelTopic() {
    render(`<div class="topbar">${backBtn("duelle")}<h2>Thema fürs Duell</h2></div>
      ${GROUPS.map((g) => `<div class="section-title">${g.icon} ${esc(g.name)}</div><div class="mini-topics">
        ${g.categories.map((c) => `<button class="mini-topic photo" data-cat="${c.id}" style="${photoStyle(c.cover, c.color)}"><span>${c.icon}</span><b>${esc(c.name)}</b></button>`).join("")}
      </div>`).join("")}`, { tab: "duelle" });
    bindBack();
    on("[data-cat]", "click", (e) => setup(e.currentTarget.dataset.cat, "duelle"));
  }
  function joinDialog(prefill = "") {
    const d = dialog(`<p class="dialog-title">Duell-Code eingeben</p>
      <form id="join-form"><input class="text-input code-input" id="code" maxlength="6" autocomplete="off" autocapitalize="characters" placeholder="ABC123" value="${esc(typeof prefill === "string" ? prefill : "")}" /></form>
      <div class="dialog-btns"><button class="secondary-btn" data-a="no">Abbrechen</button><button class="primary-btn" data-a="ok">Beitreten</button></div>`, (a, el) => {
      const code = el.querySelector("#code").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (code.length < 5) { toast("Der Code hat 6 Zeichen."); return false; }
      setTimeout(() => askName(() => enterDuel(code, 0)));
    });
    d.querySelector("#join-form").addEventListener("submit", (e) => { e.preventDefault(); d.querySelector("[data-a=ok]").click(); });
  }

  // ================= Fortschritt =================
  // Zwei getrennte Bereiche: Lernfortschritt beim Üben und Bilanz in Duellen.
  function stats(view = store.last.statsView || "solo") {
    store.last.statsView = view;
    save();
    const seg = `<div class="segmented" role="tablist">
        <button role="tab" data-view="solo" aria-selected="${view === "solo"}">🎯 Üben</button>
        <button role="tab" data-view="duel" aria-selected="${view === "duel"}">⚔️ Duelle</button></div>`;
    if (view === "duel") return duelStatsView(seg);
    const s = { region: store.last.statsRegion || "WORLD" };
    const total = Object.values(store.stats);
    const sure = total.filter((x) => x.box >= 3).length;
    const answered = total.reduce((a, x) => a + x.c + x.w, 0);
    const right = total.reduce((a, x) => a + x.c, 0);
    render(`<div class="topbar">${backBtn("start")}<h2>Fortschritt</h2></div>
      ${seg}
      <p class="hint">Hier zählen nur deine Übungsrunden. Duelle verändern dein Lernsystem nicht.</p>
      <div class="stat-tiles">
        <div class="stat-tile"><b>${total.length}</b><span>Fragen gesehen</span></div>
        <div class="stat-tile"><b>${sure}</b><span>sitzen sicher</span></div>
        <div class="stat-tile"><b>${answered ? Math.round((right / answered) * 100) : 0}%</b><span>richtig beim Üben</span></div>
      </div>
      <div class="section-title">Weltkarte – Länder finden</div>
      ${chips("region", window.REGIONS.map((r) => ({ v: r.id, l: `${r.icon} ${r.name}` })), s.region)}
      <div class="map-wrap stats-map"></div>
      <div class="map-legend"><span><i style="background:var(--good)"></i>sitzt</span><span><i style="background:var(--warn)"></i>wird besser</span><span><i style="background:var(--bad)"></i>üben</span><span><i style="background:var(--land-active)"></i>noch nicht gefragt</span></div>
      ${GROUPS.map((g) => `<div class="section-title">${g.icon} ${esc(g.name)}</div>${g.categories.map((c) => statRow(c)).join("")}`).join("")}
      <div class="btn-row"><button class="ghost-btn danger-text" id="reset">Lernfortschritt zurücksetzen</button></div>`, { tab: "start" });
    bindBack();
    on("[data-view]", "click", (e) => stats(e.currentTarget.dataset.view));
    const color = (topo) => {
      const c = byTopo.get(topo);
      const st = c && store.stats[`map:${c.iso2}`];
      if (!st) return "var(--land-active)";
      return st.box >= 3 ? "var(--good)" : st.box >= 1 ? "var(--warn)" : "var(--bad)";
    };
    let map = null;
    const drawMap = () => {
      map?.destroy();
      map = new WorldMap(app.querySelector(".stats-map"), { region: s.region, colorFn: color, onPick: (topo) => {
        const c = byTopo.get(topo);
        const st = store.stats[`map:${c.iso2}`];
        map.showLabel(`${c.flag} ${c.name}${st ? ` · ${st.c}× richtig, ${st.w}× falsch` : " · noch nicht gefragt"}`);
      } });
    };
    s.onChange = () => { store.last.statsRegion = s.region; save(); drawMap(); };
    bindChips(s);
    drawMap();
    cleanup.push(() => map?.destroy());
    on("#reset", "click", () => askConfirm("Wirklich deinen gesamten Lernfortschritt beim Üben löschen? Deine Duelle bleiben erhalten.", "Löschen", () => {
      store.stats = {};
      save();
      stats("solo");
    }));
  }

  function duelStatsView(seg) {
    const fin = store.duels.filter((d) => d.finished && d.won !== undefined);
    const won = fin.filter((d) => d.won === 1).length;
    const lost = fin.filter((d) => d.won === -1).length;
    const tie = fin.filter((d) => d.won === 0).length;
    const ds = store.duelStats;
    // Bilanz je Gegner
    const opp = {};
    for (const d of fin) {
      const k = d.opp || "Unbekannt";
      const o = (opp[k] ||= { n: 0, w: 0, l: 0, t: 0 });
      o.n++;
      if (d.won === 1) o.w++; else if (d.won === -1) o.l++; else o.t++;
    }
    const oppRows = Object.entries(opp).sort((a, b) => b[1].n - a[1].n);
    const catRows = Object.entries(ds.cats).filter(([, v]) => v.a).sort((a, b) => b[1].a - a[1].a);
    const catName = (id) => { const c = id === "mix" ? MIX : groupInfo(id) || catInfo(id); return `${c.icon} ${c.name}`; };
    render(`<div class="topbar">${backBtn("start")}<h2>Fortschritt</h2></div>
      ${seg}
      <p class="hint">Hier zählen nur Duelle gegen Freunde – getrennt von deinen Übungsrunden.</p>
      <div class="stat-tiles four">
        <div class="stat-tile"><b>${fin.length}</b><span>Online-Duelle</span></div>
        <div class="stat-tile good"><b>${won}</b><span>Siege</span></div>
        <div class="stat-tile bad"><b>${lost}</b><span>Niederlagen</span></div>
        <div class="stat-tile"><b>${tie}</b><span>Unentschieden</span></div>
      </div>
      <div class="stat-row"><span class="emoji">🎯</span><div class="info"><b>Trefferquote in Duellen</b>
        <div class="muted small">${ds.r} von ${ds.a} Fragen richtig (online und am selben Handy)</div>
        <div class="bar"><div class="g" style="width:${ds.a ? (ds.r / ds.a) * 100 : 0}%"></div></div></div>
        <span class="num">${ds.a ? Math.round((ds.r / ds.a) * 100) : 0}%</span></div>
      <div class="section-title">Bilanz gegen deine Freunde</div>
      ${oppRows.length ? oppRows.map(([name, o]) => `<div class="stat-row"><span class="dr-vs">${esc(name.slice(0, 1).toUpperCase())}</span><div class="info"><b>${esc(name)}</b>
        <div class="muted small">${o.n} ${o.n === 1 ? "Duell" : "Duelle"} · ${o.w} gewonnen · ${o.l} verloren${o.t ? ` · ${o.t} unentschieden` : ""}</div>
        <div class="bar"><div class="g" style="width:${(o.w / o.n) * 100}%"></div><div class="r" style="width:${(o.l / o.n) * 100}%"></div></div></div>
        <span class="num">${o.w}:${o.l}</span></div>`).join("") : `<div class="empty"><span>⚔️</span><p>Noch keine abgeschlossenen Online-Duelle.</p></div>`}
      ${catRows.length ? `<div class="section-title">Trefferquote nach Thema (Duelle)</div>${catRows.map(([id, v]) => `<div class="stat-row"><div class="info"><b>${esc(catName(id))}</b>
        <div class="muted small">${v.r} von ${v.a} richtig</div><div class="bar"><div class="g" style="width:${(v.r / v.a) * 100}%"></div></div></div>
        <span class="num">${Math.round((v.r / v.a) * 100)}%</span></div>`).join("")}` : ""}
      ${store.localDuels.length ? `<div class="section-title">Zu zweit am selben Handy</div>${store.localDuels.slice(0, 10).map((m) => {
        const w = m.scores[0] === m.scores[1] ? "🤝" : "🏆 " + esc(m.scores[0] > m.scores[1] ? m.names[0] : m.names[1]);
        return `<div class="stat-row"><span class="emoji">📱</span><div class="info"><b>${esc(m.names[0])} ${m.scores[0]} : ${m.scores[1]} ${esc(m.names[1])}</b>
          <div class="muted small">${esc(m.label || "")} · ${new Date(m.t).toLocaleDateString("de-DE")}</div></div><span class="num">${w}</span></div>`;
      }).join("")}` : ""}
      <div class="btn-row"><button class="ghost-btn danger-text" id="reset-duel">Duell-Statistik zurücksetzen</button></div>`, { tab: "start" });
    bindBack();
    on("[data-view]", "click", (e) => stats(e.currentTarget.dataset.view));
    on("#reset-duel", "click", () => askConfirm("Duell-Statistik und Duell-Liste löschen? Dein Lernfortschritt bleibt erhalten.", "Löschen", () => {
      store.duelStats = { a: 0, r: 0, cats: {} };
      store.duels = [];
      store.localDuels = [];
      save();
      stats("duel");
    }));
  }
  function statRow(c) {
    const pool = buildPool({ cat: c.id, region: "WORLD", diff: "hard" });
    let good = 0, bad = 0, seen = 0;
    for (const it of pool) {
      const s = store.stats[it.key];
      if (!s) continue;
      seen++;
      if (s.box >= 3) good++; else if (s.box === 0) bad++;
    }
    const n = pool.length || 1;
    return `<div class="stat-row"><span class="emoji">${c.icon}</span><div class="info"><b>${esc(c.name)}</b>
      <div class="muted small">${seen} von ${pool.length} gesehen · ${good} sitzen · ${bad} zum Üben</div>
      <div class="bar"><div class="g" style="width:${(good / n) * 100}%"></div><div class="r" style="width:${(bad / n) * 100}%"></div></div></div>
      <span class="num">${Math.round((good / n) * 100)}%</span></div>`;
  }

  const TABS = {
    start: home,
    home,
    geografie: () => openGroup("geografie"),
    geschichte: () => openGroup("geschichte"),
    wissen: () => openGroup("wissen"),
    duelle: duels,
    stats: () => stats(),
  };

  // ================= Start der App =================
  const params = new URLSearchParams(location.search);
  const joinCode = (params.get("duell") || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  const joinBroker = +params.get("s") || 0;
  if (joinCode) {
    history.replaceState(null, "", location.pathname);
    askName(() => enterDuel(joinCode, joinBroker));
    if (!store.name) render(`<div class="center connecting"><div class="big-emoji">⚔️</div><h2>Du wurdest herausgefordert!</h2><p class="muted">Gib deinen Namen ein, um mitzuspielen.</p><button class="primary-btn" id="nm">Mitspielen</button></div>`);
    on("#nm", "click", () => askName(() => enterDuel(joinCode, joinBroker)));
  } else home();

  if ("serviceWorker" in navigator && location.protocol === "https:" && !window.SCIENTIA_NO_SW) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  window.__scientia = { store, buildPool, makeRound, makeQuestion, checkTyped, cleanQuestion };
})();
