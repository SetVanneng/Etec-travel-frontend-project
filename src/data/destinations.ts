// ---------------------------------------------------------------------------
// destinations.ts
// Mock/local data for travel destinations.
// Textual fields (name, location, description, bestTimeToVisit,
// topActivities) are localized as { en, km } objects and are resolved at
// render time through the i18n store's pick() helper, so every card and
// detail view re-renders instantly when the language changes.
//
// `country` keeps a canonical English key ("Indonesia", ...) that is
// translated for display via the `countries.*` message keys.
// ---------------------------------------------------------------------------

import type { LocalizedText } from './localized'
import { localized } from './localized'

export type DestinationCategory =
  | 'Beaches'
  | 'Mountains'
  | 'Cities'
  | 'Historical'
  | 'Nature'
  | 'Adventure'

export interface Destination {
  id: number
  name: LocalizedText
  country: string
  // A short label shown on the card, e.g. "Bali, Indonesia"
  location: LocalizedText
  image: string
  description: LocalizedText
  category: DestinationCategory
  rating: number
  /** Average budget in USD per day */
  budget: number
  bestTimeToVisit: LocalizedText
  topActivities: LocalizedText[]
  /** Latitude for the map marker. */
  latitude: number
  /** Longitude for the map marker. */
  longitude: number
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: localized('Bali', 'បាលី'),
    country: 'Indonesia',
    location: localized('Bali, Indonesia', 'បាលី, ឥណ្ឌូនេស៊ី'),
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The Island of the Gods is famous for lush rice terraces, sacred temples, golden beaches and a friendly local culture. It is one of the most loved island destinations for solo travellers, couples and families.',
      'កោះព្រះដ៏ល្បីល្បាញ ដោយសារស្រែបោះជំហានដ៏ស្រស់ស្អាត ប្រាសាទបរិសុទ្ធ ឆ្នេរខ្សាច់មាស និងវប្បធម៌ក្នុងស្រុកដ៏រាក់ទាក់។ វាជាកោះមួយក្នុងចំណោមគោលដៅកោះដែលគេស្រឡាញ់ជាងគេ សម្រាប់អ្នកធ្វើដំណើរតែម្នាក់ឯង គូស្វាមីភរិយា និងក្រុមគ្រួសារ។'
    ),
    category: 'Beaches',
    rating: 4.8,
    budget: 120,
    bestTimeToVisit: localized('April to October (dry season)', 'ខែមេសា ដល់ ខែតុលា (រដូវប្រាំង)'),
    topActivities: [
      localized('Surfing lessons', 'រៀនជិះក្តារកាតស្គីលើទឹកសមុទ្រ'),
      localized('Temple tours', 'ទស្សនាប្រាសាទ'),
      localized('Rice terrace trekking', 'ដើរលេងស្រែបោះជំហាន'),
      localized('Waterfalls', 'ទឹកធ្លាក់'),
    ],
    latitude: -8.4095,
    longitude: 115.1889,
  },
  {
    id: 2,
    name: localized('Santorini', 'សាន់តូរីនី'),
    country: 'Greece',
    location: localized('Santorini, Greece', 'សាន់តូរីនី, ក្រិក'),
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A volcanic island with white-washed villages, blue domes and famous caldera sunsets. Santorini feels like the postcard picture of Greece and is perfect for a romantic getaway.',
      'កោះភ្នំភ្លើង ដែលមានភូមិសពណ៌សដ៏បរិសុទ្ធ ដំបូលពណ៌ខៀវ និងថ្ងៃលិចលើកាល់ដេរ៉ាដ៏ល្បីល្បាញ។ សាន់តូរីនី ប្រៀបដូចរូបប៉ុស្តាល់របស់ក្រិក ហើយល្អឥតខ្ចោះសម្រាប់ដំណើរកម្សាន្តរ៉ូមែនទិក។'
    ),
    category: 'Beaches',
    rating: 4.9,
    budget: 180,
    bestTimeToVisit: localized('April to October', 'ខែមេសា ដល់ ខែតុលា'),
    topActivities: [
      localized('Sunset watching in Oia', 'មើលថ្ងៃលិចនៅអូយ៉ា'),
      localized('Catamaran cruise', 'ជិះទូកកាតាម៉ារ៉ាន'),
      localized('Wine tasting', 'ភ្លក់ស្រា'),
      localized('Red beach swim', 'ហែលទឹកឆ្នេរក្រហម'),
    ],
    latitude: 36.3932,
    longitude: 25.4615,
  },
  {
    id: 3,
    name: localized('Swiss Alps', 'ភ្នំអាល់ស្វីស'),
    country: 'Switzerland',
    location: localized('Zermatt, Switzerland', 'សឺរម៉ាត, ស្វីស'),
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Snow-capped peaks, crystal lakes and charming villages make the Swiss Alps a dream for nature lovers. Great hiking in summer and world class skiing in winter.',
      'កំពូលភ្នំគ្របដោយព្រិល បឹងថ្លាដូចគ្រីស្តាល់ និងភូមិដ៏គួរឱ្យស្រឡាញ់ ធ្វើឱ្យភ្នំអាល់ស្វីសក្លាយជាក្តីស្រមៃរបស់អ្នកស្រឡាញ់ធម្មជាតិ។ សាកសមសម្រាប់ការឡើងភ្នំនៅរដូវក្តៅ និងការជិះស្គីលំដាប់ពិភពលោកនៅរដូវរងារ។'
    ),
    category: 'Mountains',
    rating: 4.9,
    budget: 220,
    bestTimeToVisit: localized('June to September or December to March', 'ខែមិថុនា ដល់ ខែកញ្ញា ឬ ខែធ្នូ ដល់ ខែមីនា'),
    topActivities: [
      localized('Matterhorn view hike', 'ដើរឡើងភ្នំមើលទេសភាពម៉ាត់តឺហន'),
      localized('Skiing and snowboarding', 'ជិះស្គី និងស្នូបូដ'),
      localized('Glacier express train', 'ជិះរថភ្លើងហ្គ្លេស៊ីអ៊ែប្រេស'),
      localized('Paragliding', 'ហោះហើរប៉ារ៉ាក្លាយឌីង'),
    ],
    latitude: 46.0207,
    longitude: 7.7491,
  },
  {
    id: 4,
    name: localized('Banff', 'បានហ្វ'),
    country: 'Canada',
    location: localized('Banff, Canada', 'បានហ្វ, កាណាដា'),
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A town inside Banff National Park, home to turquoise lakes, towering peaks and plenty of wildlife. One of the most beautiful places on Earth to unwind in nature.',
      'ក្រុងតូចមួយនៅក្នុងឧទ្យានជាតិបានហ្វ ជាជម្រកបឹងថ្លាពណ៌ខៀវខ្ចី កំពូលភ្នំខ្ពស់ៗ និងសត្វព្រៃសម្បូរបែប។ ជាកន្លែងស្អាតបំផុតមួយនៅលើផែនដី សម្រាប់សម្រាកលំហែក្នុងធម្មជាតិ។'
    ),
    category: 'Nature',
    rating: 4.8,
    budget: 160,
    bestTimeToVisit: localized('June to September', 'ខែមិថុនា ដល់ ខែកញ្ញា'),
    topActivities: [
      localized('Lake canoeing', 'ជិះកាណូលើបឹង'),
      localized('Wildlife spotting', 'ស្វែងរកសត្វព្រៃ'),
      localized('Hot springs', 'ទឹកក្តៅធម្មជាតិ'),
      localized('Scenic gondola ride', 'ជិះរទេះភ្នំមើលទេសភាព'),
    ],
    latitude: 51.1784,
    longitude: -115.5708,
  },
  {
    id: 5,
    name: localized('Paris', 'ប៉ារីស'),
    country: 'France',
    location: localized('Paris, France', 'ប៉ារីស, បារាំង'),
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The City of Light needs little introduction. Iconic monuments, world-famous museums, cozy cafes and the romantic Seine river make Paris a must visit.',
      'ទីក្រុងពន្លឺ មិនត្រូវការការណែនាំច្រើនទេ។ វិមានល្បីៗ សារមន្ទីរល្បីលើពិភពលោក ហាងកាហ្វេកក់ក្តៅ និងទន្លេសេនដ៏រ៉ូមែនទិក ធ្វើឱ្យប៉ារីសក្លាយជាទីក្រុងដែលត្រូវតែទៅទស្សនា។'
    ),
    category: 'Cities',
    rating: 4.7,
    budget: 190,
    bestTimeToVisit: localized('April to June, September to November', 'ខែមេសា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Eiffel Tower visit', 'ទស្សនាអគ្គិសនីអេហ្វ្វែល'),
      localized('Louvre museum', 'សារមន្ទីរលូវើរ'),
      localized('Seine river cruise', 'ជិះទូកលើទន្លេសេន'),
      localized('Montmartre walk', 'ដើរលេងម៉ុងម៉ាត'),
    ],
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 6,
    name: localized('Tokyo', 'តូក្យូ'),
    country: 'Japan',
    location: localized('Tokyo, Japan', 'តូក្យូ, ជប៉ុន'),
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A dazzling mix of neon streets, old temples, incredible food and futuristic technology. Tokyo is an unforgettable city where tradition meets the future.',
      'ការលាយបញ្ចូលគ្នាដ៏អស្ចារ្យនៃផ្លូវបំភ្លឺអ៊ីយូន ប្រាសាទបុរាណ អាហារដ៏អស្ចារ្យ និងបច្ចេកវិទ្យាទំនើប។ តូក្យូជាទីក្រុងដែលមិនអាចបំភ្លេចបាន ដែលប្រពៃណីជួបជាមួយអនាគត។'
    ),
    category: 'Cities',
    rating: 4.8,
    budget: 200,
    bestTimeToVisit: localized('March to May, October to November', 'ខែមីនា ដល់ ខែឧសភា ខែតុលា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Shibuya crossing', 'ផ្លូវកាត់ស៊ីប៊ូយ៉ា'),
      localized('Senso-ji temple', 'ប្រាសាទសិនសូជិ'),
      localized('Sushi making class', 'ថ្នាក់រៀនធ្វើស៊ូស៊ី'),
      localized('Akihabara electronics', 'អេឡិចត្រូនិកអាគីហាបារ៉ា'),
    ],
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 7,
    name: localized('Rome', 'រ៉ូម'),
    country: 'Italy',
    location: localized('Rome, Italy', 'រ៉ូម, អ៊ីតាលី'),
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The Eternal City is an open-air museum. Walk where gladiators fought, throw a coin in Trevi fountain and eat the best pizza and gelato of your life.',
      'ទីក្រុងអមតៈ ជាសារមន្ទីរបើកចំហរ។ ដើរលើទីលានដែលអ្នកប្រដាល់គ្លាឌីអេតធ្លាប់ប្រណាំង បោះកាក់ក្នុងប្រភពទឹកទ្រេវី ហើយភ្លក់ភីហ្សា និងកាឡាតូឆ្ងាញ់បំផុតក្នុងជីវិតរបស់អ្នក។'
    ),
    category: 'Historical',
    rating: 4.8,
    budget: 170,
    bestTimeToVisit: localized('April to June, September to October', 'ខែមេសា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែតុលា'),
    topActivities: [
      localized('Colosseum tour', 'ទស្សនាកូឡូសេអ៊ូម'),
      localized('Vatican museums', 'សារមន្ទីរវ៉ាទីកង់'),
      localized('Roman Forum walk', 'ដើរលេងហ្វ៊រ៉ុមរ៉ូម៉ាំង'),
      localized('Pasta making class', 'ថ្នាក់រៀនធ្វើប៉ាស្តា'),
    ],
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    id: 8,
    name: localized('Siem Reap', 'សៀមរាប'),
    country: 'Cambodia',
    location: localized('Siem Reap, Cambodia', 'សៀមរាប, កម្ពុជា'),
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Home of the magnificent Angkor temples, including the famous Angkor Wat. Siem Reap is a magical, affordable destination full of history and warmth.',
      'ឋានសួគ៌នៃប្រាសាទអង្គរដ៏អស្ចារ្យ រួមទាំងអង្គរវត្តដ៏ល្បីល្បាញ។ សៀមរាបជាគោលដៅវេទមន្ត តម្លៃសមរម្យ ពោរពេញដោយប្រវត្តិសាស្ត្រ និងភាពកក់ក្តៅ។'
    ),
    category: 'Historical',
    rating: 4.7,
    budget: 90,
    bestTimeToVisit: localized('November to March', 'ខែវិច្ឆិកា ដល់ ខែមីនា'),
    topActivities: [
      localized('Angkor Wat sunrise', 'មើលថ្ងៃរះអង្គរវត្ត'),
      localized('Temple hop by tuk-tuk', 'ដើរទស្សនាប្រាសាទដោយទុកទុក'),
      localized('Tonle Sap lake', 'បឹងទន្លេសាប'),
      localized('Night market', 'ផ្សាររាត្រី'),
    ],
    latitude: 13.3633,
    longitude: 103.8564,
  },
  {
    id: 9,
    name: localized('Queenstown', 'ឃ្វីនស្តាន'),
    country: 'New Zealand',
    location: localized('Queenstown, New Zealand', 'ឃ្វីនស្តាន, នូវែលសេឡង់'),
    image: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The adventure capital of the world. Surrounded by mountains and a huge lake, Queenstown offers bungee jumping, jet boats, hikes and stunning drives.',
      'រដ្ឋធានីនៃកីឡាផ្សងព្រេងរបស់ពិភពលោក។ ព័ទ្ធជុំវិញដោយភ្នំ និងបឹងដ៏ធំ ឃ្វីនស្តានផ្តល់ជូននូវការលោតបង់ហ្សី ទូកជេត ការឡើងភ្នំ និងការបើកបរមើលទេសភាពដ៏ស្រស់ស្អាត។'
    ),
    category: 'Adventure',
    rating: 4.9,
    budget: 210,
    bestTimeToVisit: localized('December to February', 'ខែធ្នូ ដល់ ខែកុម្ភៈ'),
    topActivities: [
      localized('Bungee jumping', 'លោតបង់ហ្សី'),
      localized('Skippers Canyon tour', 'ដំណើរកម្សាន្តស្គីបភើរកានីញ៉ុន'),
      localized('Jet boating', 'ជិះទូកជេត'),
      localized('Milford Sound day trip', 'ដំណើរមួយថ្ងៃទៅមីលហ្វដសោន'),
    ],
    latitude: -45.0312,
    longitude: 168.6626,
  },
  {
    id: 10,
    name: localized('Maldives', 'ម៉ាល់ឌីវ'),
    country: 'Maldives',
    location: localized('Maldives, Maldives', 'ម៉ាល់ឌីវ, ម៉ាល់ឌីវ'),
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Overwater bungalows, turquoise lagoons and spectacular marine life. The Maldives is the ultimate tropical paradise for pure relaxation.',
      'ផ្ទះឈើលើទឹក បឹងឈូងសមុទ្រថ្លាពណ៌ខៀវ និងជីវិតក្រោមទឹកដ៏អស្ចារ្យ។ ម៉ាល់ឌីវជាឋានសួគ៌ត្រូពិចដ៏ល្អឥតខ្ចោះ សម្រាប់ការសម្រាកលំហែរពិតប្រាកដ។'
    ),
    category: 'Beaches',
    rating: 4.9,
    budget: 350,
    bestTimeToVisit: localized('November to April', 'ខែវិច្ឆិកា ដល់ ខែមេសា'),
    topActivities: [
      localized('Snorkelling', 'មុជទឹកស្នូកឃែល'),
      localized('Overwater villa stay', 'ស្នាក់នៅផ្ទះឈើលើទឹក'),
      localized('Dolphin cruise', 'ជិះទូកមើលផ្សោត'),
      localized('Sunset fishing', 'នេសាទមើលថ្ងៃលិច'),
    ],
    latitude: 3.2028,
    longitude: 73.2207,
  },
  {
    id: 11,
    name: localized('Marrakech', 'ម៉ារ៉ាកេស'),
    country: 'Morocco',
    location: localized('Marrakech, Morocco', 'ម៉ារ៉ាកេស, ម៉ារ៉ុក'),
    image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A colourful city of markets, palaces and gardens. Get lost in the souks, sip mint tea and enjoy the vibrant energy of Moroccos cultural heart.',
      'ទីក្រុងចម្រុះពណ៌នៃផ្សារ វិមាន និងសួនច្បារ។ វង្វេងនៅក្នុងផ្សារស៊ុក ផឹកតែជីអង្កាម ហើយរីករាយជាមួយថាមពលវប្បធម៌របស់ម៉ារ៉ុក។'
    ),
    category: 'Cities',
    rating: 4.6,
    budget: 110,
    bestTimeToVisit: localized('March to May, September to November', 'ខែមីនា ដល់ ខែឧសភា ខែកញ្ញា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Old city souks', 'ផ្សារស៊ុកក្នុងទីក្រុងចាស់'),
      localized('Majorelle Garden', 'សួនម៉ាស្សូរ៉េល'),
      localized('Camel ride in the desert', 'ជិះអូដ្ឋក្នុងវាលខ្សាច់'),
      localized('Koutoubia mosque', 'វិហារអ៊ីស្លាមគូធូប៊ីយ៉ា'),
    ],
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    id: 12,
    name: localized('Costa Rica', 'កូស្តារីកា'),
    country: 'Costa Rica',
    location: localized('Costa Rica, Central America', 'កូស្តារីកា, អាមេរិកកណ្តាល'),
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Rainforests, volcanoes, beaches and amazing biodiversity. Costa Rica is a nature lover\u2019s paradise packed with adventurous things to do.',
      'ព្រៃត្រូពិច ភ្នំភ្លើង ឆ្នេរ និងជីវចម្រុះដ៏អស្ចារ្យ។ កូស្តារីកាជាឋានសួគ៌របស់អ្នកស្រឡាញ់ធម្មជាតិ ពោរពេញដោយសកម្មភាពផ្សងព្រេង។'
    ),
    category: 'Nature',
    rating: 4.8,
    budget: 150,
    bestTimeToVisit: localized('December to April', 'ខែធ្នូ ដល់ ខែមេសា'),
    topActivities: [
      localized('Rainforest hikes', 'ដើរភ្នំក្នុងព្រៃត្រូពិច'),
      localized('Volcano tours', 'ដំណើរទស្សនាភ្នំភ្លើង'),
      localized('Zip-lining', 'ជិះខ្សែកាបហោះលើព្រៃ'),
      localized('Sloth spotting', 'ស្វែងរកស្លុត'),
    ],
    latitude: 9.7489,
    longitude: -83.7534,
  },
  {
    id: 13,
    name: localized('Reykjavik', 'រេកយ៉ាវិក'),
    country: 'Iceland',
    location: localized('Reykjavik, Iceland', 'រេកយ៉ាវិក, អ៊ីស្លង់'),
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The world\u2019s northernmost capital sits between dramatic mountains and the sea. Golden waterfalls, black-sand beaches, hot springs and the northern lights are all within easy reach.',
      'រដ្ឋធានីភាគខាងជើងបំផុតរបស់ពិភពលោក ស្ថិតនៅចន្លោះភ្នំ និងសមុទ្រ។ ទឹកធ្លាក់ពណ៌មាស ឆ្នេរខ្សាច់ខ្មៅ ទឹកក្តៅធម្មជាតិ និងពន្លឺប៉ូលែស សុទ្ធតែអាចធ្វើដំណើរទៅបានយ៉ាងងាយស្រួល។'
    ),
    category: 'Cities',
    rating: 4.7,
    budget: 230,
    bestTimeToVisit: localized('September to March for the aurora', 'ខែកញ្ញា ដល់ ខែមីនា សម្រាប់ពន្លឺប៉ូលែស'),
    topActivities: [
      localized('Northern lights hunt', 'ដេញតាមពន្លឺប៉ូលែស'),
      localized('Blue Lagoon soak', 'ងូតទឹកបឹងខៀវ'),
      localized('Golden Circle tour', 'ដំណើរហ្គោលដិនសឺកល'),
      localized('Glacier walk', 'ដើរលើផ្ទាំងទឹកកក'),
    ],
    latitude: 64.1466,
    longitude: -21.9426,
  },
  {
    id: 14,
    name: localized('Hanoi', 'ហាណូយ'),
    country: 'Vietnam',
    location: localized('Hanoi, Vietnam', 'ហាណូយ, វៀតណាម'),
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A thousand-year-old capital of tree-lined boulevards, lively old quarter streets, lakes and delicious street food. A perfect base to explore northern Vietnam.',
      'រដ្ឋធានីអាយុរាប់ពាន់ឆ្នាំ នៃមហាវិថីដែលមានដើមឈើ ផ្លូវទីក្រុងចាស់ដ៏រស់រវើក បឹង និងអាហារតាមដងផ្លូវឆ្ងាញ់ៗ។ ជាកន្លែងល្អឥតខ្ចោះសម្រាប់រុករកវៀតណាមខាងជើង។'
    ),
    category: 'Cities',
    rating: 4.6,
    budget: 70,
    bestTimeToVisit: localized('October to April', 'ខែតុលា ដល់ ខែមេសា'),
    topActivities: [
      localized('Old Quarter food tour', 'ដំណើរអាហារអូលរ៉ាតឺ'),
      localized('Hoan Kiem Lake walk', 'ដើរលេងបឹងហួនគៀម'),
      localized('Train Street coffee', 'កាហ្វេតាមផ្លូវរថភ្លើង'),
      localized('Ha Long Bay day trip', 'ដំណើរមួយថ្ងៃទៅឈូងសមុទ្រហាឡុង'),
    ],
    latitude: 21.0285,
    longitude: 105.8542,
  },
  {
    id: 15,
    name: localized('Lisbon', 'លីសបូន'),
    country: 'Portugal',
    location: localized('Lisbon, Portugal', 'លីសបូន, ព័រទុយហ្គាល់'),
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A sun-soaked city of seven hills, trams, azulejo tiles and pastel de nata. Mix old-town charm with Atlantic beaches just a train ride away.',
      'ទីក្រុងពោរពេញដោយពន្លឺព្រះអាទិត្យ នៃភ្នំទាំងប្រាំពីរ រថភ្លើងវ៉ាង ក្បឿងអាហ្សូឡេជូ និងប៉ាស្តេល ដឺ ណាតា។ លាយភាពទាក់ទាញរបស់ទីក្រុងចាស់ ជាមួយឆ្នេរអាត្លង់ទិក ដែលគ្រាន់តែជិះរថភ្លើងបន្តិចទៀតប៉ុណ្ណោះ។'
    ),
    category: 'Cities',
    rating: 4.8,
    budget: 140,
    bestTimeToVisit: localized('March to June, September to October', 'ខែមីនា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែតុលា'),
    topActivities: [
      localized('Tram 28 ride', 'ជិះរថភ្លើងវ៉ាងលេខ ២៨'),
      localized('Belem tower visit', 'ទស្សនាប៉មបេឡេម'),
      localized('Pastel de nata tasting', 'ភ្លក់ប៉ាស្តេល ដឺ ណាតា'),
      localized('Miradouro viewpoints', 'ទីតាំងមើលទេសភាពមីរ៉ាឌួរ៉ូ'),
    ],
    latitude: 38.7223,
    longitude: -9.1393,
  },
  {
    id: 16,
    name: localized('Angkor Wat', 'ប្រាសាទអង្គរវត្ត'),
    country: 'Cambodia',
    location: localized('Siem Reap, Cambodia', 'សៀមរាប, កម្ពុជា'),
    image: 'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    description: localized(
      'The majestic Angkor temple complex in Cambodia is one of the greatest archaeological wonders in the world. Watch sunrise over Angkor Wat, explore jungle temples and soak up the rich Khmer culture.',
      'ប្រាសាទអង្គរដ៏អស្ចារ្យនៅកម្ពុជា ជាអច្ឆរិយៈបុរាណវិទ្យាដ៏អស្ចារ្យបំផុតមួយនៅលើពិភពលោក។ មើលថ្ងៃរះលើអង្គរវត្ត រុករកប្រាសាទក្នុងព្រៃ និងរីករាយជាមួយវប្បធម៌ខ្មែរដ៏សម្បូរបែប។'
    ),
    category: 'Historical',
    rating: 4.9,
    budget: 90,
    bestTimeToVisit: localized('November to March', 'ខែវិច្ឆិកា ដល់ ខែមីនា'),
    topActivities: [
      localized('Angkor Wat sunrise', 'មើលថ្ងៃរះអង្គរវត្ត'),
      localized('Temple hop by tuk-tuk', 'ដើរទស្សនាប្រាសាទដោយទុកទុក'),
      localized('Bayon and Ta Prohm walk', 'ដើរកម្សាន្តបាយ័ន និងតាព្រហ្ម'),
      localized('Tonle Sap lake tour', 'ដំណើរកម្សាន្តបឹងទន្លេសាប'),
    ],
    latitude: 13.4125,
    longitude: 103.8666,
  },
  {
    id: 17,
    name: localized('Cape Town', 'ខេបថោន'),
    country: 'South Africa',
    location: localized('Cape Town, South Africa', 'ខេបថោន, អាហ្វ្រិកខាងត្បូង'),
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A stunning coastal city framed by Table Mountain and the Atlantic. Penguins, vineyards and dramatic coastline combine in one unforgettable place.',
      'ទីក្រុងឆ្នេរសមុទ្រដ៏ស្រស់ស្អាត ព័ទ្ធជុំវិញដោយភ្នំតេបល និងសមុទ្រអាត្លង់ទិក។ ភេនឃ្វីន ចំការទំពាំងបាយជូរ និងឆ្នេរដ៏អស្ចារ្យ ផ្សំគ្នាក្នុងកន្លែងដែលមិនអាចបំភ្លេចបាន។'
    ),
    category: 'Nature',
    rating: 4.8,
    budget: 130,
    bestTimeToVisit: localized('November to March', 'ខែវិច្ឆិកា ដល់ ខែមីនា'),
    topActivities: [
      localized('Table Mountain cableway', 'ជិះរទេះភ្នំតេបល'),
      localized('Boulders Beach penguins', 'ភេនឃ្វីនឆ្នេរប៊ូលឌើរ'),
      localized('Cape Point drive', 'បើកបរទៅខេបផូញ'),
      localized('Wine tasting in Stellenbosch', 'ភ្លក់ស្រានៅស្តេឡេនបូស'),
    ],
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 18,
    name: localized('Kyoto', 'ក្យូតូ'),
    country: 'Japan',
    location: localized('Kyoto, Japan', 'ក្យូតូ, ជប៉ុន'),
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Japan\u2019s ancient capital of serene temples, zen gardens, bamboo groves and graceful geisha districts. A timeless cultural heart.',
      'រដ្ឋធានីបុរាណរបស់ជប៉ុន នៃប្រាសាទស្ងប់ស្ងាត់ សួនសេន ព្រៃឫស្សី និងតំបន់ហ្គីសាដ៏រុងរឿង។ បេះដូងវប្បធម៌អមតៈ។'
    ),
    category: 'Historical',
    rating: 4.9,
    budget: 150,
    bestTimeToVisit: localized('March to May (cherry blossom), October to November', 'ខែមីនា ដល់ ខែឧសភា (រដូវផ្កាសាគូរ៉ា) ខែតុលា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Fushimi Inari shrine', 'ទីសក្ការៈហ្វូស៊ីមីអ៊ីណារី'),
      localized('Arashiyama bamboo grove', 'ព្រៃឫស្សីអារ៉ាស៊ីយ៉ាម៉ា'),
      localized('Kinkaku-ji temple', 'ប្រាសាទគីនកាគូជិ'),
      localized('Gion geisha district', 'តំបន់ហ្គីអុន'),
    ],
    latitude: 35.0116,
    longitude: 135.7681,
  },
  {
    id: 19,
    name: localized('Dubai', 'ឌូបៃ'),
    country: 'United Arab Emirates',
    location: localized('Dubai, UAE', 'ឌូបៃ, អារ៉ាប់រួម'),
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A futuristic desert metropolis with the world\u2019s tallest building, luxury malls, artificial islands and golden sand dunes. Dubai blends tradition with jaw-dropping ambition.',
      'ទីក្រុងទំនើបបែបអនាគតក្នុងវាលខ្សាច់ ជាមួយអគារខ្ពស់ជាងគេលើពិភពលោក ផ្សារទំនើបប្រណិត កោះសិប្បនិម្មិត និងវាលខ្សាច់មាស។ ឌូបៃបញ្ចូលគ្នារវាងប្រពៃណី និងមហិច្ឆតាដ៏អស្ចារ្យ។'
    ),
    category: 'Cities',
    rating: 4.7,
    budget: 300,
    bestTimeToVisit: localized('November to March', 'ខែវិច្ឆិកា ដល់ ខែមីនា'),
    topActivities: [
      localized('Burj Khalifa observation deck', 'នាវាចេញមើលអគារបឺជខាលីហ្វា'),
      localized('Desert safari', 'ដំណើរវាលខ្សាច់'),
      localized('Dubai Mall and fountain show', 'ផ្សារឌូបៃម៉ល និងកម្មវិធីប្រភពទឹក'),
      localized('Palm Jumeirah tour', 'ដំណើរកម្សាន្តកោះប៉ាមជូម៉េរ៉ា'),
    ],
    latitude: 25.2048,
    longitude: 55.2708,
  },
  {
    id: 20,
    name: localized('Barcelona', 'បារសេឡូណា'),
    country: 'Spain',
    location: localized('Barcelona, Spain', 'បារសេឡូណា, អេស្ប៉ាញ'),
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A Mediterranean city of Gaud\u00ed masterpieces, tapas bars, sandy beaches and buzzing street life on the famous La Rambla.',
      'ទីក្រុងមេឌីទែរ៉ាណេ នៃស្នាដៃហ្គោឌី ហាងតាបាស ឆ្នេរខ្សាច់ និងជីវិតតាមផ្លូវដ៏រស់រវើកនៅលើផ្លូវឡារ៉ាមប្លាដ៏ល្បី។'
    ),
    category: 'Cities',
    rating: 4.7,
    budget: 160,
    bestTimeToVisit: localized('March to June, September to October', 'ខែមីនា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែតុលា'),
    topActivities: [
      localized('Sagrada Fam\u00edlia tour', 'ទស្សនាសាក្រាដាហ្វាមីលីយ៉ា'),
      localized('Park G\u00fcell', 'ឧទ្យានហ្គ័ល'),
      localized('Gothic Quarter walk', 'ដើរលេងត្រកូលហ្គោធិក'),
      localized('Tapas tasting', 'ភ្លក់តាបាស'),
    ],
    latitude: 41.3874,
    longitude: 2.1686,
  },
  {
    id: 21,
    name: localized('Sydney', 'ស៊ីដនី'),
    country: 'Australia',
    location: localized('Sydney, Australia', 'ស៊ីដនី, អូស្ត្រាលី'),
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Australia\u2019s harbour city with the iconic Opera House, golden Bondi beaches, a huge harbour bridge and a relaxed outdoor culture.',
      'ទីក្រុងកំពង់ផែរបស់អូស្ត្រាលី ជាមួយអូប៉េរ៉ាហាវស៍ដ៏ល្បី ឆ្នេរបោនឌីមាស ស្ពានកំពង់ផែដ៏ធំ និងវប្បធម៌ក្រៅផ្ទះដ៏សម្រាកលំហែរ។'
    ),
    category: 'Beaches',
    rating: 4.7,
    budget: 180,
    bestTimeToVisit: localized('September to November, March to May', 'ខែកញ្ញា ដល់ ខែវិច្ឆិកា ខែមីនា ដល់ ខែឧសភា'),
    topActivities: [
      localized('Opera House tour', 'ទស្សនាអូប៉េរ៉ាហាវស៍'),
      localized('Harbour Bridge climb', 'ឡើងស្ពានហាបឺរ'),
      localized('Bondi Beach', 'ឆ្នេរបោនឌី'),
      localized('Blue Mountains day trip', 'ដំណើរមួយថ្ងៃទៅភ្នំប៊្លូ'),
    ],
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    id: 22,
    name: localized('New York City', 'ញូវយ៉កស៊ីធី'),
    country: 'USA',
    location: localized('New York City, USA', 'ញូវយ៉កស៊ីធី, សហរដ្ឋអាមេរិក'),
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The city that never sleeps: skyscraper canyons, world-class museums, Central Park, Broadway shows and food from every corner of the planet.',
      'ទីក្រុងដែលមិនដែលដេក៖ អគារខ្ពស់ៗដូចជ្រលងភ្នំ សារមន្ទីរលំដាប់ពិភពលោក សេនត្រាល់ផាក កម្មវិធីប្រូដវេយ និងអាហារពីគ្រប់ទិសទីលើផែនដី។'
    ),
    category: 'Cities',
    rating: 4.8,
    budget: 250,
    bestTimeToVisit: localized('April to June, September to November', 'ខែមេសា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Statue of Liberty ferry', 'ជិះទូកទៅរូបសំណាកសេរីភាព'),
      localized('Central Park stroll', 'ដើរលេងសេនត្រាល់ផាក'),
      localized('Times Square', 'ទីលានថាមស៍ស្គែរ'),
      localized('Brooklyn Bridge walk', 'ដើរកាត់ស្ពានប៊្រូកលីន'),
    ],
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: 23,
    name: localized('Machu Picchu', 'ម៉ាជូភីជូ'),
    country: 'Peru',
    location: localized('Machu Picchu, Peru', 'ម៉ាជូភីជូ, ប៉េរូ'),
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The lost city of the Incas perched high in the Andes. Mysterious ruins, cloud forests and llamas make it a once-in-a-lifetime bucket list icon.',
      'ទីក្រុងសម្ងាត់របស់អ៊ីងកា ដែលស្ថិតខ្ពស់នៅលើភ្នំអង់ដេស។ ប្រាសាទអាថ៌កំបាំង ព្រៃអ័ព្ទ និងសត្វឡាម៉ា ធ្វើឱ្យវាក្លាយជាទីកន្លែងដែលត្រូវទៅមួយដងក្នុងមួយជីវិត។'
    ),
    category: 'Historical',
    rating: 4.9,
    budget: 140,
    bestTimeToVisit: localized('May to September (dry season)', 'ខែឧសភា ដល់ ខែកញ្ញា (រដូវប្រាំង)'),
    topActivities: [
      localized('Machu Picchu citadel', 'បន្ទាយម៉ាជូភីជូ'),
      localized('Inca Trail trek', 'ដើរផ្លូវអ៊ីនកាត្រែយ'),
      localized('Sacred Valley tour', 'ដំណើរជ្រលងភ្នំសាក្រេដ'),
      localized('Cusco old town', 'ទីក្រុងចាស់គូស្កូ'),
    ],
    latitude: -13.1631,
    longitude: -72.545,
  },
  {
    id: 24,
    name: localized('Patagonia', 'ប៉ាតាហ្គោនៀ'),
    country: 'Chile',
    location: localized('Patagonia, Chile & Argentina', 'ប៉ាតាហ្គោនៀ, ឈីលី និង អាហ្សង់ទីន'),
    image: 'https://images.unsplash.com/photo-1502239604432-4ba6989930a0?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Wild, windswept and dramatic, Patagonia\u2019s granite peaks, glaciers and steppe are an adventurer\u2019s paradise at the end of the world.',
      'ពិបាក ព្យុះខ្យល់ និងអស្ចារ្យ កំពូលភ្នំថ្មក្រានីត ផ្ទាំងទឹកកក និងវាលស្មៅស្តេភ របស់ប៉ាតាហ្គោនៀ គឺជាឋានសួគ៌របស់អ្នកផ្សងព្រេងនៅចុងបំផុតនៃពិភពលោក។'
    ),
    category: 'Nature',
    rating: 4.9,
    budget: 200,
    bestTimeToVisit: localized('November to March', 'ខែវិច្ឆិកា ដល់ ខែមីនា'),
    topActivities: [
      localized('Torres del Paine trek', 'ដើរឡើងភ្នំតូរ៉េសដេលប៉ាអ៊ិន'),
      localized('Grey Glacier boat', 'ជិះទូកទៅផ្ទាំងទឹកកកហ្គ្រេយ'),
      localized('Perito Moreno glacier', 'ផ្ទាំងទឹកកកប៉េរីតូម៉ូរេណូ'),
      localized('Steppe wildlife spotting', 'ស្វែងរកសត្វព្រៃតាមវាលស្មៅ'),
    ],
    latitude: -50.9423,
    longitude: -73.4068,
  },
  {
    id: 25,
    name: localized('Phuket', 'ភូកេត'),
    country: 'Thailand',
    location: localized('Phuket, Thailand', 'ភូកេត, ថៃ'),
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Thailand\u2019s largest island: longtail boats, limestone cliffs, turquoise bays and lively beach towns. The perfect base for island hopping.',
      'កោះធំបំផុតរបស់ថៃ៖ ទូកងាវវែង ច្រាំងថ្មកំបោរ ឈូងសមុទ្រថ្លាពណ៌ខៀវ និងទីក្រុងឆ្នេរដ៏រស់រវើក។ ជាកន្លែងល្អឥតខ្ចោះសម្រាប់ដើរកម្សាន្តពីកោះមួយទៅកោះមួយ។'
    ),
    category: 'Beaches',
    rating: 4.6,
    budget: 100,
    bestTimeToVisit: localized('November to April', 'ខែវិច្ឆិកា ដល់ ខែមេសា'),
    topActivities: [
      localized('Phi Phi islands boat trip', 'ជិះទូកទៅកោះភីភី'),
      localized('Big Buddha viewpoint', 'ទីតាំងមើលព្រះពុទ្ធរូបធំ'),
      localized('Night markets', 'ផ្សាររាត្រី'),
      localized('Snorkelling and diving', 'មុជទឹកស្នូកឃែល និងមុជទឹក'),
    ],
    latitude: 7.8804,
    longitude: 98.3923,
  },
  {
    id: 26,
    name: localized('Petra', 'ប៉េត្រា'),
    country: 'Jordan',
    location: localized('Petra, Jordan', 'ប៉េត្រា, ហ្ស៊កដានី'),
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'The rose-red city carved into desert cliffs by the Nabataeans over 2000 years ago. Walk through the Siq to the stunning Treasury at sunrise.',
      'ទីក្រុងពណ៌ក្រហមផ្កាឈូក ឆ្លាក់នៅលើច្រាំងថ្មភ្នំវាលខ្សាច់ ដោយជនជាតិណាបាតេន កាលពីជាង ២០០០ ឆ្នាំមុន។ ដើរកាត់ស៊ីក ទៅកាន់វិហារហ្វាំងតាស្គូរី នៅពេលថ្ងៃរះ។'
    ),
    category: 'Historical',
    rating: 4.9,
    budget: 130,
    bestTimeToVisit: localized('March to May, September to November', 'ខែមីនា ដល់ ខែឧសភា ខែកញ្ញា ដល់ ខែវិច្ឆិកា'),
    topActivities: [
      localized('Treasury at sunrise', 'វិហារហ្វាំងតាស្គូរី ពេលថ្ងៃរះ'),
      localized('Siq canyon walk', 'ដើរកាត់ជ្រលងស៊ីក'),
      localized('Monastery climb', 'ឡើងភ្នំម៉ូណាស្ទ័រី'),
      localized('Camel ride', 'ជិះអូដ្ឋ'),
    ],
    latitude: 30.3285,
    longitude: 35.4444,
  },
  {
    id: 27,
    name: localized('Amalfi Coast', 'ឆ្នេរអាម៉ាលហ្វី'),
    country: 'Italy',
    location: localized('Positano, Italy', 'ប៉ូហ្សីតាណូ, អ៊ីតាលី'),
    image: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Pastel villages clinging to dramatic cliffs over the turquoise Tyrrhenian Sea. Lemons, gelato, boat trips and unforgettable coastal drives.',
      'ភូមិពណ៌ប៉ាស្តេល ប្រកាន់លើច្រាំងថ្មភ្នំដ៏អស្ចារ្យ ពីលើសមុទ្រទីរ៉េនៀនថ្លាពណ៌ខៀវ។ ក្រូចឆ្មារ កាឡាតូ ដំណើរទូក និងការបើកបរតាមឆ្នេរដែលមិនអាចបំភ្លេចបាន។'
    ),
    category: 'Beaches',
    rating: 4.8,
    budget: 260,
    bestTimeToVisit: localized('April to June, September to October', 'ខែមេសា ដល់ ខែមិថុនា ខែកញ្ញា ដល់ ខែតុលា'),
    topActivities: [
      localized('Positano cliff walk', 'ដើរលើច្រាំងថ្មប៉ូហ្សីតាណូ'),
      localized('Amalfi coastal drive', 'បើកបរតាមឆ្នេរអាម៉ាលហ្វី'),
      localized('Boat trip to Capri', 'ជិះទូកទៅកាព្រី'),
      localized('Lemon farm tour', 'ដំណើរកម្សាន្តចំការក្រូចឆ្មារ'),
    ],
    latitude: 40.6281,
    longitude: 14.4851,
  },
  {
    id: 28,
    name: localized('Yosemite', 'យ៉ូហ្សេមីទី'),
    country: 'USA',
    location: localized('Yosemite, California', 'យ៉ូហ្សេមីទី, កាលីហ្វ័រញ៉ា'),
    image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Iconic granite cliffs, giant sequoias and thundering waterfalls in a Californian wilderness that inspired national parks worldwide.',
      'ច្រាំងថ្មក្រានីតដ៏ល្បីល្បាញ ដើមសេវ៉ូយ៉ាយក្ស និងទឹកធ្លាក់ខ្លាំងៗ នៅក្នុងព្រៃកាលីហ្វ័រញ៉ា ដែលជាប្រភពបំផុសគំនិតនៃឧទ្យានជាតិជាច្រើននៅលើពិភពលោក។'
    ),
    category: 'Nature',
    rating: 4.8,
    budget: 170,
    bestTimeToVisit: localized('May to October', 'ខែឧសភា ដល់ ខែតុលា'),
    topActivities: [
      localized('Half Dome hike', 'ដើរឡើងភ្នំហាហ្វដូម'),
      localized('Yosemite waterfalls', 'ទឹកធ្លាក់យ៉ូហ្សេមីទី'),
      localized('Glacier Point lookout', 'ទីតាំងមើលហ្គ្លេស៊ីអ៊ែរផូញ'),
      localized('Sequoia groves', 'ព្រៃសេវ៉ូយ៉ា'),
    ],
    latitude: 37.8651,
    longitude: -119.5383,
  },
]

/** Returns one destination by its id, or undefined if not found. */
export function getDestinationById(id: number): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}