# Scientia

Spielerisch Wissen lernen – allein oder im Duell gegen Freunde.
Scientia ist eine Web-App (PWA), die auf dem iPhone wie eine normale App läuft
und sich auf den Home-Bildschirm legen lässt.

## Was die App kann

**Geografie**
- 🗺️ **Länder auf der Karte** – „Tippe auf der Karte an: Kroatien“. Richtig wird grün, falsch wird rot,
  und das gesuchte Land blinkt grün auf. Mit Zoomen und Verschieben.
- 🏛️ **Hauptstädte** – *Leicht*: Ländername wird angezeigt. *Schwer*: nur der Umriss des Landes.
- 🚩 **Flaggen** – Welches Land gehört zur Flagge?
- Regionen: Welt, Europa, Asien, Afrika, Nord- & Mittelamerika, Südamerika, Ozeanien (195 Länder)

**Allgemeinwissen** – Allgemeinwissen, Geschichte, Wissenschaft, Natur & Tiere, Sport,
Kunst & Kultur, Technik und ein bunter Mix (140 Fragen, leicht/schwer).

**Lernsystem** – Jede Antwort wird gespeichert (Leitner-System). Fragen, die du falsch hattest,
kommen deutlich öfter dran, sichere Fragen seltener. Unter „Fortschritt“ siehst du auf der
Weltkarte, welche Länder schon sitzen.

**1 gegen 1**
- 📨 **Online**: Einladung per Link/Code verschicken, beide bekommen dieselben Fragen,
  Punkte für richtige und schnelle Antworten, Revanche-Button.
- 📱 **Am selben Handy**: abwechselnd spielen und das Handy weitergeben.

XP und Level gibt's obendrauf.

## Starten

Es ist kein Build nötig – alles sind statische Dateien.

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

### Öffentlich machen (GitHub Pages)

1. Repo öffentlich machen: **Settings → General → ganz unten „Danger Zone“ → Change visibility → Public**
2. **Settings → Pages → Build and deployment**: Source „Deploy from a branch“, Branch **main**, Ordner **/ (root)** → Save
3. Nach 1–2 Minuten ist die App erreichbar unter **https://jonas777-hub.github.io/Scientia/**

Auf dem iPhone in Safari öffnen → Teilen → „Zum Home-Bildschirm“. Jede Änderung auf `main`
wird automatisch neu veröffentlicht.

## Online-Duelle

Online-Duelle laufen direkt von Handy zu Handy (WebRTC über [PeerJS](https://peerjs.com/)).
Zum Verbinden wird standardmäßig der kostenlose öffentliche PeerJS-Server genutzt; es gibt keine
eigene Datenbank. Wer einen eigenen Server betreiben will, setzt vor `js/app.js`:

```html
<script>window.SCIENTIA_PEER = { host: "mein-server.de", port: 443, path: "/peerjs", secure: true };</script>
```

In seltenen Fällen (strenge Mobilfunk-Netze) kann die direkte Verbindung scheitern –
dann hilft meist WLAN oder ein TURN-Server in `config.iceServers`.

## Neue Fragen hinzufügen

- Wissensfragen: `js/data-quiz.js` – je Frage
  `["Frage", "richtige Antwort", "falsch 1", "falsch 2", "falsch 3", 1 oder 2]` (1 = leicht, 2 = schwer).
  Neue Kategorien sind einfach ein weiterer Block in der Liste.
- Länder/Hauptstädte: `js/data-countries.js`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Einstieg |
| `css/style.css` | Design (hell/dunkel automatisch) |
| `js/app.js` | Spiellogik, Lernsystem, Karte, Duelle |
| `js/data-quiz.js` | Wissensfragen |
| `js/data-countries.js` | Länder, Hauptstädte, Regionen, Flaggen |
| `data/world.js` | Weltkarte (Natural Earth über world-atlas) |
| `lib/` | d3, topojson-client, PeerJS |
| `sw.js`, `manifest.webmanifest` | Offline-Nutzung & Home-Bildschirm |

Fortschritt wird lokal im Browser gespeichert (`localStorage`).
