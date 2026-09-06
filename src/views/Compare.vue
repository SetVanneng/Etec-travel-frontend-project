<script setup lang="ts">
// Compare.vue
// Shows the hotels the user selected on the hotels page (max 4) side by side
// in a table so prices, ratings, facilities and room types are easy to scan.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft, Trash2, Scale, Star, MapPin, CheckCircle2, XCircle, Hotel as HotelIcon,
} from '@lucide/vue'
import { useCompareStore, MAX_COMPARE } from '../stores/compareStore'
import { useI18nStore } from '../stores/i18n'
import { hotels } from '../data/hotels'

const router = useRouter()
const i18n = useI18nStore()
const compareStore = useCompareStore()

const comparedHotels = computed(() => compareStore.comparedHotels)

interface CompareRow {
  key: string
  labelKey: string
}

const rows: CompareRow[] = [
  { key: 'image', labelKey: 'compare.hotel' },
  { key: 'price', labelKey: 'compare.pricePerNight' },
  { key: 'location', labelKey: 'compare.location' },
  { key: 'rating', labelKey: 'compare.rating' },
  { key: 'availability', labelKey: 'compare.availability' },
  { key: 'facilities', labelKey: 'compare.facilities' },
  { key: 'rooms', labelKey: 'compare.rooms' },
]

// The best (lowest) nightly price is highlighted green.
const bestPrice = computed(() =>
  comparedHotels.value.length ? Math.min(...comparedHotels.value.map((hotel) => hotel.pricePerNight)) : null,
)

function removeHotel(id: number): void {
  const hotel = comparedHotels.value.find((h) => h.id === id)
  if (hotel) compareStore.toggle(hotel)
}

function goToHotels(): void {
  router.push('/hotels')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <button
      type="button"
      class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
      @click="goToHotels"
    >
      <ArrowLeft :size="16" />
      {{ i18n.t('compare.backToHotels') }}
    </button>

    <div class="mb-8 text-center">
      <h1 class="flex items-center justify-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
        <Scale :size="32" class="text-teal-600 dark:text-teal-400" />
        {{ i18n.t('compare.title') }}
      </h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
        {{ i18n.t('compare.subtitle') }}
      </p>
    </div>

    <!-- Empty state -->
    <div
      v-if="comparedHotels.length === 0"
      class="flex flex-col items-center gap-4 py-24 text-center"
    >
      <Scale :size="56" class="text-slate-300 dark:text-slate-600" />
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('compare.emptyTitle') }}</h3>
      <p class="max-w-md text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('compare.emptyText') }}</p>
      <button
        type="button"
        class="mt-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="goToHotels"
      >
        {{ i18n.t('compare.browseHotels') }}
      </button>
    </div>

    <!-- Hint when only one hotel is selected -->
    <p
      v-else-if="comparedHotels.length < 2"
      class="mb-6 rounded-2xl border border-dashed border-teal-400/60 bg-teal-50 p-4 text-center text-sm text-teal-700 dark:border-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
    >
      {{ i18n.t('compare.hint', { max: String(MAX_COMPARE) }) }}
    </p>

    <div v-else class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table class="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <th class="sticky left-0 w-40 bg-slate-50 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:bg-slate-800/50 dark:text-slate-500">
              {{ i18n.t('compare.feature') }}
            </th>
            <th v-for="hotel in comparedHotels" :key="hotel.id" class="px-4 py-4 align-top">
              <div class="flex flex-col items-center gap-2">
                <router-link :to="`/hotel/${hotel.id}`" class="group block w-full text-center">
                  <img
                    :src="hotel.image"
                    :alt="i18n.pick(hotel.name)"
                    class="h-28 w-full rounded-xl object-cover transition group-hover:opacity-90"
                  />
                  <span class="mt-2 block font-semibold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                    {{ i18n.pick(hotel.name) }}
                  </span>
                  <span class="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin :size="12" />
                    {{ i18n.t('countries.' + hotel.country) }}
                  </span>
                </router-link>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-rose-400 hover:text-rose-500 dark:border-slate-700 dark:text-slate-400"
                  @click="removeHotel(hotel.id)"
                >
                  <Trash2 :size="13" />
                  {{ i18n.t('compare.remove') }}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="row.key"
            class="border-b border-slate-200 last:border-b-0 dark:border-slate-800"
            :class="index % 2 === 1 ? 'bg-slate-50/70 dark:bg-slate-800/20' : ''"
          >
            <th class="sticky left-0 bg-slate-50 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              {{ i18n.t(row.labelKey) }}
            </th>

            <!-- Image row -->
            <td v-if="row.key === 'image'" v-for="hotel in comparedHotels" :key="'img-' + hotel.id" class="px-4 py-4">
              <span class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <HotelIcon :size="14" class="text-teal-600 dark:text-teal-400" />
                {{ hotels.find((h) => h.id === hotel.id)?.city }}
              </span>
            </td>

            <!-- Price row -->
            <td v-else-if="row.key === 'price'" v-for="hotel in comparedHotels" :key="'price-' + hotel.id" class="px-4 py-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold"
                :class="hotel.pricePerNight === bestPrice ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'"
              >
                ${{ hotel.pricePerNight }}
                <span v-if="hotel.pricePerNight === bestPrice" class="inline-flex">
                  <CheckCircle2 :size="14" />
                </span>
              </span>
              <p class="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{{ i18n.t('compare.perNight') }}</p>
            </td>

            <!-- Location row -->
            <td v-else-if="row.key === 'location'" v-for="hotel in comparedHotels" :key="'loc-' + hotel.id" class="px-4 py-4">
              <p class="text-slate-700 dark:text-slate-300">{{ hotel.city }}</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">{{ i18n.t('countries.' + hotel.country) }}</p>
            </td>

            <!-- Rating row -->
            <td v-else-if="row.key === 'rating'" v-for="hotel in comparedHotels" :key="'rating-' + hotel.id" class="px-4 py-4">
              <span class="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                {{ hotel.rating.toFixed(1) }}
                <Star :size="15" class="fill-amber-500 text-amber-500" />
              </span>
            </td>

            <!-- Availability row -->
            <td v-else-if="row.key === 'availability'" v-for="hotel in comparedHotels" :key="'avail-' + hotel.id" class="px-4 py-4">
              <span
                v-if="hotel.available"
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              >
                <CheckCircle2 :size="14" />
                {{ i18n.t('compare.available') }}
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
              >
                <XCircle :size="14" />
                {{ i18n.t('compare.soldOut') }}
              </span>
            </td>

            <!-- Facilities row -->
            <td v-else-if="row.key === 'facilities'" v-for="hotel in comparedHotels" :key="'fac-' + hotel.id" class="px-4 py-4">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="(facility, index) in hotel.facilities.slice(0, 4)"
                  :key="index"
                  class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {{ typeof facility === 'string' ? facility : i18n.pick(facility) }}
                </span>
              </div>
            </td>

            <!-- Rooms row -->
            <td v-else v-for="hotel in comparedHotels" :key="'rooms-' + hotel.id" class="px-4 py-4">
              <ul class="space-y-2">
                <li
                  v-for="(room, index) in hotel.roomTypes.slice(0, 3)"
                  :key="index"
                  class="flex items-center justify-between gap-3 text-xs"
                >
                  <span class="text-slate-600 dark:text-slate-300">{{ i18n.pick(room.name) }}</span>
                  <span class="font-semibold text-teal-600 dark:text-teal-400">${{ room.price }}</span>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="comparedHotels.length > 0" class="mt-6 flex justify-center">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-5 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-900/30"
        @click="compareStore.clear()"
      >
        <Trash2 :size="16" />
        {{ i18n.t('compare.clearAll') }}
      </button>
    </div>
  </div>
</template>