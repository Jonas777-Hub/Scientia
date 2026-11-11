/* Erdkunde-Wissen – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "erdkunde";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  // Kontinente aus den Länderdaten (nur Länder, die eindeutig einem Kontinent angehören)
  const CONT = { EU: "Europa", AS: "Asien", AF: "Afrika", NA: "Nordamerika", SA: "Südamerika", OC: "Ozeanien (Australien)" };
  const big = new Set(["DE", "FR", "IT", "ES", "GB", "PL", "CN", "IN", "JP", "BR", "AR", "US", "CA", "MX", "EG", "ZA", "NG", "KE", "AU", "NZ", "SE", "NO", "GR", "PT", "AT", "CH", "NL", "BE", "CL", "PE", "CO", "TH", "VN", "KR", "MA", "SA", "IR", "IQ", "UA"]);
  table(C, window.COUNTRIES.filter((c) => c.regions.length === 1), { q: (c) => `Auf welchem Kontinent liegt ${c.name}?`, a: (c) => CONT[c.regions[0]], pool: Object.values(CONT), diff: (c) => (big.has(c.iso2) ? 1 : 2), img: (c) => null });

  const CITY = parse(`
Shanghai;China
Mumbai;Indien
São Paulo;Brasilien
Osaka;Japan
New York;USA
Karatschi;Pakistan
Chongqing;China
Istanbul;Türkei
Kolkata;Indien
Lagos;Nigeria
Rio de Janeiro;Brasilien
Guangzhou;China
Los Angeles;USA
Shenzhen;China
Lahore;Pakistan
Bangalore;Indien
Chennai;Indien
Nagoya;Japan
Chicago;USA
Ho-Chi-Minh-Stadt;Vietnam
Hongkong;China
Toronto;Kanada
Sydney;Australien
Melbourne;Australien
Johannesburg;Südafrika
Kapstadt;Südafrika
Casablanca;Marokko
Marrakesch;Marokko
Alexandria;Ägypten
Dubai;Vereinigte Arabische Emirate
Mailand;Italien
Neapel;Italien
Florenz;Italien
Venedig;Italien
Barcelona;Spanien
Sevilla;Spanien
Valencia;Spanien
Porto;Portugal
Lyon;Frankreich
Marseille;Frankreich
Nizza;Frankreich
Antwerpen;Belgien
Rotterdam;Niederlande
Göteborg;Schweden
Danzig (Gdańsk);Polen
Krakau;Polen
Salzburg;Österreich
Innsbruck;Österreich
Zürich;Schweiz
Genf;Schweiz
Basel;Schweiz
Edinburgh;Vereinigtes Königreich
Manchester;Vereinigtes Königreich
Liverpool;Vereinigtes Königreich
Sankt Petersburg;Russland
Boston;USA
San Francisco;USA
Las Vegas;USA
Miami;USA
Montreal;Kanada
Vancouver;Kanada
Auckland;Neuseeland
Thessaloniki;Griechenland
Antalya;Türkei
Kyōto;Japan
Busan;Südkorea
Chiang Mai;Thailand
Bali (Denpasar);Indonesien
Cancún;Mexiko
Medellín;Kolumbien
Mekka;Saudi-Arabien
Sansibar-Stadt;Tansania
`);
  const cityCountries = [...new Set(CITY.map((c) => c[1]))];
  table(C, CITY, { q: (c) => `In welchem Land liegt die Stadt ${c[0]}?`, a: (c) => c[1], pool: cityCountries, diff: (c) => (["New York", "Los Angeles", "Sydney", "Barcelona", "Mailand", "Venedig", "Istanbul", "Rio de Janeiro", "Zürich", "Salzburg", "Dubai", "Shanghai", "Mumbai", "Kapstadt", "Florenz", "Marseille", "Krakau"].includes(c[0]) ? 1 : 2), img: (c) => c[0].replace(/ \(.*\)/, "") });

  const RIVER = parse(`
Rhein;Nordsee;Köln
Donau;Schwarzes Meer;Wien
Elbe;Nordsee;Dresden
Oder;Ostsee;Frankfurt (Oder)
Weser;Nordsee;Bremen
Themse;Nordsee;London
Seine;Ärmelkanal;Paris
Wolga;Kaspisches Meer;Wolgograd
Nil;Mittelmeer;Kairo
Amazonas;Atlantischer Ozean;Manaus
Mississippi;Golf von Mexiko;New Orleans
Jangtsekiang;Ostchinesisches Meer;Shanghai
Ganges;Golf von Bengalen;Varanasi
Rhône;Mittelmeer;Lyon
Po;Adriatisches Meer;Turin
Tejo;Atlantischer Ozean;Lissabon
Dnepr;Schwarzes Meer;Kiew
Weichsel;Ostsee;Warschau
Newa;Ostsee;Sankt Petersburg
Sambesi;Indischer Ozean;Livingstone
`);
  table(C, RIVER, { q: (r) => `In welches Meer mündet der Fluss ${r[0]}?`, a: (r) => r[1], pool: [...new Set(RIVER.map((r) => r[1]))], diff: (r) => (["Rhein", "Donau", "Elbe", "Nil", "Mississippi", "Amazonas", "Themse"].includes(r[0]) ? 1 : 2), img: (r) => r[0] });
  const RCITY = parse(`
Themse;London
Seine;Paris
Tiber;Rom
Moldau;Prag
Weichsel;Warschau
Spree;Berlin
Isar;München
Alster;Hamburg
Neckar;Heidelberg
Main;Frankfurt am Main
Dnepr;Kiew
Newa;Sankt Petersburg
Hudson River;New York
Tajo (Tejo);Lissabon
Arno;Florenz
Limmat;Zürich
Salzach;Salzburg
Inn;Innsbruck
Mosel;Trier
Leine;Hannover
`);
  table(C, RCITY, { q: (r) => `Welche Stadt liegt am Fluss ${r[0]}?`, a: (r) => r[1], pool: RCITY.map((r) => r[1]), diff: (r) => (["Themse", "Seine", "Tiber", "Spree", "Isar", "Moldau", "Main"].includes(r[0]) ? 1 : 2), img: (r) => r[1] });

  const MOUNT = parse(`
Deutschland;Zugspitze
Österreich;Großglockner
Schweiz;Dufourspitze (Monte Rosa)
Frankreich;Mont Blanc
Spanien;Teide (Teneriffa)
Griechenland;Olymp
Japan;Fuji
Afrika (Kontinent);Kilimandscharo
Südamerika (Kontinent);Aconcagua
Nordamerika (Kontinent);Denali
Asien (Kontinent);Mount Everest
Australien (Kontinent);Mount Kosciuszko
Antarktika (Kontinent);Mount Vinson
Harz (Mittelgebirge);Brocken
Schwarzwald;Feldberg
Erzgebirge (deutsche Seite);Fichtelberg
Türkei;Ararat
Slowenien;Triglav
Polen;Rysy
Neuseeland;Aoraki (Mount Cook)
`);
  table(C, MOUNT, { q: (m) => `Wie heißt der höchste Berg von ${m[0]}?`, a: (m) => m[1], pool: MOUNT.map((m) => m[1]), diff: (m) => (["Deutschland", "Asien (Kontinent)", "Afrika (Kontinent)", "Japan", "Frankreich"].includes(m[0]) ? 1 : 2), img: (m) => m[1].replace(/ \(.*\)/, ""), alt: (m) => [m[1].replace(/ \(.*\)/, "")] });

  const ISLAND = parse(`
Mallorca;Spanien
Teneriffa;Spanien
Kreta;Griechenland
Rhodos;Griechenland
Korsika;Frankreich
Sardinien;Italien
Sizilien;Italien
Madeira;Portugal
Azoren;Portugal
Sylt;Deutschland
Rügen;Deutschland
Grönland;Dänemark
Färöer;Dänemark
Spitzbergen;Norwegen
Tasmanien;Australien
Hawaii;USA
Galápagos-Inseln;Ecuador
Osterinsel;Chile
Bali;Indonesien
Sansibar;Tansania
Gotland;Schweden
Jersey (Kronbesitz);Vereinigtes Königreich
`);
  table(C, ISLAND, { q: (i) => `Zu welchem Land gehört die Insel bzw. Inselgruppe ${i[0]}?`, a: (i) => i[1], pool: [...new Set(ISLAND.map((i) => i[1]))], diff: (i) => (["Mallorca", "Kreta", "Sylt", "Rügen", "Hawaii", "Sizilien", "Teneriffa"].includes(i[0]) ? 1 : 2), img: (i) => i[0].replace(/ \(.*\)/, "") });

  const LAND = parse(`
Schwarzwald;Baden-Württemberg
Harz;Sachsen-Anhalt und Niedersachsen
Spreewald;Brandenburg
Sächsische Schweiz;Sachsen
Allgäu;Bayern (und Baden-Württemberg)
Eifel;Rheinland-Pfalz und Nordrhein-Westfalen
Teutoburger Wald;Nordrhein-Westfalen und Niedersachsen
Lüneburger Heide;Niedersachsen
Mecklenburgische Seenplatte;Mecklenburg-Vorpommern
Ostfriesische Inseln;Niedersachsen
Nordfriesische Inseln;Schleswig-Holstein
Helgoland;Schleswig-Holstein
Ruhrgebiet;Nordrhein-Westfalen
Bayerischer Wald;Bayern
Thüringer Wald;Thüringen
Rhön;Bayern, Hessen und Thüringen
Erzgebirge;Sachsen
Pfälzerwald;Rheinland-Pfalz
Rügen;Mecklenburg-Vorpommern
Chiemsee;Bayern
`);
  table(C, LAND, { q: (l) => `In welchem Bundesland liegt ${l[0]}?`, a: (l) => l[1], pool: [...new Set(LAND.map((l) => l[1]))], mc: true, diff: (l) => (["Schwarzwald", "Ruhrgebiet", "Chiemsee", "Spreewald", "Lüneburger Heide", "Bayerischer Wald", "Rügen"].includes(l[0]) ? 1 : 2), img: (l) => l[0] });

  const USSTATE = parse(`
Kalifornien;Sacramento
Texas;Austin
Florida;Tallahassee
New York;Albany
Illinois;Springfield
Washington (Bundesstaat);Olympia
Nevada;Carson City
Pennsylvania;Harrisburg
Massachusetts;Boston
Georgia;Atlanta
Arizona;Phoenix
Colorado;Denver
Hawaii;Honolulu
Alaska;Juneau
Ohio;Columbus
Michigan;Lansing
Louisiana;Baton Rouge
Tennessee;Nashville
Oregon;Salem
Utah;Salt Lake City
`);
  table(C, USSTATE, { q: (u) => `Was ist die Hauptstadt des US-Bundesstaats ${u[0]}?`, a: (u) => u[1], pool: USSTATE.map((u) => u[1]), diff: 2, img: (u) => u[1] });

  const LANG = parse(`
Brasilien;Portugiesisch
Argentinien;Spanisch
Mexiko;Spanisch
Österreich;Deutsch
Ägypten;Arabisch
Iran;Persisch
Israel;Hebräisch
Niederlande;Niederländisch
Angola;Portugiesisch
Senegal;Französisch
Pakistan;Urdu
Griechenland;Griechisch
Polen;Polnisch
Türkei;Türkisch
Australien;Englisch
Äthiopien;Amharisch
Vietnam;Vietnamesisch
Thailand;Thai
Südkorea;Koreanisch
Ungarn;Ungarisch
Finnland;Finnisch (und Schwedisch)
Elfenbeinküste;Französisch
Mosambik;Portugiesisch
Kuba;Spanisch
`);
  table(C, LANG, { q: (l) => `Welche Sprache ist (Haupt-)Amtssprache in ${l[0]}?`, a: (l) => l[1], pool: [...new Set(LANG.map((l) => l[1])), "Englisch", "Russisch", "Chinesisch"], diff: (l) => (["Brasilien", "Österreich", "Mexiko", "Argentinien", "Polen", "Türkei"].includes(l[0]) ? 1 : 2), img: () => null });

  lines(C, `
Welcher ist der längste Fluss der Erde (nach gängiger Angabe)? | Nil | Amazonas | Jangtsekiang | Mississippi | 1 | Nil
Welcher Fluss führt das meiste Wasser? | Amazonas | Nil | Kongo | Jangtsekiang | 1 | Amazonas
Welcher ist der längste Fluss Europas? | Wolga | Donau | Rhein | Dnepr | 1 | Wolga
Welcher ist der längste Fluss innerhalb Deutschlands? | Rhein | Elbe | Donau | Weser | 1 | Rhein
Durch wie viele Länder fließt die Donau (Anrainerstaaten)? | 10 | 4 | 6 | 15 | 2 | Donau
Wo entspringt die Donau? | Im Schwarzwald | In den Alpen | Im Harz | In Österreich | 1 | Donauquelle
An welchem Ort fließen Rhein und Mosel zusammen (Deutsches Eck)? | Koblenz | Mainz | Köln | Trier | 1 | Deutsches Eck
Welcher Wasserfall liegt an der Grenze zwischen USA und Kanada? | Niagarafälle | Victoriafälle | Iguazú-Fälle | Angel Falls | 1 | Niagarafälle
Welcher Wasserfall ist der höchste der Welt? | Salto Ángel (Venezuela) | Niagarafälle | Victoriafälle | Rheinfall | 2 | Salto Ángel
Welcher Wasserfall ist der größte in Europa (nach Wassermenge) und liegt in der Schweiz? | Rheinfall | Krimmler Wasserfälle | Triberger Wasserfälle | Staubbachfall | 1 | Rheinfall
Wie heißt der größte See Deutschlands (ganz in Deutschland)? | Müritz | Bodensee | Chiemsee | Starnberger See | 1 | Müritz
An welche drei Länder grenzt der Bodensee? | Deutschland, Österreich, Schweiz | Deutschland, Frankreich, Schweiz | Österreich, Italien, Schweiz | Deutschland, Österreich, Liechtenstein | 1 | Bodensee | mc
Welcher See wird „Bayerisches Meer“ genannt? | Chiemsee | Starnberger See | Königssee | Ammersee | 1 | Chiemsee
Welcher ist der tiefste See der Erde? | Baikalsee | Tanganjikasee | Kaspisches Meer | Lago Maggiore | 1 | Baikalsee
Welches ist das größte Binnengewässer der Erde? | Kaspisches Meer | Baikalsee | Oberer See | Victoriasee | 1 | Kaspisches Meer
Welcher ist der größte See Afrikas? | Victoriasee | Tanganjikasee | Malawisee | Tschadsee | 1 | Victoriasee
Welches Meer ist so salzig, dass man darin nicht untergeht? | Totes Meer | Rotes Meer | Schwarzes Meer | Ostsee | 1 | Totes Meer
Welcher ist der tiefste Punkt der Weltmeere? | Marianengraben | Puerto-Rico-Graben | Japangraben | Tongagraben | 1 | Marianengraben
Welcher ist der kleinste Ozean? | Arktischer Ozean | Indischer Ozean | Atlantik | Südlicher Ozean | 1 | Arktischer Ozean
Welche Meerenge verbindet das Mittelmeer mit dem Atlantik? | Straße von Gibraltar | Bosporus | Ärmelkanal | Straße von Hormus | 1 | Straße von Gibraltar
Welche Meerenge trennt Europa und Asien in Istanbul? | Bosporus | Dardanellen allein | Gibraltar | Skagerrak | 1 | Bosporus
Welche Meerenge trennt Großbritannien und Frankreich? | Ärmelkanal | Bosporus | Skagerrak | Kattegat | 1 | Ärmelkanal
Welche Meerenge trennt Asien und Nordamerika? | Beringstraße | Magellanstraße | Straße von Malakka | Davisstraße | 1 | Beringstraße
Welche Meerenge liegt an der Südspitze Südamerikas? | Magellanstraße | Beringstraße | Drakestraße allein | Panamakanal | 2 | Magellanstraße
Welches Kap an der Südspitze Afrikas ist berühmt? | Kap der Guten Hoffnung | Kap Hoorn | Nordkap | Kap Verde | 1 | Kap der Guten Hoffnung
Welches Kap liegt an der Südspitze Südamerikas? | Kap Hoorn | Kap der Guten Hoffnung | Nordkap | Kap Arkona | 1 | Kap Hoorn
Welcher Punkt gilt als nördlichster Punkt Europas für Touristen? | Nordkap | Kap Arkona | Kap Hoorn | Land’s End | 1 | Nordkap
Welche ist die größte Wüste der Erde (inklusive Kältewüste)? | Antarktis | Sahara | Gobi | Arabische Wüste | 2 | Antarktika
Welche ist die größte heiße Wüste der Erde? | Sahara | Gobi | Kalahari | Atacama | 1 | Sahara
Welche Wüste gilt als trockenste der Erde? | Atacama | Sahara | Gobi | Namib | 1 | Atacama-Wüste
In welchen Ländern liegt die Wüste Gobi? | Mongolei und China | Indien und Pakistan | Saudi-Arabien | Ägypten und Libyen | 1 | Gobi | mc
Wie heißt die größte Insel der Erde? | Grönland | Australien | Neuguinea | Borneo | 1 | Grönland
Wie heißt die größte Insel Deutschlands? | Rügen | Usedom | Fehmarn | Sylt | 1 | Rügen
Welche ist die größte Insel im Mittelmeer? | Sizilien | Sardinien | Zypern | Korsika | 1 | Sizilien
Welche Inselgruppe gehört zu Spanien und liegt vor Afrika? | Kanarische Inseln | Azoren | Balearen | Madeira | 1 | Kanarische Inseln
Zu welcher Inselgruppe gehört Mallorca? | Balearen | Kanaren | Azoren | Kykladen | 1 | Balearische Inseln
Wie heißt das längste Gebirge der Welt (an Land)? | Anden | Himalaya | Rocky Mountains | Ural | 1 | Anden
Welches Gebirge bildet die Grenze zwischen Europa und Asien? | Ural | Kaukasus allein | Alpen | Karpaten | 1 | Ural
Welches Gebirge trennt Frankreich und Spanien? | Pyrenäen | Alpen | Apenninen | Vogesen | 1 | Pyrenäen
Welches Gebirge durchzieht Italien von Nord nach Süd? | Apennin | Alpen | Dolomiten | Pyrenäen | 2 | Apennin
In welchem Gebirge liegt der Mount Everest? | Himalaya | Anden | Karakorum | Alpen | 1 | Himalaya
Wie hoch ist der Mount Everest ungefähr? | 8.849 Meter | 6.962 Meter | 9.500 Meter | 7.200 Meter | 1 | Mount Everest | mc
Wie hoch ist die Zugspitze ungefähr? | 2.962 Meter | 4.810 Meter | 1.493 Meter | 3.798 Meter | 1 | Zugspitze | mc
Wie hoch ist der Mont Blanc ungefähr? | 4.806 Meter | 2.962 Meter | 8.849 Meter | 3.500 Meter | 2 | Mont Blanc | mc
Welcher Vulkan auf Sizilien ist einer der aktivsten Europas? | Ätna | Vesuv | Stromboli | Teide | 1 | Ätna
Welcher isländische Vulkan legte 2010 den Flugverkehr lahm? | Eyjafjallajökull | Hekla | Katla | Laki | 2 | Eyjafjallajökull
Welche Kontinentalplatte trennt Island in der Mitte (neben der Nordamerikanischen)? | Eurasische Platte | Afrikanische Platte | Pazifische Platte | Indische Platte | 2 | Mittelatlantischer Rücken
Wie nennt man den Gürtel aktiver Vulkane rund um den Pazifik? | Pazifischer Feuerring | Vulkangürtel | Ring of Ice | Äquatorband | 1 | Pazifischer Feuerring
Wie viele Nachbarländer hat Deutschland? | 9 | 7 | 8 | 10 | 1 | Deutschland
Welches Land grenzt NICHT an Deutschland? | Italien | Polen | Tschechien | Luxemburg | 1 | Deutschland | mc
Welches Land grenzt NICHT an Österreich? | Polen | Ungarn | Slowenien | Liechtenstein | 2 | Österreich | mc
Welches ist das flächenmäßig größte Bundesland? | Bayern | Niedersachsen | Baden-Württemberg | Nordrhein-Westfalen | 1 | Bayern
Welches ist das kleinste Bundesland? | Bremen | Hamburg | Saarland | Berlin | 1 | Bremen
Welches Bundesland hat die meisten Einwohner? | Nordrhein-Westfalen | Bayern | Baden-Württemberg | Niedersachsen | 1 | Nordrhein-Westfalen
Welche drei Stadtstaaten gibt es in Deutschland? | Berlin, Hamburg, Bremen | Berlin, München, Hamburg | Hamburg, Bremen, Kiel | Berlin, Bremen, Potsdam | 1 | Stadtstaat | mc
Welches Bundesland liegt an Nord- und Ostsee? | Schleswig-Holstein | Niedersachsen | Mecklenburg-Vorpommern | Hamburg | 1 | Schleswig-Holstein
Welches ist der nördlichste Punkt Deutschlands? | List auf Sylt | Kap Arkona | Flensburg | Helgoland | 2 | List (Sylt)
Welche Stadt liegt am Zusammenfluss von Weißem und Blauem Nil? | Khartum | Kairo | Assuan | Juba | 2 | Khartum
Welcher Breitenkreis teilt die Erde in Nord- und Südhalbkugel? | Äquator | Nullmeridian | Wendekreis des Krebses | Polarkreis | 1 | Äquator
Durch welchen Londoner Stadtteil verläuft der Nullmeridian? | Greenwich | Westminster | Camden | Chelsea | 1 | Royal Observatory Greenwich
Wie viele Zeitzonen hat Russland ungefähr? | 11 | 3 | 7 | 24 | 2 | Zeitzonen in Russland
Welcher Erdteil liegt komplett auf der Südhalbkugel und ist von Eis bedeckt? | Antarktika | Australien | Südamerika | Afrika | 1 | Antarktika
Auf wie viel Grad Breite liegen die Pole? | 90° | 180° | 45° | 0° | 1 | Geographischer Pol
Wie viele Kontinente liegen (teilweise) auf der Nordhalbkugel? | Alle außer Antarktika und Australien | Nur Europa und Asien | Alle sieben | Nur vier | 2 | Nordhalbkugel | mc
Welches ist das kleinste Land der Erde? | Vatikanstadt | Monaco | San Marino | Liechtenstein | 1 | Vatikanstadt
Welches ist das zweitgrößte Land der Erde nach Fläche? | Kanada | China | USA | Brasilien | 1 | Kanada
Welches Land hat die meisten Inseln (über 200.000)? | Schweden | Indonesien | Philippinen | Kanada | 2 | Schweden
Welches Land hat die längste Küstenlinie? | Kanada | Russland | Australien | Norwegen | 2 | Kanada
Welche Stadt liegt auf zwei Kontinenten? | Istanbul | Kairo | Moskau | Athen | 1 | Istanbul
Welche ist die höchstgelegene Hauptstadt der Welt (Regierungssitz)? | La Paz (Bolivien) | Quito | Bogotá | Kathmandu | 2 | La Paz
Welche Hauptstadt ist die nördlichste der Welt? | Reykjavík | Oslo | Helsinki | Nuuk | 2 | Reykjavík
Welches Gebirge erstreckt sich im Westen Nordamerikas von Kanada bis New Mexico? | Rocky Mountains | Appalachen | Anden | Sierra Madre | 1 | Rocky Mountains
Welcher Canyon in Arizona wurde vom Colorado River gegraben? | Grand Canyon | Antelope Canyon | Bryce Canyon | Fish River Canyon | 1 | Grand Canyon
Welcher US-Nationalpark ist der älteste der Welt (1872)? | Yellowstone | Yosemite | Grand Canyon | Everglades | 2 | Yellowstone-Nationalpark
Welcher Felsen im Zentrum Australiens ist den Aborigines heilig? | Uluru (Ayers Rock) | Kata Tjuta | Wave Rock | Mount Augustus | 1 | Uluṟu | alt=Uluru/Ayers Rock
Welches Riff liegt vor der Nordostküste Australiens? | Great Barrier Reef | Belize-Riff | Ningaloo-Riff | Rotes-Meer-Riff | 1 | Great Barrier Reef
Welcher Fluss bildet die Grenze zwischen Deutschland und Polen? | Oder (und Neiße) | Elbe | Weichsel | Spree | 1 | Oder-Neiße-Grenze | alt=Oder/Neiße
Welcher Fluss bildet weite Teile der Grenze zwischen Deutschland und Frankreich? | Rhein | Mosel | Saar | Main | 1 | Oberrhein
Welches Land liegt komplett innerhalb Italiens (neben dem Vatikan)? | San Marino | Monaco | Andorra | Malta | 1 | San Marino
Welches Land liegt zwischen Frankreich und Spanien in den Pyrenäen? | Andorra | Monaco | Liechtenstein | Luxemburg | 1 | Andorra
Welches Land liegt zwischen Österreich und der Schweiz? | Liechtenstein | Luxemburg | Andorra | Monaco | 1 | Liechtenstein
Welches Land ist vollständig von Südafrika umgeben? | Lesotho | Eswatini | Botswana | Namibia | 2 | Lesotho
Welches Land in Südamerika hat keine Küste (neben Bolivien)? | Paraguay | Uruguay | Ecuador | Chile | 2 | Paraguay
Welches Land hat die Form eines Stiefels? | Italien | Griechenland | Chile | Norwegen | 1 | Italien
Welches Land ist sehr lang und schmal an der Westküste Südamerikas? | Chile | Peru | Argentinien | Kolumbien | 1 | Chile
Welche Halbinsel bilden Spanien und Portugal? | Iberische Halbinsel | Apenninhalbinsel | Balkanhalbinsel | Skandinavische Halbinsel | 1 | Iberische Halbinsel
Welche Halbinsel bilden Norwegen und Schweden? | Skandinavische Halbinsel | Jütland | Iberische Halbinsel | Kola | 1 | Skandinavische Halbinsel
Auf welcher Halbinsel liegt Dänemark zum Großteil? | Jütland | Skandinavien | Krim | Peloponnes | 2 | Jütland
Welche Halbinsel wurde 2014 von Russland annektiert? | Krim | Kola | Kamtschatka | Jamal | 1 | Krim
Welches Meer liegt zwischen Italien und dem Balkan? | Adriatisches Meer | Ägäisches Meer | Tyrrhenisches Meer | Ionisches Meer | 1 | Adriatisches Meer
Welches Meer liegt zwischen Griechenland und der Türkei? | Ägäisches Meer | Adria | Schwarzes Meer | Marmarameer | 1 | Ägäisches Meer
Welches Meer liegt zwischen Afrika und der Arabischen Halbinsel? | Rotes Meer | Totes Meer | Arabisches Meer | Persischer Golf | 1 | Rotes Meer
Welches Meer grenzt an Rumänien, Bulgarien, Türkei und die Ukraine? | Schwarzes Meer | Kaspisches Meer | Ostsee | Adria | 1 | Schwarzes Meer
Welches Meer ist nach einer Farbe benannt und liegt zwischen China und Korea? | Gelbes Meer | Rotes Meer | Weißes Meer | Schwarzes Meer | 2 | Gelbes Meer
`);
})();
