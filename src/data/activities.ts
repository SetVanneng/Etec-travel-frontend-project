// ---------------------------------------------------------------------------
// activities.ts
// Mock/local data for travel activities and experiences.
// Textual fields (name, location, duration, description, highlights) are
// localized as { en, km } objects and resolved at render time with the i18n
// store's pick() helper, so cards/details re-render on language switch.
// ---------------------------------------------------------------------------

import type { LocalizedText } from './localized'
import { localized } from './localized'

export type ActivityCategory =
  | 'Hiking'
  | 'Diving'
  | 'City Tours'
  | 'Camping'
  | 'Food Tours'
  | 'Cultural Tours'
  | 'Sailing'
  | 'Adventure'

export interface Activity {
  id: number
  name: LocalizedText
  location: LocalizedText
  /** Which destination (see destinations.ts) this activity belongs to. */
  destinationId: number
  /** Price per person in USD */
  price: number
  /** How long the experience lasts, e.g. "4 hours" */
  duration: LocalizedText
  rating: number
  image: string
  description: LocalizedText
  category: ActivityCategory
  highlights: LocalizedText[]
}

export const activities: Activity[] = [
  {
    id: 1,
    name: localized('Alpine Hiking Adventure', 'ដំណើរឡើងភ្នំអាល់ផែន'),
    location: localized('Zermatt, Swiss Alps', 'សឺរម៉ាត, ភ្នំអាល់ស្វីស'),
    destinationId: 3,
    price: 85,
    duration: localized('8 hours', '៨ ម៉ោង'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A guided full-day hike through alpine meadows with panoramic views of the Matterhorn. Includes a mountain guide and packed lunch.',
      'ការឡើងភ្នំពេញមួយថ្ងៃដែលមានមគ្គុទេសក៍ ឆ្លងកាត់វាលស្មៅភ្នំអាល់ ជាមួយទិដ្ឋភាពប៉ាណូរ៉ាម៉ានៃភ្នំម៉ាត់តឺហន។ រួមមានមគ្គុទេសក៍ភ្នំ និងអាហារថ្ងៃត្រង់កញ្ចប់។'
    ),
    category: 'Hiking',
    highlights: [
      localized('Professional guide', 'មគ្គុទេសក៍ជំនាញ'),
      localized('Matterhorn views', 'ទិដ្ឋភាពភ្នំម៉ាត់តឺហន'),
      localized('Lunch included', 'រួមបញ្ចូលអាហារថ្ងៃត្រង់'),
      localized('Small group', 'ក្រុមតូច'),
    ],
  },
  {
    id: 2,
    name: localized('Discover Scuba Diving', 'ស្វែងយល់ការមុជទឹកស្ក៊ូបា'),
    location: localized('Maldives', 'ម៉ាល់ឌីវ'),
    destinationId: 10,
    price: 120,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A beginner-friendly dive in turquoise water with colourful reefs, turtles and tropical fish. All gear and a certified instructor included.',
      'ការមុជទឹកសាកសមសម្រាប់អ្នកចាប់ផ្តើមដំបូង ក្នុងទឹកថ្លាពណ៌ខៀវ ជាមួយថ្មប៉ប្រះទឹកចម្រុះពណ៌ អណ្តើក និងត្រីត្រូពិច។ រួមមានឧបករណ៍ទាំងអស់ និងគ្រូបង្គោលដែលមានការទទួលស្គាល់។'
    ),
    category: 'Diving',
    highlights: [
      localized('Beginner friendly', 'សាកសមសម្រាប់អ្នកចាប់ផ្តើម'),
      localized('All equipment', 'ឧបករណ៍ទាំងអស់'),
      localized('Certified instructor', 'គ្រូបង្គោលមានការទទួលស្គាល់'),
      localized('Underwater photos', 'រូបថតក្រោមទឹក'),
    ],
  },
  {
    id: 3,
    name: localized('Paris City Walking Tour', 'ដំណើរដើរកម្សាន្តក្នុងទីក្រុងប៉ារីស'),
    location: localized('Paris, France', 'ប៉ារីស, បារាំង'),
    destinationId: 5,
    price: 45,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Walk through hidden courtyards, along the Seine and past the Eiffel Tower with a local storyteller who shares Parisian secrets.',
      'ដើរកាត់រានហាលលាក់កំបាំង តាមដងទន្លេសេន និងកាត់អគ្គិសនីអេហ្វ្វែល ជាមួយអ្នកនិទានរឿងក្នុងស្រុក ដែលចែករំលែកអាថ៌កំបាំងរបស់ប៉ារីស។'
    ),
    category: 'City Tours',
    highlights: [
      localized('Local guide', 'មគ្គុទេសក៍ក្នុងស្រុក'),
      localized('Small group', 'ក្រុមតូច'),
      localized('Cultural stories', 'រឿងរ៉ាវវប្បធម៌'),
      localized('Photo stops', 'កន្លែងថតរូប'),
    ],
  },
  {
    id: 4,
    name: localized('Lakefront Camping Weekend', 'ចុងសប្តាហ៍បោះតង់ក្បែរបឹង'),
    location: localized('Banff, Canada', 'បានហ្វ, កាណាដា'),
    destinationId: 4,
    price: 95,
    duration: localized('2 days', '២ ថ្ងៃ'),
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Camp under the stars next to a turquoise lake. Includes tent, sleeping bags, campfire dinner and a sunrise paddle.',
      'បោះតង់ក្រោមផ្កាយ ក្បែរបឹងថ្លាពណ៌ខៀវខ្ចី។ រួមមានតង់ ស្រោមដេក អាហារពេលល្ងាចបង្កាត់ភ្លើង និងការជិះកាណូមើលថ្ងៃរះ។'
    ),
    category: 'Camping',
    highlights: [
      localized('Tent and gear included', 'រួមមានតង់ និងឧបករណ៍'),
      localized('Campfire dinner', 'អាហារពេលល្ងាចបង្កាត់ភ្លើង'),
      localized('Sunrise canoe', 'ជិះកាណូមើលថ្ងៃរះ'),
      localized('Stargazing', 'មើលផ្កាយ'),
    ],
  },
  {
    id: 5,
    name: localized('Tokyo Street Food Tour', 'ដំណើរកម្សាន្តអាហារតាមដងផ្លូវតូក្យូ'),
    location: localized('Tokyo, Japan', 'តូក្យូ, ជប៉ុន'),
    destinationId: 6,
    price: 60,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Taste your way through hidden food alleys: ramen, gyoza, takoyaki and sweet treats while learning about Japanese food culture.',
      'ភ្លក់អាហារតាមផ្លូវអាហារលាក់កំបាំង៖ រ៉ាមេន ហ្គីយ៉ូហ្សា តាកូយ៉ាគី និងបង្អែម ខណៈពេលកំពុងរៀនអំពីវប្បធម៌អាហារជប៉ុន។'
    ),
    category: 'Food Tours',
    highlights: [
      localized('10+ tastings', 'ភ្លក់ជាង ១០ មុខ'),
      localized('Hidden alleys', 'ផ្លូវលាក់កំបាំង'),
      localized('Food guide', 'មគ្គុទេសក៍អាហារ'),
      localized('Vegetarian options', 'មានជម្រើសបួស'),
    ],
  },
  {
    id: 6,
    name: localized('Angkor Sunrise Temple Tour', 'ដំណើរទស្សនាប្រាសាទមើលថ្ងៃរះអង្គរ'),
    location: localized('Siem Reap, Cambodia', 'សៀមរាប, កម្ពុជា'),
    destinationId: 8,
    price: 40,
    duration: localized('5 hours', '៥ ម៉ោង'),
    rating: 4.9,
    image: 'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    description: localized(
      'Watch sunrise over Angkor Wat and explore the jungle temples of Bayon and Ta Prohm on a guided tuk-tuk tour.',
      'មើលថ្ងៃរះលើអង្គរវត្ត និងរុករកប្រាសាទក្នុងព្រៃ គឺបាយ័ន និងតាព្រហ្ម ក្នុងដំណើរទុកទុកដែលមានមគ្គុទេសក៍។'
    ),
    category: 'Cultural Tours',
    highlights: [
      localized('Sunrise at Angkor Wat', 'ថ្ងៃរះនៅអង្គរវត្ត'),
      localized('Experienced guide', 'មគ្គុទេសក៍មានបទពិសោធន៍'),
      localized('Tuk-tuk ride', 'ជិះទុកទុក'),
      localized('Historic temples', 'ប្រាសាទប្រវត្តិសាស្ត្រ'),
    ],
  },
  {
    id: 7,
    name: localized('Santorini Sunset Sailing', 'ជិះទូកមើលថ្ងៃលិចសាន់តូរីនី'),
    location: localized('Santorini, Greece', 'សាន់តូរីនី, ក្រិក'),
    destinationId: 2,
    price: 130,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Sail around the caldera at golden hour, swim in hot springs and enjoy snacks and drinks as the sun drops into the Aegean.',
      'ជិះទូកជុំវិញកាល់ដេរ៉ានៅម៉ោងមាស ហែលទឹកក្នុងទឹកក្តៅ និងរីករាយជាមួយអាហារសម្រន់ និងភេសជ្ជៈ នៅពេលព្រះអាទិត្យលិចចូលសមុទ្រអ៊ីហ្សេន។'
    ),
    category: 'Sailing',
    highlights: [
      localized('Sunset cruise', 'ជិះទូកមើលថ្ងៃលិច'),
      localized('Swimming stop', 'ឈប់ហែលទឹក'),
      localized('Snacks and drinks', 'អាហារសម្រន់ និងភេសជ្ជៈ'),
      localized('Small group', 'ក្រុមតូច'),
    ],
  },
  {
    id: 8,
    name: localized('Rainforest Zip-Line & Canopy Tour', 'ការជិះខ្សែកាបលើព្រៃត្រូពិច'),
    location: localized('Costa Rica', 'កូស្តារីកា'),
    destinationId: 12,
    price: 70,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Fly through the rainforest canopy across 12 zip-lines, with hanging bridges and amazing views of the jungle below.',
      'ហោះឆ្លងកាត់ដំបូលព្រៃត្រូពិច លើខ្សែកាបចំនួន ១២ ជាមួយស្ពានព្យួរ និងទិដ្ឋភាពដ៏អស្ចារ្យនៃព្រៃខាងក្រោម។'
    ),
    category: 'Adventure',
    highlights: [
      localized('12 zip-lines', 'ខ្សែកាប ១២'),
      localized('Hanging bridges', 'ស្ពានព្យួរ'),
      localized('Safety gear provided', 'ឧបករណ៍សុវត្ថិភាពផ្តល់ជូន'),
      localized('Scenic views', 'ទិដ្ឋភាពស្រស់ស្អាត'),
    ],
  },
]

/** Returns one activity by its id, or undefined if not found. */
export function getActivityById(id: number): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}