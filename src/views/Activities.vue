<script setup lang="ts">
// Activities.vue
// Lists all travel activities with category filters.
import { computed, onMounted, ref } from 'vue'
import { Waves, Mountain, Building2, Landmark, Tent, Utensils, Compass, Ship, Ticket, SearchX } from '@lucide/vue'
import type { Component } from 'vue'
import type { ActivityCategory } from '../data/activities'
import { activities } from '../data/activities'
import ActivityCard from '../components/ActivityCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

type FilterName = 'All' | ActivityCategory

const filters: { name: FilterName; icon: Component }[] = [
  { name: 'All', icon: Ticket },
  { name: 'Hiking', icon: Mountain },
  { name: 'Diving', icon: Waves },
  { name: 'City Tours', icon: Building2 },
  { name: 'Camping', icon: Tent },
  { name: 'Food Tours', icon: Utensils },
  { name: 'Cultural Tours', icon: Landmark },
  { name: 'Sailing', icon: Ship },
  { name: 'Adventure', icon: Compass },
]

const activeCategory = ref<FilterName>('All')
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

const filteredActivities = computed(() => {
  if (activeCategory.value === 'All') return activities
  return activities.filter((activity) => activity.category === activeCategory.value)
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Explore Activities</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
        Hikes, dives, food tours and more - pick your next experience.
      </p>
    </div>

    <div class="mb-10 flex flex-wrap justify-center gap-2">
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

    <LoadingSpinner v-if="isLoading" text="Loading experiences..." />

    <div v-else-if="filteredActivities.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <SearchX :size="48" class="text-slate-300 dark:text-slate-600" />
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200">No activities in this category</h3>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ActivityCard
        v-for="(activity, index) in filteredActivities"
        :key="activity.id"
        :activity="activity"
        :delay="index * 60"
      />
    </div>
  </div>
</template>