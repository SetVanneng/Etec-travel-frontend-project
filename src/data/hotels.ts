// ---------------------------------------------------------------------------
// hotels.ts
// Mock/local data for hotels. Every hotel is linked to a destination
// through the "destinationId" field, so we can show "nearby hotels".
//
// Displayed text (name, location, description, facilities, room type names)
// is localized as { en, km } objects and resolved at render time with the
// i18n store's pick() helper, so cards/details re-render on language switch.
//
// `city` / `country` stay as canonical English strings used for filtering
// and search; countries are translated for display via the `countries.*`
// message keys. Room type names keep a stable English side (name.en) so
// existing bookings stay compatible.
// ---------------------------------------------------------------------------

import type { LocalizedText } from './localized'
import { localized } from './localized'

export interface RoomType {
  name: LocalizedText
  /** Price for one night in USD */
  price: number
  /** Room size in square meters */
  size: number
}

export interface Hotel {
  id: number
  name: LocalizedText
  /** Which destination this hotel belongs to (see destinations.ts) */
  destinationId: number
  location: LocalizedText
  city: string
  country: string
  rating: number
  /** Price for one night in USD (based on the cheapest room) */
  pricePerNight: number
  image: string
  gallery: string[]
  description: LocalizedText
  facilities: LocalizedText[]
  roomTypes: RoomType[]
  /** Whether rooms can be booked today (demo only) */
  available: boolean
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: localized('The Palm Oasis Resort', 'ផាម អូអេសស៊ីស រីសត'),
    destinationId: 1,
    location: localized('Seminyak Beach, Bali', 'ឆ្នេរសេមីញ៉ាក, បាលី'),
    city: 'Seminyak',
    country: 'Indonesia',
    rating: 4.8,
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Surrounded by tropical gardens and steps from the sand, The Palm Oasis offers private villas, an infinity pool and world-class spa treatments.',
      'ព័ទ្ធជុំវិញដោយសួនត្រូពិច និងជំហានពីឆ្នេរខ្សាច់ ផាម អូអេសស៊ីស ផ្តល់ជូនវីឡាឯកជន អាងហែលទឹកអ៊ីនហ្វីនីធី និងការព្យាបាលស្ប៉ាលំដាប់ពិភពលោក។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Outdoor pool', 'អាងហែលទឹកក្រៅផ្ទះ'),
      localized('Spa', 'ស្ប៉ា'),
      localized('Beach access', 'ចូលឆ្នេរផ្ទាល់'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Standard Room', 'បន្ទប់ស្តង់ដារ'), price: 140, size: 32 },
      { name: localized('Pool View Room', 'បន្ទប់ទិដ្ឋភាពអាងហែលទឹក'), price: 180, size: 40 },
      { name: localized('Private Villa', 'វីឡាឯកជន'), price: 320, size: 90 },
    ],
    available: true,
  },
  {
    id: 2,
    name: localized('Blue Horizon Suites', 'ប៊្លូ ហូរីហ្សឹន ស៊្វីត'),
    destinationId: 2,
    location: localized('Oia, Santorini', 'អូយ៉ា, សាន់តូរីនី'),
    city: 'Oia',
    country: 'Greece',
    rating: 4.9,
    pricePerNight: 240,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'White cave-style suites with private balconies over the caldera. Watch the famous Santorini sunset from your own plunge pool.',
      'ស៊្វីតបែបរូងភ្នំពណ៌ស ជាមួយយ៉រឯកជនពីលើកាល់ដេរ៉ា។ មើលថ្ងៃលិចសាន់តូរីនីដ៏ល្បី ពីអាងហែលទឹកផ្ទាល់ខ្លួនរបស់អ្នក។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Infinity pool', 'អាងហែលទឹកអ៊ីនហ្វីនីធី'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Jacuzzi', 'ហ្សាកូហ្សី'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Cave Suite', 'ស៊្វីតរូងភ្នំ'), price: 240, size: 35 },
      { name: localized('Caldera Suite', 'ស៊្វីតកាល់ដេរ៉ា'), price: 320, size: 48 },
      { name: localized('Honeymoon Villa', 'វីឡាថ្ងៃរៀបអាពាហ៍ពិពាហ៍'), price: 480, size: 75 },
    ],
    available: true,
  },
  {
    id: 3,
    name: localized('Alpine Peak Lodge', 'អាល់ផែន ភីក ឡុច'),
    destinationId: 3,
    location: localized('Zermatt, Swiss Alps', 'សឺរម៉ាត, ភ្នំអាល់ស្វីស'),
    city: 'Zermatt',
    country: 'Switzerland',
    rating: 4.9,
    pricePerNight: 260,
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Cozy wooden lodge with fireplaces, a heated sauna and direct views of the Matterhorn. Ski in, ski out in winter.',
      'ឡុចឈើដ៏កក់ក្តៅ ជាមួយចើងរកានកមដោ សូណាកម្តៅ និងទិដ្ឋភាពផ្ទាល់នៃភ្នំម៉ាត់តឺហន។ ជិះស្គីចេញចូលបានផ្ទាល់ពីសណ្ឋាគារនៅរដូវរងារ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Sauna', 'សូណា'),
      localized('Ski storage', 'កន្លែងទុកស្គី'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Fireplace lounge', 'បន្ទប់ចើងរកាកមដោ'),
    ],
    roomTypes: [
      { name: localized('Twin Room', 'បន្ទប់ភ្លោះ'), price: 260, size: 28 },
      { name: localized('Matterhorn View Suite', 'ស៊្វីតទិដ្ឋភាពម៉ាត់តឺហន'), price: 360, size: 45 },
      { name: localized('Family Chalet', 'ឈែឡេគ្រួសារ'), price: 520, size: 85 },
    ],
    available: true,
  },
  {
    id: 4,
    name: localized('Cedar Lake Retreat', 'សេដា ឡេក រីធីត'),
    destinationId: 4,
    location: localized('Banff National Park', 'ឧទ្យានជាតិបានហ្វ'),
    city: 'Banff',
    country: 'Canada',
    rating: 4.7,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A quiet retreat surrounded by pine forest with lake views, an outdoor fire pit and free shuttle to downtown Banff.',
      'កន្លែងសម្រាកស្ងាត់ ព័ទ្ធដោយព្រៃស្រល់ ជាមួយទិដ្ឋភាពបឹង កន្លែងអាំងភ្លើងក្រៅផ្ទះ និងរថយន្តដឹកជញ្ជូនឥតគិតថ្លៃទៅកណ្តាលទីក្រុងបានហ្វ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Hot tub', 'អាងទឹកក្តៅ'),
      localized('Lake view', 'ទិដ្ឋភាពបឹង'),
      localized('Free parking', 'ចំណតឥតគិតថ្លៃ'),
      localized('Hiking trails', 'ផ្លូវឡើងភ្នំ'),
    ],
    roomTypes: [
      { name: localized('Forest Room', 'បន្ទប់ព្រៃ'), price: 190, size: 30 },
      { name: localized('Lake View Room', 'បន្ទប់ទិដ្ឋភាពបឹង'), price: 240, size: 38 },
      { name: localized('Two Bedroom Cabin', 'ខាប៊ីនបន្ទប់ពីរ'), price: 380, size: 80 },
    ],
    available: true,
  },
  {
    id: 5,
    name: localized('Eiffel Grand Hotel', 'អេហ្វ្វែល ហ្គ្រេន ហូតែល'),
    destinationId: 5,
    location: localized('7th Arrondissement, Paris', 'សង្កាត់ទី ៧, ប៉ារីស'),
    city: 'Paris',
    country: 'France',
    rating: 4.6,
    pricePerNight: 210,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Classic Parisian elegance with a rooftop terrace, a five minute walk to the Eiffel Tower and breakfast served daily.',
      'ភាពឆើតឆាយបែបប៉ារីសបុរាណ ជាមួយថែរដំបូល ដើរ ៥ នាទីទៅអគ្គិសនីអេហ្វ្វែល និងអាហារពេលព្រឹករៀងរាល់ថ្ងៃ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Rooftop terrace', 'ថែរដំបូល'),
      localized('Bar', 'បារ'),
      localized('Room service', 'សេវាបន្ទប់'),
      localized('Elevator', 'ជណ្តើរយន្ត'),
    ],
    roomTypes: [
      { name: localized('Classic Room', 'បន្ទប់បុរាណ'), price: 210, size: 25 },
      { name: localized('Deluxe Room', 'បន្ទប់ឌឺឡឺហ្ស'), price: 280, size: 34 },
      { name: localized('Eiffel View Suite', 'ស៊្វីតទិដ្ឋភាពអេហ្វ្វែល'), price: 450, size: 60 },
    ],
    available: true,
  },
  {
    id: 6,
    name: localized('Sakura City Hotel', 'សាគូរ៉ា ស៊ីធី ហូតែល'),
    destinationId: 6,
    location: localized('Shinjuku, Tokyo', 'ស៊ីនជូគូ, តូក្យូ'),
    city: 'Tokyo',
    country: 'Japan',
    rating: 4.5,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Modern and compact rooms in the middle of Shinjuku, minutes from the train station, food streets and the famous neon lights.',
      'បន្ទប់ទំនើប និងតូចស្អាត នៅកណ្តាលស៊ីនជូគូ ប៉ុន្មាននាទីពីស្ថានីយរថភ្លើង ផ្លូវអាហារ និងពន្លឺអ៊ីយូនដ៏ល្បី។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('24h front desk', 'តុទទួលភ្ញៀវ ២៤ ម៉ោង'),
      localized('Laundry', 'បោកអ៊ុត'),
      localized('Vending machines', 'ម៉ាស៊ីនលក់ទំនិញស្វ័យប្រវត្តិ'),
      localized('Bicycle rental', 'កន្លែងជួលកង់'),
    ],
    roomTypes: [
      { name: localized('Single Compact', 'បន្ទប់តូចសម្រាប់មួយនាក់'), price: 150, size: 18 },
      { name: localized('Double Room', 'បន្ទប់គ្រែធំ'), price: 200, size: 24 },
      { name: localized('Suite with City View', 'ស៊្វីតទិដ្ឋភាពទីក្រុង'), price: 340, size: 50 },
    ],
    available: true,
  },
  {
    id: 7,
    name: localized('Colosseum View Hotel', 'កូឡូសេអ៊ូម វ្យូ ហូតែល'),
    destinationId: 7,
    location: localized('Monti, Rome', 'ម៉ុនទី, រ៉ូម'),
    city: 'Rome',
    country: 'Italy',
    rating: 4.7,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Rooms with balconies looking directly onto the Colosseum. A short walk to Roman Forum and the best trattorias of Monti.',
      'បន្ទប់ជាមួយយ៉រមើលឃើញកូឡូសេអ៊ូមផ្ទាល់។ ដើរបន្តិចទៅហ្វ៊រ៉ុមរ៉ូម៉ាំង និងភោជនីយដ្ឋានត្រាតូរីយ៉ាល្អបំផុតនៅម៉ុនទី។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Bar', 'បារ'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
      localized('Concierge', 'សេវាកុងសៀរហ្ស'),
    ],
    roomTypes: [
      { name: localized('Standard Room', 'បន្ទប់ស្តង់ដារ'), price: 180, size: 26 },
      { name: localized('Landmark View Room', 'បន្ទប់ទិដ្ឋភាពវិមាន'), price: 260, size: 34 },
      { name: localized('Executive Suite', 'ស៊្វីតថ្នាក់ប្រតិបត្តិ'), price: 400, size: 55 },
    ],
    available: true,
  },
  {
    id: 8,
    name: localized('Angkor Heritage & Spa', 'អង្គរ ហេរីតេជ និង ស្ប៉ា'),
    destinationId: 8,
    location: localized('Siem Reap, Cambodia', 'សៀមរាប, កម្ពុជា'),
    city: 'Siem Reap',
    country: 'Cambodia',
    rating: 4.6,
    pricePerNight: 80,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A beautiful boutique hotel with a pool, spa and free tuk-tuk service to the Angkor temples. Great value for exploring Cambodia.',
      'សណ្ឋាគារប៊ូទីកដ៏ស្រស់ស្អាត ជាមួយអាងហែលទឹក ស្ប៉ា និងសេវាទុកទុកឥតគិតថ្លៃទៅប្រាសាទអង្គរ។ តម្លៃសមរម្យសម្រាប់ការរុករកកម្ពុជា។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Pool', 'អាងហែលទឹក'),
      localized('Spa', 'ស្ប៉ា'),
      localized('Free airport pick-up', 'ទទួលអាកាសយានដ្ឋានឥតគិតថ្លៃ'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Bike rental', 'កន្លែងជួលកង់'),
    ],
    roomTypes: [
      { name: localized('Garden Room', 'បន្ទប់សួនច្បារ'), price: 80, size: 30 },
      { name: localized('Pool View Room', 'បន្ទប់ទិដ្ឋភាពអាងហែលទឹក'), price: 110, size: 38 },
      { name: localized('Temple Suite', 'ស៊្វីតប្រាសាទ'), price: 180, size: 60 },
    ],
    available: true,
  },
  {
    id: 9,
    name: localized('Aurora Sky Hotel', 'អូរ៉ូរ៉ា ស្កាយ ហូតែល'),
    destinationId: 13,
    location: localized('Downtown Reykjavik', 'កណ្តាលទីក្រុងរេកយ៉ាវិក'),
    city: 'Reykjavik',
    country: 'Iceland',
    rating: 4.7,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A sleek hotel in the heart of Reykjavik with geothermal-heated rooms, a rooftop bar and easy access to northern-lights tours.',
      'សណ្ឋាគារទំនើបកណ្តាលក្រុងរេកយ៉ាវិក ជាមួយបន្ទប់កម្តៅភូគព្ភសាស្ត្រ បារដំបូល និងភាពងាយស្រួលទៅកម្មវិធីទស្សនាពន្លឺប៉ូលែស។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Geothermal spa', 'ស្ប៉ាកម្ដៅក្រោមដី'),
      localized('Rooftop bar', 'បារដំបូលអាគារ'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Aurora wake-up call', 'សេវាដាស់មើលពន្លឺប៉ូលែស'),
    ],
    roomTypes: [
      { name: localized('Standard Room', 'បន្ទប់ស្តង់ដារ'), price: 190, size: 28 },
      { name: localized('Aurora View Room', 'បន្ទប់ទិដ្ឋភាពពន្លឺប៉ូលែស'), price: 260, size: 36 },
      { name: localized('Panorama Suite', 'ស៊្វីតប៉ាណូរ៉ាម៉ា'), price: 400, size: 60 },
    ],
    available: true,
  },
  {
    id: 10,
    name: localized('Old Quarter Garden Hotel', 'អូល ខ័រថឺ ហ្គាដេន ហូតែល'),
    destinationId: 14,
    location: localized('Hoan Kiem, Hanoi', 'ហួនគៀម, ហាណូយ'),
    city: 'Hanoi',
    country: 'Vietnam',
    rating: 4.6,
    pricePerNight: 90,
    image: 'https://images.unsplash.com/photo-1560200353-ce0a76b1d438?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560200353-ce0a76b1d438?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A charming boutique stay moments from Hoan Kiem Lake, with a roof garden, cozy family rooms and a famous pho breakfast bar.',
      'ការស្នាក់នៅប៊ូទីកដ៏ទាក់ទាញ ប៉ុន្មាននាទីពីបឹងហួនគៀម ជាមួយសួនដំបូល បន្ទប់គ្រួសារកក់ក្តៅ និងបារអាហារពេលព្រឹកផូដ៏ល្បី។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Rooftop garden', 'សួនដំបូលអាគារ'),
      localized('Bike rental', 'កន្លែងជួលកង់'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('City Room', 'បន្ទប់ទីក្រុង'), price: 90, size: 24 },
      { name: localized('Lake View Room', 'បន្ទប់ទិដ្ឋភាពបឹង'), price: 120, size: 32 },
      { name: localized('Family Suite', 'ស៊្វីតគ្រួសារ'), price: 190, size: 55 },
    ],
    available: true,
  },
  {
    id: 11,
    name: localized('Alfama Sunset Suites', 'អាល់ហ្វាម៉ា សាន់សេត ស៊្វីត'),
    destinationId: 15,
    location: localized('Alfama, Lisbon', 'អាល់ហ្វាម៉ា, លីសបូន'),
    city: 'Lisbon',
    country: 'Portugal',
    rating: 4.8,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519449556851-5720b33024e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Sun-drenched suites in historic Alfama with terraces over terracotta rooftops, a short stroll from the riverfront and trams.',
      'ស៊្វីតពោរពេញដោយពន្លឺព្រះអាទិត្យ ក្នុងអាល់ហ្វាម៉ាប្រវត្តិសាស្ត្រ ជាមួយថែរពីលើដំបូលដីឥដ្ឋ ដើរបន្តិចពីមាត់ទន្លេ និងរថភ្លើងវ៉ាង។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Terrace with view', 'ថែរមើលទេសភាព'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Concierge', 'សេវាកុងសៀរហ្ស'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Tram View Room', 'បន្ទប់ទិដ្ឋភាពរថភ្លើងវ៉ាង'), price: 150, size: 28 },
      { name: localized('River View Suite', 'ស៊្វីតទិដ្ឋភាពទន្លេ'), price: 210, size: 42 },
      { name: localized('Rooftop Penthouse', 'ផេនថាវសដំបូលអាគារ'), price: 330, size: 70 },
    ],
    available: true,
  },
  {
    id: 12,
    name: localized('Angkor Palm Heritage Hotel', 'អង្គរ ផាម ហេរីតេជ ហូតែល'),
    destinationId: 16,
    location: localized('Old Market District, Siem Reap', 'តំបន់ផ្សារចាស់, សៀមរាប'),
    city: 'Siem Reap',
    country: 'Cambodia',
    rating: 4.8,
    pricePerNight: 120,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A beautiful boutique hotel close to the Old Market with a palm-fringed pool, spa and free tuk-tuk service to the Angkor temple complex.',
      'សណ្ឋាគារប៊ូទីកដ៏ស្រស់ស្អាត ជិតផ្សារចាស់ ជាមួយអាងហែលទឹកព័ទ្ធដើមត្នោត ស្ប៉ា និងសេវាទុកទុកឥតគិតថ្លៃទៅប្រាសាទអង្គរ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Pool', 'អាងហែលទឹក'),
      localized('Spa', 'ស្ប៉ា'),
      localized('Free tuk-tuk shuttle', 'សេវាទុកទុកឥតគិតថ្លៃ'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Bike rental', 'កន្លែងជួលកង់'),
    ],
    roomTypes: [
      { name: localized('Temple Garden Room', 'បន្ទប់សួនប្រាសាទ'), price: 120, size: 30 },
      { name: localized('Pool View Room', 'បន្ទប់ទិដ្ឋភាពអាងហែលទឹក'), price: 160, size: 38 },
      { name: localized('Angkor Royal Suite', 'ស៊្វីតរាជវង្សអង្គរ'), price: 260, size: 60 },
    ],
    available: true,
  },
  {
    id: 13,
    name: localized('Table Bay Boutique', 'តេបល បេ ប៊ូទីក'),
    destinationId: 17,
    location: localized('V&A Waterfront, Cape Town', 'កំពង់ផែវីអេអេ, ខេបថោន'),
    city: 'Cape Town',
    country: 'South Africa',
    rating: 4.7,
    pricePerNight: 170,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A stylish waterfront hotel with tables looking onto the harbour, rooftop infinity pool and shuttles to Table Mountain.',
      'សណ្ឋាគារមាត់ទឹកដ៏ទំនើប ជាមួយរានហាលមើលកំពង់ផែ អាងហែលទឹកអ៊ីនហ្វីនីធីលើដំបូល និងរថយន្តដឹកទៅភ្នំតេបល។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Infinity pool', 'អាងហែលទឹកអ៊ីនហ្វីនីធី'),
      localized('Harbour views', 'ទិដ្ឋភាពកំពង់ផែ'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Free parking', 'ចំណតឥតគិតថ្លៃ'),
    ],
    roomTypes: [
      { name: localized('Harbour Room', 'បន្ទប់កំពង់ផែ'), price: 170, size: 30 },
      { name: localized('Mountain View Room', 'បន្ទប់ទិដ្ឋភាពភ្នំ'), price: 220, size: 40 },
      { name: localized('Waterfront Suite', 'ស៊្វីតមាត់ទឹក'), price: 340, size: 64 },
    ],
    available: true,
  },
  {
    id: 14,
    name: localized('Bamboo Garden Ryokan', 'បាំប៊ូ ហ្គាដេន រ្យ៉ូកាន'),
    destinationId: 18,
    location: localized('Higashiyama, Kyoto', 'ហ៊ីហ្គាស៊ីយ៉ាម៉ា, ក្យូតូ'),
    city: 'Kyoto',
    country: 'Japan',
    rating: 4.9,
    pricePerNight: 200,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A traditional ryokan with tatami floors, garden hot-spring baths and kaiseki dinner, steps from the Higashiyama temples.',
      'រ្យ៉ូកានបុរាណ ជាមួយកម្រាលតាតាមី អាងទឹកក្តៅក្នុងសួន និងអាហារពេលល្ងាចកៃសេគី ប៉ុន្មានជំហានពីប្រាសាទហ៊ីហ្គាស៊ីយ៉ាម៉ា។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Onsen bath', 'ងូតអុនសេន'),
      localized('Garden', 'សួនច្បារ'),
      localized('Kaiseki dining', 'អាហារកៃសេគី'),
      localized('Tea ceremony', 'ពិធីតែបុរាណជប៉ុន'),
    ],
    roomTypes: [
      { name: localized('Tatami Room', 'បន្ទប់តាតាមី'), price: 200, size: 32 },
      { name: localized('Garden View Room', 'បន្ទប់ទិដ្ឋភាពសួន'), price: 270, size: 42 },
      { name: localized('Deluxe Ryokan Suite', 'ស៊្វីតរ្យ៉ូកានឌឺឡឺហ្ស'), price: 420, size: 68 },
    ],
    available: true,
  },
  {
    id: 15,
    name: localized('Burj Skyline Hotel', 'បឺជ ស្កាយឡាញ ហូតែល'),
    destinationId: 19,
    location: localized('Downtown Dubai', 'កណ្តាលទីក្រុងឌូបៃ'),
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.8,
    pricePerNight: 260,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A modern high-rise with panoramic views of the Burj Khalifa, an infinity pool on the sky deck and a rooftop restaurant.',
      'អគារខ្ពស់ទំនើប ជាមួយទិដ្ឋភាពប៉ាណូរ៉ាម៉ានៃអគារបឺជខាលីហ្វា អាងហែលទឹកអ៊ីនហ្វីនីធីលើនាវាមេឃ និងភោជនីយដ្ឋានដំបូល។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Infinity pool', 'អាងហែលទឹកអ៊ីនហ្វីនីធី'),
      localized('Gym & spa', 'កន្លែងហាត់ប្រាណ និងស្ប៉ា'),
      localized('Rooftop restaurant', 'ភោជនីយដ្ឋានដំបូលអាគារ'),
      localized('Valet parking', 'សេវាចតរថយន្តវ៉ាឡេ'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('City View Room', 'បន្ទប់ទិដ្ឋភាពទីក្រុង'), price: 260, size: 30 },
      { name: localized('Fountain View Room', 'បន្ទប់ទិដ្ឋភាពប្រភពទឹក'), price: 340, size: 42 },
      { name: localized('Royal Skyline Suite', 'ស៊្វីតស្កាយឡាញរាជ'), price: 620, size: 85 },
    ],
    available: true,
  },
  {
    id: 16,
    name: localized('Gaud\u00ed Gallery Hotel', 'ហ្គោឌី ហ្គាឡឺរី ហូតែល'),
    destinationId: 20,
    location: localized('Eixample, Barcelona', 'អៃសាំប្លេ, បារសេឡូណា'),
    city: 'Barcelona',
    country: 'Spain',
    rating: 4.7,
    pricePerNight: 160,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A design-forward boutique hotel two blocks from La Sagrada Fam\u00edlia, with a rooftop pool and tapas bar.',
      'សណ្ឋាគារប៊ូទីកមានការរចនាទំនើប ពីរប្លុកពីសាក្រាដាហ្វាមីលីយ៉ា ជាមួយអាងហែលទឹកដំបូល និងបារតាបាស។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Rooftop pool', 'អាងហែលទឹកដំបូលអាគារ'),
      localized('Tapas bar', 'បារតាបាស'),
      localized('Bicycle rental', 'កន្លែងជួលកង់'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Standard Room', 'បន្ទប់ស្តង់ដារ'), price: 160, size: 26 },
      { name: localized('Modernist Suite', 'ស៊្វីតម៉ូឌឺននីស'), price: 220, size: 36 },
      { name: localized('Terrace Penthouse', 'ផេនថាវសមានថែរ'), price: 360, size: 60 },
    ],
    available: true,
  },
  {
    id: 17,
    name: localized('Harbour Lights Hotel', 'ហាបឺ ឡៃត ហូតែល'),
    destinationId: 21,
    location: localized('Circular Quay, Sydney', 'សឺកឃ្យូឡាគេ, ស៊ីដនី'),
    city: 'Sydney',
    country: 'Australia',
    rating: 4.7,
    pricePerNight: 200,
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Facing the Opera House and Harbour Bridge, this waterfront hotel offers harbour-view rooms and a ferry-friendly location.',
      'ប្រឈមមុខអូប៉េរ៉ាហាវស៍ និងស្ពានហាបឺរ សណ្ឋាគារមាត់ទឹកនេះផ្តល់ជូនបន្ទប់ទិដ្ឋភាពកំពង់ផែ និងទីតាំងងាយស្រួលសម្រាប់ជិះសាឡាង។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Harbour views', 'ទិដ្ឋភាពកំពង់ផែ'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Gym', 'កន្លែងហាត់ប្រាណ'),
      localized('Concierge', 'សេវាកុងសៀរហ្ស'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('City Room', 'បន្ទប់ទីក្រុង'), price: 200, size: 28 },
      { name: localized('Harbour View Room', 'បន្ទប់ទិដ្ឋភាពកំពង់ផែ'), price: 280, size: 40 },
      { name: localized('Opera Suite', 'ស៊្វីតអូប៉េរ៉ា'), price: 450, size: 70 },
    ],
    available: true,
  },
  {
    id: 18,
    name: localized('Skyline Central Hotel', 'ស្កាយឡាញ សេនត្រាល់ ហូតែល'),
    destinationId: 22,
    location: localized('Midtown Manhattan', 'កណ្តាលក្រុងម៉ានហាតាន'),
    city: 'New York City',
    country: 'USA',
    rating: 4.6,
    pricePerNight: 240,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A polished Midtown hotel a short walk from Times Square and Central Park, with a rooftop bar and 24h gym.',
      'សណ្ឋាគារម៉ានហាតានដ៏ឆើតឆាយ ដើរបន្តិចពីទីលានថាមស៍ស្គែរ និងសេនត្រាល់ផាក ជាមួយបារដំបូល និងកន្លែងហាត់ប្រាណ ២៤ ម៉ោង។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Rooftop bar', 'បារដំបូលអាគារ'),
      localized('24h gym', 'កន្លែងហាត់ប្រាណ ២៤ ម៉ោង'),
      localized('Business centre', 'មជ្ឈមណ្ឌលធុរកិច្ច'),
      localized('Concierge', 'សេវាកុងសៀរហ្ស'),
    ],
    roomTypes: [
      { name: localized('King Room', 'បន្ទប់គីងស៍'), price: 240, size: 26 },
      { name: localized('Skyline View Room', 'បន្ទប់ទិដ្ឋភាពស្កាយឡាញ'), price: 320, size: 36 },
      { name: localized('Broadway Suite', 'ស៊្វីតប្រូដវេយ'), price: 520, size: 65 },
    ],
    available: true,
  },
  {
    id: 19,
    name: localized('Andes Gateway Lodge', 'អង់ដេស ហ្គេតវេ ឡុច'),
    destinationId: 23,
    location: localized('Aguas Calientes, Machu Picchu', 'អាហ្គ័រ កាលៀនតេស, ម៉ាជូភីជូ'),
    city: 'Aguas Calientes',
    country: 'Peru',
    rating: 4.7,
    pricePerNight: 110,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A cozy lodge at the gateway to Machu Picchu with hot showers, a warm dining room and early shuttle booking to the citadel.',
      'ឡុចកក់ក្តៅ នៅផ្លូវចូលម៉ាជូភីជូ ជាមួយទឹកក្តៅងូត បន្ទប់ទទួលទានអាហារកក់ក្តៅ និងសេវាកក់រថយន្តព្រឹកព្រលឹមទៅបន្ទាយ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Hot tub', 'អាងទឹកក្តៅ'),
      localized('Tour desk', 'តុព័ត៌មានដំណើរកម្សាន្ត'),
      localized('Laundry', 'បោកអ៊ុត'),
    ],
    roomTypes: [
      { name: localized('Mountain Room', 'បន្ទប់ភ្នំ'), price: 110, size: 24 },
      { name: localized('Vilcanota View Room', 'បន្ទប់ទិដ្ឋភាពវីលកាណូតា'), price: 150, size: 32 },
      { name: localized('Trekker Suite', 'ស៊្វីតអ្នកដើរផ្លូវឆ្ងាយ'), price: 240, size: 55 },
    ],
    available: true,
  },
  {
    id: 20,
    name: localized('Estancia del Paine', 'អេស្តានស៊ីយ៉ា ដេល ប៉ាអ៊ិន'),
    destinationId: 24,
    location: localized('Torres del Paine, Patagonia', 'តូរ៉េសដេលប៉ាអ៊ិន, ប៉ាតាហ្គោនៀ'),
    city: 'Puerto Natales',
    country: 'Chile',
    rating: 4.9,
    pricePerNight: 220,
    image: 'https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A rustic-chic estancia with roaring fires, panoramic windows onto the granite peaks and packed lunches for the trek.',
      'អេស្តានស៊ីយ៉ាបែបរចនាទំនើប ជាមួយអាំងភ្លើងឆេះសន្ធោសន្ធៅ បង្អួចប៉ាណូរ៉ាម៉ាមើលកំពូលភ្នំថ្មក្រានីត និងអាហារថ្ងៃត្រង់កញ្ចប់សម្រាប់ឡើងភ្នំ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('In-house restaurant', 'ភោជនីយដ្ឋានក្នុងសណ្ឋាគារ'),
      localized('Trekking guides', 'មគ្គុទេសក៍ឡើងភ្នំ'),
      localized('Fireplace lounge', 'បន្ទប់ចើងរកាកមដោ'),
      localized('Heating', 'កម្ដៅ'),
    ],
    roomTypes: [
      { name: localized('Steppe Room', 'បន្ទប់ស្តេភ'), price: 220, size: 30 },
      { name: localized('Peak View Room', 'បន្ទប់ទិដ្ឋភាពកំពូលភ្នំ'), price: 300, size: 42 },
      { name: localized('Deluxe Estancia Suite', 'ស៊្វីតអេស្តានស៊ីយ៉ាឌឺឡឺហ្ស'), price: 480, size: 70 },
    ],
    available: true,
  },
  {
    id: 21,
    name: localized('Andaman Pearl Resort', 'អង់ដាម៉ាន ភឺល រីសត'),
    destinationId: 25,
    location: localized('Patong Beach, Phuket', 'ឆ្នេរប៉ាតង, ភូកេត'),
    city: 'Phuket',
    country: 'Thailand',
    rating: 4.6,
    pricePerNight: 130,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Tropical resort with palm-fringed pools, an on-site spa and a stroll away from Patong beach and nightlife.',
      'រីសតត្រូពិច ជាមួយអាងហែលទឹកព័ទ្ធដើមត្នោត ស្ប៉ាក្នុងទីតាំង និងដើរបន្តិចទៅឆ្នេរប៉ាតង និងជីវិតរាត្រី។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Outdoor pool', 'អាងហែលទឹកក្រៅផ្ទះ'),
      localized('Spa', 'ស្ប៉ា'),
      localized('Beach access', 'ចូលឆ្នេរផ្ទាល់'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Garden Room', 'បន្ទប់សួនច្បារ'), price: 130, size: 34 },
      { name: localized('Pool Access Room', 'បន្ទប់ចូលអាងផ្ទាល់'), price: 180, size: 45 },
      { name: localized('Beachfront Villa', 'វីឡាមាត់ឆ្នេរ'), price: 300, size: 80 },
    ],
    available: true,
  },
  {
    id: 22,
    name: localized('Rose Stone Desert Camp', 'រ៉ូស ស្តូន ឌីសឺត ខេមភ'),
    destinationId: 26,
    location: localized('Wadi Musa, Petra', 'វ៉ាឌីមូសា, ប៉េត្រា'),
    city: 'Wadi Musa',
    country: 'Jordan',
    rating: 4.8,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'A boutique desert lodge carved into the sandstone hills, minutes from the Petra entrance, with star-gazing terraces.',
      'ឡុចវាលខ្សាច់ប៊ូទីក ឆ្លាក់ក្នុងភ្នំថ្មខ្សាច់ ប៉ុន្មាននាទីពីច្រកចូលប៉េត្រា ជាមួយថែរមើលផ្កាយ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Bonfire terrace', 'ថែរភ្លើងបោនហ្វាយ'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
      localized('Tour desk', 'តុព័ត៌មានដំណើរកម្សាន្ត'),
    ],
    roomTypes: [
      { name: localized('Sandstone Room', 'បន្ទប់ថ្មខ្សាច់'), price: 150, size: 28 },
      { name: localized('Nabataean Suite', 'ស៊្វីតណាបាតេន'), price: 210, size: 40 },
      { name: localized('Desert Tent Deluxe', 'តង់វាលខ្សាច់ឌឺឡឺហ្ស'), price: 350, size: 65 },
    ],
    available: true,
  },
  {
    id: 23,
    name: localized('Cliffside Contessa', 'គ្លីហ្វសាយដ៍ កុងតេសា'),
    destinationId: 27,
    location: localized('Positano, Amalfi Coast', 'ប៉ូហ្សីតាណូ, ឆ្នេរអាម៉ាលហ្វី'),
    city: 'Positano',
    country: 'Italy',
    rating: 4.9,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Terracotta-balconied rooms cascading down the Positano cliffs, each with sweeping views over the sea and lemon groves.',
      'បន្ទប់យ៉រដីឥដ្ឋ ចុះបណ្តោយច្រាំងថ្មប៉ូហ្សីតាណូ ស៊្វីតនីមួយៗមានទិដ្ឋភាពសមុទ្រ និងចំការក្រូចឆ្មារដ៏វែងឆ្ងាយ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Infinity pool', 'អាងហែលទឹកអ៊ីនហ្វីនីធី'),
      localized('Sea-view terrace', 'ថែរមើលសមុទ្រ'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Concierge', 'សេវាកុងសៀរហ្ស'),
    ],
    roomTypes: [
      { name: localized('Coastal Room', 'បន្ទប់ឆ្នេរ'), price: 280, size: 32 },
      { name: localized('Sea View Suite', 'ស៊្វីតទិដ្ឋភាពសមុទ្រ'), price: 380, size: 46 },
      { name: localized('Cliffside Penthouse', 'ផេនថាវសមាត់ច្រាំងថ្ម'), price: 560, size: 80 },
    ],
    available: true,
  },
  {
    id: 24,
    name: localized('Sierra Pines Lodge', 'ស៊ីអេរ៉ា ប៉ាញ ឡុច'),
    destinationId: 28,
    location: localized('Yosemite Valley', 'ជ្រលងភ្នំយ៉ូហ្សេមីទី'),
    city: 'Yosemite',
    country: 'USA',
    rating: 4.7,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Woodsy cabins among the pines with a riverfront fire pit, gear storage for hikers and killer views of El Capitan.',
      'ខាប៊ីនឈើក្នុងព្រៃស្រល់ ជាមួយកន្លែងអាំងភ្លើងមាត់ទន្លេ កន្លែងទុកឧបករណ៍សម្រាប់អ្នកឡើងភ្នំ និងទិដ្ឋភាពដ៏អស្ចារ្យនៃភ្នំអេលកាពីតាន។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Fire pit', 'កន្លែងអាំងភ្លើង'),
      localized('Hiking trail access', 'ចូលផ្លូវឡើងភ្នំ'),
      localized('Free parking', 'ចំណតឥតគិតថ្លៃ'),
      localized('BBQ area', 'កន្លែងស្ទីកអាំង'),
    ],
    roomTypes: [
      { name: localized('Pine Cabin', 'ខាប៊ីនដើមស្រល់'), price: 190, size: 28 },
      { name: localized('River View Cabin', 'ខាប៊ីនទិដ្ឋភាពទន្លេ'), price: 250, size: 40 },
      { name: localized('Family Log Cabin', 'ខាប៊ីនឈើគ្រួសារ'), price: 400, size: 70 },
    ],
    available: true,
  },
  {
    id: 25,
    name: localized('Coral Reef Overwater Resort', 'កូរ៉ាល រីហ្វ អូវ៉ើវ៉ាធឺ រីសត'),
    destinationId: 10,
    location: localized('North Mal\u00e9 Atoll', 'កោះថ្មប៉ប្រះទឹកម៉ាឡេខាងជើង'),
    city: 'Mal\u00e9',
    country: 'Maldives',
    rating: 4.9,
    pricePerNight: 420,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Stilted overwater bungalows above a vibrant house reef, steps from the best scuba and snorkelling spots in the Maldives.',
      'ផ្ទះឈើលើទឹកមានបង្គោល ពីលើថ្មប៉ប្រះទឹករស់រវើក ប៉ុន្មានជំហានពីកន្លែងមុជទឹកស្ក៊ូបា និងស្នូកឃែលល្អបំផុតនៅម៉ាល់ឌីវ។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Overwater villas', 'ផ្ទះឈើលើទឹក'),
      localized('House reef diving', 'មុជទឹកថ្មប៉ប្រះទឹក'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
      localized('Glass-bottom kayaks', 'កាយ៉ាកបាតកែវ'),
      localized('Air conditioning', 'ម៉ាស៊ីនត្រជាក់'),
    ],
    roomTypes: [
      { name: localized('Overwater Bungalow', 'ផ្ទះឈើលើទឹក'), price: 420, size: 45 },
      { name: localized('Reef View Villa', 'វីឡាទិដ្ឋភាពថ្មប៉ប្រះទឹក'), price: 520, size: 60 },
      { name: localized('Royal Oasis Suite', 'ស៊្វីតអូអេសស៊ីសរាជ'), price: 890, size: 110 },
    ],
    available: true,
  },
  {
    id: 26,
    name: localized('Jungle Canopy Eco Resort', 'ចាងហ្គល កាណូពី អេកូ រីសត'),
    destinationId: 12,
    location: localized('Arenal, La Fortuna', 'អារេណាល, ឡាហ្វ័រទូណា'),
    city: 'La Fortuna',
    country: 'Costa Rica',
    rating: 4.8,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1495876498332-20385b523ae2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495876498332-20385b523ae2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description: localized(
      'Eco-friendly lodges hidden in the rainforest canopy, right by the Arenal volcano and minutes from the famous zip-line circuits.',
      'ឡុចមិត្តភាពបរិស្ថាន លាក់នៅក្នុងដំបូលព្រៃត្រូពិច ជាប់ភ្នំភ្លើងអារេណាល និងប៉ុន្មាននាទីពីផ្លូវជិះខ្សែកាបដ៏ល្បី។'
    ),
    facilities: [
      localized('Free Wi-Fi', 'វ៉ាយហ្វាយឥតគិតថ្លៃ'),
      localized('Jungle pool', 'អាងហែលទឹកក្នុងព្រៃ'),
      localized('Zip-line operator on site', 'សេវាជិះខ្សែកាបក្នុងទីតាំង'),
      localized('Hot springs', 'ទឹកក្តៅធម្មជាតិ'),
      localized('Bird watching deck', 'កន្លែងមើលបក្សី'),
      localized('Restaurant', 'ភោជនីយដ្ឋាន'),
    ],
    roomTypes: [
      { name: localized('Canopy Cabin', 'ខាប៊ីនលើដងព្រៃ'), price: 150, size: 30 },
      { name: localized('Volcano View Room', 'បន្ទប់ទិដ្ឋភាពភ្នំភ្លើង'), price: 210, size: 40 },
      { name: localized('Rainforest Treehouse', 'ផ្ទះលើដើមឈើក្នុងព្រៃត្រូពិច'), price: 330, size: 65 },
    ],
    available: true,
  },
]

/** Returns one hotel by its id, or undefined if not found. */
export function getHotelById(id: number): Hotel | undefined {
  return hotels.find((hotel) => hotel.id === id)
}

/** Returns all hotels for a given destination id. */
export function getHotelsByDestination(destinationId: number): Hotel[] {
  return hotels.filter((hotel) => hotel.destinationId === destinationId)
}