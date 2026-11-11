/* Deutsche Geschichte – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "de-geschichte";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const KANZ = parse(`
Konrad Adenauer;1949;1963;CDU
Ludwig Erhard;1963;1966;CDU
Kurt Georg Kiesinger;1966;1969;CDU
Willy Brandt;1969;1974;SPD
Helmut Schmidt;1974;1982;SPD
Helmut Kohl;1982;1998;CDU
Gerhard Schröder;1998;2005;SPD
Angela Merkel;2005;2021;CDU
Olaf Scholz;2021;2025;SPD
Friedrich Merz;2025;2029;CDU
`);
  const kNames = KANZ.map((k) => k[0]);
  const years = [];
  for (const k of KANZ) for (let y = +k[1] + 1; y < Math.min(+k[2], 2026); y++) years.push([y, k[0]]);
  table(C, years, { q: (y) => `Wer war im Jahr ${y[0]} Bundeskanzler bzw. Bundeskanzlerin?`, a: (y) => y[1], pool: kNames, diff: (y) => (y[0] >= 2006 || y[1] === "Konrad Adenauer" ? 1 : 2), img: () => "Bundeskanzleramt (Berlin)", alt: (y) => [y[1].split(" ").slice(-1)[0]] });
  table(C, KANZ, { q: (k) => `In welchem Jahr wurde ${k[0]} Bundeskanzler${k[0] === "Angela Merkel" ? "in" : ""}?`, a: (k) => k[1], pool: KANZ.map((k) => k[1]), diff: (k) => (["Konrad Adenauer", "Angela Merkel", "Olaf Scholz", "Friedrich Merz"].includes(k[0]) ? 1 : 2), img: (k) => k[0] });
  table(C, KANZ, { q: (k) => `Welcher Partei gehörte bzw. gehört ${k[0]} an?`, a: (k) => k[3], pool: ["CDU", "SPD", "FDP", "CSU", "Grüne"], diff: (k) => (["Konrad Adenauer", "Angela Merkel", "Willy Brandt", "Helmut Kohl"].includes(k[0]) ? 1 : 2), img: (k) => k[0] });
  table(C, KANZ.slice(1), { q: (k) => `Wer folgte auf ${KANZ[KANZ.indexOf(k) - 1][0]} als Bundeskanzler?`, a: (k) => k[0], pool: kNames, avoid: (k) => [KANZ[KANZ.indexOf(k) - 1][0]], diff: (k) => (["Angela Merkel", "Olaf Scholz", "Friedrich Merz"].includes(k[0]) ? 1 : 2), img: (k) => k[0] });

  const BP = parse(`
Theodor Heuss;1955
Heinrich Lübke;1965
Gustav Heinemann;1972
Walter Scheel;1977
Karl Carstens;1982
Richard von Weizsäcker;1990
Roman Herzog;1997
Johannes Rau;2002
Horst Köhler;2007
Christian Wulff;2011
Joachim Gauck;2015
Frank-Walter Steinmeier;2020
`);
  table(C, BP, { q: (b) => `Wer war ${b[1]} Bundespräsident?`, a: (b) => b[0], pool: BP.map((b) => b[0]), diff: (b) => (["Frank-Walter Steinmeier", "Joachim Gauck", "Theodor Heuss"].includes(b[0]) ? 1 : 2), img: (b) => b[0], alt: (b) => [b[0].split(" ").slice(-1)[0]] });
  table(C, BP.slice(1), { q: (b) => `Wer folgte auf ${BP[BP.indexOf(b) - 1][0]} als Bundespräsident?`, a: (b) => b[0], pool: BP.map((b) => b[0]), avoid: (b) => [BP[BP.indexOf(b) - 1][0]], diff: 2, img: (b) => b[0] });

  const EV = parse(`
Otto I. wird in Rom zum Kaiser gekrönt;962
Die Goldene Bulle regelt die Wahl des deutschen Königs;1356
Martin Luther veröffentlicht seine 95 Thesen;1517
Luther verweigert auf dem Reichstag zu Worms den Widerruf;1521
Der Deutsche Bauernkrieg erreicht seinen Höhepunkt;1525
Der Augsburger Religionsfrieden wird geschlossen;1555
Der Prager Fenstersturz löst den Dreißigjährigen Krieg aus;1618
Der Westfälische Friede beendet den Dreißigjährigen Krieg;1648
Preußen wird Königreich;1701
Friedrich II. („der Große“) wird König von Preußen;1740
Das Heilige Römische Reich Deutscher Nation endet;1806
Die Völkerschlacht bei Leipzig findet statt;1813
Der Wiener Kongress gründet den Deutschen Bund;1815
Das Wartburgfest der Studenten findet statt;1817
Das Hambacher Fest fordert Einheit und Freiheit;1832
Der Deutsche Zollverein tritt in Kraft;1834
Die erste deutsche Eisenbahn fährt von Nürnberg nach Fürth;1835
Die Märzrevolution beginnt;1848
Otto von Bismarck wird preußischer Ministerpräsident;1862
Preußen besiegt Österreich im Deutschen Krieg;1866
Der Deutsch-Französische Krieg beginnt;1870
Das Deutsche Kaiserreich wird in Versailles proklamiert;1871
Das Sozialistengesetz wird erlassen;1878
Die gesetzliche Krankenversicherung wird eingeführt;1883
Kaiser Wilhelm II. entlässt Bismarck;1890
Der Erste Weltkrieg beginnt;1914
Die Novemberrevolution beendet die Monarchie;1918
Die Weimarer Verfassung tritt in Kraft;1919
Hitlers Putschversuch in München scheitert;1923
Paul von Hindenburg wird Reichspräsident;1925
Die Weltwirtschaftskrise beginnt mit dem Börsenkrach;1929
Hitler wird Reichskanzler;1933
Die Nürnberger Rassengesetze werden erlassen;1935
Olympische Sommerspiele finden in Berlin statt;1936
Die Novemberpogrome finden statt;1938
Der Zweite Weltkrieg beginnt;1939
Das Attentat vom 20. Juli auf Hitler scheitert;1944
Der Zweite Weltkrieg endet in Europa;1945
Die D-Mark wird in den Westzonen eingeführt;1948
Bundesrepublik und DDR werden gegründet;1949
Der Volksaufstand in der DDR wird niedergeschlagen;1953
Deutschland wird in Bern Fußball-Weltmeister;1954
Die Bundesrepublik tritt der NATO bei;1955
Die Berliner Mauer wird gebaut;1961
John F. Kennedy sagt in Berlin „Ich bin ein Berliner“;1963
Willy Brandt kniet in Warschau nieder;1970
Olympische Sommerspiele finden in München statt;1972
Beide deutsche Staaten treten der UNO bei;1973
Die Berliner Mauer fällt;1989
Deutschland wird wiedervereinigt;1990
Der Bundestag beschließt den Umzug nach Berlin;1991
Der Euro wird als Bargeld eingeführt;2002
Deutschland richtet die Fußball-Weltmeisterschaft aus;2006
Die allgemeine Wehrpflicht wird ausgesetzt;2011
Die letzten deutschen Atomkraftwerke gehen vom Netz;2023
`);
  table(C, EV, { q: (e) => `In welchem Jahr gilt: ${e[0]}?`, a: (e) => e[1], years: 8, diff: (e) => (["1517", "1871", "1914", "1933", "1939", "1945", "1949", "1961", "1989", "1990", "2002"].includes(e[1]) ? 1 : 2) });

  const PERS = parse(`
Sophie Scholl;Widerstandskämpferin der „Weißen Rose“
Claus Schenk Graf von Stauffenberg;Hitler-Attentäter vom 20. Juli 1944
Rosa Luxemburg;Sozialistin und Mitbegründerin der KPD
Gustav Stresemann;Außenminister der Weimarer Republik, Friedensnobelpreis 1926
Walther Rathenau;1922 ermordeter Außenminister der Weimarer Republik
Paul von Hindenburg;Generalfeldmarschall und Reichspräsident
Joseph Goebbels;Propagandaminister der NS-Zeit
Ludwig Erhard;„Vater des Wirtschaftswunders“
Kurt Schumacher;Erster SPD-Vorsitzender nach dem Krieg
Erich Honecker;Staats- und Parteichef der DDR ab 1971
Walter Ulbricht;SED-Chef, unter dem die Mauer gebaut wurde
Hans-Dietrich Genscher;Außenminister, verkündete 1989 die Ausreise in der Prager Botschaft
Günter Schabowski;SED-Funktionär, der 1989 versehentlich die Grenzöffnung verkündete
Otto von Bismarck;„Eiserner Kanzler“ und Reichsgründer
Thomas Müntzer;Anführer im Bauernkrieg
Freiherr vom Stein;Preußischer Reformer
Karl Marx;Verfasser des „Kommunistischen Manifests“ mit Engels
August Bebel;Mitbegründer der Sozialdemokratie
Robert Blum;Revolutionär von 1848, in Wien hingerichtet
Willy Brandt;Kanzler der neuen Ostpolitik, Friedensnobelpreis 1971
Helmut Kohl;„Kanzler der Einheit“
Gerhard Schröder;Kanzler der „Agenda 2010“
Joachim Gauck;Pfarrer und Leiter der Stasi-Unterlagen-Behörde, später Bundespräsident
Theodor Heuss;Erster Bundespräsident
Wilhelm Pieck;Erster und einziger Präsident der DDR
Königin Luise;Beliebte preußische Königin der Napoleon-Zeit
Elisabeth Selbert;Mutter des Gleichberechtigungsartikels im Grundgesetz
Georg Elser;Hitler-Attentäter mit einer Bombe im Bürgerbräukeller 1939
`);
  table(C, PERS, { q: (p) => `Wer war ${p[0]}?`, a: (p) => p[1], pool: PERS.map((p) => p[1]), mc: true, diff: (p) => (["Sophie Scholl", "Otto von Bismarck", "Karl Marx", "Helmut Kohl", "Willy Brandt", "Erich Honecker", "Claus Schenk Graf von Stauffenberg", "Theodor Heuss"].includes(p[0]) ? 1 : 2), img: (p) => p[0] });

  const TERM = parse(`
Ermächtigungsgesetz;Gesetz von 1933, mit dem sich das Parlament selbst entmachtete
Gleichschaltung;Ausrichtung aller Organisationen auf die NS-Ideologie
Dolchstoßlegende;Lüge, das Heer sei 1918 von der Heimat verraten worden
Wirtschaftswunder;Rascher wirtschaftlicher Aufschwung der 1950er-Jahre
Ostpolitik;Annäherung an Osteuropa und die DDR unter Willy Brandt
Montagsdemonstrationen;Friedliche Proteste 1989, vor allem in Leipzig
Treuhandanstalt;Behörde zur Privatisierung der DDR-Betriebe
Solidaritätszuschlag;Steuerzuschlag zur Finanzierung der deutschen Einheit
Begrüßungsgeld;100 D-Mark für DDR-Bürger bei Besuch im Westen
Trümmerfrauen;Frauen, die nach 1945 Schutt in den Städten räumten
Marshallplan;US-Wiederaufbauprogramm für Europa nach 1945
Rosinenbomber;Flugzeuge der Berliner Luftbrücke
Gastarbeiter;Ab den 1950ern angeworbene ausländische Arbeitskräfte
Kulturkampf;Streit Bismarcks mit der katholischen Kirche
Kleinstaaterei;Zersplitterung Deutschlands in viele kleine Staaten
Volksempfänger;Billiges Radio für NS-Propaganda
Weiße Rose;Studentische Widerstandsgruppe in München
Reichstagsbrand;Brand 1933, den die NS zur Verfolgung von Gegnern nutzten
Novemberpogrome;Gewalt gegen Juden im November 1938
Wannseekonferenz;Treffen 1942 zur Organisation des Völkermords an den Juden
Kalter Krieg;Konflikt zwischen Ost und West ohne direkten Krieg
Eiserner Vorhang;Grenze zwischen Ost- und Westeuropa im Kalten Krieg
Zwei-plus-Vier-Vertrag;Vertrag von 1990 über die äußeren Aspekte der Einheit
Deutscher Herbst;Höhepunkt des RAF-Terrors 1977
Wende;Politischer Umbruch in der DDR 1989/90
Mauerspechte;Menschen, die 1989/90 Stücke aus der Mauer schlugen
Hanse;Bund von Kaufleuten und Städten im Mittelalter
Reformation;Kirchliche Erneuerungsbewegung im 16. Jahrhundert
`);
  table(C, TERM, { q: (t) => `Was bezeichnet der Begriff „${t[0]}“?`, a: (t) => t[1], pool: TERM.map((t) => t[1]), mc: true, diff: (t) => (["Wirtschaftswunder", "Trümmerfrauen", "Rosinenbomber", "Weiße Rose", "Kalter Krieg", "Montagsdemonstrationen", "Reformation", "Marshallplan"].includes(t[0]) ? 1 : 2) });

  lines(C, `
# Mittelalter bis Kaiserreich
Wie hieß das Reich der deutschen Kaiser im Mittelalter? | Heiliges Römisches Reich | Deutsches Kaiserreich | Fränkisches Reich | Habsburgerreich | 1 | Heiliges Römisches Reich
Wer gilt als erster deutscher König aus dem Haus der Sachsen (919)? | Heinrich I. | Otto I. | Karl der Große | Konrad I. | 2 | Quedlinburg
Wie nannte man die Fürsten, die den deutschen König wählten? | Kurfürsten | Landgrafen | Herzöge | Markgrafen | 1 | Kurfürst
Wie viele Kurfürsten legte die Goldene Bulle fest? | 7 | 5 | 9 | 12 | 2 | Goldene Bulle
In welcher Stadt wurden deutsche Könige lange gekrönt? | Aachen | Köln | Mainz | Berlin | 2 | Aachener Dom
Welche Familie stellte über Jahrhunderte die Kaiser des Heiligen Römischen Reiches? | Habsburger | Hohenzollern | Wittelsbacher | Welfen | 1 | Habsburger
Welche Dynastie regierte in Preußen? | Hohenzollern | Habsburger | Wittelsbacher | Wettiner | 1 | Burg Hohenzollern
Welche Dynastie regierte in Bayern? | Wittelsbacher | Hohenzollern | Habsburger | Welfen | 2 | Wittelsbacher
Wo übersetzte Martin Luther das Neue Testament ins Deutsche? | Auf der Wartburg | In Wittenberg | In Erfurt | In Worms | 1 | Wartburg
In welcher Stadt schlug Luther der Überlieferung nach seine Thesen an? | Wittenberg | Erfurt | Eisleben | Worms | 1 | Schlosskirche (Wittenberg)
Welcher Kaiser verhängte 1521 die Reichsacht über Luther? | Karl V. | Maximilian I. | Ferdinand I. | Friedrich III. | 2 | Karl V. (HRR)
Welcher Grundsatz galt im Augsburger Religionsfrieden? | Wessen Land, dessen Religion | Glaubensfreiheit für alle | Nur katholisch erlaubt | Trennung von Staat und Kirche | 2 | Augsburger Reichs- und Religionsfrieden | mc
Wie nannte man Friedrich Wilhelm I. von Preußen? | Soldatenkönig | Großer Kurfürst | Alter Fritz | Eiserner Kanzler | 1 | Friedrich Wilhelm I. (Preußen)
Wie nannte man Friedrich II. von Preußen auch? | Der Alte Fritz | Der Soldatenkönig | Der Große Kurfürst | Der Eiserne Kanzler | 1 | Friedrich II. (Preußen) | alt=Alter Fritz/Friedrich der Große
Welches Schloss ließ Friedrich der Große in Potsdam bauen? | Sanssouci | Charlottenburg | Neuschwanstein | Herrenchiemsee | 1 | Schloss Sanssouci
Welche Feldfrucht förderte Friedrich der Große in Preußen? | Kartoffel | Mais | Reis | Tomate | 1 | Kartoffel
Wer besiegte Preußen 1806 bei Jena und Auerstedt? | Napoleon | Österreich | Russland | England | 1 | Schlacht bei Jena und Auerstedt
Wie hieß der Bund deutscher Staaten unter Napoleons Schutz? | Rheinbund | Deutscher Bund | Norddeutscher Bund | Zollverein | 2 | Rheinbund
Welche Farben wählte die Bewegung von 1848 für die deutsche Einheit? | Schwarz-Rot-Gold | Schwarz-Weiß-Rot | Blau-Weiß | Rot-Weiß-Rot | 1 | Flagge Deutschlands
Welchem König boten die Abgeordneten 1849 die Kaiserkrone an? | Friedrich Wilhelm IV. von Preußen | Ludwig I. von Bayern | Franz Joseph I. | Wilhelm I. | 2 | Friedrich Wilhelm IV. (Preußen)
Wie hieß das Parlament von 1848/49? | Frankfurter Nationalversammlung | Reichstag | Bundestag | Paulskirchenrat | 1 | Frankfurter Nationalversammlung
Gegen welches Land führte Preußen 1864 gemeinsam mit Österreich Krieg? | Dänemark | Frankreich | Russland | Schweden | 2 | Deutsch-Dänischer Krieg
Welche Schlacht entschied 1866 den Deutschen Krieg? | Königgrätz | Sedan | Waterloo | Leipzig | 2 | Schlacht bei Königgrätz
Welche Schlacht 1870 führte zur Gefangennahme Napoleons III.? | Sedan | Verdun | Königgrätz | Waterloo | 2 | Schlacht bei Sedan
Welches Gebiet musste Frankreich 1871 an Deutschland abtreten? | Elsass-Lothringen | Saarland | Burgund | Savoyen | 1 | Elsass-Lothringen
Wie hieß die „Politik der Bündnisse“ von Bismarck, um Frankreich zu isolieren? | Bündnissystem | Weltpolitik | Appeasement | Ostpolitik | 2 | Otto von Bismarck
Welche Sozialversicherungen führte Bismarck ein? | Kranken-, Unfall- und Rentenversicherung | Arbeitslosen- und Pflegeversicherung | Nur Rentenversicherung | Keine | 2 | Otto von Bismarck | mc
Wie nannte man das Ziel Wilhelms II., Deutschland zur Weltmacht zu machen? | „Platz an der Sonne“ (Weltpolitik) | Ostpolitik | Kleindeutsche Lösung | Burgfrieden | 2 | Wilhelm II. (Deutsches Reich) | mc
Wie viele Tage regierte Kaiser Friedrich III. 1888? | 99 | 365 | 30 | 7 | 2 | Friedrich III. (Deutsches Reich)
Wie nennt man das Jahr 1888, in dem drei Kaiser regierten? | Dreikaiserjahr | Kaiserjahr | Revolutionsjahr | Wendejahr | 1 | Dreikaiserjahr
Welche deutsche Kolonie lag im heutigen Namibia? | Deutsch-Südwestafrika | Deutsch-Ostafrika | Kamerun | Togo | 2 | Deutsch-Südwestafrika
An welchem Volk beging die deutsche Kolonialmacht 1904–1908 einen Völkermord? | Herero und Nama | Zulu | Massai | Tuareg | 2 | Völkermord an den Herero und Nama
# Weimar und NS-Zeit
Wer rief am 9. November 1918 die Republik aus dem Reichstag aus? | Philipp Scheidemann | Friedrich Ebert | Karl Liebknecht | Gustav Noske | 2 | Philipp Scheidemann | alt=Scheidemann
Seit wann dürfen Frauen in Deutschland wählen? | 1918 | 1949 | 1871 | 1933 | 1 | Frauenwahlrecht
In welcher Stadt tagte 1919 die Nationalversammlung, die der Republik ihren Namen gab? | Weimar | Berlin | Frankfurt | Bonn | 1 | Deutsches Nationaltheater Weimar
Welches Gebiet besetzten Frankreich und Belgien 1923? | Das Ruhrgebiet | Das Saarland | Das Rheinland komplett | Bayern | 2 | Ruhrbesetzung
Wie hieß die Zeit des relativen Aufschwungs 1924–1929? | Goldene Zwanziger | Gründerzeit | Wirtschaftswunder | Biedermeier | 1 | Goldene Zwanziger
Welcher Artikel der Weimarer Verfassung erlaubte Notverordnungen des Reichspräsidenten? | Artikel 48 | Artikel 1 | Artikel 20 | Artikel 146 | 2 | Weimarer Verfassung
Wie hieß die Partei Hitlers abgekürzt? | NSDAP | SPD | KPD | DNVP | 1 | Nationalsozialistische Deutsche Arbeiterpartei
Wie hieß Hitlers Buch? | Mein Kampf | Der Mythus des 20. Jahrhunderts | Das Kapital | Der Untertan | 1 | Mein Kampf
Wie hieß die paramilitärische Kampftruppe der NSDAP mit braunen Hemden? | SA | SS | Gestapo | Wehrmacht | 2 | Sturmabteilung
Wie hieß die Geheime Staatspolizei der NS-Zeit? | Gestapo | Stasi | KGB | SA | 1 | Geheime Staatspolizei
Wie hieß die Jugendorganisation der NSDAP? | Hitlerjugend | Freie Deutsche Jugend | Junge Pioniere | Wandervogel | 1 | Hitlerjugend
Was geschah in der „Nacht der langen Messer“ 1934? | Hitler ließ die SA-Führung ermorden | Der Reichstag brannte | Synagogen wurden zerstört | Der Krieg begann | 2 | Röhm-Putsch | mc
Welches Gebiet wurde 1938 an das Deutsche Reich „angeschlossen“? | Österreich | Polen | Ungarn | Schweiz | 1 | Anschluss Österreichs
In welcher Stadt wurde 1938 über das Sudetenland verhandelt? | München | Berlin | Prag | Wien | 2 | Münchner Abkommen
Wie hieß das größte NS-Vernichtungslager? | Auschwitz-Birkenau | Dachau | Buchenwald | Bergen-Belsen | 1 | Auschwitz-Birkenau
Wie viele Juden wurden im Holocaust ungefähr ermordet? | Etwa 6 Millionen | Etwa 600.000 | Etwa 1 Million | Etwa 20 Millionen | 1 | Holocaust | mc
Welches Mädchen schrieb im Versteck in Amsterdam ein berühmtes Tagebuch? | Anne Frank | Sophie Scholl | Hannah Arendt | Edith Stein | 1 | Anne-Frank-Haus
Welcher Unternehmer rettete über 1000 Juden, indem er sie in seiner Fabrik beschäftigte? | Oskar Schindler | Albert Speer | Robert Bosch | Hugo Junkers | 1 | Oskar Schindler | alt=Schindler
Wo beging Hitler 1945 Selbstmord? | Im Führerbunker in Berlin | In München | Auf dem Obersalzberg | In Wien | 1 | Führerbunker | mc
# Nachkriegszeit und Teilung
Welche vier Mächte besetzten Deutschland 1945? | USA, Sowjetunion, Großbritannien, Frankreich | USA, Sowjetunion, Polen, Frankreich | USA, Großbritannien, Italien, Frankreich | Sowjetunion, China, USA, Großbritannien | 1 | Besatzungszonen | mc
In welche Besatzungszone fiel Ostdeutschland? | Sowjetische Zone | Amerikanische Zone | Britische Zone | Französische Zone | 1 | Sowjetische Besatzungszone
Wie hieß die Konferenz 1945 über die Zukunft Deutschlands? | Potsdamer Konferenz | Konferenz von Jalta | Wiener Kongress | Münchner Konferenz | 1 | Potsdamer Konferenz
Wie hieß die Staatspartei der DDR? | SED | SPD | KPD | CDU | 1 | Sozialistische Einheitspartei Deutschlands
Wie hieß die Jugendorganisation der DDR? | Freie Deutsche Jugend | Hitlerjugend | Junge Union | Jusos | 1 | Freie Deutsche Jugend | alt=FDJ
Wie hieß die Armee der DDR? | Nationale Volksarmee | Bundeswehr | Rote Armee | Volkspolizei | 1 | Nationale Volksarmee | alt=NVA
Wie hieß das bekannteste Auto der DDR? | Trabant | Wartburg | Käfer | Lada | 1 | Trabant | alt=Trabi
Wie hieß der Grenzübergang in Berlin für Ausländer und Diplomaten? | Checkpoint Charlie | Bornholmer Straße | Glienicker Brücke | Friedrichstraße Ost | 1 | Checkpoint Charlie
Auf welcher Brücke wurden im Kalten Krieg Agenten ausgetauscht? | Glienicker Brücke | Oberbaumbrücke | Bornholmer Brücke | Köhlbrandbrücke | 2 | Glienicker Brücke
An welchem Grenzübergang öffnete sich am 9. November 1989 zuerst die Mauer? | Bornholmer Straße | Checkpoint Charlie | Brandenburger Tor | Glienicker Brücke | 2 | Bösebrücke
Welcher Ruf prägte die Montagsdemonstrationen 1989? | Wir sind das Volk | Freiheit für alle | Nie wieder Krieg | Ich bin ein Berliner | 1 | Montagsdemonstrationen in der DDR
In welcher Botschaft warteten 1989 tausende DDR-Bürger auf die Ausreise? | Prag | Warschau | Budapest | Moskau | 1 | Palais Lobkowicz
Welches Land öffnete 1989 als erstes seine Grenze zu Österreich? | Ungarn | Tschechoslowakei | Polen | Jugoslawien | 1 | Paneuropäisches Picknick
Wie lang war die Berliner Mauer ungefähr? | 155 km | 15 km | 1.000 km | 55 km | 2 | Berliner Mauer | mc
Wie viele Jahre stand die Berliner Mauer ungefähr? | 28 | 40 | 10 | 45 | 1 | Berliner Mauer
Wie viele Bundesländer kamen 1990 hinzu (ohne Berlin)? | 5 | 6 | 4 | 3 | 1 | Neue Länder
Seit wann ist Berlin wieder Hauptstadt des vereinten Deutschlands? | 1990 | 1949 | 1999 | 2001 | 2 | Berlin
Wer war der letzte Regierungschef (Ministerpräsident) der DDR? | Lothar de Maizière | Egon Krenz | Hans Modrow | Erich Honecker | 2 | Lothar de Maizière
Wer folgte im Oktober 1989 auf Honecker als SED-Chef? | Egon Krenz | Hans Modrow | Willi Stoph | Erich Mielke | 2 | Egon Krenz
Wer war Minister für Staatssicherheit der DDR? | Erich Mielke | Egon Krenz | Markus Wolf | Walter Ulbricht | 2 | Erich Mielke
Wie hieß die Terrorgruppe, die in den 1970ern Anschläge in der BRD verübte? | RAF (Rote Armee Fraktion) | IRA | ETA | Brigate Rosse | 1 | Rote Armee Fraktion | alt=RAF
Welche Stadt war Hauptstadt der DDR? | Ost-Berlin | Leipzig | Dresden | Potsdam | 1 | Palast der Republik | alt=Berlin
Wie hieß der Friedensvertrag-ähnliche Vertrag über die Einheit mit den Siegermächten? | Zwei-plus-Vier-Vertrag | Einigungsvertrag | Grundlagenvertrag | Moskauer Vertrag | 2 | Zwei-plus-Vier-Vertrag
Wie hieß der Vertrag 1972 zwischen BRD und DDR? | Grundlagenvertrag | Zwei-plus-Vier-Vertrag | Élysée-Vertrag | Montanunion | 2 | Grundlagenvertrag
Mit welchem Land schloss die BRD 1963 den Élysée-Vertrag? | Frankreich | Großbritannien | Polen | USA | 1 | Élysée-Vertrag
Welche Währung hatte die Bundesrepublik vor dem Euro? | D-Mark | Reichsmark | Mark der DDR | Taler | 1 | Deutsche Mark | alt=Deutsche Mark/DM
`);
})();
