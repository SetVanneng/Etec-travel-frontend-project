// ---------------------------------------------------------------------------
// destinations.ts
// Mock/local data for travel destinations.
// In a real app this data would come from a backend, but here we keep it
// in a simple TypeScript file so a beginner can read and edit it easily.
// ---------------------------------------------------------------------------

export type DestinationCategory =
  | 'Beaches'
  | 'Mountains'
  | 'Cities'
  | 'Historical'
  | 'Nature'
  | 'Adventure'

export interface Destination {
  id: number
  name: string
  country: string
  // A short label shown on the card, e.g. "Bali, Indonesia"
  location: string
  image: string
  description: string
  category: DestinationCategory
  rating: number
  /** Average budget in USD per day */
  budget: number
  bestTimeToVisit: string
  topActivities: string[]
  /** Latitude for the map marker. */
  latitude: number
  /** Longitude for the map marker. */
  longitude: number
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Bali',
    country: 'Indonesia',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    description:
      'The Island of the Gods is famous for lush rice terraces, sacred temples, golden beaches and a friendly local culture. It is one of the most loved island destinations for solo travellers, couples and families.',
    category: 'Beaches',
    rating: 4.8,
    budget: 120,
    bestTimeToVisit: 'April to October (dry season)',
    topActivities: ['Surfing lessons', 'Temple tours', 'Rice terrace trekking', 'Waterfalls'],
    latitude: -8.4095,
    longitude: 115.1889,
  },
  {
    id: 2,
    name: 'Santorini',
    country: 'Greece',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
    description:
      'A volcanic island with white-washed villages, blue domes and famous caldera sunsets. Santorini feels like the postcard picture of Greece and is perfect for a romantic getaway.',
    category: 'Beaches',
    rating: 4.9,
    budget: 180,
    bestTimeToVisit: 'April to October',
    topActivities: ['Sunset watching in Oia', 'Catamaran cruise', 'Wine tasting', 'Red beach swim'],
    latitude: 36.3932,
    longitude: 25.4615,
  },
  {
    id: 3,
    name: 'Swiss Alps',
    country: 'Switzerland',
    location: 'Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    description:
      'Snow-capped peaks, crystal lakes and charming villages make the Swiss Alps a dream for nature lovers. Great hiking in summer and world class skiing in winter.',
    category: 'Mountains',
    rating: 4.9,
    budget: 220,
    bestTimeToVisit: 'June to September or December to March',
    topActivities: ['Matterhorn view hike', 'Skiing and snowboarding', 'Glacier express train', 'Paragliding'],
    latitude: 46.0207,
    longitude: 7.7491,
  },
  {
    id: 4,
    name: 'Banff',
    country: 'Canada',
    location: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80',
    description:
      'A town inside Banff National Park, home to turquoise lakes, towering peaks and plenty of wildlife. One of the most beautiful places on Earth to unwind in nature.',
    category: 'Nature',
    rating: 4.8,
    budget: 160,
    bestTimeToVisit: 'June to September',
    topActivities: ['Lake canoeing', 'Wildlife spotting', 'Hot springs', 'Scenic gondola ride'],
    latitude: 51.1784,
    longitude: -115.5708,
  },
  {
    id: 5,
    name: 'Paris',
    country: 'France',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    description:
      'The City of Light needs little introduction. Iconic monuments, world-famous museums, cozy cafes and the romantic Seine river make Paris a must visit.',
    category: 'Cities',
    rating: 4.7,
    budget: 190,
    bestTimeToVisit: 'April to June, September to November',
    topActivities: ['Eiffel Tower visit', 'Louvre museum', 'Seine river cruise', 'Montmartre walk'],
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 6,
    name: 'Tokyo',
    country: 'Japan',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
    description:
      'A dazzling mix of neon streets, old temples, incredible food and futuristic technology. Tokyo is an unforgettable city where tradition meets the future.',
    category: 'Cities',
    rating: 4.8,
    budget: 200,
    bestTimeToVisit: 'March to May, October to November',
    topActivities: ['Shibuya crossing', 'Senso-ji temple', 'Sushi making class', 'Akihabara electronics'],
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 7,
    name: 'Rome',
    country: 'Italy',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80',
    description:
      'The Eternal City is an open-air museum. Walk where gladiators fought, throw a coin in Trevi fountain and eat the best pizza and gelato of your life.',
    category: 'Historical',
    rating: 4.8,
    budget: 170,
    bestTimeToVisit: 'April to June, September to October',
    topActivities: ['Colosseum tour', 'Vatican museums', 'Roman Forum walk', 'Pasta making class'],
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    id: 8,
    name: 'Siem Reap',
    country: 'Cambodia',
    location: 'Siem Reap, Cambodia',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80',
    description:
      'Home of the magnificent Angkor temples, including the famous Angkor Wat. Siem Reap is a magical, affordable destination full of history and warmth.',
    category: 'Historical',
    rating: 4.7,
    budget: 90,
    bestTimeToVisit: 'November to March',
    topActivities: ['Angkor Wat sunrise', 'Temple hop by tuk-tuk', 'Tonle Sap lake', 'Night market'],
    latitude: 13.3633,
    longitude: 103.8564,
  },
  {
    id: 9,
    name: 'Queenstown',
    country: 'New Zealand',
    location: 'Queenstown, New Zealand',
    image: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=900&q=80',
    description:
      'The adventure capital of the world. Surrounded by mountains and a huge lake, Queenstown offers bungee jumping, jet boats, hikes and stunning drives.',
    category: 'Adventure',
    rating: 4.9,
    budget: 210,
    bestTimeToVisit: 'December to February',
    topActivities: ['Bungee jumping', 'Skippers Canyon tour', 'Jet boating', 'Milford Sound day trip'],
    latitude: -45.0312,
    longitude: 168.6626,
  },
  {
    id: 10,
    name: 'Maldives',
    country: 'Maldives',
    location: 'Maldives, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80',
    description:
      'Overwater bungalows, turquoise lagoons and spectacular marine life. The Maldives is the ultimate tropical paradise for pure relaxation.',
    category: 'Beaches',
    rating: 4.9,
    budget: 350,
    bestTimeToVisit: 'November to April',
    topActivities: ['Snorkelling', 'Overwater villa stay', 'Dolphin cruise', 'Sunset fishing'],
    latitude: 3.2028,
    longitude: 73.2207,
  },
  {
    id: 11,
    name: 'Marrakech',
    country: 'Morocco',
    location: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=80',
    description:
      'A colourful city of markets, palaces and gardens. Get lost in the souks, sip mint tea and enjoy the vibrant energy of Moroccos cultural heart.',
    category: 'Cities',
    rating: 4.6,
    budget: 110,
    bestTimeToVisit: 'March to May, September to November',
    topActivities: ['Old city souks', 'Majorelle Garden', 'Camel ride in the desert', 'Koutoubia mosque'],
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    id: 12,
    name: 'Costa Rica',
    country: 'Costa Rica',
    location: 'Costa Rica, Central America',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80',
    description:
      'Rainforests, volcanoes, beaches and amazing biodiversity. Costa Rica is a nature lover\u2019s paradise packed with adventurous things to do.',
    category: 'Nature',
    rating: 4.8,
    budget: 150,
    bestTimeToVisit: 'December to April',
    topActivities: ['Rainforest hikes', 'Volcano tours', 'Zip-lining', 'Sloth spotting'],
    latitude: 9.7489,
    longitude: -83.7534,
  },
  {
    id: 13,
    name: 'Reykjavik',
    country: 'Iceland',
    location: 'Reykjavik, Iceland',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80',
    description:
      'The world\u2019s northernmost capital sits between dramatic mountains and the sea. Golden waterfalls, black-sand beaches, hot springs and the northern lights are all within easy reach.',
    category: 'Cities',
    rating: 4.7,
    budget: 230,
    bestTimeToVisit: 'September to March for the aurora',
    topActivities: ['Northern lights hunt', 'Blue Lagoon soak', 'Golden Circle tour', 'Glacier walk'],
    latitude: 64.1466,
    longitude: -21.9426,
  },
  {
    id: 14,
    name: 'Hanoi',
    country: 'Vietnam',
    location: 'Hanoi, Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
    description:
      'A thousand-year-old capital of tree-lined boulevards, lively old quarter streets, lakes and delicious street food. A perfect base to explore northern Vietnam.',
    category: 'Cities',
    rating: 4.6,
    budget: 70,
    bestTimeToVisit: 'October to April',
    topActivities: ['Old Quarter food tour', 'Hoan Kiem Lake walk', 'Train Street coffee', 'Ha Long Bay day trip'],
    latitude: 21.0285,
    longitude: 105.8542,
  },
  {
    id: 15,
    name: 'Lisbon',
    country: 'Portugal',
    location: 'Lisbon, Portugal',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    description:
      'A sun-soaked city of seven hills, trams, azulejo tiles and pastel de nata. Mix old-town charm with Atlantic beaches just a train ride away.',
    category: 'Cities',
    rating: 4.8,
    budget: 140,
    bestTimeToVisit: 'March to June, September to October',
    topActivities: ['Tram 28 ride', 'Belem tower visit', 'Pastel de nata tasting', 'Miradouro viewpoints'],
    latitude: 38.7223,
    longitude: -9.1393,
  },
  {
    id: 16,
    name: 'Angkor Wat',
    country: 'Cambodia',
    location: 'Siem Reap, Cambodia',
    image: 'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    description:
      'The majestic Angkor temple complex in Cambodia is one of the greatest archaeological wonders in the world. Watch sunrise over Angkor Wat, explore jungle temples and soak up the rich Khmer culture.',
    category: 'Historical',
    rating: 4.9,
    budget: 90,
    bestTimeToVisit: 'November to March',
    topActivities: ['Angkor Wat sunrise', 'Temple hop by tuk-tuk', 'Bayon and Ta Prohm walk', 'Tonle Sap lake tour'],
    latitude: 13.4125,
    longitude: 103.8666,
  },
  {
    id: 17,
    name: 'Cape Town',
    country: 'South Africa',
    location: 'Cape Town, South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80',
    description:
      'A stunning coastal city framed by Table Mountain and the Atlantic. Penguins, vineyards and dramatic coastline combine in one unforgettable place.',
    category: 'Nature',
    rating: 4.8,
    budget: 130,
    bestTimeToVisit: 'November to March',
    topActivities: ['Table Mountain cableway', 'Boulders Beach penguins', 'Cape Point drive', 'Wine tasting in Stellenbosch'],
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 18,
    name: 'Kyoto',
    country: 'Japan',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    description:
      'Japan\u2019s ancient capital of serene temples, zen gardens, bamboo groves and graceful geisha districts. A timeless cultural heart.',
    category: 'Historical',
    rating: 4.9,
    budget: 150,
    bestTimeToVisit: 'March to May (cherry blossom), October to November',
    topActivities: ['Fushimi Inari shrine', 'Arashiyama bamboo grove', 'Kinkaku-ji temple', 'Gion geisha district'],
    latitude: 35.0116,
    longitude: 135.7681,
  },
]

/** Returns one destination by its id, or undefined if not found. */
export function getDestinationById(id: number): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}