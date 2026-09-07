<script setup lang="ts">
// ActivityCard.vue
// A reusable card that shows one travel activity.
import { MapPin, Star, Heart, Clock, ArrowRight } from '@lucide/vue'
import type { Activity } from '../data/activities'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useI18nStore } from '../stores/i18n'

const props = withDefaults(
  defineProps<{
    activity: Activity
    delay?: number
  }>(),
  {
    delay: 0,
  },
)

const i18n = useI18nStore()
const favoriteStore = useFavoriteStore()
</script>

<template>
  <article
    data-aos="fade-up"
    :data-aos-delay="props.delay"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="props.activity.image"
        :alt="i18n.pick(props.activity.name)"
        class="h-full w-full object-cover transition duration-700 ease-smooth group-hover:scale-110"
      />
      <span class="absolute left-3 top-3 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
        {{ i18n.categoryLabel(props.activity.category) }}
      </span>
      <!-- Favorite heart -->
      <button
        type="button"
        class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition duration-300 ease-smooth hover:scale-110 active:scale-95 dark:bg-slate-900/90"
        :aria-label="
          favoriteStore.isActivityFavorite(props.activity.id)
            ? i18n.t('activities.removeFromFavorites')
            : i18n.t('activities.addToFavorites')
        "
        :title="
          favoriteStore.isActivityFavorite(props.activity.id)
            ? i18n.t('activities.removeFromFavorites')
            : i18n.t('activities.addToFavorites')
        "
        @click.stop="favoriteStore.toggleActivityFavorite(props.activity)"
      >
        <Heart
          :size="20"
          :class="favoriteStore.isActivityFavorite(props.activity.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'"
        />
      </button>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ i18n.pick(props.activity.name) }}</h3>

      <p class="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <MapPin :size="14" class="text-teal-600 dark:text-teal-400" />
        {{ i18n.pick(props.activity.location) }}
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span class="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
          <Star :size="13" class="fill-amber-500 text-amber-500" />
          {{ props.activity.rating }}
        </span>
        <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Clock :size="14" class="text-teal-600 dark:text-teal-400" />
          {{ i18n.pick(props.activity.duration) }}
        </span>
        <span class="ml-auto font-bold text-teal-600 dark:text-teal-400">${{ props.activity.price }}</span>
      </div>

      <router-link
        :to="`/activity/${props.activity.id}`"
        class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        {{ i18n.t('common.viewActivity') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>
  </article>
</template>