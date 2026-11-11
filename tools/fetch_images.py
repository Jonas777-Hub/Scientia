#!/usr/bin/env python3
"""
Holt zu allen Bild-Titeln (Wikipedia-Artikel) das Hauptbild und schreibt js/data-images.js.

Aufruf (im Repo-Ordner):  python3 tools/fetch_images.py
Benötigt Internetzugang zu de.wikipedia.org. Nur Fotos/Gemälde (JPG) werden übernommen,
Karten, Wappen und Diagramme (SVG/PNG) werden aussortiert.
"""
import json, os, re, ssl, subprocess, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://de.wikipedia.org/w/api.php"
UA = "ScientiaQuizBuilder/1.0 (Lern-App, einmaliger Bildabgleich)"


def load_js_data():
    """Liest Fragen und Länder über Node aus den Daten-Dateien."""
    code = r"""
      global.window = {};
      require('./js/data-countries.js'); require('./js/data-quiz.js');
      const titles = new Set();
      for (const g of window.QUIZ_GROUPS) { titles.add(g.cover); for (const c of g.categories) { titles.add(c.cover); for (const q of c.questions) if (q[6]) titles.add(q[6]); } }
      for (const t of (window.EXTRA_IMAGES || [])) titles.add(t);
      console.log(JSON.stringify({ titles: [...titles], countries: window.COUNTRIES }));
    """
    out = subprocess.check_output(["node", "-e", code], cwd=ROOT)
    return json.loads(out)


def ctx():
    c = ssl.create_default_context()
    ca = os.environ.get("SSL_CERT_FILE") or ("/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None)
    if ca:
        c.load_verify_locations(ca)
    return c


def query(titles):
    params = {
        "action": "query", "format": "json", "redirects": "1", "formatversion": "2",
        "prop": "pageimages|pageprops", "piprop": "thumbnail|name", "pithumbsize": "960",
        "ppprop": "disambiguation", "titles": "|".join(titles),
    }
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, context=ctx(), timeout=30) as r:
                return json.load(r)
        except Exception as e:  # Ratenlimit o. Ä.
            print("  …warte", e, file=sys.stderr)
            time.sleep(20 * (attempt + 1))
    raise SystemExit("Wikipedia nicht erreichbar")


def resolve(titles):
    """Gibt {angefragter Titel: {src, file, w, h} | Grund} zurück."""
    result = {}
    titles = list(dict.fromkeys(titles))
    for i in range(0, len(titles), 40):
        chunk = titles[i:i + 40]
        data = query(chunk)["query"]
        alias = {}
        for n in data.get("normalized", []):
            alias[n["to"]] = alias.get(n["from"], n["from"]) if False else n["from"]
        redirects = {r["to"]: r["from"] for r in data.get("redirects", [])}
        pages = {p["title"]: p for p in data.get("pages", [])}
        for t in chunk:
            norm = next((n["to"] for n in data.get("normalized", []) if n["from"] == t), t)
            final = next((r["to"] for r in data.get("redirects", []) if r["from"] == norm), norm)
            p = pages.get(final)
            if not p or p.get("missing"):
                result[t] = "fehlt"
            elif "pageprops" in p and "disambiguation" in p["pageprops"]:
                result[t] = "Begriffsklärung"
            elif "thumbnail" not in p:
                result[t] = "kein Bild"
            else:
                name = p.get("pageimage", "")
                if not re.search(r"\.jpe?g$", name, re.I):
                    result[t] = "kein Foto (" + name + ")"
                else:
                    th = p["thumbnail"]
                    src = th["source"].split("?")[0]
                    result[t] = {"src": src, "file": name, "w": th["width"], "h": th["height"], "page": final}
        time.sleep(4)
    return result


def main():
    data = load_js_data()
    images = {}
    res = resolve(data["titles"])
    bad = {k: v for k, v in res.items() if not isinstance(v, dict)}
    images.update({k: v for k, v in res.items() if isinstance(v, dict)})

    # Hauptstädte: erst Stadtname, bei Mehrdeutigkeit "Stadt (Land)" bzw. "Stadt (Stadt)"
    caps = {c["capital"]: c["name"] for c in data["countries"]}
    first = resolve(list(caps))
    retry = {}
    for cap, r in first.items():
        if isinstance(r, dict):
            images["cap:" + cap] = r
        else:
            retry[cap] = [f"{cap} ({caps[cap]})", f"{cap} (Stadt)"]
    if retry:
        second = resolve([t for ts in retry.values() for t in ts])
        for cap, ts in retry.items():
            hit = next((second[t] for t in ts if isinstance(second.get(t), dict)), None)
            if hit:
                images["cap:" + cap] = hit
            else:
                bad["cap:" + cap] = first[cap]

    with open(os.path.join(ROOT, "js", "data-images.js"), "w", encoding="utf8") as f:
        f.write("/* Automatisch erzeugt mit tools/fetch_images.py – Bilder von Wikimedia Commons (Lizenzen siehe Dateiseite). */\n")
        f.write("window.IMAGES = " + json.dumps(images, ensure_ascii=False, indent=0, sort_keys=True) + ";\n")
    print(f"{len(images)} Bilder gespeichert, {len(bad)} ohne Foto:")
    for k, v in sorted(bad.items()):
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
