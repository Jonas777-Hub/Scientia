/* Natur & Tiere – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "natur";

  const DOGS = [["Dackel", "Deutschland", "Dachshund"], ["Deutscher Schäferhund", "Deutschland", "Deutscher Schäferhund"], ["Dobermann", "Deutschland", "Dobermann"], ["Boxer", "Deutschland", "Deutscher Boxer"],
    ["Rottweiler", "Deutschland", "Rottweiler"], ["Chihuahua", "Mexiko", "Chihuahua (Hunderasse)"], ["Pudel", "Frankreich", "Pudel"], ["Labrador Retriever", "Kanada", "Labrador Retriever"],
    ["Husky (Siberian Husky)", "Russland", "Siberian Husky"], ["Shiba Inu", "Japan", "Shiba Inu"], ["Dalmatiner", "Kroatien", "Dalmatiner"], ["Bernhardiner", "Schweiz", "Bernhardiner"],
    ["Beagle", "Vereinigtes Königreich", "Beagle"], ["Mops", "China", "Mops"], ["Collie", "Vereinigtes Königreich", "Langhaarcollie"], ["Chow-Chow", "China", "Chow-Chow"]];
  table(C, DOGS, { q: (d) => `Aus welchem Land stammt die Hunderasse ${d[0]}?`, a: (d) => d[1], pool: ["Deutschland", "Frankreich", "Vereinigtes Königreich", "Schweiz", "China", "Japan", "Mexiko", "Kanada", "Russland", "Kroatien", "Italien"], diff: (d) => (["Dackel", "Deutscher Schäferhund", "Chihuahua", "Bernhardiner"].includes(d[0]) ? 1 : 2), img: (d) => d[2] });

  lines(C, `
Wie nennt man ein Pferd mit einer Schulterhöhe unter 148 cm? | Pony | Fohlen | Maultier | Hengst | 1 | Shetlandpony
Wie nennt man die Haare am Hals eines Pferdes? | Mähne | Schopf | Fell | Kamm | 1 | Hauspferd
Wie nennt man die schnellste Gangart des Pferdes? | Galopp | Trab | Schritt | Tölt | 1 | Galopp
Welche besondere Gangart beherrschen Islandpferde? | Tölt | Passgalopp | Trab | Kanter | 2 | Islandpferd
Wie viele Zehen hat ein Pferd pro Bein? | 1 | 2 | 3 | 5 | 2 | Huf
Welches Haustier stammt von der Falbkatze ab? | Hauskatze | Kaninchen | Meerschweinchen | Frettchen | 2 | Hauskatze
Woher stammt das Meerschweinchen ursprünglich? | Südamerika | Afrika | Asien | Europa | 2 | Hausmeerschweinchen
Mit welchem Organ „schmecken“ Schlangen ihre Umgebung? | Mit der Zunge | Mit der Nase | Mit den Augen | Mit der Haut | 1 | Kreuzotter
Wie heißt die Haut, die Schlangen regelmäßig abstreifen? | Natternhemd | Schuppenkleid | Panzer | Hornhaut | 2 | Häutung
Wie lange kann eine Riesenschildkröte leben? | Über 150 Jahre | 20 Jahre | 50 Jahre | 5 Jahre | 2 | Aldabra-Riesenschildkröte | mc
Wie nennt man den Panzer der Schildkröte oben? | Rückenpanzer (Carapax) | Bauchpanzer (Plastron) | Schild | Kiel | 2 | Schildkröten | mc
Welches Meerestier hat fünf Arme und kann einen verlorenen Arm nachbilden? | Seestern | Seeigel | Krake | Qualle | 1 | Gemeiner Seestern
Welches Tier lebt in einem Schneckenhaus, das nicht sein eigenes ist? | Einsiedlerkrebs | Weinbergschnecke | Seepferdchen | Krabbe | 1 | Einsiedlerkrebse
Wie nennt man winzige Lebewesen, die im Meer treiben und Nahrung vieler Wale sind? | Plankton | Korallen | Algenwald | Seegras | 1 | Plankton
Wovon ernährt sich der Blauwal hauptsächlich? | Krill | Fischen | Robben | Algen | 1 | Krill
Welcher Wal ist für seine langen Gesänge bekannt? | Buckelwal | Pottwal | Schwertwal | Narwal | 2 | Buckelwal
Welcher Wal hat einen langen Stoßzahn? | Narwal | Belugawal | Grönlandwal | Finnwal | 1 | Narwal
Welcher Hai ist der größte Fisch der Welt? | Walhai | Weißer Hai | Hammerhai | Tigerhai | 1 | Walhai
Wie viele Zahnreihen können Haie haben? | Mehrere, die ständig nachwachsen | Genau eine | Keine | Zwei feste | 2 | Weißer Hai | mc
Welches Tier kann sich durch Leuchten im dunklen Tiefseewasser bemerkbar machen? | Anglerfisch | Hering | Karpfen | Forelle | 2 | Anglerfische
Was sind Korallen? | Tiere | Pflanzen | Steine | Pilze | 1 | Korallen | mc
Welche Farbe hat Eisbärhaut unter dem Fell? | Schwarz | Weiß | Rosa | Grau | 2 | Eisbär
Wie überleben viele Tiere den Winter in Kältestarre? | Sie senken ihre Körperfunktionen stark ab | Sie fliegen weg | Sie fressen mehr | Sie wechseln die Haut | 2 | Kältestarre | mc
Welches heimische Tier hält echten Winterschlaf? | Siebenschläfer | Eichhörnchen | Reh | Fuchs | 2 | Siebenschläfer
Welches Tier hält nur Winterruhe statt Winterschlaf? | Eichhörnchen | Igel | Siebenschläfer | Murmeltier | 2 | Eurasisches Eichhörnchen
Was ist das Lieblingsfutter von Eichhörnchen? | Nüsse und Samen | Fisch | Insekten | Gras | 1 | Eurasisches Eichhörnchen
Welches Tier trägt sein Haus auf dem Rücken? | Schnecke | Igel | Käfer | Assel | 1 | Weinbergschnecke
Wie bewegen sich Schnecken fort? | Auf einem Schleimfilm mit ihrem Fuß | Auf Beinen | Durch Springen | Mit Flossen | 1 | Weinbergschnecke | mc
Wie viele Flügelpaare hat eine Libelle? | 2 | 1 | 3 | 4 | 2 | Libellen
Welches Insekt durchläuft die Stadien Ei, Raupe, Puppe, Falter? | Schmetterling | Heuschrecke | Libelle | Wanze | 1 | Schmetterlinge
Woraus bauen Wespen ihre Nester? | Aus zerkautem Holz (Papier) | Aus Wachs | Aus Lehm | Aus Blättern | 2 | Gemeine Wespe | mc
Woraus bauen Honigbienen ihre Waben? | Wachs | Holz | Lehm | Harz | 1 | Bienenwabe
Wie heißt das einzige fortpflanzungsfähige Weibchen eines Bienenvolks? | Königin | Drohne | Arbeiterin | Amme | 1 | Bienenkönigin
Wie heißen die männlichen Bienen? | Drohnen | Arbeiterinnen | Königinnen | Hummeln | 1 | Drohne (Biene)
Welches Insekt erzeugt Licht in Sommernächten? | Glühwürmchen | Libelle | Mücke | Motte | 1 | Leuchtkäfer
Warum fliegen Motten nachts zum Licht? | Sie orientieren sich normalerweise am Mondlicht | Sie suchen Wärme | Sie wollen fressen | Sie sind blind | 2 | Nachtfalter | mc
Welches Tier verbreitet die Pest über Rattenflöhe? | Ratte | Taube | Hund | Fledermaus | 2 | Hausratte
Welches Tier kann Tollwut übertragen? | Fuchs | Karpfen | Taube | Schnecke | 2 | Rotfuchs
Welche Tiere leben in einer Kolonie mit Königin, Arbeiterinnen und Soldaten? | Termiten | Spinnen | Schnecken | Käfer | 2 | Termiten
Wie heißt das größte Nagetier der Welt? | Capybara (Wasserschwein) | Biber | Stachelschwein | Murmeltier | 1 | Capybara | alt=Capybara/Wasserschwein
Wie heißt das größte heimische Nagetier Europas? | Biber | Murmeltier | Eichhörnchen | Hamster | 2 | Europäischer Biber
Welches Tier pfeift in den Alpen als Warnsignal? | Murmeltier | Steinbock | Gämse | Adler | 1 | Alpenmurmeltier
Welches Tier mit großen gebogenen Hörnern klettert in den Alpen? | Steinbock | Reh | Elch | Wildschwein | 1 | Alpensteinbock
Wie heißt der größte Hirsch der Welt? | Elch | Rothirsch | Rentier | Damhirsch | 1 | Elch
Bei welcher Hirschart tragen auch die Weibchen ein Geweih? | Rentier | Rothirsch | Reh | Elch | 2 | Ren (Hirsch)
Welches Tier zieht im Märchen den Schlitten des Weihnachtsmanns? | Rentier | Elch | Pferd | Hirsch | 1 | Ren (Hirsch)
Welches Tier wird oft als „König der Tiere“ bezeichnet? | Löwe | Tiger | Adler | Elefant | 1 | Löwe
Welches Tier ist bekannt dafür, sich bei Gefahr „tot zu stellen“? | Opossum | Fuchs | Pferd | Wolf | 2 | Nordopossum
Welcher Vogel kann menschliche Sprache besonders gut nachahmen? | Graupapagei | Amsel | Taube | Huhn | 1 | Graupapagei
Welcher Vogel kann nicht fliegen, aber sehr schnell laufen? | Strauß | Storch | Fasan | Möwe | 1 | Afrikanischer Strauß
Welcher flugunfähige Vogel lebt nur in Neuseeland? | Kiwi | Emu | Pinguin | Strauß | 1 | Kiwis
Wie heißt der schwarze Vogel mit gelbem Schnabel, der oft im Garten singt? | Amsel | Krähe | Rabe | Star | 1 | Amsel
Welcher Vogel ist der Symbolvogel für Frieden? | Taube | Adler | Rabe | Eule | 1 | Felsentaube
Welcher Vogel gilt als Symbol der Weisheit? | Eule | Rabe | Taube | Specht | 1 | Steinkauz
Welche Vögel bilden im Winter in Städten oft große Schwärme und gelten als sehr intelligent? | Krähen | Spatzen | Meisen | Tauben | 2 | Rabenkrähe
Was frisst ein Regenwurm? | Abgestorbene Pflanzenteile und Erde | Insekten | Wurzeln lebender Pflanzen | Nichts | 2 | Gemeiner Regenwurm | mc
Welche Schlange ist in Deutschland giftig? | Kreuzotter | Ringelnatter | Blindschleiche | Äskulapnatter | 2 | Kreuzotter
Ist die Blindschleiche eine Schlange? | Nein, eine Echse | Ja | Nein, ein Wurm | Nein, ein Fisch | 2 | Blindschleiche | mc
Welches Tier wechselt im Winter seine Fellfarbe zu Weiß? | Schneehase | Rotfuchs | Reh | Dachs | 2 | Schneehase
Welche Tiere sammeln sich in V-Formation beim Flug? | Gänse | Spatzen | Eulen | Fledermäuse | 1 | Graugans
Wovon ernährt sich ein Großer Panda fast ausschließlich? | Bambus | Fisch | Honig | Insekten | 1 | Großer Panda
Was machen Biber mit Bäumen? | Sie fällen sie mit ihren Zähnen | Sie klettern hinauf | Sie fressen nur Blätter | Nichts | 1 | Europäischer Biber | mc
Wie heißen die Stacheln eines Igels eigentlich? | Umgewandelte Haare | Knochen | Federn | Schuppen | 2 | Braunbrustigel | mc
Warum haben Zebras Streifen (eine gängige Erklärung)? | Schutz vor Insekten und Verwirrung von Feinden | Zum Wärmen | Für die Paarung allein | Ohne Grund | 2 | Zebras | mc
Welches Tier hat den stärksten Biss gemessen? | Salzwasserkrokodil | Löwe | Weißer Hai | Hyäne | 2 | Leistenkrokodil
Wie heißt das Krokodil mit schmaler Schnauze aus Indien? | Gangesgavial | Kaiman | Alligator | Nilkrokodil | 2 | Gangesgavial
Was unterscheidet Alligatoren von Krokodilen auf den ersten Blick? | Die breitere, U-förmige Schnauze | Die Farbe der Augen | Die Zahl der Beine | Das Fell | 2 | Mississippi-Alligator | mc
Welche heimische Amphibie ist auffällig gelb-schwarz gefleckt? | Feuersalamander | Grasfrosch | Erdkröte | Bergmolch | 1 | Feuersalamander
Wo legen Frösche ihren Laich ab? | Im Wasser | In Bäumen | In der Erde | In Nestern | 1 | Grasfrosch
Wie nennt man die Metamorphose der Kaulquappe zum Frosch? | Verwandlung (Metamorphose) | Häutung | Mauser | Brut | 1 | Metamorphose (Zoologie) | alt=Metamorphose
Wie heißt der Federwechsel der Vögel? | Mauser | Häutung | Wechsel | Rupfung | 2 | Mauser
Wie heißen die Hörner von Nashörnern biologisch? | Keratin-Hörner | Knochenhörner | Geweih | Zähne | 2 | Breitmaulnashorn | mc
Welche Elefantenart hat größere Ohren? | Afrikanischer Elefant | Asiatischer Elefant | Beide gleich | Mammut | 1 | Afrikanischer Elefant
Wie lange dauert die Tragzeit eines Elefanten ungefähr? | Etwa 22 Monate | 9 Monate | 3 Monate | 4 Jahre | 2 | Afrikanischer Elefant | mc
Welches Tier hat die längste Zunge im Verhältnis zur Körpergröße? | Chamäleon | Giraffe | Hund | Frosch | 2 | Chamäleons
Was frisst eine Giraffe hauptsächlich? | Blätter von Akazien | Gras | Fleisch | Früchte | 1 | Giraffen
`);
})();
