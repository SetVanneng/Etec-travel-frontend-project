<script setup lang="ts">
// Favorites.vue
// Shows all destinations, hotels and activities the user added to favorites
// (Pinia store), switchable with tabs.
import { Heart, Hotel, Compass, MapPin, Trash2, ArrowRight } from '@lucide/vue'
import { ref } from 'vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useI18nStore } from '../stores/i18n'
import DestinationCard from '../components/DestinationCard.vue'
import HotelCard from '../components/HotelCard.vue'
import ActivityCard from '../components/ActivityCard.vue'
import { notify } from '../utils/toast'

type FavoritesTab = 'destinations' | 'hotels' | 'activities'

const favoriteStore = useFavoriteStore()
const i18n = useI18nStore()

const activeTab = ref<FavoritesTab>('destinations')

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
          {{ i18n.t('favorites.savedTotal', { count: String(favoriteStore.favoriteCount) }) }}
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

    <!-- Tabs -->
    <div class="mb-8 flex flex-wrap gap-2">
      <button
        type="button"
        class="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition"
        :class="
          activeTab === 'destinations'
            ? 'border-teal-600 bg-teal-600 text-white'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        @click="activeTab = 'destinations'"
      >
        <MapPin :size="16" />
        {{ i18n.t('favorites.tabDestinations') }}
        <span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">{{ favoriteStore.destinations.length }}</span>
      </button>
      <button
        type="button"
        class="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition"
        :class="
          activeTab === 'hotels'
            ? 'border-teal-600 bg-teal-600 text-white'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        @click="activeTab = 'hotels'"
      >
        <Hotel :size="16" />
        {{ i18n.t('favorites.tabHotels') }}
        <span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">{{ favoriteStore.hotels.length }}</span>
      </button>
      <button
        type="button"
        class="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition"
        :class="
          activeTab === 'activities'
            ? 'border-teal-600 bg-teal-600 text-white'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        @click="activeTab = 'activities'"
      >
        <Compass :size="16" />
        {{ i18n.t('favorites.tabActivities') }}
        <span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">{{ favoriteStore.activities.length }}</span>
      </button>
    </div>

    <!-- Empty state: destinations -->
    <div
      v-if="activeTab === 'destinations' && favoriteStore.destinations.length === 0"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700"
    >
      <MapPin :size="52" class="text-slate-300 dark:text-slate-600" />
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

    <!-- Empty state: hotels -->
    <div
      v-else-if="activeTab === 'hotels' && favoriteStore.hotels.length === 0"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700"
    >
      <Hotel :size="52" class="text-slate-300 dark:text-slate-600" />
      <div>
        <h2 class="text-xl font-bold text-slate-700 dark:text-slate-200">{{ i18n.t('favorites.noHotelsTitle') }}</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ i18n.t('favorites.noHotelsText') }}
        </p>
      </div>
      <router-link
        to="/hotels"
        class="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        {{ i18n.t('favorites.discoverHotels') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>

    <!-- Empty state: activities -->
    <div
      v-else-if="activeTab === 'activities' && favoriteStore.activities.length === 0"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700"
    >
      <Compass :size="52" class="text-slate-300 dark:text-slate-600" />
      <div>
        <h2 class="text-xl font-bold text-slate-700 dark:text-slate-200">{{ i18n.t('favorites.noActivitiesTitle') }}</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ i18n.t('favorites.noActivitiesText') }}
        </p>
      </div>
      <router-link
        to="/activities"
        class="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        {{ i18n.t('favorites.discoverActivities') }}
        <ArrowRight :size="16" />
      </router-link>
    </div>

    <!-- Favorite cards: destinations -->
    <div v-else-if="activeTab === 'destinations'" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DestinationCard
        v-for="(destination, index) in favoriteStore.destinations"
        :key="destination.id"
        :destination="destination"
        :delay="index * 60"
      />
    </div>

    <!-- Favorite cards: hotels -->
    <div v-else-if="activeTab === 'hotels'" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <HotelCard
        v-for="(hotel, index) in favoriteStore.hotels"
        :key="hotel.id"
        :hotel="hotel"
        :delay="index * 60"
      />
    </div>

    <!-- Favorite cards: activities -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ActivityCard
        v-for="(activity, index) in favoriteStore.activities"
        :key="activity.id"
        :activity="activity"
        :delay="index * 60"
      />
    </div>
  </div>
</template>