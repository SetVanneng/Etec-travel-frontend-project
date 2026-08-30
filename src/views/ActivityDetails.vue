<script setup lang="ts">
// ActivityDetails.vue
// Dynamic route /activity/:id with activity info and a booking link.
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MapPin, Star, Clock, DollarSign, ArrowLeft, ArrowRight,
  CheckCircle2, AlertCircle,
} from '@lucide/vue'
import { getActivityById } from '../data/activities'
import { useAuthStore } from '../stores/authStore'
import { notify } from '../utils/toast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const activity = computed(() => getActivityById(Number(route.params.id)))

function goBack(): void {
  router.push('/activities')
}

function bookActivity(): void {
  if (!activity.value) return
  if (!authStore.isLoggedIn()) {
    notify('Please log in to book a hotel for this activity.', 'info')
    router.push({ path: '/login', query: { redirect: `/activity/${activity.value.id}` } })
    return
  }
  notify(`Booking a hotel near ${activity.value.name}.`, 'info')
  router.push({ path: '/booking', query: { activity: activity.value.id } })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <!-- Not found -->
    <div v-if="!activity" class="flex flex-col items-center gap-4 py-24 text-center">
      <AlertCircle :size="48" class="text-slate-300 dark:text-slate-600" />
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Activity not found</h1>
      <button
        type="button"
        class="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="goBack"
      >
        Back to activities
      </button>
    </div>

    <div v-else>
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
        @click="goBack"
      >
        <ArrowLeft :size="16" />
        Back to all activities
      </button>

      <div class="grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <img :src="activity.image" :alt="activity.name" class="h-full w-full object-cover" />
            <span class="absolute left-4 top-4 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
              {{ activity.category }}
            </span>
          </div>

          <h1 class="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{{ activity.name }}</h1>
          <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin :size="15" class="text-teal-600 dark:text-teal-400" />
            {{ activity.location }}
          </p>

          <p class="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">{{ activity.description }}</p>

          <h2 class="mt-8 text-xl font-bold text-slate-900 dark:text-white">What you get</h2>
          <ul class="mt-4 grid gap-3 sm:grid-cols-2">
            <li
              v-for="highlight in activity.highlights"
              :key="highlight"
              class="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
            >
              <CheckCircle2 :size="17" class="shrink-0 text-teal-600 dark:text-teal-400" />
              {{ highlight }}
            </li>
          </ul>
        </div>

        <!-- Price summary card -->
        <aside class="h-fit space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
            <span class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Star :size="16" class="text-amber-500" /> Rating
            </span>
            <span class="font-bold text-slate-900 dark:text-white">{{ activity.rating }} / 5</span>
          </div>
          <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
            <span class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Clock :size="16" class="text-teal-600 dark:text-teal-400" /> Duration
            </span>
            <span class="font-bold text-slate-900 dark:text-white">{{ activity.duration }}</span>
          </div>
          <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
            <span class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <DollarSign :size="16" class="text-emerald-600" /> Price per person
            </span>
            <span class="font-bold text-slate-900 dark:text-white">${{ activity.price }}</span>
          </div>

          <button
            type="button"
            class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
            @click="bookActivity"
          >
            Book This Activity
            <ArrowRight :size="16" />
          </button>
          <p class="text-center text-xs text-slate-400 dark:text-slate-500">
            Frontend-only booking - no real payment.
          </p>
        </aside>
      </div>
    </div>
  </div>
</template>