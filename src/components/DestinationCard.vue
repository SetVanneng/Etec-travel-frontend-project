<script setup lang="ts">
// DestinationCard.vue
// A reusable card that shows one destination.
// Used on the home page and the destinations page.
import { MapPin, Star, Heart, Calendar, ArrowRight } from '@lucide/vue'
import type { Destination } from '../data/destinations'
import { useFavoriteStore } from '../stores/favoriteStore'

// The parent component passes one destination as a "prop".
const props = defineProps<{
  destination: Destination
}>()

const favoriteStore = useFavoriteStore()
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
  >
    <!-- Image + favorite heart -->
    <div class="relative h-52 overflow-hidden">
      <img
        :src="props.destination.image"
        :alt="props.destination.name"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur dark:bg-slate-900/90 dark:text-slate-200">
        {{ props.destination.category }}
      </span>
      <button
        type="button"
        class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110 dark:bg-slate-900/90"
        :aria-label="favoriteStore.isFavorite(props.destination.id) ? 'Remove from favorites' : 'Add to favorites'"
        :title="favoriteStore.isFavorite(props.destination.id) ? 'Remove from favorites' : 'Add to favorites'"
        @click.stop="favoriteStore.toggleFavorite(props.destination)"
      >
        <Heart
          :size="20"
          :class="favoriteStore.isFavorite(props.destination.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'"
        />
      </button>
    </div>

    <!-- Card body -->
    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ props.destination.name }}</h3>
        <span class="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
          <Star :size="13" class="fill-amber-500 text-amber-500" />
          {{ props.destination.rating }}
        </span>
      </div>

      <p class="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <MapPin :size="14" class="text-teal-600 dark:text-teal-400" />
        {{ props.destination.location }}
      </p>

      <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ props.destination.description }}
      </p>

      <!-- Budget + best time -->
      <div class="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60">
        <span class="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
          <Calendar :size="15" class="text-teal-600 dark:text-teal-400" />
          {{ props.destination.bestTimeToVisit.split('(')[0].trim() }}
        </span>
        <span class="font-bold text-teal-600 dark:text-teal-400">${{ props.destination.budget }}/day</span>
      </div>

      <!-- Explore button -->
      <router-link
        :to="`/destination/${props.destination.id}`"
        class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Explore
        <ArrowRight :size="16" />
      </router-link>
    </div>
  </article>
</template>