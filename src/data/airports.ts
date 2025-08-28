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
  const popularCodes = ['LHR', 'LGW', 'MAN', 'BHX', 'EDI', 'JED', 'RUH', 'DXB', 'DOH', 'KHI', 'LHE', 'ISB', 'DEL', 'BOM'];
  return popularCodes.map(code => getAirportByCode(code)).filter(Boolean) as Airport[];
};