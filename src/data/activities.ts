// ---------------------------------------------------------------------------
// activities.ts
// Mock/local data for travel activities and experiences.
// ---------------------------------------------------------------------------

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
  name: string
  location: string
  /** Which destination (see destinations.ts) this activity belongs to. */
  destinationId: number
  /** Price per person in USD */
  price: number
  /** How long the experience lasts, e.g. "4 hours" */
  duration: string
  rating: number
  image: string
  description: string
  category: ActivityCategory
  highlights: string[]
}

export const activities: Activity[] = [
  {
    id: 1,
    name: 'Alpine Hiking Adventure',
    location: 'Zermatt, Swiss Alps',
    destinationId: 3,
    price: 85,
    duration: '8 hours',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80',
    description:
      'A guided full-day hike through alpine meadows with panoramic views of the Matterhorn. Includes a mountain guide and packed lunch.',
    category: 'Hiking',
    highlights: ['Professional guide', 'Matterhorn views', 'Lunch included', 'Small group'],
  },
  {
    id: 2,
    name: 'Discover Scuba Diving',
    location: 'Maldives',
    destinationId: 10,
    price: 120,
    duration: '4 hours',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    description:
      'A beginner-friendly dive in turquoise water with colourful reefs, turtles and tropical fish. All gear and a certified instructor included.',
    category: 'Diving',
    highlights: ['Beginner friendly', 'All equipment', 'Certified instructor', 'Underwater photos'],
  },
  {
    id: 3,
    name: 'Paris City Walking Tour',
    location: 'Paris, France',
    destinationId: 5,
    price: 45,
    duration: '3 hours',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=900&q=80',
    description:
      'Walk through hidden courtyards, along the Seine and past the Eiffel Tower with a local storyteller who shares Parisian secrets.',
    category: 'City Tours',
    highlights: ['Local guide', 'Small group', 'Cultural stories', 'Photo stops'],
  },
  {
    id: 4,
    name: 'Lakefront Camping Weekend',
    location: 'Banff, Canada',
    destinationId: 4,
    price: 95,
    duration: '2 days',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80',
    description:
      'Camp under the stars next to a turquoise lake. Includes tent, sleeping bags, campfire dinner and a sunrise paddle.',
    category: 'Camping',
    highlights: ['Tent and gear included', 'Campfire dinner', 'Sunrise canoe', 'Stargazing'],
  },
  {
    id: 5,
    name: 'Tokyo Street Food Tour',
    location: 'Tokyo, Japan',
    destinationId: 6,
    price: 60,
    duration: '3 hours',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    description:
      'Taste your way through hidden food alleys: ramen, gyoza, takoyaki and sweet treats while learning about Japanese food culture.',
    category: 'Food Tours',
    highlights: ['10+ tastings', 'Hidden alleys', 'Food guide', 'Vegetarian options'],
  },
  {
    id: 6,
    name: 'Angkor Sunrise Temple Tour',
    location: 'Siem Reap, Cambodia',
    destinationId: 8,
    price: 40,
    duration: '5 hours',
    rating: 4.9,
    image: 'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    description:
      'Watch sunrise over Angkor Wat and explore the jungle temples of Bayon and Ta Prohm on a guided tuk-tuk tour.',
    category: 'Cultural Tours',
    highlights: ['Sunrise at Angkor Wat', 'Experienced guide', 'Tuk-tuk ride', 'Historic temples'],
  },
  {
    id: 7,
    name: 'Santorini Sunset Sailing',
    location: 'Santorini, Greece',
    destinationId: 2,
    price: 130,
    duration: '4 hours',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    description:
      'Sail around the caldera at golden hour, swim in hot springs and enjoy snacks and drinks as the sun drops into the Aegean.',
    category: 'Sailing',
    highlights: ['Sunset cruise', 'Swimming stop', 'Snacks and drinks', 'Small group'],
  },
  {
    id: 8,
    name: 'Rainforest Zip-Line & Canopy Tour',
    location: 'Costa Rica',
    destinationId: 12,
    price: 70,
    duration: '3 hours',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    description:
      'Fly through the rainforest canopy across 12 zip-lines, with hanging bridges and amazing views of the jungle below.',
    category: 'Adventure',
    highlights: ['12 zip-lines', 'Hanging bridges', 'Safety gear provided', 'Scenic views'],
  },
]

/** Returns one activity by its id, or undefined if not found. */
export function getActivityById(id: number): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}