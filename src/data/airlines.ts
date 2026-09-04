// ---------------------------------------------------------------------------
// airlines.ts
// Mock/local data for airlines mapped to countries/destinations.
// Each airline has a booking URL that opens the real airline website.
// ---------------------------------------------------------------------------

export interface Airline {
  id: number
  name: string
  country: string
  logo: string
  website: string
  /** URL template for flight search. Uses {from} and {to} placeholders. */
  bookingUrl: string
  rating: number
  type: 'flag-carrier' | 'low-cost' | 'regional'
  description: string
}

export const airlines: Airline[] = [
  // Japan
  {
    id: 1,
    name: 'Japan Airlines (JAL)',
    country: 'Japan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Japan_Airlines_%28JAL%29_logo.svg/200px-Japan_Airlines_%28JAL%29_logo.svg.png',
    website: 'https://www.jal.co.jp/en/',
    bookingUrl: 'https://www.jal.co.jp/en/',
    rating: 4.7,
    type: 'flag-carrier',
    description: 'Japan\'s flag carrier offering premium service, comfortable seats and connections across Asia and the world.',
  },
  {
    id: 2,
    name: 'ANA (All Nippon Airways)',
    country: 'Japan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png',
    website: 'https://www.ana.co.jp/en/us/',
    bookingUrl: 'https://www.ana.co.jp/en/us/',
    rating: 4.8,
    type: 'flag-carrier',
    description: 'Japan\'s largest airline with a 5-star Skytrax rating and extensive domestic and international network.',
  },
  {
    id: 3,
    name: 'Peach Aviation',
    country: 'Japan',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Peach_Aviation_logo.svg/200px-Peach_Aviation_logo.svg.png',
    website: 'https://www.flypeach.com/',
    bookingUrl: 'https://www.flypeach.com/',
    rating: 4.0,
    type: 'low-cost',
    description: 'Japan\'s leading low-cost carrier offering affordable flights across Asia from Osaka Kansai.',
  },

  // Indonesia (Bali)
  {
    id: 4,
    name: 'Garuda Indonesia',
    country: 'Indonesia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Garuda_Indonesia_logo_2009.svg/200px-Garuda_Indonesia_logo_2009.svg.png',
    website: 'https://www.garuda-indonesia.com/en',
    bookingUrl: 'https://www.garuda-indonesia.com/en',
    rating: 4.5,
    type: 'flag-carrier',
    description: 'Indonesia\'s national airline with 5-star service, connecting Bali to the world.',
  },
  {
    id: 5,
    name: 'Lion Air',
    country: 'Indonesia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Lion_Air_logo_2016.svg/200px-Lion_Air_logo_2016.svg.png',
    website: 'https://www.lionair.co.id/en',
    bookingUrl: 'https://www.lionair.co.id/en',
    rating: 3.8,
    type: 'low-cost',
    description: 'Indonesia\'s largest private airline with extensive domestic coverage including Bali.',
  },

  // Thailand
  {
    id: 6,
    name: 'Thai Airways',
    country: 'Thailand',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Thai_Airways_Logo.svg/200px-Thai_Airways_Logo.svg.png',
    website: 'https://www.thaiairways.com/en/',
    bookingUrl: 'https://www.thaiairways.com/en/',
    rating: 4.4,
    type: 'flag-carrier',
    description: 'Thailand\'s flag carrier known for warm hospitality and comfortable flights to Bangkok and Phuket.',
  },
  {
    id: 7,
    name: 'AirAsia',
    country: 'Thailand',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/AirAsia_Logo.svg/200px-AirAsia_Logo.svg.png',
    website: 'https://www.airasia.com',
    bookingUrl: 'https://www.airasia.com',
    rating: 4.1,
    type: 'low-cost',
    description: 'Asia\'s largest low-cost airline offering budget-friendly flights across Southeast Asia.',
  },

  // South Korea
  {
    id: 8,
    name: 'Korean Air',
    country: 'South Korea',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Korean_Air_logo.svg/200px-Korean_Air_logo.svg.png',
    website: 'https://www.koreanair.com/us/en',
    bookingUrl: 'https://www.koreanair.com/us/en',
    rating: 4.6,
    type: 'flag-carrier',
    description: 'South Korea\'s flag carrier with a 5-star rating and global network via Seoul Incheon.',
  },

  // France
  {
    id: 9,
    name: 'Air France',
    country: 'France',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Air_France_Logo.svg/200px-Air_France_Logo.svg.png',
    website: 'https://www.airfrance.com',
    bookingUrl: 'https://www.airfrance.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: 'France\'s flag carrier and a founding member of SkyTeam, offering flights to Paris and beyond.',
  },

  // Italy
  {
    id: 10,
    name: 'ITA Airways',
    country: 'Italy',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/ITA_Airways_Logo.svg/200px-ITA_Airways_Logo.svg.png',
    website: 'https://www.ita-airways.com',
    bookingUrl: 'https://www.ita-airways.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: 'Italy\'s national airline (successor to Alitalia), connecting Rome and Milan to the world.',
  },

  // Greece
  {
    id: 11,
    name: 'Aegean Airlines',
    country: 'Greece',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Aegean_Airlines_logo.svg/200px-Aegean_Airlines_logo.svg.png',
    website: 'https://www.aegeanair.com',
    bookingUrl: 'https://www.aegeanair.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: 'Greece\'s largest airline with direct flights to Santorini and other Greek islands.',
  },

  // Switzerland
  {
    id: 12,
    name: 'Swiss International Air Lines',
    country: 'Switzerland',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Swiss_International_Air_Lines_logo_2011.svg/200px-Swiss_International_Air_Lines_logo_2011.svg.png',
    website: 'https://www.swiss.com',
    bookingUrl: 'https://www.swiss.com',
    rating: 4.5,
    type: 'flag-carrier',
    description: 'Switzerland\'s national airline with premium service and connections via Zurich.',
  },

  // Canada
  {
    id: 13,
    name: 'Air Canada',
    country: 'Canada',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Air_Canada_logo.svg/200px-Air_Canada_logo.svg.png',
    website: 'https://www.aircanada.com',
    bookingUrl: 'https://www.aircanada.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: 'Canada\'s flag carrier with extensive domestic and international routes to Banff region.',
  },

  // Australia
  {
    id: 14,
    name: 'Qantas',
    country: 'Australia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Qantas_logo_2016.svg/200px-Qantas_logo_2016.svg.png',
    website: 'https://www.qantas.com',
    bookingUrl: 'https://www.qantas.com',
    rating: 4.5,
    type: 'flag-carrier',
    description: 'Australia\'s flag carrier "The Flying Kangaroo" - one of the world\'s oldest airlines.',
  },

  // New Zealand
  {
    id: 15,
    name: 'Air New Zealand',
    country: 'New Zealand',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Air_New_Zealand_logo.svg/200px-Air_New_Zealand_logo.svg.png',
    website: 'https://www.airnewzealand.co.nz',
    bookingUrl: 'https://www.airnewzealand.co.nz',
    rating: 4.6,
    type: 'flag-carrier',
    description: 'New Zealand\'s award-winning airline with a focus on customer experience.',
  },

  // USA
  {
    id: 16,
    name: 'United Airlines',
    country: 'USA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/United_Airlines_logo.svg/200px-United_Airlines_logo.svg.png',
    website: 'https://www.united.com',
    bookingUrl: 'https://www.united.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: 'Major US carrier with extensive domestic and international routes, including New York and California.',
  },

  // Spain
  {
    id: 17,
    name: 'Iberia',
    country: 'Spain',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Iberia_logo_2013.svg/200px-Iberia_logo_2013.svg.png',
    website: 'https://www.iberia.com',
    bookingUrl: 'https://www.iberia.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: 'Spain\'s flag carrier connecting Barcelona and Madrid to destinations worldwide.',
  },

  // Portugal
  {
    id: 18,
    name: 'TAP Air Portugal',
    country: 'Portugal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/TAP_Air_Portugal_logo.svg/200px-TAP_Air_Portugal_logo.svg.png',
    website: 'https://www.flytap.com',
    bookingUrl: 'https://www.flytap.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: 'Portugal\'s national airline connecting Lisbon to Europe, Africa and the Americas.',
  },

  // UAE
  {
    id: 19,
    name: 'Emirates',
    country: 'United Arab Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
    website: 'https://www.emirates.com',
    bookingUrl: 'https://www.emirates.com',
    rating: 4.7,
    type: 'flag-carrier',
    description: 'World-renowned luxury airline based in Dubai with premium first-class suites.',
  },

  // Iceland
  {
    id: 20,
    name: 'Icelandair',
    country: 'Iceland',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Icelandair_Logo.svg/200px-Icelandair_Logo.svg.png',
    website: 'https://www.icelandair.com',
    bookingUrl: 'https://www.icelandair.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: 'Iceland\'s main airline offering transatlantic flights with free stopover in Reykjavik.',
  },

  // Vietnam
  {
    id: 21,
    name: 'Vietnam Airlines',
    country: 'Vietnam',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
    website: 'https://www.vietnamairlines.com',
    bookingUrl: 'https://www.vietnamairlines.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: 'Vietnam\'s flag carrier with comfortable flights and connections to Hanoi.',
  },

  // Cambodia
  {
    id: 22,
    name: 'Cambodia Airways',
    country: 'Cambodia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Cambodia_Airways_logo.svg/200px-Cambodia_Airways_logo.svg.png',
    website: 'https://www.aircambodia.com/en/',
    bookingUrl: 'https://www.aircambodia.com/en/',
    rating: 3.9,
    type: 'regional',
    description: 'Cambodia\'s national airline connecting Phnom Penh and Siem Reap to regional destinations.',
  },

  // Morocco
  {
    id: 23,
    name: 'Royal Air Maroc',
    country: 'Morocco',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Royal_Air_Maroc_logo.svg/200px-Royal_Air_Maroc_logo.svg.png',
    website: 'https://www.royalairmaroc.com',
    bookingUrl: 'https://www.royalairmaroc.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: 'Morocco\'s national airline connecting Marrakech and Casablanca to Africa, Europe and beyond.',
  },

  // Costa Rica
  {
    id: 24,
    name: 'Copa Airlines',
    country: 'Costa Rica',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Copa_Airlines_logo.svg/200px-Copa_Airlines_logo.svg.png',
    website: 'https://www.copaair.com',
    bookingUrl: 'https://www.copaair.com',
    rating: 4.0,
    type: 'regional',
    description: 'Major Central American carrier connecting Costa Rica to the Americas via Panama City.',
  },

  // South Africa
  {
    id: 25,
    name: 'South African Airways',
    country: 'South Africa',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/South_African_Airways_logo.svg/200px-South_African_Airways_logo.svg.png',
    website: 'https://www.flysaa.com',
    bookingUrl: 'https://www.flysaa.com',
    rating: 4.0,
    type: 'flag-carrier',
    description: 'South Africa\'s flag carrier connecting Cape Town to Africa and the world.',
  },

  // Peru
  {
    id: 26,
    name: 'LATAM Airlines',
    country: 'Peru',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
    website: 'https://www.latamairlines.com',
    bookingUrl: 'https://www.latamairlines.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: 'South America\'s largest airline with flights to Lima and connections to Machu Picchu.',
  },

  // Chile
  {
    id: 27,
    name: 'LATAM Chile',
    country: 'Chile',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
    website: 'https://www.latamairlines.com/cl/en',
    bookingUrl: 'https://www.latamairlines.com/cl/en',
    rating: 4.2,
    type: 'flag-carrier',
    description: 'LATAM\'s Chilean branch connecting Santiago to Patagonia and global destinations.',
  },

  // Jordan
  {
    id: 28,
    name: 'Royal Jordanian',
    country: 'Jordan',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Royal_Jordanian_logo.svg/200px-Royal_Jordanian_logo.svg.png',
    website: 'https://www.rj.com',
    bookingUrl: 'https://www.rj.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: 'Jordan\'s national airline with connections to Amman and Petra.',
  },

  // Italy (Amalfi Coast)
  {
    id: 29,
    name: 'Ryanair',
    country: 'Italy',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Ryanair_Logo.svg/200px-Ryanair_Logo.svg.png',
    website: 'https://www.ryanair.com',
    bookingUrl: 'https://www.ryanair.com',
    rating: 3.7,
    type: 'low-cost',
    description: 'Europe\'s largest low-cost carrier with affordable flights to Italian cities.',
  },
]

/** Get airlines for a given country name. */
export function getAirlinesByCountry(country: string): Airline[] {
  return airlines.filter(
    (airline) => airline.country.toLowerCase() === country.toLowerCase(),
  )
}

/** Get one airline by id. */
export function getAirlineById(id: number): Airline | undefined {
  return airlines.find((airline) => airline.id === id)
}

/** Get all unique countries that have airlines. */
export function getAirlineCountries(): string[] {
  return [...new Set(airlines.map((a) => a.country))]
}
