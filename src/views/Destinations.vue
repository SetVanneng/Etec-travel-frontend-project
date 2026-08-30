<script setup lang="ts">
// Destinations.vue
// A list of all destinations with a search bar and category filters.
// Features: v-model, computed, filter(), watch(), onMounted() and route query.
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Waves, Mountain, Building2, Landmark, Trees, Compass, SearchX } from '@lucide/vue'
import type { Component } from 'vue'
import type { DestinationCategory } from '../data/destinations'
import { destinations } from '../data/destinations'
import SearchBar from '../components/SearchBar.vue'
import DestinationCard from '../components/DestinationCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

type FilterName = 'All' | DestinationCategory

// Category chips with a matching icon for each one.
const filters: { name: FilterName; icon: Component }[] = [
  { name: 'All', icon: Compass },
  { name: 'Beaches', icon: Waves },
  { name: 'Mountains', icon: Mountain },
  { name: 'Cities', icon: Building2 },
  { name: 'Historical', icon: Landmark },
  { name: 'Nature', icon: Trees },
  { name: 'Adventure', icon: Compass },
]

// The text the user is currently typing (v-model).
const searchText = ref('')
// Currently selected category ("All" shows every destination).
const activeCategory = ref<FilterName>('All')
// Simulated loading state so we can show the LoadingSpinner.
const isLoading = ref(true)

// onMounted() runs once after the component is added to the page.
onMounted(() => {
  // Read the search text from the URL (?search=...), e.g. when the
  // home page search navigated here.
  const query = route.query.search
  if (typeof query === 'string' && query) {
    searchText.value = query
  }

  // Simulate fetching data from a server. In a real app this would be
  // an API call like fetch('/api/destinations').
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

// watch() reacts to route changes, so typing a new URL like
// /destinations?search=tokyo updates the search automatically.
watch(
  () => route.query.search,
  (value) => {
    if (typeof value === 'string') {
      searchText.value = value
    }
  },
)

// Clear everything (also removed the ?search= from the URL).
function clearAll(): void {
  searchText.value = ''
  activeCategory.value = 'All'
  router.replace({ path: '/destinations' })
}

// computed() re-runs automatically whenever searchText or activeCategory changes.
const filteredDestinations = computed(() => {
  return destinations.filter((destination) => {
    const matchesCategory =
      activeCategory.value === 'All' || destination.category === activeCategory.value

    // Search matches name, country or description (case-insensitive).
    const query = searchText.value.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      destination.name.toLowerCase().includes(query) ||
      destination.country.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })
})

// How many items matched (shown as a small count above the grid).
const resultCount = computed(() => filteredDestinations.value.length)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Explore Destinations</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
        Search for your dream holiday spot or filter by category.
      </p>
    </div>

    <!-- Search + category chips -->
    <div class="mx-auto mb-10 max-w-2xl">
      <SearchBar v-model="searchText" placeholder="Search a destination, e.g. Paris, Tokyo, Cambodia" />

      <div class="mt-5 flex flex-wrap justify-center gap-2">
        <button
          v-for="filter in filters"
          :key="filter.name"
          type="button"
          class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition"
          :class="
            activeCategory === filter.name
              ? 'bg-teal-600 text-white shadow-soft'
              : 'border border-slate-300 text-slate-600 hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-teal-400'
          "
          @click="activeCategory = filter.name"
        >
          <component :is="filter.icon" :size="15" />
          {{ filter.name }}
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <LoadingSpinner v-if="isLoading" text="Finding the best destinations..." />

    <!-- Empty state (v-else) -->
    <div v-else-if="resultCount === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <SearchX :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200">No destinations found</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Try a different search text or category.
      </p>
      <button
        type="button"
        class="mt-2 rounded-xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="clearAll"
      >
        Clear filters
      </button>
    </div>

    <!-- Result grid -->
    <div v-else>
      <p class="mb-6 text-sm text-slate-500 dark:text-slate-400">
        {{ resultCount }} {{ resultCount === 1 ? 'destination' : 'destinations' }} found
      </p>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DestinationCard
          v-for="destination in filteredDestinations"
          :key="destination.id"
          :destination="destination"
        />
      </div>
    </div>
  </div>
</template>