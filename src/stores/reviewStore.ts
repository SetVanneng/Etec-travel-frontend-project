// ---------------------------------------------------------------------------
// reviewStore.ts (Pinia store)
// Manages user reviews for destinations, hotels and activities.
// User reviews are stored in localStorage so they survive a browser restart.
// Only logged-in users can post a review and each user can only review a
// given item once.
//
// A large set of sample reviews from fictional customers is INCLUDED in the
// list so every detail page looks lively on first load. These seeds are
// merged on startup and are never treated as the signed-in user's own
// reviews (they are re-seeded on every visit), so posting/removing your own
// review always works.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'

/** Which kind of item a review belongs to. */
export type ReviewTargetType = 'destination' | 'hotel' | 'activity'

export interface Review {
  id: number
  targetType: ReviewTargetType
  targetId: number
  /** Display name of the author (from the auth store). */
  author: string
  /** 1 to 5 stars. */
  rating: number
  text: string
  /** ISO date string, see new Date().toISOString(). */
  date: string
}

const STORAGE_KEY = 'reviews'
const MAX_TEXT_LENGTH = 400

// ---------------------------------------------------------------------------
// Seed reviews from fictional customers. Roughly two per destination, two per
// hotel and three per activity, keyed to the ids in the mock data files.
// ---------------------------------------------------------------------------
const seedReviews: Review[] = [
  // --- Destinations ---
  { id: 10001, targetType: 'destination', targetId: 1, author: 'Maya Stone', rating: 5, text: 'Bali stole our hearts. The rice terraces at sunrise and the temple ceremonies were magical, and our little villa in Ubud felt like paradise.', date: '2026-01-18' },
  { id: 10002, targetType: 'destination', targetId: 1, author: 'Rafael Ortiz', rating: 4, text: 'Beautiful beaches and friendly locals. A bit crowded around Seminyak, but head north and you will have the island almost to yourself.', date: '2025-12-03' },
  { id: 10003, targetType: 'destination', targetId: 2, author: 'Maya Stone', rating: 5, text: 'Santorini exceeded every expectation. The sunsets at Oia and the caldera boat tour were magical.', date: '2026-05-14' },
  { id: 10004, targetType: 'destination', targetId: 2, author: 'Jonas Lindqvist', rating: 5, text: 'The definition of photogenic. Even the walk down to the old port at Fira felt like a movie scene.', date: '2025-10-22' },
  { id: 10005, targetType: 'destination', targetId: 3, author: 'Lars Johansson', rating: 5, text: 'Clean air, dramatic peaks and unforgettable hikes. The Gornergrat railway is a must-do and the trails are incredibly well marked.', date: '2026-06-27' },
  { id: 10006, targetType: 'destination', targetId: 3, author: 'Sofia Almeida', rating: 5, text: 'We came for skiing and stayed for the views. Everything runs like clockwork, just as you would expect.', date: '2026-02-11' },
  { id: 10007, targetType: 'destination', targetId: 4, author: 'Hannah Kim', rating: 5, text: 'Banff in autumn is unreal. Turquoise lakes, moose sightings and trails you could photograph forever.', date: '2025-10-05' },
  { id: 10008, targetType: 'destination', targetId: 4, author: 'Oliver Bennett', rating: 4, text: 'Stunning scenery and great wildlife. Book Lake Louise shuttle early and bring bear spray on the trails.', date: '2026-07-02' },
  { id: 10009, targetType: 'destination', targetId: 5, author: 'Camille Dubois', rating: 5, text: 'Paris is always a good idea. Strolling the Seine at dusk and wandering Montmartre beats any checklist.', date: '2026-03-15' },
  { id: 10010, targetType: 'destination', targetId: 5, author: 'Tom Richards', rating: 4, text: 'Wonderful museums and cafes, but the queues everywhere are long. Wake up early and you will be rewarded.', date: '2025-11-30' },
  { id: 10011, targetType: 'destination', targetId: 6, author: 'Kenji Watanabe', rating: 5, text: 'Tokyo is a sensory overload in the best way. Street food tour was the highlight of our trip.', date: '2026-06-02' },
  { id: 10012, targetType: 'destination', targetId: 6, author: 'Naomi Carter', rating: 5, text: 'Spotless, endlessly interesting and the food is incredible on every corner. The metro is so easy to use.', date: '2026-04-09' },
  { id: 10013, targetType: 'destination', targetId: 7, author: 'Francesca Ricci', rating: 5, text: 'Rome is a living open-air museum. The Colosseum at golden hour still gives me goosebumps.', date: '2026-05-01' },
  { id: 10014, targetType: 'destination', targetId: 7, author: 'Daniel Porter', rating: 4, text: 'History everywhere you look and the food is fantastic. A bit chaotic in summer but worth it.', date: '2025-09-14' },
  { id: 10015, targetType: 'destination', targetId: 8, author: 'Sokunthea Chan', rating: 5, text: 'Siem Reap is the warmest place we have ever visited - both the people and the temples. Angkor at sunrise is simply unforgettable.', date: '2025-12-18' },
  { id: 10016, targetType: 'destination', targetId: 8, author: 'George Papas', rating: 5, text: 'Five days was barely enough. Take a tuk-tuk to the outer temples and stay for the night markets.', date: '2026-01-27' },
  { id: 10017, targetType: 'destination', targetId: 9, author: 'Jack Wilson', rating: 5, text: 'Queenstown is the adventure capital for a reason. Bungee, luge and lake views - we are already planning our return.', date: '2026-02-20' },
  { id: 10018, targetType: 'destination', targetId: 9, author: 'Ava Thompson', rating: 5, text: 'Stunning mountains reflected in the lake, great coffee and so much to do. The gondola at sunset is a must.', date: '2026-07-14' },
  { id: 10019, targetType: 'destination', targetId: 10, author: 'Isabelle Moreau', rating: 5, text: 'Pure escapism. Our overwater villa, the turquoise lagoon and the reef snorkelling were all dreamlike.', date: '2026-03-25' },
  { id: 10020, targetType: 'destination', targetId: 10, author: 'Rajiv Menon', rating: 5, text: 'The most peaceful week of our lives. Breakfast delivered by boat, dolphins at sunset - do not change a thing.', date: '2026-06-19' },
  { id: 10021, targetType: 'destination', targetId: 11, author: 'Yusuf Haddad', rating: 5, text: 'Marrakech is a feast for all the senses. The souks, the spice smells, the riads - chaotic in the best possible way.', date: '2026-04-17' },
  { id: 10022, targetType: 'destination', targetId: 11, author: 'Elena Petrova', rating: 4, text: 'Gorgeous colours and amazing food. Just be ready for constant bargaining in the medina.', date: '2026-02-02' },
  { id: 10023, targetType: 'destination', targetId: 12, author: 'Matthew Silva', rating: 5, text: 'Costa Rica delivered on every promise. Sloths, volcanoes and the best coffee we have ever had.', date: '2025-11-09' },
  { id: 10024, targetType: 'destination', targetId: 12, author: 'Laura Gomez', rating: 5, text: 'Pure wild jungle trails and waterfalls. We saw toucans every single day - pure luck and pure joy.', date: '2026-01-08' },
  { id: 10025, targetType: 'destination', targetId: 13, author: 'Erik Hansen', rating: 5, text: 'Chasing the northern lights outside Reykjavik felt like spotting magic. The hot springs after were perfect.', date: '2025-12-29' },
  { id: 10026, targetType: 'destination', targetId: 13, author: 'Clara Novak', rating: 4, text: 'Out of this world landscapes. Expensive but unforgettable - skip the tours and rent a campervan.', date: '2026-03-06' },
  { id: 10027, targetType: 'destination', targetId: 14, author: 'Thanh Le', rating: 5, text: 'Hanoi is a sensory adventure - buzzing streets, incredible pho and the friendliest locals. Ha Long Bay nearby is a dream.', date: '2026-01-12' },
  { id: 10028, targetType: 'destination', targetId: 14, author: 'Mina Park', rating: 4, text: 'Loved the old quarter and the lakes. Take a night train north for the real mountain experience.', date: '2025-10-15' },
  { id: 10029, targetType: 'destination', targetId: 15, author: 'Beatriz Santos', rating: 5, text: 'Lisbon charmed us with its hills, trams and pastéis de nata. The sunset spots over the river are spectacular.', date: '2026-04-05' },
  { id: 10030, targetType: 'destination', targetId: 15, author: 'Noah Schmidt', rating: 4, text: 'Easy, affordable and beautiful. The trams get crowded but you can walk most of it.', date: '2025-12-07' },
  { id: 10031, targetType: 'destination', targetId: 16, author: 'Maya Stone', rating: 5, text: 'Seeing Angkor Wat with the wind chimes and morning mist made us feel tiny in the best way. Pure awe.', date: '2026-02-14' },
  { id: 10032, targetType: 'destination', targetId: 16, author: 'Wei Zhang', rating: 5, text: 'The sheer scale of the temples is impossible to describe. Bayon deserves a full morning.', date: '2025-11-21' },
  { id: 10033, targetType: 'destination', targetId: 17, author: 'Amara Dube', rating: 5, text: 'Table Mountain made it; the penguins sealed the deal. Cape Towns coastline is world class.', date: '2026-03-30' },
  { id: 10034, targetType: 'destination', targetId: 17, author: 'Liam OConnor', rating: 4, text: 'Gorgeous city with amazing food and wines. Pack layers - the weather changes in minutes.', date: '2026-02-08' },
  { id: 10035, targetType: 'destination', targetId: 18, author: 'Sakura Tanaka', rating: 5, text: 'Kyoto in maple season is a painting. The temples, the tea houses and the quiet gardens - we are already planning next year.', date: '2025-11-16' },
  { id: 10036, targetType: 'destination', targetId: 18, author: 'Michael Chen', rating: 5, text: 'Hands down our favourite city in Japan. Rent a bicycle and get lost in the alleys north of the station.', date: '2026-04-26' },
  { id: 10037, targetType: 'destination', targetId: 19, author: 'Omar Farouk', rating: 5, text: 'Dubai feels like the future. The skyline, the desert safaris and the malls are all on another level.', date: '2026-05-20' },
  { id: 10038, targetType: 'destination', targetId: 19, author: 'Sven Nilsson', rating: 4, text: 'Spectacular and spotless. Hot in summer, so time your outdoor plans for the morning.', date: '2025-09-27' },
  { id: 10039, targetType: 'destination', targetId: 20, author: 'Carlos Mendez', rating: 5, text: 'Barcelona blends city and beach perfectly. Gaudí everywhere and tapas till midnight - no complaints.', date: '2026-06-05' },
  { id: 10040, targetType: 'destination', targetId: 20, author: 'Freya Dahl', rating: 4, text: 'Beautiful architecture and a lovely vibe along the beach. Keep your pockets zipped in the metro though.', date: '2026-01-23' },
  { id: 10041, targetType: 'destination', targetId: 21, author: 'Poppy Hughes', rating: 5, text: 'Sydney is instantly likeable. Bondi to Coogee coastal walk and the opera house at sunset - perfect.', date: '2026-01-04' },
  { id: 10042, targetType: 'destination', targetId: 21, author: 'James Walker', rating: 4, text: 'Great harbour, vibrant food scene and friendly locals. Slightly pricey but worth every cent.', date: '2025-12-11' },
  { id: 10043, targetType: 'destination', targetId: 22, author: 'Aiden Brooks', rating: 5, text: 'New York truly never sleeps. The skyline views, Broadway shows and corner pizza - an unforgettable energy.', date: '2026-05-07' },
  { id: 10044, targetType: 'destination', targetId: 22, author: 'Rosa Martinez', rating: 4, text: 'Endless things to do and the best burgers anywhere. Bring comfortable shoes, you will walk a lot.', date: '2026-06-16' },
  { id: 10045, targetType: 'destination', targetId: 23, author: 'Diego Fuentes', rating: 5, text: 'Machu Picchu is everything you imagine and more. Get the Gate 1 sunrise slot and you will never forget it.', date: '2026-05-28' },
  { id: 10046, targetType: 'destination', targetId: 23, author: 'Hana Suzuki', rating: 5, text: 'The Inca Trail was tough but spiritual. Arriving above the citadel on day four is worth every blister.', date: '2026-07-07' },
  { id: 10047, targetType: 'destination', targetId: 24, author: 'Fiona Campbell', rating: 5, text: 'Patagonia is raw, wild and breathtaking. The W trek and the glacier views left us speechless.', date: '2026-02-26' },
  { id: 10048, targetType: 'destination', targetId: 24, author: 'Andres Ruiz', rating: 5, text: 'The most dramatic landscapes we have ever seen. Strong winds and long days, but the reward is endless.', date: '2026-03-19' },
  { id: 10049, targetType: 'destination', targetId: 25, author: 'Patchara Somsri', rating: 5, text: 'Phuket has everything - islands, seafood and sunsets. The longtail boat days were the best of our holiday.', date: '2026-04-22' },
  { id: 10050, targetType: 'destination', targetId: 25, author: 'Karina Ivanova', rating: 4, text: 'Gorgeous beaches and great value. Busy in the south, but Phi Phi day trips are a must.', date: '2026-02-01' },
  { id: 10051, targetType: 'destination', targetId: 26, author: 'Nadia Abboud', rating: 5, text: 'Petra at sunset through the Siq - the rose-red city is even better than the photos. A once-in-a-lifetime place.', date: '2026-03-03' },
  { id: 10052, targetType: 'destination', targetId: 26, author: 'Martin Keller', rating: 5, text: 'The Treasury chills you to the bone when it appears. Allow two full days and bring plenty of water.', date: '2025-10-28' },
  { id: 10053, targetType: 'destination', targetId: 27, author: 'Giulia Conti', rating: 5, text: 'The Amalfi Coast is postcard perfection. Positano, limoncello and cliffside drives we will never forget.', date: '2026-06-11' },
  { id: 10054, targetType: 'destination', targetId: 27, author: 'Patrick Doyle', rating: 4, text: 'Stunning and romantic, though the coastal road is stressful in August. Go in May or September.', date: '2026-05-17' },
  { id: 10055, targetType: 'destination', targetId: 28, author: 'Emily Nguyen', rating: 5, text: 'Yosemite is a giant cathedral of granite. Half Dome at dawn and the meadows - nature at its grandest.', date: '2026-06-23' },
  { id: 10056, targetType: 'destination', targetId: 28, author: 'Chris Taylor', rating: 5, text: 'Waterfalls, bears and starry skies. The Valley view in the evening is one of the great sights of the world.', date: '2025-09-19' },
  { id: 10057, targetType: 'destination', targetId: 29, author: 'Alice Chen', rating: 5, text: 'Hong Kong never sleeps. The Peak tram views are stunning, just go early to avoid the queues.', date: '2026-07-21' },
  { id: 10058, targetType: 'destination', targetId: 29, author: 'Peter Lau', rating: 4, text: 'A city of contrasts - neon and temples, dim sum and hikes. The harbour light show is a fun free night out.', date: '2026-02-17' },
  { id: 10059, targetType: 'destination', targetId: 30, author: 'Ravi Kumar', rating: 5, text: 'Singapore is clean, green and effortless. Gardens by the Bay at night and the hawker centres are unmissable.', date: '2026-05-12' },
  { id: 10060, targetType: 'destination', targetId: 30, author: 'Grace Lim', rating: 5, text: 'The most comfortable city to travel solo - safe, fast and endlessly delicious. Chilli crab changed my life.', date: '2026-07-30' },
  { id: 10061, targetType: 'destination', targetId: 31, author: 'Diego Garcia', rating: 4, text: 'Mexico City is a hidden gem - incredible food, art and history. Chapultepec and the street markets are wonderful.', date: '2026-03-28' },
  { id: 10062, targetType: 'destination', targetId: 31, author: 'Julia Weber', rating: 4, text: 'Wonderful museums and flavours. The altitude takes a day to adjust to, so take it easy first.', date: '2026-02-05' },
  { id: 10063, targetType: 'destination', targetId: 32, author: 'Pedro Alves', rating: 5, text: 'Rio is pure joy - beaches, samba and the most spectacular urban setting anywhere. Sugarloaf at sunset is essential.', date: '2026-01-30' },
  { id: 10064, targetType: 'destination', targetId: 32, author: 'Chloe Martin', rating: 4, text: 'Incredible energy and views. Keep an eye on your belongings on the beach and you will have a perfect time.', date: '2026-02-12' },
  { id: 10065, targetType: 'destination', targetId: 33, author: 'Emre Demir', rating: 5, text: 'Istanbul bridges continents and centuries. Hagia Sophia, the bazaars and a Bosphorus cruise - magical.', date: '2026-06-08' },
  { id: 10066, targetType: 'destination', targetId: 33, author: 'Anya Sokolov', rating: 5, text: 'The call to prayer at sunset over the skyline lives in my memory. Food is incredible and people are warm.', date: '2026-04-02' },
  { id: 10067, targetType: 'destination', targetId: 34, author: 'Cian Murphy', rating: 4, text: 'Dublin is all the stereotypes done right - pubs, music and friendly chats. Temple Bar is touristy but fun.', date: '2026-03-08' },
  { id: 10068, targetType: 'destination', targetId: 34, author: 'Sarah Collins', rating: 4, text: 'Compact, walkable and full of character. Take a day trip to the Cliffs of Moher - worth every minute.', date: '2025-12-14' },
  { id: 10069, targetType: 'destination', targetId: 35, author: 'Jana Kovarova', rating: 5, text: 'Prague is a fairy tale that survived. Charles Bridge at dawn and the castle views - flawless.', date: '2026-05-24' },
  { id: 10070, targetType: 'destination', targetId: 35, author: 'Tom Fischer', rating: 4, text: 'Beautiful old town and great beer. Peak summer is busy, but the side streets are quiet and lovely.', date: '2026-06-30' },
  { id: 10071, targetType: 'destination', targetId: 36, author: 'Ingrid Berg', rating: 5, text: 'Oslo surprised us - modern, calm and surrounded by fjord goodness. The museums on Bygdøy are superb.', date: '2026-07-18' },
  { id: 10072, targetType: 'destination', targetId: 36, author: 'Fred Sanders', rating: 4, text: 'Clean air and wonderful nature within an hour of downtown. Pricey but a great base for the fjords.', date: '2026-05-31' },
  { id: 10073, targetType: 'destination', targetId: 37, author: 'Hassan Ali', rating: 5, text: 'The pyramids at dawn are beyond words. The museum is changing fast and the Nile felucca rides are pure bliss.', date: '2026-04-14' },
  { id: 10074, targetType: 'destination', targetId: 37, author: 'Marta Lewandowska', rating: 4, text: 'Ancient wonders plus a lively, noisy city. Use a good guide for the sites and haggle everywhere.', date: '2026-01-05' },
  { id: 10075, targetType: 'destination', targetId: 38, author: 'Ji-eun Park', rating: 5, text: 'Seoul is vibrant, delicious and endlessly photogenic. The palaces in hanbok made the kids feel famous.', date: '2026-05-05' },
  { id: 10076, targetType: 'destination', targetId: 38, author: 'Nathan Lee', rating: 5, text: 'Late-night street food, neon shopping streets and beautiful temples. Easily one of our favourite cities.', date: '2026-03-13' },

  // --- Hotels ---
  { id: 20001, targetType: 'hotel', targetId: 1, author: 'Maya Stone', rating: 5, text: 'Waking up to the pool view and the palm trees each morning felt like a dream. Service was flawless.', date: '2026-01-18' },
  { id: 20002, targetType: 'hotel', targetId: 1, author: 'Jack Wilson', rating: 4, text: 'Great location, lovely gardens and a proper holiday feel. The villa was huge and very comfortable.', date: '2026-05-09' },
  { id: 20003, targetType: 'hotel', targetId: 2, author: 'Isabelle Moreau', rating: 5, text: 'The caldera suite balcony is the single best view we have ever had from a room. Breakfast with that backdrop - incredible.', date: '2026-03-25' },
  { id: 20004, targetType: 'hotel', targetId: 2, author: 'Jonas Lindqvist', rating: 5, text: 'Spotless, calm and the staff remembered our coffee order by day two. Highly recommend the sunset from the pool.', date: '2025-10-22' },
  { id: 20005, targetType: 'hotel', targetId: 3, author: 'Sofia Almeida', rating: 5, text: 'The Matterhorn view suite is worth the splurge. After-ski fondue by the fireplace made our whole trip.', date: '2026-02-11' },
  { id: 20006, targetType: 'hotel', targetId: 3, author: 'Edwin Kraft', rating: 4, text: 'Wonderful alpine lodge with a real ski-in feel. Rooms are cosy rather than big, but the setting is unbeatable.', date: '2026-01-16' },
  { id: 20007, targetType: 'hotel', targetId: 4, author: 'Hannah Kim', rating: 5, text: 'Our cabin looked right out over the lake and the fall colours made it a postcard. The forest quiet is priceless.', date: '2025-10-05' },
  { id: 20008, targetType: 'hotel', targetId: 4, author: 'Chris Taylor', rating: 4, text: 'Beautiful, quiet and handy for the national park. Bring your own breakfast options - the shop is basic.', date: '2025-09-19' },
  { id: 20009, targetType: 'hotel', targetId: 5, author: 'Camille Dubois', rating: 5, text: 'Open the curtains and the Eiffel Tower is right there. Elegant, quiet rooms and a superb breakfast room.', date: '2026-03-15' },
  { id: 20010, targetType: 'hotel', targetId: 5, author: 'Tom Richards', rating: 4, text: 'Classic Parisian charm and a great location for the tower. Rooms are small but that is entirely normal here.', date: '2025-11-30' },
  { id: 20011, targetType: 'hotel', targetId: 6, author: 'Kenji Watanabe', rating: 5, text: 'Compact, spotless and a perfect base in the city. The staff went out of their way to give us directions each day.', date: '2026-06-02' },
  { id: 20012, targetType: 'hotel', targetId: 6, author: 'Naomi Carter', rating: 4, text: 'Surprisingly quiet rooms in the middle of Tokyo and great transport links. The single rooms are snug but excellent.', date: '2026-04-09' },
  { id: 20013, targetType: 'hotel', targetId: 7, author: 'Francesca Ricci', rating: 5, text: 'Walk out the door and the Colosseum is a minute away. Beautifully kept rooms with a timeless feel.', date: '2026-05-01' },
  { id: 20014, targetType: 'hotel', targetId: 7, author: 'Daniel Porter', rating: 4, text: 'Big value for such a location, friendly staff and a lovely rooftop. Breakfast could use more veggie options.', date: '2025-09-14' },
  { id: 20015, targetType: 'hotel', targetId: 8, author: 'Sokunthea Chan', rating: 5, text: 'Coming back from temple sunrise to this calm garden and pool was perfection. The staff are wonderful people.', date: '2025-12-18' },
  { id: 20016, targetType: 'hotel', targetId: 8, author: 'George Papas', rating: 4, text: 'Great value, lush gardens and close to the night market. A tuk-tuk to Angkor is minutes away.', date: '2026-01-27' },
  { id: 20017, targetType: 'hotel', targetId: 9, author: 'Erik Hansen', rating: 5, text: 'We watched the northern lights from the Aurora view room on night one. That alone is worth every krona.', date: '2025-12-29' },
  { id: 20018, targetType: 'hotel', targetId: 9, author: 'Clara Novak', rating: 4, text: 'Comfortable, warm and brilliantly located for the aurora hunts. The lounge is a great place to swap stories.', date: '2026-03-06' },
  { id: 20019, targetType: 'hotel', targetId: 10, author: 'Thanh Le', rating: 5, text: 'Loved coming back to this calm garden hotel after the Hanoi chaos. Phoenix coffee and the lake walk - bliss.', date: '2026-01-12' },
  { id: 20020, targetType: 'hotel', targetId: 10, author: 'Mina Park', rating: 4, text: 'Charming and central with lovely staff. The family suite easily slept four of us.', date: '2025-10-15' },
  { id: 20021, targetType: 'hotel', targetId: 11, author: 'Beatriz Santos', rating: 5, text: 'Watching the trams rattle by from our little balcony was pure Lisbon. The rooftop at sunset is a secret gem.', date: '2026-04-05' },
  { id: 20022, targetType: 'hotel', targetId: 11, author: 'Noah Schmidt', rating: 4, text: 'Stylish rooms and a superb location in Alfama. Bring earplugs - the tram turns are loud at night.', date: '2025-12-07' },
  { id: 20023, targetType: 'hotel', targetId: 12, author: 'Wei Zhang', rating: 5, text: 'A wonderfully calm heritage hotel. The temple garden room felt like our own private sanctuary.', date: '2025-11-21' },
  { id: 20024, targetType: 'hotel', targetId: 12, author: 'Maya Stone', rating: 4, text: 'Beautiful pool and a gorgeous setting. Breakfast was lovely, the tuk-tuk drivers outside a bit pushy.', date: '2026-02-14' },
  { id: 20025, targetType: 'hotel', targetId: 13, author: 'Amara Dube', rating: 5, text: 'The harbour room view over Table Bay is spectacular. Close enough to walk to the V&A waterfront.', date: '2026-03-30' },
  { id: 20026, targetType: 'hotel', targetId: 13, author: 'Liam OConnor', rating: 4, text: 'Boutique charm and a helpful team. Breakfast was the highlight of our mornings.', date: '2026-02-08' },
  { id: 20027, targetType: 'hotel', targetId: 14, author: 'Sakura Tanaka', rating: 5, text: 'Our first ryokan and it was perfect. Sliding doors, a private tub and the most attentive kaiseki dinner.', date: '2025-11-16' },
  { id: 20028, targetType: 'hotel', targetId: 14, author: 'Michael Chen', rating: 5, text: 'The garden view room and the shared onsen made us feel completely at peace. Worth the walk from the station.', date: '2026-04-26' },
  { id: 20029, targetType: 'hotel', targetId: 15, author: 'Omar Farouk', rating: 5, text: 'Watching the fountains from the room balcony was pure wow. The lobby alone feels like a modern art gallery.', date: '2026-05-20' },
  { id: 20030, targetType: 'hotel', targetId: 15, author: 'Sven Nilsson', rating: 4, text: 'Immaculate and grand with a great pool. Reaches for the wallet a little fast, but the experience is real.', date: '2025-09-27' },
  { id: 20031, targetType: 'hotel', targetId: 16, author: 'Carlos Mendez', rating: 5, text: 'Steps from Gaudí and full of character. The terrace is a perfect evening spot with the cathedral nearby.', date: '2026-06-05' },
  { id: 20032, targetType: 'hotel', targetId: 16, author: 'Freya Dahl', rating: 4, text: 'Great vibe, unusual design and a good location. The rooms are stylish but on the compact side.', date: '2026-01-23' },
  { id: 20033, targetType: 'hotel', targetId: 17, author: 'Poppy Hughes', rating: 5, text: 'Waking up to the Opera House out of the window was unreal. Wonderful staff and a brilliant espresso bar.', date: '2026-01-04' },
  { id: 20034, targetType: 'hotel', targetId: 17, author: 'James Walker', rating: 4, text: 'Superb harbour location and comfortable rooms. The harbour view upgrade is worth it.', date: '2025-12-11' },
  { id: 20035, targetType: 'hotel', targetId: 18, author: 'Aiden Brooks', rating: 5, text: 'The skyline room at night is a movie set. Subway right outside and the friendliest front desk in the city.', date: '2026-05-07' },
  { id: 20036, targetType: 'hotel', targetId: 18, author: 'Rosa Martinez', rating: 4, text: 'Great location for Broadway and transport. Rooms are smart and the rooftop is a vibe.', date: '2026-06-16' },
  { id: 20037, targetType: 'hotel', targetId: 19, author: 'Diego Fuentes', rating: 5, text: 'The perfect base before the Inca Trail. Warm showers, great breakfast and they stored our extra bags safely.', date: '2026-05-28' },
  { id: 20038, targetType: 'hotel', targetId: 19, author: 'Hana Suzuki', rating: 4, text: 'Cosy mountain lodge with a real sense of rest before the trek. The views from the terrace are lovely.', date: '2026-07-07' },
  { id: 20039, targetType: 'hotel', targetId: 20, author: 'Fiona Campbell', rating: 5, text: 'Lying in bed staring at the peaks through the window - this is what Patagonia trips are supposed to feel like.', date: '2026-02-26' },
  { id: 20040, targetType: 'hotel', targetId: 20, author: 'Andres Ruiz', rating: 4, text: 'Stunning setting and honest staff. The steppe room is cosy and the dinner was the best in Torres del Paine.', date: '2026-03-19' },
  { id: 20041, targetType: 'hotel', targetId: 21, author: 'Patchara Somsri', rating: 5, text: 'The pool access room was a dream - wake up and slide straight into the water. Pure Phuket happiness.', date: '2026-04-22' },
  { id: 20042, targetType: 'hotel', targetId: 21, author: 'Karina Ivanova', rating: 4, text: 'Beautiful resort with a lovely beach and great food. The beachfront villas are spectacular.', date: '2026-02-01' },
  { id: 20043, targetType: 'hotel', targetId: 22, author: 'Nadia Abboud', rating: 5, text: 'After the heat of Petra, the pool and the desert night sky felt like luxury. The tent deluxe is an experience.', date: '2026-03-03' },
  { id: 20044, targetType: 'hotel', targetId: 22, author: 'Martin Keller', rating: 4, text: 'A special way to end the Petra days. Rooms are thematic and the location at the site gates is perfect.', date: '2025-10-28' },
  { id: 20045, targetType: 'hotel', targetId: 23, author: 'Giulia Conti', rating: 5, text: 'The sea view suite clings to the cliff exactly like the photos. Breakfast, the terrace and the infinity edge - dreamy.', date: '2026-06-11' },
  { id: 20046, targetType: 'hotel', targetId: 23, author: 'Patrick Doyle', rating: 4, text: 'Romantic and memorable. Just mind the hairpin drive down to it - park at the top and enjoy the walk.', date: '2026-05-17' },
  { id: 20047, targetType: 'hotel', targetId: 24, author: 'Emily Nguyen', rating: 5, text: 'Falling asleep to the river through the pines is pure Yosemite. The family cabin was huge and spotless.', date: '2026-06-23' },
  { id: 20048, targetType: 'hotel', targetId: 24, author: 'Chris Taylor', rating: 4, text: 'Great base right by the park entrance. Simple, comfortable and the fire pit evenings are special.', date: '2025-09-19' },
  { id: 20049, targetType: 'hotel', targetId: 25, author: 'Isabelle Moreau', rating: 5, text: 'Our overwater bungalow was beyond our dreams - glass floors, direct reef snorkelling and zero noise at night.', date: '2026-03-25' },
  { id: 20050, targetType: 'hotel', targetId: 25, author: 'Rajiv Menon', rating: 5, text: 'True perfection. Private, quiet and the staff anticipate everything. The reef view villa is worth it.', date: '2026-06-19' },
  { id: 20051, targetType: 'hotel', targetId: 26, author: 'Matthew Silva', rating: 5, text: 'Falling asleep in a treehouse with howler monkeys in the background - there is nothing like it.', date: '2025-11-09' },
  { id: 20052, targetType: 'hotel', targetId: 26, author: 'Laura Gomez', rating: 4, text: 'An eco-paradise with a great pool. Big fan of the volcano view room and the wildlife tours they arranged.', date: '2026-01-08' },
  { id: 20053, targetType: 'hotel', targetId: 27, author: 'Marcus Reed', rating: 5, text: 'The fitness suite has everything we needed and the gym program kept us on track for our half marathon.', date: '2026-06-06' },
  { id: 20054, targetType: 'hotel', targetId: 27, author: 'Leila Haddad', rating: 4, text: 'Great energy, healthy menus and a proper training floor. The active room was clean and compact.', date: '2026-04-11' },
  { id: 20055, targetType: 'hotel', targetId: 28, author: 'Alice Chen', rating: 5, text: 'The harbour view from the rooftop pool is unreal. Dim sum brunch included is a lovely touch.', date: '2026-07-09' },
  { id: 20056, targetType: 'hotel', targetId: 28, author: 'Peter Lau', rating: 4, text: 'Great location above the harbour and a very comfortable bed. The skyline suite view is magnificent.', date: '2026-02-17' },
  { id: 20057, targetType: 'hotel', targetId: 29, author: 'Ravi Kumar', rating: 5, text: 'The orchard location is perfect and the penthouse view over the lights is unforgettable. Immaculate rooms.', date: '2026-05-12' },
  { id: 20058, targetType: 'hotel', targetId: 29, author: 'Grace Lim', rating: 5, text: 'Effortless check-in, a gorgeous pool and the best breakfast spread we saw in Singapore.', date: '2026-07-30' },
  { id: 20059, targetType: 'hotel', targetId: 30, author: 'Diego Garcia', rating: 4, text: 'A colonial gem right by the cathedral. The courtyard room was cool and quiet - perfect for the city heat.', date: '2026-03-28' },
  { id: 20060, targetType: 'hotel', targetId: 30, author: 'Julia Weber', rating: 4, text: 'Full of character and charm. The rooftop breakfast with the cathedral view was my favourite hour of each day.', date: '2026-02-05' },
  { id: 20061, targetType: 'hotel', targetId: 31, author: 'Pedro Alves', rating: 5, text: 'The ocean view room is everything - open the balcony and you are on Copacabana. Great caipirinhas too.', date: '2026-01-30' },
  { id: 20062, targetType: 'hotel', targetId: 31, author: 'Chloe Martin', rating: 4, text: 'Steps from the beach and a lively location. The penthouse terrace is fantastic for sunsets.', date: '2026-02-12' },
  { id: 20063, targetType: 'hotel', targetId: 32, author: 'Emre Demir', rating: 5, text: 'A palace in the best sense - the bosphorus view suite and the Ottoman details made us feel like royalty.', date: '2026-06-08' },
  { id: 20064, targetType: 'hotel', targetId: 32, author: 'Anya Sokolov', rating: 4, text: 'Beautiful heritage building in a great spot for the ferry. The Turkish breakfast is a feast.', date: '2026-04-02' },
  { id: 20065, targetType: 'hotel', targetId: 33, author: 'Cian Murphy', rating: 4, text: 'A lovely Georgian townhouse with a proper Irish welcome. The garden suite was our favourite place to relax.', date: '2026-03-08' },
  { id: 20066, targetType: 'hotel', targetId: 33, author: 'Sarah Collins', rating: 4, text: 'Charming, quiet and close to the parks. Breakfast was unhurried and delicious.', date: '2025-12-14' },
  { id: 20067, targetType: 'hotel', targetId: 34, author: 'Jana Kovarova', rating: 5, text: 'Right by Charles Bridge with a river view suite to die for. The turret room has a fairytale feel.', date: '2026-05-24' },
  { id: 20068, targetType: 'hotel', targetId: 34, author: 'Tom Fischer', rating: 4, text: 'A boutique gem in the old town. The rooftop terrace is the perfect end to a Prague day.', date: '2026-06-30' },
  { id: 20069, targetType: 'hotel', targetId: 35, author: 'Ingrid Berg', rating: 5, text: 'The fjord from the window and absolute silence at night - Scandinavian serenity done right.', date: '2026-07-18' },
  { id: 20070, targetType: 'hotel', targetId: 35, author: 'Fred Sanders', rating: 4, text: 'Modern, calm and a five-minute cycle to the waterfront. The nordic penthouse is superb value.', date: '2026-05-31' },
  { id: 20071, targetType: 'hotel', targetId: 36, author: 'Hassan Ali', rating: 5, text: 'The pyramids are lit up from the roof at night - it felt like owning the desert. Rooms are simple and lovely.', date: '2026-04-14' },
  { id: 20072, targetType: 'hotel', targetId: 36, author: 'Marta Lewandowska', rating: 4, text: 'A fantastic base for the Giza plateau. Great terrace views and a helpful team for tours.', date: '2026-01-05' },
  { id: 20073, targetType: 'hotel', targetId: 37, author: 'Ji-eun Park', rating: 5, text: 'The river view suite at night - the city lights over the Han are beautiful. Spotless and modern.', date: '2026-05-05' },
  { id: 20074, targetType: 'hotel', targetId: 37, author: 'Nathan Lee', rating: 4, text: 'Sleek, comfortable and close to the river parks. The gangnam penthouse is a showstopper.', date: '2026-03-13' },
  { id: 20075, targetType: 'hotel', targetId: 38, author: 'Jack Wilson', rating: 5, text: 'The Remarkables in the window every morning - the best view we had anywhere in New Zealand.', date: '2026-02-20' },
  { id: 20076, targetType: 'hotel', targetId: 38, author: 'Ava Thompson', rating: 5, text: 'A perfect Queenstown base. Smoked salmon breakfast, lake views and the friendliest staff.', date: '2026-07-14' },
  { id: 20077, targetType: 'hotel', targetId: 39, author: 'Yusuf Haddad', rating: 5, text: 'Our riad was a hidden heaven - fountain courtyard, mint tea and the quietest sleep in Marrakech.', date: '2026-04-17' },
  { id: 20078, targetType: 'hotel', targetId: 39, author: 'Elena Petrova', rating: 4, text: 'Gorgeous tiles and a roof terrace perfect for sunset. The courtyard suite is worth the upgrade.', date: '2026-02-02' },
  { id: 20079, targetType: 'hotel', targetId: 40, author: 'Maya Stone', rating: 5, text: 'The cave villa is the most romantic room we have ever stayed in - private jacuzzi and a caldera sunset.', date: '2026-05-14' },
  { id: 20080, targetType: 'hotel', targetId: 40, author: 'Jonas Lindqvist', rating: 5, text: 'Cliff-hugging luxury done perfectly. The staff arranged a boat day that made our holiday.', date: '2025-10-22' },
  { id: 20081, targetType: 'hotel', targetId: 41, author: 'Camille Dubois', rating: 5, text: 'The marais loft is chic, quiet and an easy walk everywhere. The strip of bakeries around the corner is a bonus.', date: '2026-03-15' },
  { id: 20082, targetType: 'hotel', targetId: 41, author: 'Tom Richards', rating: 4, text: 'A stylish hideaway in the best district. The parisian penthouse has genius light in the morning.', date: '2025-11-30' },
  { id: 20083, targetType: 'hotel', targetId: 42, author: 'Kenji Watanabe', rating: 5, text: 'Loved the temple view suite - Sensoji glowing at night from our window. Clean, calm and cleverly designed.', date: '2026-06-02' },
  { id: 20084, targetType: 'hotel', targetId: 42, author: 'Naomi Carter', rating: 4, text: 'The capsule pod was an experience and surprisingly comfy. Immaculate shared spaces.', date: '2026-04-09' },
  { id: 20085, targetType: 'hotel', targetId: 43, author: 'Francesca Ricci', rating: 5, text: 'A peaceful garden oasis in lively Trastevere. The rooftop room has an open-air tub - incredible.', date: '2026-05-01' },
  { id: 20086, targetType: 'hotel', targetId: 43, author: 'Daniel Porter', rating: 4, text: 'Charming, relaxed and surrounded by the best food in Rome. The garden rooms are very quiet.', date: '2025-09-14' },
  { id: 20087, targetType: 'hotel', targetId: 44, author: 'Sokunthea Chan', rating: 5, text: 'The silk villa is an absolute treat after the temples. Beautiful gardens, a lovely pool and wonderful hosts.', date: '2025-12-18' },
  { id: 20088, targetType: 'hotel', targetId: 44, author: 'George Papas', rating: 4, text: 'A pristine garden resort with real attention to detail. The river view suite is breezy and bright.', date: '2026-01-27' },
  { id: 20089, targetType: 'hotel', targetId: 45, author: 'Wei Zhang', rating: 5, text: 'Just minutes from the temples yet wonderfully quiet. The khmer villa felt authentic and the pool was perfect.', date: '2025-11-21' },
  { id: 20090, targetType: 'hotel', targetId: 45, author: 'Maya Stone', rating: 4, text: 'Great value with a friendly team. The royal suite is big and the garden is lovely for evening walks.', date: '2026-02-14' },
  { id: 20091, targetType: 'hotel', targetId: 46, author: 'Sakura Tanaka', rating: 5, text: 'A traditional machiya in Gion - lanterns, sliding doors and the quietest night in Kyoto.', date: '2025-11-16' },
  { id: 20092, targetType: 'hotel', targetId: 46, author: 'Michael Chen', rating: 5, text: 'The garden villa is serene and central. Tea in the garden at dusk is my best memory of Japan.', date: '2026-04-26' },
  { id: 20093, targetType: 'hotel', targetId: 47, author: 'Omar Farouk', rating: 5, text: 'The yacht in the marina view - what a way to stay in Dubai. The pearl suite is beautifully quiet.', date: '2026-05-20' },
  { id: 20094, targetType: 'hotel', targetId: 47, author: 'Sven Nilsson', rating: 4, text: 'High-end and spotless with a marina location. The pool deck at sunset is spectacular.', date: '2025-09-27' },
  { id: 20095, targetType: 'hotel', targetId: 48, author: 'Carlos Mendez', rating: 5, text: 'The sagrada suite looks straight at the basilica - we watched it glow all evening. A great base.', date: '2026-06-05' },
  { id: 20096, targetType: 'hotel', targetId: 48, author: 'Freya Dahl', rating: 4, text: 'Modern, stylish and a hop from the cathedral. The rooftop bar makes a great sunset stop.', date: '2026-01-23' },
  { id: 20097, targetType: 'hotel', targetId: 49, author: 'Poppy Hughes', rating: 5, text: 'Ocean view room one street from the beach - the surfers woke us each morning in the best way.', date: '2026-01-04' },
  { id: 20098, targetType: 'hotel', targetId: 49, author: 'James Walker', rating: 4, text: 'Relaxed, bright and a wonderful base for the coastal walk. The beach house loft is lovely.', date: '2025-12-11' },
  { id: 20099, targetType: 'hotel', targetId: 50, author: 'Aiden Brooks', rating: 5, text: 'The soho loft suites are everything - exposed brick, skyline views and the best espresso in the area.', date: '2026-05-07' },
  { id: 20100, targetType: 'hotel', targetId: 50, author: 'Rosa Martinez', rating: 4, text: 'Iconic NYC style in a great neighbourhood. The cast iron suite is as cool as it sounds.', date: '2026-06-16' },
  { id: 20101, targetType: 'hotel', targetId: 51, author: 'Thanh Le', rating: 5, text: 'The west lake suite watched the sunrise over the water - pure peace minutes from the old quarter.', date: '2026-01-12' },
  { id: 20102, targetType: 'hotel', targetId: 51, author: 'Mina Park', rating: 4, text: 'Quiet, fresh and great value for the lake view. The sunset penthouse is a steal.', date: '2025-10-15' },
  { id: 20103, targetType: 'hotel', targetId: 52, author: 'Erik Hansen', rating: 4, text: 'Modern lava-field chic with geothermal vibes. The geyser suite is warm and stylish.', date: '2025-12-29' },
  { id: 20104, targetType: 'hotel', targetId: 52, author: 'Clara Novak', rating: 5, text: 'The aurora penthouse has huge windows for a reason - we saw the lights right from the bathtub.', date: '2026-03-06' },

  // --- Activities ---
  { id: 30001, targetType: 'activity', targetId: 1, author: 'Lars Johansson', rating: 5, text: 'A challenging but rewarding hike. The Matterhorn panorama at the top is worth every step.', date: '2026-06-27' },
  { id: 30002, targetType: 'activity', targetId: 1, author: 'Sofia Almeida', rating: 4, text: 'Great guide, great lunch and incredible views. Bring proper boots - it gets slippery after the snow melt.', date: '2026-07-03' },
  { id: 30003, targetType: 'activity', targetId: 2, author: 'Rajiv Menon', rating: 5, text: 'My first dive and the instructor made it feel easy. Turtles appeared out of nowhere - I am hooked for life.', date: '2026-06-19' },
  { id: 30004, targetType: 'activity', targetId: 2, author: 'Isabelle Moreau', rating: 5, text: 'Crystal clear water and incredible coral. The underwater photos they sent us are treasures.', date: '2026-03-25' },
  { id: 30005, targetType: 'activity', targetId: 3, author: 'Tom Richards', rating: 5, text: 'Our guide knew every hidden alley and backstory. We saw Paris differently than any tour we have done.', date: '2025-11-30' },
  { id: 30006, targetType: 'activity', targetId: 3, author: 'Camille Dubois', rating: 4, text: 'A lovely walk through the heart of Paris. Perfect pace and plenty of photo stops.', date: '2026-03-15' },
  { id: 30007, targetType: 'activity', targetId: 4, author: 'Chris Taylor', rating: 5, text: 'Falling asleep by the fire under the stars - the best weekend of our summer. Gear was all provided and sturdy.', date: '2025-09-19' },
  { id: 30008, targetType: 'activity', targetId: 4, author: 'Hannah Kim', rating: 5, text: 'A brilliantly organised campout by the lake. Canoe, s\'mores and zero phone signal for two days.', date: '2025-10-05' },
  { id: 30009, targetType: 'activity', targetId: 5, author: 'Emily Park', rating: 5, text: 'Best way to explore Tokyo! We tried more foods than we could count and learned so much.', date: '2026-05-19' },
  { id: 30010, targetType: 'activity', targetId: 5, author: 'Kenji Watanabe', rating: 5, text: 'From yakitori to mochi - every stop was a hit. Go hungry, you will thank us.', date: '2026-06-02' },
  { id: 30011, targetType: 'activity', targetId: 6, author: 'Sokunthea Chan', rating: 5, text: 'Watching the sun rise over Angkor Wat was exactly as magical as everyone says. Tiny groups, kind guides.', date: '2025-12-18' },
  { id: 30012, targetType: 'activity', targetId: 6, author: 'George Papas', rating: 5, text: 'The quietest and most beautiful way to see the temples. The monk blessing afterwards was a lovely touch.', date: '2026-01-27' },
  { id: 30013, targetType: 'activity', targetId: 7, author: 'Maya Stone', rating: 5, text: 'Sailing into the sunset around the caldera - unreal. The captain found us a dolphin pod too.', date: '2026-05-14' },
  { id: 30014, targetType: 'activity', targetId: 7, author: 'Jonas Lindqvist', rating: 5, text: 'Swimming stop in the hot springs of the volcano and the best sunset of the trip. Book the afternoon slot.', date: '2025-10-22' },
  { id: 30015, targetType: 'activity', targetId: 8, author: 'Laura Gomez', rating: 5, text: 'Zip-lining over the canopy at sunrise with howlers below - absolutely thrilling and beautifully run.', date: '2026-01-08' },
  { id: 30016, targetType: 'activity', targetId: 8, author: 'Matthew Silva', rating: 5, text: 'Professional guides, squeaky-clean gear and views that drop your jaw. A rain forest bucket-list item.', date: '2025-11-09' },
  { id: 30017, targetType: 'activity', targetId: 9, author: 'Alice Chen', rating: 5, text: 'The tram up at dusk then the hike down - the skyline is spectacular. Go early to beat the crowds.', date: '2026-07-21' },
  { id: 30018, targetType: 'activity', targetId: 9, author: 'Peter Lau', rating: 4, text: 'Great mix of thrill and views. The hike back is steep but the summit view pays for everything.', date: '2026-02-17' },
  { id: 30019, targetType: 'activity', targetId: 10, author: 'Grace Lim', rating: 5, text: 'The light show at Gardens by the Bay is pure sci-fi magic. Our kids still talk about the Supertrees.', date: '2026-07-30' },
  { id: 30020, targetType: 'activity', targetId: 10, author: 'Ravi Kumar', rating: 5, text: 'Worth every minute - the flower dome and the night spectacular side by side. Beautifully organised.', date: '2026-05-12' },
  { id: 30021, targetType: 'activity', targetId: 11, author: 'Diego Garcia', rating: 5, text: 'Floating over the pyramids of the Sun at dawn is the single best thing I have done in Mexico. Book it.', date: '2026-03-28' },
  { id: 30022, targetType: 'activity', targetId: 11, author: 'Julia Weber', rating: 5, text: 'A smooth, safe and unforgettable flight with a knowledgeable pilot. Champagne landing, need I say more.', date: '2026-02-05' },
  { id: 30023, targetType: 'activity', targetId: 12, author: 'Pedro Alves', rating: 5, text: 'Sugarloaf at sunset then samba until 2am - the perfect Rio night. Great organisation between the two parts.', date: '2026-01-30' },
  { id: 30024, targetType: 'activity', targetId: 12, author: 'Chloe Martin', rating: 4, text: 'Incredible views and a fun, safe night out. We joined with a group of friends and had a blast.', date: '2026-02-12' },
  { id: 30025, targetType: 'activity', targetId: 13, author: 'Anya Sokolov', rating: 5, text: 'Gliding under the bridges as the city lit up - the best way to see two continents at once.', date: '2026-04-02' },
  { id: 30026, targetType: 'activity', targetId: 13, author: 'Emre Demir', rating: 5, text: 'The sunset cruise was smooth, food was plentiful and the narration was genuinely interesting.', date: '2026-06-08' },
  { id: 30027, targetType: 'activity', targetId: 14, author: 'Cian Murphy', rating: 5, text: 'Pubs, stories and sausages - a proper Dublin night. Our guide got us into a live session that was magic.', date: '2026-03-08' },
  { id: 30028, targetType: 'activity', targetId: 14, author: 'Sarah Collins', rating: 4, text: 'A fun and lively crawl with generous servings. Great for meeting fellow travellers.', date: '2025-12-14' },
  { id: 30029, targetType: 'activity', targetId: 15, author: 'Tom Fischer', rating: 5, text: 'The castle at dawn is serene, then the beer cellar tour is the happiest history lesson ever.', date: '2026-06-30' },
  { id: 30030, targetType: 'activity', targetId: 15, author: 'Jana Kovarova', rating: 5, text: 'A perfect half day - palace views, local beer and stories that made the old town come alive.', date: '2026-05-24' },
  { id: 30031, targetType: 'activity', targetId: 16, author: 'Ingrid Berg', rating: 5, text: 'Paddling through the fjord at golden hour is pure Scandinavia. Calm instructor and stunning gear.', date: '2026-07-18' },
  { id: 30032, targetType: 'activity', targetId: 16, author: 'Fred Sanders', rating: 4, text: 'A wonderful way to see Oslo from the water. Fairly easy even for beginners.', date: '2026-05-31' },
  { id: 30033, targetType: 'activity', targetId: 17, author: 'Hassan Ali', rating: 5, text: 'The felucca ride as the pyramids catch the last light - poetry. Our skipper was kind and never rushed us.', date: '2026-04-14' },
  { id: 30034, targetType: 'activity', targetId: 17, author: 'Marta Lewandowska', rating: 4, text: 'A laid-back, beautiful cruise with a memorable sunset. Take a jacket for the breeze.', date: '2026-01-05' },
  { id: 30035, targetType: 'activity', targetId: 18, author: 'Ji-eun Park', rating: 5, text: 'Renting a hanbok and walking the palace at dawn felt like stepping into history. Gorgeous and peaceful.', date: '2026-05-05' },
  { id: 30036, targetType: 'activity', targetId: 18, author: 'Nathan Lee', rating: 5, text: 'The morning light over Gyeongbokgung is unbeatable. Our guide pointed out details we would have missed.', date: '2026-03-13' },
  { id: 30037, targetType: 'activity', targetId: 19, author: 'Rafael Ortiz', rating: 5, text: 'Up before dawn, volcano summit right as the sun burst - the most rewarding sunrise of my life.', date: '2025-12-03' },
  { id: 30038, targetType: 'activity', targetId: 19, author: 'Maya Stone', rating: 5, text: 'Tough climb, astonishing view, breakfast on the rim with clouds below. Hard to beat.', date: '2026-01-18' },
  { id: 30039, targetType: 'activity', targetId: 20, author: 'Elena Petrova', rating: 5, text: 'From tagine to sweet stalls - the medina food walk was delicious and fascinating. Bring an empty stomach.', date: '2026-02-02' },
  { id: 30040, targetType: 'activity', targetId: 20, author: 'Yusuf Haddad', rating: 5, text: 'A local guide makes all the difference in Marrakech. Wonderful food, safe streets and great stories.', date: '2026-04-17' },
  { id: 30041, targetType: 'activity', targetId: 21, author: 'Ava Thompson', rating: 5, text: 'Lake cruise + luge + burger = the perfect Queenstown afternoon. The luge is addictive even for grown-ups.', date: '2026-07-14' },
  { id: 30042, targetType: 'activity', targetId: 21, author: 'Jack Wilson', rating: 5, text: 'Smooth combo tour - the views from the luge track over the lake are ridiculous. We went three times.', date: '2026-02-20' },
  { id: 30043, targetType: 'activity', targetId: 22, author: 'Karina Ivanova', rating: 5, text: 'Island hopping by longtail with a fresh seafood lunch - pure Thailand. The snorkelling stops were glorious.', date: '2026-02-01' },
  { id: 30044, targetType: 'activity', targetId: 22, author: 'Patchara Somsri', rating: 5, text: 'Sun, speed, limestone cliffs and the clearest water. Our captain found us a quiet bay to ourselves.', date: '2026-04-22' },
  { id: 30045, targetType: 'activity', targetId: 23, author: 'Martin Keller', rating: 5, text: 'Petra by candlelight is hauntingly beautiful - the Treasury glowing in the dark is not to be missed.', date: '2025-10-28' },
  { id: 30046, targetType: 'activity', targetId: 23, author: 'Nadia Abboud', rating: 5, text: 'One thousand candles, silent desert and the stars above. The romance of Petra is completely real.', date: '2026-03-03' },
  { id: 30047, targetType: 'activity', targetId: 24, author: 'Sakura Tanaka', rating: 5, text: 'The tea ceremony is a meditation and the maiko walk is pure Kyoto magic. A cultural bucket-list item.', date: '2025-11-16' },
  { id: 30048, targetType: 'activity', targetId: 24, author: 'Michael Chen', rating: 5, text: 'Watching the maiko glide through Gion at dusk - I will remember it forever. Flawlessly organised.', date: '2026-04-26' },
  { id: 30049, targetType: 'activity', targetId: 25, author: 'Hana Suzuki', rating: 5, text: 'The cloud forest trek to Machu Picchu was tough, wet and glorious. Every misty ridge felt ancient.', date: '2026-07-07' },
  { id: 30050, targetType: 'activity', targetId: 25, author: 'Diego Fuentes', rating: 5, text: 'Our guide\'s passion made the Inca trail special. Reaching the sun gate cannot be described, only felt.', date: '2026-05-28' },
  { id: 30051, targetType: 'activity', targetId: 26, author: 'Clara Novak', rating: 5, text: 'On the third night the sky exploded - a full northern lights display from a secret valley spot.', date: '2026-03-06' },
  { id: 30052, targetType: 'activity', targetId: 26, author: 'Erik Hansen', rating: 4, text: 'Patient guides, warm bus and hot cocoa. The lights are never guaranteed but they try everything.', date: '2025-12-29' },
  { id: 30053, targetType: 'activity', targetId: 27, author: 'Liam OConnor', rating: 5, text: 'A southern right whale surfaced right beside our boat - the guide\'s joy matched ours. A bucket-list day.', date: '2026-02-08' },
  { id: 30054, targetType: 'activity', targetId: 27, author: 'Amara Dube', rating: 5, text: 'The boats behaved responsibly and the sightings were constant. Cape Town outdid itself.', date: '2026-03-30' },
  { id: 30055, targetType: 'activity', targetId: 28, author: 'Thanh Le', rating: 5, text: 'Waking up on the bay surrounded by limestone karsts - one of the most beautiful sleeps of my life.', date: '2026-01-12' },
  { id: 30056, targetType: 'activity', targetId: 28, author: 'Mina Park', rating: 5, text: 'Cave kayaking at dawn then a sunset squid-spotting cruise. The crew made it feel effortless.', date: '2025-10-15' },
]

export const useReviewStore = defineStore('reviews', () => {
  const authStore = useAuthStore()
  const reviews = ref<Review[]>([])
  seedFromStorage()

  /** Reviews for one specific item. */
  function reviewsFor(targetType: ReviewTargetType, targetId: number): Review[] {
    return reviews.value.filter(
      (review) => review.targetType === targetType && review.targetId === targetId,
    )
  }

  /** Average rating for an item, or null when there are no reviews yet. */
  function averageFor(targetType: ReviewTargetType, targetId: number): number | null {
    const list = reviewsFor(targetType, targetId)
    if (list.length === 0) return null
    return list.reduce((sum, review) => sum + review.rating, 0) / list.length
  }

  /** Number of reviews for an item. */
  function countFor(targetType: ReviewTargetType, targetId: number): number {
    return reviewsFor(targetType, targetId).length
  }

  /** Can the current user add a review here? (logged in + not already reviewed) */
  function canReview(targetType: ReviewTargetType, targetId: number): boolean {
    const author = authStore.user?.name
    if (!author) return false
    return !reviewsFor(targetType, targetId).some((review) => review.author === author)
  }

  /**
   * Add a review as the logged-in user.
   * Returns { ok: true } or { ok: false, message } where the message is a
   * translation key the calling component can display in a toast.
   */
  function addReview(
    targetType: ReviewTargetType,
    targetId: number,
    rating: number,
    text: string,
  ): { ok: boolean; message?: string } {
    const author = authStore.user?.name

    if (!author) {
      return { ok: false, message: 'reviews.loginFirst' }
    }
    if (rating < 1 || rating > 5 || !text.trim()) {
      return { ok: false, message: 'reviews.validation' }
    }
    if (!canReview(targetType, targetId)) {
      return { ok: false, message: 'reviews.alreadyReviewed' }
    }

    reviews.value.push({
      id: nextId(),
      targetType,
      targetId,
      author,
      rating,
      text: text.trim().slice(0, MAX_TEXT_LENGTH),
      date: new Date().toISOString(),
    })
    saveToStorage()
    return { ok: true }
  }

  /** Delete a review by its id. */
  function removeReview(reviewId: number): void {
    reviews.value = reviews.value.filter((review) => review.id !== reviewId)
    saveToStorage()
  }

  // --- localStorage helpers -----------------------------------------------

  /**
   * Load persisted reviews and always merge in the sample ones, so returning
   * visitors immediately see the expanded set of fictional customers without
   * ever wiping the reviews they wrote themselves. User reviews are kept on
   * top so they are the most visible.
   */
  function seedFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const stored: Review[] = raw ? (JSON.parse(raw) as Review[]) : []
      const seedIds = new Set(seedReviews.map((review) => review.id))

      // Keep only the reviews the visitor wrote themselves; the sample ones
      // always come fresh from seedReviews so everyone sees the same preview.
      const userReviews = stored.filter((review) => !seedIds.has(review.id))
      const merged = [...userReviews, ...seedReviews]

      // Keep the most recent reviews first (date-based, newest at the top).
      reviews.value = merged.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      if (userReviews.length !== stored.length) {
        saveToStorage()
      }
    } catch {
      reviews.value = [...seedReviews]
      saveToStorage()
    }
  }

  function saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.value))
  }

  function nextId(): number {
    return reviews.value.length ? Math.max(...reviews.value.map((review) => review.id)) + 1 : 1
  }

  return {
    reviews,
    reviewsFor,
    averageFor,
    countFor,
    canReview,
    addReview,
    removeReview,
  }
})