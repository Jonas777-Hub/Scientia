/* Technik – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "technik";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const PRODUCT = parse(`
iPhone;Apple
iPad;Apple
iPod;Apple
Galaxy (Smartphones);Samsung
Windows;Microsoft
Excel;Microsoft
Android;Google
Pixel (Smartphones);Google
YouTube;Google
PlayStation;Sony
Walkman;Sony
Xbox;Microsoft
Nintendo Switch;Nintendo
Game Boy;Nintendo
Kindle (E-Reader);Amazon
Echo (smarter Lautsprecher);Amazon
Photoshop;Adobe
Instagram;Meta
WhatsApp;Meta
LinkedIn;Microsoft
GitHub;Microsoft
ChatGPT;OpenAI
Golf (Auto);Volkswagen
Käfer;Volkswagen
911 (Sportwagen);Porsche
Model 3;Tesla
Prius;Toyota
Corsa;Opel
A380;Airbus
747 „Jumbo-Jet“;Boeing
GeForce-Grafikkarten;Nvidia
Thermomix;Vorwerk
`);
  table(C, PRODUCT, { q: (p) => `Welches Unternehmen steht hinter dem Produkt „${p[0]}“?`, a: (p) => p[1], pool: [...new Set(PRODUCT.map((p) => p[1]))], diff: (p) => (["iPhone", "Windows", "PlayStation", "Xbox", "Golf (Auto)", "Käfer", "YouTube", "Android", "Instagram", "WhatsApp", "ChatGPT", "Nintendo Switch"].includes(p[0]) ? 1 : 2), img: (p) => p[0].replace(/ \(.*\)|„.*“/g, "").trim() });

  const CEO = parse(`
Tim Cook;Apple
Satya Nadella;Microsoft
Sundar Pichai;Google (Alphabet)
Jensen Huang;Nvidia
Sam Altman;OpenAI
Mark Zuckerberg;Meta
Andy Jassy;Amazon
Lisa Su;AMD
`);
  table(C, CEO, { q: (c) => `Welches Unternehmen leitet bzw. leitete ${c[0]} als Chef (Stand 2025)?`, a: (c) => c[1], pool: [...CEO.map((c) => c[1]), "Tesla", "Intel", "IBM"], diff: 2, img: (c) => c[0] });

  const YEAR = parse(`
Johannes Gutenberg druckt die Gutenberg-Bibel;1455
Alexander Graham Bell erhält das Telefon-Patent;1876
Thomas Edison präsentiert seine Glühlampe;1879
Carl Benz meldet das Automobil zum Patent an;1886
Die Gebrüder Wright fliegen zum ersten Mal motorisiert;1903
Konrad Zuse stellt die Z3 fertig;1941
Der erste Satellit Sputnik startet;1957
Die erste Mondlandung mit Apollo 11;1969
Das erste Handy-Telefonat wird geführt;1973
Die Compact Disc (CD) kommt auf den Markt;1982
Tim Berners-Lee schlägt das World Wide Web vor;1989
Google wird gegründet;1998
Wikipedia startet;2001
Facebook startet;2004
YouTube startet;2005
Das erste iPhone wird vorgestellt;2007
ChatGPT wird veröffentlicht;2022
Die erste Eisenbahn in Deutschland fährt;1835
Die Titanic sinkt auf ihrer Jungfernfahrt;1912
Die Concorde wird außer Dienst gestellt;2003
`);
  table(C, YEAR, { q: (y) => `In welchem Jahr: ${y[0]}?`, a: (y) => y[1], years: 6, diff: (y) => (["1969", "2007", "1886", "1989"].includes(y[1]) ? 1 : 2) });

  const ABBR2 = parse(`
Leuchtdiode;LED
Globales Positionsbestimmungssystem;GPS
Arbeitsspeicher (Random Access Memory);RAM
Grafikprozessor;GPU
Hauptprozessor;CPU
Drahtloses lokales Netzwerk;WLAN
Künstliche Intelligenz;KI
Virtuelle Realität;VR
Erweiterte Realität;AR
Kurznachricht im Mobilfunk;SMS
Universeller serieller Bus;USB
Seitenbeschreibungssprache des Webs;HTML
Format für Dokumente mit festem Layout;PDF
Persönliche Geheimzahl;PIN
Internationale Kontonummer;IBAN
Anschluss für Bild und Ton in hoher Auflösung;HDMI
Halbleiterlaufwerk ohne bewegliche Teile;SSD
Gestaltungssprache für Websites (Layouts, Farben);CSS
Abfragesprache für Datenbanken;SQL
Programmierschnittstelle;API
`);
  table(C, ABBR2, { q: (a) => `Welche Abkürzung steht für: ${a[0]}?`, a: (a) => a[1], pool: ABBR2.map((a) => a[1]), diff: (a) => (["LED", "GPS", "WLAN", "KI", "SMS", "USB", "PDF", "PIN"].includes(a[1]) ? 1 : 2) });

  const TERM = parse(`
Ein Programm, das Quellcode in Maschinencode übersetzt;Compiler
Ein Rechner, der Dienste für andere Rechner bereitstellt;Server
Ein Gerät, das Netzwerke verbindet und Daten weiterleitet;Router
Eine Software, die Hardware für das Betriebssystem nutzbar macht;Treiber
Eine kleine Korrektur oder Aktualisierung für Software;Patch
Eine Sicherheitskopie von Daten;Backup
Ein Zwischenspeicher für häufig benötigte Daten;Cache
Die Datenmenge, die pro Sekunde übertragen werden kann;Bandbreite
Die Verzögerung bei der Datenübertragung;Latenz
Das Umwandeln von Daten, damit nur Berechtigte sie lesen können;Verschlüsselung
Ein Nutzername und Passwort plus zusätzlicher Code;Zwei-Faktor-Authentifizierung
Ein Programm, das automatisch Aufgaben im Internet erledigt;Bot
Ein Netzwerk von Computern weltweit;Internet
Eine Website, auf der jeder Artikel bearbeiten kann;Wiki
Ein Onlinetagebuch oder Artikelsammlung im Internet;Blog
Ein Audio-Beitrag zum Abonnieren im Internet;Podcast
Live-Übertragung von Audio oder Video übers Internet;Streaming
Das Herunterladen von Dateien aus dem Internet;Download
Das Hochladen von Dateien ins Internet;Upload
Eine Anwendung für das Smartphone;App
`);
  table(C, TERM, { q: (t) => `Welcher Begriff passt: ${t[0]}?`, a: (t) => t[1], pool: TERM.map((t) => t[1]), diff: (t) => (["Download", "Upload", "App", "Backup", "Streaming", "Podcast", "Blog", "Internet"].includes(t[1]) ? 1 : 2) });

  const CAR = parse(`
Er reinigt die Abgase von Schadstoffen;Katalysator
Sie trennt beim Schalten Motor und Getriebe;Kupplung
Sie erzeugt im Benzinmotor den Zündfunken;Zündkerze
Sie erzeugt beim laufenden Motor Strom für die Batterie;Lichtmaschine
Er presst mehr Luft in den Motor und steigert die Leistung;Turbolader
Er dämpft Stöße von Straßenunebenheiten;Stoßdämpfer
Es verhindert das Blockieren der Räder beim Bremsen;ABS
Es kühlt den Motor mit Flüssigkeit;Kühler
Es überträgt die Kraft des Motors mit verschiedenen Übersetzungen auf die Räder;Getriebe
Er bläst sich bei einem Unfall in Sekundenbruchteilen auf;Airbag
`);
  table(C, CAR, { q: (c) => `Welches Autoteil ist gemeint? ${c[0]}.`, a: (c) => c[1], pool: CAR.map((c) => c[1]), diff: (c) => (["Airbag", "Getriebe", "Kupplung", "Stoßdämpfer"].includes(c[1]) ? 1 : 2) });

  lines(C, `
Wie viele Byte hat ein Kilobyte im Binärsystem (Kibibyte)? | 1024 | 1000 | 512 | 2048 | 2 | Byte
Was ist größer: ein Gigabyte oder ein Terabyte? | Terabyte | Gigabyte | Beide gleich | Kommt aufs Gerät an | 1 | Byte
Wie viele Gigabyte hat ein Terabyte (dezimal)? | 1000 | 100 | 1024 | 10.000 | 1 | Byte
Was misst man in Megabit pro Sekunde? | Internetgeschwindigkeit | Speicherplatz | Bildschirmgröße | Akkulaufzeit | 1 | Datenübertragungsrate
Was misst man in Gigahertz beim Prozessor? | Taktfrequenz | Speicherplatz | Stromverbrauch | Temperatur | 1 | Taktfrequenz
Was misst man in Megapixeln? | Auflösung einer Kamera | Speicher einer Kamera | Zoomstufe | Akkuleistung | 1 | Megapixel
Was misst man in Milliamperestunden (mAh) beim Handy? | Akkukapazität | Bildschirmhelligkeit | Prozessorleistung | Signalstärke | 1 | Amperestunde
Wie heißt die Netzwerk-Technik des Mobilfunks nach 4G? | 5G | LTE | UMTS | GSM | 1 | 5G
Wie heißt der Standard für kabelloses Laden von Smartphones? | Qi | USB-C | Lightning | MagSafe-Pro | 2 | Qi (Standard)
Welcher Steckertyp ist seit 2024 in der EU für Handys vorgeschrieben? | USB-C | Lightning | Micro-USB | Mini-USB | 1 | USB-C
Wie heißt der Anschluss, den Apple bis 2023 bei iPhones nutzte? | Lightning | USB-C | Micro-USB | Thunderbolt | 1 | Lightning (Schnittstelle)
Wie nennt man das Entsperren des Handys mit dem Gesicht bei Apple? | Face ID | Touch ID | Smart Lock | Iris-Scan | 1 | Face ID
Wie nennt man eine Kopie einer Website im Speicher, um schneller zu laden? | Cache | Cookie | Server | Proxy | 2 | Cache
Wie heißt das weltweit größte soziale Netzwerk für Berufstätige? | LinkedIn | Xing | Facebook | Reddit | 1 | LinkedIn
Wie heißt das Netzwerk für Software-Projekte mit Versionsverwaltung? | GitHub | Wikipedia | Dropbox | Stack Overflow | 2 | GitHub
Wie heißt die bekannteste Online-Enzyklopädie? | Wikipedia | Brockhaus | Britannica | Wiktionary | 1 | Wikipedia
Wie heißt die bekannteste Suchmaschine? | Google | Bing | DuckDuckGo | Ecosia | 1 | Google
Welche deutsche Suchmaschine pflanzt Bäume mit den Werbeeinnahmen? | Ecosia | Startpage | Qwant | Metager | 2 | Ecosia
Was bedeutet „offline“? | Nicht mit dem Internet verbunden | Mit dem Internet verbunden | Ausgeschaltet | Im Flugmodus mit WLAN | 1 | Online
Was bedeutet das Kürzel „AFK“ in Spielen? | Away from keyboard | Always for kills | Ask for knowledge | All friends know | 2 | Netzjargon | mc
Was bedeutet „GG“ am Ende eines Online-Spiels? | Good Game | Go Go | Great Goal | Game Gone | 1 | Netzjargon | mc
Was ist ein Emoji? | Ein Bildsymbol in Nachrichten | Ein Virus | Ein Musikformat | Eine Tastenkombination | 1 | Emoji | mc
Aus welchem Land stammen Emojis ursprünglich? | Japan | USA | China | Südkorea | 2 | Emoji
Wie heißt die Kunst, Roboter zu bauen und zu programmieren? | Robotik | Mechatronik | Kybernetik | Informatik | 1 | Robotik
Welches Unternehmen baute den humanoiden Roboter „Atlas“? | Boston Dynamics | Honda | Tesla | Sony | 2 | Boston Dynamics
Wie heißt der Hund-ähnliche Roboter von Boston Dynamics? | Spot | Rex | Aibo | Bolt | 2 | Boston Dynamics
Wie heißt der Roboterhund von Sony? | Aibo | Spot | Asimo | Pepper | 2 | Aibo
Wie heißt der humanoide Roboter von Honda? | ASIMO | Atlas | Pepper | Sophia | 2 | ASIMO
Was sind „Robotergesetze“ in der Science-Fiction von Isaac Asimov? | Regeln, die Robotern verbieten, Menschen zu schaden | Gesetze zur Roboterbesteuerung | Bauanleitungen | Programmiersprachen | 2 | Robotergesetze | mc
Was ist eine Blockchain? | Eine fälschungssichere, verteilte Datenkette | Eine Fahrradkette | Ein Passwort | Ein Computerspiel | 2 | Blockchain | mc
Wie heißt die bekannteste Kryptowährung? | Bitcoin | Ethereum | Dogecoin | Euro | 1 | Bitcoin
Was ist Phishing? | Betrügerisches Abgreifen von Zugangsdaten | Ein Angelsport | Ein Spiel | Ein Datenformat | 1 | Phishing | mc
Was ist ein Passwort-Manager? | Ein Programm, das Passwörter sicher speichert | Ein Virus | Eine Firewall | Ein Browser | 1 | Kennwortverwaltung | mc
Welches Passwort ist am sichersten? | Ein langes mit Buchstaben, Zahlen und Zeichen | 123456 | passwort | Der eigene Vorname | 1 | Passwort | mc
Wie heißt die Brücke in San Francisco, ein Ingenieurs-Wahrzeichen? | Golden Gate Bridge | Brooklyn Bridge | Tower Bridge | Øresundbrücke | 1 | Golden Gate Bridge
Wie heißt die Brücke über die Themse mit zwei Türmen und Klappteil? | Tower Bridge | London Bridge | Millennium Bridge | Westminster Bridge | 1 | Tower Bridge
Welches ist das höchste Gebäude der Welt (Stand 2025)? | Burj Khalifa | Shanghai Tower | One World Trade Center | Taipei 101 | 1 | Burj Khalifa
In welcher Stadt steht der Burj Khalifa? | Dubai | Abu Dhabi | Doha | Riad | 1 | Burj Khalifa
Wie hoch ist der Burj Khalifa ungefähr? | 828 Meter | 541 Meter | 1.000 Meter | 632 Meter | 2 | Burj Khalifa | mc
Wie heißt das größte Wasserkraftwerk der Welt in China? | Drei-Schluchten-Damm | Hoover Dam | Itaipú | Assuan-Staudamm | 1 | Drei-Schluchten-Talsperre
Welcher Staudamm in Ägypten staut den Nil? | Assuan-Staudamm | Hoover Dam | Kariba | Drei-Schluchten | 2 | Assuan-Staudamm
Wie heißt der große Teilchenbeschleuniger in Genf? | LHC am CERN | ISS | ITER | Hubble | 1 | Large Hadron Collider | alt=LHC/CERN
Wie heißt das Kernfusions-Forschungsprojekt in Südfrankreich? | ITER | CERN | JET | Wendelstein 7-X | 2 | ITER
Wie heißt die Kernfusions-Versuchsanlage in Greifswald? | Wendelstein 7-X | ITER | JET | Tokamak Energy | 2 | Wendelstein 7-X
`);
})();
