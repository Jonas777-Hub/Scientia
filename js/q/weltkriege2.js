/* Weltkriege – Ergänzung */
(function () {
  const { table, lines } = window.QGEN;
  const C = "weltkriege";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const PEOPLE = parse(`
Gavrilo Princip;Attentäter von Sarajevo 1914
Franz Ferdinand;Österreichischer Thronfolger, 1914 ermordet
Franz Joseph I.;Kaiser von Österreich zu Beginn des Ersten Weltkriegs
Nikolaus II.;Letzter russischer Zar
Georges Clemenceau;Französischer Regierungschef am Ende des Ersten Weltkriegs
David Lloyd George;Britischer Premierminister am Ende des Ersten Weltkriegs
Mata Hari;Tänzerin, 1917 als Spionin hingerichtet
Wladimir Lenin;Anführer der Oktoberrevolution
Anne Frank;Jüdisches Mädchen, das im Versteck ein Tagebuch schrieb
Oskar Schindler;Unternehmer, der über 1000 Juden rettete
Raoul Wallenberg;Schwedischer Diplomat, der in Budapest Juden rettete
Hirohito;Japanischer Kaiser im Zweiten Weltkrieg
Wernher von Braun;Raketeningenieur der V2, später bei der NASA
Rudolf Höß;Kommandant von Auschwitz
Adolf Eichmann;Organisator der Deportationen der Juden
Charles de Gaulle;Anführer des Freien Frankreich
Benito Mussolini;Faschistischer Diktator Italiens
Josip Broz Tito;Partisanenführer in Jugoslawien
Irena Sendler;Polnische Sozialarbeiterin, die rund 2500 jüdische Kinder rettete
`);
  table(C, PEOPLE, { q: (p) => `Wer war ${p[0]}?`, a: (p) => p[1], pool: PEOPLE.map((p) => p[1]), mc: true, diff: (p) => (["Anne Frank", "Oskar Schindler", "Benito Mussolini", "Wladimir Lenin", "Franz Ferdinand"].includes(p[0]) ? 1 : 2), img: (p) => p[0] });

  const CAMP = parse(`
Auschwitz-Birkenau;Polen
Treblinka;Polen
Sobibor;Polen
Majdanek;Polen
Bełżec;Polen
Dachau;Deutschland
Buchenwald;Deutschland
Bergen-Belsen;Deutschland
Sachsenhausen;Deutschland
Ravensbrück;Deutschland
Neuengamme;Deutschland
Theresienstadt;Tschechien
Mauthausen;Österreich
Natzweiler-Struthof;Frankreich
`);
  table(C, CAMP, { q: (c) => `In welchem heutigen Land lag das Lager ${c[0]}?`, a: (c) => c[1], pool: ["Polen", "Deutschland", "Tschechien", "Österreich", "Frankreich", "Ungarn", "Niederlande"], diff: (c) => (["Auschwitz-Birkenau", "Dachau", "Buchenwald"].includes(c[0]) ? 1 : 2), img: (c) => (c[0] === "Auschwitz-Birkenau" ? "KZ Auschwitz-Birkenau" : `KZ ${c[0]}`) });

  const OPS = parse(`
Unternehmen Barbarossa;Deutscher Angriff auf die Sowjetunion 1941
Operation Overlord;Alliierte Landung in der Normandie 1944
Unternehmen Seelöwe;Geplante deutsche Invasion Großbritanniens
Operation Market Garden;Alliierte Luftlandung in den Niederlanden 1944
Operation Torch;Alliierte Landung in Nordafrika 1942
Operation Husky;Alliierte Landung auf Sizilien 1943
Unternehmen Zitadelle;Deutsche Offensive bei Kursk 1943
Operation Dynamo;Evakuierung britischer Truppen aus Dünkirchen
Unternehmen Weserübung;Deutsche Besetzung Dänemarks und Norwegens
Fall Gelb;Deutscher Westfeldzug gegen Frankreich und die Benelux-Staaten
Operation Bagration;Sowjetische Großoffensive 1944
Unternehmen Taifun;Deutscher Angriff auf Moskau 1941
Operation Walküre;Umsturzplan der Verschwörer des 20. Juli
Unternehmen Wacht am Rhein;Deutsche Ardennenoffensive 1944
Operation Gomorrha;Luftangriffe auf Hamburg 1943
Operation Downfall;Geplante alliierte Invasion Japans
Operation Michael;Deutsche Frühjahrsoffensive 1918
Operation Paperclip;Anwerbung deutscher Wissenschaftler durch die USA
`);
  table(C, OPS, { q: (o) => `Was verbirgt sich hinter dem Decknamen „${o[0]}“?`, a: (o) => o[1], pool: OPS.map((o) => o[1]), mc: true, diff: (o) => (["Unternehmen Barbarossa", "Operation Overlord", "Unternehmen Seelöwe", "Operation Walküre"].includes(o[0]) ? 1 : 2) });

  const CONF = parse(`
Konferenz von Versailles (Friedenskonferenz);1919
Konferenz von Locarno;1925
Münchner Konferenz;1938
Wannseekonferenz;1942
Konferenz von Casablanca;1943
Konferenz von Teheran;1943
Konferenz von Jalta;1945
Potsdamer Konferenz;1945
`);
  table(C, CONF, { q: (c) => `In welchem Jahr fand statt: ${c[0]}?`, a: (c) => c[1], years: 3, min: 1915, max: 1950, diff: 2, img: (c) => c[0].replace(/ \(.*\)/, "") });

  lines(C, `
Welche Hauptstadt besetzte die Wehrmacht im Juni 1940? | Paris | London | Moskau | Madrid | 1 | Paris
In welchem französischen Kurort hatte das Kollaborationsregime seinen Sitz? | Vichy | Lourdes | Évian | Nizza | 1 | Vichy-Regime
Welches Land wurde im April 1940 zusammen mit Norwegen besetzt? | Dänemark | Schweden | Finnland | Island | 1 | Unternehmen Weserübung
Gegen welches Land führte die Sowjetunion 1939/40 den „Winterkrieg“? | Finnland | Polen | Estland | Rumänien | 2 | Winterkrieg
Welches Land griff Italien 1940 erfolglos an, sodass Deutschland eingreifen musste? | Griechenland | Spanien | Schweiz | Türkei | 2 | Griechisch-Italienischer Krieg
Welcher japanische Admiral plante den Angriff auf Pearl Harbor? | Isoroku Yamamoto | Hideki Tōjō | Chūichi Nagumo | Tomoyuki Yamashita | 2 | Isoroku Yamamoto | alt=Yamamoto
Welcher Ministerpräsident führte Japan ab 1941 in den Krieg? | Hideki Tōjō | Fumimaro Konoe | Hirohito | Isoroku Yamamoto | 2 | Hideki Tōjō | alt=Tojo/Tōjō
Welches Ereignis wird als „Tag der Schande“ (Day of Infamy) bezeichnet? | Der Angriff auf Pearl Harbor | Der D-Day | Die Kapitulation Frankreichs | Der Fall Berlins | 1 | Angriff auf Pearl Harbor | mc
Welche Schlacht 1942 gilt als Wendepunkt im Pazifikkrieg? | Midway | Iwojima | Okinawa | Guadalcanal | 1 | Schlacht um Midway
Welches berühmte Foto zeigt Soldaten beim Hissen einer US-Flagge 1945? | Raising the Flag on Iwo Jima | Der Kuss am Times Square | Napalm-Mädchen | Earthrise | 1 | Raising the Flag on Iwo Jima
Welches Foto zeigt einen Rotarmisten mit Flagge auf dem Reichstag 1945? | Flagge auf dem Reichstag (Chaldej) | Raising the Flag on Iwo Jima | Tank Man | Der fallende Soldat | 2 | Hissen der Flagge auf dem Reichstag | mc
Wie hieß der Strand in der Normandie, an dem die US-Truppen die größten Verluste hatten? | Omaha Beach | Utah Beach | Gold Beach | Juno Beach | 1 | Omaha Beach
An welchem Strand landeten die Kanadier am D-Day? | Juno Beach | Omaha Beach | Sword Beach | Utah Beach | 2 | Juno Beach
Welche Brücke war Ziel der Operation Market Garden („Die Brücke von …“)? | Arnheim | Remagen | Nijmegen | Antwerpen | 2 | John-Frost-Brücke
Welche Rheinbrücke eroberten US-Truppen im März 1945 unzerstört? | Brücke von Remagen | Brücke von Arnheim | Hohenzollernbrücke | Brücke von Wesel | 2 | Ludendorff-Brücke
Welche französische Widerstandsbewegung kämpfte gegen die Besatzung? | Résistance | Maquisards allein | Partisanen | Freikorps | 1 | Résistance
Wie nannte man die Rückzugstaktik, alles für den Feind Nutzbare zu zerstören? | Verbrannte Erde | Blitzkrieg | Igelstellung | Kesselschlacht | 1 | Taktik der verbrannten Erde
Wie nennt man es, wenn eine Armee von allen Seiten eingeschlossen ist? | Kessel | Front | Brückenkopf | Flanke | 1 | Kesselschlacht
Wie hieß die NS-Organisation, die Bauprojekte wie den Westwall ausführte? | Organisation Todt | Reichsarbeitsdienst | Volkssturm | Wehrmacht | 2 | Organisation Todt
Wie hieß das letzte Aufgebot aus Jungen und alten Männern 1944/45? | Volkssturm | Hitlerjugend | Wehrmacht | Waffen-SS | 1 | Volkssturm
Wie hieß die Befestigungslinie Frankreichs an der Grenze zu Deutschland? | Maginot-Linie | Siegfried-Linie | Atlantikwall | Mannerheim-Linie | 1 | Maginot-Linie
Wie hieß die deutsche Befestigungslinie an der Westgrenze (Westwall)? | Siegfried-Linie | Maginot-Linie | Gotenstellung | Hindenburglinie | 2 | Westwall | alt=Westwall
Wie hieß die deutsche Küstenbefestigung von Norwegen bis Spanien? | Atlantikwall | Westwall | Ostwall | Maginot-Linie | 1 | Atlantikwall
Wie hieß die deutsche Verteidigungslinie im Ersten Weltkrieg an der Westfront 1917? | Hindenburglinie | Maginot-Linie | Siegfried-Linie | Gustav-Linie | 2 | Siegfriedstellung
Wie hieß die deutsche Verteidigungslinie in Italien mit Monte Cassino? | Gustav-Linie | Gotenstellung | Hindenburglinie | Atlantikwall | 2 | Gustav-Linie
Wie hieß die Panzerschlacht 1943, die größte der Geschichte? | Schlacht bei Kursk | Schlacht von El Alamein | Schlacht um Moskau | Schlacht um Stalingrad | 1 | Unternehmen Zitadelle
Welcher Tag gilt in Russland als „Tag des Sieges“? | 9. Mai | 8. Mai | 6. Juni | 1. September | 1 | Tag des Sieges
Warum feiert Russland den Sieg am 9. Mai und nicht am 8. Mai? | Wegen der Zeitverschiebung bei der Kapitulation | Wegen eines Feiertags | Wegen eines Missverständnisses | Wegen des orthodoxen Kalenders | 2 | Tag des Sieges | mc
Welche Insel im Ärmelkanal war von Deutschland besetzt? | Guernsey (Kanalinseln) | Isle of Wight | Isle of Man | Anglesey | 2 | Deutsche Besetzung der Kanalinseln
Welches Land blieb im Zweiten Weltkrieg trotz deutscher Nachbarschaft neutral und unbesetzt? | Schweiz | Dänemark | Belgien | Niederlande | 1 | Schweiz
Welches neutrale Land lieferte Deutschland im Krieg Eisenerz? | Schweden | Schweiz | Irland | Portugal | 2 | Schweden im Zweiten Weltkrieg
Welche Stadt war Hauptstadt des faschistischen Italiens und wurde 1944 befreit? | Rom | Mailand | Turin | Neapel | 1 | Rom
Wo wurde Mussolini 1945 von Partisanen erschossen? | Am Comer See | In Rom | In Mailand auf dem Domplatz | In Berlin | 2 | Benito Mussolini | mc
Welche Seeschlacht 1941 endete mit der Versenkung der Bismarck? | Jagd auf die Bismarck im Atlantik | Skagerrakschlacht | Schlacht im Golf von Leyte | Schlacht bei Midway | 2 | Bismarck (Schiff, 1939) | mc
Welches britische Schlachtschiff versenkte die Bismarck zuvor? | HMS Hood | HMS Prince of Wales | HMS Dreadnought | HMS Victory | 2 | HMS Hood
Was war die „Weiße Rose“? | Eine studentische Widerstandsgruppe | Eine Panzerdivision | Ein Schiff | Eine Zeitung der NSDAP | 1 | Weiße Rose | mc
Was war die „Rote Kapelle“? | Ein Widerstands- und Spionagenetz gegen das NS-Regime | Ein Orchester | Eine Partisaneneinheit | Eine Bomberstaffel | 2 | Rote Kapelle | mc
Wie viele Juden lebten 1933 ungefähr in Deutschland? | Etwa 500.000 | Etwa 5 Millionen | Etwa 50.000 | Etwa 2 Millionen | 2 | Geschichte der Juden in Deutschland | mc
Welches Symbol mussten Juden ab 1941 sichtbar tragen? | Gelber Stern | Rotes Dreieck | Grüner Kreis | Blaue Raute | 1 | Judenstern
Wie nennt man die Gedenkstätte für die Holocaust-Opfer in Jerusalem? | Yad Vashem | Klagemauer | Knesset | Masada | 1 | Yad Vashem
Wie nennt man Menschen, die unter Lebensgefahr Juden retteten (Ehrentitel)? | Gerechte unter den Völkern | Helden der Nation | Ritter des Friedens | Schutzengel Europas | 2 | Gerechte unter den Völkern
An welchem Tag wird international an die Opfer des Holocaust erinnert? | 27. Januar | 9. November | 8. Mai | 1. September | 2 | Internationaler Tag des Gedenkens an die Opfer des Holocaust
Was erinnert in vielen Städten als kleine Messingplatten im Gehweg an NS-Opfer? | Stolpersteine | Gedenktafeln | Pflastersteine | Mahnmale | 1 | Stolpersteine
Wie viele Jahre dauerte der Zweite Weltkrieg in Europa ungefähr? | Knapp 6 Jahre | 4 Jahre | 10 Jahre | 2 Jahre | 1 | Zweiter Weltkrieg | mc
Wie viele Jahre dauerte der Erste Weltkrieg ungefähr? | Gut 4 Jahre | 2 Jahre | 6 Jahre | 10 Jahre | 1 | Erster Weltkrieg | mc
Welcher US-Präsident entschied über den Einsatz der Atombombe? | Harry S. Truman | Franklin D. Roosevelt | Dwight D. Eisenhower | John F. Kennedy | 1 | Harry S. Truman | alt=Truman
Wie heißt der erste Atombombentest 1945 in New Mexico? | Trinity | Manhattan | Castle Bravo | Little Boy | 2 | Trinity-Test
Wie heißt die Ruine in Hiroshima, die als Mahnmal erhalten blieb? | Atombombenkuppel (Genbaku Dome) | Burg Hiroshima | Itsukushima-Schrein | Friedensglocke | 2 | Friedensdenkmal in Hiroshima | mc
Welcher Kaiser verkündete im Radio die Kapitulation Japans? | Hirohito | Meiji | Akihito | Taishō | 2 | Hirohito
Auf welchem Schiff unterzeichnete Japan die Kapitulation? | USS Missouri | USS Arizona | USS Enterprise | USS Iowa | 2 | USS Missouri (BB-63)
Welche koreanische Teilung entstand nach 1945? | Nord- und Südkorea entlang des 38. Breitengrads | Ost- und Westkorea | Keine | Korea wurde japanisch | 2 | Koreanische Teilung | mc
Welches Land wurde nach dem Krieg ebenfalls in vier Besatzungszonen geteilt (bis 1955)? | Österreich | Italien | Polen | Ungarn | 2 | Besetztes Nachkriegsösterreich
Wie viele Soldaten landeten am D-Day ungefähr? | Rund 150.000 | Rund 15.000 | Rund 1,5 Millionen | Rund 5.000 | 2 | Operation Overlord | mc
Welcher Komiker drehte 1940 die Hitler-Satire „Der große Diktator“? | Charlie Chaplin | Buster Keaton | Laurel und Hardy | Groucho Marx | 1 | Der große Diktator | alt=Chaplin
Welcher Film von Steven Spielberg handelt von der Rettung eines Soldaten nach dem D-Day? | Der Soldat James Ryan | Schindlers Liste | Dunkirk | Band of Brothers | 1 | Der Soldat James Ryan
Welcher Film von Christopher Nolan zeigt die Evakuierung von 1940? | Dunkirk | Oppenheimer | Inception | 1917 | 1 | Dunkirk (2017)
Welcher Film von 2019 zeigt zwei britische Soldaten auf einer Mission im Ersten Weltkrieg? | 1917 | Dunkirk | Im Westen nichts Neues | Wege zum Ruhm | 2 | 1917 (Film)
Welche deutsche Mini-Serie über den Zweiten Weltkrieg trägt den Titel „Unsere Mütter, unsere …“? | Väter | Kinder | Söhne | Brüder | 2 | Unsere Mütter, unsere Väter
`);
})();
