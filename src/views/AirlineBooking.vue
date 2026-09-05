<script setup lang="ts">
// AirlineBooking.vue
// Airline booking page: select a destination country, see available airlines,
// and get redirected to the airline's real booking website.
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Plane, MapPin, ArrowLeft, ArrowRight, Star, ExternalLink,
  Globe, ShieldCheck, CalendarDays, Users, Info, ChevronDown,
} from '@lucide/vue'
import { destinations } from '../data/destinations'
import { getAirlinesByCountry, type Airline } from '../data/airlines'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const selectedCountry = ref('')
const searchFrom = ref('')

// Build a list of unique countries from destinations.
const countries = computed(() => {
  const set = new Set(destinations.map((d) => d.country))
  return [...set].sort()
})

// Airlines filtered by the selected country.
const availableAirlines = computed<Airline[]>(() => {
  if (!selectedCountry.value) return []
  return getAirlinesByCountry(selectedCountry.value)
})

// Destinations in the selected country (for display).
const countryDestinations = computed(() =>
  destinations.filter((d) => d.country === selectedCountry.value),
)

// Pre-select from query params if coming from destination details.
onMounted(() => {
  const { country } = route.query
  if (typeof country === 'string') {
    selectedCountry.value = country
  }
  setTimeout(() => {
    isLoading.value = false
  }, 400)
})

function selectCountry(country: string): void {
  selectedCountry.value = country
  searchFrom.value = ''
}

function goBack(): void {
  router.push('/destinations')
}

function openAirline(airline: Airline): void {
  // Save the booking attempt to localStorage for My Trips.
  const flightBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]')
  flightBookings.unshift({
    id: Date.now(),
    airline: airline.name,
    country: selectedCountry.value,
    website: airline.website,
    createdAt: new Date().toISOString(),
    status: 'redirected',
  })
  localStorage.setItem('flightBookings', JSON.stringify(flightBookings))

  // Open the airline website in a new tab.
  window.open(airline.website, '_blank', 'noopener,noreferrer')
}

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white'

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
    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-24 text-slate-500 dark:text-slate-400">
      <svg class="h-9 w-9 animate-spin text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>

    <div v-else>
      <!-- Header -->
      <div class="mb-8 flex items-center gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
          @click="goBack"
        >
          <ArrowLeft :size="16" />
          Back to destinations
        </button>
      </div>

      <div class="mb-10 text-center">
        <span class="inline-flex items-center gap-2 rounded-full bg-teal-600/10 px-4 py-1.5 text-sm font-semibold text-teal-700 dark:text-teal-300">
          <Plane :size="16" />
          Flight Booking
        </span>
        <h1 class="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          Book Your Flight
        </h1>
        <p class="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          Select your destination country and we'll show you airlines that fly there.
          Click any airline to visit their website and book your flight.
        </p>
      </div>

      <!-- How it works -->
      <div class="mb-10 grid gap-4 sm:grid-cols-3">
        <div data-aos="fade-up" class="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <span class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <MapPin :size="20" />
          </span>
          <h3 class="mt-3 font-bold text-slate-900 dark:text-white">1. Choose Country</h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick the country you want to fly to from the list below.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="80" class="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <span class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <Plane :size="20" />
          </span>
          <h3 class="mt-3 font-bold text-slate-900 dark:text-white">2. Pick an Airline</h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse airlines that serve your destination with ratings and details.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="160" class="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <span class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <ExternalLink :size="20" />
          </span>
          <h3 class="mt-3 font-bold text-slate-900 dark:text-white">3. Book on Their Site</h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">We redirect you to the airline's real website to complete your booking.</p>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left: Country selector -->
        <div class="lg:col-span-1">
          <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Globe :size="20" class="text-teal-600 dark:text-teal-400" />
            Select Destination Country
          </h2>

          <div class="space-y-1.5 max-h-[600px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <button
              v-for="country in countries"
              :key="country"
              type="button"
              class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition"
              :class="
                selectedCountry === country
                  ? 'bg-teal-600 text-white shadow-soft'
                  : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
              "
              @click="selectCountry(country)"
            >
              <MapPin :size="16" />
              {{ country }}
              <span
                v-if="selectedCountry === country"
                class="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold"
              >
                {{ getAirlinesByCountry(country).length }} airline{{ getAirlinesByCountry(country).length !== 1 ? 's' : '' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Right: Airlines list -->
        <div class="lg:col-span-2">
          <!-- Empty state: no country selected -->
          <div v-if="!selectedCountry" class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
            <Plane :size="48" class="text-slate-300 dark:text-slate-600" />
            <h3 class="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">Select a country to begin</h3>
            <p class="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Choose a destination country from the list on the left to see available airlines.
            </p>
          </div>

          <!-- Airlines found -->
          <div v-else-if="availableAirlines.length > 0">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                Airlines flying to {{ selectedCountry }}
              </h2>
              <span class="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                {{ availableAirlines.length }} found
              </span>
            </div>

            <div class="space-y-4">
              <div
                v-for="airline in availableAirlines"
                :key="airline.id"
                data-aos="fade-up"
                class="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
              >
                <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <!-- Airline info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3">
                      <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ airline.name }}</h3>
                      <span
                        class="rounded-full px-2.5 py-0.5 text-xs font-bold"
                        :class="typeColors[airline.type]"
                      >
                        {{ typeLabels[airline.type] }}
                      </span>
                    </div>

                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ airline.description }}</p>

                    <div class="mt-3 flex flex-wrap items-center gap-4 text-sm">
                      <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Star :size="14" class="fill-amber-400 text-amber-400" />
                        {{ airline.rating }} / 5
                      </span>
                      <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MapPin :size="14" class="text-teal-600 dark:text-teal-400" />
                        {{ airline.country }}
                      </span>
                    </div>
                  </div>

                  <!-- Book button -->
                  <button
                    type="button"
                    class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700 group-hover:scale-105"
                    @click="openAirline(airline)"
                  >
                    <Plane :size="16" />
                    Book on {{ airline.name.split('(')[0].trim() }}
                    <ExternalLink :size="14" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Destinations in this country -->
            <div v-if="countryDestinations.length > 0" class="mt-8">
              <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Destinations in {{ selectedCountry }}
              </h3>
              <div class="grid gap-3 sm:grid-cols-2">
                <router-link
                  v-for="dest in countryDestinations"
                  :key="dest.id"
                  :to="`/destination/${dest.id}`"
                  class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
                >
                  <img :src="dest.image" :alt="dest.name" class="h-14 w-14 shrink-0 rounded-lg object-cover" />
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ dest.name }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ dest.location }}</p>
                  </div>
                  <ArrowRight :size="16" class="ml-auto shrink-0 text-slate-400" />
                </router-link>
              </div>
            </div>
          </div>

          <!-- No airlines for country -->
          <div v-else class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
            <Plane :size="48" class="text-slate-300 dark:text-slate-600" />
            <h3 class="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">No airlines listed for {{ selectedCountry }}</h3>
            <p class="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              We don't have airline data for this country yet. Try selecting another country.
            </p>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="mt-10 flex items-start justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        <ShieldCheck :size="16" class="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
        <p>
          This is a demo feature. Clicking an airline opens their real website in a new tab.
          No actual flight search or payment is performed by this application.
        </p>
      </div>
    </div>
  </div>
</template>
