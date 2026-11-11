/* Allgemeinwissen – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "allgemein";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const OPP = parse(`
optimistisch;pessimistisch
subjektiv;objektiv
Minimum;Maximum
konkav;konvex
Synonym;Antonym
Import;Export
Theorie;Praxis
Ebbe;Flut
homogen;heterogen
extrovertiert;introvertiert
analog;digital
abstrakt;konkret
offensiv;defensiv
Diktatur;Demokratie
Zenit;Nadir
Plural;Singular
Angebot;Nachfrage
Inflation;Deflation
Prolog;Epilog
Vorteil;Nachteil
`);
  table(C, OPP, { q: (o) => `Was ist das Gegenteil von „${o[0]}“?`, a: (o) => o[1], pool: OPP.map((o) => o[1]), diff: (o) => (["optimistisch", "Import", "Theorie", "Ebbe", "Plural", "Vorteil", "Minimum", "analog", "Diktatur"].includes(o[0]) ? 1 : 2) });

  const WORD = parse(`
ambivalent;zwiespältig
empathisch;einfühlsam
redundant;mehrfach vorhanden, überflüssig
eloquent;redegewandt
pragmatisch;praktisch, sachbezogen
nostalgisch;sehnsüchtig zurückblickend
arrogant;überheblich
skeptisch;zweifelnd
obsolet;veraltet, überholt
prekär;heikel, unsicher
marginal;geringfügig
temporär;vorübergehend
simultan;gleichzeitig
diskret;verschwiegen, unauffällig
kompatibel;vereinbar, zusammenpassend
banal;alltäglich, gewöhnlich
chronisch;dauerhaft, langwierig
latent;verborgen vorhanden
explizit;ausdrücklich
implizit;mitgemeint, nicht ausdrücklich
ad hoc;aus dem Stegreif, spontan
de facto;tatsächlich
Status quo;der aktuelle Zustand
Fauxpas;Taktlosigkeit, Fehltritt
Déjà-vu;Gefühl, etwas schon erlebt zu haben
Prokrastination;Aufschieben von Aufgaben
Euphorie;überschwängliche Begeisterung
Ignoranz;absichtliches Nichtbeachten
Kompromiss;Einigung durch gegenseitiges Nachgeben
Klischee;abgedroschenes Vorurteil
`);
  table(C, WORD, { q: (w) => `Was bedeutet „${w[0]}“?`, a: (w) => w[1], pool: WORD.map((w) => w[1]), mc: true, diff: (w) => (["empathisch", "arrogant", "skeptisch", "temporär", "simultan", "Kompromiss", "Déjà-vu", "Euphorie", "Klischee", "Fauxpas"].includes(w[0]) ? 1 : 2) });

  const WHO = parse(`
Jemand, der kein Fleisch isst;Vegetarier
Jemand, der keine tierischen Produkte isst;Veganer
Jemand, der immer das Gute erwartet;Optimist
Jemand, der immer das Schlechte erwartet;Pessimist
Jemand, der Überreste vergangener Kulturen ausgräbt;Archäologe
Jemand, der für die NASA oder ESA ins All fliegt;Astronaut
Jemand, der für Russland ins All fliegt;Kosmonaut
Eine Ärztin oder ein Arzt, der operiert;Chirurg
Jemand, der Tiere medizinisch behandelt;Tierarzt
Jemand, der Brillen anpasst;Optiker
Jemand, der Gespräche mündlich übersetzt;Dolmetscher
Jemand, der Briefmarken sammelt;Philatelist
Jemand, der Münzen sammelt;Numismatiker
Jemand, der viele Sprachen spricht;Polyglotter Mensch
Jemand, der vor allem an andere denkt;Altruist
Jemand, der vor allem an sich denkt;Egoist
Jemand, der Sprachen wissenschaftlich erforscht;Linguist
Jemand, der Geburten begleitet;Hebamme
Jemand, der Wetter vorhersagt;Meteorologe
Jemand, der Häuser entwirft;Architekt
Jemand, der vor Gericht Angeklagte verteidigt;Rechtsanwalt
Jemand, der Bücher in einer Bibliothek verwaltet;Bibliothekar
`);
  table(C, WHO, { q: (w) => `Wie nennt man: ${w[0]}?`, a: (w) => w[1], pool: WHO.map((w) => w[1]), diff: (w) => (["Philatelist", "Numismatiker", "Polyglotter Mensch", "Altruist", "Linguist", "Kosmonaut"].includes(w[1]) ? 2 : 1), alt: (w) => (w[1] === "Polyglotter Mensch" ? ["Polyglott", "Polyglotter"] : w[1] === "Rechtsanwalt" ? ["Anwalt", "Verteidiger"] : w[1] === "Tierarzt" ? ["Veterinär"] : []) });

  lines(C, `
Wie viele Stück sind ein Dutzend? | 12 | 10 | 6 | 20 | 1 | Dutzend
Wie viele Stück sind ein Gros (zwölf Dutzend)? | 144 | 120 | 100 | 200 | 2 | Gros (Einheit)
Wie viele Stück sind ein Schock (alte Zähleinheit)? | 60 | 50 | 100 | 12 | 2 | Schock (Einheit)
Wie viele Dinge sind „ein Paar“? | 2 | 3 | 4 | 1 | 1 | Paar
Welche Hand nutzen die meisten Menschen zum Schreiben? | Rechts | Links | Beide gleich | Keine | 1 | Händigkeit
Was ist ein Palindrom? | Ein Wort, das vorwärts und rückwärts gleich lautet | Ein Reim | Ein Fremdwort | Ein zusammengesetztes Wort | 1 | Palindrom | mc
Welches dieser Wörter ist ein Palindrom? | Rentner | Lehrer | Bäcker | Fahrer | 1 | Palindrom | mc
Was ist ein Anagramm? | Ein Wort aus umgestellten Buchstaben eines anderen | Ein Gedicht | Eine Abkürzung | Ein Fremdwort | 2 | Anagramm | mc
Welche Wortart ist „schnell“? | Adjektiv | Verb | Nomen | Präposition | 1 | Adjektiv
Welche Wortart ist „laufen“? | Verb | Adjektiv | Nomen | Artikel | 1 | Verb
Welche Wortart ist „unter“? | Präposition | Verb | Adjektiv | Pronomen | 1 | Präposition
Welche Wortart sind „der, die, das“? | Artikel | Pronomen | Präposition | Konjunktion | 1 | Artikel (Wortart)
Wie viele Fälle (Kasus) hat die deutsche Sprache? | 4 | 3 | 5 | 6 | 1 | Kasus
Wie heißt der zweite Fall im Deutschen? | Genitiv | Dativ | Akkusativ | Nominativ | 1 | Genitiv
Wie heißt der Fall nach „wem?“ | Dativ | Genitiv | Akkusativ | Nominativ | 1 | Dativ
Wie heißt der Fall nach „wen oder was?“ | Akkusativ | Dativ | Genitiv | Nominativ | 1 | Akkusativ
Was ist die Mehrzahl von „Museum“? | Museen | Museums | Musea | Museumme | 1 | Museum
Was ist die Mehrzahl von „Thema“? | Themen | Themas | Themata | Themae | 1 | Thema
Was ist die Mehrzahl von „Visum“? | Visa | Visums | Visen | Visume | 2 | Visum | alt=Visen
Wie heißt die Sprache, die in Österreich offiziell gesprochen wird? | Deutsch | Österreichisch | Bairisch | Alemannisch | 1 | Österreichisches Deutsch
In welchen vier Sprachen ist Schweizer Amtssprache? | Deutsch, Französisch, Italienisch, Rätoromanisch | Deutsch, Französisch, Englisch, Italienisch | Deutsch, Schwedisch, Französisch, Italienisch | Nur Deutsch | 1 | Schweiz | mc
Welche Sprache spricht man in Brasilien? | Portugiesisch | Spanisch | Brasilianisch | Englisch | 1 | Portugiesische Sprache
Welche Sprache wird weltweit am häufigsten gelernt? | Englisch | Spanisch | Chinesisch | Deutsch | 1 | Englische Sprache
Wie heißt die Plansprache, die 1887 als Weltsprache erfunden wurde? | Esperanto | Klingonisch | Latein | Volapük | 1 | Esperanto
Welche Sprache war die Sprache der alten Römer? | Latein | Griechisch | Italienisch | Etruskisch | 1 | Latein
Was bedeutet „Bon appétit“? | Guten Appetit | Guten Tag | Auf Wiedersehen | Gute Nacht | 1 | Französische Sprache
Was bedeutet „Gracias“ auf Spanisch? | Danke | Bitte | Hallo | Tschüss | 1 | Spanische Sprache
Was bedeutet „Arrivederci“? | Auf Wiedersehen | Willkommen | Danke | Prost | 1 | Italienische Sprache
Was bedeutet „Konnichiwa“? | Guten Tag (Hallo) | Danke | Auf Wiedersehen | Prost | 2 | Japanische Sprache | mc
Was bedeutet „Merhaba“ auf Türkisch? | Hallo | Danke | Tschüss | Bitte | 2 | Türkische Sprache
Was bedeutet „Dziękuję“ auf Polnisch? | Danke | Hallo | Bitte | Prost | 2 | Polnische Sprache
Wie sagt man „Danke“ auf Niederländisch? | Dank je | Takk | Tack | Grazie | 2 | Niederländische Sprache | alt=Dank u/Dankjewel
Wie sagt man „Prost“ auf Schwedisch? | Skål | Salud | Santé | Cin cin | 2 | Schwedische Sprache
Was ist die Hauptstadt der Europäischen Union (inoffiziell)? | Brüssel | Straßburg | Luxemburg | Berlin | 1 | Brüssel
Was ist ein Zeppelin? | Ein Luftschiff | Ein U-Boot | Ein Zug | Ein Flugzeug mit Propeller | 1 | Zeppelin
Was ist ein Iglu? | Ein Haus aus Schneeblöcken | Ein Zelt aus Fell | Eine Hütte aus Holz | Ein Boot | 1 | Iglu
Was ist eine Jurte? | Ein rundes Zelt der Nomaden in Zentralasien | Ein Boot | Ein Eskimohaus | Ein Getreide | 2 | Jurte
Wie heißt das Wahrzeichen von Paris? | Eiffelturm | Arc de Triomphe | Louvre | Notre-Dame | 1 | Eiffelturm
Wie heißt das Wahrzeichen von Berlin am Pariser Platz? | Brandenburger Tor | Siegessäule | Fernsehturm | Reichstag | 1 | Brandenburger Tor
Wie heißt das Wahrzeichen von Köln? | Kölner Dom | Hohenzollernbrücke | Rheinturm | Römerberg | 1 | Kölner Dom
Wie heißt die berühmte Uhr am britischen Parlament? | Big Ben | Tower Clock | Westminster Bell | Royal Clock | 1 | Big Ben
Welche Statue steht im Hafen von New York? | Freiheitsstatue | Christus der Erlöser | Der Denker | Kleine Meerjungfrau | 1 | Freiheitsstatue
Wo steht die Statue „Die kleine Meerjungfrau“? | Kopenhagen | Oslo | Stockholm | Amsterdam | 1 | Kleine Meerjungfrau
Welche Statue thront über Rio de Janeiro? | Cristo Redentor | Freiheitsstatue | Sphinx | David | 1 | Cristo Redentor | alt=Christus der Erlöser/Christusstatue
Aus wie vielen Flächen besteht ein klassischer Fußball? | 32 | 24 | 20 | 12 | 2 | Fußball (Sportgerät)
Welches Tier ist auf dem Wappen Berlins? | Bär | Adler | Löwe | Pferd | 1 | Wappen Berlins
Welches Tier ist das Wappentier Deutschlands? | Adler | Löwe | Bär | Hirsch | 1 | Bundesadler
Welches Tier ist das Wappentier Bayerns? | Löwe | Adler | Bär | Pferd | 2 | Bayerisches Staatswappen
Welches Tier ist das Wappentier Niedersachsens? | Pferd | Löwe | Bär | Adler | 2 | Wappen Niedersachsens
Welcher Vogel steht auf der Euro-Münze Deutschlands (1, 2 Euro)? | Adler | Eule | Taube | Storch | 1 | Deutsche Euromünzen
Was ist auf den deutschen 10-, 20- und 50-Cent-Münzen abgebildet? | Brandenburger Tor | Eichenzweig | Bundesadler | Reichstag | 2 | Deutsche Euromünzen
Was ist auf den deutschen 1-, 2- und 5-Cent-Münzen abgebildet? | Eichenzweig | Brandenburger Tor | Bundesadler | Lindenblatt | 2 | Deutsche Euromünzen
Wie viele Menschen leben ungefähr auf der Erde (2025)? | 8 Milliarden | 6 Milliarden | 10 Milliarden | 5 Milliarden | 1 | Weltbevölkerung
Wie viele Menschen leben ungefähr in Deutschland? | 84 Millionen | 64 Millionen | 100 Millionen | 50 Millionen | 1 | Deutschland
Welches Land hat die meisten Einwohner (Stand 2025)? | Indien | China | USA | Indonesien | 1 | Indien
Welche Stadt ist die größte Deutschlands? | Berlin | Hamburg | München | Köln | 1 | Berlin
Welche ist die zweitgrößte Stadt Deutschlands? | Hamburg | München | Köln | Frankfurt am Main | 1 | Hamburg
`);
})();
