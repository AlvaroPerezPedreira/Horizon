interface CountryMapping {
  iso_a3: string;
  name: string;
  continent: string;
}

interface CountryMappings {
  [key: string]: CountryMapping;
}

export const countryMappings: CountryMappings = {
  España: { iso_a3: "ESP", name: "Spain", continent: "Europa" },
  Francia: { iso_a3: "FRA", name: "France", continent: "Europa" },
  Alemania: { iso_a3: "DEU", name: "Germany", continent: "Europa" },
  Italia: { iso_a3: "ITA", name: "Italy", continent: "Europa" },
  Inglaterra: { iso_a3: "GBR", name: "United Kingdom", continent: "Europa" },
  Portugal: { iso_a3: "PRT", name: "Portugal", continent: "Europa" },
  Holanda: { iso_a3: "NLD", name: "Netherlands", continent: "Europa" },
  Bélgica: { iso_a3: "BEL", name: "Belgium", continent: "Europa" },
  Suiza: { iso_a3: "CHE", name: "Switzerland", continent: "Europa" },
  Austria: { iso_a3: "AUT", name: "Austria", continent: "Europa" },
  Suecia: { iso_a3: "SWE", name: "Sweden", continent: "Europa" },
  Noruega: { iso_a3: "NOR", name: "Norway", continent: "Europa" },
  Dinamarca: { iso_a3: "DNK", name: "Denmark", continent: "Europa" },
  Finlandia: { iso_a3: "FIN", name: "Finland", continent: "Europa" },
  Polonia: { iso_a3: "POL", name: "Poland", continent: "Europa" },
  Rusia: { iso_a3: "RUS", name: "Russia", continent: "Europa" },
  Ucrania: { iso_a3: "UKR", name: "Ukraine", continent: "Europa" },
  "Ciudad del Vaticano": {
    iso_a3: "VAT",
    name: "Vatican City",
    continent: "Europa",
  },

  // América
  "Estados Unidos": {
    iso_a3: "USA",
    name: "United States of America",
    continent: "América del Norte",
  },
  Canadá: { iso_a3: "CAN", name: "Canada", continent: "América del Norte" },
  México: { iso_a3: "MEX", name: "Mexico", continent: "América del Norte" },
  Argentina: { iso_a3: "ARG", name: "Argentina", continent: "América del Sur" },
  Brasil: { iso_a3: "BRA", name: "Brazil", continent: "América del Sur" },
  Chile: { iso_a3: "CHL", name: "Chile", continent: "América del Sur" },
  Colombia: { iso_a3: "COL", name: "Colombia", continent: "América del Sur" },
  Perú: { iso_a3: "PER", name: "Peru", continent: "América del Sur" },
  Venezuela: { iso_a3: "VEN", name: "Venezuela", continent: "América del Sur" },
  Uruguay: { iso_a3: "URY", name: "Uruguay", continent: "América del Sur" },
  Paraguay: { iso_a3: "PRY", name: "Paraguay", continent: "América del Sur" },
  Ecuador: { iso_a3: "ECU", name: "Ecuador", continent: "América del Sur" },
  Bolivia: { iso_a3: "BOL", name: "Bolivia", continent: "América del Sur" },
  "Costa Rica": {
    iso_a3: "CRI",
    name: "Costa Rica",
    continent: "América Central",
  },
  Panamá: { iso_a3: "PAN", name: "Panama", continent: "América Central" },

  // Asia
  China: { iso_a3: "CHN", name: "China", continent: "Asia" },
  Japón: { iso_a3: "JPN", name: "Japan", continent: "Asia" },
  India: { iso_a3: "IND", name: "India", continent: "Asia" },
  "Corea del Sur": { iso_a3: "KOR", name: "South Korea", continent: "Asia" },
  "Corea del Norte": { iso_a3: "PRK", name: "North Korea", continent: "Asia" },
  Australia: { iso_a3: "AUS", name: "Australia", continent: "Oceanía" },
  "Nueva Zelanda": { iso_a3: "NZL", name: "New Zealand", continent: "Oceanía" },
  Indonesia: { iso_a3: "IDN", name: "Indonesia", continent: "Asia" },
  Tailandia: { iso_a3: "THA", name: "Thailand", continent: "Asia" },
  Vietnam: { iso_a3: "VNM", name: "Vietnam", continent: "Asia" },
  Filipinas: { iso_a3: "PHL", name: "Philippines", continent: "Asia" },
  Malasia: { iso_a3: "MYS", name: "Malaysia", continent: "Asia" },
  Singapur: { iso_a3: "SGP", name: "Singapore", continent: "Asia" },

  // África
  Sudáfrica: { iso_a3: "ZAF", name: "South Africa", continent: "África" },
  Egipto: { iso_a3: "EGY", name: "Egypt", continent: "África" },
  Nigeria: { iso_a3: "NGA", name: "Nigeria", continent: "África" },
  Kenia: { iso_a3: "KEN", name: "Kenya", continent: "África" },
  Marruecos: { iso_a3: "MAR", name: "Morocco", continent: "África" },
  Argelia: { iso_a3: "DZA", name: "Algeria", continent: "África" },
  Etiopía: { iso_a3: "ETH", name: "Ethiopia", continent: "África" },

  // Oriente Medio
  "Arabia Saudita": { iso_a3: "SAU", name: "Saudi Arabia", continent: "Asia" },
  Irán: { iso_a3: "IRN", name: "Iran", continent: "Asia" },
  Israel: { iso_a3: "ISR", name: "Israel", continent: "Asia" },
  Turquía: { iso_a3: "TUR", name: "Turkey", continent: "Asia" },

  // Centroamérica y Caribe
  Cuba: { iso_a3: "CUB", name: "Cuba", continent: "América Central" },
  "República Dominicana": {
    iso_a3: "DOM",
    name: "Dominican Republic",
    continent: "América Central",
  },
  "Puerto Rico": {
    iso_a3: "PRI",
    name: "Puerto Rico",
    continent: "América Central",
  },
  Jamaica: { iso_a3: "JAM", name: "Jamaica", continent: "América Central" },
  Haití: { iso_a3: "HTI", name: "Haiti", continent: "América Central" },

  // Otros países europeos
  Irlanda: { iso_a3: "IRL", name: "Ireland", continent: "Europa" },
  Grecia: { iso_a3: "GRC", name: "Greece", continent: "Europa" },
  "República Checa": {
    iso_a3: "CZE",
    name: "Czech Republic",
    continent: "Europa",
  },
  Hungría: { iso_a3: "HUN", name: "Hungary", continent: "Europa" },
  Rumania: { iso_a3: "ROU", name: "Romania", continent: "Europa" },
  Bulgaria: { iso_a3: "BGR", name: "Bulgaria", continent: "Europa" },
  Croacia: { iso_a3: "HRV", name: "Croatia", continent: "Europa" },
  Serbia: { iso_a3: "SRB", name: "Serbia", continent: "Europa" },
  Eslovaquia: { iso_a3: "SVK", name: "Slovakia", continent: "Europa" },
  Eslovenia: { iso_a3: "SVN", name: "Slovenia", continent: "Europa" },
  Lituania: { iso_a3: "LTU", name: "Lithuania", continent: "Europa" },
  Letonia: { iso_a3: "LVA", name: "Latvia", continent: "Europa" },
  Estonia: { iso_a3: "EST", name: "Estonia", continent: "Europa" },
};

// Función helper para buscar país por nombre español
export const getCountryInfo = (spanishName: string): CountryMapping | null => {
  return countryMappings[spanishName] || null;
};

// Función para obtener el nombre en inglés desde español
export const getEnglishName = (spanishName: string): string => {
  const info = getCountryInfo(spanishName);
  return info ? info.name : spanishName;
};

// Función para obtener el código ISO desde español
export const getISOCode = (spanishName: string): string | null => {
  const info = getCountryInfo(spanishName);
  return info ? info.iso_a3 : null;
};

// Función para obtener el continente desde español
export const getContinent = (spanishName: string): string | null => {
  const info = getCountryInfo(spanishName);
  return info ? info.continent : null;
};

// Lista de todos los nombres en español para usar fácilmente
export const spanishCountryNames: string[] = Object.keys(countryMappings);

// Lista de continentes únicos
export const continents: string[] = [
  "Europa",
  "América del Norte",
  "América del Sur",
  "América Central",
  "Asia",
  "África",
  "Oceanía",
];

// Constante para los continentes (usado en gráficos)
export const continentCodes: Record<string, string> = {
  Europa: "EU",
  "América del Norte": "NA",
  "América del Sur": "SA",
  "América Central": "CA",
  Asia: "AS",
  África: "AF",
  Oceanía: "OC",
};

// Número total de países por continente (para calcular ratios)
export const COUNTRIES_PER_CONTINENT: Record<string, number> = {
  Europa: 44,
  "América del Norte": 3,
  "América Central": 7,
  "América del Sur": 12,
  Asia: 49,
  Oceanía: 14,
  África: 54,
};

// Grupos de países por región
export const countryRegions: Record<string, string[]> = {
  europa: [
    "España",
    "Francia",
    "Alemania",
    "Italia",
    "Reino Unido",
    "Portugal",
    "Países Bajos",
    "Bélgica",
    "Suiza",
    "Austria",
    "Suecia",
    "Noruega",
    "Dinamarca",
    "Finlandia",
    "Polonia",
    "Rusia",
    "Ucrania",
    "Irlanda",
    "Grecia",
    "República Checa",
    "Hungría",
    "Rumania",
    "Bulgaria",
    "Croacia",
    "Serbia",
    "Eslovaquia",
    "Eslovenia",
    "Lituania",
    "Letonia",
    "Estonia",
  ],
  norteamerica: ["Estados Unidos", "Canadá", "México"],
  sudamerica: [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Perú",
    "Venezuela",
    "Uruguay",
    "Paraguay",
    "Ecuador",
    "Bolivia",
  ],
  centroamerica: [
    "Costa Rica",
    "Panamá",
    "Cuba",
    "República Dominicana",
    "Puerto Rico",
    "Jamaica",
    "Haití",
  ],
  asia: [
    "China",
    "Japón",
    "India",
    "Corea del Sur",
    "Corea del Norte",
    "Australia",
    "Nueva Zelanda",
    "Indonesia",
    "Tailandia",
    "Vietnam",
    "Filipinas",
    "Malasia",
    "Singapur",
  ],
  africa: [
    "Sudáfrica",
    "Egipto",
    "Nigeria",
    "Kenia",
    "Marruecos",
    "Argelia",
    "Etiopía",
  ],
  orientemedio: ["Arabia Saudita", "Irán", "Israel", "Turquía"],
};

export default countryMappings;
