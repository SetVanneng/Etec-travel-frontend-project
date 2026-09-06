<script setup lang="ts">
// Favorites.vue
// Shows all destinations the user added to favorites (Pinia store).
import { Heart, Trash2, ArrowRight } from '@lucide/vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useI18nStore } from '../stores/i18n'
import DestinationCard from '../components/DestinationCard.vue'
import { notify } from '../utils/toast'

const favoriteStore = useFavoriteStore()
const i18n = useI18nStore()

function clearAll(): void {
  favoriteStore.clearFavorites()
  notify(i18n.t('favorites.allRemoved'), 'info')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div>
        <h1 class="flex items-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
          <Heart :size="30" class="fill-rose-500 text-rose-500" />
          {{ i18n.t('favorites.title') }}
        </h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ i18n.t('favorites.saved', { count: String(favoriteStore.favoriteCount) }) }}
        </p>
      </div>
      <button
        v-if="favoriteStore.favoriteCount > 0"
        type="button"
        class="flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30"
        @click="clearAll"
      >
        <Trash2 :size="16" />
        {{ i18n.t('favorites.clearAll') }}
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="favoriteStore.favorites.length === 0"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700"
    >
      <Heart :size="52" class="text-slate-300 dark:text-slate-600" />
      <div>
        <h2 class="text-xl font-bold text-slate-700 dark:text-slate-200">{{ i18n.t('favorites.noTitle') }}</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ i18n.t('favorites.noText') }}
        </p>
      </div>
      <router-link
        to="/destinations"
        class="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        {{ i18n.t('favorites.discover') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>

    <!-- Favorite cards -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DestinationCard
        v-for="(destination, index) in favoriteStore.favorites"
        :key="destination.id"
        :destination="destination"
        :delay="index * 60"
      />
    </div>
  </div>
</template>