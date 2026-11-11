/* Technik – mindestens 500 Fragen */
(function () {
  const { table, lines } = window.QGEN;
  const C = "technik";
  const parse = (s) => s.trim().split("\n").map((l) => l.split(";").map((y) => y.trim())).filter((r) => r[0]);

  const INV = parse(`
den Buchdruck mit beweglichen Lettern;Johannes Gutenberg;1
den Phonographen (Tonaufzeichnung);Thomas Edison;2
das Automobil mit Benzinmotor (1886);Carl Benz;1
den Dieselmotor;Rudolf Diesel;1
den Viertakt-Ottomotor;Nicolaus August Otto;2
die Laufmaschine (Draisine);Karl Drais;2
das Motorflugzeug (1903);Gebrüder Wright;1
den Gleitflug (Flugapparate der 1890er);Otto Lilienthal;1
das Starrluftschiff;Ferdinand von Zeppelin;1
das Dynamit;Alfred Nobel;1
den Telegrafen-Code aus Punkten und Strichen;Samuel Morse;1
die drahtlose Funkübertragung (Radio);Guglielmo Marconi;2
den Wechselstrom-Motor;Nikola Tesla;2
das dynamoelektrische Prinzip (Dynamo);Werner von Siemens;2
den ersten funktionsfähigen programmierbaren Computer Z3;Konrad Zuse;1
das World Wide Web;Tim Berners-Lee;1
die Nipkow-Scheibe (Grundlage des Fernsehens);Paul Nipkow;2
die Braunsche Röhre;Ferdinand Braun;2
die Daguerreotypie (frühe Fotografie);Louis Daguerre;2
den Kinematographen (Film);Gebrüder Lumière;2
die Nietenjeans;Levi Strauss;1
die Kältemaschine (Kühlschrank-Technik);Carl von Linde;2
das Fernrohr (Teleskop, 1608);Hans Lipperhey;2
die Hochspannungs-Magnetzündung für Motoren;Robert Bosch;2
das MP3-Format;Karlheinz Brandenburg;2
den Kaffeefilter;Melitta Bentz;1
die Vulkanisation von Gummi;Charles Goodyear;2
den Revolver mit drehbarer Trommel;Samuel Colt;2
die Großrakete V2 und später die Saturn-V-Mondrakete;Wernher von Braun;2
den Kugelschreiber;László Bíró;2
das Grammophon (Schallplatte);Emil Berliner;2
die Blindenschrift;Louis Braille;1
das Stethoskop;René Laennec;2
das erste Handy-Telefonat (1973);Martin Cooper;2
das Betriebssystem Linux;Linus Torvalds;2
die Programmiersprache Python;Guido van Rossum;2
die Programmiersprache C;Dennis Ritchie;2
die Programmiersprache Java;James Gosling;2
den ersten Hubschrauber, der wirklich flog (Fw 61);Henrich Focke;2
die Dampflokomotive „Rocket“;George Stephenson;2
den Blitzableiter;Benjamin Franklin;1
die Glühlampe (alltagstauglich, 1879);Thomas Edison;1
die Rechenmaschine für alle vier Grundrechenarten (17. Jh.);Gottfried Wilhelm Leibniz;2
`);
  table(C, INV, { q: (i) => `Wer erfand oder entwickelte ${i[0]}?`, a: (i) => i[1], pool: INV.map((i) => i[1]), diff: (i) => +i[2], alt: (i) => [i[1].split(" ").slice(-1)[0]] });

  const ABBR = parse(`
HTML;HyperText Markup Language
HTTP;Hypertext Transfer Protocol
URL;Uniform Resource Locator
PDF;Portable Document Format
GPS;Global Positioning System
LED;Light-Emitting Diode
LCD;Liquid Crystal Display
OLED;Organic Light-Emitting Diode
RAM;Random Access Memory
ROM;Read-Only Memory
SSD;Solid State Drive
HDD;Hard Disk Drive
GPU;Graphics Processing Unit
WLAN;Wireless Local Area Network
LAN;Local Area Network
IP (Internet);Internet Protocol
DNS;Domain Name System
VPN;Virtual Private Network
SMS;Short Message Service
GSM;Global System for Mobile Communications
LTE;Long Term Evolution
NFC;Near Field Communication
QR (QR-Code);Quick Response
SIM (SIM-Karte);Subscriber Identity Module
PIN;Persönliche Identifikationsnummer
IBAN;International Bank Account Number
AI;Artificial Intelligence
VR;Virtual Reality
AR;Augmented Reality
OS;Operating System
BIOS;Basic Input/Output System
JPEG;Joint Photographic Experts Group
PNG;Portable Network Graphics
GIF;Graphics Interchange Format
HDMI;High-Definition Multimedia Interface
DVD;Digital Versatile Disc
CD;Compact Disc
FAQ;Frequently Asked Questions
CSS;Cascading Style Sheets
SQL;Structured Query Language
API;Application Programming Interface
PC;Personal Computer
IT;Informationstechnik
IoT;Internet of Things
CAD;Computer-Aided Design
ABS (Auto);Antiblockiersystem
ESP (Auto);Elektronisches Stabilitätsprogramm
TÜV;Technischer Überwachungsverein
PS;Pferdestärke
kWh;Kilowattstunde
NASA;National Aeronautics and Space Administration
Laser;Light Amplification by Stimulated Emission of Radiation
Radar;Radio Detection and Ranging
ICE;Intercity-Express
ADAC;Allgemeiner Deutscher Automobil-Club
DIN;Deutsches Institut für Normung
ISBN;Internationale Standardbuchnummer
E-Mail;Electronic Mail
`);
  table(C, ABBR, { q: (a) => `Wofür steht die Abkürzung „${a[0]}“?`, a: (a) => a[1], mc: true, diff: (a) => (["PDF", "GPS", "LED", "SMS", "PIN", "WLAN", "PC", "TÜV", "ICE", "E-Mail", "PS", "ADAC", "IT", "CD", "DVD", "AI", "VR"].includes(a[0]) ? 1 : 2) });

  const FOUND = parse(`
Apple;Steve Jobs und Steve Wozniak
Amazon;Jeff Bezos
Facebook (Meta);Mark Zuckerberg
Google;Larry Page und Sergey Brin
SpaceX;Elon Musk
Porsche;Ferdinand Porsche
Siemens;Werner von Siemens
Bosch;Robert Bosch
Adidas;Adolf Dassler
Puma;Rudolf Dassler
Ford;Henry Ford
Ferrari;Enzo Ferrari
Lamborghini;Ferruccio Lamborghini
Honda;Soichiro Honda
IKEA;Ingvar Kamprad
Netflix;Reed Hastings und Marc Randolph
Alibaba;Jack Ma
Haribo;Hans Riegel
Dr. Oetker;August Oetker
Aldi;Karl und Theo Albrecht
Boeing;William Boeing
The Walt Disney Company;Walt und Roy Disney
Wikipedia;Jimmy Wales und Larry Sanger
Microsoft;Bill Gates und Paul Allen
Daimler-Motoren-Gesellschaft;Gottlieb Daimler
`);
  table(C, FOUND, { q: (f) => `Wer gründete ${f[0]}?`, a: (f) => f[1], pool: FOUND.map((f) => f[1]), mc: true, diff: (f) => (["Apple", "Amazon", "Facebook (Meta)", "Porsche", "Ford", "Ferrari", "Microsoft", "SpaceX", "Siemens", "Bosch"].includes(f[0]) ? 1 : 2), img: (f) => f[0].replace(/ \(.*\)/, "") });

  const BRAND = parse(`
Volkswagen;Deutschland
BMW;Deutschland
Mercedes-Benz;Deutschland
Audi;Deutschland
Porsche;Deutschland
Opel;Deutschland
Ferrari;Italien
Lamborghini;Italien
Fiat;Italien
Alfa Romeo;Italien
Renault;Frankreich
Peugeot;Frankreich
Citroën;Frankreich
Volvo;Schweden
Škoda;Tschechien
SEAT;Spanien
Toyota;Japan
Honda;Japan
Nissan;Japan
Mazda;Japan
Hyundai;Südkorea
Kia;Südkorea
Ford;USA
Tesla;USA
Chevrolet;USA
Rolls-Royce;Vereinigtes Königreich
Aston Martin;Vereinigtes Königreich
Jaguar (Automarke);Vereinigtes Königreich
Dacia;Rumänien
BYD;China
Nokia;Finnland
Samsung;Südkorea
Sony;Japan
Nintendo;Japan
Philips;Niederlande
Lenovo;China
Huawei;China
LEGO;Dänemark
IKEA;Schweden
Spotify;Schweden
SAP;Deutschland
Miele;Deutschland
Nestlé;Schweiz
Rolex;Schweiz
Red Bull;Österreich
H&M;Schweden
Zara (Inditex);Spanien
Xiaomi;China
`);
  table(C, BRAND, { q: (b) => `Aus welchem Land stammt die Marke ${b[0]}?`, a: (b) => b[1], pool: [...new Set(BRAND.map((b) => b[1]))], diff: (b) => (["Volkswagen", "BMW", "Mercedes-Benz", "Ferrari", "Toyota", "Ford", "LEGO", "IKEA", "Samsung", "Sony", "Fiat", "Renault", "Volvo", "Porsche", "Audi", "Tesla"].includes(b[0]) ? 1 : 2), img: (b) => b[0].replace(/ \(.*\)/, "") });

  lines(C, `
# Computer und Internet
Was ist die kleinste Informationseinheit in der Informatik? | Bit | Byte | Kilobyte | Pixel | 1 | Bit
Aus welchen zwei Ziffern besteht das Binärsystem? | 0 und 1 | 1 und 2 | 0 und 9 | 1 und 10 | 1 | Dualsystem | mc
Was ist 1010 im Binärsystem als Dezimalzahl? | 10 | 5 | 12 | 1010 | 2 | Dualsystem
Was ist 1111 im Binärsystem als Dezimalzahl? | 15 | 16 | 14 | 1111 | 2 | Dualsystem
Wie heißt das „Gehirn“ eines Computers? | Prozessor (CPU) | Festplatte | Bildschirm | Netzteil | 1 | Prozessor | alt=Prozessor/CPU
Was speichert Daten dauerhaft, auch ohne Strom? | Festplatte/SSD | Arbeitsspeicher (RAM) | Prozessor-Cache | Grafikkarte | 1 | Solid-State-Drive | mc
Was verliert seinen Inhalt beim Ausschalten? | Arbeitsspeicher (RAM) | SSD | USB-Stick | DVD | 1 | Arbeitsspeicher | mc
Wie nennt man ein Programm, das Computer schädigt und sich verbreitet? | Computervirus | Browser | Compiler | Treiber | 1 | Computervirus | alt=Virus/Malware
Wie nennt man betrügerische E-Mails, die Passwörter stehlen wollen? | Phishing | Spam | Cookies | Streaming | 1 | Phishing
Wie nennt man unerwünschte Werbe-E-Mails? | Spam | Phishing | Cookies | Bugs | 1 | Spam
Wie nennt man einen Fehler in einem Computerprogramm? | Bug | Patch | Cookie | Update | 1 | Programmfehler
Wie nennt man eine kleine Datei, die eine Website im Browser speichert? | Cookie | Cache | Bug | Plug-in | 1 | HTTP-Cookie
Wie heißt das Programm, mit dem man Websites anschaut? | Browser | Compiler | Router | Server | 1 | Webbrowser
Welche Firma steckt hinter dem Browser Chrome? | Google | Microsoft | Apple | Mozilla | 1 | Google Chrome
Welche Firma entwickelt den Browser Safari? | Apple | Google | Microsoft | Mozilla | 1 | Safari (Browser)
Welche Organisation entwickelt den Browser Firefox? | Mozilla | Google | Opera | Apple | 1 | Mozilla Firefox
Wie heißt das Betriebssystem von Apple-Computern? | macOS | Windows | Android | Linux | 1 | macOS
Wie heißt das Betriebssystem des iPhones? | iOS | Android | Windows Phone | HarmonyOS | 1 | iOS (Betriebssystem)
Welches Zeichen steht in jeder E-Mail-Adresse? | @ | # | & | % | 1 | At-Zeichen
Wie nennt man das Zeichen # in sozialen Medien? | Hashtag | At | Tilde | Asterisk | 1 | Hashtag
Wofür steht „.de“ am Ende einer Internetadresse? | Deutschland | Domain | Digital | Dänemark | 1 | .de
Welche Länderendung hat Österreich im Internet? | .at | .os | .au | .oe | 1 | .at
Welche Länderendung hat die Schweiz im Internet? | .ch | .sw | .sz | .se | 1 | .ch
Wie heißt die Videoplattform, die zu Google gehört? | YouTube | TikTok | Twitch | Vimeo | 1 | YouTube
Wie hieß der Kurznachrichtendienst „X“ früher? | Twitter | Tumblr | MySpace | Snapchat | 1 | Twitter
Zu welchem Konzern gehört WhatsApp? | Meta | Google | Apple | Microsoft | 1 | WhatsApp | alt=Facebook
Aus welchem Land stammt die App TikTok? | China | USA | Japan | Südkorea | 1 | TikTok
Wie heißt die Streaming-Plattform für Live-Videospiele, die zu Amazon gehört? | Twitch | YouTube | Netflix | Steam | 2 | Twitch
Wie heißt die Spielkonsole von Sony? | PlayStation | Xbox | Switch | Game Boy | 1 | PlayStation
Wie heißt die Spielkonsole von Microsoft? | Xbox | PlayStation | Wii | Switch | 1 | Xbox
Wie heißt der berühmte Klempner aus den Nintendo-Spielen? | Mario | Luigi | Sonic | Link | 1 | Mario (Spielfigur)
Wie heißt das Klötzchen-Spiel, in dem man Welten aus Blöcken baut? | Minecraft | Fortnite | Tetris | Roblox | 1 | Minecraft
Wie heißt das Spiel mit fallenden Blöcken aus der Sowjetunion (1984)? | Tetris | Pac-Man | Pong | Snake | 1 | Tetris
Wie heißt das gelbe Spielfigur-Wesen, das Punkte im Labyrinth frisst? | Pac-Man | Mario | Kirby | Sonic | 1 | Pac-Man
Welches Videospiel gilt als eines der ersten kommerziell erfolgreichen (Tennis-ähnlich, 1972)? | Pong | Tetris | Space Invaders | Pac-Man | 2 | Pong
Wer gilt als erste Programmiererin der Geschichte? | Ada Lovelace | Grace Hopper | Marie Curie | Hedy Lamarr | 1 | Ada Lovelace | alt=Lovelace
Welche Schauspielerin entwickelte eine Funktechnik, die später für WLAN wichtig wurde? | Hedy Lamarr | Marlene Dietrich | Marilyn Monroe | Grace Kelly | 2 | Hedy Lamarr | alt=Lamarr
Wie heißt der Test, ob eine Maschine wie ein Mensch denken kann? | Turing-Test | Kepler-Test | Zuse-Test | Moore-Test | 2 | Turing-Test
Wer knackte im Zweiten Weltkrieg mit seinem Team die Enigma-Verschlüsselung? | Alan Turing | Konrad Zuse | John von Neumann | Charles Babbage | 2 | Enigma (Maschine) | alt=Turing
Wie heißt die Verschlüsselungsmaschine der deutschen Wehrmacht? | Enigma | Lorenz | Colossus | Z3 | 2 | Enigma (Maschine)
Wie nennt man Software, deren Quellcode jeder einsehen und ändern darf? | Open Source | Freeware | Shareware | Closed Source | 2 | Open Source
Wie heißt der Chatbot von OpenAI? | ChatGPT | Siri | Alexa | Cortana | 1 | ChatGPT
Wie heißt die Sprachassistentin von Apple? | Siri | Alexa | Cortana | Bixby | 1 | Siri
Wie heißt die Sprachassistentin von Amazon? | Alexa | Siri | Cortana | Google Assistant | 1 | Amazon Alexa
Wie viele Bit hat eine IPv4-Adresse? | 32 | 64 | 128 | 16 | 2 | IPv4
Wofür nutzt man einen Router? | Um Netzwerke zu verbinden (z. B. mit dem Internet) | Um Texte zu drucken | Um Strom zu sparen | Um Bilder zu bearbeiten | 1 | Router | mc
Was macht eine Firewall? | Sie schützt ein Netzwerk vor unerwünschten Zugriffen | Sie kühlt den Computer | Sie löscht Viren | Sie beschleunigt das WLAN | 1 | Firewall | mc
Was ist eine Cloud im IT-Sinn? | Speicher und Dienste im Internet | Eine Wetterstation | Ein Bildschirmschoner | Ein USB-Stick | 1 | Cloud Computing | mc
Was ist ein Algorithmus? | Eine eindeutige Schritt-für-Schritt-Anleitung | Ein Computerteil | Eine Programmiersprache | Ein Virus | 1 | Algorithmus | mc
Was ist ein Pixel? | Ein Bildpunkt | Ein Speicherchip | Ein Kabel | Eine Taste | 1 | Pixel
Welche Auflösung nennt man „Full HD“? | 1920 × 1080 | 1280 × 720 | 3840 × 2160 | 800 × 600 | 2 | Full HD
Welche Auflösung hat 4K (UHD) ungefähr? | 3840 × 2160 | 1920 × 1080 | 2560 × 1440 | 7680 × 4320 | 2 | 4K (Bildauflösung)
Wie heißt das Tastaturlayout in Deutschland? | QWERTZ | QWERTY | AZERTY | DVORAK | 1 | QWERTZ-Tastaturbelegung
Wie heißt das Tastaturlayout in Frankreich? | AZERTY | QWERTZ | QWERTY | Colemak | 2 | AZERTY
Welche Tastenkombination kopiert unter Windows? | Strg + C | Strg + V | Strg + X | Strg + Z | 1 | Zwischenablage
Welche Tastenkombination fügt unter Windows ein? | Strg + V | Strg + C | Strg + Z | Strg + A | 1 | Zwischenablage
Welche Tastenkombination macht unter Windows rückgängig? | Strg + Z | Strg + Y | Strg + X | Strg + Q | 1 | Tastenkombination
Was beschreibt das Mooresche Gesetz? | Die Verdopplung der Transistoranzahl auf Chips etwa alle zwei Jahre | Die Lichtgeschwindigkeit | Die Akkulebensdauer | Die Internetgeschwindigkeit | 2 | Mooresches Gesetz | mc
Aus welchem Material bestehen die meisten Computerchips? | Silicium | Kupfer | Gold | Glas | 1 | Silicium
Wie heißt das Tal in Kalifornien, in dem viele Tech-Firmen sitzen? | Silicon Valley | Death Valley | Napa Valley | Yosemite | 1 | Silicon Valley
In welchem Jahr stellte Apple das erste iPhone vor? | 2007 | 2001 | 2010 | 2004 | 1 | iPhone (1. Generation)
In welchem Jahr kam die erste Version von Windows heraus? | 1985 | 1995 | 1975 | 2000 | 2 | Microsoft Windows
Wie heißt der erste Satellit der Welt (1957)? | Sputnik 1 | Explorer 1 | Wostok 1 | Apollo 1 | 1 | Sputnik 1 | alt=Sputnik
Wie heißt die Rakete, mit der Apollo 11 zum Mond flog? | Saturn V | Ariane 5 | Falcon 9 | Sojus | 2 | Saturn V
Wie heißt die europäische Trägerrakete? | Ariane | Sojus | Falcon | Atlas | 2 | Ariane 6
Wie heißt das Raumfahrtunternehmen von Elon Musk? | SpaceX | Blue Origin | Virgin Galactic | Rocket Lab | 1 | SpaceX
Wie heißt das europäische Satellitennavigationssystem? | Galileo | GPS | GLONASS | Beidou | 2 | Galileo (Satellitennavigation)
# Verkehr
Welches Verkehrsmittel fuhr 1835 erstmals in Deutschland zwischen Nürnberg und Fürth? | Eisenbahn | Straßenbahn | Auto | Luftschiff | 1 | Adler (Lokomotive)
Wie hieß die erste deutsche Dampflokomotive? | Adler | Rocket | Saxonia | Pegasus | 2 | Adler (Lokomotive)
Wie heißt der schnellste Zug der Deutschen Bahn? | ICE | IC | RE | S-Bahn | 1 | Intercity-Express
Wie schnell fährt ein ICE maximal im regulären Betrieb (ungefähr)? | 300 km/h | 160 km/h | 500 km/h | 220 km/h | 2 | Intercity-Express | mc
Wie heißt der japanische Hochgeschwindigkeitszug? | Shinkansen | TGV | Maglev | Eurostar | 1 | Shinkansen
Wie heißt der französische Hochgeschwindigkeitszug? | TGV | ICE | AVE | Thalys | 1 | Train à grande vitesse
Wie heißt der Zug, der durch den Eurotunnel fährt? | Eurostar | Thalys | Glacier Express | Orient-Express | 1 | Eurostar
Welche Schwebebahn ist ein Wahrzeichen von Wuppertal? | Wuppertaler Schwebebahn | Transrapid | Magnetbahn | Monorail | 1 | Wuppertaler Schwebebahn
Wie hieß die deutsche Magnetschwebebahn? | Transrapid | Maglev | Aerotrain | Hyperloop | 1 | Transrapid
Wie heißt das größte Passagierflugzeug der Welt? | Airbus A380 | Boeing 747 | Boeing 777 | Airbus A350 | 1 | Airbus A380
Welches Überschall-Passagierflugzeug flog bis 2003? | Concorde | Tupolew Tu-144 | Boeing 2707 | Airbus A380 | 1 | Concorde
Wie heißt das berühmteste Luftschiff, das 1937 in Lakehurst verbrannte? | Hindenburg | Graf Zeppelin | Norge | Italia | 1 | LZ 129
Wie nennt man ein Auto, das sowohl einen Verbrenner- als auch einen Elektromotor hat? | Hybridauto | Elektroauto | Wasserstoffauto | Diesel | 1 | Hybridelektrokraftfahrzeug
Welche Antriebsart hat ein Brennstoffzellenauto? | Wasserstoff | Diesel | Benzin | Erdgas | 1 | Brennstoffzellenfahrzeug
Wie heißt der berühmte VW mit runder Form, der über 21 Millionen Mal gebaut wurde? | Käfer | Golf | Polo | Bulli | 1 | VW Käfer
Wie heißt das meistverkaufte Auto Deutschlands über viele Jahre? | VW Golf | Opel Astra | BMW 3er | Ford Focus | 1 | VW Golf | alt=Golf
In welcher Stadt hat Volkswagen seinen Hauptsitz? | Wolfsburg | Stuttgart | München | Ingolstadt | 1 | Volkswagen Arena
In welcher Stadt sitzt BMW? | München | Stuttgart | Wolfsburg | Ingolstadt | 1 | BMW-Vierzylinder
In welcher Stadt sitzt Mercedes-Benz? | Stuttgart | München | Wolfsburg | Köln | 1 | Mercedes-Benz Museum
In welcher Stadt sitzt Audi? | Ingolstadt | München | Neckarsulm | Wolfsburg | 2 | Audi
In welcher Stadt sitzt Porsche? | Stuttgart | München | Ingolstadt | Wolfsburg | 2 | Porsche
Was zeigt der Tacho im Auto an? | Geschwindigkeit | Tankfüllung | Motortemperatur | Ölstand | 1 | Tachometer
Was zählt der Kilometerzähler? | Die gefahrene Strecke | Die Geschwindigkeit | Die Drehzahl | Den Verbrauch | 1 | Kilometerzähler
Was zeigt der Drehzahlmesser an? | Umdrehungen des Motors pro Minute | Geschwindigkeit | Tankfüllung | Uhrzeit | 1 | Drehzahlmesser
Wie nennt man ein Auto ohne Fahrer, das selbst lenkt? | Autonomes Fahrzeug | Cabrio | Kombi | Hybrid | 1 | Autonomes Fahren
Wie heißt der längste Eisenbahntunnel der Welt (in der Schweiz)? | Gotthard-Basistunnel | Eurotunnel | Seikan-Tunnel | Lötschberg-Basistunnel | 1 | Gotthard-Basistunnel
Welche Wasserstraße verbindet Nordsee und Ostsee durch Schleswig-Holstein? | Nord-Ostsee-Kanal | Mittellandkanal | Panamakanal | Elbe-Lübeck-Kanal | 1 | Nord-Ostsee-Kanal
Welche Kanäle verbinden Atlantik und Pazifik in Mittelamerika? | Panamakanal | Suezkanal | Nord-Ostsee-Kanal | Korinth-Kanal | 1 | Panamakanal
Welcher Kanal verbindet das Mittelmeer mit dem Roten Meer? | Suezkanal | Panamakanal | Korinth-Kanal | Kiel-Kanal | 1 | Sueskanal
Wie heißt das größte Containerschiff-Hafen Europas (Stadt)? | Rotterdam | Hamburg | Antwerpen | Bremerhaven | 2 | Hafen Rotterdam
Wie heißt das Fahrrad mit elektrischer Tretunterstützung? | Pedelec (E-Bike) | Mountainbike | Tandem | Rennrad | 1 | Pedelec | alt=E-Bike/Pedelec
# Energie und Alltagstechnik
Welche Energiequelle nutzt eine Photovoltaikanlage? | Sonnenlicht | Wind | Wasser | Erdwärme | 1 | Photovoltaikanlage
Welche Energiequelle nutzt eine Windkraftanlage? | Wind | Sonne | Kohle | Uran | 1 | Windkraftanlage
Welcher Brennstoff wird in Atomkraftwerken genutzt? | Uran | Kohle | Erdgas | Wasserstoff | 1 | Kernkraftwerk
In welchem Jahr schaltete Deutschland seine letzten Atomkraftwerke ab? | 2023 | 2011 | 2020 | 2025 | 1 | Atomausstieg
Welcher Reaktorunfall ereignete sich 1986 in der Ukraine? | Tschernobyl | Fukushima | Three Mile Island | Sellafield | 1 | Nuklearkatastrophe von Tschernobyl
Welcher Reaktorunfall folgte 2011 auf ein Erdbeben in Japan? | Fukushima | Tschernobyl | Harrisburg | Mayak | 1 | Nuklearkatastrophe von Fukushima
Welches Kraftwerk nutzt die Wärme aus dem Erdinneren? | Geothermiekraftwerk | Gezeitenkraftwerk | Kohlekraftwerk | Biogasanlage | 2 | Geothermie
Was speichert ein Akku? | Elektrische Energie | Wasser | Wärme | Daten | 1 | Akkumulator
Welches Metall ist wichtig für die meisten heutigen Handy-Akkus? | Lithium | Blei | Zink | Eisen | 1 | Lithium-Ionen-Akkumulator
Wie funktioniert eine Mikrowelle? | Sie bringt Wassermoleküle zum Schwingen | Mit offener Flamme | Mit UV-Licht | Mit Infrarot-Lampen | 2 | Mikrowellenherd | mc
Wie funktioniert ein Induktionsherd? | Ein Magnetfeld erhitzt den Topfboden | Gasflamme | Heiße Glasplatte | Mikrowellen | 2 | Induktionskochfeld | mc
Wofür steht „LED“ in Lampen? | Leuchtdiode | Lange Energie-Dauer | Licht-Energie-Draht | Leuchtende Elektrische Drähte | 1 | Leuchtdiode | mc
Was misst ein Stromzähler? | Den Stromverbrauch | Die Spannung | Die Temperatur | Den Wasserverbrauch | 1 | Stromzähler
Wie nennt man das Teil, das bei Überlastung den Stromkreis unterbricht? | Sicherung | Steckdose | Schalter | Transformator | 1 | Sicherung (Elektrotechnik)
Was ist ein Kurzschluss? | Eine direkte Verbindung ohne Widerstand zwischen den Polen | Ein kurzes Kabel | Eine leere Batterie | Ein Lichtschalter | 2 | Kurzschluss | mc
Was ist ein QR-Code? | Ein zweidimensionaler Strichcode | Ein Passwort | Ein Computervirus | Eine Programmiersprache | 1 | QR-Code | mc
Wofür braucht man eine Wasserwaage? | Um zu prüfen, ob etwas waagerecht ist | Um Wasser zu wiegen | Um Wasserdruck zu messen | Zum Messen der Temperatur | 1 | Wasserwaage | mc
Welches Werkzeug nutzt man, um Schrauben einzudrehen? | Schraubenzieher | Hammer | Säge | Zange | 1 | Schraubendreher | alt=Schraubendreher
Welches Werkzeug misst Längen sehr genau (mit Nonius)? | Messschieber | Zollstock | Wasserwaage | Zirkel | 2 | Messschieber
Wie heißt der zusammenklappbare Meterstab? | Zollstock | Lineal | Maßband | Schieblehre | 1 | Gliedermaßstab
Wie viele Zentimeter hat ein Zoll? | 2,54 | 3 | 2 | 1,5 | 2 | Zoll (Einheit)
Wie misst man Bildschirmgrößen meistens? | In Zoll (Diagonale) | In Zentimeter Breite | In Pixel Höhe | In Megapixel | 1 | Zoll (Einheit) | mc
Was bedeutet „WLAN“ auf Deutsch sinngemäß? | Drahtloses lokales Netzwerk | Weltweites Netz | Mobilfunk | Kabelinternet | 1 | Wireless Local Area Network | mc
Wie nennt man die drahtlose Kurzstreckenverbindung für Kopfhörer? | Bluetooth | NFC | WLAN | Infrarot | 1 | Bluetooth
Nach wem ist „Bluetooth“ benannt? | Einem dänischen König | Einem Zahnarzt | Einer Frucht | Einem Erfinder | 2 | Harald Blauzahn | mc
Wie heißt das Gerät, das Bilder auf Papier bringt? | Drucker | Scanner | Beamer | Monitor | 1 | Drucker (Gerät)
Wie heißt das Gerät, das Papiervorlagen digitalisiert? | Scanner | Drucker | Plotter | Kopierer | 1 | Scanner (Datenerfassung)
Was macht ein 3D-Drucker? | Er baut Gegenstände Schicht für Schicht auf | Er druckt nur auf Papier | Er scannt Gesichter | Er projiziert Hologramme | 1 | 3D-Druck | mc
Wie heißt ein unbemanntes Fluggerät, das ferngesteuert fliegt? | Drohne | Zeppelin | Segelflugzeug | Ballon | 1 | Unbemanntes Luftfahrzeug
`);
})();
