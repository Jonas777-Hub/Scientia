/*
 * Hilfsfunktionen, um Fragen aus Faktentabellen zu erzeugen.
 * Alles ist deterministisch (gleiche Frage => gleiche falsche Antworten), damit das Lernsystem
 * Fragen wiedererkennt.
 *
 * Fragenformat wie in data-quiz.js:
 *   [Frage, richtig, falsch1, falsch2, falsch3, Schwierigkeit (1|2), Bildartikel|null, Optionen?]
 */
(function () {
  const byId = (id) => window.QUIZ_CATEGORIES.find((c) => c.id === id);

  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    let s = seed || 1;
    return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e9) / 1e9; };
  }
  function seededShuffle(arr, seed) {
    const a = arr.slice();
    const r = rng(seed);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const norm = (s) => String(s).toLowerCase().trim();

  // Wählt n falsche Antworten aus pool (ohne die richtige, ohne Doppelte).
  function pick(pool, correct, n, seedText, avoid = []) {
    const bad = new Set([norm(correct), ...avoid.map(norm)]);
    const out = [];
    for (const v of seededShuffle([...new Set(pool.map(String))], hash(seedText))) {
      if (out.length >= n) break;
      if (bad.has(norm(v))) continue;
      bad.add(norm(v));
      out.push(v);
    }
    return out;
  }
  // Falsche Jahreszahlen in der Nähe der richtigen.
  function nearNumbers(value, seedText, spread = 12, n = 3, min = -Infinity, max = Infinity) {
    const r = rng(hash(seedText));
    const out = new Set();
    let guard = 0;
    while (out.size < n && guard++ < 200) {
      let d = Math.round((r() * 2 - 1) * spread);
      if (d === 0) d = r() < 0.5 ? -1 : 1;
      const v = value + d;
      if (v !== value && v >= min && v <= max) out.add(v);
    }
    return [...out].map(String);
  }

  const seen = new Set();
  function add(catId, list) {
    const c = byId(catId);
    if (!c) throw new Error("Unbekannte Kategorie " + catId);
    if (!c._seen) { c._seen = new Set(c.questions.map((q) => norm(q[0]))); }
    for (const q of list) {
      if (!q || q.length < 5) continue;
      const k = norm(q[0]);
      if (c._seen.has(k)) continue;
      const opts = q.slice(1, 5).map(String);
      if (new Set(opts.map(norm)).size !== 4) continue; // zu wenig verschiedene Antworten
      c._seen.add(k);
      seen.add(k);
      c.questions.push([q[0], opts[0], opts[1], opts[2], opts[3], q[5] === 2 ? 2 : 1, q[6] || null, ...(q[7] ? [q[7]] : [])]);
    }
  }

  /*
   * Erzeugt Fragen aus einer Tabelle.
   * rows: Datenzeilen; spec: { q(row) → Fragetext, a(row) → Antwort, pool → Liste möglicher Antworten
   *       (Standard: alle Antworten der Tabelle), diff(row), img(row), alt(row), mc, filter(row), wrong(row) }
   */
  function table(catId, rows, spec) {
    const pool = spec.pool || rows.map((r) => spec.a(r));
    const list = [];
    for (const r of rows) {
      if (spec.filter && !spec.filter(r)) continue;
      const q = spec.q(r);
      const a = String(spec.a(r));
      let wrong;
      if (spec.wrong) wrong = spec.wrong(r).map(String).filter((w) => norm(w) !== norm(a)).slice(0, 3);
      else if (spec.years) wrong = nearNumbers(+a, q, spec.years, 3, spec.min, spec.max);
      else wrong = pick(typeof pool === "function" ? pool(r) : pool, a, 3, q, spec.avoid ? spec.avoid(r) : []);
      if (wrong.length < 3) continue;
      const opts = {};
      if (spec.mc) opts.mc = true;
      const alt = spec.alt && spec.alt(r);
      if (alt && alt.length) opts.alt = alt;
      list.push([q, a, ...wrong, typeof spec.diff === "function" ? spec.diff(r) : spec.diff || 1, spec.img ? spec.img(r) : null, Object.keys(opts).length ? opts : undefined]);
    }
    add(catId, list);
  }

  // Kurzform für handgeschriebene Fragen: "Frage | richtig | falsch | falsch | falsch | 1|2 | Bild"
  function lines(catId, text) {
    const list = [];
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const p = line.split("|").map((x) => x.trim());
      if (p.length < 5) continue;
      const diff = p[5] === "2" ? 2 : 1;
      const img = p[6] || null;
      const flags = p[7] || "";
      const opts = {};
      if (flags.includes("mc")) opts.mc = true;
      const altM = flags.match(/alt=([^;]+)/);
      if (altM) opts.alt = altM[1].split("/").map((x) => x.trim());
      list.push([p[0], p[1], p[2], p[3], p[4], diff, img, Object.keys(opts).length ? opts : undefined]);
    }
    add(catId, list);
  }

  window.QGEN = { add, table, lines, pick, nearNumbers, hash, seededShuffle };
})();
