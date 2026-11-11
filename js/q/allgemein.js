/* Allgemeinwissen – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "allgemein";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  // Römische Zahlen
  const roman = (n) => [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");
  const NUMS = [4, 9, 12, 14, 19, 24, 29, 40, 44, 49, 50, 90, 99, 100, 400, 500, 900, 1000, 1492, 1789, 1914, 1989, 2000, 2025];
  table(C, NUMS, { q: (n) => `Welche Zahl ist die römische Zahl ${roman(n)}?`, a: (n) => n, wrong: (n) => [n + 1, n - 1 || n + 2, n + 10, n - 10 > 0 ? n - 10 : n + 5].filter((x, i, a) => a.indexOf(x) === i).slice(0, 3), diff: (n) => (n <= 50 || [100, 1000, 500].includes(n) ? 1 : 2), img: () => "Römische Zahlschrift" });
  table(C, NUMS.filter((n) => n <= 100 || [500, 1000, 2000].includes(n)), { q: (n) => `Wie schreibt man ${n} in römischen Zahlen?`, a: (n) => roman(n), wrong: (n) => [roman(n + 1), roman(Math.max(1, n - 1)), roman(n + 5)], diff: (n) => (n <= 20 ? 1 : 2), img: () => "Römische Zahlschrift" });

  const LAND = parse(`
Baden-Württemberg;Stuttgart
Bayern;München
Berlin;Berlin
Brandenburg;Potsdam
Bremen;Bremen
Hamburg;Hamburg
Hessen;Wiesbaden
Mecklenburg-Vorpommern;Schwerin
Niedersachsen;Hannover
Nordrhein-Westfalen;Düsseldorf
Rheinland-Pfalz;Mainz
Saarland;Saarbrücken
Sachsen;Dresden
Sachsen-Anhalt;Magdeburg
Schleswig-Holstein;Kiel
Thüringen;Erfurt
`);
  table(C, LAND.filter((l) => l[0] !== l[1]), { q: (l) => `Was ist die Landeshauptstadt von ${l[0]}?`, a: (l) => l[1], pool: [...LAND.map((l) => l[1]), "Frankfurt am Main", "Köln", "Nürnberg", "Leipzig", "Rostock", "Lübeck", "Kassel", "Koblenz"], diff: (l) => (["Bayern", "Sachsen", "Niedersachsen", "Baden-Württemberg"].includes(l[0]) ? 1 : 2), img: (l) => l[1] });
  table(C, LAND.filter((l) => l[0] !== l[1]), { q: (l) => `${l[1]} ist die Hauptstadt welches Bundeslandes?`, a: (l) => l[0], pool: LAND.map((l) => l[0]), diff: (l) => (["München", "Dresden", "Stuttgart", "Kiel"].includes(l[1]) ? 1 : 2), img: (l) => l[1] });

  const CUR = parse(`
Japan;Yen
China;Renminbi (Yuan)
Indien;Indische Rupie
Russland;Rubel
Vereinigtes Königreich;Pfund Sterling
USA;US-Dollar
Schweiz;Schweizer Franken
Polen;Złoty
Tschechien;Tschechische Krone
Dänemark;Dänische Krone
Schweden;Schwedische Krone
Norwegen;Norwegische Krone
Ungarn;Forint
Türkei;Türkische Lira
Brasilien;Real
Mexiko;Mexikanischer Peso
Südafrika;Rand
Südkorea;Won
Thailand;Baht
Israel;Schekel
Saudi-Arabien;Saudi-Riyal
Kanada;Kanadischer Dollar
Australien;Australischer Dollar
Ägypten;Ägyptisches Pfund
Rumänien;Leu
Vietnam;Dong
Indonesien;Rupiah
Ukraine;Hrywnja
Kroatien;Euro
Nigeria;Naira
Kenia;Kenia-Schilling
Argentinien;Argentinischer Peso
Island;Isländische Krone
Österreich;Euro
`);
  table(C, CUR, { q: (c) => `Mit welcher Währung bezahlt man in ${c[0] === "USA" ? "den USA" : c[0] === "Vereinigtes Königreich" ? "Großbritannien" : c[0] === "Türkei" ? "der Türkei" : c[0] === "Schweiz" ? "der Schweiz" : c[0] === "Ukraine" ? "der Ukraine" : c[0]}?`, a: (c) => c[1], pool: [...new Set(CUR.map((c) => c[1]))], diff: (c) => (["Japan", "USA", "Vereinigtes Königreich", "Russland", "Schweiz", "Österreich", "China", "Türkei"].includes(c[0]) ? 1 : 2), img: (c) => null });

  const ZOD = parse(`
5. April;Widder
3. Mai;Stier
10. Juni;Zwillinge
10. Juli;Krebs
5. August;Löwe
10. September;Jungfrau
10. Oktober;Waage
10. November;Skorpion
10. Dezember;Schütze
5. Januar;Steinbock
5. Februar;Wassermann
5. März;Fische
`);
  table(C, ZOD, { q: (z) => `Welches Sternzeichen hat man, wenn man am ${z[0]} Geburtstag hat?`, a: (z) => z[1], pool: ZOD.map((z) => z[1]), diff: 2, img: () => "Tierkreiszeichen" });

  const MONTH = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  table(C, MONTH.map((m, i) => [m, DAYS[i]]), { q: (m) => `Wie viele Tage hat der ${m[0]}${m[0] === "Februar" ? " in einem normalen Jahr (kein Schaltjahr)" : ""}?`, a: (m) => m[1], pool: ["28", "29", "30", "31"], diff: (m) => (["Februar", "Dezember", "Januar"].includes(m[0]) ? 1 : 2), img: () => "Kalender" });
  table(C, MONTH.map((m, i) => [m, i + 1]), { q: (m) => `Der wievielte Monat im Jahr ist der ${m[0]}?`, a: (m) => `${m[1]}.`, pool: MONTH.map((_, i) => `${i + 1}.`), diff: (m) => (["Januar", "Dezember", "Juni", "Mai"].includes(m[0]) ? 1 : 2), img: () => "Kalender" });

  const WED = parse(`
1;Papierne Hochzeit (Baumwollhochzeit)
5;Hölzerne Hochzeit
10;Rosenhochzeit
15;Gläserne Hochzeit
20;Porzellanhochzeit
25;Silberne Hochzeit
30;Perlenhochzeit
40;Rubinhochzeit
50;Goldene Hochzeit
60;Diamantene Hochzeit
65;Eiserne Hochzeit
`);
  table(C, WED, { q: (w) => `Wie heißt der ${w[0]}. Hochzeitstag?`, a: (w) => w[1], pool: WED.map((w) => w[1]), diff: (w) => (["25", "50", "60"].includes(w[0]) ? 1 : 2), img: () => "Ehering" });

  const QUOTE = parse(`
„Ich bin ein Berliner“;John F. Kennedy
„Veni, vidi, vici“ (Ich kam, sah und siegte);Julius Caesar
„Wir schaffen das“;Angela Merkel
„Ein kleiner Schritt für einen Menschen, ein riesiger Sprung für die Menschheit“;Neil Armstrong
„Ich weiß, dass ich nichts weiß“;Sokrates
„Wissen ist Macht“;Francis Bacon
„Gott ist tot“;Friedrich Nietzsche
„Mr. Gorbachev, tear down this wall!“;Ronald Reagan
„Ich habe euch nichts zu bieten als Blut, Mühsal, Tränen und Schweiß“;Winston Churchill
„Niemand hat die Absicht, eine Mauer zu errichten“;Walter Ulbricht
„Der Staat bin ich“ (zugeschrieben);Ludwig XIV.
„Alles fließt“ (Panta rhei);Heraklit
„Carpe diem“ (Nutze den Tag);Horaz
„Heureka!“ (Ich hab’s gefunden!);Archimedes
„Yes we can“;Barack Obama
„Hier stehe ich, ich kann nicht anders“ (überliefert);Martin Luther
„Und sie bewegt sich doch“ (zugeschrieben);Galileo Galilei
„Ich denke, also bin ich“;René Descartes
„I have a dream“;Martin Luther King
„Sei du selbst die Veränderung, die du dir wünschst für diese Welt“ (zugeschrieben);Mahatma Gandhi
„Phantasie ist wichtiger als Wissen“;Albert Einstein
„Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.“ (zugeschrieben);Bertolt Brecht
`);
  table(C, QUOTE, { q: (q) => `Von wem stammt das Zitat ${q[0]}?`, a: (q) => q[1], pool: QUOTE.map((q) => q[1]), diff: (q) => (["John F. Kennedy", "Julius Caesar", "Angela Merkel", "Neil Armstrong", "Barack Obama", "Martin Luther King", "René Descartes", "Sokrates"].includes(q[1]) ? 1 : 2), img: (q) => q[1] });

  const FOOD = parse(`
Pizza;Italien;Pizza
Tiramisu;Italien;Tiramisu
Sushi;Japan;Sushi
Paella;Spanien;Paella
Churros;Spanien;Churro
Croissant;Frankreich;Croissant
Crème brûlée;Frankreich;Crème brûlée
Gulasch;Ungarn;Gulasch
Borschtsch;Ukraine;Borschtsch
Tacos;Mexiko;Taco
Kimchi;Südkorea;Kimchi
Fish and Chips;Vereinigtes Königreich;Fish and Chips
Moussaka;Griechenland;Moussaka
Phở;Vietnam;Phở
Pad Thai;Thailand;Pad Thai
Wiener Schnitzel;Österreich;Wiener Schnitzel
Käsefondue;Schweiz;Käsefondue
Haggis;Schottland;Haggis
Smørrebrød;Dänemark;Smørrebrød
Pierogi;Polen;Piroggen
Ceviche;Peru;Ceviche
Feijoada;Brasilien;Feijoada
Poutine;Kanada;Poutine
Currywurst;Deutschland;Currywurst
Butter Chicken;Indien;Butter Chicken
Ramen;Japan;Ramen
Paprikahuhn (Paprikás csirke);Ungarn;Paprikahuhn
Köttbullar;Schweden;Köttbullar
`);
  table(C, FOOD, { q: (f) => `Aus welchem Land stammt das Gericht ${f[0]}?`, a: (f) => f[1], pool: [...new Set(FOOD.map((f) => f[1]))], diff: (f) => (["Pizza", "Sushi", "Paella", "Croissant", "Tacos", "Wiener Schnitzel", "Currywurst", "Fish and Chips", "Gulasch", "Käsefondue"].includes(f[0]) ? 1 : 2), img: (f) => f[2] });

  const HOL = parse(`
Heiligabend;24. Dezember
Silvester;31. Dezember
Tag der Arbeit;1. Mai
Valentinstag;14. Februar
Halloween;31. Oktober
Nikolaustag;6. Dezember
Allerheiligen;1. November
Martinstag (Sankt Martin);11. November
Internationaler Frauentag;8. März
Heilige Drei Könige;6. Januar
Tag der Deutschen Einheit;3. Oktober
`);
  table(C, HOL, { q: (h) => `An welchem Datum ist ${h[0]}?`, a: (h) => h[1], pool: HOL.map((h) => h[1]), diff: (h) => (["Heiligabend", "Silvester", "Valentinstag", "Halloween", "Tag der Arbeit", "Tag der Deutschen Einheit"].includes(h[0]) ? 1 : 2), img: (h) => h[0].replace(/ \(.*\)/, "") });

  const PROV = parse(`
Morgenstund hat …;Gold im Mund
Wer zuletzt lacht, …;lacht am besten
Übung macht …;den Meister
Ohne Fleiß …;kein Preis
Lügen haben …;kurze Beine
Der Apfel fällt nicht …;weit vom Stamm
Wer A sagt, …;muss auch B sagen
Aller Anfang …;ist schwer
Reden ist Silber, …;Schweigen ist Gold
Viele Köche …;verderben den Brei
Wer anderen eine Grube gräbt, …;fällt selbst hinein
Was du heute kannst besorgen, …;das verschiebe nicht auf morgen
Hunde, die bellen, …;beißen nicht
Der frühe Vogel …;fängt den Wurm
Kleider machen …;Leute
Ende gut, …;alles gut
Eile mit …;Weile
In der Kürze liegt …;die Würze
Wo ein Wille ist, …;ist auch ein Weg
Wie man in den Wald hineinruft, …;so schallt es heraus
Was Hänschen nicht lernt, …;lernt Hans nimmermehr
Stille Wasser …;sind tief
Den Letzten beißen …;die Hunde
Einem geschenkten Gaul …;schaut man nicht ins Maul
Wer nicht wagt, …;der nicht gewinnt
Andere Länder, …;andere Sitten
Der Klügere …;gibt nach
Hochmut kommt …;vor dem Fall
Steter Tropfen …;höhlt den Stein
Not macht …;erfinderisch
`);
  table(C, PROV, { q: (p) => `Wie geht das Sprichwort weiter? „${p[0]}“`, a: (p) => p[1], pool: PROV.map((p) => p[1]), diff: (p) => (PROV.indexOf(p) < 18 ? 1 : 2), img: () => null });

  lines(C, `
# Staat und Gesellschaft
Wie heißt die Verfassung der Bundesrepublik Deutschland? | Grundgesetz | Bürgerliches Gesetzbuch | Reichsverfassung | Bundesverfassung | 1 | Grundgesetz für die Bundesrepublik Deutschland
Wie lautet Artikel 1 des Grundgesetzes (Anfang)? | Die Würde des Menschen ist unantastbar | Alle Menschen sind vor dem Gesetz gleich | Die Freiheit der Person ist unverletzlich | Eigentum verpflichtet | 1 | Grundgesetz für die Bundesrepublik Deutschland | mc
Wer ist das Staatsoberhaupt Deutschlands? | Bundespräsident | Bundeskanzler | Bundestagspräsident | Verfassungsgerichtspräsident | 1 | Schloss Bellevue
Wer wählt den Bundeskanzler? | Der Bundestag | Das Volk direkt | Der Bundesrat | Der Bundespräsident allein | 1 | Bundestag | mc
Wer wählt den Bundespräsidenten? | Die Bundesversammlung | Das Volk direkt | Der Bundestag allein | Der Bundesrat | 2 | Bundesversammlung (Deutschland)
Wo hat der Bundespräsident seinen Amtssitz? | Schloss Bellevue | Bundeskanzleramt | Reichstag | Schloss Sanssouci | 1 | Schloss Bellevue
Wie lange dauert eine Wahlperiode des Bundestags? | 4 Jahre | 5 Jahre | 6 Jahre | 3 Jahre | 1 | Bundestag
Wie lange dauert die Amtszeit des Bundespräsidenten? | 5 Jahre | 4 Jahre | 6 Jahre | 7 Jahre | 2 | Bundespräsident (Deutschland)
Ab welchem Alter darf man in Deutschland bei der Bundestagswahl wählen? | 18 | 16 | 21 | 14 | 1 | Wahlurne
Wo sitzt das Bundesverfassungsgericht? | Karlsruhe | Berlin | Bonn | Leipzig | 1 | Bundesverfassungsgericht
Wie viele Stimmen hat jeder Wähler bei der Bundestagswahl? | 2 | 1 | 3 | 4 | 1 | Bundestagswahl
Welche Farben hat die deutsche Flagge (von oben)? | Schwarz, Rot, Gold | Schwarz, Weiß, Rot | Rot, Weiß, Rot | Schwarz, Gold, Rot | 1 | Flagge Deutschlands | mc
Wie heißt die deutsche Nationalhymne? | Das Lied der Deutschen (3. Strophe) | Die Wacht am Rhein | Freude schöner Götterfunken | Heil dir im Siegerkranz | 2 | Das Lied der Deutschen | mc
Mit welchen Worten beginnt die deutsche Nationalhymne? | Einigkeit und Recht und Freiheit | Deutschland, Deutschland über alles | Auferstanden aus Ruinen | Freude schöner Götterfunken | 1 | Das Lied der Deutschen | mc
Welche Melodie ist die Hymne der Europäischen Union? | Ode an die Freude | Die Moldau | Air | Pomp and Circumstance | 1 | Europahymne
In welcher Stadt sitzt die Europäische Zentralbank? | Frankfurt am Main | Brüssel | Straßburg | Luxemburg | 1 | Europäische Zentralbank
In welcher Stadt sitzt die EU-Kommission? | Brüssel | Straßburg | Luxemburg | Den Haag | 1 | Berlaymont-Gebäude
In welcher Stadt tagt das Europäische Parlament hauptsächlich (Plenarsitzungen)? | Straßburg | Brüssel | Luxemburg | Genf | 2 | Europäisches Parlament
Wo sitzt der Internationale Gerichtshof? | Den Haag | Genf | New York | Brüssel | 2 | Friedenspalast (Den Haag)
Wo ist der Hauptsitz der Vereinten Nationen? | New York | Genf | Paris | Wien | 1 | Hauptquartier der Vereinten Nationen
Wo sitzt die Weltgesundheitsorganisation WHO? | Genf | New York | Rom | London | 2 | Weltgesundheitsorganisation
Wo hat die NATO ihr Hauptquartier? | Brüssel | Washington | London | Berlin | 2 | NATO-Hauptquartier
Wie viele Mitgliedstaaten hat die EU (Stand 2025)? | 27 | 28 | 25 | 30 | 1 | Europäische Union
Welches Land trat 2020 aus der EU aus? | Vereinigtes Königreich | Griechenland | Norwegen | Schweiz | 1 | Brexit | alt=Großbritannien/UK
Welche Notrufnummer gilt in ganz Europa für Feuerwehr und Rettungsdienst? | 112 | 110 | 911 | 999 | 1 | Notruf 112
Welche Nummer wählt man in Deutschland für die Polizei? | 110 | 112 | 911 | 115 | 1 | Polizei (Deutschland)
Welche Notrufnummer gilt in den USA? | 911 | 112 | 110 | 999 | 1 | Notruf 911
Wie heißt das Zeichen für Erste Hilfe auf weißem Grund? | Rotes Kreuz | Grünes Kreuz | Blauer Stern | Roter Halbmond allein | 1 | Rotes Kreuz
Wer gründete das Rote Kreuz? | Henry Dunant | Florence Nightingale | Albert Schweitzer | Alfred Nobel | 2 | Henry Dunant | alt=Dunant
Welche Farbe hat eine Ampel ganz oben? | Rot | Grün | Gelb | Blau | 1 | Lichtsignalanlage
Was bedeutet ein achteckiges rotes Verkehrsschild? | Stopp | Vorfahrt | Einbahnstraße | Parkverbot | 1 | Stoppschild
Welche Form hat das Schild „Vorfahrt gewähren“? | Ein auf der Spitze stehendes Dreieck | Ein Kreis | Ein Achteck | Ein Quadrat | 1 | Vorfahrt gewähren | mc
Auf welcher Seite fährt man in Großbritannien Auto? | Links | Rechts | In der Mitte | Abwechselnd | 1 | Linksverkehr
Wie schnell darf man in Deutschland innerorts in der Regel fahren? | 50 km/h | 30 km/h | 60 km/h | 70 km/h | 1 | Geschwindigkeitsbegrenzung
Ab wie vielen Jahren darf man in Deutschland regulär allein Auto fahren? | 18 | 16 | 17 | 21 | 1 | Führerschein (Deutschland)
# Alltag und Zahlen
Wie viele Karten hat ein Skatblatt? | 32 | 52 | 36 | 40 | 1 | Skat
Wie viele Karten hat ein französisches Pokerblatt (ohne Joker)? | 52 | 32 | 48 | 54 | 1 | Spielkarte
Wie viele Augen hat ein normaler Spielwürfel insgesamt? | 21 | 18 | 24 | 36 | 2 | Spielwürfel
Welche Zahl liegt auf einem Würfel der 6 gegenüber? | 1 | 2 | 3 | 5 | 1 | Spielwürfel
Wie viele Spielfiguren hat jeder Spieler bei „Mensch ärgere Dich nicht“? | 4 | 3 | 5 | 6 | 1 | Mensch ärgere Dich nicht
Wie viele Felder hat ein Sudoku? | 81 | 64 | 100 | 72 | 1 | Sudoku
Wie viele Steine hat ein Domino-Doppelsechs-Spiel? | 28 | 24 | 32 | 36 | 2 | Domino
Wie viele Buchstaben hat das deutsche Alphabet (ohne Ä, Ö, Ü, ß)? | 26 | 24 | 28 | 30 | 1 | Deutsches Alphabet
Welcher Buchstabe ist der häufigste in deutschen Texten? | E | A | N | S | 2 | Buchstabenhäufigkeit
Wie viele Vokale hat das deutsche Alphabet (ohne Umlaute)? | 5 | 6 | 4 | 7 | 1 | Vokal
Wie viele Tage hat eine Woche? | 7 | 5 | 6 | 8 | 1 | Woche
Wie viele Wochen hat ein Jahr ungefähr? | 52 | 48 | 56 | 50 | 1 | Jahr
Wie viele Jahre hat ein Jahrhundert? | 100 | 1000 | 10 | 50 | 1 | Jahrhundert
Wie viele Jahre hat ein Jahrtausend? | 1000 | 100 | 10.000 | 500 | 1 | Jahrtausend
Wie viele Jahre hat ein Jahrzehnt? | 10 | 100 | 12 | 5 | 1 | Dekade
Wie viele Stunden hat ein Tag? | 24 | 12 | 20 | 48 | 1 | Tag
Wie viele Minuten hat ein Tag? | 1440 | 1200 | 2400 | 720 | 2 | Tag
Wie viele Sekunden hat eine Minute? | 60 | 100 | 30 | 90 | 1 | Sekunde
In welchem Monat beginnt in Deutschland die Sommerzeit? | März | April | Mai | Juni | 1 | Sommerzeit
In welcher Jahreszeit sind die Tage am längsten? | Sommer | Winter | Frühling | Herbst | 1 | Sommersonnenwende
Wann ist auf der Nordhalbkugel der längste Tag? | Um den 21. Juni | Um den 21. Dezember | Um den 21. März | Um den 23. September | 1 | Sommersonnenwende | mc
Wie viele Jahreszeiten gibt es in Deutschland? | 4 | 2 | 3 | 6 | 1 | Jahreszeit
Was zeigt ein Kalender? | Tage, Wochen und Monate | Die Temperatur | Den Luftdruck | Die Uhrzeit allein | 1 | Kalender | mc
Wie heißt der Kalender, den wir heute verwenden? | Gregorianischer Kalender | Julianischer Kalender | Maya-Kalender | Mondkalender | 2 | Gregorianischer Kalender
Welche Farbe entsteht aus Rot und Gelb? | Orange | Grün | Lila | Braun | 1 | Orange (Farbe)
Welche Farbe entsteht aus Rot und Blau? | Lila (Violett) | Grün | Orange | Gelb | 1 | Violett | alt=Lila/Violett
Was sind die drei Grundfarben im Farbkasten (subtraktiv)? | Gelb, Rot (Magenta), Blau (Cyan) | Grün, Orange, Lila | Schwarz, Weiß, Grau | Rot, Grün, Blau | 2 | Grundfarbe | mc
Aus welchen drei Farben besteht das Licht eines Bildschirms (RGB)? | Rot, Grün, Blau | Rot, Gelb, Blau | Cyan, Magenta, Gelb | Schwarz, Weiß, Rot | 1 | RGB-Farbraum | mc
Welche Farbe hat die Hoffnung (im Deutschen sprichwörtlich)? | Grün | Blau | Gelb | Rot | 1 | Grün
Was ist die Komplementärfarbe von Rot? | Grün | Blau | Gelb | Orange | 2 | Komplementärfarbe
Wie heißt der Schutzpatron der Reisenden? | Christophorus | Nikolaus | Martin | Florian | 2 | Christophorus
Wie heißt der Schutzpatron der Feuerwehr? | Florian | Christophorus | Georg | Michael | 2 | Florian von Lorch
Was ist die Hauptzutat von Guacamole? | Avocado | Tomate | Gurke | Kichererbse | 1 | Guacamole
Was ist die Hauptzutat von Hummus? | Kichererbsen | Bohnen | Linsen | Erbsen | 1 | Hummus
Woraus wird Tofu hergestellt? | Sojabohnen | Reis | Weizen | Kartoffeln | 1 | Tofu
Woraus wird Sauerkraut hergestellt? | Weißkohl | Rotkohl | Wirsing | Spinat | 1 | Sauerkraut
Was ist eine Brezel? | Ein Laugengebäck | Ein Käse | Eine Wurst | Ein Kuchen | 1 | Brezel | mc
Aus welchem Getreide wird Bier hauptsächlich gebraut? | Gerste | Mais | Reis | Hirse | 1 | Bier
Welches Getränk wird aus Hopfen und Malz gebraut? | Bier | Wein | Saft | Kaffee | 1 | Bier
Woraus wird Wein gemacht? | Aus Weintrauben | Aus Äpfeln | Aus Getreide | Aus Kartoffeln | 1 | Wein
Woraus wird Apfelschorle gemischt? | Apfelsaft und Mineralwasser | Apfel und Milch | Apfelwein und Cola | Apfel und Tee | 1 | Apfelschorle | mc
Aus welchem Land kommt der Espresso? | Italien | Frankreich | Spanien | Brasilien | 1 | Espresso
Aus welchem Land stammt Kaffee ursprünglich? | Äthiopien | Brasilien | Kolumbien | Jemen | 2 | Kaffee
Welches Land produziert den meisten Kaffee? | Brasilien | Kolumbien | Vietnam | Äthiopien | 1 | Kaffeeanbau
Aus welchem Land stammt der Tee ursprünglich? | China | Indien | England | Japan | 1 | Tee
Wie heißt der japanische grüne Pulvertee? | Matcha | Sencha | Chai | Rooibos | 1 | Matcha
Welche Gewürzmischung gibt Currywurst ihren Namen? | Curry | Paprika | Zimt | Kurkuma allein | 1 | Currypulver
Wie heißt die italienische Teigware in Röhrenform? | Penne | Spaghetti | Farfalle | Fusilli | 1 | Penne
Wie heißt die italienische Pasta in Schleifenform? | Farfalle | Penne | Rigatoni | Tagliatelle | 1 | Farfalle
Welcher Käse hat große Löcher und stammt aus der Schweiz? | Emmentaler | Gouda | Camembert | Parmesan | 1 | Emmentaler
Aus welchem Land stammt der Gouda? | Niederlande | Belgien | Frankreich | Dänemark | 1 | Gouda (Käse)
Aus welchem Land stammt der Camembert? | Frankreich | Schweiz | Italien | Deutschland | 1 | Camembert
Aus welchem Land stammt der Parmesan? | Italien | Spanien | Frankreich | Griechenland | 1 | Parmigiano Reggiano
Aus welcher Milch wird echter Mozzarella di Bufala gemacht? | Büffelmilch | Ziegenmilch | Schafmilch | Kamelmilch | 2 | Mozzarella
Aus welcher Milch wird Feta traditionell gemacht? | Schaf- und Ziegenmilch | Kuhmilch | Büffelmilch | Stutenmilch | 2 | Feta
Wie heißt das Fest am Ende des Ramadan? | Zuckerfest (Eid al-Fitr) | Opferfest | Chanukka | Diwali | 2 | Eid al-Fitr | mc
Wie heißt das hinduistische Lichterfest? | Diwali | Holi | Chanukka | Vesak | 2 | Diwali
Wie heißt das heilige Buch des Islam? | Koran | Bibel | Tora | Veden | 1 | Koran
Wie heißt das heilige Buch des Judentums (die fünf Bücher Mose)? | Tora | Koran | Talmud allein | Evangelium | 1 | Tora
Wie heißt das Gotteshaus der Juden? | Synagoge | Moschee | Tempel | Kirche | 1 | Synagoge
Wie heißt das Gotteshaus der Muslime? | Moschee | Synagoge | Kirche | Pagode | 1 | Moschee
In welcher Stadt steht die Kaaba? | Mekka | Medina | Jerusalem | Kairo | 1 | Kaaba
Wo hat der Papst seinen Sitz? | Vatikanstadt | Rom-Lateran | Avignon | Florenz | 1 | Petersdom
Wie viele Apostel hatte Jesus laut Bibel? | 12 | 10 | 7 | 14 | 1 | Apostel
Wie viele Gebote gab Gott Mose laut Bibel? | 10 | 7 | 12 | 5 | 1 | Zehn Gebote
Welche Religion hat die meisten Anhänger weltweit? | Christentum | Islam | Hinduismus | Buddhismus | 1 | Christentum
Wer begründete den Buddhismus? | Siddhartha Gautama (Buddha) | Konfuzius | Laozi | Mohammed | 1 | Buddha | alt=Buddha/Siddhartha Gautama
Wie heißt das Oberhaupt der katholischen Kirche? | Papst | Patriarch | Erzbischof | Kardinal | 1 | Papst
Wie heißt der aktuelle Papst (gewählt 2025)? | Leo XIV. | Franziskus | Benedikt XVI. | Johannes Paul III. | 1 | Leo XIV. | alt=Leo 14/Leo der Vierzehnte
Wie viele Jahre dauert in Deutschland meistens die Grundschule? | 4 | 3 | 5 | 6 | 1 | Grundschule
Wie heißt der höchste Schulabschluss an deutschen Gymnasien? | Abitur | Mittlere Reife | Bachelor | Hauptschulabschluss | 1 | Abitur
Wie heißt der erste Studienabschluss an Hochschulen meistens? | Bachelor | Master | Diplom | Doktor | 1 | Bachelor
Wie nennt man einen Doktortitel abgekürzt? | Dr. | Prof. | Dipl. | M. A. | 1 | Doktor
Wie viele Cent hat ein Euro? | 100 | 10 | 1000 | 50 | 1 | Euro
Welche ist die größte Euro-Banknote, die neu gedruckt wird? | 200 Euro | 500 Euro | 100 Euro | 1000 Euro | 2 | Eurobanknoten
Welches ist die kleinste Euromünze? | 1 Cent | 2 Cent | 5 Cent | 10 Cent | 1 | Euromünzen
Wie heißt die Steuer, die beim Einkauf im Preis enthalten ist? | Mehrwertsteuer | Einkommensteuer | Grundsteuer | Hundesteuer | 1 | Umsatzsteuer
Wie hoch ist der reguläre Mehrwertsteuersatz in Deutschland? | 19 % | 7 % | 16 % | 21 % | 1 | Umsatzsteuer (Deutschland)
Wie heißt das Geld, das man von der Bank für Erspartes bekommt? | Zinsen | Gebühren | Steuern | Prämien | 1 | Zins
Wie nennt man ein Unternehmen, das an der Börse gehandelt wird? | Aktiengesellschaft | GmbH | Verein | Genossenschaft | 2 | Aktiengesellschaft
Wie heißt der wichtigste deutsche Aktienindex? | DAX | Dow Jones | Nikkei | FTSE | 1 | DAX
Wie heißt der bekannteste Aktienindex der USA? | Dow Jones | DAX | Nikkei | CAC 40 | 1 | Dow Jones Industrial Average
Wo ist die größte deutsche Börse? | Frankfurt am Main | Berlin | Hamburg | München | 1 | Frankfurter Wertpapierbörse
Welches Tier steht an der Börse für steigende Kurse? | Bulle | Bär | Adler | Löwe | 1 | Bulle und Bär
Welches Tier steht an der Börse für fallende Kurse? | Bär | Bulle | Wolf | Hirsch | 1 | Bulle und Bär
Wie nennt man eine Preissteigerung über längere Zeit? | Inflation | Deflation | Rezession | Rendite | 1 | Inflation
Wie nennt man einen starken wirtschaftlichen Abschwung? | Rezession | Inflation | Boom | Hausse | 2 | Rezession
Was ist ein Monopol? | Ein einziger Anbieter auf dem Markt | Viele Anbieter | Ein Steuersatz | Eine Bankfiliale | 2 | Monopol | mc
`);
})();
