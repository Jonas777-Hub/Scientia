/* Wissenschaft – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "wissenschaft";

  // Periodensystem: [Ordnungszahl, Symbol, Name, bekannt?]
  const EL = `1 H Wasserstoff 1|2 He Helium 1|3 Li Lithium 1|4 Be Beryllium 0|5 B Bor 0|6 C Kohlenstoff 1|7 N Stickstoff 1|8 O Sauerstoff 1|9 F Fluor 1|10 Ne Neon 1|11 Na Natrium 1|12 Mg Magnesium 1|13 Al Aluminium 1|14 Si Silicium 1|15 P Phosphor 1|16 S Schwefel 1|17 Cl Chlor 1|18 Ar Argon 0|19 K Kalium 1|20 Ca Calcium 1|21 Sc Scandium 0|22 Ti Titan 1|23 V Vanadium 0|24 Cr Chrom 1|25 Mn Mangan 0|26 Fe Eisen 1|27 Co Cobalt 0|28 Ni Nickel 1|29 Cu Kupfer 1|30 Zn Zink 1|31 Ga Gallium 0|32 Ge Germanium 0|33 As Arsen 0|34 Se Selen 0|35 Br Brom 0|36 Kr Krypton 0|37 Rb Rubidium 0|38 Sr Strontium 0|39 Y Yttrium 0|40 Zr Zirconium 0|41 Nb Niob 0|42 Mo Molybdän 0|44 Ru Ruthenium 0|45 Rh Rhodium 0|46 Pd Palladium 0|47 Ag Silber 1|48 Cd Cadmium 0|49 In Indium 0|50 Sn Zinn 1|51 Sb Antimon 0|52 Te Tellur 0|53 I Iod 1|54 Xe Xenon 0|55 Cs Caesium 0|56 Ba Barium 0|57 La Lanthan 0|60 Nd Neodym 0|72 Hf Hafnium 0|73 Ta Tantal 0|74 W Wolfram 0|76 Os Osmium 0|77 Ir Iridium 0|78 Pt Platin 1|79 Au Gold 1|80 Hg Quecksilber 1|82 Pb Blei 1|83 Bi Bismut 0|84 Po Polonium 0|86 Rn Radon 0|88 Ra Radium 0|92 U Uran 1|94 Pu Plutonium 0`
    .split("|").map((s) => { const [n, sym, name, known] = s.trim().split(" "); return { n: +n, sym, name, known: known === "1" }; });
  table(C, EL, { q: (e) => `Welches chemische Symbol hat ${e.name}?`, a: (e) => e.sym, diff: (e) => (e.known ? 1 : 2), img: (e) => e.name });
  table(C, EL, { q: (e) => `Welches Element hat das chemische Symbol „${e.sym}“?`, a: (e) => e.name, diff: (e) => (e.known ? 1 : 2), img: (e) => e.name });
  table(C, EL, { q: (e) => `Welche Ordnungszahl hat ${e.name} im Periodensystem?`, a: (e) => e.n, years: 6, min: 1, max: 118, diff: (e) => (e.n <= 10 ? 1 : 2), img: (e) => e.name, filter: (e) => e.n <= 30 || e.known });

  // Physikalische Größen und SI-Einheiten
  const UNITS = [
    ["Länge", "Meter"], ["Masse", "Kilogramm"], ["Zeit", "Sekunde"], ["elektrische Stromstärke", "Ampere"], ["Temperatur (SI-Basiseinheit)", "Kelvin"],
    ["Stoffmenge", "Mol"], ["Lichtstärke", "Candela"], ["Kraft", "Newton"], ["Energie", "Joule"], ["Leistung", "Watt"], ["Druck", "Pascal"],
    ["Frequenz", "Hertz"], ["elektrische Spannung", "Volt"], ["elektrischer Widerstand", "Ohm"], ["elektrische Ladung", "Coulomb"],
    ["elektrische Kapazität", "Farad"], ["magnetische Flussdichte", "Tesla"], ["Induktivität", "Henry"], ["Aktivität einer radioaktiven Substanz", "Becquerel"],
    ["Energiedosis", "Gray"], ["Lichtstrom", "Lumen"], ["Beleuchtungsstärke", "Lux"], ["magnetischer Fluss", "Weber"], ["elektrischer Leitwert", "Siemens"],
  ];
  table(C, UNITS, { q: (u) => `In welcher SI-Einheit misst man die ${u[0]}?`, a: (u) => u[1], diff: (u) => (UNITS.indexOf(u) < 15 ? 1 : 2) });
  table(C, UNITS, { q: (u) => `Welche physikalische Größe misst man in ${u[1]}?`, a: (u) => u[0].replace(" (SI-Basiseinheit)", ""), diff: (u) => (UNITS.indexOf(u) < 15 ? 1 : 2), mc: true });

  const NAMED = [
    ["Newton", "Isaac Newton"], ["Watt", "James Watt"], ["Pascal", "Blaise Pascal"], ["Hertz", "Heinrich Hertz"], ["Volt", "Alessandro Volta"],
    ["Ohm", "Georg Simon Ohm"], ["Ampere", "André-Marie Ampère"], ["Coulomb", "Charles-Augustin de Coulomb"], ["Kelvin", "Lord Kelvin (William Thomson)"],
    ["Joule", "James Prescott Joule"], ["Tesla", "Nikola Tesla"], ["Grad Celsius", "Anders Celsius"], ["Grad Fahrenheit", "Daniel Gabriel Fahrenheit"],
    ["Becquerel", "Henri Becquerel"], ["Siemens", "Werner von Siemens"], ["Henry", "Joseph Henry"], ["Weber", "Wilhelm Eduard Weber"],
  ];
  table(C, NAMED, { q: (u) => `Nach wem ist die Einheit „${u[0]}“ benannt?`, a: (u) => u[1], diff: 2, mc: true });

  const PREFIX = [["Kilo", "Tausend (10³)"], ["Mega", "Million (10⁶)"], ["Giga", "Milliarde (10⁹)"], ["Tera", "Billion (10¹²)"], ["Peta", "Billiarde (10¹⁵)"],
    ["Milli", "Tausendstel (10⁻³)"], ["Mikro", "Millionstel (10⁻⁶)"], ["Nano", "Milliardstel (10⁻⁹)"], ["Piko", "Billionstel (10⁻¹²)"], ["Zenti", "Hundertstel (10⁻²)"],
    ["Dezi", "Zehntel (10⁻¹)"], ["Hekto", "Hundert (10²)"], ["Deka", "Zehn (10¹)"], ["Femto", "Billiardstel (10⁻¹⁵)"]];
  table(C, PREFIX, { q: (p) => `Für welchen Faktor steht die Vorsilbe „${p[0]}“?`, a: (p) => p[1], diff: (p) => (PREFIX.indexOf(p) < 8 ? 1 : 2), mc: true });
  table(C, PREFIX, { q: (p) => `Welche Vorsilbe steht für den Faktor ${p[1]}?`, a: (p) => p[0], diff: (p) => (PREFIX.indexOf(p) < 8 ? 1 : 2) });

  const MOONS = [["Titan", "Saturn"], ["Europa", "Jupiter"], ["Io", "Jupiter"], ["Ganymed", "Jupiter"], ["Kallisto", "Jupiter"], ["Phobos", "Mars"], ["Deimos", "Mars"],
    ["Triton", "Neptun"], ["Enceladus", "Saturn"], ["Miranda", "Uranus"], ["Titania", "Uranus"], ["Oberon", "Uranus"], ["Rhea", "Saturn"], ["Charon", "Pluto"]];
  table(C, MOONS, { q: (m) => `Um welchen Himmelskörper kreist der Mond ${m[0]}?`, a: (m) => m[1], pool: ["Jupiter", "Saturn", "Mars", "Neptun", "Uranus", "Venus", "Pluto", "Merkur"], diff: (m) => (["Titan", "Phobos", "Io", "Europa"].includes(m[0]) ? 1 : 2), img: (m) => m[1] === "Pluto" ? "Pluto (Zwergplanet)" : `${m[1]} (Planet)` });

  const PLANETS = ["Merkur", "Venus", "Erde", "Mars", "Jupiter", "Saturn", "Uranus", "Neptun"];
  table(C, PLANETS.map((p, i) => [p, i + 1]), { q: (p) => `Der wievielte Planet von der Sonne aus ist ${p[0]}?`, a: (p) => `${p[1]}.`, pool: PLANETS.map((_, i) => `${i + 1}.`), diff: (p) => (p[0] === "Erde" || p[0] === "Merkur" ? 1 : 2), img: (p) => p[0] === "Erde" ? "Erde" : `${p[0]} (Planet)` });
  table(C, PLANETS.map((p, i) => [p, i + 1]), { q: (p) => `Welcher Planet ist der ${p[1]}. von der Sonne aus?`, a: (p) => p[0], pool: PLANETS, diff: 2, img: () => "Sonnensystem" });

  const FORMULA = [["H₂O", "Wasser"], ["CO₂", "Kohlendioxid"], ["NaCl", "Natriumchlorid (Kochsalz)"], ["O₃", "Ozon"], ["CH₄", "Methan"], ["NH₃", "Ammoniak"],
    ["H₂SO₄", "Schwefelsäure"], ["HCl", "Salzsäure (Chlorwasserstoff)"], ["C₆H₁₂O₆", "Glucose (Traubenzucker)"], ["CaCO₃", "Calciumcarbonat (Kalk)"], ["NaOH", "Natriumhydroxid"],
    ["C₂H₅OH", "Ethanol (Alkohol)"], ["CO", "Kohlenmonoxid"], ["H₂O₂", "Wasserstoffperoxid"], ["NaHCO₃", "Natriumhydrogencarbonat (Natron)"], ["HNO₃", "Salpetersäure"],
    ["SiO₂", "Siliciumdioxid (Quarz)"], ["N₂", "Stickstoff (Molekül)"], ["O₂", "Sauerstoff (Molekül)"], ["C₁₂H₂₂O₁₁", "Saccharose (Haushaltszucker)"]];
  table(C, FORMULA, { q: (f) => `Welcher Stoff hat die Formel ${f[0]}?`, a: (f) => f[1], diff: (f) => (FORMULA.indexOf(f) < 6 ? 1 : 2), mc: true });
  table(C, FORMULA, { q: (f) => `Wie lautet die chemische Formel von ${f[1].replace(/ \(.*\)/, "")}?`, a: (f) => f[0], diff: (f) => (FORMULA.indexOf(f) < 6 ? 1 : 2), mc: true, filter: (f) => !f[1].includes("Molekül") });

  for (let n = 11; n <= 25; n++) table(C, [n], { q: () => `Wie viel ist ${n}² (${n} mal ${n})?`, a: () => n * n, wrong: () => [n * n + n, n * n - n + 1, (n + 1) * (n + 1)], diff: n > 15 ? 2 : 1 });
  for (const n of [16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 400, 625, 900]) table(C, [n], { q: () => `Was ist die Quadratwurzel aus ${n}?`, a: () => Math.sqrt(n), wrong: () => [Math.sqrt(n) + 1, Math.sqrt(n) - 1, Math.sqrt(n) + 2], diff: n > 144 ? 2 : 1 });

  const SHAPES = [["Dreieck", 3], ["Viereck", 4], ["Fünfeck", 5], ["Sechseck", 6], ["Siebeneck", 7], ["Achteck", 8], ["Neuneck", 9], ["Zehneck", 10], ["Zwölfeck", 12]];
  table(C, SHAPES, { q: (s) => `Wie viele Ecken hat ein ${s[0]}?`, a: (s) => s[1], wrong: (s) => [s[1] + 1, s[1] - 1, s[1] + 2], diff: 1 });
  const SOLIDS = [["Tetraeder", 4], ["Würfel (Hexaeder)", 6], ["Oktaeder", 8], ["Dodekaeder", 12], ["Ikosaeder", 20]];
  table(C, SOLIDS, { q: (s) => `Wie viele Flächen hat ein ${s[0]}?`, a: (s) => s[1], pool: ["4", "6", "8", "10", "12", "16", "20"], diff: 2, img: () => "Platonischer Körper" });

  lines(C, `
# Forscherinnen und Forscher
Wer entdeckte 1928 das Penicillin? | Alexander Fleming | Louis Pasteur | Robert Koch | Paul Ehrlich | 1 | Penicilline | alt=Fleming
Wer entdeckte 1895 die nach ihm benannten X-Strahlen? | Wilhelm Conrad Röntgen | Max Planck | Heinrich Hertz | Otto Hahn | 1 | Röntgenstrahlung | alt=Röntgen
Wer begründete die Evolutionstheorie durch natürliche Selektion? | Charles Darwin | Gregor Mendel | Jean-Baptiste de Lamarck | Carl von Linné | 1 | Galápagos-Inseln | alt=Darwin
Wer entdeckte mit Erbsen die Grundregeln der Vererbung? | Gregor Mendel | Charles Darwin | Robert Koch | Louis Pasteur | 1 | Gartenerbse | alt=Mendel
Welche Forscherin erhielt als erste Person zwei Nobelpreise in verschiedenen Naturwissenschaften? | Marie Curie | Lise Meitner | Rosalind Franklin | Ada Lovelace | 1 | Radioaktivität | alt=Curie
Wer stellte das heliozentrische Weltbild (Sonne im Zentrum) auf? | Nikolaus Kopernikus | Ptolemäus | Johannes Kepler | Tycho Brahe | 1 | Heliozentrisches Weltbild | alt=Kopernikus
Wer formulierte die Gesetze der Planetenbewegung? | Johannes Kepler | Galileo Galilei | Isaac Newton | Nikolaus Kopernikus | 2 | Sonnensystem | alt=Kepler
Wer entdeckte 1610 die vier großen Monde des Jupiter? | Galileo Galilei | Johannes Kepler | Christiaan Huygens | Giovanni Cassini | 2 | Jupiter (Planet) | alt=Galilei/Galileo
Wer ordnete die Elemente 1869 in einem Periodensystem an? | Dmitri Mendelejew | Antoine Lavoisier | John Dalton | Niels Bohr | 2 | Periodensystem | alt=Mendelejew
Welche zwei Forscher beschrieben 1953 die Doppelhelix-Struktur der DNA? | Watson und Crick | Hahn und Meitner | Bunsen und Kirchhoff | Curie und Becquerel | 2 | Desoxyribonukleinsäure | mc
Wer entwickelte Ende des 18. Jahrhunderts die Pockenimpfung? | Edward Jenner | Louis Pasteur | Robert Koch | Emil von Behring | 2 | Pocken | alt=Jenner
Wer entwickelte die Pasteurisierung und einen Impfstoff gegen Tollwut? | Louis Pasteur | Robert Koch | Edward Jenner | Joseph Lister | 1 | Pasteurisierung | alt=Pasteur
Wer entdeckte 1882 den Erreger der Tuberkulose? | Robert Koch | Louis Pasteur | Rudolf Virchow | Paul Ehrlich | 1 | Tuberkulose | alt=Koch
Wer gilt als Begründer der Quantentheorie (1900)? | Max Planck | Albert Einstein | Niels Bohr | Werner Heisenberg | 2 | Quantenphysik | alt=Planck
Wer formulierte die Unschärferelation? | Werner Heisenberg | Erwin Schrödinger | Max Born | Paul Dirac | 2 | Quantenmechanik | alt=Heisenberg
Wer entwickelte ein Atommodell mit Elektronen auf festen Bahnen (1913)? | Niels Bohr | Ernest Rutherford | J. J. Thomson | John Dalton | 2 | Bohrsches Atommodell | alt=Bohr
Wer entdeckte durch einen Streuversuch mit Goldfolie den Atomkern? | Ernest Rutherford | Niels Bohr | J. J. Thomson | James Chadwick | 2 | Rutherford-Streuexperiment | alt=Rutherford
Wer entdeckte 1938 zusammen mit Fritz Straßmann die Kernspaltung? | Otto Hahn | Max Planck | Werner Heisenberg | Albert Einstein | 2 | Kernspaltung | alt=Hahn
Wer entdeckte den großen Blutkreislauf (1628)? | William Harvey | Andreas Vesalius | Galen | Rudolf Virchow | 2 | Blutkreislauf | alt=Harvey
Wer entdeckte die Blutgruppen A, B und 0? | Karl Landsteiner | Robert Koch | Paul Ehrlich | Emil von Behring | 2 | Blutgruppe | alt=Landsteiner
Wer begründete die Psychoanalyse? | Sigmund Freud | Carl Gustav Jung | Iwan Pawlow | Alfred Adler | 1 | Psychoanalyse | alt=Freud
Wer erforschte die klassische Konditionierung mit Hunden? | Iwan Pawlow | Sigmund Freud | B. F. Skinner | Konrad Lorenz | 1 | Klassische Konditionierung | alt=Pawlow
Wer entwickelte die Theorie der Kontinentaldrift? | Alfred Wegener | Alexander von Humboldt | Charles Lyell | James Hutton | 2 | Kontinentaldrift | alt=Wegener
Wer führte die wissenschaftliche Benennung von Pflanzen und Tieren mit zwei Namen ein? | Carl von Linné | Charles Darwin | Alexander von Humboldt | Gregor Mendel | 2 | Binomen | alt=Linné/Linne
Wer erkannte, dass sich das Universum ausdehnt (1929)? | Edwin Hubble | Albert Einstein | Carl Sagan | Stephen Hawking | 2 | Hubble-Weltraumteleskop | alt=Hubble
Welcher Physiker forschte im Rollstuhl über Schwarze Löcher und schrieb „Eine kurze Geschichte der Zeit“? | Stephen Hawking | Carl Sagan | Richard Feynman | Brian Greene | 1 | Schwarzes Loch | alt=Hawking
Wer erfand den Blitzableiter? | Benjamin Franklin | Thomas Edison | Nikola Tesla | Michael Faraday | 1 | Blitzableiter | alt=Franklin
Wer baute um 1800 die erste Batterie (Voltasche Säule)? | Alessandro Volta | Luigi Galvani | Michael Faraday | André-Marie Ampère | 2 | Voltasche Säule | alt=Volta
Wer entdeckte die elektromagnetische Induktion? | Michael Faraday | James Clerk Maxwell | Georg Simon Ohm | Heinrich Hertz | 2 | Elektromagnetische Induktion | alt=Faraday
Wer entdeckte 1896 die Radioaktivität? | Henri Becquerel | Marie Curie | Wilhelm Conrad Röntgen | Ernest Rutherford | 2 | Radioaktivität | alt=Becquerel
Wer entdeckte 1932 das Neutron? | James Chadwick | Ernest Rutherford | Enrico Fermi | Niels Bohr | 2 | Neutron | alt=Chadwick
Wer entdeckte 1897 das Elektron? | J. J. Thomson | Ernest Rutherford | Niels Bohr | Max Planck | 2 | Elektron | alt=Thomson
Wer formulierte den Zusammenhang zwischen Spannung, Strom und Widerstand? | Georg Simon Ohm | Alessandro Volta | André-Marie Ampère | Gustav Kirchhoff | 1 | Ohmsches Gesetz | alt=Ohm
Wer entwickelte die Wellengleichung der Quantenmechanik (1926)? | Erwin Schrödinger | Werner Heisenberg | Paul Dirac | Wolfgang Pauli | 2 | Schrödingers Katze | alt=Schrödinger
Nach wem ist der Effekt benannt, dass ein Martinshorn beim Vorbeifahren tiefer klingt? | Christian Doppler | Heinrich Hertz | Ernst Mach | Blaise Pascal | 2 | Doppler-Effekt | alt=Doppler
Wer beschrieb das Prinzip vom Auftrieb in Flüssigkeiten („Heureka!“)? | Archimedes | Pythagoras | Euklid | Thales | 1 | Archimedisches Prinzip
Nach wem ist der Satz a² + b² = c² benannt? | Pythagoras | Euklid | Thales | Archimedes | 1 | Satz des Pythagoras
Wer schrieb das berühmte Geometrie-Lehrbuch „Elemente“ in der Antike? | Euklid | Pythagoras | Archimedes | Aristoteles | 2 | Euklid
Wer erfand das nach ihm benannte kartesische Koordinatensystem? | René Descartes | Isaac Newton | Blaise Pascal | Leonhard Euler | 2 | Kartesisches Koordinatensystem | alt=Descartes
Wer entwickelte unabhängig von Newton die Infinitesimalrechnung? | Gottfried Wilhelm Leibniz | Leonhard Euler | Carl Friedrich Gauß | Blaise Pascal | 2 | Gottfried Wilhelm Leibniz | alt=Leibniz
Welcher Mathematiker gilt als „Fürst der Mathematik“ und war auf dem 10-DM-Schein abgebildet? | Carl Friedrich Gauß | Leonhard Euler | Bernhard Riemann | David Hilbert | 2 | Deutsche Mark | alt=Gauß/Gauss
Nach wem ist der Komet benannt, der etwa alle 76 Jahre wiederkehrt? | Edmond Halley | Edwin Hubble | Johannes Kepler | Tycho Brahe | 1 | Halleyscher Komet | alt=Halley
Wer beobachtete als einer der Ersten Bakterien unter einem selbst gebauten Mikroskop? | Antoni van Leeuwenhoek | Robert Hooke | Louis Pasteur | Robert Koch | 2 | Mikroskop | alt=Leeuwenhoek
Wer prägte für die kleinsten Baueinheiten von Kork den Begriff „Zelle“? | Robert Hooke | Antoni van Leeuwenhoek | Rudolf Virchow | Matthias Schleiden | 2 | Zelle (Biologie) | alt=Hooke
Welche Forscherin entdeckte mit Otto Hahn die Erklärung der Kernspaltung? | Lise Meitner | Marie Curie | Irène Joliot-Curie | Emmy Noether | 2 | Lise Meitner | alt=Meitner
Für welche Gen-Schere erhielten Emmanuelle Charpentier und Jennifer Doudna 2020 den Nobelpreis? | CRISPR/Cas9 | PCR | mRNA | Klonschaf Dolly | 2 | Desoxyribonukleinsäure | mc
Welcher Universalgelehrte bereiste Südamerika und gilt als Mitbegründer der Geografie? | Alexander von Humboldt | Charles Darwin | James Cook | Carl Ritter | 2 | Chimborazo | alt=Humboldt
Wer stellte die These auf, dass Energie und Masse äquivalent sind (E = mc²)? | Albert Einstein | Max Planck | Isaac Newton | Niels Bohr | 1 | Relativitätstheorie | alt=Einstein

# Weltall
Welcher Planet hat die auffälligsten Ringe? | Saturn | Jupiter | Uranus | Neptun | 1 | Saturn (Planet)
Welcher Planet ist der heißeste in unserem Sonnensystem? | Venus | Merkur | Mars | Jupiter | 2 | Venus (Planet)
Welcher Planet rotiert „liegend“ mit stark gekippter Achse? | Uranus | Neptun | Saturn | Mars | 2 | Uranus (Planet)
Welcher Himmelskörper wurde 2006 vom Planeten zum Zwergplaneten herabgestuft? | Pluto | Ceres | Eris | Charon | 1 | Pluto (Zwergplanet)
Wie heißt unsere Galaxie? | Milchstraße | Andromeda | Großer Wagen | Orion | 1 | Milchstraße
Wie lange braucht das Licht ungefähr von der Sonne zur Erde? | 8 Minuten | 8 Sekunden | 8 Stunden | 1 Tag | 1 | Sonne | mc
Wie lange braucht die Erde für eine Umrundung der Sonne? | ungefähr 365 Tage | 30 Tage | 24 Stunden | 100 Tage | 1 | Erdbahn | mc
Wie lange dauert eine Drehung der Erde um sich selbst? | ungefähr 24 Stunden | 12 Stunden | 365 Tage | 7 Tage | 1 | Erde | mc
Was ist die Sonne? | Ein Stern | Ein Planet | Ein Komet | Ein Mond | 1 | Sonne | mc
Wie heißt der größte Vulkan im Sonnensystem (auf dem Mars)? | Olympus Mons | Mauna Kea | Ätna | Kilimandscharo | 2 | Olympus Mons
Wie nennt man den Punkt, an dem die Schwerkraft eines Schwarzen Lochs nichts mehr entkommen lässt? | Ereignishorizont | Singularität | Perihel | Zenit | 2 | Schwarzes Loch
Wie heißt die Nachbargalaxie, die mit der Milchstraße kollidieren wird? | Andromedagalaxie | Große Magellansche Wolke | Sombrerogalaxie | Whirlpool-Galaxie | 2 | Andromedagalaxie | alt=Andromeda
Welcher Stern ist der Erde (nach der Sonne) am nächsten? | Proxima Centauri | Sirius | Polarstern | Betelgeuse | 2 | Alpha Centauri
Welcher Stern zeigt am Nachthimmel ungefähr die Richtung Norden an? | Polarstern | Sirius | Wega | Beteigeuze | 1 | Polarstern
Was ist eine Sonnenfinsternis? | Der Mond schiebt sich vor die Sonne | Die Erde schiebt sich vor die Sonne | Die Sonne erlischt kurz | Der Mond steht im Erdschatten | 1 | Sonnenfinsternis | mc
Was ist eine Mondfinsternis? | Der Mond steht im Erdschatten | Der Mond schiebt sich vor die Sonne | Neumond | Der Mond dreht sich weg | 1 | Mondfinsternis | mc
Wie heißt das Weltraumteleskop, das 2021 als Nachfolger von Hubble startete? | James Webb | Kepler | Spitzer | Chandra | 2 | James-Webb-Weltraumteleskop | alt=James-Webb-Teleskop/James Webb Space Telescope
Wie heißt die Internationale Raumstation abgekürzt? | ISS | NASA | ESA | MIR | 1 | Internationale Raumstation
Wie heißt die europäische Weltraumorganisation? | ESA | NASA | Roskosmos | JAXA | 1 | Europäische Weltraumorganisation
Wie heißt der Gürtel aus Kleinkörpern zwischen Mars und Jupiter? | Asteroidengürtel | Kuipergürtel | Oortsche Wolke | Van-Allen-Gürtel | 1 | Asteroidengürtel
Wie nennt man einen Meteoriten, der in der Atmosphäre verglüht und leuchtet? | Sternschnuppe | Komet | Supernova | Nebel | 1 | Meteor | alt=Meteor
Wie heißt das Sternbild mit den drei „Gürtelsternen“? | Orion | Großer Wagen | Kassiopeia | Schwan | 2 | Orion (Sternbild)
Welches Gas macht den Großteil der Sonne aus? | Wasserstoff | Sauerstoff | Stickstoff | Kohlendioxid | 1 | Sonne
Was ist ein Lichtjahr? | Eine Entfernung | Eine Zeitspanne | Eine Helligkeit | Eine Geschwindigkeit | 1 | Lichtjahr | mc
Welcher Planet hat den „Großen Roten Fleck“? | Jupiter | Mars | Saturn | Venus | 1 | Jupiter (Planet)
Wie heißt die Mondphase, in der der Mond nicht sichtbar ist? | Neumond | Vollmond | Halbmond | Sichelmond | 1 | Mondphase
Welcher deutsche Astronaut flog 1978 als erster Deutscher ins All? | Sigmund Jähn | Ulf Merbold | Alexander Gerst | Thomas Reiter | 2 | Sigmund Jähn | alt=Jähn
Welcher deutsche Astronaut war 2014 und 2018 auf der ISS? | Alexander Gerst | Matthias Maurer | Ulf Merbold | Sigmund Jähn | 1 | Alexander Gerst | alt=Gerst

# Physik & Chemie
Bei wie viel Grad Celsius gefriert Wasser (Normaldruck)? | 0 °C | 4 °C | −10 °C | 10 °C | 1 | Eis
Bei welcher Temperatur hat Wasser seine größte Dichte? | 4 °C | 0 °C | 100 °C | −4 °C | 2 | Wasser
Was ist der absolute Nullpunkt in Grad Celsius (gerundet)? | −273 °C | −100 °C | −459 °C | 0 °C | 2 | Absoluter Nullpunkt
Wie nennt man den Übergang von fest zu flüssig? | Schmelzen | Verdampfen | Sublimieren | Kondensieren | 1 | Schmelzen
Wie nennt man den direkten Übergang von fest zu gasförmig? | Sublimation | Kondensation | Verdunstung | Erstarrung | 2 | Sublimation (Phasenübergang)
Wie nennt man den Übergang von gasförmig zu flüssig? | Kondensation | Verdampfung | Sublimation | Resublimation | 2 | Kondensation
Welche Farbe hat Licht mit der kürzesten Wellenlänge im sichtbaren Spektrum? | Violett | Rot | Grün | Gelb | 2 | Lichtspektrum
In welche Farben zerlegt ein Prisma weißes Licht? | In die Regenbogenfarben | Nur in Rot und Blau | In Schwarz und Weiß | Gar nicht | 1 | Prisma (Optik) | mc
Was misst ein Barometer? | Luftdruck | Temperatur | Luftfeuchtigkeit | Windgeschwindigkeit | 1 | Barometer
Was misst ein Thermometer? | Temperatur | Luftdruck | Gewicht | Lautstärke | 1 | Thermometer
Was misst ein Seismograf? | Erdbeben | Luftdruck | Strahlung | Regenmenge | 1 | Seismometer
Was misst ein Anemometer? | Windgeschwindigkeit | Luftdruck | Temperatur | Luftfeuchtigkeit | 2 | Anemometer
Was misst ein Hygrometer? | Luftfeuchtigkeit | Luftdruck | Windstärke | Temperatur | 2 | Hygrometer
Was misst ein Geigerzähler? | Radioaktive Strahlung | Lautstärke | Stromstärke | Lichtstärke | 1 | Geigerzähler
Welche Teilchen umkreisen den Atomkern? | Elektronen | Protonen | Neutronen | Photonen | 1 | Atom
Welche Teilchen befinden sich im Atomkern? | Protonen und Neutronen | Elektronen und Protonen | Nur Elektronen | Photonen | 1 | Atomkern | mc
Welche elektrische Ladung hat ein Elektron? | Negativ | Positiv | Neutral | Wechselnd | 1 | Elektron
Welche Ladung hat ein Proton? | Positiv | Negativ | Neutral | Wechselnd | 1 | Proton
Welcher pH-Wert gilt als neutral? | 7 | 0 | 14 | 1 | 1 | PH-Wert
Ist eine Lösung mit pH-Wert 2 sauer oder basisch? | Sauer | Basisch | Neutral | Salzig | 1 | PH-Wert
Welches Edelgas wird in Leuchtreklamen verwendet und leuchtet rot-orange? | Neon | Helium | Argon | Xenon | 1 | Neon
Welches Gas macht etwa 78 % der Luft aus? | Stickstoff | Sauerstoff | Kohlendioxid | Argon | 1 | Erdatmosphäre
Wie viel Prozent der Luft sind ungefähr Sauerstoff? | 21 % | 78 % | 50 % | 5 % | 1 | Erdatmosphäre
Welches Metall ist bei Raumtemperatur flüssig? | Quecksilber | Blei | Zinn | Aluminium | 1 | Quecksilber
Welches ist das leichteste Element? | Wasserstoff | Helium | Lithium | Sauerstoff | 1 | Wasserstoff
Welches Metall leitet Strom am besten? | Silber | Kupfer | Gold | Aluminium | 2 | Silber
Welches Gas lässt Luftballons nach oben schweben? | Helium | Stickstoff | Kohlendioxid | Sauerstoff | 1 | Luftballon
Wie heißt die Kraft, die Gegenstände zur Erde zieht? | Schwerkraft (Gravitation) | Reibung | Magnetismus | Fliehkraft | 1 | Gravitation | alt=Schwerkraft/Gravitation/Erdanziehung
Wie schnell breitet sich Schall in Luft ungefähr aus? | 343 m/s | 30 m/s | 3.000 m/s | 300.000 km/s | 2 | Schallgeschwindigkeit | mc
Was ist schneller: Licht oder Schall? | Licht | Schall | Beide gleich schnell | Kommt auf das Wetter an | 1 | Blitz | mc
Wie nennt man Schall oberhalb der menschlichen Hörgrenze? | Ultraschall | Infraschall | Überschall | Hall | 1 | Ultraschall
Wie heißt das Gerät, das Wechselspannung umwandelt (z. B. von 230 V auf 12 V)? | Transformator | Generator | Kondensator | Diode | 2 | Transformator
Welche Spannung hat eine normale Steckdose in Deutschland? | 230 Volt | 110 Volt | 12 Volt | 400 Volt | 1 | Steckdose
Wie nennt man Stoffe, die Strom gut leiten? | Leiter | Isolatoren | Halbleiter | Magnete | 1 | Elektrischer Leiter
Welcher Pol eines Magneten zieht den Nordpol eines anderen Magneten an? | Südpol | Nordpol | Beide | Keiner | 1 | Magnet
Was ist Rost chemisch gesehen? | Eisenoxid | Eisensulfat | Kupferoxid | Kalk | 1 | Rost
Wie heißt die Reaktion, bei der ein Stoff mit Sauerstoff reagiert? | Oxidation | Reduktion | Neutralisation | Destillation | 2 | Oxidation
Wie heißt das Trennverfahren durch Verdampfen und Kondensieren? | Destillation | Filtration | Sedimentation | Zentrifugation | 2 | Destillation
Wie viele Protonen hat ein Kohlenstoffatom? | 6 | 12 | 4 | 8 | 2 | Kohlenstoff
Aus welchem Element bestehen Diamant und Graphit? | Kohlenstoff | Silicium | Bor | Calcium | 1 | Diamant
Welcher Kraftstoff entsteht unter anderem aus Erdöl? | Benzin | Wasserstoff | Ethanol aus Mais | Biogas | 1 | Erdöl
Wie nennt man energiereiche Strahlung von der Sonne, die Sonnenbrand verursacht? | UV-Strahlung | Infrarotstrahlung | Röntgenstrahlung | Mikrowellen | 1 | Ultraviolettstrahlung | alt=UV/Ultraviolett
Wie heißt die Wärmestrahlung, die man mit Nachtsichtkameras sieht? | Infrarotstrahlung | UV-Strahlung | Gammastrahlung | Radiowellen | 2 | Infrarotstrahlung | alt=Infrarot
Was beschreibt das erste Newtonsche Gesetz? | Trägheit | Actio und Reactio | Gravitation | Reibung | 2 | Newtonsche Gesetze
Was ist schwerer: ein Kilogramm Federn oder ein Kilogramm Eisen? | Beide gleich schwer | Eisen | Federn | Kommt auf die Luft an | 1 | Waage | mc
Wie heißt der Zustand, in dem ein Stoff weder fest noch flüssig, sondern ionisiertes Gas ist? | Plasma | Kolloid | Kristall | Dampf | 2 | Plasma (Physik)

# Mensch & Biologie
Wie viele Herzkammern hat das menschliche Herz? | 2 | 4 | 1 | 3 | 2 | Herz | mc
Wie viele Herzhöhlen (Vorhöfe und Kammern) hat das menschliche Herz insgesamt? | 4 | 2 | 3 | 6 | 1 | Herz
Welches Organ reinigt das Blut und bildet Urin? | Niere | Leber | Lunge | Milz | 1 | Niere
Welches Organ produziert Galle und entgiftet den Körper? | Leber | Niere | Bauchspeicheldrüse | Magen | 1 | Leber
Welches Organ produziert Insulin? | Bauchspeicheldrüse | Leber | Niere | Schilddrüse | 1 | Bauchspeicheldrüse | alt=Pankreas
Wie heißt der längste Knochen des Menschen? | Oberschenkelknochen | Schienbein | Oberarmknochen | Wirbelsäule | 1 | Oberschenkelknochen | alt=Femur
Wie heißt der kleinste Knochen des Menschen? | Steigbügel | Hammer | Amboss | Fingerglied | 2 | Ohr
Wo im Körper liegt der Steigbügel? | Im Ohr | In der Hand | Im Fuß | In der Nase | 2 | Ohr | mc
Welcher Blutbestandteil transportiert Sauerstoff? | Rote Blutkörperchen | Weiße Blutkörperchen | Blutplättchen | Blutplasma | 1 | Erythrozyt | alt=Erythrozyten
Welche Blutzellen bekämpfen Krankheitserreger? | Weiße Blutkörperchen | Rote Blutkörperchen | Blutplättchen | Stammzellen | 1 | Leukozyt | alt=Leukozyten
Welche Blutbestandteile sorgen für die Blutgerinnung? | Blutplättchen | Rote Blutkörperchen | Weiße Blutkörperchen | Hormone | 2 | Thrombozyt | alt=Thrombozyten
Welcher Farbstoff macht das Blut rot? | Hämoglobin | Chlorophyll | Melanin | Keratin | 1 | Hämoglobin
Welcher Farbstoff macht Pflanzen grün? | Chlorophyll | Hämoglobin | Carotin | Melanin | 1 | Chlorophyll
Welcher Farbstoff bestimmt die Hautfarbe? | Melanin | Chlorophyll | Hämoglobin | Keratin | 2 | Melanin
Aus welchem Stoff bestehen Haare und Fingernägel hauptsächlich? | Keratin | Kalk | Kollagen | Chitin | 2 | Keratin
In welchem Zellbestandteil liegt die Erbinformation (DNA) hauptsächlich? | Zellkern | Zellwand | Mitochondrium | Ribosom | 1 | Zellkern
Welche Zellbestandteile gelten als „Kraftwerke der Zelle“? | Mitochondrien | Ribosomen | Chloroplasten | Vakuolen | 2 | Mitochondrium
Wo findet bei Pflanzen die Photosynthese statt? | In den Chloroplasten | In den Mitochondrien | Im Zellkern | In der Zellwand | 2 | Chloroplast | alt=Chloroplasten
Wie viele Sinne hat der Mensch nach klassischer Zählung? | 5 | 3 | 7 | 10 | 1 | Sinn (Wahrnehmung)
Mit welchem Organ riechen wir? | Nase | Zunge | Ohr | Haut | 1 | Nase
Wo sitzt der Gleichgewichtssinn? | Im Innenohr | Im Auge | In der Nase | Im Kleinhirn | 2 | Gleichgewichtsorgan | mc
Wie heißt die lichtempfindliche Schicht im Auge? | Netzhaut | Hornhaut | Iris | Linse | 2 | Netzhaut | alt=Retina
Welcher Teil des Auges bestimmt die Augenfarbe? | Iris | Pupille | Netzhaut | Linse | 1 | Iris (Auge) | alt=Regenbogenhaut
Welches Vitamin bildet der Körper mit Hilfe von Sonnenlicht? | Vitamin D | Vitamin C | Vitamin A | Vitamin B12 | 1 | Vitamin D
Bei welchem Vitaminmangel bekamen Seeleute früher Skorbut? | Vitamin C | Vitamin D | Vitamin A | Vitamin K | 1 | Skorbut
Welches Vitamin ist besonders wichtig für die Blutgerinnung? | Vitamin K | Vitamin C | Vitamin E | Vitamin D | 2 | Vitamin K
Welche normale Körpertemperatur hat ein gesunder Mensch ungefähr? | 37 °C | 35 °C | 39 °C | 40 °C | 1 | Körpertemperatur
Wie viel Liter Blut hat ein Erwachsener ungefähr? | 5 bis 6 Liter | 1 bis 2 Liter | 10 bis 12 Liter | 20 Liter | 1 | Blut | mc
Wie heißt der größte Muskel des Menschen? | Großer Gesäßmuskel | Bizeps | Herzmuskel | Oberschenkelmuskel | 2 | Gluteus maximus | mc
Was transportiert das Blut von der Lunge zum Herzen? | Sauerstoffreiches Blut | Sauerstoffarmes Blut | Lymphe | Galle | 2 | Lungenvene | mc
Wie heißen die Blutgefäße, die vom Herzen wegführen? | Arterien | Venen | Kapillaren | Lymphgefäße | 1 | Arterie | alt=Schlagadern
Wie heißen die feinsten Blutgefäße? | Kapillaren | Arterien | Venen | Aorta | 2 | Kapillare (Anatomie)
Wie heißt die größte Arterie des Körpers? | Aorta | Halsschlagader | Hohlvene | Lungenarterie | 2 | Aorta
Wie viele Wirbel hat die menschliche Halswirbelsäule? | 7 | 5 | 12 | 3 | 2 | Halswirbelsäule
Wie viele Rippenpaare hat ein Mensch normalerweise? | 12 | 10 | 14 | 8 | 2 | Rippe
Wie viele Milchzähne hat ein Kind normalerweise? | 20 | 32 | 24 | 16 | 2 | Milchzahn
Welches Organ ist das größte innere Organ? | Leber | Lunge | Herz | Magen | 2 | Leber
Welcher Teil des Gehirns ist für Koordination und Gleichgewicht wichtig? | Kleinhirn | Großhirn | Stammhirn | Hypophyse | 2 | Kleinhirn
Wie heißen Krankheitserreger, die nur in Wirtszellen vermehrbar sind? | Viren | Bakterien | Pilze | Würmer | 1 | Virus
Wogegen helfen Antibiotika? | Gegen Bakterien | Gegen Viren | Gegen Allergien | Gegen Kopfschmerzen | 1 | Antibiotikum | mc
Wie heißt das Hormon, das den Blutzucker senkt? | Insulin | Adrenalin | Cortisol | Östrogen | 1 | Insulin
Welches Hormon wird bei Stress und Gefahr ausgeschüttet? | Adrenalin | Insulin | Melatonin | Oxytocin | 1 | Adrenalin
Welches Hormon steuert den Schlaf-Wach-Rhythmus? | Melatonin | Adrenalin | Insulin | Testosteron | 2 | Melatonin
Wie heißt die Erbsubstanz abgekürzt? | DNA | ATP | RNA-Virus | EKG | 1 | Desoxyribonukleinsäure | alt=DNS
Was misst ein EKG? | Die Herzaktivität | Die Hirnströme | Den Blutzucker | Die Lungenkapazität | 2 | Elektrokardiogramm | mc
Wie heißt die Wissenschaft von den Pflanzen? | Botanik | Zoologie | Geologie | Ökologie | 1 | Botanik
Wie heißt die Wissenschaft von den Tieren? | Zoologie | Botanik | Anthropologie | Mykologie | 1 | Zoologie
Wie heißt die Lehre von Gesteinen und dem Aufbau der Erde? | Geologie | Biologie | Astronomie | Meteorologie | 1 | Geologie
Wie heißt die Wissenschaft vom Wetter? | Meteorologie | Astrologie | Ökologie | Seismologie | 1 | Meteorologie
Wie heißt die Wissenschaft von den Pilzen? | Mykologie | Botanik | Virologie | Entomologie | 2 | Mykologie
Wie heißt die Wissenschaft von den Insekten? | Entomologie | Ornithologie | Mykologie | Ichthyologie | 2 | Entomologie
Wie heißt die Wissenschaft von den Vögeln? | Ornithologie | Entomologie | Herpetologie | Ichthyologie | 2 | Ornithologie
Wie heißt die Lehre von Sternen und Himmelskörpern? | Astronomie | Astrologie | Geologie | Kosmetik | 1 | Astronomie
Wie heißt die Lehre von den Erbanlagen? | Genetik | Ethik | Ökologie | Anatomie | 1 | Genetik

# Mathematik
Wie groß ist die Winkelsumme in einem Dreieck? | 180° | 360° | 90° | 270° | 1 | Dreieck
Wie groß ist die Winkelsumme in einem Viereck? | 360° | 180° | 540° | 270° | 1 | Viereck
Wie groß ist ein rechter Winkel? | 90° | 180° | 45° | 60° | 1 | Rechter Winkel
Wie lautet die Kreiszahl π ungefähr? | 3,14 | 2,71 | 1,41 | 3,41 | 1 | Kreiszahl
Wie berechnet man den Flächeninhalt eines Kreises? | π · r² | 2 · π · r | π · d | r² · 2 | 2 | Kreis | mc
Wie berechnet man den Umfang eines Kreises? | 2 · π · r | π · r² | r · d | π + r | 2 | Kreis | mc
Was ist die kleinste Primzahl? | 2 | 1 | 3 | 0 | 1 | Primzahl
Welche dieser Zahlen ist eine Primzahl? | 17 | 21 | 27 | 33 | 1 | Primzahl | mc
Welche dieser Zahlen ist eine Primzahl? | 29 | 39 | 49 | 51 | 2 | Primzahl | mc
Wie viele Grad hat ein Vollkreis? | 360° | 180° | 400° | 100° | 1 | Kreis
Wie nennt man ein Dreieck mit drei gleich langen Seiten? | Gleichseitig | Gleichschenklig | Rechtwinklig | Stumpfwinklig | 1 | Gleichseitiges Dreieck | alt=gleichseitiges Dreieck
Wie heißt die längste Seite im rechtwinkligen Dreieck? | Hypotenuse | Kathete | Höhe | Diagonale | 1 | Satz des Pythagoras
Was ist 15 % von 200? | 30 | 15 | 20 | 35 | 1 | Prozent
Was ist 25 % von 80? | 20 | 25 | 16 | 40 | 1 | Prozent
Wie viel ist 7 · 8? | 56 | 54 | 48 | 64 | 1 | Einmaleins
Wie viel ist 12 · 12? | 144 | 124 | 132 | 154 | 1 | Einmaleins
Wie heißt das Ergebnis einer Multiplikation? | Produkt | Summe | Differenz | Quotient | 1 | Multiplikation
Wie heißt das Ergebnis einer Division? | Quotient | Produkt | Summe | Differenz | 1 | Division (Mathematik)
Wie heißt das Ergebnis einer Addition? | Summe | Produkt | Differenz | Quotient | 1 | Addition
Wie heißt das Ergebnis einer Subtraktion? | Differenz | Summe | Produkt | Quotient | 1 | Subtraktion
Wie viele Nullen hat eine Million? | 6 | 9 | 3 | 12 | 1 | Million
Wie viele Nullen hat eine Milliarde? | 9 | 6 | 12 | 8 | 1 | Milliarde
Wie viele Nullen hat eine (deutsche) Billion? | 12 | 9 | 15 | 18 | 2 | Billion
Was ist 2 hoch 10? | 1024 | 1000 | 512 | 2048 | 2 | Zweierpotenz
Wie viele Kanten hat ein Würfel? | 12 | 8 | 6 | 24 | 2 | Würfel (Geometrie)
Wie viele Ecken hat ein Würfel? | 8 | 6 | 12 | 4 | 1 | Würfel (Geometrie)
Wie nennt man eine Zahl, die nur durch 1 und sich selbst teilbar ist? | Primzahl | Quadratzahl | Bruchzahl | Gerade Zahl | 1 | Primzahl
Wie heißt die Zahlenfolge 1, 1, 2, 3, 5, 8, 13 …? | Fibonacci-Folge | Primzahlfolge | Quadratfolge | Euler-Folge | 2 | Fibonacci-Folge | alt=Fibonacci
Was ist 1/4 als Dezimalzahl? | 0,25 | 0,4 | 0,14 | 0,5 | 1 | Bruchrechnung
Was ist 3/4 als Prozentzahl? | 75 % | 34 % | 70 % | 80 % | 1 | Prozent
Wie viele Zentimeter hat ein Meter? | 100 | 10 | 1000 | 50 | 1 | Meter
Wie viele Meter hat ein Kilometer? | 1000 | 100 | 10.000 | 500 | 1 | Kilometer
Wie viele Quadratmeter hat ein Hektar? | 10.000 | 1000 | 100 | 100.000 | 2 | Hektar
Wie viele Milliliter hat ein Liter? | 1000 | 100 | 10 | 10.000 | 1 | Liter
Wie viele Gramm hat ein Kilogramm? | 1000 | 100 | 10 | 10.000 | 1 | Kilogramm
Wie viele Kilogramm hat eine Tonne? | 1000 | 100 | 10.000 | 500 | 1 | Tonne (Einheit)
Wie viele Sekunden hat eine Stunde? | 3600 | 360 | 6000 | 1200 | 1 | Stunde
Wie viele Stunden hat eine Woche? | 168 | 144 | 172 | 120 | 2 | Woche
`);
})();
