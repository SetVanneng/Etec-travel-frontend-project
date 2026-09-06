<script setup lang="ts">
// Hotels.vue
// Lists all hotels with a search box and simulated loading.
import { computed, onMounted, ref } from 'vue'
import { Hotel, Building2, SearchX } from '@lucide/vue'
import { hotels } from '../data/hotels'
import SearchBar from '../components/SearchBar.vue'
import HotelCard from '../components/HotelCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useI18nStore } from '../stores/i18n'

const i18n = useI18nStore()

const searchText = ref('')
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

// Filter hotels by name, city or country.
const filteredHotels = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  if (query === '') return hotels

  return hotels.filter(
    (hotel) =>
      i18n.pick(hotel.name).toLowerCase().includes(query) ||
      hotel.city.toLowerCase().includes(query) ||
      i18n.t('countries.' + hotel.country).toLowerCase().includes(query),
  )
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

    <div class="mx-auto mb-10 max-w-xl">
      <SearchBar v-model="searchText" :placeholder="i18n.t('hotels.searchPlaceholder')" />
    </div>

    <LoadingSpinner v-if="isLoading" :text="i18n.t('hotels.checkingAvailability')" />

    <div v-else-if="filteredHotels.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <SearchX :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('hotels.noResultsTitle') }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('hotels.noResultsText') }}</p>
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
  </div>
</template>