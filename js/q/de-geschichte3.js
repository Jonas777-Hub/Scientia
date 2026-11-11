/* Deutsche Geschichte – weitere Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "de-geschichte";
  const DATES = [
    ["9. November 1989", "Die Berliner Mauer fällt"], ["3. Oktober 1990", "Deutschland wird wiedervereinigt"], ["17. Juni 1953", "Volksaufstand in der DDR"],
    ["13. August 1961", "Beginn des Mauerbaus"], ["20. Juli 1944", "Attentat Stauffenbergs auf Hitler"], ["30. Januar 1933", "Hitler wird Reichskanzler"],
    ["8. Mai 1945", "Kriegsende in Europa (Kapitulation)"], ["1. September 1939", "Überfall auf Polen, Beginn des Zweiten Weltkriegs"], ["9. November 1938", "Novemberpogrome gegen Juden"],
    ["23. Mai 1949", "Verkündung des Grundgesetzes"], ["7. Oktober 1949", "Gründung der DDR"], ["18. Januar 1871", "Proklamation des Kaiserreichs in Versailles"],
    ["11. November 1918", "Waffenstillstand, Ende des Ersten Weltkriegs"], ["31. Oktober 1517", "Luthers Thesenanschlag (Reformationstag)"], ["1. Januar 2002", "Einführung des Euro-Bargelds"],
    ["9. November 1918", "Ausrufung der Republik"], ["27. Februar 1933", "Reichstagsbrand"], ["10. Mai 1933", "Bücherverbrennung"],
  ];
  table(C, DATES, { q: (d) => `Was geschah in Deutschland am ${d[0]}?`, a: (d) => d[1], pool: DATES.map((d) => d[1]), mc: true, diff: (d) => (["9. November 1989", "3. Oktober 1990", "13. August 1961", "8. Mai 1945", "1. September 1939"].includes(d[0]) ? 1 : 2) });

  lines(C, `
Welche Stadt gilt als älteste Stadt Deutschlands? | Trier | Köln | Augsburg | Mainz | 1 | Porta Nigra
In welcher Stadt wurde Karl Marx geboren? | Trier | Berlin | London | Köln | 2 | Karl-Marx-Haus
In welcher Stadt wurde Ludwig van Beethoven geboren? | Bonn | Wien | Köln | Leipzig | 1 | Beethoven-Haus
In welcher Stadt wurde Johann Sebastian Bach geboren? | Eisenach | Leipzig | Weimar | Köthen | 2 | Bachhaus Eisenach
In welcher Stadt wirkte Bach als Thomaskantor? | Leipzig | Dresden | Eisenach | Berlin | 2 | Thomaskirche (Leipzig)
In welcher Stadt wurde Martin Luther geboren? | Eisleben | Wittenberg | Erfurt | Eisenach | 2 | Lutherstadt Eisleben
Welche Stadt trägt den Beinamen „Lutherstadt“ (neben Eisleben)? | Wittenberg | Erfurt | Worms | Eisenach | 1 | Lutherstadt Wittenberg
Welche Stadt nennt man wegen ihrer Kunstschätze „Elbflorenz“? | Dresden | Magdeburg | Hamburg | Meißen | 1 | Dresden
Welche Stadt nennt man wegen 1989 auch „Heldenstadt“? | Leipzig | Dresden | Berlin | Plauen | 2 | Nikolaikirche (Leipzig)
In welcher Kirche begannen die Leipziger Friedensgebete 1989? | Nikolaikirche | Thomaskirche | Frauenkirche | Gethsemanekirche | 2 | Nikolaikirche (Leipzig)
In welcher Stadt tagte von 1663 bis 1806 der „Immerwährende Reichstag“? | Regensburg | Frankfurt | Nürnberg | Wien | 2 | Altes Rathaus (Regensburg)
In welcher Stadt steht der Kaiserdom mit den Gräbern salischer Kaiser? | Speyer | Worms | Mainz | Bamberg | 2 | Speyerer Dom
In welcher Stadt wurden die römisch-deutschen Kaiser seit 1562 gekrönt? | Frankfurt am Main | Aachen | Köln | Regensburg | 2 | Kaiserdom St. Bartholomäus
Welche Stadt war Residenzstadt der preußischen Könige neben Berlin? | Potsdam | Königsberg | Breslau | Magdeburg | 1 | Schloss Sanssouci
Welche Stadt war Zentrum der Weimarer Klassik? | Weimar | Jena | Leipzig | Dresden | 1 | Goethe-Schiller-Denkmal
In welchem österreichischen Ort wurde Adolf Hitler geboren? | Braunau am Inn | Linz | Wien | Salzburg | 2 | Braunau am Inn
Welche Stadt wurde 1943 bei der „Operation Gomorrha“ schwer bombardiert? | Hamburg | Köln | Dresden | Berlin | 2 | Operation Gomorrha
Welches Bundesland entstand 1952 aus drei Ländern? | Baden-Württemberg | Nordrhein-Westfalen | Niedersachsen | Rheinland-Pfalz | 2 | Baden-Württemberg
Wer war der erste Reichspräsident der Weimarer Republik? | Friedrich Ebert | Paul von Hindenburg | Philipp Scheidemann | Gustav Stresemann | 1 | Friedrich Ebert | alt=Ebert
Welcher Reichspräsident ernannte Hitler zum Reichskanzler? | Paul von Hindenburg | Friedrich Ebert | Heinrich Brüning | Franz von Papen | 1 | Paul von Hindenburg | alt=Hindenburg
Wie hieß die Partei von Konrad Adenauer? | CDU | SPD | FDP | Zentrum | 1 | Christlich Demokratische Union Deutschlands
Wie heißt die bayerische Schwesterpartei der CDU? | CSU | FDP | AfD | Freie Wähler | 1 | Christlich-Soziale Union in Bayern
Welche Partei entstand 2007 aus PDS und WASG? | Die Linke | Die Grünen | AfD | BSW | 2 | Die Linke
Welche Partei wurde 2013 gegründet und zog 2017 in den Bundestag ein? | AfD | Die Linke | Piratenpartei | Freie Wähler | 2 | Alternative für Deutschland
Wie hieß die DDR-Volksvertretung? | Volkskammer | Bundestag | Reichstag | Staatsrat | 2 | Volkskammer
Wann fand die erste freie Wahl zur Volkskammer der DDR statt? | März 1990 | November 1989 | Oktober 1990 | Juni 1953 | 2 | Volkskammerwahl 1990
Wie heißt die Behörde, die die Stasi-Akten verwaltete (bis 2021)? | Stasi-Unterlagen-Behörde | Treuhand | BND | Verfassungsschutz | 2 | Stasi-Unterlagen-Archiv
Wie heißt der deutsche Auslandsgeheimdienst? | Bundesnachrichtendienst | Verfassungsschutz | MAD | Stasi | 2 | Bundesnachrichtendienst | alt=BND
Seit wann gibt es die Bundeswehr? | 1955 | 1949 | 1961 | 1945 | 2 | Bundeswehr
Wann wurde die D-Mark eingeführt? | 1948 | 1949 | 1945 | 1951 | 2 | Deutsche Mark
Seit wann gilt der Euro als Buchgeld in Deutschland? | 1999 | 2002 | 1995 | 1990 | 2 | Euro
Wie hieß die Währung der DDR? | Mark der DDR | D-Mark | Ostmark-Euro | Rentenmark | 1 | Mark der DDR | alt=Mark/Ostmark
Welcher Bundespräsident hielt 1985 eine berühmte Rede zum 8. Mai als „Tag der Befreiung“? | Richard von Weizsäcker | Roman Herzog | Karl Carstens | Johannes Rau | 2 | Richard von Weizsäcker | alt=Weizsäcker
Welcher Bundespräsident trat 2012 nach einer Affäre zurück? | Christian Wulff | Horst Köhler | Joachim Gauck | Heinrich Lübke | 2 | Christian Wulff | alt=Wulff
Welcher Bundespräsident trat 2010 überraschend zurück? | Horst Köhler | Christian Wulff | Johannes Rau | Roman Herzog | 2 | Horst Köhler | alt=Köhler
Wer wurde 2017 zum Bundespräsidenten gewählt? | Frank-Walter Steinmeier | Joachim Gauck | Wolfgang Schäuble | Olaf Scholz | 1 | Frank-Walter Steinmeier | alt=Steinmeier
Welcher Politiker war als Finanzminister lange für die „schwarze Null“ bekannt? | Wolfgang Schäuble | Olaf Scholz | Peer Steinbrück | Christian Lindner | 2 | Wolfgang Schäuble | alt=Schäuble
Welche Person im Kanzleramt wuchs in der DDR auf? | Angela Merkel | Olaf Scholz | Gerhard Schröder | Helmut Kohl | 1 | Angela Merkel | alt=Merkel
Welche Stadt war von 1949 bis 1990 Sitz des Bundestages? | Bonn | Berlin | Frankfurt | Karlsruhe | 1 | Bundeshaus (Bonn)
Wie hieß der Plan, Deutschland nach dem Krieg in einen Agrarstaat zu verwandeln (nicht umgesetzt)? | Morgenthau-Plan | Marshallplan | Schlieffen-Plan | Young-Plan | 2 | Morgenthau-Plan
Welche Stadt wurde 1948/49 durch eine Luftbrücke versorgt? | West-Berlin | Hamburg | München | Wien | 1 | Luftbrückendenkmal (Berlin) | alt=Berlin
Wer war 1948 Bürgermeister von West-Berlin und rief „Ihr Völker der Welt … schaut auf diese Stadt!“? | Ernst Reuter | Willy Brandt | Klaus Wowereit | Richard von Weizsäcker | 2 | Ernst Reuter | alt=Reuter
Welcher spätere Kanzler war Regierender Bürgermeister von Berlin beim Mauerbau? | Willy Brandt | Helmut Schmidt | Konrad Adenauer | Ludwig Erhard | 2 | Willy Brandt | alt=Brandt
Nach welchem Grundgesetz-Artikel trat die DDR der Bundesrepublik bei? | Artikel 23 | Artikel 1 | Artikel 146 | Artikel 20 | 2 | Grundgesetz für die Bundesrepublik Deutschland
Welche Grenze erkannte Deutschland 1990 endgültig als Ostgrenze an? | Oder-Neiße-Grenze | Elbe-Grenze | Weichsel-Grenze | Memel-Grenze | 2 | Oder-Neiße-Grenze
Welches Fußballereignis gab der Bundesrepublik 1954 Selbstvertrauen? | WM-Sieg in Bern | EM-Sieg in Rom | Olympia-Gold | Pokalsieg | 1 | Wankdorfstadion | mc
Wie hieß das Sommermärchen? | Die Fußball-WM 2006 in Deutschland | Der Mauerfall | Die WM 1990 | Olympia 1972 | 1 | Fußball-Weltmeisterschaft 2006 | mc
Wie hieß der erste frei gewählte Ministerpräsident der DDR (1990)? | Lothar de Maizière | Hans Modrow | Egon Krenz | Manfred Stolpe | 2 | Lothar de Maizière | alt=de Maizière
Wer war Außenminister der Bundesrepublik von 1974 bis 1992? | Hans-Dietrich Genscher | Joschka Fischer | Walter Scheel | Klaus Kinkel | 2 | Hans-Dietrich Genscher | alt=Genscher
Welcher Grünen-Politiker war von 1998 bis 2005 Außenminister? | Joschka Fischer | Jürgen Trittin | Cem Özdemir | Robert Habeck | 2 | Joschka Fischer | alt=Fischer
Welcher Bundeskanzler kam aus Hamburg und war zuvor Erster Bürgermeister dort? | Olaf Scholz | Helmut Schmidt | Gerhard Schröder | Willy Brandt | 2 | Olaf Scholz | alt=Scholz
Welcher Bundeskanzler war vorher Ministerpräsident von Niedersachsen? | Gerhard Schröder | Helmut Kohl | Olaf Scholz | Helmut Schmidt | 2 | Gerhard Schröder | alt=Schröder
Welcher Bundeskanzler war vorher Ministerpräsident von Rheinland-Pfalz? | Helmut Kohl | Kurt Georg Kiesinger | Gerhard Schröder | Ludwig Erhard | 2 | Helmut Kohl | alt=Kohl
Welcher Bundeskanzler war vorher Ministerpräsident von Baden-Württemberg? | Kurt Georg Kiesinger | Helmut Kohl | Ludwig Erhard | Konrad Adenauer | 2 | Kurt Georg Kiesinger | alt=Kiesinger
Welcher Bundeskanzler war vorher Oberbürgermeister von Köln? | Konrad Adenauer | Ludwig Erhard | Helmut Kohl | Willy Brandt | 1 | Konrad Adenauer | alt=Adenauer
Welcher Bundeskanzler war vorher Wirtschaftsminister? | Ludwig Erhard | Konrad Adenauer | Helmut Kohl | Olaf Scholz | 2 | Ludwig Erhard | alt=Erhard
Welche Pandemie prägte Deutschland ab 2020? | Corona (COVID-19) | Spanische Grippe | Vogelgrippe | Schweinegrippe | 1 | COVID-19-Pandemie in Deutschland | mc
Welche Katastrophe traf das Ahrtal im Juli 2021? | Hochwasser | Erdbeben | Waldbrand | Tornado | 1 | Hochwasser in West- und Mitteleuropa 2021
Welcher Konflikt führte ab 2022 zu stark steigenden Energiepreisen in Deutschland? | Russlands Krieg gegen die Ukraine | Der Brexit | Die Finanzkrise | Der Irakkrieg | 1 | Russischer Überfall auf die Ukraine 2022 | mc
Welche Koalition zerbrach im November 2024? | Die Ampel-Koalition | Die Große Koalition | Schwarz-Gelb | Rot-Grün | 1 | Olaf Scholz
Wie nennt man eine Regierung aus CDU/CSU und SPD? | Große Koalition | Ampel | Jamaika | Kenia | 1 | Große Koalition
Wie nennt man eine Koalition aus CDU/CSU, Grünen und FDP (nach den Farben)? | Jamaika | Ampel | Kenia | Deutschland | 2 | Jamaika-Koalition
Wie heißt das Wahlsystem für den Bundestag? | Personalisierte Verhältniswahl | Reine Mehrheitswahl | Präsidialwahl | Losverfahren | 2 | Bundestagswahlrecht | mc
Welche Prozent-Hürde müssen Parteien bei der Bundestagswahl überspringen? | 5 % | 3 % | 10 % | 1 % | 1 | Sperrklausel
Wie heißt die Länderkammer neben dem Bundestag? | Bundesrat | Bundesversammlung | Landtag | Reichsrat | 1 | Bundesrat (Deutschland)
Wie heißt das Parlament eines Bundeslandes meist? | Landtag | Bundestag | Stadtrat | Kreistag | 1 | Landtag
Welcher Politiker wurde 2025 Bundeskanzler? | Friedrich Merz | Olaf Scholz | Markus Söder | Robert Habeck | 1 | Friedrich Merz | alt=Merz
`);
})();
