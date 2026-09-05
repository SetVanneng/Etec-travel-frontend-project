<script setup lang="ts">
// MyTrips.vue
// The Travel Dashboard. Shows the user's bookings (from the bookingStore,
// which is saved in localStorage) split into upcoming and previous trips.
// Each trip can be cancelled.
import { computed } from 'vue'
import { CalendarDays, Hotel, Users, Plane, MapPin, Clock, CircleCheck, XCircle, AlertCircle, Compass } from '@lucide/vue'
import { useBookingStore } from '../stores/bookingStore'
import { useAuthStore } from '../stores/authStore'
import { notify } from '../utils/toast'
import type { Booking } from '../stores/bookingStore'

const bookingStore = useBookingStore()
const authStore = useAuthStore()

const today = new Date().toISOString().split('T')[0]

function startDateISO(booking: Booking): string {
  return booking.checkIn
}

// Compare dates as strings (YYYY-MM-DD sorts correctly as text).
// A trip is "upcoming" if its check-in date is today or later AND it
// has not been cancelled.
const upcomingTrips = computed(() =>
  bookingStore.bookings.filter(
    (booking) => booking.status === 'confirmed' && startDateISO(booking) >= today,
  ),
)

// Everything else: cancelled trips and trips that already happened.
const previousTrips = computed(() =>
  bookingStore.bookings.filter(
    (booking) => booking.status === 'cancelled' || startDateISO(booking) < today,
  ),
)

const hasAnyTrips = computed(() => bookingStore.bookings.length > 0)

function formatDate(iso: string): string {
  // "2026-08-29" -> "29 Aug 2026" using the browser's date formatter.
  const date = new Date(iso + 'T00:00:00')
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function cancelTrip(booking: Booking): void {
  bookingStore.cancelBooking(booking.id)
  notify('Trip cancelled.', 'info')
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="flex items-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
          <Plane :size="30" class="text-teal-600 dark:text-teal-400" />
          My Trips
        </h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your frontend-only travel dashboard (data saved in localStorage).
        </p>
      </div>
      <router-link
        to="/booking"
        class="hidden items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 sm:flex"
      >
        Book New Trip
      </router-link>
    </div>

    <!-- Empty state -->
    <div
      v-if="!hasAnyTrips"
      data-aos="fade-up"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700"
    >
      <CalendarDays :size="52" class="text-slate-300 dark:text-slate-600" />
      <h2 class="text-xl font-bold text-slate-700 dark:text-slate-200">No trips yet</h2>
      <p class="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Book a destination and hotel to see your upcoming trips here.
      </p>
      <router-link
        to="/booking"
        class="mt-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Book Your First Trip
      </router-link>
    </div>

    <div v-else>
      <!-- Upcoming trips -->
      <section class="mb-10">
        <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <MapPin :size="20" class="text-teal-600 dark:text-teal-400" />
          Upcoming Trips
        </h2>

        <div v-if="upcomingTrips.length === 0" class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No upcoming trips. Book something exciting!
        </div>

        <div class="space-y-4">
          <article
            v-for="(trip, index) in upcomingTrips"
            :key="trip.id"
            data-aos="fade-up"
            :data-aos-delay="index * 60"
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ trip.hotelName }}</h3>
                  <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                    {{ trip.status }}
                  </span>
                </div>
                <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <Hotel :size="15" class="text-teal-600 dark:text-teal-400" />
                  {{ trip.destination }}
                </p>
                <p
                  v-if="trip.activityName"
                  class="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
                >
                  <Compass :size="15" class="text-teal-600 dark:text-teal-400" />
                  Activity: {{ trip.activityName }}
                </p>

                <div class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <CalendarDays :size="15" class="text-teal-600 dark:text-teal-400" />
                    {{ formatDate(trip.checkIn) }} to {{ formatDate(trip.checkOut) }}
                  </span>
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Users :size="15" class="text-teal-600 dark:text-teal-400" />
                    {{ trip.guests }} {{ trip.guests === 1 ? 'guest' : 'guests' }}
                  </span>
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Hotel :size="15" class="text-teal-600 dark:text-teal-400" />
                    {{ trip.roomType }}
                  </span>
                  <span class="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                    <CircleCheck :size="15" class="text-emerald-500" />
                    ${{ trip.totalPrice }}
                  </span>
                </div>
              </div>

              <button
                type="button"
                class="shrink-0 rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30"
                @click="cancelTrip(trip)"
              >
                Cancel
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Previous / cancelled trips -->
      <section>
        <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <Clock :size="20" class="text-slate-400" />
          Previous &amp; Cancelled
        </h2>

        <div v-if="previousTrips.length === 0" class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Nothing here yet.
        </div>

        <div class="space-y-3">
          <article
            v-for="(trip, index) in previousTrips"
            :key="trip.id"
            data-aos="fade-up"
            :data-aos-delay="index * 60"
            class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 opacity-80 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-bold text-slate-800 dark:text-slate-100">{{ trip.hotelName }}</h3>
                <span
                  class="rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
                  :class="trip.status === 'cancelled'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'"
                >
                  {{ trip.status }}
                </span>
              </div>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {{ trip.destination }} &middot; {{ formatDate(trip.checkIn) }}
              </p>
              <p
                v-if="trip.activityName"
                class="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
              >
                <Compass :size="13" class="text-teal-600 dark:text-teal-400" />
                {{ trip.activityName }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <XCircle :size="15" class="text-slate-400" />
                ${{ trip.totalPrice }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <p class="mt-10 flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
        <AlertCircle :size="14" />
        All trip data is stored in your browser with localStorage - nothing is sent anywhere.
      </p>
    </div>
  </div>
</template>