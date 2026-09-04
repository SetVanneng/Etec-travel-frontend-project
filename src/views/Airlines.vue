<script setup lang="ts">
// Airlines.vue
// Lists all available airlines with search and country filtering.
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Plane, Search, MapPin, Star, ExternalLink, ArrowRight, Globe,
} from '@lucide/vue'
import SearchBar from '../components/SearchBar.vue'
import SectionHeading from '../components/SectionHeading.vue'
import { airlines, getAirlineCountries, type Airline } from '../data/airlines'

const router = useRouter()
const searchQuery = ref('')
const selectedCountry = ref('')

const countries = getAirlineCountries()

const filteredAirlines = computed(() => {
  let result = airlines
  if (selectedCountry.value) {
    result = result.filter((a) => a.country === selectedCountry.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    )
  }
  return result
})

function openAirline(airline: Airline): void {
  window.open(airline.website, '_blank', 'noopener,noreferrer')
}

const typeColors: Record<string, string> = {
  'flag-carrier': 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300',
  'low-cost': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  regional: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
}

const typeLabels: Record<string, string> = {
  'flag-carrier': 'Flag Carrier',
  'low-cost': 'Low Cost',
  regional: 'Regional',
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <SectionHeading
        title="Airlines"
        subtitle="Browse airlines around the world and book flights directly on their websites."
      />
    </div>

    <!-- Search + filter bar -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div class="flex-1">
        <SearchBar v-model="searchQuery" placeholder="Search airlines by name or country..." />
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-xs font-semibold transition"
          :class="
            !selectedCountry
              ? 'border-teal-600 bg-teal-600 text-white'
              : 'border-slate-300 text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300'
          "
          @click="selectedCountry = ''"
        >
          All Countries
        </button>
        <button
          v-for="country in countries"
          :key="country"
          type="button"
          class="rounded-full border px-4 py-2 text-xs font-semibold transition"
          :class="
            selectedCountry === country
              ? 'border-teal-600 bg-teal-600 text-white'
              : 'border-slate-300 text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300'
          "
          @click="selectedCountry = selectedCountry === country ? '' : country"
        >
          {{ country }}
        </button>
      </div>
    </div>

    <!-- Results count -->
    <p class="mb-6 text-sm text-slate-500 dark:text-slate-400">
      Showing {{ filteredAirlines.length }} airline{{ filteredAirlines.length !== 1 ? 's' : '' }}
    </p>

    <!-- Airlines grid -->
    <div v-if="filteredAirlines.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="airline in filteredAirlines"
        :key="airline.id"
        class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
      >
        <div class="flex items-center gap-3">
          <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600/10">
            <Plane :size="22" class="text-teal-600 dark:text-teal-400" />
          </span>
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ airline.name }}</h3>
            <p class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin :size="12" class="text-teal-600 dark:text-teal-400" />
              {{ airline.country }}
            </p>
          </div>
          <span class="rounded-full px-2 py-0.5 text-[10px] font-bold" :class="typeColors[airline.type]">
            {{ typeLabels[airline.type] }}
          </span>
        </div>

        <p class="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {{ airline.description }}
        </p>

        <div class="mt-4 flex items-center justify-between">
          <span class="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Star :size="14" class="fill-amber-400 text-amber-400" />
            {{ airline.rating }}
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-700"
            @click="openAirline(airline)"
          >
            Book Flight
            <ExternalLink :size="12" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <Plane :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">No airlines found</h3>
      <p class="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Try adjusting your search or clearing the filter.
      </p>
      <button
        type="button"
        class="mt-4 inline-flex items-center gap-2 rounded-xl border border-teal-600 px-5 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
        @click="searchQuery = ''; selectedCountry = ''"
      >
        Clear filters
      </button>
    </div>

    <!-- CTA to airline booking page -->
    <div class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:text-left">
      <div class="flex items-center gap-4">
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
          <Globe :size="24" />
        </span>
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Know where you're flying?</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Select a country and we'll show you all airlines that fly there.</p>
        </div>
      </div>
      <router-link
        to="/airline-booking"
        class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
      >
        Book a Flight
        <ArrowRight :size="16" />
      </router-link>
    </div>
  </div>
</template>
