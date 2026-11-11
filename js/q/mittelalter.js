/* Mittelalter – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "mittelalter";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const EV = parse(`
Der Frankenkönig Chlodwig wird König und lässt sich später taufen;481
Karl Martell besiegt die Araber bei Tours und Poitiers;732
Karl der Große wird zum Kaiser gekrönt;800
Der Vertrag von Verdun teilt das Frankenreich;843
Otto I. wird zum Kaiser gekrönt;962
Die Kirche spaltet sich in Ost und West (Morgenländisches Schisma);1054
Wilhelm der Eroberer siegt bei Hastings;1066
Heinrich IV. geht nach Canossa;1077
Papst Urban II. ruft zum Ersten Kreuzzug auf;1095
Kreuzfahrer erobern Jerusalem;1099
Das Wormser Konkordat beendet den Investiturstreit;1122
Saladin erobert Jerusalem zurück;1187
Die Magna Carta wird unterzeichnet;1215
Mongolen siegen in der Schlacht bei Liegnitz;1241
Akkon, die letzte Kreuzfahrerfestung, fällt;1291
Der Hundertjährige Krieg beginnt;1337
Die Pest erreicht Europa;1347
Die Goldene Bulle wird erlassen;1356
Polen-Litauen besiegt den Deutschen Orden bei Tannenberg (Grunwald);1410
Jan Hus wird in Konstanz verbrannt;1415
Jeanne d’Arc wird in Rouen verbrannt;1431
Die Osmanen erobern Konstantinopel;1453
Granada fällt – Ende der Reconquista;1492
`);
  table(C, EV, { q: (e) => `In welchem Jahr: ${e[0]}?`, a: (e) => e[1], years: 25, min: 400, max: 1500, diff: (e) => (["800", "1066", "1453", "1492", "1215"].includes(e[1]) ? 1 : 2) });

  const TERM = parse(`
Lehen;Land, das ein Herr gegen Treue und Dienste verlieh
Vasall;Gefolgsmann, der einem Herrn Treue schuldete
Leibeigener;Bauer, der an seinen Herrn und dessen Land gebunden war
Zehnt;Abgabe eines Zehntels der Ernte an die Kirche
Frondienst;Unbezahlte Arbeit der Bauern für den Grundherrn
Minne;Höfische Verehrung einer adligen Dame
Turnier;Ritterliches Kampfspiel
Bergfried;Hauptturm einer Burg als letzte Zuflucht
Pechnase;Vorbau an der Burgmauer zum Herabschütten auf Angreifer
Palas;Wohn- und Saalbau einer Burg
Kemenate;Beheizbarer Wohnraum, oft für Frauen
Zunft;Vereinigung von Handwerkern eines Berufs in der Stadt
Gilde;Vereinigung von Kaufleuten
Pranger;Pfahl, an dem Verurteilte öffentlich zur Schau gestellt wurden
Gottesurteil;Probe, bei der Gott über Schuld oder Unschuld entscheiden sollte
Ablass;Nachlass von Sündenstrafen gegen Gebete oder Geld
Exkommunikation;Ausschluss aus der kirchlichen Gemeinschaft
Ketzer;Abweichler vom kirchlichen Glauben
Inquisition;Kirchliche Verfolgung von Ketzern
Scholastik;Wissenschaftsmethode, die Glauben und Vernunft verbinden wollte
Pfalz;Reisepalast des Königs
Ritterschlag;Feierliche Aufnahme in den Ritterstand
Dreifelderwirtschaft;Wechsel von Winterkorn, Sommerkorn und Brache
Allmende;Gemeinsam genutztes Land der Dorfbewohner
Bader;Betreiber einer Badestube, oft auch Wundarzt
Reliquie;Überrest eines Heiligen, der verehrt wurde
Pilgerfahrt;Reise zu einem heiligen Ort
Fehde;Erlaubte private Rache unter Adligen
Landfrieden;Verbot von Fehden zur Sicherung der Ordnung
Kreuzritter;Teilnehmer eines Kreuzzugs
`);
  table(C, TERM, { q: (t) => `Was bezeichnet im Mittelalter der Begriff „${t[0]}“?`, a: (t) => t[1], pool: TERM.map((t) => t[1]), mc: true, diff: (t) => (["Lehen", "Vasall", "Leibeigener", "Turnier", "Zunft", "Pranger", "Ritterschlag", "Pilgerfahrt", "Kreuzritter", "Zehnt"].includes(t[0]) ? 1 : 2), img: (t) => ({ Bergfried: "Bergfried", Pechnase: "Pechnase", Turnier: "Turnier (Mittelalter)", Pranger: "Pranger", Dreifelderwirtschaft: "Dreifelderwirtschaft" })[t[0]] || null });

  const PERS = parse(`
Karl der Große;Frankenkönig, im Jahr 800 zum Kaiser gekrönt
Chlodwig I.;Erster christlicher König der Franken
Karl Martell;Hausmeier, der 732 die Araber bei Tours und Poitiers besiegte
Otto der Große;Sieger auf dem Lechfeld und Kaiser ab 962
Friedrich Barbarossa;Staufer-Kaiser, der auf dem Kreuzzug ertrank
Friedrich II. (Staufer);Kaiser, „Staunen der Welt“, regierte von Sizilien aus
Heinrich IV.;König, der 1077 nach Canossa zog
Richard Löwenherz;Englischer König und Kreuzfahrer
Saladin;Sultan, der 1187 Jerusalem eroberte
Wilhelm der Eroberer;Normannenherzog, der 1066 England eroberte
Eleonore von Aquitanien;Königin von Frankreich und von England
Dschingis Khan;Begründer des Mongolenreichs
Thomas von Aquin;Bedeutender Theologe und Philosoph der Scholastik
Franz von Assisi;Gründer eines Bettelordens, der Armut lebte
Benedikt von Nursia;Ordensgründer mit der Regel „ora et labora“
Dante Alighieri;Dichter der „Göttlichen Komödie“
El Cid;Spanischer Ritter und Nationalheld der Reconquista
Harun ar-Raschid;Kalif von Bagdad aus „Tausendundeiner Nacht“
Leif Eriksson;Wikinger, der um 1000 Nordamerika erreichte
Erik der Rote;Wikinger, der Grönland besiedelte
Karl IV.;Kaiser, der Prag zur Hauptstadt machte und die Goldene Bulle erließ
Theophanu;Byzantinische Prinzessin und Kaiserin des Heiligen Römischen Reichs
Kublai Khan;Mongolenherrscher in China, Gastgeber Marco Polos
Ibn Battuta;Arabischer Weltreisender des 14. Jahrhunderts
Avicenna (Ibn Sina);Persischer Arzt und Philosoph
Johanna von Orléans;Bauernmädchen, das Frankreichs Heer anführte
`);
  table(C, PERS, { q: (p) => `Wer war ${p[0]}?`, a: (p) => p[1], pool: PERS.map((p) => p[1]), mc: true, diff: (p) => (["Karl der Große", "Friedrich Barbarossa", "Richard Löwenherz", "Dschingis Khan", "Johanna von Orléans", "Wilhelm der Eroberer"].includes(p[0]) ? 1 : 2), img: (p) => p[0].replace(/ \(.*\)/, "") });

  const CASTLE = parse(`
Burg Eltz;Deutschland
Wartburg;Deutschland
Burg Hohenzollern;Deutschland
Marienburg (Ordensburg);Polen
Tower of London;Vereinigtes Königreich
Carcassonne (Festungsstadt);Frankreich
Mont-Saint-Michel;Frankreich
Alhambra;Spanien
Prager Burg;Tschechien
Törzburg (Bran, „Draculas Burg“);Rumänien
Edinburgh Castle;Vereinigtes Königreich
Krak des Chevaliers;Syrien
Burg Hochosterwitz;Österreich
Burg Karlštejn;Tschechien
`);
  table(C, CASTLE, { q: (c) => `In welchem Land steht: ${c[0]}?`, a: (c) => c[1], pool: [...new Set(CASTLE.map((c) => c[1]))], diff: (c) => (["Wartburg", "Tower of London", "Alhambra", "Burg Eltz", "Mont-Saint-Michel"].includes(c[0]) ? 1 : 2), img: (c) => c[0].replace(/ \(.*\)/, "").replace("Törzburg", "Törzburg") });

  const DOM = parse(`
Kölner Dom;Köln
Notre-Dame;Paris
Ulmer Münster;Ulm
Freiburger Münster;Freiburg im Breisgau
Straßburger Münster;Straßburg
Kathedrale von Chartres;Chartres
Kathedrale von Canterbury;Canterbury
Westminster Abbey;London
Markusdom;Venedig
Speyerer Dom;Speyer
Naumburger Dom (mit der Stifterfigur Uta);Naumburg
Bamberger Dom (mit dem Bamberger Reiter);Bamberg
Aachener Dom;Aachen
Magdeburger Dom;Magdeburg
`);
  table(C, DOM, { q: (d) => `In welcher Stadt steht: ${d[0]}?`, a: (d) => d[1], pool: DOM.map((d) => d[1]), diff: (d) => (["Kölner Dom", "Notre-Dame", "Ulmer Münster", "Aachener Dom", "Westminster Abbey"].includes(d[0]) ? 1 : 2), img: (d) => ({ "Notre-Dame": "Notre-Dame de Paris" })[d[0]] || d[0].replace(/ \(.*\)/, "") });

  lines(C, `
# Burgen und Ritter
Wie nennt man den Wassergraben um eine Burg? | Burggraben | Zwinger | Wehrgang | Palisade | 1 | Burggraben
Wie heißt die bewegliche Brücke über den Burggraben? | Zugbrücke | Hängebrücke | Steinbrücke | Pontonbrücke | 1 | Zugbrücke
Wie heißt das Gitter, das ein Burgtor schnell verschließen konnte? | Fallgatter | Zinne | Schießscharte | Erker | 2 | Fallgatter
Wie nennt man die zackenförmigen Aufsätze auf Burgmauern? | Zinnen | Erker | Gauben | Giebel | 1 | Zinne
Wie heißen die schmalen Öffnungen in Burgmauern zum Schießen? | Schießscharten | Fenster | Pechnasen | Erker | 1 | Schießscharte
Welche Waffe brauchte Muskelkraft und eine Kurbel zum Spannen? | Armbrust | Langbogen | Speer | Schleuder | 1 | Armbrust
Wie nennt man eine große Wurfmaschine mit Gegengewicht? | Tribok (Trebuchet) | Katapult-Bogen | Ballista | Rammbock | 2 | Tribok | alt=Trebuchet
Welche Rüstung bestand aus vielen kleinen Metallringen? | Kettenhemd | Plattenpanzer | Lederrüstung | Brustpanzer | 1 | Kettenhemd
Welches Pferd ritten Ritter in die Schlacht? | Streitross | Packpferd | Zelter | Pony | 2 | Destrier
Was trug ein Ritter auf seinem Schild, um erkannt zu werden? | Ein Wappen | Seinen Namen | Eine Zahl | Ein Kreuz in jeder Farbe | 1 | Wappen | mc
Wie nennt man die Lehre der Wappen? | Heraldik | Numismatik | Genealogie | Sphragistik | 2 | Heraldik
In welchem Alter wurde ein Junge meist Page? | Mit etwa 7 Jahren | Mit 14 | Mit 21 | Mit 3 | 2 | Page (Beruf) | mc
Wie hieß der Ehrenkodex der Ritter (Tugenden)? | Ritterliche Tugenden wie Treue und Mäßigung | Die zehn Gebote | Das Lehnsrecht | Die Goldene Bulle | 2 | Rittertum | mc
Wie hießen die Ritter um König Artus? | Ritter der Tafelrunde | Templer | Musketiere | Paladine | 1 | Tafelrunde
Wie hieß das Schwert von König Artus? | Excalibur | Durendal | Balmung | Joyeuse | 1 | Excalibur
Wie hieß der Zauberer am Hof von König Artus? | Merlin | Gandalf | Morgana | Lancelot | 1 | Merlin
Wie hieß der heilige Gefäß, das die Artus-Ritter suchten? | Der Heilige Gral | Die Bundeslade | Das Goldene Vlies | Der Stein der Weisen | 1 | Heiliger Gral
Wie hieß der berühmte Bogenschütze und Räuber aus dem Sherwood Forest? | Robin Hood | Wilhelm Tell | Till Eulenspiegel | Störtebeker | 1 | Robin Hood
Welcher Seeräuber der Nord- und Ostsee wurde 1401 in Hamburg hingerichtet? | Klaus Störtebeker | Robin Hood | Francis Drake | Barbarossa | 1 | Klaus Störtebeker | alt=Störtebeker
Welcher Schelm spielte der Sage nach den Bürgern Streiche? | Till Eulenspiegel | Robin Hood | Rübezahl | Münchhausen | 1 | Till Eulenspiegel
Welcher Schweizer Held schoss der Sage nach einen Apfel vom Kopf seines Sohnes? | Wilhelm Tell | Robin Hood | Arnold Winkelried | Walter Fürst | 1 | Wilhelm Tell
Welcher Bund gilt als Gründung der Eidgenossenschaft (1291)? | Rütlischwur (Bundesbrief) | Hanse | Goldene Bulle | Schwäbischer Bund | 2 | Bundesbrief von 1291 | mc
# Kirche und Klöster
Wie lautet die Regel des Benediktinerordens? | Ora et labora (Bete und arbeite) | Veni, vidi, vici | Carpe diem | Deus vult | 1 | Benediktiner | mc
Mit welchem Ruf zogen die Kreuzfahrer los? | Deus vult (Gott will es) | Ora et labora | Alea iacta est | Veni creator | 2 | Deus lo vult
Welcher Orden kümmerte sich auf den Kreuzzügen um Kranke und Pilger? | Johanniter | Templer | Benediktiner | Jesuiten | 2 | Johanniterorden
Welcher Ritterorden wurde 1312 aufgelöst und seine Führer verbrannt? | Templer | Johanniter | Deutscher Orden | Malteser | 2 | Templerorden
Welcher Orden trug braune Kutten und wurde von Franz von Assisi gegründet? | Franziskaner | Dominikaner | Benediktiner | Zisterzienser | 1 | Franziskaner
Welcher Orden wurde besonders mit der Inquisition verbunden? | Dominikaner | Franziskaner | Benediktiner | Kartäuser | 2 | Dominikaner
Wie heißt der Kreuzgang im Kloster? | Überdachter Gang um einen Innenhof | Der Weg zur Kirche | Ein Kreuzweg im Wald | Ein Gebetsraum | 2 | Kreuzgang | mc
Wie hieß der Speisesaal im Kloster? | Refektorium | Dormitorium | Skriptorium | Kapitelsaal | 2 | Refektorium
Wie hieß der Schlafsaal der Mönche? | Dormitorium | Refektorium | Skriptorium | Krypta | 2 | Dormitorium
Wie nennt man einen unterirdischen Raum unter einer Kirche? | Krypta | Apsis | Sakristei | Chor | 1 | Krypta
Wie viele Päpste gab es während des Großen Abendländischen Schismas zeitweise gleichzeitig? | Bis zu drei | Einen | Zwei immer | Sieben | 2 | Abendländisches Schisma | mc
In welcher französischen Stadt residierten die Päpste im 14. Jahrhundert? | Avignon | Paris | Lyon | Reims | 2 | Papstpalast (Avignon)
Wo wurden die französischen Könige gekrönt? | Reims | Paris | Orléans | Versailles | 2 | Kathedrale von Reims
Wo liegt der berühmte Pilgerort mit dem Grab des Apostels Jakobus? | Santiago de Compostela | Rom | Lourdes | Fátima | 1 | Kathedrale von Santiago de Compostela
Welches Symbol tragen Jakobspilger? | Muschel | Kreuz | Taube | Fisch | 1 | Jakobsmuschel
Welche Stadt war den Christen, Juden und Muslimen gleichermaßen heilig und Ziel der Kreuzzüge? | Jerusalem | Rom | Mekka | Konstantinopel | 1 | Jerusalem
Wie viele große Kreuzzüge zählt man meist? | Sieben | Zwei | Zwölf | Drei | 2 | Kreuzzug | mc
Was war der Kinderkreuzzug 1212? | Ein Zug von Kindern und Jugendlichen ins Heilige Land, der scheiterte | Ein Spiel | Ein Schulfest | Ein Ritterturnier | 2 | Kinderkreuzzug | mc
Welche Stadt wurde 1204 von Kreuzfahrern geplündert, obwohl sie christlich war? | Konstantinopel | Jerusalem | Venedig | Akkon | 2 | Plünderung von Konstantinopel (1204)
# Stadt und Alltag
Was bedeutet der Spruch „Stadtluft macht frei“? | Leibeigene wurden nach einem Jahr in der Stadt frei | Die Luft war sauberer | Steuern entfielen | Man durfte wählen | 1 | Stadtluft macht frei | mc
Wer durfte in einer mittelalterlichen Stadt meist nicht Bürger werden? | Leibeigene ohne Erlaubnis ihres Herrn | Kaufleute | Handwerksmeister | Patrizier | 2 | Bürger (Stadt) | mc
Wie nennt man die reichen Familien, die eine Stadt regierten? | Patrizier | Plebejer | Vasallen | Lehnsleute | 2 | Patriziat
Wie hieß die Ausbildungsreise junger Handwerker? | Walz (Wanderschaft) | Pilgerfahrt | Kreuzzug | Grand Tour | 1 | Walz (Handwerk) | alt=Walz/Wanderschaft
Welche Stufen hatte die Ausbildung im Handwerk? | Lehrling, Geselle, Meister | Page, Knappe, Ritter | Novize, Mönch, Abt | Bürger, Ratsherr, Bürgermeister | 1 | Meister (Handwerk) | mc
Wofür stehen Rolandstatuen in norddeutschen Städten? | Für Stadtrechte und Freiheit | Für einen Heiligen | Für einen König | Für Seefahrer | 2 | Bremer Roland | mc
In welcher Stadt steht der bekannteste Roland vor dem Rathaus? | Bremen | Hamburg | Lübeck | Magdeburg | 1 | Bremer Roland
Welche Krankheit verbreiteten Flöhe auf Ratten? | Pest | Lepra | Pocken | Cholera | 1 | Pest
Wie viele Menschen in Europa starben ungefähr an der Pest im 14. Jahrhundert? | Etwa ein Drittel | Etwa ein Prozent | Etwa die Hälfte aller Kinder allein | Fast niemand | 1 | Schwarzer Tod | mc
Wie nannte man Menschen, die sich öffentlich auspeitschten, um die Pest abzuwenden? | Flagellanten | Pilger | Templer | Bettelmönche | 2 | Flagellanten
Wie nannte man die Krankenhäuser für Leprakranke außerhalb der Stadt? | Siechenhäuser (Leprosorien) | Hospize | Klöster | Burgen | 2 | Leprosorium | mc
Wie nennt man den Zeitraum zwischen 500 und 1500 in Europa? | Mittelalter | Antike | Neuzeit | Steinzeit | 1 | Mittelalter
Wie unterteilt man das Mittelalter meist? | Früh-, Hoch- und Spätmittelalter | Alt-, Mittel-, Neumittelalter | Erstes und zweites Mittelalter | Gar nicht | 1 | Mittelalter | mc
Womit beleuchteten die Menschen im Mittelalter ihre Häuser? | Kerzen, Kienspäne und Öllampen | Gaslaternen | Glühbirnen | Petroleumlampen allein | 1 | Kerze | mc
Was trank man im Mittelalter oft statt Wasser, weil es sicherer war? | Dünnbier | Kaffee | Tee | Limonade | 2 | Dünnbier
Welches Gewürz war im Mittelalter so wertvoll wie Gold? | Pfeffer | Salz | Petersilie | Senf | 1 | Schwarzer Pfeffer
Welche Stadt kontrollierte im Spätmittelalter den Gewürzhandel im Mittelmeer? | Venedig | Rom | Paris | Hamburg | 1 | Venedig
Wie hieß die Schrift, die Karl der Große als einheitliche Schrift förderte? | Karolingische Minuskel | Fraktur | Kurrent | Runen | 2 | Karolingische Minuskel
Welche Schrift benutzten die Germanen und Wikinger? | Runen | Keilschrift | Hieroglyphen | Kyrillisch | 1 | Runen
Welche Sprache war im Mittelalter die Sprache der Gelehrten und der Kirche in Westeuropa? | Latein | Griechisch | Deutsch | Französisch | 1 | Latein
Welche Universität ist die älteste im heutigen Deutschland (1386)? | Heidelberg | Köln | Leipzig | Tübingen | 2 | Universität Heidelberg
Welche Universität gilt als älteste Europas (1088)? | Bologna | Paris | Oxford | Salamanca | 2 | Universität Bologna
# Wikinger, Byzanz, Islam, Mongolen
Welche Klosterinsel überfielen die Wikinger 793, was als Beginn der Wikingerzeit gilt? | Lindisfarne | Iona | Reichenau | Mont-Saint-Michel | 2 | Lindisfarne
Wie hießen die Schiffe der Wikinger? | Langschiffe (Drachenboote) | Galeeren | Koggen | Karavellen | 1 | Wikingerschiff | mc
Welche Insel besiedelten die Wikinger um 870? | Island | Irland | Sizilien | Zypern | 1 | Island
Welches Gebiet in Frankreich ist nach den Wikingern (Nordmännern) benannt? | Normandie | Bretagne | Burgund | Provence | 1 | Normandie
Welcher Wikinger-Handelsort lag bei Schleswig? | Haithabu | Birka | Kaupang | Jorvik | 2 | Haithabu
Wie hieß der Göttervater der nordischen Mythologie? | Odin | Thor | Loki | Freyr | 1 | Odin
Wie hieß der nordische Donnergott mit dem Hammer? | Thor | Odin | Loki | Baldur | 1 | Thor
Wie hieß der Hammer von Thor? | Mjölnir | Gungnir | Excalibur | Gram | 2 | Mjölnir
Wie hieß die Halle der gefallenen Krieger in der nordischen Mythologie? | Walhall | Asgard | Midgard | Hel | 1 | Walhall | alt=Walhalla
Welcher Wochentag ist nach dem Gott Thor (Donar) benannt? | Donnerstag | Dienstag | Freitag | Mittwoch | 1 | Thor
Wie hieß die Hauptstadt des Byzantinischen Reiches? | Konstantinopel | Rom | Athen | Antiochia | 1 | Konstantinopel
Wann begann die islamische Zeitrechnung (Hidschra)? | 622 | 570 | 732 | 800 | 2 | Hidschra
In welcher Stadt wurde der Prophet Mohammed geboren? | Mekka | Medina | Jerusalem | Bagdad | 1 | Mekka
Welches Reich eroberte ab 711 große Teile Spaniens? | Die Mauren (Umayyaden) | Die Wikinger | Die Mongolen | Die Franken | 1 | Al-Andalus | mc
Welche spanische Stadt mit großer Moschee war Zentrum von Al-Andalus? | Córdoba | Madrid | Barcelona | Bilbao | 2 | Mezquita-Catedral de Córdoba
Wie nennt man die christliche Rückeroberung Spaniens? | Reconquista | Kreuzzug | Inquisition | Konquista | 1 | Reconquista
Welche Stadt war im 9. Jahrhundert ein Zentrum der Wissenschaft mit dem „Haus der Weisheit“? | Bagdad | Kairo | Damaskus | Rom | 2 | Haus der Weisheit
Welche Zahlen übernahm Europa im Mittelalter über die Araber aus Indien? | Die heutigen Ziffern 0–9 | Die römischen Zahlen | Die griechischen Zahlen | Keine | 1 | Arabische Zahlschrift | mc
Welches Reich gründeten die Mongolen unter Dschingis Khan? | Das größte zusammenhängende Landreich der Geschichte | Das Römische Reich | Das Osmanische Reich | Das Perserreich | 1 | Mongolisches Reich | mc
Welches Reich entstand um 1300 in Anatolien und eroberte später Konstantinopel? | Osmanisches Reich | Mongolisches Reich | Seldschukenreich | Byzantinisches Reich | 1 | Osmanisches Reich
Wie hieß der Sultan, der 1453 Konstantinopel eroberte? | Mehmed II. | Süleyman der Prächtige | Saladin | Osman I. | 2 | Mehmed II.
Welches Volk aus Mittelamerika errichtete im Mittelalter Tenochtitlan? | Azteken | Maya | Inka | Olmeken | 1 | Tenochtitlan
Welches Volk errichtete in den Anden ein großes Reich mit Machu Picchu? | Inka | Azteken | Maya | Tolteken | 1 | Machu Picchu
Welche Tempelanlage in Kambodscha entstand im 12. Jahrhundert? | Angkor Wat | Borobudur | Taj Mahal | Bagan | 1 | Angkor Wat
Welche Kultur baute die Stadt Great Zimbabwe? | Die Shona | Die Zulu | Die Maya | Die Inka | 2 | Great Zimbabwe
Wie hieß der reichste König von Mali, der 1324 nach Mekka pilgerte? | Mansa Musa | Sundiata Keita | Haile Selassie | Shaka | 2 | Mansa Musa
# Erfindungen und Kunst
Welche Erfindung aus dem Mittelalter maß die Zeit mechanisch? | Räderuhr | Sanduhr | Sonnenuhr | Wasseruhr | 2 | Räderuhr
Welche Erfindung aus China half Seefahrern bei der Navigation? | Kompass | Fernrohr | Sextant | Echolot | 1 | Kompass
Welche Erfindung aus China veränderte die Kriegsführung in Europa? | Schießpulver | Armbrust | Kettenhemd | Langbogen | 1 | Schwarzpulver
Welche Erfindung half Pferden, schwere Pflüge zu ziehen? | Kummet | Steigbügel | Sattel | Hufnagel | 2 | Kummet
Welche Erfindung gab Reitern mehr Halt im Kampf? | Steigbügel | Kummet | Sporn | Zaumzeug | 2 | Steigbügel
Was ist eine Buchmalerei? | Verzierte Bilder in handgeschriebenen Büchern | Wandmalerei | Ölgemälde | Glasmalerei | 1 | Buchmalerei | mc
Was ist der Teppich von Bayeux? | Eine Stickerei über die Eroberung Englands 1066 | Ein Wandteppich mit Heiligen | Ein Gemälde | Eine Landkarte | 1 | Teppich von Bayeux | mc
Was ist ein Fenster aus bunten Glasstücken in gotischen Kirchen? | Bleiglasfenster | Rosette allein | Erker | Mosaik | 1 | Bleiglasfenster
Wie nennt man das runde Fenster über dem Hauptportal gotischer Kirchen? | Rosette (Fensterrose) | Bullauge | Okulus | Lünette | 2 | Fensterrose | alt=Fensterrose/Rose
Wie nennt man die Fabelwesen-Wasserspeier an Kathedralen? | Gargoyles (Wasserspeier) | Drachen | Greifen | Engel | 1 | Wasserspeier | alt=Wasserspeier
Welcher Baustil folgte auf die Romanik? | Gotik | Barock | Renaissance | Klassizismus | 1 | Gotik
Welche Epoche folgte auf das Mittelalter? | Renaissance (frühe Neuzeit) | Antike | Barock | Industrialisierung | 1 | Renaissance
Wie heißt die Sammlung arabischer Geschichten mit Scheherazade? | Tausendundeine Nacht | Decamerone | Canterbury-Erzählungen | Edda | 1 | Tausendundeine Nacht
Wer schrieb die „Canterbury Tales“? | Geoffrey Chaucer | William Shakespeare | Dante | Boccaccio | 2 | Geoffrey Chaucer | alt=Chaucer
Wer schrieb das „Decamerone“? | Giovanni Boccaccio | Dante | Petrarca | Machiavelli | 2 | Giovanni Boccaccio | alt=Boccaccio
Wer schrieb den Artusroman „Parzival“? | Wolfram von Eschenbach | Walther von der Vogelweide | Hartmann von Aue | Gottfried von Straßburg | 2 | Wolfram von Eschenbach | alt=Eschenbach
Welche Sammlung nordischer Göttersagen stammt aus Island? | Edda | Nibelungenlied | Kalevala | Beowulf | 2 | Edda
Wie heißt das altenglische Heldenepos um einen Drachentöter? | Beowulf | Edda | Parzival | Rolandslied | 2 | Beowulf
Wie heißt die Sage um den Rattenfänger einer niedersächsischen Stadt? | Rattenfänger von Hameln | Bremer Stadtmusikanten | Schildbürger | Lorelei | 1 | Rattenfänger von Hameln
`);
})();
