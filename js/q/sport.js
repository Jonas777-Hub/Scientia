/* Sport – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "sport";
  const parse = (s) => s.split("|").map((x) => x.split(";").map((y) => y.trim()));

  const WC = parse(`1930;Uruguay;Uruguay|1934;Italien;Italien|1938;Italien;Frankreich|1950;Uruguay;Brasilien|1954;Deutschland;Schweiz|1958;Brasilien;Schweden|1962;Brasilien;Chile|1966;England;England|1970;Brasilien;Mexiko|1974;Deutschland;Deutschland|1978;Argentinien;Argentinien|1982;Italien;Spanien|1986;Argentinien;Mexiko|1990;Deutschland;Italien|1994;Brasilien;USA|1998;Frankreich;Frankreich|2002;Brasilien;Südkorea und Japan|2006;Italien;Deutschland|2010;Spanien;Südafrika|2014;Deutschland;Brasilien|2018;Frankreich;Russland|2022;Argentinien;Katar`);
  const teams = ["Uruguay", "Italien", "Deutschland", "Brasilien", "England", "Argentinien", "Frankreich", "Spanien", "Niederlande", "Ungarn", "Kroatien", "Schweden", "Tschechoslowakei"];
  table(C, WC, { q: (w) => `Welches Land wurde ${w[0]} Fußball-Weltmeister der Männer?`, a: (w) => w[1], pool: teams, diff: (w) => (+w[0] >= 1990 || w[1] === "Deutschland" ? 1 : 2), img: () => "FIFA-Weltpokal" });
  table(C, WC, { q: (w) => `Wo fand die Fußball-WM ${w[0]} statt?`, a: (w) => w[2], pool: [...new Set(WC.map((w) => w[2]))], diff: (w) => (+w[0] >= 1990 || w[2] === "Deutschland" ? 1 : 2), img: () => "Fußball-Weltmeisterschaft" });

  const EURO = parse(`1960;Sowjetunion|1964;Spanien|1968;Italien|1972;Deutschland|1976;Tschechoslowakei|1980;Deutschland|1984;Frankreich|1988;Niederlande|1992;Dänemark|1996;Deutschland|2000;Frankreich|2004;Griechenland|2008;Spanien|2012;Spanien|2016;Portugal|2021;Italien|2024;Spanien`);
  table(C, EURO, { q: (e) => `Wer gewann die Fußball-Europameisterschaft der Männer ${e[0]}?`, a: (e) => e[1], pool: [...new Set(EURO.map((e) => e[1])), "England", "Belgien", "Kroatien"], diff: (e) => (["2004", "1992", "1996", "2024", "2016"].includes(e[0]) ? 1 : 2), img: () => "Fußball-Europameisterschaft" });

  const SUMMER = parse(`1896;Athen|1900;Paris|1904;St. Louis|1908;London|1912;Stockholm|1920;Antwerpen|1924;Paris|1928;Amsterdam|1932;Los Angeles|1936;Berlin|1948;London|1952;Helsinki|1956;Melbourne|1960;Rom|1964;Tokio|1968;Mexiko-Stadt|1972;München|1976;Montreal|1980;Moskau|1984;Los Angeles|1988;Seoul|1992;Barcelona|1996;Atlanta|2000;Sydney|2004;Athen|2008;Peking|2012;London|2016;Rio de Janeiro|2021;Tokio|2024;Paris`);
  const cities = [...new Set(SUMMER.map((s) => s[1]))];
  table(C, SUMMER, { q: (s) => `In welcher Stadt fanden die Olympischen Sommerspiele ${s[0] === "2021" ? "2020 (ausgetragen 2021)" : s[0]} statt?`, a: (s) => s[1], pool: cities, diff: (s) => (["1936", "1972", "2024", "2000", "2008", "2016", "1896"].includes(s[0]) ? 1 : 2), img: () => "Olympische Sommerspiele" });
  const uniq = SUMMER.filter((s) => SUMMER.filter((t) => t[1] === s[1]).length === 1);
  table(C, uniq, { q: (s) => `In welchem Jahr fanden Olympische Sommerspiele in ${s[1]} statt?`, a: (s) => s[0], pool: SUMMER.map((s) => s[0]), diff: (s) => (["München", "Berlin"].includes(s[1]) ? 1 : 2), img: () => "Olympisches Feuer" });
  const WINTER = parse(`1924;Chamonix|1928;St. Moritz|1932;Lake Placid|1936;Garmisch-Partenkirchen|1952;Oslo|1956;Cortina d’Ampezzo|1960;Squaw Valley|1964;Innsbruck|1968;Grenoble|1972;Sapporo|1980;Lake Placid|1984;Sarajevo|1988;Calgary|1992;Albertville|1994;Lillehammer|1998;Nagano|2002;Salt Lake City|2006;Turin|2010;Vancouver|2014;Sotschi|2018;Pyeongchang|2022;Peking`);
  table(C, WINTER, { q: (s) => `Wo fanden die Olympischen Winterspiele ${s[0]} statt?`, a: (s) => s[1], pool: [...new Set(WINTER.map((s) => s[1]))], diff: (s) => (["1936", "2022", "2014", "2006"].includes(s[0]) ? 1 : 2), img: () => "Olympische Winterspiele" });

  const F1 = parse(`1988;Ayrton Senna|1989;Alain Prost|1990;Ayrton Senna|1991;Ayrton Senna|1992;Nigel Mansell|1993;Alain Prost|1994;Michael Schumacher|1995;Michael Schumacher|1996;Damon Hill|1997;Jacques Villeneuve|1998;Mika Häkkinen|1999;Mika Häkkinen|2000;Michael Schumacher|2001;Michael Schumacher|2002;Michael Schumacher|2003;Michael Schumacher|2004;Michael Schumacher|2005;Fernando Alonso|2006;Fernando Alonso|2007;Kimi Räikkönen|2008;Lewis Hamilton|2009;Jenson Button|2010;Sebastian Vettel|2011;Sebastian Vettel|2012;Sebastian Vettel|2013;Sebastian Vettel|2014;Lewis Hamilton|2015;Lewis Hamilton|2016;Nico Rosberg|2017;Lewis Hamilton|2018;Lewis Hamilton|2019;Lewis Hamilton|2020;Lewis Hamilton|2021;Max Verstappen|2022;Max Verstappen|2023;Max Verstappen|2024;Max Verstappen`);
  table(C, F1, { q: (f) => `Wer wurde ${f[0]} Formel-1-Weltmeister?`, a: (f) => f[1], pool: [...new Set(F1.map((f) => f[1]))], diff: (f) => (["Michael Schumacher", "Sebastian Vettel", "Max Verstappen", "Lewis Hamilton", "Nico Rosberg"].includes(f[1]) ? 1 : 2), img: () => "Formel 1" });

  const ATH = parse(`Roger Federer;Tennis|Serena Williams;Tennis|Steffi Graf;Tennis|Boris Becker;Tennis|Rafael Nadal;Tennis|Novak Djokovic;Tennis|Alexander Zverev;Tennis|Angelique Kerber;Tennis|Michael Jordan;Basketball|LeBron James;Basketball|Dirk Nowitzki;Basketball|Dennis Schröder;Basketball|Stephen Curry;Basketball|Kobe Bryant;Basketball|Usain Bolt;Leichtathletik|Carl Lewis;Leichtathletik|Eliud Kipchoge;Leichtathletik|Malaika Mihambo;Leichtathletik|Robert Harting;Leichtathletik|Heike Drechsler;Leichtathletik|Michael Phelps;Schwimmen|Franziska van Almsick;Schwimmen|Mark Spitz;Schwimmen|Magdalena Neuner;Biathlon|Laura Dahlmeier;Biathlon|Ole Einar Bjørndalen;Biathlon|Martin Fourcade;Biathlon|Lionel Messi;Fußball|Cristiano Ronaldo;Fußball|Pelé;Fußball|Diego Maradona;Fußball|Franz Beckenbauer;Fußball|Gerd Müller;Fußball|Thomas Müller;Fußball|Manuel Neuer;Fußball|Miroslav Klose;Fußball|Zinédine Zidane;Fußball|Kylian Mbappé;Fußball|Erling Haaland;Fußball|Jamal Musiala;Fußball|Alexandra Popp;Fußball|Birgit Prinz;Fußball|Tiger Woods;Golf|Bernhard Langer;Golf|Muhammad Ali;Boxen|Wladimir Klitschko;Boxen|Henry Maske;Boxen|Mike Tyson;Boxen|Regina Halmich;Boxen|Michael Schumacher;Formel 1|Sebastian Vettel;Formel 1|Lewis Hamilton;Formel 1|Max Verstappen;Formel 1|Ayrton Senna;Formel 1|Niki Lauda;Formel 1|Wayne Gretzky;Eishockey|Leon Draisaitl;Eishockey|Tom Brady;American Football|Simone Biles;Turnen|Fabian Hambüchen;Turnen|Nadia Comăneci;Turnen|Katarina Witt;Eiskunstlauf|Sven Hannawald;Skispringen|Jens Weißflog;Skispringen|Martin Schmitt;Skispringen|Hermann Maier;Ski Alpin|Marcel Hirscher;Ski Alpin|Lindsey Vonn;Ski Alpin|Maria Höfl-Riesch;Ski Alpin|Mikaela Shiffrin;Ski Alpin|Jan Ullrich;Radsport|Tadej Pogačar;Radsport|Eddy Merckx;Radsport|Timo Boll;Tischtennis|Dimitrij Ovtcharov;Tischtennis|Magnus Carlsen;Schach|Garri Kasparow;Schach|Uwe Gensheimer;Handball|Andreas Wolff;Handball|Phil Taylor;Darts|Michael van Gerwen;Darts|Ronnie O’Sullivan;Snooker|Valentino Rossi;Motorradrennen|Shaun White;Snowboard|Claudia Pechstein;Eisschnelllauf|Babe Ruth;Baseball|Shohei Ohtani;Baseball|Kelly Slater;Surfen|Tony Hawk;Skateboarding|Kristina Vogel;Bahnradsport|Britta Steffen;Schwimmen|Dirk Bauermann;Basketball`);
  const sports = [...new Set(ATH.map((a) => a[1]))];
  table(C, ATH.filter((a) => a[0] !== "Dirk Bauermann"), { q: (a) => `In welcher Sportart wurde ${a[0]} berühmt?`, a: (a) => a[1], pool: sports, diff: (a) => (["Roger Federer", "Michael Jordan", "Usain Bolt", "Lionel Messi", "Cristiano Ronaldo", "Michael Schumacher", "Boris Becker", "Steffi Graf", "Muhammad Ali", "Tiger Woods", "Dirk Nowitzki", "Michael Phelps", "Pelé", "Franz Beckenbauer", "Manuel Neuer", "Sebastian Vettel", "Magdalena Neuner", "Mike Tyson", "Wladimir Klitschko"].includes(a[0]) ? 1 : 2), img: (a) => a[0] });

  const PLAYERS = parse(`Fußball;11|Handball;7|Basketball;5|Volleyball;6|Eishockey;6|Wasserball;7|Rugby Union;15|Baseball;9|Feldhockey;11|Beachvolleyball;2|Cricket;11|Futsal;5`);
  table(C, PLAYERS, { q: (p) => `Wie viele Spieler einer Mannschaft sind beim ${p[0]} gleichzeitig im Spiel (inklusive Torwart)?`, a: (p) => p[1], pool: ["2", "4", "5", "6", "7", "9", "11", "13", "15"], diff: (p) => (["Fußball", "Basketball", "Beachvolleyball"].includes(p[0]) ? 1 : 2), img: (p) => p[0] });

  const TERMS = parse(`Schachmatt;Schach|Rochade;Schach|Patt;Schach|Elfmeter;Fußball|Abseits;Fußball|Touchdown;American Football|Homerun;Baseball|Ass (direkter Punkt mit dem Aufschlag);Tennis|Tie-Break;Tennis|Strike (alle zehn Pins);Bowling|Birdie;Golf|Hole-in-one;Golf|Bully;Eishockey|Icing (unerlaubter Weitschuss);Eishockey|Slam Dunk;Basketball|Dreipunktewurf;Basketball|Knockout;Boxen|Uppercut;Boxen|Salchow;Eiskunstlauf|Axel;Eiskunstlauf|Telemark-Landung;Skispringen|Riesenslalom;Ski Alpin|Boxenstopp;Formel 1|Pole-Position;Formel 1|Bullseye;Darts|Baggern und Pritschen;Volleyball|Fosbury-Flop;Hochsprung|Gedränge (Scrum);Rugby|Wicket;Cricket|Ippon;Judo|Kata;Karate|Kraulen;Schwimmen|Federball;Badminton|Gelbes Trikot;Radsport|Siebenmeter;Handball`);
  const termSports = [...new Set(TERMS.map((t) => t[1]))];
  table(C, TERMS, { q: (t) => `Zu welcher Sportart gehört der Begriff „${t[0]}“?`, a: (t) => t[1], pool: termSports, diff: (t) => (["Schachmatt", "Elfmeter", "Touchdown", "Homerun", "Slam Dunk", "Knockout", "Boxenstopp", "Bullseye", "Hole-in-one", "Siebenmeter"].includes(t[0]) ? 1 : 2) });

  const CLUBS = parse(`FC Bayern München;München;Allianz Arena|Borussia Dortmund;Dortmund;Signal Iduna Park|FC Schalke 04;Gelsenkirchen;Veltins-Arena|SV Werder Bremen;Bremen;Weserstadion|Hamburger SV;Hamburg;Volksparkstadion|VfB Stuttgart;Stuttgart;MHPArena|Eintracht Frankfurt;Frankfurt am Main;Waldstadion (Frankfurt am Main)|Bayer 04 Leverkusen;Leverkusen;BayArena|Borussia Mönchengladbach;Mönchengladbach;Borussia-Park|1. FC Köln;Köln;Rheinenergiestadion|Hertha BSC;Berlin;Olympiastadion Berlin|1. FC Union Berlin;Berlin;Stadion An der Alten Försterei|RB Leipzig;Leipzig;Red Bull Arena (Leipzig)|SC Freiburg;Freiburg im Breisgau;Europa-Park Stadion|VfL Wolfsburg;Wolfsburg;Volkswagen Arena|1. FC Kaiserslautern;Kaiserslautern;Fritz-Walter-Stadion|1. FC Nürnberg;Nürnberg;Max-Morlock-Stadion|Hannover 96;Hannover;Heinz-von-Heiden-Arena|FC St. Pauli;Hamburg;Millerntor-Stadion|Fortuna Düsseldorf;Düsseldorf;Merkur Spiel-Arena|VfL Bochum;Bochum;Vonovia Ruhrstadion|1. FSV Mainz 05;Mainz;Mewa Arena|FC Augsburg;Augsburg;WWK Arena|Dynamo Dresden;Dresden;Rudolf-Harbig-Stadion|Arminia Bielefeld;Bielefeld;Schüco-Arena|Karlsruher SC;Karlsruhe;Wildparkstadion`);
  table(C, CLUBS, { q: (c) => `In welcher Stadt ist der Fußballverein ${c[0]} zu Hause?`, a: (c) => c[1], pool: [...new Set(CLUBS.map((c) => c[1]))], diff: (c) => (["FC Bayern München", "Borussia Dortmund", "Hamburger SV", "VfB Stuttgart", "1. FC Köln", "Hertha BSC", "RB Leipzig"].includes(c[0]) ? 1 : 2), img: (c) => c[2] });
  table(C, CLUBS.filter((c) => ["Allianz Arena", "Signal Iduna Park", "Veltins-Arena", "Weserstadion", "Olympiastadion Berlin", "Borussia-Park", "BayArena", "Fritz-Walter-Stadion", "Millerntor-Stadion", "Stadion An der Alten Försterei"].includes(c[2])), { q: (c) => `Welcher Verein spielt in diesem Stadion: ${c[2]}?`, a: (c) => c[0], pool: CLUBS.map((c) => c[0]), diff: (c) => (["Allianz Arena", "Signal Iduna Park"].includes(c[2]) ? 1 : 2), img: (c) => c[2] });

  const INT = parse(`Real Madrid;Spanien|FC Barcelona;Spanien|Atlético Madrid;Spanien|Manchester United;England|FC Liverpool;England|FC Chelsea;England|FC Arsenal;England|Manchester City;England|Juventus Turin;Italien|AC Mailand;Italien|Inter Mailand;Italien|SSC Neapel;Italien|Paris Saint-Germain;Frankreich|Olympique Marseille;Frankreich|Ajax Amsterdam;Niederlande|Feyenoord Rotterdam;Niederlande|Benfica Lissabon;Portugal|FC Porto;Portugal|Galatasaray Istanbul;Türkei|Fenerbahçe Istanbul;Türkei|Celtic Glasgow;Schottland|Boca Juniors;Argentinien|FC Basel;Schweiz|Red Bull Salzburg;Österreich|Rapid Wien;Österreich`);
  table(C, INT, { q: (c) => `Aus welchem Land kommt der Fußballverein ${c[0]}?`, a: (c) => c[1], pool: [...new Set(INT.map((c) => c[1]))], diff: (c) => (["Real Madrid", "FC Barcelona", "Manchester United", "Juventus Turin", "Paris Saint-Germain"].includes(c[0]) ? 1 : 2) });

  const ORIGIN = parse(`Judo;Japan|Karate;Japan|Sumo;Japan|Kendo;Japan|Taekwondo;Südkorea|Cricket;England|Rugby;England|Golf;Schottland|Basketball;USA|Volleyball;USA|Baseball;USA|Eishockey;Kanada|Capoeira;Brasilien|Hurling;Irland|Boule (Pétanque);Frankreich|Kung Fu;China`);
  table(C, ORIGIN, { q: (o) => `Aus welchem Land stammt die Sportart ${o[0]}?`, a: (o) => o[1], pool: [...new Set(ORIGIN.map((o) => o[1]))], diff: (o) => (["Judo", "Sumo", "Karate", "Basketball", "Kung Fu"].includes(o[0]) ? 1 : 2), img: (o) => o[0].replace(/ \(.*\)/, "") });

  lines(C, `
# Fußball
Wie viele Minuten dauert eine Halbzeit im Profifußball? | 45 | 40 | 30 | 50 | 1 | Fußball
Wie lange dauert eine Verlängerung im Fußball insgesamt? | 30 Minuten | 20 Minuten | 15 Minuten | 45 Minuten | 1 | Fußball
Aus wie vielen Metern wird ein Elfmeter geschossen? | 11 Meter | 9 Meter | 12 Meter | 16 Meter | 1 | Strafstoß (Fußball)
Welche Karte bedeutet im Fußball einen Platzverweis? | Rote Karte | Gelbe Karte | Grüne Karte | Blaue Karte | 1 | Rote Karte
Wie heißt der Videobeweis im Fußball abgekürzt? | VAR | VBR | TOR | VAB | 1 | Video Assistant Referee
Wie heißt es, wenn ein Spieler drei Tore in einem Spiel schießt? | Hattrick | Triple | Dreierpack-Wette | Kür | 1 | Hattrick
Wer ist Rekordtorschütze der deutschen Fußball-Nationalmannschaft der Männer? | Miroslav Klose | Gerd Müller | Thomas Müller | Lukas Podolski | 1 | Miroslav Klose | alt=Klose
Wer hält mit 16 Treffern den Rekord für die meisten WM-Tore? | Miroslav Klose | Ronaldo | Gerd Müller | Pelé | 2 | Miroslav Klose | alt=Klose
Welcher Verein ist deutscher Fußball-Rekordmeister? | FC Bayern München | Borussia Dortmund | 1. FC Nürnberg | Hamburger SV | 1 | Allianz Arena | alt=Bayern München/Bayern
Wie nennt man das Endspiel des DFB-Pokals in Berlin? | Pokalfinale | Supercup | Meisterschale | Champions-League-Finale | 1 | Olympiastadion Berlin
Wie heißt die Trophäe des deutschen Fußballmeisters? | Meisterschale | Meisterpokal | Goldener Schuh | Henkelpott | 1 | Meisterschale
Wie heißt der Pokal der Champions League umgangssprachlich? | Henkelpott | Meisterschale | Salatschüssel | Goldener Ball | 2 | UEFA Champions League
Welcher Spieler gewann den Ballon d’Or am häufigsten? | Lionel Messi | Cristiano Ronaldo | Michel Platini | Johan Cruyff | 1 | Ballon d’Or | alt=Messi
Wie viele Mannschaften spielen in der Fußball-Bundesliga? | 18 | 20 | 16 | 22 | 1 | Fußball-Bundesliga
In welchem Jahr wurde die Fußball-Bundesliga gegründet? | 1963 | 1949 | 1954 | 1974 | 2 | Fußball-Bundesliga
Wie heißt das „Wunder von Bern“? | Der deutsche WM-Sieg 1954 | Der WM-Sieg 1990 | Der EM-Sieg 1996 | Das Finale 2014 | 1 | Wankdorfstadion | mc
Wer schoss das Siegtor im WM-Finale 2014? | Mario Götze | Thomas Müller | André Schürrle | Mesut Özil | 1 | Mario Götze | alt=Götze
Gegen wen gewann Deutschland das WM-Finale 2014? | Argentinien | Brasilien | Niederlande | Spanien | 1 | Estádio do Maracanã
Wie hoch gewann Deutschland 2014 im WM-Halbfinale gegen Brasilien? | 7:1 | 4:0 | 3:1 | 5:2 | 1 | Estádio Mineirão
Wer war Bundestrainer beim WM-Titel 2014? | Joachim Löw | Jürgen Klinsmann | Hansi Flick | Rudi Völler | 1 | Joachim Löw | alt=Löw/Jogi Löw
Wer war Teamchef beim WM-Titel 1990? | Franz Beckenbauer | Berti Vogts | Jupp Derwall | Helmut Schön | 2 | Franz Beckenbauer | alt=Beckenbauer
Welche Frauen-Nationalmannschaft gewann 2003 und 2007 die WM? | Deutschland | USA | Norwegen | Schweden | 1 | Fußball-Weltmeisterschaft der Frauen
Welches Land hat die meisten Frauenfußball-WM-Titel? | USA | Deutschland | Norwegen | Japan | 1 | Fußball-Weltmeisterschaft der Frauen
Wie heißt der Weltfußballverband? | FIFA | UEFA | DFB | IOC | 1 | FIFA
Wie heißt der europäische Fußballverband? | UEFA | FIFA | CONMEBOL | DFL | 1 | UEFA
Wie heißt der Deutsche Fußball-Bund abgekürzt? | DFB | DFL | DOSB | DFV | 1 | Deutscher Fußball-Bund
Wie groß ist ein Fußballtor (Breite)? | 7,32 Meter | 5 Meter | 8,50 Meter | 6 Meter | 2 | Fußballtor | mc
Was bekommt ein Spieler nach zwei Gelben Karten in einem Spiel? | Gelb-Rote Karte | Eine Geldstrafe | Nichts | Eine Blaue Karte | 1 | Gelb-Rote Karte
Wie heißt der Spieler, der im Tor steht? | Torwart | Libero | Stürmer | Kapitän | 1 | Torwart | alt=Torhüter/Keeper
# Olympia und Leichtathletik
Wie lange ist die kürzeste Sprintstrecke bei Olympischen Sommerspielen? | 100 Meter | 50 Meter | 60 Meter | 200 Meter | 1 | 100-Meter-Lauf
Wie hoch ist der aktuelle 100-Meter-Weltrekord von Usain Bolt? | 9,58 Sekunden | 9,79 Sekunden | 9,85 Sekunden | 9,48 Sekunden | 2 | Usain Bolt | mc
Wie viele Disziplinen hat ein Zehnkampf? | 10 | 7 | 5 | 12 | 1 | Zehnkampf
Wie viele Disziplinen hat ein Siebenkampf? | 7 | 10 | 5 | 8 | 1 | Siebenkampf
Welche Farben haben die Olympischen Ringe (neben Weiß als Grund)? | Blau, Gelb, Schwarz, Grün, Rot | Rot, Weiß, Blau, Grün, Gelb | Gold, Silber, Bronze, Blau, Rot | Alle blau | 1 | Olympische Ringe | mc
Wie lang ist eine Runde im Stadion (Leichtathletik)? | 400 Meter | 300 Meter | 500 Meter | 1000 Meter | 1 | Leichtathletikstadion
Wie viele Hürden stehen in einem 110-Meter-Hürdenlauf? | 10 | 8 | 12 | 6 | 2 | 110-Meter-Hürdenlauf
Was wird beim Kugelstoßen gestoßen? | Eine Metallkugel | Ein Diskus | Ein Speer | Ein Hammer | 1 | Kugelstoßen
Was ist beim Biathlon mit Skilanglauf kombiniert? | Schießen | Skispringen | Bogenschießen | Eisschnelllauf | 1 | Biathlon
Welche Disziplinen gehören zur Nordischen Kombination? | Skispringen und Langlauf | Biathlon und Slalom | Abfahrt und Super-G | Eisschnelllauf und Langlauf | 2 | Nordische Kombination | mc
Welche drei Disziplinen hat ein Triathlon? | Schwimmen, Radfahren, Laufen | Laufen, Schießen, Reiten | Rudern, Laufen, Springen | Schwimmen, Laufen, Werfen | 1 | Triathlon | mc
Wie heißt der berühmteste Triathlon auf Hawaii? | Ironman | Tour de France | Vasalauf | Iditarod | 2 | Ironman Hawaii
Wie oft findet die Tour de France im Jahr statt? | Einmal | Zweimal | Alle zwei Jahre | Alle vier Jahre | 1 | Tour de France
In welcher Stadt endet die Tour de France traditionell? | Paris | Lyon | Nizza | Marseille | 1 | Champs-Élysées
Welches Trikot trägt der beste Bergfahrer der Tour de France? | Gepunktetes Trikot | Gelbes Trikot | Grünes Trikot | Weißes Trikot | 2 | Tour de France
Welches Trikot trägt der Punktbeste (Sprinter) der Tour de France? | Grünes Trikot | Gelbes Trikot | Rotes Trikot | Gepunktetes Trikot | 2 | Tour de France
Was erhält der Erstplatzierte bei Olympia? | Goldmedaille | Silbermedaille | Pokal | Lorbeerkranz allein | 1 | Olympische Medaille
Wie oft finden Olympische Winterspiele statt? | Alle 4 Jahre | Jedes Jahr | Alle 2 Jahre | Alle 5 Jahre | 1 | Olympische Winterspiele
Welche Stadt richtet die Olympischen Sommerspiele 2028 aus? | Los Angeles | Brisbane | Paris | Madrid | 1 | Los Angeles
Welche Stadt richtet die Olympischen Sommerspiele 2032 aus? | Brisbane | Los Angeles | Rom | Doha | 2 | Brisbane
Wo fanden die Olympischen Winterspiele 2026 statt? | Mailand und Cortina d’Ampezzo | Innsbruck | St. Moritz | Garmisch-Partenkirchen | 2 | Cortina d’Ampezzo
Wie heißt das Fest der Paralympischen Spiele? | Paralympics | Special Olympics | Invictus Games | World Games | 1 | Paralympische Spiele
Wie lang ist die Marathonstrecke? | 42,195 km | 40 km | 21,0975 km | 50 km | 1 | Marathonlauf
Wie heißt die halbe Marathonstrecke? | Halbmarathon | Viertelmarathon | Ultramarathon | Crosslauf | 1 | Halbmarathon
Welche Sportart wird auf einem 50-Meter-Becken ausgeübt? | Schwimmen | Rudern | Kanu | Segeln | 1 | Schwimmbecken
Welche Schwimmlage ist die schnellste? | Kraulen (Freistil) | Brust | Rücken | Delfin | 1 | Kraulschwimmen | alt=Kraul/Freistil
# Tennis, Golf und mehr
Auf welchem Belag werden die French Open gespielt? | Sand | Rasen | Hartplatz | Teppich | 1 | Roland Garros
Auf welchem Belag wird in Wimbledon gespielt? | Rasen | Sand | Hartplatz | Teppich | 1 | Wimbledon Championships
Wie viele Grand-Slam-Turniere gibt es im Tennis pro Jahr? | 4 | 3 | 5 | 6 | 1 | Grand Slam (Tennis)
Wie zählt man im Tennis die ersten Punkte eines Spiels? | 15, 30, 40 | 1, 2, 3 | 10, 20, 30 | 5, 10, 15 | 1 | Tennis | mc
Wie nennt man im Tennis den Stand 40:40? | Einstand | Vorteil | Satzball | Tie-Break | 1 | Tennis | alt=Deuce
Welcher Deutsche gewann 1985 als 17-Jähriger Wimbledon? | Boris Becker | Michael Stich | Tommy Haas | Alexander Zverev | 1 | Boris Becker | alt=Becker
Welche Deutsche gewann 1988 den „Golden Slam“? | Steffi Graf | Angelique Kerber | Anke Huber | Andrea Petkovic | 1 | Steffi Graf | alt=Graf
Wie viele Löcher hat eine Standardrunde Golf? | 18 | 9 | 12 | 24 | 1 | Golf
Was bedeutet „Par“ beim Golf? | Die Standardanzahl an Schlägen | Ein Schlag unter Standard | Ein Schlag über Standard | Ein verlorener Ball | 2 | Golf | mc
Wie viele Pins stehen beim Bowling? | 10 | 9 | 12 | 8 | 1 | Bowling
Wie viele Pins stehen beim deutschen Kegeln? | 9 | 10 | 8 | 12 | 2 | Kegeln
Welcher Wert ist der höchste mit drei Pfeilen beim Darts? | 180 | 150 | 200 | 120 | 1 | Darts
Wie viele Felder hat eine Dartscheibe (Zahlen)? | 20 | 12 | 24 | 30 | 1 | Darts
Wie viele Kugeln (Bälle) liegen beim Snooker zu Beginn auf dem Tisch? | 22 | 16 | 15 | 10 | 2 | Snooker
Wie viele Kugeln werden beim Billard (Pool) mit dem Spielball eingesetzt? | 16 | 15 | 22 | 10 | 2 | Poolbillard
Welche Schachfigur kann nur diagonal ziehen? | Läufer | Turm | Springer | König | 1 | Schach
Welche Schachfigur springt im „L“? | Springer | Läufer | Turm | Dame | 1 | Schach | alt=Pferd
Welche Schachfigur ist die stärkste? | Dame | König | Turm | Springer | 1 | Schach
Wie viele Bauern hat jeder Spieler zu Beginn einer Schachpartie? | 8 | 6 | 10 | 16 | 1 | Schach
Wie heißt der höchste Gürtel im Judo und Karate (Meistergrad)? | Schwarzer Gürtel | Brauner Gürtel | Roter Gürtel | Weißer Gürtel | 1 | Judo
Welche Sportart wird mit einem Federball gespielt? | Badminton | Squash | Tennis | Tischtennis | 1 | Badminton
Wie viele Sätze muss man im Volleyball gewinnen? | 3 | 2 | 4 | 5 | 1 | Volleyball
In welcher Sportart gibt es den Sprung „Tsukahara“? | Turnen | Eiskunstlauf | Skispringen | Wasserspringen | 2 | Gerätturnen
An welchem Turngerät schwingt man an zwei Holmen auf verschiedener Höhe? | Stufenbarren | Reck | Ringe | Pauschenpferd | 2 | Stufenbarren
Wie heißt der Ort der Vierschanzentournee-Auftaktspringen in Deutschland? | Oberstdorf | Garmisch-Partenkirchen | Willingen | Klingenthal | 2 | Schattenbergschanze
An welchem Tag findet das Neujahrsspringen der Vierschanzentournee statt? | 1. Januar | 31. Dezember | 6. Januar | 30. Dezember | 1 | Große Olympiaschanze
Welche Sportart verbindet man mit dem Rennen in Kitzbühel auf der „Streif“? | Ski Alpin (Abfahrt) | Skispringen | Rodeln | Biathlon | 1 | Streif
Welche Sportart wird auf einem Eiskanal mit Schlitten betrieben? | Rodeln | Curling | Eisschnelllauf | Eiskunstlauf | 1 | Rennrodeln
Bei welcher Sportart werden Steine über das Eis geschoben und mit Besen gewischt? | Curling | Eisstockschießen | Bob | Eishockey | 1 | Curling
Wie heißt das Spielgerät beim Eishockey? | Puck | Ball | Stein | Scheibe aus Gummi namens Disc | 1 | Puck
Wie lange dauert ein Eishockeydrittel (reine Spielzeit)? | 20 Minuten | 15 Minuten | 30 Minuten | 25 Minuten | 2 | Eishockey
Wie viele Viertel hat ein Basketballspiel? | 4 | 2 | 3 | 5 | 1 | Basketball
Wie viele Punkte zählt ein Wurf von außerhalb der Dreierlinie im Basketball? | 3 | 2 | 4 | 1 | 1 | Basketball
Wie heißt die nordamerikanische Basketball-Profiliga? | NBA | NFL | NHL | MLB | 1 | National Basketball Association
Wie heißt die nordamerikanische Football-Profiliga? | NFL | NBA | NHL | MLS | 1 | National Football League
Wie heißt das Finale der NFL? | Super Bowl | World Series | Stanley Cup | Grand Final | 1 | Super Bowl
Wie heißt die Trophäe der NHL (Eishockey)? | Stanley Cup | Super Bowl | Larry O'Brien Trophy | Davis Cup | 2 | Stanley Cup
Wie heißt der Mannschaftswettbewerb der Herren im Tennis? | Davis Cup | Ryder Cup | America's Cup | Stanley Cup | 2 | Davis Cup
Wie heißt der Golf-Teamwettbewerb Europa gegen USA? | Ryder Cup | Davis Cup | Solheim Cup | Masters | 2 | Ryder Cup
Wie heißt die berühmteste Segelregatta der Welt? | America’s Cup | Davis Cup | Ryder Cup | Kieler Woche | 2 | America’s Cup
Wo findet jedes Jahr ein berühmtes 24-Stunden-Autorennen in Frankreich statt? | Le Mans | Monaco | Paris | Spa | 1 | 24-Stunden-Rennen von Le Mans
Auf welcher deutschen Rennstrecke liegt die „Nordschleife“? | Nürburgring | Hockenheimring | Sachsenring | Lausitzring | 1 | Nürburgring
In welchem Land findet ein Formel-1-Rennen durch enge Straßen am Hafen statt? | Monaco | Italien | Spanien | Singapur | 1 | Circuit de Monaco
Welche Flagge zeigt im Motorsport das Rennende an? | Schwarz-weiß karierte Flagge | Rote Flagge | Gelbe Flagge | Grüne Flagge | 1 | Zielflagge
Welche Flagge bedeutet im Motorsport Rennabbruch? | Rote Flagge | Blaue Flagge | Gelbe Flagge | Weiße Flagge | 2 | Formel 1
Wie heißt der berühmteste Pferderennen-Hindernislauf in England? | Grand National | Derby | Ascot Gold Cup | Melbourne Cup | 2 | Grand National
Wie heißt der Langstrecken-Skilauf in Schweden über 90 km? | Wasalauf | Engadin Skimarathon | Holmenkollen | König-Ludwig-Lauf | 2 | Wasalauf
Welche Sportart betreibt man auf dem Wasser mit einem Segel und einem Brett? | Windsurfen | Kitesurfen | Rudern | Kanufahren | 1 | Windsurfen
Welche Sportart nutzt einen Lenkdrachen und ein Brett auf dem Wasser? | Kitesurfen | Windsurfen | Wakeboarden | Stand-Up-Paddling | 1 | Kitesurfen
Welche Sportart ist Teil der Olympischen Spiele seit 2020 und wird auf Rampen und Geländern gefahren? | Skateboarding | BMX-Freestyle | Parkour | Breakdance | 2 | Skateboard
Welcher Tanzsport war 2024 erstmals olympisch? | Breaking | Salsa | Standardtanz | Hip-Hop-Choreografie | 2 | Breakdance | alt=Breakdance
`);
})();
