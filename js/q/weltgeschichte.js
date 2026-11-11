/* Neuzeit & Moderne – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "weltgeschichte";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const USP = parse(`
Er war der erste Präsident der USA;George Washington
Er schrieb die Unabhängigkeitserklärung und wurde dritter Präsident;Thomas Jefferson
Er schaffte die Sklaverei ab und wurde 1865 ermordet;Abraham Lincoln
Er wurde viermal gewählt und führte die USA durch Weltwirtschaftskrise und Krieg;Franklin D. Roosevelt
Er ließ die Atombomben auf Japan abwerfen;Harry S. Truman
Er war im Zweiten Weltkrieg Oberbefehlshaber in Europa und später Präsident;Dwight D. Eisenhower
Er wurde 1963 in Dallas erschossen;John F. Kennedy
Er trat 1974 wegen der Watergate-Affäre zurück;Richard Nixon
Er war zuvor Erdnussfarmer und erhielt 2002 den Friedensnobelpreis;Jimmy Carter
Er war früher Schauspieler und forderte „Tear down this wall!“;Ronald Reagan
Er war Präsident beim Ende des Kalten Krieges 1991;George H. W. Bush
Er war Präsident in den 1990ern und Ehemann von Hillary;Bill Clinton
Er war Präsident bei den Anschlägen vom 11. September 2001;George W. Bush
Er war der erste afroamerikanische Präsident;Barack Obama
Er wurde 2016 und 2024 gewählt;Donald Trump
Er war von 2021 bis 2025 Präsident und zuvor Vizepräsident unter Obama;Joe Biden
Sein Name trägt der Teddybär, er war Präsident ab 1901;Theodore Roosevelt
Er führte die USA in den Ersten Weltkrieg und gründete den Völkerbund mit;Woodrow Wilson
`);
  table(C, USP, { q: (p) => `Welcher US-Präsident ist gemeint? ${p[0]}.`, a: (p) => p[1], pool: USP.map((p) => p[1]), diff: (p) => (["George Washington", "Abraham Lincoln", "John F. Kennedy", "Barack Obama", "Donald Trump", "Joe Biden"].includes(p[1]) ? 1 : 2), img: (p) => p[1], alt: (p) => [p[1].split(" ").slice(-1)[0]] });

  const USY = parse(`
1940;Franklin D. Roosevelt
1950;Harry S. Truman
1955;Dwight D. Eisenhower
1962;John F. Kennedy
1966;Lyndon B. Johnson
1970;Richard Nixon
1975;Gerald Ford
1978;Jimmy Carter
1985;Ronald Reagan
1990;George H. W. Bush
1995;Bill Clinton
2003;George W. Bush
2010;Barack Obama
2018;Donald Trump
2022;Joe Biden
`);
  table(C, USY, { q: (y) => `Wer war im Jahr ${y[0]} Präsident der USA?`, a: (y) => y[1], pool: USY.map((y) => y[1]), diff: (y) => (+y[0] >= 2003 || y[0] === "1962" ? 1 : 2), img: () => "Weißes Haus" });

  const EXP = parse(`
Vasco da Gama;Fand den Seeweg nach Indien um Afrika herum
Ferdinand Magellan;Leitete die erste Weltumsegelung (starb unterwegs)
Christoph Kolumbus;Erreichte 1492 Amerika
James Cook;Erkundete die Ostküste Australiens und Neuseeland
Roald Amundsen;Erreichte 1911 als Erster den Südpol
Robert Falcon Scott;Erreichte den Südpol kurz nach Amundsen und starb auf dem Rückweg
Edmund Hillary;Bestieg 1953 mit Tenzing Norgay als Erster den Mount Everest
Hernán Cortés;Eroberte das Aztekenreich
Francisco Pizarro;Eroberte das Inkareich
Amerigo Vespucci;Gab dem Kontinent Amerika seinen Namen
Jacques Cartier;Erkundete für Frankreich den Sankt-Lorenz-Strom in Kanada
Abel Tasman;Entdeckte für die Europäer Tasmanien und Neuseeland
David Livingstone;Erforschte Afrika und benannte die Victoriafälle
Ernest Shackleton;Rettete seine Mannschaft nach dem Verlust der „Endurance“ im Eis
Vitus Bering;Erkundete die Meerenge zwischen Asien und Amerika
Fridtjof Nansen;Ließ sich mit der „Fram“ durch das Nordpolarmeer treiben
Juri Gagarin;Flog 1961 als erster Mensch ins All
Neil Armstrong;Betrat 1969 als erster Mensch den Mond
Walentina Tereschkowa;War 1963 die erste Frau im All
Charles Lindbergh;Flog 1927 als Erster allein nonstop über den Atlantik
Amelia Earhart;Flog als erste Frau allein über den Atlantik
Bertha Benz;Unternahm 1888 die erste Fernfahrt mit einem Automobil
`);
  table(C, EXP, { q: (e) => `Wofür ist ${e[0]} bekannt?`, a: (e) => e[1], pool: EXP.map((e) => e[1]), mc: true, diff: (e) => (["Christoph Kolumbus", "Neil Armstrong", "Juri Gagarin", "Roald Amundsen", "Ferdinand Magellan", "Vasco da Gama", "Edmund Hillary"].includes(e[0]) ? 1 : 2), img: (e) => e[0] });
  table(C, EXP, { q: (e) => `Wer ist gemeint? ${e[1]}.`, a: (e) => e[0], pool: EXP.map((e) => e[0]), diff: (e) => (["Christoph Kolumbus", "Neil Armstrong", "Juri Gagarin", "Roald Amundsen", "Ferdinand Magellan", "Vasco da Gama"].includes(e[0]) ? 1 : 2), img: (e) => e[0], alt: (e) => [e[0].split(" ").slice(-1)[0]] });

  const IND = parse(`
USA;1776
Mexiko;1821
Brasilien;1822
Belgien;1830
Norwegen (Auflösung der Union mit Schweden);1905
Finnland;1917
Indien;1947
Pakistan;1947
Israel;1948
Indonesien;1945
Ghana;1957
Nigeria;1960
Algerien;1962
Kenia;1963
Bangladesch;1971
Ukraine;1991
Osttimor;2002
Kosovo;2008
Südsudan;2011
`);
  table(C, IND, { q: (i) => `In welchem Jahr wurde ${i[0]} unabhängig?`, a: (i) => i[1], years: 6, diff: (i) => (["USA", "Indien", "Israel", "Südsudan", "Ukraine"].includes(i[0]) ? 1 : 2) });

  const COL = parse(`
Indien;Großbritannien
Brasilien;Portugal
Mexiko;Spanien
Indonesien;Niederlande
Algerien;Frankreich
Demokratische Republik Kongo;Belgien
Namibia;Deutschland
Angola;Portugal
Vietnam;Frankreich
Kenia;Großbritannien
Senegal;Frankreich
Libyen;Italien
Mosambik;Portugal
Suriname;Niederlande
Hongkong (bis 1997);Großbritannien
Macau (bis 1999);Portugal
Peru;Spanien
Togo und Kamerun (bis 1916);Deutschland
`);
  table(C, COL, { q: (c) => `Welche Kolonialmacht beherrschte ${c[0]}?`, a: (c) => c[1], pool: ["Großbritannien", "Frankreich", "Spanien", "Portugal", "Niederlande", "Belgien", "Deutschland", "Italien"], diff: (c) => (["Indien", "Brasilien", "Mexiko", "Hongkong (bis 1997)", "Namibia"].includes(c[0]) ? 1 : 2) });

  const COLD = parse(`
Die Truman-Doktrin wird verkündet;1947
Die Volksrepublik China wird ausgerufen;1949
Der Koreakrieg beginnt;1950
Stalin stirbt;1953
Der Volksaufstand in Ungarn wird niedergeschlagen;1956
Die Sowjetunion startet den Satelliten Sputnik;1957
Juri Gagarin fliegt ins All;1961
Die Kubakrise bringt die Welt an den Rand eines Atomkriegs;1962
John F. Kennedy wird ermordet;1963
Der Prager Frühling wird niedergeschlagen;1968
Martin Luther King wird ermordet;1968
Der Vietnamkrieg endet mit dem Fall Saigons;1975
Die Sowjetunion marschiert in Afghanistan ein;1979
In Polen entsteht die Gewerkschaft Solidarność;1980
Michail Gorbatschow kommt an die Macht;1985
Die Reaktorkatastrophe von Tschernobyl;1986
Die Sowjetunion zerfällt;1991
Nelson Mandela wird Präsident Südafrikas;1994
Großbritannien gibt Hongkong an China zurück;1997
Terroranschläge vom 11. September in den USA;2001
Die USA greifen den Irak an;2003
Die EU nimmt zehn neue Mitglieder vor allem aus Osteuropa auf;2004
Die Bank Lehman Brothers bricht zusammen (Finanzkrise);2008
Russland annektiert die Krim;2014
Das Pariser Klimaabkommen wird beschlossen;2015
Die Briten stimmen für den Brexit;2016
Die Corona-Pandemie breitet sich weltweit aus;2020
Russland greift die gesamte Ukraine an;2022
Queen Elizabeth II. stirbt;2022
`);
  table(C, COLD, { q: (e) => `In welchem Jahr: ${e[0]}?`, a: (e) => e[1], years: 5, max: 2025, diff: (e) => (["1949", "1961", "1962", "1963", "1991", "2001", "2020", "2022"].includes(e[1]) ? 1 : 2) });

  const MON = parse(`
Königin, die 63 Jahre regierte und Kaiserin von Indien war (1837–1901);Victoria
Königin des Vereinigten Königreichs von 1952 bis 2022;Elizabeth II.
König des Vereinigten Königreichs seit 2022;Charles III.
Englischer König mit sechs Ehefrauen;Heinrich VIII.
Englische Königin, die 1588 die Armada abwehrte;Elisabeth I.
„Sonnenkönig“, der Versailles bauen ließ;Ludwig XIV.
Französischer König, der 1793 hingerichtet wurde;Ludwig XVI.
Französische Königin aus Österreich, ebenfalls 1793 hingerichtet;Marie Antoinette
Zar, der Sankt Petersburg gründete;Peter der Große
Russische Zarin deutscher Herkunft im 18. Jahrhundert;Katharina die Große
Letzter Zar, 1918 mit seiner Familie ermordet;Nikolaus II.
Habsburger Herrscherin und Mutter von 16 Kindern;Maria Theresia
Österreichischer Kaiser, der fast 68 Jahre regierte;Franz Joseph I.
Kaiserin von Österreich, genannt „Sisi“;Elisabeth von Österreich
Kaiser der Franzosen, verbannt nach St. Helena;Napoleon Bonaparte
Bayerischer „Märchenkönig“;Ludwig II.
Spanischer König, in dessen Reich „die Sonne nie unterging“;Karl V.
Russischer Zar mit dem Beinamen „der Schreckliche“;Iwan IV.
`);
  table(C, MON, { q: (m) => `Wer ist gemeint? ${m[0]}.`, a: (m) => m[1], pool: MON.map((m) => m[1]), diff: (m) => (["Elizabeth II.", "Charles III.", "Ludwig XIV.", "Marie Antoinette", "Napoleon Bonaparte", "Heinrich VIII.", "Elisabeth von Österreich", "Ludwig II."].includes(m[1]) ? 1 : 2), img: (m) => m[1] });

  const UN = parse(`
Trygve Lie;Norwegen
Dag Hammarskjöld;Schweden
U Thant;Myanmar (Birma)
Kurt Waldheim;Österreich
Javier Pérez de Cuéllar;Peru
Boutros Boutros-Ghali;Ägypten
Kofi Annan;Ghana
Ban Ki-moon;Südkorea
António Guterres;Portugal
`);
  table(C, UN, { q: (u) => `Aus welchem Land stammt der UN-Generalsekretär ${u[0]}?`, a: (u) => u[1], pool: UN.map((u) => u[1]), diff: (u) => (["Kofi Annan", "Ban Ki-moon", "António Guterres"].includes(u[0]) ? 1 : 2), img: (u) => u[0] });

  const SOV = ["Wladimir Lenin", "Josef Stalin", "Nikita Chruschtschow", "Leonid Breschnew", "Juri Andropow", "Konstantin Tschernenko", "Michail Gorbatschow"];
  table(C, SOV.slice(1).map((s, i) => [s, SOV[i]]), { q: (s) => `Wer folgte auf ${s[1]} als Führer der Sowjetunion?`, a: (s) => s[0], pool: SOV, avoid: (s) => [s[1]], diff: (s) => (["Josef Stalin", "Nikita Chruschtschow"].includes(s[0]) ? 1 : 2), img: (s) => s[0] });

  const NOBEL = parse(`
Henri Dunant (erster Preisträger, Gründer des Roten Kreuzes);1901
Bertha von Suttner („Die Waffen nieder!“);1905
Martin Luther King;1964
Willy Brandt;1971
Mutter Teresa;1979
Dalai Lama;1989
Michail Gorbatschow;1990
Nelson Mandela und Frederik Willem de Klerk;1993
Kofi Annan und die Vereinten Nationen;2001
Al Gore und der Weltklimarat;2007
Barack Obama;2009
Europäische Union;2012
Malala Yousafzai;2014
Welternährungsprogramm der UN;2020
`);
  table(C, NOBEL, { q: (n) => `In welchem Jahr erhielt den Friedensnobelpreis: ${n[0]}?`, a: (n) => n[1], years: 6, max: 2025, diff: 2, img: () => "Friedensnobelpreis" });
  table(C, NOBEL.filter((n) => !n[0].includes("Henri") && !n[0].includes("Bertha")), { q: (n) => `Wer erhielt ${n[1]} den Friedensnobelpreis?`, a: (n) => n[0], pool: NOBEL.map((n) => n[0]), diff: (n) => (["Barack Obama", "Malala Yousafzai", "Nelson Mandela und Frederik Willem de Klerk", "Willy Brandt"].includes(n[0]) ? 1 : 2), img: () => "Friedensnobelpreis", mc: true });

  lines(C, `
# Entdeckungen und frühe Neuzeit
Welches Land teilte sich 1494 im Vertrag von Tordesillas die Neue Welt mit Spanien? | Portugal | England | Frankreich | Niederlande | 2 | Vertrag von Tordesillas
Wie hieß das Flaggschiff von Kolumbus? | Santa María | Niña | Pinta | Victoria | 1 | Santa María (Schiff)
Welche Inseln erreichte Kolumbus 1492 zuerst? | Die Bahamas | Kuba | Hawaii | Kanaren | 2 | Guanahani
Wofür hielt Kolumbus das von ihm erreichte Land? | Für Indien | Für China | Für Afrika | Für Australien | 1 | Christoph Kolumbus | mc
Warum heißen die Ureinwohner Amerikas bis heute oft „Indianer“? | Weil Kolumbus glaubte, in Indien zu sein | Wegen ihrer Sprache | Wegen eines Flusses | Wegen ihres Königs | 1 | Indigene Völker Amerikas | mc
Welcher Azteken-Herrscher wurde von den Spaniern gefangen genommen? | Moctezuma II. | Atahualpa | Pachacútec | Cuauhtémoc allein | 2 | Moctezuma II.
Welcher Inka-Herrscher wurde von Pizarro hingerichtet? | Atahualpa | Moctezuma | Huáscar | Manco Cápac | 2 | Atahualpa
Wie nannte man die spanischen Eroberer Amerikas? | Konquistadoren | Kreuzritter | Musketiere | Pioniere | 1 | Conquistador
Welche Krankheit, eingeschleppt von Europäern, tötete Millionen Ureinwohner Amerikas? | Pocken | Pest | Malaria | Cholera | 2 | Pocken
Wie nennt man den Austausch von Pflanzen, Tieren und Krankheiten zwischen Alter und Neuer Welt? | Kolumbianischer Austausch | Dreieckshandel | Seidenstraße | Merkantilismus | 2 | Kolumbianischer Austausch
Wie nannte man den Handel Europa – Afrika – Amerika mit versklavten Menschen? | Dreieckshandel | Hanse | Merkantilismus | Freihandel | 1 | Atlantischer Sklavenhandel
Wie hieß das Schiff, mit dem die Pilgerväter 1620 nach Amerika kamen? | Mayflower | Santa María | Endeavour | Bounty | 1 | Mayflower
Welche niederländische Siedlung wurde später New York? | Nieuw Amsterdam | New Haven | Jamestown | Plymouth | 2 | Nieuw Amsterdam
Welche Handelsgesellschaft beherrschte große Teile Indiens im 18. und 19. Jahrhundert? | Britische Ostindien-Kompanie | Hanse | Hudson’s Bay Company | Fugger-Gesellschaft | 2 | Britische Ostindien-Kompanie
Welche Armada wurde 1588 von England besiegt? | Die spanische | Die französische | Die portugiesische | Die osmanische | 1 | Spanische Armada
Welcher englische Freibeuter umsegelte im Auftrag Elisabeths I. die Welt? | Francis Drake | Walter Raleigh | Henry Morgan | James Cook | 2 | Francis Drake | alt=Drake
Vor welcher Stadt scheiterten die Osmanen 1683 endgültig? | Wien | Budapest | Prag | Belgrad | 1 | Zweite Wiener Türkenbelagerung
Wie nennt man die Regierungsform, in der ein König allein absolute Macht hat? | Absolutismus | Demokratie | Republik | Föderalismus | 1 | Absolutismus
Welcher Ausspruch wird Ludwig XIV. zugeschrieben? | „Der Staat bin ich“ | „Veni, vidi, vici“ | „Ich bin ein Berliner“ | „Après moi le déluge“ | 1 | Ludwig XIV. | mc
Welches Schloss ließ Ludwig XIV. bei Paris bauen? | Versailles | Louvre | Fontainebleau | Chambord | 1 | Schloss Versailles
In welchem Krieg kämpften 1756–1763 Preußen und Großbritannien gegen Österreich, Frankreich und Russland? | Siebenjähriger Krieg | Dreißigjähriger Krieg | Spanischer Erbfolgekrieg | Krimkrieg | 2 | Siebenjähriger Krieg
# Revolutionen
Mit welchem Ereignis begann die Französische Revolution am 14. Juli 1789? | Sturm auf die Bastille | Hinrichtung des Königs | Krönung Napoleons | Ballhausschwur | 1 | Sturm auf die Bastille
Wie lautete der Wahlspruch der Französischen Revolution? | Freiheit, Gleichheit, Brüderlichkeit | Einigkeit und Recht und Freiheit | Gott mit uns | Arbeit, Familie, Vaterland | 1 | Liberté, Égalité, Fraternité | mc
Mit welchem Gerät wurden in der Französischen Revolution Todesurteile vollstreckt? | Guillotine | Galgen | Schwert | Erschießung | 1 | Guillotine
Wie nennt man die Phase brutaler Verfolgung 1793/94 in Frankreich? | Schreckensherrschaft (Terreur) | Restauration | Direktorium | Konsulat | 2 | Terrorherrschaft
Welcher Revolutionär führte die Schreckensherrschaft an und wurde selbst hingerichtet? | Maximilien de Robespierre | Georges Danton | Jean-Paul Marat | Napoleon | 2 | Maximilien de Robespierre | alt=Robespierre
Welches Dokument verabschiedete die Nationalversammlung 1789? | Erklärung der Menschen- und Bürgerrechte | Magna Carta | Bill of Rights | Code civil | 2 | Erklärung der Menschen- und Bürgerrechte
Welches Gesetzbuch ließ Napoleon 1804 erlassen? | Code civil (Code Napoléon) | Corpus Iuris | Bürgerliches Gesetzbuch | Sachsenspiegel | 2 | Code civil
In welchem Jahr krönte sich Napoleon zum Kaiser? | 1804 | 1799 | 1812 | 1789 | 2 | Krönung Napoleons
Wo krönte sich Napoleon selbst zum Kaiser? | In Notre-Dame in Paris | In Reims | In Versailles | In Rom | 2 | Notre-Dame de Paris
Welcher Feldzug Napoleons scheiterte 1812 im Winter? | Russlandfeldzug | Ägyptenfeldzug | Italienfeldzug | Spanienfeldzug | 1 | Russlandfeldzug 1812
Auf welche Insel wurde Napoleon 1814 zuerst verbannt? | Elba | St. Helena | Korsika | Malta | 1 | Elba
Wie nennt man Napoleons Rückkehr 1815 vor Waterloo? | Herrschaft der Hundert Tage | Restauration | Konsulat | Direktorium | 2 | Herrschaft der Hundert Tage
Auf welcher Insel starb Napoleon? | St. Helena | Elba | Korsika | Sardinien | 1 | St. Helena
Auf welcher Insel wurde Napoleon geboren? | Korsika | Elba | Sizilien | Sardinien | 1 | Korsika
Welcher britische Feldherr besiegte Napoleon bei Waterloo? | Wellington | Nelson | Marlborough | Montgomery | 1 | Arthur Wellesley, 1. Duke of Wellington | alt=Duke of Wellington
Welcher preußische Feldmarschall unterstützte Wellington bei Waterloo? | Blücher | Gneisenau | Scharnhorst | Moltke | 2 | Gebhard Leberecht von Blücher | alt=Blücher
Welcher britische Admiral fiel 1805 in der Schlacht von Trafalgar? | Horatio Nelson | Francis Drake | James Cook | Wellington | 1 | Horatio Nelson | alt=Nelson
In welcher Stadt wurde 1776 die Unabhängigkeitserklärung der USA beschlossen? | Philadelphia | Boston | New York | Washington | 1 | Independence Hall
Was geschah bei der „Boston Tea Party“ 1773? | Kolonisten warfen britischen Tee ins Hafenbecken | Ein Fest für den König | Eine Teeernte | Ein Friedensvertrag | 1 | Boston Tea Party | mc
Welches Land unterstützte die Amerikaner im Unabhängigkeitskrieg gegen Großbritannien? | Frankreich | Spanien allein | Russland | Preußen | 2 | Amerikanischer Unabhängigkeitskrieg
Welches Geschenk machte Frankreich den USA 1886? | Die Freiheitsstatue | Das Weiße Haus | Die Liberty Bell | Mount Rushmore | 1 | Freiheitsstatue
Zwischen welchen Seiten wurde der Amerikanische Bürgerkrieg (1861–1865) geführt? | Nordstaaten und Südstaaten | Ost- und Westküste | Briten und Amerikaner | USA und Mexiko | 1 | Sezessionskrieg | mc
Welche Gruppe gewann den Amerikanischen Bürgerkrieg? | Die Nordstaaten (Union) | Die Südstaaten (Konföderation) | Niemand | Großbritannien | 1 | Sezessionskrieg
Welcher Südstaatengeneral kapitulierte 1865? | Robert E. Lee | Ulysses S. Grant | Stonewall Jackson | William Sherman | 2 | Robert E. Lee
Welche Revolution machte 1917 aus Russland einen kommunistischen Staat? | Oktoberrevolution | Februarrevolution | Glorreiche Revolution | Samtene Revolution | 1 | Oktoberrevolution
Wie hieß der friedliche Umsturz 1989 in der Tschechoslowakei? | Samtene Revolution | Nelkenrevolution | Orange Revolution | Rosenrevolution | 2 | Samtene Revolution
Welche Revolution beendete 1974 die Diktatur in Portugal? | Nelkenrevolution | Samtene Revolution | Orange Revolution | Februarrevolution | 2 | Nelkenrevolution
Welcher Dramatiker wurde 1989 Präsident der Tschechoslowakei? | Václav Havel | Lech Wałęsa | Alexander Dubček | Milan Kundera | 2 | Václav Havel | alt=Havel
Welcher Elektriker führte die Gewerkschaft Solidarność und wurde polnischer Präsident? | Lech Wałęsa | Václav Havel | Wojciech Jaruzelski | Karol Wojtyła | 2 | Lech Wałęsa | alt=Walesa/Wałęsa
Welcher Papst aus Polen unterstützte die Opposition in Osteuropa? | Johannes Paul II. | Benedikt XVI. | Franziskus | Paul VI. | 1 | Johannes Paul II.
Welche Protestbewegung begann 2010/2011 in Tunesien und erfasste viele arabische Länder? | Arabischer Frühling | Prager Frühling | Orange Revolution | Grüne Welle | 1 | Arabischer Frühling
# Kalter Krieg und Welt nach 1945
Wie heißt der Konflikt zwischen den USA und der Sowjetunion ohne direkten Krieg? | Kalter Krieg | Stellvertreterkrieg | Weltkrieg | Grabenkrieg | 1 | Kalter Krieg
Welcher kommunistische Führer gründete 1949 die Volksrepublik China? | Mao Zedong | Deng Xiaoping | Sun Yat-sen | Zhou Enlai | 1 | Mao Zedong | alt=Mao
Wie hieß Maos katastrophale Wirtschaftskampagne 1958–1961? | Großer Sprung nach vorn | Kulturrevolution | Langer Marsch | Hundert-Blumen-Bewegung | 2 | Großer Sprung nach vorn
Wie hieß die radikale Kampagne in China 1966–1976? | Kulturrevolution | Großer Sprung | Langer Marsch | Reform und Öffnung | 2 | Kulturrevolution
Welcher chinesische Politiker öffnete China ab 1978 wirtschaftlich? | Deng Xiaoping | Mao Zedong | Xi Jinping | Hu Jintao | 2 | Deng Xiaoping | alt=Deng
Auf welchem Platz in Peking wurden 1989 Proteste blutig niedergeschlagen? | Platz des Himmlischen Friedens | Roter Platz | Tiananmen-Tor-Park | Volksplatz | 1 | Tian’anmen-Massaker | alt=Tiananmen
Wer ist seit 2013 Staatspräsident Chinas? | Xi Jinping | Hu Jintao | Li Keqiang | Wen Jiabao | 1 | Xi Jinping | alt=Xi
Welche Teilung entstand in Korea nach dem Koreakrieg? | Nord- und Südkorea | Ost- und Westkorea | Keine | Korea wurde chinesisch | 1 | Koreakrieg | mc
Welcher Krieg spaltete die USA in den 1960er Jahren? | Vietnamkrieg | Koreakrieg | Golfkrieg | Irakkrieg | 1 | Vietnamkrieg
Welcher kubanische Revolutionär regierte Kuba von 1959 bis 2008? | Fidel Castro | Che Guevara | Raúl Castro | Fulgencio Batista | 1 | Fidel Castro | alt=Castro
Welcher Arzt und Revolutionär aus Argentinien wurde zur Ikone (Barett, Stern)? | Che Guevara | Fidel Castro | Simón Bolívar | Salvador Allende | 1 | Che Guevara
Welcher Freiheitskämpfer befreite im 19. Jahrhundert mehrere südamerikanische Länder von Spanien? | Simón Bolívar | Che Guevara | José de San Martín allein | Pancho Villa | 1 | Simón Bolívar | alt=Bolívar/Bolivar
Welches Land ist nach Simón Bolívar benannt? | Bolivien | Venezuela | Kolumbien | Ecuador | 1 | Simón Bolívar
Was löste die Kubakrise 1962 aus? | Sowjetische Atomraketen auf Kuba | Ein Putsch in Kuba | Ein Hurrikan | Eine Ölkrise | 1 | Kubakrise | mc
Welche US-Behörde wurde 1958 für die Raumfahrt gegründet? | NASA | ESA | CIA | NSA | 1 | NASA
Wie hieß das US-Programm für die Mondlandungen? | Apollo | Gemini | Mercury | Artemis | 1 | Apollo-Programm
Wie viele Menschen haben bisher den Mond betreten? | 12 | 2 | 24 | 6 | 2 | Apollo-Programm
Wer betrat 1969 als zweiter Mensch den Mond? | Buzz Aldrin | Michael Collins | Juri Gagarin | John Glenn | 1 | Buzz Aldrin | alt=Aldrin
Welche Krise erschütterte 1973 die Weltwirtschaft? | Ölkrise | Finanzkrise | Eurokrise | Dotcom-Krise | 2 | Ölpreiskrise 1973
Welche Politik betrieb Gorbatschow mit „Glasnost“ und „Perestroika“? | Offenheit und Umbau | Aufrüstung | Abschottung | Kollektivierung | 1 | Glasnost | mc
Welches Land war bis 1994 von der Apartheid geprägt? | Südafrika | Namibia | Simbabwe | Kenia | 1 | Apartheid
Wie viele Jahre saß Nelson Mandela im Gefängnis? | 27 | 10 | 5 | 40 | 1 | Nelson Mandela
Welcher gewaltlose Freiheitskämpfer führte Indien in die Unabhängigkeit? | Mahatma Gandhi | Jawaharlal Nehru | Muhammad Ali Jinnah | Indira Gandhi | 1 | Mahatma Gandhi | alt=Gandhi
Wer war der erste Premierminister Indiens? | Jawaharlal Nehru | Mahatma Gandhi | Indira Gandhi | Rajiv Gandhi | 2 | Jawaharlal Nehru | alt=Nehru
Welcher Staat entstand 1947 bei der Teilung Britisch-Indiens als muslimischer Staat? | Pakistan | Bangladesch | Afghanistan | Sri Lanka | 1 | Pakistan
Welcher US-Bürgerrechtler hielt die Rede „I Have a Dream“? | Martin Luther King | Malcolm X | Barack Obama | Jesse Jackson | 1 | Martin Luther King | alt=King/MLK
Welche Frau weigerte sich 1955, im Bus ihren Platz für einen Weißen zu räumen? | Rosa Parks | Harriet Tubman | Michelle Obama | Angela Davis | 1 | Rosa Parks | alt=Parks
Welche Frau führte im 19. Jahrhundert Sklaven über die „Underground Railroad“ in die Freiheit? | Harriet Tubman | Rosa Parks | Sojourner Truth | Eleanor Roosevelt | 2 | Harriet Tubman | alt=Tubman
In welchem Jahr schaffte Großbritannien die Sklaverei in seinen Kolonien ab? | 1833 | 1776 | 1865 | 1900 | 2 | Slavery Abolition Act
Welches Land führte als erstes das Frauenwahlrecht auf nationaler Ebene ein (1893)? | Neuseeland | Großbritannien | USA | Schweiz | 2 | Frauenwahlrecht
Welches europäische Land führte das Frauenwahlrecht auf Bundesebene erst 1971 ein? | Schweiz | Frankreich | Italien | Spanien | 2 | Frauenstimmrecht in der Schweiz
Wie hießen die britischen Frauenrechtlerinnen, die für das Wahlrecht kämpften? | Suffragetten | Amazonen | Feministinnen | Emanzen | 1 | Suffragette
Welche Organisation verwaltet die Olympischen Spiele? | IOC | FIFA | UNO | UNESCO | 1 | Internationales Olympisches Komitee
Welche UN-Organisation kümmert sich um Bildung, Wissenschaft und Kultur (Welterbe)? | UNESCO | UNICEF | WHO | FAO | 1 | UNESCO
Welche UN-Organisation ist das Kinderhilfswerk? | UNICEF | UNESCO | UNHCR | WFP | 1 | UNICEF
Welche UN-Organisation kümmert sich um Flüchtlinge? | UNHCR | UNICEF | WHO | IAEA | 2 | UNHCR
# 21. Jahrhundert
Welche Organisation bekannte sich zu den Anschlägen vom 11. September 2001? | al-Qaida | Hamas | IRA | ETA | 1 | al-Qaida
Wer war Anführer von al-Qaida und wurde 2011 getötet? | Osama bin Laden | Saddam Hussein | Abu Bakr al-Baghdadi | Muammar al-Gaddafi | 1 | Osama bin Laden
Welcher irakische Diktator wurde 2003 gestürzt? | Saddam Hussein | Baschar al-Assad | Muammar al-Gaddafi | Hosni Mubarak | 1 | Saddam Hussein
Welcher libysche Machthaber wurde 2011 gestürzt und getötet? | Muammar al-Gaddafi | Saddam Hussein | Hosni Mubarak | Ben Ali | 2 | Muammar al-Gaddafi | alt=Gaddafi
Welcher Bürgerkrieg begann 2011 im Nahen Osten und trieb Millionen in die Flucht? | Syrischer Bürgerkrieg | Irakkrieg | Libanonkrieg | Jemen-Krieg | 1 | Bürgerkrieg in Syrien
Welcher syrische Machthaber wurde im Dezember 2024 gestürzt? | Baschar al-Assad | Hafiz al-Assad | Saddam Hussein | Recep Tayyip Erdoğan | 2 | Baschar al-Assad | alt=Assad
Welches Abkommen von 2015 soll die Erderwärmung begrenzen? | Pariser Klimaabkommen | Kyoto-Protokoll | Maastricht-Vertrag | Schengener Abkommen | 1 | Übereinkommen von Paris
Auf wie viel Grad soll die Erderwärmung laut Pariser Abkommen möglichst begrenzt werden? | 1,5 Grad | 3 Grad | 5 Grad | 0,5 Grad | 1 | Übereinkommen von Paris
Welche Klimaaktivistin aus Schweden begann 2018 einen Schulstreik? | Greta Thunberg | Luisa Neubauer | Malala Yousafzai | Vanessa Nakate | 1 | Greta Thunberg | alt=Greta
Wie heißt die von ihr inspirierte Bewegung? | Fridays for Future | Extinction Rebellion | Letzte Generation | Greenpeace | 1 | Fridays for Future
Welcher Präsident führt die Ukraine seit 2019? | Wolodymyr Selenskyj | Petro Poroschenko | Viktor Janukowytsch | Vitali Klitschko | 1 | Wolodymyr Selenskyj | alt=Selenskyj
Wer ist seit 2000 (mit Unterbrechung als Premier) der starke Mann Russlands? | Wladimir Putin | Dmitri Medwedew | Boris Jelzin | Sergej Lawrow | 1 | Wladimir Putin | alt=Putin
Wer war der erste Präsident Russlands nach dem Ende der Sowjetunion? | Boris Jelzin | Wladimir Putin | Michail Gorbatschow | Dmitri Medwedew | 2 | Boris Jelzin | alt=Jelzin
Welches Land verließ 2020 als erstes die Europäische Union? | Vereinigtes Königreich | Griechenland | Ungarn | Dänemark | 1 | Brexit | alt=Großbritannien/UK
Wie heißt der aktuelle Papst (seit 2025)? | Leo XIV. | Franziskus | Benedikt XVI. | Johannes Paul II. | 1 | Leo XIV.
Welcher Papst trat 2013 als erster seit Jahrhunderten freiwillig zurück? | Benedikt XVI. | Johannes Paul II. | Franziskus | Paul VI. | 1 | Benedikt XVI. | alt=Benedikt 16
Aus welchem Land stammte Papst Franziskus? | Argentinien | Italien | Brasilien | Spanien | 1 | Franziskus (Papst)
Aus welchem Land stammt Papst Leo XIV.? | USA | Italien | Mexiko | Kanada | 2 | Leo XIV.
Welcher Tech-Unternehmer kaufte 2022 Twitter? | Elon Musk | Jeff Bezos | Mark Zuckerberg | Bill Gates | 1 | Elon Musk
Wie heißt der König der Niederlande seit 2013? | Willem-Alexander | Beatrix | Harald | Philippe | 2 | Willem-Alexander (Niederlande)
Wie heißt der König von Spanien seit 2014? | Felipe VI. | Juan Carlos I. | Carlos III. | Alfonso XIII. | 2 | Felipe VI.
Wer folgte 2022 Elizabeth II. als britisches Staatsoberhaupt? | Charles III. | William | Andrew | Edward | 1 | Charles III. | alt=Charles/Karl III.
In welchem Jahr wurde Charles III. gekrönt? | 2023 | 2022 | 2024 | 2021 | 1 | Krönung von Charles III. und Camilla
`);
})();
