<script setup lang="ts">
// HotelCard.vue
// A reusable card that shows one hotel.
import { MapPin, Star, ArrowRight, BedDouble } from '@lucide/vue'
import { computed } from 'vue'
import type { Hotel } from '../data/hotels'
import { useI18nStore } from '../stores/i18n'

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

// First three facilities, resolved to the active language.
// Kept as { key, label } so list keys stay stable across language switches.
const topFacilities = computed(() =>
  props.hotel.facilities.slice(0, 3).map((facility, index) => ({
    key: index,
    label: i18n.pick(facility),
  })),
)
</script>

<template>
  <article
    data-aos="fade-up"
    :data-aos-delay="props.delay"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="props.hotel.image"
        :alt="i18n.pick(props.hotel.name)"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span
        class="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
      >
        ${{ props.hotel.pricePerNight }}{{ i18n.t('common.night') }}
      </span>
      <!-- Availability badge (v-if / v-else example) -->
      <span
        v-if="props.hotel.available"
        class="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white"
      >
        {{ i18n.t('common.available') }}
      </span>
      <span v-else class="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
        {{ i18n.t('common.soldOut') }}
      </span>
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

      <router-link
        :to="`/hotel/${props.hotel.id}`"
        class="mt-4 flex items-center justify-center gap-2 rounded-xl border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
      >
        {{ i18n.t('common.viewHotel') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>
  </article>
</template>