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
import { useI18nStore } from '../stores/i18n'

const router = useRouter()
const i18n = useI18nStore()
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
        i18n.pick(a.description).toLowerCase().includes(q),
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

// Maps an airline "type" value to a translation key for its label.
const typeLabelKeys: Record<string, string> = {
  'flag-carrier': 'airlines.flagCarrier',
  'low-cost': 'airlines.lowCost',
  regional: 'airlines.regional',
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <SectionHeading
        :title="i18n.t('airlines.title')"
        :subtitle="i18n.t('airlines.subtitle')"
      />
    </div>

    <!-- Search + filter bar -->
    <div class="mb-8 flex flex-col gap-4">
      <SearchBar v-model="searchQuery" :placeholder="i18n.t('airlines.searchPlaceholder')" />
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
          {{ i18n.t('airlines.allCountries') }}
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
          {{ i18n.t('countries.' + country) }}
        </button>
      </div>
    </div>

    <!-- Results count -->
    <p class="mb-6 text-sm text-slate-500 dark:text-slate-400">
      {{ i18n.t('airlines.showing', { count: filteredAirlines.length }) }}
    </p>

    <!-- Airlines grid -->
    <div v-if="filteredAirlines.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(airline, index) in filteredAirlines"
        :key="airline.id"
        data-aos="fade-up"
        :data-aos-delay="index * 60"
        class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
      >
        <div class="flex items-center gap-3">
          <span class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <img :src="`https://pics.avs.io/100/100/${airline.iata}.png`" :alt="`${airline.name} logo`" class="h-full w-full object-contain" loading="lazy" />
          </span>
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ airline.name }}</h3>
            <p class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin :size="12" class="text-teal-600 dark:text-teal-400" />
              {{ i18n.t('countries.' + airline.country) }}
            </p>
          </div>
          <span class="rounded-full px-2 py-0.5 text-[10px] font-bold" :class="typeColors[airline.type]">
            {{ i18n.t(typeLabelKeys[airline.type]) }}
          </span>
        </div>

        <p class="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {{ i18n.pick(airline.description) }}
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
            {{ i18n.t('airlines.bookFlight') }}
            <ExternalLink :size="12" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <Plane :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">{{ i18n.t('airlines.noResultsTitle') }}</h3>
      <p class="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {{ i18n.t('airlines.noResultsText') }}
      </p>
      <button
        type="button"
        class="mt-4 inline-flex items-center gap-2 rounded-xl border border-teal-600 px-5 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
        @click="searchQuery = ''; selectedCountry = ''"
      >
        {{ i18n.t('common.clearFilters') }}
      </button>
    </div>

    <!-- CTA to airline booking page -->
    <div class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:text-left" data-aos="fade-up">
      <div class="flex items-center gap-4">
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
          <Globe :size="24" />
        </span>
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ i18n.t('airlines.knowWhereFlying') }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('airlines.selectCountryHint') }}</p>
        </div>
      </div>
      <router-link
        to="/airline-booking"
        class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
      >
        {{ i18n.t('airlines.bookFlight') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>
  </div>
</template>
