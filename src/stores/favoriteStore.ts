// ---------------------------------------------------------------------------
// favoriteStore.ts (Pinia store)
// Manages the list of favorite destinations.
// We save the favorites into localStorage with JSON.stringify so they stay
// saved even after the user closes the browser. localStorage can only store
// strings, so we must convert the array into a string (JSON.stringify) when
// saving and back into an array (JSON.parse) when loading.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Destination } from '../data/destinations'

const STORAGE_KEY = 'favoriteDestinations'

export const useFavoriteStore = defineStore('favorites', () => {
  // The list of favorite destinations. Loaded once from localStorage.
  const favorites = ref<Destination[]>(loadFromStorage())

  /** Total number of favorites (shown in the navbar badge). */
  const favoriteCount = computed(() => favorites.value.length)

  /** Is this destination already in the favorites list? */
  const isFavorite = (id: number): boolean =>
    favorites.value.some((destination) => destination.id === id)

  /** Add or remove a destination from favorites. */
  function toggleFavorite(destination: Destination): void {
    if (isFavorite(destination.id)) {
      // Remove it (filter keeps every destination EXCEPT the one we remove).
      favorites.value = favorites.value.filter(
        (item) => item.id !== destination.id,
      )
    } else {
      favorites.value.push(destination)
    }
    saveToStorage()
  }

  /** Remove all favorites. */
  function clearFavorites(): void {
    favorites.value = []
    saveToStorage()
  }

  // --- localStorage helpers -----------------------------------------------

  function loadFromStorage(): Destination[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // If nothing is stored yet we start with an empty list.
      return raw ? (JSON.parse(raw) as Destination[]) : []
    } catch {
      // If the stored text is corrupted, start fresh instead of crashing.
      return []
    }
  }

  function saveToStorage(): void {
    // localStorage only accepts strings, so we turn the array into JSON text.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  return {
    favorites,
    favoriteCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
})