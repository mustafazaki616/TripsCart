// Comprehensive airport database for autocomplete functionality
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  searchTerms: string; // Combined search terms for better matching
}

export const airports: Airport[] = [
  // UK Airports
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "United Kingdom", searchTerms: "london heathrow lhr uk england" },
  { code: "LGW", name: "Gatwick Airport", city: "London", country: "United Kingdom", searchTerms: "london gatwick lgw uk england" },
  { code: "STN", name: "Stansted Airport", city: "London", country: "United Kingdom", searchTerms: "london stansted stn uk england" },
  { code: "LTN", name: "Luton Airport", city: "London", country: "United Kingdom", searchTerms: "london luton ltn uk england" },
  { code: "LCY", name: "London City Airport", city: "London", country: "United Kingdom", searchTerms: "london city lcy uk england" },
  { code: "MAN", name: "Manchester Airport", city: "Manchester", country: "United Kingdom", searchTerms: "manchester man uk england" },
  { code: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "United Kingdom", searchTerms: "birmingham bhx uk england" },
  { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "United Kingdom", searchTerms: "edinburgh edi uk scotland" },
  { code: "GLA", name: "Glasgow Airport", city: "Glasgow", country: "United Kingdom", searchTerms: "glasgow gla uk scotland" },
  { code: "LPL", name: "Liverpool John Lennon Airport", city: "Liverpool", country: "United Kingdom", searchTerms: "liverpool lpl uk england john lennon" },
  { code: "NCL", name: "Newcastle Airport", city: "Newcastle", country: "United Kingdom", searchTerms: "newcastle ncl uk england" },
  { code: "LBA", name: "Leeds Bradford Airport", city: "Leeds", country: "United Kingdom", searchTerms: "leeds bradford lba uk england" },
  { code: "BRS", name: "Bristol Airport", city: "Bristol", country: "United Kingdom", searchTerms: "bristol brs uk england" },
  { code: "CWL", name: "Cardiff Airport", city: "Cardiff", country: "United Kingdom", searchTerms: "cardiff cwl uk wales" },
  { code: "BFS", name: "Belfast International Airport", city: "Belfast", country: "United Kingdom", searchTerms: "belfast bfs uk northern ireland" },

  // Pakistan Airports
  { code: "KHI", name: "Jinnah International Airport", city: "Karachi", country: "Pakistan", searchTerms: "karachi khi pakistan jinnah" },
  { code: "LHE", name: "Allama Iqbal International Airport", city: "Lahore", country: "Pakistan", searchTerms: "lahore lhe pakistan allama iqbal" },
  { code: "ISB", name: "Islamabad International Airport", city: "Islamabad", country: "Pakistan", searchTerms: "islamabad isb pakistan" },
  { code: "PEW", name: "Peshawar Airport", city: "Peshawar", country: "Pakistan", searchTerms: "peshawar pew pakistan" },
  { code: "MUX", name: "Multan Airport", city: "Multan", country: "Pakistan", searchTerms: "multan mux pakistan" },
  { code: "FSD", name: "Faisalabad Airport", city: "Faisalabad", country: "Pakistan", searchTerms: "faisalabad fsd pakistan" },
  { code: "SKZ", name: "Sukkur Airport", city: "Sukkur", country: "Pakistan", searchTerms: "sukkur skz pakistan" },
  { code: "UET", name: "Quetta Airport", city: "Quetta", country: "Pakistan", searchTerms: "quetta uet pakistan" },

  // India Airports
  { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India", searchTerms: "delhi new delhi del india indira gandhi" },
  { code: "BOM", name: "Chhatrapati Shivaji International Airport", city: "Mumbai", country: "India", searchTerms: "mumbai bom india chhatrapati shivaji" },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bangalore", country: "India", searchTerms: "bangalore blr india kempegowda" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India", searchTerms: "chennai maa india" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", country: "India", searchTerms: "kolkata ccu india netaji subhas" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India", searchTerms: "hyderabad hyd india rajiv gandhi" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India", searchTerms: "ahmedabad amd india sardar vallabhbhai patel" },
  { code: "GOI", name: "Goa Airport", city: "Goa", country: "India", searchTerms: "goa goi india" },
  { code: "COK", name: "Cochin International Airport", city: "Kochi", country: "India", searchTerms: "kochi cochin cok india" },
  { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India", searchTerms: "pune pnq india" },

  // Middle East Airports
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE", searchTerms: "dubai dxb uae emirates" },
  { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE", searchTerms: "abu dhabi auh uae emirates" },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", searchTerms: "doha doh qatar hamad" },
  { code: "KWI", name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait", searchTerms: "kuwait kwi kuwait city" },
  { code: "BAH", name: "Bahrain International Airport", city: "Manama", country: "Bahrain", searchTerms: "bahrain bah manama" },
  { code: "MCT", name: "Muscat International Airport", city: "Muscat", country: "Oman", searchTerms: "muscat mct oman" },
  { code: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia", searchTerms: "riyadh ruh saudi arabia king khalid" },
  { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia", searchTerms: "jeddah jed saudi arabia king abdulaziz" },
  { code: "DMM", name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia", searchTerms: "dammam dmm saudi arabia king fahd" },

  // European Airports
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", searchTerms: "paris cdg france charles de gaulle" },
  { code: "ORY", name: "Orly Airport", city: "Paris", country: "France", searchTerms: "paris ory france orly" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", searchTerms: "frankfurt fra germany" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", searchTerms: "munich muc germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", searchTerms: "amsterdam ams netherlands schiphol" },
  { code: "FCO", name: "Leonardo da Vinci Airport", city: "Rome", country: "Italy", searchTerms: "rome fco italy leonardo da vinci fiumicino" },
  { code: "BCN", name: "Barcelona Airport", city: "Barcelona", country: "Spain", searchTerms: "barcelona bcn spain" },
  { code: "MAD", name: "Madrid-Barajas Airport", city: "Madrid", country: "Spain", searchTerms: "madrid mad spain barajas" },
  { code: "ZUR", name: "Zurich Airport", city: "Zurich", country: "Switzerland", searchTerms: "zurich zur switzerland" },
  { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria", searchTerms: "vienna vie austria" },
  { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium", searchTerms: "brussels bru belgium" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", searchTerms: "copenhagen cph denmark" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden", searchTerms: "stockholm arn sweden arlanda" },
  { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway", searchTerms: "oslo osl norway" },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", searchTerms: "helsinki hel finland" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", searchTerms: "istanbul ist turkey" },
  { code: "SAW", name: "Sabiha Gökçen International Airport", city: "Istanbul", country: "Turkey", searchTerms: "istanbul saw turkey sabiha gokcen" },

  // North American Airports
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA", searchTerms: "new york jfk usa john kennedy" },
  { code: "LGA", name: "LaGuardia Airport", city: "New York", country: "USA", searchTerms: "new york lga usa laguardia" },
  { code: "EWR", name: "Newark Liberty International Airport", city: "New York", country: "USA", searchTerms: "new york newark ewr usa liberty" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA", searchTerms: "los angeles lax usa" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA", searchTerms: "chicago ord usa ohare" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "USA", searchTerms: "miami mia usa" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA", searchTerms: "san francisco sfo usa" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "USA", searchTerms: "seattle sea usa tacoma" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", searchTerms: "toronto yyz canada pearson" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", searchTerms: "vancouver yvr canada" },
  { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport", city: "Montreal", country: "Canada", searchTerms: "montreal yul canada pierre elliott trudeau" },

  // Asian Airports
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", searchTerms: "tokyo nrt japan narita" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan", searchTerms: "tokyo hnd japan haneda" },
  { code: "KIX", name: "Kansai International Airport", city: "Osaka", country: "Japan", searchTerms: "osaka kix japan kansai" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", searchTerms: "seoul icn south korea incheon" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", searchTerms: "beijing pek china capital" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", searchTerms: "shanghai pvg china pudong" },
  { code: "CAN", name: "Guangzhou Baiyun International Airport", city: "Guangzhou", country: "China", searchTerms: "guangzhou can china baiyun" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", searchTerms: "hong kong hkg" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", searchTerms: "singapore sin changi" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", searchTerms: "kuala lumpur kul malaysia" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", searchTerms: "bangkok bkk thailand suvarnabhumi" },
  { code: "DMK", name: "Don Mueang International Airport", city: "Bangkok", country: "Thailand", searchTerms: "bangkok dmk thailand don mueang" },
  { code: "CGK", name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia", searchTerms: "jakarta cgk indonesia soekarno hatta" },
  { code: "DPS", name: "Ngurah Rai International Airport", city: "Denpasar", country: "Indonesia", searchTerms: "bali denpasar dps indonesia ngurah rai" },
  { code: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines", searchTerms: "manila mnl philippines ninoy aquino" },

  // African Airports
  { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa", searchTerms: "johannesburg jnb south africa tambo" },
  { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", searchTerms: "cape town cpt south africa" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", searchTerms: "cairo cai egypt" },
  { code: "ACC", name: "Kotoka International Airport", city: "Accra", country: "Ghana", searchTerms: "accra acc ghana kotoka" },
  { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria", searchTerms: "lagos los nigeria murtala muhammed" },
  { code: "ABV", name: "Nnamdi Azikiwe International Airport", city: "Abuja", country: "Nigeria", searchTerms: "abuja abv nigeria nnamdi azikiwe" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", searchTerms: "nairobi nbo kenya jomo kenyatta" },
  { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia", searchTerms: "addis ababa add ethiopia bole" },
  { code: "DAR", name: "Julius Nyerere International Airport", city: "Dar es Salaam", country: "Tanzania", searchTerms: "dar es salaam dar tanzania julius nyerere" },
  { code: "HRE", name: "Robert Gabriel Mugabe International Airport", city: "Harare", country: "Zimbabwe", searchTerms: "harare hre zimbabwe robert gabriel mugabe" },

  // Australian & Oceania Airports
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", searchTerms: "sydney syd australia kingsford smith" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", searchTerms: "melbourne mel australia" },
  { code: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia", searchTerms: "brisbane bne australia" },
  { code: "PER", name: "Perth Airport", city: "Perth", country: "Australia", searchTerms: "perth per australia" },
  { code: "ADL", name: "Adelaide Airport", city: "Adelaide", country: "Australia", searchTerms: "adelaide adl australia" },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", searchTerms: "auckland akl new zealand" },
  { code: "CHC", name: "Christchurch Airport", city: "Christchurch", country: "New Zealand", searchTerms: "christchurch chc new zealand" },

  // South American Airports
  { code: "GRU", name: "São Paulo-Guarulhos International Airport", city: "São Paulo", country: "Brazil", searchTerms: "sao paulo gru brazil guarulhos" },
  { code: "GIG", name: "Rio de Janeiro-Galeão International Airport", city: "Rio de Janeiro", country: "Brazil", searchTerms: "rio de janeiro gig brazil galeao" },
  { code: "EZE", name: "Ezeiza International Airport", city: "Buenos Aires", country: "Argentina", searchTerms: "buenos aires eze argentina ezeiza" },
  { code: "SCL", name: "Santiago International Airport", city: "Santiago", country: "Chile", searchTerms: "santiago scl chile" },
  { code: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru", searchTerms: "lima lim peru jorge chavez" },
  { code: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia", searchTerms: "bogota bog colombia el dorado" },
  { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico", searchTerms: "mexico city mex mexico" },
];

// Function to search airports based on user input
export const searchAirports = (query: string, limit: number = 10): Airport[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return airports
    .filter(airport => 
      airport.searchTerms.toLowerCase().includes(searchTerm) ||
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      // Prioritize exact code matches
      if (a.code.toLowerCase() === searchTerm) return -1;
      if (b.code.toLowerCase() === searchTerm) return 1;
      
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
  const popularCodes = ['LHR', 'LGW', 'MAN', 'BHX', 'EDI', 'KHI', 'LHE', 'ISB', 'DEL', 'BOM', 'DXB', 'DOH'];
  return popularCodes.map(code => getAirportByCode(code)).filter(Boolean) as Airport[];
};