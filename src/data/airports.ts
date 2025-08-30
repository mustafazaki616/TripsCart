// Comprehensive airport database for autocomplete functionality
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  searchTerms: string; // Combined search terms for better matching
}

export const airports: Airport[] = [
  // United Kingdom
  { code: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom", searchTerms: "london heathrow lhr uk england" },
  { code: "LGW", name: "London Gatwick", city: "London", country: "United Kingdom", searchTerms: "london gatwick lgw uk england" },
  { code: "STN", name: "London Stansted", city: "London", country: "United Kingdom", searchTerms: "london stansted stn uk england" },
  { code: "LTN", name: "London Luton", city: "London", country: "United Kingdom", searchTerms: "london luton ltn uk england" },
  { code: "LCY", name: "London City Airport", city: "London", country: "United Kingdom", searchTerms: "london city lcy uk england" },
  { code: "MAN", name: "Manchester", city: "Manchester", country: "United Kingdom", searchTerms: "manchester man uk england" },
  { code: "BHX", name: "Birmingham", city: "Birmingham", country: "United Kingdom", searchTerms: "birmingham bhx uk england" },
  { code: "EDI", name: "Edinburgh", city: "Edinburgh", country: "United Kingdom", searchTerms: "edinburgh edi uk scotland" },
  { code: "GLA", name: "Glasgow", city: "Glasgow", country: "United Kingdom", searchTerms: "glasgow gla uk scotland" },
  { code: "CWL", name: "Cardiff", city: "Cardiff", country: "United Kingdom", searchTerms: "cardiff cwl uk wales" },

  // Saudi Arabia
  { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia", searchTerms: "jeddah jed saudi arabia king abdulaziz" },
  { code: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia", searchTerms: "riyadh ruh saudi arabia king khalid" },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz International Airport", city: "Medina", country: "Saudi Arabia", searchTerms: "medina med saudi arabia prince mohammad bin abdulaziz" },

  // United Arab Emirates
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates", searchTerms: "dubai dxb uae emirates" },
  { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "United Arab Emirates", searchTerms: "abu dhabi auh uae emirates" },
  { code: "SHJ", name: "Sharjah International Airport", city: "Sharjah", country: "United Arab Emirates", searchTerms: "sharjah shj uae emirates" },

  // Qatar
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", searchTerms: "doha doh qatar hamad" },

  // Kuwait
  { code: "KWI", name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait", searchTerms: "kuwait kwi kuwait city" },

  // Jordan
  { code: "AMM", name: "Queen Alia International Airport", city: "Amman", country: "Jordan", searchTerms: "amman amm jordan queen alia" },
  { code: "AQJ", name: "King Hussein International Airport", city: "Aqaba", country: "Jordan", searchTerms: "aqaba aqj jordan king hussein" },

  // Oman
  { code: "MCT", name: "Muscat International Airport", city: "Muscat", country: "Oman", searchTerms: "muscat mct oman" },
  { code: "SLL", name: "Salalah International Airport", city: "Salalah", country: "Oman", searchTerms: "salalah sll oman" },

  // Bahrain
  { code: "BAH", name: "Bahrain International Airport", city: "Manama", country: "Bahrain", searchTerms: "bahrain bah manama" },

  // India
  { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India", searchTerms: "delhi del india indira gandhi" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", searchTerms: "mumbai bom india chhatrapati shivaji maharaj" },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bengaluru", country: "India", searchTerms: "bengaluru bangalore blr india kempegowda" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India", searchTerms: "chennai maa india" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", country: "India", searchTerms: "kolkata ccu india netaji subhas chandra bose" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India", searchTerms: "hyderabad hyd india rajiv gandhi" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India", searchTerms: "ahmedabad amd india sardar vallabhbhai patel" },

  // Pakistan
  { code: "ISB", name: "Islamabad International Airport", city: "Islamabad", country: "Pakistan", searchTerms: "islamabad isb pakistan" },
  { code: "KHI", name: "Jinnah International Airport", city: "Karachi", country: "Pakistan", searchTerms: "karachi khi pakistan jinnah" },
  { code: "LHE", name: "Allama Iqbal International Airport", city: "Lahore", country: "Pakistan", searchTerms: "lahore lhe pakistan allama iqbal" },
  { code: "PEW", name: "Bacha Khan International Airport", city: "Peshawar", country: "Pakistan", searchTerms: "peshawar pew pakistan bacha khan" },
  { code: "MUX", name: "Multan International Airport", city: "Multan", country: "Pakistan", searchTerms: "multan mux pakistan" },
  { code: "UET", name: "Quetta International Airport", city: "Quetta", country: "Pakistan", searchTerms: "quetta uet pakistan" },
  { code: "GWD", name: "Gwadar International Airport", city: "Gwadar", country: "Pakistan", searchTerms: "gwadar gwd pakistan" },

  // South Africa
  { code: "JNB", name: "O. R. Tambo International", city: "Johannesburg", country: "South Africa", searchTerms: "johannesburg jnb south africa tambo" },
  { code: "CPT", name: "Cape Town", city: "Cape Town", country: "South Africa", searchTerms: "cape town cpt south africa" },
  { code: "DUR", name: "King Shaka International", city: "Durban", country: "South Africa", searchTerms: "durban dur south africa king shaka" },

  // Nigeria
  { code: "LOS", name: "Murtala Muhammed International", city: "Lagos", country: "Nigeria", searchTerms: "lagos los nigeria murtala muhammed" },
  { code: "ABV", name: "Nnamdi Azikiwe International", city: "Abuja", country: "Nigeria", searchTerms: "abuja abv nigeria nnamdi azikiwe" },

  // Kenya
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya", searchTerms: "nairobi nbo kenya jomo kenyatta" },
  { code: "MBA", name: "Moi International", city: "Mombasa", country: "Kenya", searchTerms: "mombasa mba kenya moi" },

  // Ethiopia
  { code: "ADD", name: "Bole International", city: "Addis Ababa", country: "Ethiopia", searchTerms: "addis ababa add ethiopia bole" },

  // Ghana
  { code: "ACC", name: "Kotoka International", city: "Accra", country: "Ghana", searchTerms: "accra acc ghana kotoka" },

  // Zambia
  { code: "LUN", name: "Kenneth Kaunda International Airport", city: "Lusaka", country: "Zambia", searchTerms: "lusaka lun zambia kenneth kaunda" },

  // Popular European Airports
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", searchTerms: "paris cdg france charles de gaulle" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", searchTerms: "frankfurt fra germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", searchTerms: "amsterdam ams netherlands schiphol" },
  { code: "FCO", name: "Leonardo da Vinci Airport", city: "Rome", country: "Italy", searchTerms: "rome fco italy leonardo da vinci fiumicino" },
  { code: "BCN", name: "Barcelona Airport", city: "Barcelona", country: "Spain", searchTerms: "barcelona bcn spain" },
  { code: "MAD", name: "Madrid-Barajas Airport", city: "Madrid", country: "Spain", searchTerms: "madrid mad spain barajas" },
  { code: "ZUR", name: "Zurich Airport", city: "Zurich", country: "Switzerland", searchTerms: "zurich zur switzerland" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", searchTerms: "istanbul ist turkey" },

  // North American Airports
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA", searchTerms: "new york jfk usa john kennedy" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA", searchTerms: "los angeles lax usa" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA", searchTerms: "chicago ord usa ohare" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", searchTerms: "toronto yyz canada pearson" },

  // Asian Airports
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", searchTerms: "tokyo nrt japan narita" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", searchTerms: "seoul icn south korea incheon" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", searchTerms: "beijing pek china capital" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", searchTerms: "hong kong hkg" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", searchTerms: "singapore sin changi" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", searchTerms: "kuala lumpur kul malaysia" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", searchTerms: "bangkok bkk thailand suvarnabhumi" },

  // Australian Airports
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", searchTerms: "sydney syd australia kingsford smith" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", searchTerms: "melbourne mel australia" },
];

// Function to search airports based on user input
export const searchAirports = (query: string, limit: number = 10): Airport[] => {
  if (!query || query.length < 1) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const tokens = searchTerm.split(/\s+/).filter(Boolean);
  
  const filteredAirports = airports.filter(airport => {
    const haystack = [
      airport.searchTerms,
      airport.code,
      airport.name,
      airport.city,
      airport.country,
      `${airport.city} airport`,
      `${airport.city} intl`,
      `${airport.city} international`,
      `${airport.code} ${airport.city}`,
      `${airport.code} ${airport.name}`,
    ].join(" ").toLowerCase();

    // All tokens must be present in the combined haystack (order independent)
    const tokensMatch = tokens.every(t => haystack.includes(t));

    // Keep original quick matches as well
    const searchTermsMatch = airport.searchTerms.toLowerCase().includes(searchTerm);
    const codeMatch = airport.code.toLowerCase().includes(searchTerm);
    const nameMatch = airport.name.toLowerCase().includes(searchTerm);
    const cityMatch = airport.city.toLowerCase().includes(searchTerm);
    const countryMatch = airport.country.toLowerCase().includes(searchTerm);
    
    // Match against the full display format: "City, Country (CODE)"
    const displayFormat = `${airport.city}, ${airport.country} (${airport.code})`.toLowerCase();
    const displayFormatMatch = displayFormat.includes(searchTerm);
    
    // Also match against airport name in the display format: "Name - City, Country (CODE)"
    const fullDisplayFormat = `${airport.name} - ${airport.city}, ${airport.country} (${airport.code})`.toLowerCase();
    const fullDisplayFormatMatch = fullDisplayFormat.includes(searchTerm);
    
    // Enhanced bidirectional matching for 3-letter codes: map code to its city
    let enhancedMatch = false;
    if (searchTerm.length === 3) {
      const codeExists = airports.some(a => a.code.toLowerCase() === searchTerm);
      if (codeExists) {
        const matchingAirport = airports.find(a => a.code.toLowerCase() === searchTerm);
        if (matchingAirport && airport.city.toLowerCase().includes(matchingAirport.city.toLowerCase())) {
          enhancedMatch = true;
        }
      }
    }
    
    // If user searches for a city name, also match airports with codes from that city
    const cityCodeMatch = airports.some(a => 
      a.city.toLowerCase().includes(searchTerm) && 
      airport.code.toLowerCase() === a.code.toLowerCase()
    );
    
    return tokensMatch || searchTermsMatch || codeMatch || nameMatch || cityMatch || countryMatch || displayFormatMatch || fullDisplayFormatMatch || enhancedMatch || cityCodeMatch;
  });
  
  return filteredAirports
    .sort((a, b) => {
      // Prioritize exact code matches
      if (a.code.toLowerCase() === searchTerm) return -1;
      if (b.code.toLowerCase() === searchTerm) return 1;
      
      // Prioritize country name matches
      if (a.country.toLowerCase().startsWith(searchTerm)) return -1;
      if (b.country.toLowerCase().startsWith(searchTerm)) return 1;
      
      // Prioritize city name matches
      if (a.city.toLowerCase().startsWith(searchTerm)) return -1;
      if (b.city.toLowerCase().startsWith(searchTerm)) return 1;
      
      // Prioritize airport name matches
      if (a.name.toLowerCase().startsWith(searchTerm)) return -1;
      if (b.name.toLowerCase().startsWith(searchTerm)) return 1;
      
      return 0;
    })
    .slice(0, limit);
};

// Function to get airport by code
export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.code.toLowerCase() === code.toLowerCase());
};

// Function to get popular airports (can be customized based on business needs)
export const getPopularAirports = (): Airport[] => {
  const popularCodes = ['LHR', 'LGW', 'MAN', 'BHX', 'EDI', 'JED', 'RUH', 'DXB', 'DOH', 'KHI', 'LHE', 'ISB', 'DEL', 'BOM'];
  return popularCodes.map(code => getAirportByCode(code)).filter(Boolean) as Airport[];
};

// Lookup airport by code or by location name (city/country/airport name)
// Keeps existing getAirportByCode behavior intact; use this for flexible queries
export const getAirportByCodeOrLocation = (query: string): Airport | undefined => {
  if (!query) return undefined;
  const s = query.trim().toLowerCase();

  // 1) Try strict code match first to preserve expected behavior for codes
  const byCode = getAirportByCode(query);
  if (byCode) return byCode;

  // 2) Score-based matching across city, country, airport name and search terms
  const parts = s.split(",").map(p => p.trim()).filter(Boolean);
  const cityPart = parts[0] ?? "";
  const countryPart = parts[1] ?? "";

  type Scored = { airport: Airport; score: number };

  const scored: Scored[] = airports
    .map((a) => {
      let score = 0;
      const city = a.city.toLowerCase();
      const country = a.country.toLowerCase();
      const name = a.name.toLowerCase();
      const terms = a.searchTerms.toLowerCase();
      const displayCityCountry = `${a.city}, ${a.country}`.toLowerCase();
      const displayFull = `${a.name} - ${a.city}, ${a.country}`.toLowerCase();

      // Exact matches
      if (city === s) score += 80;
      if (country === s) score += 60;
      if (name === s) score += 55;
      if (displayCityCountry === s || displayFull === s) score += 65;

      // City, Country pattern support
      if (cityPart && city.startsWith(cityPart)) score += 30;
      if (countryPart && country.startsWith(countryPart)) score += 30;
      if (cityPart && countryPart && city.startsWith(cityPart) && country.startsWith(countryPart)) score += 40;

      // Partial / terms
      if (city.includes(s)) score += 20;
      if (country.includes(s)) score += 12;
      if (name.includes(s)) score += 15;
      if (terms.includes(s)) score += 10;

      // Prefer common primaries when multiple airports exist
      if (score > 0 && /international/.test(name)) score += 3;

      return { airport: a, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return undefined;

  // Tie-breakers: prefer widely-used hubs, then shorter airport name, then code asc
  const popularSet = new Set([
    'LHR','DXB','JED','RUH','ISB','KHI','LHE','DEL','BOM','JFK','LAX','IST','CDG','FRA','AMS'
  ]);
  const topScore = scored[0].score;
  const top = scored.filter(x => x.score === topScore);
  top.sort((a, b) => {
    const aPop = popularSet.has(a.airport.code);
    const bPop = popularSet.has(b.airport.code);
    if (aPop && !bPop) return -1;
    if (!aPop && bPop) return 1;
    if (a.airport.name.length !== b.airport.name.length) return a.airport.name.length - b.airport.name.length;
    return a.airport.code.localeCompare(b.airport.code);
  });

  return top[0].airport;
};

// Convenience alias
export const getAirport = getAirportByCodeOrLocation;