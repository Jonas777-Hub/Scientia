/* Antike – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "antike";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const GODS = parse(`
Zeus;Jupiter;Göttervater, Himmel und Blitz;Zeus
Hera;Juno;Ehe und Familie;Hera
Poseidon;Neptun;Meer und Erdbeben;Poseidon
Hades;Pluto;Unterwelt;Hades
Athene;Minerva;Weisheit und Kriegskunst;Athene
Ares;Mars;Krieg;Ares
Aphrodite;Venus;Liebe und Schönheit;Aphrodite
Apollon;Apollo;Licht, Musik und Weissagung;Apollon
Artemis;Diana;Jagd und Wald;Artemis
Hermes;Merkur;Götterbote, Handel und Reisende;Hermes
Hephaistos;Vulcanus;Feuer und Schmiedekunst;Hephaistos
Dionysos;Bacchus;Wein und Rausch;Dionysos
Demeter;Ceres;Ackerbau und Fruchtbarkeit;Demeter
Hestia;Vesta;Herdfeuer;Hestia
Eros;Amor;Verliebtheit;Eros (Mythologie)
Kronos;Saturn;Titan und Zeit;Kronos
`);
  table(C, GODS, { q: (g) => `Wie heißt der griechische Gott bzw. die Göttin ${g[0]} bei den Römern?`, a: (g) => g[1], pool: GODS.map((g) => g[1]), diff: (g) => (["Zeus", "Aphrodite", "Ares", "Poseidon", "Eros"].includes(g[0]) ? 1 : 2), img: (g) => g[3] });
  table(C, GODS, { q: (g) => `Wie heißt die römische Gottheit ${g[1]} bei den Griechen?`, a: (g) => g[0], pool: GODS.map((g) => g[0]), diff: (g) => (["Jupiter", "Venus", "Mars", "Neptun"].includes(g[1]) ? 1 : 2), img: (g) => g[3] });
  const DOM = [...GODS.map((g) => [g[0], g[2], g[3]]), ["Nike", "Sieg", "Nike (Mythologie)"], ["Helios", "Sonne", "Helios"], ["Selene", "Mond", "Selene"], ["Gaia", "Erde", "Gaia"], ["Nemesis", "Vergeltung", "Nemesis (Mythologie)"]];
  table(C, DOM, { q: (g) => `Wofür war ${g[0]} in der griechischen Mythologie zuständig?`, a: (g) => g[1], pool: DOM.map((g) => g[1]), mc: true, diff: (g) => (["Zeus", "Poseidon", "Hades", "Ares", "Aphrodite", "Athene", "Nike"].includes(g[0]) ? 1 : 2), img: (g) => g[2] });

  const EGY = parse(`
Ra (Re);Sonnengott
Osiris;Gott des Totenreichs und der Wiedergeburt
Isis;Göttin der Magie und Muttergöttin
Horus;Falkengott des Himmels und des Königtums
Anubis;Schakalköpfiger Gott der Mumifizierung
Thot;Gott der Weisheit und Schrift mit Ibiskopf
Bastet;Katzengöttin
Seth;Gott des Chaos und der Wüste
Hathor;Göttin der Liebe und Musik, oft als Kuh dargestellt
Amun;König der Götter, später mit Ra verschmolzen
Sobek;Krokodilgott
`);
  table(C, EGY, { q: (g) => `Wer war im alten Ägypten ${g[0]}?`, a: (g) => g[1], pool: EGY.map((g) => g[1]), mc: true, diff: (g) => (["Ra (Re)", "Anubis", "Bastet", "Osiris"].includes(g[0]) ? 1 : 2), img: (g) => g[0].replace(/ \(.*\)/, "") });

  const EMP = parse(`
Er war der erste römische Kaiser;Augustus
Er ließ seine Mutter ermorden und soll beim Brand Roms 64 n. Chr. gesungen haben;Nero
Er machte angeblich sein Pferd zum Konsul;Caligula
Er eroberte 43 n. Chr. Britannien;Claudius
Unter ihm begann der Bau des Kolosseums;Vespasian
Er eröffnete das Kolosseum, in seine Regierungszeit fiel der Vesuvausbruch;Titus
Unter ihm erreichte das Reich seine größte Ausdehnung;Trajan
Er ließ in Britannien einen nach ihm benannten Wall bauen;Hadrian
Der Philosophen-Kaiser schrieb die „Selbstbetrachtungen“;Mark Aurel
Er kämpfte selbst als Gladiator in der Arena;Commodus
Er gab 212 n. Chr. fast allen freien Reichsbewohnern das Bürgerrecht;Caracalla
Er teilte die Macht mit drei Mitkaisern (Tetrarchie) und verfolgte Christen;Diokletian
Er förderte das Christentum und gründete Konstantinopel;Konstantin der Große
Unter ihm wurde das Christentum Staatsreligion;Theodosius I.
Er war der letzte weströmische Kaiser;Romulus Augustulus
Der oströmische Kaiser ließ die Hagia Sophia bauen;Justinian I.
Er war Kaiser, als Jesus geboren wurde;Augustus
`);
  table(C, EMP, { q: (e) => `Welcher Kaiser ist gemeint? ${e[0]}.`, a: (e) => e[1], pool: [...new Set(EMP.map((e) => e[1]))], diff: (e) => (["Augustus", "Nero", "Caligula", "Konstantin der Große", "Hadrian"].includes(e[1]) ? 1 : 2), img: (e) => e[1] });

  const WONDER = parse(`
Pyramiden von Gizeh;Ägypten
Hängende Gärten der Semiramis;Babylon (Irak)
Zeusstatue des Phidias;Olympia (Griechenland)
Tempel der Artemis;Ephesos (Türkei)
Mausoleum von Halikarnassos;Halikarnassos (Türkei)
Koloss von Rhodos;Rhodos (Griechenland)
Leuchtturm von Pharos;Alexandria (Ägypten)
`);
  table(C, WONDER, { q: (w) => `Wo stand das antike Weltwunder „${w[0]}“?`, a: (w) => w[1], pool: WONDER.map((w) => w[1]), diff: (w) => (w[0].startsWith("Pyramiden") || w[0].startsWith("Koloss") ? 1 : 2), img: (w) => w[0] });

  const THINK = parse(`
Sokrates;Philosoph, der sagte „Ich weiß, dass ich nichts weiß“
Platon;Philosoph des „Höhlengleichnisses“
Aristoteles;Philosoph und Lehrer Alexanders des Großen
Diogenes;Philosoph, der in einer Tonne gelebt haben soll
Epikur;Philosoph, der das Glück und die Freude betonte
Pythagoras;Mathematiker mit dem Satz über rechtwinklige Dreiecke
Thales von Milet;Gilt als erster Philosoph und sagte eine Sonnenfinsternis voraus
Herodot;„Vater der Geschichtsschreibung“
Thukydides;Geschichtsschreiber des Peloponnesischen Krieges
Homer;Dichter der „Ilias“ und „Odyssee“
Sophokles;Dichter der Tragödie „König Ödipus“
Aristophanes;Komödiendichter („Die Vögel“)
Äsop;Dichter von Tierfabeln
Sappho;Dichterin von der Insel Lesbos
Hippokrates;Arzt, nach dem ein ärztlicher Eid benannt ist
Eratosthenes;Berechnete erstaunlich genau den Erdumfang
Cicero;Berühmtester Redner Roms
Vergil;Dichter der „Aeneis“
Ovid;Dichter der „Metamorphosen“
Seneca;Stoischer Philosoph und Erzieher Neros
Tacitus;Schrieb die „Germania“ über die Germanen
Plinius der Ältere;Naturforscher, der beim Vesuvausbruch starb
Julius Caesar;Schrieb „De bello Gallico“ über den Gallischen Krieg
Archimedes;„Heureka!“ – Entdecker des Auftriebsprinzips
Euklid;Verfasser der „Elemente“ der Geometrie
Leonidas;Spartanerkönig bei den Thermopylen
Perikles;Staatsmann im „Goldenen Zeitalter“ Athens
Hannibal;Karthager, der mit Elefanten über die Alpen zog
Spartacus;Anführer des großen Sklavenaufstands
Kleopatra VII.;Letzte Königin des Ptolemäerreichs in Ägypten
`);
  table(C, THINK, { q: (t) => `Wofür ist ${t[0]} bekannt?`, a: (t) => t[1], pool: THINK.map((t) => t[1]), mc: true, diff: (t) => (["Sokrates", "Platon", "Homer", "Pythagoras", "Archimedes", "Julius Caesar", "Hannibal", "Spartacus", "Kleopatra VII.", "Aristoteles", "Diogenes"].includes(t[0]) ? 1 : 2), img: (t) => t[0] });

  const MYTH = parse(`
Herakles;Musste zwölf Arbeiten vollbringen;Herakles
Odysseus;Irrte nach dem Trojanischen Krieg zehn Jahre umher;Odysseus
Achilles;Unverwundbar bis auf seine Ferse;Achilleus
Perseus;Schlug der Medusa den Kopf ab;Perseus
Theseus;Tötete den Minotaurus im Labyrinth;Theseus
Jason;Suchte mit den Argonauten das Goldene Vlies;Iason
Ikarus;Flog zu nah an die Sonne und stürzte ab;Ikarus
Dädalus;Erfinder, der das Labyrinth baute;Daidalos
Orpheus;Holte mit seiner Musik seine Frau fast aus der Unterwelt;Orpheus
Pandora;Öffnete das Gefäß mit allen Übeln der Welt;Pandora
Prometheus;Brachte den Menschen das Feuer;Prometheus
Sisyphos;Musste ewig einen Stein den Berg hinaufrollen;Sisyphos
Tantalos;Litt Hunger und Durst neben Wasser und Früchten;Tantalos
Narziss;Verliebte sich in sein eigenes Spiegelbild;Narziss
Midas;Alles, was er berührte, wurde zu Gold;Midas
Medusa;Hatte Schlangen als Haare, ihr Blick versteinerte;Medusa
Polyphem;Zyklop, den Odysseus blendete;Polyphem
Helena;Schönste Frau, deren Entführung den Trojanischen Krieg auslöste;Helena (Mythologie)
Kassandra;Seherin, der niemand glaubte;Kassandra
Atlas;Titan, der den Himmel tragen muss;Atlas (Mythologie)
Hydra;Ungeheuer mit nachwachsenden Köpfen;Hydra (Mythologie)
Kerberos;Dreiköpfiger Hund, der die Unterwelt bewacht;Kerberos
Pegasus;Geflügeltes Pferd;Pegasos
Minotaurus;Wesen halb Mensch, halb Stier;Minotauros
Romulus und Remus;Zwillinge, von einer Wölfin gesäugt, Gründer Roms;Kapitolinische Wölfin
Aeneas;Trojaner, der nach Italien floh und Stammvater der Römer wurde;Aeneas
Ödipus;Tötete unwissentlich seinen Vater und heiratete seine Mutter;Ödipus
Paris;Gab den goldenen Apfel Aphrodite;Paris (Mythologie)
`);
  table(C, MYTH, { q: (m) => `Was erzählt die Sage über ${m[0]}?`, a: (m) => m[1], pool: MYTH.map((m) => m[1]), mc: true, diff: (m) => (["Herakles", "Achilles", "Ikarus", "Odysseus", "Medusa", "Pegasus", "Romulus und Remus", "Prometheus", "Pandora", "Midas"].includes(m[0]) ? 1 : 2), img: (m) => m[2] });
  table(C, MYTH, { q: (m) => `Welche Sagengestalt ist gemeint? ${m[1]}.`, a: (m) => m[0], pool: MYTH.map((m) => m[0]), diff: (m) => (["Herakles", "Achilles", "Ikarus", "Odysseus", "Medusa", "Pegasus", "Midas", "Narziss"].includes(m[0]) ? 1 : 2), img: (m) => m[2] });

  const EV = parse(`
Gründung Roms (der Sage nach);753 v. Chr.
Erste Olympische Spiele der Antike (überliefert);776 v. Chr.
Schlacht bei Marathon;490 v. Chr.
Schlacht bei den Thermopylen;480 v. Chr.
Beginn des Peloponnesischen Krieges;431 v. Chr.
Hinrichtung des Sokrates;399 v. Chr.
Tod Alexanders des Großen;323 v. Chr.
Hannibals Sieg bei Cannae;216 v. Chr.
Zerstörung Karthagos;146 v. Chr.
Beginn des Spartacus-Aufstands;73 v. Chr.
Caesar überschreitet den Rubikon;49 v. Chr.
Ermordung Caesars;44 v. Chr.
Schlacht bei Actium;31 v. Chr.
Varusschlacht im Teutoburger Wald;9 n. Chr.
Großer Brand Roms unter Nero;64 n. Chr.
Ausbruch des Vesuvs;79 n. Chr.
Mailänder Toleranzedikt für Christen;313 n. Chr.
Konstantinopel wird Hauptstadt;330 n. Chr.
Endgültige Teilung des Römischen Reiches;395 n. Chr.
Plünderung Roms durch die Westgoten;410 n. Chr.
Ende des Weströmischen Reiches;476 n. Chr.
`);
  table(C, EV, { q: (e) => `Wann war: ${e[0]}?`, a: (e) => e[1], pool: (e) => EV.filter((x) => x[1].slice(-7) === e[1].slice(-7)).map((x) => x[1]), diff: (e) => (["753 v. Chr.", "44 v. Chr.", "79 n. Chr.", "476 n. Chr."].includes(e[1]) ? 1 : 2), img: () => "Forum Romanum" });

  const PLACE = parse(`
Akropolis;Griechenland;Akropolis
Delphi (Orakel);Griechenland;Delphi
Knossos (Palast des Minos);Griechenland (Kreta);Knossos
Mykene;Griechenland;Mykene
Pompeji;Italien;Pompeji
Petra;Jordanien;Petra (Jordanien)
Karthago;Tunesien;Karthago
Troja;Türkei;Troja
Ephesos;Türkei;Ephesos
Persepolis;Iran;Persepolis
Babylon;Irak;Babylon
Abu Simbel;Ägypten;Abu Simbel
Leptis Magna;Libyen;Leptis Magna
Palmyra;Syrien;Palmyra
Porta Nigra;Deutschland;Porta Nigra
Hadrianswall;Vereinigtes Königreich;Hadrianswall
Pont du Gard (Aquädukt);Frankreich;Pont du Gard
Masada;Israel;Masada
Baalbek;Libanon;Baalbek
Herculaneum;Italien;Herculaneum
`);
  table(C, PLACE, { q: (p) => `In welchem heutigen Land liegt die antike Stätte ${p[0]}?`, a: (p) => p[1], pool: [...new Set(PLACE.map((p) => p[1]))], diff: (p) => (["Akropolis", "Pompeji", "Porta Nigra", "Troja", "Petra"].includes(p[0]) ? 1 : 2), img: (p) => p[2] });

  const LATIN = parse(`
Veni, vidi, vici;Ich kam, sah und siegte
Carpe diem;Nutze den Tag
Alea iacta est;Der Würfel ist gefallen
Et tu, Brute?;Auch du, Brutus?
Panem et circenses;Brot und Spiele
Divide et impera;Teile und herrsche
Mens sana in corpore sano;Ein gesunder Geist in einem gesunden Körper
Per aspera ad astra;Durch Mühsal zu den Sternen
Errare humanum est;Irren ist menschlich
In vino veritas;Im Wein liegt die Wahrheit
Memento mori;Bedenke, dass du sterben wirst
Tempus fugit;Die Zeit flieht
Quo vadis?;Wohin gehst du?
Pax Romana;Römischer Frieden
Si vis pacem, para bellum;Wenn du Frieden willst, bereite Krieg vor
Vae victis;Wehe den Besiegten
Nomen est omen;Der Name ist ein Zeichen
Ave Caesar, morituri te salutant;Sei gegrüßt, Caesar, die Todgeweihten grüßen dich
Senatus Populusque Romanus (SPQR);Senat und Volk von Rom
Mare nostrum;Unser Meer (das Mittelmeer)
Do ut des;Ich gebe, damit du gibst
Cave canem;Hüte dich vor dem Hund
`);
  table(C, LATIN, { q: (l) => `Was bedeutet der lateinische Ausspruch „${l[0]}“?`, a: (l) => l[1], pool: LATIN.map((l) => l[1]), mc: true, diff: (l) => (["Veni, vidi, vici", "Carpe diem", "Alea iacta est", "Errare humanum est", "Panem et circenses", "Cave canem", "Quo vadis?", "Tempus fugit"].includes(l[0]) ? 1 : 2), img: () => null });

  const GREEK = parse(`
Alpha;α;1
Beta;β;2
Gamma;γ;3
Delta;δ;4
Epsilon;ε;5
Zeta;ζ;6
Eta;η;7
Theta;θ;8
Iota;ι;9
Kappa;κ;10
Lambda;λ;11
My;μ;12
Ny;ν;13
Xi;ξ;14
Omikron;ο;15
Pi;π;16
Rho;ρ;17
Sigma;σ;18
Tau;τ;19
Ypsilon;υ;20
Phi;φ;21
Chi;χ;22
Psi;ψ;23
Omega;ω;24
`);
  table(C, GREEK, { q: (g) => `Wie heißt der griechische Buchstabe „${g[1]}“?`, a: (g) => g[0], pool: GREEK.map((g) => g[0]), diff: (g) => (["Alpha", "Beta", "Pi", "Omega", "Delta", "Sigma", "Gamma"].includes(g[0]) ? 1 : 2), img: () => "Griechisches Alphabet" });
  table(C, GREEK.filter((g) => ["Alpha", "Beta", "Gamma", "Delta", "Omega", "Pi", "Sigma", "Epsilon", "Lambda", "Omikron"].includes(g[0])), { q: (g) => `Der wievielte Buchstabe im griechischen Alphabet ist ${g[0]}?`, a: (g) => `${g[2]}.`, pool: GREEK.map((g) => `${g[2]}.`), diff: (g) => (["Alpha", "Omega", "Beta"].includes(g[0]) ? 1 : 2), img: () => "Griechisches Alphabet" });
})();
