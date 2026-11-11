/* Weltkriege – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "weltkriege";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  // Schlacht; Jahr; Krieg (1|2); Land/Ort; Bild
  const BAT = parse(`
Schlacht bei Tannenberg;1914;1;Ostpreußen (heute Polen);Schlacht bei Tannenberg (1914)
Erste Schlacht an der Marne;1914;1;Frankreich;Erste Marneschlacht
Schlacht von Gallipoli;1915;1;Osmanisches Reich (heute Türkei);Schlacht von Gallipoli
Schlacht um Verdun;1916;1;Frankreich;Schlacht um Verdun
Schlacht an der Somme;1916;1;Frankreich;Schlacht an der Somme
Skagerrakschlacht (Seeschlacht);1916;1;Nordsee vor Dänemark;Skagerrakschlacht
Schlacht von Passchendaele (Flandern);1917;1;Belgien;Dritte Flandernschlacht
Schlacht von Caporetto (Karfreit);1917;1;Italien (heute Slowenien);Zwölfte Isonzoschlacht
Schlacht von Cambrai (erster großer Panzereinsatz);1917;1;Frankreich;Schlacht von Cambrai (1917)
Schlacht bei Amiens;1918;1;Frankreich;Schlacht bei Amiens (1918)
Schlacht von Dünkirchen;1940;2;Frankreich;Schlacht von Dünkirchen
Luftschlacht um England;1940;2;Großbritannien;Luftschlacht um England
Schlacht um Narvik;1940;2;Norwegen;Schlacht um Narvik
Luftlandeschlacht um Kreta;1941;2;Griechenland;Luftlandeschlacht um Kreta
Angriff auf Pearl Harbor;1941;2;USA (Hawaii);Angriff auf Pearl Harbor
Schlacht um Moskau;1941;2;Sowjetunion;Schlacht um Moskau
Schlacht um Midway;1942;2;Pazifik;Schlacht um Midway
Zweite Schlacht von El Alamein;1942;2;Ägypten;Zweite Schlacht von El Alamein
Schlacht um Guadalcanal;1942;2;Salomonen;Schlacht um Guadalcanal
Schlacht bei Kursk;1943;2;Sowjetunion;Unternehmen Zitadelle
Schlacht um Monte Cassino;1944;2;Italien;Schlacht um Monte Cassino
Landung in der Normandie (D-Day);1944;2;Frankreich;Operation Overlord
Operation Market Garden (Arnheim);1944;2;Niederlande;Operation Market Garden
Ardennenoffensive;1944;2;Belgien;Ardennenoffensive
Schlacht um Iwojima;1945;2;Japan;Schlacht um Iwojima
Schlacht um Okinawa;1945;2;Japan;Schlacht um Okinawa
Schlacht um Berlin;1945;2;Deutschland;Schlacht um Berlin
Schlacht von Stalingrad;1942–1943;2;Sowjetunion;Schlacht von Stalingrad
Belagerung von Leningrad;1941–1944;2;Sowjetunion;Leningrader Blockade
`);
  const BYEARS = [...new Set(BAT.map((b) => b[1]))];
  table(C, BAT, { q: (b) => `Wann fand diese Schlacht statt: ${b[0]}?`, a: (b) => b[1], pool: (b) => BAT.filter((x) => x[2] === b[2]).map((x) => x[1]), diff: (b) => (["Angriff auf Pearl Harbor", "Landung in der Normandie (D-Day)", "Schlacht um Verdun", "Schlacht von Stalingrad", "Schlacht um Berlin"].includes(b[0]) ? 1 : 2), img: (b) => b[4] });
  table(C, BAT, { q: (b) => `In welchem Krieg fand statt: ${b[0]}?`, a: (b) => (b[2] === "1" ? "Erster Weltkrieg" : "Zweiter Weltkrieg"), wrong: (b) => [b[2] === "1" ? "Zweiter Weltkrieg" : "Erster Weltkrieg", "Deutsch-Französischer Krieg", "Kalter Krieg"], diff: (b) => (["Schlacht um Verdun", "Schlacht von Stalingrad", "Landung in der Normandie (D-Day)", "Angriff auf Pearl Harbor"].includes(b[0]) ? 1 : 2), img: (b) => b[4] });
  // Für die Kriegsfrage soll die jeweils andere Weltkriegs-Option dabei sein
  table(C, BAT, { q: (b) => `Wo (Land/Gebiet) fand statt: ${b[0]}?`, a: (b) => b[3], pool: [...new Set(BAT.map((b) => b[3]))], diff: (b) => (["Landung in der Normandie (D-Day)", "Angriff auf Pearl Harbor", "Schlacht um Verdun", "Schlacht von Stalingrad", "Schlacht um Berlin"].includes(b[0]) ? 1 : 2), img: (b) => b[4] });
  void BYEARS;

  const LEAD = parse(`
Deutschland;Adolf Hitler
Italien;Benito Mussolini
Großbritannien (ab 1940);Winston Churchill
Sowjetunion;Josef Stalin
USA (bis April 1945);Franklin D. Roosevelt
USA (ab April 1945);Harry S. Truman
Japan (Kaiser);Hirohito
Freies Frankreich (Exil);Charles de Gaulle
Vichy-Frankreich;Philippe Pétain
China (Republik);Chiang Kai-shek
Jugoslawische Partisanen;Josip Broz Tito
Spanien (neutral);Francisco Franco
`);
  table(C, LEAD, { q: (l) => `Wer führte im Zweiten Weltkrieg: ${l[0]}?`, a: (l) => l[1], pool: LEAD.map((l) => l[1]), diff: (l) => (["Deutschland", "Italien", "Großbritannien (ab 1940)", "Sowjetunion"].includes(l[0]) ? 1 : 2), img: (l) => l[1] });
  table(C, LEAD, { q: (l) => `Welches Land bzw. welche Bewegung führte ${l[1]} im Zweiten Weltkrieg?`, a: (l) => l[0], pool: LEAD.map((l) => l[0]), mc: true, diff: (l) => (["Adolf Hitler", "Benito Mussolini", "Winston Churchill", "Josef Stalin"].includes(l[1]) ? 1 : 2), img: (l) => l[1] });

  const GEN = parse(`
Erwin Rommel;Deutschland;„Wüstenfuchs“ in Nordafrika
Bernard Montgomery;Großbritannien;Sieger von El Alamein
Dwight D. Eisenhower;USA;Oberbefehlshaber der Landung in der Normandie
George S. Patton;USA;Panzergeneral in Nordafrika und Frankreich
Douglas MacArthur;USA;Oberbefehlshaber im Südwestpazifik
Georgi Schukow;Sowjetunion;Eroberer Berlins 1945
Isoroku Yamamoto;Japan;Planer des Angriffs auf Pearl Harbor
Heinz Guderian;Deutschland;Begründer der deutschen Panzertruppe
Friedrich Paulus;Deutschland;Befehlshaber der 6. Armee in Stalingrad
Karl Dönitz;Deutschland;Oberbefehlshaber der Kriegsmarine und Hitlers Nachfolger
Chester W. Nimitz;USA;Oberbefehlshaber der US-Pazifikflotte
Ferdinand Foch;Frankreich;Alliierter Oberbefehlshaber 1918
Douglas Haig;Großbritannien;Britischer Oberbefehlshaber an der Westfront im Ersten Weltkrieg
Erich Ludendorff;Deutschland;Generalquartiermeister im Ersten Weltkrieg
Manfred von Richthofen;Deutschland;Jagdflieger „Roter Baron“
T. E. Lawrence;Großbritannien;„Lawrence von Arabien“
Philippe Pétain;Frankreich;„Held von Verdun“, später Chef des Vichy-Regimes
Paul von Hindenburg;Deutschland;Sieger von Tannenberg
`);
  table(C, GEN, { q: (g) => `Für welches Land kämpfte ${g[0]}?`, a: (g) => g[1], pool: ["Deutschland", "Großbritannien", "USA", "Sowjetunion", "Japan", "Frankreich", "Italien"], diff: (g) => (["Erwin Rommel", "Dwight D. Eisenhower", "Manfred von Richthofen", "Bernard Montgomery"].includes(g[0]) ? 1 : 2), img: (g) => g[0] });
  table(C, GEN, { q: (g) => `Wofür ist ${g[0]} bekannt?`, a: (g) => g[2], pool: GEN.map((g) => g[2]), mc: true, diff: (g) => (["Erwin Rommel", "Manfred von Richthofen", "T. E. Lawrence", "Dwight D. Eisenhower"].includes(g[0]) ? 1 : 2), img: (g) => g[0] });

  const SIDE1 = parse(`
Österreich-Ungarn;Mittelmächte
Osmanisches Reich;Mittelmächte
Bulgarien;Mittelmächte
Frankreich;Entente (Alliierte)
Russland;Entente (Alliierte)
Großbritannien;Entente (Alliierte)
Japan;Entente (Alliierte)
USA (ab 1917);Entente (Alliierte)
Serbien;Entente (Alliierte)
Belgien;Entente (Alliierte)
Schweiz;neutral
Niederlande;neutral
Spanien;neutral
Schweden;neutral
`);
  table(C, SIDE1, { q: (s) => `Auf welcher Seite stand ${s[0]} im Ersten Weltkrieg?`, a: (s) => s[1], wrong: (s) => ["Mittelmächte", "Entente (Alliierte)", "neutral", "Achsenmächte"].filter((x) => x !== s[1]).slice(0, 3), diff: (s) => (["Österreich-Ungarn", "Frankreich", "Großbritannien", "Schweiz", "Russland"].includes(s[0]) ? 1 : 2), mc: true });
  const SIDE2 = parse(`
Japan;Achsenmächte
Ungarn;Achsenmächte
Bulgarien;Achsenmächte
Polen;Alliierte
Kanada;Alliierte
Australien;Alliierte
China;Alliierte
Sowjetunion (ab 1941);Alliierte
Brasilien;Alliierte
Norwegen;Alliierte
Schweiz;neutral
Schweden;neutral
Spanien;neutral
Portugal;neutral
Irland;neutral
`);
  table(C, SIDE2, { q: (s) => `Auf welcher Seite stand ${s[0]} im Zweiten Weltkrieg?`, a: (s) => s[1], wrong: (s) => ["Achsenmächte", "Alliierte", "neutral", "Mittelmächte"].filter((x) => x !== s[1]).slice(0, 3), diff: (s) => (["Japan", "Polen", "Schweiz", "Kanada"].includes(s[0]) ? 1 : 2), mc: true });

  const TECH = parse(`
Kampfpanzer Tiger;Deutschland;Panzerkampfwagen VI Tiger
Kampfpanzer T-34;Sowjetunion;T-34
Kampfpanzer M4 Sherman;USA;M4 Sherman
Jagdflugzeug Spitfire;Großbritannien;Supermarine Spitfire
Jagdflugzeug Messerschmitt Bf 109;Deutschland;Messerschmitt Bf 109
Jagdflugzeug Mitsubishi A6M „Zero“;Japan;Mitsubishi A6M
Bomber B-17 „Flying Fortress“;USA;Boeing B-17
Sturzkampfbomber Ju 87 „Stuka“;Deutschland;Junkers Ju 87
Schlachtschiff Bismarck;Deutschland;Bismarck (Schiff, 1939)
Schlachtschiff Yamato;Japan;Yamato (Schiff)
Rakete V2;Deutschland;Aggregat 4
Raketenwerfer „Katjuscha“;Sowjetunion;Katjuscha (Raketenwerfer)
Jeep (Willys MB);USA;Willys MB
Strahlflugzeug Me 262;Deutschland;Messerschmitt Me 262
Flugzeugträger USS Enterprise (CV-6);USA;USS Enterprise (CV-6)
Fokker Dr.I (Dreidecker des Roten Barons);Deutschland;Fokker Dr.I
`);
  table(C, TECH, { q: (t) => `Aus welchem Land stammte: ${t[0]}?`, a: (t) => t[1], pool: ["Deutschland", "USA", "Sowjetunion", "Großbritannien", "Japan", "Italien", "Frankreich"], diff: (t) => (["Kampfpanzer Tiger", "Jagdflugzeug Spitfire", "Rakete V2", "Schlachtschiff Bismarck", "Jeep (Willys MB)"].includes(t[0]) ? 1 : 2), img: (t) => t[2] });

  const EV = parse(`
Der Erste Weltkrieg beginnt;1914
Italien tritt auf Seiten der Entente in den Krieg ein;1915
Der Untergang der Lusitania empört die USA;1915
Die USA treten in den Ersten Weltkrieg ein;1917
Die Oktoberrevolution bringt die Bolschewiki an die Macht;1917
Russland schließt den Frieden von Brest-Litowsk;1918
Der Erste Weltkrieg endet mit einem Waffenstillstand;1918
Der Versailler Vertrag wird unterzeichnet;1919
Der Völkerbund wird gegründet;1920
Mussolini marschiert auf Rom und übernimmt die Macht;1922
Japan besetzt die Mandschurei;1931
Hitler wird Reichskanzler;1933
Italien überfällt Abessinien (Äthiopien);1935
Der Spanische Bürgerkrieg beginnt;1936
Deutschland „schließt“ Österreich an;1938
Das Münchner Abkommen wird geschlossen;1938
Der Hitler-Stalin-Pakt wird unterzeichnet;1939
Deutschland überfällt Polen;1939
Deutschland besetzt Frankreich;1940
Deutschland überfällt die Sowjetunion;1941
Japan greift Pearl Harbor an;1941
Die Wannseekonferenz findet statt;1942
Die 6. Armee kapituliert in Stalingrad;1943
Die Alliierten landen in Sizilien;1943
Die Alliierten landen in der Normandie;1944
Das Attentat vom 20. Juli scheitert;1944
Die Konferenz von Jalta findet statt;1945
Das Konzentrationslager Auschwitz wird befreit;1945
Deutschland kapituliert bedingungslos;1945
Atombomben fallen auf Hiroshima und Nagasaki;1945
Die Vereinten Nationen werden gegründet;1945
Die Nürnberger Prozesse beginnen;1945
`);
  table(C, EV, { q: (e) => `In welchem Jahr: ${e[0]}?`, a: (e) => e[1], years: 4, min: 1910, max: 1950, diff: (e) => (["1914", "1918", "1939", "1945", "1933", "1941"].includes(e[1]) && !e[0].includes("Jalta") && !e[0].includes("Nürnberger") ? 1 : 2) });

  lines(C, `
# Erster Weltkrieg
Wie nannte man den Ersten Weltkrieg in Frankreich und Großbritannien oft? | Der Große Krieg | Der Blitzkrieg | Der Kalte Krieg | Der Siebenjährige Krieg | 1 | Erster Weltkrieg
Welche zwei Länder bildeten mit Deutschland den Kern der Mittelmächte? | Österreich-Ungarn und Osmanisches Reich | Italien und Japan | Russland und Bulgarien | Spanien und Schweden | 1 | Mittelmächte | mc
Welche drei Länder bildeten zu Kriegsbeginn 1914 die Entente? | Frankreich, Großbritannien, Russland | Frankreich, Italien, USA | Großbritannien, Japan, USA | Russland, Serbien, Italien | 1 | Triple Entente | mc
Welches Land erklärte Serbien 1914 zuerst den Krieg? | Österreich-Ungarn | Deutschland | Russland | Osmanisches Reich | 1 | Julikrise
Wie nennt man die Wochen diplomatischer Krise im Sommer 1914? | Julikrise | Augustkrise | Marokkokrise | Balkankrise | 2 | Julikrise
Welche Hoffnung hatten viele Soldaten 1914 über die Dauer des Krieges? | Zu Weihnachten wieder zu Hause zu sein | Zehn Jahre zu kämpfen | Nie zurückzukehren | Erst 1920 heimzukehren | 1 | Erster Weltkrieg | mc
Was geschah an Weihnachten 1914 an Teilen der Westfront? | Ein inoffizieller Waffenstillstand | Eine Großoffensive | Der Kriegseintritt der USA | Der erste Gasangriff | 1 | Weihnachtsfrieden (Erster Weltkrieg) | mc
Wo setzte Deutschland 1915 erstmals in großem Umfang Giftgas (Chlorgas) ein? | Bei Ypern | Bei Verdun | An der Somme | In Gallipoli | 2 | Zweite Flandernschlacht
Wie hieß das Gas, das nach dem Ort Ypern benannt wurde? | Senfgas (Yperit) | Chlorgas | Zyklon B | Lachgas | 2 | Schwefellost
Wie nannte man das Gebiet zwischen den gegnerischen Schützengräben? | Niemandsland | Grenzland | Todeszone | Grabenfeld | 1 | Niemandsland
Wie nannte man die Schlacht um Verdun wegen der hohen Verluste? | Die „Hölle von Verdun“ (Blutpumpe) | Die Schlacht der Könige | Der Blitzkrieg | Das Wunder an der Marne | 2 | Schlacht um Verdun | mc
Welches Passagierschiff wurde 1915 von einem deutschen U-Boot versenkt? | Lusitania | Titanic | Britannic | Queen Mary | 1 | RMS Lusitania
Wie hieß das Telegramm, mit dem Deutschland 1917 Mexiko zum Krieg gegen die USA bewegen wollte? | Zimmermann-Telegramm | Emser Depesche | Krüger-Depesche | Hoßbach-Protokoll | 2 | Zimmermann-Telegramm
Welche Großmacht schied 1918 nach einer Revolution aus dem Krieg aus? | Russland | Frankreich | Italien | Japan | 1 | Friede von Brest-Litowsk
In welchem Eisenbahnwagen wurde 1918 der Waffenstillstand unterzeichnet? | Im Wald von Compiègne | In Versailles | In Berlin | In Spa | 2 | Waffenstillstand von Compiègne (1918)
An welchem Datum und zu welcher Uhrzeit trat der Waffenstillstand 1918 in Kraft? | 11. November, 11 Uhr | 1. Mai, 12 Uhr | 9. November, 9 Uhr | 31. Dezember, Mitternacht | 1 | Waffenstillstand von Compiègne (1918) | mc
Welche Krankheit tötete 1918–1920 weltweit mehr Menschen als der Krieg? | Spanische Grippe | Pest | Cholera | Tuberkulose | 1 | Spanische Grippe
Welcher Paragraf des Versailler Vertrags gab Deutschland die Alleinschuld? | Artikel 231 | Artikel 48 | Artikel 1 | Artikel 100 | 2 | Friedensvertrag von Versailles
Wie viele Soldaten durfte die deutsche Armee nach Versailles höchstens haben? | 100.000 | 500.000 | 1 Million | 10.000 | 2 | Reichswehr
Welches Reich zerfiel nach dem Ersten Weltkrieg in mehrere Staaten? | Österreich-Ungarn | Großbritannien | Frankreich | Japan | 1 | Österreich-Ungarn
Welcher US-Präsident stellte 1918 seine „14 Punkte“ für den Frieden vor? | Woodrow Wilson | Theodore Roosevelt | Franklin D. Roosevelt | Herbert Hoover | 1 | Woodrow Wilson | alt=Wilson
Welche Organisation sollte nach dem Ersten Weltkrieg den Frieden sichern? | Völkerbund | Vereinte Nationen | NATO | Europarat | 1 | Völkerbund
In welcher Stadt hatte der Völkerbund seinen Sitz? | Genf | New York | Paris | Den Haag | 2 | Palais des Nations
Wie viele Menschen starben im Ersten Weltkrieg ungefähr? | Etwa 17 Millionen | Etwa 1 Million | Etwa 60 Millionen | Etwa 200.000 | 2 | Erster Weltkrieg | mc
Welches neue Kriegsmittel kam im Ersten Weltkrieg zum Einsatz? | Flugzeuge, Panzer und Giftgas | Atombomben | Drohnen | Raketen mit Satelliten | 1 | Erster Weltkrieg | mc
Wie heißt die rote Blume, die in Großbritannien an die Kriegstoten erinnert? | Mohnblume | Rose | Tulpe | Nelke | 1 | Remembrance Poppy
Welcher Roman von Erich Maria Remarque handelt vom Ersten Weltkrieg? | Im Westen nichts Neues | Die Blechtrommel | Der Untertan | Stahlgewitter | 1 | Im Westen nichts Neues
Welcher Autor schrieb „In Stahlgewittern“ über seine Kriegserlebnisse? | Ernst Jünger | Erich Maria Remarque | Thomas Mann | Ludwig Renn | 2 | Ernst Jünger | alt=Jünger
# Zwischenkriegszeit
Wie nannte man die Politik Großbritanniens, Hitler durch Zugeständnisse zu besänftigen? | Appeasement | Containment | Détente | Blitzkrieg | 1 | Appeasement
Welcher britische Premier verkündete 1938 „Peace for our time“? | Neville Chamberlain | Winston Churchill | Stanley Baldwin | Clement Attlee | 2 | Neville Chamberlain | alt=Chamberlain
Welches Gebiet der Tschechoslowakei bekam Deutschland 1938? | Sudetenland | Böhmen komplett | Slowakei | Mähren | 1 | Sudetenland
Welche Einheit Hitlers und Mussolinis entstand 1936? | Achse Berlin–Rom | Entente cordiale | Kleine Entente | Dreibund | 2 | Achsenmächte
Welche deutsche Fliegertruppe bombardierte 1937 im Spanischen Bürgerkrieg Guernica? | Legion Condor | Luftflotte Süd | Jagdgeschwader Richthofen | Afrikakorps | 2 | Legion Condor
Was vereinbarten Hitler und Stalin 1939 in einem geheimen Zusatzprotokoll? | Die Aufteilung Osteuropas | Einen Handel mit Getreide | Den Austausch von Ministern | Eine gemeinsame Mondmission | 1 | Hitler-Stalin-Pakt | mc
# Zweiter Weltkrieg
Wie nannte man die schnelle deutsche Kriegsführung mit Panzern und Flugzeugen? | Blitzkrieg | Stellungskrieg | Grabenkrieg | Kalter Krieg | 1 | Blitzkrieg
Welcher Vorfall diente als Vorwand für den Überfall auf Polen? | Der fingierte Überfall auf den Sender Gleiwitz | Der Reichstagsbrand | Die Ermordung Rathenaus | Der Untergang der Bismarck | 2 | Überfall auf den Sender Gleiwitz
Welche Länder erklärten Deutschland 1939 nach dem Überfall auf Polen den Krieg? | Großbritannien und Frankreich | USA und Kanada | Sowjetunion und Japan | Italien und Spanien | 1 | Zweiter Weltkrieg | mc
Wie nannte man die Phase 1939/40 an der Westfront, in der kaum gekämpft wurde? | Sitzkrieg | Blitzkrieg | Bombenkrieg | Partisanenkrieg | 2 | Sitzkrieg
Wie hieß die Evakuierung britischer Truppen aus Dünkirchen 1940? | Operation Dynamo | Operation Overlord | Operation Seelöwe | Operation Barbarossa | 2 | Operation Dynamo
Wie hieß der deutsche Plan zur Invasion Großbritanniens? | Unternehmen Seelöwe | Unternehmen Barbarossa | Fall Gelb | Fall Weiß | 2 | Unternehmen Seelöwe
Wie hieß der deutsche Überfall auf Polen im Planungscode? | Fall Weiß | Fall Gelb | Fall Blau | Fall Rot | 2 | Überfall auf Polen
Welches Lend-Lease-Programm unterstützte Großbritannien und die Sowjetunion? | Leih- und Pachtgesetz der USA | Marshallplan | Dawes-Plan | Truman-Doktrin | 2 | Leih- und Pachtgesetz | mc
Was beschlossen Churchill und Roosevelt 1941 in der Atlantik-Charta? | Grundsätze für eine Nachkriegsordnung | Die Teilung Deutschlands | Den Bau der Atombombe | Ein Bündnis mit Japan | 2 | Atlantik-Charta | mc
Wie hieß das deutsche Korps in Nordafrika? | Afrikakorps | Legion Condor | Waffen-SS | Wüstenarmee | 1 | Deutsches Afrikakorps
Wie lange dauerte die Blockade Leningrads ungefähr? | Rund 900 Tage | 90 Tage | 9 Tage | 9 Jahre | 1 | Leningrader Blockade | mc
Wie hieß das amerikanische Projekt zum Bau der Atombombe? | Manhattan-Projekt | Apollo-Projekt | Projekt Trinity | Operation Paperclip | 1 | Manhattan-Projekt
Welcher Physiker leitete das Manhattan-Projekt wissenschaftlich? | J. Robert Oppenheimer | Albert Einstein | Enrico Fermi | Niels Bohr | 1 | J. Robert Oppenheimer | alt=Oppenheimer
Wie hieß die Atombombe, die auf Hiroshima fiel? | Little Boy | Fat Man | Trinity | Big Ivan | 2 | Little Boy
Wie hieß die Atombombe, die auf Nagasaki fiel? | Fat Man | Little Boy | Trinity | Thin Man | 2 | Fat Man
Wie hieß das Flugzeug, das die Bombe auf Hiroshima abwarf? | Enola Gay | Bockscar | Memphis Belle | Spirit of St. Louis | 2 | Enola Gay
Wann kapitulierte Japan offiziell? | 2. September 1945 | 8. Mai 1945 | 6. August 1945 | 7. Dezember 1945 | 2 | Kapitulation Japans | mc
Wie nennt man den Tag der Kapitulation Deutschlands in Großbritannien und den USA? | V-E Day | D-Day | V-J Day | Armistice Day | 2 | Victory in Europe Day
Wie hießen japanische Piloten, die sich mit ihren Flugzeugen auf Schiffe stürzten? | Kamikaze | Samurai | Ninja | Shogun | 1 | Kamikaze
Wie hieß die geheime britische Code-Knacker-Zentrale? | Bletchley Park | Scotland Yard | Downing Street | Greenwich | 2 | Bletchley Park
Was war die Enigma? | Eine deutsche Verschlüsselungsmaschine | Ein Panzer | Ein U-Boot | Ein Flugzeugträger | 1 | Enigma (Maschine) | mc
Welcher Mathematiker trug wesentlich zum Knacken der Enigma bei? | Alan Turing | John von Neumann | Kurt Gödel | Konrad Zuse | 1 | Alan Turing | alt=Turing
Wie viele Menschen starben im Zweiten Weltkrieg ungefähr? | 60 bis 80 Millionen | 6 Millionen | 17 Millionen | 200 Millionen | 1 | Zweiter Weltkrieg | mc
Welches Land hatte die meisten Todesopfer im Zweiten Weltkrieg? | Sowjetunion | Deutschland | Polen | China | 2 | Zweiter Weltkrieg
Wie hieß die NS-Ideologie vom angeblichen „Lebensraum im Osten“? | Lebensraumpolitik | Ostpolitik | Kolonialpolitik | Grenzpolitik | 2 | Lebensraum im Osten
Wo trafen sich im April 1945 amerikanische und sowjetische Truppen zum ersten Mal? | In Torgau an der Elbe | In Berlin | In Wien | In Prag | 2 | Elbe Day
Wer unterzeichnete die deutsche Kapitulation in Berlin-Karlshorst? | Wilhelm Keitel | Karl Dönitz | Hermann Göring | Alfred Jodl | 2 | Wilhelm Keitel
Wie hieß Hitlers Stellvertreter, der 1941 nach Schottland flog? | Rudolf Heß | Hermann Göring | Martin Bormann | Heinrich Himmler | 2 | Rudolf Heß
Welcher NS-Führer leitete die SS? | Heinrich Himmler | Hermann Göring | Joseph Goebbels | Rudolf Heß | 1 | Heinrich Himmler | alt=Himmler
Wer war Oberbefehlshaber der deutschen Luftwaffe? | Hermann Göring | Erwin Rommel | Karl Dönitz | Heinrich Himmler | 1 | Hermann Göring | alt=Göring
Welcher Architekt wurde Hitlers Rüstungsminister? | Albert Speer | Walter Gropius | Paul Troost | Fritz Todt | 2 | Albert Speer | alt=Speer
Wie nannte man die Zwangsumsiedlungen und Morde an Sinti und Roma? | Porajmos | Shoah | Nakba | Holodomor | 2 | Porajmos
Wie nannte man die Ermordung von Kranken und Behinderten in der NS-Zeit? | „Euthanasie“ (Aktion T4) | Endlösung | Arisierung | Gleichschaltung | 2 | Aktion T4 | mc
Welcher Aufstand fand 1943 im Warschauer Ghetto statt? | Aufstand im Warschauer Ghetto | Warschauer Aufstand | Prager Frühling | Ungarnaufstand | 2 | Aufstand im Warschauer Ghetto
In welchem Jahr fand der Warschauer Aufstand der polnischen Heimatarmee statt? | 1944 | 1943 | 1939 | 1945 | 2 | Warschauer Aufstand
Welche Stadt in den Niederlanden wurde im Mai 1940 schwer bombardiert? | Rotterdam | Amsterdam | Den Haag | Utrecht | 2 | Bombardierung Rotterdams
Welche englische Stadt wurde 1940 von der Luftwaffe zerstört (Kathedrale)? | Coventry | Manchester | Oxford | Bristol | 2 | Coventry Cathedral
Wie heißt der britische Regierungsbunker unter London während des Blitz? | Cabinet War Rooms | Bletchley Park | Tower of London | Westminster Bunker | 2 | Churchill War Rooms
Welcher US-General sagte „I shall return“ auf den Philippinen? | Douglas MacArthur | George S. Patton | Dwight D. Eisenhower | Omar Bradley | 2 | Douglas MacArthur | alt=MacArthur
Welcher britische Premier löste Churchill noch während der Potsdamer Konferenz 1945 ab? | Clement Attlee | Anthony Eden | Neville Chamberlain | Harold Macmillan | 2 | Clement Attlee | alt=Attlee
Welche drei Staatschefs trafen sich 1945 in Jalta? | Roosevelt, Churchill, Stalin | Truman, Attlee, Stalin | Roosevelt, de Gaulle, Stalin | Hitler, Mussolini, Hirohito | 1 | Konferenz von Jalta | mc
Welcher Kalte-Kriegs-Begriff beschreibt die Teilung Europas nach 1945 (Churchill 1946)? | Eiserner Vorhang | Berliner Mauer | Bambusvorhang | Grüne Grenze | 1 | Eiserner Vorhang
Wie hieß das US-Hilfsprogramm für den Wiederaufbau Europas? | Marshallplan | Morgenthau-Plan | New Deal | Dawes-Plan | 1 | Marshallplan
Welcher internationale Gerichtsprozess verurteilte führende NS-Täter? | Nürnberger Prozesse | Auschwitz-Prozesse | Tokioter Prozess | Haager Tribunal | 1 | Nürnberger Prozesse
Welche Prozesse in Frankfurt (1963–1965) behandelten Verbrechen in einem Vernichtungslager? | Auschwitz-Prozesse | Nürnberger Prozesse | Majdanek-Prozess | Eichmann-Prozess | 2 | Frankfurter Auschwitzprozesse
In welchem Land wurde Adolf Eichmann 1961 der Prozess gemacht? | Israel | Deutschland | Argentinien | USA | 2 | Eichmann-Prozess
Wohin flohen viele NS-Täter nach dem Krieg über die „Rattenlinien“? | Südamerika | Australien | Kanada | Indien | 2 | Rattenlinien
Wie viele Deutsche flohen oder wurden nach 1945 aus den Ostgebieten vertrieben (ungefähr)? | 12 bis 14 Millionen | 1 Million | 50 Millionen | 100.000 | 2 | Flucht und Vertreibung der Deutschen 1945–1950 | mc
Welche Länder wurden nach 1945 ständige Mitglieder des UN-Sicherheitsrats? | USA, Sowjetunion, Großbritannien, Frankreich, China | USA, Deutschland, Japan, Frankreich, Italien | USA, Kanada, Großbritannien, Australien, Indien | Sowjetunion, China, Polen, Indien, Brasilien | 1 | UN-Sicherheitsrat | mc
Welche Militärallianz gründeten westliche Staaten 1949? | NATO | Warschauer Pakt | Völkerbund | Montanunion | 1 | NATO
Welches Bündnis gründeten die Ostblockstaaten 1955? | Warschauer Pakt | NATO | Comecon | Kominform | 1 | Warschauer Pakt
`);
})();
