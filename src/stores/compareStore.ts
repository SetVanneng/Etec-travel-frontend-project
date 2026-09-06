// ---------------------------------------------------------------------------
// compareStore.ts (Pinia store)
// Manages a short-lived list of hotels the user wants to compare side-by-side.
// It is kept in memory (not localStorage) because a comparison is a session
// choice - refreshing the page simply starts a fresh selection.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getHotelById, type Hotel } from '../data/hotels'

export type CompareResult = 'added' | 'removed' | 'full'

export const MAX_COMPARE = 4

export const useCompareStore = defineStore('compare', () => {
  const hotelIds = ref<number[]>([])

  /** The full Hotel objects, in selection order (invalid ids are skipped). */
  const comparedHotels = computed<Hotel[]>(() =>
    hotelIds.value.map(getHotelById).filter((hotel): hotel is Hotel => hotel !== undefined),
  )

  /** How many hotels are currently selected. */
  const compareCount = computed(() => comparedHotels.value.length)

  /** True when the selection already contains this hotel. */
  const isCompared = (id: number): boolean => hotelIds.value.includes(id)

  /**
   * Add or remove a hotel from the comparison.
   * Calling `save` is not needed here since this list is in-memory only.
   */
  function toggle(hotel: Hotel): CompareResult {
    if (isCompared(hotel.id)) {
      hotelIds.value = hotelIds.value.filter((id) => id !== hotel.id)
      return 'removed'
    }
    if (hotelIds.value.length >= MAX_COMPARE) {
      return 'full'
    }
    hotelIds.value.push(hotel.id)
    return 'added'
  }

  /** Remove every hotel from the comparison. */
  function clear(): void {
    hotelIds.value = []
  }

  return {
    comparedHotels,
    compareCount,
    isCompared,
    toggle,
    clear,
  }
})