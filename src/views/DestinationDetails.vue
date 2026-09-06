<script setup lang="ts">
// DestinationDetails.vue
// Shows one destination. This is a dynamic route: /destination/:id
// The id is read from the URL with useRoute().params.id.
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import L from 'leaflet'
import {
  MapPin, Star, Calendar, DollarSign, Heart, ArrowLeft,
  Compass, BedDouble, ArrowRight, AlertCircle, Navigation, LocateFixed, Plane, ExternalLink,
} from '@lucide/vue'
import { getDestinationById } from '../data/destinations'
import { getHotelsByDestination } from '../data/hotels'
import HotelCard from '../components/HotelCard.vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useI18nStore } from '../stores/i18n'
import { notify } from '../utils/toast'

const route = useRoute()
const router = useRouter()
const favoriteStore = useFavoriteStore()
const i18n = useI18nStore()

// Loading state displayed while we "fetch" the data.
const isLoading = ref(true)

// Read the :id part of the URL. It always comes as a string, so we
// convert it to a number.
const destinationId = computed(() => Number(route.params.id))

const destination = computed(() => getDestinationById(destinationId.value))
const nearbyHotels = computed(() => getHotelsByDestination(destinationId.value))

// Index of the photo currently shown in the hero (0 = main image).
const activeImage = ref(0)

// Simulate a short loading delay, then show the content.
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

// If someone opens /destination/999 (an id that does not exist),
// show them a friendly "not found" message instead of a blank page.
function goBack(): void {
  router.push('/destinations')
}

function toggleFavorite(): void {
  if (destination.value) {
    favoriteStore.toggleFavorite(destination.value)
    if (favoriteStore.isFavorite(destination.value.id)) {
      notify(i18n.t('destinations.addedToFavorites', { name: i18n.pick(destination.value.name) }))
    } else {
      notify(i18n.t('destinations.removedFromFavorites', { name: i18n.pick(destination.value.name) }))
    }
  }
}

// ---- Map / Location ---------------------------------------------------------
// A simple wrapper around the Leaflet map so we can create it once and
// destroy it when leaving the page (to avoid duplicated maps on navigation).
const mapElement = ref<HTMLElement | null>(null)
const showMap = ref(false)
let mapInstance: L.Map | null = null

// Build a small, custom map-pin icon with inline SVG (avoids the default
// Leaflet marker assets path issues with bundlers).
const pinIcon = L.divIcon({
  className: '',
  html: `
    <div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"
        fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4))">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3" fill="#0d9488" stroke="none"/>
      </svg>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
})

// Toggle the map on / off. Leaflet needs its container to exist before we
// initialise it, so we wait a tick (nextTick) after revealing the element.
function toggleMap(): void {
  showMap.value = !showMap.value

  if (showMap.value) {
    nextTick(initMap)
  } else if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
}

function initMap(): void {
  const dest = destination.value
  if (!dest || !mapElement.value || mapInstance) return

  mapInstance = L.map(mapElement.value, {
    scrollWheelZoom: false,
  }).setView([dest.latitude, dest.longitude], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(mapInstance)

  L.marker([dest.latitude, dest.longitude], { icon: pinIcon })
    .addTo(mapInstance)
    .bindPopup(`<b>${i18n.pick(dest.name)}</b><br/>${i18n.pick(dest.location)}`)
    .openPopup()

  // Make the map fill its container correctly now that it is visible.
  mapInstance.invalidateSize()
}

// Make sure we destroy the Leaflet map when leaving the page.
onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})

// Build a "View on Maps" deep link using the real coordinates
// (opens in the user's preferred map app / Google Maps).
function openInMaps(): void {
  const dest = destination.value
  if (!dest) return
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${dest.latitude},${dest.longitude}`,
    '_blank',
    'noopener',
  )
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

    <!-- Not found -->
    <div v-else-if="!destination" class="flex flex-col items-center gap-4 py-24 text-center">
      <AlertCircle :size="48" class="text-slate-300 dark:text-slate-600" />
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ i18n.t('destinations.notFoundTitle') }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.notFoundText') }}</p>
      <button
        type="button"
        class="mt-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="goBack"
      >
        {{ i18n.t('destinations.backToDestinations') }}
      </button>
    </div>

    <!-- Destination content -->
    <div v-else>
      <!-- Back button -->
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
        @click="goBack"
      >
        <ArrowLeft :size="16" />
        {{ i18n.t('destinations.backToAll') }}
      </button>

      <!-- Hero image -->
      <div class="relative h-72 overflow-hidden rounded-3xl sm:h-96">
        <img :src="destination.gallery[activeImage]" :alt="i18n.pick(destination.name)" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div class="absolute bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <span class="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
              {{ i18n.categoryLabel(destination.category) }}
            </span>
            <h1 class="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{{ i18n.pick(destination.name) }}</h1>
            <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
              <MapPin :size="15" class="text-teal-400" />
              {{ i18n.pick(destination.location) }}
            </p>
          </div>
          <button
            type="button"
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110"
            :aria-label="
              favoriteStore.isFavorite(destination.id)
                ? i18n.t('destinations.removeFromFavorites')
                : i18n.t('destinations.addToFavorites')
            "
            :title="
              favoriteStore.isFavorite(destination.id)
                ? i18n.t('destinations.removeFromFavorites')
                : i18n.t('destinations.addToFavorites')
            "
            @click="toggleFavorite"
          >
            <Heart
              :size="22"
              :class="favoriteStore.isFavorite(destination.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'"
            />
          </button>
        </div>
      </div>

      <!-- Thumbnail row: the 3 pics under the main pic -->
      <div class="mt-3 grid grid-cols-3 gap-3">
        <button
          v-for="(image, index) in destination.gallery"
          :key="image + index"
          type="button"
          class="overflow-hidden rounded-xl border-2 transition"
          :class="activeImage === index ? 'border-teal-500' : 'border-transparent opacity-70 hover:opacity-100'"
          :aria-label="`${i18n.pick(destination.name)} photo ${index + 1}`"
          @click="activeImage = index"
        >
          <img :src="image" :alt="`${i18n.pick(destination.name)} photo ${index + 1}`" class="h-24 w-full object-cover sm:h-28" />
        </button>
      </div>

      <!-- Quick facts -->
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <div data-aos="fade-up" class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <Star :size="16" class="text-amber-500" /> {{ i18n.t('destinations.rating') }}
          </div>
          <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ destination.rating }} / 5</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="80" class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <Calendar :size="16" class="text-teal-600 dark:text-teal-400" /> {{ i18n.t('destinations.bestTimeToVisit') }}
          </div>
          <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{{ i18n.pick(destination.bestTimeToVisit) }}</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="160" class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <DollarSign :size="16" class="text-emerald-600" /> {{ i18n.t('destinations.averageBudget') }}
          </div>
          <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">${{ destination.budget }}<span class="text-sm font-medium text-slate-400">{{ i18n.t('common.perDay') }}</span></p>
        </div>
      </div>

      <div class="mt-10 grid gap-10 lg:grid-cols-3">
        <!-- Left: description and activities -->
        <div class="lg:col-span-2">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ i18n.t('destinations.about', { name: i18n.pick(destination.name) }) }}</h2>
          <p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{{ i18n.pick(destination.description) }}</p>

          <h2 class="mt-8 text-xl font-bold text-slate-900 dark:text-white">{{ i18n.t('destinations.popularActivities') }}</h2>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="(activity, index) in destination.topActivities"
              :key="index"
              class="flex items-center gap-1.5 rounded-full bg-teal-600/10 px-3.5 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-300"
            >
              <Compass :size="14" />
              {{ i18n.pick(activity) }}
            </span>
          </div>

          <div class="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <router-link
              :to="`/booking?destination=${destination.id}`"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
            >
              {{ i18n.t('destinations.bookTripHere') }}
              <ArrowRight :size="16" />
            </router-link>

            <router-link
              :to="`/airline-booking?country=${destination.country}`"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-600 px-6 py-3 text-sm font-bold text-teal-600 transition hover:bg-teal-600 hover:text-white dark:text-teal-400 dark:hover:text-white"
            >
              <Plane :size="16" />
              {{ i18n.t('destinations.bookFlightTo', { country: i18n.t('countries.' + destination.country) }) }}
              <ExternalLink :size="14" />
            </router-link>
          </div>
        </div>

        <!-- Right: location / map card -->
        <aside data-aos="fade-up" class="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/40">
          <h3 class="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <LocateFixed :size="18" class="text-teal-600 dark:text-teal-400" />
            {{ i18n.t('destinations.locationMap') }}
          </h3>

          <dl class="mt-4 space-y-3 text-sm">
            <div class="flex items-start justify-between gap-3">
              <dt class="text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.destination') }}</dt>
              <dd class="text-right font-semibold text-slate-800 dark:text-slate-100">{{ i18n.pick(destination.name) }}</dd>
            </div>
            <div class="flex items-start justify-between gap-3">
              <dt class="text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.country') }}</dt>
              <dd class="text-right font-semibold text-slate-800 dark:text-slate-100">{{ i18n.t('countries.' + destination.country) }}</dd>
            </div>
            <div class="flex items-start justify-between gap-3">
              <dt class="text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.location') }}</dt>
              <dd class="flex items-center gap-1 text-right text-slate-800 dark:text-slate-100">
                <MapPin :size="14" class="shrink-0 text-teal-600 dark:text-teal-400" />
                {{ i18n.pick(destination.location) }}
              </dd>
            </div>
            <div class="flex items-start justify-between gap-3">
              <dt class="text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.latitude') }}</dt>
              <dd class="text-right font-mono text-slate-800 dark:text-slate-100">{{ destination.latitude.toFixed(4) }}</dd>
            </div>
            <div class="flex items-start justify-between gap-3">
              <dt class="text-slate-500 dark:text-slate-400">{{ i18n.t('destinations.longitude') }}</dt>
              <dd class="text-right font-mono text-slate-800 dark:text-slate-100">{{ destination.longitude.toFixed(4) }}</dd>
            </div>
          </dl>

          <div class="mt-5 flex flex-col gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
              @click="toggleMap"
            >
              <Navigation :size="16" />
              {{ showMap ? i18n.t('destinations.hideMap') : i18n.t('destinations.viewOnMap') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
              @click="openInMaps"
            >
              <MapPin :size="16" />
              {{ i18n.t('destinations.openInGoogleMaps') }}
            </button>
          </div>

          <!-- Interactive Leaflet map (lazy loaded) -->
          <div v-if="showMap" class="mt-5">
            <div
              ref="mapElement"
              class="h-64 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
              aria-label="Interactive map showing the destination location"
            ></div>
          </div>

          <!-- Simple fallback preview when the map is hidden -->
          <div v-else class="mt-5 flex items-center justify-center rounded-xl bg-slate-200 py-8 dark:bg-slate-700">
            <MapPin :size="32" class="text-teal-600 dark:text-teal-400" />
          </div>
        </aside>
      </div>

      <!-- Nearby hotels -->
      <section class="mt-12">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <BedDouble :size="22" class="text-teal-600 dark:text-teal-400" />
            {{ i18n.t('destinations.nearbyHotels') }}
          </h2>
          <router-link to="/hotels" class="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400">
            {{ i18n.t('hotels.viewAllHotels') }}
          </router-link>
        </div>

        <div v-if="nearbyHotels.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <HotelCard
            v-for="(hotel, index) in nearbyHotels"
            :key="hotel.id"
            :hotel="hotel"
            :delay="index * 60"
          />
        </div>
        <p v-else data-aos="fade-up" class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {{ i18n.t('destinations.noHotelsYet') }}
        </p>
      </section>
    </div>
  </div>
</template>