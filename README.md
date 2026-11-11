# Scientia

Spielerisch Wissen lernen – allein oder im Duell gegen Freunde.
Scientia ist eine Web-App (PWA), die auf dem iPhone wie eine normale App läuft
und sich auf den Home-Bildschirm legen lässt.

**Live:** https://jonas777-hub.github.io/Scientia/

## Was die App kann

Unten gibt es fünf Reiter: **Start**, **Geografie**, **Geschichte**, **Wissen** und **Duelle**.

**Start** – Tagesziel (20 Fragen), Tage in Folge, Level/XP, Tagesmix, „Fehler wiederholen“ und deine Duelle.

**🌍 Geografie** (195 Länder, 7 Regionen: Welt, Europa, Asien, Afrika, Nord- & Mittelamerika, Südamerika, Ozeanien)
- 🗺️ **Länder auf der Karte** – Land antippen (richtig grün, falsch rot) *oder* markiertes Land benennen.
- 🏙️ **Hauptstädte** – *Leicht*: mit Ländername. *Schwer*: nur der Umriss. Nach der Antwort ein Foto der Stadt.
- 🚩 **Flaggen** – Welches Land gehört zur Flagge?

- 🧭 **Erdkunde-Wissen** – Kontinente, Städte, Flüsse, Berge, Inseln, Landschaften, Sprachen.

**📜 Geschichte** – Deutsche Geschichte (Kaiserreich, Weimar, NS-Zeit, Teilung, Wiedervereinigung),
Weltkriege, Antike, Mittelalter, Neuzeit & Moderne.

**🧠 Wissen** – Allgemeinwissen, Wissenschaft, Natur & Tiere, Sport, Kunst & Kultur, Technik.

Jede Kategorie hat **mindestens 500 Fragen** (insgesamt über 6.200). Prüfen mit `node tools/check_questions.js`.

Jede Wissensfrage hat ein passendes **Bild** (Hauptbild des Wikipedia-Artikels zum Thema), das auch
unscharf als Hintergrund erscheint.

**Antworten:** Multiple Choice oder **Eintippen**. Beim Eintippen sind kleine Tippfehler, Umlaute ohne
Punkte, Nachnamen („Adenauer“) und bekannte Varianten („USA“, „Tokyo“) erlaubt.

**Lernsystem** – Leitner-System: Was du falsch hattest, kommt deutlich öfter dran, Sicheres seltener.
Unter „Fortschritt“ gibt es zwei getrennte Bereiche: **Üben** (Lernstand, Weltkarte) und
**Duelle** (Siege/Niederlagen, Bilanz je Freund, Trefferquote je Thema). Antworten in Duellen
verändern das Lernsystem nicht.

**⚔️ Duelle**
- **Freund herausfordern**: Link per WhatsApp & Co. schicken. Beide bekommen dieselben Fragen,
  Punkte für richtige und schnelle Antworten. Ihr müsst nicht gleichzeitig spielen – der Spielstand
  bleibt erhalten, auch wenn jemand die App schließt. Ergebnis und Revanche unter „Duelle“.
- **Zu zweit an einem Handy**: abwechselnd spielen und weitergeben.

## Starten

Kein Build nötig – alles sind statische Dateien.

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

### Veröffentlichen (GitHub Pages)

Die Website wird bei jedem Push auf `main` automatisch über GitHub Actions veröffentlicht
(`.github/workflows/pages.yml`, Einstellung: Settings → Pages → Source „GitHub Actions“).

Auf dem iPhone in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

## Online-Duelle – wie es funktioniert

Die Duelle laufen über öffentliche, kostenlose MQTT-Server (EMQX, HiveMQ, Mosquitto als Ausweich).
Fragen und Spielstände werden dort als „retained“ Nachrichten unter einem zufälligen 6-stelligen Code
abgelegt. Gespeichert werden nur Vorname, Fragen und Punktestand – keine weiteren Daten.
Eigene Server lassen sich vor `js/app.js` eintragen:

```html
<script>window.SCIENTIA_MQTT = ["wss://mein-server.de:8084/mqtt"];</script>
```

## Bilder

Bilder kommen von Wikipedia/Wikimedia Commons (jeweiliger Lizenz siehe Link „Bild: Wikimedia Commons“).
Die App lädt das Hauptbild des angegebenen Artikels direkt im Browser nach und speichert die Adresse.
Nur Fotos/Gemälde (JPG) werden gezeigt, Karten und Wappen nicht. Optional kann
`python3 tools/fetch_images.py` die Bildadressen vorab in `js/data-images.js` schreiben.

## Neue Fragen hinzufügen

Die Fragen stehen in `js/data-quiz.js` (Kategorien) und `js/q/*.js` (je Kategorie, teils aus
Faktentabellen erzeugt mit `js/q/_gen.js`). Neue Dateien in `js/q/` auch in `index.html` und `sw.js`
eintragen. Format je Frage:

```js
["Frage", "richtige Antwort", "falsch 1", "falsch 2", "falsch 3", 1, "Wikipedia-Artikel fürs Bild", { alt: ["andere Schreibweise"] }]
```

- `1` = leicht, `2` = schwer
- `{ mc: true }` = Frage nur als Multiple Choice (wenn Eintippen keinen Sinn ergibt)
- Neue Themen sind ein weiterer Block in `categories`, neue Reiter ein weiterer Eintrag in `QUIZ_GROUPS`.

Länder, Hauptstädte und alternative Schreibweisen stehen in `js/data-countries.js`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Einstieg, Reiterleiste |
| `css/style.css` | Design (hell/dunkel automatisch) |
| `js/app.js` | Spiellogik, Lernsystem, Karte, Bilder, Duelle |
| `js/data-quiz.js` | Kategorien und Startfragen |
| `js/q/` | Fragenkataloge je Kategorie (Tabellen + handgeschriebene Fragen) |
| `tools/check_questions.js` | Prüft Anzahl und Qualität der Fragen |
| `js/data-countries.js` | Länder, Hauptstädte, Regionen, Flaggen, Schreibweisen |
| `js/data-images.js` | optionale, vorab ermittelte Bildadressen |
| `data/world.js` | Weltkarte (Natural Earth über world-atlas) |
| `lib/` | d3, topojson-client, MQTT.js |
| `tools/fetch_images.py` | Bildadressen vorab von Wikipedia holen |
| `sw.js`, `manifest.webmanifest` | Offline-Nutzung & Home-Bildschirm |

Fortschritt wird lokal im Browser gespeichert (`localStorage`).
