/* Mittelalter – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "mittelalter";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const RULER = parse(`
Karl der Große;Karolinger
Ludwig der Fromme;Karolinger
Otto I. (der Große);Ottonen
Otto III.;Ottonen
Heinrich II.;Ottonen
Konrad II.;Salier
Heinrich III.;Salier
Heinrich IV.;Salier
Heinrich V.;Salier
Konrad III.;Staufer
Friedrich I. Barbarossa;Staufer
Heinrich VI.;Staufer
Friedrich II.;Staufer
Rudolf I.;Habsburger
Ludwig der Bayer;Wittelsbacher
Karl IV.;Luxemburger
Sigismund;Luxemburger
Maximilian I.;Habsburger
`);
  table(C, RULER, { q: (r) => `Zu welcher Herrscherfamilie (Dynastie) gehörte ${r[0]}?`, a: (r) => r[1], pool: [...new Set(RULER.map((r) => r[1]))], diff: (r) => (["Karl der Große", "Friedrich I. Barbarossa", "Rudolf I.", "Maximilian I."].includes(r[0]) ? 1 : 2), img: (r) => ({ "Karl der Große": "Karl der Große", "Friedrich I. Barbarossa": "Friedrich I. (HRR)", "Otto I. (der Große)": "Otto I. (HRR)" })[r[0]] || null });

  const JOB = parse(`
Böttcher;Fässer
Gerber;Leder
Wagner;Wagenräder und Wagen
Seiler;Seile
Kürschner;Pelzkleidung
Färber;Gefärbte Stoffe
Weber;Stoffe
Müller;Mehl
Zimmermann;Dachstühle und Fachwerk
Steinmetz;Behauene Steine
Glaser;Fenster aus Glas
Schuster;Schuhe
Töpfer;Gefäße aus Ton
Brauer;Bier
Köhler;Holzkohle
Drechsler;Gedrechselte Holzwaren
Plattner;Rüstungen
Schmied;Hufeisen und Werkzeuge aus Eisen
Bader;Badestuben und einfache Heilbehandlungen
Kerzenzieher;Kerzen
Pergamenter;Pergament zum Schreiben
Sattler;Sättel und Lederzeug
Tuchmacher;Wollstoffe (Tuch)
Goldschmied;Schmuck
`);
  table(C, JOB, { q: (j) => `Was stellte ein ${j[0]} im Mittelalter her bzw. was bot er an?`, a: (j) => j[1], pool: JOB.map((j) => j[1]), mc: true, diff: (j) => (["Müller", "Schuster", "Töpfer", "Brauer", "Weber", "Schmied", "Goldschmied", "Kerzenzieher"].includes(j[0]) ? 1 : 2) });

  const EV2 = parse(`
Der Erste Kreuzzug beginnt;1096
Der Zweite Kreuzzug beginnt;1147
Friedrich Barbarossa wird König;1152
Der Bau von Notre-Dame in Paris beginnt;1163
Der Dritte Kreuzzug beginnt;1189
Kaiser Barbarossa ertrinkt auf dem Kreuzzug;1190
Kreuzfahrer plündern Konstantinopel;1204
Dschingis Khan wird zum Großkhan ausgerufen;1206
Der Kinderkreuzzug findet statt;1212
Der Bau des Kölner Doms beginnt;1248
Kaiser Friedrich II. stirbt;1250
Marco Polo bricht nach China auf;1271
Rudolf von Habsburg wird König;1273
Die englischen Langbogenschützen siegen bei Crécy;1346
Die Universität Heidelberg wird gegründet;1386
Das Große Abendländische Schisma beginnt;1378
Das Konzil von Konstanz beginnt;1414
Die Schlacht von Azincourt;1415
Jeanne d’Arc befreit Orléans;1429
`);
  table(C, EV2, { q: (e) => `In welchem Jahr: ${e[0]}?`, a: (e) => e[1], years: 20, min: 1000, max: 1500, diff: 2 });

  const PERS = parse(`
Frankenkönig, im Jahr 800 zum Kaiser gekrönt;Karl der Große
Staufer-Kaiser, der auf dem Kreuzzug ertrank;Friedrich Barbarossa
Englischer König und Kreuzfahrer mit dem Beinamen eines Raubtiers;Richard Löwenherz
Sultan, der 1187 Jerusalem eroberte;Saladin
Normannenherzog, der 1066 England eroberte;Wilhelm der Eroberer
Begründer des Mongolenreichs;Dschingis Khan
Gründer eines Bettelordens, der mit Tieren sprach;Franz von Assisi
Dichter der „Göttlichen Komödie“;Dante Alighieri
Wikinger, der um 1000 Nordamerika erreichte;Leif Eriksson
Bauernmädchen, das Frankreichs Heer anführte;Jeanne d’Arc
Venezianischer Händler, der bis China reiste;Marco Polo
Erfinder des Buchdrucks mit beweglichen Lettern;Johannes Gutenberg
Äbtissin, Heilkundige und Komponistin;Hildegard von Bingen
Berühmtester Minnesänger;Walther von der Vogelweide
Spanischer Nationalheld der Reconquista;El Cid
Byzantinischer Kaiser, der die Hagia Sophia baute;Justinian I.
Sultan, der Konstantinopel 1453 eroberte;Mehmed II.
`);
  table(C, PERS, { q: (p) => `Wer ist gemeint? ${p[0]}.`, a: (p) => p[1], pool: PERS.map((p) => p[1]), diff: (p) => (["Karl der Große", "Dschingis Khan", "Marco Polo", "Johannes Gutenberg", "Richard Löwenherz", "Jeanne d’Arc"].includes(p[1]) ? 1 : 2), alt: (p) => (p[1] === "Jeanne d’Arc" ? ["Jeanne d'Arc", "Johanna von Orleans", "Johanna von Orléans"] : []), img: (p) => p[1] });

  lines(C, `
Wo lag das Hansekontor „Bryggen“? | Bergen (Norwegen) | Brügge | London | Nowgorod | 2 | Bryggen
Wie hieß das Hansekontor in London? | Stalhof | Bryggen | Peterhof | Artushof | 2 | Stalhof
In welcher russischen Stadt hatte die Hanse den „Peterhof“? | Nowgorod | Moskau | Kiew | Smolensk | 2 | Weliki Nowgorod
Wie hieß das typische Handelsschiff der Hanse? | Kogge | Galeere | Langschiff | Karavelle | 1 | Kogge
Welcher Adelstitel steht höher? | Herzog | Graf | Freiherr | Ritter | 1 | Herzog | mc
Welcher Titel steht direkt unter dem König in der Rangfolge der Fürsten meist? | Herzog | Graf | Baron | Junker | 2 | Herzog | mc
Wie nannte man einen Grafen, der ein Grenzgebiet verwaltete? | Markgraf | Pfalzgraf | Burggraf | Landgraf | 2 | Markgraf
Wie nannte man den obersten Beamten am fränkischen Königshof, der später selbst König wurde? | Hausmeier | Kanzler | Truchsess | Marschall | 2 | Hausmeier
Welche Familie folgte als Königshaus auf die Merowinger? | Karolinger | Ottonen | Salier | Kapetinger | 2 | Karolinger
Wie hieß die erste fränkische Königsdynastie? | Merowinger | Karolinger | Kapetinger | Staufer | 2 | Merowinger
In welcher Stadt hatte Karl der Große seine Lieblingspfalz? | Aachen | Paris | Köln | Ingelheim | 1 | Aachener Dom
Gegen welches Volk führte Karl der Große über 30 Jahre Krieg? | Sachsen | Wikinger | Ungarn | Römer | 2 | Sachsenkriege
Welcher Sachsenherzog leistete Karl dem Großen lange Widerstand? | Widukind | Arminius | Hermann Billung | Heinrich der Löwe | 2 | Widukind
In welche drei Teile wurde das Frankenreich 843 geteilt? | West-, Mittel- und Ostfrankenreich | Nord-, Süd- und Ostreich | Gallien, Germanien, Italien | Franken, Sachsen, Bayern | 2 | Vertrag von Verdun | mc
Aus welchem Teil des Frankenreichs entwickelte sich Deutschland? | Ostfrankenreich | Westfrankenreich | Mittelreich | Burgund | 1 | Ostfrankenreich
Aus welchem Teil des Frankenreichs entwickelte sich Frankreich? | Westfrankenreich | Ostfrankenreich | Lotharingien | Aquitanien | 1 | Westfrankenreich
Welcher Welfenherzog war Rivale Barbarossas und gründete München? | Heinrich der Löwe | Otto der Große | Widukind | Konrad III. | 2 | Heinrich der Löwe
Welche Stadt gründete Heinrich der Löwe 1158? | München | Lübeck allein | Braunschweig | Hannover | 2 | München
Wo hatte Heinrich der Löwe seine Residenz mit dem Burglöwen? | Braunschweig | Lübeck | München | Lüneburg | 2 | Burg Dankwarderode
Was bedeutete die Reichsacht? | Den Verlust aller Rechte – man war „vogelfrei“ | Eine Auszeichnung | Eine Steuer | Einen Ritterschlag | 2 | Reichsacht | mc
Was war ein „Interregnum“ (1250–1273)? | Eine Zeit ohne allgemein anerkannten König | Ein Krieg | Eine Seuche | Ein Kreuzzug | 2 | Interregnum (HRR) | mc
In welcher Stadt hielt Kaiser Karl IV. Hof und gründete eine Universität (1348)? | Prag | Wien | Nürnberg | Heidelberg | 2 | Karls-Universität
Wie heißt die berühmte Brücke in Prag, die unter Karl IV. begonnen wurde? | Karlsbrücke | Rialtobrücke | Ponte Vecchio | Tower Bridge | 1 | Karlsbrücke
Welche Brücke in Florenz trägt noch heute Läden (Goldschmiede)? | Ponte Vecchio | Rialtobrücke | Karlsbrücke | Engelsbrücke | 2 | Ponte Vecchio
Welche Familie herrschte im 15. Jahrhundert als Bankiers in Florenz? | Medici | Fugger | Borgia | Sforza | 1 | Medici
Welcher englische König unterschrieb die Magna Carta? | Johann Ohneland | Richard Löwenherz | Heinrich II. | Eduard I. | 2 | Johann Ohneland
Welcher Bruder von Richard Löwenherz regierte, während dieser auf Kreuzzug war? | Johann Ohneland | Heinrich der Jüngere | Gottfried | Wilhelm | 2 | Johann Ohneland
Auf welcher Burg in Österreich wurde Richard Löwenherz gefangen gehalten? | Dürnstein | Hohensalzburg | Hochosterwitz | Kreuzenstein | 2 | Burgruine Dürnstein
Welche Länder kämpften im Hundertjährigen Krieg gegeneinander? | England und Frankreich | Deutschland und Polen | Spanien und Portugal | Schottland und Irland | 1 | Hundertjähriger Krieg | mc
Wie lange dauerte der Hundertjährige Krieg wirklich ungefähr? | 116 Jahre | 100 Jahre | 99 Jahre | 30 Jahre | 2 | Hundertjähriger Krieg
Welche englischen Adelshäuser kämpften in den Rosenkriegen? | York und Lancaster | Tudor und Stuart | Windsor und Hannover | Plantagenet und Normandie | 2 | Rosenkriege | mc
Welches Haus gewann am Ende die Rosenkriege (1485)? | Tudor | York | Lancaster | Stuart | 2 | Haus Tudor
Wie hieß die Pestwelle, die Europa ab 1347 traf? | Schwarzer Tod | Große Grippe | Rote Ruhr | Weißer Tod | 1 | Schwarzer Tod
Woher kam die Pest 1347 nach Europa (Hafen auf der Krim)? | Kaffa | Konstantinopel | Venedig | Alexandria | 2 | Kaffa
Welchen Menschen gab man im Mittelalter oft fälschlich die Schuld an der Pest? | Juden | Mönchen | Rittern | Kaufleuten | 2 | Pestpogrome
Wie lange mussten Schiffe in Venedig zur Pestvorsorge warten (daher „Quarantäne“)? | 40 Tage | 4 Tage | 14 Tage | 100 Tage | 2 | Quarantäne
Welche Maske trugen spätere Pestärzte? | Eine Schnabelmaske | Eine Gasmaske | Eine Ritterhelm-Maske | Gar keine | 1 | Pestarzt | mc
Woraus bestand die Nahrung einfacher Bauern hauptsächlich? | Getreidebrei und Brot | Fleisch | Fisch | Kartoffeln | 1 | Brei | mc
Welches Lebensmittel kannte man im mittelalterlichen Europa noch nicht? | Kartoffel | Rüben | Bohnen | Kohl | 1 | Kartoffel | mc
Woher stammte das meiste Salz für die Hansestadt Lübeck? | Lüneburg | Hallstatt | Bad Reichenhall | Halle | 2 | Lüneburg
Wie hieß die Handelsroute für Salz von Lüneburg nach Lübeck? | Alte Salzstraße | Seidenstraße | Via Regia | Bernsteinstraße | 2 | Alte Salzstraße
Welches Spiel kam über Arabien und Persien nach Europa und wurde bei Rittern beliebt? | Schach | Skat | Domino | Poker | 1 | Schach
Wie hieß ein fahrender Unterhaltungskünstler auf Jahrmärkten? | Gaukler | Herold | Kaplan | Vogt | 1 | Gaukler
Wie hieß der Ausrufer, der Nachrichten verkündete und Wappen kannte? | Herold | Gaukler | Büttel | Schultheiß | 2 | Herold
Wie nannte man einen Verwalter, der für den Herrn Recht sprach und Abgaben eintrieb? | Vogt | Kaplan | Abt | Zöllner | 2 | Vogt
Wie hieß der Vorsteher eines Klosters? | Abt | Bischof | Prior allein | Dekan | 1 | Abt
Wie hieß die Vorsteherin eines Frauenklosters? | Äbtissin | Priorin | Oberin allein | Stiftsdame | 1 | Äbtissin
Wie hieß ein Bischof, der zugleich weltlicher Fürst war? | Fürstbischof | Erzbischof | Kardinal | Weihbischof | 2 | Fürstbischof
Welche drei Erzbischöfe waren Kurfürsten? | Mainz, Köln und Trier | Mainz, Salzburg, Bremen | Köln, Hamburg, Magdeburg | Trier, Prag, Wien | 2 | Kurfürst | mc
Welche weltlichen Kurfürsten gab es nach der Goldenen Bulle? | Böhmen, Pfalz, Sachsen, Brandenburg | Bayern, Österreich, Sachsen, Hessen | Preußen, Bayern, Württemberg, Hannover | Böhmen, Bayern, Baden, Sachsen | 2 | Goldene Bulle | mc
Welche Jahreszahl trägt der Bundesbrief der Eidgenossen? | 1291 | 1315 | 1386 | 1499 | 2 | Bundesbrief von 1291
Welche drei Urkantone gründeten die Schweizer Eidgenossenschaft? | Uri, Schwyz und Unterwalden | Zürich, Bern, Basel | Luzern, Zug, Glarus | Genf, Waadt, Wallis | 2 | Urkantone | mc
Gegen welches Adelsgeschlecht kämpften die frühen Eidgenossen? | Habsburger | Hohenzollern | Wittelsbacher | Staufer | 2 | Schlacht bei Morgarten
Welche Schlacht 1386 gewannen die Eidgenossen gegen Habsburg? | Sempach | Morgarten | Marignano | Murten | 2 | Schlacht bei Sempach
Welches Reich lag im heutigen Russland und wurde von Wikingern (Warägern) mitgeprägt? | Kiewer Rus | Goldene Horde | Byzanz | Polen-Litauen | 2 | Kiewer Rus
Wie hieß das mongolische Teilreich, das Russland lange beherrschte? | Goldene Horde | Ilchanat | Tschagatai-Khanat | Yuan-Dynastie | 2 | Goldene Horde
Welcher russische Fürst siegte 1242 auf dem Eis des Peipussees gegen den Deutschen Orden? | Alexander Newski | Iwan der Schreckliche | Dmitri Donskoi | Jaroslaw der Weise | 2 | Alexander Newski
Welche Union bildeten Polen und Litauen 1386? | Personalunion (Union von Krewo) | Hanse | Kalmarer Union | Union von Utrecht | 2 | Union von Krewo
Wie hieß die Union der drei skandinavischen Reiche ab 1397? | Kalmarer Union | Hanse | Union von Krewo | Nordischer Bund | 2 | Kalmarer Union
Welcher Seefahrer umrundete 1488 das Kap der Guten Hoffnung? | Bartolomeu Dias | Vasco da Gama | Kolumbus | Magellan | 2 | Bartolomeu Dias
Welcher portugiesische Prinz förderte die Entdeckungsfahrten und hieß „der Seefahrer“? | Heinrich der Seefahrer | Manuel I. | Johann II. | Alfons V. | 2 | Heinrich der Seefahrer
Welches spanische Königspaar finanzierte die Reise des Kolumbus? | Isabella und Ferdinand | Karl und Johanna | Philipp und Maria | Alfons und Eleonore | 1 | Katholische Könige | mc
Welches Ereignis markiert für viele Historiker das Ende des Mittelalters? | Entdeckung Amerikas 1492 | Fall Roms 476 | Kaiserkrönung 800 | Westfälischer Friede 1648 | 1 | Christoph Kolumbus | mc
Welche Erfindung um 1450 gilt ebenfalls als Wende zur Neuzeit? | Der Buchdruck | Die Dampfmaschine | Das Telefon | Das Fernrohr | 1 | Gutenberg-Bibel
Wie viele Exemplare der Gutenberg-Bibel wurden etwa gedruckt? | Rund 180 | Rund 18.000 | Rund 18 | Rund 1 Million | 2 | Gutenberg-Bibel | mc
In welcher Stadt steht der höchste Kirchturm der Welt (Münster)? | Ulm | Köln | Freiburg | Straßburg | 1 | Ulmer Münster
Wie lange dauerte der Bau des Kölner Doms (mit Unterbrechung)? | Über 600 Jahre (1248–1880) | 50 Jahre | 100 Jahre | 20 Jahre | 2 | Kölner Dom | mc
Welche Reliquien bewahrt der Kölner Dom in einem goldenen Schrein? | Die der Heiligen Drei Könige | Die des Apostels Petrus | Die Karls des Großen | Die der heiligen Ursula | 2 | Dreikönigenschrein
Welche Heiligenfigur trägt das Jesuskind über einen Fluss? | Christophorus | Georg | Martin | Nikolaus | 1 | Christophorus
Welcher Heilige teilte seinen Mantel mit einem Bettler? | Sankt Martin | Sankt Nikolaus | Sankt Georg | Sankt Florian | 1 | Martin von Tours
Welcher Heilige kämpfte der Legende nach gegen einen Drachen? | Sankt Georg | Sankt Martin | Sankt Michael allein | Sankt Petrus | 1 | Georg (Heiliger)
Wie hieß der irische Nationalheilige? | Patrick | Columban | Bonifatius | Gallus | 1 | Patrick von Irland | alt=Patrick/St. Patrick
Welcher Missionar wird „Apostel der Deutschen“ genannt? | Bonifatius | Patrick | Gallus | Kilian | 2 | Bonifatius
Welche Stadt in der Schweiz entstand um ein Kloster eines irischen Mönchs? | St. Gallen | Luzern | Basel | Chur | 2 | Stiftsbibliothek St. Gallen
Auf welcher Insel im Bodensee lag ein bedeutendes Kloster? | Reichenau | Mainau | Lindau | Konstanz | 2 | Reichenau
Wie hieß der Orden, der mit weißen Kutten im Mittelalter viele Klöster in Tälern gründete? | Zisterzienser | Benediktiner | Franziskaner | Dominikaner | 2 | Zisterzienser
Welches Kloster in Baden-Württemberg ist ein UNESCO-Welterbe der Zisterzienser? | Kloster Maulbronn | Kloster Ettal | Kloster Andechs | Kloster Eberbach | 2 | Kloster Maulbronn
Welches Getränk brauten Mönche in Klöstern oft selbst? | Bier | Kaffee | Tee | Limonade | 1 | Andechser Bier
`);
})();
