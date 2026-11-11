/* Kunst & Kultur – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "kultur";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const PAINT = parse(`
Mona Lisa;Leonardo da Vinci;Mona Lisa
Das Abendmahl;Leonardo da Vinci;Das Abendmahl (Leonardo da Vinci)
Die Geburt der Venus;Sandro Botticelli;Die Geburt der Venus (Botticelli)
Primavera;Sandro Botticelli;Primavera (Botticelli)
Die Erschaffung Adams;Michelangelo;Die Erschaffung Adams
Die Schule von Athen;Raffael;Die Schule von Athen
Sixtinische Madonna;Raffael;Sixtinische Madonna
Die Nachtwache;Rembrandt van Rijn;Die Nachtwache
Die Anatomie des Dr. Tulp;Rembrandt van Rijn;Die Anatomie des Dr. Tulp
Das Mädchen mit dem Perlenohrgehänge;Jan Vermeer;Das Mädchen mit dem Perlenohrgehänge
Die Sternennacht;Vincent van Gogh;Sternennacht
Sonnenblumen;Vincent van Gogh;Sonnenblumen (Van Gogh)
Die Kartoffelesser;Vincent van Gogh;Die Kartoffelesser
Der Schrei;Edvard Munch;Der Schrei
Der Kuss (Gemälde, Goldhintergrund);Gustav Klimt;Der Kuss (Klimt)
Guernica;Pablo Picasso;Guernica (Bild)
Les Demoiselles d’Avignon;Pablo Picasso;Les Demoiselles d’Avignon
Die Beständigkeit der Erinnerung (zerfließende Uhren);Salvador Dalí;Die Beständigkeit der Erinnerung
Impression, Sonnenaufgang;Claude Monet;Impression, soleil levant
Seerosen;Claude Monet;Seerosen (Monet)
Der Wanderer über dem Nebelmeer;Caspar David Friedrich;Der Wanderer über dem Nebelmeer
Kreidefelsen auf Rügen;Caspar David Friedrich;Kreidefelsen auf Rügen
Das Eismeer;Caspar David Friedrich;Das Eismeer
Die große Welle vor Kanagawa;Katsushika Hokusai;Die große Welle vor Kanagawa
American Gothic;Grant Wood;American Gothic
Nighthawks;Edward Hopper;Nighthawks
Campbell’s Soup Cans;Andy Warhol;Campbell’s Soup Cans
Das Floß der Medusa;Théodore Géricault;Das Floß der Medusa
Die Freiheit führt das Volk;Eugène Delacroix;Die Freiheit führt das Volk
Der arme Poet;Carl Spitzweg;Der arme Poet
Der Garten der Lüste;Hieronymus Bosch;Der Garten der Lüste
Die Jäger im Schnee;Pieter Bruegel der Ältere;Die Jäger im Schnee
Der Turmbau zu Babel;Pieter Bruegel der Ältere;Turmbau zu Babel (Bruegel)
Selbstbildnis im Pelzrock;Albrecht Dürer;Selbstbildnis im Pelzrock
Feldhase (Aquarell);Albrecht Dürer;Feldhase (Dürer)
Betende Hände;Albrecht Dürer;Betende Hände
Ein Sonntagnachmittag auf der Insel La Grande Jatte;Georges Seurat;Ein Sonntagnachmittag auf der Insel La Grande Jatte
Das Frühstück im Grünen;Édouard Manet;Das Frühstück im Grünen
Bal du moulin de la Galette;Pierre-Auguste Renoir;Bal du moulin de la Galette
Komposition mit Rot, Blau und Gelb;Piet Mondrian;Piet Mondrian
Der Blaue Reiter (Gemälde von 1903);Wassily Kandinsky;Der Blaue Reiter (Gemälde)
Turm der blauen Pferde;Franz Marc;Der Turm der blauen Pferde
Der Sohn des Menschen (Apfel vor dem Gesicht);René Magritte;Der Sohn des Menschen
Der Verrat der Bilder („Ceci n’est pas une pipe“);René Magritte;Der Verrat der Bilder
Die zwei Fridas;Frida Kahlo;Die zwei Fridas
Girl with Balloon;Banksy;Girl with Balloon
Der Heuwagen;John Constable;Der Heuwagen
Las Meninas;Diego Velázquez;Las Meninas
Die Erschießung der Aufständischen (Der 3. Mai 1808);Francisco de Goya;Die Erschießung der Aufständischen
Venus von Urbino;Tizian;Venus von Urbino
Isenheimer Altar;Matthias Grünewald;Isenheimer Altar
Die Gesandten;Hans Holbein der Jüngere;Die Gesandten
Das Jüngste Gericht (Altarwand der Sixtinischen Kapelle);Michelangelo;Das Jüngste Gericht (Michelangelo)
Die Tanzklasse;Edgar Degas;Edgar Degas
Brücke von Langlois;Vincent van Gogh;Die Brücke von Langlois
Marilyn Diptych;Andy Warhol;Marilyn Diptych
Whaam!;Roy Lichtenstein;Whaam!
`);
  const painters = [...new Set(PAINT.map((p) => p[1]))];
  table(C, PAINT, { q: (p) => `Wer malte „${p[0]}“?`, a: (p) => p[1], pool: painters, diff: (p) => (["Mona Lisa", "Die Sternennacht", "Der Schrei", "Guernica", "Das Abendmahl", "Die Erschaffung Adams", "Die Nachtwache", "Sonnenblumen", "Seerosen", "Campbell’s Soup Cans", "Der Wanderer über dem Nebelmeer", "Die Geburt der Venus"].includes(p[0]) ? 1 : 2), img: (p) => p[2] });

  lines(C, `
Wer schuf die Marmorstatue „David“ in Florenz? | Michelangelo | Donatello | Bernini | Rodin | 1 | David (Michelangelo)
Wer schuf die Skulptur „Der Denker“? | Auguste Rodin | Michelangelo | Camille Claudel | Henry Moore | 1 | Der Denker | alt=Rodin
Wer schuf die Pietà im Petersdom? | Michelangelo | Bernini | Donatello | Canova | 2 | Pietà (Michelangelo)
Wo steht die Büste der Nofretete heute? | Berlin | Kairo | London | Paris | 2 | Nofretete
In welchem Museum hängt die Mona Lisa? | Louvre | Prado | Uffizien | British Museum | 1 | Mona Lisa
Wie heißt die berühmte antike Statue ohne Arme im Louvre? | Venus von Milo | Nike von Samothrake | Laokoon | Diskobolos | 2 | Venus von Milo
Welcher Künstler verpackte 1995 den Berliner Reichstag? | Christo und Jeanne-Claude | Joseph Beuys | Gerhard Richter | Banksy | 2 | Verhüllter Reichstag
Welcher deutsche Künstler arbeitete mit Fett und Filz? | Joseph Beuys | Gerhard Richter | Anselm Kiefer | Georg Baselitz | 2 | Joseph Beuys | alt=Beuys
Welcher deutsche Maler ist für verwischte Fotomalerei und Farbfeld-Bilder bekannt? | Gerhard Richter | Caspar David Friedrich | Max Liebermann | Otto Dix | 2 | Gerhard Richter | alt=Richter
Welcher Street-Art-Künstler bleibt anonym und ließ ein Bild bei einer Auktion schreddern? | Banksy | Keith Haring | Shepard Fairey | Jean-Michel Basquiat | 1 | Girl with Balloon
`);

  const BOOKS = parse(`
Faust;Johann Wolfgang von Goethe|Goethe
Die Leiden des jungen Werthers;Johann Wolfgang von Goethe|Goethe
Die Wahlverwandtschaften;Johann Wolfgang von Goethe|Goethe
Erlkönig (Ballade);Johann Wolfgang von Goethe|Goethe
Die Räuber;Friedrich Schiller|Schiller
Wilhelm Tell;Friedrich Schiller|Schiller
Kabale und Liebe;Friedrich Schiller|Schiller
Das Lied von der Glocke;Friedrich Schiller|Schiller
Nathan der Weise;Gotthold Ephraim Lessing|Lessing
Emilia Galotti;Gotthold Ephraim Lessing|Lessing
Der zerbrochne Krug;Heinrich von Kleist|Kleist
Woyzeck;Georg Büchner|Büchner
Effi Briest;Theodor Fontane|Fontane
Der Schimmelreiter;Theodor Storm|Storm
Buddenbrooks;Thomas Mann|Mann
Der Zauberberg;Thomas Mann|Mann
Der Tod in Venedig;Thomas Mann|Mann
Der Untertan;Heinrich Mann|Heinrich Mann
Die Verwandlung;Franz Kafka|Kafka
Der Process;Franz Kafka|Kafka
Siddhartha;Hermann Hesse|Hesse
Der Steppenwolf;Hermann Hesse|Hesse
Die Blechtrommel;Günter Grass|Grass
Im Westen nichts Neues;Erich Maria Remarque|Remarque
Die Dreigroschenoper;Bertolt Brecht|Brecht
Mutter Courage und ihre Kinder;Bertolt Brecht|Brecht
Der Besuch der alten Dame;Friedrich Dürrenmatt|Dürrenmatt
Die Physiker;Friedrich Dürrenmatt|Dürrenmatt
Homo faber;Max Frisch|Frisch
Andorra;Max Frisch|Frisch
Schachnovelle;Stefan Zweig|Zweig
Berlin Alexanderplatz;Alfred Döblin|Döblin
Das Parfum;Patrick Süskind|Süskind
Der Vorleser;Bernhard Schlink|Schlink
Tschick;Wolfgang Herrndorf|Herrndorf
Emil und die Detektive;Erich Kästner|Kästner
Das doppelte Lottchen;Erich Kästner|Kästner
Das fliegende Klassenzimmer;Erich Kästner|Kästner
Die unendliche Geschichte;Michael Ende|Ende
Momo;Michael Ende|Ende
Jim Knopf und Lukas der Lokomotivführer;Michael Ende|Ende
Krabat;Otfried Preußler|Preußler
Der Räuber Hotzenplotz;Otfried Preußler|Preußler
Die kleine Hexe;Otfried Preußler|Preußler
Max und Moritz;Wilhelm Busch|Busch
Der Struwwelpeter;Heinrich Hoffmann|Hoffmann
Deutschland. Ein Wintermärchen;Heinrich Heine|Heine
Die Lore-Ley („Ich weiß nicht, was soll es bedeuten“);Heinrich Heine|Heine
Der Panther (Gedicht);Rainer Maria Rilke|Rilke
Kinder- und Hausmärchen;Brüder Grimm|Grimm
Winnetou;Karl May|May
Heidi;Johanna Spyri|Spyri
Pippi Langstrumpf;Astrid Lindgren|Lindgren
Ronja Räubertochter;Astrid Lindgren|Lindgren
Michel aus Lönneberga;Astrid Lindgren|Lindgren
Die kleine Meerjungfrau;Hans Christian Andersen|Andersen
Des Kaisers neue Kleider;Hans Christian Andersen|Andersen
Das hässliche Entlein;Hans Christian Andersen|Andersen
Das Tagebuch der Anne Frank;Anne Frank|Frank
Der kleine Prinz;Antoine de Saint-Exupéry|Saint-Exupéry
Hamlet;William Shakespeare|Shakespeare
Macbeth;William Shakespeare|Shakespeare
Ein Sommernachtstraum;William Shakespeare|Shakespeare
Othello;William Shakespeare|Shakespeare
Oliver Twist;Charles Dickens|Dickens
Eine Weihnachtsgeschichte;Charles Dickens|Dickens
Stolz und Vorurteil;Jane Austen|Austen
1984;George Orwell|Orwell
Farm der Tiere;George Orwell|Orwell
Schöne neue Welt;Aldous Huxley|Huxley
Der Herr der Ringe;J. R. R. Tolkien|Tolkien
Der Hobbit;J. R. R. Tolkien|Tolkien
Die Chroniken von Narnia;C. S. Lewis|Lewis
Alice im Wunderland;Lewis Carroll|Carroll
Robinson Crusoe;Daniel Defoe|Defoe
Gullivers Reisen;Jonathan Swift|Swift
Die Schatzinsel;Robert Louis Stevenson|Stevenson
Der seltsame Fall des Dr. Jekyll und Mr. Hyde;Robert Louis Stevenson|Stevenson
Frankenstein;Mary Shelley|Shelley
Dracula;Bram Stoker|Stoker
Sherlock Holmes (Detektivgeschichten);Arthur Conan Doyle|Conan Doyle
Mord im Orient-Express;Agatha Christie|Christie
Moby-Dick;Herman Melville|Melville
Die Abenteuer des Tom Sawyer;Mark Twain|Twain
Die Abenteuer des Huckleberry Finn;Mark Twain|Twain
Onkel Toms Hütte;Harriet Beecher Stowe|Stowe
Der alte Mann und das Meer;Ernest Hemingway|Hemingway
Der große Gatsby;F. Scott Fitzgerald|Fitzgerald
Der Fänger im Roggen;J. D. Salinger|Salinger
Wer die Nachtigall stört;Harper Lee|Lee
Früchte des Zorns;John Steinbeck|Steinbeck
Krieg und Frieden;Lew Tolstoi|Tolstoi
Anna Karenina;Lew Tolstoi|Tolstoi
Schuld und Sühne;Fjodor Dostojewski|Dostojewski
Die Brüder Karamasow;Fjodor Dostojewski|Dostojewski
Don Quijote;Miguel de Cervantes|Cervantes
Die Göttliche Komödie;Dante Alighieri|Dante
Der Graf von Monte Christo;Alexandre Dumas|Dumas
Die drei Musketiere;Alexandre Dumas|Dumas
Die Elenden (Les Misérables);Victor Hugo|Hugo
Der Glöckner von Notre-Dame;Victor Hugo|Hugo
In 80 Tagen um die Welt;Jules Verne|Verne
20.000 Meilen unter dem Meer;Jules Verne|Verne
Madame Bovary;Gustave Flaubert|Flaubert
Hundert Jahre Einsamkeit;Gabriel García Márquez|Márquez
Der Name der Rose;Umberto Eco|Eco
Pinocchio;Carlo Collodi|Collodi
Das Dschungelbuch;Rudyard Kipling|Kipling
Peter Pan;J. M. Barrie|Barrie
Der Zauberer von Oz;L. Frank Baum|Baum
Die Tribute von Panem;Suzanne Collins|Collins
Das Lied von Eis und Feuer (Game of Thrones);George R. R. Martin|Martin
Es (Horrorroman mit Clown);Stephen King|King
Sakrileg (The Da Vinci Code);Dan Brown|Brown
Der Alchimist;Paulo Coelho|Coelho
Die Säulen der Erde;Ken Follett|Follett
Der Medicus;Noah Gordon|Gordon
Gregs Tagebuch;Jeff Kinney|Kinney
Der Hundertjährige, der aus dem Fenster stieg und verschwand;Jonas Jonasson|Jonasson
Das Kapital;Karl Marx|Marx
`);
  const authors = [...new Set(BOOKS.map((b) => b[1].split("|")[0]))];
  const famous = ["Faust", "Die Räuber", "Wilhelm Tell", "Die Verwandlung", "Hamlet", "1984", "Der Herr der Ringe", "Pippi Langstrumpf", "Momo", "Die unendliche Geschichte", "Emil und die Detektive", "Max und Moritz", "Der kleine Prinz", "Das Tagebuch der Anne Frank", "Winnetou", "Heidi", "Robinson Crusoe", "Die Abenteuer des Tom Sawyer", "Der Hobbit", "Oliver Twist", "Der Struwwelpeter", "Kinder- und Hausmärchen", "Die kleine Meerjungfrau", "Krieg und Frieden", "Die Tribute von Panem", "Der Räuber Hotzenplotz", "Im Westen nichts Neues", "Das doppelte Lottchen", "Die Blechtrommel", "Effi Briest", "Buddenbrooks", "Die Dreigroschenoper", "In 80 Tagen um die Welt", "Gregs Tagebuch", "Dracula", "Frankenstein", "Macbeth", "Alice im Wunderland", "Das Dschungelbuch", "Pinocchio"];
  table(C, BOOKS, { q: (b) => `Wer schrieb „${b[0]}“?`, a: (b) => b[1].split("|")[0], pool: authors, alt: (b) => [b[1].split("|")[1]], diff: (b) => (famous.includes(b[0]) ? 1 : 2), img: (b) => b[1].split("|")[0] === "Brüder Grimm" ? "Brüder Grimm" : null });

  const MUSIC = parse(`
Die Zauberflöte;Wolfgang Amadeus Mozart
Eine kleine Nachtmusik;Wolfgang Amadeus Mozart
Die Hochzeit des Figaro;Wolfgang Amadeus Mozart
Don Giovanni;Wolfgang Amadeus Mozart
Requiem (1791, unvollendet);Wolfgang Amadeus Mozart
Für Elise;Ludwig van Beethoven
9. Sinfonie mit der „Ode an die Freude“;Ludwig van Beethoven
5. Sinfonie („Schicksalssinfonie“);Ludwig van Beethoven
Fidelio;Ludwig van Beethoven
Die vier Jahreszeiten;Antonio Vivaldi
Brandenburgische Konzerte;Johann Sebastian Bach
Toccata und Fuge d-Moll;Johann Sebastian Bach
Weihnachtsoratorium;Johann Sebastian Bach
Das Wohltemperierte Klavier;Johann Sebastian Bach
Wassermusik;Georg Friedrich Händel
Der Messias (mit dem „Halleluja“);Georg Friedrich Händel
Der Ring des Nibelungen;Richard Wagner
Lohengrin;Richard Wagner
Tannhäuser;Richard Wagner
An der schönen blauen Donau;Johann Strauss (Sohn)
Die Fledermaus;Johann Strauss (Sohn)
Radetzky-Marsch;Johann Strauss (Vater)
Der Rosenkavalier;Richard Strauss
Also sprach Zarathustra (Tondichtung);Richard Strauss
Schwanensee;Peter Tschaikowski
Der Nussknacker;Peter Tschaikowski
Carmen;Georges Bizet
La Traviata;Giuseppe Verdi
Aida;Giuseppe Verdi
Nabucco;Giuseppe Verdi
Rigoletto;Giuseppe Verdi
La Bohème;Giacomo Puccini
Tosca;Giacomo Puccini
Madama Butterfly;Giacomo Puccini
Turandot;Giacomo Puccini
Der Barbier von Sevilla;Gioachino Rossini
Boléro;Maurice Ravel
Clair de Lune;Claude Debussy
Ungarische Tänze;Johannes Brahms
Guten Abend, gut’ Nacht (Wiegenlied);Johannes Brahms
Die Moldau;Bedřich Smetana
Sinfonie „Aus der Neuen Welt“;Antonín Dvořák
Peer Gynt (mit der „Morgenstimmung“);Edvard Grieg
Hänsel und Gretel (Oper);Engelbert Humperdinck
Carmina Burana;Carl Orff
Rhapsody in Blue;George Gershwin
West Side Story;Leonard Bernstein
Der Freischütz;Carl Maria von Weber
Die Forelle (Lied);Franz Schubert
Unvollendete Sinfonie;Franz Schubert
Hochzeitsmarsch aus „Ein Sommernachtstraum“;Felix Mendelssohn Bartholdy
Minutenwalzer;Frédéric Chopin
Liebesträume;Franz Liszt
Peter und der Wolf;Sergei Prokofjew
Kanon in D-Dur;Johann Pachelbel
Das Phantom der Oper (Musical);Andrew Lloyd Webber
Cats (Musical);Andrew Lloyd Webber
`);
  const composers = [...new Set(MUSIC.map((m) => m[1]))];
  table(C, MUSIC, { q: (m) => `Wer komponierte „${m[0]}“?`, a: (m) => m[1], pool: composers, alt: (m) => [m[1].replace(/ \(.*\)/, "").split(" ").slice(-1)[0]], diff: (m) => (["Die Zauberflöte", "Eine kleine Nachtmusik", "Für Elise", "Die vier Jahreszeiten", "Schwanensee", "Der Nussknacker", "Carmen", "An der schönen blauen Donau", "9. Sinfonie mit der „Ode an die Freude“", "Weihnachtsoratorium"].includes(m[0]) ? 1 : 2), img: (m) => m[1].replace(/ \((Sohn|Vater)\)/, (x) => x) });

  const COMPOSER_LAND = parse(`
Wolfgang Amadeus Mozart;Österreich
Ludwig van Beethoven;Deutschland
Johann Sebastian Bach;Deutschland
Georg Friedrich Händel;Deutschland
Richard Wagner;Deutschland
Johannes Brahms;Deutschland
Franz Schubert;Österreich
Joseph Haydn;Österreich
Antonio Vivaldi;Italien
Giuseppe Verdi;Italien
Giacomo Puccini;Italien
Frédéric Chopin;Polen
Peter Tschaikowski;Russland
Bedřich Smetana;Tschechien
Antonín Dvořák;Tschechien
Edvard Grieg;Norwegen
Jean Sibelius;Finnland
Franz Liszt;Ungarn
Claude Debussy;Frankreich
Maurice Ravel;Frankreich
George Gershwin;USA
Manuel de Falla;Spanien
`);
  table(C, COMPOSER_LAND, { q: (c) => `Aus welchem heutigen Land stammt der Komponist ${c[0]}?`, a: (c) => c[1], pool: [...new Set(COMPOSER_LAND.map((c) => c[1]))], diff: (c) => (["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Antonio Vivaldi", "Frédéric Chopin"].includes(c[0]) ? 1 : 2), img: (c) => c[0] });

  const STYLE = parse(`
Claude Monet;Impressionismus
Pierre-Auguste Renoir;Impressionismus
Edgar Degas;Impressionismus
Camille Pissarro;Impressionismus
Vincent van Gogh;Postimpressionismus
Paul Cézanne;Postimpressionismus
Paul Gauguin;Postimpressionismus
Pablo Picasso;Kubismus
Georges Braque;Kubismus
Salvador Dalí;Surrealismus
René Magritte;Surrealismus
Max Ernst;Surrealismus
Andy Warhol;Pop-Art
Roy Lichtenstein;Pop-Art
Franz Marc;Expressionismus
Ernst Ludwig Kirchner;Expressionismus
Edvard Munch;Expressionismus
Caspar David Friedrich;Romantik
Albrecht Dürer;Renaissance
Leonardo da Vinci;Renaissance
Raffael;Renaissance
Rembrandt van Rijn;Barock
Peter Paul Rubens;Barock
Caravaggio;Barock
Jackson Pollock;Abstrakter Expressionismus
Marcel Duchamp;Dadaismus
Hans Arp;Dadaismus
Gustav Klimt;Jugendstil
Alfons Mucha;Jugendstil
`);
  table(C, STYLE, { q: (s) => `Welcher Kunstrichtung wird ${s[0]} vor allem zugeordnet?`, a: (s) => s[1], pool: [...new Set(STYLE.map((s) => s[1]))], diff: (s) => (["Claude Monet", "Pablo Picasso", "Salvador Dalí", "Andy Warhol", "Leonardo da Vinci"].includes(s[0]) ? 1 : 2), img: (s) => s[0] });

  const MUSEUM = parse(`
Louvre;Paris
Musée d’Orsay;Paris
Prado;Madrid
Uffizien;Florenz
Rijksmuseum;Amsterdam
Van Gogh Museum;Amsterdam
Anne-Frank-Haus;Amsterdam
Eremitage;Sankt Petersburg
British Museum;London
Tate Modern;London
National Gallery;London
Metropolitan Museum of Art;New York
Museum of Modern Art (MoMA);New York
Pergamonmuseum;Berlin
Alte Pinakothek;München
Deutsches Museum;München
Kunsthistorisches Museum;Wien
Vatikanische Museen;Vatikanstadt
Guggenheim-Museum mit Titanfassade;Bilbao
Zwinger (Gemäldegalerie Alte Meister);Dresden
Mercedes-Benz Museum;Stuttgart
`);
  table(C, MUSEUM, { q: (m) => `In welcher Stadt befindet sich: ${m[0]}?`, a: (m) => m[1], pool: [...new Set(MUSEUM.map((m) => m[1]))], diff: (m) => (["Louvre", "British Museum", "Deutsches Museum", "Anne-Frank-Haus", "Pergamonmuseum", "Prado"].includes(m[0]) ? 1 : 2), img: (m) => m[0].replace(/ \(.*\)| mit Titanfassade/g, "") });

  const INSTR = parse(`
Geige (Violine);Streichinstrument
Bratsche (Viola);Streichinstrument
Violoncello;Streichinstrument
Kontrabass;Streichinstrument
Harfe;Zupfinstrument
Gitarre;Zupfinstrument
Trompete;Blechblasinstrument
Posaune;Blechblasinstrument
Tuba;Blechblasinstrument
Waldhorn;Blechblasinstrument
Querflöte;Holzblasinstrument
Klarinette;Holzblasinstrument
Oboe;Holzblasinstrument
Fagott;Holzblasinstrument
Saxophon;Holzblasinstrument
Blockflöte;Holzblasinstrument
Pauke;Schlaginstrument
Xylophon;Schlaginstrument
Triangel;Schlaginstrument
Klavier;Tasteninstrument
Orgel;Tasteninstrument
`);
  table(C, INSTR, { q: (i) => `Zu welcher Instrumentengruppe gehört: ${i[0]}?`, a: (i) => i[1], pool: [...new Set(INSTR.map((i) => i[1]))], diff: (i) => (["Querflöte", "Saxophon", "Harfe", "Klavier"].includes(i[0].split(" ")[0]) ? 2 : 1), img: (i) => i[0].replace(/ \(.*\)/, "") });

  const BANDS = parse(`
ABBA;Schweden
The Beatles;Vereinigtes Königreich
Queen;Vereinigtes Königreich
Rammstein;Deutschland
Die Toten Hosen;Deutschland
Kraftwerk;Deutschland
Scorpions;Deutschland
AC/DC;Australien
U2;Irland
Coldplay;Vereinigtes Königreich
BTS;Südkorea
Shakira;Kolumbien
Céline Dion;Kanada
Justin Bieber;Kanada
Rihanna;Barbados
Bob Marley;Jamaika
Édith Piaf;Frankreich
Daft Punk;Frankreich
Björk;Island
a-ha;Norwegen
Roxette;Schweden
Måneskin;Italien
Eros Ramazzotti;Italien
Falco;Österreich
Helene Fischer;Deutschland
Herbert Grönemeyer;Deutschland
Taylor Swift;USA
Michael Jackson;USA
Elvis Presley;USA
Madonna;USA
Ed Sheeran;Vereinigtes Königreich
Adele;Vereinigtes Königreich
Avicii;Schweden
Kylie Minogue;Australien
`);
  table(C, BANDS, { q: (b) => `Aus welchem Land stammt ${b[0]}?`, a: (b) => b[1], pool: [...new Set(BANDS.map((b) => b[1]))], diff: (b) => (["ABBA", "The Beatles", "Rammstein", "Helene Fischer", "Michael Jackson", "Elvis Presley", "Taylor Swift", "Queen", "Die Toten Hosen", "Herbert Grönemeyer"].includes(b[0]) ? 1 : 2), img: (b) => b[0] });

  const FILMS = parse(`
Titanic (1997);James Cameron
Avatar;James Cameron
Der weiße Hai;Steven Spielberg
E.T. – Der Außerirdische;Steven Spielberg
Jurassic Park;Steven Spielberg
Schindlers Liste;Steven Spielberg
Psycho;Alfred Hitchcock
Die Vögel;Alfred Hitchcock
Pulp Fiction;Quentin Tarantino
Kill Bill;Quentin Tarantino
Der Pate;Francis Ford Coppola
Krieg der Sterne (1977);George Lucas
Der Herr der Ringe (Filmtrilogie);Peter Jackson
Inception;Christopher Nolan
Oppenheimer;Christopher Nolan
The Dark Knight;Christopher Nolan
2001: Odyssee im Weltraum;Stanley Kubrick
Shining;Stanley Kubrick
Lola rennt;Tom Tykwer
Das Boot;Wolfgang Petersen
Good Bye, Lenin!;Wolfgang Becker
Das Leben der Anderen;Florian Henckel von Donnersmarck
Metropolis (1927);Fritz Lang
Barbie (2023);Greta Gerwig
Forrest Gump;Robert Zemeckis
Zurück in die Zukunft;Robert Zemeckis
Gladiator;Ridley Scott
Alien;Ridley Scott
Im Westen nichts Neues (2022);Edward Berger
Parasite;Bong Joon-ho
`);
  table(C, FILMS, { q: (f) => `Wer führte Regie bei „${f[0]}“?`, a: (f) => f[1], pool: [...new Set(FILMS.map((f) => f[1]))], diff: (f) => (["Titanic (1997)", "Jurassic Park", "E.T. – Der Außerirdische", "Krieg der Sterne (1977)", "Psycho", "Avatar"].includes(f[0]) ? 1 : 2), img: (f) => f[0].replace(/ \(.*\)/, "") });

  lines(C, `
# Musik allgemein
Wie viele Linien hat ein Notensystem? | 5 | 4 | 6 | 7 | 1 | Notenschrift
Wie heißt der Schlüssel, der auf der zweiten Notenlinie beginnt? | Violinschlüssel | Bassschlüssel | Altschlüssel | Tenorschlüssel | 1 | Notenschlüssel | alt=G-Schlüssel
Wie viele Tasten hat ein normales Klavier? | 88 | 72 | 64 | 96 | 1 | Klavier
Wie viele Saiten hat eine normale Gitarre? | 6 | 4 | 5 | 8 | 1 | Gitarre
Wie viele Saiten hat eine Violine? | 4 | 5 | 6 | 3 | 1 | Violine
Welcher Ton ist der Stimmton für Orchester (440 Hertz)? | a | c | e | g | 2 | Kammerton
Wie heißt die Tonleiter mit fröhlichem Klang? | Dur | Moll | Blues | Chromatisch | 1 | Dur
Wie heißt die Tonleiter mit traurigerem Klang? | Moll | Dur | Pentatonik | Ganzton | 1 | Moll
Wie nennt man ein Musikstück für vier Instrumente? | Quartett | Trio | Quintett | Duett | 1 | Streichquartett
Wie heißt der Leiter eines Orchesters? | Dirigent | Konzertmeister | Komponist | Intendant | 1 | Dirigent
Welche Stimmlage ist die höchste Frauenstimme? | Sopran | Alt | Mezzosopran | Tenor | 1 | Sopran
Welche Stimmlage ist die tiefste Männerstimme? | Bass | Tenor | Bariton | Alt | 1 | Bass (Stimmlage)
Wie nennt man ein gesungenes Bühnenwerk mit Orchester? | Oper | Sinfonie | Sonate | Kantate | 1 | Oper
Wie heißt das berühmte Opernfestival in Bayern mit Wagner-Opern? | Bayreuther Festspiele | Salzburger Festspiele | Münchner Opernfestspiele | Bregenzer Festspiele | 1 | Bayreuther Festspielhaus
Welcher Musikwettbewerb findet jedes Jahr zwischen europäischen Ländern statt? | Eurovision Song Contest | Grammy | Echo | MTV Awards | 1 | Eurovision Song Contest | alt=ESC
Wer gewann 2010 für Deutschland den Eurovision Song Contest? | Lena Meyer-Landrut | Nicole | Helene Fischer | Sarah Connor | 1 | Lena Meyer-Landrut | alt=Lena
Mit welchem Lied gewann Nicole 1982 den Grand Prix für Deutschland? | Ein bißchen Frieden | Satellite | 99 Luftballons | Atemlos durch die Nacht | 2 | Nicole (Sängerin)
Mit welchem Lied gewann ABBA 1974 den Eurovision Song Contest? | Waterloo | Dancing Queen | Mamma Mia | Fernando | 1 | ABBA
Wer sang „99 Luftballons“? | Nena | Nicole | Sandra | Juliane Werding | 1 | Nena
Wer sang „Atemlos durch die Nacht“? | Helene Fischer | Andrea Berg | Vanessa Mai | Beatrice Egli | 1 | Helene Fischer
Wer gilt als „King of Pop“? | Michael Jackson | Elvis Presley | Prince | Justin Timberlake | 1 | Michael Jackson
Wer gilt als „King of Rock ’n’ Roll“? | Elvis Presley | Chuck Berry | Little Richard | Johnny Cash | 1 | Elvis Presley
Welche Band sang „Bohemian Rhapsody“? | Queen | The Beatles | Pink Floyd | The Who | 1 | Queen (Band)
Wer war Sänger der Band Queen? | Freddie Mercury | Brian May | Mick Jagger | Elton John | 1 | Freddie Mercury
Wer ist Sänger der Rolling Stones? | Mick Jagger | Keith Richards | Freddie Mercury | Paul McCartney | 1 | Mick Jagger
Welche Beatles-Mitglieder schrieben die meisten Songs? | John Lennon und Paul McCartney | George Harrison und Ringo Starr | Mick Jagger und Keith Richards | Lennon und Harrison | 1 | The Beatles | mc
Welcher Rapper heißt mit bürgerlichem Namen Marshall Mathers? | Eminem | Jay-Z | Snoop Dogg | 50 Cent | 2 | Eminem
Wie heißt der wichtigste US-Musikpreis? | Grammy | Oscar | Emmy | Tony | 1 | Grammy Award
Wie heißt der wichtigste Filmpreis der USA? | Oscar | Grammy | Emmy | Golden Globe | 1 | Oscar
Wie heißt der wichtigste Fernsehpreis der USA? | Emmy | Oscar | Grammy | Tony | 2 | Emmy
Wie heißt der Hauptpreis der Berlinale? | Goldener Bär | Goldene Palme | Goldener Löwe | Oscar | 1 | Goldener Bär
Wie heißt der Hauptpreis der Filmfestspiele von Cannes? | Goldene Palme | Goldener Bär | Goldener Löwe | César | 2 | Palme d’Or
In welcher Stadt finden die Filmfestspiele mit dem Goldenen Löwen statt? | Venedig | Rom | Cannes | Berlin | 2 | Internationale Filmfestspiele von Venedig
Welcher Film gewann 11 Oscars und handelt von einem sinkenden Schiff? | Titanic | Ben Hur | Der Herr der Ringe: Die Rückkehr des Königs | Avatar | 1 | RMS Titanic
Wie heißt der Zauberschüler mit der Blitznarbe? | Harry Potter | Ron Weasley | Frodo | Percy Jackson | 1 | Harry Potter
Wie heißt der Hobbit, der den Ring nach Mordor bringt? | Frodo Beutlin | Bilbo Beutlin | Samweis Gamdschie | Gandalf | 1 | Der Herr der Ringe | alt=Frodo
Wie heißt der Schurke in „Krieg der Sterne“ mit schwarzem Helm? | Darth Vader | Darth Maul | Imperator | Boba Fett | 1 | Darth Vader
Wie heißt der Erfinder von James Bond? | Ian Fleming | John le Carré | Agatha Christie | Arthur Conan Doyle | 2 | James Bond | alt=Fleming
Wie lautet die Agentennummer von James Bond? | 007 | 001 | 070 | 700 | 1 | James Bond
Wie heißt die Comicfigur, die Spinat isst? | Popeye | Garfield | Asterix | Tim | 1 | Popeye
Wie heißt der kleine Gallier mit Zaubertrank? | Asterix | Obelix | Miraculix | Idefix | 1 | Asterix
Wer zeichnete ursprünglich die Asterix-Comics? | Albert Uderzo | Hergé | Walt Disney | Charles M. Schulz | 2 | Albert Uderzo | alt=Uderzo
Wie heißt der Reporter mit dem Hund Struppi? | Tim | Lucky Luke | Spirou | Asterix | 1 | Tim und Struppi
Wie heißen die Figuren mit blauer Haut und weißen Mützen? | Schlümpfe | Minions | Smurfs-Tiere | Wichtel | 1 | Die Schlümpfe
Wie heißt die Maus aus der „Sendung mit der Maus“? | Die Maus | Mickey | Jerry | Pinky | 1 | Die Sendung mit der Maus | mc
Welche Sesamstraßen-Figur liebt Kekse? | Krümelmonster | Ernie | Bert | Elmo | 1 | Krümelmonster
Wie heißt der orangefarbene Kater, der Lasagne liebt? | Garfield | Tom | Felix | Kater Karlo | 1 | Garfield
Wie heißt der gelbe Schwamm, der in einer Ananas unter dem Meer wohnt? | SpongeBob | Patrick | Thaddäus | Mr. Krabs | 1 | SpongeBob Schwammkopf
Wie heißt die Familie mit gelber Haut aus Springfield? | Die Simpsons | Die Griffins | Die Flintstones | Die Feuersteins | 1 | Die Simpsons
# Theater, Literatur und Kultur
Wie heißt der berühmte Spruch aus „Hamlet“? | Sein oder Nichtsein | Ich denke, also bin ich | Veni, vidi, vici | Carpe diem | 1 | Hamlet
Wer sagte „Ich denke, also bin ich“? | René Descartes | Immanuel Kant | Sokrates | Friedrich Nietzsche | 2 | René Descartes | alt=Descartes
Welcher deutsche Philosoph schrieb „Kritik der reinen Vernunft“? | Immanuel Kant | Friedrich Nietzsche | Georg Wilhelm Friedrich Hegel | Karl Marx | 2 | Immanuel Kant | alt=Kant
Welcher Philosoph schrieb „Also sprach Zarathustra“? | Friedrich Nietzsche | Immanuel Kant | Arthur Schopenhauer | Martin Heidegger | 2 | Friedrich Nietzsche | alt=Nietzsche
In welcher Stadt lebten Goethe und Schiller zusammen? | Weimar | Jena | Leipzig | Frankfurt | 1 | Goethe-Schiller-Denkmal
In welcher Stadt wurde Goethe geboren? | Frankfurt am Main | Weimar | Leipzig | Berlin | 2 | Goethe-Haus (Frankfurt am Main)
Wie heißt die Figur, die ihre Seele dem Teufel Mephisto verkauft? | Faust | Werther | Woyzeck | Nathan | 1 | Faust. Eine Tragödie.
Wie heißt der größte Literaturpreis der Welt? | Nobelpreis für Literatur | Pulitzer-Preis | Büchner-Preis | Booker-Preis | 1 | Nobelpreis für Literatur
Welcher deutsche Schriftsteller erhielt 1929 den Literaturnobelpreis? | Thomas Mann | Hermann Hesse | Günter Grass | Heinrich Böll | 2 | Thomas Mann
Wie heißt der wichtigste deutsche Literaturpreis? | Georg-Büchner-Preis | Goethe-Preis | Schiller-Medaille | Kleist-Orden | 2 | Georg-Büchner-Preis
Wie heißt die größte Buchmesse der Welt? | Frankfurter Buchmesse | Leipziger Buchmesse | London Book Fair | Pariser Buchsalon | 1 | Frankfurter Buchmesse
Wie heißen die Brüder, die Märchen wie „Hänsel und Gretel“ sammelten? | Brüder Grimm | Brüder Mann | Brüder Humboldt | Brüder Schlegel | 1 | Brüder Grimm | alt=Grimm
In welchem Märchen schläft eine Prinzessin 100 Jahre? | Dornröschen | Schneewittchen | Rapunzel | Aschenputtel | 1 | Dornröschen
In welchem Märchen verliert eine junge Frau einen Schuh? | Aschenputtel | Dornröschen | Frau Holle | Rotkäppchen | 1 | Aschenputtel
Welches Märchen handelt von einem Mädchen mit sehr langen Haaren im Turm? | Rapunzel | Schneewittchen | Rotkäppchen | Sterntaler | 1 | Rapunzel
Wie viele Zwerge treffen Schneewittchen? | 7 | 5 | 9 | 12 | 1 | Schneewittchen
In welchem Märchen wird die Großmutter vom Wolf gefressen? | Rotkäppchen | Die sieben Geißlein | Hänsel und Gretel | Frau Holle | 1 | Rotkäppchen
Welche Tiere reisen als Bremer Stadtmusikanten? | Esel, Hund, Katze, Hahn | Pferd, Hund, Katze, Huhn | Esel, Schaf, Hund, Gans | Kuh, Hund, Katze, Hahn | 1 | Bremer Stadtmusikanten | mc
Wie heißt die Puppenspiel-Figur mit Zipfelmütze und Krokodil als Gegner? | Kasper | Pinocchio | Pumuckl | Rumpelstilzchen | 1 | Kasper (Puppenspiel)
Wie heißt der rothaarige Kobold beim Meister Eder? | Pumuckl | Rumpelstilzchen | Kasper | Sams | 1 | Pumuckl
Welches deutsche Weihnachtslied stammt aus Oberndorf bei Salzburg (1818)? | Stille Nacht, heilige Nacht | O Tannenbaum | Kling, Glöckchen | Ihr Kinderlein, kommet | 1 | Stille Nacht, heilige Nacht
Wie heißt das berühmte Volksfest in München? | Oktoberfest | Cannstatter Wasen | Kieler Woche | Karneval | 1 | Oktoberfest
In welchem Monat beginnt das Münchner Oktoberfest meistens? | September | Oktober | August | November | 1 | Oktoberfest
In welchen Städten ist der Karneval am Rhein besonders berühmt? | Köln, Mainz und Düsseldorf | Hamburg und Kiel | München und Augsburg | Berlin und Potsdam | 1 | Kölner Karneval | mc
Was ruft man im Kölner Karneval? | Kölle Alaaf | Helau | Ahoi | Prost | 1 | Kölner Karneval
Was ruft man im Mainzer und Düsseldorfer Karneval? | Helau | Alaaf | Ahoi | Juchhe | 2 | Mainzer Fastnacht
Wie heißt das jüdische Lichterfest? | Chanukka | Pessach | Jom Kippur | Purim | 2 | Chanukka
Wie heißt der muslimische Fastenmonat? | Ramadan | Schawwal | Muharram | Dhu l-Hiddscha | 1 | Ramadan
Was feiern Christen an Ostern? | Die Auferstehung Jesu | Die Geburt Jesu | Pfingsten | Die Taufe Jesu | 1 | Ostern | mc
Was feiern Christen an Weihnachten? | Die Geburt Jesu | Die Auferstehung Jesu | Den Heiligen Geist | Erntedank | 1 | Weihnachten | mc
Welches Fest wird 50 Tage nach Ostern gefeiert? | Pfingsten | Himmelfahrt | Fronleichnam | Advent | 2 | Pfingsten
In welchem Land wird das Holi-Fest der Farben gefeiert? | Indien | China | Brasilien | Mexiko | 1 | Holi
In welchem Land feiert man den „Día de los Muertos“ (Tag der Toten)? | Mexiko | Spanien | Brasilien | Portugal | 1 | Día de Muertos
Wie heißt das chinesische Neujahrsfest? | Frühlingsfest | Mondfest | Laternenfest | Drachenbootfest | 2 | Chinesisches Neujahrsfest
Wie heißt die japanische Kunst des Blumensteckens? | Ikebana | Origami | Bonsai | Haiku | 2 | Ikebana
Wie heißt die japanische Gedichtform mit drei Zeilen? | Haiku | Sonett | Limerick | Ode | 1 | Haiku
Wie heißt ein Gedicht mit 14 Zeilen? | Sonett | Haiku | Ballade | Limerick | 2 | Sonett
Wie nennt man ein lustiges fünfzeiliges Gedicht aus England? | Limerick | Haiku | Sonett | Elegie | 2 | Limerick
Was ist eine Ballade? | Ein erzählendes Gedicht | Ein Bild | Ein Tanz | Eine Oper | 2 | Ballade | mc
Wie nennt man ein Theaterstück mit traurigem Ende? | Tragödie | Komödie | Farce | Posse | 1 | Tragödie
Wie nennt man ein lustiges Theaterstück? | Komödie | Tragödie | Drama | Requiem | 1 | Komödie
# Architektur
Wer entwarf die Sagrada Família in Barcelona? | Antoni Gaudí | Le Corbusier | Frank Gehry | Zaha Hadid | 1 | Sagrada Família | alt=Gaudí/Gaudi
Wer entwarf den Eiffelturm (Firma)? | Gustave Eiffel | Le Corbusier | Georges-Eugène Haussmann | Gaudí | 1 | Eiffelturm | alt=Eiffel
Wie heißt die Kunstschule, die Walter Gropius 1919 in Weimar gründete? | Bauhaus | Werkbund | Akademie der Künste | Jugendstil-Schule | 1 | Bauhaus
Welcher Baustil prägt das Schloss Neuschwanstein? | Historismus (Neuromanik) | Barock | Gotik | Bauhaus | 2 | Schloss Neuschwanstein | mc
Welcher bayerische König ließ Neuschwanstein bauen? | Ludwig II. | Maximilian II. | Ludwig I. | Otto I. | 1 | Schloss Neuschwanstein | alt=Ludwig 2
Welcher Stil hat runde Bögen und dicke Mauern? | Romanik | Gotik | Barock | Klassizismus | 2 | Speyerer Dom
Welcher Stil ist üppig verziert mit Gold und Stuck (17./18. Jh.)? | Barock | Romanik | Bauhaus | Gotik | 1 | Wieskirche
Welche Architektin entwarf viele kurvige, futuristische Bauten wie das Phaeno in Wolfsburg? | Zaha Hadid | Lina Bo Bardi | Kazuyo Sejima | Eileen Gray | 2 | Zaha Hadid | alt=Hadid
In welcher Stadt steht die Elbphilharmonie? | Hamburg | Dresden | Magdeburg | Berlin | 1 | Elbphilharmonie
In welcher Stadt steht die Semperoper? | Dresden | Leipzig | München | Wien | 1 | Semperoper
Wo steht das Taj Mahal? | Agra | Delhi | Mumbai | Jaipur | 2 | Taj Mahal
Wofür wurde das Taj Mahal gebaut? | Als Grabmal für eine Ehefrau | Als Palast | Als Tempel | Als Festung | 1 | Taj Mahal | mc
`);
})();
