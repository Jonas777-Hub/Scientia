/* Scientia – spielerisch Wissen lernen. */
(() => {
  "use strict";

  const app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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

  // ================= Speicher & Lernsystem =================
  const STORE_KEY = "scientia.v1";
  const store = (() => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  })();
  store.stats = store.stats || {};
  store.xp = store.xp || 0;
  store.name = store.name || "";
  store.last = store.last || {};
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* privater Modus */ }
  }

  // Leitner-Boxen: falsch beantwortete Fragen landen in Box 0 und kommen oft dran,
  // richtig beantwortete wandern nach oben und kommen seltener.
  const BOX_WEIGHT = [10, 6, 3.5, 2, 1.1, 0.5];
  const UNSEEN_WEIGHT = 5;
  function itemWeight(key) {
    const s = store.stats[key];
    if (!s) return UNSEEN_WEIGHT;
    return BOX_WEIGHT[Math.min(s.box, 5)];
  }
  function record(key, correct) {
    const s = store.stats[key] || (store.stats[key] = { c: 0, w: 0, box: 0 });
    if (correct) { s.c++; s.box = Math.min(5, s.box + 1); } else { s.w++; s.box = 0; }
    s.t = Date.now();
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

  // ================= Kategorien =================
  const GEO_MODES = [
    { id: "map", name: "Länder auf der Karte", short: "Karte", icon: "🗺️", color: "#2bb3c9", desc: "Tippe das gesuchte Land an" },
    { id: "capital", name: "Hauptstädte", short: "Hauptstädte", icon: "🏛️", color: "#c9822b", desc: "Leicht: mit Ländername · Schwer: nur Umriss" },
    { id: "flag", name: "Flaggen", short: "Flaggen", icon: "🚩", color: "#e5484d", desc: "Welches Land hat diese Flagge?" },
  ];
  const QUIZ = window.QUIZ_CATEGORIES;
  const MIX = { id: "mix", name: "Bunter Mix", icon: "🎲", color: "#7c5cff" };
  const isGeo = (cat) => GEO_MODES.some((g) => g.id === cat);
  const catInfo = (id) => GEO_MODES.find((g) => g.id === id) || QUIZ.find((q) => q.id === id) || MIX;
  const regionInfo = (id) => window.REGIONS.find((r) => r.id === id) || window.REGIONS[0];

  const COUNTRIES = window.COUNTRIES;
  const byTopo = new Map(COUNTRIES.map((c) => [c.topo, c]));
  const byIso = new Map(COUNTRIES.map((c) => [c.iso2, c]));
  const countriesIn = (region) => (region === "WORLD" ? COUNTRIES : COUNTRIES.filter((c) => c.regions.includes(region)));

  // Fragen-Pool: jedes Element hat einen festen Schlüssel für das Lernsystem.
  function buildPool(settings) {
    const { cat, region, diff } = settings;
    if (isGeo(cat)) {
      const prefix = { map: "map", capital: "cap", flag: "flag" }[cat];
      return countriesIn(region).map((c) => ({ key: `${prefix}:${c.iso2}`, kind: cat, iso: c.iso2 }));
    }
    const cats = cat === "mix" ? QUIZ : QUIZ.filter((q) => q.id === cat);
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
    let cands = sameRegion ? COUNTRIES.filter((c) => c !== country && c.regions.some((r) => country.regions.includes(r))) : [];
    cands = shuffle(cands);
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

  // Erzeugt eine fertige, serialisierbare Frage (wichtig für Online-Duelle).
  function makeQuestion(item, settings) {
    const hard = settings.diff === "hard";
    if (item.kind === "map") {
      const c = byIso.get(item.iso);
      return { key: item.key, type: "map", region: settings.region, target: c.topo, meta: hard ? "Tippe auf der Karte an · Schwer" : "Tippe auf der Karte an", prompt: c.name, title: `Karte: ${c.name}`, visual: hard ? null : { kind: "flag-small", flag: c.flag }, hard };
    }
    if (item.kind === "capital") {
      const c = byIso.get(item.iso);
      const options = shuffle([c.capital, ...distractors(c, "capital", 3, hard)]);
      return {
        key: item.key, type: "mc", meta: hard ? "Hauptstädte · Schwer" : "Wie heißt die Hauptstadt?",
        prompt: hard ? "Wie heißt die Hauptstadt dieses Landes?" : c.name,
        title: `Hauptstadt: ${c.flag} ${c.name}`,
        visual: hard ? { kind: "outline", topo: c.topo } : { kind: "outline-small", topo: c.topo, flag: c.flag },
        options, correct: c.capital, reveal: hard ? `${c.flag} ${c.name}` : null,
      };
    }
    if (item.kind === "flag") {
      const c = byIso.get(item.iso);
      const options = shuffle([c.name, ...distractors(c, "name", 3, hard)]);
      return {
        key: item.key, type: "mc", meta: "Flaggen", prompt: "Zu welchem Land gehört diese Flagge?", title: `Flagge ${c.flag}`,
        visual: { kind: "flag", flag: c.flag }, options, correct: c.name, reveal: `Hauptstadt: ${c.capital}`,
      };
    }
    const q = item.q;
    const qc = catInfo(item.cat);
    return {
      key: item.key, type: "mc", meta: `${qc.icon} ${qc.name}`, prompt: q[0],
      options: shuffle(q.slice(1, 5)), correct: q[1],
    };
  }

  function makeRound(settings, n, { learn = true } = {}) {
    const pool = buildPool(settings);
    const picked = learn ? weightedSample(pool, n, (it) => itemWeight(it.key)) : shuffle(pool).slice(0, n);
    return picked.map((it) => makeQuestion(it, settings));
  }

  // ================= Karte =================
  const FEATURES = topojson.feature(window.WORLD, window.WORLD.objects.countries).features
    .filter((f) => f.properties.name !== "Antarctica");
  const featByTopo = new Map(FEATURES.map((f) => [f.properties.name, f]));

  // Teilt Mehrfach-Polygone und behält die großen Teile (z. B. ohne Alaska-Inseln, Hawaii …)
  function mainParts(feature, threshold = 0.1) {
    const g = feature.geometry;
    if (g.type !== "MultiPolygon") return feature;
    const polys = g.coordinates.map((coords) => ({ coords, area: d3.geoArea({ type: "Polygon", coordinates: coords }) }));
    const max = d3.max(polys, (p) => p.area);
    return { type: "Feature", properties: feature.properties, geometry: { type: "MultiPolygon", coordinates: polys.filter((p) => p.area >= max * threshold).map((p) => p.coords) } };
  }
  function largestPart(feature) { return mainParts(feature, 0.999); }

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
    const d = d3.geoPath(proj)(shape);
    return `<svg class="${cls}" viewBox="0 0 280 170" aria-hidden="true"><path d="${d}"/></svg>`;
  }

  class WorldMap {
    constructor(container, { region = "WORLD", onPick = null, colorFn = null, activeSet = null, markers = true } = {}) {
      this.showMarkers = markers;
      this.container = container;
      this.region = region;
      this.onPick = onPick;
      this.colorFn = colorFn;
      this.activeSet = activeSet || new Set(countriesIn(region).map((c) => c.topo));
      this.userTransform = WorldMap.saved[region] || d3.zoomIdentity;
      container.innerHTML = `<svg></svg><div class="map-label"></div>
        <div class="map-controls"><button data-z="in" aria-label="Hineinzoomen">+</button><button data-z="out" aria-label="Herauszoomen">−</button><button data-z="reset" aria-label="Ansicht zurücksetzen">⟲</button></div>`;
      this.svg = d3.select(container).select("svg");
      this.label = container.querySelector(".map-label");
      container.querySelector(".map-controls").addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        const t = this.svg.transition().duration(300);
        if (b.dataset.z === "in") this.zoom.scaleBy(t, 1.8);
        if (b.dataset.z === "out") this.zoom.scaleBy(t, 1 / 1.8);
        if (b.dataset.z === "reset") this.zoom.transform(t, d3.zoomIdentity);
        setTimeout(() => { this.userTransform = d3.zoom && d3.zoomTransform(this.svg.node()); WorldMap.saved[this.region] = this.userTransform; }, 320);
      });
      this.draw();
      this.ro = new ResizeObserver(() => {
        const r = container.getBoundingClientRect();
        if (Math.abs(r.width - this.w) > 2 || Math.abs(r.height - this.h) > 2) this.draw();
      });
      this.ro.observe(container);
    }
    destroy() { this.ro.disconnect(); }
    draw() {
      const r = this.container.getBoundingClientRect();
      const w = (this.w = Math.max(100, r.width));
      const h = (this.h = Math.max(100, r.height));
      const view = REGION_VIEW[this.region] || REGION_VIEW.WORLD;
      const proj = (view.proj || (() => d3.geoMercator()))();
      const fitObj = view.fit ? view.fit() : {
        type: "MultiPoint",
        coordinates: [view.box[0], view.box[1], [view.box[0][0], view.box[1][1]], [view.box[1][0], view.box[0][1]]],
      };
      proj.fitExtent([[6, 6], [w - 6, h - 6]], fitObj);
      const path = (this.path = d3.geoPath(proj));
      this.svg.attr("viewBox", `0 0 ${w} ${h}`).selectAll("*").remove();
      const g = (this.g = this.svg.append("g"));

      if (this.region === "WORLD") {
        g.append("path").datum({ type: "Sphere" }).attr("d", path).attr("fill", "var(--ocean)");
      }
      const active = this.activeSet;
      this.paths = g.append("g").selectAll("path").data(FEATURES).join("path")
        .attr("class", (f) => "country" + (active.has(f.properties.name) ? " active" : ""))
        .attr("d", path);

      // Kleine Länder bekommen einen antippbaren Punkt.
      // Im schweren Modus nur für winzige Staaten (Vatikan, Monaco …), die sonst nicht antippbar wären.
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
        if (!active.has(name) || !this.onPick) return;
        this.onPick(name);
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
      const cls = (f) => s[f.properties.name] || "";
      this.paths.classed("correct", (f) => cls(f) === "correct").classed("wrong", (f) => cls(f) === "wrong").classed("reveal", (f) => cls(f) === "reveal");
      this.markers.classed("correct", (f) => cls(f) === "correct").classed("wrong", (f) => cls(f) === "wrong").classed("reveal", (f) => cls(f) === "reveal");
    }
    showLabel(text) {
      this.label.textContent = text || "";
      this.label.classList.toggle("show", !!text);
    }
    // Zoomt so, dass Ziel und (optional) getipptes Land sichtbar sind.
    focus(topos) {
      const feats = topos.map((t) => featByTopo.get(t)).filter(Boolean).map((f) => mainParts(f, 0.2));
      if (!feats.length) return;
      const [[x0, y0], [x1, y1]] = this.path.bounds({ type: "FeatureCollection", features: feats });
      const dx = Math.max(x1 - x0, 20), dy = Math.max(y1 - y0, 20);
      // Unten liegt der Feedback-Kasten – Ziel daher in den oberen Bereich setzen.
      const usableH = Math.max(120, this.h - 150);
      const k = Math.max(1, Math.min(12, 0.7 / Math.max(dx / this.w, dy / usableH)));
      const t = d3.zoomIdentity.translate(this.w / 2, usableH / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
      this.svg.transition().duration(600).call(this.zoom.transform, t);
    }
    restoreView() {
      this.svg.transition().duration(400).call(this.zoom.transform, this.userTransform);
    }
  }

  WorldMap.saved = {};

  // ================= Bildschirme =================
  let cleanup = [];
  function render(html) {
    cleanup.forEach((fn) => fn());
    cleanup = [];
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }
  function toast(msg, ms = 2600) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), ms);
  }
  // Eigene Bestätigung (System-Dialoge sind in manchen Umgebungen gesperrt).
  function askConfirm(text, okLabel, onOk) {
    document.querySelector(".dialog-backdrop")?.remove();
    const d = document.createElement("div");
    d.className = "dialog-backdrop";
    d.innerHTML = `<div class="dialog" role="dialog" aria-modal="true"><p>${esc(text)}</p>
      <div class="dialog-btns"><button class="secondary-btn" data-a="no">Zurück</button><button class="primary-btn danger" data-a="yes">${esc(okLabel)}</button></div></div>`;
    d.addEventListener("click", (e) => {
      const a = e.target.closest("[data-a]")?.dataset.a;
      if (e.target === d || a === "no") d.remove();
      if (a === "yes") { d.remove(); onOk(); }
    });
    document.body.appendChild(d);
  }
  function on(sel, ev, fn) { app.querySelectorAll(sel).forEach((el) => el.addEventListener(ev, fn)); }
  const topbar = (title, back = "home") => `<div class="topbar"><button class="icon-btn" data-back="${back}" aria-label="Zurück">←</button><h2>${esc(title)}</h2></div>`;
  function bindBack(handlers = {}) {
    on("[data-back]", "click", (e) => {
      const target = e.currentTarget.dataset.back;
      (handlers[target] || ROUTES[target] || home)();
    });
  }

  function mastery(settings) {
    const pool = buildPool(settings);
    if (!pool.length) return 0;
    const m = pool.reduce((a, it) => a + Math.min(1, (store.stats[it.key]?.box || 0) / 3), 0);
    return m / pool.length;
  }

  // ---------- Start ----------
  function home() {
    const l = level(store.xp);
    const lo = xpForLevel(l), hi = xpForLevel(l + 1);
    const pct = Math.round(((store.xp - lo) / (hi - lo)) * 100);
    render(`
      <div class="hero"><div class="logo-mark">S</div><div><h1>Scientia</h1><p>Spielerisch Wissen sammeln</p></div></div>
      <div class="level-card">
        <div class="row"><strong>Level ${l}</strong><span>${store.xp} XP</span></div>
        <div class="xpbar"><div style="width:${pct}%"></div></div>
      </div>
      <div class="big-buttons">
        <button class="big-btn" data-go="practice"><span class="emoji">🎯</span><span><b>Üben</b><span class="sub">Allein lernen – Fehler kommen öfter dran</span></span></button>
        <button class="big-btn" data-go="duel"><span class="emoji">⚔️</span><span><b>1 gegen 1</b><span class="sub">Gegen Freunde spielen – online oder am selben Handy</span></span></button>
        <button class="big-btn" data-go="stats"><span class="emoji">📈</span><span><b>Fortschritt</b><span class="sub">Was du schon kannst – und was noch nicht</span></span></button>
      </div>`);
    on("[data-go]", "click", (e) => ROUTES[e.currentTarget.dataset.go]());
  }

  // ---------- Kategorie-Auswahl ----------
  function categoryTiles(withMastery = true) {
    const tile = (c, settings) => {
      const m = withMastery ? Math.round(mastery(settings) * 100) : null;
      return `<button class="tile" data-cat="${c.id}" style="--tile-color:${c.color}">
        <span class="emoji">${c.icon}</span><b>${esc(c.name)}</b>
        ${m !== null ? `<span class="tag">${m}% gelernt</span><div class="meter"><div style="width:${m}%"></div></div>` : ""}
      </button>`;
    };
    return `
      <div class="section-title">Geografie</div>
      <div class="tiles">${GEO_MODES.map((g) => tile(g, { cat: g.id, region: "WORLD", diff: "easy" })).join("")}</div>
      <div class="section-title">Allgemeinwissen</div>
      <div class="tiles">${QUIZ.map((q) => tile(q, { cat: q.id, diff: "hard" })).join("")}${tile(MIX, { cat: "mix", diff: "hard" })}</div>`;
  }

  function practice() {
    render(`${topbar("Üben")}${categoryTiles(true)}`);
    bindBack();
    on("[data-cat]", "click", (e) => setup({ mode: "solo", cat: e.currentTarget.dataset.cat }));
  }

  // ---------- Einstellungen ----------
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
        state.onChange?.();
      });
    });
  }
  function settingsFields(s) {
    const geo = isGeo(s.cat);
    const diffHint = {
      map: "Leicht: mit Flagge und Punkten für kleine Länder · Schwer: nur der Name, kaum Hilfen",
      capital: "Leicht: Ländername wird angezeigt · Schwer: nur der Umriss des Landes",
      flag: "Leicht: Antworten aus der ganzen Welt · Schwer: ähnliche Länder aus derselben Region",
    }[s.cat] || "Leicht: einfache Fragen · Schwer: alle Fragen inkl. kniffliger";
    return `
      ${geo ? `<div class="field"><label class="lbl">Region</label>${chips("region", window.REGIONS.map((r) => ({ v: r.id, l: `${r.icon} ${r.name}` })), s.region)}</div>` : ""}
      <div class="field"><label class="lbl">Schwierigkeit</label>${chips("diff", [{ v: "easy", l: "🙂 Leicht" }, { v: "hard", l: "🔥 Schwer" }], s.diff)}<p class="hint">${diffHint}</p></div>`;
  }

  function setup(opts) {
    const c = catInfo(opts.cat);
    const last = store.last[opts.cat] || {};
    const s = { cat: opts.cat, region: last.region || "EU", diff: last.diff || "easy", n: last.n || 10 };
    if (!isGeo(s.cat)) s.region = "WORLD";
    const draw = () => {
      render(`${topbar(`${c.icon} ${c.name}`, "practice")}
        ${isGeo(s.cat) ? `<p class="muted">${esc(c.desc)}</p>` : ""}
        ${settingsFields(s)}
        <div class="field"><label class="lbl">Anzahl Fragen</label>${chips("n", [{ v: 10, l: "10" }, { v: 20, l: "20" }, { v: 30, l: "30" }], s.n)}</div>
        <div class="field"><p class="hint" id="poolinfo"></p></div>
        <div class="spacer"></div>
        <div class="btn-row"><button class="primary-btn" id="go">Los geht's!</button></div>`);
      bindBack();
      const info = () => {
        const pool = buildPool(s);
        const m = Math.round(mastery(s) * 100);
        app.querySelector("#poolinfo").textContent = `${pool.length} Fragen in diesem Bereich · ${m}% davon sitzen schon.`;
      };
      s.onChange = info;
      info();
      bindChips(s);
      on("#go", "click", () => {
        store.last[s.cat] = { region: s.region, diff: s.diff, n: s.n };
        save();
        const settings = { cat: s.cat, region: s.region, diff: s.diff };
        const questions = makeRound(settings, s.n);
        if (!questions.length) return toast("Keine Fragen für diese Auswahl.");
        runSolo(settings, questions);
      });
    };
    draw();
  }

  // ================= Quiz-Ablauf =================
  // Zeigt eine Frage an und ruft done({correct, ms, picked}) auf.
  function renderQuestion(host, q, { settings, timeLimit = 0, onAnswer, autoNext = false, nextLabel = "Weiter", onNext }) {
    const start = performance.now();
    let answered = false;
    let map = null;
    let timerId = null;

    const visual = (() => {
      const v = q.visual;
      if (!v) return "";
      if (v.kind === "flag") return `<div class="q-visual"><div class="flag">${v.flag}</div></div>`;
      if (v.kind === "flag-small") return `<div class="q-visual"><div class="flag" style="font-size:40px">${v.flag}</div></div>`;
      if (v.kind === "outline") return `<div class="q-visual">${outlineSvg(v.topo)}</div>`;
      if (v.kind === "outline-small") return `<div class="q-visual small">${outlineSvg(v.topo)}</div>`;
      return "";
    })();

    host.innerHTML = `
      ${timeLimit ? `<div class="timer"><div></div></div>` : ""}
      <div class="q-card"><div class="q-meta">${esc(q.meta || "")}</div><div class="q-text">${esc(q.prompt)}</div>${visual}</div>
      ${q.type === "map" ? `<div class="map-area"><div class="map-wrap"></div><div class="fb-slot overlay"></div></div>` : `<div class="options">${q.options.map((o, i) => `<button class="option" data-i="${i}"><span class="letter">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>
      <div class="fb-slot"></div>`}`;

    if (timeLimit) {
      const bar = host.querySelector(".timer > div");
      bar.style.transition = `width ${timeLimit}ms linear`;
      requestAnimationFrame(() => requestAnimationFrame(() => (bar.style.width = "0%")));
      timerId = setTimeout(() => finish(false, null, true), timeLimit);
    }

    const feedback = (correct, text) => {
      const slot = host.querySelector(".fb-slot");
      slot.innerHTML = `<div class="feedback ${correct ? "good" : "bad"}"><div class="msg"><b>${correct ? "Richtig! 🎉" : "Leider falsch"}</b>${text ? `<span>${text}</span>` : ""}</div>${onNext ? `<button class="next">${esc(nextLabel)}</button>` : ""}</div>`;
      if (onNext) {
        const btn = slot.querySelector(".next");
        btn.addEventListener("click", () => { map?.destroy(); onNext(); });
        if (autoNext && correct) setTimeout(() => { if (btn.isConnected) btn.click(); }, 900);
      }
    };

    function finish(correct, picked, timeout = false) {
      if (answered) return;
      answered = true;
      clearTimeout(timerId);
      const bar = host.querySelector(".timer > div");
      if (bar) { const w = getComputedStyle(bar).width; bar.style.transition = "none"; bar.style.width = w; }
      const ms = performance.now() - start;
      let text = "";
      if (q.type === "map") {
        const target = byTopo.get(q.target);
        const states = { [q.target]: correct ? "correct" : "reveal" };
        if (!correct && picked) states[picked] = "wrong";
        map.setStates(states);
        if (correct) text = `${target.flag} ${target.name}`;
        else {
          const p = picked && byTopo.get(picked);
          text = (timeout ? "Zeit abgelaufen! " : "") + (p ? `Das war ${p.flag} ${p.name}. ` : "") + `Gesucht war ${target.name} (grün blinkend).`;
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
        text = correct ? (q.reveal || "") : `${timeout ? "Zeit abgelaufen! " : ""}Richtig ist: <b style="display:inline;color:inherit">${esc(q.correct)}</b>${q.reveal ? ` · ${esc(q.reveal)}` : ""}`;
      }
      if (!correct && navigator.vibrate) navigator.vibrate(120);
      onAnswer({ correct, ms, picked, timeout });
      feedback(correct, text);
    }

    if (q.type === "map") {
      map = new WorldMap(host.querySelector(".map-wrap"), {
        region: q.region,
        markers: !q.hard,
        onPick: (topo) => finish(topo === q.target, topo),
      });
      cleanup.push(() => map?.destroy());
    } else {
      host.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
        const val = q.options[+b.dataset.i];
        finish(val === q.correct, val);
      }));
    }
    return { cancel: () => { answered = true; clearTimeout(timerId); map?.destroy(); } };
  }

  // ---------- Allein üben ----------
  function runSolo(settings, questions) {
    const st = { i: 0, score: 0, streak: 0, results: [] };
    const step = () => {
      if (st.i >= questions.length) return soloResult(settings, questions, st);
      const q = questions[st.i];
      render(`<div class="game">
        <div class="game-top"><button class="icon-btn" id="quit" aria-label="Beenden">✕</button>
          <div class="progress"><div style="width:${(st.i / questions.length) * 100}%"></div></div>
          <div class="score-pill">⭐ ${st.score}${st.streak >= 3 ? ` · 🔥${st.streak}` : ""}</div></div>
        <div class="qhost game"></div></div>`);
      on("#quit", "click", () => askConfirm("Runde beenden?", "Beenden", practice));
      renderQuestion(app.querySelector(".qhost"), q, {
        settings,
        autoNext: true,
        nextLabel: st.i + 1 >= questions.length ? "Ergebnis" : "Weiter",
        onAnswer: ({ correct }) => {
          record(q.key, correct);
          st.results.push({ q, correct });
          if (correct) {
            st.streak++;
            const pts = 10 + Math.min(10, (st.streak - 1) * 2);
            st.score += pts;
          } else st.streak = 0;
          app.querySelector(".score-pill").textContent = `⭐ ${st.score}${st.streak >= 3 ? ` · 🔥${st.streak}` : ""}`;
          app.querySelector(".progress > div").style.width = `${((st.i + 1) / questions.length) * 100}%`;
        },
        onNext: () => { st.i++; step(); },
      });
    };
    step();
  }

  function answerText(q) {
    if (q.type === "map") { const t = byTopo.get(q.target); return { title: q.title, sub: `${t.flag} ${t.name} – siehe Fortschritt-Karte` }; }
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
      <div class="big-emoji">${emoji}</div>
      <h2>${pct === 1 ? "Perfekt!" : pct >= 0.8 ? "Stark!" : pct >= 0.5 ? "Gut gemacht!" : "Weiter üben!"}</h2>
      <div class="score-big">${right} / ${questions.length}</div>
      <p class="muted">+${st.score} XP · Level ${level(store.xp)}</p>
      </div>
      ${wrong.length ? `<div class="section-title">Das übst du als Nächstes</div><div class="result-list">${wrong.map((r) => {
        const a = answerText(r.q);
        return `<div class="result-item"><span>❌</span><div>${esc(a.title)}<small>Richtig: ${esc(a.sub)}</small></div></div>`;
      }).join("")}</div>` : ""}
      <div class="spacer"></div>
      <div class="btn-row">
        ${wrong.length ? `<button class="primary-btn" id="retry-wrong">Fehler nochmal üben</button>` : ""}
        <button class="${wrong.length ? "secondary-btn" : "primary-btn"}" id="again">Neue Runde</button>
        <button class="secondary-btn" id="menu">Zum Menü</button>
      </div>`);
    on("#again", "click", () => runSolo(settings, makeRound(settings, questions.length)));
    on("#menu", "click", home);
    on("#retry-wrong", "click", () => {
      const pool = buildPool(settings);
      const items = wrong.map((r) => pool.find((p) => p.key === r.q.key)).filter(Boolean);
      runSolo(settings, shuffle(items).map((it) => makeQuestion(it, settings)));
    });
  }

  // ================= 1 gegen 1 =================
  function duel() {
    if (window.SCIENTIA_NO_ONLINE) {
      render(`${topbar("1 gegen 1")}
        <div class="big-buttons"><button class="big-btn" id="local"><span class="emoji">📱</span><span><b>Am selben Handy</b><span class="sub">Abwechselnd spielen – Handy weitergeben</span></span></button></div>
        <p class="hint">Online-Duelle gegen Freunde funktionieren in der Vorschau nicht – nur in der installierten Version der App.</p>`);
      bindBack();
      on("#local", "click", () => duelPickCategory("local"));
      return;
    }
    render(`${topbar("1 gegen 1")}
      <div class="big-buttons">
        <button class="big-btn" id="online-host"><span class="emoji">📨</span><span><b>Freund einladen</b><span class="sub">Online-Duell: Link oder Code verschicken</span></span></button>
        <button class="big-btn" id="online-join"><span class="emoji">🔑</span><span><b>Code eingeben</b><span class="sub">Einem Duell eines Freundes beitreten</span></span></button>
        <button class="big-btn" id="local"><span class="emoji">📱</span><span><b>Am selben Handy</b><span class="sub">Abwechselnd spielen – Handy weitergeben</span></span></button>
      </div>`);
    bindBack();
    on("#online-host", "click", () => duelPickCategory("host"));
    on("#online-join", "click", () => joinScreen(""));
    on("#local", "click", () => duelPickCategory("local"));
  }

  function duelPickCategory(kind) {
    render(`${topbar(kind === "local" ? "Am selben Handy" : "Freund einladen", "duel")}<p class="muted">Wähle das Thema für das Duell.</p>${categoryTiles(false)}`);
    bindBack();
    on("[data-cat]", "click", (e) => duelSetup(kind, e.currentTarget.dataset.cat));
  }

  function duelSetup(kind, cat) {
    const c = catInfo(cat);
    const last = store.last[cat] || {};
    const s = { cat, region: isGeo(cat) ? last.region || "EU" : "WORLD", diff: last.diff || "easy", n: 10 };
    const names = store.duelNames || ["Spieler 1", "Spieler 2"];
    render(`${topbar(`${c.icon} ${c.name}`, kind === "local" ? "duel-local" : "duel-host")}
      ${kind === "local" ? `
        <div class="field"><label class="lbl">Namen</label>
          <div style="display:grid;gap:8px"><input class="text-input" id="p1" maxlength="16" value="${esc(names[0])}" /><input class="text-input" id="p2" maxlength="16" value="${esc(names[1])}" /></div></div>` : `
        <div class="field"><label class="lbl">Dein Name</label><input class="text-input" id="me" maxlength="16" placeholder="z. B. Jonas" value="${esc(store.name)}" /></div>`}
      ${settingsFields(s)}
      <div class="field"><label class="lbl">Fragen ${kind === "local" ? "pro Spieler" : ""}</label>${chips("n", [{ v: 5, l: "5" }, { v: 10, l: "10" }, { v: 15, l: "15" }], s.n)}</div>
      <p class="hint">Jede Frage hat ein Zeitlimit. Richtig = 100 Punkte + Bonus für Schnelligkeit.</p>
      <div class="spacer"></div>
      <div class="btn-row"><button class="primary-btn" id="go">${kind === "local" ? "Duell starten" : "Einladung erstellen"}</button></div>`);
    bindBack({ "duel-local": () => duelPickCategory("local"), "duel-host": () => duelPickCategory("host") });
    bindChips(s);
    on("#go", "click", () => {
      const settings = { cat: s.cat, region: s.region, diff: s.diff };
      if (kind === "local") {
        const p1 = app.querySelector("#p1").value.trim() || "Spieler 1";
        const p2 = app.querySelector("#p2").value.trim() || "Spieler 2";
        store.duelNames = [p1, p2];
        save();
        localDuel(settings, s.n, [p1, p2]);
      } else {
        const me = app.querySelector("#me").value.trim();
        if (!me) return toast("Bitte gib deinen Namen ein.");
        store.name = me;
        save();
        hostOnline(settings, s.n);
      }
    });
  }

  const timeLimitFor = (q) => (q.type === "map" ? 20000 : 15000);
  const pointsFor = (correct, ms, limit) => (correct ? 100 + Math.round(50 * Math.max(0, 1 - ms / limit)) : 0);

  // ---------- Am selben Handy ----------
  function localDuel(settings, perPlayer, names) {
    const qs = makeRound(settings, perPlayer * 2, { learn: false });
    if (qs.length < 2) return toast("Zu wenige Fragen für diese Auswahl.");
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
        <button class="secondary-btn" id="quit">Duell abbrechen</button>`);
      on("#ready", "click", play);
      on("#quit", "click", () => askConfirm("Duell abbrechen?", "Abbrechen", duel));
    };
    const play = () => {
      const who = i % 2;
      const q = qs[i];
      const limit = timeLimitFor(q);
      render(`<div class="game">${bar(who)}<div class="qhost game"></div></div>`);
      renderQuestion(app.querySelector(".qhost"), q, {
        settings, timeLimit: limit, autoNext: false, nextLabel: i + 1 >= total ? "Ergebnis" : "Weitergeben",
        onAnswer: ({ correct, ms }) => {
          record(q.key, correct);
          const pts = pointsFor(correct, ms, limit);
          players[who].score += pts;
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
      save();
      render(`<div class="result"><div class="big-emoji">${winner ? "🏆" : "🤝"}</div>
        <h2>${winner ? `${esc(winner.name)} gewinnt!` : "Unentschieden!"}</h2></div>
        <div class="podium">${players.map((p) => `<div class="p center ${p === winner ? "win" : ""}"><span>${esc(p.name)}</span><b>${p.score}</b><span>${p.right}/${per} richtig</span></div>`).join("")}</div>
        <div class="spacer"></div>
        <div class="btn-row"><button class="primary-btn" id="again">Revanche</button><button class="secondary-btn" id="menu">Zum Menü</button></div>`);
      on("#again", "click", () => localDuel(settings, perPlayer, names));
      on("#menu", "click", home);
    };
    handoff();
  }

  // ---------- Online (PeerJS / WebRTC) ----------
  const PEER_PREFIX = "scientia-duell-v1-";
  const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const newCode = () => Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
  let net = null; // { peer, conn, role }
  // Optional eigener PeerJS-Server: window.SCIENTIA_PEER = { host, port, path, secure } vor app.js setzen.
  const peerOpts = () => Object.assign({ debug: 0 }, window.SCIENTIA_PEER || {});

  function closeNet() {
    if (!net) return;
    try { net.conn?.close(); } catch { /* egal */ }
    try { net.peer?.destroy(); } catch { /* egal */ }
    net = null;
  }
  function peerErrorText(err) {
    const t = err?.type || "";
    if (t === "peer-unavailable") return "Kein Duell mit diesem Code gefunden. Ist der Code richtig und wartet dein Freund noch?";
    if (t === "browser-incompatible") return "Dein Browser unterstützt keine Online-Duelle.";
    if (t === "network" || t === "server-error" || t === "socket-error" || t === "socket-closed") return "Keine Verbindung zum Duell-Server. Prüfe dein Internet und versuche es erneut.";
    return "Verbindungsfehler: " + (err?.message || t || "unbekannt");
  }
  function inviteLink(code) {
    const u = new URL(location.href);
    u.search = "";
    u.hash = "";
    u.searchParams.set("duell", code);
    return u.toString();
  }

  function hostOnline(settings, n, attempt = 0) {
    closeNet();
    if (typeof Peer === "undefined") return toast("Online-Duelle sind hier nicht verfügbar.");
    const code = newCode();
    const peer = new Peer(PEER_PREFIX + code, peerOpts());
    net = { peer, role: "host", settings, n };
    const link = inviteLink(code);
    render(`${topbar("Freund einladen", "duel-cancel")}
      <div class="code-box"><div class="muted">Dein Duell-Code</div><div class="code">${code}</div>
        <p class="muted">Schick den Link – wer ihn öffnet, ist direkt im Duell. Oder Code teilen: „1 gegen 1“ → „Code eingeben“.</p>
        <div class="btn-row"><button class="primary-btn" id="share">📤 Einladung senden</button><button class="secondary-btn" id="copy">Link kopieren</button></div>
        <div class="status-line"><div class="spinner"></div><span id="status">Verbinde mit Duell-Server …</span></div>
      </div>
      <p class="hint center">${esc(catInfo(settings.cat).icon + " " + catInfo(settings.cat).name)}${isGeo(settings.cat) ? " · " + esc(regionInfo(settings.region).name) : ""} · ${settings.diff === "hard" ? "Schwer" : "Leicht"} · ${n} Fragen</p>`);
    bindBack({ "duel-cancel": () => { closeNet(); duel(); } });
    const status = (t) => { const el = app.querySelector("#status"); if (el) el.textContent = t; };
    on("#share", "click", async () => {
      const text = `⚔️ ${store.name} fordert dich bei Scientia heraus! Code: ${code}`;
      if (navigator.share) { try { await navigator.share({ title: "Scientia-Duell", text, url: link }); } catch { /* abgebrochen */ } }
      else copy(link);
    });
    on("#copy", "click", () => copy(link));

    peer.on("open", () => status("Warte auf deinen Freund …"));
    peer.on("error", (err) => {
      if (err.type === "unavailable-id" && attempt < 3) return hostOnline(settings, n, attempt + 1);
      status(peerErrorText(err));
    });
    peer.on("connection", (conn) => {
      if (net?.conn) { conn.on("open", () => { conn.send({ t: "busy" }); setTimeout(() => conn.close(), 500); }); return; }
      net.conn = conn;
      conn.on("data", (msg) => {
        if (msg?.t === "hello") {
          net.opponent = String(msg.name || "Gast").slice(0, 16);
          startOnlineRound();
        } else onlineMessage(msg);
      });
      conn.on("close", () => onlineClosed());
    });
  }

  function startOnlineRound() {
    const { settings, n } = net;
    const questions = makeRound(settings, n, { learn: false });
    net.conn.send({ t: "start", settings, questions, host: store.name });
    playOnline(settings, questions, store.name, net.opponent);
  }

  function joinScreen(prefill) {
    render(`${topbar("Code eingeben", "duel")}
      <div class="field"><label class="lbl">Dein Name</label><input class="text-input" id="me" maxlength="16" placeholder="z. B. Lena" value="${esc(store.name)}" /></div>
      <div class="field"><label class="lbl">Duell-Code</label><input class="text-input code-input" id="code" maxlength="5" autocomplete="off" autocapitalize="characters" value="${esc(prefill)}" placeholder="ABCDE" /></div>
      <div class="status-line" id="st" hidden><div class="spinner"></div><span id="status"></span></div>
      <div class="spacer"></div>
      <div class="btn-row"><button class="primary-btn" id="join">Beitreten</button></div>`);
    bindBack({ duel: () => { closeNet(); duel(); } });
    on("#join", "click", () => {
      const me = app.querySelector("#me").value.trim();
      const code = app.querySelector("#code").value.trim().toUpperCase();
      if (!me) return toast("Bitte gib deinen Namen ein.");
      if (code.length !== 5) return toast("Der Code hat 5 Zeichen.");
      store.name = me;
      save();
      joinOnline(code);
    });
  }

  function joinOnline(code) {
    closeNet();
    if (typeof Peer === "undefined") return toast("Online-Duelle sind hier nicht verfügbar.");
    const stEl = app.querySelector("#st");
    const status = (t, spin = true) => {
      const el = app.querySelector("#status");
      if (!el) return;
      stEl.hidden = false;
      el.textContent = t;
      stEl.querySelector(".spinner").style.display = spin ? "" : "none";
    };
    status("Verbinde …");
    app.querySelector("#join").disabled = true;
    const peer = new Peer(peerOpts());
    net = { peer, role: "guest" };
    const fail = (t) => { status(t, false); const b = app.querySelector("#join"); if (b) b.disabled = false; closeNet(); };
    peer.on("error", (err) => fail(peerErrorText(err)));
    peer.on("open", () => {
      const conn = peer.connect(PEER_PREFIX + code, { reliable: true });
      net.conn = conn;
      const timeout = setTimeout(() => { if (!net?.started) fail("Keine Antwort. Ist der Code richtig?"); }, 15000);
      conn.on("open", () => { status("Verbunden! Gleich geht's los …"); conn.send({ t: "hello", name: store.name }); });
      conn.on("data", (msg) => {
        if (msg?.t === "busy") { clearTimeout(timeout); return fail("Dieses Duell ist schon voll."); }
        if (msg?.t === "start") {
          clearTimeout(timeout);
          net.started = true;
          net.opponent = String(msg.host || "Gegner").slice(0, 16);
          playOnline(msg.settings, msg.questions, store.name, net.opponent);
        } else onlineMessage(msg);
      });
      conn.on("close", () => onlineClosed());
    });
  }

  function copy(text) {
    (navigator.clipboard?.writeText(text) || Promise.reject()).then(
      () => toast("Link kopiert!"),
      () => toast(text, 8000)
    );
  }

  // Gemeinsamer Spielzustand eines Online-Duells
  let duelState = null;

  function onlineMessage(msg) {
    if (!duelState || !msg) return;
    if (msg.t === "ans") {
      duelState.opp.score = msg.score;
      duelState.opp.answered = msg.i + 1;
      duelState.opp.right = msg.right;
      updateVersus();
    }
    if (msg.t === "done") {
      duelState.opp.done = true;
      duelState.opp.score = msg.score;
      duelState.opp.right = msg.right;
      updateVersus();
      if (duelState.me.done) onlineResult();
    }
    if (msg.t === "rematch-request" && net?.role === "host") startOnlineRound();
  }
  function onlineClosed() {
    if (!net) return;
    net.closed = true;
    toast("Verbindung zum Gegner getrennt.", 4000);
    if (duelState && !duelState.me.done) duelState.opp.left = true;
    if (duelState?.me.done) onlineResult();
  }
  function versusHtml() {
    const { me, opp, n } = duelState;
    return `<div class="versus"><div class="p active"><span>${esc(me.name)}</span><span>${me.score}</span></div>
      <div class="p"><span>${esc(opp.name)} ${opp.done ? "✅" : `${opp.answered}/${n}`}</span><span>${opp.score}</span></div></div>`;
  }
  function updateVersus() {
    const el = app.querySelector(".versus");
    if (el) el.outerHTML = versusHtml();
    if (duelState?.waiting) {
      const w = app.querySelector("#waitinfo");
      if (w) w.textContent = `${duelState.opp.name} ist bei Frage ${Math.min(duelState.opp.answered + 1, duelState.n)} von ${duelState.n} …`;
    }
  }

  function playOnline(settings, questions, myName, oppName) {
    duelState = {
      settings, questions, n: questions.length, i: 0,
      me: { name: myName, score: 0, right: 0, done: false },
      opp: { name: oppName, score: 0, right: 0, answered: 0, done: false },
    };
    let c = 3;
    const tick = () => {
      render(`<div class="countdown">${c}</div>`);
      if (c-- > 1) setTimeout(tick, 800);
      else setTimeout(next, 800);
    };
    const send = (m) => { try { net?.conn?.open && net.conn.send(m); } catch { /* Verbindung weg */ } };
    const next = () => {
      const st = duelState;
      if (st.i >= st.n) {
        st.me.done = true;
        send({ t: "done", score: st.me.score, right: st.me.right });
        if (st.opp.done || net?.closed) return onlineResult();
        st.waiting = true;
        render(`${versusHtml()}<div class="handoff"><div class="spinner" style="margin:0 auto;width:40px;height:40px"></div><h2>Fertig!</h2><p class="muted" id="waitinfo">Warte auf ${esc(st.opp.name)} …</p></div>`);
        updateVersus();
        return;
      }
      const q = st.questions[st.i];
      const limit = timeLimitFor(q);
      render(`<div class="game">${versusHtml()}<div class="qhost game"></div></div>`);
      renderQuestion(app.querySelector(".qhost"), q, {
        settings, timeLimit: limit, autoNext: true, nextLabel: st.i + 1 >= st.n ? "Fertig" : "Weiter",
        onAnswer: ({ correct, ms }) => {
          record(q.key, correct);
          st.me.score += pointsFor(correct, ms, limit);
          if (correct) st.me.right++;
          send({ t: "ans", i: st.i, score: st.me.score, right: st.me.right });
          updateVersus();
        },
        onNext: () => { st.i++; next(); },
      });
    };
    tick();
  }

  function onlineResult() {
    const st = duelState;
    if (!st || st.shown) return;
    st.shown = true;
    const { me, opp } = st;
    const win = me.score > opp.score, tie = me.score === opp.score;
    store.xp += Math.round(me.score / 10) + (win ? 20 : 0);
    save();
    render(`<div class="result"><div class="big-emoji">${tie ? "🤝" : win ? "🏆" : "😅"}</div>
      <h2>${tie ? "Unentschieden!" : win ? "Du gewinnst!" : `${esc(opp.name)} gewinnt!`}</h2>
      ${opp.left && !opp.done ? `<p class="muted">${esc(opp.name)} hat das Duell verlassen.</p>` : ""}</div>
      <div class="podium">
        <div class="p center ${win ? "win" : ""}"><span>${esc(me.name)}</span><b>${me.score}</b><span>${me.right}/${st.n} richtig</span></div>
        <div class="p center ${!win && !tie ? "win" : ""}"><span>${esc(opp.name)}</span><b>${opp.score}</b><span>${opp.right}/${st.n} richtig</span></div>
      </div>
      <div class="spacer"></div>
      <div class="btn-row">
        ${net && !net.closed ? `<button class="primary-btn" id="rematch">Revanche</button>` : ""}
        <button class="secondary-btn" id="menu">Zum Menü</button></div>`);
    on("#rematch", "click", (e) => {
      if (!net || net.closed) return toast("Verbindung getrennt.");
      if (net.role === "host") startOnlineRound();
      else { net.conn.send({ t: "rematch-request" }); e.currentTarget.disabled = true; e.currentTarget.textContent = "Warte auf Gegner …"; }
    });
    on("#menu", "click", () => { closeNet(); duelState = null; home(); });
  }

  // ================= Fortschritt =================
  function stats() {
    const geoRows = GEO_MODES.map((g) => statRow(g, { cat: g.id, region: "WORLD", diff: "hard" })).join("");
    const quizRows = QUIZ.map((q) => statRow(q, { cat: q.id, diff: "hard" })).join("");
    const s = { region: store.last.statsRegion || "WORLD", mode: "map" };
    render(`${topbar("Fortschritt")}
      <div class="section-title">Weltkarte – Länder finden</div>
      ${chips("region", window.REGIONS.map((r) => ({ v: r.id, l: `${r.icon} ${r.name}` })), s.region)}
      <div class="map-wrap stats-map" style="margin-top:10px"></div>
      <div class="map-legend"><span><i style="background:var(--good)"></i>sitzt</span><span><i style="background:var(--warn)"></i>wird besser</span><span><i style="background:var(--bad)"></i>üben</span><span><i style="background:var(--land-active)"></i>noch nicht gefragt</span></div>
      <div class="section-title">Geografie (weltweit)</div>${geoRows}
      <div class="section-title">Wissen</div>${quizRows}
      <div class="btn-row"><button class="secondary-btn" id="reset">Fortschritt zurücksetzen</button></div>`);
    bindBack();
    const color = (topo) => {
      const c = byTopo.get(topo);
      const st = c && store.stats[`map:${c.iso2}`];
      if (!st) return "var(--land-active)";
      if (st.box >= 3) return "var(--good)";
      if (st.box >= 1) return "var(--warn)";
      return "var(--bad)";
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
    on("#reset", "click", () => {
      askConfirm("Wirklich den gesamten Lernfortschritt und alle XP löschen?", "Löschen", () => {
        store.stats = {};
        store.xp = 0;
        save();
        stats();
      });
    });
  }
  function statRow(c, settings) {
    const pool = buildPool(settings);
    let good = 0, bad = 0;
    for (const it of pool) {
      const s = store.stats[it.key];
      if (!s) continue;
      if (s.box >= 3) good++; else if (s.box === 0) bad++;
    }
    const seen = pool.filter((it) => store.stats[it.key]).length;
    const n = pool.length || 1;
    return `<div class="stat-row"><span class="emoji">${c.icon}</span><div class="info"><b>${esc(c.name)}</b>
      <div class="muted" style="font-size:13px">${seen} von ${pool.length} gesehen · ${good} sitzen · ${bad} zum Üben</div>
      <div class="bar"><div class="g" style="width:${(good / n) * 100}%"></div><div class="r" style="width:${(bad / n) * 100}%"></div></div></div>
      <span class="num">${Math.round((good / n) * 100)}%</span></div>`;
  }

  const ROUTES = { home, practice, duel, stats };

  // ================= Start =================
  const params = new URLSearchParams(location.search);
  const joinCode = params.get("duell");
  if (joinCode) {
    history.replaceState(null, "", location.pathname);
    joinScreen(joinCode.toUpperCase().slice(0, 5));
  } else home();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  // Für Tests
  window.__scientia = { store, buildPool, makeRound, makeQuestion, weightedSample, itemWeight, record };
})();
