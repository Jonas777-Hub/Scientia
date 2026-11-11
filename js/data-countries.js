/*
 * Länderdaten für Scientia.
 * Format je Zeile: Kartenname (Natural Earth) | deutscher Name | Hauptstadt | Regionen | ISO-3166-Alpha-2
 * Regionen: EU Europa, AS Asien, AF Afrika, NA Nord- & Mittelamerika, SA Südamerika, OC Ozeanien
 */
(function () {
  const RAW = `
Albania|Albanien|Tirana|EU|AL
Andorra|Andorra|Andorra la Vella|EU|AD
Austria|Österreich|Wien|EU|AT
Belarus|Belarus|Minsk|EU|BY
Belgium|Belgien|Brüssel|EU|BE
Bosnia and Herz.|Bosnien und Herzegowina|Sarajevo|EU|BA
Bulgaria|Bulgarien|Sofia|EU|BG
Croatia|Kroatien|Zagreb|EU|HR
Cyprus|Zypern|Nikosia|EU|CY
Czechia|Tschechien|Prag|EU|CZ
Denmark|Dänemark|Kopenhagen|EU|DK
Estonia|Estland|Tallinn|EU|EE
Finland|Finnland|Helsinki|EU|FI
France|Frankreich|Paris|EU|FR
Germany|Deutschland|Berlin|EU|DE
Greece|Griechenland|Athen|EU|GR
Hungary|Ungarn|Budapest|EU|HU
Iceland|Island|Reykjavík|EU|IS
Ireland|Irland|Dublin|EU|IE
Italy|Italien|Rom|EU|IT
Kosovo|Kosovo|Pristina|EU|XK
Latvia|Lettland|Riga|EU|LV
Liechtenstein|Liechtenstein|Vaduz|EU|LI
Lithuania|Litauen|Vilnius|EU|LT
Luxembourg|Luxemburg|Luxemburg|EU|LU
Malta|Malta|Valletta|EU|MT
Moldova|Moldau|Chișinău|EU|MD
Monaco|Monaco|Monaco|EU|MC
Montenegro|Montenegro|Podgorica|EU|ME
Netherlands|Niederlande|Amsterdam|EU|NL
Macedonia|Nordmazedonien|Skopje|EU|MK
Norway|Norwegen|Oslo|EU|NO
Poland|Polen|Warschau|EU|PL
Portugal|Portugal|Lissabon|EU|PT
Romania|Rumänien|Bukarest|EU|RO
Russia|Russland|Moskau|EU,AS|RU
San Marino|San Marino|San Marino|EU|SM
Serbia|Serbien|Belgrad|EU|RS
Slovakia|Slowakei|Bratislava|EU|SK
Slovenia|Slowenien|Ljubljana|EU|SI
Spain|Spanien|Madrid|EU|ES
Sweden|Schweden|Stockholm|EU|SE
Switzerland|Schweiz|Bern|EU|CH
Ukraine|Ukraine|Kiew|EU|UA
United Kingdom|Vereinigtes Königreich|London|EU|GB
Vatican|Vatikanstadt|Vatikanstadt|EU|VA
Afghanistan|Afghanistan|Kabul|AS|AF
Armenia|Armenien|Jerewan|AS|AM
Azerbaijan|Aserbaidschan|Baku|AS|AZ
Bahrain|Bahrain|Manama|AS|BH
Bangladesh|Bangladesch|Dhaka|AS|BD
Bhutan|Bhutan|Thimphu|AS|BT
Brunei|Brunei|Bandar Seri Begawan|AS|BN
Cambodia|Kambodscha|Phnom Penh|AS|KH
China|China|Peking|AS|CN
Georgia|Georgien|Tiflis|AS|GE
India|Indien|Neu-Delhi|AS|IN
Indonesia|Indonesien|Jakarta|AS|ID
Iran|Iran|Teheran|AS|IR
Iraq|Irak|Bagdad|AS|IQ
Israel|Israel|Jerusalem|AS|IL
Japan|Japan|Tokio|AS|JP
Jordan|Jordanien|Amman|AS|JO
Kazakhstan|Kasachstan|Astana|AS|KZ
Kuwait|Kuwait|Kuwait-Stadt|AS|KW
Kyrgyzstan|Kirgisistan|Bischkek|AS|KG
Laos|Laos|Vientiane|AS|LA
Lebanon|Libanon|Beirut|AS|LB
Malaysia|Malaysia|Kuala Lumpur|AS|MY
Maldives|Malediven|Malé|AS|MV
Mongolia|Mongolei|Ulaanbaatar|AS|MN
Myanmar|Myanmar|Naypyidaw|AS|MM
Nepal|Nepal|Kathmandu|AS|NP
North Korea|Nordkorea|Pjöngjang|AS|KP
Oman|Oman|Maskat|AS|OM
Pakistan|Pakistan|Islamabad|AS|PK
Philippines|Philippinen|Manila|AS|PH
Qatar|Katar|Doha|AS|QA
Saudi Arabia|Saudi-Arabien|Riad|AS|SA
Singapore|Singapur|Singapur|AS|SG
South Korea|Südkorea|Seoul|AS|KR
Sri Lanka|Sri Lanka|Sri Jayewardenepura Kotte|AS|LK
Syria|Syrien|Damaskus|AS|SY
Taiwan|Taiwan|Taipeh|AS|TW
Tajikistan|Tadschikistan|Duschanbe|AS|TJ
Thailand|Thailand|Bangkok|AS|TH
Timor-Leste|Osttimor|Dili|AS|TL
Turkey|Türkei|Ankara|AS,EU|TR
Turkmenistan|Turkmenistan|Aschgabat|AS|TM
United Arab Emirates|Vereinigte Arabische Emirate|Abu Dhabi|AS|AE
Uzbekistan|Usbekistan|Taschkent|AS|UZ
Vietnam|Vietnam|Hanoi|AS|VN
Yemen|Jemen|Sanaa|AS|YE
Algeria|Algerien|Algier|AF|DZ
Angola|Angola|Luanda|AF|AO
Benin|Benin|Porto-Novo|AF|BJ
Botswana|Botswana|Gaborone|AF|BW
Burkina Faso|Burkina Faso|Ouagadougou|AF|BF
Burundi|Burundi|Gitega|AF|BI
Cameroon|Kamerun|Yaoundé|AF|CM
Cabo Verde|Kap Verde|Praia|AF|CV
Central African Rep.|Zentralafrikanische Republik|Bangui|AF|CF
Chad|Tschad|N'Djamena|AF|TD
Comoros|Komoren|Moroni|AF|KM
Congo|Republik Kongo|Brazzaville|AF|CG
Dem. Rep. Congo|Demokratische Republik Kongo|Kinshasa|AF|CD
Côte d'Ivoire|Elfenbeinküste|Yamoussoukro|AF|CI
Djibouti|Dschibuti|Dschibuti|AF|DJ
Egypt|Ägypten|Kairo|AF|EG
Eq. Guinea|Äquatorialguinea|Malabo|AF|GQ
Eritrea|Eritrea|Asmara|AF|ER
eSwatini|Eswatini|Mbabane|AF|SZ
Ethiopia|Äthiopien|Addis Abeba|AF|ET
Gabon|Gabun|Libreville|AF|GA
Gambia|Gambia|Banjul|AF|GM
Ghana|Ghana|Accra|AF|GH
Guinea|Guinea|Conakry|AF|GN
Guinea-Bissau|Guinea-Bissau|Bissau|AF|GW
Kenya|Kenia|Nairobi|AF|KE
Lesotho|Lesotho|Maseru|AF|LS
Liberia|Liberia|Monrovia|AF|LR
Libya|Libyen|Tripolis|AF|LY
Madagascar|Madagaskar|Antananarivo|AF|MG
Malawi|Malawi|Lilongwe|AF|MW
Mali|Mali|Bamako|AF|ML
Mauritania|Mauretanien|Nouakchott|AF|MR
Mauritius|Mauritius|Port Louis|AF|MU
Morocco|Marokko|Rabat|AF|MA
Mozambique|Mosambik|Maputo|AF|MZ
Namibia|Namibia|Windhoek|AF|NA
Niger|Niger|Niamey|AF|NE
Nigeria|Nigeria|Abuja|AF|NG
Rwanda|Ruanda|Kigali|AF|RW
São Tomé and Principe|São Tomé und Príncipe|São Tomé|AF|ST
Senegal|Senegal|Dakar|AF|SN
Seychelles|Seychellen|Victoria|AF|SC
Sierra Leone|Sierra Leone|Freetown|AF|SL
Somalia|Somalia|Mogadischu|AF|SO
South Africa|Südafrika|Pretoria|AF|ZA
S. Sudan|Südsudan|Juba|AF|SS
Sudan|Sudan|Khartum|AF|SD
Tanzania|Tansania|Dodoma|AF|TZ
Togo|Togo|Lomé|AF|TG
Tunisia|Tunesien|Tunis|AF|TN
Uganda|Uganda|Kampala|AF|UG
Zambia|Sambia|Lusaka|AF|ZM
Zimbabwe|Simbabwe|Harare|AF|ZW
Antigua and Barb.|Antigua und Barbuda|Saint John's|NA|AG
Bahamas|Bahamas|Nassau|NA|BS
Barbados|Barbados|Bridgetown|NA|BB
Belize|Belize|Belmopan|NA|BZ
Canada|Kanada|Ottawa|NA|CA
Costa Rica|Costa Rica|San José|NA|CR
Cuba|Kuba|Havanna|NA|CU
Dominica|Dominica|Roseau|NA|DM
Dominican Rep.|Dominikanische Republik|Santo Domingo|NA|DO
El Salvador|El Salvador|San Salvador|NA|SV
Grenada|Grenada|St. George's|NA|GD
Guatemala|Guatemala|Guatemala-Stadt|NA|GT
Haiti|Haiti|Port-au-Prince|NA|HT
Honduras|Honduras|Tegucigalpa|NA|HN
Jamaica|Jamaika|Kingston|NA|JM
Mexico|Mexiko|Mexiko-Stadt|NA|MX
Nicaragua|Nicaragua|Managua|NA|NI
Panama|Panama|Panama-Stadt|NA|PA
St. Kitts and Nevis|St. Kitts und Nevis|Basseterre|NA|KN
Saint Lucia|St. Lucia|Castries|NA|LC
St. Vin. and Gren.|St. Vincent und die Grenadinen|Kingstown|NA|VC
Trinidad and Tobago|Trinidad und Tobago|Port of Spain|NA|TT
United States of America|Vereinigte Staaten|Washington, D.C.|NA|US
Argentina|Argentinien|Buenos Aires|SA|AR
Bolivia|Bolivien|Sucre|SA|BO
Brazil|Brasilien|Brasília|SA|BR
Chile|Chile|Santiago de Chile|SA|CL
Colombia|Kolumbien|Bogotá|SA|CO
Ecuador|Ecuador|Quito|SA|EC
Guyana|Guyana|Georgetown|SA|GY
Paraguay|Paraguay|Asunción|SA|PY
Peru|Peru|Lima|SA|PE
Suriname|Suriname|Paramaribo|SA|SR
Uruguay|Uruguay|Montevideo|SA|UY
Venezuela|Venezuela|Caracas|SA|VE
Australia|Australien|Canberra|OC|AU
Fiji|Fidschi|Suva|OC|FJ
Kiribati|Kiribati|South Tarawa|OC|KI
Marshall Is.|Marshallinseln|Majuro|OC|MH
Micronesia|Mikronesien|Palikir|OC|FM
Nauru|Nauru|Yaren|OC|NR
New Zealand|Neuseeland|Wellington|OC|NZ
Palau|Palau|Ngerulmud|OC|PW
Papua New Guinea|Papua-Neuguinea|Port Moresby|OC|PG
Samoa|Samoa|Apia|OC|WS
Solomon Is.|Salomonen|Honiara|OC|SB
Tonga|Tonga|Nuku'alofa|OC|TO
Vanuatu|Vanuatu|Port Vila|OC|VU
`;

  function flagEmoji(iso2) {
    return iso2.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  }

  window.COUNTRIES = RAW.trim().split("\n").map((line) => {
    const [topo, name, capital, regions, iso2] = line.split("|");
    return { topo, name, capital, regions: regions.split(","), iso2, flag: flagEmoji(iso2) };
  });

  window.REGIONS = [
    { id: "WORLD", name: "Welt", icon: "🌍" },
    { id: "EU", name: "Europa", icon: "🏰" },
    { id: "AS", name: "Asien", icon: "🏯" },
    { id: "AF", name: "Afrika", icon: "🦁" },
    { id: "NA", name: "Nord- & Mittelamerika", icon: "🗽" },
    { id: "SA", name: "Südamerika", icon: "🦜" },
    { id: "OC", name: "Ozeanien", icon: "🦘" },
  ];
})();

/* Weitere akzeptierte Schreibweisen für den Eintipp-Modus (Länder und Hauptstädte). */
window.ALT_NAMES = {
  "Vereinigte Staaten": ["USA", "US", "Amerika", "Vereinigte Staaten von Amerika", "United States"],
  "Vereinigtes Königreich": ["Großbritannien", "UK", "England", "Britannien", "United Kingdom"],
  "Niederlande": ["Holland"],
  "Tschechien": ["Tschechische Republik"],
  "Belarus": ["Weißrussland"],
  "Moldau": ["Moldawien", "Republik Moldau"],
  "Nordmazedonien": ["Mazedonien"],
  "Bosnien und Herzegowina": ["Bosnien", "Bosnien-Herzegowina"],
  "Vatikanstadt": ["Vatikan"],
  "Eswatini": ["Swasiland"],
  "Myanmar": ["Burma", "Birma"],
  "Osttimor": ["Timor-Leste"],
  "Elfenbeinküste": ["Côte d'Ivoire"],
  "Demokratische Republik Kongo": ["DR Kongo", "Kongo-Kinshasa", "Kongo Kinshasa"],
  "Republik Kongo": ["Kongo", "Kongo-Brazzaville"],
  "Zentralafrikanische Republik": ["ZAR"],
  "Vereinigte Arabische Emirate": ["VAE", "Emirate"],
  "Kap Verde": ["Cabo Verde", "Kapverden"],
  "Saudi-Arabien": ["Saudi Arabien"],
  "Südkorea": ["Korea", "Republik Korea"],
  "Nordkorea": ["Demokratische Volksrepublik Korea"],
  "St. Vincent und die Grenadinen": ["Saint Vincent und die Grenadinen", "St. Vincent"],
  "St. Kitts und Nevis": ["Saint Kitts und Nevis"],
  "St. Lucia": ["Saint Lucia"],
  "Marshallinseln": ["Marshall-Inseln"],
  "Salomonen": ["Salomon-Inseln", "Salomoninseln"],
  "Kirgisistan": ["Kirgistan", "Kirgisien"],
  "Peking": ["Beijing"],
  "Kiew": ["Kyjiw", "Kyiv"],
  "Washington, D.C.": ["Washington", "Washington DC"],
  "Neu-Delhi": ["New Delhi", "Delhi"],
  "Tokio": ["Tokyo"],
  "Rom": ["Roma"],
  "Mexiko-Stadt": ["Mexico City", "Mexiko City"],
  "Kuwait-Stadt": ["Kuwait"],
  "Guatemala-Stadt": ["Guatemala"],
  "Panama-Stadt": ["Panama"],
  "Santiago de Chile": ["Santiago"],
  "Pjöngjang": ["Pyongyang"],
  "Ulaanbaatar": ["Ulan Bator", "Ulan-Bator"],
  "Tiflis": ["Tbilissi", "Tbilisi"],
  "Jerewan": ["Eriwan", "Yerevan"],
  "Aschgabat": ["Ashgabat"],
  "Taschkent": ["Tashkent"],
  "Duschanbe": ["Dushanbe"],
  "Bischkek": ["Bishkek"],
  "Teheran": ["Tehran"],
  "Riad": ["Riyadh"],
  "Maskat": ["Muscat"],
  "Sanaa": ["Sana'a"],
  "Bagdad": ["Baghdad"],
  "Damaskus": ["Damascus"],
  "Kairo": ["Cairo"],
  "Algier": ["Algiers"],
  "Tripolis": ["Tripoli"],
  "Khartum": ["Khartoum"],
  "Mogadischu": ["Mogadishu"],
  "Addis Abeba": ["Addis Ababa"],
  "Dschibuti": ["Djibouti"],
  "Warschau": ["Warsaw", "Warszawa"],
  "Prag": ["Prague", "Praha"],
  "Wien": ["Vienna"],
  "Lissabon": ["Lisbon", "Lisboa"],
  "Kopenhagen": ["Copenhagen"],
  "Athen": ["Athens"],
  "Belgrad": ["Belgrade", "Beograd"],
  "Bukarest": ["Bucharest", "Bucuresti"],
  "Brüssel": ["Brussels", "Bruxelles"],
  "Moskau": ["Moscow"],
  "Nikosia": ["Nicosia"],
  "Chișinău": ["Chisinau", "Kischinau"],
  "Reykjavík": ["Reykjavik"],
  "Havanna": ["Havana"],
  "Saint John's": ["St. John's"],
  "St. George's": ["Saint George's"],
  "Bogotá": ["Bogota"],
  "Asunción": ["Asuncion"],
  "Brasília": ["Brasilia"],
  "Yaoundé": ["Yaounde"],
  "Lomé": ["Lome"],
  "Malé": ["Male"],
  "Sri Jayewardenepura Kotte": ["Kotte"],
  "Naypyidaw": ["Naypyitaw", "Nay Pyi Taw"],
  "Nuku'alofa": ["Nukualofa"],
  "Taipeh": ["Taipei"],
  "Pristina": ["Prishtina"],
  "Gitega": [],
};
