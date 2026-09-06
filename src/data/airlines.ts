// ---------------------------------------------------------------------------
// airlines.ts
// Mock/local data for airlines mapped to countries/destinations.
// Each airline has a booking URL that opens the real airline website.
//
// Airline names are brand/proper nouns and stay untranslated. The `country`
// field keeps a canonical English key (translated via `countries.*` message
// keys), and `description` is localized as { en, km }.
// ---------------------------------------------------------------------------

import type { LocalizedText } from './localized'
import { localized } from './localized'

export interface Airline {
  id: number
  name: string
  country: string
  /** Two-letter IATA code, used to build the logo image URL. */
  iata: string
  logo: string
  website: string
  /** URL template for flight search. Uses {from} and {to} placeholders. */
  bookingUrl: string
  rating: number
  type: 'flag-carrier' | 'low-cost' | 'regional'
  description: LocalizedText
}

export const airlines: Airline[] = [
  // Japan
  {
    id: 1,
    name: 'Japan Airlines (JAL)',
    country: 'Japan',
    iata: 'JL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Japan_Airlines_%28JAL%29_logo.svg/200px-Japan_Airlines_%28JAL%29_logo.svg.png',
    website: 'https://www.jal.co.jp/en/',
    bookingUrl: 'https://www.jal.co.jp/en/',
    rating: 4.7,
    type: 'flag-carrier',
    description: localized(
      'Japan\'s flag carrier offering premium service, comfortable seats and connections across Asia and the world.',
      'រដ្ឋអាកាសចរណ៍ជាតិជប៉ុន ផ្តល់សេវាកម្មលំដាប់ខ្ពស់ កៅអីស្រួល និងការតភ្ជាប់ទៅកាន់អាស៊ី និងពិភពលោក។'
    ),
  },
  {
    id: 2,
    name: 'ANA (All Nippon Airways)',
    country: 'Japan',
    iata: 'NH',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png',
    website: 'https://www.ana.co.jp/en/us/',
    bookingUrl: 'https://www.ana.co.jp/en/us/',
    rating: 4.8,
    type: 'flag-carrier',
    description: localized(
      'Japan\'s largest airline with a 5-star Skytrax rating and extensive domestic and international network.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ធំជាងគេរបស់ជប៉ុន ជាមួយចំណាត់ថ្នាក់ Skytrax ៥ ផ្កាយ និងបណ្តាញធំទូលាយទាំងក្នុងស្រុក និងអន្តរជាតិ។'
    ),
  },
  {
    id: 3,
    name: 'Peach Aviation',
    country: 'Japan',
    iata: 'MM',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Peach_Aviation_logo.svg/200px-Peach_Aviation_logo.svg.png',
    website: 'https://www.flypeach.com/',
    bookingUrl: 'https://www.flypeach.com/',
    rating: 4.0,
    type: 'low-cost',
    description: localized(
      'Japan\'s leading low-cost carrier offering affordable flights across Asia from Osaka Kansai.',
      'ក្រុមហ៊ុនអាកាសចរណ៍តម្លៃទាបឈានមុខរបស់ជប៉ុន ផ្តល់ជើងហោះហើរតម្លៃសមរម្យទៅកាន់អាស៊ី ពីកានសាយអូសាកា។'
    ),
  },

  // Indonesia (Bali)
  {
    id: 4,
    name: 'Garuda Indonesia',
    country: 'Indonesia',
    iata: 'GA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Garuda_Indonesia_logo_2009.svg/200px-Garuda_Indonesia_logo_2009.svg.png',
    website: 'https://www.garuda-indonesia.com/en',
    bookingUrl: 'https://www.garuda-indonesia.com/en',
    rating: 4.5,
    type: 'flag-carrier',
    description: localized(
      'Indonesia\'s national airline with 5-star service, connecting Bali to the world.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិឥណ្ឌូនេស៊ី ជាមួយសេវាកម្ម ៥ ផ្កាយ តភ្ជាប់បាលីទៅកាន់ពិភពលោក។'
    ),
  },
  {
    id: 5,
    name: 'Lion Air',
    country: 'Indonesia',
    iata: 'JT',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Lion_Air_logo_2016.svg/200px-Lion_Air_logo_2016.svg.png',
    website: 'https://www.lionair.co.id/en',
    bookingUrl: 'https://www.lionair.co.id/en',
    rating: 3.8,
    type: 'low-cost',
    description: localized(
      'Indonesia\'s largest private airline with extensive domestic coverage including Bali.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ឯកជនធំជាងគេរបស់ឥណ្ឌូនេស៊ី ជាមួយការគ្របដណ្តប់ក្នុងស្រុកយ៉ាងទូលំទូលាយ រួមទាំងបាលី។'
    ),
  },

  // Thailand
  {
    id: 6,
    name: 'Thai Airways',
    country: 'Thailand',
    iata: 'TG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Thai_Airways_Logo.svg/200px-Thai_Airways_Logo.svg.png',
    website: 'https://www.thaiairways.com/en/',
    bookingUrl: 'https://www.thaiairways.com/en/',
    rating: 4.4,
    type: 'flag-carrier',
    description: localized(
      'Thailand\'s flag carrier known for warm hospitality and comfortable flights to Bangkok and Phuket.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិថៃ ល្បីល្បាញដោយសារភាពរាក់ទាក់ និងជើងហោះហើរងាយស្រួលទៅកាន់បាងកក និងភូកេត។'
    ),
  },
  {
    id: 7,
    name: 'AirAsia',
    country: 'Thailand',
    iata: 'AK',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/AirAsia_Logo.svg/200px-AirAsia_Logo.svg.png',
    website: 'https://www.airasia.com',
    bookingUrl: 'https://www.airasia.com',
    rating: 4.1,
    type: 'low-cost',
    description: localized(
      'Asia\'s largest low-cost airline offering budget-friendly flights across Southeast Asia.',
      'ក្រុមហ៊ុនអាកាសចរណ៍តម្លៃទាបធំជាងគេនៅអាស៊ី ផ្តល់ជើងហោះហើរតម្លៃសមរម្យទៅកាន់អាស៊ីអាគ្នេយ៍។'
    ),
  },

  // South Korea
  {
    id: 8,
    name: 'Korean Air',
    country: 'South Korea',
    iata: 'KE',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Korean_Air_logo.svg/200px-Korean_Air_logo.svg.png',
    website: 'https://www.koreanair.com/us/en',
    bookingUrl: 'https://www.koreanair.com/us/en',
    rating: 4.6,
    type: 'flag-carrier',
    description: localized(
      'South Korea\'s flag carrier with a 5-star rating and global network via Seoul Incheon.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិកូរ៉េខាងត្បូង ជាមួយចំណាត់ថ្នាក់ ៥ ផ្កាយ និងបណ្តាញពិភពលោកតាមរយៈសេអ៊ូលអ៊ីនឆែន។'
    ),
  },

  // France
  {
    id: 9,
    name: 'Air France',
    country: 'France',
    iata: 'AF',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Air_France_Logo.svg/200px-Air_France_Logo.svg.png',
    website: 'https://www.airfrance.com',
    bookingUrl: 'https://www.airfrance.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: localized(
      'France\'s flag carrier and a founding member of SkyTeam, offering flights to Paris and beyond.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិបារាំង និងជាសមាជិកស្ថាបនិក SkyTeam ផ្តល់ជើងហោះហើរទៅកាន់ប៉ារីស និងកន្លែងផ្សេងទៀត។'
    ),
  },

  // Italy
  {
    id: 10,
    name: 'ITA Airways',
    country: 'Italy',
    iata: 'AZ',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/ITA_Airways_Logo.svg/200px-ITA_Airways_Logo.svg.png',
    website: 'https://www.ita-airways.com',
    bookingUrl: 'https://www.ita-airways.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: localized(
      'Italy\'s national airline (successor to Alitalia), connecting Rome and Milan to the world.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិអ៊ីតាលី (ស្នងពីអាលីតាលី) តភ្ជាប់រ៉ូម និងមីឡានទៅកាន់ពិភពលោក។'
    ),
  },

  // Greece
  {
    id: 11,
    name: 'Aegean Airlines',
    country: 'Greece',
    iata: 'A3',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Aegean_Airlines_logo.svg/200px-Aegean_Airlines_logo.svg.png',
    website: 'https://www.aegeanair.com',
    bookingUrl: 'https://www.aegeanair.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: localized(
      'Greece\'s largest airline with direct flights to Santorini and other Greek islands.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ធំជាងគេរបស់ក្រិក ជាមួយជើងហោះហើរផ្ទាល់ទៅកាន់សាន់តូរីនី និងកោះក្រិកផ្សេងទៀត។'
    ),
  },

  // Switzerland
  {
    id: 12,
    name: 'Swiss International Air Lines',
    country: 'Switzerland',
    iata: 'LX',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Swiss_International_Air_Lines_logo_2011.svg/200px-Swiss_International_Air_Lines_logo_2011.svg.png',
    website: 'https://www.swiss.com',
    bookingUrl: 'https://www.swiss.com',
    rating: 4.5,
    type: 'flag-carrier',
    description: localized(
      'Switzerland\'s national airline with premium service and connections via Zurich.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិស្វីស ជាមួយសេវាកម្មលំដាប់ខ្ពស់ និងការតភ្ជាប់តាមរយៈទីក្រុងហ្សូរីហ្ស។'
    ),
  },

  // Canada
  {
    id: 13,
    name: 'Air Canada',
    country: 'Canada',
    iata: 'AC',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Air_Canada_logo.svg/200px-Air_Canada_logo.svg.png',
    website: 'https://www.aircanada.com',
    bookingUrl: 'https://www.aircanada.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: localized(
      'Canada\'s flag carrier with extensive domestic and international routes to Banff region.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិកាណាដា ជាមួយផ្លូវហោះហើរក្នុងស្រុក និងអន្តរជាតិដ៏ទូលំទូលាយទៅកាន់តំបន់បានហ្វ។'
    ),
  },

  // Australia
  {
    id: 14,
    name: 'Qantas',
    country: 'Australia',
    iata: 'QF',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Qantas_logo_2016.svg/200px-Qantas_logo_2016.svg.png',
    website: 'https://www.qantas.com',
    bookingUrl: 'https://www.qantas.com',
    rating: 4.5,
    type: 'flag-carrier',
    description: localized(
      'Australia\'s flag carrier "The Flying Kangaroo" - one of the world\'s oldest airlines.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិអូស្ត្រាលី "កង់ហ្គូរូហើរ" ដែលជាក្រុមហ៊ុនអាកាសចរណ៍ចំណាស់ជាងគេមួយក្នុងពិភពលោក។'
    ),
  },

  // New Zealand
  {
    id: 15,
    name: 'Air New Zealand',
    country: 'New Zealand',
    iata: 'NZ',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Air_New_Zealand_logo.svg/200px-Air_New_Zealand_logo.svg.png',
    website: 'https://www.airnewzealand.co.nz',
    bookingUrl: 'https://www.airnewzealand.co.nz',
    rating: 4.6,
    type: 'flag-carrier',
    description: localized(
      'New Zealand\'s award-winning airline with a focus on customer experience.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ដែលទទួលបានពានរង្វាន់របស់នូវែលសេឡង់ ជាមួយការផ្តោតលើបទពិសោធន៍អតិថិជន។'
    ),
  },

  // USA
  {
    id: 16,
    name: 'United Airlines',
    country: 'USA',
    iata: 'UA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/United_Airlines_logo.svg/200px-United_Airlines_logo.svg.png',
    website: 'https://www.united.com',
    bookingUrl: 'https://www.united.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: localized(
      'Major US carrier with extensive domestic and international routes, including New York and California.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ធំរបស់អាមេរិក ជាមួយផ្លូវហោះហើរក្នុងស្រុក និងអន្តរជាតិដ៏ទូលំទូលាយ រួមទាំងញូវយ៉ក និងកាលីហ្វ័រញ៉ា។'
    ),
  },

  // Spain
  {
    id: 17,
    name: 'Iberia',
    country: 'Spain',
    iata: 'IB',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Iberia_logo_2013.svg/200px-Iberia_logo_2013.svg.png',
    website: 'https://www.iberia.com',
    bookingUrl: 'https://www.iberia.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: localized(
      'Spain\'s flag carrier connecting Barcelona and Madrid to destinations worldwide.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិអេស្ប៉ាញ តភ្ជាប់បារសេឡូណា និងម៉ាឌ្រីដទៅកាន់គោលដៅទូទាំងពិភពលោក។'
    ),
  },

  // Portugal
  {
    id: 18,
    name: 'TAP Air Portugal',
    country: 'Portugal',
    iata: 'TP',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/TAP_Air_Portugal_logo.svg/200px-TAP_Air_Portugal_logo.svg.png',
    website: 'https://www.flytap.com',
    bookingUrl: 'https://www.flytap.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: localized(
      'Portugal\'s national airline connecting Lisbon to Europe, Africa and the Americas.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិព័រទុយហ្គាល់ តភ្ជាប់លីសបូនទៅអឺរ៉ុប អាហ្វ្រិក និងអាមេរិក។'
    ),
  },

  // UAE
  {
    id: 19,
    name: 'Emirates',
    country: 'United Arab Emirates',
    iata: 'EK',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
    website: 'https://www.emirates.com',
    bookingUrl: 'https://www.emirates.com',
    rating: 4.7,
    type: 'flag-carrier',
    description: localized(
      'World-renowned luxury airline based in Dubai with premium first-class suites.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ប្រណិតល្បីលើពិភពលោក មានមូលដ្ឋាននៅឌូបៃ ជាមួយស៊្វីតថ្នាក់ទីមួយប្រណិតៗ។'
    ),
  },

  // Iceland
  {
    id: 20,
    name: 'Icelandair',
    country: 'Iceland',
    iata: 'FI',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Icelandair_Logo.svg/200px-Icelandair_Logo.svg.png',
    website: 'https://www.icelandair.com',
    bookingUrl: 'https://www.icelandair.com',
    rating: 4.3,
    type: 'flag-carrier',
    description: localized(
      'Iceland\'s main airline offering transatlantic flights with free stopover in Reykjavik.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ចម្បងរបស់អ៊ីស្លង់ ផ្តល់ជើងហោះហើរអាត្លង់ទិក ជាមួយការឈប់សម្រាកឥតគិតថ្លៃនៅរេកយ៉ាវិក។'
    ),
  },

  // Vietnam
  {
    id: 21,
    name: 'Vietnam Airlines',
    country: 'Vietnam',
    iata: 'VN',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
    website: 'https://www.vietnamairlines.com',
    bookingUrl: 'https://www.vietnamairlines.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: localized(
      'Vietnam\'s flag carrier with comfortable flights and connections to Hanoi.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិវៀតណាម ជាមួយជើងហោះហើរងាយស្រួល និងការតភ្ជាប់ទៅហាណូយ។'
    ),
  },

  // Cambodia
  {
    id: 22,
    name: 'Cambodia Airways',
    country: 'Cambodia',
    iata: 'KR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Cambodia_Airways_logo.svg/200px-Cambodia_Airways_logo.svg.png',
    website: 'https://www.aircambodia.com/en/',
    bookingUrl: 'https://www.aircambodia.com/en/',
    rating: 3.9,
    type: 'regional',
    description: localized(
      'Cambodia\'s national airline connecting Phnom Penh and Siem Reap to regional destinations.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិកម្ពុជា តភ្ជាប់ភ្នំពេញ និងសៀមរាប ទៅកាន់គោលដៅក្នុងតំបន់។'
    ),
  },

  // Morocco
  {
    id: 23,
    name: 'Royal Air Maroc',
    country: 'Morocco',
    iata: 'AT',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Royal_Air_Maroc_logo.svg/200px-Royal_Air_Maroc_logo.svg.png',
    website: 'https://www.royalairmaroc.com',
    bookingUrl: 'https://www.royalairmaroc.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: localized(
      'Morocco\'s national airline connecting Marrakech and Casablanca to Africa, Europe and beyond.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិម៉ារ៉ុក តភ្ជាប់ម៉ារ៉ាកេស និងកាហ្សាប្លង់កា ទៅកាន់អាហ្វ្រិក អឺរ៉ុប និងកន្លែងផ្សេងទៀត។'
    ),
  },

  // Costa Rica
  {
    id: 24,
    name: 'Copa Airlines',
    country: 'Costa Rica',
    iata: 'CM',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Copa_Airlines_logo.svg/200px-Copa_Airlines_logo.svg.png',
    website: 'https://www.copaair.com',
    bookingUrl: 'https://www.copaair.com',
    rating: 4.0,
    type: 'regional',
    description: localized(
      'Major Central American carrier connecting Costa Rica to the Americas via Panama City.',
      'ក្រុមហ៊ុនអាកាសចរណ៍សំខាន់នៅអាមេរិកកណ្តាល តភ្ជាប់កូស្តារីកាទៅកាន់អាមេរិក តាមរយៈទីក្រុងប៉ាណាម៉ា។'
    ),
  },

  // South Africa
  {
    id: 25,
    name: 'South African Airways',
    country: 'South Africa',
    iata: 'SA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/South_African_Airways_logo.svg/200px-South_African_Airways_logo.svg.png',
    website: 'https://www.flysaa.com',
    bookingUrl: 'https://www.flysaa.com',
    rating: 4.0,
    type: 'flag-carrier',
    description: localized(
      'South Africa\'s flag carrier connecting Cape Town to Africa and the world.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិអាហ្វ្រិកខាងត្បូង តភ្ជាប់ខេបថោនទៅកាន់អាហ្វ្រិក និងពិភពលោក។'
    ),
  },

  // Peru
  {
    id: 26,
    name: 'LATAM Airlines',
    country: 'Peru',
    iata: 'LA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
    website: 'https://www.latamairlines.com',
    bookingUrl: 'https://www.latamairlines.com',
    rating: 4.2,
    type: 'flag-carrier',
    description: localized(
      'South America\'s largest airline with flights to Lima and connections to Machu Picchu.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ធំជាងគេនៅអាមេរិកខាងត្បូង ជាមួយជើងហោះហើរទៅលីម៉ា និងការតភ្ជាប់ទៅម៉ាជូភីជូ។'
    ),
  },

  // Chile
  {
    id: 27,
    name: 'LATAM Chile',
    country: 'Chile',
    iata: 'LA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
    website: 'https://www.latamairlines.com/cl/en',
    bookingUrl: 'https://www.latamairlines.com/cl/en',
    rating: 4.2,
    type: 'flag-carrier',
    description: localized(
      'LATAM\'s Chilean branch connecting Santiago to Patagonia and global destinations.',
      'សាខាឈីលីរបស់ LATAM តភ្ជាប់សាន់ត្យាហ្គោទៅកាន់ប៉ាតាហ្គោនៀ និងគោលដៅពិភពលោក។'
    ),
  },

  // Jordan
  {
    id: 28,
    name: 'Royal Jordanian',
    country: 'Jordan',
    iata: 'RJ',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Royal_Jordanian_logo.svg/200px-Royal_Jordanian_logo.svg.png',
    website: 'https://www.rj.com',
    bookingUrl: 'https://www.rj.com',
    rating: 4.1,
    type: 'flag-carrier',
    description: localized(
      'Jordan\'s national airline with connections to Amman and Petra.',
      'ក្រុមហ៊ុនអាកាសចរណ៍ជាតិហ្ស៊កដានី ជាមួយការតភ្ជាប់ទៅអាំម៉ាន និងប៉េត្រា។'
    ),
  },

  // Italy (Amalfi Coast)
  {
    id: 29,
    name: 'Ryanair',
    country: 'Italy',
    iata: 'FR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Ryanair_Logo.svg/200px-Ryanair_Logo.svg.png',
    website: 'https://www.ryanair.com',
    bookingUrl: 'https://www.ryanair.com',
    rating: 3.7,
    type: 'low-cost',
    description: localized(
      'Europe\'s largest low-cost carrier with affordable flights to Italian cities.',
      'ក្រុមហ៊ុនអាកាសចរណ៍តម្លៃទាបធំជាងគេនៅអឺរ៉ុប ផ្តល់ជើងហោះហើរតម្លៃសមរម្យទៅកាន់ទីក្រុងអ៊ីតាលី។'
    ),
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