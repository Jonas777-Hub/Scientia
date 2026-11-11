/* Natur & Tiere – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "natur";

  // [Name, Tiergruppe, schwer?, Wikipedia-Artikel]
  const A = `Löwe;Säugetier;0;Löwe|Tiger;Säugetier;0;Tiger|Afrikanischer Elefant;Säugetier;0;Afrikanischer Elefant|Giraffe;Säugetier;0;Giraffen|Zebra;Säugetier;0;Zebras|Flusspferd;Säugetier;0;Flusspferd|Breitmaulnashorn;Säugetier;0;Breitmaulnashorn|Gepard;Säugetier;0;Gepard|Leopard;Säugetier;0;Leopard|Jaguar;Säugetier;0;Jaguar|Eisbär;Säugetier;0;Eisbär|Braunbär;Säugetier;0;Braunbär|Großer Panda;Säugetier;0;Großer Panda|Koala;Säugetier;0;Koala|Rotes Riesenkänguru;Säugetier;0;Rotes Riesenkänguru|Wombat;Säugetier;1;Wombats|Schnabeltier;Säugetier;1;Schnabeltier|Fledermaus;Säugetier;1;Fledermäuse|Delfin;Säugetier;1;Delfine|Blauwal;Säugetier;1;Blauwal|Orca (Schwertwal);Säugetier;1;Schwertwal|Seehund;Säugetier;0;Seehund|Walross;Säugetier;0;Walross|Seekuh;Säugetier;1;Seekühe|Fischotter;Säugetier;0;Eurasischer Fischotter|Biber;Säugetier;0;Europäischer Biber|Eichhörnchen;Säugetier;0;Eurasisches Eichhörnchen|Igel;Säugetier;0;Braunbrustigel|Maulwurf;Säugetier;0;Europäischer Maulwurf|Feldhase;Säugetier;0;Feldhase|Reh;Säugetier;0;Reh|Rothirsch;Säugetier;0;Rothirsch|Elch;Säugetier;0;Elch|Rentier;Säugetier;0;Ren (Hirsch)|Wolf;Säugetier;0;Wolf|Rotfuchs;Säugetier;0;Rotfuchs|Dachs;Säugetier;0;Europäischer Dachs|Wildschwein;Säugetier;0;Wildschwein|Luchs;Säugetier;0;Eurasischer Luchs|Dromedar;Säugetier;0;Dromedar|Lama;Säugetier;0;Lama (Kamel)|Gorilla;Säugetier;0;Gorillas|Schimpanse;Säugetier;0;Gemeiner Schimpanse|Orang-Utan;Säugetier;0;Orang-Utans|Faultier;Säugetier;0;Faultiere|Gürteltier;Säugetier;1;Gürteltiere|Großer Ameisenbär;Säugetier;0;Großer Ameisenbär|Erdmännchen;Säugetier;0;Erdmännchen|Tüpfelhyäne;Säugetier;0;Tüpfelhyäne|Amerikanischer Bison;Säugetier;0;Amerikanischer Bison|Waschbär;Säugetier;0;Waschbär|Kaiserpinguin;Vogel;1;Kaiserpinguin|Strauß;Vogel;0;Afrikanischer Strauß|Emu;Vogel;1;Großer Emu|Kiwi (Vogel);Vogel;1;Kiwis|Steinadler;Vogel;0;Steinadler|Weißkopfseeadler;Vogel;0;Weißkopfseeadler|Uhu;Vogel;0;Uhu|Schleiereule;Vogel;0;Schleiereule|Kolibri;Vogel;0;Kolibris|Hellroter Ara;Vogel;0;Hellroter Ara|Riesentukan;Vogel;0;Riesentukan|Rosaflamingo;Vogel;0;Rosaflamingo|Weißstorch;Vogel;0;Weißstorch|Höckerschwan;Vogel;0;Höckerschwan|Blauer Pfau;Vogel;0;Blauer Pfau|Kuckuck;Vogel;0;Kuckuck|Buntspecht;Vogel;0;Buntspecht|Amsel;Vogel;0;Amsel|Rotkehlchen;Vogel;0;Rotkehlchen|Haussperling;Vogel;0;Haussperling|Albatros;Vogel;0;Albatrosse|Pelikan;Vogel;0;Pelikane|Andenkondor;Vogel;0;Andenkondor|Wanderfalke;Vogel;0;Wanderfalke|Gelbhaubenkakadu;Vogel;0;Gelbhaubenkakadu|Nilkrokodil;Reptil;0;Nilkrokodil|Mississippi-Alligator;Reptil;0;Mississippi-Alligator|Galápagos-Riesenschildkröte;Reptil;0;Galápagos-Riesenschildkröte|Chamäleon;Reptil;0;Chamäleons|Grüner Leguan;Reptil;0;Grüner Leguan|Komodowaran;Reptil;0;Komodowaran|Königskobra;Reptil;0;Königskobra|Klapperschlange;Reptil;0;Klapperschlangen|Große Anakonda;Reptil;0;Große Anakonda|Blindschleiche;Reptil;1;Blindschleiche|Zauneidechse;Reptil;0;Zauneidechse|Gecko;Reptil;0;Geckos|Kreuzotter;Reptil;0;Kreuzotter|Grasfrosch;Amphibie;0;Grasfrosch|Erdkröte;Amphibie;0;Erdkröte|Feuersalamander;Amphibie;1;Feuersalamander|Bergmolch;Amphibie;1;Bergmolch|Axolotl;Amphibie;1;Axolotl|Laubfrosch;Amphibie;0;Europäischer Laubfrosch|Pfeilgiftfrosch;Amphibie;0;Baumsteigerfrösche|Weißer Hai;Fisch;0;Weißer Hai|Walhai;Fisch;1;Walhai|Atlantischer Lachs;Fisch;0;Atlantischer Lachs|Regenbogenforelle;Fisch;0;Regenbogenforelle|Karpfen;Fisch;0;Karpfen|Hering;Fisch;0;Atlantischer Hering|Roter Thun;Fisch;0;Roter Thun|Europäischer Aal;Fisch;1;Europäischer Aal|Seepferdchen;Fisch;1;Seepferdchen|Clownfisch;Fisch;0;Orangeringel-Anemonenfisch|Piranha;Fisch;0;Piranhas|Hecht;Fisch;0;Hecht|Mantarochen;Fisch;1;Mantarochen|Kugelfisch;Fisch;0;Kugelfische|Schwertfisch;Fisch;0;Schwertfisch|Honigbiene;Insekt;0;Westliche Honigbiene|Rote Waldameise;Insekt;0;Rote Waldameise|Marienkäfer;Insekt;0;Siebenpunkt-Marienkäfer|Tagpfauenauge;Insekt;0;Tagpfauenauge|Libelle;Insekt;0;Libellen|Heuschrecke;Insekt;0;Heuschrecken|Stechmücke;Insekt;0;Stechmücken|Stubenfliege;Insekt;0;Große Stubenfliege|Wespe;Insekt;0;Gemeine Wespe|Hummel;Insekt;0;Hummeln|Maikäfer;Insekt;0;Feldmaikäfer|Glühwürmchen;Insekt;1;Leuchtkäfer|Kakerlake;Insekt;0;Deutsche Schabe|Gottesanbeterin;Insekt;1;Europäische Gottesanbeterin|Floh;Insekt;1;Flöhe|Vogelspinne;Spinnentier;0;Vogelspinnen|Kreuzspinne;Spinnentier;0;Gartenkreuzspinne|Skorpion;Spinnentier;1;Skorpione|Zecke;Spinnentier;1;Gemeiner Holzbock|Weberknecht;Spinnentier;1;Weberknechte|Gewöhnlicher Krake;Weichtier;1;Gewöhnlicher Krake|Weinbergschnecke;Weichtier;0;Weinbergschnecke|Miesmuschel;Weichtier;0;Miesmuschel|Riesenkalmar;Weichtier;1;Riesenkalmare|Europäischer Hummer;Krebstier;0;Europäischer Hummer|Taschenkrebs;Krebstier;0;Taschenkrebs|Nordseegarnele;Krebstier;0;Nordseegarnele|Kellerassel;Krebstier;1;Kellerassel|Gemeiner Seestern;Stachelhäuter;1;Gemeiner Seestern|Seeigel;Stachelhäuter;1;Seeigel|Ohrenqualle;Nesseltier;1;Ohrenqualle|Regenwurm;Ringelwurm;1;Gemeiner Regenwurm`
    .split("|").map((s) => { const [n, k, h, img] = s.split(";"); return { n, k, hard: h === "1", img }; });
  const GROUPS = ["Säugetier", "Vogel", "Reptil", "Amphibie", "Fisch", "Insekt", "Spinnentier", "Weichtier", "Krebstier"];
  table(C, A, { q: (t) => `Zu welcher Tiergruppe zählt: ${t.n}?`, a: (t) => t.k, pool: GROUPS, diff: (t) => (t.hard ? 2 : 1), img: (t) => t.img });

  // Ursprüngliche Heimat
  const HOME = [["Giraffe", "Afrika", "Giraffen"], ["Zebra", "Afrika", "Zebras"], ["Flusspferd", "Afrika", "Flusspferd"], ["Gorilla", "Afrika", "Gorillas"], ["Schimpanse", "Afrika", "Gemeiner Schimpanse"],
    ["Erdmännchen", "Afrika", "Erdmännchen"], ["Strauß", "Afrika", "Afrikanischer Strauß"], ["Okapi", "Afrika", "Okapi"], ["Koala", "Australien", "Koala"], ["Känguru", "Australien", "Rotes Riesenkänguru"],
    ["Wombat", "Australien", "Wombats"], ["Schnabeltier", "Australien", "Schnabeltier"], ["Emu", "Australien", "Großer Emu"], ["Dingo", "Australien", "Dingo"], ["Tasmanischer Teufel", "Australien", "Beutelteufel"],
    ["Komodowaran", "Asien", "Komodowaran"], ["Großer Panda", "Asien", "Großer Panda"], ["Orang-Utan", "Asien", "Orang-Utans"], ["Tiger", "Asien", "Tiger"], ["Yak", "Asien", "Hausyak"],
    ["Faultier", "Südamerika", "Faultiere"], ["Lama", "Südamerika", "Lama (Kamel)"], ["Alpaka", "Südamerika", "Alpaka"], ["Anakonda", "Südamerika", "Große Anakonda"], ["Riesentukan", "Südamerika", "Riesentukan"],
    ["Piranha", "Südamerika", "Piranhas"], ["Andenkondor", "Südamerika", "Andenkondor"], ["Capybara (Wasserschwein)", "Südamerika", "Capybara"], ["Amerikanischer Bison", "Nordamerika", "Amerikanischer Bison"],
    ["Weißkopfseeadler", "Nordamerika", "Weißkopfseeadler"], ["Waschbär", "Nordamerika", "Waschbär"], ["Präriehund", "Nordamerika", "Präriehunde"], ["Kaiserpinguin", "Antarktis", "Kaiserpinguin"],
    ["Kiwi", "Neuseeland", "Kiwis"], ["Lemur (Katta)", "Madagaskar", "Katta"]];
  table(C, HOME, { q: (h) => `Wo lebt das Tier „${h[0]}“ ursprünglich in freier Wildbahn?`, a: (h) => h[1], pool: ["Afrika", "Asien", "Australien", "Südamerika", "Nordamerika", "Europa", "Antarktis"], diff: (h) => (["Okapi", "Dingo", "Yak", "Präriehund", "Lemur (Katta)", "Capybara (Wasserschwein)", "Tasmanischer Teufel"].includes(h[0]) ? 2 : 1), img: (h) => h[2] });

  // Jungtiere
  const YOUNG = [["Pferd", "Fohlen"], ["Kuh", "Kalb"], ["Schaf", "Lamm"], ["Schwein", "Ferkel"], ["Ziege", "Zicklein"], ["Hund", "Welpe"], ["Huhn", "Küken"], ["Reh", "Kitz"],
    ["Frosch", "Kaulquappe"], ["Schmetterling", "Raupe"], ["Wildschwein", "Frischling"], ["Gans", "Gössel"], ["Känguru", "Joey"], ["Maikäfer", "Engerling"], ["Mücke", "Larve"], ["Aal", "Glasaal"]];
  table(C, YOUNG, { q: (y) => `Wie nennt man das Junge (bzw. die Jugendform) von: ${y[0]}?`, a: (y) => y[1], diff: (y) => (["Gans", "Känguru", "Maikäfer", "Aal", "Wildschwein", "Mücke"].includes(y[0]) ? 2 : 1), img: (y) => ({ Pferd: "Hauspferd", Kuh: "Hausrind", Schaf: "Hausschaf", Schwein: "Hausschwein", Ziege: "Hausziege", Hund: "Haushund", Huhn: "Haushuhn", Reh: "Reh", Frosch: "Grasfrosch", Schmetterling: "Schmetterlinge", Wildschwein: "Wildschwein", Gans: "Hausgans", Känguru: "Rotes Riesenkänguru", Maikäfer: "Feldmaikäfer", Mücke: "Stechmücken", Aal: "Europäischer Aal" })[y[0]] });

  // Männchen / Weibchen
  const SEX = [["Pferd", "Hengst", "Stute"], ["Rind", "Stier", "Kuh"], ["Schwein", "Eber", "Sau"], ["Huhn", "Hahn", "Henne"], ["Ziege", "Bock", "Geiß"], ["Ente", "Erpel", "Ente"],
    ["Gans", "Ganter", "Gans"], ["Hund", "Rüde", "Hündin"], ["Katze", "Kater", "Katze"], ["Reh", "Rehbock", "Ricke"], ["Wildschwein", "Keiler", "Bache"], ["Truthuhn", "Puter", "Pute"],
    ["Hase", "Rammler", "Häsin"], ["Fuchs", "Rüde", "Fähe"], ["Schaf", "Widder", "Aue"]];
  const males = [...new Set(SEX.map((s) => s[1]))], females = [...new Set(SEX.map((s) => s[2]))];
  table(C, SEX, { q: (s) => `Wie nennt man das Männchen beim Tier „${s[0]}“?`, a: (s) => s[1], pool: males, avoid: (s) => [s[2]], diff: (s) => (["Pferd", "Huhn", "Katze", "Hund", "Rind"].includes(s[0]) ? 1 : 2) });
  table(C, SEX.filter((s) => s[2] !== s[0]), { q: (s) => `Wie nennt man das Weibchen beim Tier „${s[0]}“?`, a: (s) => s[2], pool: females, avoid: (s) => [s[1]], diff: (s) => (["Pferd", "Huhn", "Hund", "Rind"].includes(s[0]) ? 1 : 2) });

  // Tierlaute
  const SOUND = [["Hund", "bellt"], ["Katze", "miaut"], ["Kuh", "muht"], ["Pferd", "wiehert"], ["Schaf", "blökt"], ["Esel", "iaht"], ["Schwein", "grunzt"], ["Löwe", "brüllt"],
    ["Hahn", "kräht"], ["Frosch", "quakt"], ["Gans", "schnattert"], ["Taube", "gurrt"], ["Wolf", "heult"], ["Elefant", "trompetet"], ["Rothirsch", "röhrt"], ["Biene", "summt"],
    ["Schlange", "zischt"], ["Grille", "zirpt"], ["Ziege", "meckert"], ["Bär", "brummt"], ["Huhn", "gackert"], ["Spatz", "tschilpt"]];
  table(C, SOUND, { q: (s) => `Welchen Laut macht das Tier „${s[0]}“? Es …`, a: (s) => s[1], diff: (s) => (["Rothirsch", "Spatz", "Elefant", "Grille", "Schaf"].includes(s[0]) ? 2 : 1) });

  // Gruppen und Behausungen
  lines(C, `
Wie nennt man eine Gruppe von Wölfen? | Rudel | Herde | Schwarm | Rotte | 1 | Wolf
Wie nennt man eine Gruppe von Wildschweinen? | Rotte | Rudel | Herde | Schar | 2 | Wildschwein
Wie nennt man eine Gruppe von Fischen? | Schwarm | Herde | Rudel | Rotte | 1 | Atlantischer Hering
Wie nennt man eine Gruppe von Kühen? | Herde | Schwarm | Rudel | Volk | 1 | Hausrind
Wie nennt man die Gemeinschaft von Bienen in einem Stock? | Volk | Herde | Rudel | Rotte | 1 | Westliche Honigbiene
Wie nennt man eine Gruppe von Löwen? | Rudel | Herde | Schwarm | Volk | 1 | Löwe
Wie heißt der Bau eines Bibers? | Burg | Kobel | Horst | Sasse | 2 | Europäischer Biber
Wie heißt das Nest eines Eichhörnchens? | Kobel | Horst | Bau | Burg | 2 | Eurasisches Eichhörnchen
Wie heißt das Nest eines Greifvogels wie des Adlers? | Horst | Kobel | Bau | Sasse | 2 | Steinadler
Wie heißt die Mulde, in der ein Feldhase ruht? | Sasse | Bau | Kobel | Horst | 2 | Feldhase
Wie heißt die unterirdische Wohnung von Fuchs und Dachs? | Bau | Horst | Burg | Kobel | 1 | Rotfuchs
`);

  // Bäume und Früchte
  const TREE = [["Eicheln", "Eiche", "Stieleiche"], ["Bucheckern", "Buche", "Rotbuche"], ["Kastanien (zum Basteln)", "Rosskastanie", "Gewöhnliche Rosskastanie"], ["Walnüsse", "Walnussbaum", "Echte Walnuss"],
    ["Haselnüsse", "Haselstrauch", "Gemeine Hasel"], ["Propeller-Samen (Nasenzwicker)", "Ahorn", "Bergahorn"], ["Zapfen, die nach oben stehen", "Tanne", "Weißtanne"], ["Hängende Zapfen", "Fichte", "Gemeine Fichte"],
    ["Bucheckern-ähnliche Nüsse namens Maronen (Esskastanien)", "Edelkastanie", "Edelkastanie"], ["Lindenblüten für Tee", "Linde", "Winterlinde"], ["Kätzchen und weiße Rinde", "Birke", "Hänge-Birke"],
    ["Oliven", "Ölbaum", "Olivenbaum"], ["Datteln", "Dattelpalme", "Echte Dattelpalme"], ["Kokosnüsse", "Kokospalme", "Kokospalme"]];
  table(C, TREE, { q: (t) => `Welcher Baum trägt: ${t[0]}?`, a: (t) => t[1], diff: (t) => (TREE.indexOf(t) < 4 || t[1].includes("palme") ? 1 : 2), img: (t) => t[2] });

  lines(C, `
# Tierrekorde und Wissen
Welches Tier hat das größte Gehirn? | Pottwal | Afrikanischer Elefant | Blauwal | Mensch | 2 | Pottwal
Welches ist das größte Landraubtier? | Eisbär | Löwe | Tiger | Grizzlybär | 2 | Eisbär
Welches Tier ist das schwerste Landtier? | Afrikanischer Elefant | Breitmaulnashorn | Flusspferd | Giraffe | 1 | Afrikanischer Elefant
Welcher Vogel ist der schnellste im Sturzflug? | Wanderfalke | Steinadler | Mauersegler | Albatros | 1 | Wanderfalke
Welcher Vogel ist der größte der Welt? | Strauß | Emu | Kondor | Albatros | 1 | Afrikanischer Strauß
Welcher Vogel hat die größte Flügelspannweite? | Wanderalbatros | Andenkondor | Steinadler | Pelikan | 2 | Wanderalbatros
Welches ist das kleinste Säugetier Europas (nach Gewicht)? | Etruskerspitzmaus | Zwergmaus | Haselmaus | Fledermaus | 2 | Etruskerspitzmaus
Welche Schlange ist die längste Giftschlange der Welt? | Königskobra | Schwarze Mamba | Kreuzotter | Taipan | 2 | Königskobra
Welches Tier schläft bis zu 20 Stunden am Tag und ernährt sich von Eukalyptus? | Koala | Faultier | Panda | Wombat | 1 | Koala
Welches Säugetier kann aktiv fliegen? | Fledermaus | Flughörnchen | Gleithörnchen | Pinguin | 1 | Fledermäuse
Wie orientieren sich Fledermäuse im Dunkeln? | Mit Ultraschall-Echos | Mit Infrarotaugen | Mit dem Geruch | Mit Magnetfeldern | 1 | Fledermäuse | mc
Welches Säugetier legt Eier? | Schnabeltier | Känguru | Koala | Fledermaus | 1 | Schnabeltier
Wo tragen Kängurus ihre Jungen? | Im Beutel | Auf dem Rücken | Im Maul | Im Nest | 1 | Rotes Riesenkänguru | mc
Wie nennt man Tiere, die einen Beutel haben? | Beuteltiere | Nagetiere | Paarhufer | Raubtiere | 1 | Beuteltiere
Was frisst ein Pflanzenfresser? | Pflanzen | Fleisch | Insekten | Alles | 1 | Pflanzenfresser | mc
Wie nennt man Tiere, die sowohl Pflanzen als auch Fleisch fressen? | Allesfresser | Pflanzenfresser | Fleischfresser | Aasfresser | 1 | Allesfresser
Wie nennt man Tiere, die vor allem nachts aktiv sind? | Nachtaktiv | Tagaktiv | Wechselwarm | Gleichwarm | 1 | Uhu
Wie nennt man Tiere, deren Körpertemperatur sich der Umgebung anpasst? | Wechselwarm | Gleichwarm | Warmblütig | Kaltfest | 2 | Reptilien | alt=wechselwarme Tiere
Wie viele Mägen hat eine Kuh (Magenabschnitte)? | 4 | 1 | 2 | 6 | 1 | Hausrind
Wie nennt man Tiere, die ihr Futter wiederkäuen? | Wiederkäuer | Nagetiere | Raubtiere | Insektenfresser | 1 | Wiederkäuer
Wie heißen die Hörner eines Hirsches richtig? | Geweih | Gehörn | Stoßzähne | Hauer | 1 | Rothirsch
Woraus bestehen die Stoßzähne von Elefanten? | Elfenbein | Horn | Knochen | Keratin | 1 | Elfenbein
Welches Tier hat schwarz-weiße Streifen und ist mit dem Pferd verwandt? | Zebra | Okapi | Tapir | Antilope | 1 | Zebras
Wie heißt ein Kreuzung aus Pferdestute und Eselhengst? | Maultier | Maulesel | Pony | Zebroid | 2 | Maultier
Was sammeln Hamster in ihren Backentaschen? | Futter | Wasser | Steine | Junge | 1 | Feldhamster | mc
Wie viele Beine hat ein Insekt? | 6 | 8 | 4 | 10 | 1 | Insekten
Wie viele Beine hat ein Hummer? | 10 | 8 | 6 | 12 | 2 | Europäischer Hummer
Wie viele Beine hat ein Skorpion? | 8 | 6 | 10 | 12 | 2 | Skorpione
Wie viele Körperabschnitte hat ein Insekt? | 3 | 2 | 4 | 6 | 2 | Insekten
Was ist ein Tausendfüßer? | Ein Gliederfüßer | Ein Wurm | Ein Insekt | Eine Schlange | 2 | Tausendfüßer | mc
Mit welchem Organ atmen Fische? | Kiemen | Lunge | Haut | Luftsack | 1 | Kiemen
Wie atmen Wale? | Mit der Lunge über das Blasloch | Mit Kiemen | Durch die Haut | Gar nicht | 1 | Blauwal | mc
Was ist das Besondere am Lachs bei der Fortpflanzung? | Er wandert zum Laichen flussaufwärts | Er legt Eier an Land | Er bringt lebende Junge zur Welt | Er laicht nur im Eis | 2 | Atlantischer Lachs | mc
Bei welchem Tier trägt das Männchen die Jungen aus? | Seepferdchen | Pinguin | Krake | Schildkröte | 1 | Seepferdchen
Welches Tier kann verlorene Gliedmaßen nachwachsen lassen? | Axolotl | Frosch | Hund | Spatz | 2 | Axolotl
Welches Tier kann bei Gefahr seinen Schwanz abwerfen? | Eidechse | Schlange | Frosch | Igel | 1 | Zauneidechse
Was macht ein Stinktier bei Gefahr? | Es versprüht übel riechendes Sekret | Es stellt sich tot | Es rollt sich ein | Es gräbt sich ein | 1 | Streifenskunk | mc
Was macht ein Igel bei Gefahr? | Er rollt sich zu einer Stachelkugel | Er springt weg | Er stellt sich tot | Er versprüht Gift | 1 | Braunbrustigel | mc
Wovon ernährt sich ein Ameisenbär? | Ameisen und Termiten | Fisch | Gras | Früchte | 1 | Großer Ameisenbär
Wovon ernähren sich Raupen meistens? | Blättern | Nektar | Blut | Holz | 1 | Raupe
Was trinken Kolibris hauptsächlich? | Nektar | Wasser | Milch | Baumsaft | 1 | Kolibris
Welche Tiere bauen Dämme in Flüssen? | Biber | Otter | Bisamratten | Enten | 1 | Europäischer Biber
Welcher Vogel legt seine Eier in fremde Nester? | Kuckuck | Amsel | Specht | Taube | 1 | Kuckuck
Welcher Vogel klopft mit dem Schnabel Löcher in Bäume? | Specht | Kuckuck | Kleiber | Eichelhäher | 1 | Buntspecht
Welcher Vogel kann den Kopf fast ganz nach hinten drehen? | Eule | Taube | Ente | Storch | 1 | Waldkauz
Welcher Vogel gilt in Deutschland als Frühlingsbote, der aus Afrika zurückkehrt? | Weißstorch | Amsel | Spatz | Krähe | 1 | Weißstorch
Wie nennt man Vögel, die im Herbst in den Süden fliegen? | Zugvögel | Standvögel | Greifvögel | Laufvögel | 1 | Vogelzug
Warum sind Flamingos rosa? | Durch Farbstoffe in ihrer Nahrung | Durch Sonnenbrand | Sie werden so geboren | Durch das Salzwasser | 1 | Rosaflamingo | mc
Welcher Pinguin ist der größte? | Kaiserpinguin | Königspinguin | Eselspinguin | Brillenpinguin | 1 | Kaiserpinguin
Welches Tier ist das Wappentier der USA? | Weißkopfseeadler | Bison | Puma | Steinadler | 1 | Weißkopfseeadler
Welches Tier ist das Nationaltier Australiens (neben dem Emu)? | Känguru | Koala | Dingo | Wombat | 1 | Rotes Riesenkänguru
Welches Tier lebt in einer Symbiose mit Seeanemonen? | Clownfisch | Seepferdchen | Hai | Kugelfisch | 1 | Orangeringel-Anemonenfisch
Wie viele Arme hat ein Krake? | 8 | 6 | 10 | 12 | 1 | Gewöhnlicher Krake
Wie verteidigt sich ein Tintenfisch? | Er stößt eine Tintenwolke aus | Er sticht | Er beißt giftig | Er leuchtet hell | 1 | Gemeiner Tintenfisch | mc
Welches Meerestier hat keinen Knochen und kein Gehirn, kann aber nesseln? | Qualle | Seestern | Krake | Seegurke | 1 | Ohrenqualle
Welches Insekt kann Malaria übertragen? | Anopheles-Mücke | Stubenfliege | Biene | Floh | 1 | Anopheles
Welches Tier überträgt die Krankheit Borreliose? | Zecke | Mücke | Floh | Wanze | 1 | Gemeiner Holzbock
Wie viele Punkte hat der bei uns häufigste Marienkäfer? | 7 | 5 | 2 | 10 | 1 | Siebenpunkt-Marienkäfer
Wovon leben Spinnen hauptsächlich? | Insekten | Pflanzen | Nektar | Pilzen | 1 | Gartenkreuzspinne
Welche Ameisen schneiden Blätter, um darauf Pilze zu züchten? | Blattschneiderameisen | Waldameisen | Wanderameisen | Feuerameisen | 2 | Blattschneiderameisen
Welches Tier ist bekannt für Tanzen zur Futterquelle-Mitteilung? | Honigbiene | Ameise | Wespe | Hummel | 2 | Westliche Honigbiene
Wie viele Augen hat eine Biene? | 5 | 2 | 4 | 8 | 2 | Westliche Honigbiene
Welcher Schmetterling wandert jährlich Tausende Kilometer zwischen Kanada und Mexiko? | Monarchfalter | Zitronenfalter | Admiral | Kohlweißling | 2 | Monarchfalter
Wie heißt der Hund des Menschen in der Wildform? | Wolf | Fuchs | Kojote | Schakal | 1 | Wolf
Von welchem Wildtier stammt das Hausschwein ab? | Wildschwein | Warzenschwein | Pekari | Tapir | 1 | Wildschwein
Von welchem Wildtier stammt das Hausrind ab? | Auerochse | Wisent | Bison | Yak | 2 | Auerochse
Welche Katze ist die größte der Welt? | Tiger | Löwe | Jaguar | Leopard | 1 | Tiger
Welche Großkatze lebt in Rudeln? | Löwe | Tiger | Leopard | Gepard | 1 | Löwe
Welche Großkatze hat schwarze Flecken in Rosettenform und lebt in Amerika? | Jaguar | Leopard | Gepard | Puma | 2 | Jaguar
Welcher Affe ist dem Menschen genetisch am nächsten? | Schimpanse | Gorilla | Orang-Utan | Pavian | 1 | Gemeiner Schimpanse
Welches Tier wird auch „Wüstenschiff“ genannt? | Kamel | Esel | Pferd | Lama | 1 | Dromedar
Wie viele Höcker hat ein Dromedar? | 1 | 2 | 3 | 0 | 1 | Dromedar
Wie viele Höcker hat ein Trampeltier? | 2 | 1 | 3 | 0 | 1 | Trampeltier
Was speichert ein Kamel in seinem Höcker? | Fett | Wasser | Luft | Milch | 2 | Dromedar | mc
Welches Tier ist das schnellste im Wasser? | Fächerfisch | Delfin | Hai | Lachs | 2 | Fächerfische
Wie heißt das ausgestorbene Tier, das als Symbol des Artensterbens gilt und auf Mauritius lebte? | Dodo | Mammut | Säbelzahntiger | Auerochse | 1 | Dodo
Wann starben die Dinosaurier (außer den Vögeln) aus? | Vor etwa 66 Millionen Jahren | Vor 10.000 Jahren | Vor 1 Million Jahren | Vor 500 Millionen Jahren | 1 | Tyrannosaurus | mc
Welcher Dinosaurier war ein großer Fleischfresser mit kurzen Armen? | Tyrannosaurus rex | Triceratops | Brachiosaurus | Stegosaurus | 1 | Tyrannosaurus | alt=T-Rex/Tyrannosaurus
Welcher Dinosaurier hatte drei Hörner im Gesicht? | Triceratops | Stegosaurus | Velociraptor | Diplodocus | 1 | Triceratops
Welcher Dinosaurier hatte Knochenplatten auf dem Rücken? | Stegosaurus | Triceratops | Brachiosaurus | Ankylosaurus | 2 | Stegosaurus
Welches Urzeittier mit langem Fell lebte in der Eiszeit? | Wollhaarmammut | Dinosaurier | Riesenechse | Pterodactylus | 1 | Wollhaarmammut | alt=Mammut
Welcher Urvogel gilt als Bindeglied zwischen Dinosauriern und Vögeln? | Archaeopteryx | Pteranodon | Dodo | Moa | 2 | Archaeopteryx

# Pflanzen
Was brauchen Pflanzen für die Photosynthese außer Wasser und CO₂? | Licht | Dunkelheit | Sauerstoff | Zucker | 1 | Photosynthese
Was geben Pflanzen bei der Photosynthese ab? | Sauerstoff | Kohlendioxid | Stickstoff | Methan | 1 | Photosynthese
Mit welchem Pflanzenteil nehmen Pflanzen Wasser auf? | Wurzel | Blatt | Blüte | Stängel | 1 | Wurzel
Wie nennt man Bäume, die im Herbst ihre Blätter abwerfen? | Laubbäume | Nadelbäume | Palmen | Immergrüne | 1 | Laubwald
Welcher Nadelbaum verliert im Herbst seine Nadeln? | Lärche | Fichte | Tanne | Kiefer | 1 | Europäische Lärche
Woran kann man das Alter eines gefällten Baumes erkennen? | An den Jahresringen | An der Rinde | An der Höhe | An den Wurzeln | 1 | Jahresring
Welcher Baum ist der häufigste in deutschen Wäldern? | Fichte | Buche | Eiche | Kiefer | 2 | Gemeine Fichte
Welcher ist der höchste Baum der Welt (Art)? | Küstenmammutbaum | Eukalyptus | Douglasie | Riesenmammutbaum | 2 | Küstenmammutbaum
Was ist ein Fliegenpilz? | Ein giftiger Pilz | Ein Speisepilz | Eine Blume | Ein Insekt | 1 | Fliegenpilz | mc
Welcher Pilz ist der giftigste in Europa? | Grüner Knollenblätterpilz | Fliegenpilz | Pfifferling | Steinpilz | 2 | Grüner Knollenblätterpilz
Welcher dieser Pilze ist ein beliebter Speisepilz? | Steinpilz | Fliegenpilz | Knollenblätterpilz | Satanspilz | 1 | Steinpilz | mc
Welche Pflanze fängt Insekten mit klappenden Blättern? | Venusfliegenfalle | Sonnentau | Kannenpflanze | Brennnessel | 1 | Venusfliegenfalle
Welche Pflanze brennt bei Berührung auf der Haut? | Brennnessel | Löwenzahn | Klee | Schafgarbe | 1 | Große Brennnessel
Wie heißt die Pflanze mit Pusteblumen-Samen? | Löwenzahn | Gänseblümchen | Klee | Kamille | 1 | Gewöhnlicher Löwenzahn
Welche Blume dreht sich zur Sonne? | Sonnenblume | Tulpe | Rose | Lilie | 1 | Sonnenblume
Aus welchem Land kam die Tulpe ursprünglich nach Europa? | Osmanisches Reich (Türkei) | Niederlande | Frankreich | China | 2 | Tulpen | mc
Welche Pflanze ist das Symbol Irlands? | Kleeblatt | Rose | Distel | Lilie | 2 | Weißklee | alt=Klee/Shamrock
Was ist ein vierblättriges Kleeblatt im Volksglauben? | Ein Glücksbringer | Ein Unglückszeichen | Ein Heilmittel | Ein Gift | 1 | Weißklee | mc
Welches Gewürz stammt aus den Narben einer Krokusblüte? | Safran | Zimt | Vanille | Muskat | 2 | Safran
Aus welchem Pflanzenteil wird Zimt gewonnen? | Rinde | Wurzel | Blüte | Samen | 2 | Zimt
Welche Pflanze liefert die Rohstoffe für Schokolade? | Kakaobaum | Kaffeestrauch | Vanille | Zuckerrohr | 1 | Kakaobaum
Aus welcher Pflanze wird Zucker in Europa hauptsächlich gewonnen? | Zuckerrübe | Zuckerrohr | Mais | Kartoffel | 1 | Zuckerrübe
Wo wächst die Kartoffel, die wir essen? | Unter der Erde | Am Strauch als Frucht | Am Baum | Im Wasser | 1 | Kartoffel | mc
Aus welchem Kontinent stammt die Kartoffel ursprünglich? | Südamerika | Europa | Asien | Afrika | 1 | Kartoffel
Woher stammt die Tomate ursprünglich? | Südamerika | Italien | Indien | Afrika | 2 | Tomate
Was ist die Banane botanisch gesehen? | Eine Beere | Eine Nuss | Ein Steinobst | Ein Gemüse | 2 | Bananen | mc
Was ist die Erdbeere botanisch gesehen? | Eine Sammelnussfrucht | Eine Beere | Ein Steinobst | Eine Kernfrucht | 2 | Gartenerdbeere | mc
Was ist die Tomate botanisch gesehen? | Eine Beere | Eine Nuss | Ein Steinobst | Ein Wurzelgemüse | 2 | Tomate | mc
Welches Obst gehört zum Steinobst? | Kirsche | Apfel | Birne | Erdbeere | 1 | Süßkirsche | mc
Welche Frucht wächst an Palmen und hat eine harte, haarige Schale? | Kokosnuss | Ananas | Mango | Dattel | 1 | Kokospalme
Woraus wird Popcorn gemacht? | Mais | Weizen | Reis | Hafer | 1 | Mais
Aus welcher Pflanze wird Tequila hergestellt? | Agave | Kaktus | Zuckerrohr | Mais | 2 | Agaven
Was ist Bambus botanisch? | Ein Gras | Ein Baum | Ein Farn | Ein Strauch | 2 | Bambus | mc
Welche Pflanze wächst am schnellsten auf der Welt? | Bambus | Efeu | Eiche | Kürbis | 2 | Bambus
Wie heißt der grüne Farbstoff der Pflanzen? | Chlorophyll | Melanin | Carotin | Hämoglobin | 1 | Chlorophyll
Wie nennt man Pflanzen, die sehr trockene Gebiete vertragen und Wasser speichern? | Sukkulenten | Farne | Moose | Algen | 2 | Sukkulente
Welche Pflanzen vermehren sich über Sporen statt Samen? | Farne | Rosen | Tulpen | Eichen | 2 | Farne
Was bestäubt viele Blüten? | Insekten wie Bienen | Regenwürmer | Fische | Schnecken | 1 | Bestäubung | mc
Welche Farbe haben die Blüten des Rapses? | Gelb | Blau | Rot | Weiß | 1 | Raps
Welche Blume ist Symbol für Liebe? | Rose | Nelke | Tulpe | Lilie | 1 | Rosen
Welche Blume steht als Symbol für Frankreichs Königtum? | Lilie | Rose | Iris | Tulpe | 2 | Lilien (Gattung)
Wie heißt die Blume, die im Vorfrühling oft durch den Schnee blüht? | Schneeglöckchen | Sonnenblume | Rose | Mohn | 1 | Kleines Schneeglöckchen
Aus welcher Pflanze wird Leinen gewonnen? | Flachs | Baumwolle | Hanf | Jute | 2 | Gemeiner Lein
Aus welcher Pflanze gewinnt man Naturkautschuk? | Kautschukbaum | Eiche | Ahorn | Palme | 2 | Kautschukbaum

# Lebensräume und Umwelt
Welcher Lebensraum hat die größte Artenvielfalt an Land? | Tropischer Regenwald | Wüste | Tundra | Savanne | 1 | Tropischer Regenwald
Wie nennt man baumlose Kältesteppen im hohen Norden? | Tundra | Taiga | Savanne | Prärie | 2 | Tundra
Wie nennt man den riesigen Nadelwaldgürtel im Norden Russlands und Kanadas? | Taiga | Tundra | Steppe | Pampa | 2 | Taiga
Wie nennt man die Graslandschaften Afrikas mit vereinzelten Bäumen? | Savanne | Prärie | Pampa | Steppe | 1 | Savanne
Wie heißt das größte Korallenriff der Welt? | Great Barrier Reef | Belize Barrier Reef | Rotes Meer Riff | Malediven-Riff | 1 | Great Barrier Reef
Was ist ein Watt? | Ein Küstenbereich, der bei Ebbe trockenfällt | Ein Bergsee | Ein Moor | Eine Sandwüste | 1 | Wattenmeer | mc
Wie nennt man das Ansteigen und Absinken des Meeresspiegels zweimal täglich? | Gezeiten | Strömung | Brandung | Tsunami | 1 | Gezeiten | alt=Ebbe und Flut/Tide
Was verursacht hauptsächlich die Gezeiten? | Die Anziehungskraft des Mondes | Der Wind | Die Erdrotation allein | Unterseeische Vulkane | 1 | Gezeiten | mc
Welches Gas gilt als wichtigstes vom Menschen verursachtes Treibhausgas? | Kohlendioxid | Sauerstoff | Stickstoff | Helium | 1 | Treibhauseffekt
Wie nennt man den Schutz der Erde vor UV-Strahlung in der Stratosphäre? | Ozonschicht | Troposphäre | Magnetfeld | Wolkenschicht | 1 | Ozonschicht
Wie nennt man Energie aus Sonne, Wind und Wasser? | Erneuerbare Energie | Fossile Energie | Kernenergie | Graue Energie | 1 | Erneuerbare Energie
Welche Tiere sind für die Bestäubung von Obstbäumen besonders wichtig? | Bienen | Ameisen | Käfer | Schnecken | 1 | Westliche Honigbiene
Was bedeutet „Nahrungskette“? | Wer frisst wen | Eine Kette aus Lebensmitteln | Ein Supermarkt | Ein Fischernetz | 1 | Nahrungskette | mc
Wie nennt man Lebewesen, die abgestorbenes Material zersetzen? | Destruenten | Produzenten | Konsumenten | Parasiten | 2 | Destruent
Wie nennt man ein Lebewesen, das auf Kosten eines anderen lebt? | Parasit | Symbiont | Räuber | Produzent | 1 | Parasitismus
Wie heißt das Zusammenleben zweier Arten zum gegenseitigen Nutzen? | Symbiose | Parasitismus | Konkurrenz | Räuber-Beute | 1 | Symbiose
Was ist ein Nationalpark? | Ein großes geschütztes Naturgebiet | Ein Freizeitpark | Ein Stadtpark | Ein Zoo | 1 | Nationalpark Bayerischer Wald | mc
Wie heißt Deutschlands ältester Nationalpark (1970)? | Bayerischer Wald | Harz | Eifel | Berchtesgaden | 2 | Nationalpark Bayerischer Wald
Wie heißt der Nationalpark an der Nordseeküste, der zum Weltnaturerbe gehört? | Wattenmeer | Müritz | Hainich | Kellerwald | 1 | Wattenmeer
Wie viel Prozent der Erdoberfläche sind ungefähr von Wasser bedeckt? | 71 % | 50 % | 90 % | 30 % | 1 | Ozean
Wie viel Prozent des Wassers auf der Erde ist Süßwasser (ungefähr)? | 3 % | 30 % | 50 % | 10 % | 2 | Süßwasser
Woraus entstehen Wolken? | Aus Wassertröpfchen oder Eiskristallen | Aus Rauch | Aus Staub allein | Aus Stickstoff | 1 | Wolke | mc
Was misst die Beaufort-Skala? | Windstärke | Erdbebenstärke | Temperatur | Luftfeuchte | 2 | Beaufortskala
Was misst die Richterskala? | Erdbebenstärke | Windstärke | Regenmenge | Lautstärke | 1 | Richterskala
Wie nennt man einen tropischen Wirbelsturm im Atlantik? | Hurrikan | Taifun | Tornado | Monsun | 1 | Hurrikan
Wie nennt man einen tropischen Wirbelsturm im Nordwestpazifik? | Taifun | Hurrikan | Zyklon | Tornado | 2 | Taifun
Wie heißt der Wind, der im Sommer in Südasien starke Regenfälle bringt? | Monsun | Föhn | Mistral | Passat | 1 | Monsun
Wie heißt der warme, trockene Fallwind an den Alpen? | Föhn | Mistral | Bora | Schirokko | 1 | Föhn
Welche Farben hat ein Regenbogen in der richtigen Reihenfolge außen beginnend? | Rot, Orange, Gelb, Grün, Blau, Violett | Blau, Grün, Rot, Gelb | Violett, Rot, Grün | Gelb, Rot, Blau | 1 | Regenbogen | mc
Was entsteht, wenn Sonnenlicht auf Regentropfen trifft und gebrochen wird? | Regenbogen | Gewitter | Nebel | Hagel | 1 | Regenbogen
Wie nennt man gefrorenen Regen in Körnern? | Hagel | Schnee | Tau | Raureif | 1 | Hagel
`);
})();
