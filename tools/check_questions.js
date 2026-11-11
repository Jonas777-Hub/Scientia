// Prüft alle Fragen: Anzahl je Kategorie, doppelte Fragen, gleiche Antwortmöglichkeiten.
// Aufruf: node tools/check_questions.js
const fs = require("fs");
const path = require("path");
global.window = {};
const root = path.join(__dirname, "..");
require(path.join(root, "js/data-countries.js"));
require(path.join(root, "js/data-quiz.js"));
require(path.join(root, "js/q/_gen.js"));
for (const f of fs.readdirSync(path.join(root, "js/q")).sort()) if (f !== "_gen.js" && f.endsWith(".js")) require(path.join(root, "js/q", f));
let bad = 0, total = 0;
const all = new Map();
for (const c of window.QUIZ_CATEGORIES) {
  const easy = c.questions.filter((q) => q[5] === 1).length;
  total += c.questions.length;
  console.log(`${c.questions.length >= 500 ? "✔" : "✘"} ${c.id.padEnd(16)} ${String(c.questions.length).padStart(4)} Fragen (leicht ${easy}, mit Bild ${c.questions.filter((q) => q[6]).length})`);
  for (const q of c.questions) {
    const opts = q.slice(1, 5);
    if (new Set(opts.map((o) => String(o).toLowerCase())).size !== 4) { bad++; console.log("  gleiche Antworten:", q[0]); }
    if (opts.some((o) => !String(o).trim())) { bad++; console.log("  leere Antwort:", q[0]); }
    const k = q[0].toLowerCase();
    if (all.has(k) && all.get(k) !== c.id) console.log("  doppelt in", all.get(k), ":", q[0]);
    all.set(k, c.id);
  }
}
console.log("Gesamt:", total, "Probleme:", bad);
