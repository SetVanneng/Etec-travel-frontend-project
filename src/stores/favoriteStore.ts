// ---------------------------------------------------------------------------
// favoriteStore.ts (Pinia store)
// Manages the lists of favorite destinations, hotels and activities.
// We save the favorites into localStorage with JSON.stringify so they stay
// saved even after the user closes the browser. localStorage can only store
// strings, so we must convert the array into a string (JSON.stringify) when
// saving and back into an array (JSON.parse) when loading.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Destination } from '../data/destinations'
import type { Hotel } from '../data/hotels'
import type { Activity } from '../data/activities'

const DESTINATIONS_KEY = 'favoriteDestinations'
const HOTELS_KEY = 'favoriteHotels'
const ACTIVITIES_KEY = 'favoriteActivities'

export const useFavoriteStore = defineStore('favorites', () => {
  // --- localStorage helpers -----------------------------------------------

  function load<T>(key: string): T[] {
    try {
      const raw = localStorage.getItem(key)
      // If nothing is stored yet we start with an empty list.
      return raw ? (JSON.parse(raw) as T[]) : []
    } catch {
      // If the stored text is corrupted, start fresh instead of crashing.
      return []
    }
  }

  function save(key: string, value: unknown[]): void {
    // localStorage only accepts strings, so we turn the array into JSON text.
    localStorage.setItem(key, JSON.stringify(value))
  }

  // The lists of favorites. Each type is loaded once from its own localStorage key.
  const destinations = ref<Destination[]>(load<Destination>(DESTINATIONS_KEY))
  const hotels = ref<Hotel[]>(load<Hotel>(HOTELS_KEY))
  const activities = ref<Activity[]>(load<Activity>(ACTIVITIES_KEY))

  /** Total number of favorites across all types (shown in the navbar badge). */
  const favoriteCount = computed(
    () => destinations.value.length + hotels.value.length + activities.value.length,
  )

  /** Is this destination already in the favorites list? */
  const isFavorite = (id: number): boolean =>
    destinations.value.some((destination) => destination.id === id)

  /** Is this hotel already in the favorites list? */
  const isHotelFavorite = (id: number): boolean =>
    hotels.value.some((hotel) => hotel.id === id)

  /** Is this activity already in the favorites list? */
  const isActivityFavorite = (id: number): boolean =>
    activities.value.some((activity) => activity.id === id)

  /** Add or remove a destination from favorites. */
  function toggleFavorite(destination: Destination): void {
    if (isFavorite(destination.id)) {
      // Remove it (filter keeps every destination EXCEPT the one we remove).
      destinations.value = destinations.value.filter(
        (item) => item.id !== destination.id,
      )
    } else {
      destinations.value.push(destination)
    }
    save(DESTINATIONS_KEY, destinations.value)
  }

  /** Add or remove a hotel from favorites. */
  function toggleHotelFavorite(hotel: Hotel): void {
    if (isHotelFavorite(hotel.id)) {
      hotels.value = hotels.value.filter((item) => item.id !== hotel.id)
    } else {
      hotels.value.push(hotel)
    }
    save(HOTELS_KEY, hotels.value)
  }

  /** Add or remove an activity from favorites. */
  function toggleActivityFavorite(activity: Activity): void {
    if (isActivityFavorite(activity.id)) {
      activities.value = activities.value.filter((item) => item.id !== activity.id)
    } else {
      activities.value.push(activity)
    }
    save(ACTIVITIES_KEY, activities.value)
  }

  /** Remove all favorites of every type. */
  function clearFavorites(): void {
    destinations.value = []
    hotels.value = []
    activities.value = []
    save(DESTINATIONS_KEY, destinations.value)
    save(HOTELS_KEY, hotels.value)
    save(ACTIVITIES_KEY, activities.value)
  }

  return {
    destinations,
    hotels,
    activities,
    favoriteCount,
    isFavorite,
    isHotelFavorite,
    isActivityFavorite,
    toggleFavorite,
    toggleHotelFavorite,
    toggleActivityFavorite,
    clearFavorites,
  }
})