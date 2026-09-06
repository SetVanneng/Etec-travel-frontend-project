<script setup lang="ts">
// Hotels.vue
// Lists all hotels with a search box, facility filter chips and simulated loading.
import { computed, onMounted, ref } from 'vue'
import {
  Hotel, Building2, SearchX, Waves, Sparkles, Coffee, Wifi, Car, Umbrella, Dumbbell, UtensilsCrossed, Scale, Trash2, ArrowRight,
} from '@lucide/vue'
import type { Component } from 'vue'
import { hotels } from '../data/hotels'
import type { LocalizedText } from '../data/localized'
import SearchBar from '../components/SearchBar.vue'
import HotelCard from '../components/HotelCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useI18nStore } from '../stores/i18n'
import { useCompareStore } from '../stores/compareStore'

const i18n = useI18nStore()
const compareStore = useCompareStore()

// Each chip matches a hotel when ANY of its keywords appears in one of the
// hotel's (English) facilities, e.g. "Infinity pool" counts for "Pool".
// The visible label comes from the "hotels.facilityFilters.*" translation keys.
interface FacilityFilter {
  key: string
  labelKey: string
  keywords: string[]
  icon: Component
}

const facilityFilters: FacilityFilter[] = [
  { key: 'pool', labelKey: 'hotels.facilityFilters.pool', keywords: ['pool'], icon: Waves },
  { key: 'spa', labelKey: 'hotels.facilityFilters.spa', keywords: ['spa', 'onsen', 'sauna', 'hot tub', 'jacuzzi', 'hot springs'], icon: Sparkles },
  { key: 'breakfast', labelKey: 'hotels.facilityFilters.breakfast', keywords: ['breakfast'], icon: Coffee },
  { key: 'wifi', labelKey: 'hotels.facilityFilters.wifi', keywords: ['wi-fi', 'wifi'], icon: Wifi },
  { key: 'parking', labelKey: 'hotels.facilityFilters.parking', keywords: ['parking'], icon: Car },
  { key: 'beach', labelKey: 'hotels.facilityFilters.beach', keywords: ['beach'], icon: Umbrella },
  { key: 'gym', labelKey: 'hotels.facilityFilters.gym', keywords: ['gym', 'fitness'], icon: Dumbbell },
  { key: 'dining', labelKey: 'hotels.facilityFilters.dining', keywords: ['restaurant', 'bar', 'dining', 'bbq'], icon: UtensilsCrossed },
]

const searchText = ref('')
const selectedFacilities = ref<string[]>([])
const isLoading = ref(true)

const hasActiveFacilities = computed(() => selectedFacilities.value.length > 0)

function toggleFacility(key: string): void {
  const index = selectedFacilities.value.indexOf(key)
  if (index === -1) {
    selectedFacilities.value.push(key)
  } else {
    selectedFacilities.value.splice(index, 1)
  }
}

function clearAll(): void {
  searchText.value = ''
  selectedFacilities.value = []
}

// Facilities are localized objects; filtering uses their stable English text.
function facilityEnglish(facility: LocalizedText): string {
  return typeof facility === 'string' ? facility : facility.en ?? ''
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

// Filter hotels by name/city/country AND by every selected facility chip.
const filteredHotels = computed(() => {
  const query = searchText.value.trim().toLowerCase()

  return hotels.filter((hotel) => {
    const matchesSearch =
      query === '' ||
      i18n.pick(hotel.name).toLowerCase().includes(query) ||
      hotel.city.toLowerCase().includes(query) ||
      i18n.t('countries.' + hotel.country).toLowerCase().includes(query)

    const matchesFacilities = selectedFacilities.value.every((key) => {
      const filter = facilityFilters.find((f) => f.key === key)
      if (!filter) return true
      return hotel.facilities.some((facility) => {
        const en = facilityEnglish(facility).toLowerCase()
        return filter.keywords.some((keyword) => en.includes(keyword))
      })
    })

    return matchesSearch && matchesFacilities
  })
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-8 text-center">
      <h1 class="flex items-center justify-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
        <Hotel :size="32" class="text-teal-600 dark:text-teal-400" />
        {{ i18n.t('hotels.title') }}
      </h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
        {{ i18n.t('hotels.subtitle') }}
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-2xl">
      <SearchBar v-model="searchText" :placeholder="i18n.t('hotels.searchPlaceholder')" />

      <!-- Facility filters -->
      <p class="mt-6 mb-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {{ i18n.t('hotels.facilities') }}
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="filter in facilityFilters"
          :key="filter.key"
          type="button"
          class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition"
          :class="
            selectedFacilities.includes(filter.key)
              ? 'bg-teal-600 text-white shadow-soft'
              : 'border border-slate-300 text-slate-600 hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-teal-400'
          "
          :aria-pressed="selectedFacilities.includes(filter.key)"
          @click="toggleFacility(filter.key)"
        >
          <component :is="filter.icon" :size="15" />
          {{ i18n.t(filter.labelKey) }}
        </button>
      </div>
      <div v-if="hasActiveFacilities" class="mt-3 flex justify-center">
        <button
          type="button"
          class="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
          @click="clearAll"
        >
          {{ i18n.t('common.clearFilters') }}
        </button>
      </div>
    </div>

    <LoadingSpinner v-if="isLoading" :text="i18n.t('hotels.checkingAvailability')" />

    <div v-else-if="filteredHotels.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <SearchX :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('hotels.noResultsTitle') }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('hotels.noResultsText') }}</p>
      <button
        type="button"
        class="mt-2 rounded-xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="clearAll"
      >
        {{ i18n.t('common.clearFilters') }}
      </button>
    </div>

    <div v-else>
      <p class="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Building2 :size="16" />
        {{
          filteredHotels.length === 1
            ? i18n.t('hotels.foundOne', { count: filteredHotels.length })
            : i18n.t('hotels.found', { count: filteredHotels.length })
        }}
      </p>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <HotelCard
          v-for="(hotel, index) in filteredHotels"
          :key="hotel.id"
          :hotel="hotel"
          :delay="index * 60"
        />
      </div>
    </div>

    <!-- Floating compare bar -->
    <div
      v-if="compareStore.compareCount > 0"
      class="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
      <div class="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <Scale :size="18" class="text-teal-600 dark:text-teal-400" />
        <span class="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-200">
          {{ i18n.t('compare.bar', { count: compareStore.compareCount }) }}
        </span>
        <router-link
          to="/compare"
          class="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          {{ i18n.t('compare.compareNow') }}
          <ArrowRight :size="15" />
        </router-link>
        <button
          type="button"
          class="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/30"
          :aria-label="i18n.t('compare.clearAll')"
          :title="i18n.t('compare.clearAll')"
          @click="compareStore.clear()"
        >
          <Trash2 :size="15" />
        </button>
      </div>
    </div>
  </div>
</template>