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
    image: 'https://i.pinimg.com/736x/9a/a9/d2/9aa9d26df99cb5ea74180298b7c613f1.jpg',
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
    image: 'https://i.pinimg.com/736x/b4/ae/4f/b4ae4fdf22dc57e762f7c8e8a1ab1240.jpg',
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
  {
    id: 9,
    name: localized('Victoria Peak Tram & Hike', 'ជិះរទេះភ្នំ និងឡើងភ្នំវិកតូរី៉ាភីក'),
    location: localized('Hong Kong Island', 'កោះហុងកុង'),
    destinationId: 29,
    price: 55,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 4.8,
    image: 'https://i.pinimg.com/736x/9a/f2/c2/9af2c250d9f9d34a427d22f803cc253e.jpg',
    description: localized(
      'Ride the historic Peak Tram up Victoria Peak, then hike the Lung Yeh trail for uninterrupted skyline views across the harbour.',
      'ជិះរទេះភ្នំប្រវត្តិសាស្ត្រឡើងដល់វិកតូរី៉ាភីក បន្ទាប់មកដើរផ្លូវឡាំងយ៉ែ សម្រាប់ទិដ្ឋភាពស្កាយឡាញមិនដាច់ឆ្លងកំពង់ផែ។'
    ),
    category: 'Hiking',
    highlights: [
      localized('Historic tram', 'រទេះភ្នំប្រវត្តិសាស្ត្រ'),
      localized('Skyline views', 'ទិដ្ឋភាពស្កាយឡាញ'),
      localized('Easy trail', 'ផ្លូវងាយស្រួល'),
      localized('Photo lookout', 'កន្លែងថតរូប'),
    ],
  },
  {
    id: 10,
    name: localized('Gardens by the Bay Night Tour', 'ដំណើរកម្សាន្តរាត្រីសួនហ្គាដេនស៍បៃធេបេ'),
    location: localized('Marina Bay, Singapore', 'ម៉ារីណាបេ, សិង្ហបុរី'),
    destinationId: 30,
    price: 48,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'See the Supertrees light up at dusk, cross the Cloud Forest dome and end with the light-and-sound show by the waterfront.',
      'មើលដើមឈើផ្កាយលីងស៊ូភើបភ្លឺនៅពេលព្រលប់ ឆ្លងកាត់ដំបូលព្រៃពពក ហើយបញ្ចប់ដោយកម្មវិធីពន្លឺនិងសំឡេងនៅមាត់ទឹក។'
    ),
    category: 'City Tours',
    highlights: [
      localized('Supertree show', 'កម្មវិធីដើមឈើផ្កាយ'),
      localized('Cloud Forest dome', 'ដំបូលព្រៃពពក'),
      localized('Waterfront view', 'ទិដ្ឋភាពមាត់ទឹក'),
      localized('Evening lights', 'ពន្លឺពេលរាត្រី'),
    ],
  },
  {
    id: 11,
    name: localized('Teotihuacan Hot Air Balloon', 'ជិះប៉េងប៉ោងខ្យល់ក្តៅតេអូទីហ៊ួរកាន'),
    location: localized('Teotihuacan, Mexico', 'តេអូទីហ៊ួរកាន, ម៉ិកស៊ិក'),
    destinationId: 31,
    price: 160,
    duration: localized('5 hours', '៥ ម៉ោង'),
    rating: 4.9,
    image: 'https://i.pinimg.com/236x/c4/1a/2f/c41a2f768f54c75587892b7b8694bcd1.jpg',
    description: localized(
      'Float above the Pyramids of the Sun and Moon at sunrise, then land for a hot breakfast and a guided walk along the Avenue of the Dead.',
      'អណ្តែតពីលើពីរ៉ាមីតនៃព្រះអាទិត្យ និងព្រះច័ន្ទនៅពេលថ្ងៃរះ បន្ទាប់មកចុះមកអាហារពេលព្រឹកក្តៅ និងដើរជាមួយមគ្គុទេសក៍តាមបណ្តោយអាវេនូនៃអ្នកស្លាប់។'
    ),
    category: 'Adventure',
    highlights: [
      localized('Sunrise flight', 'ការហោះហើរមើលថ្ងៃរះ'),
      localized('Breakfast included', 'រួមបញ្ចូលអាហារពេលព្រឹក'),
      localized('Expert pilot', 'អ្នកបើកប៉េងប៉ោងជំនាញ'),
      localized('Amazing photos', 'រូបថតអស្ចារ្យ'),
    ],
  },
  {
    id: 12,
    name: localized('Sugarloaf Sunset & Samba Night', 'ថ្ងៃលិចស្ករឡូហ្វ និងរាត្រីសាមបា'),
    location: localized('Rio de Janeiro, Brazil', 'រីយ៉ូដេហ្សាណេអ៊ីរ៉ូ, ប្រេស៊ីល'),
    destinationId: 32,
    price: 90,
    duration: localized('6 hours', '៦ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Take the cable car to Sugarloaf Mountain at golden hour, then descend into Lapa for a live samba show and street food.',
      'ជិះរទេះភ្នំទៅភ្នំស្ករឡូហ្វនៅម៉ោងមាស បន្ទាប់មកចុះទៅឡាប៉ាសម្រាប់កម្មវិធីសាមបាផ្ទាល់ និងអាហារតាមផ្លូវ។'
    ),
    category: 'City Tours',
    highlights: [
      localized('Cable car ride', 'ជិះរទេះភ្នំ'),
      localized('Golden hour views', 'ទិដ្ឋភាពម៉ោងមាស'),
      localized('Live samba', 'សាមបាផ្ទាល់'),
      localized('Street food', 'អាហារតាមដងផ្លូវ'),
    ],
  },
  {
    id: 13,
    name: localized('Bosphorus Sunset Cruise', 'ជិះទូកមើលថ្ងៃលិចទន្លេបូសផូរូស'),
    location: localized('Istanbul, Turkey', 'អ៊ីស្តង់ប៊ុល, ទួរគី'),
    destinationId: 33,
    price: 45,
    duration: localized('2.5 hours', '២ ម៉ោងកន្លះ'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Glide between Europe and Asia as the sun sets over the minarets, with Turkish tea and simit served on board.',
      'ជិះទូករវាងអឺរ៉ុប និងអាស៊ី ពេលព្រះអាទិត្យលិចលើប៉មវិហារ ជាមួយតែទួរគី និងស៊ីមីតបម្រើលើទូក។'
    ),
    category: 'Sailing',
    highlights: [
      localized('Two continents', 'ទ្វីបពីរ'),
      localized('Evening tea', 'តែពេលល្ងាច'),
      localized('Skyline photos', 'រូបថតស្កាយឡាញ'),
      localized('Small group', 'ក្រុមតូច'),
    ],
  },
  {
    id: 14,
    name: localized('Dublin Pub & Food Crawl', 'ដំណើរកម្សាន្តក្លឹបភេសជ្ជៈ និងអាហារដាប់លីន'),
    location: localized('Temple Bar, Dublin', 'ថេមបលបា, ដាប់លីន'),
    destinationId: 34,
    price: 65,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 4.7,
    image: 'https://i.pinimg.com/736x/18/18/f3/1818f3fa1ada9656ceb045f806dbd146.jpg',
    description: localized(
      'Visit five classic pubs for a pint and tasting plates of Irish stew, seafood chowder and boxty while a local shares pub folklore.',
      'ទៅលេងក្លឹបបុរាណចំនួន ៥ សម្រាប់ផឹកបៀរ និងភ្លក់ស្ងោរអៀរឡង់ ស៊ុបត្រី និងបុឡក់ស៊ីធី ខណៈអ្នកក្នុងស្រុករៀបរាប់រឿងនិទានក្លឹប។'
    ),
    category: 'Food Tours',
    highlights: [
      localized('5 classic pubs', 'ក្លឹបបុរាណ ៥'),
      localized('Tasting plates', 'ចានភ្លក់'),
      localized('Local storyteller', 'អ្នកនិទានក្នុងស្រុក'),
      localized('Live music', 'តន្ត្រីផ្ទាល់'),
    ],
  },
  {
    id: 15,
    name: localized('Prague Castle & Beer Cellar Tour', 'ដំណើរទស្សនាប្រាសាទប្រាក និងអាងស្រាបៀរ'),
    location: localized('Prague, Czech Republic', 'ប្រាក, សាធារណរដ្ឋឆែក'),
    destinationId: 35,
    price: 52,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Explore the castle complex and St. Vitus Cathedral, then descend into a medieval cellar bar for Czech craft beer and chimney cake.',
      'រុករកបរិវេណប្រាសាទ និងវិហារសេនវីតុស បន្ទាប់មកចុះទៅបារក្រោមដីមជ្ឈិមសម័យសម្រាប់ស្រាបៀរសិប្បកម្មឆេក និងនំត្រឡាច។'
    ),
    category: 'Cultural Tours',
    highlights: [
      localized('Historic castle', 'ប្រាសាទប្រវត្តិសាស្ត្រ'),
      localized('Medieval cellar', 'បន្ទប់ក្រោមដីមជ្ឈិមសម័យ'),
      localized('Craft beer', 'ស្រាបៀរសិប្បកម្ម'),
      localized('Local guide', 'មគ្គុទេសក៍ក្នុងស្រុក'),
    ],
  },
  {
    id: 16,
    name: localized('Oslo Fjord Kayak Adventure', 'ដំណើរជិះកាយ៉ាកច្រកសមុទ្រអូស្លូ'),
    location: localized('Aker Brygge, Oslo', 'អាកឺរបឺរីហ្គេ, អូស្លូ'),
    destinationId: 36,
    price: 95,
    duration: localized('4 hours', '៤ ម៉ោង'),
    rating: 4.8,
    image: 'https://i.pinimg.com/1200x/85/04/44/8504441683b4ca53db033924b2b5b62f.jpg',
    description: localized(
      'Paddle past islands, lighthouses and floating saunas into the Oslofjord, with a coffee break on a small island beach.',
      'ចែវកាយ៉ាកកាត់កោះតូចៗ ប៉មពន្លឺ និងសូណាអណ្តែតទឹកចូលច្រកសមុទ្រអូស្លូ ជាមួយការឈប់ផឹកកាហ្វេនៅលើឆ្នេរកោះតូចមួយ។'
    ),
    category: 'Adventure',
    highlights: [
      localized('Islands and bays', 'កោះ និងឈូងសមុទ្រ'),
      localized('All equipment', 'ឧបករណ៍ទាំងអស់'),
      localized('Certified guide', 'មគ្គុទេសក៍មានការទទួលស្គាល់'),
      localized('Island coffee stop', 'ឈប់កាហ្វេលើកោះ'),
    ],
  },
  {
    id: 17,
    name: localized('Nile Felucca & Pyramids Sunset', 'ជិះទូកក្តោងនីល និងថ្ងៃលិចពីរ៉ាមីត'),
    location: localized('Giza, Cairo', 'ហ្គីហ្សា, កៃរ៉ូ'),
    destinationId: 37,
    price: 50,
    duration: localized('5 hours', '៥ ម៉ោង'),
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Sail on a traditional felucca along the Nile, then head to a desert viewpoint to watch the sun set behind the Pyramids of Giza.',
      'ជិះទូកប្រពៃណីហ្វេលូកាតាមដងទន្លេនីល បន្ទាប់មកទៅកន្លែងមើលទិដ្ឋភាពវាលខ្សាច់ ដើម្បីមើលថ្ងៃលិចនៅពីក្រោយពីរ៉ាមីតហ្គីហ្សា។'
    ),
    category: 'Cultural Tours',
    highlights: [
      localized('Traditional felucca', 'ទូកប្រពៃណីហ្វេលូកា'),
      localized('Sunset viewpoint', 'ចំណុចមើលថ្ងៃលិច'),
      localized('Local tea', 'តែក្នុងស្រុក'),
      localized('Guided storytelling', 'និទានរឿងជាមួយមគ្គុទេសក៍'),
    ],
  },
  {
    id: 18,
    name: localized('Gyeongbokgung Royal Morning Walk', 'ដំណើរដើរពេលព្រឹកវិមានក្យុងបូកគុង'),
    location: localized('Seoul, South Korea', 'សេអ៊ូល, កូរ៉េខាងត្បូង'),
    destinationId: 38,
    price: 35,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Tour the grand palace before the crowds, watch the royal guard ceremony and finish with a traditional tea break in Bukchon.',
      'ដំណើរកម្សាន្តវិមានដ៏អស្ចារ្យមុនមានមនុស្សច្រើន មើលពិធីឆ្មាំស្តេច រួចបញ្ចប់ដោយការឈប់ផឹកតែប្រពៃណីនៅប៊ុកឆុន។'
    ),
    category: 'City Tours',
    highlights: [
      localized('Guard ceremony', 'ពិធីឆ្មាំស្តេច'),
      localized('Historic palace', 'វិមានប្រវត្តិសាស្ត្រ'),
      localized('Tea break', 'ឈប់ផឹកតែ'),
      localized('Small group', 'ក្រុមតូច'),
    ],
  },
  {
    id: 19,
    name: localized('Mount Batur Sunrise Trek', 'ដំណើរឡើងភ្នំបាទួរមើលថ្ងៃរះ'),
    location: localized('Ubud, Bali', 'ឧបុទ, បាលី'),
    destinationId: 1,
    price: 75,
    duration: localized('6 hours', '៦ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'A pre-dawn trek up an active volcano to watch sunrise over Mount Agung, with breakfast cooked by volcanic steam.',
      'ដំណើរឡើងភ្នំមុនថ្ងៃរះលើភ្នំភ្លើងសកម្ម ដើម្បីមើលថ្ងៃរះលើភ្នំអាហ្គុង ជាមួយអាហារពេលព្រឹកដែលចម្អិនដោយចំហាយក្តៅភ្នំភ្លើង។'
    ),
    category: 'Hiking',
    highlights: [
      localized('Volcano sunrise', 'ថ្ងៃរះលើភ្នំភ្លើង'),
      localized('Steam-cooked breakfast', 'អាហារព្រឹកចំហុយ'),
      localized('Headlamp provided', 'ប្រគល់ចង្កៀងក្បាល'),
      localized('Local guide', 'មគ្គុទេសក៍ក្នុងស្រុក'),
    ],
  },
  {
    id: 20,
    name: localized('Marrakech Medina Food Walk', 'ដំណើរអាហារមេឌីណាម៉ារ៉ាកេស'),
    location: localized('Marrakech, Morocco', 'ម៉ារ៉ាកេស, ម៉ារ៉ុក'),
    destinationId: 11,
    price: 55,
    duration: localized('3.5 hours', '៣ ម៉ោងកន្លះ'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Follow your senses through spice stalls and food carts of the medina, tasting tagine, mint tea and street sweets.',
      'ដើរតាមក្លិនក្រអូបកាត់តូបគ្រឿងទេស និងរទេះអាហារក្នុងមេឌីណា ភ្លក់តាហ្ស៊ីន តែជីអង្កាម និងបង្អែមតាមដងផ្លូវ។'
    ),
    category: 'Food Tours',
    highlights: [
      localized('10+ tastings', 'ភ្លក់ជាង ១០ មុខ'),
      localized('Spice market', 'ផ្សារគ្រឿងទេស'),
      localized('Local food guide', 'មគ្គុទេសក៍អាហារក្នុងស្រុក'),
      localized('Mint tea stop', 'ឈប់ផឹកតែជីអង្កាម'),
    ],
  },
  {
    id: 21,
    name: localized('Queenstown Lake & Luge Combo', 'ដំណើរបឹង និងល្វូជឃ្វីនស្តាន'),
    location: localized('Queenstown, New Zealand', 'ឃ្វីនស្តាន, នូវែលសេឡង់'),
    destinationId: 9,
    price: 110,
    duration: localized('5 hours', '៥ ម៉ោង'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Cruise Lake Wakatipu, ride the Skyline gondola up Bob\'s Peak, then race a gravity luge down the mountain with alpine views.',
      'ជិះទូកបឹងវ៉ាកាទីពូ ជិះហ្គុនដូឡាស្កាយឡាញឡើងភ្នំបបសភីក បន្ទាប់មករត់ប្រណាំងល្វូជចុះពីលើភ្នំជាមួយទិដ្ឋភាពភ្នំអាល់។'
    ),
    category: 'Adventure',
    highlights: [
      localized('Lake cruise', 'ជិះទូកបឹង'),
      localized('Gondola ride', 'ជិះហ្គុនដូឡា'),
      localized('Gravity luge', 'ល្វូជផ្ទាំង'),
      localized('Alpine views', 'ទិដ្ឋភាពភ្នំអាល់'),
    ],
  },
  {
    id: 22,
    name: localized('Phuket Islands Longtail Cruise', 'ជិះទូកអណ្តែតទឹកកោះភូកេត'),
    location: localized('Phuket, Thailand', 'ភូកេត, ថៃ'),
    destinationId: 25,
    price: 85,
    duration: localized('8 hours', '៨ ម៉ោង'),
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Hop between the Phi Phi islands on a traditional longtail boat, snorkel in crystal bays and feast on a beach barbecue lunch.',
      'លោតដើរលេងកោះភីភីនាទូកអណ្តែតទឹកប្រពៃណី មុជមើលត្រីក្នុងឈូងថ្លា និងញ៉ាំអាហារដុតលើឆ្នេរពេលថ្ងៃត្រង់។'
    ),
    category: 'Sailing',
    highlights: [
      localized('Phi Phi islands', 'កោះភីភី'),
      localized('Snorkelling stop', 'ឈប់មុជមើលត្រី'),
      localized('Beach barbecue', 'អាហារដុតលើឆ្នេរ'),
      localized('Crystal bays', 'ឈូងសមុទ្រថ្លា'),
    ],
  },
  {
    id: 23,
    name: localized('Petra Candlelit Night Visit', 'ទស្សនាប៉េត្រារាត្រីពន្លឺទៀន'),
    location: localized('Petra, Jordan', 'ប៉េត្រា, ហ្ស៊កដានី'),
    destinationId: 26,
    price: 70,
    duration: localized('2.5 hours', '២ ម៉ោងកន្លះ'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Walk the Siq by candlelight to see the Treasury glow at night, accompanied by traditional Bedouin music and tea.',
      'ដើរតាមកន្លែងស៊ីកដោយពន្លឺទៀន ដើម្បីមើលរតនៈបញ្ចេញពន្លឺពេលរាត្រី ជាមួយតន្ត្រីបេឌូអ៊ីនប្រពៃណី និងតែ។'
    ),
    category: 'Cultural Tours',
    highlights: [
      localized('Candlelit Siq', 'ដើរពន្លឺទៀន'),
      localized('Treasury at night', 'រតនៈពេលរាត្រី'),
      localized('Bedouin music', 'តន្ត្រីបេឌូអ៊ីន'),
      localized('Tea ceremony', 'ពិធីផឹកតែ'),
    ],
  },
  {
    id: 24,
    name: localized('Kyoto Tea Ceremony & Maiko Walk', 'ពិធីតែក្យូតូ និងដំណើរស្រុកហ្គីសា'),
    location: localized('Gion, Kyoto', 'ហ្គីអុន, ក្យូតូ'),
    destinationId: 18,
    price: 80,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.9,
    image: 'https://i.pinimg.com/1200x/48/f9/20/48f9206fb5464eb55b0446cbd1ea8ac0.jpg',
    description: localized(
      'Learn the art of matcha in a traditional tea house, then stroll Gion\'s lantern-lit streets in search of elegant maiko.',
      'រៀនសិល្បៈម៉ាចានៅក្នុងផ្ទះតែប្រពៃណី បន្ទាប់មកដើរតាមផ្លូវហ្គីអុនភ្លឺដោយគោម ស្វែងរកហ្គីសាដ៏ឆើតឆាយ។'
    ),
    category: 'Cultural Tours',
    highlights: [
      localized('Matcha ceremony', 'ពិធីម៉ាចា'),
      localized('Gion streets', 'ផ្លូវហ្គីអុន'),
      localized('Tea master', 'គ្រូតែជំនាញ'),
      localized('Traditional sweet', 'បង្អែមប្រពៃណី'),
    ],
  },
  {
    id: 25,
    name: localized('Machu Picchu Cloud Forest Trek', 'ដំណើរឡើងភ្នំព្រៃពពកម៉ាជូភីជូ'),
    location: localized('Aguas Calientes, Peru', 'អាហ្គូសកាលីអេនតេស, ប៉េរូ'),
    destinationId: 23,
    price: 140,
    duration: localized('7 hours', '៧ ម៉ោង'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Hike the lesser-known trek to the Sun Gate for a first sunrise glimpse of Machu Picchu, surrounded by misty cloud forest.',
      'ឡើងផ្លូវតិចគេស្គាល់ទៅខ្លោងទ្វារព្រះអាទិត្យ សម្រាប់ការមើលឃើញម៉ាជូភីជូដំបូងនៅពេលថ្ងៃរះ ព័ទ្ធជុំវិញដោយព្រៃពពកដ៏អាប់ស្រអាប់។'
    ),
    category: 'Hiking',
    highlights: [
      localized('Sun Gate view', 'ទិដ្ឋភាពខ្លោងទ្វារព្រះអាទិត្យ'),
      localized('Cloud forest', 'ព្រៃពពក'),
      localized('Small group', 'ក្រុមតូច'),
      localized('Lunch included', 'រួមបញ្ចូលអាហារថ្ងៃត្រង់'),
    ],
  },
  {
    id: 26,
    name: localized('Reykjavik Northern Lights Hunt', 'ដំណើរស្វែងរកអូរ៉ូរ៉ារេកយ៉ាវិក'),
    location: localized('Reykjavik, Iceland', 'រេកយ៉ាវិក, អ៊ីស្លង់'),
    destinationId: 13,
    price: 120,
    duration: localized('5 hours', '៥ ម៉ោង'),
    rating: 4.8,
    image: 'https://i.pinimg.com/736x/72/b1/46/72b146e98671cddaf4e6b89575499ccb.jpg',
    description: localized(
      'Drive out of the city lights with an aurora expert, chasing clear skies for the best chance to see the northern lights dance.',
      'បើកឡានចេញពីពន្លឺទីក្រុងជាមួយអ្នកជំនាញអូរ៉ូរ៉ា ស្វែងរកមេឃភ្លឺច្បាស់សម្រាប់ឱកាសល្អបំផុតដើម្បីមើលអូរ៉ូរ៉ារាំ។'
    ),
    category: 'Adventure',
    highlights: [
      localized('Aurora expert', 'អ្នកជំនាញអូរ៉ូរ៉ា'),
      localized('Hot chocolate', 'សូកូឡាក្តៅ'),
      localized('Hotel pickup', 'រថយន្តទៅទទួល'),
      localized('Pro photos', 'រូបថតអាជីព'),
    ],
  },
  {
    id: 27,
    name: localized('Cape Town Whale Boat Safari', 'ដំណើរទូកមើលត្រីបាឡែនខេបថោន'),
    location: localized('Hermanus, Cape Town', 'ហឺម៉ាណូស, ខេបថោន'),
    destinationId: 17,
    price: 130,
    duration: localized('3 hours', '៣ ម៉ោង'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=900&q=80',
    description: localized(
      'Set out from the whale capital of Hermanus to glimpse southern right whales, dolphins and seals along the Cape coast.',
      'ចេញដំណើរពីរាជធានីត្រីបាឡែនហឺម៉ាណូស ដើម្បីមើលត្រីបាឡែនខាងស្តាំខាងត្បូង ផ្សោត និងត្រានៅតាមឆ្នេរខេប។'
    ),
    category: 'Sailing',
    highlights: [
      localized('Whale watching', 'មើលត្រីបាឡែន'),
      localized('Marine biologist on board', 'អ្នកជីវវិទ្យាសមុទ្រលើទូក'),
      localized('Coastal views', 'ទិដ្ឋភាពឆ្នេរ'),
      localized('Photography deck', 'ដំបូលថតរូប'),
    ],
  },
  {
    id: 28,
    name: localized('Halong Bay Overnight Cruise', 'ជិះទូកស្នាក់នៅយប់ឆ្នេរហាឡុង'),
    location: localized('Halong Bay, Vietnam', 'ឆ្នេរហាឡុង, វៀតណាម'),
    destinationId: 14,
    price: 180,
    duration: localized('2 days', '២ ថ្ងៃ'),
    rating: 4.8,
    image: 'https://i.pinimg.com/736x/a9/b8/42/a9b84274b7300c460e78488ee565a50e.jpg',
    description: localized(
      'Sleep on a junk boat among limestone karsts, kayak through hidden lagoons and visit a floating fishing village.',
      'គេងលើទូកជុងក្នុងចំណោមកំពូលថ្មកំបោរ ជិះកាយ៉ាកកាត់វាលបឹងលាក់កំបាំង និងទស្សនាភូមិនេសាទអណ្តែតទឹក។'
    ),
    category: 'Sailing',
    highlights: [
      localized('Overnight on board', 'ស្នាក់នៅលើទូកមួយយប់'),
      localized('Kayaking', 'ជិះកាយ៉ាក'),
      localized('All meals', 'អាហារទាំងអស់'),
      localized('Fishing village', 'ភូមិនេសាទ'),
    ],
  },
]

/** Returns one activity by its id, or undefined if not found. */
export function getActivityById(id: number): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}