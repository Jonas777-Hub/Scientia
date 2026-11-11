/* Neuzeit & Moderne – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "weltgeschichte";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const WARS = parse(`
Dreißigjähriger Krieg;1618–1648
Siebenjähriger Krieg;1756–1763
Amerikanischer Unabhängigkeitskrieg;1775–1783
Krimkrieg;1853–1856
Amerikanischer Bürgerkrieg;1861–1865
Deutsch-Französischer Krieg;1870–1871
Burenkrieg (Zweiter);1899–1902
Russisch-Japanischer Krieg;1904–1905
Erster Weltkrieg;1914–1918
Spanischer Bürgerkrieg;1936–1939
Zweiter Weltkrieg;1939–1945
Koreakrieg;1950–1953
Vietnamkrieg;1955–1975
Sechstagekrieg;1967
Jom-Kippur-Krieg;1973
Falklandkrieg;1982
Zweiter Golfkrieg (Kuwait);1990–1991
Irakkrieg;2003–2011
Einsatz in Afghanistan (US-geführt);2001–2021
`);
  table(C, WARS, { q: (w) => `Wann fand statt: ${w[0]}?`, a: (w) => w[1], pool: WARS.map((w) => w[1]), diff: (w) => (["Erster Weltkrieg", "Zweiter Weltkrieg", "Dreißigjähriger Krieg", "Vietnamkrieg", "Amerikanischer Bürgerkrieg"].includes(w[0]) ? 1 : 2) });

  const WOMEN = parse(`
Florence Nightingale;Begründerin der modernen Krankenpflege im Krimkrieg
Emmeline Pankhurst;Anführerin der britischen Suffragetten
Indira Gandhi;Erste Premierministerin Indiens
Margaret Thatcher;Erste Premierministerin Großbritanniens, „Eiserne Lady“
Golda Meir;Premierministerin Israels in den 1970ern
Coco Chanel;Französische Modeschöpferin
Frida Kahlo;Mexikanische Malerin
Hannah Arendt;Philosophin, schrieb über totalitäre Herrschaft
Simone de Beauvoir;Philosophin, schrieb „Das andere Geschlecht“
Eleanor Roosevelt;Treibende Kraft der Allgemeinen Erklärung der Menschenrechte
Rosa Luxemburg;Sozialistische Revolutionärin, 1919 ermordet
Harriet Beecher Stowe;Schrieb „Onkel Toms Hütte“ gegen die Sklaverei
Clara Zetkin;Initiatorin des Internationalen Frauentags
Mutter Teresa;Ordensfrau, die in Kalkutta Arme und Kranke pflegte
Ellen Johnson Sirleaf;Erste gewählte Präsidentin eines afrikanischen Landes (Liberia)
Wangari Maathai;Kenianische Umweltaktivistin, pflanzte Millionen Bäume
`);
  table(C, WOMEN, { q: (w) => `Wofür ist ${w[0]} bekannt?`, a: (w) => w[1], pool: WOMEN.map((w) => w[1]), mc: true, diff: (w) => (["Florence Nightingale", "Margaret Thatcher", "Coco Chanel", "Mutter Teresa", "Frida Kahlo"].includes(w[0]) ? 1 : 2), img: (w) => w[0] });

  const DOCS = parse(`
Die Unabhängigkeitserklärung der USA;1776
Die Erklärung der Menschen- und Bürgerrechte in Frankreich;1789
Das Kommunistische Manifest von Marx und Engels;1848
Lincolns Emanzipationsproklamation zur Befreiung der Sklaven;1863
Die Charta der Vereinten Nationen;1945
Die Allgemeine Erklärung der Menschenrechte;1948
Die Römischen Verträge (EWG);1957
Das Schengener Abkommen;1985
Der Vertrag von Maastricht (Europäische Union);1992
Der Vertrag von Lissabon;2007
`);
  table(C, DOCS, { q: (d) => `In welchem Jahr entstand: ${d[0]}?`, a: (d) => d[1], years: 6, max: 2025, diff: (d) => (["1776", "1789", "1948"].includes(d[1]) ? 1 : 2) });

  const EMP = parse(`
Osmanisches Reich;Konstantinopel (Istanbul)
Habsburgerreich (Österreich-Ungarn);Wien
Russisches Zarenreich (ab 1712);Sankt Petersburg
Inkareich;Cusco
Aztekenreich;Tenochtitlan
Mogulreich (zeitweise);Agra
Britisch-Indien (ab 1911);Neu-Delhi
Preußen;Berlin
Kaiserreich Japan;Tokio
Kaiserreich China (Qing-Dynastie);Peking
`);
  table(C, EMP, { q: (e) => `Welche Hauptstadt hatte das ${e[0]}?`, a: (e) => e[1], pool: EMP.map((e) => e[1]), diff: (e) => (["Osmanisches Reich", "Habsburgerreich (Österreich-Ungarn)", "Preußen"].includes(e[0]) ? 1 : 2) });

  lines(C, `
# Industrialisierung und Imperialismus
Welche Erfindung von James Watt trieb die Industrielle Revolution an? | Verbesserte Dampfmaschine | Glühbirne | Telefon | Elektromotor | 1 | Dampfmaschine
Welche Maschine mechanisierte das Spinnen von Garn (Spinning Jenny)? | Spinnmaschine | Webstuhl | Nähmaschine | Dampfhammer | 2 | Spinning Jenny
Wie nannte man Arbeiter, die aus Protest Maschinen zerstörten? | Maschinenstürmer (Ludditen) | Gewerkschafter | Streikbrecher | Pioniere | 2 | Ludditen | alt=Ludditen
Welche Kinderarbeit war in der frühen Industrialisierung üblich? | Arbeit in Fabriken und Bergwerken | Keine | Nur in Schulen | Nur am Wochenende | 1 | Kinderarbeit | mc
Wie nennt man die soziale Frage der Industrialisierung? | Elend und Ausbeutung der Arbeiter | Die Frage nach dem Wahlrecht | Die Frage nach Steuern | Die Frage der Religion | 2 | Soziale Frage | mc
Welche Bewegung gründeten Arbeiter, um bessere Löhne zu erkämpfen? | Gewerkschaften | Zünfte | Gilden | Orden | 1 | Gewerkschaft
Welcher Philosoph begründete mit Engels den Marxismus? | Karl Marx | Max Weber | Hegel | Lenin | 1 | Karl Marx
In welcher Stadt fand 1884/85 die Konferenz zur Aufteilung Afrikas statt? | Berlin | London | Paris | Brüssel | 1 | Kongokonferenz
Welcher belgische König beutete den Kongo brutal als Privatbesitz aus? | Leopold II. | Albert I. | Baudouin | Philippe | 2 | Leopold II. (Belgien)
Welche zwei afrikanischen Länder blieben im Imperialismus weitgehend unabhängig? | Äthiopien und Liberia | Ägypten und Marokko | Kenia und Nigeria | Ghana und Senegal | 2 | Schlacht von Adua | mc
Gegen wen führte China die Opiumkriege im 19. Jahrhundert? | Großbritannien | Japan | Russland | Frankreich allein | 2 | Opiumkriege
Welche Stadt musste China nach dem Ersten Opiumkrieg an Großbritannien abtreten? | Hongkong | Shanghai | Macau | Kanton | 1 | Hongkong
Wie nennt man die Modernisierung Japans ab 1868? | Meiji-Restauration | Kulturrevolution | Shogunat | Edo-Zeit | 2 | Meiji-Restauration
Welcher US-Offizier erzwang 1853 die Öffnung Japans mit „schwarzen Schiffen“? | Matthew Perry | George Dewey | Douglas MacArthur | James Cook | 2 | Matthew C. Perry
Welches Reich nannte man den „kranken Mann am Bosporus“? | Osmanisches Reich | Russland | Österreich | Persien | 2 | Kranker Mann am Bosporus
Welcher Kanal wurde 1869 eröffnet und verkürzte den Seeweg nach Asien? | Suezkanal | Panamakanal | Nord-Ostsee-Kanal | Korinth-Kanal | 1 | Sueskanal
Welcher Kanal wurde 1914 eröffnet? | Panamakanal | Suezkanal | Kiel-Kanal | Erie-Kanal | 1 | Panamakanal
Welcher Goldrausch lockte 1848/49 Zehntausende nach Kalifornien? | Kalifornischer Goldrausch | Klondike-Goldrausch | Australischer Goldrausch | Transvaal-Goldrausch | 1 | Kalifornischer Goldrausch
Welche Insel in New York war Ankunftsort für Millionen Einwanderer? | Ellis Island | Liberty Island | Long Island | Staten Island | 1 | Ellis Island
Welche Hungersnot trieb in den 1840ern Millionen Iren zur Auswanderung? | Große Hungersnot (Kartoffelfäule) | Pest | Krieg | Erdbeben | 1 | Große Hungersnot in Irland | mc
Welches Schiff sank 1912 nach Kollision mit einem Eisberg? | Titanic | Lusitania | Britannic | Olympic | 1 | RMS Titanic
Welcher Börsencrash 1929 löste die Weltwirtschaftskrise aus? | Schwarzer Donnerstag/Freitag an der Wall Street | Lehman-Pleite | Tulpenkrise | Dotcom-Blase | 1 | Schwarzer Donnerstag | mc
Wie hieß das Programm, mit dem Franklin D. Roosevelt die Krise bekämpfte? | New Deal | Marshallplan | Great Society | Fair Deal | 1 | New Deal
# Europa und die EU
Welche Gemeinschaft wurde 1951 für Kohle und Stahl gegründet? | Montanunion (EGKS) | EWG | Euratom | EFTA | 2 | Europäische Gemeinschaft für Kohle und Stahl
Wie viele Gründungsstaaten hatte die EWG 1957? | 6 | 12 | 3 | 9 | 1 | Europäische Wirtschaftsgemeinschaft
Welche Länder gründeten mit Deutschland, Frankreich und Italien die EWG? | Belgien, Niederlande, Luxemburg | Spanien, Portugal, Griechenland | Dänemark, Irland, Großbritannien | Österreich, Schweiz, Schweden | 2 | Benelux | mc
Wann traten Großbritannien, Irland und Dänemark der EG bei? | 1973 | 1957 | 1986 | 1995 | 2 | EU-Erweiterung 1973
Welche Länder traten 1995 der EU bei? | Österreich, Schweden, Finnland | Polen, Ungarn, Tschechien | Spanien, Portugal | Norwegen, Island | 2 | EU-Erweiterung 1995 | mc
Welches Land stimmte zweimal gegen einen EU-Beitritt? | Norwegen | Schweiz | Island | Dänemark | 2 | Norwegen
Welches ist das jüngste EU-Mitglied (2013)? | Kroatien | Rumänien | Bulgarien | Slowenien | 1 | Kroatien
Welche Gründerväter der EU stammten aus Frankreich und erklärten 1950 die Montanunion? | Robert Schuman und Jean Monnet | Charles de Gaulle und Mitterrand | Adenauer und de Gasperi | Spaak und Churchill | 2 | Schuman-Erklärung | mc
An welchem Tag wird der Europatag (Schuman-Erklärung) gefeiert? | 9. Mai | 3. Oktober | 1. Januar | 8. Mai | 2 | Europatag
Wer war die erste Präsidentin der EU-Kommission? | Ursula von der Leyen | Angela Merkel | Christine Lagarde | Roberta Metsola | 1 | Ursula von der Leyen | alt=von der Leyen
Wer leitet seit 2019 die Europäische Zentralbank? | Christine Lagarde | Mario Draghi | Ursula von der Leyen | Jean-Claude Trichet | 2 | Christine Lagarde | alt=Lagarde
Welche Länder nutzen den Euro, obwohl sie nicht in der EU sind (Beispiel)? | Montenegro und Kosovo | Schweiz und Norwegen | Großbritannien und Island | Serbien und Albanien | 2 | Euro | mc
Welches Abkommen ermöglicht Reisen ohne Grenzkontrollen in Europa? | Schengener Abkommen | Maastricht-Vertrag | Dubliner Übereinkommen | Lissabon-Vertrag | 1 | Schengener Abkommen
Was bedeutet „Brexit“? | Der Austritt Großbritanniens aus der EU | Ein britisches Frühstück | Ein Börsencrash | Ein Fußballturnier | 1 | Brexit | mc
Wer war britischer Premierminister beim Brexit-Austritt 2020? | Boris Johnson | Theresa May | David Cameron | Rishi Sunak | 1 | Boris Johnson | alt=Johnson
Welcher britische Premier hielt 2016 das Brexit-Referendum ab? | David Cameron | Theresa May | Tony Blair | Gordon Brown | 2 | David Cameron | alt=Cameron
Welcher britische Premier gewann 2024 die Wahl für Labour? | Keir Starmer | Rishi Sunak | Jeremy Corbyn | Tony Blair | 2 | Keir Starmer | alt=Starmer
Welcher französische Präsident regiert seit 2017? | Emmanuel Macron | François Hollande | Nicolas Sarkozy | Jacques Chirac | 1 | Emmanuel Macron | alt=Macron
Welcher französische General und Präsident gründete die Fünfte Republik? | Charles de Gaulle | François Mitterrand | Georges Pompidou | Jacques Chirac | 2 | Charles de Gaulle | alt=de Gaulle
Welche Stadt ist Sitz des Europarats und des Europäischen Gerichtshofs für Menschenrechte? | Straßburg | Brüssel | Luxemburg | Den Haag | 2 | Europarat
# Nahost und Asien
Wer rief 1948 den Staat Israel aus? | David Ben-Gurion | Golda Meir | Theodor Herzl | Jitzchak Rabin | 2 | David Ben-Gurion | alt=Ben-Gurion
Wer gilt als Begründer des politischen Zionismus („Der Judenstaat“)? | Theodor Herzl | David Ben-Gurion | Chaim Weizmann | Moses Mendelssohn | 2 | Theodor Herzl | alt=Herzl
Welcher israelische Premier wurde 1995 ermordet? | Jitzchak Rabin | Schimon Peres | Menachem Begin | Ariel Scharon | 2 | Jitzchak Rabin | alt=Rabin
Wer erhielt 1994 mit Rabin und Peres den Friedensnobelpreis? | Jassir Arafat | Anwar as-Sadat | König Hussein | Mahmud Abbas | 2 | Jassir Arafat | alt=Arafat
Welches Abkommen schlossen Israel und Ägypten 1978 unter US-Vermittlung? | Camp-David-Abkommen | Oslo-Abkommen | Abraham-Abkommen | Genfer Abkommen | 2 | Camp-David-Abkommen
Welcher Terrorangriff der Hamas auf Israel führte im Oktober 2023 zum Gaza-Krieg? | Der Angriff vom 7. Oktober | Der Sechstagekrieg | Die erste Intifada | Der Jom-Kippur-Krieg | 2 | Terrorangriff der Hamas auf Israel 2023 | mc
Welche Revolution machte 1979 aus dem Iran eine Islamische Republik? | Islamische Revolution | Grüne Revolution | Weiße Revolution | Zedernrevolution | 2 | Islamische Revolution
Welcher Schah musste 1979 aus dem Iran fliehen? | Mohammad Reza Pahlavi | Ruhollah Chomeini | Reza Khan | Ali Chamenei | 2 | Mohammad Reza Pahlavi
Welcher Diktator regierte Kambodscha mit den Roten Khmer (Völkermord)? | Pol Pot | Ho Chi Minh | Kim Il-sung | Suharto | 2 | Pol Pot
Wer gründete Nordkorea und regierte bis 1994? | Kim Il-sung | Kim Jong-il | Kim Jong-un | Syngman Rhee | 2 | Kim Il-sung
Welcher vietnamesische Revolutionär ist Namensgeber der früheren Stadt Saigon? | Ho Chi Minh | Pol Pot | Ngo Dinh Diem | Vo Nguyen Giap | 1 | Ho Chi Minh
Welcher Staat Asiens wurde 1965 aus der Föderation mit Malaysia ausgeschlossen und unabhängig? | Singapur | Brunei | Indonesien | Philippinen | 2 | Singapur
Welche Katastrophe traf 2004 die Küsten des Indischen Ozeans? | Tsunami | Hurrikan | Vulkanausbruch | Hitzewelle | 1 | Erdbeben im Indischen Ozean 2004
Welche Stadt wurde 1945 als erste von einer Atombombe getroffen? | Hiroshima | Nagasaki | Tokio | Osaka | 1 | Hiroshima
# Afrika und Amerika
Welches Land wurde 1957 als erstes in Subsahara-Afrika unabhängig? | Ghana | Nigeria | Kenia | Senegal | 2 | Ghana
Wer führte Ghana in die Unabhängigkeit? | Kwame Nkrumah | Jomo Kenyatta | Julius Nyerere | Patrice Lumumba | 2 | Kwame Nkrumah | alt=Nkrumah
Wer war der erste Präsident Kenias? | Jomo Kenyatta | Kwame Nkrumah | Daniel arap Moi | Uhuru Kenyatta | 2 | Jomo Kenyatta | alt=Kenyatta
Welcher Völkermord ereignete sich 1994 in Afrika? | In Ruanda | In Kenia | In Ghana | In Marokko | 1 | Völkermord in Ruanda
Welche Organisation gründeten afrikanische Staaten 2002 als Nachfolger der OAU? | Afrikanische Union | Commonwealth | Arabische Liga | ECOWAS | 2 | Afrikanische Union
Welcher Diktator regierte Chile nach dem Putsch 1973? | Augusto Pinochet | Salvador Allende | Juan Perón | Fidel Castro | 2 | Augusto Pinochet | alt=Pinochet
Welcher chilenische Präsident starb beim Putsch 1973? | Salvador Allende | Augusto Pinochet | Pablo Neruda | Michelle Bachelet | 2 | Salvador Allende | alt=Allende
Welche Präsidentengattin wurde in Argentinien als „Evita“ verehrt? | Eva Perón | Isabel Perón | Cristina Kirchner | Frida Kahlo | 1 | Eva Perón
Um welche Inseln kämpften Großbritannien und Argentinien 1982? | Falklandinseln | Galápagos-Inseln | Feuerland | Osterinsel | 1 | Falklandinseln
Welcher US-Präsident führte das Land in den Vietnamkrieg (Eskalation 1965)? | Lyndon B. Johnson | John F. Kennedy | Richard Nixon | Dwight D. Eisenhower | 2 | Lyndon B. Johnson | alt=Johnson
Welche Affäre um einen Einbruch in Washington stürzte Nixon? | Watergate | Iran-Contra | Lewinsky | Whitewater | 1 | Watergate-Affäre
Welche Mauer ließ Donald Trump an der Grenze zu Mexiko ausbauen? | Grenzmauer zu Mexiko | Berliner Mauer | Hadrianswall | Chinesische Mauer | 1 | Grenzbefestigung zwischen den Vereinigten Staaten und Mexiko | mc
Welcher Sturm auf ein Parlamentsgebäude erschütterte die USA am 6. Januar 2021? | Sturm auf das Kapitol | Sturm auf das Weiße Haus | Sturm auf die Bastille | Sturm aufs Pentagon | 1 | Sturm auf das Kapitol in Washington 2021
Welche Bewegung gegen Polizeigewalt entstand in den USA? | Black Lives Matter | Me Too | Occupy Wall Street | Tea Party | 1 | Black Lives Matter
Welche Bewegung gegen sexuelle Belästigung verbreitete sich 2017 weltweit? | MeToo | Black Lives Matter | Fridays for Future | Occupy | 1 | MeToo
Welches soziale Netzwerk gründete Mark Zuckerberg 2004? | Facebook | Instagram | Twitter | MySpace | 1 | Facebook
Welche Website startete 2001 und wurde zur größten Enzyklopädie? | Wikipedia | Google | Britannica Online | Yahoo | 1 | Wikipedia
Welches Gerät veränderte ab 2007 den Alltag vieler Menschen? | Smartphone (iPhone) | Faxgerät | Walkman | Videorekorder | 1 | iPhone (1. Generation) | mc
Welches Virus löste ab Ende 2019 eine weltweite Pandemie aus? | SARS-CoV-2 | H1N1 | Ebola | Zika | 1 | SARS-CoV-2 | alt=Corona/Coronavirus
Welche Impfstoff-Technik wurde in der Corona-Pandemie erstmals breit eingesetzt? | mRNA-Impfstoffe | Lebendimpfstoffe | Schluckimpfung | Pockenimpfung | 1 | mRNA-Impfstoff | mc
Welches deutsche Unternehmen entwickelte mit Pfizer einen Corona-Impfstoff? | BioNTech | CureVac | Bayer | Merck | 1 | BioNTech
Wie heißt die Mission, mit der die NASA wieder Menschen zum Mond bringen will? | Artemis | Apollo | Gemini | Orion allein | 1 | Artemis-Programm
Welcher Rover landete 2021 auf dem Mars und brachte einen kleinen Hubschrauber mit? | Perseverance | Curiosity | Opportunity | Spirit | 2 | Perseverance (Rover)
`);
})();
