// ---------------------------------------------------------------------------
// hotels.ts
// Mock/local data for hotels. Every hotel is linked to a destination
// through the "destinationId" field, so we can show "nearby hotels".
// ---------------------------------------------------------------------------

export interface RoomType {
  name: string
  /** Price for one night in USD */
  price: number
  /** Room size in square meters */
  size: number
}

export interface Hotel {
  id: number
  name: string
  /** Which destination this hotel belongs to (see destinations.ts) */
  destinationId: number
  location: string
  city: string
  country: string
  rating: number
  /** Price for one night in USD (based on the cheapest room) */
  pricePerNight: number
  image: string
  gallery: string[]
  description: string
  facilities: string[]
  roomTypes: RoomType[]
  /** Whether rooms can be booked today (demo only) */
  available: boolean
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'The Palm Oasis Resort',
    destinationId: 1,
    location: 'Seminyak Beach, Bali',
    city: 'Seminyak',
    country: 'Indonesia',
    rating: 4.8,
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Surrounded by tropical gardens and steps from the sand, The Palm Oasis offers private villas, an infinity pool and world-class spa treatments.',
    facilities: ['Free Wi-Fi', 'Outdoor pool', 'Spa', 'Beach access', 'Restaurant', 'Air conditioning'],
    roomTypes: [
      { name: 'Standard Room', price: 140, size: 32 },
      { name: 'Pool View Room', price: 180, size: 40 },
      { name: 'Private Villa', price: 320, size: 90 },
    ],
    available: true,
  },
  {
    id: 2,
    name: 'Blue Horizon Suites',
    destinationId: 2,
    location: 'Oia, Santorini',
    city: 'Oia',
    country: 'Greece',
    rating: 4.9,
    pricePerNight: 240,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'White cave-style suites with private balconies over the caldera. Watch the famous Santorini sunset from your own plunge pool.',
    facilities: ['Free Wi-Fi', 'Infinity pool', 'Breakfast included', 'Jacuzzi', 'Air conditioning'],
    roomTypes: [
      { name: 'Cave Suite', price: 240, size: 35 },
      { name: 'Caldera Suite', price: 320, size: 48 },
      { name: 'Honeymoon Villa', price: 480, size: 75 },
    ],
    available: true,
  },
  {
    id: 3,
    name: 'Alpine Peak Lodge',
    destinationId: 3,
    location: 'Zermatt, Swiss Alps',
    city: 'Zermatt',
    country: 'Switzerland',
    rating: 4.9,
    pricePerNight: 260,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Cozy wooden lodge with fireplaces, a heated sauna and direct views of the Matterhorn. Ski in, ski out in winter.',
    facilities: ['Free Wi-Fi', 'Sauna', 'Ski storage', 'Restaurant', 'Fireplace lounge'],
    roomTypes: [
      { name: 'Twin Room', price: 260, size: 28 },
      { name: 'Matterhorn View Suite', price: 360, size: 45 },
      { name: 'Family Chalet', price: 520, size: 85 },
    ],
    available: true,
  },
  {
    id: 4,
    name: 'Cedar Lake Retreat',
    destinationId: 4,
    location: 'Banff National Park',
    city: 'Banff',
    country: 'Canada',
    rating: 4.7,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A quiet retreat surrounded by pine forest with lake views, an outdoor fire pit and free shuttle to downtown Banff.',
    facilities: ['Free Wi-Fi', 'Hot tub', 'Lake view', 'Free parking', 'Hiking trails'],
    roomTypes: [
      { name: 'Forest Room', price: 190, size: 30 },
      { name: 'Lake View Room', price: 240, size: 38 },
      { name: 'Two Bedroom Cabin', price: 380, size: 80 },
    ],
    available: true,
  },
  {
    id: 5,
    name: 'Eiffel Grand Hotel',
    destinationId: 5,
    location: '7th Arrondissement, Paris',
    city: 'Paris',
    country: 'France',
    rating: 4.6,
    pricePerNight: 210,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Classic Parisian elegance with a rooftop terrace, a five minute walk to the Eiffel Tower and breakfast served daily.',
    facilities: ['Free Wi-Fi', 'Rooftop terrace', 'Bar', 'Room service', 'Elevator'],
    roomTypes: [
      { name: 'Classic Room', price: 210, size: 25 },
      { name: 'Deluxe Room', price: 280, size: 34 },
      { name: 'Eiffel View Suite', price: 450, size: 60 },
    ],
    available: true,
  },
  {
    id: 6,
    name: 'Sakura City Hotel',
    destinationId: 6,
    location: 'Shinjuku, Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    rating: 4.5,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Modern and compact rooms in the middle of Shinjuku, minutes from the train station, food streets and the famous neon lights.',
    facilities: ['Free Wi-Fi', '24h front desk', 'Laundry', 'Vending machines', 'Bicycle rental'],
    roomTypes: [
      { name: 'Single Compact', price: 150, size: 18 },
      { name: 'Double Room', price: 200, size: 24 },
      { name: 'Suite with City View', price: 340, size: 50 },
    ],
    available: true,
  },
  {
    id: 7,
    name: 'Colosseum View Hotel',
    destinationId: 7,
    location: 'Monti, Rome',
    city: 'Rome',
    country: 'Italy',
    rating: 4.7,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Rooms with balconies looking directly onto the Colosseum. A short walk to Roman Forum and the best trattorias of Monti.',
    facilities: ['Free Wi-Fi', 'Breakfast included', 'Bar', 'Air conditioning', 'Concierge'],
    roomTypes: [
      { name: 'Standard Room', price: 180, size: 26 },
      { name: 'Landmark View Room', price: 260, size: 34 },
      { name: 'Executive Suite', price: 400, size: 55 },
    ],
    available: true,
  },
  {
    id: 8,
    name: 'Angkor Heritage & Spa',
    destinationId: 8,
    location: 'Siem Reap, Cambodia',
    city: 'Siem Reap',
    country: 'Cambodia',
    rating: 4.6,
    pricePerNight: 80,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A beautiful boutique hotel with a pool, spa and free tuk-tuk service to the Angkor temples. Great value for exploring Cambodia.',
    facilities: ['Free Wi-Fi', 'Pool', 'Spa', 'Free airport pick-up', 'Restaurant', 'Bike rental'],
    roomTypes: [
      { name: 'Garden Room', price: 80, size: 30 },
      { name: 'Pool View Room', price: 110, size: 38 },
      { name: 'Temple Suite', price: 180, size: 60 },
    ],
    available: true,
  },
  {
    id: 9,
    name: 'Aurora Sky Hotel',
    destinationId: 13,
    location: 'Downtown Reykjavik',
    city: 'Reykjavik',
    country: 'Iceland',
    rating: 4.7,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A sleek hotel in the heart of Reykjavik with geothermal-heated rooms, a rooftop bar and easy access to northern-lights tours.',
    facilities: ['Free Wi-Fi', 'Geothermal spa', 'Rooftop bar', 'Breakfast included', 'Aurora wake-up call'],
    roomTypes: [
      { name: 'Standard Room', price: 190, size: 28 },
      { name: 'Aurora View Room', price: 260, size: 36 },
      { name: 'Panorama Suite', price: 400, size: 60 },
    ],
    available: true,
  },
  {
    id: 10,
    name: 'Old Quarter Garden Hotel',
    destinationId: 14,
    location: 'Hoan Kiem, Hanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    rating: 4.6,
    pricePerNight: 90,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A charming boutique stay moments from Hoan Kiem Lake, with a roof garden, cozy family rooms and a famous pho breakfast bar.',
    facilities: ['Free Wi-Fi', 'Rooftop garden', 'Bike rental', 'Restaurant', 'Air conditioning'],
    roomTypes: [
      { name: 'City Room', price: 90, size: 24 },
      { name: 'Lake View Room', price: 120, size: 32 },
      { name: 'Family Suite', price: 190, size: 55 },
    ],
    available: true,
  },
  {
    id: 11,
    name: 'Alfama Sunset Suites',
    destinationId: 15,
    location: 'Alfama, Lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    rating: 4.8,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Sun-drenched suites in historic Alfama with terraces over terracotta rooftops, a short stroll from the riverfront and trams.',
    facilities: ['Free Wi-Fi', 'Terrace with view', 'Breakfast included', 'Concierge', 'Air conditioning'],
    roomTypes: [
      { name: 'Tram View Room', price: 150, size: 28 },
      { name: 'River View Suite', price: 210, size: 42 },
      { name: 'Rooftop Penthouse', price: 330, size: 70 },
    ],
    available: true,
  },
  {
    id: 12,
    name: 'Angkor Palm Heritage Hotel',
    destinationId: 16,
    location: 'Old Market District, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    rating: 4.8,
    pricePerNight: 120,
    image: 'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    gallery: [
      'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
      'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
      'https://i.pinimg.com/736x/4d/98/24/4d982407f7ce85444489210a2bff4847.jpg',
    ],
    description:
      'A beautiful boutique hotel close to the Old Market with a palm-fringed pool, spa and free tuk-tuk service to the Angkor temple complex.',
    facilities: ['Free Wi-Fi', 'Pool', 'Spa', 'Free tuk-tuk shuttle', 'Restaurant', 'Bike rental'],
    roomTypes: [
      { name: 'Temple Garden Room', price: 120, size: 30 },
      { name: 'Pool View Room', price: 160, size: 38 },
      { name: 'Angkor Royal Suite', price: 260, size: 60 },
    ],
    available: true,
  },
  {
    id: 13,
    name: 'Table Bay Boutique',
    destinationId: 17,
    location: 'V&A Waterfront, Cape Town',
    city: 'Cape Town',
    country: 'South Africa',
    rating: 4.7,
    pricePerNight: 170,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A stylish waterfront hotel with tables looking onto the harbour, rooftop infinity pool and shuttles to Table Mountain.',
    facilities: ['Free Wi-Fi', 'Infinity pool', 'Harbour views', 'Restaurant', 'Free parking'],
    roomTypes: [
      { name: 'Harbour Room', price: 170, size: 30 },
      { name: 'Mountain View Room', price: 220, size: 40 },
      { name: 'Waterfront Suite', price: 340, size: 64 },
    ],
    available: true,
  },
  {
    id: 14,
    name: 'Bamboo Garden Ryokan',
    destinationId: 18,
    location: 'Higashiyama, Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    rating: 4.9,
    pricePerNight: 200,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'A traditional ryokan with tatami floors, garden hot-spring baths and kaiseki dinner, steps from the Higashiyama temples.',
    facilities: ['Free Wi-Fi', 'Onsen bath', 'Garden', 'Kaiseki dining', 'Tea ceremony'],
    roomTypes: [
      { name: 'Tatami Room', price: 200, size: 32 },
      { name: 'Garden View Room', price: 270, size: 42 },
      { name: 'Deluxe Ryokan Suite', price: 420, size: 68 },
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