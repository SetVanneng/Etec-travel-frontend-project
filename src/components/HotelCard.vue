<script setup lang="ts">
// HotelCard.vue
// A reusable card that shows one hotel.
import { MapPin, Star, Heart, Scale, ArrowRight, BedDouble, CalendarCheck } from '@lucide/vue'
import { computed } from 'vue'
import type { Hotel } from '../data/hotels'
import { useCompareStore, MAX_COMPARE } from '../stores/compareStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useI18nStore } from '../stores/i18n'
import { notify } from '../utils/toast'

const props = withDefaults(
  defineProps<{
    hotel: Hotel
    delay?: number
  }>(),
  {
    delay: 0,
  },
)

const i18n = useI18nStore()
const favoriteStore = useFavoriteStore()
const compareStore = useCompareStore()

// First three facilities, resolved to the active language.
// Kept as { key, label } so list keys stay stable across language switches.
const topFacilities = computed(() =>
  props.hotel.facilities.slice(0, 3).map((facility, index) => ({
    key: index,
    label: i18n.pick(facility),
  })),
)

function toggleCompare(): void {
  const result = compareStore.toggle(props.hotel)
  if (result === 'added') {
    notify(i18n.t('compare.added', { name: i18n.pick(props.hotel.name) }), 'info')
  } else if (result === 'removed') {
    notify(i18n.t('compare.removed', { name: i18n.pick(props.hotel.name) }), 'info')
  } else {
    notify(i18n.t('compare.maxReached', { max: String(MAX_COMPARE) }), 'error')
  }
}
</script>

<template>
  <article
    data-aos="fade-up"
    :data-aos-delay="props.delay"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="props.hotel.image"
        :alt="i18n.pick(props.hotel.name)"
        class="h-full w-full object-cover transition duration-700 ease-smooth group-hover:scale-110"
      />
      <span
        class="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
      >
        ${{ props.hotel.pricePerNight }}{{ i18n.t('common.night') }}
      </span>
      <!-- Availability badge -->
      <span
        v-if="props.hotel.available"
        class="absolute bottom-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white"
      >
        {{ i18n.t('common.available') }}
      </span>
      <span
        v-else
        class="absolute bottom-3 right-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white"
      >
        {{ i18n.t('common.soldOut') }}
      </span>
      <!-- Favorite heart -->
      <button
        type="button"
        class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition duration-300 ease-smooth hover:scale-110 active:scale-95 dark:bg-slate-900/90"
        :aria-label="
          favoriteStore.isHotelFavorite(props.hotel.id)
            ? i18n.t('hotels.removeFromFavorites')
            : i18n.t('hotels.addToFavorites')
        "
        :title="
          favoriteStore.isHotelFavorite(props.hotel.id)
            ? i18n.t('hotels.removeFromFavorites')
            : i18n.t('hotels.addToFavorites')
        "
        @click.stop="favoriteStore.toggleHotelFavorite(props.hotel)"
      >
        <Heart
          :size="20"
          :class="favoriteStore.isHotelFavorite(props.hotel.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'"
        />
      </button>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ i18n.pick(props.hotel.name) }}</h3>
        <span class="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
          <Star :size="13" class="fill-amber-500 text-amber-500" />
          {{ props.hotel.rating }}
        </span>
      </div>

      <p class="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <MapPin :size="14" class="text-teal-600 dark:text-teal-400" />
        {{ i18n.pick(props.hotel.location) }}
      </p>

      <!-- Facilities (only the first three) -->
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="facility in topFacilities"
          :key="facility.key"
          class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ facility.label }}
        </span>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <router-link
          :to="`/hotel/${props.hotel.id}`"
          class="flex items-center justify-center gap-2 rounded-xl border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
        >
          {{ i18n.t('common.viewHotel') }}
          <ArrowRight :size="16" />
        </router-link>
        <router-link
          v-if="props.hotel.available"
          :to="`/booking?hotel=${props.hotel.id}`"
          class="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <CalendarCheck :size="16" />
          {{ i18n.t('common.bookNow') }}
        </router-link>
        <button
          v-else
          type="button"
          disabled
          class="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400 dark:bg-slate-800"
        >
          <CalendarCheck :size="16" />
          {{ i18n.t('common.bookNow') }}
        </button>
      </div>

      <!-- Compare toggle -->
      <button
        type="button"
        class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
        :class="
          compareStore.isCompared(props.hotel.id)
            ? 'border-teal-600 bg-teal-600/10 text-teal-700 dark:text-teal-300'
            : 'border-slate-300 text-slate-600 hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-teal-400'
        "
        @click="toggleCompare"
      >
        <Scale :size="16" />
        {{
          compareStore.isCompared(props.hotel.id)
            ? i18n.t('compare.remove')
            : i18n.t('compare.add')
        }}
      </button>
    </div>
  </article>
</template>